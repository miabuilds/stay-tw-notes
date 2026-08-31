// StayTW Study — 拼音→注音 変換（例文の注音表示用）。App 内の漢字から生成した音節対照表。
(function(){
  var M={"fu": "ㄈㄨ", "lin": "ㄌㄧㄣ", "dai": "ㄉㄞ", "xiang": "ㄒㄧㄤ", "nan": "ㄋㄢ", "ting": "ㄊㄧㄥ", "ku": "ㄎㄨ", "suan": "ㄙㄨㄢ", "qu": "ㄑㄩ", "te": "ㄊㄜ", "yuan": "ㄩㄢ", "qiao": "ㄑㄧㄠ", "zhi": "ㄓ", "shi": "ㄕ", "cui": "ㄘㄨㄟ", "cheng": "ㄔㄥ", "zui": "ㄗㄨㄟ", "ze": "ㄗㄜ", "yan": "ㄧㄢ", "sui": "ㄙㄨㄟ", "jin": "ㄐㄧㄣ", "zhu": "ㄓㄨ", "xi": "ㄒㄧ", "hui": "ㄏㄨㄟ", "tu": "ㄊㄨ", "li": "ㄌㄧ", "jiu": "ㄐㄧㄡ", "ji": "ㄐㄧ", "hu": "ㄏㄨ", "shou": "ㄕㄡ", "cun": "ㄘㄨㄣ", "zao": "ㄗㄠ", "ping": "ㄆㄧㄥ", "wei": "ㄨㄟ", "fan": "ㄈㄢ", "tan": "ㄊㄢ", "san": "ㄙㄢ", "bao": "ㄅㄠ", "zhou": "ㄓㄡ", "ba": "ㄅㄚ", "ban": "ㄅㄢ", "chu": "ㄔㄨ", "lang": "ㄌㄤ", "zheng": "ㄓㄥ", "zi": "ㄗ", "shu": "ㄕㄨ", "qi": "ㄑㄧ", "tong": "ㄊㄨㄥ", "ce": "ㄘㄜ", "bi": "ㄅㄧ", "ling": "ㄌㄧㄥ", "lao": "ㄌㄠ", "lü": "ㄌㄩ", "xing": "ㄒㄧㄥ", "dan": "ㄉㄢ", "sang": "ㄙㄤ", "liang": "ㄌㄧㄤ", "xie": "ㄒㄧㄝ", "dong": "ㄉㄨㄥ", "zhong": "ㄓㄨㄥ", "reng": "ㄖㄥ", "rou": "ㄖㄡ", "shua": "ㄕㄨㄚ", "tian": "ㄊㄧㄢ", "nong": "ㄋㄨㄥ", "mei": "ㄇㄟ", "lou": "ㄌㄡ", "xiao": "ㄒㄧㄠ", "shai": "ㄕㄞ", "qin": "ㄑㄧㄣ", "mai": "ㄇㄞ", "bo": "ㄅㄛ", "tuo": "ㄊㄨㄛ", "zhuang": "ㄓㄨㄤ", "ke": "ㄎㄜ", "diao": "ㄉㄧㄠ", "pan": "ㄆㄢ", "su": "ㄙㄨ", "zha": "ㄓㄚ", "ou": "ㄡ", "tuan": "ㄊㄨㄢ", "liao": "ㄌㄧㄠ", "xu": "ㄒㄩ", "ci": "ㄘ", "da": "ㄉㄚ", "yi": "ㄧ", "zhuan": "ㄓㄨㄢ", "an": "ㄢ", "qia": "ㄑㄧㄚ", "long": "ㄌㄨㄥ", "jie": "ㄐㄧㄝ", "biao": "ㄅㄧㄠ", "pin": "ㄆㄧㄣ", "que": "ㄑㄩㄝ", "zhan": "ㄓㄢ", "chi": "ㄔ", "er": "ㄦ", "yu": "ㄩ", "me": "ㄇㄜ", "di": "ㄉㄧ", "cai": "ㄘㄞ", "jian": "ㄐㄧㄢ", "ju": "ㄐㄩ", "ren": "ㄖㄣ", "yun": "ㄩㄣ", "yong": "ㄩㄥ", "hao": "ㄏㄠ", "gai": "ㄍㄞ", "ning": "ㄋㄧㄥ", "chang": "ㄔㄤ", "pa": "ㄆㄚ", "bei": "ㄅㄟ", "gan": "ㄍㄢ", "bian": "ㄅㄧㄢ", "yin": "ㄧㄣ", "chen": "ㄔㄣ", "sheng": "ㄕㄥ", "tang": "ㄊㄤ", "gong": "ㄍㄨㄥ", "xue": "ㄒㄩㄝ", "feng": "ㄈㄥ", "chuang": "ㄔㄨㄤ", "yang": "ㄧㄤ", "luo": "ㄌㄨㄛ", "liu": "ㄌㄧㄡ", "ben": "ㄅㄣ", "pei": "ㄆㄟ", "jiao": "ㄐㄧㄠ", "dian": "ㄉㄧㄢ", "mie": "ㄇㄧㄝ", "cuo": "ㄘㄨㄛ", "ti": "ㄊㄧ", "wan": "ㄨㄢ", "kan": "ㄎㄢ", "gou": "ㄍㄡ", "gu": "ㄍㄨ", "lu": "ㄌㄨ", "rong": "ㄖㄨㄥ", "han": "ㄏㄢ", "ha": "ㄏㄚ", "zan": "ㄗㄢ", "huang": "ㄏㄨㄤ", "shen": "ㄕㄣ", "hei": "ㄏㄟ", "wu": "ㄨ", "she": "ㄕㄜ", "lian": "ㄌㄧㄢ", "ceng": "ㄘㄥ", "cu": "ㄘㄨ", "zhao": "ㄓㄠ", "yue": "ㄩㄝ", "qian": "ㄑㄧㄢ", "na": "ㄋㄚ", "lai": "ㄌㄞ", "tou": "ㄊㄡ", "fen": "ㄈㄣ", "niu": "ㄋㄧㄡ", "you": "ㄧㄡ", "zhuo": "ㄓㄨㄛ", "beng": "ㄅㄥ", "rao": "ㄖㄠ", "la": "ㄌㄚ", "quan": "ㄑㄩㄢ", "gao": "ㄍㄠ", "jing": "ㄐㄧㄥ", "pu": "ㄆㄨ", "gua": "ㄍㄨㄚ", "tao": "ㄊㄠ", "lei": "ㄌㄟ", "ran": "ㄖㄢ", "shuai": "ㄕㄨㄞ", "fei": "ㄈㄟ", "ma": "ㄇㄚ", "shao": "ㄕㄠ", "shuang": "ㄕㄨㄤ", "shuo": "ㄕㄨㄛ", "zhai": "ㄓㄞ", "shui": "ㄕㄨㄟ", "nai": "ㄋㄞ", "geng": "ㄍㄥ", "ni": "ㄋㄧ", "tai": "ㄊㄞ", "deng": "ㄉㄥ", "cha": "ㄔㄚ", "gui": "ㄍㄨㄟ", "zhang": "ㄓㄤ", "fo": "ㄈㄛ", "kong": "ㄎㄨㄥ", "duo": "ㄉㄨㄛ", "xiong": "ㄒㄩㄥ", "po": "ㄆㄛ", "nü": "ㄋㄩ", "chan": "ㄔㄢ", "huai": "ㄏㄨㄞ", "a": "ㄚ", "wang": "ㄨㄤ", "qiu": "ㄑㄧㄡ", "ya": "ㄧㄚ", "he": "ㄏㄜ", "dao": "ㄉㄠ", "niao": "ㄋㄧㄠ", "nuo": "ㄋㄨㄛ", "peng": "ㄆㄥ", "pian": "ㄆㄧㄢ", "jia": "ㄐㄧㄚ", "ka": "ㄎㄚ", "hong": "ㄏㄨㄥ", "hai": "ㄏㄞ", "dang": "ㄉㄤ", "ying": "ㄧㄥ", "mo": "ㄇㄛ", "bu": "ㄅㄨ", "ye": "ㄧㄝ", "zang": "ㄗㄤ", "niang": "ㄋㄧㄤ", "gang": "ㄍㄤ", "dui": "ㄉㄨㄟ", "tiao": "ㄊㄧㄠ", "kui": "ㄎㄨㄟ", "zu": "ㄗㄨ", "xian": "ㄒㄧㄢ", "hua": "ㄏㄨㄚ", "si": "ㄙ", "pai": "ㄆㄞ", "jiang": "ㄐㄧㄤ", "ru": "ㄖㄨ", "song": "ㄙㄨㄥ", "bing": "ㄅㄧㄥ", "guai": "ㄍㄨㄞ", "shun": "ㄕㄨㄣ", "qing": "ㄑㄧㄥ", "ai": "ㄞ", "xin": "ㄒㄧㄣ", "can": "ㄘㄢ", "ao": "ㄠ", "mu": "ㄇㄨ", "du": "ㄉㄨ", "leng": "ㄌㄥ", "ding": "ㄉㄧㄥ", "piao": "ㄆㄧㄠ", "miao": "ㄇㄧㄠ", "gen": "ㄍㄣ", "yao": "ㄧㄠ", "kuai": "ㄎㄨㄞ", "pi": "ㄆㄧ", "duan": "ㄉㄨㄢ", "e": "ㄜ", "ri": "ㄖ", "bin": "ㄅㄧㄣ", "wai": "ㄨㄞ", "juan": "ㄐㄩㄢ", "zuan": "ㄗㄨㄢ", "zong": "ㄗㄨㄥ", "mi": "ㄇㄧ", "zuo": "ㄗㄨㄛ", "jun": "ㄐㄩㄣ", "kuang": "ㄎㄨㄤ", "hun": "ㄏㄨㄣ", "xiu": "ㄒㄧㄡ", "zai": "ㄗㄞ", "pang": "ㄆㄤ", "xia": "ㄒㄧㄚ", "nin": "ㄋㄧㄣ", "zhe": "ㄓㄜ", "wen": "ㄨㄣ", "lan": "ㄌㄢ", "pao": "ㄆㄠ", "dou": "ㄉㄡ", "ta": "ㄊㄚ", "wa": "ㄨㄚ", "za": "ㄗㄚ", "mao": "ㄇㄠ", "bai": "ㄅㄞ", "chong": "ㄔㄨㄥ", "nu": "ㄋㄨ", "chun": "ㄔㄨㄣ", "run": "ㄖㄨㄣ", "kuo": "ㄎㄨㄛ", "kua": "ㄎㄨㄚ", "cong": "ㄘㄨㄥ", "sha": "ㄕㄚ", "de": "ㄉㄜ", "chou": "ㄔㄡ", "zen": "ㄗㄣ", "zun": "ㄗㄨㄣ", "pen": "ㄆㄣ", "rang": "ㄖㄤ", "mian": "ㄇㄧㄢ", "zou": "ㄗㄡ", "ge": "ㄍㄜ", "die": "ㄉㄧㄝ", "huo": "ㄏㄨㄛ", "meng": "ㄇㄥ", "che": "ㄔㄜ", "rui": "ㄖㄨㄟ", "hou": "ㄏㄡ", "tui": "ㄊㄨㄟ", "guo": "ㄍㄨㄛ", "huan": "ㄏㄨㄢ", "nian": "ㄋㄧㄢ", "man": "ㄇㄢ", "fa": "ㄈㄚ", "sao": "ㄙㄠ", "qun": "ㄑㄩㄣ", "kuan": "ㄎㄨㄢ", "qie": "ㄑㄧㄝ", "kao": "ㄎㄠ", "heng": "ㄏㄥ", "xuan": "ㄒㄩㄢ", "kang": "ㄎㄤ", "sen": "ㄙㄣ", "ming": "ㄇㄧㄥ", "xun": "ㄒㄩㄣ", "shang": "ㄕㄤ", "chui": "ㄔㄨㄟ", "kun": "ㄎㄨㄣ", "nie": "ㄋㄧㄝ", "fang": "ㄈㄤ", "jue": "ㄐㄩㄝ", "en": "ㄣ", "guan": "ㄍㄨㄢ", "pou": "ㄆㄡ", "guang": "ㄍㄨㄤ", "ken": "ㄎㄣ", "sou": "ㄙㄡ", "chuan": "ㄔㄨㄢ", "qiong": "ㄑㄩㄥ", "fou": "ㄈㄡ", "kai": "ㄎㄞ", "zhen": "ㄓㄣ", "lie": "ㄌㄧㄝ", "luan": "ㄌㄨㄢ", "qiang": "ㄑㄧㄤ", "nao": "ㄋㄠ", "shan": "ㄕㄢ", "kou": "ㄎㄡ", "nen": "ㄋㄣ", "gun": "ㄍㄨㄣ", "cao": "ㄘㄠ", "re": "ㄖㄜ", "bang": "ㄅㄤ", "ga": "ㄍㄚ", "chao": "ㄔㄠ", "dun": "ㄉㄨㄣ", "ruo": "ㄖㄨㄛ", "sun": "ㄙㄨㄣ", "le": "ㄌㄜ", "bie": "ㄅㄧㄝ", "tun": "ㄊㄨㄣ", "mang": "ㄇㄤ", "o": "ㄛ", "min": "ㄇㄧㄣ", "hen": "ㄏㄣ", "lun": "ㄌㄨㄣ", "tie": "ㄊㄧㄝ", "nei": "ㄋㄟ", "se": "ㄙㄜ", "suo": "ㄙㄨㄛ", "ne": "ㄋㄜ", "mou": "ㄇㄡ", "sai": "ㄙㄞ", "zeng": "ㄗㄥ", "neng": "ㄋㄥ", "gei": "ㄍㄟ", "wo": "ㄨㄛ", "teng": "ㄊㄥ", "cang": "ㄘㄤ", "keng": "ㄎㄥ", "diu": "ㄉㄧㄡ", "zhun": "ㄓㄨㄣ", "ruan": "ㄖㄨㄢ", "sa": "ㄙㄚ", "men": "ㄇㄣ", "zhui": "ㄓㄨㄟ", "chai": "ㄔㄞ", "hang": "ㄏㄤ", "zhua": "ㄓㄨㄚ", "chuai": "ㄔㄨㄞ", "nuan": "ㄋㄨㄢ", "lüe": "ㄌㄩㄝ", "ca": "ㄘㄚ"};
  var TONE={"\u0304":1,"\u0301":2,"\u030c":3,"\u0300":4};
  function conv1(nfdCore){
    var tone=5, base="";
    for(var i=0;i<nfdCore.length;i++){ var c=nfdCore[i];
      if(TONE[c]!==undefined){ tone=TONE[c]; } else { base+=c; } }
    base=base.normalize("NFC").toLowerCase().replace(/['\u2019]/g,"");
    var zy=M[base];
    if(!zy){
      if(base.length>1 && base.charAt(base.length-1)==="r" && M[base.slice(0,-1)]) zy=M[base.slice(0,-1)]+"\u3126";
      else return null; }
    if(tone===2) return zy+"\u02ca";
    if(tone===3) return zy+"\u02c7";
    if(tone===4) return zy+"\u02cb";
    if(tone===5) return "\u02d9"+zy;
    return zy;
  }
  window.py2zy=function(py){
    if(!py) return py;
    var s=String(py).normalize("NFD");
    var toks=s.split(/(\s+)/), out=[];
    for(var i=0;i<toks.length;i++){ var t=toks[i];
      if(/^\s+$/.test(t)){ out.push(t); continue; }
      var mm=t.match(/^([^A-Za-z\u0300-\u036f]*)([A-Za-z\u0300-\u036f'\u2019]+)([^A-Za-z\u0300-\u036f]*)$/);
      if(!mm){ out.push(t.normalize("NFC")); continue; }
      var z=conv1(mm[2]);
      out.push(mm[1]+(z||mm[2].normalize("NFC"))+mm[3]);
    }
    return out.join("");
  };
})();
