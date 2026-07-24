#!/usr/bin/env python3
# StayTW Study — 事前生成 TTS（edge-tts / Microsoft neural voice, 無料・API キー不要）
# 全単語・例文・フレーズ・文法例文を audio/tts/*.mp3 に生成し、audio/manifest.json を書く。
# 冪等：既存ファイルはスキップ → 単語を増やしたら再実行するだけ。
#   使い方: python3 scripts/tts-generate.py
import asyncio, hashlib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio", "tts")
MANIFEST = os.path.join(ROOT, "audio", "manifest.json")
VOICE = "zh-TW-HsiaoChenNeural"   # 台湾女性・自然。男性なら zh-TW-YunJheNeural
CONCURRENCY = 8

NODE = r"""
const texts = new Set();
["l1","l2","l3","l4","l5"].forEach(l => {
  const V = require("./vocab-" + l + ".js")["VOCAB_" + l.toUpperCase()];
  V.forEach(v => { texts.add(v.w); texts.add(v.ex.z); });
  const G = require("./grammar-" + l + ".js")["GRAMMAR_" + l.toUpperCase()];
  G.forEach(g => g.eg.forEach(e => texts.add(e.z.replace(/<[^>]+>/g, ""))));
});
require("./phrases-l1.js").PHRASES_L1.forEach(s => s.items.forEach(i => texts.add(i.z)));
console.log(JSON.stringify([...texts]));
"""

def fname(text):
    return hashlib.md5(text.encode()).hexdigest()[:12] + ".mp3"

async def gen(sem, communicate_cls, text, path, stats):
    async with sem:
        for attempt in range(3):
            try:
                await communicate_cls(text, VOICE).save(path)
                stats["done"] += 1
                if stats["done"] % 50 == 0:
                    print(f'  {stats["done"]}/{stats["total"]} generated', flush=True)
                return
            except Exception as e:
                if attempt == 2:
                    stats["fail"].append(text)
                    print(f"  FAIL: {text[:20]}… {e}", flush=True)
                else:
                    await asyncio.sleep(2 * (attempt + 1))

async def main():
    import edge_tts
    os.makedirs(OUT, exist_ok=True)
    texts = json.loads(subprocess.check_output(["node", "-e", NODE], cwd=ROOT))
    manifest = {}
    if os.path.exists(MANIFEST):
        manifest = json.load(open(MANIFEST))
    todo = []
    for t in texts:
        f = fname(t)
        manifest[t] = f
        p = os.path.join(OUT, f)
        if not (os.path.exists(p) and os.path.getsize(p) > 1000):
            todo.append((t, p))
    stats = {"done": 0, "total": len(todo), "fail": []}
    print(f"texts: {len(texts)}, to generate: {len(todo)}")
    sem = asyncio.Semaphore(CONCURRENCY)
    await asyncio.gather(*[gen(sem, edge_tts.Communicate, t, p, stats) for t, p in todo])
    # 失敗した分は manifest から外す（Web Speech にフォールバックさせる）
    for t in stats["fail"]:
        manifest.pop(t, None)
    json.dump(manifest, open(MANIFEST, "w"), ensure_ascii=False, indent=0)
    print(f"done: {stats['done']}, failed: {len(stats['fail'])}, manifest: {len(manifest)} entries")

if __name__ == "__main__":
    asyncio.run(main())
