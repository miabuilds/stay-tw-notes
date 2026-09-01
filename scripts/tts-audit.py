#!/usr/bin/env python3
# StayTW — 全単語＋例文の「逐字読音」を校對。生成した音声は tts_ph の拼音を強制するので、
# 読音が正しい ⇔ 拼音が正しい。各字の割り当て拼音の【基底(声母+韻母)】が pypinyin の
# その字の妥当な読みに含まれるか検査 → 含まれない=対齊バグ or 来源拼音の打ち間違い。
#
# ※声調だけの差(qi1↔qi2 等)や輕聲(X5)は出さない：台湾読音(期qí/質zhí/企qì/微危wéi…)や
#   輕聲(太太/謝謝/東西/意思…)は pypinyin(大陸)と違って当然で、誤りではないため。
#   基底が丸ごと違うものだけ出す(垃圾lè sè・姊jiě は台湾正音なので既知例外として除外)。
#
# 使い方: python3 scripts/tts-audit.py    （pypinyin 必須: pip install pypinyin）
import re,sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import importlib
g=importlib.import_module("tts-generate-google")
try:
    from pypinyin import pinyin, Style
except ImportError:
    sys.exit("pypinyin が必要です: pip install pypinyin")

# pypinyin に無い/大陸と違うが正しい読み（台湾正音・古音など。誤りではない既知例外）
TW_OK={("垃","le"),("圾","se"),("姊","jie"),("說","shui")}   # 垃圾lèsè・姊jiě・遊說yóushuì

def base(r):return re.sub(r'[0-9]$','',r.lower().replace("ü","v").replace("u:","v"))
_c={}
def valid_bases(ch):
    if ch not in _c:
        try:_c[ch]=set(base(x) for x in pinyin(ch,heteronym=True,style=Style.TONE3)[0])
        except:_c[ch]=set()
    return _c[ch]

import json,subprocess
data=json.loads(subprocess.check_output(["node","-e",g.NODE],cwd=g.ROOT))
flags=[]
for z,py in data.items():
    parts=g.phonemes(z,py)
    if parts is None:
        flags.append(("<整列失敗>",z,py));continue
    for c,ph in parts:
        if not ph:continue
        b=base(ph); vb=valid_bases(c)
        if vb and b not in vb and (c,b) not in TW_OK:
            flags.append((c,ph,"|".join(sorted(vb)),z))
print(f"検査項目 {len(data)} / 基底不一致(要確認) {len([f for f in flags if len(f)==4])}")
for f in flags:
    if len(f)==4:print(f"  {f[0]} 読={f[1]} 妥当基底={f[2]}  ← {f[3]}")
    else:print(f"  整列失敗: {f[1]} ({f[2]})")
