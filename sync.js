// StayTW Study — アカウント & クラウド同期（StayJP の auth-header.js と同じ方式）
// ・Google ログイン（Firebase Auth compat SDK を動的ロード）
// ・学習履歴（SRS + 模試結果）を Firestore users/{uid} に保存
// ・複数端末: ログイン時に「端末ローカル ⇔ クラウド」を単語ごとに新しい方で統合（lastReviewTs 比較）
// ・未ログイン / 未設定時は localStorage のみで動作（機能はすべて使える）
const Sync = (() => {
  const SDK = "https://www.gstatic.com/firebasejs/10.12.0/";
  let user = null, db = null, pushTimer = null, ready = false;

  const configured = () =>
    typeof STW_FIREBASE_CONFIG !== "undefined" && !/^YOUR_/.test(STW_FIREBASE_CONFIG.apiKey || "YOUR_");

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  async function init() {
    renderBtn(); // まず未ログイン状態で描画
    if (!configured()) return;
    try {
      if (typeof firebase === "undefined") {
        await loadScript(SDK + "firebase-app-compat.js");
        await loadScript(SDK + "firebase-auth-compat.js");
        await loadScript(SDK + "firebase-firestore-compat.js");
      }
      if (!firebase.apps.length) firebase.initializeApp(STW_FIREBASE_CONFIG);
      db = firebase.firestore();
      ready = true;
      firebase.auth().onAuthStateChanged(async u => {
        user = u;
        renderBtn();
        if (u) await pullAndMerge();
      });
    } catch (e) { console.warn("[sync] firebase init fail", e); }
  }

  async function login() {
    if (!ready) return;
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (e) { console.warn("[sync] login fail", e); }
  }
  async function logout() {
    if (confirm(twT("syncLogoutConfirm"))) await firebase.auth().signOut();
  }

  // ── 統合: 単語ごとに lastReviewTs が新しい方を採用（端末A/Bどちらで学習しても消えない）──
  function mergeSrs(local, cloud) {
    const out = { ...cloud };
    Object.entries(local).forEach(([k, v]) => {
      const c = out[k];
      if (!c || (v.lastReviewTs || 0) >= (c.lastReviewTs || 0)) out[k] = v;
    });
    return out;
  }
  function mergeHistory(local, cloud) {
    const seen = new Set(), out = [];
    [...cloud, ...local].forEach(h => {
      const key = h.ts + ":" + h.level;
      if (!seen.has(key)) { seen.add(key); out.push(h); }
    });
    return out.sort((a, b) => a.ts - b.ts).slice(-100);
  }

  async function pullAndMerge() {
    if (!user || !db) return;
    try {
      const snap = await db.collection("users").doc(user.uid).get();
      const cloud = snap.exists ? snap.data() : {};
      const srs = mergeSrs(SRS.getData(), cloud.srs || {});
      const hist = mergeHistory(MockExam.history(), cloud.examHistory || []);
      SRS._import(srs);
      MockExam._import(hist);
      await push(); // 統合結果をクラウドへ書き戻し
      if (typeof updateSrsBadges === "function") updateSrsBadges();
      if (typeof renderExamHome === "function") renderExamHome();
    } catch (e) { console.warn("[sync] pull fail", e); }
  }

  async function push() {
    if (!user || !db) return;
    try {
      await db.collection("users").doc(user.uid).set({
        srs: SRS.getData(),
        examHistory: MockExam.history(),
        displayName: user.displayName || "",
        updatedAt: Date.now()
      }, { merge: true });
    } catch (e) { console.warn("[sync] push fail", e); }
  }

  // SRS / 模試が保存されるたびに呼ばれる → 3秒デバウンスでクラウドへ
  function schedulePush() {
    if (!user || !db) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(push, 3000);
  }
  if (typeof window !== "undefined") window.onSRSChange = schedulePush;

  // ── ヘッダーのアカウントボタン ──
  function renderBtn() {
    const el = document.getElementById("authBtn");
    if (!el) return;
    if (!configured()) { el.style.display = "none"; return; }
    el.style.display = "";
    if (user) {
      const name = (user.displayName || "U").trim();
      el.innerHTML = `<button class="lang-btn" title="${name} — ${twT("syncLogout")}" onclick="Sync.logout()">☁️ ${name.split(/\s+/)[0].slice(0, 6)}</button>`;
    } else {
      el.innerHTML = `<button class="lang-btn" onclick="Sync.login()">${twT("syncLogin")}</button>`;
    }
  }

  return { init, login, logout, renderBtn, schedulePush };
})();
