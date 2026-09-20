#!/usr/bin/env python3
"""影片/Podcast 共用:把站上的單字資料與已生成的台灣發音 mp3 讀進來。

音檔來源就是網站在用的那批(audio/manifest.json → stay-tw-audio/tts/*.mp3),
所以影片和 Podcast 的讀音跟 app 裡聽到的完全一致(都對照過教育部辭典)。
"""
import json, os, subprocess, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.environ.get("STW_AUDIO_DIR") or os.path.join(os.path.dirname(ROOT), "stay-tw-audio", "tts")
MANIFEST = os.path.join(ROOT, "audio", "manifest.json")

_NODE = r'''const fs=require("fs");const out={};
const files=fs.readdirSync(".").filter(f=>/^vocab.*\.js$/.test(f)).sort();
for(const f of files){const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  const lv=(f.match(/vocab-(l\d)/)||[])[1]||"?";
  (out[lv]=out[lv]||[]).push(...a);}
console.log(JSON.stringify(out));'''

def load_vocab():
    """{'l1':[{w,py,zy,c,m:{j,e,k,...},ex:{z,py,j,...}}, ...], ...}"""
    return json.loads(subprocess.check_output(["node", "-e", _NODE], cwd=ROOT))

_MAN = None
def audio_path(text):
    """その文字列の mp3 のフルパス。無ければ None。"""
    global _MAN
    if _MAN is None:
        _MAN = json.load(open(MANIFEST, encoding="utf-8"))
    fn = _MAN.get(text)
    if not fn:
        return None
    p = os.path.join(AUDIO_DIR, fn)
    return p if os.path.exists(p) else None

def meaning(v, lang):
    m = v.get("m") or {}
    key = {"ja": "j", "en": "e", "ko": "k", "vi": "v", "id": "i"}.get(lang, "j")
    return m.get(key) or m.get("e") or m.get("j") or ""

def ex_meaning(v, lang):
    ex = v.get("ex") or {}
    key = {"ja": "j", "en": "e", "ko": "k", "vi": "v", "id": "i"}.get(lang, "j")
    return ex.get(key) or ex.get("e") or ex.get("j") or ""

VOICE = {"ja": "Kyoko", "ko": "Yuna", "en": "Samantha"}
def narrate(text, lang, out_wav):
    """macOS 内蔵の音声でナレーションを作る(無料・ローカル)。"""
    v = VOICE.get(lang)
    if not v:
        return False
    aiff = out_wav + ".aiff"
    subprocess.run(["say", "-v", v, "-r", "170", "-o", aiff, text], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(["ffmpeg", "-y", "-i", aiff, "-ar", "44100", "-ac", "1", out_wav],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    os.remove(aiff)
    return True

def silence(sec, out_wav):
    subprocess.run(["ffmpeg", "-y", "-f", "lavfi", "-i",
                    f"anullsrc=r=44100:cl=mono", "-t", str(sec), out_wav],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def to_wav(mp3, out_wav):
    subprocess.run(["ffmpeg", "-y", "-i", mp3, "-ar", "44100", "-ac", "1", out_wav],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def dur(path):
    o = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                 "-of", "csv=p=0", path]).decode().strip()
    return float(o) if o else 0.0

def concat_wavs(wavs, out_path, bitrate="128k"):
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as f:
        for w in wavs:
            f.write("file '%s'\n" % os.path.abspath(w).replace("'", "'\\''"))
        lst = f.name
    args = ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst]
    if out_path.endswith(".mp3"):
        args += ["-c:a", "libmp3lame", "-b:a", bitrate]
    args += [out_path]
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    os.remove(lst)
