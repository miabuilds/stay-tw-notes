// StayTW Study — 認証（Firebase Auth / Google ログイン）＋ 会員状態取得
// ・firebase-config.js が未設定（apiKey が "YOUR_"）の間は自動的に無効化 → 全員 taste 扱い
// ・ログイン成功 → /api/entitlement を叩いて access(premium/trial/taste) を Paywall へ反映
// ・7 日間体験はサーバ側（Worker）がログイン初回に自動発行する
const STW_API = "https://staytw-api.abc83327.workers.dev";

window.STW_AUTH = window.STW_AUTH || {
  configured: false, user: null, entitlement: null,
  login: () => { location.href = "pricing.html"; },
  logout: () => {},
  getIdToken: async () => null,
  refreshEntitlement: async () => {},
  onReady: (cb) => cb(null),
};

(function () {
  const cfg = (typeof STW_FIREBASE_CONFIG !== "undefined") ? STW_FIREBASE_CONFIG : null;
  const configured = cfg && cfg.apiKey && !/^YOUR_/.test(cfg.apiKey) && typeof firebase !== "undefined";
  if (!configured) {
    // 未設定：ログイン非表示、taste のまま
    try { if (window.Paywall) Paywall.setAccess(window.__STW_ENTITLED ? "premium" : "taste"); } catch (e) {}
    renderAuthBtn(null);
    return;
  }

  firebase.initializeApp(cfg);
  const auth = firebase.auth();
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
  const readyCbs = [];
  let readyFired = false;

  async function getIdToken() {
    const u = auth.currentUser;
    return u ? await u.getIdToken() : null;
  }

  async function fetchEntitlement() {
    const token = await getIdToken();
    if (!token) return null;
    try {
      const r = await fetch(STW_API + "/api/entitlement", { headers: { Authorization: "Bearer " + token } });
      if (!r.ok) return null;
      return await r.json();
    } catch (e) { return null; }
  }

  async function applyState(user) {
    window.STW_AUTH.user = user;
    if (user) {
      const ent = await fetchEntitlement();
      window.STW_AUTH.entitlement = ent;
      const access = (ent && ent.access) || "taste";
      if (window.Paywall) Paywall.setAccess(access, { trialEndsAt: ent && ent.trialEndsAt });
    } else {
      window.STW_AUTH.entitlement = null;
      if (window.Paywall) Paywall.setAccess(window.__STW_ENTITLED ? "premium" : "taste");
    }
    renderAuthBtn(user);
    if (!readyFired) { readyFired = true; readyCbs.forEach(cb => { try { cb(user); } catch (e) {} }); }
  }

  auth.onAuthStateChanged(applyState);

  Object.assign(window.STW_AUTH, {
    configured: true,
    get user() { return auth.currentUser; },
    login: async () => {
      try { await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); }
      catch (e) { console.warn("login cancelled", e); }
    },
    logout: async () => { await auth.signOut(); },
    getIdToken,
    refreshEntitlement: async () => { await applyState(auth.currentUser); },
    onReady: (cb) => { if (readyFired) cb(auth.currentUser); else readyCbs.push(cb); },
  });
})();

// ヘッダーのログイン / アカウントボタン
function renderAuthBtn(user) {
  const el = document.getElementById("authBtn");
  if (!el) return;
  const configured = window.STW_AUTH && window.STW_AUTH.configured;
  if (!configured) { el.style.display = "none"; return; }
  el.style.display = "";
  if (user) {
    const label = (user.displayName || user.email || "").slice(0, 1).toUpperCase() || "🐻";
    el.innerHTML = `<a href="account.html" title="${user.email || ""}"
        style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--ac);color:#fff;font-weight:700;font-size:13px;text-decoration:none">${label}</a>`;
  } else {
    el.innerHTML = `<button class="lang-btn" onclick="STW_AUTH.login()" data-i18n="navLogin">ログイン</button>`;
    if (typeof twApplyI18n === "function") twApplyI18n(el);
  }
}
