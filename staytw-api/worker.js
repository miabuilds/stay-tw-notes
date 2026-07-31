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
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  };
}
const json = (data, status, extra) =>
  new Response(JSON.stringify(data), { status: status || 200, headers: { "Content-Type": "application/json", ...extra } });

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
