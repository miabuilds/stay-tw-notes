#!/usr/bin/env python3
# 「一」「不」の声調チェック。
# 音声エンジン(Google)は 一/不 の変調を自前で処理し、こちらが指定した phoneme を無視する。
# ＝ 機械的な変調ルールと、人が検証した拼音が食い違うところは、音声が必ず間違っている。
#   一: 次が4声→yi2 / 次が1,2,3声→yi4 / 語末・単独→yi1
#   不: 次が4声→bu2 / それ以外→bu4
import json,os,sys,subprocess,importlib.util
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec=importlib.util.spec_from_file_location("g",os.path.join(ROOT,"scripts","tts-generate-google.py"))
g=importlib.util.module_from_spec(spec); spec.loader.exec_module(g)

NODE=r'''const fs=require("fs");const o=[];
const files=fs.readdirSync(".").filter(f=>/^vocab.*\.js$/.test(f)).sort();
for(const f of files){const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  for(const v of a){ if(v&&v.w&&v.py)o.push([v.w,v.py,f+":w"]); if(v&&v.ex&&v.ex.z&&v.ex.py)o.push([v.ex.z,v.ex.py,f+":ex"]); }}
console.log(JSON.stringify(o));'''

try:
    from pypinyin import pinyin as _pyp, Style as _PS
    _bt={}
    def base_tone(c):
        """その字の本調（軽声表記に隠れた元の声調）。pypinyin の第一候補。"""
        if c not in _bt:
            try:
                r=_pyp(c,style=_PS.TONE3)[0][0]
                _bt[c]=int(r[-1]) if r and r[-1].isdigit() else None
            except Exception: _bt[c]=None
        return _bt[c]
except ImportError:
    def base_tone(c): return None

def engine_tone(ch, nxt_tone):
    """エンジンが機械的に当てる声調"""
    if ch=="一":
        if nxt_tone is None: return "yi1"
        if nxt_tone==4: return "yi2"
        if nxt_tone in (1,2,3): return "yi4"
        return "yi1"          # 軽声の前は揺れる
    if ch=="不":
        if nxt_tone==4: return "bu2"
        return "bu4"
    return None

rows=json.loads(subprocess.check_output(["node","-e",NODE],cwd=ROOT))
bad=[]; handled=[]; total=0
for z,py,src in rows:
    parts=g.phonemes(z,py)
    if parts is None: continue
    parts=g._tw_fix(parts)
    ph=[(c,p) for c,p in parts]
    for i,(c,p) in enumerate(ph):
        if c not in ("一","不") or not p: continue
        total+=1
        nxt=None
        for c2,p2 in ph[i+1:]:
            if p2:
                nxt=int(p2[-1])
                if nxt==5: nxt=base_tone(c2) or 5   # 軽声表記でも変調は「本調」で決まる（一個=yí ge）
                break
            if c2.strip()=="" : continue
            break                       # 句読点＝ポーズ→語末扱い
        eng=engine_tone(c,nxt if nxt!=5 else None)
        if eng and eng!=p:
            # 同音字に差し替えられる（＝生成時に直る）ものは問題なし
            if (c,p) in getattr(g,"SANDHI_SUB",{}): handled.append((c,p,eng,z,src)); continue
            bad.append((c,p,eng,z,src))
print(f"一/不 の総数 {total}")
print(f"\n✅ 同音字への差し替えで解決済み: {len(handled)} 箇所")
print(f"\n■ 手当てが無く、音声が間違う可能性: {len(bad)}")
seen={}
for c,ours,eng,z,src in bad:
    seen.setdefault((c,ours,eng),[]).append((z,src))
for (c,ours,eng),lst in sorted(seen.items(),key=lambda x:-len(x[1])):
    print(f"\n  「{c}」 正: {ours} / エンジン: {eng}   {len(lst)} 箇所")
    for z,src in lst[:6]: print(f"      {z[:34]}  ({src})")
    if len(lst)>6: print(f"      …ほか {len(lst)-6} 件")
