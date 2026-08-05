// StayTW Study — 分級閲讀 L2（基礎・TOCFL beginner／台湾のリアルな場面・繁体字＋注音＋拼音）
// 形式: level, title{j,e,k}, lines[{z,zy,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], q{ask{j,e,k},opts[{j,e,k}],ans,why{j,e,k}}
// 音声は各 line.z を TTS で読み上げ（事前生成 mp3 があれば高音質、無ければ端末音声）。
const READING_L2 = [
{
  id:"renting-apartment", level:"l2",
  title:{ j:"部屋を見に行く", e:"Viewing an Apartment to Rent", k:"방 보러 가기" },
  lines:[
    { z:"美咲想在公司附近租一間套房，所以上網找房子。", zy:"ㄇㄟˇ ㄒㄧㄠˋ ㄒㄧㄤˇ ㄗㄞˋ ㄍㄨㄥ ㄙ ㄈㄨˋ ㄐㄧㄣˋ ㄗㄨ ㄧˋ ㄐㄧㄢ ㄊㄠˋ ㄈㄤˊ", py:"Měisù xiǎng zài gōngsī fùjìn zū yì jiān tàofáng, suǒyǐ shàngwǎng zhǎo fángzi.", m:{ j:"美咲は会社の近くでワンルームを借りたいので、ネットで部屋を探します。", e:"Misaki wants to rent a studio near her office, so she searches for a place online.", k:"미사키는 회사 근처에 원룸을 빌리고 싶어서 인터넷으로 방을 찾습니다." } },
    { z:"她看到一間不錯的房子，就打電話跟房東約看房。", py:"Tā kàndào yì jiān búcuò de fángzi, jiù dǎ diànhuà gēn fángdōng yuē kànfáng.", m:{ j:"彼女は良さそうな部屋を見つけ、大家さんに電話して内見の約束をします。", e:"She finds a nice place and calls the landlord to arrange a viewing.", k:"그녀는 괜찮은 방을 발견하고 집주인에게 전화해 방 보기를 약속합니다." } },
    { z:"「這間房租一個月多少錢？有包水電嗎？」", py:"“Zhè jiān fángzū yí ge yuè duōshǎo qián? Yǒu bāo shuǐ diàn ma?”", m:{ j:"「この部屋は家賃が月いくらですか？水道光熱費は込みですか？」", e:"\"How much is the monthly rent? Are water and electricity included?\"", k:"\"이 방은 월세가 얼마예요? 수도세와 전기세가 포함인가요?\"" } },
    { z:"房東說：「一個月一萬二，水費包了，可是電費要另外算。」", py:"Fángdōng shuō: “Yí ge yuè yíwàn èr, shuǐfèi bāo le, kěshì diànfèi yào lìngwài suàn.”", m:{ j:"大家さんは言います。「月1万2千元です。水道代は込みですが、電気代は別に計算します。」", e:"The landlord says: \"12,000 a month. Water's included, but electricity is charged separately.\"", k:"집주인이 말합니다. \"월 1만 2천 원이에요. 수도세는 포함이지만 전기세는 따로 계산해요.\"" } },
    { z:"美咲看了一下，覺得房間很乾淨，採光也很好。", py:"Měisù kànle yíxià, juéde fángjiān hěn gānjìng, cǎiguāng yě hěn hǎo.", m:{ j:"美咲は少し見て、部屋がとても清潔で、採光も良いと感じます。", e:"Misaki takes a look and feels the room is clean and gets good light.", k:"미사키는 잠깐 보고 방이 깨끗하고 채광도 좋다고 느낍니다." } },
    { z:"因為離捷運站很近，走路只要五分鐘，她決定要租。", py:"Yīnwèi lí jiéyùn zhàn hěn jìn, zǒulù zhǐ yào wǔ fēnzhōng, tā juédìng yào zū.", m:{ j:"MRTの駅から近く、歩いて5分だけなので、彼女は借りることに決めます。", e:"Because it's close to the MRT station, only a five-minute walk, she decides to rent it.", k:"MRT역에서 가까워 걸어서 5분밖에 안 걸려서, 그녀는 빌리기로 결정합니다." } },
    { z:"房東說：「那要先付一個月押金，還有第一個月的房租。」", py:"Fángdōng shuō: “Nà yào xiān fù yí ge yuè yājīn, hái yǒu dì yī ge yuè de fángzū.”", m:{ j:"大家さんは言います。「では、まず1ヶ月分の敷金と、初月の家賃を払ってください。」", e:"The landlord says: \"Then you'll first pay one month's deposit, plus the first month's rent.\"", k:"집주인이 말합니다. \"그럼 먼저 한 달치 보증금과 첫 달 월세를 내셔야 해요.\"" } },
  ],
  vocab:[
    { w:"套房", zy:"ㄊㄠˋ ㄈㄤˊ", py:"tàofáng", m:{ j:"ワンルーム（バス・トイレ付き）", e:"studio apartment (en-suite)", k:"원룸(욕실 딸린)" } },
    { w:"房東", zy:"ㄈㄤˊ ㄉㄨㄥ", py:"fángdōng", m:{ j:"大家・家主", e:"landlord", k:"집주인" } },
    { w:"房租", zy:"ㄈㄤˊ ㄗㄨ", py:"fángzū", m:{ j:"家賃", e:"rent", k:"집세·월세" } },
    { w:"水電", zy:"ㄕㄨㄟˇ ㄉㄧㄢˋ", py:"shuǐ diàn", m:{ j:"水道と電気（光熱費）", e:"water and electricity (utilities)", k:"수도와 전기(공과금)" } },
    { w:"採光", zy:"ㄘㄞˇ ㄍㄨㄤ", py:"cǎiguāng", m:{ j:"採光・日当たり", e:"natural lighting", k:"채광" } },
    { w:"押金", zy:"ㄧㄚ ㄐㄧㄣ", py:"yājīn", m:{ j:"敷金・保証金", e:"deposit", k:"보증금" } },
    { w:"另外算", zy:"ㄌㄧㄥˋ ㄨㄞˋ ㄙㄨㄢˋ", py:"lìngwài suàn", m:{ j:"別に計算する・別料金", e:"charged separately", k:"따로 계산하다" } },
  ],
  q:{
    ask:{ j:"この部屋の電気代はどうなっていますか？", e:"How is the electricity bill handled for this room?", k:"이 방의 전기세는 어떻게 되나요?" },
    opts:[ { j:"家賃とは別に計算する", e:"Charged separately from the rent", k:"월세와 따로 계산한다" }, { j:"家賃に込み", e:"Included in the rent", k:"월세에 포함된다" }, { j:"無料", e:"Free", k:"무료다" } ],
    ans:0,
    why:{ j:"「電費要另外算」＝電気代は別に計算する。水道代（水費）は込みですが電気代は別です。", e:"\"電費要另外算\" = electricity is charged separately. Water is included, but electricity is not.", k:"\"電費要另外算\" = 전기세는 따로 계산. 수도세는 포함이지만 전기세는 별도예요." }
  }
},
{
  id:"restaurant-order-pay", level:"l2",
  title:{ j:"レストランで注文して会計する", e:"Ordering and Paying at a Restaurant", k:"식당에서 주문하고 계산하기" },
  lines:[
    { z:"中午，健一和同事一起去一家小餐廳吃飯。", zy:"ㄓㄨㄥ ㄨˇ ㄐㄧㄢˋ ㄧ ㄏㄜˊ ㄊㄨㄥˊ ㄕˋ ㄧˋ ㄑㄧˇ ㄑㄩˋ ㄧˋ ㄐㄧㄚ ㄒㄧㄠˇ ㄘㄢ ㄊㄧㄥ ㄔ ㄈㄢˋ", py:"Zhōngwǔ, Jiànyī hé tóngshì yìqǐ qù yì jiā xiǎo cāntīng chī fàn.", m:{ j:"お昼、健一は同僚と一緒に小さなレストランへ食事に行きます。", e:"At noon, Kenichi goes to a small restaurant for lunch with a coworker.", k:"점심에 켄이치는 동료와 함께 작은 식당에 밥을 먹으러 갑니다." } },
    { z:"服務生拿菜單過來問：「請問要點什麼？」", py:"Fúwùshēng ná càidān guòlái wèn: “Qǐngwèn yào diǎn shénme?”", m:{ j:"店員がメニューを持ってきて尋ねます。「何になさいますか？」", e:"The server brings the menu and asks: \"What would you like to order?\"", k:"종업원이 메뉴를 가져와 묻습니다. \"무엇을 주문하시겠어요?\"" } },
    { z:"「我要一個排骨飯，然後一碗湯。」", py:"“Wǒ yào yí ge páigǔ fàn, ránhòu yì wǎn tāng.”", m:{ j:"「排骨飯を一つ、それからスープを一杯ください。」", e:"\"I'll have a pork chop rice, and then a bowl of soup.\"", k:"\"저는 갈비덮밥 하나랑, 그리고 국 한 그릇 주세요.\"" } },
    { z:"「飲料要不要？今天的紅茶買一送一。」", py:"“Yǐnliào yào bú yào? Jīntiān de hóngchá mǎi yī sòng yī.”", m:{ j:"「飲み物はいかがですか？今日は紅茶が一つ買うと一つ無料です。」", e:"\"Would you like a drink? Today the black tea is buy one get one free.\"", k:"\"음료는 어떠세요? 오늘 홍차는 하나 사면 하나 무료예요.\"" } },
    { z:"「好啊，那給我兩杯紅茶，謝謝。」", py:"“Hǎo a, nà gěi wǒ liǎng bēi hóngchá, xièxie.”", m:{ j:"「いいですね、では紅茶を二杯ください、ありがとう。」", e:"\"Sure, then give me two black teas, thanks.\"", k:"\"좋아요, 그럼 홍차 두 잔 주세요, 감사합니다.\"" } },
    { z:"吃完以後，健一去櫃檯結帳。", py:"Chīwán yǐhòu, Jiànyī qù guìtái jiézhàng.", m:{ j:"食べ終わってから、健一はレジで会計をします。", e:"After eating, Kenichi goes to the counter to pay.", k:"다 먹고 나서 켄이치는 카운터에 가서 계산합니다." } },
    { z:"「一共兩百一十塊。可以刷卡嗎？」「可以，也可以用手機付。」", py:"“Yígòng liǎngbǎi yīshí kuài. Kěyǐ shuākǎ ma?” “Kěyǐ, yě kěyǐ yòng shǒujī fù.”", m:{ j:"「全部で210元です。カードは使えますか？」「使えます、スマホでも払えますよ。」", e:"\"That's 210 in total. Can I pay by card?\" \"Yes, you can also pay by phone.\"", k:"\"모두 210원입니다. 카드 돼요?\" \"네, 휴대폰으로도 내실 수 있어요.\"" } },
  ],
  vocab:[
    { w:"服務生", zy:"ㄈㄨˊ ㄨˋ ㄕㄥ", py:"fúwùshēng", m:{ j:"店員・ウェイター", e:"waiter/server", k:"종업원" } },
    { w:"菜單", zy:"ㄘㄞˋ ㄉㄢ", py:"càidān", m:{ j:"メニュー", e:"menu", k:"메뉴" } },
    { w:"排骨飯", zy:"ㄆㄞˊ ㄍㄨˇ ㄈㄢˋ", py:"páigǔ fàn", m:{ j:"排骨飯（豚カツ弁当の定番）", e:"pork chop rice (a Taiwan classic)", k:"갈비덮밥(대만 인기 메뉴)" } },
    { w:"買一送一", zy:"ㄇㄞˇ ㄧ ㄙㄨㄥˋ ㄧ", py:"mǎi yī sòng yī", m:{ j:"一つ買うと一つ無料", e:"buy one get one free", k:"하나 사면 하나 무료" } },
    { w:"結帳", zy:"ㄐㄧㄝˊ ㄓㄤˋ", py:"jiézhàng", m:{ j:"会計する・お勘定", e:"to pay the bill", k:"계산하다" } },
    { w:"櫃檯", zy:"ㄍㄨㄟˋ ㄊㄞˊ", py:"guìtái", m:{ j:"レジ・カウンター", e:"counter/cashier", k:"카운터" } },
    { w:"一共", zy:"ㄧˋ ㄍㄨㄥˋ", py:"yígòng", m:{ j:"全部で・合計", e:"in total", k:"모두·합계" } },
  ],
  q:{
    ask:{ j:"健一はどうして紅茶を二杯もらいましたか？", e:"Why did Kenichi get two black teas?", k:"켄이치는 왜 홍차를 두 잔 받았나요?" },
    opts:[ { j:"買一送一（一つ買うと一つ無料）だったから", e:"Because it was buy one get one free", k:"하나 사면 하나 무료였기 때문에" }, { j:"とても喉が渇いていたから", e:"Because he was very thirsty", k:"목이 많이 말랐기 때문에" }, { j:"同僚の分も買ったから", e:"Because he bought one for his coworker", k:"동료 것도 샀기 때문에" } ],
    ans:0,
    why:{ j:"「紅茶買一送一」＝紅茶が一つ買うと一つ無料。だから二杯もらえました。", e:"\"紅茶買一送一\" = the black tea was buy one get one free, so he got two.", k:"\"紅茶買一送一\" = 홍차가 하나 사면 하나 무료. 그래서 두 잔을 받았어요." }
  }
},
{
  id:"convenience-store-parcel", level:"l2",
  title:{ j:"コンビニで荷物を受け取る", e:"Picking Up a Package at the Convenience Store", k:"편의점에서 택배 받기" },
  lines:[
    { z:"由美在網路上買了一雙鞋子，賣家寄到便利商店。", zy:"ㄧㄡˊ ㄇㄟˇ ㄗㄞˋ ㄨㄤˇ ㄌㄨˋ ㄕㄤˋ ㄇㄞˇ ㄌㄜ˙ ㄧˋ ㄕㄨㄤ ㄒㄧㄝˊ ㄗ˙", py:"Yóuměi zài wǎnglù shàng mǎile yì shuāng xiézi, màijiā jì dào biànlì shāngdiàn.", m:{ j:"由美はネットで靴を一足買い、売り手はコンビニに送りました。", e:"Yumi bought a pair of shoes online, and the seller shipped them to a convenience store.", k:"유미는 인터넷에서 신발 한 켤레를 샀고, 판매자는 편의점으로 보냈습니다." } },
    { z:"她收到簡訊，說包裹已經到了，可以去拿。", py:"Tā shōudào jiǎnxùn, shuō bāoguǒ yǐjīng dào le, kěyǐ qù ná.", m:{ j:"彼女はショートメッセージを受け取り、荷物がもう届いたので取りに行けるとのことです。", e:"She gets a text saying the package has arrived and she can go pick it up.", k:"그녀는 택배가 도착해서 찾으러 가도 된다는 문자를 받습니다." } },
    { z:"她走進超商，跟店員說：「你好，我要取貨。」", py:"Tā zǒujìn chāoshāng, gēn diànyuán shuō: “Nǐ hǎo, wǒ yào qǔhuò.”", m:{ j:"彼女はコンビニに入り、店員に言います。「こんにちは、荷物を受け取りたいです。」", e:"She walks into the store and tells the clerk: \"Hi, I'd like to pick up a package.\"", k:"그녀는 편의점에 들어가 점원에게 말합니다. \"안녕하세요, 물건을 찾으려고요.\"" } },
    { z:"「請給我你的取貨號碼和手機後三碼。」", py:"“Qǐng gěi wǒ nǐ de qǔhuò hàomǎ hé shǒujī hòu sān mǎ.”", m:{ j:"「受け取り番号と携帯番号の下3桁を教えてください。」", e:"\"Please give me your pickup number and the last three digits of your phone.\"", k:"\"수령 번호와 휴대폰 뒤 세 자리를 알려 주세요.\"" } },
    { z:"店員找了一下，然後拿出一個箱子給她。", py:"Diànyuán zhǎole yíxià, ránhòu ná chū yí ge xiāngzi gěi tā.", m:{ j:"店員は少し探して、それから箱を一つ取り出して彼女に渡します。", e:"The clerk searches a bit, then takes out a box and hands it to her.", k:"점원은 잠깐 찾더니 상자 하나를 꺼내 그녀에게 줍니다." } },
    { z:"因為她是貨到付款，所以要先付六百八十塊。", py:"Yīnwèi tā shì huò dào fùkuǎn, suǒyǐ yào xiān fù liùbǎi bāshí kuài.", m:{ j:"彼女は代金引換なので、まず680元を払わなければなりません。", e:"Because she chose cash on delivery, she has to pay 680 first.", k:"그녀는 착불(대금상환)이라서 먼저 680원을 내야 합니다." } },
    { z:"付完錢，店員說：「這是你的發票，請拿好，謝謝。」", py:"Fùwán qián, diànyuán shuō: “Zhè shì nǐ de fāpiào, qǐng ná hǎo, xièxie.”", m:{ j:"支払いを終えると、店員は言います。「これがレシートです。無くさないでくださいね、ありがとう。」", e:"After paying, the clerk says: \"Here's your receipt, please keep it safe, thanks.\"", k:"돈을 다 내자 점원이 말합니다. \"여기 영수증입니다. 잘 챙기세요, 감사합니다.\"" } },
  ],
  vocab:[
    { w:"包裹", zy:"ㄅㄠ ㄍㄨㄛˇ", py:"bāoguǒ", m:{ j:"荷物・小包", e:"package/parcel", k:"택배·소포" } },
    { w:"簡訊", zy:"ㄐㄧㄢˇ ㄒㄩㄣˋ", py:"jiǎnxùn", m:{ j:"ショートメッセージ（SMS）", e:"text message (SMS)", k:"문자 메시지" } },
    { w:"超商", zy:"ㄔㄠ ㄕㄤ", py:"chāoshāng", m:{ j:"コンビニ（超級商店の略）", e:"convenience store (short form)", k:"편의점(줄임말)" } },
    { w:"取貨", zy:"ㄑㄩˇ ㄏㄨㄛˋ", py:"qǔhuò", m:{ j:"荷物を受け取る", e:"to pick up goods", k:"물건을 찾다" } },
    { w:"號碼", zy:"ㄏㄠˋ ㄇㄚˇ", py:"hàomǎ", m:{ j:"番号", e:"number", k:"번호" } },
    { w:"貨到付款", zy:"ㄏㄨㄛˋ ㄉㄠˋ ㄈㄨˋ ㄎㄨㄢˇ", py:"huò dào fùkuǎn", m:{ j:"代金引換", e:"cash on delivery (COD)", k:"착불·대금상환" } },
    { w:"發票", zy:"ㄈㄚ ㄆㄧㄠˋ", py:"fāpiào", m:{ j:"レシート・統一発票", e:"receipt (uniform invoice)", k:"영수증" } },
  ],
  q:{
    ask:{ j:"由美はどうしてお金を払う必要がありましたか？", e:"Why did Yumi have to pay money?", k:"유미는 왜 돈을 내야 했나요?" },
    opts:[ { j:"代金引換（貨到付款）だったから", e:"Because it was cash on delivery", k:"착불(대금상환)이었기 때문에" }, { j:"受け取り手数料が要るから", e:"Because there's a pickup fee", k:"수령 수수료가 필요해서" }, { j:"送料を払っていなかったから", e:"Because she hadn't paid shipping", k:"배송비를 안 냈기 때문에" } ],
    ans:0,
    why:{ j:"「她是貨到付款」＝代金引換なので、受け取り時にお金を払います。", e:"\"她是貨到付款\" = it was cash on delivery, so she pays when picking up.", k:"\"她是貨到付款\" = 착불이라서 받을 때 돈을 냅니다." }
  }
},
];
if (typeof module !== "undefined") module.exports = { READING_L2 };
