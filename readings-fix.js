// 台灣讀音の修正記録（/readings）。教育部《重編國語辭典修訂本》＝萌典 API で 1 字ずつ確認したもの。
// bad = ほかの教材でよく見る読み（大陸の読み）／good = 台湾（教育部）の読み。
// 生成元: scripts/audit-vocab-moedict.py の指摘 → scripts/tw-readings.py の TW_FIX。手で足さないこと。
const READ_FIX = [
{
"c": "垃",
"bad": "ㄌㄚ",
"good": "ㄌㄜˋ",
"badPy": "la1",
"goodPy": "le4",
"ex": "垃圾",
"exZy": "ㄌㄜˋ ㄙㄜˋ",
"exJ": "ゴミ（台湾では lèsè と読む）",
"exE": "garbage (read lèsè in Taiwan)"
},
{
"c": "圾",
"bad": "ㄐㄧ",
"good": "ㄙㄜˋ",
"badPy": "ji1",
"goodPy": "se4",
"ex": "垃圾",
"exZy": "ㄌㄜˋ ㄙㄜˋ",
"exJ": "ゴミ（台湾では lèsè と読む）",
"exE": "garbage (read lèsè in Taiwan)"
},
{
"c": "息",
"bad": "ㄒㄧ",
"good": "ㄒㄧˊ",
"badPy": "xi1",
"goodPy": "xi2",
"ex": "休息",
"exZy": "ㄒㄧㄡ ㄒㄧˊ",
"exJ": "休む・休憩する",
"exE": "to rest"
},
{
"c": "識",
"bad": "ㄕˊ",
"good": "ㄕˋ",
"badPy": "shi2",
"goodPy": "shi4",
"ex": "認識",
"exZy": "ㄖㄣˋ ㄕˋ",
"exJ": "知り合う・見知っている",
"exE": "to know (a person); to meet"
},
{
"c": "危",
"bad": "ㄨㄟ",
"good": "ㄨㄟˊ",
"badPy": "wei1",
"goodPy": "wei2",
"ex": "危險",
"exZy": "ㄨㄟˊ ㄒㄧㄢˇ",
"exJ": "危ない",
"exE": "dangerous"
},
{
"c": "悄",
"bad": "ㄑㄧㄠ",
"good": "ㄑㄧㄠˇ",
"badPy": "qiao1",
"goodPy": "qiao3"
},
{
"c": "企",
"bad": "ㄑㄧˇ",
"good": "ㄑㄧˋ",
"badPy": "qi3",
"goodPy": "qi4",
"ex": "企劃",
"exZy": "ㄑㄧˋ ㄏㄨㄚˋ",
"exJ": "企画",
"exE": "planning; proposal"
},
{
"c": "夕",
"bad": "ㄒㄧ",
"good": "ㄒㄧˋ",
"badPy": "xi1",
"goodPy": "xi4"
},
{
"c": "播",
"bad": "ㄅㄛ",
"good": "ㄅㄛˋ",
"badPy": "bo1",
"goodPy": "bo4",
"ex": "直播",
"exZy": "ㄓˊ ㄅㄛˋ",
"exJ": "ライブ配信",
"exE": "live streaming"
},
{
"c": "築",
"bad": "ㄓㄨˋ",
"good": "ㄓㄨˊ",
"badPy": "zhu4",
"goodPy": "zhu2"
},
{
"c": "髮",
"bad": "ㄈㄚˋ",
"good": "ㄈㄚˇ",
"badPy": "fa4",
"goodPy": "fa3",
"ex": "頭髮",
"exZy": "ㄊㄡˊ ㄈㄚˇ",
"exJ": "髪の毛",
"exE": "hair"
},
{
"c": "突",
"bad": "ㄊㄨ",
"good": "ㄊㄨˊ",
"badPy": "tu1",
"goodPy": "tu2",
"ex": "突然",
"exZy": "ㄊㄨˊ ㄖㄢˊ",
"exJ": "突然",
"exE": "suddenly"
},
{
"c": "惜",
"bad": "ㄒㄧ",
"good": "ㄒㄧˊ",
"badPy": "xi1",
"goodPy": "xi2",
"ex": "珍惜",
"exZy": "ㄓㄣ ㄒㄧˊ",
"exJ": "大切にする",
"exE": "to cherish; to treasure"
},
{
"c": "寂",
"bad": "ㄐㄧˋ",
"good": "ㄐㄧˊ",
"badPy": "ji4",
"goodPy": "ji2",
"ex": "寂寞",
"exZy": "ㄐㄧˊ ㄇㄛˋ",
"exJ": "寂しい",
"exE": "lonely"
},
{
"c": "擊",
"bad": "ㄐㄧ",
"good": "ㄐㄧˊ",
"badPy": "ji1",
"goodPy": "ji2",
"ex": "抨擊",
"exZy": "ㄆㄥ ㄐㄧˊ",
"exJ": "激しく非難する",
"exE": "to attack (verbally); to lash out at"
},
{
"c": "綜",
"bad": "ㄗㄨㄥ",
"good": "ㄗㄨㄥˋ",
"badPy": "zong1",
"goodPy": "zong4",
"ex": "錯綜複雜",
"exZy": "ㄘㄨㄛˋ ㄗㄨㄥˋ ㄈㄨˋ ㄗㄚˊ",
"exJ": "複雑に入り組んでいる",
"exE": "intricate and complex"
},
{
"c": "椰",
"bad": "ㄧㄝ",
"good": "ㄧㄝˊ",
"badPy": "ye1",
"goodPy": "ye2"
},
{
"c": "烊",
"bad": "ㄧㄤˋ",
"good": "ㄧㄤˊ",
"badPy": "yang4",
"goodPy": "yang2"
},
{
"c": "斂",
"bad": "ㄌㄧㄢˇ",
"good": "ㄌㄧㄢˋ",
"badPy": "lian3",
"goodPy": "lian4"
},
{
"c": "蔭",
"bad": "ㄧㄣ",
"good": "ㄧㄣˋ",
"badPy": "yin1",
"goodPy": "yin4"
},
{
"c": "跌",
"bad": "ㄉㄧㄝ",
"good": "ㄉㄧㄝˊ",
"badPy": "die1",
"goodPy": "die2"
},
{
"c": "鞠",
"bad": "ㄐㄩ",
"good": "ㄐㄩˊ",
"badPy": "ju1",
"goodPy": "ju2"
},
{
"c": "划",
"bad": "ㄏㄨㄚˋ",
"good": "ㄏㄨㄚˊ",
"badPy": "hua4",
"goodPy": "hua2"
},
{
"c": "筊",
"bad": "ㄒㄧㄠˊ",
"good": "ㄐㄧㄠˇ",
"badPy": "xiao2",
"goodPy": "jiao3"
},
{
"c": "擲",
"bad": "ㄓˋ",
"good": "ㄓˊ",
"badPy": "zhi4",
"goodPy": "zhi2"
},
{
"c": "崖",
"bad": "ㄧㄚˊ",
"good": "ㄧㄞˊ",
"badPy": "ya2",
"goodPy": "yai2"
},
{
"c": "偽",
"bad": "ㄨㄟˇ",
"good": "ㄨㄟˋ",
"badPy": "wei3",
"goodPy": "wei4"
},
{
"c": "戕",
"bad": "ㄑㄧㄤ",
"good": "ㄑㄧㄤˊ",
"badPy": "qiang1",
"goodPy": "qiang2"
},
{
"c": "藩",
"bad": "ㄈㄢ",
"good": "ㄈㄢˊ",
"badPy": "fan1",
"goodPy": "fan2",
"ex": "藩籬",
"exZy": "ㄈㄢˊ ㄌㄧˊ",
"exJ": "垣根；障壁",
"exE": "barrier; fence"
},
{
"c": "縛",
"bad": "ㄈㄨˋ",
"good": "ㄈㄨˊ",
"badPy": "fu4",
"goodPy": "fu2",
"ex": "束縛",
"exZy": "ㄕㄨˋ ㄈㄨˊ",
"exJ": "束縛・しがらみ",
"exE": "constraint; bondage"
},
{
"c": "蹈",
"bad": "ㄉㄠˇ",
"good": "ㄉㄠˋ",
"badPy": "dao3",
"goodPy": "dao4",
"ex": "循規蹈矩",
"exZy": "ㄒㄩㄣˊ ㄍㄨㄟ ㄉㄠˋ ㄐㄩˇ",
"exJ": "規則を守る・きちんとしている",
"exE": "to toe the line; abide by rules"
},
{
"c": "績",
"bad": "ㄐㄧˋ",
"good": "ㄐㄧ",
"badPy": "ji4",
"goodPy": "ji1",
"ex": "成績",
"exZy": "ㄔㄥˊ ㄐㄧ",
"exJ": "成績",
"exE": "grades; results"
},
{
"c": "跡",
"bad": "ㄐㄧˋ",
"good": "ㄐㄧ",
"badPy": "ji4",
"goodPy": "ji1"
}
];
// 破音字（詞によって読みが変わるので、字だけでは決まらないもの）
const READ_CTX = [
 {w:"西門町", zy:"ㄒㄧ ㄇㄣˊ ㄉㄧㄥ", bad:"ㄉㄧㄥˇ", note:"ctxTing"},
 {w:"盡快",   zy:"ㄐㄧㄣˋ ㄎㄨㄞˋ", bad:"ㄐㄧㄣˇ", note:"ctxJin"}
];
if (typeof window !== "undefined") { window.READ_FIX = READ_FIX; window.READ_CTX = READ_CTX; }
if (typeof module !== "undefined") module.exports = { READ_FIX, READ_CTX };
