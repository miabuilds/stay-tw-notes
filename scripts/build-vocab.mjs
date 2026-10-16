// out/vocab-gen/*.json → vocab-l1..l6-d.js と data/ex-zhuyin.json への追記。
//   node scripts/build-vocab.mjs [--dry]
// -d は「官方 TBCL 詞語表を埋めた語」。全部 pro:1(Premium 限定)。既存の語は一つも触らない。
// ファイルは 1 行 1 語で、場面ごとに「// ── 場面 ──」を挟む(build-lessons.mjs の themeMap がこれを読む)。
import fs from "node:fs";
import path from "node:path";
const ROOT = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");
const dir = path.join(ROOT, "out/vocab-gen");
const all = fs.readdirSync(dir).filter((f) => f.startsWith("b_") && f.endsWith(".json"))
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
const seen = new Set(); const uniq = [];
for (const o of all) { if (seen.has(o.w)) continue; seen.add(o.w); uniq.push(o); }
console.log("生成ぶん", all.length, "語 → 重複を除いて", uniq.length);

const exzyPath = path.join(ROOT, "data/ex-zhuyin.json");
const exzy = JSON.parse(fs.readFileSync(exzyPath, "utf8"));
let addedZy = 0;
const by = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
for (const o of uniq) by[o.lv].push(o);
for (const lv of Object.keys(by)) {
  const arr = by[lv];
  // 場面でまとめる。場面が無い語(核心詞)は後ろ、品詞順
  const order = { 名: 0, 動: 1, 形: 2, 副: 3, 量: 4, 數: 5, 代: 6, 連: 7, 介: 8, 助: 9, 嘆: 10, 疑: 11, 成: 12 };
  arr.sort((a, b) => (a.sit ? 0 : 1) - (b.sit ? 0 : 1) || String(a.sit).localeCompare(String(b.sit)) || (order[a.c] ?? 99) - (order[b.c] ?? 99));
  const lines = [];
  let cur = null;
  for (const o of arr) {
    const sit = o.sit || "";
    if (sit !== cur) { cur = sit; if (sit) lines.push(`// ── ${sit} ──`); else lines.push("// ── (核心詞・場面なし) ──"); }
    const entry = { w: o.w, py: o.py, zy: o.zy, c: o.c, m: o.m, ex: { z: o.ex.z, py: o.ex.py, j: o.ex.j, e: o.ex.e, k: o.ex.k }, pro: 1 };
    lines.push(JSON.stringify(entry) + ",");
    const key = String(o.ex.z);
    if (!exzy[key] && o.ex.zy) { exzy[key] = o.ex.zy; addedZy++; }
  }
  if (lines.length && lines[lines.length - 1].endsWith(",")) lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
  const name = `VOCAB_L${lv}_D`;
  const src = `// StayTW Study — TOCFL Level ${lv} 語彙 (d)
// 官方 TBCL 詞語表(國家教育研究院)にあってアプリに無かった語。読み・級は官方の値そのまま、
// 品詞・訳・例文はこちらで書き、例文の読みは官方表と照合して通ったものだけ。
// pro:1 = Premium 限定。作り直し: node scripts/gen-vocab.mjs → node scripts/build-vocab.mjs
const ${name} = [
${lines.join("\n")}
];
if (typeof window !== "undefined") window.${name} = ${name};
if (typeof module !== "undefined") module.exports = { ${name} };
`;
  if (!DRY) fs.writeFileSync(path.join(ROOT, `vocab-l${lv}-d.js`), src);
  console.log(`l${lv}: ${arr.length} 語`);
}
if (!DRY) fs.writeFileSync(exzyPath, JSON.stringify(exzy));
console.log("ex-zhuyin 追記", addedZy, "文 / 合計", Object.keys(exzy).length);
