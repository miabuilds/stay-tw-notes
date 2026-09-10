import json,re,os,subprocess,urllib.request,urllib.parse,sys
sys.path.insert(0,"scripts");import importlib;g=importlib.import_module("tts-generate-google")
exec(open("/tmp/tone_audit.py").read().split("# 抽 vocab")[0])  # num2zy,M
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
SKIP=set('一不台臺的了個們子麼嗎吧呢啊呀喔哦嘛啦著地得麽')
TWOK={('垃','le'),('圾','se'),('姊','jie'),('說','shui'),('台','tai'),('誼','yi'),('呷','ga'),('蚵','he'),('磅','pang')}
def bs(r):return re.sub(r'[0-9]$','',r.lower().replace('ü','v'))
prob={}
def audit_zpy(z,py,src):
    parts=g.phonemes(z,py)
    if parts is None:return
    for c,ph in parts:
        if not ph or c in SKIP:continue
        rs=moe(c)
        if rs is None or not rs:continue
        zy=num2zy(ph)
        if zy and nz(zy) not in set(nz(x) for x in rs) and (c,bs(ph)) not in TWOK:
            base=re.sub(r'[ˊˇˋ˙]','',zy)
            if any(re.sub(r'[ˊˇˋ˙]','',x)==base for x in rs):pass  # 只聲調差(可能變調/輕聲)
            k=c+'='+ph;prob.setdefault(k,[0,set()]);prob[k][0]+=1;prob[k][1].add(src)
# vocab: w+py (headword)
NODE=r'''const fs=require("fs");const files=fs.readdirSync(".").filter(f=>/^vocab.*\.js$/.test(f)).sort();const o=[];
for(const f of files){const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  for(const v of a){if(v&&v.w&&v.py)o.push([v.w,v.py,"vocab-w"]);}}
console.log(JSON.stringify(o));'''
for z,py,src in json.loads(subprocess.check_output(["node","-e",NODE])):
    audit_zpy(z,py,src)
# phrases: items z+py
NODE2=r'''const fs=require("fs");const files=fs.readdirSync(".").filter(f=>/^phrases.*\.js$/.test(f)).sort();const o=[];
for(const f of files){const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(PHRASES_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  for(const cat of a){for(const it of (cat.items||[])){if(it.z&&it.py)o.push([it.z,it.py,"phrase"]);}}}
console.log(JSON.stringify(o));'''
for z,py,src in json.loads(subprocess.check_output(["node","-e",NODE2])):
    audit_zpy(z,py,src)
# grammar eg
NODE3=r'''const fs=require("fs");const files=fs.readdirSync(".").filter(f=>/^grammar.*\.js$/.test(f)).sort();const o=[];
for(const f of files){const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(GRAMMAR_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  for(const it of a){for(const e of (it.eg||[])){if(e.z&&e.py)o.push([e.z.replace(/<\/?em>/g,""),e.py,"grammar"]);}}}
console.log(JSON.stringify(o));'''
for z,py,src in json.loads(subprocess.check_output(["node","-e",NODE3])):
    audit_zpy(z,py,src)
json.dump(cache,open("/tmp/moedict_cache.json","w"),ensure_ascii=False)
items=sorted(prob.items(),key=lambda x:-x[1][0])
print("疑似錯讀:",len(items),"種")
for k,(n,srcs) in items:
    c=k[0]
    print(f"  {k}  x{n}  {sorted(srcs)}  moedict={moe(c)}")
