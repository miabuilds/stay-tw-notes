// YouTube 跟讀:把影片的中文逐句字幕種進 D1(yt_captions)。
// YouTube 會擋機房 IP,所以 Worker 現場抓不到 —— 一定要在自己電腦(住宅 IP)跑這支。
// 直接用 wrangler 寫 D1,不需要 ADMIN_TOKEN(wrangler 本來就登入了)。
//
//   node scripts/yt-seed.mjs <videoId...>
//   node scripts/yt-seed.mjs --check <videoId...>   只檢查有沒有中文字幕,不寫入
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const KEY = "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w";
const H = { "Content-Type": "application/json", "User-Agent": "com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip" };
const CTX = { client: { clientName: "ANDROID", clientVersion: "20.10.38", androidSdkVersion: 30, hl: "zh-TW", gl: "TW" } };
const CHECK = process.argv.includes("--check");
const VIDS = process.argv.slice(2).filter((x) => /^[A-Za-z0-9_-]{11}$/.test(x));

const unesc = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
function parseBody(body) {
  const out = [];
  const push = (t, d, z) => { z = z.replace(/\n/g, " ").trim();
    if (z && !/^[\[（(♪♫「」\]）)\s]*$/.test(z)) out.push({ t, d, z }); };
  if (body.trim().startsWith("{")) {
    const j = JSON.parse(body);
    for (const ev of j.events || []) { if (!ev.segs) continue; push(ev.tStartMs || 0, ev.dDurationMs || 0, ev.segs.map((s) => s.utf8 || "").join("")); }
  } else {
    const re = /<p\b([^>]*)>([\s\S]*?)<\/p>/g; let m;
    while ((m = re.exec(body))) { const a = m[1];
      push(+((a.match(/\bt="(\d+)"/) || [])[1] || 0), +((a.match(/\bd="(\d+)"/) || [])[1] || 0), unesc(m[2].replace(/<[^>]+>/g, ""))); }
  }
  // 同じ開始時刻の重複を除き、時間順に
  return out.sort((a, b) => a.t - b.t).filter((l, i, arr) => i === 0 || l.t !== arr[i - 1].t || l.z !== arr[i - 1].z);
}

async function grab(v) {
  const pj = await (await fetch(`https://www.youtube.com/youtubei/v1/player?key=${KEY}`, { method: "POST", headers: H, body: JSON.stringify({ context: CTX, videoId: v }) })).json();
  const d = pj.videoDetails || {};
  const tracks = pj.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
  // 人工字幕優先(自動產生的中文斷句很糟)
  const zh = tracks.filter((t) => /^zh/i.test(t.languageCode || ""));
  const tr = zh.find((t) => t.kind !== "asr") || zh[0];
  if (!tr) return { v, err: "沒有中文字幕軌(有:" + (tracks.map((t) => t.languageCode).join(",") || "無") + ")" };
  // 中国語字幕が有っても、喋っているのが中国語とは限らない(英語動画に中国語訳が付いているだけ)。
  // YouTube の自動字幕は「聞こえた言語」で生成されるので、中国語以外の自動字幕があれば
  // その言語を喋っている＝シャドーイング教材にならない。実例:
  //   「外國人到手搖飲料店怎麼點餐」= zh-TW 訳 + en(自動) → 実際は英語
  //   「要這樣撩妹才對？」          = zh-Hant 訳 + th(自動) → 中国語ではない
  const asrOther = tracks.find((t) => t.kind === "asr" && !/^zh/i.test(t.languageCode || ""));
  if (asrOther) return { v, err: "喋っているのは中国語ではなさそう(自動字幕が " + asrOther.languageCode + ")" };
  const oe = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${v}&format=json`);
  if (!oe.ok) return { v, err: "這支禁止嵌入(oEmbed " + oe.status + ")" };
  const u = tr.baseUrl + (tr.baseUrl.includes("fmt=") ? "" : "&fmt=json3");
  const lines = parseBody(await (await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } })).text());
  if (lines.length < 3) return { v, err: "句數太少(" + lines.length + ")" };
  return { v, title: String(d.title || "").slice(0, 200), author: String(d.author || "").slice(0, 120),
           seconds: Number(d.lengthSeconds || 0), track: tr.languageCode + (tr.kind === "asr" ? "-asr" : ""), lines };
}

const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";
(async () => {
  if (!VIDS.length) { console.error("用法:node scripts/yt-seed.mjs <videoId...>"); process.exit(1); }
  const ok = [];
  for (const v of VIDS) {
    try {
      const r = await grab(v);
      if (r.err) { console.log(`✗ ${v}  ${r.err}`); continue; }
      const mins = Math.round(r.seconds / 60);
      console.log(`✅ ${v}  ${r.lines.length} 句 / ${mins} 分 / ${r.track}  ${r.title.slice(0, 40)}`);
      ok.push(r);
    } catch (e) { console.log(`✗ ${v}  ${e.message}`); }
  }
  if (CHECK || !ok.length) { console.log(CHECK ? "\n--check:沒有寫入。" : "\n沒有可以寫入的影片。"); return; }
  const sql = ok.map((r) => `INSERT INTO yt_captions (vid,title,author,seconds,track,lines,updated_at) VALUES (${q(r.v)},${q(r.title)},${q(r.author)},${r.seconds},${q(r.track)},${q(JSON.stringify(r.lines))},${Date.now()}) ON CONFLICT(vid) DO UPDATE SET title=excluded.title, author=excluded.author, seconds=excluded.seconds, track=excluded.track, lines=excluded.lines, updated_at=excluded.updated_at;`).join("\n");
  const f = path.join(os.tmpdir(), `yt-seed-${Date.now()}.sql`);
  fs.writeFileSync(f, sql);
  console.log(`\n寫入 D1(${ok.length} 支,${(sql.length / 1024).toFixed(0)}KB)…`);
  execFileSync("npx", ["--no-install", "wrangler", "d1", "execute", "staytw-db", "--remote", `--file=${f}`, "-y"],
    { cwd: path.join(import.meta.dirname, "..", "staytw-api"), stdio: "inherit" });
  fs.unlinkSync(f);
})();
