#!/usr/bin/env python3
# 例文ローカライズ(data/ex-locale.json)の音声を作る。
# 読みは注音から作った force phoneme で固定 → 破音字も日本→韓國 の差し替え箇所も意図どおりに読む。
#   python3 scripts/gen-ex-locale-audio.py [--dry]
import base64, hashlib, importlib.util, json, os, re, subprocess, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.environ.get("STW_AUDIO_DIR") or os.path.join(os.path.dirname(ROOT), "stay-tw-audio", "tts")
MANI = os.path.join(ROOT, "audio", "manifest.json")
API = "https://staytw.pages.dev/api/tts"
DRY = "--dry" in sys.argv

spec = importlib.util.spec_from_file_location("g", os.path.join(ROOT, "scripts", "tts-generate-google.py"))
g = importlib.util.module_from_spec(spec); spec.loader.exec_module(g)

# 注音 → 拼音(number 形式)。essentials の生成と同じく py2zy.js の対応表を反転して使う
_M = None
def zy2num(zy):
    global _M
    if _M is None:
        js = open(os.path.join(ROOT, "py2zy.js"), encoding="utf-8").read()
        M = dict(re.findall(r'"([^"]+)":\s*"([^"]+)"', re.search(r"var M=\{(.*?)\};", js, re.S).group(1)))
        _M = {v: k for k, v in M.items()}
    out = []
    for tok in zy.split():
        # 句読点は最後の音節にくっついて来る（「ㄖㄣˊ。」）。軽声は先頭 ˙ の形も末尾 ˙ の形もある。
        t = re.sub(r"[^\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]", "", tok)
        if not t: continue
        neutral = t.startswith("˙") or t.endswith("˙")
        t = t.strip("˙")
        tone = 5 if neutral else {"ˊ": 2, "ˇ": 3, "ˋ": 4}.get(t[-1:], 1)
        core = t[:-1] if t[-1:] in "ˊˇˋ" else t
        base = _M.get(core)
        if not base: return None
        out.append(base + str(tone))
    return out

def synth(text, parts):
    force = [{"c": c, "py": p} for c, p in parts if p]
    body = json.dumps({"text": text, "force": force}).encode()
    r = urllib.request.urlopen(urllib.request.Request(API, data=body,
        headers={"Content-Type": "application/json", "User-Agent": "staytw-tts-gen"}), timeout=45)
    j = json.load(r)
    return base64.b64decode(j["audio"]) if j.get("audio") else None

def main():
    loc = json.load(open(os.path.join(ROOT, "data", "ex-locale.json"), encoding="utf-8"))
    mani = json.load(open(MANI, encoding="utf-8"))
    todo = []
    for src, langs in loc.items():
        for lg, v in langs.items():
            z, zy = v["z"], v["zy"]
            if z in mani: continue                       # 既にある(別言語で同じ文になる事はまず無いが一応)
            hans = [c for c in z if "一" <= c <= "鿿"]
            nums = zy2num(zy)
            if not nums or len(nums) != len(hans):
                print(f"  ✗ 音節数が合わない {z}  漢字{len(hans)} 音{len(nums) if nums else 0}"); continue
            todo.append((z, list(zip(hans, nums))))
    # 同じ文が複数言語に出ることは無いが、念のため重複除去
    seen, uniq = set(), []
    for z, p in todo:
        if z in seen: continue
        seen.add(z); uniq.append((z, p))
    print(f"生成対象 {len(uniq)} 文")
    for z, _ in uniq: print("   ", z)
    if DRY: return
    done, fails, newf = 0, [], []
    for z, parts in uniq:
        fn = hashlib.md5(z.encode()).hexdigest()[:12] + "ex.mp3"
        a = synth(z, parts)
        if a and len(a) > 500:
            open(os.path.join(AUDIO, fn), "wb").write(a); mani[z] = fn; newf.append(os.path.join(AUDIO, fn)); done += 1
        else:
            fails.append(z)
    json.dump(mani, open(MANI, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print(f"\n完成 {done} / 失敗 {len(fails)}")
    for f in fails: print("  FAIL:", f)
    if newf:
        r = subprocess.run([os.path.join(ROOT, "scripts", "audio-sync-r2.sh")] + newf, capture_output=True, text=True, timeout=1200)
        print("R2:", (r.stdout or r.stderr).strip()[-300:])

if __name__ == "__main__": main()
