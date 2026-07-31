// StayTW API — Cloudflare Worker + D1
// 公開：
//   - POST /api/feedback            使用者回饋（蜜罐防機器人）
//   - POST /api/create-payment      建立綠界訂單（Auth: Firebase idToken）→ 回 {endpoint, params}
//   - POST /api/ecpay-callback      綠界 server-to-server callback（驗 CheckMacValue）
//   - *    /api/ecpay-return        綠界 OrderResultURL → 302 轉到 account.html
//   - GET  /api/entitlement         查會員狀態（Auth: Firebase idToken）
//   - POST /api/cancel-subscription 取消定期定額（Auth）
//   - POST /api/rc-webhook          RevenueCat webhook（iOS，Bearer RC_WEBHOOK_SECRET）
//   - GET  /api/admin/*             後台（Bearer ADMIN_TOKEN）
//
// Secrets（wrangler secret put）：
//   ADMIN_TOKEN, RC_WEBHOOK_SECRET,
//   ECPAY_MERCHANT_ID, ECPAY_HASH_KEY, ECPAY_HASH_IV, ECPAY_PRODUCTION,
//   FIREBASE_PROJECT_ID, FIREBASE_API_KEY
//   （綠界未設 → fallback 官方 sandbox 商店 3002607；正式上線再 put 真值 + ECPAY_PRODUCTION=true）

const ALLOW_ORIGINS = ["https://staytw.pages.dev", "https://miabuilds.github.io", "http://localhost:8471"];

function cors(req) {
  const o = req.headers.get("Origin") || "";
  const ok = ALLOW_ORIGINS.some(a => o.startsWith(a));
  return {
    "Access-Control-Allow-Origin": ok ? o : ALLOW_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  };
}
const json = (data, status, extra) =>
  new Response(JSON.stringify(data), { status: status || 200, headers: { "Content-Type": "application/json", ...extra } });

const nowMs = () => Date.now();
const plusDays = (ms, d) => ms + d * 864e5;

// ───────────────────── 方案設定（TWD）─────────────────────
// iOS RevenueCat 是定價來源（JPY）：月額 980 / 年額 5800 / 買切り 12800。
// 網頁綠界收 TWD，換算成 JPY 平價避免跨平台套利（1 JPY ≈ 0.21 TWD，取整）。
// 改價要同步：pricing.html、iOS RevenueCat（subscription.ts）。
const PLANS = {
  monthly:  { price_twd: 210,        period_days: 30,        period_type: "M", display_name: "月額",   price_jpy: 980 },
  yearly:   { price_twd: 1290,       period_days: 365,       period_type: "Y", display_name: "年額",   price_jpy: 5800 },
  lifetime: { price_twd: 2790,       period_days: 365 * 100, period_type: "M", display_name: "買切り", price_jpy: 12800 },
};

// ───────────────────── 綠界設定 ─────────────────────
function ecpayConfig(env) {
  return {
    merchantId:  env.ECPAY_MERCHANT_ID || "3002607",              // sandbox 官方測試商店
    hashKey:     env.ECPAY_HASH_KEY    || "pwFHCqoQZGmho4w6",
    hashIV:      env.ECPAY_HASH_IV     || "EkRm7iFT261dpevs",
    isProduction: env.ECPAY_PRODUCTION === "true",
    siteOrigin:  env.SITE_ORIGIN || "https://staytw.pages.dev",
  };
}
function ecpayEndpoint(env) {
  return ecpayConfig(env).isProduction
    ? "https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5"
    : "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";
}
function ecpayPeriodActionEndpoint(env) {
  return ecpayConfig(env).isProduction
    ? "https://payment.ecpay.com.tw/Cashier/CreditCardPeriodAction"
    : "https://payment-stage.ecpay.com.tw/Cashier/CreditCardPeriodAction";
}

// 綠界 URL encode 規則（照 .NET HttpUtility.UrlEncode，最後整串轉小寫再 hash，故 %XX 大小寫無影響）
function ecpayUrlEncode(str) {
  return encodeURIComponent(str)
    .replace(/%20/g, "+").replace(/%21/g, "!").replace(/%2A/g, "*")
    .replace(/%28/g, "(").replace(/%29/g, ")");
}
async function sha256HexUpper(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}
async function checkMacValue(params, cfg) {
  const keys = Object.keys(params).filter(k => k !== "CheckMacValue").sort();
  const kv = keys.map(k => `${k}=${params[k]}`).join("&");
  const raw = `HashKey=${cfg.hashKey}&${kv}&HashIV=${cfg.hashIV}`;
  return await sha256HexUpper(ecpayUrlEncode(raw).toLowerCase());
}
async function verifyCheckMacValue(params, cfg) {
  const provided = params.CheckMacValue;
  if (!provided) return false;
  const computed = await checkMacValue(params, cfg);
  return provided.toUpperCase() === computed;
}
function ecpayDateTimeTW(d = new Date()) {
  const tw = new Date(d.getTime() + 8 * 3600 * 1000);
  const p = n => String(n).padStart(2, "0");
  return `${tw.getUTCFullYear()}/${p(tw.getUTCMonth() + 1)}/${p(tw.getUTCDate())} ${p(tw.getUTCHours())}:${p(tw.getUTCMinutes())}:${p(tw.getUTCSeconds())}`;
}
function generateMerchantTradeNo() {
  const ts = Date.now().toString().slice(-10);
  const rand = Math.random().toString(36).slice(2, 8);
  return `tw${ts}${rand}`.slice(0, 20);
}

// ───────────────────── Firebase token 驗證 ─────────────────────
// 用 Identity Toolkit accounts:lookup 驗 idToken（免在 Worker 手刻 RS256 JWT 驗簽）。
// FIREBASE_API_KEY 是公開的 Web API key，可安全放 secret。回 {uid,email} 或 null。
async function verifyFirebaseToken(idToken, env) {
  if (!idToken || !env.FIREBASE_API_KEY) return null;
  try {
    const r = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) });
    if (!r.ok) return null;
    const d = await r.json();
    const u = d.users && d.users[0];
    if (!u || !u.localId) return null;
    return { uid: u.localId, email: u.email || "", emailVerified: !!u.emailVerified };
  } catch { return null; }
}
async function emailHash(email) {
  return (await sha256HexUpper((email || "").trim().toLowerCase())).slice(0, 32);
}

// ───────────────────── entitlement 讀寫（D1）─────────────────────
async function getEntitlement(env, uid) {
  return await env.DB.prepare("SELECT * FROM entitlements WHERE uid = ?1").bind(uid).first();
}
const TRIAL_DAYS = 7;
// 三態存取：premium（付費有效）/ trial（試用中）/ taste（嚐味免費層）
function resolveAccess(ent) {
  const now = nowMs();
  if (ent) {
    if (ent.status === "active" && (ent.plan === "lifetime" || Number(ent.expires_at) > now)) return "premium";
    if (ent.status === "cancelled" && Number(ent.expires_at) > now) return "premium";  // 已付費、關續扣但還沒到期
    if (ent.status === "trialing" && Number(ent.expires_at) > now) return "trial";
  }
  return "taste";
}
// 登入後首次查詢 → 自動開 7 天試用（uid 為 PK，重複登入不會重開）
async function ensureTrial(env, uid, email) {
  const start = nowMs();
  await env.DB.prepare(
    `INSERT INTO entitlements (uid, email_hash, plan, status, expires_at, will_renew, source, started_at, updated_at)
     VALUES (?1, ?2, 'trial', 'trialing', ?3, 0, 'web', ?4, ?4)
     ON CONFLICT(uid) DO NOTHING`
  ).bind(uid, await emailHash(email), plusDays(start, TRIAL_DAYS), start).run();
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const h = cors(req);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });

    // ───────── 使用者回饋 ─────────
    if (url.pathname === "/api/feedback" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      if (b.website) return json({ ok: true }, 200, h);                    // 蜜罐
      const msg = String(b.message || "").trim().slice(0, 3000);
      if (msg.length < 5) return json({ error: "message too short" }, 400, h);
      const type = ["bug", "content", "feature", "other"].includes(b.type) ? b.type : "other";
      await env.DB.prepare(
        "INSERT INTO feedback (type, message, email, lang, ua) VALUES (?1, ?2, ?3, ?4, ?5)"
      ).bind(type, msg, String(b.email || "").slice(0, 200), String(b.lang || "").slice(0, 8),
             (req.headers.get("User-Agent") || "").slice(0, 300)).run();
      return json({ ok: true }, 200, h);
    }

    // ───────── 建立綠界訂單 ─────────
    if (url.pathname === "/api/create-payment" && req.method === "POST") {
      const idToken = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
      const user = await verifyFirebaseToken(idToken, env);
      if (!user) return json({ error: "unauthorized" }, 401, h);
      if (!user.email) return json({ error: "missing_email" }, 400, h);

      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      const plan = String(b.plan || "");
      if (!PLANS[plan]) return json({ error: "invalid_plan", plan }, 400, h);

      // 已是有效終身會員 → 不必再買
      const cur = await getEntitlement(env, user.uid);
      if (cur && cur.plan === "lifetime" && cur.status === "active") {
        return json({ error: "already_lifetime" }, 403, h);
      }

      const cfg = ecpayConfig(env);
      const info = PLANS[plan];
      const merchantTradeNo = generateMerchantTradeNo();

      // 預寫 pending 交易
      await env.DB.prepare(
        `INSERT INTO pay_txns (uid, type, plan, amount_twd, method, external_id, status, note, email_hash)
         VALUES (?1,'subscribe',?2,?3,'ecpay',?4,'pending','等待綠界扣款 callback',?5)`
      ).bind(user.uid, plan, info.price_twd, merchantTradeNo, await emailHash(user.email)).run();

      const params = {
        MerchantID: cfg.merchantId,
        MerchantTradeNo: merchantTradeNo,
        MerchantTradeDate: ecpayDateTimeTW(),
        PaymentType: "aio",
        TotalAmount: info.price_twd,
        TradeDesc: encodeURIComponent("StayTW Premium"),
        ItemName: `StayTW Premium ${info.display_name}`,
        ChoosePayment: "ALL",
        EncryptType: 1,
        ReturnURL: `${url.origin}/api/ecpay-callback`,        // server-to-server
        OrderResultURL: `${url.origin}/api/ecpay-return`,     // user POST → 302 account.html
        ClientBackURL: `${cfg.siteOrigin}/pricing.html`,
        CustomField1: user.uid,
        CustomField2: plan,
      };
      // 定期定額（訂閱）— lifetime 不設 Period*，綠界當一次性
      if (plan === "monthly" || plan === "yearly") {
        params.PeriodAmount = info.price_twd;
        params.PeriodType = info.period_type;
        params.Frequency = 1;
        params.ExecTimes = 99;
        params.PeriodReturnURL = `${url.origin}/api/ecpay-callback`;
      }
      params.CheckMacValue = await checkMacValue(params, cfg);

      return json({ endpoint: ecpayEndpoint(env), params, merchantTradeNo }, 200, h);
    }

    // ───────── 綠界 server-to-server callback ─────────
    if (url.pathname === "/api/ecpay-callback" && req.method === "POST") {
      const cfg = ecpayConfig(env);
      let body;
      try {
        const form = await req.formData();
        body = Object.fromEntries([...form.entries()].map(([k, v]) => [k, String(v)]));
      } catch { return new Response("0|BadBody", { status: 400 }); }

      if (!(await verifyCheckMacValue(body, cfg))) {
        return new Response("0|CheckMacValue Fail", { status: 400 });
      }
      const uid  = body.CustomField1 || "";
      const plan = body.CustomField2 || "";
      if (!uid || !PLANS[plan]) return new Response("0|Missing CustomField", { status: 400 });

      const merchantTradeNo = body.MerchantTradeNo || "";
      const tradeNo = body.TradeNo || "";
      const amount = Number(body.TradeAmt || body.Amount || body.PeriodAmount || PLANS[plan].price_twd);
      const rtnCode = String(body.RtnCode || "0");
      const rtnMsg = body.RtnMsg || "";
      const isSuccess = rtnCode === "1";

      const paymentType = String(body.PaymentType || "");
      const payType = /^Credit/i.test(paymentType) ? "credit"
        : /ATM/i.test(paymentType) ? "atm"
        : /CVS|BARCODE/i.test(paymentType) ? "cvs" : "credit";

      // 模擬付款防護：綠界後台「模擬付款通知」會用正式金鑰簽 RtnCode=1 但沒真扣款 → 不開通
      if (String(body.SimulatePaid || "0") === "1") {
        return new Response("1|OK", { status: 200 });
      }

      // 冪等：同一筆 TradeNo 已成功寫過就 skip
      const idem = tradeNo || merchantTradeNo;
      if (idem) {
        const dup = await env.DB.prepare(
          "SELECT id FROM pay_txns WHERE uid=?1 AND external_id=?2 AND status='success' LIMIT 1"
        ).bind(uid, idem).first();
        if (dup) return new Response("1|OK", { status: 200 });
      }

      const existing = await getEntitlement(env, uid);
      const isFirst = !existing || existing.status !== "active";

      if (isSuccess) {
        const info = PLANS[plan];
        const MAX_EXPIRES = plusDays(nowMs(), 365 * 5);   // 5 年上限，防 sandbox 累積失控
        let expiresAt;
        if (plan === "lifetime") {
          expiresAt = plusDays(nowMs(), info.period_days);
        } else if (existing && Number(existing.expires_at) > nowMs()) {
          expiresAt = Math.min(plusDays(Number(existing.expires_at), info.period_days), MAX_EXPIRES);
        } else {
          expiresAt = plusDays(nowMs(), info.period_days);
        }
        const willRenew = plan !== "lifetime" && payType === "credit" ? 1 : 0;
        const startedAt = existing?.started_at || nowMs();

        try {
          await env.DB.prepare(
            `INSERT INTO entitlements (uid, email_hash, plan, status, expires_at, will_renew, pay_type, ecpay_order, source, started_at, updated_at)
             VALUES (?1,?2,?3,'active',?4,?5,?6,?7,'web',?8,?9)
             ON CONFLICT(uid) DO UPDATE SET
               plan=?3, status='active', expires_at=?4, will_renew=?5, pay_type=?6,
               ecpay_order=?7, updated_at=?9`
          ).bind(uid, await emailHash(body.CustomField3 || ""), plan, expiresAt, willRenew,
                 payType, merchantTradeNo, startedAt, nowMs()).run();
        } catch (e) {
          // 錢已收但開通失敗 → 記到 pay_failures，回 500 讓綠界重試
          await env.DB.prepare(
            `INSERT INTO pay_failures (uid, plan, merchant_trade_no, trade_no, amount_twd, reason, error)
             VALUES (?1,?2,?3,?4,?5,'entitlement_write_failed',?6)`
          ).bind(uid, plan, merchantTradeNo, tradeNo, amount, String(e)).run().catch(() => {});
          return new Response("0|Entitlement Write Failed", { status: 500 });
        }

        await env.DB.prepare(
          `INSERT INTO pay_txns (uid, type, plan, amount_twd, method, pay_type, external_id, status, note)
           VALUES (?1,?2,?3,?4,'ecpay',?5,?6,'success',?7)`
        ).bind(uid, isFirst ? "subscribe" : "renew", plan, amount, payType, idem, rtnMsg).run();
      } else {
        await env.DB.prepare(
          `INSERT INTO pay_txns (uid, type, plan, amount_twd, method, external_id, status, note)
           VALUES (?1,'fail',?2,?3,'ecpay',?4,'failed',?5)`
        ).bind(uid, plan, amount, idem, `RtnCode=${rtnCode} ${rtnMsg}`).run();
      }
      return new Response("1|OK", { status: 200 });
    }

    // ───────── 綠界 OrderResultURL（user POST → 302）─────────
    if (url.pathname === "/api/ecpay-return") {
      const cfg = ecpayConfig(env);
      return Response.redirect(`${cfg.siteOrigin}/account.html?from=ecpay`, 302);
    }

    // ───────── 查會員狀態（登入即開試用）─────────
    if (url.pathname === "/api/entitlement" && req.method === "GET") {
      const idToken = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
      const user = await verifyFirebaseToken(idToken, env);
      if (!user) return json({ error: "unauthorized" }, 401, h);
      await ensureTrial(env, user.uid, user.email);
      const ent = await getEntitlement(env, user.uid);
      const access = resolveAccess(ent);
      return json({
        access,                                   // premium / trial / taste
        fullAccess: access === "premium" || access === "trial",
        plan: ent?.plan || null,
        status: ent?.status || null,
        expiresAt: ent?.expires_at || null,
        trialEndsAt: ent?.status === "trialing" ? ent?.expires_at : null,
        willRenew: !!(ent?.will_renew),
        source: ent?.source || null,
      }, 200, h);
    }

    // ───────── 取消定期定額 ─────────
    if (url.pathname === "/api/cancel-subscription" && req.method === "POST") {
      const idToken = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
      const user = await verifyFirebaseToken(idToken, env);
      if (!user) return json({ error: "unauthorized" }, 401, h);
      const ent = await getEntitlement(env, user.uid);
      if (!ent || !ent.will_renew || !ent.ecpay_order) {
        return json({ error: "no_active_subscription" }, 400, h);
      }
      const cfg = ecpayConfig(env);
      // 綠界定期定額停止：PeriodAction Action=CancelRevoke（用 MerchantTradeNo）
      const p = {
        MerchantID: cfg.merchantId,
        MerchantTradeNo: ent.ecpay_order,
        Action: "CancelRevoke",
        TimeStamp: Math.floor(nowMs() / 1000),
      };
      p.CheckMacValue = await checkMacValue(p, cfg);
      let ok = false;
      try {
        const r = await fetch(ecpayPeriodActionEndpoint(env), {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(p).toString(),
        });
        const txt = await r.text();
        ok = /1\|/.test(txt) || /success/i.test(txt);
      } catch { /* 綠界端可能已停 */ }
      // 本地照樣關續扣旗標（到期日保留，用戶用到期為止）
      await env.DB.prepare("UPDATE entitlements SET will_renew=0, status='cancelled', updated_at=?2 WHERE uid=?1")
        .bind(user.uid, nowMs()).run();
      return json({ ok: true, ecpay_ok: ok }, 200, h);
    }

    // ───────── RevenueCat webhook（iOS）─────────
    if (url.pathname === "/api/rc-webhook" && req.method === "POST") {
      const auth = req.headers.get("Authorization") || "";
      if (auth !== `Bearer ${env.RC_WEBHOOK_SECRET}`) return json({ error: "unauthorized" }, 401);
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400); }
      const e = b.event || {};
      await env.DB.prepare(
        `INSERT OR IGNORE INTO rc_events
         (event_id, event_type, product_id, price, price_in_purchased_currency, currency, country, environment, app_user_id, raw)
         VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10)`
      ).bind(e.id || crypto.randomUUID(), e.type || "", e.product_id || "",
             e.price ?? null, e.price_in_purchased_currency ?? null,
             e.currency || "", e.country_code || "", e.environment || "",
             e.app_user_id || "", JSON.stringify(b).slice(0, 50000)).run();
      return json({ ok: true });
    }

    // ───────── 後台（Bearer ADMIN_TOKEN）─────────
    if (url.pathname.startsWith("/api/admin/")) {
      const auth = req.headers.get("Authorization") || "";
      if (auth !== `Bearer ${env.ADMIN_TOKEN}`) return json({ error: "unauthorized" }, 401, h);

      if (url.pathname === "/api/admin/summary") {
        const [rev, byProduct, last30, fbCount, web] = await Promise.all([
          env.DB.prepare(`SELECT COUNT(*) n, ROUND(SUM(price),2) usd FROM rc_events
                          WHERE environment='PRODUCTION' AND event_type IN ('INITIAL_PURCHASE','RENEWAL','NON_RENEWING_PURCHASE','UNCANCELLATION')`).first(),
          env.DB.prepare(`SELECT product_id, COUNT(*) n, ROUND(SUM(price),2) usd FROM rc_events
                          WHERE environment='PRODUCTION' AND event_type IN ('INITIAL_PURCHASE','RENEWAL','NON_RENEWING_PURCHASE')
                          GROUP BY product_id ORDER BY usd DESC`).all(),
          env.DB.prepare(`SELECT date(ts) d, COUNT(*) n, ROUND(SUM(price),2) usd FROM rc_events
                          WHERE environment='PRODUCTION' AND ts > datetime('now','-30 days')
                            AND event_type IN ('INITIAL_PURCHASE','RENEWAL','NON_RENEWING_PURCHASE')
                          GROUP BY date(ts) ORDER BY d DESC`).all(),
          env.DB.prepare(`SELECT COUNT(*) n FROM feedback`).first(),
          env.DB.prepare(`SELECT plan, COUNT(*) n, ROUND(SUM(amount_twd),0) twd FROM pay_txns
                          WHERE method='ecpay' AND status='success' GROUP BY plan ORDER BY twd DESC`).all(),
        ]);
        return json({ revenue: rev, byProduct: byProduct.results, last30: last30.results,
                      feedbackCount: fbCount.n, webEcpay: web.results }, 200, h);
      }
      if (url.pathname === "/api/admin/events") {
        const r = await env.DB.prepare(
          `SELECT ts, event_type, product_id, price, price_in_purchased_currency, currency, country, environment, app_user_id
           FROM rc_events ORDER BY id DESC LIMIT 200`).all();
        return json(r.results, 200, h);
      }
      if (url.pathname === "/api/admin/web-txns") {
        const r = await env.DB.prepare(
          `SELECT ts, uid, type, plan, amount_twd, pay_type, external_id, status, note
           FROM pay_txns ORDER BY id DESC LIMIT 200`).all();
        return json(r.results, 200, h);
      }
      if (url.pathname === "/api/admin/feedback") {
        const r = await env.DB.prepare(
          `SELECT id, ts, type, message, email, lang FROM feedback ORDER BY id DESC LIMIT 200`).all();
        return json(r.results, 200, h);
      }
      return json({ error: "not found" }, 404, h);
    }

    return json({ error: "not found" }, 404, h);
  },
};
