#!/usr/bin/env python3
# 注音の呼読音を「1本の録音」から37個に自動分割して取り込む。
# 使い方:
#   python3 scripts/ingest-zhuyin-audio.py <録音ファイル> [--noise -35] [--dur 0.35] [--min-seg 0.12] [--apply]
#   まず --apply なしで実行 → 何分割になったか確認。ちょうど37ならその後 --apply で書き込み。
#   37 にならない時は --noise（無音判定 dB、-30〜-40 で調整）や --dur（無音の最短秒）を変える。
import hashlib, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio", "tts")
MANIFEST = os.path.join(ROOT, "audio", "manifest.json")

def arg(name, default):
    if name in sys.argv:
        return sys.argv[sys.argv.index(name) + 1]
    return default

if len(sys.argv) < 2 or sys.argv[1].startswith("--"):
    sys.exit("使い方: python3 scripts/ingest-zhuyin-audio.py <録音ファイル> [--noise -35] [--dur 0.35] [--min-seg 0.12] [--apply]")

SRC = sys.argv[1]
NOISE = arg("--noise", "-35")
DUR = float(arg("--dur", "0.35"))
MIN_SEG = float(arg("--min-seg", "0.12"))
APPLY = "--apply" in sys.argv

if not os.path.exists(SRC):
    sys.exit(f"ファイルが見つかりません: {SRC}")

# 37符号の順序を zhuyin.js から取得
ZY = json.loads(subprocess.check_output(
    ["node", "-e", 'console.log(JSON.stringify(require("./zhuyin.js").ZHUYIN.map(z=>z.z)))'], cwd=ROOT))

def zy_fname(sym):
    return hashlib.md5(("ZY1:" + sym).encode()).hexdigest()[:12] + ".mp3"

# 全体尺
dur_out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "default=noprint_wrappers=1:nokey=1", SRC],
                         capture_output=True, text=True)
total = float(dur_out.stdout.strip())

# 無音検出
sd = subprocess.run(["ffmpeg", "-i", SRC, "-af", f"silencedetect=noise={NOISE}dB:d={DUR}",
                     "-f", "null", "-"], capture_output=True, text=True).stderr
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", sd)]
ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", sd)]

# 発話区間 = 無音の隙間。先頭が無音でなければ 0 から開始
segs = []
cur = 0.0
# ends[i] は「無音が終わって発話が始まる」時刻、starts[i] は「発話が終わって無音が始まる」時刻
points = sorted([("end", e) for e in ends] + [("start", s) for s in starts], key=lambda x: x[1])
speech_start = 0.0
in_speech = True
if starts and (not ends or starts[0] < ends[0]):
    in_speech = True  # 冒頭から音がある
for kind, t in points:
    if kind == "start" and in_speech:   # 発話→無音
        if t - speech_start >= MIN_SEG:
            segs.append((speech_start, t))
        in_speech = False
    elif kind == "end":                 # 無音→発話
        speech_start = t
        in_speech = True
if in_speech and total - speech_start >= MIN_SEG:
    segs.append((speech_start, total))

print(f"録音長: {total:.2f}s / 検出した発話区間: {len(segs)} 個  (目標 37)")
for i, (a, b) in enumerate(segs):
    tag = ZY[i] if i < len(ZY) else "??"
    print(f"  {i+1:2d} {tag}  {a:6.2f}–{b:6.2f}s  ({b-a:.2f}s)")

if len(segs) != 37:
    print("\n⚠️ 37 になりませんでした。--noise（-30〜-40）や --dur（0.25〜0.5）を調整して再実行してください。")
    print("   例: python3 scripts/ingest-zhuyin-audio.py " + SRC + " --noise -38 --dur 0.3")
    sys.exit(1)

if not APPLY:
    print("\n✅ ちょうど 37 個。問題なければ末尾に --apply を付けて再実行すると書き込みます。")
    sys.exit(0)

manifest = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}
os.makedirs(OUT, exist_ok=True)
for i, (a, b) in enumerate(segs):
    sym = ZY[i]; f = zy_fname(sym); path = os.path.join(OUT, f)
    # 前後に軽くマージンを取り、24kHz mono mp3 に（既存クリップと同仕様）
    aa = max(0, a - 0.05); bb = min(total, b + 0.08)
    subprocess.run(["ffmpeg", "-y", "-i", SRC, "-ss", f"{aa}", "-to", f"{bb}",
                    "-ar", "24000", "-ac", "1", "-b:a", "48k", "-codec:a", "libmp3lame", path],
                   capture_output=True)
    manifest[sym] = f
    print(f"  ✓ {sym} → {f}")
json.dump(manifest, open(MANIFEST, "w"), ensure_ascii=False, indent=0)
print(f"\n完了。37 個の注音音声を差し替えました（manifest 更新済み）。")
