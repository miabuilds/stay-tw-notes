// StayTW Web — Google ログイン＋学習進度クラウド同期（端末間）
// ・ログイン：Google Identity Services → /api/web-login → StayTW session
// ・同期：ログイン時に /api/progress を取得してローカルとマージ→押し戻し。以後は離脱時に保存。
// ・同期対象：SRS 復習・模試履歴・作文下書き・レベル
const STW_API = ""; // 同源：走 pages.dev/api/* 代理到 Worker（避開 workers.dev 被擋）
const STW_WEB_CLIENT_ID = "949214636130-e2dl3h0t1l789fggve3vsd6pu670lnb1.apps.googleusercontent.com";
// ── Web「Sign in with Apple」──
// Apple Developer で Services ID を作成し（例 com.staytw.web）、Sign in with Apple を有効化・
// ドメイン(staytw.pages.dev)と Return URL(下の REDIRECT と完全一致)を登録・ドメイン検証したら、
// ここに Services ID を入れる。空のあいだはボタン非表示（＝壊れない）。
// ※ Worker 側も secret APPLE_WEB_SERVICE_ID を同じ値にすること（aud 検証用）。
const STW_APPLE_SERVICE_ID = "com.staytw.web";
const STW_APPLE_REDIRECT = "https://staytw.pages.dev/";
const SYNC_KEYS = ["stw_srs", "stw_exam_history", "stw_writing", "stw_wr_opened", "stw-level", "stw_streak", "stw_read", "stw_goal", "stw_art_read"];

const STW_WEB = (() => {
  let session = localStorage.getItem("stw_session") || null;
  let user = null;
  try { user = JSON.parse(localStorage.getItem("stw_user") || "null"); } catch (e) {}
  let gBtnRendered = false;

  const parse = (s, d) => { try { const v = JSON.parse(s); return v == null ? d : v; } catch (e) { return d; } };

  function initGoogle(){
    if (!window.google || !window.google.accounts) { setTimeout(initGoogle, 200); return; }
    google.accounts.id.initialize({ client_id: STW_WEB_CLIENT_ID, callback: onCredential, auto_select: false });
  }

  async function onCredential(resp){
    const toast = m => { try { if (typeof window.showToast === "function") window.showToast(m); } catch(e){} };
    try {
      if (!resp || !resp.credential) { toast("ログインに失敗しました。もう一度お試しください"); return; }
      const r = await fetch(STW_API + "/api/web-login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resp.credential }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.sessionToken) { toast("ログインに失敗しました（サーバー）。少し待って再度お試しください"); return; }
      session = d.sessionToken; localStorage.setItem("stw_session", session);
      user = { email: d.email, name: d.name, picture: d.picture }; localStorage.setItem("stw_user", JSON.stringify(user));
      closeModal(); renderAuth();
      toast("ログインしました");
      try { await pullMerge(); } catch(e){}   // 同期失敗してもログイン状態は維持
    } catch (e) { toast("通信エラー。ネットワークを確認してもう一度"); }
  }

  // アプリ内ブラウザ（Line/FB/IG/Threads/微信/Twitter/TikTok/Kakao/Naver…）は Google ログインをブロック → 白画面になる。
  function isInApp(){
    return /FBAN|FBAV|FB_IAB|Instagram|Line\/|MicroMessenger|Twitter|TikTok|KAKAOTALK|NAVER|Barcelona|BytedanceWebview/i.test(navigator.userAgent || "");
  }
  function copyUrl(){
    const url = location.href.split("#")[0];
    const msg = (typeof twT === "function" ? twT("inAppCopied") : "コピーしました");
    const done = () => { try { if (typeof window.showToast === "function") window.showToast(msg); } catch(e){} };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, done);
    else { const i=document.createElement("input"); i.value=url; document.body.appendChild(i); i.select(); try{document.execCommand("copy");}catch(e){} i.remove(); done(); }
  }
  // ── iOS/Android アプリ内（WebView）ブリッジ ──
  // 埋め込み WebView は Google/Apple OAuth を実行できない（Google が disallowed_useragent で拒否）。
  // → ネイティブ側で Apple/Google ログイン → /api/native-login → StayTW session を下の stwNativeLogin() で注入。
  const isNative = () => typeof window !== "undefined" && !!(window.STAYTW_NATIVE && window.STAYTW_NATIVE.isNativeApp);
  const postNative = obj => { try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(obj)); } catch (e) {} };

  // ネイティブが native-login 成功後に呼ぶ:worker session を受け取りログイン状態にする
  function applyNativeSession(sessionToken, u){
    if (!sessionToken) return;
    session = sessionToken; localStorage.setItem("stw_session", session);
    user = { email: (u && u.email) || "", name: (u && u.name) || "", picture: (u && u.picture) || "" };
    localStorage.setItem("stw_user", JSON.stringify(user));
    closeModal(); renderAuth();
    postNative({ type: "RC_LOGIN", payload: { uid: (u && u.uid) || "" } });   // RevenueCat を同 uid に紐付け
    try { if (typeof window.showToast === "function") window.showToast("ログインしました"); } catch (e) {}
    try { pullMerge(); } catch (e) {}
  }
  if (typeof window !== "undefined") window.stwNativeLogin = applyNativeSession;

  function login(){
    if (isNative()) {   // アプリ内:GIS は不可 → ネイティブの Apple/Google シートを開く
      postNative({ type: "OPEN_LOGIN", lang: localStorage.getItem("stw-lang") || "ja" });
      return;
    }
    const bg = document.getElementById("loginBg"); if (!bg) return;
    bg.classList.add("show");
    const note = document.getElementById("inAppNote"), gbtn = document.getElementById("gLoginBtn"), abtn = document.getElementById("aLoginBtn");
    if (isInApp()) {   // アプリ内ブラウザ:Google/Apple ボタンは白画面になるので、代わりに案内を出す
      if (note) note.style.display = "";
      if (gbtn) gbtn.style.display = "none";
      if (abtn) abtn.style.display = "none";
    } else {
      if (note) note.style.display = "none";
      if (gbtn) gbtn.style.display = "flex";
      renderGoogleBtn();
      // Apple ボタンは Services ID を設定済みのときだけ出す（未設定なら壊れないよう非表示）
      if (abtn) abtn.style.display = STW_APPLE_SERVICE_ID ? "flex" : "none";
      if (STW_APPLE_SERVICE_ID) loadAppleSdk();
    }
  }
  function renderGoogleBtn(){
    if (gBtnRendered) return;
    if (!window.google || !window.google.accounts) { setTimeout(renderGoogleBtn, 200); return; }
    google.accounts.id.initialize({ client_id: STW_WEB_CLIENT_ID, callback: onCredential, auto_select: false });
    const locale = ({ ja: "ja", en: "en", ko: "ko" })[localStorage.getItem("stw-lang")] || "ja";
    google.accounts.id.renderButton(document.getElementById("gLoginBtn"),
      { theme: "filled_black", size: "large", text: "signin_with", shape: "pill", width: 240, locale });
    gBtnRendered = true;
  }

  // ── Web Apple ログイン（Services ID の設定後に有効化）──
  let appleSdkLoading = false, appleSdkReady = false;
  function loadAppleSdk(cb){
    if (appleSdkReady || (window.AppleID && window.AppleID.auth)) { appleSdkReady = true; if (cb) cb(); return; }
    if (appleSdkLoading) return;
    appleSdkLoading = true;
    const s = document.createElement("script");
    s.src = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    s.async = true; s.onload = () => { appleSdkReady = true; if (cb) cb(); };
    document.head.appendChild(s);
  }
  async function loginApple(){
    const toast = m => { try { if (typeof window.showToast === "function") window.showToast(m); } catch(e){} };
    if (!STW_APPLE_SERVICE_ID) return;
    loadAppleSdk(async () => {
      try {
        window.AppleID.auth.init({ clientId: STW_APPLE_SERVICE_ID, scope: "name email", redirectURI: STW_APPLE_REDIRECT, usePopup: true });
        const res = await window.AppleID.auth.signIn();
        const idToken = res && res.authorization && res.authorization.id_token;
        if (!idToken) { toast("ログインに失敗しました。もう一度お試しください"); return; }
        const r = await fetch(STW_API + "/api/web-login", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider: "apple", token: idToken }) });
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d.sessionToken) { toast("ログインに失敗しました（サーバー）。少し待って再度お試しください"); return; }
        session = d.sessionToken; localStorage.setItem("stw_session", session);
        // Apple は初回のみ name を返す。以後は既存表示を保持。
        user = { email: d.email || (user && user.email) || "", name: d.name || (user && user.name) || "", picture: "" };
        localStorage.setItem("stw_user", JSON.stringify(user));
        closeModal(); renderAuth(); toast("ログインしました");
        try { await pullMerge(); } catch(e){}
      } catch (e) {
        // ユーザーが自分でポップアップを閉じた等は無視
        const m = String((e && e.error) || (e && e.message) || e);
        if (!/popup_closed|user_cancelled|user_trigger_new_signin_flow|cancel/i.test(m)) toast("通信エラー。ネットワークを確認してもう一度");
      }
    });
  }
  function closeModal(){ document.getElementById("loginBg")?.classList.remove("show"); }
  // アカウント削除（Apple 5.1.1(v)）：本人 session でサーバーの全データ削除 → ローカルも消してログアウト
  async function deleteAccount(){
    if (!session) return false;
    try {
      const r = await fetch(STW_API + "/api/delete-account", { method: "POST", headers: { Authorization: "Bearer " + session } });
      if (!r.ok) return false;
      session = null; user = null;
      localStorage.removeItem("stw_session"); localStorage.removeItem("stw_user");
      try { google.accounts.id.disableAutoSelect(); } catch (e) {}
      if (isNative()) postNative({ type: "NATIVE_LOGOUT" });
      renderAuth();
      return true;
    } catch (e) { return false; }
  }
  function logout(){
    session = null; user = null;
    localStorage.removeItem("stw_session"); localStorage.removeItem("stw_user");
    try { google.accounts.id.disableAutoSelect(); } catch (e) {}
    if (isNative()) postNative({ type: "NATIVE_LOGOUT" });   // ネイティブ側も signOut + RevenueCat を匿名へ
    renderAuth();
  }

  // ── ヘッダー表示 ──
  function renderAuth(){
    const el = document.getElementById("authBtn"); if (!el) return;
    el.style.display = "";
    if (session && user) {
      const label = (user.name || user.email || "?").trim().slice(0, 1).toUpperCase();
      el.innerHTML = `<button onclick="switchPanel('profile')" title="${(user.email||'')}"
        style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--ac);color:#fff;font-weight:700;font-size:13px;border:none;cursor:pointer">${label}</button>`;
    } else {
      el.innerHTML = `<button class="lang-btn" onclick="STW_WEB.login()">${(typeof twT==="function"?twT("navLogin"):"ログイン")}</button>`;
    }
    // ログイン状態に依存する画面（プロフィールの sign in/out 表示）も一緒に更新
    if (typeof window.twRerenderAll === "function") { try { window.twRerenderAll(); } catch(e){} }
  }

  // ── 同期 ──
  async function pullMerge(){
    if (!session) return;
    try {
      const r = await fetch(STW_API + "/api/progress", { headers: { Authorization: "Bearer " + session } });
      if (!r.ok) return;   // 同期失敗はスキップ（ログイン状態は保持。手動ログアウトのみ）
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
    // ストリーク：学習日の和集合
    if (cloud.stw_streak) {
      const c = parse(cloud.stw_streak, []), l = parse(localStorage.getItem("stw_streak"), []);
      const u = Array.from(new Set([...l, ...c])).sort();
      localStorage.setItem("stw_streak", JSON.stringify(u));
    }
    // 読了済みの読み物・記事：id の和集合
    ["stw_read", "stw_art_read"].forEach(k => {
      if (!cloud[k]) return;
      const c = parse(cloud[k], []), l = parse(localStorage.getItem(k), []);
      localStorage.setItem(k, JSON.stringify(Array.from(new Set([...l, ...c]))));
    });
    if (cloud["stw-level"] && !localStorage.getItem("stw-level")) localStorage.setItem("stw-level", cloud["stw-level"]);
    if (cloud.stw_goal && !localStorage.getItem("stw_goal")) localStorage.setItem("stw_goal", cloud.stw_goal);
  }

  async function push(){
    if (!session) return;
    const o = {}; SYNC_KEYS.forEach(k => { const v = localStorage.getItem(k); if (v != null) o[k] = v; });
    try {
      await fetch(STW_API + "/api/progress", {
        method: "PUT", headers: { "Content-Type": "application/json", Authorization: "Bearer " + session },
        body: JSON.stringify({ data: o }), keepalive: true });   // 離脱時でも送出できるよう keepalive
    } catch (e) {}
  }

  // SRS・模試の変更でクラウドへ（srs.js / mock-exam.js が window.onSRSChange を呼ぶ。デバウンス）
  let changeT = null;
  if (typeof window !== "undefined") window.onSRSChange = () => {
    if (!session) return; clearTimeout(changeT); changeT = setTimeout(push, 3000);
  };
  // 離脱時にも保存（学習した進度を取りこぼさない）
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && session) push(); });
  window.addEventListener("pagehide", () => { if (session) push(); });

  // 起動時：ログインボタンを即表示（GIS 読込を待たない）、GIS は裏で初期化、ログイン済なら同期
  renderAuth();
  if (session) pullMerge();
  initGoogle();

  return { login, logout, closeModal, initGoogle, copyUrl, isInApp, loginApple, deleteAccount, isLoggedIn: () => !!session, getUser: () => user, sync: pullMerge };
})();
// ★重要：STW_WEB は const 宣言なので window に自動では乗らない。renderProfile 等が
//   `window.STW_WEB && STW_WEB.isLoggedIn()` でログイン判定しており、window.STW_WEB が
//   undefined だと「ログイン済みでも常にゲスト表示（Sign in のまま・ログアウト無し）」になる。
if (typeof window !== "undefined") window.STW_WEB = STW_WEB;
