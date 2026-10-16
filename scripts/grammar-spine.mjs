// 官方 TBCL 語法點表(496點) → 骨架 JSON。生成の土台。
// 官方が正本:語法點名・級別・例句はここから動かさない。
import fs from "node:fs";
import path from "node:path";
const ROOT = path.resolve(import.meta.dirname, "..");
const off = JSON.parse(fs.readFileSync(path.join(ROOT, "data/tbcl/grammar.json"), "utf8"));

// 官方例句は「1. … 2. … 3. …」と複数入ることがある。分解して候補にする
function splitEg(s) {
  const t = String(s || "").trim();
  const parts = t.split(/\s*\d+[.．、]\s*/).map(x => x.trim()).filter(Boolean);
  const src = (parts.length > 1 ? parts : [t]).map(x => x.replace(/^[A-Za-z甲乙]\s*[：:]\s*/, ""));
  // 1つの欄に「。」で2文入っている場合も分ける(例:「圖書館附近沒有公園。我沒錢。」)
  const out = [];
  for (const p of src) {
    const sents = p.split(/(?<=[。！？])/).map(x => x.trim()).filter(Boolean);
    out.push(...(sents.length > 1 ? sents : [p]).map(x => x.replace(/^[A-Za-z甲乙]\s*[：:]\s*/, "").trim()).filter(Boolean));
  }
  return out;
}

// 語法點名から漢字だけ抜く。どの例文がその点を見せている文かを当てるのに使う
const keyChars = name => [...String(name)].filter(c => /[\u3400-\u9fff]/.test(c));

const spine = off.map(r => {
  const lv = Number(String(r["級別"]).replace(/\D/g, ""));
  const no = Number(r["序號"]);
  return {
    id: "g" + lv + "-" + String(no).padStart(3, "0"),
    off: no,
    lv,
    tier: r["等別"],
    name: String(r["語法點"]).trim(),
    eg: splitEg(r["例句"]),
  };
}).map(x => {
  // 官方例句が対話(「A：… B：…」)や複数文のとき、その語法點を実際に見せている文はどれか。
  // 例:「不」の例句は「A：你是學生嗎？B：我不是（學生）。」— 見せているのは後ろの文。
  // 「可不是」「怎麼說呢」のように、官方例句が A の問い→B の答え で、点は B 側にある形がある。
  // まず語法點名がまるごと入っている文を探し、無ければ構成する漢字のどれかが入っている文にする。
  const kc = keyChars(x.name);
  const whole = String(x.name).replace(/[.．…\s（）()「」]/g, "").replace(/[0-9]+$/, "");
  const full = whole && whole.length > 1 ? x.eg.find(s => s.includes(whole)) : null;
  const hit = full || (kc.length ? x.eg.find(s => kc.some(c => s.includes(c))) : null);
  x.anchor = hit || x.eg[0] || "";
  // 「稱數法」「四則運算」「小數點」の例句は文ではなく読み方の一覧。そのまま例文にはできない
  x.free = /[0-9]/.test(x.anchor) && (x.anchor.length > 30 || /\s/.test(x.anchor));
  return x;
});
fs.writeFileSync(path.join(ROOT, "data/tbcl/grammar-spine.json"), JSON.stringify(spine, null, 1));
const by = {};
for (const s of spine) by[s.lv] = (by[s.lv] || 0) + 1;
console.log("spine", spine.length, by);
console.log("例句が2つ以上ある点:", spine.filter(s => s.eg.length > 1).length);
console.log(JSON.stringify(spine.slice(0, 3), null, 1));
