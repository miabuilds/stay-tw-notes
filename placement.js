/* StayTW — 程度測驗(2026-10-24 Mia:「像 StayKR 一樣弄個測試,讓使用者知道自己程度、從哪裡開始闖關」)
 *
 * 從 Level 2 開始,每級 6 題(4 題單字 + 2 題文法,題型借闖關的出題器,不出聽音/口說:
 * 測驗不該被耳機、麥克風影響)。答對 ≥5 升一級、≤2 降一級、3–4 就是這一級;最多 4 輪。
 * 結果「從 Level X 開始」→ 切到 X 級,X 級以前的課在闖關裡標成「已學過」(stw_placed,
 * lessons.js 的 doneOf 把它合進去,不真的寫幾百個 key;再測到較低的級會自動收回)。
 *
 * 畫面全部畫在闖關的全畫面框(#lsPlay / #lsStage)裡,外觀和一課一樣。
 * 題目那一段交給 LS.placementRound(),答完一輪由 LS.finish 回呼 Placement.roundDone()。
 */
const Placement = (() => {
  const PER = 6, MAX_ROUNDS = 4, START = "l2", TOP = 6, KEY = "stw_placed";
  let S = null;   // { lv, round, hist:[{lv, ok, of}], mastered:Set }
  const $ = (id) => document.getElementById(id);
  const esc = (x) => String(x == null ? "" : x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const T = (k, fb) => { try { const v = twT(k); return v && v !== k ? v : (fb || k); } catch (e) { return fb || k; } };
  const num = (lv) => +String(lv).slice(1) || 1;
  const lvLabel = (lv) => "Level " + num(lv) + " · " + T("lv_" + lv, "");
  const shuf = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const placed = () => { try { return localStorage.getItem(KEY) || ""; } catch (e) { return ""; } };
  const stage = () => $("lsStage");
  const head = (sub) => {
    $("lsTitle").textContent = T("plcTitle", "程度測驗") + (sub ? " · " + sub : "");
    $("lsSkipBtn").style.display = "none";
    $("lsBar").style.width = "0%"; $("lsCount").textContent = "";
    try { stage().scrollTop = 0; } catch (e) {}
  };
  const il = (f) => `<img class="il" src="images/il/${f}.webp" alt="" width="116" height="116" style="width:116px;height:116px;display:block;margin:0 auto 6px">`;

  function open() {
    S = null;
    LS.placementOpen();
    head("");
    stage().innerHTML = `<div class="ls-fin plc">
      ${il("10_quiz")}
      <div class="ls-fin-t">${esc(T("plcH", "不確定從哪一級開始？"))}</div>
      <div class="plc-lead">${esc(T("plcLead", "大約 3 分鐘。每一級 6 題,系統會依答對的題數往上或往下調,最後告訴你從哪一級開始最剛好。"))}</div>
      <button class="btn primary ls-cta" onclick="Placement.start()">${esc(T("plcStart", "開始測驗"))}</button>
      <button class="btn ls-cta plc-sub" onclick="Placement.zero()">${esc(T("plcZero", "我完全沒學過,從頭開始"))}</button>
      <button class="btn ls-cta plc-sub" onclick="LS.quit();LS.choose()">${esc(T("lsPickBtn", "自己選一課當起點"))}</button>
      <p class="ls-back"><a href="javascript:void(0)" onclick="LS.quit()">${esc(T("plcLater", "先不要"))}</a></p>
    </div>`;
  }

  // 一輪 6 題:4 個單字(題型各不同)+ 2 個文法點(填空 + 意思)。文法不夠 3 點的級(例:Level 6)就 6 題都是單字
  function pickRound(lv) {
    const V = shuf((typeof getVocabData === "function" ? getVocabData(lv) : []).filter((v) => v && v.w && v.m));
    let G = [];
    try { G = Object.keys(LS.gmapOf(lv)); } catch (e) {}
    const nG = G.length >= 3 ? 2 : 0;
    return { ws: V.slice(0, PER - nG).map((v) => v.w), gs: shuf(G).slice(0, nG) };
  }

  function start() {
    S = { lv: START, round: 0, hist: [], mastered: new Set() };
    round();
  }
  function round() {
    if (!S) return;
    S.round++;
    const r = pickRound(S.lv);
    if (r.ws.length + r.gs.length < 3) return finish(S.lv);
    head(T("plcRound", "第 {n} 輪").replace("{n}", S.round) + " · " + lvLabel(S.lv));
    LS.placementRound(S.lv, r.ws, r.gs);
  }
  // LS.finish → 這裡。ok = 答對數、of = 題數
  function roundDone(ok, of) {
    if (!S) return;
    const lv = S.lv, n = num(lv);
    S.hist.push({ lv, ok, of });
    const tested = (k) => S.hist.some((h) => h.lv === "l" + k);
    if (ok >= of - 1) {
      S.mastered.add(lv);
      if (n >= TOP) return finish("l" + TOP);
      if (tested(n + 1) || S.round >= MAX_ROUNDS) return finish("l" + (n + 1));
      S.lv = "l" + (n + 1);
    } else if (ok <= 2) {
      if (n <= 1 || S.mastered.has("l" + (n - 1))) return finish(lv);
      if (tested(n - 1) || S.round >= MAX_ROUNDS) return finish("l" + (n - 1));
      S.lv = "l" + (n - 1);
    } else return finish(lv);
    gap();
  }
  function gap() {
    const h = S.hist[S.hist.length - 1], up = num(S.lv) > num(h.lv);
    head(T("plcRound", "第 {n} 輪").replace("{n}", S.round) + " · " + lvLabel(h.lv));
    $("lsBar").style.width = "100%";
    stage().innerHTML = `<div class="ls-fin plc">
      ${il(up ? "02_goal_done" : "09_reading")}
      <div class="plc-score"><b>${h.ok}</b> / ${h.of}</div>
      <div class="ls-fin-t">${esc(up ? T("plcUp", "這一級難不倒你,往上一級試試看。") : T("plcDown", "這一級有點難,往下一級看看。"))}</div>
      <button class="btn primary ls-cta" onclick="Placement.round()">${esc(T("plcNextRound", "下一輪"))} · ${esc(lvLabel(S.lv))}</button>
      <p class="ls-back"><a href="javascript:void(0)" onclick="LS.quit()">${esc(T("plcLater", "先不要"))}</a></p>
    </div>`;
  }
  function finish(lv) {
    S.result = lv;
    head(T("plcResultT", "測驗結果"));
    $("lsBar").style.width = "100%";
    const hist = S.hist.map((h) => `<div><span>Level ${num(h.lv)}</span><b>${h.ok}</b><small>/ ${h.of}</small></div>`).join("");
    stage().innerHTML = `<div class="ls-fin plc">
      ${il("02_goal_done")}
      <div class="plc-lead">${esc(T("plcResultH", "建議你從這一級開始"))}</div>
      <div class="plc-lv">Level ${num(lv)}</div>
      <div class="plc-lv-s">${esc(T("lv_" + lv, ""))}</div>
      ${hist ? `<div class="plc-hist">${hist}</div>` : ""}
      <div class="ls-fin-s">${esc(lv === "l1" ? T("plcFootL1", "從 Level 1 第 1 課開始,基礎打穩再往上。") : T("plcFoot", "之前各級的課會標成「已學過」,想複習隨時可以點回去。"))}</div>
      <button class="btn primary ls-cta" onclick="Placement.apply('${lv}')">${esc(T("plcApply", "從 {lv} 開始闖關").replace("{lv}", "Level " + num(lv)))}</button>
      <p class="ls-back"><a href="javascript:void(0)" onclick="LS.quit()">${esc(T("plcLater", "先不要"))}</a></p>
    </div>`;
  }
  // 套用:記住「從 X 級開始」+ 切等級。X 級以前的課由 lessons.js 的 doneOf 當成已學過
  function apply(lv) {
    try { localStorage.setItem(KEY, lv); } catch (e) {}
    try { if (typeof window.onSRSChange === "function") window.onSRSChange(); } catch (e) {}   // 同步到雲端(websync 的 debounce push)
    S = null;
    LS.quit();
    try { setLevel(lv); } catch (e) {}
    try { switchPanel("path"); } catch (e) {}
    try { window.scrollTo(0, 0); } catch (e) {}
    try { showToast(T("plcToast", "已經幫你切到 {lv}").replace("{lv}", "Level " + num(lv))); } catch (e) {}
  }
  function zero() { apply("l1"); }
  function reset() { S = null; }
  // 闖關一覽上方的入口。還沒測過且課做得少 → 大按鈕;測過了 → 一行小字 + 再測一次
  function entry(lv, doneN) {
    const p = placed();
    if (p) return `<div class="ls-plc-done"><span>${esc(T("plcPlaced", "程度測驗:從 {lv} 開始").replace("{lv}", "Level " + num(p)))}</span><span class="ls-plc-acts"><a href="javascript:void(0)" onclick="Placement.open()">${esc(T("plcAgain", "再測一次"))}</a><a href="javascript:void(0)" onclick="LS.choose()">${esc(T("lsPickLink", "選起點"))}</a></span></div>`;
    if (doneN >= 5) return "";
    return `<button class="ls-plc" onclick="Placement.open()">${typeof icon === "function" ? icon("target", { size: 18 }) : ""}<span>${esc(T("plcBtn", "學過一點中文？3 分鐘測程度,從適合的課開始"))}</span></button>
      <button class="ls-plc lite" onclick="LS.choose()">${typeof icon === "function" ? icon("pin", { size: 18 }) : ""}<span>${esc(T("lsPickBtn", "自己選一課當起點"))}</span></button>`;
  }
  return { open, start, round, roundDone, apply, zero, reset, entry, placed, _s: () => S };
})();
if (typeof window !== "undefined") window.Placement = Placement;   // const 不會上 window
