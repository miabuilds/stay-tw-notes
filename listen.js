// 用聽的背單字（2026-09-19）：單字 →(停頓)→ 例句 を連続再生。通勤・家事中に耳で覚える。
// 画面を消しても鳴る（mediaSession でロック画面操作、wakeLock で画面維持）。
// 音は事前生成 mp3 のみ（TTS.has で存在確認 → 無い語はスキップ。ブラウザの機械音は使わない）。
// 無料版：シャッフルのみ・1回 FREE_MAX 語まで・絞り込み不可。Premium は全開。
(function (root) {
  const T = k => { try { return (typeof twT === "function") ? twT(k) : k; } catch (e) { return k; } };
  const MK = () => { try { return (typeof twMKey === "function") ? twMKey() : "j"; } catch (e) { return "j"; } };
  const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const KEY = "stw_listen_opts";
  const DEF = { scope: "cur", filter: "all", order: "seq", ex: true, twice: false, meaning: true, loop: false, gap: 1.4 };
  const FREE_MAX = 30;
  const LEVELS = ["l1", "l2", "l3", "l4", "l5", "l6"];

  let opts = load(), list = [], idx = 0, playing = false, timer = null, phase = "word", played = 0, wake = null;

  function load() { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { return Object.assign({}, DEF); } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(opts)); } catch (e) {} }
  function premium() { try { return !!(root.Paywall && Paywall.isPremium && Paywall.isPremium()); } catch (e) { return false; } }
  function has(t) { try { return !!(root.TTS && TTS.has && TTS.has(t)); } catch (e) { return false; } }
  // 再生速度（サイト共通・localStorage stw_tts_rate）
  const SPEEDS = [1, 0.75, 0.5, 1.25];
  function speed() { try { return (root.TTS && TTS.getRate) ? TTS.getRate() : (parseFloat(localStorage.getItem("stw_tts_rate")) || 1); } catch (e) { return 1; } }
  function cycleSpeed() { const i = SPEEDS.indexOf(speed()); const r = SPEEDS[(i + 1) % SPEEDS.length];
    try { if (root.TTS && TTS.setRate) TTS.setRate(r); else localStorage.setItem("stw_tts_rate", r); } catch (e) {}
    const b = document.getElementById("lsSpd"); if (b) b.textContent = speed() + "x"; }
  function srsData() { try { return (root.SRS && SRS.getData) ? SRS.getData() : (JSON.parse(localStorage.getItem("stw_srs")) || {}); } catch (e) { return {}; } }
  function vocab(lv) { try { return (typeof getVocabData === "function") ? (getVocabData(lv) || []) : []; } catch (e) { return []; } }
  function curLevel() { try { return (typeof currentLevel !== "undefined") ? currentLevel : "l1"; } catch (e) { return "l1"; } }
  function levels() { return opts.scope === "all" ? LEVELS : (LEVELS.indexOf(opts.scope) >= 0 ? [opts.scope] : [curLevel()]); }
  function mean(v) { const k = MK(); return (v.m && (v.m[k] || v.m.e || v.m.j)) || ""; }
  function exMean(v) { const k = MK(); return (v.ex && (v.ex[k] || v.ex.e || v.ex.j)) || ""; }

  // 再生リストを組む：範囲＋絞り込み。mp3 が無い語は除外（無音の空白になるのを防ぐ）
  function build() {
    const d = srsData(), now = Date.now(), out = [];
    levels().forEach(lv => {
      vocab(lv).forEach(v => {
        if (!v || !v.w || !has(v.w)) return;
        const e = d[lv + ":" + v.w];
        if (opts.filter === "new" && e) return;
        if (opts.filter === "weak" && e && (e.interval || 0) >= 21) return;
        if (opts.filter === "due" && !(e && (typeof e.nextReviewTs === "number" ? e.nextReviewTs <= now : true))) return;
        out.push(Object.assign({}, v, { level: lv }));
      });
    });
    if (opts.order === "rand" || !premium()) {
      for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = out[i]; out[i] = out[j]; out[j] = t; }
    }
    return premium() ? out : out.slice(0, FREE_MAX);
  }

  // ── 画面 ──
  function css() {
    if (document.getElementById("lsCss")) return;
    const st = document.createElement("style"); st.id = "lsCss";
    st.textContent = [
      ".ls-mask{position:fixed;inset:0;z-index:9100;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch}",
      ".ls-wrap{max-width:560px;margin:0 auto;padding:14px 16px calc(28px + env(safe-area-inset-bottom,0px))}",
      ".ls-top{display:flex;align-items:center;gap:10px;margin-bottom:8px}",
      ".ls-top .tt{font-weight:800;font-size:17px;flex:1}",
      ".ls-x{border:none;background:none;font-size:24px;color:var(--tx2);cursor:pointer;line-height:1;padding:4px 6px}",
      ".ls-lead{font-size:13px;color:var(--tx2);line-height:1.65}",
      ".ls-sec{font-size:12px;font-weight:800;color:var(--tx2);letter-spacing:.06em;margin:16px 0 7px}",
      ".ls-seg{display:flex;flex-wrap:wrap;gap:6px}",
      ".ls-seg button{border:1px solid var(--line);background:var(--bg2);color:var(--tx);border-radius:999px;padding:7px 13px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}",
      ".ls-seg button.on{background:var(--ac);border-color:var(--ac);color:#fff}",
      ".ls-seg button.lock{opacity:.55}",
      ".ls-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid var(--line);font-size:14px}",
      ".ls-row small{display:block;color:var(--tx2);font-size:12px;margin-top:2px;line-height:1.5}",
      ".ls-sw{position:relative;display:inline-block;width:44px;height:26px;flex:none}",
      ".ls-sw input{opacity:0;width:0;height:0}",
      ".ls-sw span{position:absolute;inset:0;background:var(--bg3);border:1px solid var(--line);border-radius:999px;transition:.2s;cursor:pointer}",
      ".ls-sw span:before{content:'';position:absolute;width:20px;height:20px;left:2px;top:2px;background:#fff;border-radius:50%;transition:.2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}",
      ".ls-sw input:checked+span{background:var(--ac);border-color:var(--ac)}",
      ".ls-sw input:checked+span:before{transform:translateX(18px)}",
      ".ls-start{display:block;width:100%;margin-top:18px;background:var(--ac);color:#fff;border:0;border-radius:14px;padding:15px;font-size:16px;font-weight:800;cursor:pointer;font-family:inherit}",
      ".ls-start[disabled]{opacity:.45;cursor:default}",
      ".ls-ghost{background:var(--bg3);color:var(--tx);border:1px solid var(--line)}",
      ".ls-up{margin-top:10px;font-size:12.5px;color:var(--tx2);text-align:center;line-height:1.6}",
      ".ls-up b{color:var(--ac);cursor:pointer}",
      ".ls-card{background:var(--bg2);border:1px solid var(--line);border-radius:20px;padding:30px 20px 24px;text-align:center;margin-top:10px;min-height:260px;display:flex;flex-direction:column;justify-content:center}",
      ".ls-lv{font-size:12px;color:var(--tx3);font-weight:700;letter-spacing:.06em}",
      ".ls-w{font-family:var(--serif);font-size:46px;font-weight:800;line-height:1.2;margin-top:8px}",
      ".ls-zy{font-family:var(--zhuyin);font-size:16px;color:var(--ac2);margin-top:8px}",
      ".ls-py{font-size:14px;color:var(--tx3);margin-top:3px}",
      ".ls-m{font-size:16px;color:var(--tx);margin-top:12px;line-height:1.6}",
      ".ls-m.hid{filter:blur(7px)}",
      ".ls-ex{margin-top:16px;padding-top:13px;border-top:1px dashed var(--line);font-size:15px;line-height:1.7}",
      ".ls-ex .z{font-family:var(--serif);font-size:17px;font-weight:600}",
      ".ls-ex .t{font-size:13px;color:var(--tx2);margin-top:3px}",
      ".ls-ex.on .z{color:var(--ac)}",
      ".ls-prog{display:flex;justify-content:space-between;font-size:12.5px;color:var(--tx2);margin:16px 2px 6px;font-variant-numeric:tabular-nums}",
      ".ls-bar{height:6px;border-radius:999px;background:var(--bg3);overflow:hidden}",
      ".ls-bar i{display:block;height:100%;background:var(--ac);transition:width .3s}",
      ".ls-ctl{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:20px}",
      ".ls-ctl button{border:1px solid var(--line);background:var(--bg2);color:var(--tx);width:52px;height:52px;border-radius:50%;font-size:19px;cursor:pointer;font-family:inherit}",
      ".ls-ctl button.pp{width:68px;height:68px;font-size:26px;background:var(--ac);border-color:var(--ac);color:#fff}",
      ".ls-mini{display:flex;justify-content:center;gap:8px;margin-top:16px;flex-wrap:wrap}",
      ".ls-mini button{border:1px solid var(--line);background:var(--bg2);color:var(--tx2);border-radius:999px;padding:7px 13px;font-size:12.5px;cursor:pointer;font-family:inherit}",
      ".ls-done{text-align:center;padding:44px 10px}",
      ".ls-done img{width:104px}",
      ".ls-done h3{margin:12px 0 6px;font-family:var(--serif);font-size:21px}",
      ".ls-done p{color:var(--tx2);font-size:14px}",
      "body.ls-open .bn,body.ls-open .pw-quota,body.ls-open #backTop{display:none!important}"
    ].join("\n");
    document.head.appendChild(st);
  }
  function mask() { return document.getElementById("lsMask"); }
  function seg(name, items, cur) {
    return '<div class="ls-seg">' + items.map(it => {
      const v = it[0], lbl = it[1], locked = it[2];
      return '<button type="button" class="' + (cur === v ? "on" : "") + (locked && !premium() ? " lock" : "") +
        '" onclick="Listen.opt(\'' + name + '\',\'' + v + '\')">' + (locked && !premium() ? "🔒 " : "") + esc(lbl) + "</button>";
    }).join("") + "</div>";
  }
  function sw(k) { return '<label class="ls-sw"><input type="checkbox" ' + (opts[k] ? "checked" : "") + ' onchange="Listen.opt2(\'' + k + '\')"><span></span></label>'; }
  function row(title, sub, ctrl) { return '<div class="ls-row"><div>' + esc(title) + (sub ? "<small>" + esc(sub) + "</small>" : "") + "</div>" + ctrl + "</div>"; }

  function setupHtml() {
    const n = build().length;
    const lvName = lv => { try { return twT("lv_" + lv); } catch (e) { return lv.toUpperCase(); } };
    const scopes = [["cur", T("lsScopeCur")], ["all", T("lsScopeAll")]].concat(LEVELS.map(l => [l, "L" + l.slice(1) + " " + lvName(l)]));
    return '<div class="ls-wrap">'
      + '<div class="ls-top"><span class="tt">🎧 ' + esc(T("lsTitle")) + '</span><button class="ls-x" onclick="Listen.close()" aria-label="close">×</button></div>'
      + '<p class="ls-lead">' + esc(T("lsLead")) + "</p>"
      + '<div class="ls-sec">' + esc(T("lsScope")) + "</div>" + seg("scope", scopes, opts.scope)
      + '<div class="ls-sec">' + esc(T("lsFilter")) + "</div>"
      + seg("filter", [["all", T("lsFilterAll")], ["weak", T("lsFilterWeak"), true], ["new", T("lsFilterNew"), true], ["due", T("lsFilterDue"), true]], opts.filter)
      + '<div class="ls-sec">' + esc(T("lsOrder")) + "</div>"
      + seg("order", [["seq", T("lsOrderSeq"), true], ["rand", T("lsOrderRand")]], opts.order)
      + '<div class="ls-sec">' + esc(T("lsPlayback")) + "</div>"
      + row(T("lsEx"), T("lsExSub"), sw("ex"))
      + row(T("lsTwice"), "", sw("twice"))
      + row(T("lsMeaning"), T("lsMeaningSub"), sw("meaning"))
      + row(T("lsLoop"), "", sw("loop"))
      + '<button class="ls-start" ' + (n ? "" : "disabled") + ' onclick="Listen.start()">▶ ' + esc(T("lsStart").replace("{n}", n)) + "</button>"
      + (premium() ? "" : '<div class="ls-up">' + esc(T("lsFree").replace("{n}", FREE_MAX)) + ' <b onclick="Listen.upgrade()">' + esc(T("lsUpgrade")) + "</b></div>")
      + "</div>";
  }
  function cur() { return list[idx]; }
  function playerHtml() {
    const v = cur(); if (!v) return "";
    const lvName = (() => { try { return twT("lv_" + v.level); } catch (e) { return v.level; } })();
    const exOn = phase === "ex";
    return '<div class="ls-wrap">'
      + '<div class="ls-top"><button class="ls-x" onclick="Listen.back()" aria-label="back">‹</button><span class="tt">🎧 ' + esc(T("lsTitle")) + '</span><button class="ls-x" onclick="Listen.close()" aria-label="close">×</button></div>'
      + '<div class="ls-card">'
        + '<div class="ls-lv">' + esc("L" + v.level.slice(1) + " " + lvName) + "</div>"
        + '<div class="ls-w">' + esc(v.w) + "</div>"
        + (v.zy ? '<div class="ls-zy">' + esc(v.zy) + "</div>" : "")
        + (v.py ? '<div class="ls-py">' + esc(v.py) + "</div>" : "")
        + '<div class="ls-m' + (opts.meaning ? "" : " hid") + '" id="lsM">' + esc(mean(v)) + "</div>"
        + (opts.ex && v.ex && v.ex.z ? '<div class="ls-ex' + (exOn ? " on" : "") + '" id="lsEx"><div class="z">' + esc(v.ex.z) + '</div><div class="t">' + esc(exMean(v)) + "</div></div>" : "")
      + "</div>"
      + '<div class="ls-prog"><span>' + (idx + 1) + " / " + list.length + "</span><span>" + esc(opts.filter === "all" ? "" : T("lsFilter_" + opts.filter)) + "</span></div>"
      + '<div class="ls-bar"><i style="width:' + Math.round((idx + 1) / Math.max(1, list.length) * 100) + '%"></i></div>'
      + '<div class="ls-ctl">'
        + '<button onclick="Listen.prev()" aria-label="prev">⏮</button>'
        + '<button class="pp" id="lsPP" onclick="Listen.toggle()" aria-label="play/pause">' + (playing ? "⏸" : "▶") + "</button>"
        + '<button onclick="Listen.next()" aria-label="next">⏭</button>'
      + "</div>"
      + '<div class="ls-mini">'
        + '<button id="lsSpd" onclick="Listen.cycleSpeed()">' + speed() + 'x</button>'
        + '<button onclick="Listen.toggleMeaning()">' + esc(T("lsToggleMeaning")) + "</button>"
        + '<button onclick="Listen.back()">' + esc(T("lsSettings")) + "</button>"
      + "</div>"
      + "</div>";
  }
  function render() { const m = mask(); if (m) m.innerHTML = setupHtml(); }
  function renderPlayer() { const m = mask(); if (m) m.innerHTML = playerHtml(); }
  function renderPP() { const b = document.getElementById("lsPP"); if (b) b.textContent = playing ? "⏸" : "▶"; }

  function open() {
    css();
    if (!mask()) { const d = document.createElement("div"); d.id = "lsMask"; d.className = "ls-mask"; document.body.appendChild(d); }
    document.body.classList.add("ls-open");
    mask().style.display = "block";
    render();
    try { if (root.TTS && TTS.stop) TTS.stop(); } catch (e) {}
  }
  function close() {
    stop(); releaseWake();
    document.body.classList.remove("ls-open");
    const m = mask(); if (m) m.style.display = "none";
  }
  function opt(name, val) {
    const locked = (name === "filter" && val !== "all") || (name === "order" && val === "seq");
    if (locked && !premium()) { upgrade(); return; }
    opts[name] = val; save(); render();
  }
  function opt2(k) { opts[k] = !opts[k]; save(); if (document.getElementById("lsPP")) renderPlayer(); else render(); }
  function upgrade() { try { if (root.Paywall && Paywall.show) Paywall.show("listen"); else if (typeof twUpgrade === "function") twUpgrade(); } catch (e) {} }
  function toggleMeaning() { const m = document.getElementById("lsM"); if (m) m.classList.toggle("hid"); }

  function start() {
    list = build(); idx = 0; played = 0; phase = "word";
    if (!list.length) { const m = mask(); if (m) { const b = m.querySelector(".ls-start"); if (b) { b.textContent = T("lsNoAudio"); b.disabled = true; } } return; }
    renderPlayer(); play();
  }
  function back() { stop(); render(); }

  // ── 再生 ──
  function clearTimer() { if (timer) { clearTimeout(timer); timer = null; } }
  function schedule(sec, fn) { clearTimer(); timer = setTimeout(() => { timer = null; if (playing) fn(); }, Math.max(0, sec) * 1000); }
  // 音声の ended が来ないケース（自動再生がブロックされた／mp3 が読めない）で止まらないよう、
  // 文字数から見積もった時間＋余裕で必ず次へ進める見張りタイマーを置く。
  let tok = 0, guard = null;
  function clearGuard() { if (guard) { clearTimeout(guard); guard = null; } }
  function playText(text) {
    if (!has(text)) { advancePhase(); return; }
    const my = ++tok;
    const done = () => { if (playing && my === tok) { clearGuard(); advancePhase(); } };
    clearGuard();
    // 遅い速度ほど長くかかるので、見張り時間も速度で割る
    guard = setTimeout(done, Math.min(40, (2.5 + String(text).length * 0.45) / Math.max(0.4, speed())) * 1000);
    try { TTS.stop(); TTS.speak(text, null, done); msState("playing"); }   // 速度は全体設定にまかせる
    catch (e) { clearGuard(); schedule(0.4, advancePhase); }
  }
  function play() {
    const v = cur(); if (!v) return done();
    playing = true; phase = "word"; renderPP(); requestWake(); msMeta(v);
    playText(v.w);
  }
  function advancePhase() {
    const v = cur(); if (!v || !playing) return;
    if (phase === "word" && opts.twice) { phase = "word2"; schedule(0.35, () => playText(v.w)); return; }
    if ((phase === "word" || phase === "word2") && opts.ex && v.ex && v.ex.z && has(v.ex.z)) {
      phase = "ex"; const el = document.getElementById("lsEx"); if (el) el.classList.add("on");
      schedule(opts.gap, () => playText(v.ex.z)); return;
    }
    phase = "end"; schedule(opts.gap, next);
  }
  function next() {
    played++;
    if (played % 5 === 0) { try { if (typeof bumpDaily === "function") bumpDaily(); } catch (e) {} }
    idx++;
    if (idx >= list.length) { if (opts.loop) idx = 0; else return done(); }
    phase = "word"; renderPlayer();
    if (playing) play(); else renderPP();
  }
  function prev() { clearTimer(); clearGuard(); tok++; idx = Math.max(0, idx - 1); phase = "word"; renderPlayer(); if (playing) play(); }
  function toggle() {
    if (playing) { playing = false; tok++; clearTimer(); clearGuard(); try { TTS.stop(); } catch (e) {} msState("paused"); renderPP(); }
    else { playing = true; renderPP(); play(); }
  }
  function stop() { playing = false; tok++; clearTimer(); clearGuard(); try { if (root.TTS && TTS.stop) TTS.stop(); } catch (e) {} msState("none"); }
  function done() {
    stop(); releaseWake();
    const m = mask(); if (!m) return;
    m.innerHTML = '<div class="ls-wrap"><div class="ls-top"><span class="tt">🎧 ' + esc(T("lsTitle")) + '</span><button class="ls-x" onclick="Listen.close()">×</button></div>'
      + '<div class="ls-done"><img src="images/bear.svg" alt=""><h3>' + esc(T("lsDone")) + "</h3><p>" + esc(T("lsDoneSub").replace("{n}", list.length)) + "</p></div>"
      + '<button class="ls-start" onclick="Listen.start()">▶ ' + esc(T("lsAgain")) + "</button>"
      + '<button class="ls-start ls-ghost" onclick="Listen.back()">' + esc(T("lsSettings")) + "</button></div>";
  }

  // ── ロック画面操作 / 画面スリープ防止 ──
  function msMeta(v) {
    try {
      if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") return;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: v.w + (v.py ? "（" + v.py + "）" : ""), artist: mean(v),
        album: "StayTW · " + (idx + 1) + "/" + list.length,
        artwork: [{ src: location.origin + "/images/bear.svg", sizes: "256x256", type: "image/svg+xml" }]
      });
      const H = (k, f) => { try { navigator.mediaSession.setActionHandler(k, f); } catch (e) {} };
      H("play", () => { if (!playing) toggle(); });
      H("pause", () => { if (playing) toggle(); });
      H("previoustrack", prev);
      H("nexttrack", () => { clearTimer(); next(); });
    } catch (e) {}
  }
  function msState(st) { try { if ("mediaSession" in navigator) navigator.mediaSession.playbackState = st; } catch (e) {} }
  function requestWake() {
    try { if (!wake && navigator.wakeLock) navigator.wakeLock.request("screen").then(w => { wake = w; w.addEventListener("release", () => { wake = null; }); }).catch(() => {}); } catch (e) {}
  }
  function releaseWake() { try { if (wake) { wake.release(); wake = null; } } catch (e) {} }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && playing) requestWake(); });

  root.Listen = { open, close, start, back, next, prev, toggle, opt, opt2, toggleMeaning, upgrade, cycleSpeed, isPlaying: () => playing, count: () => build().length };
})(window);
