// StayTW Study — 付費牆＋每日免費額度（StayJP「內容免費、工具計次」模式）
// ・内容（単語リスト・文法・フレーズ閲覧）は永久無料
// ・練習ツールは1日の無料枠つき → 使い切ると Paywall モーダル
// ・解鎖状態の出所（優先順）:
//     1. iOS ネイティブ（WebView から window.stwSetEntitled(true) を注入 / postMessage）
//     2. Firestore users/{uid}.premium（ログイン時に sync.js が反映）
//     3. localStorage "stw_premium"
// ・iOS シェル内では「アップグレード」→ ReactNativeWebView.postMessage({type:"OPEN_PAYWALL"})
//   単体 Web では「iOS アプリで解鎖」の案内を表示（Web 決済はやらない方針）
const Paywall = (() => {
  const QUOTA_KEY = "stw_quota";
  // 1日の無料枠（プレミアムで無制限）
  const LIMITS = { quiz: 3, srs: 1, exam: 1, speak: 5, writing: 1 };
  const PRICES = { monthly: "¥980", yearly: "¥5,800", lifetime: "¥12,800" };

  function today() { return new Date().toISOString().split("T")[0]; }
  function load() {
    try {
      const q = JSON.parse(localStorage.getItem(QUOTA_KEY)) || {};
      if (q.date !== today()) return { date: today(), counts: {} };
      return q;
    } catch (e) { return { date: today(), counts: {} }; }
  }
  function save(q) { localStorage.setItem(QUOTA_KEY, JSON.stringify(q)); }

  function isPremium() {
    if (typeof window !== "undefined" && window.__STW_ENTITLED) return true;
    return localStorage.getItem("stw_premium") === "1";
  }
  // ネイティブ / sync.js から呼ばれる
  function setEntitled(on) {
    if (on) localStorage.setItem("stw_premium", "1");
    else localStorage.removeItem("stw_premium");
    if (typeof window !== "undefined") window.__STW_ENTITLED = !!on;
    document.querySelectorAll(".pw-quota").forEach(el => el.remove());
    close();
  }

  function used(feature) { return load().counts[feature] || 0; }
  function left(feature) { return Math.max(0, (LIMITS[feature] || 0) - used(feature)); }

  // gate: 枠が残っていれば消費して実行、無ければ Paywall を表示
  function gate(feature, fn) {
    if (isPremium()) { fn(); return true; }
    const q = load();
    const n = q.counts[feature] || 0;
    if (n >= (LIMITS[feature] || 0)) { show(feature); return false; }
    q.counts[feature] = n + 1;
    save(q);
    fn();
    return true;
  }

  // ツールのホーム画面に出す残り枠バッジ
  function quotaBadge(feature) {
    if (isPremium()) return "";
    return `<div class="pw-quota">${twT("pwQuotaLeft")}: <b>${left(feature)} / ${LIMITS[feature]}</b></div>`;
  }

  const isNative = () => typeof window !== "undefined" && !!window.ReactNativeWebView;

  function show(feature) {
    const bg = document.getElementById("pwBg");
    if (!bg) return;
    const featName = { quiz: twT("toolQuiz"), srs: twT("toolSrs"), exam: twT("toolExam"), speak: twT("toolSpeak"), writing: twT("toolWrite") }[feature] || "";
    document.getElementById("pwBox").innerHTML = `
      <button class="qclose" style="float:right" onclick="Paywall.close()">✕</button>
      <div style="text-align:center;padding:8px 0 4px">
        <img src="images/bear.svg" alt="" style="width:74px;height:auto">
        <h3 style="font-family:var(--serif);font-size:21px;font-weight:700;margin:10px 0 4px">${twT("pwTitle")}</h3>
        <p style="font-size:13.5px;color:var(--tx2)">${twT("pwLimitHit").replace("{f}", featName)}</p>
      </div>
      <ul class="pw-benefits">
        <li>✓ ${twT("pwB1")}</li>
        <li>✓ ${twT("pwB2")}</li>
        <li>✓ ${twT("pwB3")}</li>
        <li>✓ ${twT("pwB4")}</li>
      </ul>
      <div class="pw-plans">
        <div class="pw-plan"><b>${PRICES.monthly}</b><span>${twT("pwMonthly")}</span></div>
        <div class="pw-plan hot"><span class="pw-tag">${twT("pwBest")}</span><b>${PRICES.yearly}</b><span>${twT("pwYearly")}</span></div>
        <div class="pw-plan"><b>${PRICES.lifetime}</b><span>${twT("pwLifetime")}</span></div>
      </div>
      ${isNative()
        ? `<button class="btn primary" style="width:100%;padding:13px" onclick="Paywall.openNative()">${twT("pwCtaNative")}</button>`
        : `<div style="text-align:center">
             <button class="btn primary" style="width:100%;padding:13px" onclick="Paywall.openStore()"> ${twT("pwCtaIos")}</button>
             <p style="font-size:12px;color:var(--tx3);margin-top:8px">${twT("pwWebNote")}</p>
           </div>`}
      <p style="text-align:center;font-size:12px;color:var(--tx3);margin-top:10px">${twT("pwTomorrow")}</p>`;
    bg.classList.add("show");
  }

  function close() { document.getElementById("pwBg")?.classList.remove("show"); }
  function openNative() {
    try { window.ReactNativeWebView.postMessage(JSON.stringify({ type: "OPEN_PAYWALL", lang: twGetLang() })); } catch (e) {}
  }
  function openStore() {
    // App Store URL（上架後に差し替え）
    window.open("https://apps.apple.com/app/staytw", "_blank");
  }

  // ネイティブ側から window.stwSetEntitled(true/false) を注入して呼ぶ
  if (typeof window !== "undefined") window.stwSetEntitled = setEntitled;

  return { gate, isPremium, setEntitled, quotaBadge, left, show, close, openNative, openStore, LIMITS };
})();
