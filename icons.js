/* icons.js — 全站統一線條 icon（取代 emoji，降低「AI 味」）
 * StayJP から持ってきて、台湾の生活場面ぶんを足したもの。
 *
 * 設計:24×24 viewBox、stroke 線條、fill:none、stroke:currentColor
 *   → icon 顏色自動跟著文字色走,深/淺色模式都安全,不必各自調色。
 *
 * 兩種用法:
 *   1) 靜態 HTML:  <i data-ic=mic></i>  或  <i data-ic=flag data-sz=16></i>
 *      → DOMContentLoaded 後自動 hydrate 成 <svg>。動態插入的節點呼叫 window.hydrateIcons(root)。
 *   2) JS 產字串:  window.icon('mic')  或  window.icon('flag',{size:16})  → 回 <svg> 字串
 *
 * 加新 icon:在 PATHS 補一筆 name:'<path .../>'(24×24)即可。
 */
(function () {
  // 全站統一返回鍵樣式(用戶回饋:各頁返回鍵不統一,字元「‹/</←」又小又醜)。
  // 標準 markup:<a class="backbtn" ...><svg chevron>文字</a>;變數 fallback 鏈跨頁通用。
  try {
    if (!document.getElementById('backbtnCss')) {
      var bst = document.createElement('style'); bst.id = 'backbtnCss';
      bst.textContent = '.backbtn{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:8px 14px 8px 10px;border-radius:12px;background:var(--panel,var(--bg2,#fff));border:1px solid var(--line,var(--bd,#e5e0d8));color:var(--ink2,var(--tx2,#666));text-decoration:none;font-size:14.5px;font-weight:600;line-height:1;cursor:pointer;font-family:inherit}'
        + '.backbtn:active{transform:scale(.96)}'
        + '.backbtn svg{width:16px;height:16px;flex-shrink:0}';
      (document.head || document.documentElement).appendChild(bst);
    }
  } catch (e) {}

  'use strict';
  if (window.__stwIcons) return;
  window.__stwIcons = true;

  var PATHS = {
    // ── StayTW 追加(台湾の生活場面)──
    ambulance:'<rect x="2" y="8" width="12" height="8" rx="1.5"/><path d="M14 11h4l3 3.5V16h-7z"/><circle cx="6.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/><path d="M8 10v4M6 12h4"/>',
    typhoon:  '<path d="M12 12c0-3 2.5-5.5 5.5-5.5S23 9 21 12"/><path d="M12 12c3 0 5.5 2.5 5.5 5.5S15 23 12 21"/><path d="M12 12c0 3-2.5 5.5-5.5 5.5S1 15 3 12"/><path d="M12 12c-3 0-5.5-2.5-5.5-5.5S9 1 12 3"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
    cloud:    '<path d="M7.5 19a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18.4 10.2 4 4 0 0 1 18 19z"/>',
    cash:     '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/>',

    cup:      '<path d="M6 7h12l-1.2 13a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8z"/><path d="M5.5 7h13"/><path d="M14 7l2.5-4"/><circle cx="10" cy="16" r="1" fill="currentColor" stroke="none"/><circle cx="13.5" cy="18" r="1" fill="currentColor" stroke="none"/>',
    lantern:  '<ellipse cx="12" cy="12" rx="6" ry="7.5"/><path d="M12 4.5V2"/><path d="M12 19.5V22"/><path d="M8 6.5h8"/><path d="M8 17.5h8"/>',
    cap:      '<path d="M2 9l10-4.5L22 9l-10 4.5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
    link:     '<path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7l-1.5 1.5"/><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.5-1.5"/>',
    pill:     '<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M8.5 8.5l7 7"/>',
    bank:     '<path d="M3 10l9-6 9 6"/><path d="M5 10v9M9.7 10v9M14.3 10v9M19 10v9"/><path d="M3 21h18"/>',
    police:   '<path d="M12 2.5l8 3v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10v-6z"/><path d="M12 8v6"/><path d="M9 11h6"/>',
    toilet:   '<path d="M5 3h14"/><path d="M8 3v7a4 4 0 0 0 8 0V3"/><path d="M12 14v7"/><path d="M8.5 21h7"/>',
    taxi:     '<path d="M4 16l1.6-5A2 2 0 0 1 7.5 9.5h9A2 2 0 0 1 18.4 11L20 16"/><rect x="2.5" y="16" width="19" height="4.5" rx="1.6"/><path d="M9.5 9.5V7h5v2.5"/><circle cx="7" cy="20.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="17" cy="20.5" r="1.2" fill="currentColor" stroke="none"/>',
    truck:    '<rect x="2" y="7" width="12" height="9" rx="1.5"/><path d="M14 10h4l3 3.5V16h-7z"/><circle cx="6.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/>',
    key:      '<circle cx="8" cy="13" r="4.5"/><path d="M11.5 10.5L21 3"/><path d="M18 6l2.5 2.5"/><path d="M15.5 8.5L18 11"/>',
    receipt:  '<path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z"/><path d="M9.5 8h5"/><path d="M9.5 12h5"/>',
    idcard:   '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5.5 16c.4-1.6 1.6-2.4 3-2.4s2.6.8 3 2.4"/><path d="M14.5 10h4"/><path d="M14.5 14h4"/>',
    bandage:  '<rect x="1.8" y="8.5" width="20.4" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/><circle cx="10.5" cy="13.5" r=".8" fill="currentColor" stroke="none"/><circle cx="13.5" cy="10.5" r=".8" fill="currentColor" stroke="none"/>',
    sick:     '<circle cx="12" cy="12" r="9"/><path d="M8.5 15.5c1-1 2-1.5 3.5-1.5s2.5.5 3.5 1.5"/><path d="M8 9.5l2 1M16 9.5l-2 1"/>',
    veg:      '<path d="M12 21c-4 0-7-3-7-7 0-3.5 3-6 7-6s7 2.5 7 6c0 4-3 7-7 7z"/><path d="M12 8V4"/><path d="M12 5.5c2-2 4-2 5-1.5-.5 1.5-2 3-5 3z"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/><path d="M10 21v-3h4v3"/>',
    money:    '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/>',
    // ── 音訊 / 語音 ──
    mic:      '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/><path d="M8 22h8"/>',
    volume:   '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    headphones:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2" y="14" width="4" height="7" rx="1.5"/><rect x="18" y="14" width="4" height="7" rx="1.5"/>',
    speak:    '<path d="M8 9h8"/><path d="M8 13h5"/><path d="M21 12a8 8 0 0 1-8 8H4l3-3a8 8 0 1 1 14-5z"/>',
    // ── 動作 / 狀態 ──
    check:    '<path d="M20 6 9 17l-5-5"/>',
    x:        '<path d="M18 6 6 18"/><path d="M6 6l12 12"/>',
    flag:     '<path d="M4 22V3"/><path d="M4 3h14l-2.5 4L18 11H4"/>',
    lock:     '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    refresh:  '<path d="M20 11a8 8 0 1 0-1.7 5"/><path d="M20 4v5h-5"/>',
    target:   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    bell:     '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9z"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    warning:  '<path d="M12 3 2 20h20z"/><path d="M12 9v5"/><path d="M12 17h.01"/>',
    edit:     '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    pin:      '<path d="M12 21s-6-5.7-6-10a6 6 0 0 1 12 0c0 4.3-6 10-6 10z"/><circle cx="12" cy="11" r="2.4"/>',
    trash:    '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>',
    // ── 物件 / 概念 ──
    gift:     '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9"/><path d="M12 8v13"/><path d="M12 8C10.5 4.5 6 4.5 7 7.5 7.6 9 12 8 12 8z"/><path d="M12 8c1.5-3.5 6-3.5 5-.5C16.4 9 12 8 12 8z"/>',
    ticket:   '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/><path d="M15 6v12"/>',
    fire:     '<path d="M12 22c3.9 0 7-3 7-7 0-4-3-5.5-4-9-2 2-3.2 3.2-4 6-1.2-1-1.5-2-1.5-3.5C6.5 12 5 13.2 5 15c0 4 3.1 7 7 7z"/>',
    bulb:     '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 14a5.5 5.5 0 1 1 8 0c-.7.7-1 1.5-1 2.4V17H9v-.6c0-.9-.3-1.7-1-2.4z"/>',
    chart:    '<path d="M4 4v16h16"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/>',
    chat:     '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
    book:     '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 5v16"/>',
    star:     '<path d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.6 6.9 19.2l1-5.7-4.1-4 5.7-.8z"/>',
    briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
    user:     '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/>',
    bolt:     '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    globe:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>',
    phone:    '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10.5 18h3"/>',
    compass:  '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    tools:    '<path d="M14.5 5.5a3.5 3.5 0 0 0 4.6 4.6l-1.8-1.8 1.4-1.4 1.8 1.8A3.5 3.5 0 0 0 15.9 4L4 15.9a2 2 0 1 0 2.8 2.8z"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v3"/><path d="M16 3v3"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    sparkle:  '<path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z"/>',
    // ── 分類 / 情境(短句、AI 對話用)──
    food:     '<path d="M4 3v7a2 2 0 0 0 4 0V3"/><path d="M6 10v11"/><path d="M17 3c-1.7 0-3 2.2-3 5s1.3 4 3 4v9"/>',
    train:    '<rect x="5" y="4" width="14" height="12" rx="2.5"/><path d="M5 11h14"/><path d="M8 20l-2 2"/><path d="M16 20l2 2"/><circle cx="8.5" cy="13.5" r=".6" fill="currentColor" stroke="none"/><circle cx="15.5" cy="13.5" r=".6" fill="currentColor" stroke="none"/>',
    store:    '<path d="M4 9l1.2-4h13.6L20 9"/><path d="M4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/><path d="M5 11v9h14v-9"/><path d="M9 20v-5h6v5"/>',
    hospital: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/>',
    bag:      '<path d="M6 8h12l-1 12H7z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    home:     '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/>',
    // ── 導引 / 箭頭 ──
    arrowRight:'<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>',
    chevronUp: '<path d="M6 15l6-6 6 6"/>',
    hand:      '<path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M12 11V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M15 11V6.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L3 15a1.6 1.6 0 0 1 2.5-2L7 14V7a1.5 1.5 0 0 1 3 0v4"/>',
    // ── 補充 ──
    bird:     '<path d="M16 7h.01"/><path d="M3.5 6A2.5 2.5 0 0 1 8 4.5L20 6l-4 4v3a7 7 0 0 1-7 7H4s3-2 3-5c0-2-2-3-2-6a2.5 2.5 0 0 1-1.5-2z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 15H3a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 7 1.6 1.6 0 0 0 4.3 5.2l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9 3.6 1.6 1.6 0 0 0 11 2h.1a2 2 0 0 1 4 0V2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    play:     '<path d="M6 4l14 8-14 8z"/>',
    pause:    '<rect x="7" y="5" width="3.5" height="14" rx="1"/><rect x="14" y="5" width="3.5" height="14" rx="1"/>',
    stop:     '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    menu:     '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  tag: '<path d="M20.6 13.4 12 22l-9-9V4a1 1 0 0 1 1-1h9z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
    clipboard:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4a3 3 0 0 1 6 0"/><path d="M9 4h6v2H9z"/>',
    grid:'<rect x="4" y="4" width="7" height="7" rx="1.2"/><rect x="13" y="4" width="7" height="7" rx="1.2"/><rect x="4" y="13" width="7" height="7" rx="1.2"/><rect x="13" y="13" width="7" height="7" rx="1.2"/>',
    news:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    mail:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
    moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    camera: '<path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h5L20 6h-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>',
    power: '<path d="M12 3v9"/><path d="M6.4 6.4a8 8 0 1 0 11.2 0"/>',
    coin:     '<circle cx="12" cy="12" r="9"/><path d="M15 9.5A3 3 0 0 0 12 8c-1.7 0-3 1-3 2.3 0 3 6 1.5 6 4.4C15 16 13.7 17 12 17a3 3 0 0 1-3-1.5"/><path d="M12 6.5v11"/>'
  };

  function svg(name, o) {
    var p = PATHS[name];
    if (!p) return '';
    o = o || {};
    // 沒指定尺寸 → 用 em,icon 大小自動跟著文字走(小按鈕不會太大);指定才用 px(hero 大圖)。
    var dim = o.size ? (o.size + 'px') : '1.08em';
    var cls = 'ic ic-' + name + (o.cls ? ' ' + o.cls : '');
    return '<svg class="' + cls + '" viewBox="0 0 24 24" fill="none" '
      + 'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" '
      + 'style="width:' + dim + ';height:' + dim + ';vertical-align:-0.14em;flex:none" aria-hidden="true">' + p + '</svg>';
  }

  function hydrate(root) {
    var scope = root || document;
    var list = scope.querySelectorAll('i[data-ic]:not([data-ic-done])');
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      var sz = el.getAttribute('data-sz');
      el.innerHTML = svg(el.getAttribute('data-ic'), sz ? { size: +sz } : {});
      el.setAttribute('data-ic-done', '1');
      // <i> 保持 inline,對齊交給 svg 的 vertical-align(inline-flex 的 baseline 會讓 icon 偏高)
      el.style.display = 'inline';
    }
  }

  window.icon = svg;
  window.ICON_PATHS = PATHS;
  window.hydrateIcons = hydrate;
  if (document.readyState !== 'loading') hydrate();
  else document.addEventListener('DOMContentLoaded', function () { hydrate(); });

  // JS 動態插入的 <i data-ic> 也自動變 icon（rAF 節流,只掃未 hydrate 的,成本低）。
  // 這樣靜態 HTML 與 JS 產生的內容都能用同一套 <i data-ic=x> 寫法。
  if (window.MutationObserver) {
    var pending = false;
    var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
    function schedule() { if (pending) return; pending = true; raf(function () { pending = false; hydrate(document); }); }
    try {
      new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) { if (muts[i].addedNodes && muts[i].addedNodes.length) { schedule(); return; } }
      }).observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
  }
})();
