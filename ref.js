// KOL 推廣碼(六站共用一組碼,正本在 StayHQ partners;後端 /api/ref/* 會去總部驗證)
// ・?ref=碼 進站 → 是 KOL 碼就記住(stw_kref)＋寫 staypay_ref(網頁綠界結帳 webpay.js 自動套 9 折推薦價)
//   ※ ?ref= 也可能是「朋友推薦」的個人碼(websync.js stw_ref,送天數)— 不是 KOL 碼就不碰,交給 websync
// ・App 內 → REF_CODE 交給原生 → RevenueCat 屬性 ref_code＋改賣 yearly_ref / lifetime_ref 推薦價商品
// ・App 第一次開啟、裝置上沒碼 → /api/ref/auto 用同網路 72 小時內的點擊對回來
// ・有登入 → /api/ref/attach 綁帳號(換手機也算)
// ・設定頁可手動輸入;iOS App 內整塊不顯示、不跳任何提示(Apple 3.1.1:App 內不能有輸碼欄)
const STWRef = (() => {
  const KEY = "stw_kref", KEY_NAME = "stw_kref_name", KEY_ATT = "stw_kref_att", KEY_AUTO = "stw_kref_auto", PAY = "staypay_ref";
  const ls = {
    get: (k) => { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
    del: (k) => { try { localStorage.removeItem(k); } catch (e) {} },
  };
  const inApp = () => !!window.ReactNativeWebView;
  const isIOSApp = () => inApp() && ((window.STAYTW_NATIVE || {}).platform === "ios");
  const post = (o) => { try { window.ReactNativeWebView.postMessage(JSON.stringify(o)); } catch (e) {} };
  const norm = (c) => String(c || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 24);
  const get = () => ls.get(KEY);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const S = {
    ja: { label: "紹介コード", ph: "紹介コードを入力", apply: "適用", ok: "紹介コードを適用しました", bad: "この紹介コードは見つかりません", net: "通信が不安定です。しばらくしてからお試しください", on: "適用済み。紹介してくれたクリエイターの応援になります。", hint: "クリエイターの紹介で来ましたか？その人のコードを入れると応援になります。" },
    en: { label: "Referral code", ph: "Enter a referral code", apply: "Apply", ok: "Referral code applied", bad: "Code not found", net: "Connection problem, please try again later", on: "Applied. Thanks for supporting the creator who sent you.", hint: "Came here from a creator? Enter their code to support them." },
    ko: { label: "추천 코드", ph: "추천 코드 입력", apply: "적용", ok: "추천 코드가 적용되었습니다", bad: "추천 코드를 찾을 수 없습니다", net: "네트워크가 불안정합니다. 잠시 후 다시 시도해 주세요", on: "적용 완료. 소개해 준 크리에이터에게 응원이 됩니다.", hint: "크리에이터 소개로 오셨나요? 그분의 코드를 입력하면 응원이 됩니다." },
    vi: { label: "Mã giới thiệu", ph: "Nhập mã giới thiệu", apply: "Áp dụng", ok: "Đã áp dụng mã giới thiệu", bad: "Không tìm thấy mã này", net: "Mạng không ổn định, vui lòng thử lại sau", on: "Đã áp dụng. Cảm ơn bạn đã ủng hộ người giới thiệu.", hint: "Bạn đến từ một nhà sáng tạo? Nhập mã của họ để ủng hộ." },
    id: { label: "Kode referral", ph: "Masukkan kode referral", apply: "Pakai", ok: "Kode referral dipakai", bad: "Kode tidak ditemukan", net: "Koneksi bermasalah, coba lagi nanti", on: "Sudah dipakai. Terima kasih sudah mendukung kreator yang mengajakmu.", hint: "Datang dari kreator? Masukkan kodenya untuk mendukung mereka." },
  };
  const T = (k) => { let l = "ja"; try { l = (window.twGetLang && twGetLang()) || "ja"; } catch (e) {} return (S[l] || S.en)[k]; };
  const toast = (m) => { if (isIOSApp()) return; try { if (window.showToast) showToast(m); } catch (e) {} };

  function save(code, name) {
    ls.set(KEY, code);
    ls.set(PAY, code);              // webpay.js(共用綠界結帳)讀這個 → 年費/買斷自動套推薦價
    if (name) ls.set(KEY_NAME, name);
    sync();
    render();
  }
  // 交給原生＋綁帳號(重複呼叫沒關係,兩邊都會自己略過)
  function sync() {
    const code = get();
    if (!code) return;
    if (inApp()) post({ type: "REF_CODE", payload: { code } });
    if (!inApp() && !ls.get(PAY)) ls.set(PAY, code);
    const sess = ls.get("stw_session");
    if (sess && ls.get(KEY_ATT) !== code + "|" + sess.slice(-12)) {
      fetch("/api/ref/attach", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + sess }, body: JSON.stringify({ code }) })
        .then((r) => r.ok && ls.set(KEY_ATT, code + "|" + sess.slice(-12))).catch(() => {});
    }
  }

  async function fromUrl() {
    let code = "";
    try { code = norm(new URLSearchParams(location.search).get("ref")); } catch (e) {}
    if (!code) return;
    try {
      const r = await (await fetch("/api/ref/hit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) })).json();
      if (!r.ok) {
        // 不是 KOL 碼(多半是朋友推薦的個人碼):webpay.js 會把任何 ?ref= 塞進 staypay_ref,結帳時會顯示「查無此碼」→ 清掉
        const clean = () => { if (ls.get(PAY) === code && get() !== code) ls.del(PAY); };
        clean(); window.addEventListener("load", () => setTimeout(clean, 1500));
        return;
      }
      if (!get()) { save(r.code, r.name); toast(T("ok") + " " + r.code); }
      else if (!ls.get(PAY)) ls.set(PAY, get());
    } catch (e) {}
  }

  // App 第一次開啟:裝置上沒碼就問一次後端(只問一次)
  async function autoInApp() {
    if (!inApp() || get() || ls.get(KEY_AUTO)) return;
    ls.set(KEY_AUTO, String(Date.now()));
    try {
      const r = await (await fetch("/api/ref/auto")).json();
      if (r.ok && !get()) save(r.code, r.name);
    } catch (e) {}
  }

  async function submit() {
    const inp = document.getElementById("refInput");
    const code = norm(inp && inp.value);
    if (!code) return;
    try {
      const r = await (await fetch("/api/ref/check?code=" + encodeURIComponent(code))).json();
      if (!r.ok) { toast(T("bad")); return; }
      save(r.code, r.name);
      toast(T("ok") + " " + r.code);
    } catch (e) { toast(T("net")); }
  }

  // 設定頁(個人頁)的輸入框:#refBox。iOS App 內整塊隱藏
  function render() {
    const box = document.getElementById("refBox");
    if (!box) return;
    if (isIOSApp()) { box.hidden = true; box.innerHTML = ""; return; }
    box.hidden = false;
    const code = get(), name = ls.get(KEY_NAME);
    box.innerHTML = `<div class="pf-ref"><div class="pf-ref-h">${esc(T("label"))}</div>` + (code
      ? `<div class="pf-ref-code"><span><b>${esc(code)}</b>${name ? " ・ " + esc(name) : ""}</span></div>
         <div class="pf-ref-stat">${esc(T("on"))}</div>`
      : `<p class="pf-ref-d">${esc(T("hint"))}</p>
         <div class="pf-ref-code"><input id="refInput" inputmode="text" autocomplete="off" autocapitalize="characters" maxlength="24" placeholder="${esc(T("ph"))}"
           style="flex:1;min-width:0;font-size:14px;color:var(--tx);background:var(--bg);border:1px solid var(--line);border-radius:9px;padding:9px 11px"
           onkeydown="if(event.key==='Enter'){event.preventDefault();STWRef.submit();}">
         <button class="btn" onclick="STWRef.submit()">${esc(T("apply"))}</button></div>`) + `</div>`;
  }

  function start() {
    fromUrl().then(() => { sync(); autoInApp(); });
    render();
  }
  return { start, submit, render, sync, get };
})();
window.STWRef = STWRef;
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => STWRef.start());
else STWRef.start();
