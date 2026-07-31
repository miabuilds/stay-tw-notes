// StayTW Study — アクセス制御（3 段階：taste / trial / premium）
// ・taste  … 未ログイン or 体験終了：Level 1 の単語カード・単語リスト・フレーズのみ無料
// ・trial  … ログイン直後から 7 日間：全機能フル解放（体験）
// ・premium… 課金済み（Web=綠界ECPay / iOS=IAP）：全機能フル解放
// アクセス状態の出所（優先順）:
//   1. iOS ネイティブ … window.stwSetEntitled(true) 注入 → premium 扱い
//   2. Web … auth.js が /api/entitlement を取得して Paywall.setAccess(access) を呼ぶ
//   3. 既定 … taste
// 「フル機能」判定 = premium || trial（どちらも解錠）。
const Paywall = (() => {
  // 表示用の基準価格（ブランド通貨 JPY。Web の実決済は綠界 TWD 等価）
  const PRICES = { monthly: "¥980", yearly: "¥5,800", lifetime: "¥12,800" };

  let _access = "taste";        // premium / trial / taste（Web）
  let _trialEndsAt = null;      // epoch ms（trial のとき）

  // ── フル機能アクセスがあるか ──
  function hasFull() {
    if (typeof window !== "undefined" && window.__STW_ENTITLED) return true;   // iOS native
    return _access === "premium" || _access === "trial";
  }
  const isPremium = hasFull;    // 後方互換（既存呼び出し用）

  function trialDaysLeft() {
    if (_access !== "trial" || !_trialEndsAt) return 0;
    return Math.max(0, Math.ceil((_trialEndsAt - Date.now()) / 864e5));
  }

  // auth.js から呼ばれる：Web のアクセス状態を反映
  function setAccess(access, meta) {
    _access = access || "taste";
    _trialEndsAt = (meta && meta.trialEndsAt) || null;
    if (typeof twRerenderAll === "function") { try { twRerenderAll(); } catch (e) {} }
    close();
  }
  // ネイティブ / 互換：window.stwSetEntitled(true/false)
  function setEntitled(on) {
    if (typeof window !== "undefined") window.__STW_ENTITLED = !!on;
    if (on) localStorage.setItem("stw_premium", "1"); else localStorage.removeItem("stw_premium");
    if (typeof twRerenderAll === "function") { try { twRerenderAll(); } catch (e) {} }
    close();
  }

  // ── ゲート：フル機能なら実行、無ければ Paywall 表示 ──
  // 既存の呼び出し Paywall.gate('quiz', fn) をそのまま活かす（意味を「計次」→「権限」に変更）
  function gate(context, fn) {
    if (hasFull()) { fn(); return true; }
    show(context);
    return false;
  }
  // レベル切替ゲート：L1 は誰でも可、L2-5 はフル機能のみ
  function requireLevel(lv) {
    if (lv === "l1" || hasFull()) return true;
    show("level");
    return false;
  }

  // ツールのホーム画面に出すバッジ（体験カウントダウン / ロック表示）
  function quotaBadge(context) {
    if (_access === "premium" || (typeof window !== "undefined" && window.__STW_ENTITLED)) return "";
    if (_access === "trial") {
      return `<div class="pw-quota trial">🎁 ${twT("pwTrialLeft").replace("{n}", trialDaysLeft())}</div>`;
    }
    return `<div class="pw-quota locked">🔒 ${twT("pwLocked")}</div>`;
  }

  const isNative = () => typeof window !== "undefined" && !!window.ReactNativeWebView;
  const loggedIn = () => typeof window !== "undefined" && window.STW_AUTH && window.STW_AUTH.user;
  const authReady = () => typeof window !== "undefined" && window.STW_AUTH && window.STW_AUTH.configured;

  function show(context) {
    const bg = document.getElementById("pwBg");
    if (!bg) return;
    const title = (_access === "trial" || loggedIn()) ? twT("pwTrialEnded") : twT("pwTitle");

    let cta;
    if (isNative()) {
      cta = `<button class="btn primary" style="width:100%;padding:13px" onclick="Paywall.openNative()">🔓 ${twT("pwCtaNative")}</button>`;
    } else if (authReady() && !loggedIn()) {
      cta = `<button class="btn primary" style="width:100%;padding:13px" onclick="Paywall.loginTrial()">🎁 ${twT("pwLoginTrial")}</button>
             <div style="text-align:center;margin-top:8px"><a href="pricing.html" style="font-size:13px;color:var(--tx2)">${twT("pwViewPlans")} →</a></div>`;
    } else {
      cta = `<a class="btn primary" href="pricing.html" style="display:block;text-align:center;width:100%;padding:13px;box-sizing:border-box;text-decoration:none">${twT("pwViewPlans")}</a>`;
    }

    document.getElementById("pwBox").innerHTML = `
      <button class="qclose" style="float:right" onclick="Paywall.close()">✕</button>
      <div style="text-align:center;padding:8px 0 4px">
        <img src="images/bear.svg" alt="" style="width:74px;height:auto">
        <h3 style="font-family:var(--serif);font-size:21px;font-weight:700;margin:10px 0 4px">${title}</h3>
        <p style="font-size:13.5px;color:var(--tx2)">${twT("pwLead")}</p>
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
      ${cta}`;
    bg.classList.add("show");
  }

  function close() { document.getElementById("pwBg")?.classList.remove("show"); }
  function loginTrial() {
    close();
    if (window.STW_AUTH && window.STW_AUTH.login) window.STW_AUTH.login();
    else location.href = "pricing.html";
  }
  function openNative() {
    try { window.ReactNativeWebView.postMessage(JSON.stringify({ type: "OPEN_PAYWALL", lang: twGetLang() })); } catch (e) {}
  }

  if (typeof window !== "undefined") window.stwSetEntitled = setEntitled;

  return { gate, requireLevel, hasFull, isPremium, setAccess, setEntitled, trialDaysLeft,
           quotaBadge, show, close, loginTrial, openNative, access: () => _access };
})();
