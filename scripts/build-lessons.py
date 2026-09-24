#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# 単語ファイルの「// ── テーマ ──」コメントを拾って、闖関の単元＋小課に組み直す。
#
#   python3 scripts/build-lessons.py > data/lessons-l1.json
#
# なぜ:今の闖関は「単語カードを使う/クイズを使う」という“道具”の 5 関で、
# 進度が 0/441 と出る。分母が大きすぎて、10 語やっても進んだ気がしない。
# テーマ(人・家族・食べ物…)で単元に割り、1 課 8 語にすると 0/8 になる。
import io, re, json, sys, collections

FILES = ["vocab-l1.js", "vocab-l1-b.js"]
PER_LESSON = 8

# 生のテーマ名 → 単元。近いものはまとめる(1 語だけの「食器」みたいなのを単独の課にしない)
UNITS = [
 ("self",   ["人・呼び方", "職業・身分", "あいさつ・決まり文句"],
  {"ja":"自分と相手", "en":"You and me", "ko":"나와 상대", "vi":"Tôi và bạn", "id":"Aku dan kamu"}),
 ("family", ["家族", "人・家族"],
  {"ja":"家族", "en":"Family", "ko":"가족", "vi":"Gia đình", "id":"Keluarga"}),
 ("number", ["数・お金", "数字・量詞", "量詞"],
  {"ja":"数と量詞", "en":"Numbers & counters", "ko":"숫자와 단위", "vi":"Số và lượng từ", "id":"Angka & kata bantu"}),
 ("time",   ["時間", "曜日・日付", "位置・時間", "季節", "時間・季節"],
  {"ja":"時間と曜日", "en":"Time & days", "ko":"시간과 요일", "vi":"Thời gian & ngày", "id":"Waktu & hari"}),
 ("place",  ["場所・地名", "場所", "交通", "乗り物", "方向・位置"],
  {"ja":"場所と移動", "en":"Places & getting around", "ko":"장소와 이동", "vi":"Nơi chốn & đi lại", "id":"Tempat & perjalanan"}),
 ("food",   ["食べ物・飲み物", "食べ物", "飲み物", "食べ物・調味料", "食器"],
  {"ja":"食べる・飲む", "en":"Eating & drinking", "ko":"먹고 마시기", "vi":"Ăn và uống", "id":"Makan & minum"}),
 ("things", ["日常の物", "日用品"],
  {"ja":"身のまわりの物", "en":"Everyday things", "ko":"일상 물건", "vi":"Đồ dùng hằng ngày", "id":"Barang sehari-hari"}),
 ("body",   ["体", "色", "動物", "自然", "天気"],
  {"ja":"体・色・自然", "en":"Body, colours, nature", "ko":"몸·색·자연", "vi":"Cơ thể, màu sắc, thiên nhiên", "id":"Tubuh, warna, alam"}),
 ("verb",   ["動詞", "基本動詞", "動作", "生活動詞・娯楽"],
  {"ja":"よく使う動作", "en":"Everyday actions", "ko":"자주 쓰는 동작", "vi":"Hành động thường ngày", "id":"Tindakan sehari-hari"}),
 ("adj",    ["形容詞", "基本形容詞", "状態・形容"],
  {"ja":"様子をいう", "en":"Describing things", "ko":"상태 말하기", "vi":"Miêu tả", "id":"Menggambarkan"}),
 ("ask",    ["疑問詞・指示詞", "その他"],
  {"ja":"質問する", "en":"Asking questions", "ko":"질문하기", "vi":"Đặt câu hỏi", "id":"Bertanya"}),
]

def read(f):
    cur, out = None, []
    for l in io.open(f, encoding="utf8"):
        m = re.match(r'//\s*──\s*(.+?)\s*──', l)
        if m:
            cur = re.sub(r'[（(].*?[)）]', '', m.group(1)).strip(); continue
        m = re.match(r'\{w:"([^"]+)"', l)
        if m and cur: out.append((cur, m.group(1)))
    return out

pairs = []
for f in FILES: pairs += read(f)
by_theme = collections.OrderedDict()
for th, w in pairs: by_theme.setdefault(th, []).append(w)

used, units = set(), []
for uid, themes, name in UNITS:
    ws = []
    for t in themes:
        for w in by_theme.get(t, []):
            if w in used: continue
            used.add(w); ws.append(w)
    if not ws: continue
    lessons = [ws[i:i+PER_LESSON] for i in range(0, len(ws), PER_LESSON)]
    # 最後が 3 語以下なら前の課にくっつける(2 語だけの課は達成感が無い)
    if len(lessons) >= 2 and len(lessons[-1]) <= 3:
        tail = lessons.pop(); lessons[-1] = lessons[-1] + tail
    units.append({"id": uid, "name": name, "lessons": lessons})

left = [w for th, w in pairs if w not in used]
sys.stderr.write("単元 %d / 課 %d / 語 %d(未分類 %d)\n"
                 % (len(units), sum(len(u["lessons"]) for u in units), len(used), len(left)))
if left: sys.stderr.write("  未分類: " + " ".join(left[:20]) + "\n")
print(json.dumps({"level": "l1", "per": PER_LESSON, "units": units}, ensure_ascii=False, indent=1))
