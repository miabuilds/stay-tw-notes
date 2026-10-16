// 官方 TBCL 詞語表 → 正本ルックアップ tbcl.js
//
// 出典: 國教院《14452詞語表202504》(教育部 臺灣華語文能力基準 TBCL)
//   https://coct.naer.edu.tw/page.jsp?ID=4
// 級別・注音・漢語拼音はこの表が正。TOCFL はこの基準で出題される。
// 第N級 と 第N*級 は同じ N 級(應用參考指引 p.27「難度相對較高的詞語以 * 字號標示」)。
//
// 原表には揺れがある。そのまま信じずに直す:
//  (1) NBSP / 全形空白、漢字「一」で打たれた「ㄧ」
//  (2) 輕聲記号の後置(ㄉㄜ˙) → 全站の書式 ˙ㄉㄜ に揃える
//  (3) 「帳號=ㄓㄤˋㄏㄠˋ」のように音節間の空白が抜けた行 → 音節表で切り直す
//  (4) 「這裡/這裏/這兒」に「ㄓㄜˋ/ㄓㄜˋ ㄌㄧˇ/ㄓㄜˋ ㄦ」のように異形と読みの
//      並びがずれた行がある。位置では組まず【音節数で突き合わせる】
//  (5) 「剛剛/剛」「語言/語」型は、短い異形が長い異形の頭なら先頭を切り出す
//  (6) 「模特兒」の兒化は字数より 1 音節少ない
//  (7) それでも決まらない行は捨てて data/tbcl/dropped.json に出す。当て推量では入れない
import fs from 'fs';
import path from 'path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const R = (p) => path.join(ROOT, p);

const rows = JSON.parse(fs.readFileSync(R('data/tbcl/words.json'), 'utf8'));
const SYL  = JSON.parse(fs.readFileSync(R('data/tbcl/syllables.json'), 'utf8'));  // 長い順
// 原表を上書きする例外。根拠は data/tbcl/overrides.json に書いてある
const OV   = JSON.parse(fs.readFileSync(R('data/tbcl/overrides.json'), 'utf8')).zy;
const TONE = 'ˊˇˋ';

const sp      = (s) => String(s || '').replace(/[ 　]/g, ' ').replace(/\s+/g, ' ').trim();
const dropIdx = (w) => w.replace(/[0-9]+$/, '');
const noParen = (s) => s.replace(/[（(][^）)]*[）)]/g, '').replace(/\s+/g, ' ').trim();
const nch     = (w) => [...w].filter(ch => /[㐀-鿿]/.test(ch)).length;
const zyClean = (s) => sp(s).replace(/一/g, 'ㄧ')
  .split(' ').map(t => t.replace(/^(.+)˙$/, '˙$1')).join(' ');

// 空白の無い注音を音節に切る。˙ は音節の頭、ˊˇˋ は音節の尻。
function segment(zy) {
  const s = zy.replace(/\s+/g, '');
  const out = [];
  for (let i = 0; i < s.length;) {
    let head = '';
    if (s[i] === '˙') { head = '˙'; i++; }
    const base = SYL.find(c => s.startsWith(c, i));
    if (!base) return null;
    i += base.length;
    let tail = '';
    if (i < s.length && TONE.includes(s[i])) { tail = s[i]; i++; }
    out.push(head + base + tail);
  }
  return out;
}
// need 音節に割る。1 字語は切らない(切ると 賊=ㄗ|ㄟˊ のように壊れる)。
// ただし「ㄔㄨㄤ ㄏㄨˋ」を 1 音節として潰してはいけないので、空白があれば 1 字語ではない。
function syllables(zy, need) {
  const t = zy.split(' ').filter(Boolean);
  if (need === 1) return t.length === 1 ? [t[0]] : null;
  if (need && t.length === need) return t;
  const seg = segment(zy);
  if (seg && (!need || seg.length === need)) return seg;
  return t.length > 1 ? t : seg;
}

const T = Object.create(null);
const drop = [];
let dup = 0, resplit = 0, byCount = 0, prefixCut = 0;

for (const r of rows) {
  const lv  = +String(r.ji).replace(/[^0-9]/g, '');
  const ws  = sp(r.word).split('/').map(s => dropIdx(s.trim())).filter(Boolean);
  const zsR = zyClean(r.bopomofo).split('/').map(s => s.trim()).filter(Boolean);
  const psR = sp(r.pinyin).split('/').map(s => s.trim()).filter(Boolean);
  const needs = [...new Set(ws.map(w => nch(noParen(w))))];

  const zs = zsR.map(z => {
    const bare = noParen(z);
    let syl = null;
    for (const n of needs) { const s2 = syllables(bare, n); if (s2 && s2.length === n) { syl = s2; break; } }
    if (!syl) syl = syllables(bare, 0);
    if (!syl) return null;
    if (bare.split(' ').filter(Boolean).length !== syl.length) resplit++;
    return { zy: syl.join(' '), n: syl.length };
  });

  ws.forEach((w0, i) => {
    const w = noParen(w0);
    if (!w) return;
    const need = nch(w);
    let hit = zs.filter(z => z && z.n === need);
    if (!hit.length && /兒$/.test(w)) hit = zs.filter(z => z && z.n === need - 1);   // 兒化
    let z = null, pi = 0;
    if (hit.length === 1)      { z = hit[0]; pi = zs.indexOf(z); if (zs.length > 1) byCount++; }
    else if (hit.length > 1)   { z = (zs[i] && zs[i].n === need) ? zs[i] : hit[0]; pi = zs.indexOf(z); }
    else if (zs.length === 1 && zs[0] && ws.length === 1) { z = zs[0]; pi = 0; }
    if (!z) {                                                    // 短い異形は長い異形の頭
      const host = ws.find(x => x !== w0 && noParen(x).startsWith(w) && nch(noParen(x)) > need);
      const hz = host ? zs[ws.indexOf(host)] : null;
      if (hz && hz.n > need) { z = { zy: hz.zy.split(' ').slice(0, need).join(' '), n: need }; pi = ws.indexOf(host); prefixCut++; }
    }
    if (!z) { drop.push([w, r.bopomofo, need]); return; }

    if (T[w]) { dup++; if (T[w][0] <= lv) return; }               // 低い級を採る
    T[w] = [lv, z.zy, noParen(psR[pi] || psR[0] || '')];
  });
}

let ovN = 0;
for (const [w, o] of Object.entries(OV)) {
  if (!T[w]) { console.error('※ overrides に表に無い語', w); continue; }
  T[w][1] = o.use; if (o.py) T[w][2] = o.py; ovN++;
}
console.error('例外適用', ovN, '/', Object.keys(OV).length);

const words = Object.keys(T);
console.error('見出し', words.length, '/ 捨てた', drop.length, '/ 重複解決', dup);
console.error('空白を入れ直した', resplit, '/ 音節数で突き合わせた', byCount, '/ 頭から切り出した', prefixCut);
console.error('捨てた:', drop.map(d => `${d[0]}←${d[1]}`).join('  '));
const bad = words.filter(w => !/^[ㄅ-ㄩˊˇˋ˙ ]+$/.test(T[w][1]));
console.error('注音として不正', bad.length, bad.slice(0, 8).map(w => `${w}=${T[w][1]}`).join(' '));
const mism = words.filter(w => T[w][1].split(' ').length !== nch(w) && !/兒$/.test(w));
console.error('字数≠音節数', mism.length, mism.slice(0, 10).map(w => `${w}=${T[w][1]}`).join(' '));
const byLv = {}; for (const w of words) byLv[T[w][0]] = (byLv[T[w][0]] || 0) + 1;
console.error('級別', JSON.stringify(byLv));

fs.writeFileSync(R('data/tbcl/dropped.json'), JSON.stringify(drop, null, 1));
fs.writeFileSync(R('data/tbcl/mismatch.json'), JSON.stringify(mism.map(w => [w, T[w][1]]), null, 1));
fs.writeFileSync(R('tbcl.js'), `// 自動生成 — scripts/build-tbcl.mjs。手で編集しない。
// 出典: 國教院 臺灣華語文能力基準 TBCL《14452詞語表202504》
// 形式: 詞 → [級, 注音, 拼音]。級は TOCFL 1〜6 と対応(7 は六級の上)。
const STW_TBCL = ${JSON.stringify(T)};
if (typeof window !== "undefined") window.STW_TBCL = STW_TBCL;
if (typeof module !== "undefined") module.exports = { STW_TBCL };
`);
