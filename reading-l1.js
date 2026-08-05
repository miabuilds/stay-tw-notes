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
];
if (typeof module !== "undefined") module.exports = { READING_L1 };
