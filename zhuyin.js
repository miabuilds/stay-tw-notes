// StayTW — 注音符號（ㄅㄆㄇ）データ
// z=注音, py=対応ローマ字(拼音), rep=呼読音の代表字(TTS 音声はこの字を読み上げる)
// グループ：声母(21)・介音(3)・韻母(13) = 37 符号
const ZHUYIN = [
  // ── 声母（初声・子音）21 ──
  { z:"ㄅ", py:"b",  rep:"玻", g:"initial" },
  { z:"ㄆ", py:"p",  rep:"坡", g:"initial" },
  { z:"ㄇ", py:"m",  rep:"摸", g:"initial" },
  { z:"ㄈ", py:"f",  rep:"佛", g:"initial" },
  { z:"ㄉ", py:"d",  rep:"得", g:"initial" },
  { z:"ㄊ", py:"t",  rep:"特", g:"initial" },
  { z:"ㄋ", py:"n",  rep:"訥", g:"initial" },
  { z:"ㄌ", py:"l",  rep:"勒", g:"initial" },
  { z:"ㄍ", py:"g",  rep:"哥", g:"initial" },
  { z:"ㄎ", py:"k",  rep:"科", g:"initial" },
  { z:"ㄏ", py:"h",  rep:"喝", g:"initial" },
  { z:"ㄐ", py:"j",  rep:"基", g:"initial" },
  { z:"ㄑ", py:"q",  rep:"欺", g:"initial" },
  { z:"ㄒ", py:"x",  rep:"希", g:"initial" },
  { z:"ㄓ", py:"zh", rep:"知", g:"initial" },
  { z:"ㄔ", py:"ch", rep:"吃", g:"initial" },
  { z:"ㄕ", py:"sh", rep:"詩", g:"initial" },
  { z:"ㄖ", py:"r",  rep:"日", g:"initial" },
  { z:"ㄗ", py:"z",  rep:"資", g:"initial" },
  { z:"ㄘ", py:"c",  rep:"疵", g:"initial" },
  { z:"ㄙ", py:"s",  rep:"思", g:"initial" },
  // ── 介音（メディアル）3 ──
  { z:"ㄧ", py:"i / yi", rep:"衣", g:"medial" },
  { z:"ㄨ", py:"u / wu", rep:"烏", g:"medial" },
  { z:"ㄩ", py:"ü / yu", rep:"迂", g:"medial" },
  // ── 韻母（母音・韻）13 ──
  { z:"ㄚ", py:"a",   rep:"啊", g:"final" },
  { z:"ㄛ", py:"o",   rep:"喔", g:"final" },
  { z:"ㄜ", py:"e",   rep:"鵝", g:"final" },
  { z:"ㄝ", py:"ê",   rep:"耶", g:"final" },
  { z:"ㄞ", py:"ai",  rep:"哀", g:"final" },
  { z:"ㄟ", py:"ei",  rep:"欸", g:"final" },
  { z:"ㄠ", py:"ao",  rep:"熬", g:"final" },
  { z:"ㄡ", py:"ou",  rep:"歐", g:"final" },
  { z:"ㄢ", py:"an",  rep:"安", g:"final" },
  { z:"ㄣ", py:"en",  rep:"恩", g:"final" },
  { z:"ㄤ", py:"ang", rep:"昂", g:"final" },
  { z:"ㄥ", py:"eng", rep:"鞥", g:"final" },
  { z:"ㄦ", py:"er",  rep:"兒", g:"final" },
];
if (typeof module !== "undefined") module.exports = { ZHUYIN };
