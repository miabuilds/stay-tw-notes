#!/usr/bin/env python3
# 2026-09-19 萌典稽核で見つかった 4 文の読みを直す一回きりのスクリプト。
#   ① data/ex-zhuyin.json の注音を、修正済み ex.py から作り直す
#   ② 音声を作り直す（本文が同じ＝同じハッシュになるので、ファイル名に "2" を足して immutable キャッシュを外す）
#   ③ manifest 更新＋R2 へアップ
# 使い方: python3 scripts/fix-readings-oneoff.py [--dry]
import json, os, re, sys, base64, hashlib, subprocess, urllib.request, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.environ.get("STW_AUDIO_DIR") or os.path.join(os.path.dirname(ROOT), "stay-tw-audio", "tts")
MANI = os.path.join(ROOT, "audio", "manifest.json")
EXZY = os.path.join(ROOT, "data", "ex-zhuyin.json")
API = "https://staytw.pages.dev/api/tts"
DRY = "--dry" in sys.argv

spec = importlib.util.spec_from_file_location("ttsg", os.path.join(ROOT, "scripts", "tts-generate-google.py"))
g = importlib.util.module_from_spec(spec); spec.loader.exec_module(g)

js = open(os.path.join(ROOT, "py2zy.js"), encoding="utf-8").read()
M = dict(re.findall(r'"([^"]+)":\s*"([^"]+)"', re.search(r"var M=\{(.*?)\};", js, re.S).group(1)))
TONE = {"1": "", "2": "ˊ", "3": "ˇ", "4": "ˋ"}
def num2zy(ph):
    b, t = ph[:-1], ph[-1]; b = b.replace("v", "ü")
    zy = M.get(b)
    if not zy and b.endswith("r") and M.get(b[:-1]): zy = M[b[:-1]] + "ㄦ"
    if not zy: return None
    return (zy + "˙") if t == "5" else zy + TONE.get(t, "")   # 台湾の慣例は軽声の点を後ろに置く（ㄉㄜ˙）

def sent2zy(z, py):
    parts = g.phonemes(z, py)
    if parts is None: return None
    parts = g._tw_fix(parts)
    out = []
    for c, ph in parts:
        if ph:
            zy = num2zy(ph)
            if not zy: return None
            out.append(zy)
        else:
            if c.strip() == "": continue
            if out: out[-1] = out[-1] + c
            else: out.append(c)
    return " ".join(out)

# 直した 4 文（本文はそのまま、拼音だけ修正済み）
def collect():
    node = r'''const fs=require("fs");const o={};
const files=fs.readdirSync(".").filter(f=>/^vocab.*\.js$/.test(f)).sort();
for(const f of files){const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  for(const v of a){ if(v&&v.ex&&v.ex.z&&v.ex.py) o[v.ex.z]=v.ex.py; }}
console.log(JSON.stringify(o));'''
    return json.loads(subprocess.check_output(["node", "-e", node], cwd=ROOT))

TARGETS = [
    "她週末最喜歡去西門町逛街。",
    "衛生單位呼籲民眾盡快接種流感疫苗。",
    "新的教學方式讓學生的成績有了顯著的進步。",
    "種種跡象顯示，經濟已出現復甦的徵兆。",
]

def synth(text, parts):
    seen, conflict = {}, set()
    for c, ph in parts:
        if not ph: continue
        if c in seen and seen[c] != ph: conflict.add(c)
        seen.setdefault(c, ph)
    force = [{"c": c, "py": p} for c, p in seen.items() if c not in conflict]
    body = json.dumps({"text": text, "force": force}).encode()
    r = urllib.request.urlopen(urllib.request.Request(API, data=body, headers={"Content-Type": "application/json", "User-Agent": "staytw-tts-gen"}), timeout=40)
    j = json.load(r)
    return base64.b64decode(j["audio"]) if j.get("audio") else None

def main():
    data = collect()
    exzy = json.load(open(EXZY, encoding="utf-8"))
    mani = json.load(open(MANI, encoding="utf-8"))
    newfiles = []
    for z in TARGETS:
        py = data.get(z)
        if not py: print("!! 例文が見つからない:", z); continue
        zy = sent2zy(z, py)
        if not zy: print("!! 注音に変換できない:", z); continue
        old = exzy.get(z, "")
        print("\n" + z)
        print("  py :", py)
        print("  舊 :", old)
        print("  新 :", zy)
        if old == zy: print("  → 注音は変更なし")
        exzy[z] = zy
        fn = hashlib.md5(z.encode()).hexdigest()[:12] + "gp2.mp3"   # 名前を変えて immutable キャッシュを外す
        path = os.path.join(AUDIO, fn)
        if DRY: print("  → (dry) 音声:", fn); continue
        parts = g._tw_fix(g.phonemes(z, py))
        audio = synth(z, parts)
        if audio and len(audio) > 500:
            open(path, "wb").write(audio); mani[z] = fn; newfiles.append(path)
            print("  → 音声を作り直し:", fn, len(audio), "bytes")
        else:
            print("  !! 音声の生成に失敗")
    if DRY: return
    json.dump(exzy, open(EXZY, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    json.dump(mani, open(MANI, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print("\nex-zhuyin.json / manifest.json を更新しました")
    if newfiles:
        r = subprocess.run([os.path.join(ROOT, "scripts", "audio-sync-r2.sh")] + newfiles, capture_output=True, text=True, timeout=600)
        print("R2:", r.stdout.strip() or r.stderr.strip()[-200:])

if __name__ == "__main__": main()
