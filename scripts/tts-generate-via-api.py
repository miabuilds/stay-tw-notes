#!/usr/bin/env python3
# StayTW — 生活会話(life.js)・漢字ギャップ(kanji-gap.js)の音声を、本番 Worker の /api/tts 経由で事前生成。
# ローカルに GOOGLE_TTS_KEY が無くても、Worker が持つ鍵で Google cmn-TW-Wavenet-A を叩ける。
# 読みは検証済み拼音から逐字 phoneme(force)で強制 → 破音字も正しい（tts-generate-google.py と同じ方針・同じファイル名規則 md5(z)[:12]+"gp.mp3"）。
# 使い方: python3 scripts/tts-generate-via-api.py [--force]
#   ※ /api/tts は IP ごとに 1 日 400 回。1 回で足りない量なら翌日に続きを回す（既存はスキップされる）。
import json, os, sys, re, base64, hashlib, time, subprocess, urllib.request, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio", "tts"); MANI = os.path.join(ROOT, "audio", "manifest.json")
API = os.environ.get("STW_TTS_API", "https://staytw.pages.dev/api/tts")
FORCE = "--force" in sys.argv

# 音節分割・phoneme 生成は tts-generate-google.py のものを再利用（import 時に鍵は不要）
spec = importlib.util.spec_from_file_location("ttsg", os.path.join(ROOT, "scripts", "tts-generate-google.py"))
ttsg = importlib.util.module_from_spec(spec); spec.loader.exec_module(ttsg)

NODE = r'''
const L=require("./life.js").LIFE, K=require("./kanji-gap.js").KANJI_GAP; const o={};
for(const s of L.scenes) for(const l of s.lines) o[l.z]=l.py;
for(const k of K){ o[k.tw]=k.py; if(k.ex&&k.ex.z&&k.ex.py) o[k.ex.z]=k.ex.py; }
console.log(JSON.stringify(o));'''

def force_list(parts):
    # Worker は「その字を全部同じ読みに置換」するので、同一文中で同じ字が別読みなら force から外す（引擎に任せる）
    seen = {}; conflict = set()
    for c, ph in parts:
        if not ph: continue
        if c in seen and seen[c] != ph: conflict.add(c)
        seen.setdefault(c, ph)
    return [{"c": c, "py": ph} for c, ph in seen.items() if c not in conflict]

def synth(text, parts):
    body = json.dumps({"text": text, "force": force_list(parts)}).encode()
    for att in range(4):
        try:
            r = urllib.request.urlopen(urllib.request.Request(API, data=body, headers={"Content-Type": "application/json", "User-Agent": "staytw-tts-gen"}), timeout=40)
            j = json.load(r)
            if j.get("audio"): return base64.b64decode(j["audio"]), None
            return None, j.get("error", "no audio")
        except urllib.error.HTTPError as e:
            try: j = json.load(e)
            except Exception: j = {}
            if e.code == 429: return None, "quota"
            if e.code >= 500: time.sleep(2 * (att + 1)); continue
            return None, f"http {e.code} {j}"
        except Exception as ex:
            time.sleep(2 * (att + 1))
    return None, "network"

def sync_r2(files):
    """新しく作った mp3 を R2(staytw-audio) へ。失敗しても生成結果には影響させない。"""
    try:
        r = subprocess.run([os.path.join(ROOT, "scripts", "audio-sync-r2.sh"), *files], capture_output=True, text=True, timeout=600)
        print(("R2 同步 OK: " if r.returncode == 0 else "R2 同步失敗(音檔仍在本機): ") + (r.stdout.strip().splitlines() or [""])[-1][:120] + (r.stderr.strip()[-200:] if r.returncode else ""), flush=True)
    except Exception as e:
        print("R2 同步略過:", e, flush=True)

def main():
    os.makedirs(OUT, exist_ok=True)
    data = json.loads(subprocess.check_output(["node", "-e", NODE], cwd=ROOT))
    manifest = json.load(open(MANI)) if os.path.exists(MANI) else {}
    todo, bad, skip = [], [], 0
    for z, py in data.items():
        fn = hashlib.md5(z.encode()).hexdigest()[:12] + "gp.mp3"; path = os.path.join(OUT, fn)
        if not FORCE and os.path.exists(path) and os.path.getsize(path) > 500:
            manifest[z] = fn; skip += 1; continue
        parts = ttsg.phonemes(z, py)
        if parts is None: bad.append((z, py)); continue
        parts = ttsg._tw_fix(parts)
        todo.append((z, parts, fn, path))
    print(f"texts {len(data)} / skip {skip} / todo {len(todo)} / 整列失敗 {len(bad)}", flush=True)
    for b in bad: print("  BAD:", b)
    done, fails = 0, []
    for i, (z, parts, fn, path) in enumerate(todo):
        audio, err = synth(z, parts)
        if audio and len(audio) > 500:
            open(path, "wb").write(audio); manifest[z] = fn; done += 1
        else:
            fails.append((z, err))
            if err == "quota": print("  本日の /api/tts 上限に到達。明日続きを回してください。", flush=True); break
        if (i + 1) % 25 == 0:
            print(f"  {i+1}/{len(todo)} done={done} fail={len(fails)}", flush=True)
            json.dump(manifest, open(MANI, "w"), ensure_ascii=False, indent=0)
        time.sleep(0.4)
    json.dump(manifest, open(MANI, "w"), ensure_ascii=False, indent=0)
    print(f"=== 生成 {done} / 略過 {skip} / 失敗 {len(fails)} / manifest {len(manifest)} ===", flush=True)
    new_files = [path for (z, parts, fn, path) in todo if os.path.exists(path) and manifest.get(z) == fn]
    if new_files: sync_r2(new_files)
    for f in fails[:20]: print("  FAIL:", f)

if __name__ == "__main__": main()
