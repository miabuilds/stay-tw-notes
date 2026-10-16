// 生成した官方 496 点 + 官方に無い手書きの点 → grammar-l1..l6.js を書き出す。
//   node scripts/build-grammar.mjs [--dry]
//
// 級の割り当ては官方どおり。TBCL の語法點表は第1〜5級しかないので:
//   官方 第N級 → lN (N=1..5)。l6 は官方外の書面語・進階だけ。
// 手書きの 98 点のうち、官方に対応が無いものだけ「官方外」として元の級に残す。
// 何を残すかは目で確かめて決めた(下の KEEP)。自動判定にすると重複か取りこぼしが必ず出る。
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");

// 官方 496 点に対応が無い手書きの点。元の級に残す
const KEEP = new Set([
  "l1-5",                                                  // 很＋形容詞(官方は狀態動詞側で扱うため語法點表に無い)
  "l2-16",                                                 // 每…都…
  "l3-13",                                                 // 到底
  "l4-4", "l4-11", "l4-12", "l4-15",                       // 凡是 / 針對 / 進而 / 未免
  "l5-1", "l5-2", "l5-3", "l5-4", "l5-5", "l5-6", "l5-7",  // 倘若 縱使 姑且 不妨 固然 鑑於 以免
  "l5-8", "l5-9", "l5-10", "l5-11", "l5-13", "l5-15", "l5-16", // 以至於 乃至 無非 不外乎 與其…不如 勢必 免不了
  "l6-1", "l6-2", "l6-3", "l6-5", "l6-6", "l6-7", "l6-9", "l6-10", "l6-13", // 惟 縱使…亦 遑論 是以 從而 以致 有鑑於 唯有…才 無異於
]);

function loadOld(lv) {
  const f = path.join(ROOT, `grammar-${lv}.js`);
  if (!fs.existsSync(f)) return [];
  const src = fs.readFileSync(f, "utf8");
  const names = [...src.matchAll(/const\s+(GRAMMAR_[A-Z0-9_]+)\s*=/g)].map((m) => m[1]);
  const got = new Function(`${src}\nreturn {${names.map((n) => `${n}:typeof ${n}!=="undefined"?${n}:null`).join(",")}};`)();
  return names.flatMap((n) => (Array.isArray(got[n]) ? got[n] : []));
}

const gen = fs.readdirSync(path.join(ROOT, "out/grammar-gen"))
  .filter((f) => f.startsWith("b_") && f.endsWith(".json"))
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(ROOT, "out/grammar-gen", f), "utf8")));
gen.sort((a, b) => a.off - b.off);

const spine = JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/grammar-spine.json"), "utf8"));
const have = new Set(gen.map((g) => g.id));
const lack = spine.filter((s) => !have.has(s.id));
if (lack.length) console.warn("⚠ まだ生成できていない語法點:", lack.length, lack.slice(0, 8).map((x) => x.id + " " + x.name).join(" / "));

const out = { l1: [], l2: [], l3: [], l4: [], l5: [], l6: [] };
for (const g of gen) out["l" + g.lv].push(g);

// 官方外の手書き分を後ろに足す
let kept = 0;
for (const lv of ["l1", "l2", "l3", "l4", "l5", "l6"]) {
  for (const g of loadOld(lv)) if (KEEP.has(g.id)) { g.off = 0; out[lv].push(g); kept++; }
}
const missKeep = [...KEEP].filter((id) => !Object.values(out).some((a) => a.some((g) => g.id === id)));
if (missKeep.length) console.warn("⚠ KEEP に書いたのに見つからない:", missKeep.join(", "));

const NAME = { l1: "GRAMMAR_L1", l2: "GRAMMAR_L2", l3: "GRAMMAR_L3", l4: "GRAMMAR_L4", l5: "GRAMMAR_L5", l6: "GRAMMAR_L6" };
for (const lv of Object.keys(out)) {
  const n = Number(lv[1]);
  const body = out[lv].map((g) => JSON.stringify({
    id: g.id, cat: g.cat, t: g.t, g: g.g, p: g.p, ex: g.ex, eg: g.eg,
  })).join(",\n");
  const src = `// StayTW Study — TOCFL Level ${n} 文法
// 正本: 國家教育研究院「臺灣華語文能力基準(TBCL)」語法點表 496 点。
//   第${n}級 の点をそのまま並べ、最後に官方の表に無い点(書面語・進階)を足している。
//   語法點名(t)と1つ目の例文は官方のまま。説明と訳と2つ目の例文はこちらで書いた。
//   作り直し: node scripts/gen-grammar.mjs → node scripts/build-grammar.mjs
// 形式: id, cat, t=語法點名, g=一言の意味, p=文型, ex=解説, eg=例文[{z,py,j,e,k}]
const ${NAME[lv]} = [
${body}
];
if (typeof window !== "undefined") window.${NAME[lv]} = ${NAME[lv]};
`;
  if (!DRY) fs.writeFileSync(path.join(ROOT, `grammar-${lv}.js`), src);
  console.log(`${lv}  ${out[lv].length} 点  (官方 ${out[lv].filter((g) => g.off).length} / 官方外 ${out[lv].filter((g) => !g.off).length})`);
}
console.log("合計", Object.values(out).reduce((a, b) => a + b.length, 0), "点 / 官方外", kept);
