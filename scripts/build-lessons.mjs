// 闖関の「1 課 = 8 語」データを全レベルぶん作る。
//   node scripts/build-lessons.mjs          → data/lessons-l1..l6.json を書く
//   node scripts/build-lessons.mjs --dry    → 中身を並べるだけ
//
// 単元の作り方は 2 通り。ファイルによって形が違うので両方いる:
//   A テーマ順  vocab-l1..l3 には「// ── 人・呼び方 ──」というコメントがある。
//               場面の名前になるので、これが使えるなら最優先。
//   B 品詞順    l4..l6 にはコメントが無い(l6 は 1 行 JSON)。c:"名/動/形/副/成" で括る。
// 語そのものは正規表現ではなく、ファイルを実際に評価して配列を取る(l6 の形式に効く)。
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PER = 8;
const DRY = process.argv.includes('--dry');

const FILES = (lv) => [`vocab-${lv}.js`, `vocab-${lv}-b.js`, `vocab-${lv}-c.js`, `vocab-${lv}-d.js`]
  .map((f) => path.join(ROOT, f)).filter((p) => fs.existsSync(p));

// ファイルを評価して const VOCAB_* を取り出す
function loadArrays(file) {
  const src = fs.readFileSync(file, 'utf8');
  const names = [...src.matchAll(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/g)].map((m) => m[1]);
  if (!names.length) return [];
  const fn = new Function(`${src}\nreturn {${names.map((n) => `${n}:typeof ${n}!=="undefined"?${n}:null`).join(',')}};`);
  const got = fn();
  return names.flatMap((n) => Array.isArray(got[n]) ? got[n] : []);
}
// その級の文法点。語と同じく、ファイルを評価して配列を取る
function grammar(lv) {
  const f = path.join(ROOT, `grammar-${lv}.js`);
  if (!fs.existsSync(f)) return [];
  const src = fs.readFileSync(f, 'utf8');
  const names = [...src.matchAll(/const\s+(GRAMMAR_[A-Z0-9_]+)\s*=/g)].map((m) => m[1]);
  if (!names.length) return [];
  const got = new Function(`${src}\nreturn {${names.map((n) => `${n}:typeof ${n}!=="undefined"?${n}:null`).join(',')}};`)();
  return names.flatMap((n) => Array.isArray(got[n]) ? got[n] : []).filter((g) => g && g.id);
}
const GNAME = { g: "grammar", ja: "文法", en: "Grammar", ko: "문법", vi: "Ngữ pháp", id: "Tata bahasa" };

// 行単位で「テーマ → その下に並ぶ語」を拾う。1 行 JSON のファイルでは何も取れない(想定どおり)
function themeMap(file) {
  const map = {};
  let cur = null;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const t = line.match(/^\/\/\s*──\s*(.+?)\s*──/);
    if (t) { cur = t[1].replace(/[（(].*?[)）]/g, '').trim(); continue; }
    const w = line.match(/^\s*\{\s*"?w"?\s*:\s*"([^"]+)"/);
    if (w && cur) map[w[1]] = cur;
  }
  return map;
}

// テーマ名 → 単元名(5 言語)。近いものはまとめる。ここに無いテーマはその名前のまま英語だけ入れる
const NAMES = {
 "人・呼び方": {g:"self", ja:"自分と相手", en:"You and me", ko:"나와 상대", vi:"Tôi và bạn", id:"Aku dan kamu"},
 "職業・身分": {g:"self"}, "あいさつ・決まり文句": {g:"self"}, "人・家族": {g:"family"},
 "家族": {g:"family", ja:"家族", en:"Family", ko:"가족", vi:"Gia đình", id:"Keluarga"},
 "数・お金": {g:"num", ja:"数と量詞", en:"Numbers & counters", ko:"숫자와 단위", vi:"Số và lượng từ", id:"Angka & satuan"},
 "数字・量詞": {g:"num"}, "量詞": {g:"num"}, "お金・買い物": {g:"num"},
 "時間": {g:"time", ja:"時間と曜日", en:"Time & days", ko:"시간과 요일", vi:"Thời gian & ngày", id:"Waktu & hari"},
 "曜日・日付": {g:"time"}, "位置・時間": {g:"time"}, "季節": {g:"time"}, "時間・季節": {g:"time"}, "時間・頻度": {g:"time"},
 "場所・地名": {g:"place", ja:"場所と移動", en:"Places & getting around", ko:"장소와 이동", vi:"Nơi chốn & đi lại", id:"Tempat & perjalanan"},
 "場所": {g:"place"}, "交通": {g:"place"}, "乗り物": {g:"place"}, "方向・位置": {g:"place"}, "旅行": {g:"place"},
 "食べ物・飲み物": {g:"food", ja:"食べる・飲む", en:"Eating & drinking", ko:"먹고 마시기", vi:"Ăn và uống", id:"Makan & minum"},
 "食べ物": {g:"food"}, "飲み物": {g:"food"}, "食べ物・調味料": {g:"food"}, "食器": {g:"food"}, "料理": {g:"food"},
 "日常の物": {g:"thing", ja:"身のまわりの物", en:"Everyday things", ko:"일상 물건", vi:"Đồ dùng hằng ngày", id:"Barang sehari-hari"},
 "日用品": {g:"thing"}, "衣服": {g:"thing"}, "家電": {g:"thing"},
 "体": {g:"body", ja:"体・色・自然", en:"Body, colours, nature", ko:"몸·색·자연", vi:"Cơ thể, màu sắc, thiên nhiên", id:"Tubuh, warna, alam"},
 "色": {g:"body"}, "動物": {g:"body"}, "自然": {g:"body"}, "天気": {g:"body"}, "健康・病気": {g:"body"},
 "動詞": {g:"verb", ja:"よく使う動作", en:"Everyday actions", ko:"자주 쓰는 동작", vi:"Hành động thường ngày", id:"Tindakan sehari-hari"},
 "基本動詞": {g:"verb"}, "動作": {g:"verb"}, "生活動詞・娯楽": {g:"verb"}, "動詞・行動": {g:"verb"},
 "形容詞": {g:"adj", ja:"様子をいう", en:"Describing things", ko:"상태 말하기", vi:"Miêu tả", id:"Menggambarkan"},
 "基本形容詞": {g:"adj"}, "状態・形容": {g:"adj"}, "形容・副詞": {g:"adj"},
 "疑問詞・指示詞": {g:"ask", ja:"質問する", en:"Asking questions", ko:"질문하기", vi:"Đặt câu hỏi", id:"Bertanya"},
 "その他": {g:"ask"}, "接続詞": {g:"ask"}, "副詞": {g:"ask"},
 // 官方 TBCL 詞語表の「場面」(vocab-l*-d.js のテーマコメント)。核心詞は場面ではないので品詞に落ちる
 "餐飲、烹飪": {g:"food"}, "購物、商店": {g:"shop", ja:"買い物とお店", en:"Shopping", ko:"쇼핑과 가게", vi:"Mua sắm", id:"Belanja"},
 "交通、旅遊": {g:"place"}, "日常起居": {g:"daily", ja:"日々の暮らし", en:"Daily life", ko:"일상생활", vi:"Sinh hoạt hằng ngày", id:"Kehidupan sehari-hari"},
 "身體、醫療": {g:"health", ja:"体と医療", en:"Body & health", ko:"몸과 의료", vi:"Cơ thể & y tế", id:"Tubuh & kesehatan"},
 "教育、學習": {g:"study", ja:"学校と学び", en:"School & study", ko:"학교와 공부", vi:"Học tập", id:"Sekolah & belajar"},
 "職業": {g:"work", ja:"仕事", en:"Work", ko:"직업", vi:"Công việc", id:"Pekerjaan"},
 "社交、人際": {g:"social", ja:"人づきあい", en:"People & relationships", ko:"인간관계", vi:"Giao tiếp", id:"Pergaulan"},
 "個人資料": {g:"self"}, "休閒、娛樂": {g:"fun", ja:"遊びと趣味", en:"Leisure & hobbies", ko:"여가와 취미", vi:"Giải trí & sở thích", id:"Hiburan & hobi"},
 "自然環境": {g:"body"}, "情緒、態度": {g:"feel", ja:"気持ちと態度", en:"Feelings & attitudes", ko:"감정과 태도", vi:"Cảm xúc & thái độ", id:"Perasaan & sikap"},
 "公共服務": {g:"public", ja:"公共サービス", en:"Public services", ko:"공공 서비스", vi:"Dịch vụ công", id:"Layanan publik"},
 "文化": {g:"culture", ja:"文化", en:"Culture", ko:"문화", vi:"Văn hóa", id:"Budaya"},
 "安全": {g:"safety", ja:"安全と緊急時", en:"Safety & emergencies", ko:"안전과 긴급 상황", vi:"An toàn & khẩn cấp", id:"Keselamatan & darurat"},
 "科技": {g:"tech", ja:"テクノロジー", en:"Technology", ko:"기술", vi:"Công nghệ", id:"Teknologi"},
 "社會": {g:"society", ja:"社会", en:"Society", ko:"사회", vi:"Xã hội", id:"Masyarakat"},
};
// 單字檔裡有、但沒對到上面單元的主題註解 → 自己的五語名稱(分組 key 仍是原字串,課的切法不變)。
// 2026-11-20 英文用戶回報「Unit 4 有日文」:以前這裡落空就 {ja:raw,en:raw},英韓越印全看到日文/中文。
// 新增主題註解要在這裡補,build 會擋。
const RAW_NAMES = {
 "学校": ["学校","School","학교","Trường học","Sekolah"],
 "方位": ["方向と位置","Directions & positions","방향과 위치","Phương hướng & vị trí","Arah & posisi"],
 "程度副詞": ["程度の副詞","Degree adverbs","정도 부사","Phó từ chỉ mức độ","Kata keterangan derajat"],
 "交通補充": ["交通(追加)","More on transport","교통 더 알기","Giao thông (bổ sung)","Transportasi (tambahan)"],
 "仕事": ["仕事","Work","일","Công việc","Pekerjaan"],
 "住まい": ["住まい","Home & housing","집과 주거","Nhà ở","Tempat tinggal"],
 "外食": ["外食","Eating out","외식","Ăn ngoài","Makan di luar"],
 "抽象語": ["抽象的なことば","Abstract words","추상적인 말","Từ trừu tượng","Kata abstrak"],
 "抽象": ["考えと概念","Ideas & concepts","생각과 개념","Ý niệm & khái niệm","Ide & konsep"],
 "日常の動詞": ["日常の動詞","Everyday verbs","일상 동사","Động từ thường ngày","Kata kerja sehari-hari"],
 "時間の副詞": ["時間の副詞","Time adverbs","시간 부사","Phó từ chỉ thời gian","Kata keterangan waktu"],
 "毎日の生活": ["毎日の生活","Daily routine","매일의 생활","Sinh hoạt mỗi ngày","Rutinitas harian"],
 "生活の名詞": ["生活の名詞","Everyday nouns","생활 명사","Danh từ đời sống","Kata benda sehari-hari"],
 "買い物": ["買い物","Shopping","쇼핑","Mua sắm","Belanja"],
 "購物・金錢": ["買い物とお金","Shopping & money","쇼핑과 돈","Mua sắm & tiền bạc","Belanja & uang"],
 "身體感受": ["体の感覚","How your body feels","몸의 느낌","Cảm giác cơ thể","Rasa di tubuh"],
 "通訊": ["通信・連絡","Staying in touch","통신과 연락","Liên lạc","Komunikasi"],
 "餐飲": ["食事","Food & dining","음식과 식사","Ăn uống","Makanan & minuman"],
 "台湾生活": ["台湾の暮らし","Life in Taiwan","대만 생활","Cuộc sống ở Đài Loan","Hidup di Taiwan"],
 "意見・討論": ["意見と議論","Opinions & discussion","의견과 토론","Ý kiến & thảo luận","Pendapat & diskusi"],
 "日用品・衣物": ["日用品と服","Daily items & clothes","생활용품과 옷","Đồ dùng & quần áo","Barang & pakaian"],
 "気持ち": ["気持ち","Feelings","기분","Tâm trạng","Perasaan"],
 "生活便利": ["便利な暮らし","Getting things done","생활 편의","Tiện ích đời sống","Kemudahan hidup"],
 "社會日常": ["社会と日常","Society & everyday life","사회와 일상","Xã hội & đời thường","Masyarakat & keseharian"],
 "科技網路": ["テクノロジーとネット","Tech & the internet","기술과 인터넷","Công nghệ & Internet","Teknologi & internet"],
 "租屋生活": ["部屋を借りる","Renting a place","집 구하기","Thuê nhà","Menyewa tempat tinggal"],
 "人間関係": ["人間関係","Relationships","인간관계","Các mối quan hệ","Hubungan"],
 "動詞補充": ["動詞(追加)","More verbs","동사 더 알기","Động từ (bổ sung)","Kata kerja (tambahan)"],
 "家事": ["家事","Housework","집안일","Việc nhà","Pekerjaan rumah"],
 "形容詞・副詞": ["形容詞と副詞","Adjectives & adverbs","형용사와 부사","Tính từ & phó từ","Kata sifat & keterangan"],
 "情感深化": ["気持ち(もっと深く)","Feelings in depth","감정 더 깊이","Cảm xúc chuyên sâu","Perasaan lebih dalam"],
 "抽象動詞": ["抽象的な動詞","Abstract verbs","추상 동사","Động từ trừu tượng","Kata kerja abstrak"],
 "描述・副詞": ["描写と副詞","Describing & adverbs","묘사와 부사","Miêu tả & phó từ","Deskripsi & keterangan"],
 "職場": ["職場","Workplace","직장","Nơi làm việc","Tempat kerja"],
 "職場・辦公": ["職場・オフィス","At the office","사무실","Văn phòng","Di kantor"],
 "職場深化": ["職場(もっと深く)","Workplace in depth","직장 더 깊이","Nơi làm việc chuyên sâu","Tempat kerja lebih dalam"],
 "表達意見": ["意見を言う","Giving your opinion","의견 말하기","Nêu ý kiến","Menyampaikan pendapat"],
 "連接詞・接続": ["接続詞","Connectors","접속사","Từ nối","Kata penghubung"],
 "人際": ["人との関わり","Getting along with people","대인 관계","Quan hệ giao tiếp","Pergaulan sosial"],
 "健康生活": ["健康な暮らし","Healthy living","건강한 생활","Sống khỏe","Hidup sehat"],
 "意見・観点": ["意見と視点","Opinions & viewpoints","의견과 관점","Ý kiến & quan điểm","Pendapat & sudut pandang"],
 "感情": ["感情","Emotions","감정","Cảm xúc","Emosi"],
 "求職": ["仕事さがし","Job hunting","구직","Tìm việc","Mencari kerja"],
 "よく使う形容詞": ["よく使う形容詞","Common adjectives","자주 쓰는 형용사","Tính từ thông dụng","Kata sifat umum"],
 "健康・病院": ["健康と病院","Health & hospitals","건강과 병원","Sức khỏe & bệnh viện","Kesehatan & rumah sakit"],
 "接続詞・副詞": ["接続詞と副詞","Connectors & adverbs","접속사와 부사","Từ nối & phó từ","Kata penghubung & keterangan"],
 "体・健康": ["体と健康","Body & health","몸과 건강","Cơ thể & sức khỏe","Tubuh & kesehatan"],
 "趣味": ["趣味","Hobbies","취미","Sở thích","Hobi"],
 "気持ち・考え": ["気持ちと考え","Feelings & thoughts","감정과 생각","Cảm xúc & suy nghĩ","Perasaan & pikiran"],
 "時間・副詞": ["時間と副詞","Time & adverbs","시간과 부사","Thời gian & phó từ","Waktu & keterangan"],
 "天気・季節": ["天気と季節","Weather & seasons","날씨와 계절","Thời tiết & mùa","Cuaca & musim"],
 "天気の補充": ["天気(追加)","More on weather","날씨 더 알기","Thời tiết (bổ sung)","Cuaca (tambahan)"],
 "道・方向": ["道と方向","Roads & directions","길과 방향","Đường & phương hướng","Jalan & arah"],
 "テクノロジー": ["テクノロジー","Technology","기술","Công nghệ","Teknologi"],
 "服・買い物": ["服と買い物","Clothes & shopping","옷과 쇼핑","Quần áo & mua sắm","Pakaian & belanja"],
 "健康の補充": ["健康(追加)","More on health","건강 더 알기","Sức khỏe (bổ sung)","Kesehatan (tambahan)"],
 "よく使う動詞": ["よく使う動詞","Common verbs","자주 쓰는 동사","Động từ thông dụng","Kata kerja umum"],
 "旅遊": ["旅行","Travel","여행","Du lịch","Wisata"],
 "感情・社交": ["感情と人づきあい","Emotions & socializing","감정과 사교","Cảm xúc & giao tiếp","Emosi & pergaulan"],
 "網路・科技": ["ネットとテクノロジー","Internet & tech","인터넷과 기술","Internet & công nghệ","Internet & teknologi"],
 "抽象補充": ["抽象的なことば(追加)","More abstract words","추상어 더 알기","Từ trừu tượng (bổ sung)","Kata abstrak (tambahan)"],
 "成語・慣用句": ["成語と慣用句","Idioms & set phrases","성어와 관용구","Thành ngữ & quán ngữ","Idiom & ungkapan"],
};
const RAW_MISS = new Set();
// 品詞 → 単元名(テーマが無いレベル用)
const POS = {
 "名": {ja:"名詞", en:"Nouns", ko:"명사", vi:"Danh từ", id:"Kata benda"},
 "動": {ja:"動詞", en:"Verbs", ko:"동사", vi:"Động từ", id:"Kata kerja"},
 "形": {ja:"形容詞", en:"Adjectives", ko:"형용사", vi:"Tính từ", id:"Kata sifat"},
 "副": {ja:"副詞", en:"Adverbs", ko:"부사", vi:"Trạng từ", id:"Kata keterangan"},
 "成": {ja:"四字熟語", en:"Idioms", ko:"사자성어", vi:"Thành ngữ", id:"Idiom"},
 "量": {ja:"量詞", en:"Measure words", ko:"양사", vi:"Lượng từ", id:"Kata satuan"},
 "數": {ja:"数", en:"Numbers", ko:"숫자", vi:"Số", id:"Angka"},
 "代": {ja:"代名詞", en:"Pronouns", ko:"대명사", vi:"Đại từ", id:"Kata ganti"},
 "連": {ja:"接続詞", en:"Conjunctions", ko:"접속사", vi:"Liên từ", id:"Kata sambung"},
 "介": {ja:"介詞", en:"Prepositions", ko:"개사", vi:"Giới từ", id:"Preposisi"},
 "助": {ja:"助詞", en:"Particles", ko:"조사", vi:"Trợ từ", id:"Partikel"},
 "嘆": {ja:"感嘆詞", en:"Interjections", ko:"감탄사", vi:"Thán từ", id:"Kata seru"},
 "疑": {ja:"疑問詞", en:"Question words", ko:"의문사", vi:"Từ để hỏi", id:"Kata tanya"},
};
const GROUP_NAME = {};
for (const [, v] of Object.entries(NAMES)) if (v.ja) GROUP_NAME[v.g] = v;

// テーマの粒度はレベルによってばらばら(l2 は 40 種、1 課しか作れないものだらけ)。
// なので「テーマ＝単元」をやめる:
//   ・課   語を出現順に 8 語ずつ。テーマが変わったら 4 語以上たまっていればそこで切る
//          → 課は 1 つのテーマで揃い、しかも並び順は単語帳と同じ
//   ・単元 課を 6 つずつ束ねて「第 N 単元」。TOPIK Note もこの形
const PER_UNIT = 6;
const G_PER = 3;      // 文法は 1 課 3 点まで。まとめすぎると 1 課が終わらない
const G_EVERY = 3;    // 語の課 3 つごとに文法を 1 課はさむ

// 語の級は官方 TBCL に従う(index.html の VOCAB_BY_LEVEL と同じ規則)。
// ここを合わせないと、課のデータが古い級のままで、アプリ側で弾かれて課がやせる。
const TBCL = (() => {
  const f = path.join(ROOT, 'tbcl.js');
  if (!fs.existsSync(f)) return null;
  const src = fs.readFileSync(f, 'utf8');
  return new Function(`${src}\nreturn STW_TBCL;`)();
})();
const ALL = (() => {                       // 全レベルの語を 1 本に。振り直しの母集団
  const out = [], seen = new Set();
  for (const lv of ['l1', 'l2', 'l3', 'l4', 'l5', 'l6']) {
    for (const f of FILES(lv)) for (const v of loadArrays(f)) {
      if (!v || !v.w || seen.has(v.w)) continue;
      seen.add(v.w);
      const t = TBCL && TBCL[v.w];
      out.push({ v, lv: t ? 'l' + Math.min(6, t[0]) : lv, src: lv });
    }
  }
  return out;
})();

function build(lv) {
  const files = FILES(lv);
  const words = ALL.filter((x) => x.lv === lv).map((x) => x.v);
  // テーマのコメントは元のファイルにある。振り直しで級をまたいでも名前は引けるよう全部集める
  const tmap = Object.assign({}, ...['l1','l2','l3','l4','l5','l6'].flatMap((l) => FILES(l).map(themeMap)));
  const covered = words.filter((v) => tmap[v.w]).length;
  const byTheme = covered / Math.max(1, words.length) >= 0.5;

  const label = (v) => {
    if (byTheme) {
      const raw = tmap[v.w];
      const hit = raw && NAMES[raw];
      if (hit) return GROUP_NAME[hit.g] || { ja: raw, en: raw };
      if (raw && RAW_NAMES[raw]) { const [ja, en, ko, vi, id] = RAW_NAMES[raw]; return { k: raw, ja, en, ko, vi, id }; }
      if (raw) { RAW_MISS.add(raw); return { ja: raw, en: raw }; }
      // テーマコメントが無い語(-b / -c 追加ぶん)は「その他」で括らず品詞で呼ぶ。
      // 課の名前が「その他 5」だと、何をやるのか分からないまま開くことになる。
      return POS[v.c] || { ja: "その他", en: "More", ko: "기타", vi: "Khác", id: "Lainnya" };
    }
    return POS[v.c] || { ja: v.c || "その他", en: v.c || "Other" };
  };

  // ── 課に割る ──
  // 前は「テーマが変わっても 6 語たまるまで引っぱる」で切っていた。級の振り直しで他の級から
  // 1〜2 語ずつ流れ込んだ語がその直前のテーマに貼り付いて、「食べる・飲む」の課に
  // 近・遠・不客氣 が入る、という嘘の名前の課ができていた。
  // 今は: 同じテーマの語を先にまとめ、4 語に満たないテーマは「いろいろ」に落とし、
  // テーマごとに 8 語以下へ均等に割る(9 語 → 5+4、8+1 にはしない)。
  const MIXED = { ja: "いろいろ", en: "Mixed", ko: "기타", vi: "Từ khác", id: "Lain-lain" };
  const MIN_THEME = 4;
  const groups = new Map();                       // key → { name, words[] }  出現順
  for (const v of words) {
    const lb = label(v), key = lb.k || lb.ja;
    const { k: _k, ...nm } = lb;
    if (!groups.has(key)) groups.set(key, { name: nm, words: [] });
    groups.get(key).words.push(v.w);
  }
  // 端数(テーマ 4 語未満)は品詞でまとめ直す。「いろいろ 6」より「動詞 2」のほうが何をやるか分かる。
  // 品詞でも 4 語に満たない残りだけ「いろいろ」
  const byW = Object.fromEntries(words.map((v) => [v.w, v]));
  const mixed = [];
  for (const [key, g] of [...groups]) if (g.words.length < MIN_THEME) { mixed.push(...g.words); groups.delete(key); }
  const pos = new Map();
  for (const w of mixed) {
    const nm = POS[(byW[w] || {}).c];
    const key = nm ? "pos:" + nm.ja : MIXED.ja;
    if (!pos.has(key)) pos.set(key, { name: nm || MIXED, words: [] });
    pos.get(key).words.push(w);
  }
  const rest = [];
  for (const [key, g] of [...pos]) {
    if (key !== MIXED.ja && g.words.length < MIN_THEME) { rest.push(...g.words); pos.delete(key); }
  }
  if (rest.length) { if (!pos.has(MIXED.ja)) pos.set(MIXED.ja, { name: MIXED, words: [] }); pos.get(MIXED.ja).words.push(...rest); }
  for (const [key, g] of pos) groups.set(key, g);              // 端数は最後にまとめる
  const lessons = [];
  for (const [key, g] of groups) {
    // 59 語を 8 ずつ切ると最後が 3 語になる。余りを前から 1 語ずつ配って 8,8,7,7,… にする
    const n = g.words.length, parts = Math.ceil(n / PER), base = Math.floor(n / parts), extra = n % parts;
    for (let i = 0, at = 0; i < parts; i++) {
      const size = base + (i < extra ? 1 : 0);
      lessons.push({ key, name: g.name, words: g.words.slice(at, at + size) });
      at += size;
    }
  }
  // 同じ名前が続くときだけ連番をふる(「動詞」が 8 個並んでも見分けられるように)
  const seen = {};
  lessons.forEach((l) => { seen[l.key] = (seen[l.key] || 0) + 1; l.n = seen[l.key]; });
  const many = {}; Object.keys(seen).forEach((k) => { many[k] = seen[k] > 1; });
  lessons.forEach((l) => { l.idx = many[l.key] ? l.n : 0; delete l.n; delete l.key; });

  // ── 文法を課に割って、語の課の間にはさむ ──
  // 官方 TBCL の語法點は全 496 点(第1級15/第2級92/第3級134/第4級149/第5級106)。
  // 単元の最後にまとめて置くと 1 課に 27 点という化け物ができるので、
  //   ・1 課 = 文法 3 点まで
  //   ・語の課 3 つごとに 1 課はさむ
  // 語より文法が多い級では、語が尽きたあとに文法の課だけが続く(それが今の実態)。
  const gs = grammar(lv);
  const gLessons = [];
  for (let i = 0; i < gs.length; i += G_PER)
    gLessons.push({ kind: "grammar", gids: gs.slice(i, i + G_PER).map((g) => g.id), name: GNAME, idx: 0 });
  gLessons.forEach((l, i) => { l.idx = gLessons.length > 1 ? i + 1 : 0; });

  const merged = [];
  let gj = 0, since = 0;
  for (const l of lessons) {
    merged.push(l);
    if (++since >= G_EVERY && gj < gLessons.length) { merged.push(gLessons[gj++]); since = 0; }
  }
  while (gj < gLessons.length) merged.push(gLessons[gj++]);       // 余った文法は後ろに続ける

  // ── 単元に束ねる ──
  // 文法の課には中の分類(cat)を持たせる。「文法 1・2・3」が 3 つ並んでも見分けがつくように
  const gcat = Object.fromEntries(gs.map((g) => [g.id, g.cat]));
  const topCats = (gids) => {
    const c = {}; gids.forEach((id) => { const k = gcat[id]; if (k) c[k] = (c[k] || 0) + 1; });
    return Object.keys(c).sort((a, b) => c[b] - c[a]).slice(0, 2);
  };
  gLessons.forEach((l) => { l.cats = topCats(l.gids); });

  const units = [];
  for (let i = 0; i < merged.length; i += PER_UNIT) {
    const chunk = merged.slice(i, i + PER_UNIT);
    const head = chunk.find((x) => x.kind !== "grammar");
    const u = { id: "u" + (units.length + 1), no: units.length + 1, lead: head ? head.name : GNAME, lessons: chunk };
    // 文法だけの単元: 「文法」の後ろに分類を出す(第11単元・文法／第12単元・文法 では区別できない)
    if (!head) u.leadCats = topCats(chunk.flatMap((l) => l.gids));
    units.push(u);
  }
  // 末尾に 1〜2 課だけの単元が残ったら前の単元に足す(「第13単元 0/1」は寂しい)
  if (units.length > 1 && units[units.length - 1].lessons.length <= 2) {
    const last = units.pop();
    units[units.length - 1].lessons.push(...last.lessons);
  }
  const gi = gs.length;
  return { level: lv, per: PER, by: byTheme ? "theme" : "pos", units,
           total: words.length, lessons: lessons.length, gtotal: gi };
}

const BUILT = ["l1", "l2", "l3", "l4", "l5", "l6"].map((lv) => [lv, build(lv)]);
if (RAW_MISS.size) { console.error("RAW_NAMES に無いテーマ(英韓越印が原文のまま出る):", [...RAW_MISS].join(", ")); process.exit(1); }
for (const [lv, d] of BUILT) {
  console.log(`${lv}  ${d.total} 語 / ${d.lessons} 課 / ${d.units.length} 単元 / 文法 ${d.gtotal} 点  (${d.by})`);
  for (const u of d.units) console.log(`     第${u.no}単元  ${u.lessons.map((l)=>l.kind==="grammar"?`文法(${l.gids.length})`:l.name.ja+(l.idx?" "+l.idx:"")+"("+l.words.length+")").join(" / ")}`);
  if (!DRY) fs.writeFileSync(path.join(ROOT, "data", `lessons-${lv}.json`), JSON.stringify(d, null, 1));
}
