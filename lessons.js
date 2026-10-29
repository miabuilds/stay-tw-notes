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
  // 無料の形: 「第 1 単元だけ」から「1 日 2 課」へ(2026-09-24)。
  //   第 1 単元制は 20 分で壁に当たって、それきり戻ってこない。付費牆を見るのも 1 回だけ。
  //   1 日 2 課なら毎日戻ってくる理由があり、毎日いちど壁に触る。
  //   数えるのは「その日に新しく開いた課」。途中の課の続き(runOf)は数えない。
  const DAILY_FREE = 2;
  const QKEY = "stw_ls_quota";
  const today = () => { const d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };
  function quotaUsed() { try { const q = JSON.parse(localStorage.getItem(QKEY) || "{}"); return q.d === today() ? (q.n | 0) : 0; } catch (e) { return 0; } }
  function quotaLeft() { return premium() ? Infinity : Math.max(0, DAILY_FREE - quotaUsed()); }
  function quotaBump() { try { localStorage.setItem(QKEY, JSON.stringify({ d: today(), n: quotaUsed() + 1 })); } catch (e) {} }
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
  // 程度測驗(placement.js)「從 X 級開始」:X 級以前的課全部當成已學過(值 2 = 沒真的做過)。
  // 不真的寫幾百個 key,只記 stw_placed;再測到較低的級就自動收回
  const placedNum = () => { try { return +String(localStorage.getItem("stw_placed") || "").slice(1) || 0; } catch (e) { return 0; } };
  // 自己選起點(2026-10-24 Mia「讓使用者自由選擇想從哪關開始」):stw_ls_start = { lv: key }。
  // 起點前面的課也當成已學過(值 2)。改成更前面的起點,後面的標記就自動消失
  const SKEY = "stw_ls_start";
  const startOf = (lv) => { try { return (JSON.parse(localStorage.getItem(SKEY) || "{}") || {})[lv] || ""; } catch (e) { return ""; } };
  let pickMode = false;
  function doneOf(lv) {
    const s = state()[lv] || {};
    if (!DATA[lv]) return s;
    const below = placedNum() > (+String(lv).slice(1) || 0), sk = startOf(lv);
    if (!below && !sk) return s;
    const o = Object.assign({}, s);
    const all = flat(lv), si = sk ? all.findIndex((x) => x.key === sk) : -1;
    all.forEach((x, i) => { if (!o[x.key] && (below || (si >= 0 && i < si))) o[x.key] = 2; });
    return o;
  }
  function choose() { pickMode = true; try { PA.render(); } catch (e) {} try { const el = document.querySelector(".ls-pick"); el && el.scrollIntoView({ block: "center" }); } catch (e) {} }
  function pickCancel() { pickMode = false; try { PA.render(); } catch (e) {} }
  function pickStart(lv, key) {
    let o = {}; try { o = JSON.parse(localStorage.getItem(SKEY) || "{}") || {}; } catch (e) {}
    o[lv] = key;
    try { localStorage.setItem(SKEY, JSON.stringify(o)); } catch (e) {}
    try { if (typeof window.onSRSChange === "function") window.onSRSChange(); } catch (e) {}
    pickMode = false; open = {};
    try { PA.render(); } catch (e) {}
    try { showToast(T("lsPickToast", "起點設好了,從這裡開始")); } catch (e) {}
  }

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
    const G = gmap(lv);
    d.units.forEach((u) => u.lessons.forEach((l, li) => {
      const isG = l.kind === "grammar";
      out.push({
        lv, key: "u" + u.no + ":" + li, unit: u, li, kind: isG ? "grammar" : "vocab",
        short: nm(l.name) + (l.idx ? " " + l.idx : ""),
        title: nm(l.name) + (l.idx ? " " + l.idx : "") + (isG && l.cats && l.cats.length ? " · " + l.cats.map(gcat).join("・") : ""),
        ws: isG ? [] : l.words.filter((w) => W[w]),
        gs: isG ? (l.gids || []).filter((id) => G[id]) : [],
        locked: false,                       // 位置では鍵をかけない。開けるかは start() が今日の残りで決める
      });
    }));
    return out.filter((x) => x.ws.length || x.gs.length);
  }
  function next(lv) { const s = doneOf(lv); return flat(lv).find((x) => !s[x.key]) || null; }

  // 文法点を id で引く。index.html の GRAMMAR_BY_LEVEL をそのまま使う
  const GMAP = {};
  function gmap(lv) {
    if (GMAP[lv]) return GMAP[lv];
    const m = Object.create(null);
    try { (getGrammarData(lv) || []).forEach((g) => { if (g && g.id) m[g.id] = g; }); } catch (e) {}
    return (GMAP[lv] = m);
  }
  const stripTags = (x) => String(x == null ? "" : x).replace(/<[^>]*>/g, "");
  // 官方の語法點名の末尾の数字(和1・V了1)は同名を区別する管理番号。画面では落とす。
  // データ側はそのまま(SRS のキー・穴うめの答えは t を使っていない)
  const dispT = (t) => String(t == null ? "" : t).replace(/\d$/, "");
  const gcat = (c) => { try { return typeof twGCat === "function" ? twGCat(c) : c; } catch (e) { return c; } };
  const emOf = (z) => { const m = /<em>([\s\S]*?)<\/em>/.exec(String(z || "")); return m ? m[1] : ""; };
  const gTxt = (o) => (o && (o[MK()] || o.e || o.j)) || "";

  /** ハブに差し込む一覧。読み込み前は骨だけ返し、来たら描き直す。 */
  function section(lv) {
    if (!DATA[lv]) { ensure(lv); return `<div class="ls-skel">${esc(T("lsLoading", "…"))}</div>`; }
    const s = doneOf(lv), all = flat(lv), nx = next(lv);
    const doneN = all.filter((x) => s[x.key]).length;
    // 単元の見出しが 20 本近く並ぶと長くて散らかる(ユーザー指摘)。今の単元から 4 本だけ見せて、残りは「すべて表示」で
    const curNo = nx ? nx.unit.no : 1;
    const showAll = pickMode || !!open[lv + ":all"];
    let hiddenN = 0;
    const units = DATA[lv].units.map((u) => {
      const mine = all.filter((x) => x.unit.no === u.no);
      if (!mine.length) return "";
      if (!showAll && !(u.no >= curNo && u.no < curNo + 4) && open[lv + ":" + u.no] !== true) { hiddenN++; return ""; }
      const dn = mine.filter((x) => s[x.key]).length;
      // 単元は畳んでおく。全部開くと L1 だけで 400 行になって、どこが今なのか分からない。
      // 開くのは「今やる課のある単元」だけ。あとは押した単元を覚えておく。
      const here = !!(nx && nx.unit.no === u.no);
      const op = (open[lv + ":" + u.no] != null) ? open[lv + ":" + u.no] : here;
      // 闖關マップ(2026-10「もっと闖關らしく」):丸い関卡を左右に蛇行させて並べる。
      // 済=✓、今=大きく光る+熊+「ここから」、途中=進捗リング、今日の無料を使い切った=鍵。文法の課は形を変える
      const ZIG = [0, 66, 104, 66, 0, -66, -104, -66];
      // 道ばたの熊は 1 単元 1 匹だけ。今の課(熊+吹き出し)から 2 課以上離す。面板の他の場所(頭の熊・底の手を振る熊)と同じ絵は使わない
      const STK = ["09_reading", "08_listening", "07_speaking", "10_quiz", "11_goal_travel", "06_ai_chat", "13_goal_tocfl", "12_goal_living"];
      const hue = [8, 200, 145, 32, 265, 340][(u.no - 1) % 6];
      // 吹き出し+熊は 1 単元に 1 つだけ(途中の課があればそっち、無ければ次の課)。2 つ出ると重なって字を隠す
      const tipKey = (mine.find((x) => !s[x.key] && runOf(lv, x.key)) || mine.find((x) => nx && nx.key === x.key) || {}).key;
      const tipIdx = mine.findIndex((x) => x.key === tipKey);
      const stkAt = (() => { const c = [2, 3, 1, 4, 5].filter((i) => i < mine.length && ZIG[i % ZIG.length] !== 0 && (tipIdx < 0 || Math.abs(i - tipIdx) >= 2)); return c.length ? c[0] : -1; })();
      const rows = !op ? "" : `<div class="lm-map" style="--h:${hue}">${mine.map((x, k) => {
        const done = !!s[x.key], now = nx && nx.key === x.key;
        const run = done ? null : runOf(lv, x.key);
        const pct = done ? 100 : (run ? Math.round(run.i / run.n * 100) : 0);
        const lk = !pickMode && !done && !run && !now && quotaLeft() <= 0;
        const click = pickMode ? `LS.pickStart('${lv}','${x.key}')` : (!done && !run && quotaLeft() <= 0) ? `LS.locked()` : `LS.start('${lv}','${x.key}')`;
        const g = x.kind === "grammar";
        const st = done ? "done" : (now || run) ? "now" : lk ? "locked" : "todo";
        const face = lk ? icon("lock", { size: 22 }) : done ? "✓" : g ? "文" : String(x.li + 1);
        const ring = run ? `style="--p:${pct}"` : "";
        const tip = (x.key === tipKey) ? `<span class="lm-tip">${esc(run ? T("lsResume", "続きから · {i}/{n} 問").replace("{i}", run.i).replace("{n}", run.n) : T("lsStartHere", "ここから"))}</span><img class="lm-bear" src="images/bear.svg" alt="">` : "";
        return `<div class="lm-step${x.key === tipKey ? " cur" : ""}" style="--x:${ZIG[k % ZIG.length]}px">
          <button class="lm-node ${st}${g ? " g" : ""}${run ? " run" : ""}" ${ring} onclick="${click}" aria-label="${esc(x.title)}"><span>${face}</span></button>${tip}
          <div class="lm-lbl">${esc(x.title)}</div>
          ${(k === stkAt) ? `<img class="lm-stk ${ZIG[k % ZIG.length] > 0 ? "l" : "r"}" src="images/il/${STK[(u.no - 1) % STK.length]}.webp" alt="" loading="lazy">` : ""}
        </div>`;
      }).join("")}${dn === mine.length ? `<div class="lm-step" style="--x:0px"><div class="lm-goal on">${icon("check", { size: 20 })}</div><div class="lm-lbl">${esc(T("lsUnitClear", "単元クリア！"))}</div></div>` : `<div class="lm-step" style="--x:0px"><div class="lm-goal">★</div></div>`}</div>`;
      const ulocked = false;                                 // 単元単位の鍵は無くなった(1 日 2 課制)
      const lead = nm(u.lead) + (u.leadCats && u.leadCats.length ? " · " + u.leadCats.map(gcat).join("・") : "");
      return `<button class="lm-uh${op ? " op" : ""}${here ? " here" : ""}${dn === mine.length ? " clear" : ""}" style="--h:${hue}" onclick="LS.tog('${lv}',${u.no})" aria-expanded="${op}">
          <span class="lm-uno">${esc(T("lsUnit", "第 {n} 単元").replace("{n}", u.no))}</span>
          <b>${esc(lead)}</b>
          <span class="lm-ubar"><i style="width:${Math.round(dn / mine.length * 100)}%"></i></span>
          <span class="lm-uc">${dn}/${mine.length} <span class="lm-chev">${op ? "\u25B4" : "\u25BE"}</span></span>
        </button>${rows}`;
    }).join("");
    const pc = all.length ? Math.round(doneN / all.length * 100) : 0;
    const gN = all.filter((x) => x.kind === "grammar").length;
    const freeLine = !premium() ? `<div class="ls-free${quotaLeft() <= 0 ? " out" : ""}">${esc(T("lsFreeToday", "今日の無料 {u} / {n} 課 · 全 {t} 課（文法 {g} 課）は Premium で")
        .replace("{u}", Math.min(DAILY_FREE, quotaUsed())).replace("{n}", DAILY_FREE).replace("{t}", all.length).replace("{g}", gN))}
        <a href="javascript:void(0)" onclick="LS.locked()">${esc(T("lsSeePremium", "Premium を見る"))}</a></div>` : "";
    return `<div class="ls-head">
        <span>${esc(T("lsAllDoneN", "{a} / {b} 課").replace("{a}", doneN).replace("{b}", all.length))}</span>
        <b>${pc}%</b>
      </div>
      <div class="ls-headbar"><i style="width:${pc}%"></i></div>${pickMode ? `<div class="ls-pick"><span>${esc(T("lsPickBanner", "點一課當起點,它前面的課會標成「已學過」"))}</span><button onclick="LS.pickCancel()">${esc(T("lsPickCancel", "取消"))}</button></div>` : (typeof Placement !== "undefined") ? Placement.entry(lv, doneN) : ""}${freeLine}${units}${(hiddenN || showAll) ? `<button class="ls-more" onclick="LS.togAll('${lv}')">${esc(showAll ? T("lsFewerUnits", "単元をたたむ") : T("lsAllUnits", "すべての単元を表示（全 {n}）").replace("{n}", DATA[lv].units.length))}<span class="ls-more-c">${showAll ? "\u25B4" : "\u25BE"}</span></button>` : ""}`;
  }

  // どの単元を開いているか。畳んだ状態は端末に覚えさせる(学習の記録ではないので軽く扱う)
  const OKEY = "stw_ls_open";
  // 2026-10:端末に覚えると、前に開いた単元が全部開いたままで長くなる(ユーザー指摘)。開閉はこの画面の間だけ。
  // 開くたびに「今の単元だけ開いている」状態から始まる。古い保存は消す
  let open = {};
  try { localStorage.removeItem(OKEY); } catch (e) {}
  function tog(lv, no) {
    const k = lv + ":" + no;
    const nx = next(lv);
    const here = !!(nx && nx.unit.no === no);
    open[k] = (open[k] != null) ? !open[k] : !here;
    try { PA.render(); } catch (e) {}
  }

  function togAll(lv) {
    open[lv + ":all"] = !open[lv + ":all"];
    try { PA.render(); } catch (e) {}
  }

  function ensure(lv) {
    if (DATA[lv] || loading === lv) return;
    loading = lv;
    fetch("data/lessons-" + lv + ".json?v=7").then((r) => r.json()).then((d) => {
      DATA[lv] = d; loading = "";
      try { PA.render(); } catch (e) {}
    }).catch(() => { loading = ""; });
  }
  function locked() { try { Paywall.show("lessons"); } catch (e) {} }
  const quota = () => ({ used: quotaUsed(), free: DAILY_FREE, left: quotaLeft() });
  // 付費牆に「次に何が待っているか」を出すため。読み込み前なら null
  function peek(lv) {
    if (!DATA[lv]) return null;
    const s = doneOf(lv), all = flat(lv), nx = next(lv);
    const rest = all.filter((x) => !s[x.key]);
    return { next: nx ? { title: nx.title, ws: nx.ws.slice(0, 3), gs: nx.gs.map((id) => gmap(lv)[id] && dispT(gmap(lv)[id].t)).filter(Boolean).slice(0, 3) } : null,
             rest: rest.length, restG: rest.filter((x) => x.kind === "grammar").length, done: all.length - rest.length };
  }

  // ── 1 課 ───────────────────────────────────────────────
  let L = null, queue = [], idx = 0, score = 0, asked = 0, wrong = null, skipped = null, W = null;

  // 途中でやめても、次に開いた時は続きから。
  // 出題は毎回シャッフルするので「何問目か」だけ持っていても復元できない。
  // 問題の並びごと残す(1 課 16 問、選択肢込みでも数 KB)。
  // 1 つの課だけ覚えるやり方だと、別の課を開いた時に前の課の途中が消える。
  // 課ごとに持ち、古いものから落とす(6 課ぶん)。
  const RKEY = "stw_lesson_run", RMAX = 6;
  const rid = (lv, key) => lv + "|" + key;
  function allRuns() { try { const o = JSON.parse(localStorage.getItem(RKEY) || "{}"); return (o && typeof o === "object" && !o.lv) ? o : {}; } catch (e) { return {}; } }
  function putRuns(o) { try { localStorage.setItem(RKEY, JSON.stringify(o)); } catch (e) {} }
  function saveRun() {
    if (!L || L.kind === "placement") return;                  // 程度測驗不存「途中」
    const o = allRuns(), k = rid(L.lv, L.key);
    if (idx <= 0) { delete o[k]; putRuns(o); return; }        // 1 問目は「途中」ではない
    o[k] = { idx, score, asked, wrong, skipped, queue, t: Date.now() };
    const ks = Object.keys(o).sort((a, b) => (o[b].t || 0) - (o[a].t || 0));
    ks.slice(RMAX).forEach((x) => delete o[x]);
    putRuns(o);
  }
  // 今いる課ぶんだけ消す。他の課の途中は残す
  function clearRun(lv, key) {
    const o = allRuns();
    delete o[rid(lv || (L && L.lv), key || (L && L.key))];
    putRuns(o);
  }
  function loadRun(lv, key) {
    const r = allRuns()[rid(lv, key)];
    if (!r || !Array.isArray(r.queue) || !r.queue.length) return null;
    if (r.idx >= r.queue.length || r.idx <= 0) return null;
    if (Date.now() - (r.t || 0) > 14 * 86400 * 1000) return null;   // 2 週間放置なら最初から
    return r;
  }
  // 一覧の行に「この課をどこまでやったか」を出すため
  function runOf(lv, key) { const r = loadRun(lv, key); return r ? { i: r.idx, n: r.queue.length } : null; }
  const shuf = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const mean = (v) => (v && v.m && (v.m[MK()] || v.m.e || v.m.j)) || "";
  const meanSegs = (s) => String(s || "").toLowerCase().replace(/[（(][^）)]*[）)]/g, "")
    .split(/[、，,;；\/・。]/).map((x) => x.trim()).filter(Boolean);

  // 文法 1 点ぶんの問題。錯誤選択肢は同じ級の他の文法点から取る(級を跨ぐと不自然に易しくなる)
  function mkG(id, kind) {
    const G = gmap(L.lv), g = G[id];
    if (!g) return null;
    const others = shuf(Object.keys(G).filter((k) => k !== id).map((k) => G[k]))
      .sort((a, b) => (b.cat === g.cat) - (a.cat === g.cat));     // 同じ分類を先に。シャッフル後の安定ソートなので中は無作為
    if (kind === "gcloze") {
      const eg = (g.eg || []).find((e) => emOf(e.z));
      if (!eg) return mkG(id, "gmean");
      const ans = emOf(eg.z);
      const opts = [ans];
      for (const o of others) {
        const t = (o.eg || []).map((e) => emOf(e.z)).find((x) => x && opts.indexOf(x) < 0);
        if (t) opts.push(t);
        if (opts.length >= 4) break;
      }
      if (opts.length < 3) return mkG(id, "gmean");
      return { kind: "gcloze", g: id, eg, ans, opts: shuf(opts) };
    }
    const ans = gTxt(g.g) || g.t;
    const opts = [ans];
    for (const o of others) { const t = gTxt(o.g) || o.t; if (t && opts.indexOf(t) < 0) opts.push(t); if (opts.length >= 4) break; }
    if (opts.length < 3) return null;
    return { kind: "gmean", g: id, ans, opts: shuf(opts) };
  }

  // 錯誤選択肢は無作為だと「どれも違いすぎて」考えずに当たる。
  // 中国語で本当に混ざるのは 他/她・買/賣・在/再 のような字が重なる語と、同音・同拍の語。
  // 近いものを優先して出す。近いものが無ければ無作為で埋める。
  const sylOf = (zy) => String(zy || "").split(" ").filter(Boolean).map((x) => x.replace(/[ˊˇˋ˙]/g, ""));

  // 字が重なるだけでは 在/再・的/得/地・二/兩 のような「重ならないのに必ず迷う組」を拾えない。
  // data/confuse.json に字形・同音・使い分けの組を持たせて、そこからも錯誤選択肢を作る。
  // 読めなくても near() はこれまで通り動く(表は加点材料でしかない)。
  let CONF = null;
  (function loadConfuse() {
    try {
      fetch("data/confuse.json").then((r) => r.json()).then((j) => {
        const ch = Object.create(null), wd = Object.create(null);
        ["shape", "sound", "use"].forEach((kind) => (j[kind] || []).forEach((g) => {
          g.forEach((a) => g.forEach((b) => {
            if (a === b) return;
            const m = a.length === 1 ? ch : wd;
            (m[a] = m[a] || []).push(b);
          }));
        }));
        CONF = { ch, wd };
      }).catch(() => {});
    } catch (e) {}
  })();

  function near(w) {
    const a = W[w]; if (!a) return [];
    const ac = new Set([...a.w]), az = new Set(sylOf(a.zy));
    // この語と取り違えやすい字・語
    const cc = new Set(), cw = new Set((CONF && CONF.wd[a.w]) || []);
    if (CONF) for (const ch of a.w) (CONF.ch[ch] || []).forEach((x) => cc.add(x));
    return Object.keys(W).filter((k) => k !== w).map((k) => {
      const b = W[k]; let sc = 0;
      if (cw.has(b.w)) sc += 6;                                 // 使い分けを間違える組(二/兩・會/能)
      for (const ch of b.w) if (cc.has(ch)) sc += 4;            // 字形・同音で書き分けを間違える字(在/再)
      for (const ch of b.w) if (ac.has(ch)) sc += 3;            // 字が重なる
      for (const z of sylOf(b.zy)) if (az.has(z)) sc += 2;      // 音が重なる
      if (b.c && b.c === a.c) sc += 1;                          // 同じ品詞
      if (b.w.length === a.w.length) sc += 1;
      return { k, sc };
    }).filter((x) => x.sc > 0).sort((x, y) => y.sc - x.sc).map((x) => x.k);
  }
  // bad(k): 正解と区別できない候補(同音語を聞き取り問題に、同義語を意味問題に)を外す。
  // 区別できない選択肢があると何度やっても正解できず、出し直しから抜けられない
  function distract(fn, not, n, bad) {
    const out = [], self = fn(W[not]);
    const push = (k) => {
      if (k === not || out.length >= n) return;
      const v = fn(W[k]);
      if (!v || v === self || out.indexOf(v) >= 0 || (bad && bad(k))) return;
      out.push(v);
    };
    // 上位の紛らわしい候補から少し散らして取る(毎回同じ 3 つだと覚えてしまう)
    shuf(near(not).slice(0, 12)).forEach(push);
    shuf(Object.keys(W)).forEach(push);
    return out;
  }
  // 何声かを当てる。日本語・韓国語話者がいちばん落とすのはここなのに、
  // 4 択の中に埋もれていると素通りできてしまう。単独で 1 問にする。
  const TONE = [
    { k: "1", mark: "ˉ", t: "lsTone1" }, { k: "2", mark: "ˊ", t: "lsTone2" },
    { k: "3", mark: "ˇ", t: "lsTone3" }, { k: "4", mark: "ˋ", t: "lsTone4" },
    { k: "0", mark: "˙", t: "lsTone0" },
  ];
  const toneOf = (syl) => {
    if (!syl) return null;
    if (syl.indexOf("˙") === 0 || /˙$/.test(syl)) return "0";
    if (syl.indexOf("ˊ") >= 0) return "2";
    if (syl.indexOf("ˇ") >= 0) return "3";
    if (syl.indexOf("ˋ") >= 0) return "4";
    return "1";
  };
  const toneLabel = (k) => { const t = TONE.find((x) => x.k === k); return t ? T(t.t, t.k + "声") : k; };

  // 例文を語に切る。全レベルの辞書(STW_DICT)で最長一致。辞書に無ければ 1 字。
  // これが無いと「並べかえ」が 1 字ずつのバラバラになって、文を組む練習にならない。
  function segment(z) {
    const D = (typeof STW_DICT !== "undefined") ? STW_DICT : null;
    const src = String(z || "").replace(/<[^>]*>/g, "");
    const out = [];
    for (let i = 0; i < src.length;) {
      const ch = src[i];
      if (/[，。、？！：；…—「」『』（）\s]/.test(ch)) { i++; continue; }   // 記号は落とす(手がかりになりすぎる)
      let hit = "";
      if (D) for (let n = Math.min(4, src.length - i); n >= 2; n--) {
        const t = src.substr(i, n);
        if (D[t]) { hit = t; break; }
      }
      out.push(hit || ch);
      i += (hit || ch).length;
    }
    return out;
  }

  // ── 口に出す問題 ──────────────────────────────────────
  // 見て選ぶだけだと、読めるのに一言も言えない人ができる。
  // 採点は既存の SPK.diff(拼音の LCS)を借りる。同じ音なら簡体字で返っても、
  // 同音異字を拾っても減点されない — その場で作り直すと基準が二つになる。
  const SRCls = () => (typeof window !== "undefined") && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const isNative = () => !!(typeof window !== "undefined" && window.STAYTW_NATIVE && window.STAYTW_NATIVE.isNativeApp);
  const canSpeak = () => !!(SRCls() || isNative());
  const nPost = (o) => { try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(o)); } catch (e) {} };
  let rec = null, recording = false, recTimer = null, recFinal = "";

  function micSt(txt, on) {
    const b = $("lsMic"), t = $("lsMicSt");
    if (b) b.classList.toggle("rec", !!on);
    if (t) t.textContent = txt;
  }
  function stopRec() {
    if (isNative()) { nPost({ type: "SPEECH_STOP" }); return; }
    try { rec && rec.stop(); } catch (e) {}
  }
  function startRec() {
    try { TTS.stop(); } catch (e) {}
    recFinal = "";
    clearTimeout(recTimer);
    if (isNative()) {
      recording = true; micSt(T("lsSpkListening", "聞いています…"), true);
      recTimer = setTimeout(() => nPost({ type: "SPEECH_STOP" }), 8000);
      window.stwSpeechResult = (tr, isFinal) => {
        if (isFinal) { if (tr) recFinal = tr; }
        else if (tr) micSt("… " + tr, true);
      };
      window.stwSpeechEnd = (err) => {
        recording = false; clearTimeout(recTimer);
        if (recFinal) { micSt(T("lsSpkTap", "押して言う"), false); speakDone(recFinal); return; }
        micSt(T(err === "not-allowed" ? "lsSpkNoMic" : "lsSpkNoHeard", "もう一度"), false);
      };
      nPost({ type: "SPEECH_START", lang: "zh-TW" });
      return;
    }
    const C = SRCls(); if (!C) { micSt(T("lsSpkNoMic", "使えません"), false); return; }
    rec = new C();
    rec.lang = "zh-TW"; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
    let fin = "", gotErr = "";
    rec.onstart = () => {
      recording = true; micSt(T("lsSpkListening", "聞いています…"), true);
      recTimer = setTimeout(() => { try { rec.stop(); } catch (e) {} }, 8000);
    };
    rec.onresult = (e) => {
      let interim = "";
      for (const r of e.results) (r.isFinal ? (fin += r[0].transcript) : (interim += r[0].transcript));
      if (interim) micSt("… " + interim, true);
    };
    rec.onerror = (ev) => { gotErr = ev.error || "error"; };
    rec.onend = () => {
      recording = false; clearTimeout(recTimer);
      if (fin) { micSt(T("lsSpkTap", "押して言う"), false); speakDone(fin); return; }
      micSt(T(gotErr === "not-allowed" || gotErr === "audio-capture" ? "lsSpkNoMic" : "lsSpkNoHeard", "もう一度"), false);
    };
    try { rec.start(); } catch (e) { recording = false; micSt(T("lsSpkNoMic", "使えません"), false); }
  }
  function mic() { if (recording) stopRec(); else startRec(); }

  function speakDone(heard) {
    const q = queue[idx]; if (!q || q.kind !== "speak") return;
    let r = null;
    try { r = SPK.diff(q.z, heard); } catch (e) {}
    const sc = r ? r.score : 0, ok = sc >= 60;
    if (!q.tried) { q.tried = 1; asked++; if (ok) score++; else wrong[q.w] = 1; }
    if (!ok) requeue(mkQ(q.w, "listen"));
    const marks = r ? r.chars.map((c) => `<span class="${c.hit ? "hit" : "miss"}">${esc(c.c)}</span>`).join("") : esc(q.z);
    $("lsAfter").innerHTML = `
      <div class="ls-spk-res ${ok ? "ok" : "ng"}">
        <div class="ls-spk-marks">${marks}</div>
        <div class="ls-spk-bar"><i style="width:${sc}%"></i></div>
        <div class="ls-spk-n">${esc(T("lsSpkScore", "言えた {n}%").replace("{n}", sc))}
          <span>（${esc(T("lsSpkHeard", "認識"))}: ${esc(heard)}）</span></div>
      </div>
      <button class="btn primary ls-cta" onclick="LS.next()">${esc(idx + 1 < queue.length ? T("lsNext", "次へ") : T("lsResult", "結果"))}</button>`;
    saveRun();
  }

  function mkQ(w, kind) {
    const v = W[w], ex = v && v.ex;
    // 並べかえ。選ぶだけの問題ばかりだと、読めるのに一言も作れない人ができる
    if (kind === "order" && ex && ex.z) {
      const parts = segment(ex.z);
      if (parts.length >= 3 && parts.length <= 7) {
        return { kind: "order", w, ans: parts.join("\u0001"), parts, opts: shuf(parts.slice()), built: [] };
      }
      return mkQ(w, "cloze");
    }
    if (kind === "tone" && v.zy) {
      const syls = String(v.zy).split(" ").filter(Boolean);
      const chars = [...v.w].filter((c) => /[\u3400-\u9fff]/.test(c));
      // 軽声は 1〜4 声の選択肢に無いので、軽声の字は出さない(正解が選べなくなる)
      const can = syls.length === chars.length ? syls.map((s, j) => j).filter((j) => toneOf(syls[j]) !== "0") : [];
      if (can.length) {
        const i = can[(Math.random() * can.length) | 0];
        const k = toneOf(syls[i]);
        if (k) return { kind: "tone", w, ci: i, ch: chars[i], ans: toneLabel(k),
                        opts: TONE.map((x) => toneLabel(x.k)) };
      }
      return mkQ(w, "zhuyin");
    }
    if (kind === "speak") {
      if (!canSpeak()) return mkQ(w, "listen");                 // 認識が無い端末では出さない
      const z = (ex && ex.z && stripTags(ex.z).length <= 14) ? stripTags(ex.z) : v.w;
      return { kind: "speak", w, z, py: (z === v.w ? (v.py || "") : (ex.py || "")) };
    }
    if (kind === "cloze" && ex && ex.z && ex.z.indexOf(v.w) >= 0)
      return { kind, w, ans: v.w, opts: shuf([v.w].concat(distract((x) => x.w, w, 3))) };
    if (kind === "zhuyin" && v.zy)
      return { kind, w, ans: v.zy, opts: shuf([v.zy].concat(distract((x) => x.zy, w, 3))) };
    if (kind === "reverse" || kind === "listen") {
      const homo = kind === "listen" && v.zy ? (k) => W[k].zy === v.zy : null;   // 音だけでは 期中/其中 を区別できない
      return { kind, w, ans: v.w, opts: shuf([v.w].concat(distract((x) => x.w, w, 3, homo))) };
    }
    const mine = meanSegs(mean(v));
    const syn = (k) => meanSegs(mean(W[k])).some((x) => mine.indexOf(x) >= 0);  // 「必ず」と「必ず、きっと」は両方正しい
    return { kind: "meaning", w, ans: mean(v), opts: shuf([mean(v)].concat(distract((x) => mean(x), w, 3, syn))) };
  }

  function start(lv, key) {
    ensure(lv);
    const item = flat(lv).find((x) => x.key === key);
    if (!item) return;
    L = item; W = words(lv);
    const run = loadRun(lv, key);
    if (!run && !doneOf(lv)[key]) {                          // 新しく開く課だけ数える。続き・やり直しは無料
      if (quotaLeft() <= 0) { L = null; locked(); return; }
      quotaBump();
    }
    if (run) {
      queue = run.queue; idx = run.idx; score = run.score || 0; asked = run.asked || 0; wrong = run.wrong || {}; skipped = run.skipped || {};
    } else if (L.kind === "grammar") {
      // 文法は「型を見る → 例文の穴うめ → 意味あて」。語と同じ 3 分の形に収める
      score = 0; asked = 0; idx = 0; wrong = {}; skipped = {};
      queue = L.gs.map((id) => ({ kind: "glearn", g: id }));
      shuf(L.gs).forEach((id) => { queue.push(mkG(id, "gcloze")); queue.push(mkG(id, "gmean")); });
      queue = queue.filter(Boolean);
    } else {
      score = 0; asked = 0; idx = 0; wrong = {}; skipped = {};
      // 見て選ぶだけにしない。tone は音、order は組み立て。片方に寄らないよう混ぜる
      const kinds = shuf(["meaning", "reverse", "zhuyin", "order", "listen", "tone", "speak", "cloze"]);
      queue = L.ws.map((w) => ({ kind: "learn", w }));
      shuf(L.ws).forEach((w, i) => queue.push(mkQ(w, kinds[i % kinds.length])));
    }
    // 例文の注音・拼音は別ファイル。無くても進めるが、あるなら見せたいので先に頼んでおく
    try { if (typeof loadExZy === "function") loadExZy(() => { if (L && queue[idx] && queue[idx].kind === "learn") draw(); }); } catch (e) {}
    document.body.classList.add("ls-open");
    // main.wrap の中にあると文字サイズ設定の zoom ごと拡大され、全画面の枠が画面からはみ出す。
    // 一度だけ body 直下へ移す(文字の拡大は #lsStage の中身にだけ --fsz で効かせる)
    if ($("lsPlay").parentElement !== document.body) document.body.appendChild($("lsPlay"));
    $("lsPlay").classList.add("on");
    $("lsSkipSheet").classList.remove("on");
    // どの課にいるか出す。前は帯ごとヘッダに隠れていて、開いた瞬間どこか分からなかった
    $("lsTitle").textContent = T("lsUnit", "第 {n} 単元").replace("{n}", L.unit.no) + " · " + (L.short || L.title);
    $("lsSkipBtn").textContent = T("lsSkip", "もう知っている");
    $("lsSkipBtn").style.display = "";
    draw();
  }

  // 「もう知っている」— 簡単すぎる課で足止めしない。
  // 解いていないので score には入れない。ただし本人が知っていると言ったので
  // SRS には known で載せる。忘れていればいずれ復習に戻ってくる。
  function skip(go, cancel) {
    if (!L) return;
    const sheet = $("lsSkipSheet");
    if (cancel) { sheet.classList.remove("on"); return; }
    if (!go) {
      $("lsSkipQ").textContent = T("lsSkipQ", "この課を飛ばしますか?");
      $("lsSkipBody").textContent = L.kind === "grammar"
        ? T("lsSkipBodyG", "この文法 {n} 点をクリア済みにします。問題は出ません。").replace("{n}", L.gs.length)
        : T("lsSkipBody", "{n} 語をクリア済みにして、復習にだけ載せます。問題は出ません。").replace("{n}", L.ws.length);
      $("lsSkipYes").textContent = T("lsSkipYes", "飛ばす");
      $("lsSkipNo").textContent = T("lsSkipNo", "やめる");
      sheet.classList.add("on");
      return;
    }
    sheet.classList.remove("on");
    setDone(L.lv, L.key);
    clearRun();
    try {
      L.ws.forEach((w) => SRS.recordGrade(L.lv, w, "known"));
      L.gs.forEach((id) => SRS.recordGrammar(L.lv, id, "known"));   // 知っていると言ったので known で載せる
    } catch (e) {}
    try { recordStudy(); } catch (e) {}
    const nx = next(L.lv);
    if (nx) start(nx.lv, nx.key); else quit();              // 開けなければ start() が付費牆を出す
  }
  function quit() {
    if (recording) stopRec();
    if (L && L.kind === "placement") { L = null; try { Placement.reset(); } catch (e) {} }
    document.body.classList.remove("ls-open");
    $("lsPlay").classList.remove("on");
    try { PA.render(); } catch (e) {}
  }
  function say(w) { try { speakZh(w); } catch (e) {} }

  // ── 程度測驗(placement.js)借這個全畫面框和出題器 ──
  function placementOpen() {
    L = { lv: currentLevel, key: "__plc", kind: "placement", ws: [], gs: [], unit: { no: 0 }, title: "" };
    queue = []; idx = 0; score = 0; asked = 0; wrong = {}; skipped = {};
    document.body.classList.add("ls-open");
    if ($("lsPlay").parentElement !== document.body) document.body.appendChild($("lsPlay"));
    $("lsPlay").classList.add("on");
    $("lsSkipSheet").classList.remove("on");
    $("lsSkipBtn").style.display = "none";
  }
  // 一輪:4 個單字各一種題型(意思/反查/注音/填空/聲調,不出聽音・口說)+ 文法填空・意思。答錯不補題
  function placementRound(lv, ws, gs) {
    L = { lv, key: "__plc", kind: "placement", ws: ws.slice(), gs: gs.slice(), unit: { no: 0 }, title: "" };
    W = words(lv);
    score = 0; asked = 0; idx = 0; wrong = {}; skipped = {};
    const kinds = shuf(["meaning", "reverse", "zhuyin", "cloze", "tone"]);
    queue = ws.map((w, i) => mkQ(w, kinds[i % kinds.length]));
    gs.forEach((id, i) => queue.push(mkG(id, i % 2 ? "gmean" : "gcloze")));
    queue = shuf(queue.filter(Boolean));
    try { if (typeof loadExZy === "function") loadExZy(() => {}); } catch (e) {}
    $("lsSkipBtn").style.display = "none";
    draw();
  }
  const gmapOf = (lv) => gmap(lv);

  function draw() {
    if (idx >= queue.length) { finish(); return; }
    try { $("lsStage").scrollTop = 0; } catch (e) {}   // 前の問題の位置が残ると、開いた瞬間 下から始まる
    saveRun();
    const q = queue[idx], v = W[q.w], ex = v && v.ex;
    const pct = Math.min(100, Math.round(idx / queue.length * 100));
    $("lsBar").style.width = pct + "%";
    $("lsCount").textContent = (idx + 1) + " / " + queue.length;
    const again = q.again ? `<div class="ls-again">${esc(T("lsAgain2", "もう一度"))}</div>` : "";

    // ── 文法 ──
    if (q.kind === "glearn") {
      const g = gmap(L.lv)[q.g];
      const eg = (g.eg || []).map((e) => `
        <div class="ls-geg">
          <div class="ls-geg-z">${e.z}</div>
          <div class="ls-geg-p">${typeof exRuby === "function" ? exRuby(stripTags(e.z), e.py || "") : esc(e.py || "")}</div>
          <div class="ls-geg-t">${esc(gTxt(e))}</div>
          <button class="ls-play sm" onclick="LS.say('${esc(stripTags(e.z))}')">
            ${icon("volume", { size: 18 })}<span>${esc(T("lsPlayEx", "例文を聞く"))}</span></button>
        </div>`).join("");
      $("lsStage").innerHTML = `
        <div class="ls-step">${esc(T("lsGrammar", "文法"))} · ${esc(T("lsGLearnN", "{i} / {n} 点目").replace("{i}", idx + 1).replace("{n}", L.gs.length))}</div>
        <div class="ls-card ls-gcard">
          ${g.cat ? `<span class="ls-gcat">${esc(typeof twGCat === "function" ? twGCat(g.cat) : g.cat)}</span>` : ""}
          <div class="ls-gt">${esc(dispT(g.t))}</div>
          <div class="ls-gm">${esc(gTxt(g.g))}</div>
          <div class="ls-gp">${esc(gTxt(g.p))}</div>
          <div class="ls-gx">${esc(gTxt(g.ex))}</div>
          ${eg}
        </div>
        <button class="btn primary ls-cta" onclick="LS.next()">${esc(idx + 1 < L.gs.length ? T("lsNext", "次へ") : T("lsToQuiz", "確認する"))}</button>`;
      return;
    }
    if (q.kind === "gcloze" || q.kind === "gmean") {
      const g = gmap(L.lv)[q.g];
      const head = q.kind === "gcloze"
        ? `<div class="ls-q">${esc(T("lsAskBlank", "空いているのは?"))}</div>
           <div class="ls-cloze">${q.eg.z.replace(/<em>[\s\S]*?<\/em>/, "<b>　</b>")}</div>
           <div class="ls-gsub">${esc(gTxt(q.eg))}</div>`
        : `<div class="ls-q">${esc(T("lsAskGMean", "この文型の意味は?"))}</div>
           <div class="ls-mid2">${esc(dispT(g.t))}</div>
           <div class="ls-gsub">${esc(gTxt(g.p))}</div>`;
      $("lsStage").innerHTML = again + head +
        `<div class="ls-opts">${q.opts.map((o, i) => `<button class="ls-opt" onclick="LS.pick(${i})">${esc(o)}</button>`).join("")}</div><div id="lsAfter"></div>`;
      return;
    }
    if (q.kind === "learn") {
      // 覚える面は「見て終わり」にしない。品詞・読み・例文の読みまで出して、
      // 語と例文はそれぞれ別に聞ける。押す的は小さくしない(44px)。
      const exRb = (ex && ex.z && typeof exRuby === "function") ? exRuby(ex.z, ex.py || "") : "";
      const exTr = ex ? esc(ex[MK()] || ex.e || ex.j || "") : "";
      $("lsStage").innerHTML = `
        <div class="ls-step">${esc(T("lsLearnN", "{i} / {n} 語目").replace("{i}", idx + 1).replace("{n}", L.ws.length))}</div>
        <div class="ls-card">
          ${saveBtn(v.w)}
          <div class="ls-w" onclick="LS.say('${esc(v.w)}')">${esc(v.w)}</div>
          <div class="ls-zy">${typeof twPh === "function" ? twPh(v.zy || "", v.py) : esc(v.zy || "")}</div>
          <div class="ls-py">${esc(v.py || "")}</div>
          <button class="ls-play" onclick="LS.say('${esc(v.w)}')" aria-label="${esc(T("lsPlay", "音を聞く"))}">
            ${icon("volume", { size: 20 })}<span>${esc(T("lsPlay", "音を聞く"))}</span>
          </button>
          <div class="ls-mrow">
            ${v.c ? `<span class="ls-pos">${esc(v.c)}</span>` : ""}
            <span class="ls-m">${esc(mean(v))}</span>
          </div>
          ${ex && ex.z ? `
          <div class="ls-ex">
            <div class="ls-ex-h">${esc(T("lsExample", "例文"))}</div>
            <div class="ls-ex-z">${esc(ex.z)}</div>
            ${exRb ? `<div class="ls-ex-r">${exRb}</div>` : ""}
            ${exTr ? `<div class="ls-ex-t">${exTr}</div>` : ""}
            <button class="ls-play sm" onclick="LS.say('${esc(ex.z)}')" aria-label="${esc(T("lsPlayEx", "例文を聞く"))}">
              ${icon("volume", { size: 18 })}<span>${esc(T("lsPlayEx", "例文を聞く"))}</span>
            </button>
          </div>` : ""}
        </div>
        <button class="btn primary ls-cta" onclick="LS.next()">${esc(idx + 1 < L.ws.length ? T("lsNext", "次へ") : T("lsToQuiz", "確認する"))}</button>`;
      say(v.w);
      return;
    }
    // ── 並べかえ ──
    if (q.kind === "order") {
      const built = q.built || (q.built = []);
      const used = built.slice();
      const chips = q.opts.map((t, i) => {
        const gone = used.indexOf(t);                       // 同じ語が 2 つある文もある
        if (gone >= 0) { used.splice(gone, 1); return `<button class="ls-chip gone" disabled>${esc(t)}</button>`; }
        return `<button class="ls-chip" onclick="LS.ord(${i})">${esc(t)}</button>`;
      }).join("");
      $("lsStage").innerHTML = again +
        `<div class="ls-q">${esc(T("lsAskOrder", "正しい順に並べてください"))}</div>
         <div class="ls-ordhint">${esc(mean(W[q.w]) ? (W[q.w].ex && gTxt(W[q.w].ex)) || "" : "")}</div>
         <div class="ls-slot${built.length ? "" : " empty"}" onclick="LS.ordUndo()">${
            built.length ? built.map((t) => `<span>${esc(t)}</span>`).join("") : esc(T("lsOrderHere", "ここに並びます"))}</div>
         <div class="ls-chips">${chips}</div>
         <button class="btn primary ls-cta" onclick="LS.ordDone()" ${built.length === q.parts.length ? "" : "disabled"}>${esc(T("lsCheck2", "答え合わせ"))}</button>
         <div id="lsAfter"></div>`;
      return;
    }
    // ── 口に出す ──
    if (q.kind === "speak") {
      try { SPK.loadPyMap(); } catch (e) {}                      // 採点用の音マップを先に頼む
      const tr = (v && v.ex && q.z !== v.w) ? esc(v.ex[MK()] || v.ex.e || v.ex.j || "") : esc(mean(v));
      $("lsStage").innerHTML = again +
        `<div class="ls-q">${esc(T("lsAskSpeak", "声に出して言ってください"))}</div>
         <div class="ls-big${q.z.length > 4 ? " sm" : ""}" onclick="LS.say('${esc(q.z)}')">${esc(q.z)}</div>
         <div class="ls-py">${q.z === v.w
            ? `${typeof twPhPair === "function" ? twPhPair(v.zy || "", v.py, "　") : esc(v.zy || "") + "　" + esc(v.py || "")}`
            : (typeof exRuby === "function" ? exRuby(q.z, q.py || "") : esc(q.py || ""))}</div>
         <div class="ls-gsub">${tr}</div>
         <button class="ls-play" onclick="LS.say('${esc(q.z)}')">
           ${icon("volume", { size: 20 })}<span>${esc(T("lsSpkModel", "お手本を聞く"))}</span></button>
         <button class="ls-mic" id="lsMic" onclick="LS.mic()" aria-label="${esc(T("lsSpkTap", "押して言う"))}">
           ${icon("mic", { size: 30 })}</button>
         <div class="ls-micst" id="lsMicSt">${esc(T("lsSpkTap", "押して言う"))}</div>
         <div id="lsAfter"></div>
         <button class="ls-skiplink" onclick="LS.spkSkip()">${esc(T("lsSpkSkip", "この問題をとばす"))}</button>`;
      return;
    }
    let head;
    if (q.kind === "tone") head = `<div class="ls-q">${esc(T("lsAskTone", "何声ですか?"))}</div>
      <div class="ls-big" onclick="LS.say('${esc(q.w)}')">${[...q.w].map((c, i) => i === q.ci ? `<em>${esc(c)}</em>` : esc(c)).join("")}</div>
      <div class="ls-gsub">${esc(mean(W[q.w]))}</div>`;
    else if (q.kind === "meaning") head = `<div class="ls-q">${esc(T("lsAskMean", "意味は?"))}</div><div class="ls-big" onclick="LS.say('${esc(v.w)}')">${esc(v.w)}</div><div class="ls-zy">${typeof twPh === "function" ? twPh(v.zy || "", v.py) : ""}</div>`;
    else if (q.kind === "reverse") head = `<div class="ls-q">${esc(T("lsAskWord", "どの語?"))}</div><div class="ls-mid2">${esc(mean(v))}</div>`;
    else if (q.kind === "zhuyin") head = `<div class="ls-q">${esc(T("lsAskZy", "読み方は?"))}</div><div class="ls-big">${esc(v.w)}</div>`;
    else if (q.kind === "listen") head = `<div class="ls-q">${esc(T("lsAskListen", "聞こえたのは?"))}</div><button class="ls-spk" onclick="LS.say('${esc(v.w)}')">${icon("volume", { size: 30 })}</button>`;
    else head = `<div class="ls-q">${esc(T("lsAskBlank", "空いているのは?"))}</div><div class="ls-cloze">${esc(ex.z).split(esc(v.w)).join('<b>　</b>')}</div>`;
    $("lsStage").innerHTML = again + head +
      `<div class="ls-opts">${q.opts.map((o, i) => `<button class="ls-opt" onclick="LS.pick(${i})">${q.kind === "zhuyin" && typeof twZy === "function" ? (typeof twPyOnly === "function" && twPyOnly() ? esc((Object.keys(W).map((k) => W[k]).find((x) => x.zy === o) || {}).py || o) : twZy(o)) : esc(o)}</button>`).join("")}</div><div id="lsAfter"></div>`;
    if (q.kind === "listen") say(v.w);
  }
  // 並べかえ: 押した語を下の枠へ。枠を押すと 1 つ戻す
  function ord(i) {
    const q = queue[idx]; if (!q || q.kind !== "order") return;
    // 同じ語が何回使えるかは opts に出てくる回数まで(画面では使った語のボタンは押せないが、関数側でも止める)
    const used = (q.built || []).filter((t) => t === q.opts[i]).length, have = q.opts.filter((t) => t === q.opts[i]).length;
    if (used >= have || (q.built || []).length >= q.parts.length) return;
    q.built = (q.built || []).concat(q.opts[i]);
    draw();
  }
  function ordUndo() {
    const q = queue[idx]; if (!q || q.kind !== "order" || !q.built || !q.built.length) return;
    q.built.pop(); draw();
  }
  function ordDone() {
    const q = queue[idx]; if (!q || q.kind !== "order") return;
    const ok = q.built.join("\u0001") === q.ans;
    asked++; if (ok) score++; else wrong[q.w] = 1;
    const v = W[q.w], ex = v && v.ex;
    document.querySelectorAll("#lsStage .ls-chip").forEach((b) => { b.disabled = true; });
    const slot = document.querySelector("#lsStage .ls-slot");
    if (slot) { slot.classList.add(ok ? "ok" : "ng"); slot.onclick = null; }
    const cta = document.querySelector("#lsStage .ls-cta"); if (cta) cta.remove();
    if (!ok) requeue(mkQ(q.w, "cloze"));
    $("lsAfter").innerHTML = `
      <div class="ls-ans">
        <div class="ls-ans-w">${esc(ex ? ex.z : v.w)}</div>
        <div class="ls-ans-m">${ex ? (typeof exRuby === "function" ? exRuby(ex.z, ex.py || "") : esc(ex.py || "")) : `${typeof twPhPair === "function" ? twPhPair(v.zy || "", v.py, "　") : esc(v.py || "")}`}</div>
        ${ex ? `<div class="ls-ans-ex">${esc(gTxt(ex))}</div>` : ""}
      </div>
      <button class="btn primary ls-cta" onclick="LS.next()">${esc(idx + 1 < queue.length ? T("lsNext", "次へ") : T("lsResult", "結果"))}</button>`;
    saveRun();
  }

  // まちがえた問題は最後に積むだけだと、その頃には何を間違えたか忘れている。
  // 少し先に差し込んで、覚えている間にもう一度出す。
  // 出し直しは 1 語 2 回まで。上限が無いと、どうしても取れない問題で課が終わらなくなる
  // (2026-10 報告:同じ単語ばかり出て進まず「知っている」で抜けるしかない)
  function requeue(q) {
    if (!q) return;
    const id = q.w || q.g;
    if (queue.filter((x) => x.again && (x.w || x.g) === id).length >= 2) return;
    queue.splice(Math.min(queue.length, idx + 3), 0, Object.assign(q, { again: true }));
  }

  function nextStep() { if (recording) stopRec(); idx++; draw(); }
  // 口に出す問題をとばす。点数には入れない。ただし「言えた」証拠も無いので
  // 復習は known ではなく soso(1 時間後)で載せる — マイクが無い人を落第させない
  function spkSkip() {
    const q = queue[idx];
    if (q && q.kind === "speak" && !q.tried) skipped[q.w] = 1;
    nextStep();
  }

  function pick(i) {
    const q = queue[idx], v = W[q.w], ok = q.opts[i] === q.ans;
    asked++; if (ok) score++; else wrong[q.w || q.g] = 1;
    document.querySelectorAll("#lsStage .ls-opt").forEach((b, n) => {
      b.disabled = true;
      if (q.opts[n] === q.ans) b.classList.add("ok"); else if (n === i) b.classList.add("ng");
    });
    if (q.kind === "gcloze" || q.kind === "gmean") {
      const g = gmap(L.lv)[q.g];
      if (!ok && L.kind !== "placement") requeue(mkG(q.g, "gmean"));
      let gp = "";
      if (!ok) {
        const got = q.opts[i], G2 = gmap(L.lv);
        const o = Object.keys(G2).map((k) => G2[k]).find((x) => x.id !== q.g &&
          (gTxt(x.g) === got || x.t === got || (x.eg || []).some((e) => emOf(e.z) === got)));
        if (o) gp = `<div class="ls-picked">${esc(T("lsYouPicked", "選んだのは"))}
          <b>${esc(got)}</b> · ${esc(dispT(o.t))}（${esc(gTxt(o.g))}）</div>`;
      }
      $("lsAfter").innerHTML = gp + `
        <div class="ls-ans">
          <div class="ls-ans-w">${esc(dispT(g.t))}</div>
          <div class="ls-ans-m">${esc(gTxt(g.g))}　<span class="ls-gp2">${esc(gTxt(g.p))}</span></div>
          ${q.kind === "gcloze" ? `<div class="ls-ans-ex">${q.eg.z}<br><span class="ls-ans-r">${typeof exRuby === "function" ? exRuby(stripTags(q.eg.z), q.eg.py || "") : esc(q.eg.py || "")}</span></div>` : ""}
          <div class="ls-ans-ex">${esc(gTxt(g.ex))}</div>
        </div>
        <button class="btn primary ls-cta" onclick="LS.next()">${esc(idx + 1 < queue.length ? T("lsNext", "次へ") : T("lsResult", "結果"))}</button>`;
      return;
    }
    if (!ok && L.kind !== "placement") requeue(mkQ(q.w, "meaning"));
    const ex = v && v.ex;
    // 「違う」とだけ言われても学べない。選んだ方が何だったのかを並べる
    let picked = "";
    if (!ok) {
      const got = q.opts[i];
      const find = (test) => Object.keys(W).map((k) => W[k]).find(test);
      let o = null;
      if (q.kind === "meaning") o = find((x) => mean(x) === got);
      else if (q.kind === "zhuyin") o = find((x) => x.zy === got);
      else o = W[got] || find((x) => x.w === got);
      if (o && o.w !== v.w) picked = `<div class="ls-picked">${esc(T("lsYouPicked", "選んだのは"))}
        <b>${esc(o.w)}</b> <span>${zyp(o)}</span> · ${esc(mean(o))}</div>`;
      else if (q.kind === "tone") picked = `<div class="ls-picked">${esc(T("lsYouPicked", "選んだのは"))} <b>${esc(got)}</b></div>`;
    }
    $("lsAfter").innerHTML = `
      ${picked}
      <div class="ls-ans">
        <div class="ls-ans-w">${esc(v.w)} <span>${zyp(v)}</span></div>
        <div class="ls-ans-m">${esc(mean(v))}</div>
        ${ex && ex.z ? `<div class="ls-ans-ex">${esc(ex.z)}</div>` : ""}
      </div>
      <button class="btn primary ls-cta" onclick="LS.next()">${esc(idx + 1 < queue.length ? T("lsNext", "次へ") : T("lsResult", "結果"))}</button>`;
  }

  // My単語帳(2026-10 韓国のユーザー要望「単元の単語をそのまま単語帳に」)。覚える面の右上と、終了画面の一覧から
  // 注音(+設定で拼音)。2026-10 日本のユーザー「拼音で学んできたので注音だけだと読めない、併記してほしい」
  function zyp(v) {
    if (typeof twPyOnly === "function" && twPyOnly()) return esc((v && (v.py || v.zy)) || "");
    const z = typeof twZy === "function" ? twZy((v && v.zy) || "") : "";
    return (typeof twShowPy === "function" && twShowPy() && v && v.py) ? z + ` <span class="ls-pyx">${esc(v.py)}</span>` : z;
  }
  function saveBtn(w) {
    if (!window.MyVocab) return "";
    const on = MyVocab.has(w);
    return `<button class="ls-save${on ? " on" : ""}" data-w="${esc(w)}" onclick="LS.save(this.dataset.w)" aria-label="${esc(T("mvSaveBtn", "My単語帳に保存"))}">${on ? "★" : "☆"}</button>`;
  }
  function save(w) {
    if (!window.MyVocab || !w) return;
    const r = MyVocab.has(w) ? "dup" : MyVocab.saveFromDict(w);
    if (r === "ok") { try { showToast("★ " + w); } catch (e) {} }
    if (r === "ok" || r === "dup") document.querySelectorAll('[data-w="' + w.replace(/"/g, "") + '"]').forEach((b) => { b.classList.add("on"); b.innerHTML = b.classList.contains("ls-sc") ? "★ " + esc(w) : "★"; });
  }

  function finish() {
    if (L.kind === "placement") {                             // 程度測驗:一輪答完交回去判升降,不記進度、不進 SRS
      const ok = score, of = asked; L = null;
      try { Placement.roundDone(ok, of); } catch (e) { quit(); }
      return;
    }
    setDone(L.lv, L.key);
    clearRun();
    // 覚えた語を復習に載せる。ここを繋がないと「復習に回りました」がただの文字になる。
    try {
      L.ws.forEach((w) => SRS.recordGrade(L.lv, w, wrong[w] ? "unknown" : (skipped[w] ? "soso" : "known")));
      // 文法点も復習に載せる。一度習って終わりでは、次の課に入った時点で消える
      L.gs.forEach((id) => SRS.recordGrammar(L.lv, id, wrong[id] ? "unknown" : "known"));
    } catch (e) {}
    try { recordStudy(); } catch (e) {}
    // 課を 1 つ終えた=いい気分の時。App の評価依頼の判定に数える(1 日 1 回・3 日目以降・120 日間隔・Apple の上限は原生側)。
    // 2026-10 まで闖關(一番使われる入口)がここを呼んでおらず、評価依頼がほぼ出ていなかった
    try { window.STAYTW_studyDone && window.STAYTW_studyDone(); } catch (e) {}
    $("lsBar").style.width = "100%"; $("lsCount").textContent = "";
    $("lsSkipBtn").style.display = "none";
    const s = doneOf(L.lv), mine = flat(L.lv).filter((x) => x.unit.no === L.unit.no);
    const dn = mine.filter((x) => s[x.key]).length;
    const before = Math.round((dn - 1) / mine.length * 100), after = Math.round(dn / mine.length * 100);
    const nx0 = next(L.lv);
    const nx = nx0 ? Object.assign({}, nx0, { locked: !premium() && quotaLeft() <= 0 && !runOf(nx0.lv, nx0.key) }) : null;
    const pct = asked ? Math.round(score / asked * 100) : 100;
    const R = 60, C = 2 * Math.PI * R;
    const nWrong = Object.keys(wrong).length;
    $("lsStage").innerHTML = `
      <div class="ls-fin">
        <img class="il" src="images/il/01_lesson_done.webp" alt="" width="116" height="116" style="width:116px;height:116px;display:block;margin:0 auto 6px">
        <div class="ls-ring">
          <svg width="132" height="132"><circle cx="66" cy="66" r="${R}" fill="none" stroke="var(--line)" stroke-width="9"/>
            <circle id="lsRing" cx="66" cy="66" r="${R}" fill="none" stroke="var(--ac)" stroke-width="9" stroke-linecap="round"
              stroke-dasharray="${C}" stroke-dashoffset="${C}" style="transition:stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)"/></svg>
          <div class="ls-ringv" id="lsRingV">0%</div>
        </div>
        <div class="ls-fin-t">${esc(L.title)} ${esc(T("lsCleared", "クリア"))}</div>
        <div class="ls-fin-s">${esc(L.kind === "grammar"
          ? T("lsFinG", "文法 {n} 点").replace("{n}", L.gs.length)
          : T("lsFinSub", "{n} 語 ／ まちがえた {m} 語は復習に回りました").replace("{n}", L.ws.length).replace("{m}", nWrong))}</div>
        <div class="ls-fin-row" id="lsR1">
          <span class="k">${esc(T("lsUnit", "第 {n} 単元").replace("{n}", L.unit.no))}<span class="ls-ubar"><i id="lsUb"></i></span></span>
          <span class="v">${dn} / ${mine.length}</span>
        </div>
        ${missList()}
        ${(window.MyVocab && L.ws && L.ws.length) ? `<div class="ls-savelist"><div class="ls-savelist-h">${icon("star", { size: 14 })} ${esc(T("lsSaveH", "この課の単語を My単語帳 に保存"))}</div><div class="ls-savechips">${L.ws.map((w) => `<button class="ls-sc${MyVocab.has(w) ? " on" : ""}" data-w="${esc(w)}" onclick="LS.save(this.dataset.w)">${MyVocab.has(w) ? "★" : "☆"} ${esc(w)}</button>`).join("")}</div></div>` : ""}
        ${nx && !nx.locked ? `<div class="ls-unlock" id="lsR2"><b>NEXT</b><span>${esc(nx.title)}　<em>${esc(nx.ws.slice(0, 3).join("・"))}…</em></span></div>` : ""}
        ${nx && nx.locked ? (() => {
          const rest = flat(L.lv).filter((x) => !s[x.key]), rg = rest.filter((x) => x.kind === "grammar").length;
          return `<div class="ls-offer" onclick="LS.locked()">
            <b>${icon("lock", { size: 14 })} ${esc(T("lsQuotaDone", "今日の無料 {n} 課はここまで").replace("{n}", DAILY_FREE))}</b>
            <span>${esc(T("lsUnlockBody", "この先 {n} 課（文法 {g} 課）が待っています").replace("{n}", rest.length).replace("{g}", rg))}</span>
            <em>NEXT · ${esc(nx.title)}${nx.ws.length ? "　" + esc(nx.ws.slice(0, 3).join("・")) + "…" : ""}</em>
            <button class="btn primary">${esc(T("lsSeePremium", "Premium を見る"))}</button>
          </div>`; })() : ""}
        <button class="btn ${nx && nx.locked ? "" : "primary "}ls-cta" onclick="${nx && !nx.locked ? "LS.again()" : "LS.quit()"}">${esc(nx && !nx.locked ? T("lsNextLesson", "次の課へ") : T("lsBack", "一覧へ"))}</button>

        ${nx && nx.locked ? "" : `<p class="ls-back"><a href="javascript:void(0)" onclick="LS.quit()">${esc(T("lsBack", "一覧へ"))}</a></p>`}
      </div>`;
    const ring = $("lsRing"), rv = $("lsRingV");
    setTimeout(() => { ring.style.strokeDashoffset = String(C * (1 - pct / 100)); }, 80);
    let n = 0; const t = setInterval(() => { n += Math.max(1, Math.ceil(pct / 28)); if (n >= pct) { n = pct; clearInterval(t); } rv.textContent = n + "%"; }, 32);
    setTimeout(() => { $("lsR1").classList.add("in"); const ub = $("lsUb"); ub.style.width = before + "%"; setTimeout(() => { ub.style.width = after + "%"; }, 260); }, 700);
    setTimeout(() => { const r2 = $("lsR2"); if (r2) r2.classList.add("in"); }, 1250);
  }
  // クリアの丸だけ出して終わると、何を落としたか分からないまま次へ行く。
  // 落とした語(文法点)をその場で並べる。ここが復習の入口になる。
  function missList() {
    const ks = Object.keys(wrong || {});
    if (!ks.length) return `<div class="ls-miss none">${esc(T("lsAllRight", "全問正解"))}</div>`;
    const G = L.kind === "grammar" ? gmap(L.lv) : null;
    const rows = ks.map((k) => {
      if (G) { const g = G[k]; return g ? `<li><b>${esc(dispT(g.t))}</b><span>${esc(gTxt(g.g))}</span></li>` : ""; }
      const v = W[k]; if (!v) return "";
      return `<li onclick="LS.say('${esc(v.w)}')"><b>${esc(v.w)}</b>
        <i>${zyp(v)}</i><span>${esc(mean(v))}</span></li>`;
    }).filter(Boolean).join("");
    if (!rows) return "";
    return `<div class="ls-miss">
      <div class="ls-miss-h">${esc(T("lsMissed", "まちがえた {n}").replace("{n}", ks.length))}</div>
      <ul>${rows}</ul></div>`;
  }

  function again() { const nx = next(L.lv); if (nx) start(nx.lv, nx.key); else quit(); }

  return { section, ensure, start, quit, next: nextStep, placementOpen, placementRound, gmapOf, choose, pickCancel, pickStart, pick, say, again, locked, flat, nextOf: next, tog, togAll, save, skip, ord, ordUndo, ordDone, mic, spkSkip, quota, peek };
})();
if (typeof window !== "undefined") window.LS = LS;   // const は window に乗らない
