#!/usr/bin/env python3
# 全 vocab（単語＋例文）の逐字読音を萌典(教育部)の異読表と照合。base(声母韻母)不一致=要修正、声調のみ差=要確認。
import json,re,os,sys,subprocess,urllib.request,urllib.parse,importlib.util,unicodedata
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec=importlib.util.spec_from_file_location("ttsg",os.path.join(ROOT,"scripts","tts-generate-google.py"));g=importlib.util.module_from_spec(spec);spec.loader.exec_module(g)
sys.path.insert(0,os.path.join(ROOT,"scripts"));twr=importlib.import_module("tw-readings")
js=open(os.path.join(ROOT,"py2zy.js"),encoding="utf-8").read()
M=dict(re.findall(r'"([^"]+)":\s*"([^"]+)"',re.search(r'var M=\{(.*?)\};',js,re.S).group(1)))
TONE={"1":"","2":"ˊ","3":"ˇ","4":"ˋ"}
def num2zy(ph):
    b,t=ph[:-1],ph[-1]; b=b.replace("v","ü")
    zy=M.get(b)
    if not zy and b.endswith("r") and M.get(b[:-1]): zy=M[b[:-1]]+"ㄦ"
    if not zy: return None
    return ("˙"+zy) if t=="5" else zy+TONE.get(t,"")
CACHE=os.path.join(ROOT,"scripts",".moedict_cache.json")
cache=json.load(open(CACHE)) if os.path.exists(CACHE) else {}
def nz(s):return s.replace("˙","").replace(" ","").strip()
def moe(ch):
    if ch in cache:return cache[ch]
    try:
        d=json.loads(urllib.request.urlopen("https://www.moedict.tw/uni/"+urllib.parse.quote(ch),timeout=15).read())
        rs=set()
        for h in d.get("heteronyms",[]):
            for p in re.split(r"[/,、]",h.get("bopomofo","")):
                p=p.strip()
                if p:rs.add(p)
        cache[ch]=sorted(rs)
    except Exception: cache[ch]=None
    return cache[ch]
NODE=r'''const fs=require("fs");const o=[];
const files=fs.readdirSync(".").filter(f=>/^vocab.*\.js$/.test(f)).sort();
for(const f of files){const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  for(const v of a){ if(v&&v.w&&v.py)o.push([v.w,v.py,f+":w"]); if(v&&v.ex&&v.ex.z&&v.ex.py)o.push([v.ex.z,v.ex.py,f+":ex"]); }}
console.log(JSON.stringify(o));'''
rows=json.loads(subprocess.check_output(["node","-e",NODE],cwd=ROOT))
# 声調だけ違うが正しいもの（萌典の国語辞典に語として無い＝台湾語からの借用語など）
# 嬤: 萌典に「阿嬤」の項目は無く、字単独は ㄇㄚ。台湾で実際に言うのは ā-mà なので ma4 のままにする。
TONE_OK={("嬤","ma4")}
base_bad=[];tone_chk=[];n=0
for z,py,src in rows:
    parts=g.phonemes(z,py)
    if parts is None: base_bad.append(("<整列失敗>",z,py,src));continue
    parts=twr.apply_fix(parts)
    for c,ph in parts:
        if not ph or c in twr.AUDIT_SKIP:continue
        n+=1
        rs=moe(c)
        if not rs:continue
        zy=num2zy(ph)
        if not zy: base_bad.append((c,ph,"<no zy>",src));continue
        rsn=[nz(x) for x in rs]
        if nz(zy) in rsn: continue
        if (c,re.sub(r'\d$','',ph)) in twr.AUDIT_TWOK: continue
        base=re.sub(r'[ˊˇˋ˙]','',zy)
        if any(re.sub(r'[ˊˇˋ˙]','',x)==base for x in rsn):
            if ph.endswith("5"): continue   # 輕聲は自分で決めたもの
            if (c,ph) in TONE_OK: continue
            tone_chk.append((c,ph,zy,"/".join(rs),z,src))
        else:
            base_bad.append((c,ph,zy,"/".join(rs),z,src))
json.dump(cache,open(CACHE,"w"),ensure_ascii=False)
print(f"checked chars {n} in {len(rows)} lines")
print(f"\n■ base 不一致（要修）: {len(base_bad)}")
for b in base_bad: print("  ",b)
print(f"\n■ 只差聲調（確認破音字/變調）: {len(tone_chk)}")
for t in tone_chk: print("  ",t)
