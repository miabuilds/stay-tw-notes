#!/usr/bin/env python3
"""必學基礎(数字・量詞・時間・日付・呼称・疑問詞)のデータを組み立てる。
   読みと訳は既存の語彙/辞書から引ける分はそのまま使う(教育部で検証済みのため)。
   引けないものだけ手で埋める(FALLBACK)。--report で不足を出す。
"""
import json, os, re, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECTIONS = [
 ("num", "數字", ["零","一","二","三","四","五","六","七","八","九","十",
                  "十一","十二","十三","十四","十五","十六","十七","十八","十九",
                  "二十","三十","一百","一千","一萬"]),
 ("yi",  "一的變調", ["第一","一月","星期一","一天","一年","一起","一個","一次","一樣","一半"]),
 ("two", "二和兩", ["二十","第二","二月","兩","兩個","兩點","兩天","兩年"]),
 ("mw",  "量詞", ["一個人","兩位老師","三隻狗","一條魚","一張紙","一本書","一杯水","一碗飯",
                  "一件衣服","一雙鞋子","一輛車","一間房間"]),
 ("time","時間", ["現在","幾點","兩點","三點半","十分","早上","中午","下午","晚上"]),
 ("date","日期", ["今天","明天","昨天","年","月","號","星期二","星期三","星期四","星期五",
                  "星期六","星期日","週末"]),
 ("fam", "家庭稱謂", ["爸爸","媽媽","哥哥","姊姊","弟弟","妹妹","爺爺","奶奶","外公","外婆","叔叔","阿姨"]),
 ("ask", "疑問詞", ["什麼","哪裡","誰","怎麼","為什麼","幾","多少","哪個","什麼時候"]),
]

NODE = r'''const fs=require("fs");const o={};
for(const f of fs.readdirSync(".").filter(f=>/^vocab.*\.js$/.test(f)).sort()){
  const t=fs.readFileSync(f,"utf8");const m=t.match(/const\s+(VOCAB_[A-Z0-9_]+)\s*=/);if(!m)continue;
  const a=new Function("module","window",t+";return "+m[1]+";")({},{});
  for(const v of a) if(v&&v.w&&!o[v.w]) o[v.w]={zy:v.zy,py:v.py,m:v.m};
}
console.log(JSON.stringify(o));'''

def load():
    vocab = json.loads(subprocess.check_output(["node","-e",NODE], cwd=ROOT))
    dic = json.load(open(os.path.join(ROOT,"data","dict-ext.json"), encoding="utf-8"))
    return vocab, dic

def lookup(w, vocab, dic):
    if w in vocab:
        v = vocab[w]
        return {"zy": v["zy"], "py": v["py"], "m": v.get("m") or {}, "src": "vocab"}
    if w in dic:
        d = dic[w]
        return {"zy": d.get("zy",""), "py": d.get("py",""),
                "m": {k: d.get(k,"") for k in ("j","e","k")}, "src": "dict"}
    return None

if __name__ == "__main__":
    vocab, dic = load()
    miss = []
    for key, title, items in SECTIONS:
        got = 0
        for w in items:
            if lookup(w, vocab, dic): got += 1
            else: miss.append((key, w))
        print(f"{title:<8} {got}/{len(items)}")
    print(f"\n缺 {len(miss)} 項:")
    for k, w in miss: print(f"   [{k}] {w}")
