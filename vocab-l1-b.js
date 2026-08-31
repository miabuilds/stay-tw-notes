// StayTW Study — TOCFL Level 1 (入門) 単語 追加分 B
// 形式: w=繁體字, py=拼音, zy=注音, c=品詞, m=訳(j/e/k), ex=例文(z/py/j/e/k)
const VOCAB_L1_B = [
// ── 人・家族 ──
{w:"阿姨",py:"āyí",zy:"ㄚ ㄧˊ",c:"名",m:{j:"おばさん（母方）・おばちゃん",e:"aunt (maternal); auntie",k:"이모, 아주머니"},ex:{z:"這位是我阿姨。",py:"Zhè wèi shì wǒ āyí.",j:"こちらは私のおばです。",e:"This is my aunt.",k:"이분은 제 이모입니다."}},
{w:"叔叔",py:"shúshu",zy:"ㄕㄨˊ ˙ㄕㄨ",c:"名",m:{j:"おじさん（父方）",e:"uncle (father's younger brother)",k:"삼촌, 아저씨"},ex:{z:"叔叔明天來我家。",py:"Shúshu míngtiān lái wǒ jiā.",j:"おじが明日うちに来ます。",e:"My uncle is coming to my place tomorrow.",k:"삼촌이 내일 우리 집에 옵니다."}},
{w:"外公",py:"wàigōng",zy:"ㄨㄞˋ ㄍㄨㄥ",c:"名",m:{j:"おじいさん（母方）",e:"grandfather (maternal)",k:"외할아버지"},ex:{z:"我外公住在台南。",py:"Wǒ wàigōng zhù zài Táinán.",j:"母方の祖父は台南に住んでいます。",e:"My grandfather lives in Tainan.",k:"외할아버지는 타이난에 사십니다."}},
{w:"外婆",py:"wàipó",zy:"ㄨㄞˋ ㄆㄛˊ",c:"名",m:{j:"おばあさん（母方）",e:"grandmother (maternal)",k:"외할머니"},ex:{z:"外婆很會做菜。",py:"Wàipó hěn huì zuò cài.",j:"祖母は料理がとても上手です。",e:"My grandmother cooks very well.",k:"외할머니는 요리를 아주 잘하십니다."}},
{w:"男生",py:"nánshēng",zy:"ㄋㄢˊ ㄕㄥ",c:"名",m:{j:"男子・男の子",e:"boy; guy",k:"남자, 남학생"},ex:{z:"那個男生是我同學。",py:"Nàge nánshēng shì wǒ tóngxué.",j:"あの男の子は私のクラスメートです。",e:"That guy is my classmate.",k:"저 남자애는 제 반 친구입니다."}},
{w:"女生",py:"nǚshēng",zy:"ㄋㄩˇ ㄕㄥ",c:"名",m:{j:"女子・女の子",e:"girl",k:"여자, 여학생"},ex:{z:"我們班有十個女生。",py:"Wǒmen bān yǒu shí ge nǚshēng.",j:"うちのクラスには女子が10人います。",e:"There are ten girls in our class.",k:"우리 반에는 여학생이 열 명 있습니다."}},
{w:"同事",py:"tóngshì",zy:"ㄊㄨㄥˊ ㄕˋ",c:"名",m:{j:"同僚",e:"colleague; coworker",k:"동료"},ex:{z:"他是我的同事。",py:"Tā shì wǒ de tóngshì.",j:"彼は私の同僚です。",e:"He is my colleague.",k:"그는 제 동료입니다."}},
// ── 体 ──
{w:"身體",py:"shēntǐ",zy:"ㄕㄣ ㄊㄧˇ",c:"名",m:{j:"体・体調",e:"body; health",k:"몸, 건강"},ex:{z:"我今天身體不舒服。",py:"Wǒ jīntiān shēntǐ bù shūfú.",j:"今日は体調が悪いです。",e:"I'm not feeling well today.",k:"오늘 몸이 안 좋아요."}},
{w:"肚子",py:"dùzi",zy:"ㄉㄨˋ ˙ㄗ",c:"名",m:{j:"お腹",e:"belly; stomach",k:"배"},ex:{z:"我肚子餓了。",py:"Wǒ dùzi è le.",j:"お腹がすきました。",e:"I'm hungry.",k:"배가 고파요."}},
{w:"牙齒",py:"yáchǐ",zy:"ㄧㄚˊ ㄔˇ",c:"名",m:{j:"歯",e:"teeth",k:"이, 치아"},ex:{z:"吃完飯要刷牙齒。",py:"Chī wán fàn yào shuā yáchǐ.",j:"食後は歯を磨きましょう。",e:"Brush your teeth after eating.",k:"밥 먹고 나서 이를 닦아야 해요."}},
// ── 色 ──
{w:"顏色",py:"yánsè",zy:"ㄧㄢˊ ㄙㄜˋ",c:"名",m:{j:"色",e:"color",k:"색, 색깔"},ex:{z:"你喜歡什麼顏色？",py:"Nǐ xǐhuān shénme yánsè?",j:"何色が好きですか。",e:"What color do you like?",k:"무슨 색을 좋아해요?"}},
{w:"粉紅色",py:"fěnhóngsè",zy:"ㄈㄣˇ ㄏㄨㄥˊ ㄙㄜˋ",c:"名",m:{j:"ピンク色",e:"pink",k:"분홍색"},ex:{z:"她的手機是粉紅色的。",py:"Tā de shǒujī shì fěnhóngsè de.",j:"彼女のスマホはピンクです。",e:"Her phone is pink.",k:"그녀의 휴대폰은 분홍색이에요."}},
{w:"灰色",py:"huīsè",zy:"ㄏㄨㄟ ㄙㄜˋ",c:"名",m:{j:"グレー・灰色",e:"gray",k:"회색"},ex:{z:"我買了一件灰色的衣服。",py:"Wǒ mǎi le yí jiàn huīsè de yīfú.",j:"グレーの服を1着買いました。",e:"I bought a gray piece of clothing.",k:"회색 옷을 한 벌 샀어요."}},
{w:"橘色",py:"júsè",zy:"ㄐㄩˊ ㄙㄜˋ",c:"名",m:{j:"オレンジ色",e:"orange (color)",k:"주황색"},ex:{z:"這個橘色的水果是什麼？",py:"Zhège júsè de shuǐguǒ shì shénme?",j:"このオレンジ色の果物は何ですか。",e:"What is this orange fruit?",k:"이 주황색 과일은 뭐예요?"}},
// ── 動詞 ──
{w:"睡覺",py:"shuìjiào",zy:"ㄕㄨㄟˋ ㄐㄧㄠˋ",c:"動",m:{j:"寝る・眠る",e:"to sleep",k:"자다"},ex:{z:"我每天晚上十一點睡覺。",py:"Wǒ měitiān wǎnshàng shíyī diǎn shuìjiào.",j:"毎晩11時に寝ます。",e:"I go to bed at eleven every night.",k:"저는 매일 밤 11시에 자요."}},
{w:"起床",py:"qǐchuáng",zy:"ㄑㄧˇ ㄔㄨㄤˊ",c:"動",m:{j:"起きる",e:"to get up",k:"일어나다"},ex:{z:"我早上六點半起床。",py:"Wǒ zǎoshang liù diǎn bàn qǐchuáng.",j:"朝6時半に起きます。",e:"I get up at six thirty in the morning.",k:"저는 아침 6시 반에 일어나요."}},
{w:"給",py:"gěi",zy:"ㄍㄟˇ",c:"動",m:{j:"あげる・くれる・渡す",e:"to give",k:"주다"},ex:{z:"這個給你。",py:"Zhège gěi nǐ.",j:"これあげるね。",e:"This is for you.",k:"이거 너 줄게."}},
{w:"站",py:"zhàn",zy:"ㄓㄢˋ",c:"動",m:{j:"立つ",e:"to stand",k:"서다"},ex:{z:"請不要站在門口。",py:"Qǐng búyào zhàn zài ménkǒu.",j:"入り口に立たないでください。",e:"Please don't stand in the doorway.",k:"출입구에 서 있지 마세요."}},
{w:"穿",py:"chuān",zy:"ㄔㄨㄢ",c:"動",m:{j:"着る・履く",e:"to wear (clothes, shoes)",k:"입다, 신다"},ex:{z:"今天很冷，多穿一點。",py:"Jīntiān hěn lěng, duō chuān yìdiǎn.",j:"今日は寒いから厚着してね。",e:"It's cold today, dress warmly.",k:"오늘 추우니까 옷을 좀 더 입어요."}},
{w:"唱歌",py:"chànggē",zy:"ㄔㄤˋ ㄍㄜ",c:"動",m:{j:"歌う",e:"to sing",k:"노래하다"},ex:{z:"她很喜歡唱歌。",py:"Tā hěn xǐhuān chànggē.",j:"彼女は歌うのが大好きです。",e:"She loves singing.",k:"그녀는 노래하는 걸 아주 좋아해요."}},
{w:"休息",py:"xiūxí",zy:"ㄒㄧㄡ ㄒㄧˊ",c:"動",m:{j:"休む・休憩する",e:"to rest",k:"쉬다"},ex:{z:"累了就休息一下。",py:"Lèi le jiù xiūxí yíxià.",j:"疲れたら少し休んでね。",e:"Rest a bit when you're tired.",k:"피곤하면 좀 쉬어요."}},
{w:"需要",py:"xūyào",zy:"ㄒㄩ ㄧㄠˋ",c:"動",m:{j:"必要とする・要る",e:"to need",k:"필요하다"},ex:{z:"你需要幫忙嗎？",py:"Nǐ xūyào bāngmáng ma?",j:"手伝いが必要ですか。",e:"Do you need help?",k:"도움이 필요해요?"}},
{w:"上班",py:"shàngbān",zy:"ㄕㄤˋ ㄅㄢ",c:"動",m:{j:"出勤する・仕事に行く",e:"to go to work",k:"출근하다"},ex:{z:"我明天要上班。",py:"Wǒ míngtiān yào shàngbān.",j:"明日は仕事です。",e:"I have to work tomorrow.",k:"저는 내일 출근해야 해요."}},
{w:"下班",py:"xiàbān",zy:"ㄒㄧㄚˋ ㄅㄢ",c:"動",m:{j:"退勤する・仕事が終わる",e:"to get off work",k:"퇴근하다"},ex:{z:"我六點下班。",py:"Wǒ liù diǎn xiàbān.",j:"6時に退勤します。",e:"I get off work at six.",k:"저는 6시에 퇴근해요."}},
{w:"覺得",py:"juéde",zy:"ㄐㄩㄝˊ ˙ㄉㄜ",c:"動",m:{j:"〜と思う・感じる",e:"to think; to feel",k:"~라고 생각하다, ~한 것 같다"},ex:{z:"我覺得這裡很漂亮。",py:"Wǒ juéde zhèlǐ hěn piàoliàng.",j:"ここはとてもきれいだと思います。",e:"I think it's very pretty here.",k:"여기 아주 예쁜 것 같아요."}},
{w:"開始",py:"kāishǐ",zy:"ㄎㄞ ㄕˇ",c:"動",m:{j:"始まる・始める",e:"to start; to begin",k:"시작하다"},ex:{z:"電影幾點開始？",py:"Diànyǐng jǐ diǎn kāishǐ?",j:"映画は何時に始まりますか。",e:"What time does the movie start?",k:"영화는 몇 시에 시작해요?"}},
// ── 形容詞 ──
{w:"少",py:"shǎo",zy:"ㄕㄠˇ",c:"形",m:{j:"少ない",e:"few; little",k:"적다"},ex:{z:"今天客人很少。",py:"Jīntiān kèrén hěn shǎo.",j:"今日はお客さんが少ないです。",e:"There are few customers today.",k:"오늘은 손님이 적어요."}},
{w:"舊",py:"jiù",zy:"ㄐㄧㄡˋ",c:"形",m:{j:"古い（物）",e:"old (of things)",k:"낡다, 오래되다"},ex:{z:"這支手機太舊了。",py:"Zhè zhī shǒujī tài jiù le.",j:"このスマホは古すぎます。",e:"This phone is too old.",k:"이 휴대폰은 너무 낡았어요."}},
{w:"難",py:"nán",zy:"ㄋㄢˊ",c:"形",m:{j:"難しい",e:"difficult; hard",k:"어렵다"},ex:{z:"這個字很難寫。",py:"Zhège zì hěn nán xiě.",j:"この字は書くのが難しいです。",e:"This character is hard to write.",k:"이 글자는 쓰기 어려워요."}},
{w:"容易",py:"róngyì",zy:"ㄖㄨㄥˊ ㄧˋ",c:"形",m:{j:"簡単・〜しやすい",e:"easy",k:"쉽다"},ex:{z:"這個問題很容易。",py:"Zhège wèntí hěn róngyì.",j:"この問題は簡単です。",e:"This question is easy.",k:"이 문제는 쉬워요."}},
{w:"乾淨",py:"gānjìng",zy:"ㄍㄢ ㄐㄧㄥˋ",c:"形",m:{j:"清潔・きれい",e:"clean",k:"깨끗하다"},ex:{z:"這家餐廳很乾淨。",py:"Zhè jiā cāntīng hěn gānjìng.",j:"このレストランはとても清潔です。",e:"This restaurant is very clean.",k:"이 식당은 아주 깨끗해요."}},
{w:"髒",py:"zāng",zy:"ㄗㄤ",c:"形",m:{j:"汚い",e:"dirty",k:"더럽다"},ex:{z:"你的鞋子好髒。",py:"Nǐ de xiézi hǎo zāng.",j:"靴がすごく汚いよ。",e:"Your shoes are so dirty.",k:"네 신발 정말 더럽다."}},
{w:"舒服",py:"shūfú",zy:"ㄕㄨ ㄈㄨˊ",c:"形",m:{j:"快適・気持ちいい",e:"comfortable",k:"편안하다"},ex:{z:"這張床很舒服。",py:"Zhè zhāng chuáng hěn shūfú.",j:"このベッドはとても快適です。",e:"This bed is very comfortable.",k:"이 침대는 아주 편안해요."}},
{w:"可愛",py:"kě'ài",zy:"ㄎㄜˇ ㄞˋ",c:"形",m:{j:"かわいい",e:"cute",k:"귀엽다"},ex:{z:"你家的貓好可愛！",py:"Nǐ jiā de māo hǎo kě'ài!",j:"おうちの猫、すごくかわいい！",e:"Your cat is so cute!",k:"너희 집 고양이 정말 귀엽다!"}},
// ── 時間・季節 ──
{w:"夏天",py:"xiàtiān",zy:"ㄒㄧㄚˋ ㄊㄧㄢ",c:"名",m:{j:"夏",e:"summer",k:"여름"},ex:{z:"台灣的夏天又熱又濕。",py:"Táiwān de xiàtiān yòu rè yòu shī.",j:"台湾の夏は暑くて湿気が多いです。",e:"Summer in Taiwan is hot and humid.",k:"대만의 여름은 덥고 습해요."}},
{w:"冬天",py:"dōngtiān",zy:"ㄉㄨㄥ ㄊㄧㄢ",c:"名",m:{j:"冬",e:"winter",k:"겨울"},ex:{z:"台北的冬天常常下雨。",py:"Táiběi de dōngtiān chángcháng xiàyǔ.",j:"台北の冬はよく雨が降ります。",e:"Winters in Taipei are often rainy.",k:"타이베이의 겨울은 자주 비가 와요."}},
{w:"小時",py:"xiǎoshí",zy:"ㄒㄧㄠˇ ㄕˊ",c:"名",m:{j:"〜時間（単位）",e:"hour",k:"시간 (단위)"},ex:{z:"我等了一個小時。",py:"Wǒ děng le yí ge xiǎoshí.",j:"1時間待ちました。",e:"I waited for an hour.",k:"한 시간 기다렸어요."}},
{w:"以前",py:"yǐqián",zy:"ㄧˇ ㄑㄧㄢˊ",c:"名",m:{j:"以前・昔",e:"before; in the past",k:"예전, 전에"},ex:{z:"我以前住在日本。",py:"Wǒ yǐqián zhù zài Rìběn.",j:"昔は日本に住んでいました。",e:"I used to live in Japan.",k:"저는 예전에 일본에 살았어요."}},
{w:"以後",py:"yǐhòu",zy:"ㄧˇ ㄏㄡˋ",c:"名",m:{j:"以後・これから",e:"after; later",k:"이후, 나중에"},ex:{z:"吃飯以後我要休息。",py:"Chīfàn yǐhòu wǒ yào xiūxí.",j:"ご飯のあと、休みます。",e:"After eating I'll rest.",k:"밥 먹고 나서 쉴 거예요."}},
// ── 天気 ──
{w:"天氣",py:"tiānqì",zy:"ㄊㄧㄢ ㄑㄧˋ",c:"名",m:{j:"天気",e:"weather",k:"날씨"},ex:{z:"今天天氣怎麼樣？",py:"Jīntiān tiānqì zěnmeyàng?",j:"今日の天気はどうですか。",e:"How's the weather today?",k:"오늘 날씨 어때요?"}},
{w:"下雨",py:"xiàyǔ",zy:"ㄒㄧㄚˋ ㄩˇ",c:"動",m:{j:"雨が降る",e:"to rain",k:"비가 오다"},ex:{z:"下雨了，我們坐計程車吧。",py:"Xiàyǔ le, wǒmen zuò jìchéngchē ba.",j:"雨が降ってきた、タクシーで行こう。",e:"It's raining, let's take a taxi.",k:"비가 오네요, 택시 타요."}},
{w:"風",py:"fēng",zy:"ㄈㄥ",c:"名",m:{j:"風",e:"wind",k:"바람"},ex:{z:"今天風很大。",py:"Jīntiān fēng hěn dà.",j:"今日は風が強いです。",e:"It's very windy today.",k:"오늘 바람이 세요."}},
{w:"雲",py:"yún",zy:"ㄩㄣˊ",c:"名",m:{j:"雲",e:"cloud",k:"구름"},ex:{z:"今天沒有雲，天氣很好。",py:"Jīntiān méiyǒu yún, tiānqì hěn hǎo.",j:"今日は雲がなくていい天気です。",e:"There are no clouds today; the weather is nice.",k:"오늘은 구름이 없고 날씨가 좋아요."}},
{w:"颱風",py:"táifēng",zy:"ㄊㄞˊ ㄈㄥ",c:"名",m:{j:"台風",e:"typhoon",k:"태풍"},ex:{z:"明天有颱風，不用上班。",py:"Míngtiān yǒu táifēng, búyòng shàngbān.",j:"明日は台風で仕事が休みです。",e:"There's a typhoon tomorrow, so no work.",k:"내일 태풍이라 출근 안 해요."}},
// ── 食べ物 ──
{w:"肉",py:"ròu",zy:"ㄖㄡˋ",c:"名",m:{j:"肉",e:"meat",k:"고기"},ex:{z:"我不吃肉。",py:"Wǒ bù chī ròu.",j:"私は肉を食べません。",e:"I don't eat meat.",k:"저는 고기를 안 먹어요."}},
{w:"便當",py:"biàndāng",zy:"ㄅㄧㄢˋ ㄉㄤ",c:"名",m:{j:"お弁当",e:"lunchbox; bento",k:"도시락"},ex:{z:"中午我買了一個便當。",py:"Zhōngwǔ wǒ mǎi le yí ge biàndāng.",j:"昼にお弁当を1つ買いました。",e:"I bought a lunchbox at noon.",k:"점심에 도시락을 하나 샀어요."}},
{w:"鳳梨",py:"fènglí",zy:"ㄈㄥˋ ㄌㄧˊ",c:"名",m:{j:"パイナップル",e:"pineapple",k:"파인애플"},ex:{z:"台灣的鳳梨很甜。",py:"Táiwān de fènglí hěn tián.",j:"台湾のパイナップルはとても甘いです。",e:"Taiwanese pineapples are very sweet.",k:"대만 파인애플은 아주 달아요."}},
{w:"番茄",py:"fānqié",zy:"ㄈㄢ ㄑㄧㄝˊ",c:"名",m:{j:"トマト",e:"tomato",k:"토마토"},ex:{z:"我喜歡吃番茄。",py:"Wǒ xǐhuān chī fānqié.",j:"トマトを食べるのが好きです。",e:"I like eating tomatoes.",k:"저는 토마토를 즐겨 먹어요."}},
{w:"冰淇淋",py:"bīngqílín",zy:"ㄅㄧㄥ ㄑㄧˊ ㄌㄧㄣˊ",c:"名",m:{j:"アイスクリーム",e:"ice cream",k:"아이스크림"},ex:{z:"夏天我最愛吃冰淇淋。",py:"Xiàtiān wǒ zuì ài chī bīngqílín.",j:"夏はアイスクリームが一番好きです。",e:"I love ice cream most in summer.",k:"여름엔 아이스크림이 제일 좋아요."}},
{w:"甜點",py:"tiándiǎn",zy:"ㄊㄧㄢˊ ㄉㄧㄢˇ",c:"名",m:{j:"デザート・スイーツ",e:"dessert; sweets",k:"디저트, 후식"},ex:{z:"吃完飯還想吃甜點。",py:"Chī wán fàn hái xiǎng chī tiándiǎn.",j:"食後にデザートも食べたいです。",e:"I still want dessert after the meal.",k:"밥 먹고 나서도 디저트가 먹고 싶어요."}},
{w:"鹹酥雞",py:"xiánsūjī",zy:"ㄒㄧㄢˊ ㄙㄨ ㄐㄧ",c:"名",m:{j:"塩から揚げ（台湾の屋台料理）",e:"Taiwanese salty crispy chicken",k:"대만식 닭튀김 (옌수지)"},ex:{z:"晚上我想吃鹹酥雞。",py:"Wǎnshàng wǒ xiǎng chī xiánsūjī.",j:"夜に塩から揚げが食べたいです。",e:"I want salty crispy chicken tonight.",k:"저녁에 옌수지가 먹고 싶어요."}},
// ── 場所 ──
{w:"房間",py:"fángjiān",zy:"ㄈㄤˊ ㄐㄧㄢ",c:"名",m:{j:"部屋",e:"room",k:"방"},ex:{z:"我的房間很小。",py:"Wǒ de fángjiān hěn xiǎo.",j:"私の部屋は小さいです。",e:"My room is small.",k:"제 방은 작아요."}},
{w:"市場",py:"shìchǎng",zy:"ㄕˋ ㄔㄤˇ",c:"名",m:{j:"市場",e:"market",k:"시장"},ex:{z:"媽媽早上去市場買菜。",py:"Māma zǎoshang qù shìchǎng mǎi cài.",j:"母は朝、市場へ買い物に行きます。",e:"Mom goes to the market to buy groceries in the morning.",k:"엄마는 아침에 시장에 장 보러 가요."}},
{w:"廚房",py:"chúfáng",zy:"ㄔㄨˊ ㄈㄤˊ",c:"名",m:{j:"キッチン・台所",e:"kitchen",k:"부엌, 주방"},ex:{z:"爸爸在廚房做飯。",py:"Bàba zài chúfáng zuò fàn.",j:"父は台所で料理しています。",e:"Dad is cooking in the kitchen.",k:"아빠가 부엌에서 밥을 해요."}},
{w:"辦公室",py:"bàngōngshì",zy:"ㄅㄢˋ ㄍㄨㄥ ㄕˋ",c:"名",m:{j:"オフィス・事務室",e:"office",k:"사무실"},ex:{z:"我的辦公室在三樓。",py:"Wǒ de bàngōngshì zài sān lóu.",j:"私のオフィスは3階です。",e:"My office is on the third floor.",k:"제 사무실은 3층에 있어요."}},
{w:"附近",py:"fùjìn",zy:"ㄈㄨˋ ㄐㄧㄣˋ",c:"名",m:{j:"近く・付近",e:"nearby; vicinity",k:"근처"},ex:{z:"附近有便利商店嗎？",py:"Fùjìn yǒu biànlì shāngdiàn ma?",j:"近くにコンビニはありますか。",e:"Is there a convenience store nearby?",k:"근처에 편의점 있어요?"}},
{w:"房子",py:"fángzi",zy:"ㄈㄤˊ ˙ㄗ",c:"名",m:{j:"家・住宅",e:"house",k:"집 (건물)"},ex:{z:"這間房子很漂亮。",py:"Zhè jiān fángzi hěn piàoliàng.",j:"この家はとてもきれいです。",e:"This house is very beautiful.",k:"이 집은 아주 예뻐요."}},
// ── 量詞 ──
{w:"張",py:"zhāng",zy:"ㄓㄤ",c:"量",m:{j:"〜枚（平たい物）",e:"(measure word for flat objects)",k:"~장"},ex:{z:"我要買兩張高鐵票。",py:"Wǒ yào mǎi liǎng zhāng gāotiě piào.",j:"高鉄の切符を2枚買いたいです。",e:"I want to buy two HSR tickets.",k:"고속철도 표 두 장 사고 싶어요."}},
{w:"件",py:"jiàn",zy:"ㄐㄧㄢˋ",c:"量",m:{j:"〜着・〜件（服・事柄）",e:"(measure word for clothes, matters)",k:"~벌, ~건"},ex:{z:"這件衣服多少錢？",py:"Zhè jiàn yīfú duōshǎo qián?",j:"この服はいくらですか。",e:"How much is this piece of clothing?",k:"이 옷은 얼마예요?"}},
{w:"雙",py:"shuāng",zy:"ㄕㄨㄤ",c:"量",m:{j:"〜足・〜組（対の物）",e:"pair (of)",k:"~켤레, ~쌍"},ex:{z:"我想買一雙鞋子。",py:"Wǒ xiǎng mǎi yì shuāng xiézi.",j:"靴を一足買いたいです。",e:"I want to buy a pair of shoes.",k:"신발 한 켤레 사고 싶어요."}},
{w:"碗",py:"wǎn",zy:"ㄨㄢˇ",c:"量",m:{j:"〜杯（丼・碗）",e:"bowl (of)",k:"~그릇"},ex:{z:"老闆，我要一碗麵。",py:"Lǎobǎn, wǒ yào yì wǎn miàn.",j:"すみません、麺を一杯ください。",e:"Boss, I'd like a bowl of noodles.",k:"사장님, 국수 한 그릇 주세요."}},
// ── 方向・位置 ──
{w:"前面",py:"qiánmiàn",zy:"ㄑㄧㄢˊ ㄇㄧㄢˋ",c:"名",m:{j:"前・前方",e:"front; ahead",k:"앞"},ex:{z:"車站就在前面。",py:"Chēzhàn jiù zài qiánmiàn.",j:"駅はすぐ前です。",e:"The station is right ahead.",k:"역은 바로 앞에 있어요."}},
{w:"後面",py:"hòumiàn",zy:"ㄏㄡˋ ㄇㄧㄢˋ",c:"名",m:{j:"後ろ・後方",e:"back; behind",k:"뒤"},ex:{z:"廁所在餐廳的後面。",py:"Cèsuǒ zài cāntīng de hòumiàn.",j:"トイレはレストランの後ろにあります。",e:"The restroom is behind the restaurant.",k:"화장실은 식당 뒤에 있어요."}},
{w:"裡面",py:"lǐmiàn",zy:"ㄌㄧˇ ㄇㄧㄢˋ",c:"名",m:{j:"中・内側",e:"inside",k:"안"},ex:{z:"房間裡面很暗。",py:"Fángjiān lǐmiàn hěn àn.",j:"部屋の中は暗いです。",e:"It's dark inside the room.",k:"방 안은 어두워요."}},
{w:"外面",py:"wàimiàn",zy:"ㄨㄞˋ ㄇㄧㄢˋ",c:"名",m:{j:"外・外側",e:"outside",k:"밖"},ex:{z:"外面在下雨。",py:"Wàimiàn zài xiàyǔ.",j:"外は雨が降っています。",e:"It's raining outside.",k:"밖에 비가 와요."}},
{w:"旁邊",py:"pángbiān",zy:"ㄆㄤˊ ㄅㄧㄢ",c:"名",m:{j:"そば・隣",e:"beside; next to",k:"옆"},ex:{z:"銀行在郵局旁邊。",py:"Yínháng zài yóujú pángbiān.",j:"銀行は郵便局の隣です。",e:"The bank is next to the post office.",k:"은행은 우체국 옆에 있어요."}},
// ── 日用品 ──
{w:"手機",py:"shǒujī",zy:"ㄕㄡˇ ㄐㄧ",c:"名",m:{j:"携帯電話・スマホ",e:"mobile phone",k:"휴대폰"},ex:{z:"我的手機沒電了。",py:"Wǒ de shǒujī méi diàn le.",j:"スマホの電池が切れました。",e:"My phone is out of battery.",k:"휴대폰 배터리가 다 됐어요."}},
{w:"電腦",py:"diànnǎo",zy:"ㄉㄧㄢˋ ㄋㄠˇ",c:"名",m:{j:"パソコン・コンピューター",e:"computer",k:"컴퓨터"},ex:{z:"我用電腦工作。",py:"Wǒ yòng diànnǎo gōngzuò.",j:"パソコンで仕事をします。",e:"I work on a computer.",k:"저는 컴퓨터로 일해요."}},
{w:"電視",py:"diànshì",zy:"ㄉㄧㄢˋ ㄕˋ",c:"名",m:{j:"テレビ",e:"television; TV",k:"텔레비전"},ex:{z:"晚上我喜歡看電視。",py:"Wǎnshàng wǒ xǐhuān kàn diànshì.",j:"夜はテレビを見るのが好きです。",e:"I like watching TV in the evening.",k:"저녁에 텔레비전 보는 걸 좋아해요."}},
{w:"衣服",py:"yīfú",zy:"ㄧ ㄈㄨˊ",c:"名",m:{j:"服・衣類",e:"clothes",k:"옷"},ex:{z:"這件衣服很漂亮。",py:"Zhè jiàn yīfú hěn piàoliàng.",j:"この服はとてもきれいです。",e:"These clothes are very pretty.",k:"이 옷은 아주 예뻐요."}},
{w:"鞋子",py:"xiézi",zy:"ㄒㄧㄝˊ ˙ㄗ",c:"名",m:{j:"靴",e:"shoes",k:"신발"},ex:{z:"進門前要脫鞋子。",py:"Jìn mén qián yào tuō xiézi.",j:"家に入る前に靴を脱ぎます。",e:"Take off your shoes before entering.",k:"들어가기 전에 신발을 벗어요."}},
];
if (typeof module !== "undefined") module.exports = { VOCAB_L1_B };
