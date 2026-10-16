// 官方 TBCL 詞語表にあってアプリに無い語(第1〜6級)を埋める。
//   読み(注音・拼音)と級は官方の値をそのまま使い、モデルには 品詞・訳・例文 だけ書かせる。
//   例文の注音は、文中の見出し語ぶんが官方の注音と一致しなければ落とす(破音字の取り違えをここで止める)。
//   node scripts/gen-vocab.mjs            全部   (SIZE/PAR/ONLY/LIMIT は環境変数)
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out/vocab-gen");
fs.mkdirSync(OUT, { recursive: true });

// ── いま持っている語 ──
function loadArrays(file) {
  const src = fs.readFileSync(file, "utf8");
  const names = [...src.matchAll(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/g)].map((m) => m[1]);
  if (!names.length) return [];
  const got = new Function(`${src}\nreturn {${names.map((n) => `${n}:typeof ${n}!=="undefined"?${n}:null`).join(",")}};`)();
  return names.flatMap((n) => (Array.isArray(got[n]) ? got[n] : []));
}
const have = new Set();
for (const f of fs.readdirSync(ROOT).filter((f) => /^vocab-l\d(-[bc])?\.js$/.test(f)))
  for (const v of loadArrays(path.join(ROOT, f))) have.add(v.w);

// ── 官方表 → 足りない語 ──
// 語の見出し・読み・級は tbcl.js(build-tbcl.mjs が官方表を整えたもの)から取る。
// 原表は「哥哥/哥」「姊姊/姐姐/姊/姐」のように異形を 1 行に並べていて、そのままでは見出しにならない。
// tbcl.js は異形ごとに 1 語、読みも音節数で対応づけ済み、overrides も適用済み。
const CJK = /[\u3400-\u9fff]/;
const zyNorm = (s) => String(s || "").replace(/\u4e00/g, "ㄧ").trim().split(/\s+/).filter(Boolean)
  .map((t) => t.replace(/^(.+)˙$/, "˙$1")).join(" ");
const TBCL = new Function(fs.readFileSync(path.join(ROOT, "tbcl.js"), "utf8") + "\nreturn STW_TBCL;")();
// 場面(situation)は原表から。異形は「/」で割って同じ場面を付ける
const SIT = Object.create(null);
for (const r of JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/words.json"), "utf8"))) {
  const sit = String(r.situation || "").trim();
  if (!sit || sit === "核心詞") continue;                   // 核心詞は場面ではない
  for (const w of String(r.word).split("/")) { const k = w.replace(/\d+$/, "").trim(); if (k && !SIT[k]) SIT[k] = sit; }
}
// 原表の 1 行に「老闆/老板」「手錶/手表/錶/表1」と異形が並ぶ。同じ長さの異形は同じ語の別表記なので、
// 先頭(官方が最初に置いた書き方。老闆・手錶・台灣)だけ作る。既に持っている書き方があればその組は全部飛ばす
const SKIP = new Set();
for (const r of JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/words.json"), "utf8"))) {
  const vs = String(r.word).split("/").map((x) => x.replace(/\d+$/, "").trim()).filter(Boolean);
  if (vs.length < 2) continue;
  const byLen = {}; vs.forEach((v) => (byLen[v.length] = byLen[v.length] || []).push(v));
  for (const g of Object.values(byLen)) {
    if (g.length < 2) continue;
    const keep = g.find((v) => have.has(v)) || g[0];
    g.forEach((v) => { if (v !== keep) SKIP.add(v); });
  }
}
const todoAll = [];
for (const w of Object.keys(TBCL)) {
  if (SKIP.has(w)) continue;
  const [lv0, zy, py] = TBCL[w];
  // 台湾華語だけ作る(2026-10-05)。原表は「那裡/那裏/那兒」のように異体字・児化も並べるので、それを落とす。
  // 裏・着は異体字(台湾の標準字は 裡・著)、軽声なしの ㄦ で終わるのは児化(那兒・一點兒…)
  if (/[裏着]/.test(w) || /(^|\s)ㄦ$/.test(zyNorm(zy))) continue;
  if (lv0 > 6) continue;                       // 官方第7級(4,982 語)は TOCFL 六級の外。L6 に 9,000 語を積まない
  const lv = lv0;
  if (!CJK.test(w) || have.has(w)) continue;
  todoAll.push({ w, lv, zy: zyNorm(zy), py: String(py || "").trim(), sit: SIT[w] || "" });
}
todoAll.sort((a, b) => a.lv - b.lv);
const ONLY = process.env.ONLY ? process.env.ONLY.split(",").map(Number) : null;
let todo = todoAll.filter((x) => !ONLY || ONLY.includes(x.lv));
if (process.env.LIMIT) todo = todo.slice(0, Number(process.env.LIMIT));
console.log("足りない語", todoAll.length, "／ 今回", todo.length);

// ── 検査の道具 ──
const SIMP = new Set([...JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/simplified-only.json"), "utf8"))]);
const SYL = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/pinyin-syllables.json"), "utf8")));
const ZYS = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/syllables.json"), "utf8")).map((t) => t.replace(/[ˊˇˋ˙]/g, "")));
for (const w of Object.keys(TBCL)) for (const t of zyNorm(TBCL[w][1]).split(" ")) if (t) ZYS.add(t.replace(/[ˊˇˋ˙]/g, ""));
// 表に無くても、注音の組み立てとして正しい形(声母?+介音?+韻母? / ㄓㄔㄕㄖㄗㄘㄙ 単独)なら通す。ㄍㄟ(給)が表に無かった
const ZY_OK = (t) => ZYS.has(t) || (/^[ㄅ-ㄙ]?[ㄧㄨㄩ]?[ㄚ-ㄦ]?$/.test(t) && (/[ㄧㄨㄩㄚ-ㄦ]/.test(t) || /^[ㄓㄔㄕㄖㄗㄘㄙ]$/.test(t)));
const TONE_MAP = { "ā":"a","á":"a","ǎ":"a","à":"a","ē":"e","é":"e","ě":"e","è":"e","ī":"i","í":"i","ǐ":"i","ì":"i",
  "ō":"o","ó":"o","ǒ":"o","ò":"o","ū":"u","ú":"u","ǔ":"u","ù":"u","ǖ":"v","ǘ":"v","ǚ":"v","ǜ":"v","ü":"v","ń":"n","ň":"n","ǹ":"n","ê":"e" };
const plainPy = (s) => String(s).toLowerCase().replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹê]/g, (c) => TONE_MAP[c] || c);
function sylSet(word) {
  const w = plainPy(word).replace(/[^a-z]/g, "");
  if (!w) return new Set();
  const reach = Array.from({ length: w.length + 1 }, () => new Set()); reach[0].add(0);
  for (let i = 0; i < w.length; i++) { if (!reach[i].size) continue;
    for (let n = Math.min(6, w.length - i); n >= 1; n--) { if (!SYL.has(w.substr(i, n))) continue; for (const c of reach[i]) reach[i + n].add(c + 1); } }
  return reach[w.length];
}
function pyMin(py) {
  const words = String(py).split(/[\s'’\-–—,，。！？；：、（）()「」"]+/).filter((w) => /[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/.test(w));
  let acc = new Set([0]);
  for (const w of words) { const s = sylSet(w); if (!s.size) return null; const nx = new Set(); for (const a of acc) for (const b of s) nx.add(a + b); acc = nx.size > 40 ? new Set([...nx].slice(0, 40)) : nx; }
  return Math.min(...acc);
}
const hanzi = (s) => [...String(s)].filter((c) => CJK.test(c));
const POSOK = new Set(["名", "動", "形", "副", "量", "數", "代", "連", "介", "助", "嘆", "疑", "成"]);
const HAN = /[가-힯]/, KANA = /[぀-ヿ]/;

function check(o, sp) {
  const e = [];
  if (!o || typeof o !== "object") return ["object でない"];
  if (!POSOK.has(o.c)) e.push("c が範囲外: " + o.c);
  for (const l of ["j", "e", "k"]) if (!o.m || !String(o.m[l] || "").trim()) e.push(`m.${l} が空`);
  if (o.m && !HAN.test(String(o.m.k))) e.push("m.k がハングルでない: " + o.m.k);
  if (o.m) {
    const j = String(o.m.j || "").trim();
    // 日本語の訳語は かな を含むか、含まなくても短い漢語(銀行・医者)。中国語の定義文は「:」「，」や繁體だけの字で分かる
    // かなが有れば日本語。無ければ短い漢語(車・弟・二)だけ許す。
    // 「車」「愛」「時」は日本語でも使う字なので、繁體だけで使う字(們・這・說・麼…)に限って弾く
    const hasKana = KANA.test(j);
    const tradOnly = [...j].some((c) => "們這說麼兒歡會對關圖樣發號學國體幾與爲從裡這於".includes(c));
    const zhDef = !hasKana && (/[:：;；，]/.test(j) || j.length > 6);
    // 今年・前・上 のように日中で同じ字の語は j === w でも正しい
    if (tradOnly || zhDef) e.push("m.j が日本語の訳語でない(中国語の定義になっている): " + j);
    if (j.length > 30) e.push("m.j が長すぎる: " + j);
  }
  const x = o.ex || {};
  const z = String(x.z || "");
  if (!z.includes(sp.w)) e.push(`例文に「${sp.w}」が無い: ${z}`);
  const hz = hanzi(z);
  if (hz.length < 4 || hz.length > 18) e.push(`例文の長さ ${hz.length} 字(4〜18 にする): ${z}`);
  for (const c of hz) if (SIMP.has(c)) e.push(`例文に簡体字「${c}」: ${z}`);
  const digits = (z.match(/[0-9０-９]/g) || []).length;
  const pm = pyMin(x.py);
  if (pm == null) e.push(`拼音が音節に切れない: ${x.py}`);
  else if (Math.abs(pm - (hz.length + digits)) > 1) e.push(`拼音の音節数 ${pm} ≠ 字数 ${hz.length + digits}: ${x.py}`);
  if (!/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(String(x.py))) e.push("拼音に声調記号が無い");
  // 注音: 1 字 1 音節、表にある音節だけ、見出し語の部分は官方の注音と一致
  const zt = zyNorm(x.zy).split(" ").filter(Boolean);
  if (zt.length !== hz.length) e.push(`注音の音節数 ${zt.length} ≠ 漢字数 ${hz.length}: ${x.zy}`);
  else {
    for (const t of zt) if (!ZY_OK(t.replace(/[ˊˇˋ˙]/g, ""))) { e.push(`注音に無い音節「${t}」`); break; }
    const at = hz.join("").indexOf(sp.w);
    if (at >= 0 && sp.zy) {
      const got = zt.slice(at, at + hanzi(sp.w).length).join(" ");
      if (got !== sp.zy) e.push(`見出し語の注音が官方と違う: 文中=${got} ／ 官方=${sp.zy}`);
    }
    // 文の残りも、官方表にある 2 字以上の語は最長一致で切って読みを照らす。
    // 一・不 の変調だけは文脈で変わるので声調違いを許す。それ以外は音節も声調も官方どおりであること
    const hs = hz.join("");
    for (let i = 0; i < hs.length;) {
      let hit = "";
      for (let n = Math.min(4, hs.length - i); n >= 2; n--) { const t = hs.substr(i, n); if (TBCL[t]) { hit = t; break; } }
      if (!hit) { i++; continue; }
      if (hit.length < 3) { i += hit.length; continue; }      // 2 字は最長一致の切り誤り(都會=都+會)が多いので照らさない
      const want = zyNorm(TBCL[hit][1]).split(" "), got = zt.slice(i, i + hit.length);
      if (want.length === got.length) for (let k = 0; k < want.length; k++) {
        if (want[k] === got[k]) continue;
        const ch = hit[k];
        const same = want[k].replace(/[ˊˇˋ˙]/g, "") === got[k].replace(/[ˊˇˋ˙]/g, "");
        if ((ch === "一" || ch === "不") && same) continue;                       // 変調
        if (same && (want[k].includes("˙") || got[k].includes("˙"))) continue;      // 輕聲か本調か(漂亮・名字・晚上)は両方とも教育部の読み。見出し語以外は許す
        e.push(`文中の「${hit}」の注音が官方と違う: 文中=${got.join(" ")} ／ 官方=${want.join(" ")}`); break;
      }
      i += hit.length;
    }
  }
  for (const l of ["j", "e", "k"]) if (!String(x[l] || "").trim()) e.push(`ex.${l} が空`);
  if (!KANA.test(String(x.j))) e.push("ex.j が日本語でない: " + x.j);
  if (!HAN.test(String(x.k))) e.push("ex.k がハングルでない: " + x.k);
  const ee = String(x.e || ""), she = /\b(she|her|hers)\b/i.test(ee), he = /\b(he|him|his)\b/i.test(ee);
  if (/她/.test(z) && !/他/.test(z) && he && !she) e.push(`中文は她・英訳は he: ${z} / ${ee}`);
  if (/他/.test(z) && !/她/.test(z) && she && !he) e.push(`中文は他・英訳は she: ${z} / ${ee}`);
  return e;
}

const SYS = `あなたは台湾華語(繁體字・台灣用法)の単語帳の執筆者です。國家教育研究院 TBCL 詞語表の語に、品詞・訳・例文を付けます。

絶対規則:
1. 繁體字のみ。簡体字は 1 字も使わない。台灣の言い方(捷運・腳踏車・影片・便當・機車)。
2. 見出し語の読み(注音・拼音)は与えられた官方の値。例文の中でもその読み・その語義で使う。
   破音字に注意: 「好 ㄏㄠˇ」なら「好吃」の意味で、「好 ㄏㄠˋ(好む)」の意味では使わない。
3. 例文 ex.z は 6〜14 字の自然な文。その級の学習者が知っている語彙で、台灣での生活場面。見出し語を必ずそのまま含める。
4. ex.py は漢語拼音(声調記号つき)。語ごとにまとめ、語と語の間だけ半角スペース。文頭と固有名詞は大文字。
   例: "Wǒ zài Táiběi de gōngsī shàngbān."  漢字 1 字＝1 音節で数が必ず一致すること。
   変調(不 bù/bú・一 yī/yì/yí)、輕聲(了 le・的 de・嗎 ma・呢 ne・著 zhe・子 zi・們 men)を正しく。
5. ex.zy は例文の注音。漢字 1 字につき 1 音節、音節の間は半角スペース、句読点は書かない。
   第一声は無印、第二声 ˊ、第三声 ˇ、第四声 ˋ、輕聲は前に ˙(例: ˙ㄉㄜ)。「ㄧ」は注音の字(漢字の一ではない)。
   例: 我在台北的公司上班。→ "ㄨㄛˇ ㄗㄞˋ ㄊㄞˊ ㄅㄟˇ ˙ㄉㄜ ㄍㄨㄥ ㄙ ㄕㄤˋ ㄅㄢ"
6. 訳 m は短い語義(25 字以内)。j=日本語、e=英語、k=韓国語(ハングル)。
   j は日本語の訳語で書く。中国語の定義文にしない。
   例: 分 → j:"分（時間の単位）"  哥 → j:"お兄さん（呼びかけ）"  國 → j:"国"  和 → j:"〜と"
   × "分:時間單位,分鐘"(これは中国語)。
   韓国語欄に中国語をそのまま入れない。人称の性(他/她)を訳と一致させる。
   例文の中の他の語も、輕聲(媽媽 māma・東西 dōngxi)や破音字(行 xíng/háng)を台灣の読みどおりに。
7. 品詞 c は次から 1 つ: 名 動 形 副 量 數 代 連 介 助 嘆 疑 成(成語)。
8. 出力は JSON 配列のみ。前後に説明やコードフェンスを付けない。

各要素の形:
{"w":"見出し語","c":"名","m":{"j":"…","e":"…","k":"…"},
 "ex":{"z":"…","py":"…","zy":"…","j":"…","e":"…","k":"…"}}

ex の各欄の意味(取り違えが多いので必ず守る):
  ex.z = 中国語の例文そのもの
  ex.j = その例文の「日本語訳」。ひらがな・カタカナを必ず含む日本語の文。中国語の文をここに写さない
  ex.e = その例文の英訳、ex.k = その例文の韓国語訳(ハングル)
完全な例:
{"w":"按鈕","c":"名","m":{"j":"ボタン","e":"button","k":"버튼"},
 "ex":{"z":"請按下這個按鈕。","py":"Qǐng ànxià zhège ànniǔ.","zy":"ㄑㄧㄥˇ ㄢˋ ㄒㄧㄚˋ ㄓㄜˋ ˙ㄍㄜ ㄢˋ ㄋㄧㄡˇ",
       "j":"このボタンを押してください。","e":"Please press this button.","k":"이 버튼을 눌러 주세요."}}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function ask(prompt, model) {
  return new Promise((res, rej) => {
    const cp = execFile("claude", ["-p", "--model", model, "--append-system-prompt", SYS, prompt],
      { maxBuffer: 64 * 1024 * 1024, timeout: 600000 },
      (err, so, se) => (err ? rej(Object.assign(new Error("CLI: " + (se || "").trim().slice(-600) + " | " + err.message.slice(0, 120)), { cli: true })) : res(so)));
    try { cp.stdin.end(); } catch (e) {}                       // stdin を待たせない
  });
}
const parse = (t) => { const a = t.indexOf("["), b = t.lastIndexOf("]"); if (a < 0 || b < 0) throw new Error("JSON 配列が無い"); return JSON.parse(t.slice(a, b + 1)); };

const SIZE = Number(process.env.SIZE || 12), PAR = Number(process.env.PAR || 12), MODEL = process.env.MODEL || "sonnet";
const batches = []; for (let i = 0; i < todo.length; i += SIZE) batches.push(todo.slice(i, i + SIZE));
const body = (b) => "次の語に品詞・訳・例文を付けてください。JSON 配列で " + b.length + " 件、順番どおりに。\n\n" +
  b.map((s) => `--- ${s.w}\n級別: 第${s.lv}級${s.sit ? "  場面: " + s.sit : ""}\n官方の注音: ${s.zy}\n官方の拼音: ${s.py}`).join("\n\n");

let done = 0; const failed = [];
async function run(b) {
  const f = path.join(OUT, "b_" + b[0].lv + "_" + b[0].w + "_" + b.length + ".json");
  if (fs.existsSync(f)) { done++; return; }
  let last = "", cliFails = 0;
  for (let attempt = 0; attempt < 3 + 4; attempt++) {         // 内容の直しは 3 回まで、CLI の失敗はさらに 4 回まで待って再試行
    try {
      const arr = parse(await ask(body(b) + (last ? "\n\n前回の出力に次の問題がありました。指摘を直し、他の規則(繁體・注音・拼音・言語・見出し語を含む)もすべて守って全件を出し直してください:\n" + last : ""), MODEL));
      if (arr.length !== b.length) throw new Error(`件数 ${arr.length}、期待 ${b.length}`);
      const errs = [];
      arr.forEach((o, i) => {
        const sp = b[i];
        if (o.w !== sp.w) errs.push(`[${sp.w}] w が違う: ${o.w}`);
        check(o, sp).forEach((x) => errs.push(`[${sp.w}] ${x}`));
        // 読みと級は官方で上書き。モデルの値は使わない
        o.w = sp.w; o.zy = sp.zy; o.py = sp.py; o.lv = sp.lv; o.sit = sp.sit; o.pro = 1;
      });
      if (errs.length) throw new Error(errs.join("\n"));
      fs.writeFileSync(f, JSON.stringify(arr, null, 1));
      done++; process.stdout.write(`\r${done}/${batches.length}`);
      return;
    } catch (e) {
      last = String(e.message).slice(0, 2500);
      if (e.cli) { cliFails++; if (cliFails > 4) break; await sleep(20000 * cliFails); attempt--; continue; }   // 待ってやり直し(内容の回数は消費しない)
      if (attempt >= 2) break;
    }
  }
  failed.push({ ws: b.map((x) => x.w), why: last });
  process.stdout.write(`\r${done}/${batches.length} (失敗 ${failed.length})`);
}
const q = batches.slice();
await Promise.all(Array.from({ length: PAR }, async () => { while (q.length) await run(q.shift()); }));
console.log(`\n完了 ${done}/${batches.length}  失敗 ${failed.length}`);
if (failed.length) fs.writeFileSync(path.join(OUT, "_failed.json"), JSON.stringify(failed, null, 1));
