// StayTW Study — 間隔復習 SRS（StayJP Study の srs.js と同じ設計）
// 保存: localStorage "stw_srs" = { "l1:我": {interval, ease, nextReviewTs, reviews, correct, ...} }
// クラウド同期: 変更のたびに window.onSRSChange?.() を呼ぶ（sync.js がデバウンスして Firestore へ）
const SRS = (() => {
  const KEY = "stw_srs";
  // 三段評価 → 次回出題までの間隔（フラッシュカードのボタンもここを読む）
  const GRADES = {
    known:   { ms: 7 * 86400 * 1000, key: "srsG1" }, // 覚えた → 1週間後
    soso:    { ms: 60 * 60 * 1000,   key: "srsG2" }, // あいまい → 1時間後
    unknown: { ms: 10 * 60 * 1000,   key: "srsG3" }  // わからない → 10分後
  };
  function getData() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); }
    catch (e) { console.warn("srs save failed (storage full)", e); return; }
    if (typeof window !== "undefined" && typeof window.onSRSChange === "function") window.onSRSChange();
  }
  function today() { return new Date().toISOString().split("T")[0]; }
  function k(lv, w) { return lv + ":" + w; }

  // 2026-09: 文法点も復習に入れる。闖關で一度習って終わり、では身に付かない。
  //   キーは語と同じ "l1:g#l1-1" の形にして、頭の "g#" で語と見分ける。
  //   こうすると保存・同期・期限計算は語とまったく同じ道を通るので、増やすのはカードの見た目だけ。
  const GP = "g#";
  const isG = (w) => String(w || "").indexOf(GP) === 0;
  const gKey = (id) => GP + id;
  function gFind(level, id) {
    try { return (getGrammarData(level) || []).find((g) => g && g.id === id) || null; } catch (e) { return null; }
  }

  // 2026-09: 語の級を官方 TBCL 詞語表に合わせ直した(index.html の VOCAB_BY_LEVEL)。
  // 記録のキーは "l1:公司" のように級を含むので、級が動いた語の記録は迷子になる。
  // 一度だけ、旧キーの記録を新キーへ移す。新キーに既に記録があればそちらを残す
  // (両方の級で解いていた人がいる)。旧キーは消さない — 戻したくなった時のため。
  function migrateLevels() {
    try {
      if (localStorage.getItem(KEY + "_lvmig") === "1") return;
      const moved = (typeof window !== "undefined") && window.STW_LV_MOVED;
      if (!moved) return;                      // まだ読み込まれていない。次の機会に
      const d = getData();
      let n = 0;
      for (const w in moved) {
        const from = k(moved[w][0], w), to = k(moved[w][1], w);
        if (d[from] && !d[to]) { d[to] = d[from]; n++; }
      }
      if (n) save(d);
      localStorage.setItem(KEY + "_lvmig", "1");
      if (n) console.info("[srs] 級の付け替えに伴い " + n + " 語の記録を移しました");
    } catch (e) { /* storage が使えなくても学習は続く */ }
  }
  function isDue(e, now) {
    if (!e) return false;
    return typeof e.nextReviewTs === "number" && e.nextReviewTs <= (now || Date.now());
  }

  // クイズ・模試の正誤から記録（SM-2 風の簡易版）
  function record(level, word, correct) {
    const d = getData(), key = k(level, word), now = Date.now();
    const e = d[key] || { interval: 0, ease: 2.5, reviews: 0, correct: 0 };
    e.reviews++;
    if (correct) {
      e.correct++;
      if (e.interval === 0) e.interval = 1;
      else if (e.interval === 1) e.interval = 3;
      else e.interval = Math.round(e.interval * e.ease);
      e.ease = Math.min(3, e.ease + 0.1);
    } else {
      e.interval = 1;
      e.ease = Math.max(1.3, e.ease - 0.2);
    }
    e.nextReviewTs = now + e.interval * 86400 * 1000;
    e.lastReviewTs = now;
    e.lastReview = today();
    d[key] = e;
    save(d);
  }

  // フラッシュカード三段評価
  function recordGrade(level, word, grade) {
    const spec = GRADES[grade];
    if (!spec) return;
    const d = getData(), key = k(level, word), now = Date.now();
    const e = d[key] || { interval: 0, ease: 2.5, reviews: 0, correct: 0 };
    e.reviews++;
    e.lastReviewTs = now;
    e.lastReview = today();
    if (grade === "known") {
      e.correct++;
      e.interval = 7;
      e.ease = Math.min(3, e.ease + 0.1);
    } else {
      e.interval = 0;
      e.ease = Math.max(1.3, e.ease - (grade === "unknown" ? 0.2 : 0.1));
    }
    e.nextReviewTs = now + spec.ms;
    d[key] = e;
    save(d);
  }

  // 辞書カードから手動で復習に追加：今すぐ復習期限で新規登録（既にあれば何もしない）
  function addWord(level, word) {
    const d = getData(), key = k(level, word);
    if (d[key]) return false;
    d[key] = { interval: 0, ease: 2.5, reviews: 0, correct: 0, nextReviewTs: Date.now(), lastReview: today() };
    save(d);
    return true;
  }

  // 文法一覧から「復習に追加」。語の addWord と同じ扱い
  function addGrammar(level, gid) { return addWord(level, gKey(gid)); }
  // 闖關が呼ぶ。正解/不正解をそのまま三段評価に流す
  function recordGrammar(level, gid, grade) { return recordGrade(level, gKey(gid), grade); }
  function hasGrammar(level, gid) { const d = getData(); return !!d[k(level, gKey(gid))]; }

  // 全レベル横断で復習期限が来た単語
  function getAllDue() {
    const d = getData(), now = Date.now(), out = [];
    Object.entries(d).forEach(([key, e]) => {
      if (!isDue(e, now)) return;
      const ci = key.indexOf(":");
      if (ci < 0) return;
      out.push({ level: key.slice(0, ci), word: key.slice(ci + 1), ...e });
    });
    return out.sort((a, b) => (a.nextReviewTs || 0) - (b.nextReviewTs || 0));
  }
  function getDueCount() { return getAllDue().length; }

  // まだ学習記録のない新出単語（現在レベルから）
  function getNew(level, count) {
    const d = getData();
    const learned = new Set(Object.keys(d).filter(x => x.startsWith(level + ":")).map(x => x.slice(level.length + 1)));
    const vocab = (typeof getVocabData === "function" ? getVocabData(level) : []) || [];
    return vocab.filter(v => !learned.has(v.w)).slice(0, count || 10);
  }

  function getStats(level) {
    const d = getData(), pf = level + ":", now = Date.now();
    // 語の進度は「語彙数」を分母に出している。文法点を混ぜると 100% を超えるので分けて数える
    const all = Object.entries(d).filter(([x]) => x.startsWith(pf));
    const entries = all.filter(([x]) => !isG(x.slice(pf.length)));
    const gs = all.filter(([x]) => isG(x.slice(pf.length)));
    return {
      total: entries.length,
      due: entries.filter(([, v]) => isDue(v, now)).length,
      mastered: entries.filter(([, v]) => v.interval >= 21).length,
      learning: entries.filter(([, v]) => v.interval > 0 && v.interval < 21).length,
      gTotal: gs.length,
      gDue: gs.filter(([, v]) => isDue(v, now)).length,
      gMastered: gs.filter(([, v]) => v.interval >= 21).length
    };
  }

  // ===== 復習セッション（モーダル） =====
  let queue = [], cur = 0, lvl = "l1", capped = false;

  function start(level) {
    lvl = level || (typeof currentLevel !== "undefined" ? currentLevel : "l1");
    const allDue = getAllDue();
    const nw = getNew(lvl, 10);
    queue = [];
    allDue.forEach(x => {
      if (isG(x.word)) {                                   // 文法点
        const g = gFind(x.level, x.word.slice(GP.length));
        if (g) queue.push({ isG: true, g: g, w: x.word, level: x.level, isNew: false });
        return;
      }
      let v = (getVocabData(x.level) || []).find(w => w.w === x.word);
      // 語彙表に無い語（辞書から手動追加した拡張語）は custom store から内容を引く
      if (!v && typeof window !== "undefined" && window.STW_CUSTOM) v = window.STW_CUSTOM[x.word];
      if (v) queue.push(Object.assign({}, v, { level: x.level, isNew: false }));
    });
    nw.forEach(v => queue.push({ ...v, level: lvl, isNew: true }));
    if (!queue.length) { alert(twT("srsNoReview")); return; }
    // 無料版は1セッション SRS_FREE_CARDS 枚まで（due 優先の順は維持）。Premium は無制限。
    capped = false;
    try {
      const cap = (typeof Paywall !== "undefined" && Paywall.SRS_FREE_CARDS) || 10;
      if (typeof Paywall !== "undefined" && !Paywall.isPremium() && queue.length > cap) { queue = queue.slice(0, cap); capped = true; }
    } catch (e) {}
    cur = 0;
    renderCard();
    document.getElementById("quizBg").classList.add("show");
  }

  const gTx = (o, mk) => (o && (o[mk] || o.e || o.j)) || "";
  const gEsc = (x) => String(x == null ? "" : x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 文法点の復習カード。表=文型だけ、裏=意味・解説・例文。語のカードと同じ三段評価で閉じる
  function renderGrammar(item, mk) {
    const g = item.g;
    const eg = (g.eg || []).slice(0, 2).map(e => {
      const z = String(e.z || "");
      return `<div class="srs-gex" onclick="event.stopPropagation();speakZh('${z.replace(/<[^>]*>/g, "").replace(/'/g, "\\'")}')">
        <span class="z">${z}</span><span class="py">${typeof exRuby === "function" ? exRuby(z.replace(/<[^>]*>/g, ""), e.py || "") : gEsc(e.py || "")}</span><span class="tr">${gEsc(gTx(e, mk))}</span></div>`;
    }).join("");
    document.getElementById("quizBox").innerHTML = `
      <div class="qhd"><span>${twT("srsReviewTitle")} ${cur + 1} / ${queue.length}</span>
        <span>${item.level.toUpperCase()}・${twT("lsGrammar")}</span>
        <button class="qclose" onclick="SRS.close()">✕</button></div>
      <div class="srs-card" id="srsCard" onclick="SRS.flip()">
        <div id="srsFront">
          <div class="qmain srs-gt">${gEsc(g.t)}</div>
          <div class="qsub">${gEsc(gTx(g.p, mk))}</div>
          <div class="srs-hint">${twT("cardHint")}</div>
        </div>
        <div id="srsBack" style="display:none">
          <div class="qmain srs-gt">${gEsc(g.t)}</div>
          <div class="qsub">${gEsc(gTx(g.g, mk))}</div>
          <div class="srs-meaning srs-gx">${gEsc(gTx(g.ex, mk))}</div>
          ${eg}
          <div class="srs-btns">
            <button class="srs-btn srs-ng" onclick="event.stopPropagation();SRS.rate('unknown')">${twT("srsG3")}</button>
            <button class="srs-btn srs-mid" onclick="event.stopPropagation();SRS.rate('soso')">${twT("srsG2")}</button>
            <button class="srs-btn srs-ok" onclick="event.stopPropagation();SRS.rate('known')">${twT("srsG1")}</button>
          </div>
        </div>
      </div>`;
  }

  function renderCard() {
    const item = queue[cur], mk = twMKey();
    if (item.isG) { renderGrammar(item, mk); return; }      // 文法点は読み上げる語が無い
    document.getElementById("quizBox").innerHTML = `
      <div class="qhd"><span>${twT("srsReviewTitle")} ${cur + 1} / ${queue.length}</span>
        <span>${item.level.toUpperCase()}・${item.isNew ? twT("srsNew") : twT("srsAgain")}</span>
        <button class="qclose" onclick="SRS.close()">✕</button></div>
      <div class="srs-card" id="srsCard" onclick="SRS.flip()">
        <div id="srsFront">
          <div class="qmain">${item.w}</div>
          <div class="qsub">${item.zy}　${item.py}</div>
          <div class="srs-hint">${twT("cardHint")}</div>
        </div>
        <div id="srsBack" style="display:none">
          <div class="qmain">${item.w}</div>
          <div class="qsub">${item.zy}　${item.py}</div>
          <div class="srs-meaning">${item.m ? (item.m[mk] || item.m.j) : (({ j:item.j, e:item.e, k:item.k }[mk]) || item.e || item.j || item.d || "")}</div>
          ${item.ex && item.ex.z
            ? `<div class="srs-ex" onclick="event.stopPropagation();speakZh('${String(item.ex.z).replace(/'/g,"\\'")}')">${item.ex.z}<span class="py">${item.ex.py}</span><span class="tr">${item.ex[mk] || item.ex.j}</span></div>`
            : (item.d && !item.m ? `<div class="srs-ex" style="cursor:default">${item.d}</div>` : "")}
          <div class="srs-btns">
            <button class="srs-btn srs-ng" onclick="event.stopPropagation();SRS.rate('unknown')">${twT("srsG3")}</button>
            <button class="srs-btn srs-mid" onclick="event.stopPropagation();SRS.rate('soso')">${twT("srsG2")}</button>
            <button class="srs-btn srs-ok" onclick="event.stopPropagation();SRS.rate('known')">${twT("srsG1")}</button>
          </div>
        </div>
      </div>`;
    speakZh(item.w); // カード表示と同時に発音（原サイトと同じ挙動）
  }

  function flip() {
    const f = document.getElementById("srsFront"), b = document.getElementById("srsBack");
    if (!f || !b) return;
    if (f.style.display !== "none") { f.style.display = "none"; b.style.display = ""; }
    else if (!queue[cur].isG) speakZh(queue[cur].w); // 裏面表示中にカードを再タップ → もう一度発音
  }

  function rate(grade) {
    const item = queue[cur];
    recordGrade(item.level || lvl, item.w, grade);
    cur++;
    if (cur >= queue.length) showDone(); else renderCard();
  }

  function showDone() {
    try{ window.STAYTW_studyDone && window.STAYTW_studyDone(); }catch(e){}
    const st = getStats(lvl);
    document.getElementById("quizBox").innerHTML = `
      <div class="qhd"><span>${twT("srsDone")}</span><button class="qclose" onclick="SRS.close()">✕</button></div>
      <div style="text-align:center;padding:26px 10px">
        <img class="il" src="images/il/03_review_clear.webp" alt="" width="130" height="130" style="width:130px;height:130px;display:block;margin:0 auto">
        <p style="margin:12px 0;color:var(--tx2)">${twT("srsToday")}: ${queue.length}</p>
        ${capped ? `<p style="margin:0 0 12px;font-size:13px;color:var(--ac);cursor:pointer" onclick="Paywall.show('srs')">${twT("srsFreeCap").replace("{n}", String((typeof Paywall !== "undefined" && Paywall.SRS_FREE_CARDS) || 10))}</p>` : ""}
        <p style="font-size:13px;color:var(--tx3)">${twT("srsLearned")} ${st.total}・${twT("srsMastered")} ${st.mastered}</p>
        <button class="btn primary" style="margin-top:16px" onclick="SRS.close()">OK</button>
      </div>`;
  }

  function close() {
    document.getElementById("quizBg").classList.remove("show");
    if (typeof updateSrsBadges === "function") updateSrsBadges();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  }

  return { start, record, recordGrade, addWord, flip, rate, close, getDueCount, getAllDue, getStats, isDue, getData, GRADES,
           addGrammar, recordGrammar, hasGrammar, isGrammarKey: isG, gKey,
           _import(d) { localStorage.setItem(KEY, JSON.stringify(d)); },
           migrateLevels };
})();
// ★重要：SRS は const 宣言なので window に自動では乗らない（TTS / STW_WEB / Paywall と同じ罠）。
//   index.html は `window.SRS && …` で参照しているため、掛けないと辞書の「復習に追加」や
//   クイズの due 優先選抜が黙って効かなくなる。
if (typeof window !== "undefined") window.SRS = SRS;
