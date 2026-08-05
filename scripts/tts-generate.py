#!/usr/bin/env python3
# StayTW Study — 事前生成 TTS（Azure Speech 公式 API・Free F0 で商用ライセンス的にクリーン）
# 音声: zh-TW-HsiaoChenNeural（以前の edge-tts と同じ声）
# 使い方:
#   AZURE_SPEECH_KEY=xxxx AZURE_SPEECH_REGION=japaneast python3 scripts/tts-generate.py [--force]
#   --force: 既存ファイルも全部作り直す（edge-tts 由来の音声を公式版に置き換える時に使用）
# F0 のレート制限（約20リクエスト/分）に合わせて自動スロットリング＋429リトライ。
import hashlib, json, os, subprocess, sys, time, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio", "tts")
MANIFEST = os.path.join(ROOT, "audio", "manifest.json")
VOICE = "zh-TW-HsiaoChenNeural"
KEY = os.environ.get("AZURE_SPEECH_KEY")
REGION = os.environ.get("AZURE_SPEECH_REGION", "japaneast")
FORCE = "--force" in sys.argv
FORCE_ZY = "--force-zy" in sys.argv   # 注音だけ作り直す（音標修正の再生成用。語彙2000+は触らない）
INTERVAL = 3.2  # 秒/リクエスト（F0: 20/min を安全側で）

if not KEY:
    sys.exit("AZURE_SPEECH_KEY を環境変数で渡してください")

NODE = r"""
const texts = new Set();
["l1","l2","l3","l4","l5"].forEach(l => {
  const V = require("./vocab-" + l + ".js")["VOCAB_" + l.toUpperCase()];
  V.forEach(v => { texts.add(v.w); texts.add(v.ex.z); });
  const G = require("./grammar-" + l + ".js")["GRAMMAR_" + l.toUpperCase()];
  G.forEach(g => g.eg.forEach(e => texts.add(e.z.replace(/<[^>]+>/g, ""))));
});
require("./phrases-l1.js").PHRASES_L1.forEach(s => s.items.forEach(i => texts.add(i.z)));
["l1","l2","l3","l4","l5"].forEach(l => { try { require("./reading-" + l + ".js")["READING_" + l.toUpperCase()].forEach(s => { s.lines.forEach(x => texts.add(x.z)); s.vocab.forEach(v => texts.add(v.w)); }); } catch(e){} });
console.log(JSON.stringify([...texts]));
"""

# 注音は「符号」をキーに、ph（拼音+一声）を <phoneme> で rep に当てて合成（呼読音を平音で統一）
NODE_ZY = 'console.log(JSON.stringify(require("./zhuyin.js").ZHUYIN.map(z=>({z:z.z,rep:z.rep,ph:z.ph||""}))));'
def zy_fname(sym):
    return hashlib.md5(("ZY1:" + sym).encode()).hexdigest()[:12] + ".mp3"

def fname(text):
    # 読み上げ用サニタイズで変化する語は別ハッシュ（immutable キャッシュを破棄。他は従来通り）
    key = text if spoken(text) == text else text + "\x00v2"
    return hashlib.md5(key.encode()).hexdigest()[:12] + ".mp3"

import re
def spoken(text):
    # tts.js の sanitize と同じ：読み上げ用に区切り記号・括弧・絵文字を除去
    t = re.sub(r"<[^>]+>", "", text)
    t = re.sub(r"[／/｜|—―–…⋯~〜]+", "、", t)               # 区切り → ポーズ（「斜線」等と読ませない）
    t = re.sub(r"[（）()「」『』【】《》〈〉“”‘’\"']", "", t)
    t = re.sub(r"[＿_]{2,}", "、", t)
    t = re.sub(r"[🔊💡✓★☆♪]", "", t)
    t = re.sub(r"、{2,}", "、", t).strip("、")
    return t or text

def esc_xml(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def post_ssml(ssml, path, label):
    req = urllib.request.Request(
        f"https://{REGION}.tts.speech.microsoft.com/cognitiveservices/v1",
        data=ssml.encode("utf-8"),
        headers={
            "Ocp-Apim-Subscription-Key": KEY,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
            "User-Agent": "staytw-tts",
        })
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            if len(data) < 500:
                raise RuntimeError("suspiciously small audio")
            with open(path, "wb") as f:
                f.write(data)
            return True
        except urllib.error.HTTPError as e:
            if e.code == 429:           # レート制限 → 待って再試行
                time.sleep(15 * (attempt + 1)); continue
            if e.code in (500, 502, 503):
                time.sleep(5 * (attempt + 1)); continue
            try: body = e.read().decode("utf-8", "replace")[:300]
            except Exception: body = ""
            print(f"  HTTP {e.code}: {label} :: {body}", flush=True)
            return False
        except Exception as ex:
            time.sleep(3 * (attempt + 1))
    return False

def synth(text, path):
    inner = esc_xml(spoken(text))
    ssml = f"<speak version='1.0' xml:lang='zh-TW'><voice name='{VOICE}'>{inner}</voice></speak>"
    return post_ssml(ssml, path, text[:20])

# 注音：拼音音標(SAPI)は zh-CN の声で有効。呼読音を一声=平音で統一。ph が拒否されたら代表字の素読みへ自動フォールバック。
ZY_VOICE = "zh-CN-XiaoxiaoNeural"
def synth_zy(rep, ph, path):
    if ph:
        ph = re.sub(r"\s*(\d+)$", r" \1", ph)   # Azure SAPI は「音節<空白>声調」を要求（bo1 → bo 1）
        inner = f"<phoneme alphabet='sapi' ph='{ph}'>{esc_xml(rep)}</phoneme>"
        ssml = ("<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' "
                f"xml:lang='zh-CN'><voice name='{ZY_VOICE}'>{inner}</voice></speak>")
        if post_ssml(ssml, path, f"{rep}/{ph}"):
            return True
        print(f"  ↳ ph 拒否、代表字にフォールバック: {rep}", flush=True)
    return synth(rep, path)   # zh-TW で代表字をそのまま読む（従来動作）

def main():
    os.makedirs(OUT, exist_ok=True)
    texts = json.loads(subprocess.check_output(["node", "-e", NODE], cwd=ROOT))
    manifest = json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}
    todo = []
    for t in texts:
        f = fname(t); manifest[t] = f
        p = os.path.join(OUT, f)
        if FORCE or not (os.path.exists(p) and os.path.getsize(p) > 1000):
            todo.append((t, p))
    print(f"texts: {len(texts)}, to generate: {len(todo)} (force={FORCE})", flush=True)
    done, fail = 0, []
    for i, (t, p) in enumerate(todo):
        ok = synth(t, p)
        if ok: done += 1
        else: fail.append(t)
        if (i + 1) % 50 == 0:
            print(f"  {i+1}/{len(todo)} done={done} fail={len(fail)}", flush=True)
        time.sleep(INTERVAL)
    # ── 注音（符号キー・呼読音を一声で統一）──
    zy = json.loads(subprocess.check_output(["node", "-e", NODE_ZY], cwd=ROOT))
    zy_todo = []
    for s in zy:
        f = zy_fname(s["z"]); manifest[s["z"]] = f
        p = os.path.join(OUT, f)
        if FORCE or FORCE_ZY or not (os.path.exists(p) and os.path.getsize(p) > 1000):
            zy_todo.append((s, p))
    print(f"注音: {len(zy)}, to generate: {len(zy_todo)}", flush=True)
    for i, (s, p) in enumerate(zy_todo):
        ok = synth_zy(s["rep"], (s.get("ph") or None), p)
        if ok: done += 1
        else: fail.append(s["z"]); manifest.pop(s["z"], None)
        time.sleep(INTERVAL)

    for t in fail:
        manifest.pop(t, None)
    json.dump(manifest, open(MANIFEST, "w"), ensure_ascii=False, indent=0)
    print(f"done: {done}, failed: {len(fail)}, manifest: {len(manifest)}", flush=True)

if __name__ == "__main__":
    main()
