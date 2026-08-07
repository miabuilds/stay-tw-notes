// StayTW — Google Analytics 4 (gtag.js)
// 使い方：下の GA_ID を自分の GA4 測定ID（G-BCW3HQM5S4）に置き換えるだけ。
// 全ページ共通。ID が未設定（プレースホルダ）のときは何も読み込まない＝無害。
(function () {
  var GA_ID = "G-BCW3HQM5S4";           // ← ここに GA4 の測定IDを入れる
  if (!GA_ID || GA_ID.indexOf("XXXX") >= 0) return;   // 未設定なら発火しない
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
})();
