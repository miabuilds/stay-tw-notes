// StayTW Study — 分級閲讀 L3（中級／TOCFL intermediate・繁体字＋注音＋拼音）
// 形式: level, title{j,e,k}, lines[{z,zy,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], q{ask{j,e,k},opts[{j,e,k}],ans,why{j,e,k}}
// 音声は各 line.z を TTS で読み上げ（事前生成 mp3 があれば高音質、無ければ端末音声）。
const READING_L3 = [
{
  id:"seeing-doctor-symptoms", level:"l3",
  title:{ j:"病院で症状を伝える", e:"Describing Symptoms at the Doctor", k:"병원에서 증상 설명하기" },
  lines:[
    { z:"雅婷這幾天覺得很不舒服，所以下班後去診所看醫生。", zy:"ㄧㄚˇ ㄊㄧㄥˊ ㄓㄜˋ ㄐㄧˇ ㄊㄧㄢ", py:"Yǎtíng zhè jǐ tiān juéde hěn bù shūfú, suǒyǐ xiàbān hòu qù zhěnsuǒ kàn yīshēng.", m:{ j:"ヤーティンはここ数日ずっと体調が悪いので、仕事帰りに診療所へ医者にかかりに行きました。", e:"Yating has been feeling unwell for the past few days, so after work she goes to a clinic to see a doctor.", k:"야팅은 요 며칠 몸이 안 좋아서 퇴근 후 병원에 진료를 받으러 갔습니다." } },
    { z:"她先到櫃台掛號，並且拿出健保卡給護理師。", py:"Tā xiān dào guìtái guàhào, bìngqiě náchū jiànbǎokǎ gěi hùlǐshī.", m:{ j:"彼女はまず受付で受付手続きをし、健康保険証を看護師に渡します。", e:"She first registers at the counter and hands her National Health Insurance card to the nurse.", k:"그녀는 먼저 접수처에서 접수하고 건강보험카드를 간호사에게 건넵니다." } },
    { z:"輪到她的時候，醫生問：「妳哪裡不舒服？」", py:"Lún dào tā de shíhòu, yīshēng wèn: “Nǐ nǎlǐ bù shūfú?”", m:{ j:"彼女の番になると、医者が尋ねます。「どこが具合悪いですか？」", e:"When it's her turn, the doctor asks: \"Where do you feel unwell?\"", k:"그녀 차례가 되자 의사가 묻습니다. \"어디가 불편하세요?\"" } },
    { z:"「我從昨天開始就一直喉嚨痛，還有一點發燒。」", py:"“Wǒ cóng zuótiān kāishǐ jiù yìzhí hóulóng tòng, hái yǒu yìdiǎn fāshāo.”", m:{ j:"「昨日からずっと喉が痛くて、少し熱もあるんです。」", e:"\"Since yesterday I've had a constant sore throat, and a slight fever too.\"", k:"\"어제부터 계속 목이 아프고, 열도 조금 있어요.\"" } },
    { z:"「雖然不是很嚴重，但是最好多休息、多喝水。」", py:"“Suīrán bú shì hěn yánzhòng, dànshì zuìhǎo duō xiūxí, duō hē shuǐ.”", m:{ j:"「あまり重くはないですが、しっかり休んで水をたくさん飲むのが一番です。」", e:"\"Although it's not serious, you'd best rest more and drink plenty of water.\"", k:"\"심하진 않지만, 푹 쉬고 물을 많이 마시는 게 좋아요.\"" } },
    { z:"醫生開了三天的藥，並提醒她如果沒好轉就要再回診。", py:"Yīshēng kāile sān tiān de yào, bìng tíxǐng tā rúguǒ méi hǎozhuǎn jiù yào zài huízhěn.", m:{ j:"医者は三日分の薬を出し、良くならなければまた再診に来るよう念を押します。", e:"The doctor prescribes three days of medicine and reminds her to come back if she doesn't improve.", k:"의사는 사흘치 약을 처방하고, 나아지지 않으면 다시 진료받으러 오라고 당부합니다." } },
    { z:"領完藥後，雅婷覺得有健保真的方便多了。", py:"Lǐng wán yào hòu, Yǎtíng juéde yǒu jiànbǎo zhēnde fāngbiàn duō le.", m:{ j:"薬を受け取った後、ヤーティンは健康保険があると本当にずっと便利だと感じます。", e:"After picking up her medicine, Yating feels that having health insurance really makes things much easier.", k:"약을 받은 뒤, 야팅은 건강보험이 있으니 정말 훨씬 편하다고 느낍니다." } },
  ],
  vocab:[
    { w:"不舒服", zy:"ㄅㄨˋ ㄕㄨ ㄈㄨˊ", py:"bù shūfú", m:{ j:"体調が悪い", e:"to feel unwell", k:"몸이 안 좋다" } },
    { w:"診所", zy:"ㄓㄣˇ ㄙㄨㄛˇ", py:"zhěnsuǒ", m:{ j:"診療所・クリニック", e:"clinic", k:"의원·병원" } },
    { w:"掛號", zy:"ㄍㄨㄚˋ ㄏㄠˋ", py:"guàhào", m:{ j:"（病院の）受付手続き", e:"to register (at a hospital)", k:"접수(하다)" } },
    { w:"健保卡", zy:"ㄐㄧㄢˋ ㄅㄠˇ ㄎㄚˇ", py:"jiànbǎokǎ", m:{ j:"健康保険証（台湾の全民健保カード）", e:"National Health Insurance card", k:"건강보험카드" } },
    { w:"喉嚨痛", zy:"ㄏㄡˊ ㄌㄨㄥˊ ㄊㄨㄥˋ", py:"hóulóng tòng", m:{ j:"喉が痛い", e:"sore throat", k:"목이 아프다" } },
    { w:"發燒", zy:"ㄈㄚ ㄕㄠ", py:"fāshāo", m:{ j:"熱が出る", e:"to have a fever", k:"열이 나다" } },
    { w:"嚴重", zy:"ㄧㄢˊ ㄓㄨㄥˋ", py:"yánzhòng", m:{ j:"深刻な・重い", e:"serious, severe", k:"심각하다" } },
    { w:"回診", zy:"ㄏㄨㄟˊ ㄓㄣˇ", py:"huízhěn", m:{ j:"再診に来る", e:"to return for a follow-up visit", k:"재진하다·다시 진료받다" } },
  ],
  q:{
    ask:{ j:"医者はヤーティンにどうするよう勧めましたか？", e:"What did the doctor advise Yating to do?", k:"의사는 야팅에게 무엇을 하라고 권했나요?" },
    opts:[ { j:"よく休んで水をたくさん飲む", e:"Rest more and drink plenty of water", k:"푹 쉬고 물을 많이 마시기" }, { j:"すぐに入院する", e:"Be hospitalized right away", k:"바로 입원하기" }, { j:"運動を増やす", e:"Exercise more", k:"운동을 늘리기" } ],
    ans:0,
    why:{ j:"「最好多休息、多喝水」＝よく休んで水をたくさん飲むのが一番、と勧めています。", e:"\"最好多休息、多喝水\" = it's best to rest more and drink plenty of water.", k:"\"最好多休息、多喝水\" = 푹 쉬고 물을 많이 마시는 게 좋다고 권했어요." }
  }
},
{
  id:"job-interview", level:"l3",
  title:{ j:"就職の面接", e:"A Job Interview", k:"취업 면접" },
  lines:[
    { z:"志豪應徵一家貿易公司的業務工作，今天是面試的日子。", zy:"ㄓˋ ㄏㄠˊ ㄧㄥˋ ㄓㄥ", py:"Zhìháo yìngzhēng yì jiā màoyì gōngsī de yèwù gōngzuò, jīntiān shì miànshì de rìzi.", m:{ j:"ジーハオはある貿易会社の営業職に応募し、今日は面接の日です。", e:"Zhihao is applying for a sales job at a trading company, and today is his interview.", k:"즈하오는 한 무역 회사의 영업직에 지원했고, 오늘이 면접 날입니다." } },
    { z:"他提早十五分鐘到，穿著整齊的西裝，看起來很有精神。", py:"Tā tízǎo shíwǔ fēnzhōng dào, chuānzhe zhěngqí de xīzhuāng, kàn qǐlái hěn yǒu jīngshén.", m:{ j:"彼は15分早く着き、きちんとしたスーツを着て、とても元気そうに見えます。", e:"He arrives fifteen minutes early, wearing a neat suit and looking full of energy.", k:"그는 15분 일찍 도착했고, 단정한 정장을 입어 아주 활기차 보입니다." } },
    { z:"面試官問：「請你簡單自我介紹，並說說你的優點。」", py:"Miànshìguān wèn: “Qǐng nǐ jiǎndān zìwǒ jièshào, bìng shuōshuo nǐ de yōudiǎn.”", m:{ j:"面接官が尋ねます。「簡単に自己紹介をして、あなたの長所を話してください。」", e:"The interviewer asks: \"Please introduce yourself briefly and tell us your strengths.\"", k:"면접관이 묻습니다. \"간단히 자기소개를 하고, 본인의 장점을 말해 주세요.\"" } },
    { z:"「我不但抗壓性強，而且很願意學習新的東西。」", py:"“Wǒ búdàn kàngyā xìng qiáng, érqiě hěn yuànyì xuéxí xīn de dōngxī.”", m:{ j:"「私はストレス耐性が強いだけでなく、新しいことを学ぶ意欲もあります。」", e:"\"Not only do I handle pressure well, but I'm also very willing to learn new things.\"", k:"\"저는 스트레스에 강할 뿐 아니라, 새로운 것을 배우는 데도 매우 적극적입니다.\"" } },
    { z:"「如果有機會進入貴公司，我一定會全力以赴。」", py:"“Rúguǒ yǒu jīhuì jìnrù guì gōngsī, wǒ yídìng huì quánlì yǐfù.”", m:{ j:"「もし御社に入る機会があれば、必ず全力を尽くします。」", e:"\"If I have the chance to join your company, I will definitely give it my all.\"", k:"\"만약 귀사에 들어갈 기회가 있다면, 반드시 최선을 다하겠습니다.\"" } },
    { z:"面試官點點頭，接著問他對薪水和加班有什麼看法。", py:"Miànshìguān diǎndiǎn tóu, jiēzhe wèn tā duì xīnshuǐ hé jiābān yǒu shénme kànfǎ.", m:{ j:"面接官はうなずき、続いて給料や残業についてどう考えるか尋ねます。", e:"The interviewer nods, then asks his views on salary and overtime.", k:"면접관은 고개를 끄덕이고, 이어서 급여와 야근에 대한 생각을 묻습니다." } },
    { z:"面試結束後，公司說一個星期內會通知結果。", py:"Miànshì jiéshù hòu, gōngsī shuō yí ge xīngqí nèi huì tōngzhī jiéguǒ.", m:{ j:"面接が終わると、会社は一週間以内に結果を知らせると言います。", e:"After the interview, the company says they will notify him of the result within a week.", k:"면접이 끝난 뒤, 회사는 일주일 안에 결과를 알려 주겠다고 합니다." } },
    { z:"志豪覺得表現得還不錯，心裡充滿了期待。", py:"Zhìháo juéde biǎoxiàn de hái búcuò, xīnlǐ chōngmǎnle qídài.", m:{ j:"ジーハオはまずまずの出来だったと感じ、心は期待でいっぱいです。", e:"Zhihao feels he did fairly well, and his heart is full of anticipation.", k:"즈하오는 꽤 잘한 것 같아서, 마음이 기대로 가득 찼습니다." } },
  ],
  vocab:[
    { w:"應徵", zy:"ㄧㄥˋ ㄓㄥ", py:"yìngzhēng", m:{ j:"（仕事に）応募する", e:"to apply for (a job)", k:"지원하다·응모하다" } },
    { w:"面試", zy:"ㄇㄧㄢˋ ㄕˋ", py:"miànshì", m:{ j:"面接", e:"job interview", k:"면접" } },
    { w:"自我介紹", zy:"ㄗˋ ㄨㄛˇ ㄐㄧㄝˋ ㄕㄠˋ", py:"zìwǒ jièshào", m:{ j:"自己紹介", e:"self-introduction", k:"자기소개" } },
    { w:"優點", zy:"ㄧㄡ ㄉㄧㄢˇ", py:"yōudiǎn", m:{ j:"長所・強み", e:"strength, merit", k:"장점" } },
    { w:"抗壓性", zy:"ㄎㄤˋ ㄧㄚ ㄒㄧㄥˋ", py:"kàngyā xìng", m:{ j:"ストレス耐性", e:"ability to handle pressure", k:"스트레스 내성" } },
    { w:"全力以赴", zy:"ㄑㄩㄢˊ ㄌㄧˋ ㄧˇ ㄈㄨˋ", py:"quánlì yǐfù", m:{ j:"全力を尽くす", e:"to give one's all", k:"최선을 다하다" } },
    { w:"薪水", zy:"ㄒㄧㄣ ㄕㄨㄟˇ", py:"xīnshuǐ", m:{ j:"給料", e:"salary", k:"급여·월급" } },
    { w:"加班", zy:"ㄐㄧㄚ ㄅㄢ", py:"jiābān", m:{ j:"残業", e:"to work overtime", k:"야근·잔업" } },
  ],
  q:{
    ask:{ j:"ジーハオは自分の長所として何を挙げましたか？", e:"What did Zhihao give as his strengths?", k:"즈하오는 자신의 장점으로 무엇을 들었나요?" },
    opts:[ { j:"ストレスに強く、学ぶ意欲がある", e:"Handles pressure well and is willing to learn", k:"스트레스에 강하고 배우려는 의욕이 있음" }, { j:"英語がとても上手", e:"Very good at English", k:"영어를 아주 잘함" }, { j:"経験が10年ある", e:"Has ten years of experience", k:"경력이 10년 있음" } ],
    ans:0,
    why:{ j:"「不但抗壓性強，而且很願意學習」＝ストレス耐性が強く、学ぶ意欲もある、と述べています。", e:"\"不但抗壓性強，而且很願意學習\" = both handles pressure well and is willing to learn.", k:"\"不但抗壓性強，而且很願意學習\" = 스트레스에 강하고 배우려는 의욕도 있다고 말했어요." }
  }
},
{
  id:"typhoon-day", level:"l3",
  title:{ j:"台風の日の備えと対応", e:"Preparing for a Typhoon Day", k:"태풍의 날 대비와 대응" },
  lines:[
    { z:"氣象局說，一個強烈颱風正在接近台灣，週末可能會登陸。", zy:"ㄑㄧˋ ㄒㄧㄤˋ ㄐㄩˊ", py:"Qìxiàngjú shuō, yí ge qiángliè táifēng zhèngzài jiējìn Táiwān, zhōumò kěnéng huì dēnglù.", m:{ j:"気象局によると、強い台風が台湾に接近しており、週末に上陸する可能性があります。", e:"The weather bureau says a strong typhoon is approaching Taiwan and may make landfall this weekend.", k:"기상청은 강한 태풍이 대만에 접근 중이며 주말에 상륙할 수 있다고 밝혔습니다." } },
    { z:"美惠趕在颱風來之前，去超市買了泡麵、麵包和飲用水。", py:"Měihuì gǎn zài táifēng lái zhīqián, qù chāoshì mǎile pàomiàn, miànbāo hé yǐnyòngshuǐ.", m:{ j:"メイフイは台風が来る前に、スーパーでインスタントラーメン、パン、飲料水を買っておきます。", e:"Meihui rushes to the supermarket before the typhoon and buys instant noodles, bread, and drinking water.", k:"메이후이는 태풍이 오기 전에 서둘러 마트에서 라면, 빵, 마실 물을 사 둡니다." } },
    { z:"她也把陽台的花盆搬進屋內，以免被強風吹倒。", py:"Tā yě bǎ yángtái de huāpén bān jìn wū nèi, yǐmiǎn bèi qiángfēng chuīdǎo.", m:{ j:"彼女はベランダの植木鉢も、強風で倒されないように部屋の中へ運び入れます。", e:"She also moves the flowerpots from the balcony indoors so the strong wind won't blow them over.", k:"그녀는 베란다의 화분도 강풍에 쓰러지지 않도록 집 안으로 옮깁니다." } },
    { z:"晚上，市政府宣布明天停班停課，大家都鬆了一口氣。", py:"Wǎnshàng, shìzhèngfǔ xuānbù míngtiān tíngbān tíngkè, dàjiā dōu sōngle yì kǒu qì.", m:{ j:"夜、市政府が明日の会社・学校休みを発表し、みんなほっと一息つきます。", e:"That night, the city government announces work and classes are canceled tomorrow, and everyone feels relieved.", k:"밤에 시청이 내일 휴무·휴교를 발표하자, 모두 안도의 한숨을 내쉽니다." } },
    { z:"颱風那天，外面風雨很大，路上幾乎沒有人。", py:"Táifēng nà tiān, wàimiàn fēngyǔ hěn dà, lùshàng jīhū méiyǒu rén.", m:{ j:"台風の日、外は風雨が激しく、道にはほとんど人がいません。", e:"On the day of the typhoon, the wind and rain outside are fierce, and there's almost no one on the streets.", k:"태풍이 온 날, 밖은 비바람이 거세고 거리에는 사람이 거의 없습니다." } },
    { z:"雖然不能出門，但是美惠在家看電影、煮泡麵，過得很悠閒。", py:"Suīrán bùnéng chūmén, dànshì Měihuì zài jiā kàn diànyǐng, zhǔ pàomiàn, guò de hěn yōuxián.", m:{ j:"外出できないものの、メイフイは家で映画を見たりラーメンを作ったりして、のんびり過ごします。", e:"Although she can't go out, Meihui watches movies and cooks noodles at home, spending the day leisurely.", k:"밖에 나갈 순 없지만, 메이후이는 집에서 영화를 보고 라면을 끓이며 여유롭게 보냅니다." } },
    { z:"里長也在群組提醒大家，如果淹水就要趕快通報。", py:"Lǐzhǎng yě zài qúnzǔ tíxǐng dàjiā, rúguǒ yānshuǐ jiù yào gǎnkuài tōngbào.", m:{ j:"里長もグループチャットで、浸水したらすぐ通報するよう皆に注意を促します。", e:"The neighborhood head also reminds everyone in the group chat to report immediately if there's flooding.", k:"이장도 단체 채팅방에서 침수되면 즉시 신고하라고 주민들에게 당부합니다." } },
    { z:"還好這次沒有太嚴重的災情，颱風隔天就離開了。", py:"Háihǎo zhè cì méiyǒu tài yánzhòng de zāiqíng, táifēng gétiān jiù líkāi le.", m:{ j:"幸いこの時は大きな被害はなく、台風は翌日には去っていきました。", e:"Fortunately there was no serious damage this time, and the typhoon left the next day.", k:"다행히 이번에는 큰 피해가 없었고, 태풍은 다음 날 떠났습니다." } },
  ],
  vocab:[
    { w:"氣象局", zy:"ㄑㄧˋ ㄒㄧㄤˋ ㄐㄩˊ", py:"qìxiàngjú", m:{ j:"気象局", e:"weather bureau", k:"기상청" } },
    { w:"颱風", zy:"ㄊㄞˊ ㄈㄥ", py:"táifēng", m:{ j:"台風", e:"typhoon", k:"태풍" } },
    { w:"登陸", zy:"ㄉㄥ ㄌㄨˋ", py:"dēnglù", m:{ j:"（台風などが）上陸する", e:"to make landfall", k:"상륙하다" } },
    { w:"以免", zy:"ㄧˇ ㄇㄧㄢˇ", py:"yǐmiǎn", m:{ j:"〜しないように", e:"so as to avoid", k:"~하지 않도록" } },
    { w:"停班停課", zy:"ㄊㄧㄥˊ ㄅㄢ ㄊㄧㄥˊ ㄎㄜˋ", py:"tíngbān tíngkè", m:{ j:"会社・学校が休みになること（台風時の一斉休業・休校）", e:"work and classes canceled (typhoon closure)", k:"휴무·휴교" } },
    { w:"鬆一口氣", zy:"ㄙㄨㄥ ㄧˋ ㄎㄡˇ ㄑㄧˋ", py:"sōng yì kǒu qì", m:{ j:"ほっと一息つく", e:"to breathe a sigh of relief", k:"안도의 한숨을 내쉬다" } },
    { w:"里長", zy:"ㄌㄧˇ ㄓㄤˇ", py:"lǐzhǎng", m:{ j:"里長（町内会の最小行政区の長）", e:"neighborhood head (li chief)", k:"이장(마을 대표)" } },
    { w:"淹水", zy:"ㄧㄢ ㄕㄨㄟˇ", py:"yānshuǐ", m:{ j:"浸水する・冠水する", e:"to flood", k:"침수되다" } },
    { w:"災情", zy:"ㄗㄞ ㄑㄧㄥˊ", py:"zāiqíng", m:{ j:"被害状況", e:"disaster situation, damage", k:"피해 상황" } },
  ],
  q:{
    ask:{ j:"市政府は台風について何を発表しましたか？", e:"What did the city government announce about the typhoon?", k:"시청은 태풍에 대해 무엇을 발표했나요?" },
    opts:[ { j:"翌日は会社・学校が休み", e:"Work and classes canceled the next day", k:"다음 날 휴무·휴교" }, { j:"MRTを終日運休", e:"The MRT would stop all day", k:"MRT 하루 종일 운행 중단" }, { j:"全員避難する", e:"Everyone must evacuate", k:"전원 대피" } ],
    ans:0,
    why:{ j:"「市政府宣布明天停班停課」＝市政府が翌日の会社・学校休みを発表しました。", e:"\"市政府宣布明天停班停課\" = the city government announced work and classes were canceled the next day.", k:"\"市政府宣布明天停班停課\" = 시청이 다음 날 휴무·휴교를 발표했어요." }
  }
},

{"id":"online-return","level":"l3","title":{"j":"ネット通販の返品","e":"Returning an Online Order","k":"온라인 쇼핑 반품"},"lines":[{"z":"上個星期我在網路上買了一件外套。","py":"shàng ge xīng qí wǒ zài wǎng lù shàng mǎi le yí jiàn wài tào。","m":{"j":"先週、ネットでコートを一着買いました。","e":"Last week I bought a coat online.","k":"지난주에 인터넷으로 코트 한 벌을 샀어요."}},{"z":"可是收到以後，我發現尺寸太小了。","py":"kě shì shōu dào yǐ hòu， wǒ fā xiàn chǐ cùn tài xiǎo le。","m":{"j":"でも届いてから、サイズが小さすぎると気づきました。","e":"But after it arrived, I found the size was too small.","k":"그런데 받고 나서 사이즈가 너무 작다는 걸 알았어요."}},{"z":"雖然顏色我很喜歡，但是根本穿不下。","py":"suī rán yán sè wǒ hěn xǐ huān， dàn shì gēn běn chuān bú xià。","m":{"j":"色はとても気に入っていますが、全然着られません。","e":"Although I liked the color, I couldn't fit into it at all.","k":"색깔은 아주 마음에 들지만 도저히 입을 수가 없었어요."}},{"z":"所以我決定申請退貨。","py":"suǒ yǐ wǒ jué dìng shēn qǐng tuì huò。","m":{"j":"それで返品を申請することにしました。","e":"So I decided to apply for a return.","k":"그래서 반품을 신청하기로 했어요."}},{"z":"我上網填了退貨的表單。","py":"wǒ shàng wǎng tián le tuì huò de biǎo dān。","m":{"j":"ネットで返品フォームを記入しました。","e":"I filled out the return form online.","k":"인터넷으로 반품 양식을 작성했어요."}},{"z":"因為金額比較高，所以要先跟客服聯絡。","py":"yīn wèi jīn é bǐ jiào gāo， suǒ yǐ yào xiān gēn kè fú lián luò。","m":{"j":"金額が高めなので、先にカスタマーサービスに連絡が必要でした。","e":"Because the amount was high, I had to contact customer service first.","k":"금액이 좀 높아서 먼저 고객센터에 연락해야 했어요."}},{"z":"客服說如果東西沒有用過，就可以退錢。","py":"kè fú shuō rú guǒ dōng xi méi yǒu yòng guò， jiù kě yǐ tuì qián。","m":{"j":"使っていなければ返金できると言われました。","e":"Customer service said if the item was unused, they could refund it.","k":"고객센터는 물건을 사용하지 않았으면 환불할 수 있다고 했어요."}},{"z":"我把外套包好，拿去便利商店寄回去。","py":"wǒ bǎ wài tào bāo hǎo， ná qù biàn lì shāng diàn jì huí qù。","m":{"j":"コートを包んで、コンビニから送り返しました。","e":"I packed the coat and sent it back from a convenience store.","k":"코트를 포장해서 편의점에서 돌려보냈어요."}},{"z":"過了三天，錢就退到我的帳戶了。","py":"guò le sān tiān， qián jiù tuì dào wǒ de zhàng hù le。","m":{"j":"三日後、お金が口座に返ってきました。","e":"After three days, the money was refunded to my account.","k":"사흘 뒤에 돈이 제 계좌로 환불됐어요."}}],"vocab":[{"w":"網路","py":"wǎnglù","m":{"j":"インターネット","e":"internet","k":"인터넷"},"zy":"ㄨㄤˇ ㄌㄨˋ"},{"w":"外套","py":"wàitào","m":{"j":"コート","e":"coat / jacket","k":"코트"},"zy":"ㄨㄞˋ ㄊㄠˋ"},{"w":"尺寸","py":"chǐcùn","m":{"j":"サイズ","e":"size","k":"사이즈"},"zy":"ㄔˇ ㄘㄨㄣˋ"},{"w":"退貨","py":"tuìhuò","m":{"j":"返品","e":"return goods","k":"반품"},"zy":"ㄊㄨㄟˋ ㄏㄨㄛˋ"},{"w":"表單","py":"biǎodān","m":{"j":"フォーム","e":"form","k":"양식"},"zy":"ㄅㄧㄠˇ ㄉㄢ"},{"w":"金額","py":"jīné","m":{"j":"金額","e":"amount","k":"금액"},"zy":"ㄐㄧㄣ ㄜˊ"},{"w":"客服","py":"kèfú","m":{"j":"カスタマーサービス","e":"customer service","k":"고객센터"},"zy":"ㄎㄜˋ ㄈㄨˊ"},{"w":"帳戶","py":"zhànghù","m":{"j":"口座","e":"account","k":"계좌"},"zy":"ㄓㄤˋ ㄏㄨˋ"}],"q":{"ask":{"j":"彼はなぜコートを返品しましたか？","e":"Why did he return the coat?","k":"그는 왜 코트를 반품했나요?"},"opts":[{"j":"サイズが小さすぎて着られないから","e":"Because the size was too small to fit","k":"사이즈가 너무 작아서 입을 수 없어서"},{"j":"色が気に入らないから","e":"Because he didn't like the color","k":"색깔이 마음에 안 들어서"},{"j":"値段が高すぎるから","e":"Because the price was too high","k":"가격이 너무 비싸서"},{"j":"商品が間違って届いたから","e":"Because the wrong item was sent","k":"상품이 잘못 배송돼서"}],"ans":0,"why":{"j":"本文で「尺寸太小」「穿不下」と述べ、色は気に入っています。","e":"He liked the color but the size was too small to fit.","k":"색깔은 마음에 들었지만 사이즈가 작아서 입을 수 없었어요."}}},
{"id":"weekend-hiking","level":"l3","title":{"j":"週末の登山プラン","e":"A Weekend Hiking Trip","k":"주말 등산 나들이 계획"},"lines":[{"z":"這個週末天氣很好，我和朋友約好去爬山。","py":"zhè ge zhōu mò tiān qì hěn hǎo， wǒ hé péng yǒu yuē hǎo qù pá shān。","m":{"j":"今週末は天気が良く、友達と登山に行く約束をしました。","e":"The weather is nice this weekend, so I made plans to hike with a friend.","k":"이번 주말은 날씨가 좋아서 친구와 등산 가기로 약속했어요."}},{"z":"我們選了一座不太高的山。","py":"wǒ men xuǎn le yí zuò bú tài gāo de shān。","m":{"j":"あまり高くない山を選びました。","e":"We chose a mountain that wasn't too high.","k":"그리 높지 않은 산을 골랐어요."}},{"z":"因為是新手，所以路線不能太難。","py":"yīn wèi shì xīn shǒu， suǒ yǐ lù xiàn bù néng tài nán。","m":{"j":"初心者なので、コースは難しすぎてはいけません。","e":"Because we were beginners, the route couldn't be too hard.","k":"초보자라서 코스가 너무 어려우면 안 됐어요."}},{"z":"出發前，我準備了水和一些點心。","py":"chū fā qián， wǒ zhǔn bèi le shuǐ hé yì xiē diǎn xin。","m":{"j":"出発前に、水とお菓子を少し用意しました。","e":"Before setting off, I prepared water and some snacks.","k":"출발 전에 물과 간식을 좀 준비했어요."}},{"z":"雖然爬山很累，但是風景真的很漂亮。","py":"Suī rán pá shān hěn lèi, dàn shì fēng jǐng zhēn de hěn piào liang.","m":{"j":"登山は疲れましたが、景色は本当に綺麗でした。","e":"Although hiking was tiring, the scenery was really beautiful.","k":"등산은 힘들었지만 경치가 정말 아름다웠어요."}},{"z":"我們在山頂上休息，順便拍了很多照片。","py":"wǒ men zài shān dǐng shàng xiū xí， shùn biàn pāi le hěn duō zhào piàn。","m":{"j":"山頂で休憩し、ついでにたくさん写真を撮りました。","e":"We rested at the summit and took many photos.","k":"정상에서 쉬면서 사진도 많이 찍었어요."}},{"z":"如果下次還有機會，我想去更遠的地方。","py":"rú guǒ xià cì hái yǒu jī huì， wǒ xiǎng qù gèng yuǎn de dì fāng。","m":{"j":"次の機会があれば、もっと遠くへ行きたいです。","e":"If there's another chance, I want to go somewhere farther.","k":"다음에 또 기회가 있으면 더 먼 곳에 가고 싶어요."}},{"z":"下山以後，我們一起去吃了火鍋。","py":"xià shān yǐ hòu， wǒ men yì qǐ qù chī le huǒ guō。","m":{"j":"下山後、一緒に火鍋を食べに行きました。","e":"After coming down, we went to eat hot pot together.","k":"하산 후에 같이 훠궈를 먹으러 갔어요."}},{"z":"這是一個很開心的週末。","py":"zhè shì yí ge hěn kāi xīn de zhōu mò。","m":{"j":"とても楽しい週末でした。","e":"It was a very happy weekend.","k":"아주 즐거운 주말이었어요."}}],"vocab":[{"w":"週末","py":"zhōumò","m":{"j":"週末","e":"weekend","k":"주말"},"zy":"ㄓㄡ ㄇㄛˋ"},{"w":"爬山","py":"páshān","m":{"j":"登山","e":"hiking","k":"등산"},"zy":"ㄆㄚˊ ㄕㄢ"},{"w":"新手","py":"xīnshǒu","m":{"j":"初心者","e":"beginner","k":"초보자"},"zy":"ㄒㄧㄣ ㄕㄡˇ"},{"w":"路線","py":"lùxiàn","m":{"j":"ルート","e":"route","k":"코스"},"zy":"ㄌㄨˋ ㄒㄧㄢˋ"},{"w":"風景","py":"fēngjǐng","m":{"j":"景色","e":"scenery","k":"경치"},"zy":"ㄈㄥ ㄐㄧㄥˇ"},{"w":"山頂","py":"shāndǐng","m":{"j":"山頂","e":"summit","k":"정상"},"zy":"ㄕㄢ ㄉㄧㄥˇ"},{"w":"順便","py":"shùnbiàn","m":{"j":"ついでに","e":"along the way","k":"~하는 김에"},"zy":"ㄕㄨㄣˋ ㄅㄧㄢˋ"},{"w":"火鍋","py":"huǒguō","m":{"j":"火鍋","e":"hot pot","k":"훠궈"},"zy":"ㄏㄨㄛˇ ㄍㄨㄛ"}],"q":{"ask":{"j":"彼らはなぜあまり高くない山を選びましたか？","e":"Why did they choose a mountain that wasn't too high?","k":"그들은 왜 그리 높지 않은 산을 골랐나요?"},"opts":[{"j":"初心者だから","e":"Because they were beginners","k":"초보자여서"},{"j":"天気が悪かったから","e":"Because the weather was bad","k":"날씨가 나빠서"},{"j":"時間が足りなかったから","e":"Because they didn't have enough time","k":"시간이 부족해서"},{"j":"山頂に景色がないから","e":"Because there was no scenery at the summit","k":"정상에 경치가 없어서"}],"ans":0,"why":{"j":"本文に「因為是新手，所以路線不能太難」とあります。","e":"The text says because they were beginners the route couldn't be too hard.","k":"본문에 초보자라서 코스가 너무 어려우면 안 됐다고 나와요."}}}
];
if (typeof module !== "undefined") module.exports = { READING_L3 };
