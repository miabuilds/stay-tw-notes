#!/usr/bin/env python3
# 録音ページ(record-zhuyin.html)で保存した zy-01…zy-37.(webm|mp4|wav|mp3) を取り込む。
# 使い方:
#   python3 scripts/ingest-zhuyin-folder.py [フォルダ(既定=~/Downloads)] [--apply]
#   まず --apply なしで対象一覧を確認 → よければ --apply で mp3 変換＆manifest 更新。
import glob, hashlib, json, os, subprocess, sys, tempfile, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio", "tts")
MANIFEST = os.path.join(ROOT, "audio", "manifest.json")

# 録音室級の後処理：ローカット→軽いノイズ低減→前後の無音を詰める→放送ラウドネスに正規化
POLISH = ("highpass=f=85,afftdn=nr=12,"
          "silenceremove=start_periods=1:start_threshold=-40dB:start_silence=0.03:detection=peak,"
          "areverse,silenceremove=start_periods=1:start_threshold=-40dB:start_silence=0.03:detection=peak,areverse,"
          "loudnorm=I=-16:TP=-1.5:LRA=11")

args = [a for a in sys.argv[1:]]
APPLY = "--apply" in args
RAW = "--raw" in args   # 後処理なしで取り込む
args = [a for a in args if a not in ("--apply", "--raw")]
TARGET = os.path.expanduser(args[0]) if args else os.path.expanduser("~/Downloads")

# zip が渡されたら一時フォルダに展開
if os.path.isfile(TARGET) and TARGET.lower().endswith(".zip"):
    tmp = tempfile.mkdtemp(prefix="zy-")
    with zipfile.ZipFile(TARGET) as z: z.extractall(tmp)
    print(f"zip を展開: {TARGET} → {tmp}")
    FOLDER = tmp
else:
    FOLDER = TARGET

ZY = json.loads(subprocess.check_output(
    ["node", "-e", 'console.log(JSON.stringify(require("./zhuyin.js").ZHUYIN.map(z=>z.z)))'], cwd=ROOT))

def zy_fname(sym):
    return hashlib.md5(("ZY1:" + sym).encode()).hexdigest()[:12] + ".mp3"

found, missing = [], []
for i, sym in enumerate(ZY):
    hits = sorted(glob.glob(os.path.join(FOLDER, f"zy-{i+1:02d}.*")))
    hits = [h for h in hits if h.rsplit(".",1)[-1].lower() in ("webm","mp4","m4a","wav","mp3","ogg","opus")]
    if hits: found.append((i, sym, hits[0]))
    else: missing.append((i, sym))

print(f"フォルダ: {FOLDER}")
print(f"見つかった録音: {len(found)} / 37" + (f"（未検出: {' '.join(s for _,s in missing)}）" if missing else "（全部そろっています）"))
for i, sym, path in found:
    print(f"  {i+1:2d} {sym}  ←  {os.path.basename(path)}")

if not found:
    print("\n⚠️ zy-01.* … の録音が見つかりません。フォルダを引数で指定してください（例: ~/Downloads）。")
    sys.exit(1)
if not APPLY:
    print("\n✅ 問題なければ末尾に --apply を付けて再実行すると mp3 に変換して差し替えます（未検出の符号は現状維持）。")
    sys.exit(0)

manifest = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}
os.makedirs(OUT, exist_ok=True)
for i, sym, path in found:
    f = zy_fname(sym); out = os.path.join(OUT, f)
    cmd = ["ffmpeg", "-y", "-i", path]
    if not RAW: cmd += ["-af", POLISH]
    cmd += ["-ar", "24000", "-ac", "1", "-b:a", "48k", "-codec:a", "libmp3lame", out]
    subprocess.run(cmd, capture_output=True)
    manifest[sym] = f
    print(f"  ✓ {sym} → {f}")
json.dump(manifest, open(MANIFEST, "w"), ensure_ascii=False, indent=0)
print(f"\n完了。{len(found)} 個の注音音声を差し替えました。git add & deploy してください。")
