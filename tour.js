/* StayTW — はじめてのガイド(4 ステップ、いつでも飛ばせる)
 * 2026-10 Android テスターの指摘「新しい人を案内するウォークスルーが無い」。
 * 目的選択(pickPersona)のあと 1 回だけ出す。要素を丸く切り抜いて、その下に一言。
 * 場所が見つからないステップは飛ばす(画面が変わっても壊れない)。
 * もう一度見たい人は設定 → 「使い方ガイド」から。
 */
const TOUR = (() => {
  const KEY = "stw_tour_done";
  const T = (k, fb) => { try { const v = twT(k); return v && v !== k ? v : fb; } catch (e) { return fb; } };
  const STEPS = [
    { sel: ".levels", t: "tourLvT", b: "tourLvB", ft: "レベルを選ぶ", fb: "TOCFL の級ごとに単語・文法が分かれています。はじめてなら Level 1 から。" },
    { sel: ".ls-row", t: "tourLsT", b: "tourLsB", ft: "毎日ここで闖關", fb: "1 課 3 分。見て覚えて、聞いて、声に出して答えます。間違えたものは自動で復習へ。" },
    { sel: '.bnav [data-bn="srs"]', t: "tourSrsT", b: "tourSrsB", ft: "復習", fb: "忘れかけたころに出てきます。毎日ここだけは開いてください。" },
    { sel: "#setBtn", t: "tourSetT", b: "tourSetB", ft: "表示の設定", fb: "文字の大きさ・中国語の字体・注音／拼音の表示・言語をここで変えられます。" },
  ];
  let i = 0, box = null, hole = null;
  const done = () => { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return true; } };
  function close() {
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
    if (box) box.remove(); if (hole) hole.remove(); box = hole = null;
    window.removeEventListener("resize", place);
  }
  function el() { const s = STEPS[i]; return s && document.querySelector(s.sel); }
  function place() {
    const e = el(); if (!e || !box) return;
    const r = e.getBoundingClientRect(), pad = 6;
    Object.assign(hole.style, { left: (r.left - pad) + "px", top: (r.top - pad) + "px", width: (r.width + pad * 2) + "px", height: (r.height + pad * 2) + "px" });
    const below = r.top < innerHeight / 2;              // 上半分の要素なら下に、下半分なら上に出す
    box.style.top = below ? (r.bottom + 14) + "px" : "";
    box.style.bottom = below ? "" : (innerHeight - r.top + 14) + "px";
  }
  function show() {
    while (i < STEPS.length && !el()) i++;               // 見つからない場所は飛ばす
    if (i >= STEPS.length) { close(); return; }
    const s = STEPS[i], e = el();
    e.scrollIntoView({ block: "center" });
    if (!hole) { hole = document.createElement("div"); hole.className = "tour-hole"; document.body.appendChild(hole); }
    if (!box) { box = document.createElement("div"); box.className = "tour-box"; document.body.appendChild(box); window.addEventListener("resize", place); }
    const last = i === STEPS.length - 1;
    box.innerHTML = `<div class="tour-step">${i + 1} / ${STEPS.length}</div>
      <b>${T(s.t, s.ft)}</b><p>${T(s.b, s.fb)}</p>
      <div class="tour-btns"><button class="tour-skip" onclick="TOUR.close()">${T("tourSkip", "スキップ")}</button>
      <button class="btn primary" onclick="TOUR.next()">${last ? T("tourDone", "はじめる") : T("tourNext", "次へ")}</button></div>`;
    setTimeout(place, 260);                               // scrollIntoView の後に位置を取る
  }
  function start(force) { if (!force && done()) return; i = 0; show(); }
  function next() { i++; show(); }
  return { start, next, close };
})();
if (typeof window !== "undefined") window.TOUR = TOUR;
