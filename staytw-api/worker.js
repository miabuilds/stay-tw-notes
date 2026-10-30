// StayTW API — Cloudflare Worker + D1
// - POST /api/feedback      使用者回饋（公開，蜜罐防機器人）
// - POST /api/rc-webhook    RevenueCat webhook（Authorization: Bearer RC_WEBHOOK_SECRET）
// - GET  /api/admin/*       後台資料（Authorization: Bearer ADMIN_TOKEN）
// Secrets: ADMIN_TOKEN, RC_WEBHOOK_SECRET（wrangler secret put）
const ALLOW_ORIGINS = ["https://staytw.pages.dev", "https://miabuilds.github.io", "http://localhost:8471"];

function cors(req) {
  const o = req.headers.get("Origin") || "";
  const ok = ALLOW_ORIGINS.includes(o);   // 精確比對（startsWith だと staytw.pages.dev.evil.com が通ってしまう）
  return {
    "Access-Control-Allow-Origin": ok ? o : ALLOW_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  };
}
const json = (data, status, extra) =>
  new Response(JSON.stringify(data), { status: status || 200, headers: { "Content-Type": "application/json", ...extra } });

// ───────────────────── 認証ヘルパー ─────────────────────
const nowMs = () => Date.now();
const nowSec = () => Math.floor(Date.now() / 1000);
const TE = new TextEncoder();

function b64urlToBytes(s) {
  s = String(s).replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  const bin = atob(s + pad);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}
function bytesToB64url(bytes) {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
const decodeJwtPart = (p) => JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));

// Apple / Google の ID トークン（RS256 OIDC JWT）を検証：kid で JWKS を引き、署名＋iss/aud/exp を確認
async function verifyOidcJwt(token, jwksUrl, issuers, audience) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) return null;
  let header, payload;
  try { header = decodeJwtPart(parts[0]); payload = decodeJwtPart(parts[1]); } catch { return null; }
  if (header.alg !== "RS256") return null;
  if (!issuers.includes(payload.iss)) return null;
  // audience は文字列 or 配列（複数の許容 client id）。Android/iOS/Web で aud が異なるため配列対応。
  if (Array.isArray(audience) ? !audience.includes(payload.aud) : payload.aud !== audience) return null;
  if (!payload.exp || payload.exp < nowSec() - 60) return null;
  let jwks;
  try { jwks = await (await fetch(jwksUrl, { cf: { cacheTtl: 3600 } })).json(); } catch { return null; }
  const jwk = (jwks.keys || []).find(k => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlToBytes(parts[2]), TE.encode(parts[0] + "." + parts[1]));
  return ok ? payload : null;
}

// StayTW 自前の session トークン（HS256、SESSION_SECRET で署名）
async function hmacKey(secret) {
  return crypto.subtle.importKey("raw", TE.encode(secret || "dev"), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
async function signSession(uid, secret) {
  const head = bytesToB64url(TE.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = bytesToB64url(TE.encode(JSON.stringify({ uid, iat: nowSec(), exp: nowSec() + 90 * 86400 })));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(secret), TE.encode(head + "." + body)));
  return `${head}.${body}.${bytesToB64url(sig)}`;
}
async function verifySession(token, secret) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) return null;
  const ok = await crypto.subtle.verify("HMAC", await hmacKey(secret), b64urlToBytes(parts[2]), TE.encode(parts[0] + "." + parts[1]));
  if (!ok) return null;
  let payload; try { payload = decodeJwtPart(parts[1]); } catch { return null; }
  if (!payload.exp || payload.exp < nowSec()) return null;
  return payload.uid || null;
}

// サーバー側の Premium 判定(AI 會話の場数用)。クライアントの「stw_premium」は信用しない。
//   ・推薦で付いた entitlements
//   ・RevenueCat の正式取引:この uid(または aliases にこの uid を含む)の、まだ期限内の購入/更新、または買い切り。返金されていれば無効
async function serverPremium(env, uid) {
  if (!uid) return false;
  try {
    // 白名單(管理者)。App の paywall.js の WHITELIST_HASHES と同じ人。購入記録が無いので ここで先に認める
    const au = await env.DB.prepare("SELECT email FROM auth_users WHERE uid=?1").bind(uid).first();
    if (au && au.email && ADMIN_EMAILS.includes(String(au.email).toLowerCase())) return true;
    const ent = await env.DB.prepare("SELECT status, expires_at FROM entitlements WHERE uid=?1").bind(uid).first();
    if (ent && ent.status === "active" && (ent.expires_at || 0) > nowMs()) return true;
    const rows = (await env.DB.prepare(
      `SELECT event_type t, COALESCE(json_extract(raw,'$.event.expiration_at_ms'),json_extract(raw,'$.expiration_at_ms')) ems,
              COALESCE(json_extract(raw,'$.event.cancel_reason'),json_extract(raw,'$.cancel_reason')) cr
       FROM rc_events WHERE environment='PRODUCTION' AND (app_user_id=?1 OR raw LIKE ?2) ORDER BY id`)
      .bind(uid, '%"' + uid + '"%').all()).results || [];
    let exp = 0, life = false, refunded = false;
    for (const r of rows) {
      if (r.t === "NON_RENEWING_PURCHASE") life = true;
      if (["INITIAL_PURCHASE", "RENEWAL", "UNCANCELLATION", "PRODUCT_CHANGE"].includes(r.t) && r.ems) { exp = Math.max(exp, Number(r.ems)); refunded = false; }
      if (r.t === "CANCELLATION" && r.cr === "CUSTOMER_SUPPORT") refunded = true;
    }
    return !refunded && (life || exp > nowMs());
  } catch (e) { return false; }
}
const CHAT_LIMIT = { free: 1, premium: 5 };   // 1 日の AI 會話の場数(StayJP と同じ)。AI の挨拶は数えず、自分が 1 句送った時点で 1 場
// 管理者(ADMIN_EMAILS)は AI 會話の場数無制限(Mia 2026-10-16:自分でテストすると 5 場で詰まる)
async function isAdminUid(env, uid) {
  if (!uid) return false;
  try { const au = await env.DB.prepare("SELECT email FROM auth_users WHERE uid=?1").bind(uid).first();
        return !!(au && au.email && ADMIN_EMAILS.includes(String(au.email).toLowerCase())); } catch (e) { return false; }
}

// Google 網頁ログイン用（後台・Web）。iOS は env.GOOGLE_IOS_CLIENT_ID、Web はこの公開 client id。
const YT_KEY = "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w";   // youtube.com 前端寫死的公開 key(非機密)
// 字幕軌回應:帶了 fmt=json3 也常回 XML(timedtext format=3),兩種都解。
function parseCaptionBody(body) {
  const out = [];
  const push = (t, d, text) => {
    text = String(text || "").replace(/\n/g, " ").trim();
    if (text && !/^[\[（(♪♫「」\]）)\s]*$/.test(text)) out.push({ t, d, z: text });
  };
  const unesc = (x) => x.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  if (body.trim().startsWith("{")) {
    const j = JSON.parse(body);
    for (const ev of j.events || []) {
      if (!ev.segs) continue;
      push(ev.tStartMs || 0, ev.dDurationMs || 0, ev.segs.map((x) => x.utf8 || "").join(""));
    }
  } else {
    const re = /<p\b([^>]*)>([\s\S]*?)<\/p>/g; let m;
    while ((m = re.exec(body))) {
      const a = m[1];
      push(+((a.match(/\bt="(\d+)"/) || [])[1] || 0), +((a.match(/\bd="(\d+)"/) || [])[1] || 0), unesc(m[2].replace(/<[^>]+>/g, "")));
    }
  }
  return out;
}

const GOOGLE_WEB_CLIENT_ID = "949214636130-e2dl3h0t1l789fggve3vsd6pu670lnb1.apps.googleusercontent.com";
const ADMIN_EMAILS = ["abc83327@gmail.com"];
async function verifyGoogleWeb(token) {
  return verifyOidcJwt(token, "https://www.googleapis.com/oauth2/v3/certs",
    ["accounts.google.com", "https://accounts.google.com"], GOOGLE_WEB_CLIENT_ID);
}

// ───────────────────── KOL 推廣碼(六站共用一組碼)─────────────────────
// 碼的正本在 StayHQ 的 partners 表 → 一律透過 service binding 問總部,本站不存碼。
// 買家拿到的價格:網頁走 staypay(webpay.js 讀 localStorage staypay_ref)、App 改賣 yearly_ref / lifetime_ref 商品。
// 分潤:照 StayKR,只算買家「首筆真實付款」(試用 0 元、一般續訂都不算),只算 PRODUCTION。
//   算好的毛額/淨額 POST 給 HQ /api/ingest/attribution,HQ 依該碼抽成算佣金(ext_id 防重)。
//   本站 kol_sales 記一買家一筆(防重);退款時拿同一筆金額回沖(event_type "refund"、負數)。
// 歸因來源:① RevenueCat subscriber attribute ref_code(App 從網頁 REF_CODE 橋接寫進去,匿名購買也有)
//           ② ref_attrib(有登入的帳號綁過碼)
const REF_FX = 31.6;            // 非台幣訂單用 RC 美金價換台幣(= 總部 settings 預設 fx_usd_twd)
const REF_STORE_FEE = 0.15, REF_RC_FEE = 0.01;   // 淨額估算同總部:(毛額 − 稅) × (1 − 15%) − 毛額 × 1%
const normRefCode = (c) => String(c || "").toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 24);
const okRefCode = (c) => /^[A-Z0-9_-]{3,24}$/.test(c);
const _partnerCache = new Map();   // code → { at, v }(isolate 內 5 分鐘)

async function hqPartner(env, raw) {
  const code = normRefCode(raw);
  if (!okRefCode(code) || !env.HQ) return null;
  const c = _partnerCache.get(code);
  if (c && Date.now() - c.at < 300000) return c.v;
  try {
    const r = await env.HQ.fetch("https://hq/api/partner/validate?code=" + encodeURIComponent(code) + "&product=staytw");
    const j = r.ok ? await r.json() : null;
    const v = j && j.ok ? { code: j.code, name: j.name || "", rate_pct: j.rate_pct } : null;
    _partnerCache.set(code, { at: Date.now(), v });
    return v;
  } catch (e) { return null; }
}

async function refIpHash(req, env) {
  const ip = req.headers.get("CF-Connecting-IP") || "";
  if (!ip) return "";
  const d = await crypto.subtle.digest("SHA-256", TE.encode("stw-ref:" + (env.SESSION_SECRET || "") + ":" + ip));
  return bytesToB64url(new Uint8Array(d)).slice(0, 22);
}

async function hqAttribution(env, body) {
  if (!env.HQ || !env.HQ_TOKEN) throw new Error("HQ binding/token missing");
  const r = await env.HQ.fetch("https://hq/api/ingest/attribution", {
    method: "POST",
    headers: { Authorization: "Bearer " + env.HQ_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify({ product: "staytw", ...body }),
  });
  if (!r.ok) throw new Error("HQ attribution " + r.status + " " + (await r.text()).slice(0, 200));
}

// RevenueCat webhook 每筆事件呼叫。HQ 連不上會 throw → webhook 回 500 讓 RC 重送(兩邊都防重,重送安全)
async function kolOnRcEvent(env, e) {
  if (!e || e.environment !== "PRODUCTION") return;
  const ids = [...new Set([e.app_user_id, e.original_app_user_id, ...(e.aliases || [])].filter(Boolean).map(String))];
  if (!ids.length) return;
  const qs = ids.map((_, i) => "?" + (i + 1)).join(",");
  // 退款:RevenueCat 記成 CANCELLATION(cancel_reason=CUSTOMER_SUPPORT)→ 把那筆分潤回沖
  if (e.type === "CANCELLATION" && /CUSTOMER_SUPPORT|REFUND/i.test(String(e.cancel_reason || ""))) {
    const s = await env.DB.prepare(`SELECT * FROM kol_sales WHERE buyer IN (${qs}) AND state='paid' LIMIT 1`).bind(...ids).first();
    if (!s) return;
    await hqAttribution(env, { code: s.code, event_type: "refund", gross_twd: -s.gross_twd, net_twd: -s.net_twd,
      buyer_ref: "…" + String(s.buyer).slice(-6), ext_id: "refund:" + s.ext_id });
    await env.DB.prepare("UPDATE kol_sales SET state='refund', refunded_at=?2 WHERE id=?1").bind(s.id, nowMs()).run();
    return;
  }
  const firstPay = (e.type === "INITIAL_PURCHASE" && e.period_type !== "TRIAL")
    || e.type === "NON_RENEWING_PURCHASE"
    || (e.type === "RENEWAL" && e.is_trial_conversion === true);
  if (!firstPay) return;
  const lp = Number(e.price_in_purchased_currency || 0), usd = Number(e.price || 0);
  const gross = Math.round(e.currency === "TWD" && lp > 0 ? lp : usd * REF_FX);
  if (!(gross > 0)) return;
  let code = normRefCode(e.subscriber_attributes && e.subscriber_attributes.ref_code && e.subscriber_attributes.ref_code.value);
  if (!okRefCode(code)) {
    const r = await env.DB.prepare(`SELECT code FROM ref_attrib WHERE uid IN (${qs}) ORDER BY at LIMIT 1`).bind(...ids).first();
    code = r ? r.code : "";
  }
  if (!okRefCode(code)) return;
  const kol = await hqPartner(env, code);
  if (!kol) return;
  // 一買家(含別名)只算首筆
  const had = await env.DB.prepare(`SELECT id FROM kol_sales WHERE buyer IN (${qs}) LIMIT 1`).bind(...ids).first();
  if (had) return;
  const tax = gross * (Number(e.tax_percentage) || 0);
  const net = Math.round(((gross - tax) * (1 - REF_STORE_FEE) - gross * REF_RC_FEE) * 100) / 100;
  const buyer = e.app_user_id || ids[0];
  const ext = String(e.transaction_id || e.original_transaction_id || e.id || "");
  await hqAttribution(env, { code: kol.code, event_type: "paid", gross_twd: gross, net_twd: net,
    buyer_ref: "…" + String(buyer).slice(-6), ext_id: ext || null });
  await env.DB.prepare(
    `INSERT OR IGNORE INTO kol_sales (id, code, buyer, product, store, gross_twd, net_twd, ext_id, state, at)
     VALUES (?1,?2,?3,?4,?5,?6,?7,?8,'paid',?9)`
  ).bind(kol.code + "_" + buyer, kol.code, buyer, e.product_id || "", e.store || "", gross, net, ext, Number(e.purchased_at_ms) || nowMs()).run();
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const h = cors(req);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });

    // ---------- 使用者回饋 ----------
    if (url.pathname === "/api/feedback" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      if (b.website) return json({ ok: true }, 200, h);                    // 蜜罐：機器人填了就默默丟掉
      const msg = String(b.message || "").trim().slice(0, 3000);
      if (msg.length < 5) return json({ error: "message too short" }, 400, h);
      const email = String(b.email || "").trim().slice(0, 200);   // email 必須：ログイン中は自動付与、匿名は入力必須
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "email required" }, 400, h);
      const type = ["bug", "content", "feature", "other"].includes(b.type) ? b.type : "other";
      // 限流：1 IP 1 日 15 件まで（それ以上は静かに破棄＝スパム防止、正規ユーザーには成功に見せる）
      const fip = req.headers.get("CF-Connecting-IP") || "unknown", fday = new Date().toISOString().slice(0, 10);
      const fkey = fip + ":fb:" + fday;
      const frow = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(fkey).first();
      if (frow && frow.count >= 15) return json({ ok: true }, 200, h);
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(fkey, fday).run();
      // Apple の非公開メールには返信が届かない。別に「返信用」を任意でもらう(StayJP と同じ形)。
      const contact = String(b.contact_email || "").trim().slice(0, 200);
      const contactOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact) ? contact : "";
      await env.DB.prepare(
        "INSERT INTO feedback (type, message, email, contact_email, lang, ua) VALUES (?1, ?2, ?3, ?4, ?5, ?6)"
      ).bind(type, msg, email, contactOk, String(b.lang || "").slice(0, 8),
             (req.headers.get("User-Agent") || "").slice(0, 300)).run();
      return json({ ok: true }, 200, h);
    }

    // ---------- 流量計數（公開ビーコン。JS を実行する実ブラウザのみ＝bot 除外）----------
    // ---------- AI 會話:今日の残り場数 ----------
    if (url.pathname === "/api/chat-quota") {
      const uid = await verifySession((req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, ""), env.SESSION_SECRET);
      const ip = req.headers.get("CF-Connecting-IP") || "unknown";
      const who = uid ? "u:" + uid : "ip:" + ip, day = new Date().toISOString().slice(0, 10);
      const premium = await serverPremium(env, uid);
      const row = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind("ses:" + who + ":" + day).first();
      const limit = (await isAdminUid(env, uid)) ? 9999 : premium ? CHAT_LIMIT.premium : CHAT_LIMIT.free, used = (row && row.count) || 0;
      return json({ premium, loggedIn: !!uid, limit, used, left: Math.max(0, limit - used) }, 200, h);
    }

    // ---------- AI 情境対話（台湾華語）Claude Haiku ----------
    if (url.pathname === "/api/speak-chat" && req.method === "POST") {
      const ip = req.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0, 10);
      const qkey = ip + ":" + day, DAILY = 150;   // 濫用防止：1 IP 1 日。本当の上限は場数(CHAT_LIMIT)。Premium 5 場×(開場+10 輪+講評)≒60 なので 40 だと足りない
      const row = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(qkey).first();
      if (row && row.count >= DAILY) return json({ error: "quota", message: "本日の無料枠を使い切りました" }, 429, h);
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(qkey, day).run();

      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      if (!env.ANTHROPIC_API_KEY) return json({ error: "ai_not_configured" }, 501, h);
      const LANGS = { ja: "Japanese", en: "English", ko: "Korean", vi: "Vietnamese", id: "Indonesian" };
      const lang = LANGS[b.lang] ? b.lang : "ja";
      const langName = LANGS[lang];
      // 母語で書いた一文 → 台湾華語に(会話で詰まった時の助け舟。StayJP の toJa と同じ考え)
      if (b.mode === "toZh") {
        const text = String(b.text || "").trim().slice(0, 200);
        if (!text) return json({ error: "empty" }, 400, h);
        const sysZ = `Convert the learner's sentence (written in ${langName} or mixed) into ONE natural spoken Taiwan Mandarin line, Traditional characters, Taiwan usage. LANGUAGE RULE: Taiwan Mandarin (台灣華語) ONLY. NOT Taiwanese Hokkien (台語/閩南語: no 呷、嘸、毋、袂、佇、恁、攏、哩賀、今日有呷飯沒). NOT Mainland China Mandarin (no simplified characters, no 儿化, no mainland words: 地鐵→捷運, 出租車/打車→計程車/叫車, 視頻→影片, 質量→品質, 信息→訊息, 軟件→軟體, 土豆→馬鈴薯, 網絡→網路, 打印→列印, 早上好/上午好→早安, 下午好→午安/你好, 晚上好→晚安/你好, 搞定→弄好, 靠譜→可靠). It is what the learner wants to say next in this role-play: ${String(b.scene || "").slice(0, 200)}. Output ONLY the Chinese line, nothing else.`;
        let rz;
        try {
          rz = await fetch("https://api.anthropic.com/v1/messages", { method: "POST",
            headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
            body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 120, system: sysZ, messages: [{ role: "user", content: text }] }) });
        } catch (e) { return json({ error: "ai_error" }, 502, h); }
        if (!rz.ok) return json({ error: "ai_error" }, 502, h);
        const dz = await rz.json();
        const zh = String((dz.content && dz.content[0] && dz.content[0].text) || "").trim().replace(/^["「]|["」]$/g, "").split("\n")[0];
        return json({ zh }, 200, h);
      }
      const scene = String(b.scene || "a casual chat").slice(0, 400);
      const userRole = String(b.userRole || "").slice(0, 120);
      const level = /^L[1-6]$/.test(String(b.level)) ? String(b.level) : "L2";
      // 級ごとの話し方。TOCFL の級に合わせて、文の長さと語彙を変える
      const LV_GUIDE = {
        L1: "Absolute beginner: very short sentences (under 10 characters), only the most basic words, slow and simple.",
        L2: "Beginner: short simple sentences, everyday basic vocabulary.",
        L3: "Lower intermediate: natural everyday sentences, common phrases, avoid rare words.",
        L4: "Intermediate: natural speed and phrasing, some common idioms and connectors.",
        L5: "Upper intermediate: fluent natural speech, richer vocabulary, occasional 成語 where natural.",
        L6: "Advanced: speak like a native Taiwan Mandarin speaker, natural Mandarin colloquialisms and nuance (still Mandarin only, no Hokkien).",
      };
      const history = Array.isArray(b.history) ? b.history.slice(-24) : [];

      // 場数:自分の発言が 1 つ以上ある会話(sid)を、その日の最初の 1 回だけ数える
      const uidC = await verifySession((req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, ""), env.SESSION_SECRET);
      const who = uidC ? "u:" + uidC : "ip:" + ip;
      const sid = String(b.sid || "").replace(/[^a-z0-9]/gi, "").slice(0, 32);
      const userTurns = history.filter(m => m && m.role !== "ai").length;
      if (userTurns > 10) return json({ error: "turns" }, 429, h);
      if (userTurns >= 1) {
        const mark = "sid:" + who + ":" + sid;
        const seen = sid && await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(mark).first();
        if (!seen) {
          const premium = await serverPremium(env, uidC);
          const limit = (await isAdminUid(env, uidC)) ? 9999 : premium ? CHAT_LIMIT.premium : CHAT_LIMIT.free;
          const skey = "ses:" + who + ":" + day;
          const srow = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(skey).first();
          if (srow && srow.count >= limit) return json({ error: "sessions", premium, loggedIn: !!uidC, limit }, 429, h);
          await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(skey, day).run();
          if (sid) await env.DB.prepare("INSERT OR IGNORE INTO chat_quota (key,count,day) VALUES (?1,1,?2)").bind(mark, day).run();
        }
      }

      const sys = `You are a warm, friendly person in Taiwan role-playing IN MANDARIN to help someone practice Taiwan Mandarin (華語/國語, the language of the TOCFL exam).
Scene: ${scene}. ${userRole ? "The learner plays: " + userRole + ". You play the other person." : "You are the learner's conversation partner."}
Rules:
- Speak ONLY in Taiwan Mandarin, TRADITIONAL characters, natural Taiwan usage (捷運 not 地鐵, 悠遊卡, no 儿化, 台灣讀法).
- LANGUAGE RULE: Taiwan Mandarin (台灣華語) ONLY. NOT Taiwanese Hokkien (台語/閩南語: no 呷、嘸、毋、袂、佇、恁、攏、哩賀、今日有呷飯沒). NOT Mainland China Mandarin (no simplified characters, no 儿化, no mainland words: 地鐵→捷運, 出租車/打車→計程車/叫車, 視頻→影片, 質量→品質, 信息→訊息, 軟件→軟體, 土豆→馬鈴薯, 網絡→網路, 打印→列印, 早上好/上午好→早安, 下午好→午安/你好, 晚上好→晚安/你好, 搞定→弄好, 靠譜→可靠).
- This is a MANDARIN app, NOT a Taiwanese Hokkien (台語/閩南語) app. NEVER use Hokkien words, Hokkien characters or Hokkien romanization — not even as local flavour, at any level. Wrong: 呷飽沒、今日有呷過飯沒、嘸、毋、袂、佇、恁、攏、歹勢啦、哩賀. Right: 吃飽了嗎？、今天吃過飯了嗎？、沒有、不、在、你們、都、不好意思. Use 今天 not 今日 in speech.${b.strict ? "\n- IMPORTANT: your previous attempt used Taiwanese Hokkien. Use ONLY standard Mandarin words this time." : ""}
- Each reply SHORT: 1-2 sentences, warm. Learner level TOCFL ${level} — ${LV_GUIDE[level]}
- Address the learner as 你 (never 妳 — you don't know their gender).
- Sound like a real person in Taiwan talking, not a textbook. When you repeat back an order or request, rephrase it the way a Taiwanese vendor actually says it (泡菜多一點 → 「泡菜幫你多放一點」/「泡菜多給你一點喔」). NEVER invent cute reduplications or shorthand that people don't actually say (wrong: 泡菜多多、辣辣的多多、好好喔).
- STAY STRICTLY IN CHARACTER — respond exactly the way YOUR role really would in real life. A shop clerk STATES the price and confirms the order (e.g. 「總共三十五元」); a clerk NEVER asks the customer how much something costs. Play only your own side.
- Do NOT force a question into every reply. Only ask something when your role naturally would (a clerk may ask 甜度冰塊/內用外帶; otherwise just respond). It's fine to end without a question.
- Output EXACTLY these lines, in this order, nothing else (no markdown, no JSON):
REPLY: your line (Traditional Chinese)
PINYIN: Hanyu Pinyin of your reply with tone marks, exactly ONE syllable per Chinese character, separated by single spaces, no punctuation (e.g. 歡迎光臨！→ huān yíng guāng lín). Taiwan readings (和 hàn when it means "and", 垃圾 lè sè); neutral tone without a mark (謝謝 xiè xie)
TR: a ${langName} translation of your reply
HINT: a short natural sentence the LEARNER (playing ${userRole || "the learner"}) could actually SAY next — Traditional Chinese ONLY, a real spoken line, never stage directions or another language
HINT: a second, different option (if the conversation is wrapping up, a polite closing line such as 謝謝，再見！)
CORR: if the learner's LAST message has a clear mistake, one short gentle note IN ${langName} on how to fix it; otherwise leave it empty`;

      // 2026-10:過去の AI 発言を素の文で渡すと、数往復で AI がそれを真似て REPLY: などの行を落とす(画面は「通信エラー」)。
      // 過去の AI 発言にも REPLY: を付け、今回の返事は "REPLY:" から書かせる(prefill。Haiku 対応)
      const messages = history.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.role === "ai" ? ("REPLY: " + String(m.reply || m.text || "")) : String(m.text || "") })).filter(m => m.content && m.content !== "REPLY: ");
      if (!messages.length || messages[messages.length - 1].role !== "user") messages.push({ role: "user", content: "（在角色中用台灣華語跟我打招呼，開始這個情境）" });
      messages.push({ role: "assistant", content: "REPLY:" });

      // ストリーミング:Anthropic の SSE から文字だけ取り出して、そのまま流す。画面は REPLY 行から順に描ける
      let rc;
      try {
        rc = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
          body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 600, stream: true, system: [{ type: "text", text: sys, cache_control: { type: "ephemeral" } }], messages }),
        });
      } catch (e) { return json({ error: "ai_error" }, 502, h); }
      if (!rc.ok || !rc.body) { const t = await rc.text().catch(() => ""); return json({ error: "ai_error", detail: t.slice(0, 160) }, 502, h); }
      const { readable, writable } = new TransformStream();
      (async () => {
        const w = writable.getWriter(), rd = rc.body.getReader(), dec = new TextDecoder();
        let buf = "";
        try {
          await w.write(TE.encode("REPLY:"));   // prefill した分は返ってこないので自分で頭に付ける
          for (;;) {
            const { value, done } = await rd.read(); if (done) break;
            buf += dec.decode(value, { stream: true });
            let i;
            while ((i = buf.indexOf("\n")) >= 0) {
              const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
              if (!line.startsWith("data:")) continue;
              try { const ev = JSON.parse(line.slice(5)); if (ev.type === "content_block_delta" && ev.delta && ev.delta.text) await w.write(TE.encode(ev.delta.text)); } catch (e) {}
            }
          }
        } catch (e) {} finally { try { await w.close(); } catch (e) {} }
      })();
      return new Response(readable, { status: 200, headers: { ...h, "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
    }

    // 「我的單字本」で辞書に無い語を引く。注音はあくまで補助:
    // クライアント側で 1 文字ずつサイト辞書(教育部で検証済み)から組み直せる場合はそちらを優先し、
    // AI のままの読みには画面で印を付ける。推測の読みを検証済みと同じ顔で出さない。
    if (url.pathname === "/api/word-lookup" && req.method === "POST") {
      const ip = req.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0, 10);
      const qkey = "wl:" + ip + ":" + day, DAILY = 30;
      const row = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(qkey).first();
      if (row && row.count >= DAILY) return json({ error: "quota" }, 429, h);
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(qkey, day).run();

      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      if (!env.ANTHROPIC_API_KEY) return json({ error: "ai_not_configured" }, 501, h);
      const word = String(b.word || "").trim().slice(0, 20);
      if (!word) return json({ error: "empty" }, 400, h);

      const sys = `You look up a Taiwan Mandarin word for a learner's personal word list.
Readings MUST follow Taiwan's 教育部《重編國語辭典修訂本》 (Taiwan readings, NOT mainland). Traditional characters only.
Reply with a SINGLE valid JSON object, no markdown fences, keys:
 "w": the word in traditional characters,
 "zy": 注音 with one space between syllables (e.g. "ㄗㄠˇ ㄕㄤˋ"), neutral tone written as ˙ㄅㄚ,
 "py": pinyin with tone marks, space between syllables,
 "c": part of speech in Chinese, one short word (名/動/形/副/代/量/助),
 "ja","en","ko","vi","id": the meaning in each language, short,
 "ex": { "z": one natural Taiwan sentence using the word, "py": its pinyin, "ja","en","ko","vi","id": translations }.
If the input is not a real Chinese word, set "w" to "" and leave the rest empty.`;

      let rc;
      try {
        rc = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
          body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 700, system: sys, messages: [{ role: "user", content: word }] }),
        });
      } catch (e) { return json({ error: "ai_error" }, 502, h); }
      if (!rc.ok) return json({ error: "ai_error" }, 502, h);
      const data = await rc.json();
      const text = (data.content && data.content[0] && data.content[0].text) || "";
      let out;
      try { const a = text.indexOf("{"), z = text.lastIndexOf("}"); out = JSON.parse(text.slice(a, z + 1)); }
      catch (e) { return json({ error: "parse" }, 502, h); }
      if (!out || !out.w) return json({ error: "notfound" }, 404, h);
      return json(out, 200, h);
    }

    if (url.pathname === "/api/speak-review" && req.method === "POST") {
      // 對話結束點評:評學習者的台灣華語表現，回 {score,good,improve,tip,encourage}
      const ip = req.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0, 10);
      const qkey = ip + ":" + day, DAILY = 150;
      const row = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(qkey).first();
      if (row && row.count >= DAILY) return json({ error: "quota" }, 429, h);
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(qkey, day).run();

      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      if (!env.ANTHROPIC_API_KEY) return json({ error: "ai_not_configured" }, 501, h);
      const RLANGS = { ja: "Japanese", en: "English", ko: "Korean", vi: "Vietnamese", id: "Indonesian" };
      const lang = RLANGS[b.lang] ? b.lang : "ja";
      const langName = RLANGS[lang];
      const scene = String(b.scene || "").slice(0, 400);
      const history = Array.isArray(b.history) ? b.history.slice(-24) : [];
      const convo = history.map(m => (m.role === "me" ? "LEARNER: " : "PARTNER: ") + String(m.text || "").slice(0, 300)).join("\n");

      const sys = `You are a warm, encouraging Taiwan Mandarin tutor. A learner just finished a role-play conversation.
Scene: ${scene}
Evaluate ONLY the LEARNER's lines (Taiwan Mandarin) — grammar, word choice, natural Taiwan usage, and whether they carried the task. Be kind but honest; this is a short practice chat, not an exam.
Respond with a SINGLE valid JSON object only (no markdown), keys:
  "score": integer 0-100 (be generous for effort; a few short correct lines is ~70-85),
  "good": one short sentence in ${langName} naming something they did well (quote their Chinese if helpful, keep Chinese in Traditional characters),
  "improve": one short sentence in ${langName} on the single most useful thing to fix, with a corrected Traditional-Chinese example,
  "tip": one short practical ${langName} tip for next time,
  "encourage": one short warm ${langName} sentence of encouragement.`;

      let rc;
      try {
        rc = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
          body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 500, system: sys, messages: [{ role: "user", content: convo || "(no conversation)" }] }),
        });
      } catch (e) { return json({ error: "ai_error" }, 502, h); }
      if (!rc.ok) { const t = await rc.text().catch(() => ""); return json({ error: "ai_error", detail: t.slice(0, 160) }, 502, h); }
      const data = await rc.json();
      const text = (data.content && data.content[0] && data.content[0].text) || "";
      let out;
      try { const a = text.indexOf("{"), z = text.lastIndexOf("}"); out = JSON.parse(text.slice(a, z + 1)); }
      catch (e) { out = { score: null, good: "", improve: text, tip: "", encourage: "" }; }
      out.score = (out.score == null ? null : Math.max(0, Math.min(100, Number(out.score) || 0)));
      return json(out, 200, h);
    }

    // ライティング採点:お題+作文 → {score, good, improve, corrections[], tip, encourage}
    if (url.pathname === "/api/write-score" && req.method === "POST") {
      const ip = req.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0, 10);
      const qkey = ip + ":ws:" + day, DAILY = 30;
      const row = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(qkey).first();
      if (row && row.count >= DAILY) return json({ error: "quota" }, 429, h);
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(qkey, day).run();
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      if (!env.ANTHROPIC_API_KEY) return json({ error: "ai_not_configured" }, 501, h);
      const lang = ["ja", "en", "ko"].includes(b.lang) ? b.lang : "ja";
      const langName = { ja: "Japanese", en: "English", ko: "Korean" }[lang];
      const topic = String(b.topic || "").slice(0, 200);
      const task = String(b.task || "").slice(0, 400);
      const draft = String(b.draft || "").trim().slice(0, 2000);
      if (draft.length < 5) return json({ error: "too short" }, 400, h);
      const sys = `You are a warm but rigorous Taiwan Mandarin writing tutor grading a learner's short composition.
Topic: ${topic}
Task: ${task}
Grade the learner's writing (below) as **Taiwan Mandarin** (Traditional characters, Taiwan usage & phrasing). Judge grammar, word choice, naturalness for Taiwan, coherence, and whether it fulfils the task. Be encouraging but honest and specific.
Respond with a SINGLE valid JSON object only (no markdown), keys:
  "score": integer 0-100 (reward effort and communication; a coherent on-topic piece with minor errors is ~75-88),
  "good": one short sentence in ${langName} naming a genuine strength (you may quote their Traditional Chinese),
  "corrections": array (max 4) of the most useful fixes, each {"orig":"their exact Chinese phrase","fixed":"the natural Taiwan-Mandarin version in Traditional characters","why":"one very short ${langName} reason"}. Only include real errors or clearly unnatural phrasing; [] if the writing is already clean.
  "improve": one short ${langName} sentence on the single biggest thing to work on next,
  "tip": one short practical ${langName} writing tip,
  "encourage": one short warm ${langName} sentence.`;
      let rc;
      try {
        rc = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
          body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 800, system: sys, messages: [{ role: "user", content: draft }] }),
        });
      } catch (e) { return json({ error: "ai_error" }, 502, h); }
      if (!rc.ok) { const t = await rc.text().catch(() => ""); return json({ error: "ai_error", detail: t.slice(0, 160) }, 502, h); }
      const data = await rc.json();
      const text = (data.content && data.content[0] && data.content[0].text) || "";
      let out;
      try { const a = text.indexOf("{"), z = text.lastIndexOf("}"); out = JSON.parse(text.slice(a, z + 1)); }
      catch (e) { out = { score: null, good: "", corrections: [], improve: text, tip: "", encourage: "" }; }
      out.score = (out.score == null ? null : Math.max(0, Math.min(100, Number(out.score) || 0)));
      if (!Array.isArray(out.corrections)) out.corrections = [];
      return json(out, 200, h);
    }

    if (url.pathname === "/api/tts" && req.method === "POST") {
      // 自然人聲。優先 Azure（文章朗讀同款 zh-TW-HsiaoChenNeural），次 Google，皆無 → 501，前端退回瀏覽器音。
      const hasAzure = !!env.AZURE_SPEECH_KEY, hasGoogle = !!env.GOOGLE_TTS_KEY;
      if (!hasAzure && !hasGoogle) return json({ error: "tts_not_configured" }, 501, h);
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      const text = String(b.text || "").trim().slice(0, 240);
      if (!text) return json({ error: "no text" }, 400, h);
      const ip = req.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0, 10);
      const qkey = ip + ":tts:" + day, DAILY = 400;   // 濫用防止
      const row = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(qkey).first();
      if (row && row.count >= DAILY) return json({ error: "quota" }, 429, h);
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(qkey, day).run();
      // 破音字強制読み：呼び出し側が [{c:字, py:"dei3"}] を渡すと、その字を SSML phoneme で必ず正しく読む。
      // phoneme は Google の pinyin alphabet が確実なので、force があるときは Azure を飛ばして Google を使う。
      const wantForce = hasGoogle && Array.isArray(b.force) && b.force.some(f => f && f.c && f.py);
      // ElevenLabs 試用(2026-10 Mia):管理者だけ。AI 會話の声を Chihiro Yoko(台湾腔)で聞き比べる。
      // ElevenLabs は字音が大陸寄り(垃圾 lā・綜合 zōng)なので一般公開はまだ。失敗したら下の Azure に落ちる
      if (b.el && env.ELEVENLABS_API_KEY) {
        const euid = await verifySession((req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, ""), env.SESSION_SECRET);
        const eau = euid ? await env.DB.prepare("SELECT email FROM auth_users WHERE uid=?1").bind(euid).first() : null;
        if (eau && eau.email && ADMIN_EMAILS.includes(String(eau.email).toLowerCase())) {
          try {
            const er = await fetch("https://api.elevenlabs.io/v1/text-to-speech/NIqnuIdrAT3LLSSxN05L?output_format=mp3_44100_64", {
              method: "POST",
              headers: { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
              // 台湾の声でも捲舌・大陸発音が出る → v3 の指示タグで台湾腔に寄せる(Mia「不准有大陸腔」2026-10-16)
              body: JSON.stringify({ text: "[soft Taiwanese Mandarin accent, no retroflex] " + text, model_id: "eleven_v3", language_code: "zh" }),
            });
            if (er.ok) {
              const buf = new Uint8Array(await er.arrayBuffer());
              let bin = ""; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
              return json({ audio: btoa(bin), engine: "elevenlabs" }, 200, h);
            }
          } catch (e) {}
        }
      }
      try {
        // AI 會話は Google(cmn-TW-Wavenet、単語・例文の録音と同じ声)を使う。ユーザーがこちらの声を好んだ(2026-10)
        // 1 字ずつの読み指定(b.ph)は Azure でも Google でも使う。Azure が無い/失敗した時は Google で同じ指定を当てる
        let azureFailed = false;
        const SANDHI_CH = new Set(["一", "不"]);
        if (hasAzure && !wantForce && b.engine !== "google") {
          const region = env.AZURE_SPEECH_REGION || "japaneast";
          const AZ = { f: "zh-TW-HsiaoChenNeural", m: "zh-TW-YunJheNeural", f2: "zh-TW-HsiaoYuNeural" };
          const voice = AZ[b.voice] || AZ.f;
          const xesc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          // 話し方の調子(AI 會話用)。台湾華語の Azure 音声は 3 人だけで「スタイル」が無いので、速さと高さで調整する。
          // 決まった組み合わせしか受けない(任意の値を SSML に入れない)
          const TONES = { std: null, casual: { rate: "+8%", pitch: "+4%" }, lively: { rate: "+12%", pitch: "+7%" } };
          const tone = TONES[b.tone] || null;
          // 1 字ずつ読みを指定(b.ph = [{c:"好", ph:"hao 3"}] を文の頭から順に当てる)。alphabet は b.alpha(sapi / ups など)
          let body = xesc(text);
          if (Array.isArray(b.ph) && b.ph.length && /^(sapi|ups|x-microsoft-sapi)$/.test(String(b.alpha || "sapi"))) {
            const al = String(b.alpha || "sapi"); let out = "", k = 0;
            // 一/不 は変調(一起 yì・不對 bú・第一 yī)を Azure に任せる。一/不 本体だけでなく前後の字に phoneme があっても
            // Azure の変調が崩れる(第一課→yì、一個→yī、不對→bù。2026-10 ピッチで確認)ので、前後 1 字も指定しない
            // 軽声(˙ㄇㄜ)は指定しない。Azure 式「ㄇㄜ˙」でも句末が上がって不自然(什麼の麼、ユーザー指摘)。軽声は Azure 任せの方が正しい
            const chars = [...text];
            const near = i => SANDHI_CH.has(chars[i]) || SANDHI_CH.has(chars[i - 1]) || SANDHI_CH.has(chars[i + 1]);
            for (let i = 0; i < chars.length; i++) {
              const ch = chars[i], f = b.ph[k];
              if (f && f.c === ch && f.ph && !near(i) && !String(f.ph).includes("˙")) { const p = String(f.ph).slice(0, 20); out += `<phoneme alphabet='${al}' ph='${xesc(p)}'>${xesc(ch)}</phoneme>`; k++; }
              else { out += xesc(ch); if (f && f.c === ch) k++; }
            }
            body = out;
          }
          const inner = tone ? `<prosody rate='${tone.rate}' pitch='${tone.pitch}'>${body}</prosody>` : body;
          const ssml = `<speak version='1.0' xml:lang='zh-TW'><voice name='${voice}'>${inner}</voice></speak>`;
          const ar = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
            method: "POST",
            headers: { "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3", "User-Agent": "staytw-tts" },
            body: ssml,
          });
          if (ar.ok) {
            const buf = new Uint8Array(await ar.arrayBuffer());
            let bin = ""; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
            return json({ audio: btoa(bin), engine: "azure" }, 200, h);
          }
          // F0(無料)の回数制限や読み指定の書式エラーでも、声が出ないよりは Google で出す
          if (!hasGoogle) { const t = await ar.text().catch(() => ""); return json({ error: "tts_error", detail: ("azure " + ar.status + " " + t).slice(0, 200) }, 502, h); }
          azureFailed = true;
        }
        // Google fallback
        const VOICES = { f: "cmn-TW-Wavenet-A", m: "cmn-TW-Wavenet-C", f2: "cmn-TW-Wavenet-A" };
        const name = VOICES[b.voice] || VOICES.f;
        // 多音字修正（TTS 常唸錯的）。用 SSML phoneme 強制正確台灣讀音，只在特定詞情境套用。
        const gesc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const ph = (py) => (ch) => `<phoneme alphabet='pinyin' ph='${py}'>${ch}</phoneme>`;
        let ssmlText;
        const wantGoogleSeq = Array.isArray(b.ph) && b.ph.some(f => f && f.py);   // ここに来た=Google で読む。指定があれば当てる
        if (wantGoogleSeq) {
          // 文の頭から順に 1 字ずつ当てる(同じ字でも位置で読みが違う:一下 yi2 / 一起 yi4)
          let out = "", k = 0;
          for (const ch of text) {
            const f = b.ph[k];
            const py = f && f.c === ch && !SANDHI_CH.has(ch) ? String(f.py || "").replace(/[^a-z0-9]/gi, "") : "";
            if (f && f.c === ch) k++;
            out += py ? ph(py)(gesc(ch)) : gesc(ch);
          }
          ssmlText = out;
        } else if (wantForce) {
          // 呼び出し側が指定した読みを最優先（破音字練習：POLYPHONE の検証済み読音をそのまま強制）。
          ssmlText = gesc(text);
          for (const f of b.force) {
            if (!f || !f.c || !f.py) continue;
            const c = gesc(String(f.c)), py = String(f.py).replace(/[^a-z0-9]/gi, "");
            if (c && py) ssmlText = ssmlText.split(c).join(ph(py)(c));
          }
        } else {
        ssmlText = gesc(text)
          .replace(/少(?=[冰糖鹽油辣子放量])/g, ph("shao3")("少"))                 // 少冰/少糖/少子…=三聲
          .replace(/(?<=音|聲|管|弦)樂|樂(?=器|團|曲|譜)/g, ph("yue4")("樂"))         // 音樂/樂器…樂=yuè
          .replace(/重(?=複|新|來|逢|疊|播)/g, ph("chong2")("重"))                    // 重複/重新…重=chóng
          .replace(/(?<=退|歸|償|奉)還|還(?=錢|書|給|清)/g, ph("huan2")("還"))          // 退還/還錢…還=huán
          .replace(/種(?=田|植|菜|樹|花)/g, ph("zhong4")("種"))                        // 種田/種植…種=zhòng
          .replace(/中(?=獎|毒|風)/g, ph("zhong4")("中"))                              // 中獎/中毒…中=zhòng
          .replace(/(?<=愛|嗜)好|好(?=奇)/g, ph("hao4")("好"))                         // 愛好/好奇…好=hào
          .replace(/差(?=別|異|距)/g, ph("cha1")("差"))                              // 差別/差異…差=chā
          .replace(/(?<=出)差|差(?=事|遣)/g, ph("chai1")("差"))                        // 出差/差事…差=chāi
          .replace(/數(?=一數二|不清|不完|錢|落)|(?<=一)數(?=二)|(?<=屈指可|不計其|心裡有)數/g, ph("shu3")("數")) // 數一數二…數=shǔ
          .replace(/(?<=銀|內|外|商|車)行|行(?=業|列|情|號|家|話)/g, ph("hang2")("行"))   // 銀行/行業…行=háng
          .replace(/長(?=度|短|久|城|途|方|篇)|(?<=擅|專|冗|漫|波|身|全|特)長/g, ph("chang2")("長")) // 長度/擅長…長=cháng
          .replace(/傳(?=記)|(?<=自|列|外|小)傳/g, ph("zhuan4")("傳"))                   // 傳記/自傳…傳=zhuàn
          .replace(/曲(?=子|調|目|風)|(?<=歌|樂|作|序|舞|名|組|插|題)曲/g, ph("qu3")("曲")) // 歌曲/曲子…曲=qǔ
          .replace(/假(?=期|日)|(?<=放|請|寒|暑|休|度|例|病|事|年|補|銷)假/g, ph("jia4")("假")) // 放假/假期…假=jià
          .replace(/空(?=閒|檔|位|格|缺)|(?<=有|抽|填)空/g, ph("kong4")("空"))            // 有空/空閒…空=kòng
          .replace(/相(?=片|機|簿|貌)|(?<=照|長|亮)相/g, ph("xiang4")("相"))              // 照相/相片…相=xiàng
          .replace(/(?<=睡|午)覺/g, ph("jiao4")("覺"))                                  // 睡覺/午覺…覺=jiào
          .replace(/(?<=災|苦|患|罹|避|危)難|難(?=民)/g, ph("nan4")("難"))                // 災難/難民…難=nàn
          .replace(/便(?=宜)/g, ph("pian2")("便"))                                     // 便宜…便=pián
          .replace(/(?<=首)都|都(?=市)/g, ph("du1")("都"));                             // 首都/都市…都=dū
        }
        const tr = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize?key=" + env.GOOGLE_TTS_KEY, {
          method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ input: { ssml: "<speak>" + ssmlText + "</speak>" }, voice: { languageCode: "cmn-TW", name }, audioConfig: { audioEncoding: "MP3", speakingRate: 1.0, pitch: 0 } }),
        });
        const jd = await tr.json().catch(() => ({}));
        if (!tr.ok || !jd.audioContent) return json({ error: "tts_error", detail: JSON.stringify(jd).slice(0, 200) }, 502, h);
        return json({ engine: "google", audio: jd.audioContent }, 200, h);
      } catch (e) { return json({ error: "tts_error" }, 502, h); }
    }

    if (url.pathname === "/api/hit" && req.method === "POST") {
      // プレビュー(ytstest.*)からのアクセスは自分の動作確認なので数えない。
      // 混ざると「PC の割合」みたいな判断がそのまま狂う(実際 1 日ぶん汚した)。
      const from = req.headers.get("Referer") || req.headers.get("Origin") || "";
      if (/ytstest\./i.test(from)) return new Response(null, { status: 204, headers: h });
      let b; try { b = await req.json(); } catch { b = {}; }
      const path = String(b.path || "/").slice(0, 200);
      const ref = String(b.ref || "").slice(0, 300);
      const country = (req.cf && req.cf.country) || req.headers.get("CF-IPCountry") || "";
      const inApp = /STAYTW_NATIVE|ReactNative/i.test(String(b.ua || "")) || b.app ? "app" : "web";
      // 端末の内訳。web の何割が PC なのかが分からないと「web 決済を入れる価値があるか」を判断できない。
      const ua = req.headers.get("User-Agent") || "";
      const device = /android/i.test(ua) ? "android"
        : /iphone|ipad|ipod/i.test(ua) ? "ios"
        : /mobile/i.test(ua) ? "mobile-other" : "desktop";
      await env.DB.prepare("INSERT INTO hits (path, referrer, country, source, device) VALUES (?1,?2,?3,?4,?5)")
        .bind(path, ref, country, inApp, device).run();
      return new Response(null, { status: 204, headers: h });
    }

    // ---------- 原生登入（Apple/Google ID トークン → StayTW session）----------
    if (url.pathname === "/api/native-login" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      const provider = b.provider;
      let payload = null;
      if (provider === "apple") {
        payload = await verifyOidcJwt(b.token, "https://appleid.apple.com/auth/keys",
          ["https://appleid.apple.com"], "com.staytw.app");
      } else if (provider === "google") {
        // iOS は iosClientId、Android は google-signin の webClientId が aud になる。両方＋Web client を許容。
        const googleAuds = [env.GOOGLE_IOS_CLIENT_ID, env.GOOGLE_ANDROID_CLIENT_ID, GOOGLE_WEB_CLIENT_ID].filter(Boolean);
        if (!googleAuds.length) return json({ error: "google_not_configured" }, 501, h);
        payload = await verifyOidcJwt(b.token, "https://www.googleapis.com/oauth2/v3/certs",
          ["accounts.google.com", "https://accounts.google.com"], googleAuds);
      } else return json({ error: "bad_provider" }, 400, h);
      if (!payload || !payload.sub) return json({ error: "invalid_token" }, 401, h);
      const uid = `${provider}:${payload.sub}`;
      const email = String(payload.email || "");
      await env.DB.prepare(
        `INSERT INTO auth_users (uid, provider, sub, email, created_at, updated_at)
         VALUES (?1,?2,?3,?4,?5,?5) ON CONFLICT(uid) DO UPDATE SET email=?4, updated_at=?5`
      ).bind(uid, provider, String(payload.sub), email, nowMs()).run();
      const sessionToken = await signSession(uid, env.SESSION_SECRET);
      return json({ sessionToken, uid, email }, 200, h);
    }

    // ---------- Web Google ログイン（→ StayTW session）----------
    if (url.pathname === "/api/web-login" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      // Web の第三者ログイン：Google（既定）＋ Apple（Services ID の id_token）。
      // Apple の uid は "apple:{sub}" ＝ ネイティブ /api/native-login と同一 → アプリ⇄Web で同じ帳號・進度が同期。
      let provider = "google", payload;
      if (b.provider === "apple") {
        if (!env.APPLE_WEB_SERVICE_ID) return json({ error: "apple_not_configured" }, 501, h);
        provider = "apple";
        payload = await verifyOidcJwt(b.token, "https://appleid.apple.com/auth/keys",
          ["https://appleid.apple.com"], env.APPLE_WEB_SERVICE_ID);
      } else {
        payload = await verifyGoogleWeb(b.token);
      }
      if (!payload || !payload.sub) return json({ error: "invalid_token" }, 401, h);
      const uid = provider + ":" + payload.sub;
      const email = String(payload.email || "");
      await env.DB.prepare(
        `INSERT INTO auth_users (uid, provider, sub, email, created_at, updated_at)
         VALUES (?1,?2,?3,?4,?5,?5) ON CONFLICT(uid) DO UPDATE SET email=?4, updated_at=?5`
      ).bind(uid, provider, String(payload.sub), email, nowMs()).run();
      const sessionToken = await signSession(uid, env.SESSION_SECRET);
      return json({ sessionToken, uid, email, name: payload.name || "", picture: payload.picture || "" }, 200, h);
    }

    // ---------- 学習進度クラウド同期（Bearer session）----------
    // ---------- 帳號刪除（Apple 5.1.1(v) 必要）：本人 session で自分の全データを消す ----------
    if (url.pathname === "/api/delete-account" && req.method === "POST") {
      const uid = await verifySession((req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, ""), env.SESSION_SECRET);
      if (!uid) return json({ error: "unauthorized" }, 401, h);
      // Play の「帳戶和關聯資料刪除」に合わせ、この uid に紐づくものは一通り消す。
      // 取引記録(rc_events)だけは会計帳簿として残す必要があるが、auth_users を消した時点で
      // app_user_id からメールアドレスを辿れなくなる＝仮名化される。delete-account.html にそう明記。
      const who = await env.DB.prepare("SELECT email FROM auth_users WHERE uid=?1").bind(uid).first();
      const email = (who && who.email) ? String(who.email) : "";
      await env.DB.prepare("DELETE FROM progress WHERE uid=?1").bind(uid).run();
      await env.DB.prepare("DELETE FROM auth_users WHERE uid=?1").bind(uid).run();
      if (email) {
        await env.DB.prepare("DELETE FROM subscribers WHERE email=?1").bind(email).run();
        // 問い合わせ本文は製品改善のため残すが、宛先(個人の識別子)は落とす
        await env.DB.prepare("UPDATE feedback SET email='' WHERE email=?1").bind(email).run();
      }
      return json({ ok: true }, 200, h);
    }

    if (url.pathname === "/api/progress") {
      const uid = await verifySession((req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, ""), env.SESSION_SECRET);
      if (!uid) return json({ error: "unauthorized" }, 401, h);
      if (req.method === "GET") {
        const row = await env.DB.prepare("SELECT data, updated_at FROM progress WHERE uid=?1").bind(uid).first();
        return json({ data: row ? JSON.parse(row.data) : {}, updatedAt: row?.updated_at || null }, 200, h);
      }
      if (req.method === "POST" || req.method === "PUT") {
        let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
        const data = JSON.stringify(b.data || {});
        if (data.length > 900000) return json({ error: "too_large" }, 413, h);   // 1MiB D1 上限より手前で防爆
        await env.DB.prepare(
          `INSERT INTO progress (uid, data, updated_at) VALUES (?1,?2,?3)
           ON CONFLICT(uid) DO UPDATE SET data=?2, updated_at=?3`
        ).bind(uid, data, nowMs()).run();
        return json({ ok: true }, 200, h);
      }
      return json({ error: "method_not_allowed" }, 405, h);
    }

    // ---------- KOL 推廣碼(碼的正本在 StayHQ;helpers 在上方 hqPartner / kolOnRcEvent)----------
    // 檢查碼(設定頁輸入時用)
    if (url.pathname === "/api/ref/check") {
      const k = await hqPartner(env, url.searchParams.get("code"));
      return json(k ? { ok: true, code: k.code, name: k.name } : { ok: false }, 200, h);
    }
    // 記一次推廣連結點擊(ip 只存雜湊)
    if (url.pathname === "/api/ref/hit" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { b = {}; }
      const k = await hqPartner(env, b.code);
      if (!k) return json({ ok: false }, 200, h);
      await env.DB.prepare("INSERT INTO ref_clicks (code, ip_hash, app, at) VALUES (?1,?2,0,?3)").bind(k.code, await refIpHash(req, env), nowMs()).run();
      return json({ ok: true, code: k.code, name: k.name }, 200, h);
    }
    // App 第一次開啟、裝置上還沒碼 → 同一網路 72 小時內點過的推廣連結對回來(點連結 → 去商店裝 App)
    if (url.pathname === "/api/ref/auto") {
      const ih = await refIpHash(req, env);
      if (!ih) return json({ ok: false }, 200, h);
      const r = await env.DB.prepare("SELECT code FROM ref_clicks WHERE ip_hash=?1 AND app=0 AND at>?2 ORDER BY at DESC LIMIT 1")
        .bind(ih, nowMs() - 72 * 3600e3).first();
      const k = r && await hqPartner(env, r.code);
      if (!k) return json({ ok: false }, 200, h);
      await env.DB.prepare("INSERT INTO ref_clicks (code, ip_hash, app, at) VALUES (?1,?2,1,?3)").bind(k.code, ih, nowMs()).run();
      return json({ ok: true, code: k.code, name: k.name }, 200, h);
    }
    // 登入的帳號綁碼(first touch,綁過就不換)
    if (url.pathname === "/api/ref/attach" && req.method === "POST") {
      const uid = await verifySession((req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, ""), env.SESSION_SECRET);
      if (!uid) return json({ error: "unauthorized" }, 401, h);
      let b; try { b = await req.json(); } catch { b = {}; }
      const k = await hqPartner(env, b.code);
      if (!k) return json({ ok: false }, 200, h);
      await env.DB.prepare("INSERT OR IGNORE INTO ref_attrib (uid, code, at) VALUES (?1,?2,?3)").bind(uid, k.code, nowMs()).run();
      const cur = await env.DB.prepare("SELECT code FROM ref_attrib WHERE uid=?1").bind(uid).first();
      return json({ ok: true, code: cur && cur.code }, 200, h);
    }

    // ---------- RevenueCat webhook ----------
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
      // KOL 分潤(首筆真實付款/退款回沖)。總部連不上 → 回 500 讓 RevenueCat 重送(rc_events 與 HQ 都防重)
      try { await kolOnRcEvent(env, e); }
      catch (err) { console.error("kolOnRcEvent", err && err.message); return json({ error: "kol_retry" }, 500); }
      return json({ ok: true });
    }

    // ---------- 後台 Google ログイン（→ 管理 session。ホワイトリストのみ）----------
    if (url.pathname === "/api/admin-login" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      const payload = await verifyGoogleWeb(b.token);
      if (!payload || !payload.email) return json({ error: "invalid_token" }, 401, h);
      if (!ADMIN_EMAILS.includes(payload.email.toLowerCase())) return json({ error: "not_admin", email: payload.email }, 403, h);
      const sessionToken = await signSession("admin:" + payload.email.toLowerCase(), env.SESSION_SECRET);
      return json({ sessionToken, email: payload.email }, 200, h);
    }

    // ---------- メール購読（iOS 上架・更新通知用のリスト集め。ログイン不要）----------
    if (url.pathname === "/api/subscribe" && req.method === "POST") {
      const b = await req.json().catch(() => ({}));
      const email = String(b.email || "").trim().toLowerCase().slice(0, 200);
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "invalid_email" }, 400, h);
      if (b.website) return json({ ok: true }, 200, h);   // ハニーポット（bot 弾き）
      const sip = req.headers.get("CF-Connecting-IP") || "unknown", sday = new Date().toISOString().slice(0, 10);
      const srow = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(sip + ":sub:" + sday).first();
      if (srow && srow.count >= 20) return json({ ok: true }, 200, h);   // 限流：静かに破棄
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(sip + ":sub:" + sday, sday).run();
      await env.DB.prepare(
        `INSERT INTO subscribers (email, lang, source) VALUES (?1,?2,?3) ON CONFLICT(email) DO NOTHING`
      ).bind(email, String(b.lang || "").slice(0, 8), String(b.source || "web").slice(0, 24)).run();
      return json({ ok: true }, 200, h);
    }

    // ---------- YouTube 跟讀:字幕快取 ----------
    // 影片本身走官方 IFrame 嵌入(不下載不重製);這裡只存「哪一秒講了哪一句」的時間軸。
    // YouTube 會擋機房 IP,Worker 現場抓多半抓不到 → 主要靠本機(住宅 IP)用 scripts/yt-seed.mjs 種進來。
    if (url.pathname === "/api/yt-captions" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { b = {}; }
      const v = String(b.v || "");
      if (!/^[A-Za-z0-9_-]{11}$/.test(v)) return json({ error: "bad_video_id" }, 400, h);
      const row = await env.DB.prepare("SELECT title, author, seconds, track, lines FROM yt_captions WHERE vid=?1").bind(v).first();
      if (row) {
        let lines = []; try { lines = JSON.parse(row.lines); } catch (e) {}
        return json({ v, title: row.title, author: row.author, seconds: row.seconds, track: row.track, lines, cached: true }, 200, h);
      }
      // 快取沒有 → 現場試一次。失敗就明講,前端顯示「這支還沒準備好」。
      try {
        const pr = await fetch("https://www.youtube.com/youtubei/v1/player?key=" + YT_KEY, {
          method: "POST",
          headers: { "Content-Type": "application/json", "User-Agent": "com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip" },
          body: JSON.stringify({ context: { client: { clientName: "ANDROID", clientVersion: "20.10.38", androidSdkVersion: 30, hl: "zh-TW", gl: "TW" } }, videoId: v }),
        });
        if (!pr.ok) return json({ error: "not_ready" }, 404, h);
        const pj = await pr.json();
        const tracks = (pj.captions && pj.captions.playerCaptionsTracklistRenderer && pj.captions.playerCaptionsTracklistRenderer.captionTracks) || [];
        const tr = tracks.find((t) => /^zh/i.test(t.languageCode || ""));
        if (!tr) return json({ error: "no_captions" }, 404, h);
        let u = tr.baseUrl + (tr.baseUrl.includes("fmt=") ? "" : "&fmt=json3");
        const tb = await (await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
        const lines = parseCaptionBody(tb);
        if (lines.length < 3) return json({ error: "no_captions" }, 404, h);
        const d = pj.videoDetails || {};
        await env.DB.prepare(
          "INSERT INTO yt_captions (vid,title,author,seconds,track,lines,updated_at) VALUES (?1,?2,?3,?4,?5,?6,?7) ON CONFLICT(vid) DO UPDATE SET lines=?6, updated_at=?7"
        ).bind(v, String(d.title || "").slice(0, 200), String(d.author || "").slice(0, 120), Number(d.lengthSeconds || 0), tr.languageCode || "zh", JSON.stringify(lines), nowMs()).run();
        return json({ v, title: d.title || "", author: d.author || "", seconds: Number(d.lengthSeconds || 0), track: tr.languageCode, lines, cached: false }, 200, h);
      } catch (e) { return json({ error: "not_ready" }, 404, h); }
    }

    // 本機種字幕用(住宅 IP 抓得到)。要 ADMIN_TOKEN,不開放一般人寫。
    if (url.pathname === "/api/yt-seed" && req.method === "POST") {
      const bearer = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
      if (!env.ADMIN_TOKEN || bearer !== env.ADMIN_TOKEN) return json({ error: "unauthorized" }, 401, h);
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      const v = String(b.v || "");
      if (!/^[A-Za-z0-9_-]{11}$/.test(v)) return json({ error: "bad_video_id" }, 400, h);
      const lines = Array.isArray(b.lines) ? b.lines : [];
      if (lines.length < 3 || lines.length > 2000) return json({ error: "bad_lines" }, 400, h);
      await env.DB.prepare(
        "INSERT INTO yt_captions (vid,title,author,seconds,track,lines,updated_at) VALUES (?1,?2,?3,?4,?5,?6,?7) ON CONFLICT(vid) DO UPDATE SET title=?2, author=?3, seconds=?4, track=?5, lines=?6, updated_at=?7"
      ).bind(v, String(b.title || "").slice(0, 200), String(b.author || "").slice(0, 120), Number(b.seconds || 0), String(b.track || "zh"), JSON.stringify(lines), nowMs()).run();
      return json({ ok: true, v, n: lines.length }, 200, h);
    }

    // ---------- 紹介プログラム（現金ではなく無料日数を配る）----------
    // 現金の分潤にすると海外送金・源泉徴収・契約書が要る。最小構成は「双方に無料日数」。
    // ＊ Apple 3.1.1(v): アプリ内で「コードを入れると無料日数」と言うのは NG(StayJP で一度リジェクト)。
    //   なので UI は Web だけに出し、App では丸ごと隠す。ここは API なので両方から呼べてよい。
    const REF_DAYS = 14;              // 紹介された人／した人、それぞれに付く日数
    const REF_CAP_DAYS = 180;         // 紹介した人の累計上限(ざる防止)

    async function grantDays(uid, days) {
      const now = nowMs(), add = days * 86400000;
      const row = await env.DB.prepare("SELECT expires_at FROM entitlements WHERE uid=?1").bind(uid).first();
      const base = row && row.expires_at && row.expires_at > now ? row.expires_at : now;
      const until = base + add;
      await env.DB.prepare(
        `INSERT INTO entitlements (uid, plan, status, expires_at) VALUES (?1,'referral','active',?2)
         ON CONFLICT(uid) DO UPDATE SET expires_at=?2, status='active'`
      ).bind(uid, until).run();
      return until;
    }
    async function refCodeOf(uid) {
      const hit = await env.DB.prepare("SELECT code FROM referrals WHERE uid=?1").bind(uid).first();
      if (hit) return hit.code;
      // uid から決め打ちで作る。紛らわしい文字(0/O/1/I)は外す。
      const buf = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode("stw:" + uid)));
      const AB = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
      for (let attempt = 0; attempt < 8; attempt++) {
        let code = "";
        for (let i = 0; i < 6; i++) code += AB[buf[i + attempt] % AB.length];
        try { await env.DB.prepare("INSERT INTO referrals (code, uid, created_at) VALUES (?1,?2,?3)").bind(code, uid, nowMs()).run(); return code; }
        catch (e) { /* 衝突したら次のバイトで作り直す */ }
      }
      return null;
    }

    if (url.pathname === "/api/me") {
      const uid = await verifySession((req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, ""), env.SESSION_SECRET);
      if (!uid) return json({ error: "unauthorized" }, 401, h);
      const code = await refCodeOf(uid);
      const ent = await env.DB.prepare("SELECT plan, status, expires_at FROM entitlements WHERE uid=?1").bind(uid).first();
      const cnt = await env.DB.prepare("SELECT COUNT(*) n FROM referral_claims WHERE referrer_uid=?1").bind(uid).first();
      const until = ent && ent.status === "active" ? (ent.expires_at || 0) : 0;
      return json({ uid, refCode: code, referrals: (cnt && cnt.n) || 0,
                    premiumUntil: until, entitled: until > nowMs(), refDays: REF_DAYS }, 200, h);
    }

    if (url.pathname === "/api/referral/claim" && req.method === "POST") {
      const uid = await verifySession((req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, ""), env.SESSION_SECRET);
      if (!uid) return json({ error: "unauthorized" }, 401, h);
      let b; try { b = await req.json(); } catch { b = {}; }
      const code = String(b.code || "").trim().toUpperCase().slice(0, 12);
      if (!/^[A-Z0-9]{4,12}$/.test(code)) return json({ error: "bad_code" }, 400, h);
      const owner = await env.DB.prepare("SELECT uid FROM referrals WHERE code=?1").bind(code).first();
      if (!owner) return json({ error: "unknown_code" }, 404, h);
      if (owner.uid === uid) return json({ error: "self" }, 400, h);
      const used = await env.DB.prepare("SELECT referred_uid FROM referral_claims WHERE referred_uid=?1").bind(uid).first();
      if (used) return json({ error: "already_claimed" }, 409, h);
      // 紹介した側は上限まで。超えても紹介された側の特典は出す(誘い文句が嘘にならないように)
      const got = await env.DB.prepare("SELECT COUNT(*) n FROM referral_claims WHERE referrer_uid=?1").bind(owner.uid).first();
      await env.DB.prepare("INSERT INTO referral_claims (referred_uid, code, referrer_uid, at) VALUES (?1,?2,?3,?4)")
        .bind(uid, code, owner.uid, nowMs()).run();
      const mine = await grantDays(uid, REF_DAYS);
      if (((got && got.n) || 0) * REF_DAYS < REF_CAP_DAYS) await grantDays(owner.uid, REF_DAYS);
      return json({ ok: true, days: REF_DAYS, premiumUntil: mine }, 200, h);
    }

    // ---------- 後台（Google 管理 session または旧 ADMIN_TOKEN）----------
    if (url.pathname.startsWith("/api/admin/")) {
      const auth = req.headers.get("Authorization") || "";
      const bearer = auth.replace(/^Bearer\s+/i, "");
      let ok = env.ADMIN_TOKEN && bearer === env.ADMIN_TOKEN;   // 旧トークン（後方互換）
      if (!ok) {
        const uid = await verifySession(bearer, env.SESSION_SECRET);   // Google 管理 session
        ok = uid && uid.startsWith("admin:") && ADMIN_EMAILS.includes(uid.slice(6));
        // 手機上 Google 登入彈窗常被擋（Safari 防追蹤、LINE/Threads 內建瀏覽器）→ 主站已登入的管理員帳號（Apple 或 Google）也可以直接用
        if (!ok && uid && !uid.startsWith("admin:")) {
          const au = await env.DB.prepare("SELECT email FROM auth_users WHERE uid=?1").bind(uid).first();
          ok = !!(au && au.email && ADMIN_EMAILS.includes(String(au.email).toLowerCase()));
        }
      }
      if (!ok) return json({ error: "unauthorized" }, 401, h);

      if (url.pathname === "/api/admin/summary") {
        const [rev, byProduct, last30, fbCount] = await Promise.all([
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
        ]);
        return json({ revenue: rev, byProduct: byProduct.results, last30: last30.results, feedbackCount: fbCount.n }, 200, h);
      }
      // 財務分析用:正式環境の全イベントを、raw から必要な欄だけ取り出して返す。
      // 集計(期間・手数料・税・試用転換・継続)は後台の画面側でやる。raw は {event:{...}} の形と
      // event そのものの形が混ざっているので両方見る。
      if (url.pathname === "/api/admin/finance") {
        const J = (k) => `COALESCE(json_extract(raw,'$.event.${k}'), json_extract(raw,'$.${k}'))`;
        const r = await env.DB.prepare(
          `SELECT id, ts, event_type t, product_id p, price usd, price_in_purchased_currency lp, currency cur,
                  COALESCE(country, ${J("country_code")}) c, app_user_id u,
                  ${J("store")} st, ${J("period_type")} pt, ${J("takehome_percentage")} take,
                  ${J("tax_percentage")} tax, ${J("commission_percentage")} com,
                  ${J("purchased_at_ms")} pms, ${J("expiration_at_ms")} ems, ${J("cancel_reason")} cr,
                  ${J("is_trial_conversion")} conv, ${J("renewal_number")} rn, ${J("offer_code")} oc,
                  ${J("original_transaction_id")} otx
           FROM rc_events WHERE environment='PRODUCTION' ORDER BY id`).all();
        return json(r.results, 200, h);
      }
      if (url.pathname === "/api/admin/events") {
        const r = await env.DB.prepare(
          `SELECT ts, event_type, product_id, price, price_in_purchased_currency, currency, country, environment, app_user_id
           FROM rc_events ORDER BY id DESC LIMIT 200`).all();
        return json(r.results, 200, h);
      }
      if (url.pathname === "/api/admin/feedback") {
        const r = await env.DB.prepare(
          `SELECT id, ts, type, message, email, contact_email, lang, replied_at, status FROM feedback ORDER BY id DESC LIMIT 200`).all();
        return json(r.results, 200, h);
      }
      // 回信済みマーク（管理者が Gmail で返信したあと押す）。status も一緒に動かす
      if (url.pathname === "/api/admin/feedback-reply" && req.method === "POST") {
        let fb; try { fb = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
        const fid = parseInt(fb.id, 10);
        if (!fid) return json({ error: "no id" }, 400, h);
        const val = fb.undo ? null : new Date().toISOString().slice(0, 19).replace("T", " ");
        const st = fb.undo ? "new" : "replied";
        await env.DB.prepare(`UPDATE feedback SET replied_at=?1, status=?2 WHERE id=?3`).bind(val, st, fid).run();
        return json({ ok: true, replied_at: val, status: st }, 200, h);
      }
      // 返した/返さないの 2 値だけだと、返さないと決めたものが「待ち」に居座る。
      // Gmail を開かずに捌けるよう status を直接立てる口。replied の時だけ時刻も入れる。
      if (url.pathname === "/api/admin/feedback-status" && req.method === "POST") {
        let b2; try { b2 = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
        const fid = Number(b2.id);
        const st = ["new", "replied", "done", "wontfix", "spam"].includes(b2.status) ? b2.status : null;
        if (!fid || !st) return json({ error: "bad id/status" }, 400, h);
        const at = st === "replied" ? new Date().toISOString().slice(0, 19).replace("T", " ") : null;
        await env.DB.prepare(`UPDATE feedback SET status=?1, replied_at=?2 WHERE id=?3`).bind(st, at, fid).run();
        return json({ ok: true, status: st, replied_at: at }, 200, h);
      }
      if (url.pathname === "/api/admin/traffic") {
        const [total, today, daily, countries, paths, refs, bySource] = await Promise.all([
          env.DB.prepare(`SELECT COUNT(*) n FROM hits`).first(),
          env.DB.prepare(`SELECT COUNT(*) n FROM hits WHERE date(ts)=date('now')`).first(),
          env.DB.prepare(`SELECT date(ts) d, COUNT(*) n FROM hits WHERE ts>datetime('now','-30 days') GROUP BY date(ts) ORDER BY d DESC`).all(),
          env.DB.prepare(`SELECT country, COUNT(*) n FROM hits WHERE ts>datetime('now','-30 days') AND country!='' GROUP BY country ORDER BY n DESC LIMIT 12`).all(),
          env.DB.prepare(`SELECT path, COUNT(*) n FROM hits WHERE ts>datetime('now','-30 days') GROUP BY path ORDER BY n DESC LIMIT 12`).all(),
          env.DB.prepare(`SELECT referrer, COUNT(*) n FROM hits WHERE ts>datetime('now','-30 days') AND referrer!='' GROUP BY referrer ORDER BY n DESC LIMIT 10`).all(),
          env.DB.prepare(`SELECT source, COUNT(*) n FROM hits WHERE ts>datetime('now','-30 days') GROUP BY source`).all(),
        ]);
        return json({ total: total.n, today: today.n, daily: daily.results, countries: countries.results,
                      paths: paths.results, refs: refs.results, bySource: bySource.results }, 200, h);
      }
      if (url.pathname === "/api/admin/subscribers") {
        const [list, count] = await Promise.all([
          env.DB.prepare(`SELECT id, ts, email, lang, source FROM subscribers ORDER BY id DESC LIMIT 2000`).all(),
          env.DB.prepare(`SELECT COUNT(*) n FROM subscribers`).first(),
        ]);
        return json({ count: count.n, list: list.results }, 200, h);
      }
      if (url.pathname === "/api/admin/users") {
        const [list, count] = await Promise.all([
          env.DB.prepare(`SELECT email, provider, datetime(updated_at/1000,'unixepoch') last FROM auth_users WHERE email!='' ORDER BY updated_at DESC LIMIT 2000`).all(),
          env.DB.prepare(`SELECT COUNT(*) n FROM auth_users WHERE email!=''`).first(),
        ]);
        return json({ count: count.n, list: list.results }, 200, h);
      }
      return json({ error: "not found" }, 404, h);
    }

    return json({ error: "not found" }, 404, h);
  },
};
