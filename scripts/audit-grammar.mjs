// 出来上がった grammar-l1..l6.js を最後にもう一度ぜんぶ見る。
// 生成時の検査をすり抜けたもの(手書き分・組み立てのミス)をここで拾う。
//   node scripts/audit-grammar.mjs
import fs from "node:fs";
import path from "node:path";
const ROOT = path.resolve(import.meta.dirname, "..");
// 簡体字だけに使う字。表は官方 TBCL の詞語表・例句と手元の語彙から「繁體でも使う字」を引いて作る
// (手書きの一覧だと 餐・困・食 のような繁體でも普通の字を誤検出した)
const SIMP = new Set([...JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/simplified-only.json"), "utf8"))]);
const files = ["l1", "l2", "l3", "l4", "l5", "l6"];
const strip = (x) => String(x || "").replace(/<[^>]*>/g, "");
let bad = 0, total = 0;
const ids = new Map(), titles = new Map();
for (const lv of files) {
  const f = path.join(ROOT, `grammar-${lv}.js`);
  const src = fs.readFileSync(f, "utf8");
  const nm = src.match(/const\s+(GRAMMAR_[A-Z0-9_]+)\s*=/)[1];
  const A = new Function(`${src}\nreturn ${nm};`)();
  for (const g of A) {
    total++;
    const say = (m) => { bad++; console.log(`  ✗ [${lv} ${g.id} ${g.t}] ${m}`); };
    if (!g.id || !g.t || !g.cat) say("id/t/cat が無い");
    if (ids.has(g.id)) say("id が重複: 既に " + ids.get(g.id)); else ids.set(g.id, lv);
    const tk = lv + "|" + g.t;
    if (titles.has(tk)) say("同じ級に同じ語法點名が2つ"); else titles.set(tk, 1);
    for (const k of ["g", "p", "ex"]) for (const l of ["j", "e", "k"])
      if (!g[k] || !String(g[k][l] || "").trim()) say(`${k}.${l} が空`);
    if (!Array.isArray(g.eg) || g.eg.length < 1) { say("例文が無い"); continue; }
    g.eg.forEach((e, i) => {
      const z = strip(e.z);
      for (const c of z) if (SIMP.has(c)) say(`eg[${i}] に簡体字「${c}」: ${z}`);
      if (!/<em>/.test(String(e.z))) say(`eg[${i}] に <em> が無い`);
      for (const l of ["py", "j", "e", "k"]) if (!String(e[l] || "").trim()) say(`eg[${i}].${l} が空`);
      const ee = String(e.e || "");
      const she = /\b(she|her|hers)\b/i.test(ee), he = /\b(he|him|his)\b/i.test(ee);
      if (/她/.test(z) && !/他/.test(z) && he && !she) say(`eg[${i}] 中文は她・英訳は he: ${z} / ${ee}`);
      if (/他/.test(z) && !/她/.test(z) && she && !he) say(`eg[${i}] 中文は他・英訳は she: ${z} / ${ee}`);
    });
  }
  console.log(`${lv}: ${A.length} 点`);
}
console.log(`\n合計 ${total} 点 / 問題 ${bad} 件`);
process.exit(bad ? 1 : 0);
