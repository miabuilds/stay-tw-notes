// StayTW Web — Google ログイン＋学習進度クラウド同期（端末間）
// ・ログイン：Google Identity Services → /api/web-login → StayTW session
// ・同期：ログイン時に /api/progress を取得してローカルとマージ→押し戻し。以後は離脱時に保存。
// ・同期対象：SRS 復習・模試履歴・作文下書き・レベル
const STW_API = "https://staytw-api.abc83327.workers.dev";
const STW_WEB_CLIENT_ID = "949214636130-e2dl3h0t1l789fggve3vsd6pu670lnb1.apps.googleusercontent.com";
const SYNC_KEYS = ["stw_srs", "stw_exam_history", "stw_writing", "stw_wr_opened", "stw-level"];

const STW_WEB = (() => {
  let session = localStorage.getItem("stw_session") || null;
  let user = null;
  try { user = JSON.parse(localStorage.getItem("stw_user") || "null"); } catch (e) {}
  let gBtnRendered = false;

  const parse = (s, d) => { try { const v = JSON.parse(s); return v == null ? d : v; } catch (e) { return d; } };

  function initGoogle(){
    if (!window.google || !window.google.accounts) { setTimeout(initGoogle, 200); return; }
    google.accounts.id.initialize({ client_id: STW_WEB_CLIENT_ID, callback: onCredential, auto_select: false });
    renderAuth();
    if (session) pullMerge();     // 起動時に同期
  }

  async function onCredential(resp){
    try {
      const r = await fetch(STW_API + "/api/web-login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resp.credential }) });
      const d = await r.json();
      if (!r.ok) return;
      session = d.sessionToken; localStorage.setItem("stw_session", session);
      user = { email: d.email, name: d.name, picture: d.picture }; localStorage.setItem("stw_user", JSON.stringify(user));
      closeModal(); renderAuth();
      await pullMerge();
    } catch (e) {}
  }

  function login(){
    const bg = document.getElementById("loginBg"); if (!bg) return;
    bg.classList.add("show");
    if (!gBtnRendered && window.google && google.accounts) {
      google.accounts.id.renderButton(document.getElementById("gLoginBtn"),
        { theme: "filled_black", size: "large", text: "signin_with", shape: "pill", width: 240 });
      gBtnRendered = true;
    }
  }
  function closeModal(){ document.getElementById("loginBg")?.classList.remove("show"); }
  function logout(){
    session = null; user = null;
    localStorage.removeItem("stw_session"); localStorage.removeItem("stw_user");
    try { google.accounts.id.disableAutoSelect(); } catch (e) {}
    renderAuth();
  }

  // ── ヘッダー表示 ──
  function renderAuth(){
    const el = document.getElementById("authBtn"); if (!el) return;
    el.style.display = "";
    if (session && user) {
      const label = (user.name || user.email || "?").trim().slice(0, 1).toUpperCase();
      el.innerHTML = `<button onclick="STW_WEB.logout()" title="${(user.email||'')}（クリックでログアウト）"
        style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--ac);color:#fff;font-weight:700;font-size:13px;border:none;cursor:pointer">${label}</button>`;
    } else {
      el.innerHTML = `<button class="lang-btn" onclick="STW_WEB.login()">${(typeof twT==="function"?twT("navLogin"):"ログイン")}</button>`;
    }
  }

  // ── 同期 ──
  async function pullMerge(){
    if (!session) return;
    try {
      const r = await fetch(STW_API + "/api/progress", { headers: { Authorization: "Bearer " + session } });
      if (!r.ok) { if (r.status === 401) logout(); return; }
      const { data } = await r.json();
      mergeCloud(data || {});
      await push();     // マージ済みユニオンを押し戻し（両端末で収束）
      if (typeof twRerenderAll === "function") { try { twRerenderAll(); } catch (e) {} }
      if (typeof updateSrsBadges === "function") { try { updateSrsBadges(); } catch (e) {} }
    } catch (e) {}
  }

  function mergeCloud(cloud){
    // SRS：キー(level:word)ごとに union、reviews 多い方を採用
    if (cloud.stw_srs) {
      const c = parse(cloud.stw_srs, {}), l = parse(localStorage.getItem("stw_srs"), {});
      for (const k in c) { if (!l[k] || (c[k].reviews || 0) > (l[k].reviews || 0)) l[k] = c[k]; }
      localStorage.setItem("stw_srs", JSON.stringify(l));
      try { if (window.SRS && SRS._import) SRS._import(l); } catch (e) {}
    }
    // 模試履歴：連結して JSON 重複除去、直近100件
    if (cloud.stw_exam_history) {
      const c = parse(cloud.stw_exam_history, []), l = parse(localStorage.getItem("stw_exam_history"), []);
      const seen = new Set(l.map(x => JSON.stringify(x)));
      c.forEach(x => { const k = JSON.stringify(x); if (!seen.has(k)) { l.push(x); seen.add(k); } });
      localStorage.setItem("stw_exam_history", JSON.stringify(l.slice(-100)));
    }
    // 作文下書き・開封記録：union（クラウドで穴埋め）
    ["stw_writing", "stw_wr_opened"].forEach(k => {
      const c = cloud[k]; if (!c) return;
      const cur = localStorage.getItem(k);
      if (!cur) { localStorage.setItem(k, c); return; }
      const co = parse(c, null), lo = parse(cur, null);
      if (Array.isArray(co) && Array.isArray(lo)) {
        const s = new Set(lo.map(x => JSON.stringify(x)));
        co.forEach(x => { if (!s.has(JSON.stringify(x))) lo.push(x); });
        localStorage.setItem(k, JSON.stringify(lo));
      } else if (co && lo && typeof co === "object") {
        for (const kk in co) if (!(kk in lo)) lo[kk] = co[kk];
        localStorage.setItem(k, JSON.stringify(lo));
      }
    });
    if (cloud["stw-level"] && !localStorage.getItem("stw-level")) localStorage.setItem("stw-level", cloud["stw-level"]);
  }

  async function push(){
    if (!session) return;
    const o = {}; SYNC_KEYS.forEach(k => { const v = localStorage.getItem(k); if (v != null) o[k] = v; });
    try {
      await fetch(STW_API + "/api/progress", {
        method: "PUT", headers: { "Content-Type": "application/json", Authorization: "Bearer " + session },
        body: JSON.stringify({ data: o }) });
    } catch (e) {}
  }

  // 離脱時に保存（学習した進度を取りこぼさない）
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && session) push(); });
  window.addEventListener("pagehide", () => { if (session) navigator.sendBeacon && navigator.sendBeacon; push(); });

  return { login, logout, closeModal, initGoogle, isLoggedIn: () => !!session };
})();
STW_WEB.initGoogle();
