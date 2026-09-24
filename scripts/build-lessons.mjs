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

const FILES = (lv) => [`vocab-${lv}.js`, `vocab-${lv}-b.js`, `vocab-${lv}-c.js`]
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
};
// 品詞 → 単元名(テーマが無いレベル用)
const POS = {
 "名": {ja:"名詞", en:"Nouns", ko:"명사", vi:"Danh từ", id:"Kata benda"},
 "動": {ja:"動詞", en:"Verbs", ko:"동사", vi:"Động từ", id:"Kata kerja"},
 "形": {ja:"形容詞", en:"Adjectives", ko:"형용사", vi:"Tính từ", id:"Kata sifat"},
 "副": {ja:"副詞", en:"Adverbs", ko:"부사", vi:"Trạng từ", id:"Kata keterangan"},
 "成": {ja:"四字熟語", en:"Idioms", ko:"사자성어", vi:"Thành ngữ", id:"Idiom"},
};
const GROUP_NAME = {};
for (const [, v] of Object.entries(NAMES)) if (v.ja) GROUP_NAME[v.g] = v;

// テーマの粒度はレベルによってばらばら(l2 は 40 種、1 課しか作れないものだらけ)。
// なので「テーマ＝単元」をやめる:
//   ・課   語を出現順に 8 語ずつ。テーマが変わったら 4 語以上たまっていればそこで切る
//          → 課は 1 つのテーマで揃い、しかも並び順は単語帳と同じ
//   ・単元 課を 6 つずつ束ねて「第 N 単元」。TOPIK Note もこの形
const PER_UNIT = 6;

function build(lv) {
  const files = FILES(lv);
  const words = files.flatMap(loadArrays).filter((v) => v && v.w);
  const tmap = Object.assign({}, ...files.map(themeMap));
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
  const lessons = [];
  let cur = null;
  for (const v of words) {
    const nm = label(v);
    const key = nm.ja;
    // 4 語で切ると薄い課が増える。テーマが変わっても 6 語たまるまでは引っぱる
    if (cur && (cur.words.length >= PER || (cur.key !== key && cur.words.length >= 6))) cur = null;
    if (!cur) { cur = { key, name: nm, words: [] }; lessons.push(cur); }
    cur.words.push(v.w);
  }
  // 3 語以下で終わった課は前にくっつける(2 語の課はクリアしても手応えが無い)
  for (let i = lessons.length - 1; i > 0; i--) {
    if (lessons[i].words.length <= 3 && lessons[i - 1].words.length + lessons[i].words.length <= PER + 3) {
      lessons[i - 1].words = lessons[i - 1].words.concat(lessons[i].words);
      lessons.splice(i, 1);
    }
  }
  // 同じ名前が続くときだけ連番をふる(「動詞」が 8 個並んでも見分けられるように)
  const seen = {};
  lessons.forEach((l) => { seen[l.key] = (seen[l.key] || 0) + 1; l.n = seen[l.key]; });
  const many = {}; Object.keys(seen).forEach((k) => { many[k] = seen[k] > 1; });
  lessons.forEach((l) => { l.idx = many[l.key] ? l.n : 0; delete l.n; delete l.key; });

  // ── 単元に束ねる ──
  const units = [];
  for (let i = 0; i < lessons.length; i += PER_UNIT) {
    const chunk = lessons.slice(i, i + PER_UNIT);
    units.push({ id: "u" + (units.length + 1), no: units.length + 1, lead: chunk[0].name, lessons: chunk });
  }
  return { level: lv, per: PER, by: byTheme ? "theme" : "pos", units,
           total: words.length, lessons: lessons.length };
}

for (const lv of ["l1", "l2", "l3", "l4", "l5", "l6"]) {
  const d = build(lv);
  console.log(`${lv}  ${d.total} 語 / ${d.lessons} 課 / ${d.units.length} 単元  (${d.by})`);
  for (const u of d.units) console.log(`     第${u.no}単元  ${u.lessons.map((l)=>l.name.ja+(l.idx?" "+l.idx:"")+"("+l.words.length+")").join(" / ")}`);
  if (!DRY) fs.writeFileSync(path.join(ROOT, "data", `lessons-${lv}.json`), JSON.stringify(d, null, 1));
}
