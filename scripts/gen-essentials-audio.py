#!/usr/bin/env python3
"""必學基礎の音声をまとめて作る(不足分のみ)。
   読みは essentials.js の py をそのまま /api/tts に force で渡すので、
   「一個=yí」「一天=yì」のような変調もこちらの意図どおりに出る。
   python3 scripts/gen-essentials-audio.py [--dry]
"""
import base64, hashlib, importlib.util, json, os, subprocess, sys, urllib.request, unicodedata
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.environ.get("STW_AUDIO_DIR") or os.path.join(os.path.dirname(ROOT), "stay-tw-audio", "tts")
MANI = os.path.join(ROOT, "audio", "manifest.json")
API = "https://staytw.pages.dev/api/tts"
DRY = "--dry" in sys.argv

spec = importlib.util.spec_from_file_location("g", os.path.join(ROOT, "scripts", "tts-generate-google.py"))
g = importlib.util.module_from_spec(spec); spec.loader.exec_module(g)

# 拼音は空白の無い綴りもあり(shíyī)音節に割れない。注音は必ず1音節1トークンなので
# そちらから number 形式(shi2)を作る。対応表は py2zy.js の M を反転して使う。
_ZY2PY = None
def zy2py_map():
    global _ZY2PY
    if _ZY2PY is None:
        import re as _re
        js = open(os.path.join(ROOT, "py2zy.js"), encoding="utf-8").read()
        M = dict(_re.findall(r'"([^"]+)":\s*"([^"]+)"', _re.search(r"var M=\{(.*?)\};", js, _re.S).group(1)))
        _ZY2PY = {v: k for k, v in M.items()}
    return _ZY2PY

def syls_from_zy(zy):
    """注音文字列 → ['shi2','yi1']。割れなければ None。"""
    inv = zy2py_map(); out = []
    for tok in (zy or "").split():
        t = 1
        if tok.startswith("\u02d9"): t, tok = 5, tok[1:]
        elif tok.endswith("\u02d9"): t, tok = 5, tok[:-1]
        elif tok and tok[-1] in "\u02ca\u02c7\u02cb":
            t = {"\u02ca":2,"\u02c7":3,"\u02cb":4}[tok[-1]]; tok = tok[:-1]
        base = inv.get(tok)
        if not base:
            if tok.endswith("\u3126") and inv.get(tok[:-1]): base = inv[tok[:-1]] + "r"
            else: return None
        out.append(base.replace("\u00fc", "v") + str(t))
    return out

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
    E = json.loads(open(os.path.join(ROOT, "essentials.js"), encoding="utf-8").read()
                   .split("const ESSENTIALS = ", 1)[1].rsplit(";", 2)[0])
    mani = json.load(open(MANI, encoding="utf-8"))
    todo, seen = [], set()
    for s in E:
        for it in s["items"]:
            w = it["w"]
            if w in mani or w in seen: continue
            seen.add(w); todo.append(it)
    print(f"要生成 {len(todo)} 個")
    if DRY:
        for it in todo[:12]: print("  ", it["w"], it["zy"], "->", syls_from_zy(it["zy"]))
        return 0
    made, fail, newf = 0, [], []
    for it in todo:
        w, py = it["w"], it["py"]
        hans = [c for c in w if "一" <= c <= "鿿"]
        ss = syls_from_zy(it["zy"])
        parts = list(zip(hans, ss)) if (ss and len(hans) == len(ss)) else [(c, None) for c in w]
        parts = g.sandhi_fix(parts) if (ss and len(hans) == len(ss)) else parts
        text = "".join(c for c, _ in parts)
        fn = hashlib.md5(w.encode()).hexdigest()[:12] + "es.mp3"
        a = synth(text, parts)
        if a and len(a) > 500:
            open(os.path.join(AUDIO, fn), "wb").write(a); mani[w] = fn; newf.append(os.path.join(AUDIO, fn)); made += 1
            print(f"  ✅ {w:<8} {py}")
        else:
            fail.append(w); print(f"  ✗ {w}")
    json.dump(mani, open(MANI, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print(f"\n完成 {made} / 失敗 {len(fail)}")
    if newf:
        r = subprocess.run([os.path.join(ROOT, "scripts", "audio-sync-r2.sh")] + newf,
                           capture_output=True, text=True, timeout=1800)
        print("R2:", (r.stdout or r.stderr).strip()[-200:])
    return 0

if __name__ == "__main__":
    sys.exit(main())
