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

// Google 網頁ログイン用（後台・Web）。iOS は env.GOOGLE_IOS_CLIENT_ID、Web はこの公開 client id。
const GOOGLE_WEB_CLIENT_ID = "949214636130-e2dl3h0t1l789fggve3vsd6pu670lnb1.apps.googleusercontent.com";
const ADMIN_EMAILS = ["abc83327@gmail.com"];
async function verifyGoogleWeb(token) {
  return verifyOidcJwt(token, "https://www.googleapis.com/oauth2/v3/certs",
    ["accounts.google.com", "https://accounts.google.com"], GOOGLE_WEB_CLIENT_ID);
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
      // 限流：1 IP 1 日 15 件まで（それ以上は静かに破棄＝スパム防止、正規ユーザーには成功に見せる）
      const fip = req.headers.get("CF-Connecting-IP") || "unknown", fday = new Date().toISOString().slice(0, 10);
      const fkey = fip + ":fb:" + fday;
      const frow = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(fkey).first();
      if (frow && frow.count >= 15) return json({ ok: true }, 200, h);
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(fkey, fday).run();
      await env.DB.prepare(
        "INSERT INTO feedback (type, message, email, lang, ua) VALUES (?1, ?2, ?3, ?4, ?5)"
      ).bind(type, msg, String(b.email || "").slice(0, 200), String(b.lang || "").slice(0, 8),
             (req.headers.get("User-Agent") || "").slice(0, 300)).run();
      return json({ ok: true }, 200, h);
    }

    // ---------- 流量計數（公開ビーコン。JS を実行する実ブラウザのみ＝bot 除外）----------
    // ---------- AI 情境対話（台湾華語）Claude Haiku ----------
    if (url.pathname === "/api/speak-chat" && req.method === "POST") {
      const ip = req.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0, 10);
      const qkey = ip + ":" + day, DAILY = 40;   // 濫用防止：1 IP 1 日
      const row = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(qkey).first();
      if (row && row.count >= DAILY) return json({ error: "quota", message: "本日の無料枠を使い切りました" }, 429, h);
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(qkey, day).run();

      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      if (!env.ANTHROPIC_API_KEY) return json({ error: "ai_not_configured" }, 501, h);
      const lang = ["ja", "en", "ko"].includes(b.lang) ? b.lang : "ja";
      const langName = { ja: "Japanese", en: "English", ko: "Korean" }[lang];
      const scene = String(b.scene || "a casual chat").slice(0, 300);
      const userRole = String(b.userRole || "").slice(0, 120);
      const level = String(b.level || "L2").slice(0, 8);
      const history = Array.isArray(b.history) ? b.history.slice(-14) : [];

      const sys = `You are a warm, friendly Taiwanese person role-playing to help someone practice Taiwan Mandarin.
Scene: ${scene}. ${userRole ? "The learner plays: " + userRole + ". You play the other person." : "You are the learner's conversation partner."}
Rules:
- Speak ONLY in Taiwan Mandarin, TRADITIONAL characters, natural Taiwan usage (捷運 not 地鐵, 悠遊卡, no 儿化, 台灣讀法).
- Each reply SHORT: 1-2 sentences, warm, around TOCFL ${level} level.
- STAY STRICTLY IN CHARACTER — respond exactly the way YOUR role really would in real life. A shop clerk STATES the price and confirms the order (e.g. 「總共三十五元」); a clerk NEVER asks the customer how much something costs. Play only your own side.
- Do NOT force a question into every reply. Only ask something when your role naturally would (a clerk may ask 甜度冰塊/內用外帶; otherwise just respond). It's fine to end without a question.
- Respond with a SINGLE valid JSON object only (no markdown fences), keys:
  "reply": your line (Traditional Chinese),
  "zhuyin": 注音 reading of your reply,
  "translation": a ${langName} translation of your reply,
  "hints": array of exactly 2 short natural sentences the LEARNER (playing ${userRole || "the learner"}) could actually SAY next — Traditional Chinese ONLY, real spoken lines. NEVER stage directions, narration, or ${langName}/other languages. If the conversation is wrapping up, offer polite closing lines (e.g. 「謝謝，再見！」),
  "correction": if the learner's LAST message has a clear mistake, one short gentle note IN ${langName} on how to fix it; otherwise "".`;

      const messages = history.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: String((m.role === "ai" ? (m.reply || m.text) : m.text) || "") })).filter(m => m.content);
      if (!messages.length || messages[messages.length - 1].role !== "user") messages.push({ role: "user", content: "（在角色中用台灣華語跟我打招呼，開始這個情境）" });

      let rc;
      try {
        rc = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
          body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 500, system: sys, messages }),
        });
      } catch (e) { return json({ error: "ai_error" }, 502, h); }
      if (!rc.ok) { const t = await rc.text().catch(() => ""); return json({ error: "ai_error", detail: t.slice(0, 160) }, 502, h); }
      const data = await rc.json();
      const text = (data.content && data.content[0] && data.content[0].text) || "";
      let out;
      try { const a = text.indexOf("{"), z = text.lastIndexOf("}"); out = JSON.parse(text.slice(a, z + 1)); }
      catch (e) { out = { reply: text, zhuyin: "", translation: "", hints: [], correction: "" }; }
      if (!Array.isArray(out.hints)) out.hints = [];
      return json(out, 200, h);
    }

    if (url.pathname === "/api/speak-review" && req.method === "POST") {
      // 對話結束點評:評學習者的台灣華語表現，回 {score,good,improve,tip,encourage}
      const ip = req.headers.get("CF-Connecting-IP") || "unknown";
      const day = new Date().toISOString().slice(0, 10);
      const qkey = ip + ":" + day, DAILY = 40;
      const row = await env.DB.prepare("SELECT count FROM chat_quota WHERE key=?1").bind(qkey).first();
      if (row && row.count >= DAILY) return json({ error: "quota" }, 429, h);
      await env.DB.prepare("INSERT INTO chat_quota (key,count,day) VALUES (?1,1,?2) ON CONFLICT(key) DO UPDATE SET count=count+1, day=?2").bind(qkey, day).run();

      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, h); }
      if (!env.ANTHROPIC_API_KEY) return json({ error: "ai_not_configured" }, 501, h);
      const lang = ["ja", "en", "ko"].includes(b.lang) ? b.lang : "ja";
      const langName = { ja: "Japanese", en: "English", ko: "Korean" }[lang];
      const scene = String(b.scene || "").slice(0, 300);
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
      try {
        if (hasAzure && !wantForce) {
          const region = env.AZURE_SPEECH_REGION || "japaneast";
          const AZ = { f: "zh-TW-HsiaoChenNeural", m: "zh-TW-YunJheNeural", f2: "zh-TW-HsiaoYuNeural" };
          const voice = AZ[b.voice] || AZ.f;
          const xesc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          const ssml = `<speak version='1.0' xml:lang='zh-TW'><voice name='${voice}'>${xesc(text)}</voice></speak>`;
          const ar = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
            method: "POST",
            headers: { "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3", "User-Agent": "staytw-tts" },
            body: ssml,
          });
          if (!ar.ok) { const t = await ar.text().catch(() => ""); return json({ error: "tts_error", detail: ("azure " + ar.status + " " + t).slice(0, 200) }, 502, h); }
          const buf = new Uint8Array(await ar.arrayBuffer());
          let bin = ""; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
          return json({ audio: btoa(bin) }, 200, h);
        }
        // Google fallback
        const VOICES = { f: "cmn-TW-Wavenet-A", m: "cmn-TW-Wavenet-C", f2: "cmn-TW-Wavenet-A" };
        const name = VOICES[b.voice] || VOICES.f;
        // 多音字修正（TTS 常唸錯的）。用 SSML phoneme 強制正確台灣讀音，只在特定詞情境套用。
        const gesc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const ph = (py) => (ch) => `<phoneme alphabet='pinyin' ph='${py}'>${ch}</phoneme>`;
        let ssmlText;
        if (wantForce) {
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
        return json({ audio: jd.audioContent }, 200, h);
      } catch (e) { return json({ error: "tts_error" }, 502, h); }
    }

    if (url.pathname === "/api/hit" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { b = {}; }
      const path = String(b.path || "/").slice(0, 200);
      const ref = String(b.ref || "").slice(0, 300);
      const country = (req.cf && req.cf.country) || req.headers.get("CF-IPCountry") || "";
      const inApp = /STAYTW_NATIVE|ReactNative/i.test(String(b.ua || "")) || b.app ? "app" : "web";
      await env.DB.prepare("INSERT INTO hits (path, referrer, country, source) VALUES (?1,?2,?3,?4)")
        .bind(path, ref, country, inApp).run();
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
      await env.DB.prepare("DELETE FROM progress WHERE uid=?1").bind(uid).run();
      await env.DB.prepare("DELETE FROM auth_users WHERE uid=?1").bind(uid).run();
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

    // ---------- 後台（Google 管理 session または旧 ADMIN_TOKEN）----------
    if (url.pathname.startsWith("/api/admin/")) {
      const auth = req.headers.get("Authorization") || "";
      const bearer = auth.replace(/^Bearer\s+/i, "");
      let ok = env.ADMIN_TOKEN && bearer === env.ADMIN_TOKEN;   // 旧トークン（後方互換）
      if (!ok) {
        const uid = await verifySession(bearer, env.SESSION_SECRET);   // Google 管理 session
        ok = uid && uid.startsWith("admin:") && ADMIN_EMAILS.includes(uid.slice(6));
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
