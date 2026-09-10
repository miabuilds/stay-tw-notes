# -*- coding: utf-8 -*-
"""
StayTW 台灣讀音修正表 + moedict 稽核（正式版，別再放 /tmp）。
用途：新增/重生 文章・閱讀・單字・例句 的注音/語音時，逐字強制台灣(教育部)讀音，
      避免 pypinyin/生成器套到大陸異讀。search: 讀音 破音字 moedict 台灣異讀

TW_FIX: 漢字 -> (錯誤base+tone, 正確base+tone)。單一台灣讀音、非破音字上下文相關者才放這。
  只在「存的音==錯誤音」時才改（避免動到本來就對的）。破音字(得/為/重/行/長/種/應/分/差/覺/假/少/數/空/樂/難/處/還/都/中/盡/似)
  由逐句人工拼音決定，不放這裡。
"""
# (錯, 對)  ——2026-09 全站 moedict 稽核累積
TW_FIX = {
  # 大陸異讀 → 台灣讀音
  "垃": ("la1","le4"),   "圾": ("ji1","se4"),    # 垃圾 lèsè
  "息": ("xi1","xi2"),   "識": ("shi2","shi4"),  # 認識/知識 shì
  "危": ("wei1","wei2"), "悄": ("qiao1","qiao3"),
  "企": ("qi3","qi4"),   "夕": ("xi1","xi4"),
  "播": ("bo1","bo4"),   "築": ("zhu4","zhu2"),
  "髮": ("fa4","fa3"),   "突": ("tu1","tu2"),
  "惜": ("xi1","xi2"),   "寂": ("ji4","ji2"),
  "擊": ("ji1","ji2"),   "綜": ("zong1","zong4"),
  "椰": ("ye1","ye2"),   "烊": ("yang4","yang2"),
  "斂": ("lian3","lian4"),"蔭": ("yin1","yin4"),
  "跌": ("die1","die2"), "鞠": ("ju1","ju2"),
  "划": ("hua4","hua2"), "筊": ("xiao2","jiao3"),
  "擲": ("zhi4","zhi2"), "崖": ("ya2","yai2"),
  # L6 成語/進階詞
  "偽": ("wei3","wei4"), "戕": ("qiang1","qiang2"),
  "藩": ("fan1","fan2"), "縛": ("fu4","fu2"),
  "蹈": ("dao3","dao4"),
}
# 稽核誤報白名單（台灣正確、moedict 只列本調或古音）：輕聲字、一/不變調、方言/古音
AUDIT_SKIP = set('一不台臺的了個們子麼嗎吧呢啊呀喔哦嘛啦著地得麽')
AUDIT_TWOK = {('垃','le'),('圾','se'),('姊','jie'),('說','shui'),('台','tai'),
              ('誼','yi'),('呷','ga'),('蚵','he'),('磅','pang')}

def apply_fix(parts):
    """parts: [(char, 'base+tone'|None)] -> 同結構，套 TW_FIX。"""
    out=[]
    for c,ph in parts:
        if ph and c in TW_FIX and ph==TW_FIX[c][0]:
            ph=TW_FIX[c][1]
        out.append((c,ph))
    return out
