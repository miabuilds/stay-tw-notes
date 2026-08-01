// StayTW API — Cloudflare Worker + D1
// - POST /api/feedback      使用者回饋（公開，蜜罐防機器人）
// - POST /api/rc-webhook    RevenueCat webhook（Authorization: Bearer RC_WEBHOOK_SECRET）
// - GET  /api/admin/*       後台資料（Authorization: Bearer ADMIN_TOKEN）
// Secrets: ADMIN_TOKEN, RC_WEBHOOK_SECRET（wrangler secret put）
const ALLOW_ORIGINS = ["https://staytw.pages.dev", "https://miabuilds.github.io", "http://localhost:8471"];

function cors(req) {
  const o = req.headers.get("Origin") || "";
  const ok = ALLOW_ORIGINS.some(a => o.startsWith(a));
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
  if (payload.aud !== audience) return null;
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
      const type = ["bug", "content", "feature", "other"].includes(b.type) ? b.type : "other";
      await env.DB.prepare(
        "INSERT INTO feedback (type, message, email, lang, ua) VALUES (?1, ?2, ?3, ?4, ?5)"
      ).bind(type, msg, String(b.email || "").slice(0, 200), String(b.lang || "").slice(0, 8),
             (req.headers.get("User-Agent") || "").slice(0, 300)).run();
      return json({ ok: true }, 200, h);
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
        if (!env.GOOGLE_IOS_CLIENT_ID) return json({ error: "google_not_configured" }, 501, h);
        payload = await verifyOidcJwt(b.token, "https://www.googleapis.com/oauth2/v3/certs",
          ["accounts.google.com", "https://accounts.google.com"], env.GOOGLE_IOS_CLIENT_ID);
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

    // ---------- 学習進度クラウド同期（Bearer session）----------
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
      return json({ ok: true });
    }

    // ---------- 後台（Bearer ADMIN_TOKEN） ----------
    if (url.pathname.startsWith("/api/admin/")) {
      const auth = req.headers.get("Authorization") || "";
      if (auth !== `Bearer ${env.ADMIN_TOKEN}`) return json({ error: "unauthorized" }, 401, h);

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
      if (url.pathname === "/api/admin/events") {
        const r = await env.DB.prepare(
          `SELECT ts, event_type, product_id, price, price_in_purchased_currency, currency, country, environment, app_user_id
           FROM rc_events ORDER BY id DESC LIMIT 200`).all();
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
