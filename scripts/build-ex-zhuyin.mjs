// 例文の注音を data/ex-zhuyin.json に足す。
//   対象: grammar-l*.js の例文(eg.z)、vocab-l*.js の例文(ex.z) で、まだ注音が無いもの。
//   拼音(語ごとにまとまった書き方)を音節表で切り、py2zy.js で注音にする。
//   1 字 1 音節で数が合わない・切り方が一つに決まらない文は書かない(間違った注音を出すより無いほうがいい)。
//   node scripts/build-ex-zhuyin.mjs [--dry]
import fs from "node:fs";
import path from "node:path";
const ROOT = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");
const CJK = /[㐀-鿿]/;

// py2zy.js は window に関数を置く形。window を用意して読む
const win = {};
new Function("window", fs.readFileSync(path.join(ROOT, "py2zy.js"), "utf8"))(win);
const py2zy = win.py2zy;
if (typeof py2zy !== "function") throw new Error("py2zy が読めない");

const TBCL = new Function(fs.readFileSync(path.join(ROOT, "tbcl.js"), "utf8") + "\nreturn STW_TBCL;")();
const zyNorm = (z) => String(z || "").replace(/\u4e00/g, "ㄧ").trim().split(/\s+/).filter(Boolean).map((t) => t.replace(/^(.+)˙$/, "˙$1"));
const SYL = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/pinyin-syllables.json"), "utf8")));
const TONE_MAP = { "ā":"a","á":"a","ǎ":"a","à":"a","ē":"e","é":"e","ě":"e","è":"e","ī":"i","í":"i","ǐ":"i","ì":"i",
  "ō":"o","ó":"o","ǒ":"o","ò":"o","ū":"u","ú":"u","ǔ":"u","ù":"u","ǖ":"v","ǘ":"v","ǚ":"v","ǜ":"v","ü":"v","ê":"e" };
const plain = (s) => String(s).toLowerCase().replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüê]/g, (c) => TONE_MAP[c] || c);
// 語 1 つ(声調つき)を音節に切る。切り方が 1 通りのときだけ返す
function splitWord(word) {
  const w = word.replace(/[^A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüê']/g, "");
  if (!w) return [];
  if (w.includes("'")) return w.split("'").flatMap(splitWord);   // xi'an の区切り
  const p = plain(w);
  const memo = new Map();
  function ways(i) {
    if (i === p.length) return [[]];
    if (memo.has(i)) return memo.get(i);
    const out = [];
    for (let n = Math.min(6, p.length - i); n >= 1; n--) {
      if (!SYL.has(p.substr(i, n))) continue;
      for (const rest of ways(i + n)) { out.push([[i, n], ...rest]); if (out.length > 8) break; }
    }
    memo.set(i, out); return out;
  }
  const all = ways(0);
  if (!all.length) return null;
  // 最少音節の切り方だけ残す(r/n などの 1 字音節を使う切り方は捨てる)
  const min = Math.min(...all.map((a) => a.length));
  const uniq = new Map();
  for (const a of all.filter((a) => a.length === min)) uniq.set(a.map(([i, n]) => p.substr(i, n)).join(" "), a.map(([i, n]) => w.substr(i, n)));
  const cands = [...uniq.values()];
  return cands.length === 1 ? cands[0] : { amb: cands };        // 歧義は候補ごと返して、漢字側で決める
}
function toZy(py, hz) {
  const hanziN = hz.length;
  const words = String(py).split(/[\s,，。！？；：、（）()「」"“”—–\-]+/).filter((x) => /[A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/.test(x));
  const syls = [];
  let at = 0;                                                   // いま何字目か
  for (const w of words) {
    let s = splitWord(w);
    if (s === null) return null;
    if (s.amb) {
      // 「kěnéng」= ke+neng / ken+eng。その位置の漢字「可能」を官方詞表で引けば読みが決まる
      const n = s.amb[0].length, word = hz.slice(at, at + n).join("");
      const ref = TBCL[word] ? zyNorm(TBCL[word][1]) : null;
      const pick = ref && s.amb.find((c) => c.map((x) => py2zy(x).replace(/^(.+)˙$/, "˙$1").replace(/[ˊˇˋ˙]/g, "")).join(" ") === ref.map((t) => t.replace(/[ˊˇˋ˙]/g, "")).join(" "));
      if (!pick) return null;
      s = pick;
    }
    syls.push(...s); at += s.length;
  }
  if (syls.length !== hanziN) return null;
  const out = syls.map((s) => { const z = py2zy(s); return z && /[ㄅ-ㄩ]/.test(z) ? z.replace(/^(.+)˙$/, "˙$1") : null; });
  if (out.some((z) => !z)) return null;
  return out.join(" ");
}

const exzyPath = path.join(ROOT, "data/ex-zhuyin.json");
const exzy = JSON.parse(fs.readFileSync(exzyPath, "utf8"));
const strip = (z) => String(z).replace(/<[^>]*>/g, "");
const hanzi = (z) => [...strip(z)].filter((c) => CJK.test(c)).length;
let added = 0, skipped = 0, seen = 0;
const loadConst = (file, re) => {
  const src = fs.readFileSync(file, "utf8");
  const names = [...src.matchAll(re)].map((m) => m[1]);
  const got = new Function(`${src}\nreturn {${names.map((n) => `${n}:typeof ${n}!=="undefined"?${n}:null`).join(",")}};`)();
  return names.flatMap((n) => (Array.isArray(got[n]) ? got[n] : []));
};
const pairs = [];
for (const lv of ["l1", "l2", "l3", "l4", "l5", "l6"]) {
  for (const g of loadConst(path.join(ROOT, `grammar-${lv}.js`), /const\s+(GRAMMAR_[A-Z0-9_]+)\s*=/g))
    for (const e of g.eg || []) if (e.z && e.py) pairs.push([strip(e.z), e.py]);
  for (const suf of ["", "-b", "-c", "-d"]) {
    const f = path.join(ROOT, `vocab-${lv}${suf}.js`);
    if (!fs.existsSync(f)) continue;
    for (const v of loadConst(f, /const\s+(VOCAB_[A-Z0-9_]+)\s*=/g)) if (v.ex && v.ex.z && v.ex.py) pairs.push([v.ex.z, v.ex.py]);
  }
}
try {   // 片語(phrases-l1.js)にも注音が無かった
  for (const sec of loadConst(path.join(ROOT, "phrases-l1.js"), /const\s+(PHRASES_L1)\s*=/g)) for (const it of sec.items || []) if (it.z && it.py) pairs.push([it.z, it.py]);
} catch (e) {}
const miss = [];
for (const [z, py] of pairs) {
  seen++;
  if (exzy[z]) continue;
  const zy = toZy(py, [...strip(z)].filter((c) => CJK.test(c)));
  if (!zy) { skipped++; if (miss.length < 8) miss.push(z + " | " + py); continue; }
  exzy[z] = zy; added++;
}
if (!DRY) fs.writeFileSync(exzyPath, JSON.stringify(exzy));
console.log(`例文 ${seen} 文 / 既にあった ${seen - added - skipped} / 追加 ${added} / 切れず見送り ${skipped}`);
if (miss.length) console.log("見送りの例:\n  " + miss.join("\n  "));
