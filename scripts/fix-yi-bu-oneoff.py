#!/usr/bin/env python3
# 2026-09-19「一」の声調直し（一回きり）。
# Google の中国語音声は 一/不 の変調を自前でやり、<phoneme> の指定を無視する。
# そこで tts-generate-google.py の sandhi_fix() で同音の別字（醫/移/億/步）に差し替えて合成する。
# 本文のハッシュは変わらないので、ファイル名に "y2" を足して immutable キャッシュを外す。
#
#   python3 scripts/fix-yi-bu-oneoff.py [--dry]
#
# ※ 読み方そのものに議論の余地がある成語（一絲不苟・一蹴可幾・缺一不可）は SKIP に入れて除外。
#    どう読ませたいか決まってから、vocab の拼音を直して普通の生成に載せる。
import json, os, sys, base64, hashlib, subprocess, urllib.request, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.environ.get("STW_AUDIO_DIR") or os.path.join(os.path.dirname(ROOT), "stay-tw-audio", "tts")
MANI = os.path.join(ROOT, "audio", "manifest.json")
API = "https://staytw.pages.dev/api/tts"
DRY = "--dry" in sys.argv

spec = importlib.util.spec_from_file_location("g", os.path.join(ROOT, "scripts", "tts-generate-google.py"))
g = importlib.util.module_from_spec(spec); spec.loader.exec_module(g)

SKIP = {
    "一絲不苟", "他做事一絲不苟，連小數點都不放過。",
    "一蹴可幾", "語言能力的養成並非一蹴可幾，需要長期累積。",
    "理論與實務相輔相成，缺一不可。",
    "地上都是頭髮，快掃一掃。",          # V一V の軽い「一」。代用字が無いので触らない
}

NODE = r'''const fs=require("fs");const o={};
const files=fs.readdirSync(".").filter(f=>/^vocab.*\.js$/.test(f)).sort();
for(const f of files){const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  for(const v of a){ if(v&&v.w&&v.py)o[v.w]=v.py; if(v&&v.ex&&v.ex.z&&v.ex.py)o[v.ex.z]=v.ex.py; }}
console.log(JSON.stringify(o));'''

def synth(text, parts):
    seen, conflict = {}, set()
    for c, ph in parts:
        if not ph: continue
        if c in seen and seen[c] != ph: conflict.add(c)
        seen.setdefault(c, ph)
    force = [{"c": c, "py": p} for c, p in seen.items() if c not in conflict]
    body = json.dumps({"text": text, "force": force}).encode()
    r = urllib.request.urlopen(urllib.request.Request(API, data=body,
        headers={"Content-Type": "application/json", "User-Agent": "staytw-tts-gen"}), timeout=40)
    j = json.load(r)
    return base64.b64decode(j["audio"]) if j.get("audio") else None

def main():
    data = json.loads(subprocess.check_output(["node", "-e", NODE], cwd=ROOT))
    mani = json.load(open(MANI, encoding="utf-8"))
    todo, skipped = [], []
    for z, py in data.items():
        parts = g.phonemes(z, py)
        if parts is None: continue
        parts = g._tw_fix(parts)
        fixed = g.sandhi_fix(parts)
        if fixed == parts: continue
        if z in SKIP: skipped.append(z); continue
        subs = [(a, b) for (a, _), (b, _) in zip(parts, fixed) if a != b]
        todo.append((z, fixed, subs))
    print(f"差し替えが要る文 {len(todo)} 件 / 判断保留でスキップ {len(skipped)} 件")
    for z in skipped: print("   SKIP:", z[:30])
    done, fails, newf = 0, [], []
    for z, fixed, subs in todo:
        text = "".join(c for c, _ in fixed)
        fn = hashlib.md5(z.encode()).hexdigest()[:12] + "y2.mp3"
        path = os.path.join(AUDIO, fn)
        print(f"  {z[:28]:<30} {subs}")
        if DRY: continue
        a = synth(text, fixed)
        if a and len(a) > 500:
            open(path, "wb").write(a); mani[z] = fn; newf.append(path); done += 1
        else:
            fails.append(z)
    if DRY: return
    json.dump(mani, open(MANI, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print(f"\n作り直し {done} / 失敗 {len(fails)} / manifest {len(mani)}")
    for f in fails: print("  FAIL:", f)
    if newf:
        r = subprocess.run([os.path.join(ROOT, "scripts", "audio-sync-r2.sh")] + newf,
                           capture_output=True, text=True, timeout=900)
        print("R2:", (r.stdout or r.stderr).strip()[-200:])

if __name__ == "__main__": main()
