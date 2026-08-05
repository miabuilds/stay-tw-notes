// StayTW Study — 分級閲讀 L5（最上級・TOCFL advanced／繁体字＋注音＋拼音）
// 形式: level, title{j,e,k}, lines[{z,zy,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], q{ask{j,e,k},opts[{j,e,k}],ans,why{j,e,k}}
// 音声は各 line.z を TTS で読み上げ（事前生成 mp3 があれば高音質、無ければ端末音声）。
const READING_L5 = [
{
  id:"taiwan-food-culture", level:"l5",
  title:{ j:"舌先で味わう台湾", e:"Taiwan on the Tip of the Tongue", k:"혀끝으로 맛보는 대만" },
  lines:[
    { z:"對許多人而言，認識一座城市最快的方式，並不是翻閱旅遊指南，而是走進它的市場與街角。", py:"Duì xǔduō rén ér yán, rènshì yí zuò chéngshì zuì kuài de fāngshì, bìng bú shì fānyuè lǚyóu zhǐnán, ér shì zǒujìn tā de shìchǎng yǔ jiējiǎo.", m:{ j:"多くの人にとって、ある街を知る一番の近道は旅行ガイドをめくることではなく、その市場や街角に足を踏み入れることだ。", e:"For many people, the fastest way to get to know a city is not to flip through a travel guide, but to step into its markets and street corners.", k:"많은 사람에게 한 도시를 아는 가장 빠른 방법은 여행 가이드를 넘기는 것이 아니라 그 시장과 골목으로 들어서는 것이다." } },
    { z:"台灣的飲食文化，正是在這樣的日常縫隙裡，一點一滴累積而成。", py:"Táiwān de yǐnshí wénhuà, zhèng shì zài zhèyàng de rìcháng fèngxì lǐ, yìdiǎn yìdī lěijī ér chéng.", m:{ j:"台湾の食文化とは、まさにこうした日常の隙間の中で、少しずつ積み重なって形づくられたものだ。", e:"Taiwan's food culture is precisely what has accumulated, bit by bit, within these little cracks of everyday life.", k:"대만의 음식 문화는 바로 이런 일상의 틈새 속에서 조금씩 쌓여 이루어진 것이다." } },
    { z:"夜市或許是最鮮明的縮影：油鍋滋滋作響，蚵仔煎、雞排與臭豆腐的香氣交織在一起。", py:"Yèshì huòxǔ shì zuì xiānmíng de suōyǐng: yóuguō zīzī zuòxiǎng, ézǐjiān, jīpái yǔ chòudòufu de xiāngqì jiāozhī zài yìqǐ.", m:{ j:"夜市はおそらく最も鮮やかな縮図だ。油鍋がジュージューと音を立て、牡蠣オムレツ、チキンカツ、臭豆腐の香りが混ざり合う。", e:"The night market is perhaps its most vivid microcosm: oil sizzles in the wok, and the aromas of oyster omelet, fried chicken cutlet, and stinky tofu weave together.", k:"야시장은 아마 가장 선명한 축소판일 것이다. 기름솥이 지글거리고 굴전, 닭튀김, 취두부의 향이 뒤섞인다." } },
    { z:"這些小吃看似平凡，背後卻往往承載著一個家庭數十年的手藝與堅持。", py:"Zhèxiē xiǎochī kànsì píngfán, bèihòu què wǎngwǎng chéngzài zhe yí ge jiātíng shùshí nián de shǒuyì yǔ jiānchí.", m:{ j:"これらの屋台料理は一見平凡だが、その裏にはしばしば一家の数十年にわたる手仕事とこだわりが込められている。", e:"These snacks seem ordinary, yet behind them often lies a family's decades of craftsmanship and perseverance.", k:"이런 먹거리는 평범해 보이지만 그 뒤에는 흔히 한 가족의 수십 년에 걸친 손맛과 고집이 담겨 있다." } },
    { z:"除了小吃，便當更是台灣人生活中不可或缺的一部分。", py:"Chúle xiǎochī, biàndāng gèng shì Táiwān rén shēnghuó zhōng bùkě huòquē de yí bùfèn.", m:{ j:"屋台料理のほかに、弁当は台湾人の生活に欠かせない一部となっている。", e:"Beyond street snacks, the boxed meal is an indispensable part of Taiwanese life.", k:"먹거리 외에 도시락은 대만 사람의 생활에서 빼놓을 수 없는 일부다." } },
    { z:"從火車站月台上的排骨便當，到辦公大樓外的自助餐，一菜一飯都各有講究。", py:"Cóng huǒchēzhàn yuètái shàng de páigǔ biàndāng, dào bàngōng dàlóu wài de zìzhùcān, yì cài yì fàn dōu gè yǒu jiǎngjiù.", m:{ j:"駅のホームで売られる排骨弁当から、オフィスビルの外のビュッフェ形式の総菜屋まで、一品一品にそれぞれのこだわりがある。", e:"From the pork-chop lunchboxes on train platforms to the self-service eateries outside office buildings, every dish has its own particular care.", k:"기차역 승강장의 돼지갈비 도시락부터 사무용 빌딩 밖의 뷔페식 반찬집까지, 반찬 하나 밥 하나에도 저마다 정성이 있다." } },
    { z:"而近年風靡全球的手搖飲，更把台灣的味道帶到了世界各地。", py:"Ér jìnnián fēngmí quánqiú de shǒuyáoyǐn, gèng bǎ Táiwān de wèidào dàidào le shìjiè gèdì.", m:{ j:"そして近年、世界中で人気を博すタピオカ系ドリンクは、台湾の味を世界各地へと届けた。", e:"And the hand-shaken drinks that have swept the globe in recent years have carried the taste of Taiwan to every corner of the world.", k:"게다가 최근 전 세계를 사로잡은 버블티류 음료는 대만의 맛을 세계 곳곳으로 전했다." } },
    { z:"從珍珠奶茶到各式茶飲，甜度與冰塊都能依個人喜好自由調整。", py:"Cóng zhēnzhū nǎichá dào gèshì cháyǐn, tiándù yǔ bīngkuài dōu néng yī gèrén xǐhào zìyóu tiáozhěng.", m:{ j:"タピオカミルクティーから各種の茶系ドリンクまで、甘さも氷の量も自分の好みに合わせて自由に調整できる。", e:"From bubble tea to all kinds of tea drinks, both sweetness and ice can be freely adjusted to personal taste.", k:"버블티부터 각종 차 음료까지, 당도와 얼음까지 개인 취향에 맞춰 자유롭게 조절할 수 있다." } },
    { z:"台灣的飲食之所以動人，不僅在於味道本身，更在於它背後那份對生活的熱情與人情味。", py:"Táiwān de yǐnshí zhīsuǒyǐ dòngrén, bùjǐn zàiyú wèidào běnshēn, gèng zàiyú tā bèihòu nà fèn duì shēnghuó de rèqíng yǔ rénqíngwèi.", m:{ j:"台湾の食が人の心を打つのは、味そのものだけでなく、その背後にある生活への情熱と人情味ゆえである。", e:"What makes Taiwanese food so moving lies not only in the flavors themselves, but even more in the passion for life and human warmth behind them.", k:"대만 음식이 마음을 울리는 이유는 맛 그 자체뿐 아니라, 그 뒤에 담긴 삶에 대한 열정과 인정미에 있다." } },
  ],
  vocab:[
    { w:"而言", zy:"ㄦˊ ㄧㄢˊ", py:"ér yán", m:{ j:"〜にとって（對…而言）", e:"as for, to (in 對…而言)", k:"~에게 있어(對…而言)" } },
    { w:"縮影", zy:"ㄙㄨㄛ ㄧㄥˇ", py:"suōyǐng", m:{ j:"縮図・凝縮された姿", e:"microcosm, epitome", k:"축소판, 축도" } },
    { w:"交織", zy:"ㄐㄧㄠ ㄓ", py:"jiāozhī", m:{ j:"入り混じる・織りなす", e:"to intertwine, to weave together", k:"뒤섞이다, 얽히다" } },
    { w:"承載", zy:"ㄔㄥˊ ㄗㄞˋ", py:"chéngzài", m:{ j:"（重みや意味を）担う・背負う", e:"to carry, to bear (weight/meaning)", k:"담다, 짊어지다" } },
    { w:"堅持", zy:"ㄐㄧㄢ ㄔˊ", py:"jiānchí", m:{ j:"こだわり・貫き通すこと", e:"perseverance, insistence", k:"고집, 지켜냄" } },
    { w:"不可或缺", zy:"ㄅㄨˋ ㄎㄜˇ ㄏㄨㄛˋ ㄑㄩㄝ", py:"bùkě huòquē", m:{ j:"欠かせない・不可欠な", e:"indispensable", k:"없어서는 안 될" } },
    { w:"講究", zy:"ㄐㄧㄤˇ ㄐㄧㄡˋ", py:"jiǎngjiù", m:{ j:"こだわり・凝ること", e:"to be particular about, meticulous care", k:"정성을 들임, 까다롭게 따짐" } },
    { w:"風靡", zy:"ㄈㄥ ㄇㄧˇ", py:"fēngmí", m:{ j:"一世を風靡する・大流行する", e:"to sweep (a place), to be all the rage", k:"풍미하다, 크게 유행하다" } },
    { w:"之所以…是因為", zy:"ㄓ ㄙㄨㄛˇ ㄧˇ … ㄕˋ ㄧㄣ ㄨㄟˋ", py:"zhīsuǒyǐ…shì yīnwèi", m:{ j:"〜であるのは〜だからだ（構文）", e:"the reason why… is because…", k:"~한 까닭은 ~때문이다" } },
    { w:"人情味", zy:"ㄖㄣˊ ㄑㄧㄥˊ ㄨㄟˋ", py:"rénqíngwèi", m:{ j:"人情味・温かい思いやり", e:"human warmth, the personal touch", k:"인정미, 사람 냄새" } },
  ],
  q:{
    ask:{ j:"この文章の考えでは、台湾の食が人の心を打つ最も大きな理由は何ですか？", e:"According to the passage, what is the deepest reason Taiwanese food is so moving?", k:"이 글에 따르면 대만 음식이 마음을 울리는 가장 큰 이유는 무엇인가요?" },
    opts:[ { j:"味そのものが良いだけでなく、生活への情熱と人情味があるから", e:"Not just the flavor itself, but the passion for life and human warmth behind it", k:"맛 자체뿐 아니라 삶에 대한 열정과 인정미가 있기 때문" }, { j:"世界中で人気があり、有名だから", e:"Because it is famous and popular worldwide", k:"세계적으로 유명하고 인기가 있기 때문" }, { j:"値段が安く、量が多いから", e:"Because it is cheap and the portions are large", k:"값이 싸고 양이 많기 때문" }, { j:"甘さや氷を自由に選べるから", e:"Because you can freely choose sweetness and ice", k:"당도와 얼음을 자유롭게 고를 수 있기 때문" } ],
    ans:0,
    why:{ j:"最終文「不僅在於味道本身，更在於…熱情與人情味」から、味だけでなく生活への情熱と人情味が核心だと分かる。", e:"The final line, \"not only in the flavors themselves, but even more in the passion for life and human warmth,\" points to warmth as the deepest reason.", k:"마지막 문장 \"맛 자체뿐 아니라 삶에 대한 열정과 인정미\"에서 인정미가 핵심임을 알 수 있다." }
  }
},
{
  id:"taiwan-warmth-renqingwei", level:"l5",
  title:{ j:"人情味という贈りもの", e:"The Gift Called Human Warmth", k:"인정미라는 선물" },
  lines:[
    { z:"如果要用一個詞來形容台灣，許多在地人與旅人不約而同會提到「人情味」。", py:"Rúguǒ yào yòng yí ge cí lái xíngróng Táiwān, xǔduō zàidì rén yǔ lǚrén bùyuē'értóng huì tídào “rénqíngwèi”.", m:{ j:"もし一つの言葉で台湾を形容するなら、多くの地元の人も旅人も、申し合わせたように「人情味」を口にするだろう。", e:"If you had to describe Taiwan in a single word, many locals and travelers alike would, without prior agreement, mention \"human warmth.\"", k:"만약 한 단어로 대만을 표현하라면, 많은 현지인과 여행자가 약속이나 한 듯 \"인정미\"를 떠올릴 것이다." } },
    { z:"這種溫暖並非什麼驚天動地的舉動，而是藏在再平常不過的細節裡。", py:"Zhè zhǒng wēnnuǎn bìngfēi shénme jīngtiāndòngdì de jǔdòng, ér shì cáng zài zài píngcháng búguò de xìjié lǐ.", m:{ j:"この温かさは何か天地を揺るがすような行いではなく、ごくありふれた細部の中に潜んでいる。", e:"This warmth is not some earth-shattering act, but rather something hidden in the most ordinary of details.", k:"이 따뜻함은 무슨 세상을 뒤흔드는 행동이 아니라, 지극히 평범한 사소함 속에 숨어 있다." } },
    { z:"或許是雨天時，陌生人默默為你撐起的一把傘。", py:"Huòxǔ shì yǔtiān shí, mòshēng rén mòmò wèi nǐ chēngqǐ de yì bǎ sǎn.", m:{ j:"それは雨の日に、見知らぬ人が黙ってあなたに差しかけてくれる一本の傘かもしれない。", e:"Perhaps it is the umbrella a stranger quietly holds up for you on a rainy day.", k:"어쩌면 비 오는 날, 낯선 사람이 말없이 씌워 주는 우산 한 자루일지도 모른다." } },
    { z:"或許是問路時，對方乾脆放下手邊的事，直接領著你走到目的地。", py:"Huòxǔ shì wènlù shí, duìfāng gāncuì fàngxià shǒubiān de shì, zhíjiē lǐng zhe nǐ zǒudào mùdìdì.", m:{ j:"それは道を尋ねたとき、相手がきっぱりと手元の用事を置いて、目的地まで直接連れて行ってくれることかもしれない。", e:"Perhaps it is the person who, when you ask for directions, simply sets aside what they were doing and walks you straight to your destination.", k:"어쩌면 길을 물었을 때, 상대가 선뜻 하던 일을 내려놓고 직접 목적지까지 데려다주는 것일지도 모른다." } },
    { z:"老一輩的人常說，出外靠朋友，一句溫暖的招呼，往往勝過千言萬語。", py:"Lǎo yíbèi de rén cháng shuō, chūwài kào péngyǒu, yí jù wēnnuǎn de zhāohū, wǎngwǎng shèngguò qiānyán-wànyǔ.", m:{ j:"年配の人はよくこう言う。外では友に頼るもので、一言の温かい挨拶は、しばしば千の言葉に勝ると。", e:"The older generation often says that away from home you rely on friends, and a single warm greeting can outweigh a thousand words.", k:"윗세대 사람들은 흔히 말한다. 밖에 나가면 친구에게 기대는 법이며, 따뜻한 인사 한마디가 천 마디 말보다 나을 때가 많다고." } },
    { z:"每逢過年過節，這份人情味便顯得更加濃厚。", py:"Měi féng guònián guòjié, zhè fèn rénqíngwèi biàn xiǎnde gèngjiā nónghòu.", m:{ j:"正月や節句のたびに、この人情味はいっそう濃く感じられる。", e:"Whenever New Year or a festival comes around, this warmth grows all the more palpable.", k:"설이나 명절이 올 때마다 이 인정미는 한층 더 짙게 느껴진다." } },
    { z:"街坊鄰居互相分送自家做的年菜，彼此噓寒問暖，彷彿一家人。", py:"Jiēfāng línjū hùxiāng fēnsòng zìjiā zuò de niáncài, bǐcǐ xūhán-wènnuǎn, fǎngfú yì jiā rén.", m:{ j:"近所同士が自家製の正月料理をお裾分けし合い、互いに気遣い合う様子は、まるで一つの家族のようだ。", e:"Neighbors share the New Year dishes they made at home and ask after one another's well-being, as if they were one family.", k:"이웃끼리 집에서 만든 설음식을 나누고 서로 안부를 챙기는 모습은 마치 한 가족 같다." } },
    { z:"正因為有了這樣的牽絆，人與人之間的距離才得以慢慢拉近。", py:"Zhèng yīnwèi yǒu le zhèyàng de qiānbàn, rén yǔ rén zhījiān de jùlí cái déyǐ mànmàn lājìn.", m:{ j:"まさにこうした絆があるからこそ、人と人との距離は少しずつ縮まっていく。", e:"It is precisely because of such bonds that the distance between people is gradually drawn closer.", k:"바로 이런 유대가 있기에 사람과 사람 사이의 거리가 조금씩 가까워질 수 있다." } },
    { z:"對許多離鄉背井的人而言，正是這股暖意，讓台灣成了另一個家。", py:"Duì xǔduō líxiāng-bèijǐng de rén ér yán, zhèng shì zhè gǔ nuǎnyì, ràng Táiwān chéng le lìng yí ge jiā.", m:{ j:"故郷を離れて暮らす多くの人にとって、まさにこの温もりこそが、台湾をもう一つの故郷にしてくれるのだ。", e:"For many who have left their hometowns far behind, it is precisely this warmth that makes Taiwan a second home.", k:"고향을 떠나 사는 많은 이에게 바로 이 온기가 대만을 또 하나의 집으로 만들어 준다." } },
  ],
  vocab:[
    { w:"不約而同", zy:"ㄅㄨˋ ㄩㄝ ㄦˊ ㄊㄨㄥˊ", py:"bùyuē'értóng", m:{ j:"申し合わせたように・期せずして一致する", e:"to coincide without prior agreement", k:"약속이나 한 듯이" } },
    { w:"驚天動地", zy:"ㄐㄧㄥ ㄊㄧㄢ ㄉㄨㄥˋ ㄉㄧˋ", py:"jīngtiāndòngdì", m:{ j:"天地を揺るがすような・大げさな", e:"earth-shattering, momentous", k:"천지를 뒤흔드는" } },
    { w:"陌生", zy:"ㄇㄛˋ ㄕㄥ", py:"mòshēng", m:{ j:"見知らぬ・不慣れな", e:"unfamiliar, strange", k:"낯선" } },
    { w:"乾脆", zy:"ㄍㄢ ㄘㄨㄟˋ", py:"gāncuì", m:{ j:"いっそのこと・きっぱりと", e:"straightforwardly, might as well", k:"아예, 선뜻" } },
    { w:"勝過", zy:"ㄕㄥˋ ㄍㄨㄛˋ", py:"shèngguò", m:{ j:"〜に勝る・上回る", e:"to surpass, to be better than", k:"~보다 낫다" } },
    { w:"濃厚", zy:"ㄋㄨㄥˊ ㄏㄡˋ", py:"nónghòu", m:{ j:"（雰囲気などが）濃い・色濃い", e:"thick, strong (of atmosphere/feeling)", k:"짙다, 농후하다" } },
    { w:"噓寒問暖", zy:"ㄒㄩ ㄏㄢˊ ㄨㄣˋ ㄋㄨㄢˇ", py:"xūhán-wènnuǎn", m:{ j:"こまやかに気遣う・体調を気にかける", e:"to show tender care, to ask after someone", k:"세심히 안부를 챙기다" } },
    { w:"牽絆", zy:"ㄑㄧㄢ ㄅㄢˋ", py:"qiānbàn", m:{ j:"絆・つながり", e:"bond, tie", k:"유대, 정" } },
    { w:"離鄉背井", zy:"ㄌㄧˊ ㄒㄧㄤ ㄅㄟˋ ㄐㄧㄥˇ", py:"líxiāng-bèijǐng", m:{ j:"故郷を離れて暮らす", e:"to leave one's hometown behind", k:"고향을 떠나다" } },
    { w:"暖意", zy:"ㄋㄨㄢˇ ㄧˋ", py:"nuǎnyì", m:{ j:"温もり・温かい気持ち", e:"warmth, a warm feeling", k:"온기, 따스함" } },
  ],
  q:{
    ask:{ j:"この文章では、台湾の「人情味」はどのように表れると述べられていますか？", e:"According to the passage, how does Taiwan's \"human warmth\" reveal itself?", k:"이 글에서 대만의 \"인정미\"는 어떻게 드러난다고 하나요?" },
    opts:[ { j:"ごく平凡な日常の細部の中に潜んでいる", e:"It hides within the most ordinary details of daily life", k:"지극히 평범한 일상의 사소함 속에 숨어 있다" }, { j:"天地を揺るがすような大きな行いの中にある", e:"It appears in grand, earth-shattering deeds", k:"천지를 뒤흔드는 큰 행동 속에 나타난다" }, { j:"お金や高価な贈り物を通して示される", e:"It is shown through money and expensive gifts", k:"돈이나 값비싼 선물을 통해 드러난다" }, { j:"正月や節句のときにだけ存在する", e:"It exists only during New Year and festivals", k:"설이나 명절 때에만 존재한다" } ],
    ans:0,
    why:{ j:"「並非…驚天動地的舉動，而是藏在再平常不過的細節裡」とあり、傘や道案内など日常の細部に表れる。過節はそれが濃くなる例にすぎない。", e:"The text says it is \"not some earth-shattering act, but hidden in the most ordinary details\" — like the umbrella or directions. Festivals only intensify it.", k:"본문은 \"세상을 뒤흔드는 행동이 아니라 지극히 평범한 사소함 속에 숨어 있다\"고 한다. 우산이나 길 안내처럼. 명절은 그것이 짙어지는 예일 뿐이다." }
  }
},
];
if (typeof module !== "undefined") module.exports = { READING_L5 };
