// 官方 TBCL 語法點 496 点 → 学習カード(j/e/k)を claude -p で分割生成する。
// 官方の 語法點名・級別・例句 が正本。モデルには「説明と訳と2つ目の例文」だけを書かせる。
// 生成物は batch ごとに out/grammar-gen/*.json に置く → 途中で落ちても再開できる。
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out/grammar-gen");
fs.mkdirSync(OUT, { recursive: true });
const spine = JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/grammar-spine.json"), "utf8"));

const CATS = ["基本文型","疑問","否定","助動詞","アスペクト","補語","介詞","接続","副詞","比較","数量","特殊構文","話しことば","書きことば"];

// 簡体字だけに使う字。台湾向けなので1字でも混ざったら不合格
// 簡体字だけに使う字。表は官方 TBCL の詞語表・例句と手元の語彙から「繁體でも使う字」を引いて作る
// (手書きの一覧だと 餐・困・食 のような繁體でも普通の字を誤検出した)
const SIMP = new Set([...JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/simplified-only.json"), "utf8"))]);

const CJK = /[㐀-鿿]/;
const strip = s => String(s).replace(/<[^>]+>/g, "");
const chars = s => [...strip(s)].filter(c => CJK.test(c));
// 拼音の音節数。単語ごとに繋げて書くのが普通(Wǒ shì Rìběnrén)なので、
// 空白では数えられない。有効音節表(hanzi-pinyin.json 由来 412 個)で切り直して数える。
// 切り方が複数ありうる(fangan = fan|gan / fang|an)が、数はどちらでも同じ。
// 期待数に一致する切り方が1つでもあれば合格、という数え方にする。
const SYL = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/pinyin-syllables.json"), "utf8")));
const TONE_MAP = { "ā":"a","á":"a","ǎ":"a","à":"a","ē":"e","é":"e","ě":"e","è":"e","ī":"i","í":"i","ǐ":"i","ì":"i",
  "ō":"o","ó":"o","ǒ":"o","ò":"o","ū":"u","ú":"u","ǔ":"u","ù":"u","ǖ":"v","ǘ":"v","ǚ":"v","ǜ":"v","ü":"v","ń":"n","ň":"n","ǹ":"n","ê":"e" };
const plainPy = s => String(s).toLowerCase().replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹê]/g, c => TONE_MAP[c] || c);
// その語の音節数としてありうる値の集合
function sylSet(word) {
  const w = plainPy(word).replace(/[^a-z]/g, "");
  if (!w) return new Set();
  const reach = [new Set([0])];
  for (let i = 0; i < w.length; i++) reach.push(new Set());
  for (let i = 0; i < w.length; i++) {
    if (!reach[i].size) continue;
    for (let n = Math.min(6, w.length - i); n >= 1; n--) {
      if (!SYL.has(w.substr(i, n))) continue;
      for (const c of reach[i]) reach[i + n].add(c + 1);
    }
  }
  return reach[w.length];
}
// 文全体。語ごとに足し合わせた合計の集合を返す(組み合わせ爆発しないよう 40 通りで打ち切る)
function sylCounts(py) {
  const words = String(py).split(/[\s'’\-–—,，。！？；：、（）()「」"]+/).filter(w => /[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/.test(w));
  let acc = new Set([0]);
  for (const w of words) {
    const s = sylSet(w);
    if (!s.size) return null;                     // 切れない = 拼音として不正
    const nx = new Set();
    for (const a of acc) for (const b of s) nx.add(a + b);
    acc = nx.size > 40 ? new Set([...nx].slice(0, 40)) : nx;
  }
  return acc;
}

function check(o, sp) {
  const e = [];
  if (!o || typeof o !== "object") return ["not an object"];
  const norm = x => String(x || "").replace(/[＋]/g, "+").replace(/[（]/g, "(").replace(/[）]/g, ")").replace(/\s+/g, "");
  if (norm(o.t) !== norm(sp.name)) e.push(`t が官方名と違う: ${o.t} ≠ ${sp.name}`);
  if (!CATS.includes(o.cat)) e.push("cat が範囲外: " + o.cat);
  for (const f of ["g", "p", "ex"]) for (const l of ["j", "e", "k"])
    if (!o[f] || !String(o[f][l] || "").trim()) e.push(`${f}.${l} が空`);
  if (!String(o.ex && o.ex.j).trim() || String(o.ex.j).length < 25) e.push("ex.j が短すぎる");
  // 欄を取り違える事故が実際に出る(韓国語欄に中国語)。言語そのものを見る
  const HAN = /[\uac00-\ud7af]/, KANA = /[\u3040-\u30ff]/;
  if (!HAN.test(String(o.g && o.g.k))) e.push("g.k がハングルでない: " + (o.g && o.g.k));
  if (!HAN.test(String(o.ex && o.ex.k))) e.push("ex.k がハングルでない");
  if (!KANA.test(String(o.ex && o.ex.j))) e.push("ex.j が日本語でない");
  if (/[\u3400-\u9fff]/.test(String(o.ex && o.ex.e).replace(/[\u3400-\u9fff]/g, c => "")) === false) { /* 英語欄に漢字が出るのは例示なので許す */ }
  if (!Array.isArray(o.eg) || o.eg.length < 2) return e.concat("例文が2つ未満");
  o.eg.forEach((x, i) => {
    const z = String(x.z || "");
    if (!/<em>[^<]+<\/em>/.test(z)) e.push(`eg[${i}] に <em> が無い`);
    const cs = chars(z);
    if (!cs.length) e.push(`eg[${i}].z に漢字が無い`);
    for (const c of cs) if (SIMP.has(c)) e.push(`eg[${i}] に簡体字「${c}」`);
    // 「123號」のような算用数字は 1 字 1 音節で読まれる(yī èr sān)。漢字数に足す
    const digits = (strip(z).match(/[0-9０-９]/g) || []).length;
    const want2 = cs.length + digits;
    const ns = sylCounts(x.py);
    if (!ns) e.push(`eg[${i}] 拼音が音節に切れない: ${x.py}`);
    // 数字やアルファベットが混ざる文は漢字数と合わないので ±1 まで許す
    // 1文字の音節(r/n/e など)も表にあるので切り方は複数出る。正しい切り方は必ず最少になる
    else if (Math.abs(Math.min(...ns) - want2) > 1)
      e.push(`eg[${i}] 拼音の音節数 ${Math.min(...ns)} ≠ 字数 ${want2}（拼音: ${x.py}）`);
    if (!/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(String(x.py))) e.push(`eg[${i}] 拼音に声調記号が無い`);
    for (const l of ["j", "e", "k"]) if (!String(x[l] || "").trim()) e.push(`eg[${i}].${l} が空`);
    if (!/[\uac00-\ud7af]/.test(String(x.k))) e.push(`eg[${i}].k がハングルでない: ${x.k}`);
    if (/^[a-zA-Z\u3400-\u9fff\s.,!?'"-]*$/.test(String(x.j)) && !/[\u3040-\u30ff]/.test(String(x.j)))
      e.push(`eg[${i}].j が日本語でない: ${x.j}`);
    // 人称代名詞の取り違え。実際に「他是我媽媽。/ She is my mother.」が出た。
    // 中国語側と英訳側で性が食い違っていたら、どちらかが間違っている
    const zz = strip(z), ee = String(x.e || "");
    const she = /\b(she|her|hers)\b/i.test(ee), he = /\b(he|him|his)\b/i.test(ee);
    if (/她/.test(zz) && !/他/.test(zz) && he && !she) e.push(`eg[${i}] 中文は「她」なのに英訳が he: ${zz} / ${ee}`);
    if (/他/.test(zz) && !/她/.test(zz) && she && !he) e.push(`eg[${i}] 中文は「他」なのに英訳が she: ${zz} / ${ee}`);
  });
  // 官方例句は1つ目にそのまま入れる(「_」で省略を示す点は例外)
  const want = sp.anchor || sp.eg[0];
  // 原表には「問題 ，」のように空白が紛れている行がある。空白の違いでは落とさない
  const sq = x => String(x).replace(/[\s\u3000]+/g, "");
  if (want && !want.includes("_") && !sp.free) {
    const got = strip(o.eg[0].z);
    if (sq(got) !== sq(want)) e.push(`eg[0] が官方例句と違う:\n   官方=${want}\n   生成=${got}`);
  }
  return e;
}

const SYS = `あなたは台湾華語(繁體字・台灣用法)の文法教材の執筆者です。
國家教育研究院「臺灣華語文能力基準(TBCL)」の語法點表に沿って、学習カードを JSON で書きます。

絶対規則:
1. 繁體字のみ。簡体字は1字も使わない。台灣の言い方を使う(例:捷運○ 地鐵×、腳踏車○ 自行車×、影片○ 視頻×)。
2. "t" は与えられた官方の語法點名を一字一句そのまま写す。番号(1,2,3)も含めて写す。
3. eg[0].z は与えられた官方例句をそのまま使い、対象の文法部分だけを <em></em> で囲む。文字を足したり削ったりしない。
   ただし官方例句に「_」(省略を示す下線)がある場合だけは、自然な完全文に直してよい。
4. eg[1].z は自分で書く別の例文。その級の学習者が知っている語彙で、台灣で実際に使う自然な文にする。
5. "py" は漢語拼音(声調記号つき)。**語ごとにまとめて書き、語と語の間だけ半角スペース**を入れる。
   文頭と固有名詞は大文字。例: 我是日本人。→ "Wǒ shì Rìběnrén."  這是爸爸的鞋子。→ "Zhè shì bàba de xiézi."
   音節を1つずつ離して書かない(× "wǒ shì rì běn rén")。漢字1字＝1音節で数は必ず一致すること。
   多音字・変調に注意(不 bù/bú、一 yī/yì/yí、第3声の連続、輕聲の 了 le・的 de・嗎 ma・呢 ne・著 zhe)。
6. 解説 "ex" は「使い方の核心＋よくある間違い」を書く。日本語/英語/韓国語で、それぞれ40〜120字程度。
   同じ級の似た文法点との違いに触れられるなら触れる。推測で断定しない。確かなことだけ書く。
7. 人称代名詞を取り違えない。男性=他、女性=她、動物=牠、物=它。
   「媽媽・姊姊・妹妹・女兒・太太・阿姨」などを指すなら必ず「她」。訳文の性も中国語と合わせる。
8. 各言語の欄には**その言語だけ**を書く。日本語欄(j)は日本語、英語欄(e)は英語、韓国語欄(k)は韓国語(ハングル)。
   韓国語欄に中国語をそのまま入れない。訳文はその言語として自然で文法的に正しい文にする
   (例: 複数のものは英語で "These are ..." にする)。
9. 出力は JSON 配列のみ。前後に説明文・コードフェンスを付けない。

各要素の形:
{"id":"...","cat":"<enum>","t":"官方の語法點名","g":{"j":"一言の意味","e":"...","k":"..."},
 "p":{"j":"文型(例: A ＋ 是 ＋ B)","e":"...","k":"..."},
 "ex":{"j":"解説","e":"...","k":"..."},
 "eg":[{"z":"...<em>...</em>...","py":"...","j":"訳","e":"訳","k":"訳"},{...}]}

cat は次から1つ選ぶ: ${CATS.join(" / ")}`;

function ask(prompt, model) {
  return new Promise((res, rej) => {
    execFile("claude", ["-p", "--model", model, "--append-system-prompt", SYS, prompt],
      { maxBuffer: 64 * 1024 * 1024, timeout: 600000 },
      (err, so, se) => err ? rej(new Error((se || "").slice(0, 400) + " " + err.message)) : res(so));
  });
}
function parse(txt) {
  const s = txt.indexOf("["), e = txt.lastIndexOf("]");
  if (s < 0 || e < 0) throw new Error("JSON 配列が見つからない");
  return JSON.parse(txt.slice(s, e + 1));
}

const SIZE = Number(process.env.SIZE || 5);
const PAR = Number(process.env.PAR || 6);
const MODEL = process.env.MODEL || "sonnet";
const only = process.env.ONLY ? process.env.ONLY.split(",").map(Number) : null;

const todo = spine.filter(s => !only || only.includes(s.lv));
const batches = [];
for (let i = 0; i < todo.length; i += SIZE) batches.push(todo.slice(i, i + SIZE));

function body(b) {
  return "次の語法點について学習カードを書いてください。JSON 配列で " + b.length + " 件、順番どおりに。\n\n" +
    b.map(s => `--- id: ${s.id}\n級別: 第${s.lv}級 (${s.tier})\n語法點: ${s.name}\n` +
      (s.free
        ? `官方例句は文ではなく読み方の一覧です: ${s.anchor}\nこれを踏まえて、eg は自分で自然な文を2つ書いてください。`
        : s.anchor.includes("_")
          ? `官方例句(「_」は省略される要素): ${s.anchor}\nこれを自然な完全文にして eg[0].z に使う。名詞句だけで終わらせない。`
          : `eg[0].z に必ずこの文をそのまま使う: ${s.anchor}`) +
      (s.eg.length > 1 ? `\n(官方例句の全体: ${s.eg.join(" / ")})` : "")).join("\n\n");
}

let done = 0, failed = [];
async function run(b, bi) {
  const f = path.join(OUT, "b_" + b[0].id + "_" + b.length + ".json");
  if (fs.existsSync(f)) { done++; return; }
  let last = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const txt = await ask(body(b) + (last ? "\n\n前回の出力に次の問題がありました。指摘された点を直したうえで、**他の規則(<em>・拼音・言語・官方例句)もすべて守って全件を出し直して**ください:\n" + last : ""), MODEL);
      const arr = parse(txt);
      if (arr.length !== b.length) throw new Error(`件数が ${arr.length}、期待は ${b.length}`);
      const errs = [];
      arr.forEach((o, i) => {
        o.id = b[i].id; o.off = b[i].off; o.lv = b[i].lv;
        check(o, b[i]).forEach(x => errs.push(`[${b[i].id} ${b[i].name}] ${x}`));
        o.t = b[i].name;                                  // 表記は官方のまま。ゆれを残さない
      });
      if (errs.length) throw new Error(errs.join("\n"));
      fs.writeFileSync(f, JSON.stringify(arr, null, 1));
      done++;
      process.stdout.write(`\r${done}/${batches.length} batches`);
      return;
    } catch (e) { last = String(e.message).slice(0, 2000); }
  }
  failed.push({ bi, ids: b.map(x => x.id), why: last });
  process.stdout.write(`\r${done}/${batches.length} batches (失敗 ${failed.length})`);
}

const q = batches.map((b, i) => [b, i]);
await Promise.all(Array.from({ length: PAR }, async () => {
  while (q.length) { const [b, i] = q.shift(); await run(b, i); }
}));
console.log("\n完了", done, "/", batches.length, "失敗", failed.length);
if (failed.length) fs.writeFileSync(path.join(OUT, "_failed.json"), JSON.stringify(failed, null, 1));
