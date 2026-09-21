/* StayTW — 每日打卡 + 今日運勢（台灣農民曆風）
 *
 * ・打卡は「来た」だけの記録。学習の連続日数（stw_streak）とは別物にして混ぜない。
 *   ここは累計（何日ぶん打卡したか）を見せる。連続を二つ並べると意味が分からなくなる。
 * ・宜／忌の注音は 1 語ずつ萌典（教育部）で確認して固定値で持っている。
 *   サイトの辞書をそのまま合成すると「滑＝ㄍㄨˇ」「排＝ㄆㄞˇ」のような罕用義を拾うので、
 *   項目を足すときは必ず萌典で読みを確認してから zy に書くこと。推測で足さない。
 * ・同じ日に何度開いても結果は変わらない（日付＋端末シードで決定的に選ぶ）。
 */
const Fortune = (() => {
  const K_DAYS = "stw_checkin";      // 打卡した日 ["2026-09-21", ...]
  const K_SEED = "stw_seed";         // 端末ごとの種。全員が同じ運勢だと白ける

  // ── 運勢のランク。凶は入れない（朝いちで人の気分を下げる機能に価値はない）──
  const RANKS = [
    { k: "daji",  z: "大吉", w: 12 },
    { k: "zhong", z: "中吉", w: 22 },
    { k: "xiao",  z: "小吉", w: 30 },
    { k: "ji",    z: "吉",   w: 24 },
    { k: "mo",    z: "末吉", w: 12 },
  ];

  // ── 宜（するといい）。台湾の日常そのもの ──
  const YI = [
    { z: "喝珍奶", zy: "ㄏㄜ ㄓㄣ ㄋㄞˇ",     j: "タピオカミルクティーを飲む", e: "get bubble tea",              k: "버블티 마시기",        v: "uống trà sữa trân châu", i: "minum bubble tea" },
    { z: "吃雞排", zy: "ㄔ ㄐㄧ ㄆㄞˊ",     j: "大鶏排（ジーパイ）を食べる", e: "eat fried chicken cutlet",     k: "지파이 먹기",          v: "ăn gà rán Đài Loan",     i: "makan ayam goreng Taiwan" },
    { z: "逛夜市", zy: "ㄍㄨㄤˋ ㄧㄝˋ ㄕˋ",     j: "夜市をぶらつく",             e: "wander a night market",        k: "야시장 구경하기",      v: "đi chợ đêm",             i: "jalan-jalan ke pasar malam" },
    { z: "對發票", zy: "ㄉㄨㄟˋ ㄈㄚ ㄆㄧㄠˋ",     j: "レシート宝くじを確認する",   e: "check your receipt lottery",   k: "영수증 복권 확인하기", v: "dò số hóa đơn",          i: "cek undian struk" },
    { z: "吃滷肉飯", zy: "ㄔ ㄌㄨˇ ㄖㄡˋ ㄈㄢˋ",   j: "ルーローハンを食べる",       e: "eat braised pork rice",        k: "루로우판 먹기",        v: "ăn cơm thịt kho",        i: "makan nasi babi kecap" },
    { z: "搭捷運", zy: "ㄉㄚ ㄐㄧㄝˊ ㄩㄣˋ",     j: "MRT に乗る",                 e: "ride the MRT",                 k: "MRT 타기",             v: "đi tàu điện MRT",        i: "naik MRT" },
    { z: "去便利商店", zy: "ㄑㄩˋ ㄅㄧㄢˋ ㄌㄧˋ ㄕㄤ ㄉㄧㄢˋ", j: "コンビニに寄る",             e: "stop by a convenience store",  k: "편의점 들르기",        v: "ghé cửa hàng tiện lợi",  i: "mampir ke minimarket" },
    { z: "吃火鍋", zy: "ㄔ ㄏㄨㄛˇ ㄍㄨㄛ",     j: "火鍋を食べる",               e: "have hot pot",                 k: "훠궈 먹기",            v: "ăn lẩu",                 i: "makan hot pot" },
    { z: "喝手搖", zy: "ㄏㄜ ㄕㄡˇ ㄧㄠˊ",     j: "テイクアウトのドリンクを買う", e: "grab a hand-shaken drink",   k: "음료 사 마시기",       v: "mua trà pha tay",        i: "beli minuman kocok" },
    { z: "去拜拜", zy: "ㄑㄩˋ ㄅㄞˋ ˙ㄅㄞ",     j: "お参りに行く",               e: "visit a temple",               k: "사원에 참배하러 가기", v: "đi lễ chùa",             i: "pergi sembahyang" },
    { z: "早點睡", zy: "ㄗㄠˇ ㄉㄧㄢˇ ㄕㄨㄟˋ",     j: "早めに寝る",                 e: "go to bed early",              k: "일찍 자기",            v: "đi ngủ sớm",             i: "tidur lebih awal" },
    { z: "傳訊息給朋友", zy: "ㄔㄨㄢˊ ㄒㄩㄣˋ ㄒㄧˊ ㄍㄟˇ ㄆㄥˊ ㄧㄡˇ", j: "友達にメッセージを送る",   e: "message a friend",             k: "친구에게 연락하기",    v: "nhắn tin cho bạn",       i: "kirim pesan ke teman" },
    { z: "散步", zy: "ㄙㄢˋ ㄅㄨˋ",       j: "散歩する",                   e: "take a walk",                  k: "산책하기",             v: "đi dạo",                 i: "jalan kaki santai" },
    { z: "吃早餐店", zy: "ㄔ ㄗㄠˇ ㄘㄢ ㄉㄧㄢˋ",   j: "台湾式の朝ごはん屋に行く",   e: "hit a breakfast shop",         k: "아침식사 가게 가기",   v: "ăn tiệm điểm tâm",       i: "sarapan di kedai" },
    { z: "多喝水", zy: "ㄉㄨㄛ ㄏㄜ ㄕㄨㄟˇ",     j: "水をたくさん飲む",           e: "drink more water",             k: "물 많이 마시기",       v: "uống nhiều nước",        i: "banyak minum air" },
    { z: "背新單字", zy: "ㄅㄟˋ ㄒㄧㄣ ㄉㄢ ㄗˋ",   j: "新しい単語を覚える",         e: "learn new words",              k: "새 단어 외우기",       v: "học từ mới",             i: "hafal kata baru" },
  ];

  // ── 忌（やめといた方がいい）──
  const JI = [
    { z: "熬夜", zy: "ㄠˊ ㄧㄝˋ",       j: "夜更かし",                 e: "staying up late",            k: "밤새우기",            v: "thức khuya",              i: "begadang" },
        { z: "忘記帶傘", zy: "ㄨㄤˋ ㄐㄧˋ ㄉㄞˋ ㄙㄢˇ",   j: "傘を忘れること",           e: "forgetting an umbrella",     k: "우산 안 챙기기",      v: "quên mang ô",             i: "lupa bawa payung" },
    { z: "衝動購物", zy: "ㄔㄨㄥ ㄉㄨㄥˋ ㄍㄡˋ ㄨˋ",   j: "衝動買い",                 e: "impulse shopping",           k: "충동구매",            v: "mua sắm bốc đồng",        i: "belanja impulsif" },
    { z: "跟人吵架", zy: "ㄍㄣ ㄖㄣˊ ㄔㄠˇ ㄐㄧㄚˋ",   j: "言い争い",                 e: "picking a fight",            k: "남과 다투기",         v: "cãi nhau",                i: "bertengkar" },
    { z: "吃太辣", zy: "ㄔ ㄊㄞˋ ㄌㄚˋ",     j: "辛いものの食べすぎ",       e: "overdoing the spice",        k: "너무 맵게 먹기",      v: "ăn quá cay",              i: "makan terlalu pedas" },
    { z: "賴床", zy: "ㄌㄞˋ ㄔㄨㄤˊ",       j: "二度寝",                   e: "hitting snooze",             k: "늦잠 자기",           v: "nướng trên giường",       i: "malas bangun" },
    { z: "已讀不回", zy: "ㄧˇ ㄉㄨˊ ㄅㄨˋ ㄏㄨㄟˊ",   j: "既読スルー",               e: "leaving people on read",     k: "읽씹하기",            v: "đọc rồi không trả lời",   i: "baca tapi tidak balas" },
    { z: "邊走邊滑手機", zy: "ㄅㄧㄢ ㄗㄡˇ ㄅㄧㄢ ㄏㄨㄚˊ ㄕㄡˇ ㄐㄧ", j: "歩きスマホ",             e: "walking while on your phone", k: "걸으며 휴대폰 보기", v: "vừa đi vừa dùng điện thoại", i: "main HP sambil jalan" },
    { z: "喝太多冰的", zy: "ㄏㄜ ㄊㄞˋ ㄉㄨㄛ ㄅㄧㄥ ˙ㄉㄜ", j: "冷たいものの飲みすぎ",     e: "too many cold drinks",       k: "찬 음료 과음",        v: "uống quá nhiều đồ lạnh",  i: "terlalu banyak minuman dingin" },
        { z: "忘記充電", zy: "ㄨㄤˋ ㄐㄧˋ ㄔㄨㄥ ㄉㄧㄢˋ",   j: "充電し忘れ",               e: "forgetting to charge",       k: "충전 깜빡하기",       v: "quên sạc pin",            i: "lupa mengisi daya" },
  ];

  const mk = () => (typeof twMKey === "function" ? twMKey() : "j");
  // twMKey は語彙データ用に j/e/k を返す。ここは vi/id も持っているので言語から直接引く。
  const trKey = () => {
    const l = typeof twGetLang === "function" ? twGetLang() : "ja";
    return { ja: "j", en: "e", ko: "k", vi: "v", id: "i" }[l] || "j";
  };
  const tr = (o) => o[trKey()] || o.e || o.j;

  function dayStr(dt) {
    return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
  }
  function seed() {
    let s = localStorage.getItem(K_SEED);
    if (!s) { s = String(Math.floor(Math.random() * 1e9)); localStorage.setItem(K_SEED, s); }
    return s;
  }
  // 日付＋端末シードから決定的に。リロードで引き直せたら「運勢」じゃなくなる。
  function hash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return h >>> 0;
  }
  function pickRank(n) {
    const total = RANKS.reduce((a, r) => a + r.w, 0);
    let x = n % total;
    for (const r of RANKS) { if (x < r.w) return r; x -= r.w; }
    return RANKS[RANKS.length - 1];
  }

  function days() {
    try { return JSON.parse(localStorage.getItem(K_DAYS) || "[]"); } catch (e) { return []; }
  }
  function checkedToday() { return days().includes(dayStr(new Date())); }

  function todayFortune() {
    const base = hash(dayStr(new Date()) + ":" + seed());
    const rank = pickRank(base);
    const yi = YI[(base >>> 3) % YI.length];
    const ji = JI[(base >>> 11) % JI.length];
    let word = null;
    try {
      const list = typeof getVocabData === "function" ? getVocabData(currentLevel) : [];
      if (list && list.length) word = list[(base >>> 17) % list.length];
    } catch (e) {}
    return { rank, yi, ji, word };
  }

  function checkIn() {
    const t = dayStr(new Date());
    const d = days();
    if (!d.includes(t)) {
      d.push(t); d.sort();
      localStorage.setItem(K_DAYS, JSON.stringify(d.slice(-400)));
      try { if (typeof window.onSRSChange === "function") window.onSRSChange(); } catch (e) {}
    }
    try { PA.render(); } catch (e) {}
    try { document.querySelector(".fo-card").scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) {}
  }

  function speak() {
    const f = todayFortune();
    if (f.word && typeof speakZh === "function") speakZh(f.word.w);
  }

  const esc = (x) => String(x == null ? "" : x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const T = (k, fb) => { try { const v = twT(k); return v && v !== k ? v : fb; } catch (e) { return fb; } };

  /** ハブに差し込むカード。未打卡ならボタン、打卡済みなら今日の運勢。 */
  function card() {
    const n = days().length;
    if (!checkedToday()) {
      return `<button class="fo-card fo-btn" onclick="Fortune.checkIn()">
        <div class="fo-ic">籤</div>
        <div class="fo-tx">
          <div class="fo-t">${esc(T("foCheckIn", "今日の運勢を引く"))}</div>
          <div class="fo-d">${esc(T("foCheckInSub", "打卡して、きょうの宜・忌と幸運の一字を見る"))}</div>
        </div>
        <svg viewBox="0 0 24 24" class="fo-ch"><path d="M9 6l6 6-6 6"/></svg>
      </button>`;
    }
    const f = todayFortune();
    const zy = (s) => (typeof twZy === "function" ? twZy(s) : esc(s));
    const w = f.word
      ? `<button class="fo-word" onclick="Fortune.speak()">
           <span class="fo-wl">${esc(T("foLucky", "今日の幸運字"))}</span>
           <b>${esc(f.word.w)}</b>
           <span class="fo-wz">${zy(f.word.zy)}　${esc(f.word.py)}</span>
           <span class="fo-wm">${esc((f.word.m && (f.word.m[mk()] || f.word.m.e || f.word.m.j)) || "")}</span>
           <svg viewBox="0 0 24 24" class="ic fo-wp"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.3 8.7a4.5 4.5 0 0 1 0 6.6"/></svg>
         </button>` : "";
    return `<div class="fo-card fo-done">
      <div class="fo-head">
        <span class="fo-rank fo-${f.rank.k}">${f.rank.z}</span>
        <span class="fo-count">${esc(T("foDays", "打卡 {n} 日目").replace("{n}", String(n)))}</span>
      </div>
      <div class="fo-rows">
        <div class="fo-row"><span class="fo-tag yi">宜</span><div class="fo-rt"><b>${esc(f.yi.z)}</b><span class="fo-zy">${zy(f.yi.zy)}</span><span class="fo-m">${esc(tr(f.yi))}</span></div></div>
        <div class="fo-row"><span class="fo-tag ji">忌</span><div class="fo-rt"><b>${esc(f.ji.z)}</b><span class="fo-zy">${zy(f.ji.zy)}</span><span class="fo-m">${esc(tr(f.ji))}</span></div></div>
      </div>
      ${w}
    </div>`;
  }

  return { card, checkIn, speak, checkedToday, todayFortune };
})();
if (typeof window !== "undefined") window.Fortune = Fortune;   // const は window に乗らない
