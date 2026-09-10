# StayTW 文章/閱讀 build：moedict逐字驗+注音+reading-ruby+Google phoneme逐字語音。
# FIX 表見 scripts/tw-readings.py。輸入路徑(scratchpad JSON)依當次調整。search: build 文章 閱讀 讀音
import json,re,sys,os,base64,urllib.request,hashlib
sys.path.insert(0,"scripts");import importlib;g=importlib.import_module("tts-generate-google")
exec(open("/tmp/tone_audit.py").read().split("# 抽 vocab")[0])  # num2zy,M,TSUF
TM={1:{'a':'ā','e':'ē','i':'ī','o':'ō','u':'ū','ü':'ǖ'},2:{'a':'á','e':'é','i':'í','o':'ó','u':'ú','ü':'ǘ'},3:{'a':'ǎ','e':'ě','i':'ǐ','o':'ǒ','u':'ǔ','ü':'ǚ'},4:{'a':'à','e':'è','i':'ì','o':'ò','u':'ù','ü':'ǜ'}}
def num2dia(bt):
    m=re.match(r'^([a-zü]+)([1-5])$',bt)
    if not m:return bt
    b,t=m.group(1),int(m.group(2))
    if t==5:return b
    for v in ['a','o','e']:
        if v in b:return b[:b.index(v)]+TM[t][v]+b[b.index(v)+1:]
    for pat in ['iu','ui']:
        if pat in b:i=b.index(pat)+1;return b[:i]+TM[t][b[i]]+b[i+1:]
    for i,c in enumerate(b):
        if c in 'iouü':return b[:i]+TM[t][c]+b[i+1:]
    return b
KEY=os.environ.get("GOOGLE_TTS_KEY") or sys.exit("需要 GOOGLE_TTS_KEY env")
FIX={"偽":("wei3","wei4"),"戕":("qiang1","qiang2"),"識":("shi2","shi4"),"藩":("fan1","fan2"),"突":("tu1","tu2"),"擊":("ji1","ji2"),"息":("xi1","xi2"),"寂":("ji4","ji2"),"綜":("zong1","zong4"),"縛":("fu4","fu2"),"蹈":("dao3","dao4"),"髮":("fa4","fa3"),"危":("wei1","wei2"),"播":("bo1","bo4"),"樸":("pu3","pu2"),"悄":("qiao1","qiao3"),"惜":("xi1","xi2"),"隆":("long1","long2")}
cache=json.load(open("/tmp/moedict_cache.json")) if os.path.exists("/tmp/moedict_cache.json") else {}
def nz(z):return z.replace("˙","").replace(" ","").strip()
def moe(ch):
    if ch in cache:return cache[ch]
    try:
        d=json.loads(urllib.request.urlopen("https://www.moedict.tw/uni/"+urllib.parse.quote(ch),timeout=15).read())
        rs=set()
        for h in d.get("heteronyms",[]):
            for p in re.split(r"[/,、]",h.get("bopomofo","")):
                p=nz(p)
                if p:rs.add(p)
        cache[ch]=sorted(rs);return cache[ch]
    except:cache[ch]=None;return None
def bs(r):return re.sub(r'[0-9]$','',r.lower().replace("ü","v"))
TWOK={("垃","le"),("圾","se"),("姊","jie"),("說","shui"),("台","tai"),("誼","yi")}
SANDHI={"一","不"}
def fixparts(z,py):
    parts=g.phonemes(z,py)
    if parts is None:return None
    return [(c,(FIX[c][1] if ph and c in FIX and ph==FIX[c][0] else ph)) for c,ph in parts]
def audit(parts):
    bad=[]
    for c,ph in parts:
        if not ph or c in SANDHI:continue
        rs=moe(c)
        if rs is None or not rs:continue
        zy=num2zy(ph)
        if zy and nz(zy) not in set(nz(x) for x in rs) and (c,bs(ph)) not in TWOK:
            bad.append(f"{c}={ph}")
    return bad
def gesc(s):return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
def _one(pl):
    ssml="<speak>"+"".join(f"<phoneme alphabet='pinyin' ph='{gesc(ph.replace(chr(252),chr(118)))}'>{gesc(c)}</phoneme>" if ph else gesc(c) for c,ph in pl)+"</speak>"
    body=json.dumps({"input":{"ssml":ssml},"voice":{"languageCode":"cmn-TW","name":"cmn-TW-Wavenet-A"},"audioConfig":{"audioEncoding":"MP3"}}).encode()
    r=json.load(urllib.request.urlopen(urllib.request.Request("https://texttospeech.googleapis.com/v1/text:synthesize?key="+KEY,data=body,headers={"Content-Type":"application/json"}),timeout=60))
    return base64.b64decode(r["audioContent"])
def synth(z,parts):
    chunks=[];cur=[]
    for c,ph in parts:
        cur.append((c,ph))
        if c in "。！？!?":chunks.append(cur);cur=[]
    if cur:chunks.append(cur)
    def bl(pl):return len("".join(("<phoneme ph=x>"+c+"</phoneme>" if ph else c) for c,ph in pl).encode())+40
    fine=[]
    for ch in chunks:
        if bl(ch)<4600:fine.append(ch);continue
        sub=[]
        for c,ph in ch:
            sub.append((c,ph))
            if c in "、，；" and bl(sub)>2500:fine.append(sub);sub=[]
        if sub:fine.append(sub)
    audio=b"".join(_one(c) for c in fine if c)
    fn=hashlib.md5(z.encode()).hexdigest()[:12]+"g.mp3"
    open("audio/tts/"+fn,"wb").write(audio);return fn

def seg_py(parts):
    s=""
    for c,ph in parts:
        if ph:s+=(" " if s and not s.endswith(" ") else "")+num2dia(ph)
        else:s+=c
    return s.strip()

manifest=json.load(open("audio/manifest.json"))
rm=json.load(open("data/reading-ruby.json"))
allbad=[];na=0;SC="/private/tmp/claude-501/-Users-linyurou/7e58d1c9-f3da-4b13-a5ff-a3310be12ee2/scratchpad/"

def do_text(z,py,tag,ident):
    global na
    parts=fixparts(z,py)
    if parts is None:allbad.append((tag,ident,"align-fail",z[:12]));return None
    bad=audit(parts)
    if bad:allbad.append((tag,ident,bad,z[:12]));return None
    za=[];pa=[]
    for c,ph in parts:
        if ph:za.append(num2zy(ph) or "");pa.append(num2dia(ph))
        else:za.append("");pa.append("")
    rm[z]={"p":pa,"z":za}
    manifest[z]=synth(z,parts);na+=1
    return seg_py(parts)

def do_vocab(v):
    global na
    parts=fixparts(v["w"],v["py"])
    if parts is None:v["zy"]="";return
    v["py"]="".join(num2dia(ph) for c,ph in parts if ph)
    v["zy"]=" ".join(num2zy(ph) or c for c,ph in parts if ph)
    manifest[v["w"]]=synth(v["w"],parts);na+=1

# 閱讀
reads=[]
for f in ["read_l1l3.json","read_l4l6.json"]:
    p=SC+f
    if os.path.exists(p):reads+=json.load(open(p))
for r in reads:
    for ln in r.get("lines",[]):
        np=do_text(ln["z"],ln["py"],"read",r["id"])
        if np:ln["py"]=np
    for v in r.get("vocab",[]):do_vocab(v)
# 文章
arts=[]
ap=SC+"articles_new.json"
if os.path.exists(ap):arts=json.load(open(ap))
for a in arts:
    for pa in a.get("paras",[]):
        np=do_text(pa["z"],pa["py"],"art",a["id"])
        if np:pa["py"]=np
    for v in a.get("vocab",[]):do_vocab(v)

json.dump(cache,open("/tmp/moedict_cache.json","w"),ensure_ascii=False)
json.dump(manifest,open("audio/manifest.json","w"),ensure_ascii=False,indent=0)
json.dump(rm,open("data/reading-ruby.json","w"),ensure_ascii=False)
json.dump(reads,open("/tmp/reads_final.json","w"),ensure_ascii=False)
json.dump(arts,open("/tmp/arts_final.json","w"),ensure_ascii=False)
print("閱讀",len(reads),"篇 | 文章",len(arts),"篇 | 音檔",na,"| 讀音問題",len(allbad))
for b in allbad[:30]:print("  ⚠️",b)
