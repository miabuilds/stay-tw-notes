// 英文キーの内容訳(越南語・印尼語)を足す。
//   twFillViId は「英語の文字列」をキーに content-vi.js / content-id.js を引く。
//   語法點を官方 496 点に入れ替えると英文が大量に増えるので、足りない分だけ訳して追記する。
//   使い方: node scripts/gen-content-viid.mjs [--dry]
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");
const OUT = path.join(ROOT, "out/viid");
fs.mkdirSync(OUT, { recursive: true });

function loadConst(file, re) {
  const src = fs.readFileSync(file, "utf8");
  const names = [...src.matchAll(re)].map((m) => m[1]);
  if (!names.length) return [];
  const got = new Function(`${src}\nreturn {${names.map((n) => `${n}:typeof ${n}!=="undefined"?${n}:null`).join(",")}};`)();
  return names.flatMap((n) => (Array.isArray(got[n]) ? got[n] : []));
}
const vi = new Function(fs.readFileSync(path.join(ROOT, "content-vi.js"), "utf8") + "\nreturn STW_VI_CONTENT;")();
const id = new Function(fs.readFileSync(path.join(ROOT, "content-id.js"), "utf8") + "\nreturn STW_ID_CONTENT;")();

// twFillViId と同じ条件で拾う: .e があって .j か .k もある節点
const want = new Set();
function walk(node, seen) {
  if (!node || typeof node !== "object" || seen.has(node)) return;
  seen.add(node);
  if (Array.isArray(node)) { for (const x of node) walk(x, seen); return; }
  if (typeof node.e === "string" && (node.j !== undefined || node.k !== undefined)) {
    const s = node.e.trim();
    if (s) want.add(s);
  }
  for (const k in node) { const v = node[k]; if (v && typeof v === "object") walk(v, seen); }
}
const seen = new WeakSet();
for (const lv of ["l1", "l2", "l3", "l4", "l5", "l6"]) {
  const f = path.join(ROOT, `grammar-${lv}.js`);
  if (fs.existsSync(f)) walk(loadConst(f, /const\s+(GRAMMAR_[A-Z0-9_]+)\s*=/g), seen);
  // 語彙も。-d(官方 TBCL を埋めた語)で英文が大量に増える
  for (const suf of ["", "-b", "-c", "-d"]) {
    const vf = path.join(ROOT, `vocab-${lv}${suf}.js`);
    if (fs.existsSync(vf)) walk(loadConst(vf, /const\s+(VOCAB_[A-Z0-9_]+)\s*=/g), seen);
  }
}
const missing = [...want].filter((s) => vi[s] === undefined || id[s] === undefined);
console.log("語法點＋語彙の英文", want.size, "／ 未訳", missing.length);
if (DRY || !missing.length) { console.log(missing.slice(0, 5)); process.exit(0); }

const SYS = `あなたは台湾の中国語学習アプリの翻訳者です。英語の項目をベトナム語とインドネシア語に訳します。
・学習アプリの UI に出る短い文です。文法の説明・例文の訳・語義が混ざります。
・原文の意味を変えない。説明文は説明文らしく、例文の訳は例文らしく訳す。
・中国語の語(是・的・把 など)や拼音が引用として含まれる場合はそのまま残す。
・ベトナム語は声調記号を正しく付ける。インドネシア語は標準的な書き言葉。
・出力は JSON オブジェクトのみ。{"<英文>":{"vi":"…","id":"…"}, …}。前後に説明を付けない。`;

function ask(prompt) {
  return new Promise((res, rej) => {
    execFile("claude", ["-p", "--model", "sonnet", "--append-system-prompt", SYS, prompt],
      { maxBuffer: 64 * 1024 * 1024, timeout: 600000 },
      (err, so, se) => (err ? rej(new Error((se || "").slice(0, 300) + " " + err.message)) : res(so)));
  });
}
const parse = (t) => { const a = t.indexOf("{"), b = t.lastIndexOf("}"); if (a < 0) throw new Error("JSON なし"); return JSON.parse(t.slice(a, b + 1)); };

const SIZE = Number(process.env.SIZE || 30), PAR = Number(process.env.PAR || 10);
const batches = [];
for (let i = 0; i < missing.length; i += SIZE) batches.push(missing.slice(i, i + SIZE));
let done = 0, failed = 0;
async function run(b, bi) {
  const f = path.join(OUT, "v" + String(bi).padStart(4, "0") + ".json");
  if (fs.existsSync(f)) { done++; return; }
  for (let t = 0; t < 3; t++) {
    try {
      const o = parse(await ask("次の英文をベトナム語とインドネシア語に訳してください。キーは英文をそのまま使うこと。\n\n" + JSON.stringify(b, null, 1)));
      const miss = b.filter((s) => !o[s] || !o[s].vi || !o[s].id);
      if (miss.length) throw new Error("抜け " + miss.length + " 件: " + miss.slice(0, 3).join(" / "));
      fs.writeFileSync(f, JSON.stringify(o, null, 1));
      done++; process.stdout.write(`\r${done}/${batches.length}`);
      return;
    } catch (e) { if (t === 2) { failed++; console.error("\n[batch " + bi + "] " + e.message.slice(0, 200)); } }
  }
}
const q = batches.map((b, i) => [b, i]);
await Promise.all(Array.from({ length: PAR }, async () => { while (q.length) { const [b, i] = q.shift(); await run(b, i); } }));
console.log(`\n完了 ${done}/${batches.length}  失敗 ${failed}`);

// 追記(既存の訳は上書きしない)
let add = 0;
for (const f of fs.readdirSync(OUT)) {
  if (!f.endsWith(".json")) continue;
  const o = JSON.parse(fs.readFileSync(path.join(OUT, f), "utf8"));
  for (const k in o) {
    if (vi[k] === undefined && o[k].vi) { vi[k] = o[k].vi; add++; }
    if (id[k] === undefined && o[k].id) id[k] = o[k].id;
  }
}
const head = (lang) => `// StayTW 内容訳(${lang}) 英文→${lang === "越南文" ? "vi" : "id"}。単語＋文章＋文法＋片語。twFillViId が参照。\n`;
fs.writeFileSync(path.join(ROOT, "content-vi.js"),
  head("越南文") + "const STW_VI_CONTENT=" + JSON.stringify(vi) + ";\nif(typeof window!==\"undefined\")window.STW_VI_CONTENT=STW_VI_CONTENT;\n");
fs.writeFileSync(path.join(ROOT, "content-id.js"),
  head("印尼文") + "const STW_ID_CONTENT=" + JSON.stringify(id) + ";\nif(typeof window!==\"undefined\")window.STW_ID_CONTENT=STW_ID_CONTENT;\n");
console.log("追記", add, "件 / vi", Object.keys(vi).length, "id", Object.keys(id).length);
