#!/usr/bin/env python3
"""既存データの「一」「不」の変調を、音声(TTS)と揃える。
   python3 scripts/fix-sandhi.py            報告だけ(何も書かない)
   python3 scripts/fix-sandhi.py --apply    書き込む(直前に .bak を残す)
   python3 scripts/fix-sandhi.py --list N   変更候補を N 件表示
対象: data/reading-ruby.json(逐字の p/z)、data/ex-zhuyin.json(注音トークン)
"""
import json, os, re, shutil, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import sandhi_rule as R

ROOT = R.ROOT
APPLY = "--apply" in sys.argv
LIST_N = 0
if "--list" in sys.argv:
    i = sys.argv.index("--list"); LIST_N = int(sys.argv[i+1]) if i+1 < len(sys.argv) else 20

PY_YI = {1: "yī", 2: "yì", 4: "yí"}
ZY_YI = {1: "ㄧ", 2: "ㄧˋ", 4: "ㄧˊ"}
PY_BU = {2: "bú", 4: "bù"}
ZY_BU = {2: "ㄅㄨˊ", 4: "ㄅㄨˋ"}
HAN = re.compile(r"[一-鿿]")

def next_tone(sent, i, readings, tone_fn):
    """次の漢字の声調。軽声で書かれていたら本調表で補う。"""
    j = i + 1
    while j < len(sent) and not HAN.match(sent[j]): j += 1
    if j >= len(sent): return 0
    t = tone_fn(readings[j]) if j < len(readings) else 0
    if t in (0, 5):
        t = R.base_tone(sent[j]) or 0
    return t

def fix_seq(sent, arr, is_zy):
    """arr は sent と同じ長さの読み配列。変更した [(i, 旧, 新)] を返す。"""
    tone_fn = R.tone_of_zhuyin if is_zy else R.tone_of_pinyin
    changes = []
    for i, c in enumerate(sent):
        if c not in ("一", "不") or i >= len(arr): continue
        cur = arr[i]
        if not cur: continue
        if R.tone_of_zhuyin(cur) == 5 if is_zy else cur.strip() in ("yi", "bu"):
            continue                                   # もともと軽声表記＝触らない
        if is_zy and cur.startswith("˙"): continue
        nt = next_tone(sent, i, arr, tone_fn)
        if c == "一":
            w = R.want_yi(sent, i, nt)
            if not w: continue
            new = (ZY_YI if is_zy else PY_YI)[w]
        else:
            w = R.want_bu(sent, i, nt)
            new = (ZY_BU if is_zy else PY_BU)[w]
        if new != cur:
            changes.append((i, cur, new)); arr[i] = new
    return changes

def run():
    report = []
    # ── reading-ruby.json(逐字の p と z)──
    f1 = os.path.join(ROOT, "data", "reading-ruby.json")
    R1 = json.load(open(f1, encoding="utf-8"))
    n1 = 0; samples = []
    for sent, r in R1.items():
        for key, is_zy in (("p", False), ("z", True)):
            arr = r.get(key)
            if not isinstance(arr, list) or len(arr) != len(sent): continue
            ch = fix_seq(sent, arr, is_zy)
            n1 += len(ch)
            for i, o, nw in ch[:2]:
                samples.append(f"{sent[max(0,i-5):i+3]}  {key}: {o} → {nw}")
    report.append(("reading-ruby.json", n1))

    # ── ex-zhuyin.json(空白区切りの注音。句読点は前のトークンにくっついている)──
    f2 = os.path.join(ROOT, "data", "ex-zhuyin.json")
    R2 = json.load(open(f2, encoding="utf-8"))
    n2 = 0
    for sent, zs in list(R2.items()):
        toks = zs.split(" ")
        hans = [c for c in sent if HAN.match(c)]
        if len(hans) != len(toks): continue            # 対応が崩れている文は触らない
        # トークンから末尾の句読点を外して読みだけにする
        core = [re.sub(r"[^ˇˊˋ˙ㄅ-ㄩ]+$", "", t) for t in toks]
        tail = [t[len(c):] for t, c in zip(toks, core)]
        ch = fix_seq("".join(hans), core, True)
        if ch:
            n2 += len(ch)
            R2[sent] = " ".join(c + t for c, t in zip(core, tail))
            for i, o, nw in ch[:1]:
                samples.append(f"{''.join(hans)[max(0,i-5):i+3]}  zy: {o} → {nw}")
    report.append(("ex-zhuyin.json", n2))

    total = sum(n for _, n in report)
    print("=== 変調の修正候補 ===")
    for name, n in report: print(f"  {name:<22} {n} 處")
    print(f"  {'合計':<22} {total} 處")
    if LIST_N:
        print("\n--- 例 ---")
        for s in samples[:LIST_N]: print("   ", s)
    if not APPLY:
        print("\n(報告のみ。--apply で書き込み)")
        return
    for f, data in ((f1, R1), (f2, R2)):
        shutil.copy(f, f + ".bak")
        json.dump(data, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print("\n書き込みました(.bak あり)")

if __name__ == "__main__":
    run()
