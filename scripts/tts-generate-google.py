#!/usr/bin/env python3
# StayTW — 単語＋例文の TTS を Google Cloud TTS(cmn-TW-Wavenet-A, 台湾腔) で生成。
# ★旧 tts-generate.py(Azure HsiaoChen)は破音字を文脈で誤読(音樂→lè, 銀行→xíng, 得→dé…)。
#   本スクリプトは検証済みの拼音(vocab の py / ex.py)から逐字 <phoneme alphabet='pinyin'> を組み、
#   引擎に読みを推測させない＝破音字も 100% 正しい。新しい単語/例文を足したら必ずこれで再生成。
#
# 使い方: GOOGLE_TTS_KEY=xxxx python3 scripts/tts-generate-google.py [--force]
#   --force: 既存 gp.mp3 も作り直す(既定は存在すればスキップ=差分のみ)。
#
# アルゴリズム: ex.py を音節分割(詞中の母音開頭は隔音記号が無い限り不可→反感=fan+gan、
#   失敗時のみ貪欲最長→早安=zao+an)、漢字と 1:1 対応させ数を検証(音節数==漢字数)。
import json,re,os,sys,base64,hashlib,time,subprocess,urllib.request,unicodedata
from concurrent.futures import ThreadPoolExecutor
import threading

ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEY=os.environ.get("GOOGLE_TTS_KEY")   # main() で必須チェック（import 時は不要 → tts-audit.py が phonemes() を再利用可）
FORCE="--force" in sys.argv
OUT=os.path.join(ROOT,"audio","tts"); MANI=os.path.join(ROOT,"audio","manifest.json")

# 拼音 base(声調なし) → 注音符号なしの音節分割用に py2zy.js の音節表を流用。
js=open(os.path.join(ROOT,"py2zy.js"),encoding="utf-8").read()
M=set(re.findall(r'"([^"]+)":\s*"[^"]+"',re.search(r'var M=\{(.*?)\};',js,re.S).group(1)))
M.add("dei"); M.add("shei")   # 元表の漏れ
TONE={'̄':1,'́':2,'̌':3,'̀':4}; BND=set("'’-")
def to_base(w):
    b=[];t={}
    for ch in unicodedata.normalize("NFD",w):
        if ch in TONE:
            if b:t[len(b)-1]=TONE[ch]
        elif ord(ch)==0x0308:
            if b and b[-1]=='u':b[-1]='ü'
        elif ch in BND:b.append("-")
        else:b.append(ch.lower())
    return b,t
def seg(w,strict=None):
    base,ta=to_base(w);n=len(base)
    def bt(p,first,strict):
        if p>=n:return []
        if base[p]=="-":return bt(p+1,True,strict)
        end=p
        while end<n and base[end]!="-":end+=1
        for e in range(min(end,p+6),p,-1):
            cand="".join(base[p:e]);core=cand;er=False
            if cand not in M:
                if cand.endswith('r') and cand[:-1] in M:core=cand[:-1];er=True
                else:continue
            if strict and not first and cand[0] in "aeoiuü":continue
            tone=5
            for idx in range(p,e):
                if idx in ta:tone=ta[idx];break
            rest=bt(e,False,strict)
            if rest is not None:return [(core+('r' if er else ''),tone)]+rest
        return None
    if strict is None:
        r=bt(0,True,True)
        return r if r is not None else bt(0,True,False)
    return bt(0,True,strict)
def syllables(py,strict=None):
    out=[];py=unicodedata.normalize("NFD",py)
    for tok in re.split(r'\s+',py.strip()):
        if not tok:continue
        core=re.sub(r'^[^A-Za-z̀-ͯ]+|[^A-Za-z̀-ͯ]+$','',tok)
        if not core:continue
        if re.fullmatch(r'[A-Z0-9]+',unicodedata.normalize("NFC",core)):continue  # KTV/APP/N2
        s=seg(core,strict)
        if s is None:return None
        out+=s
    return out
def need_syl(c):return ('一'<=c<='鿿') or c=='〇'
# pypinyin があれば各字の基底(声母韻母)を検証し、対齊バグ(晚安→wa+nan 等)を自動補正。
try:
    from pypinyin import pinyin as _pyp, Style as _PS
    _vb={}
    def _valid_bases(c):
        if c not in _vb:
            try:_vb[c]=set(re.sub(r'[0-9]$','',x.replace("ü","v").replace("u:","v")) for x in _pyp(c,heteronym=True,style=_PS.TONE3)[0])
            except:_vb[c]=set()
        return _vb[c]
    _TW_OK={("垃","le"),("圾","se"),("姊","jie")}   # 台湾正音で pypinyin(大陸)に無い基底
    def _all_valid(z,syl):
        si=0
        for c in z:
            if need_syl(c):
                b=re.sub(r'[0-9]$','',syl[si][0].replace("ü","v"));si+=1
                vb=_valid_bases(c)
                if vb and b not in vb and (c,b) not in _TW_OK:return False
        return True
except ImportError:
    def _all_valid(z,syl):return True   # pypinyin 無ければ検証スキップ
def _pick(z,py):
    n=sum(1 for c in z if need_syl(c))
    cands=[syllables(py,True),syllables(py,None),syllables(py,False)]  # strict → 既定 → 貪欲
    ok=[s for s in cands if s is not None and len(s)==n]
    if not ok:return None
    for s in ok:                       # 各字の基底が妥当な切り方を優先
        if _all_valid(z,s):return s
    return ok[0]
def phonemes(z,py):
    syl=_pick(z,py)
    if syl is None:return None
    if len(syl)!=sum(1 for c in z if need_syl(c)):return None
    parts=[];si=0
    for c in z:
        if need_syl(c):
            base,tone=syl[si];si+=1
            parts.append((c,base+str(tone)))
        else:parts.append((c,None))
    return parts

# vocab の単語(py)＋例文(ex.py) を抽出。
NODE=r'''
const fs=require("fs");
const files=fs.readdirSync(".").filter(f=>/^vocab.*\.js$/.test(f)).sort();const o={};
for(const f of files){const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  for(const v of a){if(v&&v.w&&v.py)o[v.w]=v.py; if(v&&v.ex&&v.ex.z&&v.ex.py)o[v.ex.z]=v.ex.py;}}
console.log(JSON.stringify(o));'''
def gesc(s):return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
def ssml(parts):
    out=""
    for c,ph in parts:
        if ph:out+=f"<phoneme alphabet='pinyin' ph='{gesc(ph.replace(chr(252),'v'))}'>{gesc(c)}</phoneme>"
        else:out+=gesc(c)
    return "<speak>"+out+"</speak>"

def main():
    if not KEY: sys.exit("GOOGLE_TTS_KEY を環境変数で渡してください")
    os.makedirs(OUT,exist_ok=True)
    data=json.loads(subprocess.check_output(["node","-e",NODE],cwd=ROOT))
    manifest=json.load(open(MANI)) if os.path.exists(MANI) else {}
    todo=[]; bad=[]
    for z,py in data.items():
        parts=phonemes(z,py)
        if parts is None:bad.append(z);continue
        todo.append((z,parts))
    print(f"対象 {len(todo)} / 整列失敗 {len(bad)}",flush=True)
    if bad[:10]:print("  失敗例:",bad[:10])
    res={};fails=[];done=[0];skip=[0];lock=threading.Lock()
    def work(z,parts):
        fn=hashlib.md5(z.encode()).hexdigest()[:12]+"gp.mp3";path=os.path.join(OUT,fn)
        if not FORCE and os.path.exists(path) and os.path.getsize(path)>500:
            with lock:res[z]=fn;skip[0]+=1;return
        body=json.dumps({"input":{"ssml":ssml(parts)},"voice":{"languageCode":"cmn-TW","name":"cmn-TW-Wavenet-A"},"audioConfig":{"audioEncoding":"MP3","speakingRate":1.0}}).encode()
        for att in range(4):
            try:
                r=json.load(urllib.request.urlopen(urllib.request.Request("https://texttospeech.googleapis.com/v1/text:synthesize?key="+KEY,data=body,headers={"Content-Type":"application/json"}),timeout=40))
                if r.get("audioContent"):
                    open(path,"wb").write(base64.b64decode(r["audioContent"]))
                    with lock:res[z]=fn;done[0]+=1;return
            except Exception as e:
                time.sleep(1.5*(att+1))
                if att==3:
                    with lock:fails.append(z)
    with ThreadPoolExecutor(max_workers=6) as ex:
        for f in [ex.submit(work,z,p) for z,p in todo]:f.result()
    for z,fn in res.items():manifest[z]=fn
    json.dump(manifest,open(MANI,"w"),ensure_ascii=False,indent=0)
    print(f"=== 生成{done[0]} 略過{skip[0]} 失敗{len(fails)} manifest{len(manifest)} ===",flush=True)
    if fails[:20]:print("FAIL:",fails[:20])

if __name__=="__main__":main()
