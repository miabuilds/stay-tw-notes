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
  }
  function remove(w) {
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
  function render() {
    const box = document.getElementById("mvBody");
    if (!box) return;
    const items = list();
    const n = items.length;
    const lim = isPremium() ? "" : `<span class="mv-lim${n >= FREE_MAX ? " full" : ""}">${n} / ${FREE_MAX}</span>`;
    box.innerHTML = `
      <p class="mv-lead">${esc(T("mvLead", "気になった語を自分で足して、複習にまわせます。"))}</p>
      <div class="mv-add">
        <input class="search" id="mvIn" placeholder="${esc(T("mvPh", "語を入力（例：捷運）"))}" autocomplete="off">
        <button class="btn primary" id="mvBtn" onclick="MyVocab.submit()">${esc(T("mvAdd", "調べて追加"))}</button>
      </div>
      <div id="mvMsg" class="mv-msg"></div>
      <div class="mv-head"><span>${esc(T("mvList", "自分の語"))}</span>${lim}</div>
      ${n === 0 ? `<p class="mv-empty">${esc(T("mvEmpty", "まだ 1 語もありません。"))}</p>` : ""}
      <div class="mv-items">${items.map(cardHtml).join("")}</div>`;
    const inp = document.getElementById("mvIn");
    if (inp) inp.onkeydown = (e) => { if (e.key === "Enter") { e.stopPropagation(); submit(); } };
  }
  function cardHtml(it) {
    const zy = (s) => (typeof twZy === "function" ? twZy(s) : esc(s));
    return `<div class="mv-it">
      <div class="mv-top">
        <b class="mv-w" onclick="speakZh('${esc(it.w)}')">${esc(it.w)}</b>
        <span class="mv-zy">${zy(it.zy)}</span><span class="mv-py">${esc(it.py)}</span>
        ${srcBadge(it.src)}
        <button class="mv-del" onclick="MyVocab.remove('${esc(it.w)}')" title="${esc(T("mvDel", "削除"))}">✕</button>
      </div>
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

  return { render, submit, remove, list, count, has, add, FREE_MAX };
})();
if (typeof window !== "undefined") window.MyVocab = MyVocab;   // const は window に乗らない
