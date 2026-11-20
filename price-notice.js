/* 月費調整預告(五站共用,正本在 stayhq/shared/price-notice.js,改完複製到各站)
 * 2026-11-19 Mia:月費低於 299 的 App,2026-11-26 起一律 NT$299;先預告一週。在那之前訂閱的人維持原價。
 * 到期自動不顯示(之後整支可以移除)。已是 Premium 的人不顯示。
 * 用法(各站 index.html,放在 paywall.js 之後):
 *   window.PRICE_NOTICE = { lang: function(){...}, premium: function(){...}, open: function(){...},
 *                           langs: ["zh-TW","zh-CN"],   // 只對這些介面語言顯示(省略=全部)
 *                           price: "NT$299" };          // 省略=不寫金額(各地區金額不同的站)
 * 文字用 textContent 放進去,不放圖示。
 */
(function () {
  var END = Date.parse("2026-11-26T00:00:00+08:00");
  if (Date.now() >= END) return;
  var C = window.PRICE_NOTICE || {};
  var T = {
    "zh-TW": { a: "11/26 起，月繳方案調整為每月 {p}。", n: "11/26 起，月繳方案的價格會調整。", b: "在那之前訂閱，之後續訂都維持現在的價格。", go: "看方案", x: "關閉" },
    "zh-CN": { a: "11/26 起，月付方案调整为每月 {p}。", n: "11/26 起，月付方案的价格会调整。", b: "在那之前订阅，之后续订都维持现在的价格。", go: "看方案", x: "关闭" },
    ja: { n: "11月26日から、月額プランの料金が変わります。", b: "それまでに登録した方は、今の料金のまま続けられます。", go: "プランを見る", x: "閉じる" },
    ko: { n: "11월 26일부터 월간 플랜 요금이 인상됩니다.", b: "그 전에 구독하시면 지금 요금이 계속 유지됩니다.", go: "플랜 보기", x: "닫기" },
    en: { n: "The monthly plan price goes up on Nov 26.", b: "Subscribe before then and you keep today's price.", go: "See plans", x: "Close" },
    vi: { n: "Từ ngày 26/11, giá gói tháng sẽ tăng.", b: "Đăng ký trước ngày đó để giữ nguyên mức giá hiện tại.", go: "Xem các gói", x: "Đóng" },
    id: { n: "Mulai 26 November, harga paket bulanan akan naik.", b: "Berlangganan sebelum tanggal itu dan harga Anda tetap seperti sekarang.", go: "Lihat paket", x: "Tutup" }
  };
  function lang() { try { return (C.lang && C.lang()) || "en"; } catch (e) { return "en"; } }
  function premium() { try { return !!(C.premium && C.premium()); } catch (e) { return false; } }
  // 關掉後不再出現;最後 48 小時再提醒一次
  function phase() { return END - Date.now() <= 48 * 3600e3 ? "last" : "early"; }
  function dismissed() { try { return localStorage.getItem("price_notice_1126") === phase(); } catch (e) { return false; } }
  function dismiss() { try { localStorage.setItem("price_notice_1126", phase()); } catch (e) {} }

  function css() {
    if (document.getElementById("pnCss")) return;
    var s = document.createElement("style"); s.id = "pnCss";
    s.textContent = ".pn-card{display:flex;align-items:flex-start;gap:12px;margin:14px 16px 14px;padding:14px 14px 14px 16px;border:1.5px solid var(--ac,#B8362A);border-radius:16px;background:var(--ac-soft,rgba(184,54,42,.08));color:var(--tx,#1C1C1E);font-size:14px;line-height:1.55}"
      + ".pn-txt{flex:1;min-width:0}.pn-txt b{display:block;font-weight:700}.pn-txt span{display:block;margin-top:2px;color:var(--tx2,#6A6A6A);font-size:13px}"
      + ".pn-go{margin-top:10px;padding:8px 16px;min-height:36px;border:0;border-radius:999px;background:var(--ac,#B8362A);color:#fff;font-size:13px;font-weight:700;cursor:pointer}"
      + ".pn-x{flex:none;width:32px;height:32px;margin:-4px -4px 0 0;border:0;border-radius:50%;background:transparent;color:var(--tx2,#6A6A6A);font-size:20px;line-height:1;cursor:pointer}"
      + ".pn-card[hidden]{display:none}";
    document.head.appendChild(s);
  }
  function build() {
    var l = lang(), t = T[l] || T.en;
    var el = document.createElement("div"); el.className = "pn-card"; el.setAttribute("role", "note");
    var tx = document.createElement("div"); tx.className = "pn-txt";
    var b = document.createElement("b"); b.textContent = (C.price && t.a) ? t.a.replace("{p}", C.price) : t.n;
    var sp = document.createElement("span"); sp.textContent = t.b;
    tx.appendChild(b); tx.appendChild(sp);
    if (C.open) {
      var go = document.createElement("button"); go.type = "button"; go.className = "pn-go"; go.textContent = t.go;
      go.onclick = function () { try { C.open(); } catch (e) {} };
      tx.appendChild(go);
    }
    var x = document.createElement("button"); x.type = "button"; x.className = "pn-x"; x.setAttribute("aria-label", t.x); x.textContent = "×";
    x.onclick = function () { dismiss(); refresh(); };
    el.appendChild(tx); el.appendChild(x);
    return el;
  }
  function refresh() {
    var show = Date.now() < END && !premium() && !dismissed() && (!C.langs || C.langs.indexOf(lang()) >= 0);
    var olds = document.querySelectorAll(".pn-card");
    for (var i = 0; i < olds.length; i++) olds[i].parentNode.removeChild(olds[i]);
    if (!show) return;
    css();
    // 放在首頁內容框的「前面」(同一個面板裡):內容框會整個重畫,放裡面會被洗掉
    var ids = C.before || ["homeBox", "pathBox", "paBody"];
    for (var j = 0; j < ids.length; j++) {
      var box = document.getElementById(ids[j]);
      if (box && box.parentNode) box.parentNode.insertBefore(build(), box);
    }
  }
  window.PriceNotice = { refresh: refresh };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", refresh); else refresh();
  setTimeout(refresh, 2500);    // 登入 / 付費狀態晚一點才回來
  setTimeout(refresh, 8000);
})();
