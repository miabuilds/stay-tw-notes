#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""新しい単語を萌典(教育部)の読みで組み立てる。

  python3 scripts/new-vocab.py data/new-vocab-l6.json > /tmp/out.js

入力(手で書くのは意味と例文だけ):
  [{"w":"潛移默化","c":"成","m":{"j":"…","e":"…","k":"…"},
    "ex":{"z":"…","j":"…","e":"…","k":"…"}}]

読みは一切手で打たない:
  ・単語の注音   萌典 /uni/<語> をそのまま使う(教育部の読み)
  ・単語の拼音   py2zy.js の音節表を逆に引いて注音から作る
                 (pypinyin は大陸読みなので使わない。熟=ㄕㄡˊ/shóu が shú になる)
  ・例文の拼音   1 字ずつ萌典に聞く。読みが 2 つ以上ある字は決め打ちせず
                 「要確認」として出す。破音字を機械が勝手に選ぶと必ず事故る。
"""
import json, os, re, sys, unicodedata, urllib.request, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "scripts", ".moedict_cache_w.json")
cache = json.load(open(CACHE, encoding="utf-8")) if os.path.exists(CACHE) else {}

# py2zy.js の音節表を逆にして 注音→拼音 を作る
js = open(os.path.join(ROOT, "py2zy.js"), encoding="utf-8").read()
M = dict(re.findall(r'"([^"]+)":\s*"([^"]+)"', re.search(r'var M=\{(.*?)\};', js, re.S).group(1)))
ZY2PY = {v: k for k, v in M.items()}
TONE_MARK = {"ˊ": 2, "ˇ": 3, "ˋ": 4}
VOWEL = {1: "̄", 2: "́", 3: "̌", 4: "̀"}

def accent(base, tone):
    """拼音にトーン記号を載せる。a>o>e>最後の母音、iu/ui は後ろ側。"""
    if tone == 5 or tone == 0:
        return base
    for v in "aoe":
        if v in base:
            i = base.index(v); break
    else:
        m = [i for i, c in enumerate(base) if c in "iuü"]
        if not m: return base
        i = m[-1]
    out = base[:i + 1] + VOWEL[tone] + base[i + 1:]
    return unicodedata.normalize("NFC", out)

def zy_syl_to_py(syl):
    t = 1
    if syl.startswith("˙"): syl, t = syl[1:], 5
    for mk, n in TONE_MARK.items():
        if syl.endswith(mk): syl, t = syl[:-1], n; break
    base = ZY2PY.get(syl)
    if not base and syl.endswith("ㄦ") and ZY2PY.get(syl[:-1]):
        base = ZY2PY[syl[:-1]] + "r"
    if not base: return None
    return accent(base.replace("ü", "ü"), t)

def moe(word):
    if word in cache: return cache[word]
    try:
        d = json.loads(urllib.request.urlopen(
            "https://www.moedict.tw/uni/" + urllib.parse.quote(word), timeout=15).read())
        hs = d.get("heteronyms", [])
        out = {"bopomofo": [h.get("bopomofo", "") for h in hs if h.get("bopomofo")],
               "def": (hs[0].get("definitions", [{}])[0].get("def", "") if hs else "")}
    except Exception:
        out = {"bopomofo": [], "def": ""}
    cache[word] = out
    json.dump(cache, open(CACHE, "w", encoding="utf-8"), ensure_ascii=False)
    return out

def build(item):
    w = item["w"]
    got = moe(w)
    if not got["bopomofo"]:
        return None, f"萌典に無い: {w}"
    if len(got["bopomofo"]) > 1:
        return None, f"読みが複数ある(要確認): {w} → {' / '.join(got['bopomofo'])}"
    zy = got["bopomofo"][0]
    syls = zy.split()
    pys = [zy_syl_to_py(s) for s in syls]
    if any(p is None for p in pys):
        return None, f"注音→拼音に落とせない: {w} {zy}"
    out = dict(item)
    out["zy"] = zy
    out["py"] = "".join(pys)          # 単語なので続けて書く(既存データと同じ)
    return out, None

# 現代の普通の文で読みが 1 つに決まる字だけ、既定を置く。
# ここに入れていいのは「文脈を見なくても決まる」ものだけ。
# 地/為/得/還/重/行/長/種/應/分/差/覺/少/數/空/樂/難/處/中/盡 は文脈で変わるので入れない。
# 一/不 は連続変調(sandhi)があるので入れない(scripts/fix-sandhi.py の担当)。
# 文脈で本当に読みが割れる字。ここだけ人が決める。
# tw-readings.py が「逐句人工拼音で決める」と書いている面子と揃えてある。
AMBIG = set("得為重行長種應分差覺假少數空樂難處還都中盡地系相傳教好看便更")

# 萌典が「台」の見出しを持たない語(台灣/台北/台中…)。単字に落とすと台=ㄊㄞ になり tāi wān と出る。
# 萌典の見出しは「臺灣」なので、異体字で引き直す。
ALT = {"台": "臺"}

DEFAULT = {
  "的": "˙ㄉㄜ", "個": "˙ㄍㄜ", "這": "ㄓㄜˋ", "那": "ㄋㄚˋ", "會": "ㄏㄨㄟˋ",
  "化": "ㄏㄨㄚˋ", "思": "ㄙ", "熟": "ㄕㄡˊ", "結": "ㄐㄧㄝˊ", "了": "˙ㄌㄜ",
  "們": "˙ㄇㄣ", "著": "˙ㄓㄜ", "麼": "˙ㄇㄜ", "呢": "˙ㄋㄜ", "吧": "˙ㄅㄚ",
  "嗎": "˙ㄇㄚ", "和": "ㄏㄢˋ", "誰": "ㄕㄟˊ", "把": "ㄅㄚˇ", "被": "ㄅㄟˋ",
  "與": "ㄩˇ", "將": "ㄐㄧㄤ", "使": "ㄕˇ", "從": "ㄘㄨㄥˊ", "相": "ㄒㄧㄤ",
  "間": "ㄐㄧㄢ", "傳": "ㄔㄨㄢˊ", "看": "ㄎㄢˋ", "教": "ㄐㄧㄠ", "好": "ㄏㄠˇ",
}

TONE_OF = {"\u0304": 1, "\u0301": 2, "\u030c": 3, "\u0300": 4}
def tone_of(py):
    for c in unicodedata.normalize("NFD", py or ""):
        if c in TONE_OF: return TONE_OF[c]
    return 5
def retone(py, tone):
    base = "".join(c for c in unicodedata.normalize("NFD", py) if c not in TONE_OF)
    return accent(unicodedata.normalize("NFC", base), tone)

def ex_pinyin(z, fix=None):
    """例文の拼音。

    1 字ずつ萌典に聞くと「台灣」が tāi wān になる(萌典の「台」単字の主音は ㄊㄞ)。
    熟語の読みは熟語で決まるので、長い語から順に萌典に聞いて、取れたらその読みを使う。
    取れなかった字だけ単字にフォールバックし、文脈で割れる字(AMBIG)は人に返す。
    最後に 一/不 の連続変調を通す。
    """
    fix = fix or {}
    chars = [c for c in z if re.match(r"[\u4e00-\u9fff]", c)]
    parts = [None] * len(chars)
    warn = []
    i = 0
    while i < len(chars):
        if chars[i] in fix:
            parts[i] = zy_syl_to_py(fix[chars[i]]) or "??"; i += 1; continue
        hit = False
        for n in (4, 3, 2):                       # 長い語から
            if i + n > len(chars): continue
            wd = "".join(chars[i:i + n])
            g = moe(wd)
            if not g["bopomofo"]:                 # 異体字でもう一度(台灣 → 臺灣)
                alt = "".join(ALT.get(c, c) for c in wd)
                if alt != wd: g = moe(alt)
            if len(g["bopomofo"]) == 1:           # 読みが 1 つに決まる語だけ採用
                syls = g["bopomofo"][0].split()
                if len(syls) == n:
                    for k, sy in enumerate(syls):
                        parts[i + k] = zy_syl_to_py(sy) or "??"
                    i += n; hit = True; break
        if hit: continue
        ch = chars[i]
        g = moe(ch)
        if not g["bopomofo"]:
            warn.append(ch + "(萌典に無い)"); parts[i] = "??"; i += 1; continue
        d = DEFAULT.get(ch)
        if d and d in g["bopomofo"]:
            parts[i] = zy_syl_to_py(d) or "??"; i += 1; continue
        if ch in AMBIG and len(g["bopomofo"]) > 1:
            warn.append(ch + "(" + "/".join(g["bopomofo"]) + ")"); parts[i] = "??"; i += 1; continue
        parts[i] = zy_syl_to_py(g["bopomofo"][0]) or "??"
        if parts[i] == "??": warn.append(ch + "(変換不可)")
        i += 1
    # 一/不 は次の音節の声調で変わる。並べ終わってから通す。
    for k, ch in enumerate(chars):
        if ch in ("一", "不") and k + 1 < len(parts) and parts[k] and parts[k] != "??":
            nxt = tone_of(parts[k + 1])
            parts[k] = retone(parts[k], 2 if nxt == 4 else 4)
    return " ".join(p or "??" for p in parts), warn

if __name__ == "__main__":
    src = json.load(open(sys.argv[1], encoding="utf-8"))
    ok, ng = [], []
    for it in src:
        built, err = build(it)
        if err: ng.append(err); continue
        if built.get("ex", {}).get("z"):
            py, warn = ex_pinyin(built["ex"]["z"], built.pop("exfix", None))
            built["ex"]["py"] = py
            if warn: ng.append(f"例文の要確認: {built['w']} → {' '.join(warn)}")
        ok.append(built)
    sys.stderr.write(f"組めた {len(ok)} / 要対応 {len(ng)}\n")
    for e in ng: sys.stderr.write("  ! " + e + "\n")
    print(json.dumps(ok, ensure_ascii=False, indent=1))
