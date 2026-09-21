#!/usr/bin/env python3
"""essentials.js を組み立てる。既存語彙/辞書から引ける読みと訳はそのまま使い(教育部で検証済)、
   足りない複合語だけ下の NEW で補う。読みは scripts/sandhi_rule.py の規則と一致させてある。"""
import json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from essentials_build import SECTIONS, load, lookup
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 手で足すぶん。py は変調を適用済み(一+4声=yí / 一+1,2,3声=yì、十一・第一などは本調)
NEW = {
 "十一": ("ㄕˊ ㄧ","shíyī","11","eleven","11"),
 "十二": ("ㄕˊ ㄦˋ","shíèr","12","twelve","12"),
 "十三": ("ㄕˊ ㄙㄢ","shísān","13","thirteen","13"),
 "十四": ("ㄕˊ ㄙˋ","shísì","14","fourteen","14"),
 "十五": ("ㄕˊ ㄨˇ","shíwǔ","15","fifteen","15"),
 "十六": ("ㄕˊ ㄌㄧㄡˋ","shíliù","16","sixteen","16"),
 "十七": ("ㄕˊ ㄑㄧ","shíqī","17","seventeen","17"),
 "十八": ("ㄕˊ ㄅㄚ","shíbā","18","eighteen","18"),
 "十九": ("ㄕˊ ㄐㄧㄡˇ","shíjiǔ","19","nineteen","19"),
 "二十": ("ㄦˋ ㄕˊ","èrshí","20","twenty","20"),
 "三十": ("ㄙㄢ ㄕˊ","sānshí","30","thirty","30"),
 "一百": ("ㄧˋ ㄅㄞˇ","yìbǎi","100","one hundred","100"),
 "一千": ("ㄧˋ ㄑㄧㄢ","yìqiān","1,000","one thousand","1,000"),
 "一萬": ("ㄧˊ ㄨㄢˋ","yíwàn","1万","ten thousand","1만"),
 "一年": ("ㄧˋ ㄋㄧㄢˊ","yìnián","1年間","one year","1년"),
 "一次": ("ㄧˊ ㄘˋ","yícì","1回","once; one time","한 번"),
 "第二": ("ㄉㄧˋ ㄦˋ","dìèr","2番目","second","두 번째"),
 "二月": ("ㄦˋ ㄩㄝˋ","èryuè","2月","February","2월"),
 "兩個": ("ㄌㄧㄤˇ ˙ㄍㄜ","liǎngge","2つ","two (of something)","두 개"),
 "兩點": ("ㄌㄧㄤˇ ㄉㄧㄢˇ","liǎngdiǎn","2時","two o'clock","두 시"),
 "兩天": ("ㄌㄧㄤˇ ㄊㄧㄢ","liǎngtiān","2日間","two days","이틀"),
 "兩年": ("ㄌㄧㄤˇ ㄋㄧㄢˊ","liǎngnián","2年間","two years","2년"),
 "一個人": ("ㄧˊ ˙ㄍㄜ ㄖㄣˊ","yígerén","一人","one person","한 사람"),
 "兩位老師": ("ㄌㄧㄤˇ ㄨㄟˋ ㄌㄠˇ ㄕ","liǎngwèilǎoshī","先生2人","two teachers","선생님 두 분"),
 "三隻狗": ("ㄙㄢ ㄓ ㄍㄡˇ","sānzhīgǒu","犬3匹","three dogs","개 세 마리"),
 "一條魚": ("ㄧˋ ㄊㄧㄠˊ ㄩˊ","yìtiáoyú","魚1匹","one fish","물고기 한 마리"),
 "一張紙": ("ㄧˋ ㄓㄤ ㄓˇ","yìzhāngzhǐ","紙1枚","one sheet of paper","종이 한 장"),
 "一本書": ("ㄧˋ ㄅㄣˇ ㄕㄨ","yìběnshū","本1冊","one book","책 한 권"),
 "一杯水": ("ㄧˋ ㄅㄟ ㄕㄨㄟˇ","yìbēishuǐ","水1杯","a glass of water","물 한 잔"),
 "一碗飯": ("ㄧˋ ㄨㄢˇ ㄈㄢˋ","yìwǎnfàn","ご飯1杯","a bowl of rice","밥 한 그릇"),
 "一件衣服": ("ㄧˊ ㄐㄧㄢˋ ㄧ ㄈㄨˊ","yíjiànyīfú","服1着","one piece of clothing","옷 한 벌"),
 "一雙鞋子": ("ㄧˋ ㄕㄨㄤ ㄒㄧㄝˊ ˙ㄗ","yìshuāngxiézi","靴1足","a pair of shoes","신발 한 켤레"),
 "一輛車": ("ㄧˊ ㄌㄧㄤˋ ㄔㄜ","yíliàngchē","車1台","one car","차 한 대"),
 "一間房間": ("ㄧˋ ㄐㄧㄢ ㄈㄤˊ ㄐㄧㄢ","yìjiānfángjiān","部屋1室","one room","방 한 칸"),
 "幾點": ("ㄐㄧˇ ㄉㄧㄢˇ","jǐdiǎn","何時","what time","몇 시"),
 "三點半": ("ㄙㄢ ㄉㄧㄢˇ ㄅㄢˋ","sāndiǎnbàn","3時半","half past three","세 시 반"),
 "星期二": ("ㄒㄧㄥ ㄑㄧˊ ㄦˋ","xīngqíèr","火曜日","Tuesday","화요일"),
 "星期三": ("ㄒㄧㄥ ㄑㄧˊ ㄙㄢ","xīngqísān","水曜日","Wednesday","수요일"),
 "星期四": ("ㄒㄧㄥ ㄑㄧˊ ㄙˋ","xīngqísì","木曜日","Thursday","목요일"),
 "星期五": ("ㄒㄧㄥ ㄑㄧˊ ㄨˇ","xīngqíwǔ","金曜日","Friday","금요일"),
 "星期六": ("ㄒㄧㄥ ㄑㄧˊ ㄌㄧㄡˋ","xīngqíliù","土曜日","Saturday","토요일"),
 "哪個": ("ㄋㄚˇ ˙ㄍㄜ","nǎge","どれ・どちら","which one","어느 것"),
 "什麼時候": ("ㄕㄣˊ ˙ㄇㄜ ㄕˊ ㄏㄡˋ","shénmeshíhòu","いつ","when","언제"),
}
# 教えどころ(その節の要点)。翻訳は i18n 側に置かず、短い日英韓だけここに持つ。
NOTE = {
 "yi": ("一", "ess_note_yi"), "two": ("二／兩", "ess_note_two"), "mw": ("量詞", "ess_note_mw"),
}

def apply_sandhi(w, zy, py):
    """このページは「実際にどう読むか」を教えるので、辞書見出しの本調ではなく変調を出す。
       規則は scripts/sandhi_rule.py と共通(サイト全体と食い違わないように)。"""
    sys.path.insert(0, os.path.join(ROOT, "scripts"))
    import sandhi_rule as R
    toks = (zy or "").split()
    hans = [c for c in w if "\u4e00" <= c <= "\u9fff"]
    if len(toks) != len(hans): return zy, py
    ZY = {1: "\u3127", 2: "\u3127\u02cb", 4: "\u3127\u02ca"}
    ZB = {2: "\u3105\u3128\u02ca", 4: "\u3105\u3128\u02cb"}
    PY = {1: "y\u012b", 2: "y\u00ec", 4: "y\u00ed"}
    PB = {2: "b\u00fa", 4: "b\u00f9"}
    changed = False
    pys = (py or "").split()
    for i, c in enumerate(hans):
        if c not in ("\u4e00", "\u4e0d") or toks[i].startswith("\u02d9"): continue
        nt = R.tone_of_zhuyin(toks[i+1]) if i + 1 < len(toks) else 0
        if nt in (0, 5) and i + 1 < len(hans): nt = R.base_tone(hans[i+1]) or 0
        if c == "\u4e00":
            k = R.want_yi(w, i, nt)
            if not k: continue
            want, wpy = ZY[k], PY[k]
        else:
            k = R.want_bu(w, i, nt); want, wpy = ZB[k], PB[k]
        if toks[i] != want:
            toks[i] = want; changed = True
            if len(pys) == len(hans): pys[i] = wpy
    if not changed: return zy, py
    return " ".join(toks), (" ".join(pys) if len(pys) == len(hans) else py)

def main():
    vocab, dic = load()
    out, missing = [], []
    for key, title, items in SECTIONS:
        arr = []
        for w in items:
            hit = lookup(w, vocab, dic)
            if hit:
                zy, py = apply_sandhi(w, hit["zy"], hit["py"])
                arr.append({"w": w, "zy": zy, "py": py,
                            "m": {k: hit["m"].get(k, "") for k in ("j","e","k")}})
            elif w in NEW:
                zy, py, j, e, k = NEW[w]
                arr.append({"w": w, "zy": zy, "py": py, "m": {"j": j, "e": e, "k": k}})
            else:
                missing.append(w)
        out.append({"k": key, "items": arr})
    if missing:
        print("!! まだ足りない:", missing); return 1
    body = json.dumps(out, ensure_ascii=False, separators=(",", ":"))
    js = ("// StayTW — 必學基礎（數字・量詞・時間・日期・稱謂・疑問詞）\n"
          "// 読みは既存語彙(教育部で検証済み)から引き、複合語は scripts/gen-essentials.py の NEW で補う。\n"
          "// 「一」の変調は scripts/sandhi_rule.py と同じ規則:4声の前 ㄧˊ／1・2・3声の前 ㄧˋ／\n"
          "// 序数・月・十一などは本調 ㄧ。節タイトルは i18n の ess_<key>。\n"
          "const ESSENTIALS = " + body + ";\n"
          "if (typeof window !== \"undefined\") window.ESSENTIALS = ESSENTIALS;\n")
    open(os.path.join(ROOT, "essentials.js"), "w", encoding="utf-8").write(js)
    n = sum(len(s["items"]) for s in out)
    print(f"essentials.js 產生完成:{len(out)} 節 / {n} 項")
    return 0

if __name__ == "__main__":
    sys.exit(main())
