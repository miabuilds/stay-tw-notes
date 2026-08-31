// アプリ内ブラウザ（Instagram / Facebook / LINE / X / TikTok / WeChat など）検知バナー。
// これらの WebView では Google ログイン(OAuth)が弾かれ、App Store リンクも開けないことがあるため、
// 「Safari/Chrome で開いてね」＋リンクコピーを促す。ネイティブ App(WebView) では出さない。
(function () {
  try {
    if (window.STAYTW_NATIVE || window.ReactNativeWebView) return;   // 自社ネイティブアプリは対象外
    var ua = navigator.userAgent || "";
    var inApp = /(Instagram|FBAN|FBAV|FB_IAB|FBIOS|Line\/|Twitter|musical_ly|Bytedance|TikTok|Snapchat|MicroMessenger|WeChat|KAKAOTALK|WhatsApp|Threads)/i.test(ua);
    // iOS の in-app WebView は Safari を名乗らないことが多い（保険判定）
    var iosInApp = /iPhone|iPod|iPad/i.test(ua) && !/Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua);
    if (!inApp && !iosInApp) return;

    var lang = "ja";
    try { lang = localStorage.getItem("stw-lang") || "ja"; } catch (e) {}
    var T = {
      ja: { msg: "アプリ内ブラウザではログインや App Store が開けないことがあります。リンクをコピーして Safari / Chrome で開いてください。", copy: "リンクをコピー", copied: "✓ コピーしました。Safari / Chrome に貼り付けて開いてください", close: "閉じる" },
      en: { msg: "In-app browsers can block sign-in and the App Store. Copy the link and open it in Safari / Chrome.", copy: "Copy link", copied: "✓ Copied — paste it into Safari / Chrome", close: "Close" },
      ko: { msg: "인앱 브라우저에서는 로그인·App Store가 안 될 수 있어요. 링크를 복사해 Safari / Chrome에서 열어 주세요.", copy: "링크 복사", copied: "✓ 복사됨 — Safari / Chrome에 붙여넣어 여세요", close: "닫기" }
    };
    var t = T[lang] || T.en;

    function build() {
      if (document.getElementById("inAppBar")) return;
      var bar = document.createElement("div");
      bar.id = "inAppBar";
      bar.setAttribute("role", "alert");
      bar.style.cssText = "position:fixed;left:0;right:0;top:0;z-index:2147483000;background:#B8362A;color:#fff;padding:calc(env(safe-area-inset-top) + 10px) 14px 12px;font-family:-apple-system,'Hiragino Sans','Noto Sans JP',sans-serif;font-size:13px;line-height:1.55;box-shadow:0 2px 12px rgba(0,0,0,.25)";
      var wrap = document.createElement("div");
      wrap.style.cssText = "max-width:640px;margin:0 auto;display:flex;gap:10px;align-items:flex-start";
      var msg = document.createElement("div");
      msg.style.cssText = "flex:1";
      msg.textContent = t.msg;
      var btn = document.createElement("button");
      btn.textContent = t.copy;
      btn.style.cssText = "flex:none;background:#fff;color:#B8362A;border:none;border-radius:999px;padding:8px 14px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap";
      btn.onclick = function () {
        var url = location.href;
        var done = function () { msg.textContent = t.copied; btn.style.display = "none"; };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).then(done, fallback); }
          else fallback();
        } catch (e) { fallback(); }
        function fallback() {
          try {
            var ta = document.createElement("textarea"); ta.value = url; ta.style.cssText = "position:fixed;left:-9999px";
            document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); done();
          } catch (e2) { msg.textContent = url; }
        }
      };
      var x = document.createElement("button");
      x.setAttribute("aria-label", t.close);
      x.textContent = "✕";
      x.style.cssText = "flex:none;background:none;border:none;color:#fff;font-size:16px;cursor:pointer;padding:2px 4px;line-height:1;opacity:.85";
      x.onclick = function () { try { bar.remove(); } catch (e) {} };
      wrap.appendChild(msg); wrap.appendChild(btn); wrap.appendChild(x);
      bar.appendChild(wrap);
      document.body.appendChild(bar);
    }
    if (document.body) build();
    else document.addEventListener("DOMContentLoaded", build);
  } catch (e) {}
})();
