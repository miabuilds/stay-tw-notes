// StayTW Study — 破音字（多音字）練習。台灣教育部讀音，逐字核對確保正確。
// 形式: { c:字, r:[ {zy, py, m:{j,e,k}, ex:[常見詞]} ... ] }  每個字至少 2 種讀音。
const POLYPHONE = [
  { c:"還", r:[
    { zy:"ㄏㄨㄢˊ", py:"huán", m:{ j:"返す・返却する", e:"to return / give back", k:"돌려주다" }, ex:["還錢","退還","歸還","償還"] },
    { zy:"ㄏㄞˊ", py:"hái", m:{ j:"まだ・さらに・やはり", e:"still / also / yet", k:"아직 · 또한" }, ex:["還是","還有","還沒","還好"] },
  ]},
  { c:"數", r:[
    { zy:"ㄕㄨˋ", py:"shù", m:{ j:"数・数字", e:"number", k:"수 · 숫자" }, ex:["數字","數學","次數","少數"] },
    { zy:"ㄕㄨˇ", py:"shǔ", m:{ j:"数える", e:"to count", k:"세다" }, ex:["數一數二","數錢","數不清"] },
  ]},
  { c:"樂", r:[
    { zy:"ㄌㄜˋ", py:"lè", m:{ j:"楽しい・喜び", e:"happy / joy", k:"즐겁다" }, ex:["快樂","娛樂","樂趣","歡樂"] },
    { zy:"ㄩㄝˋ", py:"yuè", m:{ j:"音楽", e:"music", k:"음악" }, ex:["音樂","樂器","樂團","樂曲"] },
  ]},
  { c:"重", r:[
    { zy:"ㄓㄨㄥˋ", py:"zhòng", m:{ j:"重い・重要", e:"heavy / important", k:"무겁다 · 중요" }, ex:["重要","重量","嚴重","尊重"] },
    { zy:"ㄔㄨㄥˊ", py:"chóng", m:{ j:"再び・繰り返す", e:"again / repeat", k:"다시 · 거듭" }, ex:["重複","重新","重來","重逢"] },
  ]},
  { c:"長", r:[
    { zy:"ㄔㄤˊ", py:"cháng", m:{ j:"長い・長さ", e:"long / length", k:"길다 · 길이" }, ex:["長度","長短","長期","擅長"] },
    { zy:"ㄓㄤˇ", py:"zhǎng", m:{ j:"育つ・年上・長(かしら)", e:"to grow / senior / chief", k:"자라다 · 어른 · 우두머리" }, ex:["長大","成長","校長","家長"] },
  ]},
  { c:"行", r:[
    { zy:"ㄒㄧㄥˊ", py:"xíng", m:{ j:"歩く・行う・OK", e:"to walk / do / OK", k:"걷다 · 하다 · 괜찮다" }, ex:["行走","旅行","流行","不行"] },
    { zy:"ㄏㄤˊ", py:"háng", m:{ j:"(業種・列)行", e:"row / trade / firm", k:"줄 · 업종 · 상점" }, ex:["銀行","行業","內行","一行"] },
  ]},
  { c:"種", r:[
    { zy:"ㄓㄨㄥˇ", py:"zhǒng", m:{ j:"種類・タネ", e:"kind / seed", k:"종류 · 씨" }, ex:["種類","一種","品種","種子"] },
    { zy:"ㄓㄨㄥˋ", py:"zhòng", m:{ j:"(作物を)植える", e:"to plant / grow", k:"심다" }, ex:["種田","種植","種菜","栽種"] },
  ]},
  { c:"差", r:[
    { zy:"ㄔㄚ", py:"chā", m:{ j:"違い・差", e:"difference", k:"차이" }, ex:["差別","差異","差距","誤差"] },
    { zy:"ㄔㄚˋ", py:"chà", m:{ j:"劣る・足りない", e:"poor / lacking", k:"떨어지다 · 모자라다" }, ex:["差不多","很差","差一點"] },
    { zy:"ㄔㄞ", py:"chāi", m:{ j:"出張・任務", e:"errand / dispatch", k:"출장 · 임무" }, ex:["出差","差事","差遣"] },
  ]},
  { c:"好", r:[
    { zy:"ㄏㄠˇ", py:"hǎo", m:{ j:"よい・大丈夫", e:"good / fine", k:"좋다" }, ex:["好的","很好","好嗎","好吃"] },
    { zy:"ㄏㄠˋ", py:"hào", m:{ j:"好む・~を好きだ", e:"to like / be fond of", k:"좋아하다 · 애호" }, ex:["愛好","嗜好","好奇","好客"] },
  ]},
  { c:"為", r:[
    { zy:"ㄨㄟˊ", py:"wéi", m:{ j:"~になる・~とする", e:"to be / to act as", k:"되다 · ~로 삼다" }, ex:["成為","認為","以為","行為"] },
    { zy:"ㄨㄟˋ", py:"wèi", m:{ j:"~のため", e:"for / because of", k:"~을 위해 · 때문에" }, ex:["因為","為了","為什麼","為此"] },
  ]},
  { c:"教", r:[
    { zy:"ㄐㄧㄠ", py:"jiāo", m:{ j:"(動詞)教える", e:"to teach (verb)", k:"가르치다" }, ex:["教書","教中文","教我"] },
    { zy:"ㄐㄧㄠˋ", py:"jiào", m:{ j:"教育・宗教(名詞)", e:"education / religion (noun)", k:"교육 · 종교" }, ex:["教育","教室","宗教","教練"] },
  ]},
  { c:"中", r:[
    { zy:"ㄓㄨㄥ", py:"zhōng", m:{ j:"真ん中・中", e:"middle / center", k:"가운데 · 중" }, ex:["中間","中國","中午","中文"] },
    { zy:"ㄓㄨㄥˋ", py:"zhòng", m:{ j:"当たる・命中", e:"to hit / win", k:"맞히다 · 당첨" }, ex:["中獎","中毒","命中","中風"] },
  ]},
  { c:"傳", r:[
    { zy:"ㄔㄨㄢˊ", py:"chuán", m:{ j:"伝える・伝わる", e:"to pass on / spread", k:"전하다 · 퍼지다" }, ex:["傳統","傳說","宣傳","傳達"] },
    { zy:"ㄓㄨㄢˋ", py:"zhuàn", m:{ j:"伝記", e:"biography", k:"전기(傳記)" }, ex:["傳記","自傳","列傳"] },
  ]},
  { c:"曲", r:[
    { zy:"ㄑㄩ", py:"qū", m:{ j:"曲がる・曲がっている", e:"bent / crooked", k:"굽다 · 구부러지다" }, ex:["彎曲","曲折","曲線","扭曲"] },
    { zy:"ㄑㄩˇ", py:"qǔ", m:{ j:"曲・歌", e:"song / tune", k:"곡 · 노래" }, ex:["歌曲","樂曲","作曲","曲子"] },
  ]},
  { c:"假", r:[
    { zy:"ㄐㄧㄚˇ", py:"jiǎ", m:{ j:"偽の・仮の", e:"false / fake", k:"거짓 · 가짜" }, ex:["假的","真假","假裝","假設"] },
    { zy:"ㄐㄧㄚˋ", py:"jià", m:{ j:"休み・休暇", e:"holiday / leave", k:"휴가 · 방학" }, ex:["放假","請假","假期","暑假"] },
  ]},
  { c:"空", r:[
    { zy:"ㄎㄨㄥ", py:"kōng", m:{ j:"空(そら)・空っぽ", e:"sky / empty", k:"하늘 · 비다" }, ex:["空氣","天空","空間","太空"] },
    { zy:"ㄎㄨㄥˋ", py:"kòng", m:{ j:"空き・暇", e:"free time / vacancy", k:"틈 · 여가" }, ex:["有空","空閒","空位","抽空"] },
  ]},
  { c:"少", r:[
    { zy:"ㄕㄠˇ", py:"shǎo", m:{ j:"少ない・減らす", e:"few / less", k:"적다 · 줄이다" }, ex:["少冰","少一點","減少","不少"] },
    { zy:"ㄕㄠˋ", py:"shào", m:{ j:"若い", e:"young", k:"젊다" }, ex:["少年","少女","少爺"] },
  ]},
  { c:"得", r:[
    { zy:"ㄉㄜˊ", py:"dé", m:{ j:"得る", e:"to obtain", k:"얻다" }, ex:["得到","獲得","得意"] },
    { zy:"ㄉㄟˇ", py:"děi", m:{ j:"~しなければならない", e:"must / have to", k:"~해야 한다" }, ex:["得走了","得去","總得"] },
    { zy:"˙ㄉㄜ", py:"de", m:{ j:"(助詞)動作の程度", e:"(particle) degree", k:"(조사)" }, ex:["跑得快","做得好"] },
  ]},
  { c:"便", r:[
    { zy:"ㄅㄧㄢˋ", py:"biàn", m:{ j:"便利・~するとすぐ", e:"convenient", k:"편리 · 곧" }, ex:["方便","便利","便當","隨便"] },
    { zy:"ㄆㄧㄢˊ", py:"pián", m:{ j:"(便宜=)安い", e:"cheap (便宜)", k:"싸다(便宜)" }, ex:["便宜"] },
  ]},
  { c:"分", r:[
    { zy:"ㄈㄣ", py:"fēn", m:{ j:"分ける・分(時間/点)", e:"to divide / minute / point", k:"나누다 · 분 · 점" }, ex:["分鐘","十分","分開","分數"] },
    { zy:"ㄈㄣˋ", py:"fèn", m:{ j:"分・身分・縁", e:"share / status / bond", k:"몫 · 신분 · 인연" }, ex:["身分","部分","緣分","水分"] },
  ]},
  { c:"相", r:[
    { zy:"ㄒㄧㄤ", py:"xiāng", m:{ j:"互いに・相", e:"mutual / each other", k:"서로 · 상" }, ex:["互相","相同","相信","相關"] },
    { zy:"ㄒㄧㄤˋ", py:"xiàng", m:{ j:"写真・姿", e:"photo / appearance", k:"사진 · 모습" }, ex:["照相","相片","長相","相機"] },
  ]},
  { c:"都", r:[
    { zy:"ㄉㄡ", py:"dōu", m:{ j:"すべて・みんな", e:"all / both", k:"모두 · 다" }, ex:["都是","都有","全都"] },
    { zy:"ㄉㄨ", py:"dū", m:{ j:"みやこ・都市", e:"capital / metropolis", k:"수도 · 도시" }, ex:["首都","都市"] },
  ]},
  { c:"覺", r:[
    { zy:"ㄐㄩㄝˊ", py:"jué", m:{ j:"感じる・~と思う", e:"to feel / sense", k:"느끼다" }, ex:["覺得","感覺","發覺","知覺"] },
    { zy:"ㄐㄧㄠˋ", py:"jiào", m:{ j:"眠り(睡覺)", e:"sleep (睡覺)", k:"잠(睡覺)" }, ex:["睡覺","午覺"] },
  ]},
  { c:"調", r:[
    { zy:"ㄉㄧㄠˋ", py:"diào", m:{ j:"調子・(異動)調べる", e:"tune / to investigate / transfer", k:"가락 · 조사" }, ex:["音調","聲調","調查","強調"] },
    { zy:"ㄊㄧㄠˊ", py:"tiáo", m:{ j:"整える・調整", e:"to adjust / mix", k:"조절하다" }, ex:["調整","調節","協調","空調"] },
  ]},
  { c:"難", r:[
    { zy:"ㄋㄢˊ", py:"nán", m:{ j:"難しい", e:"difficult", k:"어렵다" }, ex:["困難","難過","難得","很難"] },
    { zy:"ㄋㄢˋ", py:"nàn", m:{ j:"災難・被災", e:"disaster / trouble", k:"재난" }, ex:["災難","難民","苦難"] },
  ]},
];
if (typeof window !== "undefined") window.POLYPHONE = POLYPHONE;

// ── 練習模組 ──
const POLY = (() => {
  let deck = [], qi = 0, score = 0, total = 0;
  const box = () => document.getElementById("polyBox");
  const shuf = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);

  function home() {
    box().innerHTML = `<div class="poly-home">
      <div class="poly-hero">破</div>
      <h2 class="poly-h">${twT("polyTitle")}</h2>
      <p class="poly-sub">${twT("polySub")}</p>
      <button class="btn primary" onclick="POLY.start()">${twT("polyStart")}</button>
      ${(typeof WrongBook!=="undefined" && WrongBook.forLevel("poly").length) ? `<div><button class="wb-link" onclick="openWrongBook('poly')">📕 ${twT("wbReview")} (${WrongBook.forLevel("poly").length})</button></div>` : ""}
    </div>`;
  }
  function render() { home(); }

  function start() {
    // 每題:挑一個字、挑一個讀音、用該讀音的一個常見詞出題
    const items = shuf(POLYPHONE.filter(p => p.r.length >= 2)).slice(0, 12).map(p => {
      const ri = Math.floor(Math.random() * p.r.length);
      const word = p.r[ri].ex[Math.floor(Math.random() * p.r[ri].ex.length)];
      return { p, ri, word, opts: shuf(p.r.map((r, i) => i)) };
    });
    deck = items; qi = 0; score = 0; total = items.length;
    q();
  }
  function q() {
    if (qi >= deck.length) return done();
    const it = deck[qi], p = it.p;
    const wordHtml = it.word.split("").map(ch => ch === p.c ? `<b class="poly-hi">${ch}</b>` : ch).join("");
    box().innerHTML = `<div class="aq-wrap">
      <div style="font-size:13px;color:var(--tx3)">${qi+1} / ${deck.length}　✓ ${score}</div>
      <div class="poly-word" onclick="POLY.say('${it.word}')">${wordHtml} <button class="tts-btn" style="width:30px;height:30px;font-size:13px" onclick="event.stopPropagation();POLY.say('${it.word}')">🔊</button></div>
      <div class="ex-prompt">${twT("polyAsk").replace("%c", p.c)}</div>
      <div class="qz-opts zy" id="polyOpts">${it.opts.map(oi => `<button class="qz-opt" data-i="${oi}" data-ok="${oi===it.ri}" onclick="POLY.answer(${oi})">${p.r[oi].zy}</button>`).join("")}</div>
      <div id="polyFb"></div></div>`;
  }
  function answer(oi) {
    const it = deck[qi], p = it.p, mk = twMKey(), ok = oi === it.ri;
    document.querySelectorAll("#polyOpts .qz-opt").forEach(b => { b.disabled = true; if (b.dataset.ok === "true") b.classList.add("ok"); });
    if (ok) score++;
    else {
      document.querySelectorAll("#polyOpts .qz-opt")[it.opts.indexOf(oi)].classList.add("ng");
      if (typeof WrongBook !== "undefined") WrongBook.add({ type: "poly", lv: "poly", word: it.word, q: it.word, correct: p.c + "＝" + p.r[it.ri].zy + "（" + p.r[it.ri].py + "）", detail: (p.r[it.ri].m[mk] || p.r[it.ri].m.j) });
    }
    // 詳解:列出這個字的所有讀音 + 例詞 + 🔊
    const rows = p.r.map((r, i) => `<div class="poly-r ${i===it.ri?'cur':''}">
      <div class="poly-r-h"><b>${r.zy}</b> <span style="color:var(--tx3)">${r.py}</span> — ${r.m[mk] || r.m.j}</div>
      <div class="poly-r-ex">${r.ex.map(w => `<button class="poly-ex" onclick="POLY.say('${w}')">${w} 🔊</button>`).join("")}</div></div>`).join("");
    document.getElementById("polyFb").innerHTML = `<div class="qz-fb ${ok?'ok':'ng'}">
      <div style="font-weight:700;font-size:15px">${ok ? "⭕ "+twT("qzRight") : "❌ "+twT("qzWrong")}</div>
      <div style="margin:8px 0 4px">${twT("polyIn").replace("%w", it.word)}<b style="font-size:20px">${p.c}</b> ＝ <b style="font-size:20px;color:var(--ac)">${p.r[it.ri].zy}</b>（${p.r[it.ri].py}）</div>
      <div style="text-align:left;margin-top:10px">${rows}</div>
      <div style="margin-top:14px"><button class="btn primary" onclick="POLY.next()">${twT("quizNext")} ›</button></div></div>`;
    say(it.word);
  }
  function next() { qi++; q(); }
  function done() {
    const nWrong = (typeof WrongBook !== "undefined") ? WrongBook.forLevel("poly").length : 0;
    box().innerHTML = `<div class="aq-wrap"><p style="color:var(--tx2);margin:26px 0 8px">${twT("quizDone")}</p>
      <div class="qz-big">${score} / ${total}</div>
      <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn primary" onclick="POLY.start()">${twT("quizRetry")}</button>
        <button class="btn" onclick="POLY.render()">${twT("startOver")||"OK"}</button></div>
      ${nWrong?`<div><button class="wb-link" onclick="openWrongBook('poly')">📕 ${twT("wbReview")} (${nWrong})</button></div>`:""}</div>`;
  }
  // 破音字要唸對:走已修正的 /api/tts(Google+破音字phoneme);失敗退回瀏覽器音。
  let _pa = null;
  async function say(w) {
    try {
      const r = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: w }) });
      if (r.ok) { const d = await r.json(); if (d.audio) { if (!_pa) _pa = new Audio(); _pa.src = "data:audio/mp3;base64," + d.audio; _pa.play().catch(() => { if (typeof speakZh === "function") speakZh(w); }); return; } }
    } catch (e) {}
    if (typeof speakZh === "function") speakZh(w);
  }
  return { render, home, start, q, answer, next, say };
})();
if (typeof window !== "undefined") window.POLY = POLY;
