// StayTW — 注音符號（ㄅㄆㄇ）データ
// z=注音, py=対応ローマ字(拼音), rep=代表字, ph=呼読音の拼音+声調(SAPI, 一声=平音に統一)
// 音声は「符号 z」をキーに事前生成（scripts/tts-generate.py が <phoneme> で ph の音を rep に当てて合成。
// ph が無効なら Azure は rep をそのまま読むのでフォールバック安全）。
// グループ：声母(21)・介音(3)・韻母(13) = 37 符号
const ZHUYIN = [
  // ── 声母（初声・子音）21 ──
  { z:"ㄅ", py:"b",  rep:"玻", ph:"bo1",  g:"initial" },
  { z:"ㄆ", py:"p",  rep:"坡", ph:"po1",  g:"initial" },
  { z:"ㄇ", py:"m",  rep:"摸", ph:"mo1",  g:"initial" },
  { z:"ㄈ", py:"f",  rep:"佛", ph:"fo1",  g:"initial" },
  { z:"ㄉ", py:"d",  rep:"得", ph:"de1",  g:"initial" },
  { z:"ㄊ", py:"t",  rep:"特", ph:"te1",  g:"initial" },
  { z:"ㄋ", py:"n",  rep:"訥", ph:"ne1",  g:"initial" },
  { z:"ㄌ", py:"l",  rep:"勒", ph:"le1",  g:"initial" },
  { z:"ㄍ", py:"g",  rep:"哥", ph:"ge1",  g:"initial" },
  { z:"ㄎ", py:"k",  rep:"科", ph:"ke1",  g:"initial" },
  { z:"ㄏ", py:"h",  rep:"喝", ph:"he1",  g:"initial" },
  { z:"ㄐ", py:"j",  rep:"基", ph:"ji1",  g:"initial" },
  { z:"ㄑ", py:"q",  rep:"欺", ph:"qi1",  g:"initial" },
  { z:"ㄒ", py:"x",  rep:"希", ph:"xi1",  g:"initial" },
  { z:"ㄓ", py:"zh", rep:"知", ph:"zhi1", g:"initial" },
  { z:"ㄔ", py:"ch", rep:"吃", ph:"chi1", g:"initial" },
  { z:"ㄕ", py:"sh", rep:"詩", ph:"shi1", g:"initial" },
  { z:"ㄖ", py:"r",  rep:"日", ph:"ri1",  g:"initial" },
  { z:"ㄗ", py:"z",  rep:"資", ph:"zi1",  g:"initial" },
  { z:"ㄘ", py:"c",  rep:"疵", ph:"ci1",  g:"initial" },
  { z:"ㄙ", py:"s",  rep:"思", ph:"si1",  g:"initial" },
  // ── 介音（メディアル）3 ──
  { z:"ㄧ", py:"i / yi", rep:"衣", ph:"yi1", g:"medial" },
  { z:"ㄨ", py:"u / wu", rep:"烏", ph:"wu1", g:"medial" },
  { z:"ㄩ", py:"ü / yu", rep:"迂", ph:"yu1", g:"medial" },
  // ── 韻母（母音・韻）13 ──
  { z:"ㄚ", py:"a",   rep:"啊", ph:"a1",   g:"final" },
  { z:"ㄛ", py:"o",   rep:"喔", ph:"o1",   g:"final" },
  { z:"ㄜ", py:"e",   rep:"婀", ph:"e1",   g:"final" },
  { z:"ㄝ", py:"ê",   rep:"耶", ph:"ye1",  g:"final" },
  { z:"ㄞ", py:"ai",  rep:"哀", ph:"ai1",  g:"final" },
  { z:"ㄟ", py:"ei",  rep:"欸", ph:"ei1",  g:"final" },
  { z:"ㄠ", py:"ao",  rep:"凹", ph:"ao1",  g:"final" },
  { z:"ㄡ", py:"ou",  rep:"歐", ph:"ou1",  g:"final" },
  { z:"ㄢ", py:"an",  rep:"安", ph:"an1",  g:"final" },
  { z:"ㄣ", py:"en",  rep:"恩", ph:"en1",  g:"final" },
  { z:"ㄤ", py:"ang", rep:"骯", ph:"ang1", g:"final" },
  { z:"ㄥ", py:"eng", rep:"鞥", ph:"eng1", g:"final" },
  { z:"ㄦ", py:"er",  rep:"兒", ph:"er2",  g:"final" },
];
if (typeof module !== "undefined") module.exports = { ZHUYIN };
