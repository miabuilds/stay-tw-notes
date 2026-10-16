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
      if (raw) return { ja: raw, en: raw };
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
    const nm = label(v), key = nm.ja;
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

for (const lv of ["l1", "l2", "l3", "l4", "l5", "l6"]) {
  const d = build(lv);
  console.log(`${lv}  ${d.total} 語 / ${d.lessons} 課 / ${d.units.length} 単元 / 文法 ${d.gtotal} 点  (${d.by})`);
  for (const u of d.units) console.log(`     第${u.no}単元  ${u.lessons.map((l)=>l.kind==="grammar"?`文法(${l.gids.length})`:l.name.ja+(l.idx?" "+l.idx:"")+"("+l.words.length+")").join(" / ")}`);
  if (!DRY) fs.writeFileSync(path.join(ROOT, "data", `lessons-${lv}.json`), JSON.stringify(d, null, 1));
}
