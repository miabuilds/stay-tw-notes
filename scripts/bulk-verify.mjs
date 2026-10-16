// 候補語を萌典(教育部)に問い合わせて、読みを作り直す。
//   node scripts/bulk-verify.mjs > data/verified.json
//
// dict-ext.json には既に zy/py が入っているが、それは信用しない。
// あの表は記事のトークン化から育ったもので、読みの出所が揃っていない。
// ここで捨てて、萌典の見出しから引き直す(利用者の要望:読みは必ず教育部)。
//
// 落とすもの:
//   ・萌典に見出しが無い語        → そもそも語として怪しい(「的是」「不只」など)
//   ・読みが 2 つ以上ある語        → 文脈なしにどちらか決められない
//   ・注音→拼音に落とせない語      → 音節表に無い＝何かおかしい
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const CACHE = path.join(ROOT, 'scripts', '.moedict_bulk.json');
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
let dirty = 0;

const js = fs.readFileSync(path.join(ROOT, 'py2zy.js'), 'utf8');
const M = Object.fromEntries([...js.match(/var M=\{(.*?)\};/s)[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)].map(m => [m[1], m[2]]));
const ZY2PY = Object.fromEntries(Object.entries(M).map(([k, v]) => [v, k]));
const TONE = { "ˊ": 2, "ˇ": 3, "ˋ": 4 };
const MARK = { 1: "̄", 2: "́", 3: "̌", 4: "̀" };
function accent(base, t) {
  if (t === 5) return base;
  let i = -1;
  for (const v of "aoe") { const j = base.indexOf(v); if (j >= 0) { i = j; break; } }
  if (i < 0) { const m = [...base].map((c, k) => "iuü".includes(c) ? k : -1).filter(k => k >= 0); if (!m.length) return base; i = m[m.length - 1]; }
  return (base.slice(0, i + 1) + MARK[t] + base.slice(i + 1)).normalize("NFC");
}
function syl(z) {
  let t = 1;
  if (z.startsWith("˙")) { z = z.slice(1); t = 5; }
  for (const [mk, n] of Object.entries(TONE)) if (z.endsWith(mk)) { z = z.slice(0, -1); t = n; break; }
  let b = ZY2PY[z];
  if (!b && z.endsWith("ㄦ") && ZY2PY[z.slice(0, -1)]) b = ZY2PY[z.slice(0, -1)] + "r";
  return b ? accent(b, t) : null;
}
async function moe(w) {
  if (cache[w]) return cache[w];
  let out = { bopomofo: [] };
  try {
    const r = await fetch("https://www.moedict.tw/uni/" + encodeURIComponent(w));
    if (r.ok) {
      const d = await r.json();
      out = { bopomofo: (d.heteronyms || []).map(h => h.bopomofo).filter(Boolean) };
    }
  } catch (e) {}
  cache[w] = out;
  if (++dirty % 40 === 0) fs.writeFileSync(CACHE, JSON.stringify(cache));
  return out;
}

const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'dict-ext.json'), 'utf8'));
const have = new Set();
for (const f of fs.readdirSync(ROOT).filter(x => /^vocab-l\d(-[bc])?\.js$/.test(x))) {
  const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const m of s.matchAll(/[{,]\s*"?w"?\s*:\s*"([^"]+)"/g)) have.add(m[1]);
}
const cand = Object.keys(dict).filter(k => [...k].length >= 2 && !have.has(k));
process.stderr.write(`候補 ${cand.length}\n`);

const ok = [], drop = { nomoe: 0, multi: 0, conv: 0, len: 0 };
for (let i = 0; i < cand.length; i++) {
  const w = cand[i];
  const g = await moe(w);
  if (!g.bopomofo.length) { drop.nomoe++; continue; }
  if (g.bopomofo.length > 1) { drop.multi++; continue; }
  const zy = g.bopomofo[0], parts = zy.split(/\s+/);
  if (parts.length !== [...w].length) { drop.len++; continue; }
  const py = parts.map(syl);
  if (py.some(x => !x)) { drop.conv++; continue; }
  const e = dict[w];
  ok.push({ w, zy, py: py.join(""), m: { j: e.j || "", e: e.e || "", k: e.k || "" }, d: e.d || "" });
  if (i % 200 === 0) process.stderr.write(`  ${i}/${cand.length} 通過 ${ok.length}\n`);
}
fs.writeFileSync(CACHE, JSON.stringify(cache));
process.stderr.write(`通過 ${ok.length} / 落とし ${JSON.stringify(drop)}\n`);
console.log(JSON.stringify(ok, null, 1));
