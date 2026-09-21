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
  // 2026-09-16: speak 5→2（跟讀是 App 限定＋日本人最需要的功能，當 Premium 招牌）；SRS 免費一次最多 SRS_FREE_CARDS 張
  const LIMITS = { quiz: 3, srs: 1, exam: 1, speak: 2, writing: 1, aiscore: 1 };
  const SRS_FREE_CARDS = 10;
  // 買い切りは年額の 2.2 倍しか取れていなかった（原価は永久に続くのに）。年額の約 3 倍へ。
  const PRICES = { monthly: "¥980", yearly: "¥5,800", lifetime: "¥17,800" };
  // 単語帳（★）の無料上限。辞書を引く人＝いちばん多い層が自然に Premium に出会う接点。
  const FAV_FREE_MAX = 20;
  // ストアの出し分け。以前は誰に対しても App Store を開いていたので、Android と PC の人には
  // 「買う手段が存在しない」状態だった（＝ web の売上がゼロだった理由）。
  const STORE_IOS = "https://apps.apple.com/app/id6794272037";
  const STORE_ANDROID = "https://play.google.com/store/apps/details?id=com.staytw.app";
  const ANDROID_LIVE = false;   // ★ Play 公開日に true にする（それまでは待機リストへ）
  function device() {
    const ua = (typeof navigator !== "undefined" && navigator.userAgent) || "";
    if (/android/i.test(ua)) return "android";
    if (/iphone|ipad|ipod/i.test(ua)) return "ios";
    return "desktop";
  }

  function today() { return new Date().toISOString().split("T")[0]; }
  function load() {
    try {
      const q = JSON.parse(localStorage.getItem(QUOTA_KEY)) || {};
      if (q.date !== today()) return { date: today(), counts: {} };
      return q;
    } catch (e) { return { date: today(), counts: {} }; }
  }
  function save(q) { localStorage.setItem(QUOTA_KEY, JSON.stringify(q)); }

  // ★ Web 無料公開フラグ：以前は Web 全解放だったが、iOS アプリ公開後は Web でも
  //   無料枠を適用し、上限に達したら「アプリで解鎖」へ誘導する（課金は App 内 IAP のみ）。
  //   コンテンツ（単語・文法・フレーズ・注音・辞書）は gate() を通さないので常に無料。
  const PREVIEW_FREE = false;
  // 無料開放するアカウント（メールのハッシュで判定。生メールを公開JSに載せないため）
  const WHITELIST_HASHES = ["81d521e5"];   // abc83327@gmail.com
  function fnv1a(s) { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16).padStart(8, "0"); }
  function isWhitelisted() {
    try {
      const u = JSON.parse(localStorage.getItem("stw_user") || "null");
      const email = u && u.email ? String(u.email).trim().toLowerCase() : "";
      return !!email && WHITELIST_HASHES.includes(fnv1a(email));
    } catch (e) { return false; }
  }
  function isPremium() {
    // Web は課金導線が無いので常に全解放（集客ファネル）。iOS アプリ内だけ課金を強制する。
    if (PREVIEW_FREE && !(typeof window !== "undefined" && window.ReactNativeWebView)) return true;
    if (isWhitelisted()) return true;                       // 指定アカウントは常に解鎖
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

  // 付費牆被看到幾次 = 轉換漏斗的分母。記到 hits(path=/__paywall/<feature>) 與 GA4 事件，後台「熱門路徑」就看得到。
  function track(feature) {
    try { fetch("/api/hit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/__paywall/" + feature, ref: location.pathname, app: !!(window.STAYTW_NATIVE && window.STAYTW_NATIVE.isNativeApp) }) }); } catch (e) {}
    try { if (typeof gtag === "function") gtag("event", "paywall_shown", { feature }); } catch (e) {}
  }

  // 「機能一覧」だけの paywall は効かない。ネイティブ側（src/components/Paywall.tsx）は
  // 実価格・月あたり・51%・無料試用まで出しているのに、web はどれも無かったので揃える。
  const TRIAL_DAYS = 7;                                   // App Store Connect の introductory offer（2026-09-16 設定）と一致
  const YEARLY_PER_MONTH = "¥483";                        // 5,800 / 12（切り上げ）
  // その人がすでに積んだもの（語数・連続日数）を出す。止めるのが惜しくなる方が、機能を並べるより強い。
  function investedLine() {
    let words = 0, streak = 0;
    try { words = Object.keys(JSON.parse(localStorage.getItem("stw_srs") || "{}")).length; } catch (e) {}
    try { streak = (typeof getStreak === "function" ? getStreak().cur : 0) || 0; } catch (e) {}
    if (words < 5) return "";                             // 始めたばかりの人に出しても白々しい
    const t = streak > 0 ? twT("pwInvestedBoth").replace("{w}", words).replace("{d}", streak)
                         : twT("pwInvested").replace("{w}", words);
    return `<p class="pw-invested">${t}</p>`;
  }

  function show(feature) {
    const bg = document.getElementById("pwBg");
    if (!bg) return;
    track(feature);
    const featName = { quiz: twT("toolQuiz"), srs: twT("toolSrs"), exam: twT("toolExam"), speak: twT("toolSpeak"), writing: twT("toolWrite"), aiscore: twT("wrAiScore"), listen: twT("lsTitle"), fav: twT("pwFavName") }[feature] || "";
    const desc = feature === "article" ? twT("pwContentHit")
      : feature === "fav" ? twT("pwFavHit").replace("{n}", String(FAV_FREE_MAX))
      : twT("pwLimitHit").replace("{f}", featName);
    document.getElementById("pwBox").innerHTML = `
      <button class="qclose" style="float:right" onclick="Paywall.close()">✕</button>
      <div style="text-align:center;padding:8px 0 4px">
        <img src="images/bear.svg" alt="" style="width:74px;height:auto">
        <h3 style="font-family:var(--serif);font-size:21px;font-weight:700;margin:10px 0 4px">${twT("pwTitle")}</h3>
        <p style="font-size:13.5px;color:var(--tx2)">${desc}</p>
      </div>
      ${investedLine()}
      <ul class="pw-benefits">
        <li>✓ ${twT("pwB1")}</li>
        <li>✓ ${twT("pwB2")}</li>
        <li>✓ ${twT("pwB3")}</li>
        <li>✓ ${twT("pwB4")}</li>
      </ul>
      <div class="pw-plans">
        <div class="pw-plan"><b>${PRICES.monthly}</b><span>${twT("pwMonthly")}</span></div>
        <div class="pw-plan hot"><span class="pw-tag">${twT("pwBest")}</span><b>${PRICES.yearly}</b><span>${twT("pwYearly")}</span>
          <em class="pw-per">${twT("pwPerMonth").replace("{p}", YEARLY_PER_MONTH)}</em></div>
        <div class="pw-plan"><b>${PRICES.lifetime}</b><span>${twT("pwLifetime")}</span></div>
      </div>
      <p class="pw-trial">🎁 ${twT("pwTrial").replace("{n}", String(TRIAL_DAYS))}</p>
      ${isNative() ? `<button class="btn primary" style="width:100%;padding:13px" onclick="Paywall.openNative()">${twT("pwCtaNative")}</button>` : webCta()}
      ${feature === "fav" || feature === "article" ? "" : `<p style="text-align:center;font-size:12px;color:var(--tx3);margin-top:10px">${twT("pwTomorrow")}</p>`}`;
    bg.classList.add("show");
  }

  function close() { document.getElementById("pwBg")?.classList.remove("show"); }
  function openNative() {
    try { window.ReactNativeWebView.postMessage(JSON.stringify({ type: "OPEN_PAYWALL", lang: twGetLang() })); } catch (e) {}
  }
  // Web の CTA。iPhone なら App Store、Android は（公開後）Play、まだなら待機リスト、PC は両方案内。
  function webCta() {
    const d = device();
    const label = d === "android" ? (ANDROID_LIVE ? twT("pwCtaAndroid") : twT("pwCtaAndroidSoon")) : twT("pwCtaIos");
    const note = d === "desktop" ? twT("pwWebNoteDesktop") : twT("pwWebNote");
    const sub = (d !== "android" && !ANDROID_LIVE)
      ? `<p style="font-size:12px;margin-top:6px"><a href="javascript:void(0)" onclick="Paywall.androidWait()" style="color:var(--ac)">${twT("pwAndroidWaitLink")}</a></p>` : "";
    return `<div style="text-align:center">
        <button class="btn primary" style="width:100%;padding:13px" onclick="Paywall.openStore()">${label}</button>
        <p style="font-size:12px;color:var(--tx3);margin-top:8px">${note}</p>${sub}
      </div>`;
  }
  function openStore() {
    const d = device();
    if (d === "android") { if (ANDROID_LIVE) window.open(STORE_ANDROID, "_blank"); else androidWait(); return; }
    window.open(STORE_IOS, "_blank");
  }
  // Play 版がまだ無い間、Android の人を取りこぼさないためのメール待機リスト（/api/subscribe に貯める）。
  function androidWait() {
    const bg = document.getElementById("pwBg"), box = document.getElementById("pwBox");
    if (!bg || !box) return;
    box.innerHTML = `
      <button class="qclose" style="float:right" onclick="Paywall.close()">✕</button>
      <div style="text-align:center;padding:8px 0 4px">
        <img src="images/bear.svg" alt="" style="width:66px;height:auto">
        <h3 style="font-family:var(--serif);font-size:20px;font-weight:700;margin:10px 0 4px">${twT("pwAndroidTitle")}</h3>
        <p style="font-size:13.5px;color:var(--tx2);margin-bottom:12px">${twT("pwAndroidDesc")}</p>
      </div>
      <input id="pwAwMail" type="email" inputmode="email" autocomplete="email" placeholder="you@example.com"
             style="width:100%;padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--bg2);color:var(--tx);font:inherit;font-size:15px">
      <button class="btn primary" style="width:100%;padding:13px;margin-top:10px" onclick="Paywall.androidWaitSend()">${twT("pwAndroidCta")}</button>
      <p id="pwAwMsg" style="text-align:center;font-size:12px;color:var(--tx3);margin-top:10px">${twT("pwAndroidNote")}</p>`;
    bg.classList.add("show");
    try { document.getElementById("pwAwMail").focus(); } catch (e) {}
  }
  async function androidWaitSend() {
    const el = document.getElementById("pwAwMail"), msg = document.getElementById("pwAwMsg");
    const email = (el && el.value || "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { if (msg) { msg.textContent = twT("pwAndroidBad"); msg.style.color = "var(--ac)"; } return; }
    let ok = false;
    try {
      const r = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang: (typeof twGetLang === "function" ? twGetLang() : ""), source: "android_wait" }) });
      ok = r.ok;
    } catch (e) {}
    if (!ok) { if (msg) { msg.textContent = twT("pwAndroidFail"); msg.style.color = "var(--ac)"; } return; }
    if (msg) { msg.textContent = twT("pwAndroidThanks"); msg.style.color = "var(--tx3)"; }
    if (el) el.style.display = "none";
    document.querySelector("#pwBox .btn.primary")?.remove();
  }

  // ネイティブ側から window.stwSetEntitled(true/false) を注入して呼ぶ
  if (typeof window !== "undefined") window.stwSetEntitled = setEntitled;

  return { gate, isPremium, setEntitled, quotaBadge, left, show, close, openNative, openStore, androidWait, androidWaitSend, device, ANDROID_LIVE, LIMITS, SRS_FREE_CARDS, FAV_FREE_MAX };
})();
// ★重要：Paywall は const 宣言なので window に自動では乗らない。renderProfile / twUpgrade が
//   window.Paywall で判定・呼び出しており、undefined だと「アップグレード無反応」になる（TTS/STW_WEB と同じ罠）。
if (typeof window !== "undefined") window.Paywall = Paywall;
