#!/usr/bin/env python3
# StayTW — 文章(articles-*.js)・分級閱讀(reading-l*.js)の「段落」と「文章単語」を
# Google cmn-TW-Wavenet-A で再生成し、全站を一つの声に統一する。
#
# なぜ(2026-10-06 Mia 回報「文章有兩個不同的聲音」「真的照注音唸嗎」):
#   ・段落 549 本は旧 Azure HsiaoChen(読みを引擎任せ=破音字が注音と食い違いうる)
#   ・単語タップは Google(gp)、しかも文章単語 704 中 493 本は音檔が無く瀏覽器合成音
#   → 段落 / 単語 / 瀏覽器 で三種の声が混ざっていた。
#
# 読みの出所(=画面の注音と同じ源なので、音と注音が必ず一致する):
#   段落: data/reading-ruby.json の逐字拼音(p) → 無ければ段落の py 欄 → それも無ければ pypinyin
#   単語: vocab の py 欄
#   いずれも tw-readings.TW_FIX(台灣讀音)と sandhi_fix(一/不)を通す。
#
# 使い方: GOOGLE_TTS_KEY=xxx python3 scripts/tts-regen-articles.py [--dry] [--force]
#   出力: ~/Documents/GitHub/stay-tw-audio/tts/<md5(z)[:12]>gp.mp3、audio/manifest.json 更新、
#         生成分を scripts/audio-sync-r2.sh で R2 へ(失敗しても生成結果は残る)
import json, os, re, sys, glob, hashlib, base64, time, subprocess, urllib.request, importlib.util, threading, unicodedata
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("ttsg", os.path.join(ROOT, "scripts", "tts-generate-google.py"))
ttsg = importlib.util.module_from_spec(spec); spec.loader.exec_module(ttsg)
KEY = os.environ.get("GOOGLE_TTS_KEY")
OUT = os.environ.get("STW_AUDIO_DIR") or os.path.join(os.path.dirname(ROOT), "stay-tw-audio", "tts")
MANI = os.path.join(ROOT, "audio", "manifest.json")
DRY = "--dry" in sys.argv; FORCE = "--force" in sys.argv

ruby = json.load(open(os.path.join(ROOT, "data", "reading-ruby.json"), encoding="utf-8"))
try:
    from pypinyin import pinyin, Style
    HAVE_PP = True
except ImportError:
    HAVE_PP = False

def tone_syl(p):
    """'tái' → 'tai2'(ttsg.to_base で声調マーク分解)。"""
    base, t = ttsg.to_base(p)
    b = "".join(x for x in base if x != "-")
    tone = next(iter(t.values()), 5) if t else 5
    return b + str(tone)

def parts_from_ruby(z):
    p = ruby.get(z); p = p.get("p") if isinstance(p, dict) else p
    if not p or len(p) != len(z): return None
    parts = []
    for c, r in zip(z, p):
        if ttsg.need_syl(c):
            if not r: return None
            parts.append((c, tone_syl(r)))
        else: parts.append((c, None))
    return parts

def parts_from_pypinyin(z):
    if not HAVE_PP: return None
    py = pinyin(z, style=Style.TONE3, neutral_tone_with_five=True)
    parts = []
    for c, r in zip(z, py):
        parts.append((c, re.sub(r"[^a-z0-9ü]", "", r[0].lower()) if ttsg.need_syl(c) else None))
    return parts

NODE = r'''
const fs=require("fs");const o={paras:{},words:{}};
for(const f of fs.readdirSync(".").filter(f=>/^(articles-\d+|reading-l\d+)\.js$/.test(f)).sort()){
  const t=fs.readFileSync(f,"utf8");
  const re=/(?:\bz|"z")\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*(?:\bpy|"py")\s*:\s*"((?:[^"\\]|\\.)*)"/g;let m;
  while((m=re.exec(t))) o.paras[JSON.parse('"'+m[1]+'"')]=JSON.parse('"'+m[2]+'"');
  const re2=/(?:\bz|"z")\s*:\s*"((?:[^"\\]|\\.)*)"/g; while((m=re2.exec(t))){const z=JSON.parse('"'+m[1]+'"'); if(!(z in o.paras)) o.paras[z]="";}
  const re3=/(?:\bw|"w")\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*(?:\bzy|"zy")\s*:\s*"[^"]*"\s*,\s*(?:\bpy|"py")\s*:\s*"((?:[^"\\]|\\.)*)"/g;
  while((m=re3.exec(t))) o.words[JSON.parse('"'+m[1]+'"')]=JSON.parse('"'+m[2]+'"');
}
console.log(JSON.stringify(o));'''

PUNCT = set("，。！？；：、」』）!?,.;:")
def chunks(parts, limit=4300):
    """<phoneme> 付き SSML が limit bytes を超えないよう、句読点の直後で切る。"""
    out = []; cur = []
    for i, (c, ph) in enumerate(parts):
        cur.append((c, ph))
        at_punct = (ph is None and c in PUNCT) and (i + 1 < len(parts))
        if at_punct and len(ttsg.ssml(cur).encode()) > limit * 0.6:
            out.append(cur); cur = []
    if cur: out.append(cur)
    # 念のため: 1 チャンクが limit を超えるなら(句読点無しの長文)文字数で等分
    fixed = []
    for ch in out:
        if len(ttsg.ssml(ch).encode()) <= limit: fixed.append(ch); continue
        n = len(ttsg.ssml(ch).encode()) // limit + 1; step = max(1, len(ch) // n + 1)
        for k in range(0, len(ch), step): fixed.append(ch[k:k + step])
    return fixed

def synth_one(parts):
    body = json.dumps({"input": {"ssml": ttsg.ssml(parts)}, "voice": {"languageCode": "cmn-TW", "name": "cmn-TW-Wavenet-A"}, "audioConfig": {"audioEncoding": "MP3", "speakingRate": 1.0}}).encode()
    msg = ""
    for att in range(4):
        try:
            r = json.load(urllib.request.urlopen(urllib.request.Request("https://texttospeech.googleapis.com/v1/text:synthesize?key=" + KEY, data=body, headers={"Content-Type": "application/json"}), timeout=60))
            if r.get("audioContent"): return base64.b64decode(r["audioContent"])
        except Exception as e:
            msg = str(e)
            try: msg += " " + e.read()[:160].decode("utf-8", "ignore")
            except Exception: pass
            if "400" in msg: break   # 入力の問題は再試行しても無駄
            time.sleep(1.5 * (att + 1))
    print(f"  synth failed: {''.join(c for c, _ in parts)[:14]}… {msg[:160]}", flush=True)
    return None

def main():
    data = json.loads(subprocess.check_output(["node", "-e", NODE], cwd=ROOT))
    manifest = json.load(open(MANI, encoding="utf-8")) if os.path.exists(MANI) else {}
    todo = []; src = {"ruby": 0, "py": 0, "pypinyin": 0, "word": 0}; bad = []
    for z, py in data["paras"].items():
        parts = parts_from_ruby(z)
        if parts: src["ruby"] += 1
        else:
            parts = ttsg.phonemes(z, py) if py else None
            if parts: src["py"] += 1
            else:
                parts = parts_from_pypinyin(z)
                if parts: src["pypinyin"] += 1
        if not parts: bad.append(z); continue
        todo.append((z, parts))
    for w, py in data["words"].items():
        if w in manifest and manifest[w].endswith("gp.mp3") and not FORCE: continue
        parts = ttsg.phonemes(w, py)
        if not parts: bad.append(w); continue
        src["word"] += 1; todo.append((w, parts))
    todo = [(z, ttsg.sandhi_fix(ttsg._tw_fix(p))) for z, p in todo]
    print(f"対象 {len(todo)} (段落 ruby {src['ruby']} / py {src['py']} / pypinyin {src['pypinyin']} / 単語 {src['word']}) 整列失敗 {len(bad)}", flush=True)
    if bad: print("  失敗例:", [b[:20] for b in bad[:10]])
    chars = sum(len(z) for z, _ in todo); print(f"文字数 {chars}（Wavenet 約 US${chars/1e6*16:.2f}）")
    if DRY: return
    if not KEY: sys.exit("GOOGLE_TTS_KEY を環境変数で渡してください")
    os.makedirs(OUT, exist_ok=True)
    res = {}; fails = []; done = [0]; skip = [0]; gen = []; lock = threading.Lock()
    def work(z, parts):
        fn = hashlib.md5(z.encode()).hexdigest()[:12] + "gp.mp3"; path = os.path.join(OUT, fn)
        if not FORCE and os.path.exists(path) and os.path.getsize(path) > 500:
            with lock: res[z] = fn; skip[0] += 1
            return
        # Google は input.ssml 5000 bytes 上限(逐字 <phoneme> だと 1 字 ≒ 45 bytes → 段落は軽く超える)
        # → 句読点で 4,300 bytes 以下のチャンクに割って合成し、ffmpeg で連結(同一エンコード設定なので -c copy)
        audios = []
        for ch in chunks(parts):
            audio = synth_one(ch)
            if audio is None:
                with lock: fails.append((z[:20], "synth failed"))
                return
            audios.append(audio)
        if len(audios) == 1:
            open(path, "wb").write(audios[0])
        else:
            tmpd = os.path.join(OUT, ".tmp"); os.makedirs(tmpd, exist_ok=True)
            names = []
            for i, a in enumerate(audios):
                tp = os.path.join(tmpd, f"{fn}.{i}.mp3"); open(tp, "wb").write(a); names.append(tp)
            lst = os.path.join(tmpd, fn + ".txt"); open(lst, "w").write("".join(f"file '{n}'\n" for n in names))
            r = subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", path], capture_output=True, text=True)
            for n in names + [lst]:
                try: os.remove(n)
                except Exception: pass
            if r.returncode or not os.path.exists(path):
                with lock: fails.append((z[:20], "ffmpeg " + r.stderr[:100]))
                return
        with lock: res[z] = fn; done[0] += 1; gen.append(fn)
    LIMIT = int(os.environ.get("LIMIT", "0") or 0)
    if LIMIT: todo = todo[:LIMIT]
    t0 = time.time(); n = [0]
    def work2(z, p):
        work(z, p); n[0] += 1
        if n[0] % 25 == 0: print(f"  … {n[0]}/{len(todo)} 生成{done[0]} 略過{skip[0]} 失敗{len(fails)} {int(time.time()-t0)}s", flush=True)
    with ThreadPoolExecutor(max_workers=int(os.environ.get("WORKERS", "4"))) as ex:
        for f in [ex.submit(work2, z, p) for z, p in todo]: f.result()
    for z, fn in res.items(): manifest[z] = fn
    json.dump(manifest, open(MANI, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print(f"=== 生成{done[0]} 略過{skip[0]} 失敗{len(fails)} manifest{len(manifest)} ===", flush=True)
    if fails[:10]: print("FAIL:", fails[:10])
    newf = [os.path.join(OUT, fn) for fn in gen if os.path.exists(os.path.join(OUT, fn))]
    json.dump(newf, open(os.path.join(ROOT, "scripts", ".last-regen-files.json"), "w"))
    print(f"新規 mp3 {len(newf)} 本 → R2 へは scripts/audio-sync-r2.sh（全件 rclone 差分）を実行", flush=True)

if __name__ == "__main__": main()
