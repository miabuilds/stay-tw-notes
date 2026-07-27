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
    const entries = Object.entries(d).filter(([x]) => x.startsWith(pf));
    return {
      total: entries.length,
      due: entries.filter(([, v]) => isDue(v, now)).length,
      mastered: entries.filter(([, v]) => v.interval >= 21).length,
      learning: entries.filter(([, v]) => v.interval > 0 && v.interval < 21).length
    };
  }

  // ===== 復習セッション（モーダル） =====
  let queue = [], cur = 0, lvl = "l1";

  function start(level) {
    lvl = level || (typeof currentLevel !== "undefined" ? currentLevel : "l1");
    const allDue = getAllDue();
    const nw = getNew(lvl, 10);
    queue = [];
    allDue.forEach(x => {
      const v = (getVocabData(x.level) || []).find(w => w.w === x.word);
      if (v) queue.push({ ...v, level: x.level, isNew: false });
    });
    nw.forEach(v => queue.push({ ...v, level: lvl, isNew: true }));
    if (!queue.length) { alert(twT("srsNoReview")); return; }
    cur = 0;
    renderCard();
    document.getElementById("quizBg").classList.add("show");
  }

  function renderCard() {
    const item = queue[cur], mk = twMKey();
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
          <div class="srs-meaning">${item.m[mk] || item.m.j}</div>
          <div class="srs-ex" onclick="event.stopPropagation();speakZh('${item.ex.z}')">${item.ex.z}<span class="py">${item.ex.py}</span><span class="tr">${item.ex[mk] || item.ex.j}</span></div>
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
    else speakZh(queue[cur].w); // 裏面表示中にカードを再タップ → もう一度発音
  }

  function rate(grade) {
    const item = queue[cur];
    recordGrade(item.level || lvl, item.w, grade);
    cur++;
    if (cur >= queue.length) showDone(); else renderCard();
  }

  function showDone() {
    const st = getStats(lvl);
    document.getElementById("quizBox").innerHTML = `
      <div class="qhd"><span>${twT("srsDone")}</span><button class="qclose" onclick="SRS.close()">✕</button></div>
      <div style="text-align:center;padding:26px 10px">
        <div style="font-size:44px">🎉</div>
        <p style="margin:12px 0;color:var(--tx2)">${twT("srsToday")}: ${queue.length}</p>
        <p style="font-size:13px;color:var(--tx3)">${twT("srsLearned")} ${st.total}・${twT("srsMastered")} ${st.mastered}</p>
        <button class="btn primary" style="margin-top:16px" onclick="SRS.close()">OK</button>
      </div>`;
  }

  function close() {
    document.getElementById("quizBg").classList.remove("show");
    if (typeof updateSrsBadges === "function") updateSrsBadges();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  }

  return { start, record, recordGrade, flip, rate, close, getDueCount, getAllDue, getStats, isDue, getData, GRADES,
           _import(d) { localStorage.setItem(KEY, JSON.stringify(d)); } };
})();
