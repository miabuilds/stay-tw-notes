/* StayTW — 我的單字本
 *
 * 引き方の優先順位（読みの信頼度がそのまま順位）:
 *   1. dict  サイトの語彙/辞書に語として載っている  → 教育部で検証済み。無印
 *   2. char  語では無いが 1 文字ずつ辞書に有る      → 各字は検証済み・語としての軽声/変調までは保証しない → 「組字」印
 *   3. ai    どちらでも引けない                    → /api/word-lookup（教育部の読みを指示）→ 「AI」印
 *   AI の読みでも、全ての字が辞書に有れば 2 の方式で上書きする。推測を検証済みと同じ顔で出さない。
 *
 * 保存は localStorage + クラウド同期（websync の SYNC_KEYS に stw_myvocab を追加済み）。
 * 削除は墓碑を残す。union マージなので墓碑が無いと別端末から消した語が戻ってくる。
 */
const MyVocab = (() => {
  const KEY = "stw_myvocab";
  const FREE_MAX = 10;            // 無料はここまで。Premium は無制限
  const esc = (x) => String(x == null ? "" : x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const T = (k, fb) => { try { const v = twT(k); return v && v !== k ? v : fb; } catch (e) { return fb; } };
  const mk = () => (typeof twMKey === "function" ? twMKey() : "j");
  const langKey = () => { try { return twGetLang(); } catch (e) { return "ja"; } };

  function raw() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function writeAll(a) {
    try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {}
    try { if (typeof window.onSRSChange === "function") window.onSRSChange(); } catch (e) {}
  }
  function list() {
    return raw().filter((x) => x && x.w && !x.del).sort((a, b) => (b.added || 0) - (a.added || 0));
  }
  function count() { return list().length; }
  function has(w) { return list().some((x) => x.w === w); }
  function isPremium() { try { return Paywall.isPremium(); } catch (e) { return false; } }
  function canAdd() { return isPremium() || count() < FREE_MAX; }

  // ── 引く ───────────────────────────────────────────────
  // 語まるごと辞書に有るか
  function fromDict(w) {
    let e = null;
    try { e = stwLookup(w); } catch (err) {}
    if (!e || !e.zy) return null;
    return {
      w, zy: e.zy, py: e.py || "", c: e.c || "",
      // 語彙データは m:{j,e,k}、拡張辞書は j/e/k が直下。両方の形を受ける
      m: (e.m && (e.m[mk()] || e.m.e || e.m.j)) || e[mk()] || e.e || e.j || e.d || "", src: "dict",
      ex: e.ex && e.ex.z ? { z: e.ex.z, py: e.ex.py || "", t: e.ex[mk()] || e.ex.e || e.ex.j || "" } : null,
    };
  }
  // 1 文字ずつ組む。各字は検証済みだが語としての軽声・変調までは保証しないので src は char
  function fromChars(w) {
    if (!/^[一-鿿]+$/.test(w)) return null;
    const zs = [], ps = [];
    for (const c of w) {
      let e = null;
      try { e = stwLookup(c); } catch (err) {}
      if (!e || !e.zy) return null;
      zs.push(e.zy); ps.push(e.py || "");
    }
    return { w, zy: zs.join(" "), py: ps.join(" "), c: "", m: "", src: "char", ex: null };
  }
  async function fromAI(w) {
    const base = (typeof STW_API !== "undefined" && STW_API) ? STW_API : "";
    const r = await fetch(base + "/api/word-lookup", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: w }),
    });
    if (!r.ok) throw new Error(r.status === 429 ? "quota" : "fail");
    const d = await r.json();
    if (!d || !d.w) throw new Error("notfound");
    const L = langKey();
    const out = {
      w: d.w, zy: d.zy || "", py: d.py || "", c: d.c || "",
      m: d[L] || d.en || d.ja || "", src: "ai",
      ex: d.ex && d.ex.z ? { z: d.ex.z, py: d.ex.py || "", t: d.ex[L] || d.ex.en || d.ex.ja || "" } : null,
    };
    // 読みだけは検証済みで上書きできるならそうする
    const c = fromChars(out.w);
    if (c) { out.zy = c.zy; out.py = c.py; out.src = "ai-zy"; }
    return out;
  }

  async function lookup(w) {
    return fromDict(w) || (await fromAI(w).catch(() => fromChars(w)));
  }

  // ── 追加・削除 ──────────────────────────────────────────
  function add(item) {
    if (!item || !item.w) return;
    const a = raw();
    const i = a.findIndex((x) => x && x.w === item.w);
    const e = Object.assign({}, item, {
      added: (i >= 0 && a[i].added) ? a[i].added : Date.now(), upd: Date.now(), del: 0,
    });
    if (i >= 0) a[i] = e; else a.push(e);
    writeAll(a);
    // 複習(SRS)は STW_CUSTOM からカード内容を引くので、そこにも置く
    try {
      stwSaveCustomCard({ w: e.w, zy: e.zy, py: e.py, e: e.m, j: e.m, k: e.m, d: "" });
    } catch (err) {}
    // 2026-10 まで「複習にまわせます」と書きながら SRS に入れていなかった。入れた時点で復習の列に載せる
    try { if (window.SRS && SRS.addWord) SRS.addWord(lvOf(e.w), e.w); } catch (err) {}
  }
  function lvOf(w) { let e = null; try { e = stwLookup(w); } catch (err) {} return (e && e._lv && !e._ext) ? e._lv : "ext"; }
  function stat(w, ok) {   // 自分の単語帳テストの成績を語ごとに持つ(並べ替え・表示用)
    const a = raw(); const i = a.findIndex((x) => x && x.w === w && !x.del); if (i < 0) return;
    const q = a[i].qs || { ok: 0, ng: 0 }; if (ok) q.ok++; else q.ng++; q.last = Date.now();
    a[i] = Object.assign({}, a[i], { qs: q, upd: Date.now() }); writeAll(a);
  }
  let pendingDel = "";
  function askDel(w) { pendingDel = w; render(); }
  function cancelDel() { pendingDel = ""; render(); }
  function remove(w) {
    pendingDel = "";
    const a = raw();
    for (let i = 0; i < a.length; i++) if (a[i] && a[i].w === w) a[i] = { w, del: 1, upd: Date.now() };
    writeAll(a);
    // SRS 側にも消し込み（srs.js にキー削除の口が無いので直接触る。形式は "level:word"）
    try {
      const d = JSON.parse(localStorage.getItem("stw_srs") || "{}");
      let hit = false;
      for (const k of Object.keys(d)) if (k.slice(k.indexOf(":") + 1) === w) { delete d[k]; hit = true; }
      if (hit) { localStorage.setItem("stw_srs", JSON.stringify(d)); try { SRS._import(d); } catch (e2) {} }
    } catch (e) {}
    try { delete STW_CUSTOM[w]; localStorage.setItem("stw_custom_cards", JSON.stringify(STW_CUSTOM)); } catch (e) {}
    render();
  }

  // ── 画面 ───────────────────────────────────────────────
  function srcBadge(src) {
    if (src === "char") return `<span class="mv-b mv-b-c" title="${esc(T("mvSrcCharT", "1 文字ずつ辞書から組んだ読み"))}">${esc(T("mvSrcChar", "組字"))}</span>`;
    if (src === "ai") return `<span class="mv-b mv-b-a">AI</span>`;
    if (src === "ai-zy") return `<span class="mv-b mv-b-a">AI</span>`;
    return "";
  }
  let sortMode = "new", quiz = null, lastWrong = [];
  function setSort(m) { sortMode = m; render(); }
  function render() {
    const box = document.getElementById("mvBody");
    if (!box) return;
    if (quiz) { renderQuiz(box); return; }
    let items = list();
    if (sortMode === "weak") items = items.slice().sort((a, b) => ((b.qs && b.qs.ng) || 0) - ((a.qs && a.qs.ng) || 0) || (((a.qs && a.qs.ok) || 0) - ((b.qs && b.qs.ok) || 0)));
    const n = items.length;
    const lim = isPremium() ? "" : `<span class="mv-lim${n >= FREE_MAX ? " full" : ""}">${n} / ${FREE_MAX}</span>`;
    box.innerHTML = `
      <p class="mv-lead">${esc(T("mvLead", "気になった語を自分で足して、複習にまわせます。"))}</p>
      <div class="mv-add">
        <input class="search" id="mvIn" placeholder="${esc(T("mvPh", "語を入力（例：捷運）"))}" autocomplete="off">
        <button class="btn primary" id="mvBtn" onclick="MyVocab.submit()">${esc(T("mvAdd", "調べて追加"))}</button>
      </div>
      <div id="mvMsg" class="mv-msg"></div>
      ${n ? `<div class="mv-tools">
        <button class="btn primary mv-qbtn" onclick="MyVocab.startQuiz()" ${n < 4 ? "disabled" : ""}>${icon("edit", { size: 16 })} ${esc(T("mvQuizBtn", "この単語帳でテスト"))}</button>
        ${n < 4 ? `<span class="mv-qneed">${esc(T("mvQuizNeed", "4 語以上入れるとテストできます"))}</span>` : ""}
      </div>` : ""}
      <div class="mv-head"><span>${esc(T("mvList", "自分の語"))}</span>${lim}</div>
      ${n > 1 ? `<div class="mv-sort"><button class="${sortMode === "new" ? "on" : ""}" onclick="MyVocab.setSort('new')">${esc(T("mvSortNew", "新しい順"))}</button><button class="${sortMode === "weak" ? "on" : ""}" onclick="MyVocab.setSort('weak')">${esc(T("mvSortWeak", "よく間違える順"))}</button></div>` : ""}
      ${n === 0 ? `<img class="il" src="images/il/04_empty_notebook.webp" alt="" width="110" height="110" style="width:110px;height:110px;display:block;margin:14px auto 0"><p class="mv-empty" style="text-align:center">${esc(T("mvEmpty", "まだ 1 語もありません。"))}</p>` : ""}
      <div class="mv-items">${items.map(cardHtml).join("")}</div>`;
    const inp = document.getElementById("mvIn");
    if (inp) inp.onkeydown = (e) => { if (e.key === "Enter") { e.stopPropagation(); submit(); } };
  }
  function cardHtml(it) {
    const zy = (s) => (typeof twZy === "function" ? twZy(s) : esc(s));
    return `<div class="mv-it">
      <div class="mv-top">
        <b class="mv-w" onclick="speakZh('${esc(it.w)}')">${esc(it.w)}</b>
        ${typeof twPyOnly === "function" && twPyOnly() ? "" : `<span class="mv-zy">${zy(it.zy)}</span>`}<span class="mv-py">${esc(it.py)}</span>
        ${srcBadge(it.src)}
        ${it.qs && (it.qs.ok + it.qs.ng) ? `<span class="mv-stat${it.qs.ng > it.qs.ok ? " weak" : ""}">${esc(T("mvStat", "正解 {a}/{b}").replace("{a}", it.qs.ok).replace("{b}", it.qs.ok + it.qs.ng))}</span>` : ""}
        <button class="mv-del" onclick="MyVocab.askDel('${esc(it.w)}')" title="${esc(T("mvDel", "削除"))}">✕</button>
      </div>
      ${pendingDel === it.w ? `<div class="mv-confirm"><span>${esc(T("mvDelQ", "「{w}」を単語帳から消しますか？").replace("{w}", it.w))}</span><button class="mv-cyes" onclick="MyVocab.remove('${esc(it.w)}')">${esc(T("mvDelYes", "削除する"))}</button><button class="mv-cno" onclick="MyVocab.cancelDel()">${esc(T("mvCancel", "やめる"))}</button></div>` : ""}
      ${it.m ? `<div class="mv-m">${esc(it.m)}</div>` : ""}
      ${it.ex ? `<div class="mv-ex" onclick="speakZh('${esc(it.ex.z)}')">${esc(it.ex.z)}<span>${esc(it.ex.t || "")}</span></div>` : ""}
    </div>`;
  }
  function msg(html) { const m = document.getElementById("mvMsg"); if (m) m.innerHTML = html; }

  async function submit() {
    const inp = document.getElementById("mvIn");
    const w = (inp && inp.value || "").trim();
    if (!w) return;
    if (has(w)) { msg(`<span class="mv-warn">${esc(T("mvDup", "もう入っています。"))}</span>`); return; }
    if (!canAdd()) { try { Paywall.show("myvocab"); } catch (e) {} return; }
    const btn = document.getElementById("mvBtn");
    if (btn) { btn.disabled = true; btn.textContent = T("mvLooking", "調べています…"); }
    msg("");
    try {
      const it = await lookup(w);
      if (!it) { msg(`<span class="mv-warn">${esc(T("mvNotFound", "引けませんでした。手で足すこともできます。"))}</span>`); return; }
      add(it);
      if (inp) inp.value = "";
      render();
      try { showToast("✓ " + it.w); } catch (e) {}
    } catch (e) {
      msg(`<span class="mv-warn">${esc(e.message === "quota" ? T("mvQuota", "本日の調べる回数を使い切りました。") : T("mvFail", "うまく引けませんでした。"))}</span>`);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = T("mvAdd", "調べて追加"); }
    }
  }

  // 辞書カード(文章・読解で語をタップ)から直接保存。打ち直さなくていいように(StayJP と同じ流れ)
  function saveFromDict(w) {
    if (!w) return "none";
    if (has(w)) return "dup";
    if (!canAdd()) { try { Paywall.show("myvocab"); } catch (e) {} return "limit"; }
    const it = fromDict(w) || fromChars(w);
    if (!it) return "none";
    add(it);
    return "ok";
  }

  // ── 単語帳テスト ───────────────────────────────────────
  // 選ぶ → 送出 → 解説 → 自分で次へ(自動で進めない)。結果は SRS と語ごとの成績に返す
  const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
  function pool() {   // 選択肢の混ぜ物:自分の語 → 足りなければ今のレベルの語彙
    let extra = [];
    try { extra = (twOpenVocab(currentLevel) || []).map((v) => ({ w: v.w, zy: v.zy, py: v.py, m: (v.m && (v.m[mk()] || v.m.e || v.m.j)) || "" })); } catch (e) {}
    return extra;
  }
  function startQuiz(onlyWrong) {
    const mine = list(); if (!mine.length) return;
    const src = onlyWrong && lastWrong.length ? mine.filter((x) => lastWrong.includes(x.w)) : mine;
    const picks = shuffle(src).slice(0, 10), others = pool();
    const qs = picks.map((it) => {
      const types = it.m ? ["w2m", "a2w", "m2w"] : ["a2w"];
      const type = types[Math.floor(Math.random() * types.length)];
      const cand = shuffle(mine.filter((x) => x.w !== it.w).concat(shuffle(others).slice(0, 30)).filter((x) => x.w !== it.w && !twConfusable(it, x) && (type !== "w2m" || (x.m && x.m !== it.m))));
      const seen = new Set([type === "w2m" ? it.m : it.w]); const dis = [];
      for (const c of cand) { const k = type === "w2m" ? c.m : c.w; if (k && !seen.has(k)) { seen.add(k); dis.push(c); } if (dis.length === 3) break; }
      return { it, type, opts: shuffle([it].concat(dis)) };
    });
    quiz = { qs, i: 0, pick: -1, done: false, ok: 0, wrong: [] };
    render(); try { window.scrollTo(0, 0); } catch (e) {}
    if (qs[0] && qs[0].type === "a2w") setTimeout(() => speakZh(qs[0].it.w), 300);
  }
  function qPick(i) { if (!quiz || quiz.done) return; quiz.pick = i; render(); }
  function qSubmit() {
    if (!quiz || quiz.pick < 0 || quiz.done) return;
    const q = quiz.qs[quiz.i], ok = q.opts[quiz.pick].w === q.it.w;
    quiz.done = true; if (ok) quiz.ok++; else quiz.wrong.push(q.it.w);
    stat(q.it.w, ok);
    try { if (window.SRS && SRS.recordGrade) SRS.recordGrade(lvOf(q.it.w), q.it.w, ok ? "known" : "unknown"); } catch (e) {}
    try { window.STAYTW_studyDone && window.STAYTW_studyDone(); } catch (e) {}
    render(); speakZh(q.it.w);
  }
  function qNext() {
    if (!quiz) return; quiz.i++; quiz.pick = -1; quiz.done = false;
    if (quiz.i >= quiz.qs.length) { lastWrong = quiz.wrong.slice(); }
    render(); try { window.scrollTo(0, 0); } catch (e) {}
    const q = quiz.qs[quiz.i]; if (q && q.type === "a2w") setTimeout(() => speakZh(q.it.w), 300);
  }
  function qQuit() { quiz = null; render(); }
  function renderQuiz(box) {
    const zy = (s) => (typeof twZy === "function" ? twZy(s || "") : esc(s));
    if (quiz.i >= quiz.qs.length) {
      const n = quiz.qs.length;
      box.innerHTML = `<div class="mvq-end">
        <img src="images/il/${quiz.ok === n ? "02_goal_done" : "10_quiz"}.webp" alt="" width="110" height="110">
        <div class="mvq-score">${esc(T("mvQScore", "{a} / {b} 問正解").replace("{a}", quiz.ok).replace("{b}", n))}</div>
        ${quiz.wrong.length ? `<div class="mvq-wh">${esc(T("mvQWrongH", "まちがえた語"))}</div><div class="mvq-wl">${quiz.wrong.map((w) => `<button onclick="speakZh('${esc(w)}')">${esc(w)}</button>`).join("")}</div>` : ""}
        <div class="mvq-btns">
          ${quiz.wrong.length ? `<button class="btn primary" onclick="MyVocab.startQuiz(true)">${esc(T("mvQRetryWrong", "まちがえた語だけもう一度"))}</button>` : ""}
          <button class="btn ${quiz.wrong.length ? "" : "primary"}" onclick="MyVocab.startQuiz()">${esc(T("mvQRetry", "もう一度テスト"))}</button>
          <button class="btn" data-nav-back onclick="MyVocab.qQuit()">${esc(T("mvQBack", "単語帳にもどる"))}</button>
        </div></div>`;
      return;
    }
    const q = quiz.qs[quiz.i], it = q.it;
    const prompt = q.type === "w2m" ? `<div class="mvq-w">${esc(it.w)}</div>`
      : q.type === "a2w" ? `<button class="mvq-play" onclick="speakZh('${esc(it.w)}')">${icon("volume", { size: 28 })}<span>${esc(T("mvQPlay", "もう一度聞く"))}</span></button>`
      : `<div class="mvq-m">${esc(it.m)}</div>`;
    const lab = { w2m: T("mvQW2M", "この語の意味は？"), a2w: T("mvQA2W", "聞こえた語は？"), m2w: T("mvQM2W", "この意味の語は？") }[q.type];
    const opts = q.opts.map((o, k) => {
      let cls = "mvq-o"; if (quiz.pick === k) cls += " sel";
      if (quiz.done) { if (o.w === it.w) cls += " ok"; else if (quiz.pick === k) cls += " ng"; }
      return `<button class="${cls}" onclick="MyVocab.qPick(${k})" ${quiz.done ? "disabled" : ""}>${esc(q.type === "w2m" ? o.m : o.w)}</button>`;
    }).join("");
    const okNow = quiz.done && q.opts[quiz.pick].w === it.w;
    box.innerHTML = `<div class="mvq">
      <div class="mvq-top"><button class="mvq-x" data-nav-back onclick="MyVocab.qQuit()" aria-label="close">✕</button><span>${quiz.i + 1} / ${quiz.qs.length}</span></div>
      <div class="mvq-bar"><i style="width:${Math.round(quiz.i / quiz.qs.length * 100)}%"></i></div>
      <div class="mvq-lab">${esc(lab)}</div>
      <div class="mvq-prompt">${prompt}</div>
      <div class="mvq-opts">${opts}</div>
      ${quiz.done ? `<div class="mvq-exp ${okNow ? "ok" : "ng"}">
          <b>${esc(okNow ? T("mvQCorrect", "正解！") : T("mvQWrong", "ざんねん"))}</b>
          <div class="mvq-ans"><span class="w" onclick="speakZh('${esc(it.w)}')">${esc(it.w)}</span>${typeof twPyOnly === "function" && twPyOnly() ? "" : `<span class="z">${zy(it.zy)}</span>`}<span class="p">${esc(it.py)}</span></div>
          ${it.m ? `<div class="mvq-am">${esc(it.m)}</div>` : ""}
        </div>
        <button class="btn primary mvq-go" onclick="MyVocab.qNext()">${esc(quiz.i + 1 < quiz.qs.length ? T("mvQNext", "次へ") : T("mvQFinish", "結果を見る"))}</button>`
        : `<button class="btn primary mvq-go" onclick="MyVocab.qSubmit()" ${quiz.pick < 0 ? "disabled" : ""}>${esc(T("mvQSubmit", "答え合わせ"))}</button>`}
    </div>`;
  }

  return { render, submit, remove, askDel, cancelDel, setSort, startQuiz, qPick, qSubmit, qNext, qQuit, list, count, has, add, saveFromDict, FREE_MAX };
})();
if (typeof window !== "undefined") window.MyVocab = MyVocab;   // const は window に乗らない
