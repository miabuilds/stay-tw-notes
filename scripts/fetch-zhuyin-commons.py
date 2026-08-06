#!/usr/bin/env python3
# 注音の呼読音を Wikimedia Commons（Shtooka 等・CC BY）から取得して取り込む。
#   python3 scripts/fetch-zhuyin-commons.py [--apply]
# --apply なしで存在チェックのみ。ありで DL→後処理→mp3 化→manifest 更新。
import hashlib, json, os, subprocess, sys, time, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio", "tts")
MANIFEST = os.path.join(ROOT, "audio", "manifest.json")
APPLY = "--apply" in sys.argv
UA = "StayTW-edu/1.0 (Taiwan Mandarin learning tool; contact devanywhereplan@gmail.com)"
POLISH = ("highpass=f=85,afftdn=nr=10,"
          "silenceremove=start_periods=1:start_threshold=-40dB:start_silence=0.03:detection=peak,"
          "areverse,silenceremove=start_periods=1:start_threshold=-40dB:start_silence=0.03:detection=peak,areverse,"
          "loudnorm=I=-16:TP=-1.5:LRA=11")

# 符号 → 呼読音の拼音（Commons "Zh-<syl>.ogg"）。ㄝ(ê) は Commons に無いので除外。
SYL = {
 "ㄅ":"bo","ㄆ":"po","ㄇ":"mo","ㄈ":"fo","ㄉ":"de","ㄊ":"te","ㄋ":"ne","ㄌ":"le",
 "ㄍ":"ge","ㄎ":"ke","ㄏ":"he","ㄐ":"ji","ㄑ":"qi","ㄒ":"xi","ㄓ":"zhi","ㄔ":"chi",
 "ㄕ":"shi","ㄖ":"ri","ㄗ":"zi","ㄘ":"ci","ㄙ":"si","ㄧ":"yi","ㄨ":"wu","ㄩ":"yu",
 "ㄚ":"a","ㄛ":"o","ㄜ":"e","ㄞ":"ai","ㄟ":"ei","ㄠ":"ao","ㄡ":"ou","ㄢ":"an",
 "ㄣ":"en","ㄤ":"ang","ㄥ":"eng","ㄦ":"er",
}
def zy_fname(sym): return hashlib.md5(("ZY1:"+sym).encode()).hexdigest()[:12] + ".mp3"
def url(syl): return f"https://commons.wikimedia.org/wiki/Special:FilePath/Zh-{syl}.ogg"

def fetch(syl, dst):
    req = urllib.request.Request(url(syl), headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    if len(data) < 400: raise RuntimeError("too small")
    with open(dst, "wb") as f: f.write(data)

tmp = os.path.join(ROOT, ".zy-src"); os.makedirs(tmp, exist_ok=True)
got, miss = [], []
for sym, syl in SYL.items():
    dst = os.path.join(tmp, f"{syl}.ogg")
    try:
        if not os.path.exists(dst): fetch(syl, dst); time.sleep(0.6)
        got.append((sym, syl, dst))
    except Exception as e:
        miss.append((sym, syl)); print(f"  ✗ {sym} (Zh-{syl}.ogg): {e}")

print(f"\n取得: {len(got)}/{len(SYL)}  未取得: {' '.join(s for s,_ in miss) or 'なし'}")
if not APPLY:
    print("\n--apply を付けると後処理して mp3 化＆manifest 更新します。")
    sys.exit(0)

manifest = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}
os.makedirs(OUT, exist_ok=True)
for sym, syl, src in got:
    f = zy_fname(sym); out = os.path.join(OUT, f)
    subprocess.run(["ffmpeg","-y","-i",src,"-af",POLISH,"-ar","24000","-ac","1",
                    "-b:a","48k","-codec:a","libmp3lame",out], capture_output=True)
    manifest[sym] = f
json.dump(manifest, open(MANIFEST,"w"), ensure_ascii=False, indent=0)
print(f"完了: {len(got)} 個を差し替え。出典表記（CC BY）を忘れずに。")
