// StayTW Study — 模擬試験（StayJP Study の mock-exam.js と同じ構成の TOCFL 風ミニ模試）
// 構成: 詞彙 8問 → 語法 6問 → 閱讀 2〜3問 / 制限時間つき / 結果は stw_exam_history に保存
// 間違えた単語は SRS に「不正解」として記録 → 復習キューに自動で入る
const MockExam = (() => {
  // ── 閱讀 題庫（レベル別・本文も設問も中国語 = 本試験と同じ形式）──
  const PASSAGES = {
    l1: [
      {text:"我叫小美，我是學生。我家有四個人：爸爸、媽媽、哥哥和我。爸爸是醫生，媽媽是老師。",q:"小美的媽媽做什麼工作？",opts:["醫生","老師","學生","工程師"],ans:1},
      {text:"今天天氣很好。我和朋友去夜市。我們吃了小籠包，還喝了珍珠奶茶。東西很好吃，可是人很多。",q:"他們在夜市做了什麼？",opts:["買衣服","看電影","吃東西","唱歌"],ans:2},
      {text:"我每天早上七點起床，坐捷運去公司。捷運站離我家很近，走路五分鐘就到了。",q:"他怎麼去公司？",opts:["開車","坐捷運","坐公車","騎機車"],ans:1},
      {text:"這是我的貓，牠叫小黑。小黑今年三歲，最喜歡吃魚。牠每天都睡很久。",q:"小黑最喜歡吃什麼？",opts:["飯","魚","水果","麵"],ans:1},
      {text:"下星期六是媽媽的生日。我想買一個蛋糕，晚上大家一起吃飯。",q:"下星期六是誰的生日？",opts:["爸爸","媽媽","哥哥","我"],ans:1},
    ],
    l2: [
      {text:"小林上個月搬家了。新房子離捷運站很近，房租也不貴，可是房間有一點小。他打算買一個小一點的桌子。",q:"新房子有什麼問題？",opts:["房租太貴","離捷運站太遠","房間有一點小","沒有冷氣"],ans:2},
      {text:"明天有颱風，公司通知大家不用上班。小王本來要和朋友去爬山，現在只好在家休息。他覺得有一點無聊。",q:"小王明天為什麼不去爬山？",opts:["他要上班","因為颱風","他生病了","朋友沒空"],ans:1},
      {text:"台灣的垃圾車會放音樂。聽到音樂，大家就把垃圾拿出來，等垃圾車來。第一次看到的外國人都覺得很有趣。",q:"聽到垃圾車的音樂，大家會做什麼？",opts:["開始唱歌","把垃圾拿出來","關窗戶","去買冰淇淋"],ans:1},
      {text:"小美感冒了，頭很痛，還有一點發燒。她去藥局買藥，藥師說要多喝水、早點睡覺。",q:"藥師建議小美做什麼？",opts:["多運動","多喝水、早點睡覺","去旅行","吃冰"],ans:1},
      {text:"我家附近新開了一家早餐店，蛋餅特別好吃，而且不貴。現在我每天上班以前都會去買。",q:"他為什麼每天去那家早餐店？",opts:["離公司很近","蛋餅好吃又不貴","老闆是他朋友","只有那一家店"],ans:1},
    ],
    l3: [
      {text:"很多公司開始讓員工在家工作。有人覺得在家工作很方便，不用花時間通勤；可是也有人覺得在家容易分心，工作效率反而變差。",q:"反對在家工作的人的理由是什麼？",opts:["通勤太累","容易分心","薪水變少","沒有網路"],ans:1},
      {text:"小陳最近壓力很大，常常熬夜加班，連週末都要開會。醫生建議他多運動、早點睡覺，不要把工作帶回家。",q:"醫生沒有建議哪一件事？",opts:["多運動","早點睡覺","換工作","不要把工作帶回家"],ans:2},
      {text:"在台灣租房子，除了房租以外，通常還要付兩個月的押金。簽約以前，最好先確認冷氣、熱水器這些設備能不能正常使用，以免之後和房東發生糾紛。",q:"這段話主要在提醒什麼？",opts:["房租越便宜越好","簽約前要確認設備","押金不用付","要跟房東當朋友"],ans:1},
      {text:"台灣的便利商店什麼都能做：繳水電費、取包裹、買高鐵票，甚至還能影印。對外國人來說，只要學會幾句中文，生活就會方便很多。",q:"這段話主要在說什麼？",opts:["便利商店的東西很貴","便利商店功能很多，生活很方便","外國人不需要學中文","高鐵票很難買"],ans:1},
      {text:"小林第一次參加公司的尾牙。同事告訴他，尾牙就是年底公司請大家吃飯，還會抽獎。聽說今年的大獎是一台機車，大家都很期待。",q:"關於尾牙，哪一個是對的？",opts:["是年初的活動","只有主管參加","會請大家吃飯和抽獎","大獎是一台電腦"],ans:2},
    ],
    l4: [
      {text:"根據調查，台灣的少子化問題越來越嚴重，去年的出生人數再創新低。專家指出，高房價與低薪資是年輕人不敢生小孩的主要原因，政府雖然推出多項補助政策，效果卻相當有限。",q:"專家認為少子化的主要原因是什麼？",opts:["教育程度提高","高房價與低薪資","醫療資源不足","補助政策太多"],ans:1},
      {text:"隨著環保意識抬頭，越來越多店家不再提供免費塑膠袋，民眾也逐漸習慣自備購物袋。研究顯示，這項政策實施後，塑膠袋的使用量大幅減少，對環境的負擔明顯降低。",q:"這段話的主旨是什麼？",opts:["塑膠袋越來越便宜","環保政策產生了效果","店家生意變差","民眾反對新政策"],ans:1},
      {text:"報導指出，隨著遠距工作普及，台北市中心的辦公室空置率逐漸上升，部分企業改採混合辦公模式，以降低租金成本。專家認為，這個趨勢短期內不會改變。",q:"企業採用混合辦公的目的是什麼？",opts:["提高員工薪資","降低租金成本","增加辦公空間","吸引外國人才"],ans:1},
      {text:"調查顯示，超過六成的民眾支持延長超商的垃圾代收服務。不過也有學者提醒，垃圾處理成本不應該完全轉嫁給業者，政府應該提出配套措施。",q:"學者的觀點是什麼？",opts:["應該取消這項服務","成本不應全由業者承擔","民眾不支持這項政策","超商應該漲價"],ans:1},
    ],
    l5: [
      {text:"有學者認為，語言不僅是溝通的工具，更承載著一個族群的歷史與價值觀。倘若一種語言消失，隨之而去的往往是整個文化的記憶。因此，母語的傳承與其說是語言問題，不如說是文化認同的課題。",q:"作者認為母語傳承的本質是什麼？",opts:["溝通技巧的訓練","文化認同的課題","教育資源的分配","觀光產業的需求"],ans:1},
      {text:"企業在追求利潤之餘，勢必得兼顧社會責任。消費者的價值觀已然改變：一個品牌倘若忽視環境與勞工權益，縱使產品再優秀，也難以獲得長期的信任。",q:"這段話認為品牌要獲得長期信任，關鍵是什麼？",opts:["產品夠優秀","價格夠便宜","兼顧社會責任","廣告做得好"],ans:2},
      {text:"所謂「無現金社會」，在台灣的推行始終不如預期。學者分析，這固然與民眾的使用習慣有關，但更深層的原因在於小型店家對手續費的顧慮，以及部分消費者對個資外洩的疑慮。",q:"根據本文，推行不順的原因不包括哪一項？",opts:["店家在意手續費","消費者擔心個資外洩","民眾的使用習慣","政府全面禁止行動支付"],ans:3},
      {text:"文化評論者指出，台灣的夜市不僅是飲食場所，更承載著庶民生活的集體記憶。倘若只以衛生或市容的角度看待夜市，未免忽略了其作為文化資產的價值。",q:"作者對夜市的看法是什麼？",opts:["應該全面改建","只是吃東西的地方","是有文化價值的庶民空間","衛生問題比文化重要"],ans:2},
    ],
  };
  const TIME_LIMIT = { l1: 10, l2: 10, l3: 12, l4: 15, l5: 15 }; // 分

  let lvl = "l1", questions = [], cur = 0, score = 0, wrongs = [], deadline = 0, timerId = null, active = false;

  const shuf = a => [...a].sort(() => Math.random() - .5);

  function buildQuestions(level) {
    const vocab = getVocabData(level) || [];
    const grammar = getGrammarData(level) || [];
    const mk = twMKey();
    const qs = [];
    // ① 聽力：例文を音声で聞いて意味を選ぶ（本文は見せない = TOCFL と同じ聴解形式）
    shuf(vocab).slice(0, 4).forEach(w => {
      const wrongOpts = shuf(vocab.filter(v => v.w !== w.w)).slice(0, 3);
      const opts = shuf([w, ...wrongOpts]);
      qs.push({ sec: "listen", audio: w.ex.z, word: w,
        opts: opts.map(o => o.ex[mk] || o.ex.j), ans: opts.indexOf(w) });
    });
    // ② 詞彙：単語 → 意味 4択
    shuf(vocab).slice(0, 8).forEach(w => {
      const wrongOpts = shuf(vocab.filter(v => v.w !== w.w)).slice(0, 3);
      const opts = shuf([w, ...wrongOpts]);
      qs.push({ sec: "vocab", stem: w.w, sub: "", word: w,
        opts: opts.map(o => o.m[mk] || o.m.j), ans: opts.indexOf(w) });
    });
    // ② 語法：例文の <em>…</em> を空欄に → 正しい語を選ぶ
    const egs = [];
    grammar.forEach(g => g.eg.forEach(e => {
      const m = e.z.match(/<em>(.+?)<\/em>/g);
      if (m && m.length === 1) egs.push({ g, e, key: m[0].replace(/<\/?em>/g, "") });
    }));
    shuf(egs).slice(0, 6).forEach(({ g, e, key }) => {
      const pool = shuf(egs.filter(x => x.key !== key)).slice(0, 3).map(x => x.key);
      const opts = shuf([key, ...pool]);
      qs.push({ sec: "grammar", stem: e.z.replace(/<em>.+?<\/em>/, "（　　）"), sub: e.py ? "" : "",
        opts, ans: opts.indexOf(key), gid: g.id });
    });
    // ③ 閱讀
    shuf(PASSAGES[level] || PASSAGES.l1).slice(0, level === "l1" || level === "l2" ? 2 : 2).forEach(p => {
      qs.push({ sec: "read", stem: p.q, passage: p.text, opts: p.opts, ans: p.ans });
    });
    return qs;
  }

  function start(level) {
    lvl = level || (typeof currentLevel !== "undefined" ? currentLevel : "l1");
    questions = buildQuestions(lvl);
    cur = 0; score = 0; wrongs = []; active = true;
    deadline = Date.now() + TIME_LIMIT[lvl] * 60 * 1000;
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
    render();
  }

  function tick() {
    const el = document.getElementById("exTimer");
    const left = deadline - Date.now();
    if (left <= 0) { finish(true); return; }
    if (el) {
      const m = Math.floor(left / 60000), s = Math.floor(left % 60000 / 1000);
      el.textContent = `⏱ ${m}:${String(s).padStart(2, "0")}`;
      if (left < 60000) el.style.color = "var(--ac)";
    }
  }

  const SEC_LABEL = () => ({ listen: twT("exSecListen"), vocab: twT("exSecVocab"), grammar: twT("exSecGrammar"), read: twT("exSecRead") });

  function render() {
    const box = document.getElementById("examBox");
    if (!box) return;
    const q = questions[cur];
    box.innerHTML = `
      <div class="ex-top">
        <span class="ex-sec">${SEC_LABEL()[q.sec]}</span>
        <span style="color:var(--tx3);font-size:13px">${cur + 1} / ${questions.length}</span>
        <span id="exTimer" style="font-weight:700;font-size:14px;margin-left:auto"></span>
        <button class="btn" style="padding:4px 12px;font-size:12px" onclick="MockExam.quit()">✕</button>
      </div>
      ${q.passage ? `<div class="ex-passage" onclick="speakZh(this.textContent)">${q.passage}</div>` : ""}
      ${q.sec === "listen"
        ? `<div class="ex-listen">
             <button class="ex-play" onclick="speakZh(this.dataset.z)" data-z="${q.audio}">🔊</button>
             <div style="font-size:13px;color:var(--tx3);margin-top:8px">${twT("exListenHint")}</div>
           </div>`
        : `<div class="ex-stem ${q.sec === "vocab" ? "big" : ""}" ${q.sec !== "grammar" ? `onclick="speakZh('${q.stem.replace(/（　　）/g, "")}')"` : ""}>${q.stem}</div>`}
      <div class="qz-opts">${q.opts.map((o, i) =>
        `<button class="qz-opt" data-i="${i}" onclick="MockExam.answer(${i})">${"ABCD"[i]}. ${o}</button>`).join("")}
      </div>`;
    tick();
    if (q.sec === "listen") setTimeout(() => speakZh(q.audio), 300); // 出題と同時に1回再生
  }

  function answer(i) {
    const q = questions[cur];
    const ok = i === q.ans;
    document.querySelectorAll("#examBox .qz-opt").forEach(b => {
      b.disabled = true;
      if (+b.dataset.i === q.ans) b.classList.add("ok");
    });
    if (!ok) document.querySelector(`#examBox .qz-opt[data-i="${i}"]`)?.classList.add("ng");
    if (ok) score++; else wrongs.push(q);
    if (q.word) SRS.record(lvl, q.word.w, ok); // 模試（聽力・詞彙）の結果を SRS に反映
    setTimeout(() => { cur++; cur >= questions.length ? finish(false) : render(); }, ok ? 600 : 1500);
  }

  function finish(timeout) {
    clearInterval(timerId);
    if (!active) return;
    active = false;
    const total = questions.length;
    const pct = Math.round(score / total * 100);
    // 学習履歴に保存（クラウド同期の対象）
    try {
      const h = JSON.parse(localStorage.getItem("stw_exam_history") || "[]");
      h.push({ ts: Date.now(), level: lvl, score, total });
      localStorage.setItem("stw_exam_history", JSON.stringify(h.slice(-100)));
      if (typeof window.onSRSChange === "function") window.onSRSChange();
    } catch (e) {}
    const mk = twMKey();
    const box = document.getElementById("examBox");
    box.innerHTML = `
      <div style="text-align:center;padding:20px 0">
        ${timeout ? `<p style="color:var(--ac);font-weight:700">${twT("exTimeUp")}</p>` : ""}
        <div style="font-size:15px;color:var(--tx2);margin-top:8px">${lvl.toUpperCase()} ${twT("exResult")}</div>
        <div class="qz-big">${score} / ${total}</div>
        <div style="font-size:14px;color:${pct >= 70 ? "#2F7A5D" : "var(--ac)"};font-weight:700;margin:6px 0 18px">${pct}%　${pct >= 70 ? twT("exPass") : twT("exKeepGoing")}</div>
        ${wrongs.length ? `<div style="text-align:left;max-width:520px;margin:0 auto;border-top:1px solid var(--line);padding-top:14px">
          <div style="font-size:13px;color:var(--tx3);margin-bottom:8px">${twT("exWrongList")}</div>
          ${wrongs.map(q => `<div style="font-size:14px;padding:6px 0;border-bottom:1px dashed var(--line)">
            ${q.sec === "listen" ? `🎧 <b onclick="speakZh('${q.audio}')" style="cursor:pointer">${q.audio}</b><br><span style="color:var(--tx2)">${q.word.ex[mk] || q.word.ex.j}</span>`
              : q.sec === "vocab" ? `<b>${q.stem}</b>（${q.word.zy}｜${q.word.py}）— ${q.word.m[mk] || q.word.m.j}`
              : q.sec === "grammar" ? q.stem.replace("（　　）", `<b style="color:var(--ac)">${q.opts[q.ans]}</b>`)
              : `${q.stem}<br>→ <b style="color:var(--ac)">${q.opts[q.ans]}</b>`}
          </div>`).join("")}</div>` : ""}
        <div style="margin-top:22px;display:flex;gap:10px;justify-content:center">
          <button class="btn primary" onclick="Paywall.gate('exam',()=>MockExam.start('${lvl}'))">${twT("quizRetry")}</button>
          <button class="btn" onclick="MockExam.quit()">OK</button>
        </div>
      </div>`;
    if (typeof updateSrsBadges === "function") updateSrsBadges();
    if (typeof renderExamHome === "function") return; // quit() で戻る
  }

  function quit() {
    clearInterval(timerId);
    active = false;
    if (typeof renderExamHome === "function") renderExamHome();
  }

  function history() {
    try { return JSON.parse(localStorage.getItem("stw_exam_history") || "[]"); } catch (e) { return []; }
  }

  return { start, answer, quit, finish, history,
           _import(h) { localStorage.setItem("stw_exam_history", JSON.stringify(h)); } };
})();
