// StayTW Study — 分級閲讀（台湾のリアルな場面・繁体字＋注音＋拼音）
// 形式: level, title{j,e,k}, lines[{z,zy,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], q{ask{j,e,k},opts[{j,e,k}],ans,why{j,e,k}}
// 音声は各 line.z を TTS で読み上げ（事前生成 mp3 があれば高音質、無ければ端末音声）。
const READING_L1 = [
{
  id:"conbini-breakfast", level:"l1",
  title:{ j:"コンビニで朝ごはん", e:"Breakfast at the Convenience Store", k:"편의점에서 아침" },
  lines:[
    { z:"早上七點，小明走進便利商店。", zy:"ㄗㄠˇ ㄕㄤˋ ㄑㄧ ㄉㄧㄢˇ", py:"Zǎoshàng qī diǎn, Xiǎomíng zǒujìn biànlì shāngdiàn.", m:{ j:"朝7時、シャオミンはコンビニに入ります。", e:"At 7 a.m., Xiaoming walks into a convenience store.", k:"아침 7시, 샤오밍이 편의점에 들어갑니다." } },
    { z:"他想買一個飯糰和一杯咖啡。", py:"Tā xiǎng mǎi yí ge fàntuán hé yì bēi kāfēi.", m:{ j:"彼はおにぎりを一つとコーヒーを一杯買いたいです。", e:"He wants to buy a rice ball and a cup of coffee.", k:"그는 삼각김밥 하나와 커피 한 잔을 사고 싶어요." } },
    { z:"「這個飯糰可以幫我加熱嗎？」", py:"“Zhège fàntuán kěyǐ bāng wǒ jiārè ma?”", m:{ j:"「このおにぎり、温めてもらえますか？」", e:"\"Can you heat up this rice ball for me?\"", k:"\"이 삼각김밥 데워 주실 수 있어요?\"" } },
    { z:"店員說：「好，要不要袋子？」", py:"Diànyuán shuō: “Hǎo, yào bú yào dàizi?”", m:{ j:"店員は言います。「はい、袋はいりますか？」", e:"The clerk says: \"Sure, do you want a bag?\"", k:"점원이 말합니다. \"네, 봉투 필요하세요?\"" } },
    { z:"「不用，謝謝。我用悠遊卡付。」", py:"“Búyòng, xièxie. Wǒ yòng Yōuyóukǎ fù.”", m:{ j:"「いりません、ありがとう。悠遊カードで払います。」", e:"\"No thanks. I'll pay with my EasyCard.\"", k:"\"괜찮아요, 감사합니다. 유유카드로 낼게요.\"" } },
    { z:"「嗶」一聲，早餐買好了，小明趕去上班。", py:"“Bī” yì shēng, zǎocān mǎihǎo le, Xiǎomíng gǎn qù shàngbān.", m:{ j:"「ピッ」と一音、朝ごはんを買い終え、シャオミンは急いで出勤します。", e:"With a \"beep,\" breakfast is bought, and Xiaoming hurries off to work.", k:"\"삑\" 소리와 함께 아침을 다 사고, 샤오밍은 서둘러 출근합니다." } },
  ],
  vocab:[
    { w:"便利商店", zy:"ㄅㄧㄢˋ ㄌㄧˋ ㄕㄤ ㄉㄧㄢˋ", py:"biànlì shāngdiàn", m:{ j:"コンビニ", e:"convenience store", k:"편의점" } },
    { w:"飯糰", zy:"ㄈㄢˋ ㄊㄨㄢˊ", py:"fàntuán", m:{ j:"おにぎり", e:"rice ball", k:"삼각김밥·주먹밥" } },
    { w:"加熱", zy:"ㄐㄧㄚ ㄖㄜˋ", py:"jiārè", m:{ j:"温める", e:"to heat up", k:"데우다" } },
    { w:"店員", zy:"ㄉㄧㄢˋ ㄩㄢˊ", py:"diànyuán", m:{ j:"店員", e:"clerk", k:"점원" } },
    { w:"悠遊卡", zy:"ㄧㄡ ㄧㄡˊ ㄎㄚˇ", py:"Yōuyóukǎ", m:{ j:"悠遊カード（交通ICカード）", e:"EasyCard (transit IC card)", k:"유유카드(교통카드)" } },
    { w:"上班", zy:"ㄕㄤˋ ㄅㄢ", py:"shàngbān", m:{ j:"出勤する・仕事に行く", e:"to go to work", k:"출근하다" } },
  ],
  q:{
    ask:{ j:"小明はどうやって支払いましたか？", e:"How did Xiaoming pay?", k:"샤오밍은 어떻게 결제했나요?" },
    opts:[ { j:"悠遊カードで", e:"With an EasyCard", k:"유유카드로" }, { j:"現金で", e:"With cash", k:"현금으로" }, { j:"クレジットカードで", e:"With a credit card", k:"신용카드로" } ],
    ans:0,
    why:{ j:"「我用悠遊卡付」＝悠遊カードで払う。台湾ではコンビニでも交通ICカードで支払えます。", e:"\"我用悠遊卡付\" = pay with EasyCard. In Taiwan you can pay at convenience stores with your transit card.", k:"\"我用悠遊卡付\" = 유유카드로 결제. 대만에서는 편의점도 교통카드로 낼 수 있어요." }
  }
},
{
  id:"night-market", level:"l1",
  title:{ j:"夜市で晩ごはん", e:"Dinner at the Night Market", k:"야시장에서 저녁" },
  lines:[
    { z:"晚上，愛子和朋友一起去逛夜市。", py:"Wǎnshàng, Àizǐ hé péngyǒu yìqǐ qù guàng yèshì.", m:{ j:"夜、愛子は友達と一緒に夜市をぶらぶらします。", e:"In the evening, Aiko goes strolling through the night market with a friend.", k:"저녁에 아이코는 친구와 함께 야시장을 구경합니다." } },
    { z:"夜市裡人很多，也很熱鬧。", py:"Yèshì lǐ rén hěn duō, yě hěn rènào.", m:{ j:"夜市は人が多く、とてもにぎやかです。", e:"The night market is crowded and lively.", k:"야시장은 사람이 많고 아주 북적입니다." } },
    { z:"「老闆，這個雞排怎麼賣？」", py:"“Lǎobǎn, zhège jīpái zěnme mài?”", m:{ j:"「すみません、このチキンカツはいくらですか？」", e:"\"Boss, how much is this fried chicken cutlet?\"", k:"\"사장님, 이 닭튀김 얼마예요?\"" } },
    { z:"「一份七十塊，要不要加辣？」", py:"“Yí fèn qīshí kuài, yào bú yào jiā là?”", m:{ j:"「一つ70元です。辛くしますか？」", e:"\"Seventy dollars each. Want it spicy?\"", k:"\"한 개에 70원이에요. 맵게 해 드릴까요?\"" } },
    { z:"「要一點點辣，謝謝。」", py:"“Yào yìdiǎndiǎn là, xièxie.”", m:{ j:"「少しだけ辛くしてください、ありがとう。」", e:"\"Just a little spicy, thanks.\"", k:"\"조금만 맵게요, 감사합니다.\"" } },
    { z:"她們又買了珍珠奶茶，邊走邊吃。", py:"Tāmen yòu mǎile zhēnzhū nǎichá, biān zǒu biān chī.", m:{ j:"彼女たちはタピオカミルクティーも買い、歩きながら食べます。", e:"They also buy bubble tea and eat as they walk.", k:"그들은 버블티도 사서 걸으면서 먹습니다." } },
  ],
  vocab:[
    { w:"夜市", zy:"ㄧㄝˋ ㄕˋ", py:"yèshì", m:{ j:"夜市", e:"night market", k:"야시장" } },
    { w:"熱鬧", zy:"ㄖㄜˋ ㄋㄠˋ", py:"rènào", m:{ j:"にぎやか", e:"lively, bustling", k:"북적이다" } },
    { w:"雞排", zy:"ㄐㄧ ㄆㄞˊ", py:"jīpái", m:{ j:"チキンカツ（台湾夜市の定番）", e:"fried chicken cutlet", k:"닭튀김(야시장 인기)" } },
    { w:"份", zy:"ㄈㄣˋ", py:"fèn", m:{ j:"〜人前・一つ分（量詞）", e:"portion (measure word)", k:"인분·개(양사)" } },
    { w:"加辣", zy:"ㄐㄧㄚ ㄌㄚˋ", py:"jiā là", m:{ j:"辛さを足す", e:"to add spice", k:"맵게 하다" } },
    { w:"邊…邊…", zy:"ㄅㄧㄢ … ㄅㄧㄢ …", py:"biān…biān…", m:{ j:"〜しながら〜する", e:"to do A while doing B", k:"~하면서 ~하다" } },
  ],
  q:{
    ask:{ j:"愛子は雞排をどんな味にしましたか？", e:"How did Aiko want her chicken cutlet?", k:"아이코는 닭튀김을 어떻게 해 달라고 했나요?" },
    opts:[ { j:"少しだけ辛く", e:"A little spicy", k:"조금 맵게" }, { j:"とても辛く", e:"Very spicy", k:"아주 맵게" }, { j:"辛くしない", e:"Not spicy", k:"안 맵게" } ],
    ans:0,
    why:{ j:"「要一點點辣」＝少しだけ辛く。「一點點」は「ほんの少し」。", e:"\"要一點點辣\" = just a little spicy. \"一點點\" means \"just a tiny bit.\"", k:"\"要一點點辣\" = 조금만 맵게. \"一點點\"은 '아주 조금'." }
  }
},
{
  id:"mrt-directions", level:"l1",
  title:{ j:"MRTで道をきく", e:"Asking for Directions on the MRT", k:"MRT에서 길 묻기" },
  lines:[
    { z:"建宏想去台北一〇一，可是他不知道怎麼走。", py:"Jiànhóng xiǎng qù Táiběi Yīlíngyī, kěshì tā bù zhīdào zěnme zǒu.", m:{ j:"ジェンホンは台北101に行きたいのですが、行き方がわかりません。", e:"Jianhong wants to go to Taipei 101, but he doesn't know the way.", k:"젠홍은 타이베이 101에 가고 싶지만 가는 길을 모릅니다." } },
    { z:"他問站務員：「請問，去一〇一要坐哪一條線？」", py:"Tā wèn zhànwùyuán: “Qǐngwèn, qù Yīlíngyī yào zuò nǎ yì tiáo xiàn?”", m:{ j:"彼は駅員に尋ねます。「すみません、101へはどの路線に乗ればいいですか？」", e:"He asks the station staff: \"Excuse me, which line do I take to 101?\"", k:"그는 역무원에게 묻습니다. \"실례지만 101에 가려면 어느 노선을 타야 하나요?\"" } },
    { z:"「你搭紅線，到台北一〇一／世貿站下車。」", py:"“Nǐ dā hóng xiàn, dào Táiběi Yīlíngyī/Shìmào zhàn xiàchē.”", m:{ j:"「レッドラインに乗って、台北101/世貿駅で降りてください。」", e:"\"Take the Red Line and get off at Taipei 101/World Trade Center station.\"", k:"\"레드라인을 타고 타이베이 101/세계무역센터 역에서 내리세요.\"" } },
    { z:"「要轉車嗎？」「不用，直達。」", py:"“Yào zhuǎnchē ma?” “Búyòng, zhídá.”", m:{ j:"「乗り換えは必要ですか？」「いりません、直通です。」", e:"\"Do I need to transfer?\" \"No, it's direct.\"", k:"\"환승해야 하나요?\" \"아니요, 직통이에요.\"" } },
    { z:"「太好了，謝謝你！」建宏刷卡進站。", py:"“Tài hǎo le, xièxie nǐ!” Jiànhóng shuākǎ jìn zhàn.", m:{ j:"「よかった、ありがとう！」ジェンホンはカードをタッチして改札を通ります。", e:"\"Great, thank you!\" Jianhong taps his card and enters the station.", k:"\"잘됐네요, 감사합니다!\" 젠홍은 카드를 찍고 역에 들어갑니다." } },
  ],
  vocab:[
    { w:"站務員", zy:"ㄓㄢˋ ㄨˋ ㄩㄢˊ", py:"zhànwùyuán", m:{ j:"駅員", e:"station staff", k:"역무원" } },
    { w:"線", zy:"ㄒㄧㄢˋ", py:"xiàn", m:{ j:"路線（紅線＝レッドライン）", e:"line (e.g. Red Line)", k:"노선(레드라인 등)" } },
    { w:"下車", zy:"ㄒㄧㄚˋ ㄔㄜ", py:"xiàchē", m:{ j:"降りる", e:"to get off", k:"내리다" } },
    { w:"轉車", zy:"ㄓㄨㄢˇ ㄔㄜ", py:"zhuǎnchē", m:{ j:"乗り換える", e:"to transfer (trains)", k:"환승하다" } },
    { w:"直達", zy:"ㄓˊ ㄉㄚˊ", py:"zhídá", m:{ j:"直通・乗り換えなし", e:"direct (no transfer)", k:"직통" } },
    { w:"刷卡", zy:"ㄕㄨㄚ ㄎㄚˇ", py:"shuākǎ", m:{ j:"カードをタッチする", e:"to tap/swipe a card", k:"카드를 찍다" } },
  ],
  q:{
    ask:{ j:"建宏は乗り換えが必要ですか？", e:"Does Jianhong need to transfer?", k:"젠홍은 환승해야 하나요?" },
    opts:[ { j:"いいえ、直通", e:"No, it's direct", k:"아니요, 직통" }, { j:"はい、一回", e:"Yes, once", k:"네, 한 번" }, { j:"はい、二回", e:"Yes, twice", k:"네, 두 번" } ],
    ans:0,
    why:{ j:"「不用，直達」＝乗り換え不要で直通。", e:"\"不用，直達\" = no need to transfer, it's direct.", k:"\"不用，直達\" = 환승 없이 직통." }
  }
},

{"id":"order-bubble-tea","level":"l1","title":{"j":"タピオカミルクティーを買う","e":"Buying Bubble Tea","k":"버블티 사기"},"lines":[{"z":"我想喝珍珠奶茶。","py":"wǒ xiǎng hē zhēn zhū nǎi chá。","m":{"j":"タピオカミルクティーが飲みたいです。","e":"I want to drink bubble tea.","k":"버블티가 마시고 싶어요."}},{"z":"這家店很有名。","py":"zhè jiā diàn hěn yǒu míng。","m":{"j":"この店はとても有名です。","e":"This shop is very famous.","k":"이 가게는 아주 유명해요."}},{"z":"我要一杯大杯的。","py":"wǒ yào yì bēi dà bēi de。","m":{"j":"大サイズを一杯ください。","e":"I want a large one.","k":"큰 사이즈 한 잔 주세요."}},{"z":"老闆問我要不要加糖。","py":"lǎo bǎn wèn wǒ yào bú yào jiā táng。","m":{"j":"店主は砂糖を入れるか聞きました。","e":"The owner asked if I wanted sugar.","k":"사장님이 설탕을 넣을지 물었어요."}},{"z":"我說半糖少冰。","py":"wǒ shuō bàn táng shǎo bīng。","m":{"j":"砂糖半分、氷少なめと言いました。","e":"I said half sugar, less ice.","k":"설탕 반, 얼음 적게라고 했어요."}},{"z":"珍珠很好吃。","py":"zhēn zhū hěn hǎo chī。","m":{"j":"タピオカはとても美味しいです。","e":"The pearls are delicious.","k":"펄이 아주 맛있어요."}},{"z":"這杯奶茶五十元。","py":"zhè bēi nǎi chá wǔ shí yuán。","m":{"j":"このミルクティーは五十元です。","e":"This milk tea is fifty dollars.","k":"이 밀크티는 오십 원이에요."}}],"vocab":[{"w":"珍珠奶茶","py":"zhēnzhūnǎichá","m":{"j":"タピオカミルクティー","e":"bubble tea","k":"버블티"},"zy":"ㄓㄣ ㄓㄨ ㄋㄞˇ ㄔㄚˊ"},{"w":"想","py":"xiǎng","m":{"j":"〜したい","e":"want to","k":"~하고 싶다"},"zy":"ㄒㄧㄤˇ"},{"w":"有名","py":"yǒumíng","m":{"j":"有名","e":"famous","k":"유명하다"},"zy":"ㄧㄡˇ ㄇㄧㄥˊ"},{"w":"老闆","py":"lǎobǎn","m":{"j":"店主","e":"boss / owner","k":"사장님"},"zy":"ㄌㄠˇ ㄅㄢˇ"},{"w":"加糖","py":"jiātáng","m":{"j":"砂糖を入れる","e":"add sugar","k":"설탕을 넣다"},"zy":"ㄐㄧㄚ ㄊㄤˊ"},{"w":"少冰","py":"shǎobīng","m":{"j":"氷少なめ","e":"less ice","k":"얼음 적게"},"zy":"ㄕㄠˇ ㄅㄧㄥ"}],"q":{"ask":{"j":"彼はどんな飲み物を注文しましたか？","e":"What kind of drink did he order?","k":"그는 어떤 음료를 주문했나요?"},"opts":[{"j":"砂糖半分・氷少なめの大サイズ","e":"Large, half sugar, less ice","k":"큰 사이즈, 설탕 반, 얼음 적게"},{"j":"砂糖多め・氷なしの小サイズ","e":"Small, full sugar, no ice","k":"작은 사이즈, 설탕 많이, 얼음 없이"},{"j":"無糖・普通の氷","e":"No sugar, normal ice","k":"무설탕, 보통 얼음"},{"j":"ホットのタピオカミルクティー","e":"Hot bubble tea","k":"뜨거운 버블티"}],"ans":0,"why":{"j":"本文で「大杯」「半糖少冰」と言っています。","e":"He asked for a large, half sugar and less ice.","k":"본문에서 큰 사이즈, 설탕 반, 얼음 적게라고 했어요."}}},
{"id":"self-intro-friends","level":"l1","title":{"j":"自己紹介して友達を作る","e":"Introducing Yourself","k":"자기소개하고 친구 사귀기"},"lines":[{"z":"大家好，我叫小明。","py":"dà jiā hǎo， wǒ jiào xiǎo míng。","m":{"j":"皆さんこんにちは、シャオミンと言います。","e":"Hello everyone, my name is Xiao Ming.","k":"여러분 안녕하세요, 저는 샤오밍이라고 해요."}},{"z":"我是日本人。","py":"wǒ shì rì běn rén。","m":{"j":"私は日本人です。","e":"I am Japanese.","k":"저는 일본 사람이에요."}},{"z":"我在台北工作。","py":"wǒ zài tái běi gōng zuò。","m":{"j":"台北で働いています。","e":"I work in Taipei.","k":"저는 타이베이에서 일해요."}},{"z":"我喜歡吃台灣菜。","py":"wǒ xǐ huān chī tái wān cài。","m":{"j":"台湾料理を食べるのが好きです。","e":"I like eating Taiwanese food.","k":"대만 음식 먹는 걸 좋아해요."}},{"z":"我想交台灣朋友。","py":"wǒ xiǎng jiāo tái wān péng yǒu。","m":{"j":"台湾の友達を作りたいです。","e":"I want to make Taiwanese friends.","k":"대만 친구를 사귀고 싶어요."}},{"z":"你叫什麼名字？","py":"Nǐ jiào shén me míng zi?","m":{"j":"お名前は何ですか？","e":"What is your name?","k":"이름이 뭐예요?"}},{"z":"很高興認識你。","py":"hěn gāo xìng rèn shì nǐ。","m":{"j":"お会いできて嬉しいです。","e":"Nice to meet you.","k":"만나서 반가워요."}}],"vocab":[{"w":"大家","py":"dàjiā","m":{"j":"皆さん","e":"everyone","k":"여러분"},"zy":"ㄉㄚˋ ㄐㄧㄚ"},{"w":"工作","py":"gōngzuò","m":{"j":"働く / 仕事","e":"work","k":"일하다"},"zy":"ㄍㄨㄥ ㄗㄨㄛˋ"},{"w":"喜歡","py":"xǐhuān","m":{"j":"好き","e":"to like","k":"좋아하다"},"zy":"ㄒㄧˇ ㄏㄨㄢ"},{"w":"名字","py":"míngzi","m":{"j":"名前","e":"name","k":"이름"},"zy":"ㄇㄧㄥˊ ㄗ˙"},{"w":"高興","py":"gāoxìng","m":{"j":"嬉しい","e":"happy / glad","k":"기쁘다"},"zy":"ㄍㄠ ㄒㄧㄥˋ"},{"w":"認識","py":"rènshì","m":{"j":"知り合う","e":"to know / meet","k":"알게 되다"},"zy":"ㄖㄣˋ ㄕˋ"}],"q":{"ask":{"j":"小明はどこで働いていますか？","e":"Where does Xiao Ming work?","k":"샤오밍은 어디에서 일하나요?"},"opts":[{"j":"台北","e":"Taipei","k":"타이베이"},{"j":"東京","e":"Tokyo","k":"도쿄"},{"j":"台南","e":"Tainan","k":"타이난"},{"j":"高雄","e":"Kaohsiung","k":"가오슝"}],"ans":0,"why":{"j":"本文に「我在台北工作」とあります。","e":"The text says he works in Taipei.","k":"본문에 '타이베이에서 일한다'고 나와요."}}}
];
if (typeof module !== "undefined") module.exports = { READING_L1 };
