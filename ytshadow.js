/* StayTW — YouTube 跟讀
 * 影片走 YouTube 官方 IFrame 嵌入(不下載、不重製);我們只存「第幾秒講了哪一句」的時間軸。
 * 依 YouTube 條款這個功能必須留在免費區 —— 不要加 Paywall.gate。
 *
 * 讀音原則:不自動標注音。台灣華語破音字多,猜錯讀音違反「一律對照教育部」的規矩,
 * 所以句子只做「點詞查字典」(用站上已驗證的 dict-ext),要讀音自己點。
 */
const YTS = (() => {
  const API = "/api/yt-captions";
  const SPEEDS = [1, 0.75, 0.5];
  // 影片は「字幕トラックが本当に有る」ものだけ（台湾の YouTube は焼き込み字幕が多く、
  // 使えるものは少ない）。追加するときは必ず node scripts/yt-seed.mjs --check <id> で確認してから。
  const SAMPLES = [
    // 入門:短くてはっきり喋る。字幕付きの教材系
    { v: "ulkM3tRfA1Q", cat: "beg", t: "台灣人的口頭禪", tag: "2 分 · 中原大學華語中心" },
    { v: "gD5kuw2EPF4", cat: "beg", t: "常用語系列 EP.2", tag: "2 分 · 中原大學華語中心" },
    { v: "VRBnr6V1gAg", cat: "beg", t: "台灣熱門網路用語", tag: "3 分 · 中原大學華語中心" },
    { v: "0wZe_nqaiN4", cat: "beg", t: "要這樣撩妹才對？", tag: "3 分 · 中原大學華語中心" },
    { v: "5gknWTmFe0A", cat: "beg", t: "台灣華語 vs 中國普通話", tag: "10 分 · Grace Mandarin" },
    { v: "bA336OmpX38", cat: "beg", t: "搭台北捷運：買票進站・悠遊卡", tag: "7 分 · 樂樂TV" },
    // 生活:台湾で実際にやること・食べるもの
    { v: "tqy1JaNotUA", cat: "life", t: "在手搖飲料店怎麼點餐？", tag: "5 分 · Lu Twins" },
    { v: "x5Ccp2J1ziM", cat: "life", t: "台灣早餐店是怎麼出現的？", tag: "11 分 · 志祺七七" },
    { v: "gID1iXQdUmk", cat: "life", t: "全家為什麼贏不了 7-11？", tag: "15 分 · 志祺七七" },
    { v: "ybQbUN35kR8", cat: "life", t: "珍珠奶茶怎麼走向國際？", tag: "11 分 · 志祺七七" },
    { v: "LRvRY67VWjU", cat: "life", t: "台灣怎麼變成吃鍋大國？", tag: "16 分 · 志祺七七" },
    { v: "P3pJn58ULsw", cat: "life", t: "台灣泡麵大戰打了半世紀", tag: "13 分 · 志祺七七" },
    // 社会:ニュースっぽいが身近な話
    { v: "s5zW5IHcLi8", cat: "news", t: "行人地獄？台灣交通到底怎麼了", tag: "13 分 · 志祺七七" },
    { v: "ukXD5mrVQMA", cat: "news", t: "台灣人為什麼這麼愛補習？", tag: "11 分 · 志祺七七" },
    { v: "DnTa8ZVQKv0", cat: "news", t: "台灣住宿為什麼這麼貴？", tag: "12 分 · 志祺七七" },
    { v: "FCOxTLcqp8I", cat: "news", t: "全球只剩台灣在用「注音」", tag: "12 分 · 志祺七七" },
    // 講演:長めだが中身がある
    { v: "j_t0XlFoCjU", cat: "talk", t: "向你的困境借東西", tag: "9 分 · TEDxTaipei" },
    { v: "snZ811wvjjw", cat: "talk", t: "如何不讓人生留下遺憾？", tag: "14 分 · TEDxTaipei" },
    { v: "uiJ4zibW8_M", cat: "talk", t: "重新認識「情緒反應」", tag: "15 分 · TEDxTaipei" },
    { v: "E_rrqYcl6TQ", cat: "talk", t: "扎根大地的文學：吳明益", tag: "19 分 · TEDxTaipei" },
    { v: "6i7RcP39NB0", cat: "talk", t: "留十八分鐘給自己：蔣勳", tag: "25 分 · TEDxTaipei" },
  ];

  const CATS = ["all", "beg", "life", "news", "talk"];

  let player = null, apiReady = false, vid = "", lines = [], cur = 0, mode = "follow";
  let loopOn = false, spdIdx = 0, vocab = [], watchT = 0, booted = false, meta = {};
  let followT = 0;   // 跟播モード:動画の再生位置に合わせてカードを送る
  let cat = "all", rec = null, recording = false, stopTimer = 0;

  const T = (k) => (typeof twT === "function" ? twT(k) : k);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const $ = (id) => document.getElementById(id);
  const speed = () => SPEEDS[spdIdx];
  const ICON_PLAY = '<svg class="yts-i" viewBox="0 0 24 24"><polygon points="7 4.5 19 12 7 19.5" fill="currentColor" stroke="none"/></svg>';
  const ICON_LOOP = '<svg class="yts-i" viewBox="0 0 24 24"><path d="M4 9.5A4.5 4.5 0 0 1 8.5 5H18"/><polyline points="15 2.5 18.5 5 15 7.5"/><path d="M20 14.5A4.5 4.5 0 0 1 15.5 19H6"/><polyline points="9 21.5 5.5 19 9 16.5"/></svg>';

  function parseVid(s) {
    s = (s || "").trim();
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
    const m = s.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
  }
  const doneKey = (v) => "yts_done_" + v;
  function doneSet(v) { try { return new Set(JSON.parse(localStorage.getItem(doneKey(v)) || "[]")); } catch (e) { return new Set(); } }
  function markDone(v, i) { const s = doneSet(v); s.add(i); try { localStorage.setItem(doneKey(v), JSON.stringify([...s])); } catch (e) {} }

  // ── 判定:讀音比對(不看字形)。語音辨識常回簡體或同音異字,比字會冤枉人。 ──
  let PYMAP = null;
  function loadPy() {
    if (PYMAP) return Promise.resolve(PYMAP);
    return fetch("data/hanzi-pinyin.json").then((r) => r.json()).then((m) => (PYMAP = m)).catch(() => (PYMAP = {}));
  }
  const strip = (s) => String(s).replace(/[，。！？；：、,.!?;:\s（）()「」『』…—～\-\d０-９a-zA-Z]/g, "");
  const toPy = (s) => [...strip(s)].map((c) => (PYMAP && PYMAP[c]) || c);
  function lcs(a, b) {
    if (!b.length) return { n: 0, hit: [] };
    const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    const hit = new Array(b.length).fill(false);
    let i = a.length, j = b.length;
    while (i > 0 && j > 0) {
      if (a[i - 1] === b[j - 1]) { hit[j - 1] = true; i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--;
    }
    return { n: dp[a.length][b.length], hit };
  }

  // ── YouTube IFrame API ──
  function loadApi(cb) {
    if (apiReady) { cb(); return; }
    if (window.YT && window.YT.Player) { apiReady = true; cb(); return; }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { apiReady = true; try { prev && prev(); } catch (e) {} cb(); };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script"); s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  }

  // ── 讀取影片 ──
  async function load(input) {
    const v = parseVid(input);
    if (!v) { toast(T("ytsBadUrl")); return; }
    const box = $("ytsBody");
    box.innerHTML = `<div class="yts-load">${esc(T("ytsLoading"))}</div>`;
    let data;
    try {
      const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ v }) });
      data = await r.json();
      if (!r.ok || !data.lines || !data.lines.length) throw new Error(data.error || "no_captions");
    } catch (e) {
      box.innerHTML = `<div class="yts-empty">
        <p>${esc(T("ytsNoCap"))}</p>
        <p class="yts-sub">${esc(T("ytsNoCapSub"))}</p>
        <button class="btn" onclick="YTS.render()">${esc(T("ytsBackList"))}</button></div>`;
      return;
    }
    vid = v; meta = data; cur = 0; spdIdx = 0; loopOn = false; mode = "follow";
    lines = data.lines.filter((l) => l && l.z);
    await loadPy();
    stwLoadExt(() => {
      vocab = twMergeVocab([], lines.map((l) => l.z).join(""));
      renderPlayer();
    });
  }

  function renderPlayer() {
    $("ytsBody").innerHTML = `
      <div class="yts-head">
        <button class="yts-back" onclick="YTS.render()">‹ ${esc(T("ytsBackList"))}</button>
        <div class="yts-title">${esc(meta.title || "")}</div>
      </div>
      <div class="yts-video"><div id="ytsFrame"></div></div>
      <div class="yts-modes">
        ${["follow", "shadow", "dict"].map((m) => `<button class="yts-mode${m === mode ? " on" : ""}" data-m="${m}" onclick="YTS.setMode('${m}')">${esc(T("ytsMode_" + m))}</button>`).join("")}
      </div>
      <div id="ytsCard"></div>`;
    loadApi(() => {
      player = new YT.Player("ytsFrame", {
        videoId: vid, playerVars: { rel: 0, playsinline: 1, modestbranding: 1 },
        events: {
          onReady: () => { card(); },
          // 使用者直接按影片自己的播放鍵時,我們的監看沒被掛上 →
          // 跟播模式字幕不動、逐句模式會一路播下去。這裡接手。
          onStateChange: (e) => {
            const st = e && e.data;
            if (st === 1) {
              if (mode === "follow") followWatch();
              else if (lines[cur]) {
                const r = segRange(cur);
                watchSeg(r.s, r.e, () => { clearWatch(); try { player.pauseVideo(); } catch (e2) {} if (loopOn) setTimeout(playSeg, 350); });
              }
            } else if (st === 2) { clearWatch(); clearFollow(); }   // 使用者自己按暫停
          },
          onError: (e) => {
            const code = e && e.data;
            $("ytsCard").innerHTML = `<div class="yts-empty"><p>${esc(code === 101 || code === 150 ? T("ytsNoEmbed") : T("ytsPlayErr"))}</p>
              <button class="btn" onclick="YTS.render()">${esc(T("ytsBackList"))}</button></div>`;
          },
        },
      });
    });
  }

  function setMode(m) {
    mode = m;
    document.querySelectorAll(".yts-mode").forEach((b) => b.classList.toggle("on", b.dataset.m === m));
    clearWatch(); clearFollow();
    let st = -1; try { st = player && player.getPlayerState(); } catch (e) {}
    if (st === 1) { if (m === "follow") followWatch(); else { const r = segRange(cur); watchSeg(r.s, r.e, () => { clearWatch(); try { player.pauseVideo(); } catch (e) {} }); } }
    card();
  }

  // ── 練習卡:一次一句 ──
  function card() {
    const l = lines[cur]; if (!l) return;
    const done = doneSet(vid);
    const body = mode === "dict"
      ? `<div class="yts-dictwrap">
           <input id="ytsIn" class="yts-in" type="text" autocomplete="off" placeholder="${esc(T("ytsTypeHint"))}">
           <button class="btn primary yts-chk" onclick="YTS.check()">${esc(T("ytsCheck"))}</button>
         </div>
         <div id="ytsSent" class="yts-sent yts-blur"></div>`
      : `<div id="ytsSent" class="yts-sent"></div>` + (mode === "shadow"
          ? `<div class="yts-mic-wrap"><button id="ytsMic" class="yts-mic" onclick="YTS.mic()" aria-label="${esc(T("ytsRec"))}">
               <svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0"/><line x1="12" y1="18" x2="12" y2="21"/></svg></button>
             <div id="ytsStatus" class="yts-status">${esc(T("ytsRec"))}</div></div>` : "");

    $("ytsCard").innerHTML = `
      <div class="yts-prog"><i style="width:${Math.round((done.size / lines.length) * 100)}%"></i></div>
      <div class="yts-count">${cur + 1} / ${lines.length}${done.has(cur) ? " ✓" : ""}</div>
      <div class="yts-ctrl">
        <button class="yts-c" onclick="YTS.go(-1)" aria-label="${esc(T("ytsPrev"))}">‹</button>
        <button class="yts-c wide" onclick="YTS.play()">${ICON_PLAY}${esc(T("ytsPlayLine"))}</button>
        <button class="yts-c" onclick="YTS.cycleSpeed()">${speed()}x</button>
        <button class="yts-c${loopOn ? " on" : ""}" onclick="YTS.toggleLoop()" aria-label="${esc(T("ytsLoop"))}">${ICON_LOOP}</button>
        <button class="yts-c" onclick="YTS.go(1)" aria-label="${esc(T("ytsNext"))}">›</button>
      </div>
      ${body}
      <div id="ytsRes"></div>`;

    const sent = $("ytsSent");
    sent.innerHTML = twRenderZh(l.z, vocab, null);
    twBindWords(sent, vocab);
    if (mode === "dict") { const i = $("ytsIn"); if (i) { i.value = ""; i.onkeydown = (e) => { if (e.key === "Enter") check(); }; } }
  }

  // ── 播放控制 ──
  // ここは 2 回作り直している。固定 setTimeout で「この長さ経ったら止める」方式は、
  //   ・seekTo の直後 getCurrentTime はしばらく“前の位置”を返す
  //   ・バッファリングで実際の再生開始が遅れる
  // ので「一言しゃべって止まる」になる。StayJP が同じ苦情で直した方式に合わせ、
  // 再生位置を 100ms ごとに見て「seek がその区間に着地してから」終わりを判定する。
  function segRange(i) {
    const l = lines[i];
    const s0 = Math.max(0, l.t / 1000 - 0.15);              // 頭を切らないよう少し前から
    let e0 = (l.t + (l.d || 4000)) / 1000 + 0.3;            // 語尾も少し残す
    const nx = lines[i + 1];
    if (nx) e0 = Math.min(e0, nx.t / 1000 + 0.25);          // ASR の d は次の句に食い込みがち
    return { s: s0, e: e0 };
  }
  function clearWatch() { clearInterval(watchT); watchT = 0; }
  function clearFollow() { clearInterval(followT); followT = 0; }
  function watchSeg(s0, e0, onEnd) {
    clearWatch();
    let landed = false, tries = 0;
    watchT = setInterval(() => {
      try {
        const c = player.getCurrentTime();
        if (!landed) {
          if (c >= s0 - 0.6 && c < e0 + 0.5) landed = true;
          else if (++tries > 40) landed = true;             // 4 秒待っても着地しなければ諦めて判定に入る
          else return;
        }
        if (c >= e0 - 0.05 || c < s0 - 1.5) onEnd(c);
      } catch (e) {}
    }, 100);
  }
  function playSeg() {
    const l = lines[cur]; if (!l || !player || !player.seekTo) return;
    const r = segRange(cur);
    clearWatch(); clearFollow();
    try {
      player.setPlaybackRate(speed());
      player.seekTo(r.s, true);
      player.playVideo();
    } catch (e) { return; }
    watchSeg(r.s, r.e, () => {
      clearWatch();
      try { player.pauseVideo(); } catch (e) {}
      if (loopOn) setTimeout(playSeg, 350);
    });
  }
  // 跟播:止めずに流しっぱなしで、カードだけ再生位置に追従させる。
  // これが無いと「動画の再生ボタンを押しても字幕が動かない」になる。
  function followWatch() {
    if (!player) return;
    clearWatch(); clearFollow();
    followT = setInterval(() => {
      try {
        const ms = player.getCurrentTime() * 1000;
        let i = cur;
        // シークバーを動かされたら現在地が離れるので頭から探し直す
        if (ms < lines[i].t || ms >= lines[i].t + (lines[i].d || 4000) + 4000) i = 0;
        while (i < lines.length - 1 && lines[i + 1].t <= ms) i++;
        while (i > 0 && lines[i].t > ms) i--;
        if (i !== cur) { cur = i; card(); }
      } catch (e) {}
    }, 200);
  }
  function play() {
    if (!player || !lines[cur]) return;
    if (mode === "follow") {
      let st = -1; try { st = player.getPlayerState(); } catch (e) {}
      if (st === 1) { try { player.pauseVideo(); } catch (e) {} clearFollow(); return; }
      try { player.setPlaybackRate(speed()); player.seekTo(lines[cur].t / 1000, true); player.playVideo(); } catch (e) {}
      followWatch();
      return;
    }
    // 逐句:句の途中で止まっているなら続きから、そうでなければ頭から
    let c = -1; try { c = player.getCurrentTime(); } catch (e) {}
    const r = segRange(cur);
    if (c > r.s && c < r.e - 0.1) {
      try { player.playVideo(); } catch (e) {}
      watchSeg(r.s, r.e, () => { clearWatch(); try { player.pauseVideo(); } catch (e) {} if (loopOn) setTimeout(playSeg, 350); });
    } else playSeg();
  }
  function go(d) {
    clearWatch(); clearFollow();
    try { player && player.pauseVideo && player.pauseVideo(); } catch (e) {}
    const n = cur + d;
    if (n < 0 || n >= lines.length) return;
    cur = n; card();
  }
  function cycleSpeed() { spdIdx = (spdIdx + 1) % SPEEDS.length; card(); }
  function toggleLoop() { loopOn = !loopOn; card(); }

  // ── 跟讀:語音辨識(瀏覽器 / App 原生橋接) ──
  const isNative = () => !!(window.STAYTW_NATIVE && window.STAYTW_NATIVE.isNativeApp);
  const post = (o) => { try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(o)); } catch (e) {} };
  function mic() {
    if (recording) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const m = $("ytsMic"), st = $("ytsStatus");
    try { player && player.pauseVideo && player.pauseVideo(); } catch (e) {}
    clearWatch(); clearFollow();
    if (isNative()) {
      let final = "";
      recording = true; m.classList.add("rec"); st.textContent = T("ytsListening");
      stopTimer = setTimeout(() => post({ type: "SPEECH_STOP" }), 8000);
      window.stwSpeechResult = (tx, isFinal) => { if (isFinal) { if (tx) final = tx; } else if (tx) st.textContent = "… " + tx; };
      window.stwSpeechEnd = (err) => {
        recording = false; m.classList.remove("rec"); clearTimeout(stopTimer);
        st.textContent = T("ytsRec");
        if (final) result(final); else st.textContent = T(err === "not-allowed" ? "ytsErrMic" : "ytsErrNone");
      };
      post({ type: "SPEECH_START", lang: "zh-TW" });
      return;
    }
    if (!SR) { st.textContent = T("ytsErrNoSr"); return; }
    rec = new SR(); rec.lang = "zh-TW"; rec.interimResults = true; rec.continuous = false;
    let final = "", err = "";
    rec.onstart = () => { recording = true; m.classList.add("rec"); st.textContent = T("ytsListening");
      stopTimer = setTimeout(() => { try { rec.stop(); } catch (e) {} }, 8000); };
    rec.onresult = (e) => { let it = ""; for (const r of e.results) (r.isFinal ? (final += r[0].transcript) : (it += r[0].transcript)); if (it) st.textContent = "… " + it; };
    rec.onerror = (e) => { err = e.error || "error"; };
    rec.onend = () => {
      recording = false; m.classList.remove("rec"); clearTimeout(stopTimer); st.textContent = T("ytsRec");
      if (final) result(final);
      else st.textContent = T(err === "not-allowed" || err === "audio-capture" ? "ytsErrMic" : err === "network" ? "ytsErrNet" : "ytsErrNone");
    };
    try { rec.start(); } catch (e) { recording = false; }
  }

  // 跟讀比「音」、聽寫比「字」。
  // 跟讀:語音辨識常回簡體或同音異字(現↔现),比字會冤枉人 → 比拼音。
  // 聽寫:寫對字本身就是目的,比音的話「頻道」打成「頻到」也會滿分 → 比字。
  function result(said) {
    const target = lines[cur].z;
    const byChar = mode === "dict";
    const a = byChar ? [...strip(said)] : toPy(said);
    const b = byChar ? [...strip(target)] : toPy(target);
    const { n, hit } = lcs(a, b);
    const pct = Math.round((n / Math.max(1, b.length)) * 100);
    const pass = pct >= 70;
    if (pass) markDone(vid, cur);
    const chars = [...strip(target)];
    const marked = chars.map((c, i) => hit[i] ? esc(c) : `<u class="yts-miss">${esc(c)}</u>`).join("");
    $("ytsRes").innerHTML = `
      <div class="yts-res ${pass ? "ok" : "ng"}">
        <div class="yts-score">${pct}<span>%</span></div>
        <div class="yts-marked">${marked}</div>
        <div class="yts-said">${esc(T("ytsHeard"))}：${esc(said)}</div>
        ${pass ? `<button class="btn primary" onclick="YTS.go(1)">${esc(T("ytsNextLine"))} →</button>`
               : `<button class="btn" onclick="YTS.play()">${esc(T("ytsAgain"))}</button>`}
      </div>`;
  }

  // ── 聽寫 ──
  function check() {
    const i = $("ytsIn"); if (!i) return;
    const said = i.value.trim(); if (!said) return;
    $("ytsSent").classList.remove("yts-blur");
    result(said);
  }

  function toast(m) { try { if (typeof showToast === "function") showToast(m); else alert(m); } catch (e) {} }

  // ── 首頁:影片牆 ──
  function render() {
    booted = true;
    clearWatch(); clearFollow();
    try { if (player && player.destroy) player.destroy(); } catch (e) {}
    player = null; vid = "";
    const list = SAMPLES.filter((s) => cat === "all" || s.cat === cat);
    $("ytsBody").innerHTML = `
      <p class="yts-lead">${esc(T("ytsLead"))}</p>
      <div class="yts-cats">${CATS.map((c) => `<button class="yts-cat${c === cat ? " on" : ""}" onclick="YTS.setCat('${c}')">${esc(T("ytsCat_" + c))}</button>`).join("")}</div>
      <div class="yts-grid">${list.map((s) => {
        const d = doneSet(s.v).size;
        return `<button class="yts-card" onclick="YTS.load('${s.v}')">
          <img loading="lazy" src="https://i.ytimg.com/vi/${s.v}/mqdefault.jpg" alt="">
          <div class="yts-ct"><b>${esc(s.t)}</b><span>${esc(s.tag)}</span>${d ? `<em>${d} ${esc(T("ytsDoneN"))}</em>` : ""}</div>
        </button>`;
      }).join("")}</div>
      <details class="yts-own"><summary>${esc(T("ytsOwn"))}</summary>
        <div class="yts-ownin">
          <input id="ytsUrl" class="yts-in" type="text" inputmode="url" placeholder="${esc(T("ytsUrlHint"))}">
          <button class="btn" onclick="YTS.load(document.getElementById('ytsUrl').value)">${esc(T("ytsLoad"))}</button>
        </div>
        <p class="yts-sub">${esc(T("ytsOwnNote"))}</p>
      </details>`;
  }
  function setCat(c) { cat = c; render(); }

  return { render, load, setMode, play, go, cycleSpeed, toggleLoop, mic, check, setCat, booted: () => booted };
})();
if (typeof window !== "undefined") window.YTS = YTS;   // const は window に乗らない(TTS/Paywall と同じ罠)
