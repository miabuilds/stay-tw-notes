#!/usr/bin/env python3
"""「一」「不」の変調ルール。教育部は本調を見出しにし、変調を（變）で併記する。
   サイトの音声(TTS)は変調で鳴っているのに、ルビの多くが本調のまま＝耳と目が食い違う。
   ここはその食い違いを直すための共通ルール。

   一： 4声の前 → ㄧˊ / 1・2・3声の前 → ㄧˋ / それ以外(序数・月・日付・数字列・語末)は本調 ㄧ
   不： 4声の前 → ㄅㄨˊ / それ以外 ㄅㄨˋ
   ＊もとから軽声で書かれているもの(˙ㄧ、˙ㄅㄨ＝「對不起」「看一看」型)は触らない。
"""
import json, os, re, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NUMS = set("〇零一二三四五六七八九十")
ORD_PREV = set("第初")            # 第一・初一
WEEK_PREV = set("星期禮拜週")      # 星期一・禮拜一・週一
NEXT_KEEP = set("月")             # 一月

_BASE = None
def base_tone(ch):
    """その字の本調(1-4)。「一個」の個のように軽声で書かれた次字を判定するために要る。
       出所: 逐字対応の reading-ruby.json を集計して、その字のいちばん多い非軽声の声調。
       辞書(dict-ext)は単字の見出しが少なく、個・次・張・家などが引けなかったため。"""
    global _BASE
    if _BASE is None:
        from collections import Counter, defaultdict
        cnt = defaultdict(Counter)
        try:
            R = json.load(open(os.path.join(ROOT, "data", "reading-ruby.json"), encoding="utf-8"))
            for sent, r in R.items():
                ps = r.get("p") or []
                if len(ps) != len(sent): continue
                for c, py in zip(sent, ps):
                    t = tone_of_pinyin(py)
                    if t and t != 5: cnt[c][t] += 1
        except Exception: pass
        try:
            d = json.load(open(os.path.join(ROOT, "data", "dict-ext.json"), encoding="utf-8"))
            for w, v in d.items():
                if len(w) == 1 and v.get("py"):
                    t = tone_of_pinyin(v["py"])
                    if t and t != 5: cnt[w][t] += 1
        except Exception: pass
        _BASE = {c: k.most_common(1)[0][0] for c, k in cnt.items()}
    return _BASE.get(ch, 0)

_MARKS = {"̄": 1, "́": 2, "̌": 3, "̀": 4}
def tone_of_pinyin(py):
    for c in unicodedata.normalize("NFD", py or ""):
        if c in _MARKS: return _MARKS[c]
    return 5 if py else 0          # 符号なし = 軽声扱い

def tone_of_zhuyin(zy):
    if not zy: return 0
    if zy.startswith("˙") or zy.endswith("˙"): return 5
    if "ˊ" in zy: return 2
    if "ˇ" in zy: return 3
    if "ˋ" in zy: return 4
    return 1

def digit_run(sent, i):
    """1995 のような数字の並びの中か(年号・番号は変調しない)"""
    j = i
    while j > 0 and sent[j-1] in NUMS: j -= 1
    k = i
    while k + 1 < len(sent) and sent[k+1] in NUMS: k += 1
    return (k - j + 1) >= 3

_WORDS = None
def _words():
    """語彙集合。「統一」「唯一」のように一が語末に来る語を見分けるのに使う。"""
    global _WORDS
    if _WORDS is None:
        _WORDS = set()
        try:
            d = json.load(open(os.path.join(ROOT, "data", "dict-ext.json"), encoding="utf-8"))
            _WORDS |= set(d.keys())
        except Exception: pass
        try:
            for fn in os.listdir(ROOT):
                if not re.match(r"^vocab.*\.js$", fn): continue
                t = open(os.path.join(ROOT, fn), encoding="utf-8").read()
                _WORDS |= set(re.findall(r'"w"\s*:\s*"([^"]+)"', t))
                _WORDS |= set(re.findall(r'\bw:"([^"]+)"', t))
        except Exception: pass
    return _WORDS

# 辞書に無いことがある「一で終わる語」。ここの一は数ではないので変調しない。
YI_FINAL = {"統一","唯一","專一","萬一","單一","劃一","齊一","歸一","純一","不一","之一",
            "合一","如一","初一","第一","始終如一","表裡如一","言行不一","心口不一"}

def ends_word(sent, i):
    """sent[i] がある語の最後の字か(辞書に prev+字 / prev2+prev+字 がある)。
       統一・唯一・專一 などの『一』は数でないので変調しない。"""
    w = _words()
    for n in (2, 3, 4):
        if i - (n - 1) < 0: continue
        cand = sent[i-(n-1):i+1]
        if cand in w or cand in YI_FINAL: return True
    return False

def want_yi(sent, i, next_tone):
    """返り値: 1=本調のまま, 2=ㄧˋ, 4=ㄧˊ, 0=判定不能(触らない)"""
    prev = sent[i-1] if i > 0 else ""
    nxt  = sent[i+1] if i+1 < len(sent) else ""
    if not nxt: return 1                       # 語末・文末
    if prev in ORD_PREV or prev in WEEK_PREV: return 1
    if nxt in NEXT_KEEP: return 1              # 一月
    if nxt == "一" or prev == "一": return 1    # 一一
    if nxt in ("號", "日") and prev in NUMS: return 1   # 十一號
    if digit_run(sent, i): return 1            # 一九九五
    if ends_word(sent, i): return 1            # 統一・唯一・專一…語末の一
    if next_tone == 4: return 4
    if next_tone in (1, 2, 3): return 2
    return 0                                    # 次が判定できない

def want_bu(sent, i, next_tone):
    nxt = sent[i+1] if i+1 < len(sent) else ""
    if not nxt: return 4                        # 語末は本調 ㄅㄨˋ
    return 2 if next_tone == 4 else 4           # 2=ㄅㄨˊ, 4=ㄅㄨˋ
