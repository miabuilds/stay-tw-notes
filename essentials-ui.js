/* StayTW — 必學基礎（數字・量詞・時間・日期・稱謂・疑問詞）
 * 読みは essentials.js（教育部で検証した語彙から引き、変調は sandhi_rule と同じ規則で適用済み）。
 * 「一」の節は本調と変調を並べて見せるのが主目的なので、並び順を変えない。
 */
const ESS = (() => {
  let sec = "num", quiz = null;
  const body = () => document.getElementById("essBody");
  const T = (k) => (typeof twT === "function" ? twT(k) : k);
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const mean = (it) => { const k = (typeof twMKey === "function" ? twMKey() : "j"); return (it.m && (it.m[k] || it.m.e || it.m.j)) || ""; };
  const zy = (s) => (typeof twZy === "function" ? twZy(s) : esc(s));

  const NOTE = { yi: "ess_note_yi", two: "ess_note_two", mw: "ess_note_mw" };

  function render() {
    if (typeof ESSENTIALS === "undefined") { body().innerHTML = ""; return; }
    const cur = ESSENTIALS.find((s) => s.k === sec) || ESSENTIALS[0];
    body().innerHTML = `
      <p class="ess-lead">${esc(T("essLead"))}</p>
      <div class="ess-tabs">${ESSENTIALS.map((s) =>
        `<button class="ess-tab${s.k === cur.k ? " on" : ""}" onclick="ESS.go('${s.k}')">${esc(T("ess_" + s.k))}</button>`).join("")}</div>
      ${NOTE[cur.k] ? `<div class="ess-note">${esc(T(NOTE[cur.k]))}</div>` : ""}
      <div class="ess-grid">${cur.items.map((it, i) =>
        `<button class="ess-card" onclick="ESS.say(${i})">
           <div class="ess-w">${esc(it.w)}</div>
           <div class="ess-zy">${zy(it.zy)}</div>
           <div class="ess-py">${esc(it.py)}</div>
           <div class="ess-m">${esc(mean(it))}</div>
         </button>`).join("")}</div>
      <div class="ess-actions"><button class="btn primary" onclick="ESS.startQuiz()">${esc(T("essQuiz"))}</button></div>`;
  }
  function go(k) { sec = k; quiz = null; render(); }
  function say(i) {
    const cur = ESSENTIALS.find((s) => s.k === sec);
    const it = cur && cur.items[i];
    if (it && typeof speakZh === "function") speakZh(it.w);
  }

  // ── 隨堂測驗:意味 → 正しい語を選ぶ。範囲はいま見ている節だけ ──
  const TOTAL = 10;
  function startQuiz() {
    const cur = ESSENTIALS.find((s) => s.k === sec);
    if (!cur || cur.items.length < 4) return;
    const pool = [...cur.items].sort(() => Math.random() - 0.5).slice(0, Math.min(TOTAL, cur.items.length));
    quiz = { pool, i: 0, ok: 0, locked: false };
    drawQuiz();
  }
  function drawQuiz() {
    const cur = ESSENTIALS.find((s) => s.k === sec);
    const q = quiz.pool[quiz.i];
    const opts = [q, ...cur.items.filter((x) => x.w !== q.w).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
    body().innerHTML = `<div class="ess-quiz">
      <div class="ess-q-prog">${quiz.i + 1} / ${quiz.pool.length}　✓ ${quiz.ok}</div>
      <p class="ess-q-hint">${esc(T("essQuizHint"))}</p>
      <div class="ess-q-mean">${esc(mean(q))}</div>
      <div class="ess-q-opts">${opts.map((o) =>
        `<button class="ess-opt" data-w="${esc(o.w)}" onclick="ESS.pick(this,'${esc(o.w)}','${esc(q.w)}')">${esc(o.w)}</button>`).join("")}</div>
      <div class="ess-q-fb" id="essFb"></div>
      <div class="ess-actions"><button class="btn" onclick="ESS.go('${sec}')">${esc(T("essBack"))}</button></div>
    </div>`;
  }
  // 読み札:正解の語＋注音＋拼音＋意味＋音。詳解で使い回す。
  function cardLine(it) {
    return `<b style="font-family:var(--serif);font-size:21px">${esc(it.w)}</b>`
      + `（${zy(it.zy)}｜${esc(it.py)}）`
      + `<button class="tts-btn" style="width:26px;height:26px;vertical-align:middle;margin-left:5px" onclick="ESS.sayW('${esc(it.w)}')">`
      + `<svg viewBox="0 0 24 24" class="ic"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.3 8.7a4.5 4.5 0 0 1 0 6.6"/></svg></button>`
      + `<div style="font-size:14px;color:var(--tx2);margin-top:3px">${esc(mean(it))}</div>`;
  }
  function pick(el, got, want) {
    if (quiz.locked) return;
    quiz.locked = true;
    const cur = ESSENTIALS.find((s) => s.k === sec);
    const right = cur.items.find((x) => x.w === want);
    const ok = got === want;
    document.querySelectorAll(".ess-opt").forEach((b) => {
      b.disabled = true;
      if (b.dataset.w === want) b.classList.add("ok");
    });
    if (!ok) el.classList.add("ng"); else quiz.ok++;
    if (typeof speakZh === "function") speakZh(want);
    // 間違えた選択肢が「実際なんの語なのか」まで出す。正解だけ見せても次に活きない。
    let picked = "";
    if (!ok) {
      const p = cur.items.find((x) => x.w === got);
      if (p) picked = `<div style="font-size:13px;color:var(--tx2);margin-top:9px;padding-top:9px;border-top:1px solid var(--line)">`
        + `${esc(T("qzYourPick"))}<b>${esc(p.w)}</b>（${zy(p.zy)}｜${esc(p.py)}）`
        + `<span style="color:var(--tx3)">　${esc(mean(p))}</span></div>`;
    }
    const last = quiz.i >= quiz.pool.length - 1;
    const fb = document.getElementById("essFb");
    if (fb && right) fb.innerHTML = `<div class="qz-fb ${ok ? "ok" : "ng"}">
      <div style="font-weight:700;font-size:15px">${ok ? "⭕ " + esc(T("qzRight")) : "❌ " + esc(T("qzWrong"))}</div>
      <div style="margin-top:8px">${esc(T("qzCorrectIs"))}${cardLine(right)}</div>
      ${picked}
      <div style="margin-top:16px"><button class="btn primary" onclick="ESS.next()">${esc(T(last ? "essSeeResult" : "quizNext"))} ›</button></div>
    </div>`;
    if (fb) fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  // 自動で進めない。自分で押して進む(どこで間違えたか読む時間が要る)。
  function next() {
    quiz.i++; quiz.locked = false;
    if (quiz.i >= quiz.pool.length) done(); else drawQuiz();
  }
  function sayW(w) { if (typeof speakZh === "function") speakZh(w); }
  function done() {
    body().innerHTML = `<div class="ess-quiz">
      <div class="ess-done">${quiz.ok} / ${quiz.pool.length}</div>
      <div class="ess-actions">
        <button class="btn primary" onclick="ESS.startQuiz()">${esc(T("essAgain"))}</button>
        <button class="btn" onclick="ESS.go('${sec}')">${esc(T("essBack"))}</button></div>
    </div>`;
  }
  return { render, go, say, sayW, startQuiz, pick, next };
})();
if (typeof window !== "undefined") window.ESS = ESS;   // const は window に乗らない
