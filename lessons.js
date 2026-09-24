/* StayTW — 闖關（一課 8 語）
 *
 * これまでの闖關は「単語カードを使う/クイズを使う」という“道具”の 5 関で、
 * 進度が 0/441 と出ていた。10 語やっても 2% しか動かないので終わりが見えない。
 * ここでは関を“中身”にする:1 課 = 6〜8 語、カードで見る → 型を変えた 4 択 →
 * その場で「クリア」。3 分で 1 つ終わる。
 *
 * ・課の定義は data/lessons-<lv>.json（scripts/build-lessons.mjs が単語ファイルの
 *   「// ── テーマ ──」コメントから作る）。語そのものは既存の VOCAB を引く。
 * ・出題は 5 種類まぜる（意味/逆引き/注音/穴うめ/聞き取り）。間違えた語は
 *   後ろに積んで必ずもう一度出す＝落第させない。
 * ・クリアした語は SRS に入れる（正解=known / 間違い=unknown）。
 *   ここを繋がないと「復習に回りました」が嘘になる。
 * ・無料は各レベルの第 1 単元だけ。棚は見せて、続きは Premium。
 */
const LS = (() => {
  const KEY = "stw_lessons";
  const PER_UNIT_FREE = 1;                    // 無料で開く単元数（レベルごと）
  const esc = (x) => String(x == null ? "" : x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const T = (k, fb) => { try { const v = twT(k); return v && v !== k ? v : (fb || k); } catch (e) { return fb || k; } };
  const LANG = () => { try { return twGetLang(); } catch (e) { return "ja"; } };
  const MK = () => { try { return twMKey(); } catch (e) { return "j"; } };
  const nm = (o) => (o && (o[LANG()] || o.ja || o.en)) || "";
  const $ = (id) => document.getElementById(id);

  const DATA = {};                            // lv → json
  let loading = "";

  function state() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function setDone(lv, key) {
    const s = state(); (s[lv] = s[lv] || {})[key] = 1;
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
    try { if (typeof window.onSRSChange === "function") window.onSRSChange(); } catch (e) {}
  }
  const doneOf = (lv) => (state()[lv] || {});

  function words(lv) {
    const m = {};
    (typeof getVocabData === "function" ? getVocabData(lv) : []).forEach((v) => { m[v.w] = v; });
    return m;
  }
  function premium() { try { return Paywall.isPremium(); } catch (e) { return false; } }

  /** 全課を並べる。unit は 1 始まり。 */
  function flat(lv) {
    const d = DATA[lv]; if (!d) return [];
    const W = words(lv), out = [];
    d.units.forEach((u) => u.lessons.forEach((l, li) => {
      out.push({
        lv, key: "u" + u.no + ":" + li, unit: u, li,
        title: nm(l.name) + (l.idx ? " " + l.idx : ""),
        ws: l.words.filter((w) => W[w]),
        locked: !premium() && u.no > PER_UNIT_FREE,
      });
    }));
    return out.filter((x) => x.ws.length);
  }
  function next(lv) { const s = doneOf(lv); return flat(lv).find((x) => !s[x.key]) || null; }

  /** ハブに差し込む一覧。読み込み前は骨だけ返し、来たら描き直す。 */
  function section(lv) {
    if (!DATA[lv]) { ensure(lv); return `<div class="ls-skel">${esc(T("lsLoading", "…"))}</div>`; }
    const s = doneOf(lv), all = flat(lv), nx = next(lv);
    const doneN = all.filter((x) => s[x.key]).length;
    const units = DATA[lv].units.map((u) => {
      const mine = all.filter((x) => x.unit.no === u.no);
      if (!mine.length) return "";
      const dn = mine.filter((x) => s[x.key]).length;
      const rows = mine.map((x) => {
        const done = !!s[x.key], now = nx && nx.key === x.key;
        const click = x.locked ? `LS.locked()` : `LS.start('${lv}','${x.key}')`;
        return `<button class="ls-row${done ? " done" : ""}${now ? " now" : ""}${x.locked ? " locked" : ""}" onclick="${click}">
          <span class="ls-dot">${x.locked ? icon("lock", { size: 15 }) : (done ? "✓" : (now ? "▶" : x.li + 1))}</span>
          <span class="ls-mid">
            <span class="ls-nm">${esc(x.title)}</span>
            <span class="ls-pv">${esc(x.ws.slice(0, 4).join("・"))}…</span>
            <span class="ls-bar"><i style="width:${done ? 100 : 0}%"></i></span>
          </span>
          <span class="ls-n">${done ? x.ws.length : 0}/${x.ws.length}</span>
        </button>`;
      }).join("");
      return `<div class="ls-uh"><b>${esc(T("lsUnit", "第 {n} 単元").replace("{n}", u.no))} · ${esc(nm(u.lead))}</b><i></i><span>${dn}/${mine.length}</span></div>${rows}`;
    }).join("");
    return `<div class="ls-head"><span>${esc(T("lsAllDoneN", "{a} / {b} 課").replace("{a}", doneN).replace("{b}", all.length))}</span></div>${units}`;
  }

  function ensure(lv) {
    if (DATA[lv] || loading === lv) return;
    loading = lv;
    fetch("data/lessons-" + lv + ".json?v=1").then((r) => r.json()).then((d) => {
      DATA[lv] = d; loading = "";
      try { PA.render(); } catch (e) {}
    }).catch(() => { loading = ""; });
  }
  function locked() { try { Paywall.show("lessons"); } catch (e) {} }

  // ── 1 課 ───────────────────────────────────────────────
  let L = null, queue = [], idx = 0, score = 0, asked = 0, wrong = null, W = null;
  const shuf = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const mean = (v) => (v && v.m && (v.m[MK()] || v.m.e || v.m.j)) || "";

  function distract(fn, not, n) {
    const out = [], keys = shuf(Object.keys(W));
    for (const k of keys) {
      if (k === not) continue;
      const v = fn(W[k]);
      if (!v || out.indexOf(v) >= 0) continue;
      out.push(v); if (out.length >= n) break;
    }
    return out;
  }
  function mkQ(w, kind) {
    const v = W[w], ex = v && v.ex;
    if (kind === "cloze" && ex && ex.z && ex.z.indexOf(v.w) >= 0)
      return { kind, w, ans: v.w, opts: shuf([v.w].concat(distract((x) => x.w, w, 3))) };
    if (kind === "zhuyin" && v.zy)
      return { kind, w, ans: v.zy, opts: shuf([v.zy].concat(distract((x) => x.zy, w, 3))) };
    if (kind === "reverse" || kind === "listen")
      return { kind, w, ans: v.w, opts: shuf([v.w].concat(distract((x) => x.w, w, 3))) };
    return { kind: "meaning", w, ans: mean(v), opts: shuf([mean(v)].concat(distract((x) => mean(x), w, 3))) };
  }

  function start(lv, key) {
    ensure(lv);
    const item = flat(lv).find((x) => x.key === key);
    if (!item) return;
    if (item.locked) { locked(); return; }
    L = item; W = words(lv);
    score = 0; asked = 0; idx = 0; wrong = {};
    const kinds = shuf(["meaning", "reverse", "zhuyin", "cloze", "listen", "meaning", "reverse", "cloze"]);
    queue = L.ws.map((w) => ({ kind: "learn", w }));
    shuf(L.ws).forEach((w, i) => queue.push(mkQ(w, kinds[i % kinds.length])));
    document.body.classList.add("ls-open");
    $("lsPlay").classList.add("on");
    draw();
  }
  function quit() {
    document.body.classList.remove("ls-open");
    $("lsPlay").classList.remove("on");
    try { PA.render(); } catch (e) {}
  }
  function say(w) { try { speakZh(w); } catch (e) {} }

  function draw() {
    if (idx >= queue.length) { finish(); return; }
    const q = queue[idx], v = W[q.w], ex = v && v.ex;
    const pct = Math.min(100, Math.round(idx / queue.length * 100));
    $("lsBar").style.width = pct + "%";
    $("lsCount").textContent = (idx + 1) + " / " + queue.length;
    const again = q.again ? `<div class="ls-again">${esc(T("lsAgain2", "もう一度"))}</div>` : "";
    if (q.kind === "learn") {
      $("lsStage").innerHTML = `
        <div class="ls-card">
          <div class="ls-w" onclick="LS.say('${esc(v.w)}')">${esc(v.w)}</div>
          <div class="ls-zy">${typeof twZy === "function" ? twZy(v.zy || "") : esc(v.zy || "")}</div>
          <div class="ls-py">${esc(v.py || "")}</div>
          <div class="ls-m">${esc(mean(v))}</div>
          ${ex && ex.z ? `<div class="ls-ex">${esc(ex.z)}<br><span>${esc(ex[MK()] || ex.e || ex.j || "")}</span></div>` : ""}
        </div>
        <button class="btn primary ls-cta" onclick="LS.next()">${esc(idx + 1 < L.ws.length ? T("lsNext", "次へ") : T("lsToQuiz", "確認する"))}</button>`;
      say(v.w);
      return;
    }
    let head;
    if (q.kind === "meaning") head = `<div class="ls-q">${esc(T("lsAskMean", "意味は?"))}</div><div class="ls-big" onclick="LS.say('${esc(v.w)}')">${esc(v.w)}</div><div class="ls-zy">${typeof twZy === "function" ? twZy(v.zy || "") : ""}</div>`;
    else if (q.kind === "reverse") head = `<div class="ls-q">${esc(T("lsAskWord", "どの語?"))}</div><div class="ls-mid2">${esc(mean(v))}</div>`;
    else if (q.kind === "zhuyin") head = `<div class="ls-q">${esc(T("lsAskZy", "読み方は?"))}</div><div class="ls-big">${esc(v.w)}</div>`;
    else if (q.kind === "listen") head = `<div class="ls-q">${esc(T("lsAskListen", "聞こえたのは?"))}</div><button class="ls-spk" onclick="LS.say('${esc(v.w)}')">${icon("volume", { size: 30 })}</button>`;
    else head = `<div class="ls-q">${esc(T("lsAskBlank", "空いているのは?"))}</div><div class="ls-cloze">${esc(ex.z).split(esc(v.w)).join('<b>　</b>')}</div>`;
    $("lsStage").innerHTML = again + head +
      `<div class="ls-opts">${q.opts.map((o, i) => `<button class="ls-opt" onclick="LS.pick(${i})">${q.kind === "zhuyin" && typeof twZy === "function" ? twZy(o) : esc(o)}</button>`).join("")}</div><div id="lsAfter"></div>`;
    if (q.kind === "listen") say(v.w);
  }
  function nextStep() { idx++; draw(); }

  function pick(i) {
    const q = queue[idx], v = W[q.w], ok = q.opts[i] === q.ans;
    asked++; if (ok) score++; else wrong[q.w] = 1;
    document.querySelectorAll("#lsStage .ls-opt").forEach((b, n) => {
      b.disabled = true;
      if (q.opts[n] === q.ans) b.classList.add("ok"); else if (n === i) b.classList.add("ng");
    });
    if (!ok) queue.push(Object.assign(mkQ(q.w, "meaning"), { again: true }));
    const ex = v && v.ex;
    $("lsAfter").innerHTML = `
      <div class="ls-ans">
        <div class="ls-ans-w">${esc(v.w)} <span>${typeof twZy === "function" ? twZy(v.zy || "") : ""}</span></div>
        <div class="ls-ans-m">${esc(mean(v))}</div>
        ${ex && ex.z ? `<div class="ls-ans-ex">${esc(ex.z)}</div>` : ""}
      </div>
      <button class="btn primary ls-cta" onclick="LS.next()">${esc(idx + 1 < queue.length ? T("lsNext", "次へ") : T("lsResult", "結果"))}</button>`;
  }

  function finish() {
    setDone(L.lv, L.key);
    // 覚えた語を復習に載せる。ここを繋がないと「復習に回りました」がただの文字になる。
    try {
      L.ws.forEach((w) => SRS.recordGrade(L.lv, w, wrong[w] ? "unknown" : "known"));
    } catch (e) {}
    try { recordStudy(); } catch (e) {}
    $("lsBar").style.width = "100%"; $("lsCount").textContent = "";
    const s = doneOf(L.lv), mine = flat(L.lv).filter((x) => x.unit.no === L.unit.no);
    const dn = mine.filter((x) => s[x.key]).length;
    const before = Math.round((dn - 1) / mine.length * 100), after = Math.round(dn / mine.length * 100);
    const nx = next(L.lv);
    const pct = asked ? Math.round(score / asked * 100) : 100;
    const R = 60, C = 2 * Math.PI * R;
    const nWrong = Object.keys(wrong).length;
    $("lsStage").innerHTML = `
      <div class="ls-fin">
        <div class="ls-ring">
          <svg width="132" height="132"><circle cx="66" cy="66" r="${R}" fill="none" stroke="var(--line)" stroke-width="9"/>
            <circle id="lsRing" cx="66" cy="66" r="${R}" fill="none" stroke="var(--ac)" stroke-width="9" stroke-linecap="round"
              stroke-dasharray="${C}" stroke-dashoffset="${C}" style="transition:stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)"/></svg>
          <div class="ls-ringv" id="lsRingV">0%</div>
        </div>
        <div class="ls-fin-t">${esc(L.title)} ${esc(T("lsCleared", "クリア"))}</div>
        <div class="ls-fin-s">${esc(T("lsFinSub", "{n} 語 ／ まちがえた {m} 語は復習に回りました").replace("{n}", L.ws.length).replace("{m}", nWrong))}</div>
        <div class="ls-fin-row" id="lsR1">
          <span class="k">${esc(T("lsUnit", "第 {n} 単元").replace("{n}", L.unit.no))}<span class="ls-ubar"><i id="lsUb"></i></span></span>
          <span class="v">${dn} / ${mine.length}</span>
        </div>
        ${nx && !nx.locked ? `<div class="ls-unlock" id="lsR2"><b>NEXT</b><span>${esc(nx.title)}　<em>${esc(nx.ws.slice(0, 3).join("・"))}…</em></span></div>` : ""}
        <button class="btn primary ls-cta" onclick="${nx && !nx.locked ? "LS.again()" : "LS.quit()"}">${esc(nx && !nx.locked ? T("lsNextLesson", "次の課へ") : T("lsBack", "一覧へ"))}</button>
        ${nx && nx.locked ? `<div class="ls-lockmsg">${icon("lock", { size: 14 })} ${esc(T("lsLockedMore", "続きは Premium で開きます"))}</div>` : ""}
        <p class="ls-back"><a href="javascript:void(0)" onclick="LS.quit()">${esc(T("lsBack", "一覧へ"))}</a></p>
      </div>`;
    const ring = $("lsRing"), rv = $("lsRingV");
    setTimeout(() => { ring.style.strokeDashoffset = String(C * (1 - pct / 100)); }, 80);
    let n = 0; const t = setInterval(() => { n += Math.max(1, Math.ceil(pct / 28)); if (n >= pct) { n = pct; clearInterval(t); } rv.textContent = n + "%"; }, 32);
    setTimeout(() => { $("lsR1").classList.add("in"); const ub = $("lsUb"); ub.style.width = before + "%"; setTimeout(() => { ub.style.width = after + "%"; }, 260); }, 700);
    setTimeout(() => { const r2 = $("lsR2"); if (r2) r2.classList.add("in"); }, 1250);
  }
  function again() { const nx = next(L.lv); if (nx && !nx.locked) start(nx.lv, nx.key); else quit(); }

  return { section, ensure, start, quit, next: nextStep, pick, say, again, locked, flat, nextOf: next };
})();
if (typeof window !== "undefined") window.LS = LS;   // const は window に乗らない
