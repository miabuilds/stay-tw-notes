// StayTW ネイティブアプリ(RN WebView)向けの補助。純ブラウザでは何もしない。
//  1) STAYTW_studyDone(): 学習完了 → 原生に STUDY_DONE を送る(1日1回まで)。
//     原生 web.tsx が recordStudyCompleted()+maybeAskForReview() → expo-store-review で評価依頼。
//  2) 新版更新提醒: /app-version.json の latest と App が注入した STAYTW_NATIVE.appVersion を比べ、
//     古ければ画面下部に閉じられるバーを出す。force 未満なら全画面で更新を強制。
// 文言は i18n.js の updNew / updBtn / updLater / updForceTitle / updForceDesc(5言語)。
(function () {
  var STORE = {
    ios: 'https://apps.apple.com/app/id6794272037',
    android: 'https://play.google.com/store/apps/details?id=com.staytw.app'   // まだ未公開。将来用
  };
  function T(k, d) { try { var v = (typeof twT === 'function') ? twT(k) : null; return (v && v !== k) ? v : d; } catch (e) { return d; } }
  function native() { var n = window.STAYTW_NATIVE; return (n && n.isNativeApp) ? n : null; }

  // ── 1) 学習完了 → 評価タイミングの通知(1日1回)──
  window.STAYTW_studyDone = function () {
    try {
      if (!window.ReactNativeWebView || !native()) return;
      var k = 'stw_review_signal_day', d = new Date().toISOString().slice(0, 10);
      if (localStorage.getItem(k) === d) return;
      localStorage.setItem(k, d);
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'STUDY_DONE' }));
    } catch (e) {}
  };

  // ── 2) 新版更新提醒 ──
  function cmpVer(a, b) {
    var pa = String(a).split('.').map(Number), pb = String(b).split('.').map(Number);
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var x = pa[i] || 0, y = pb[i] || 0;
      if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
  }
  function openStore(url) {
    try { if (window.ReactNativeWebView) { window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'OPEN_STORE', url: url })); return; } } catch (e) {}
    try { window.location.href = url; } catch (e) {}
  }
  function initUpdateCheck() {
    try {
      var n = native(); if (!n) return;
      var cur = n.appVersion, platform = n.platform;
      if (!cur || cur === '?' || !STORE[platform]) return;
      fetch('/app-version.json?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.json(); })
        .then(function (cfg) {
          var force = cfg && cfg.force;
          if (force && cmpVer(cur, force) < 0) { showForce(STORE[platform]); return; }
          var latest = cfg && cfg.latest && cfg.latest[platform];
          if (!latest || cmpVer(cur, latest) >= 0) return;
          if (localStorage.getItem('stw_update_dismissed') === latest) return;
          showBar(STORE[platform], latest);
        })
        .catch(function () {});
    } catch (e) {}
  }
  var FONT = '-apple-system,BlinkMacSystemFont,"Hiragino Sans","PingFang TC","Noto Sans TC",sans-serif';
  function showForce(storeUrl) {
    if (document.getElementById('stwForceUpd')) return;
    var m = document.createElement('div'); m.id = 'stwForceUpd';
    m.style.cssText = 'position:fixed;inset:0;z-index:2147483600;background:rgba(24,20,17,.94);display:flex;align-items:center;justify-content:center;padding:24px;font:500 15px/1.7 ' + FONT;
    var card = document.createElement('div');
    card.style.cssText = 'background:#fff;color:#1C1C1E;border-radius:18px;max-width:340px;width:100%;padding:24px 22px;text-align:center';
    var img = document.createElement('img'); img.src = 'images/bear.svg'; img.alt = ''; img.style.cssText = 'width:84px;height:auto;margin-bottom:10px';
    var h = document.createElement('div'); h.style.cssText = 'font-size:17px;font-weight:800;margin-bottom:6px'; h.textContent = T('updForceTitle', '最新版に更新してください');
    var p = document.createElement('div'); p.style.cssText = 'font-size:13.5px;color:#6A6A6A;margin-bottom:16px'; p.textContent = T('updForceDesc', 'このバージョンには更新しないと直らない問題があります。30秒ほどで終わります。');
    var b = document.createElement('button'); b.textContent = T('updBtn', '更新する');
    b.style.cssText = 'width:100%;background:#B8362A;color:#fff;border:0;padding:13px;border-radius:12px;font-weight:800;font-size:15px;cursor:pointer';
    b.onclick = function () { openStore(storeUrl); };
    card.appendChild(img); card.appendChild(h); card.appendChild(p); card.appendChild(b); m.appendChild(card);
    (document.body || document.documentElement).appendChild(m);
  }
  function showBar(storeUrl, latest) {
    if (document.getElementById('stwUpdBar')) return;
    var bar = document.createElement('div'); bar.id = 'stwUpdBar'; bar.setAttribute('role', 'dialog');
    bar.style.cssText = 'position:fixed;left:12px;right:12px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:2147483000;background:#2F5D7A;color:#fff;border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:10px;box-shadow:0 8px 30px rgba(0,0,0,.28);font:500 15px/1.4 ' + FONT;
    var msg = document.createElement('div'); msg.style.cssText = 'flex:1;min-width:0'; msg.textContent = T('updNew', '新しいバージョンがあります');
    var up = document.createElement('button'); up.textContent = T('updBtn', '更新する');
    up.style.cssText = 'flex:none;background:#B8362A;color:#fff;border:0;padding:9px 18px;border-radius:999px;font-weight:700;font-size:14px;cursor:pointer';
    up.onclick = function () { openStore(storeUrl); };
    var later = document.createElement('button'); later.textContent = T('updLater', 'あとで');
    later.style.cssText = 'flex:none;background:transparent;color:#cdd6e0;border:0;padding:9px 8px;font:inherit;cursor:pointer';
    later.onclick = function () { try { localStorage.setItem('stw_update_dismissed', latest); } catch (e) {} bar.remove(); };
    bar.appendChild(msg); bar.appendChild(up); bar.appendChild(later);
    (document.body || document.documentElement).appendChild(bar);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initUpdateCheck);
  else initUpdateCheck();
})();
