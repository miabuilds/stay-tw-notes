// StayTW Notes — 深度閲讀：仕事・くらし（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_12 = [
{
  id:"taiwan-workplace-culture",
  cat:{ j:"仕事・くらし", e:"Work & Living", k:"일·생활" },
  zhTitle:"台灣的職場文化：尾牙、年終與同事之間",
  title:{ j:"台湾の職場文化：忘年会、ボーナス、そして同僚のあいだ", e:"Taiwan's Workplace Culture: Year-End Feasts, Bonuses, and Life Among Colleagues", k:"대만의 직장 문화: 웨이야, 연말 보너스, 그리고 동료 사이" },
  intro:{
    j:"年末が近づくと、台湾の会社員の頭には二つの言葉が浮かびます——「尾牙（忘年会）」と「年終奨金（年末ボーナス）」。残業もあれば同僚との温かい情も、厳しい上司もいれば頼れる先輩もいる。台湾の職場は、制度だけでは語りきれない人間くさい場所です。オフィスの一日をのぞいてみましょう。",
    e:"As the year winds down, two words hover in the mind of every Taiwanese office worker: 'weiya' (the year-end feast) and 'nianzhong' (the year-end bonus). There's overtime, but also warm camaraderie; there are demanding bosses, but also dependable senior colleagues. Taiwan's workplace is a very human place that no set of rules alone can capture. Let's step into a day at the office.",
    k:"연말이 다가오면 대만 직장인의 머릿속에는 두 단어가 떠오릅니다—'웨이야(연말 회식)'와 '연말 보너스'. 야근도 있지만 동료 간의 따뜻한 정도 있고, 엄한 상사도 있지만 든든한 선배도 있습니다. 대만의 직장은 제도만으로는 다 담을 수 없는, 사람 냄새 나는 곳입니다. 사무실의 하루를 들여다봅시다."
  },
  paras:[
    {
      z:"在台灣，一份工作往往不只是「賺薪水」而已，同事之間的關係常常像半個家人。很多公司的午餐時間，大家會約一約「要不要一起訂便當？」，下午還會有人揪團買手搖飲，一杯珍奶、一杯紅茶，順便閒聊幾句。這種日常的小互動，讓辦公室多了一點人情味，也讓新人比較容易融入團隊。",
      py:"Zài Táiwān, yí fèn gōngzuò wǎngwǎng bùzhǐ shì “zhuàn xīnshuǐ” éryǐ, tóngshì zhījiān de guānxì chángcháng xiàng bàn ge jiārén. Hěnduō gōngsī de wǔcān shíjiān, dàjiā huì yuē yì yuē “yào bú yào yìqǐ dìng biàndāng?”, xiàwǔ hái huì yǒurén jiū tuán mǎi shǒuyáoyǐn, yì bēi zhēnnǎi, yì bēi hóngchá, shùnbiàn xiánliáo jǐ jù. Zhè zhǒng rìcháng de xiǎo hùdòng, ràng bàngōngshì duō le yìdiǎn rénqíngwèi, yě ràng xīnrén bǐjiào róngyì róngrù tuánduì.",
      m:{
        j:"台湾では、仕事は単に「給料を稼ぐ」だけのものではないことが多く、同僚同士の関係はしばしば半分家族のようです。多くの会社では昼食の時間になると「一緒にお弁当頼まない？」と声をかけ合い、午後には誰かがタピオカドリンクの共同購入を呼びかけ、タピオカミルクティーやアイスティーを一杯ずつ買いながら、ついでにおしゃべりをします。こうした日常の小さなやり取りが、オフィスに人情味を添え、新人もチームに馴染みやすくしてくれます。",
        e:"In Taiwan, a job is often more than just 'earning a paycheck'—relationships among colleagues can feel almost like a second family. At many companies, lunchtime brings a round of 'Shall we order boxed meals together?', and in the afternoon someone will organize a group order for bubble tea—a cup of pearl milk tea here, a cup of black tea there—chatting a bit along the way. These small daily exchanges add a touch of warmth to the office and help newcomers blend into the team more easily.",
        k:"대만에서 일자리는 단순히 '월급을 버는' 것 이상인 경우가 많고, 동료 사이의 관계는 흔히 반쯤 가족 같습니다. 많은 회사에서 점심시간이 되면 '같이 도시락 시킬까?' 하고 서로 묻고, 오후에는 누군가 버블티 공동 주문을 제안해 버블 밀크티 한 잔, 홍차 한 잔씩 사면서 잠깐 수다를 떱니다. 이런 일상의 작은 교류가 사무실에 인정미를 더하고, 신입도 팀에 쉽게 녹아들게 해 줍니다."
      }
    },
    {
      z:"不過，台灣職場也有它比較辛苦的一面，那就是「加班」。有些產業，尤其是科技業和服務業，加班幾乎是家常便飯。有一種制度叫「責任制」，名義上是「把事情做完就好、不看時數」，但實際上常常變成「事情永遠做不完，只好一直留下來」。因此，「幾點下班」在台灣有時候是一件很敏感、也很現實的事。",
      py:"Búguò, Táiwān zhíchǎng yě yǒu tā bǐjiào xīnkǔ de yímiàn, nà jiùshì “jiābān”. Yǒuxiē chǎnyè, yóuqí shì kējìyè hé fúwùyè, jiābān jīhū shì jiācháng biànfàn. Yǒu yì zhǒng zhìdù jiào “zérènzhì”, míngyì shàng shì “bǎ shìqíng zuòwán jiù hǎo, bú kàn shíshù”, dàn shíjì shàng chángcháng biànchéng “shìqíng yǒngyuǎn zuò bù wán, zhǐhǎo yìzhí liú xiàlái”. Yīncǐ, “jǐ diǎn xiàbān” zài Táiwān yǒushíhòu shì yí jiàn hěn mǐngǎn, yě hěn xiànshí de shì.",
      m:{
        j:"ただ、台湾の職場にもつらい一面があります。それが「加班（残業）」です。一部の業界、とくに科学技術業やサービス業では、残業はほとんど日常茶飯事。「責任制」という制度があり、名目上は「仕事さえ終わればいい、時間数は問わない」というものですが、実際には「仕事が永遠に終わらないので、ずっと残るしかない」に変わってしまうことがよくあります。だから「何時に退勤するか」は、台湾では時にとてもデリケートで、現実的な問題なのです。",
        e:"That said, Taiwan's workplace has its harder side too, namely 'overtime.' In some industries—especially tech and services—overtime is almost routine. There's a system called 'responsibility-based work' (zerenzhi), nominally 'just get the job done, we don't count the hours,' but in practice it often becomes 'the work never ends, so you have no choice but to stay.' As a result, 'What time do you get off work?' can be a sensitive and very real question in Taiwan.",
        k:"다만 대만 직장에도 힘든 면이 있는데, 바로 '야근'입니다. 일부 업계, 특히 IT업과 서비스업에서는 야근이 거의 일상다반사입니다. '책임제'라는 제도가 있는데, 명목상으로는 '일만 끝내면 되고 시간은 따지지 않는다'지만 실제로는 '일이 영원히 끝나지 않아 계속 남아 있을 수밖에 없다'로 변하곤 합니다. 그래서 '몇 시에 퇴근하느냐'는 대만에서 때때로 매우 민감하고 현실적인 문제입니다."
      }
    },
    {
      z:"到了年底，兩件大事會讓整個職場氣氛熱起來：一個是「年終獎金」，一個是「尾牙」。年終獎金通常在農曆過年前發放，多的公司給好幾個月的薪水，少的可能只有幾千塊，金額多寡往往被員工拿來評斷這家公司「夠不夠意思」。有沒有年終、發多少，常常是過年前朋友聚會時大家最愛偷偷比較的話題。",
      py:"Dàole niándǐ, liǎng jiàn dàshì huì ràng zhěnggè zhíchǎng qìfēn rè qǐlái: yí ge shì “niánzhōng jiǎngjīn”, yí ge shì “wěiyá”. Niánzhōng jiǎngjīn tōngcháng zài nónglì guònián qián fāfàng, duō de gōngsī gěi hǎojǐ ge yuè de xīnshuǐ, shǎo de kěnéng zhǐyǒu jǐqiān kuài, jīn'é duōguǎ wǎngwǎng bèi yuángōng ná lái píngduàn zhè jiā gōngsī “gòu bú gòu yìsi”. Yǒu méiyǒu niánzhōng, fā duōshǎo, chángcháng shì guònián qián péngyǒu jùhuì shí dàjiā zuì ài tōutōu bǐjiào de huàtí.",
      m:{
        j:"年末になると、二つの一大事が職場の空気を盛り上げます。一つは「年終獎金（年末ボーナス）」、もう一つは「尾牙（忘年会）」です。年末ボーナスはたいてい旧正月前に支給され、多い会社では数か月分の給料、少ないと数千元ということも。その金額の多寡は、社員がその会社を「気前がいいかどうか」評価する物差しになりがちです。ボーナスがあるか、いくら出るかは、旧正月前の友人の集まりで、みんながこっそり比べたがる大好きな話題です。",
        e:"At year's end, two big events fire up the whole workplace: the 'year-end bonus' (nianzhong jiangjin) and the 'weiya' feast. The year-end bonus is usually paid before Lunar New Year; generous companies give several months' salary, stingy ones maybe just a few thousand dollars, and the amount often becomes the yardstick by which employees judge whether a company is 'decent' to them. Whether you get a bonus—and how big—is a favorite topic that everyone loves to quietly compare when friends gather before the New Year.",
        k:"연말이 되면 두 가지 큰일이 직장 분위기를 달아오르게 합니다. 하나는 '연말 보너스', 하나는 '웨이야(연말 회식)'입니다. 연말 보너스는 보통 음력설 전에 지급되는데, 넉넉한 회사는 몇 달치 월급을, 인색한 곳은 몇천 원만 주기도 하며, 그 액수는 직원들이 회사가 '괜찮은지' 평가하는 잣대가 되곤 합니다. 보너스가 있는지, 얼마인지는 설 전 친구 모임에서 모두가 은근히 비교하기 좋아하는 화제입니다."
      }
    },
    {
      z:"「尾牙」則是台灣企業一年一度的年終聚餐，源自民間祭拜土地公的習俗，現在演變成公司犒賞員工的大型宴會。大公司會包下飯店，準備豐盛的桌菜、請歌手表演、辦抽獎，頭獎有時是機車、家電，甚至現金好幾萬。老闆會上台講話、敬酒，員工們則邊吃邊期待自己的號碼被抽中。尾牙抽到大獎的那種興奮，是台灣上班族的共同回憶之一。",
      py:"“Wěiyá” zé shì Táiwān qǐyè yì nián yí dù de niánzhōng jùcān, yuánzì mínjiān jìbài Tǔdìgōng de xísú, xiànzài yǎnbiàn chéng gōngsī kàoshǎng yuángōng de dàxíng yànhuì. Dà gōngsī huì bāo xià fàndiàn, zhǔnbèi fēngshèng de zhuōcài, qǐng gēshǒu biǎoyǎn, bàn chōujiǎng, tóujiǎng yǒushí shì jīchē, jiādiàn, shènzhì xiànjīn hǎojǐ wàn. Lǎobǎn huì shàngtái jiǎnghuà, jìngjiǔ, yuángōngmen zé biān chī biān qídài zìjǐ de hàomǎ bèi chōuzhòng. Wěiyá chōudào dàjiǎng de nà zhǒng xīngfèn, shì Táiwān shàngbānzú de gòngtóng huíyì zhī yī.",
      m:{
        j:"「尾牙」は台湾企業の年に一度の年末会食で、民間の土地公（土地神）を祀る習わしに由来し、今では会社が社員をねぎらう大宴会に発展しました。大企業はホテルを貸し切り、豪華なコース料理を用意し、歌手を呼んでステージを催し、抽選会を開きます。一等賞はときにバイクや家電、さらには現金数万元ということも。社長は壇上で挨拶し杯を交わし、社員は食べながら自分の番号が当たるのを待ちわびます。尾牙で大当たりを引く、あの興奮は、台湾の会社員に共通する思い出の一つです。",
        e:"The 'weiya' is a Taiwanese company's once-a-year year-end banquet, rooted in the folk custom of worshiping the Earth God and now evolved into a grand feast where firms reward their staff. Big companies book out hotels, lay on lavish banquet dishes, hire singers to perform, and hold lucky draws—the top prize is sometimes a scooter, an appliance, even tens of thousands in cash. The boss takes the stage to speak and toast, while employees eat and wait in anticipation for their number to be drawn. The thrill of winning a big weiya prize is a shared memory for Taiwan's office workers.",
        k:"'웨이야'는 대만 기업의 연례 연말 회식으로, 민간에서 토지신을 모시던 풍습에서 유래해 이제는 회사가 직원을 격려하는 대형 연회로 발전했습니다. 큰 회사는 호텔을 통째로 빌려 푸짐한 코스 요리를 준비하고 가수를 불러 공연하며 경품 추첨을 엽니다. 1등 상품은 때로 오토바이, 가전, 심지어 현금 수만 원이기도 합니다. 사장이 무대에 올라 인사하고 건배하는 동안 직원들은 먹으면서 자기 번호가 뽑히기를 기대합니다. 웨이야에서 큰 상을 뽑는 그 흥분은 대만 직장인의 공통된 추억 중 하나입니다."
      }
    },
    {
      z:"在台灣工作，你也會慢慢學會怎麼稱呼身邊的人。比你早進公司、經驗比你多的，通常叫「前輩」，帶你、教你的人可能是「主管」或「Leader」。對外，大家習慣叫小公司的負責人「老闆」，就算是路邊小吃攤，客人也常喊一聲「老闆」。前輩帶新人、老鳥照顧菜鳥，這種上下之間互相照應的關係，是台灣職場很重要的潛規則。",
      py:"Zài Táiwān gōngzuò, nǐ yě huì mànman xuéhuì zěnme chēnghū shēnbiān de rén. Bǐ nǐ zǎo jìn gōngsī, jīngyàn bǐ nǐ duō de, tōngcháng jiào “qiánbèi”, dài nǐ, jiāo nǐ de rén kěnéng shì “zhǔguǎn” huò “Leader”. Duìwài, dàjiā xíguàn jiào xiǎo gōngsī de fùzérén “lǎobǎn”, jiùsuàn shì lùbiān xiǎochī tān, kèrén yě cháng hǎn yì shēng “lǎobǎn”. Qiánbèi dài xīnrén, lǎoniǎo zhàogù càiniǎo, zhè zhǒng shàngxià zhījiān hùxiāng zhàoyìng de guānxì, shì Táiwān zhíchǎng hěn zhòngyào de qián guīzé.",
      m:{
        j:"台湾で働くと、周りの人の呼び方も少しずつ覚えていきます。自分より先に入社し、経験の多い人は普通「前輩（先輩）」と呼び、指導してくれる人は「主管（上司）」や「リーダー」かもしれません。対外的には、小さな会社の責任者を「老闆（社長・オーナー）」と呼ぶのが習慣で、道端の屋台でも客はよく「老闆！」と声をかけます。先輩が新人を導き、ベテランが新米の面倒を見る——この上下で互いを気にかけ合う関係は、台湾の職場でとても大切な暗黙のルールです。",
        e:"Working in Taiwan, you'll also gradually learn how to address the people around you. Those who joined before you and have more experience are usually called 'qianbei' (senior/mentor); the person who trains and teaches you might be your 'supervisor' or 'leader.' To outsiders, everyone habitually calls the head of a small business 'laoban' (boss)—even at a roadside food stall, customers often call out 'Laoban!' Seniors guiding newcomers, old hands looking after rookies: this relationship of mutual care across ranks is an important unspoken rule of Taiwan's workplace.",
        k:"대만에서 일하다 보면 주변 사람을 부르는 법도 차차 익히게 됩니다. 당신보다 먼저 입사하고 경험이 많은 사람은 보통 '선배(前輩)'라 부르고, 이끌어 주고 가르쳐 주는 사람은 '상사(主管)'나 '리더'일 수 있습니다. 대외적으로는 작은 회사의 책임자를 '라오반(사장·주인)'이라 부르는 게 습관이라, 길가 노점에서도 손님이 자주 '라오반!' 하고 부릅니다. 선배가 신입을 이끌고 고참이 신참을 챙기는, 위아래가 서로 돌보는 이 관계는 대만 직장의 매우 중요한 암묵적 규칙입니다."
      }
    },
    {
      z:"整體來說，台灣的職場文化在「人情」和「效率」之間找平衡。它不像有些地方那麼講究嚴格的階級和繁複的禮節，同事之間可以開玩笑、一起吃飯、下班約唱歌；但遇到工作，大家又能認真拚一波。對外國人來說，只要願意主動打招呼、學幾句台灣人常用的口語，通常很快就能感受到同事的善意，在這片土地上找到自己的位置。",
      py:"Zhěngtǐ lái shuō, Táiwān de zhíchǎng wénhuà zài “rénqíng” hé “xiàolǜ” zhījiān zhǎo pínghéng. Tā bú xiàng yǒuxiē dìfāng nàme jiǎngjiù yángé de jiējí hé fánfù de lǐjié, tóngshì zhījiān kěyǐ kāi wánxiào, yìqǐ chīfàn, xiàbān yuē chànggē; dàn yùdào gōngzuò, dàjiā yòu néng rènzhēn pīn yì bō. Duì wàiguórén lái shuō, zhǐyào yuànyì zhǔdòng dǎ zhāohū, xué jǐ jù Táiwānrén chángyòng de kǒuyǔ, tōngcháng hěn kuài jiù néng gǎnshòu dào tóngshì de shànyì, zài zhè piàn tǔdì shàng zhǎodào zìjǐ de wèizhì.",
      m:{
        j:"総じて言えば、台湾の職場文化は「人情」と「効率」の間でバランスを取っています。厳格な階級や煩雑な礼儀を重んじる場所ほどではなく、同僚同士で冗談を言い、一緒に食事をし、退勤後にカラオケへ行くこともできます。それでいて、いざ仕事となればみんな真剣に一気に頑張れる。外国人にとっても、自分から挨拶し、台湾人がよく使う口語をいくつか覚えるだけで、たいていすぐに同僚の善意を感じられ、この土地で自分の居場所を見つけられるでしょう。",
        e:"On the whole, Taiwan's workplace culture strikes a balance between 'human warmth' and 'efficiency.' It isn't as fixated on strict hierarchy and elaborate etiquette as some places; colleagues can joke around, eat together, and hit the karaoke after work—yet when work comes, everyone can knuckle down and give it their all. For foreigners, simply being willing to greet others first and learning a few phrases of common Taiwanese speech usually lets you quickly feel your colleagues' goodwill and find your place on this land.",
        k:"전체적으로 대만의 직장 문화는 '인정'과 '효율' 사이에서 균형을 잡습니다. 엄격한 계급과 번잡한 예절을 따지는 곳만큼은 아니어서, 동료끼리 농담하고 함께 식사하며 퇴근 후 노래방에 가기도 합니다. 그러면서도 막상 일이 닥치면 모두 진지하게 한바탕 매진할 수 있습니다. 외국인에게도 먼저 인사하고 대만 사람이 자주 쓰는 구어 몇 마디만 익히면 대개 금세 동료의 호의를 느끼고 이 땅에서 자기 자리를 찾을 수 있습니다."
      }
    }
  ],
  vocab:[
    { w:"薪水", zy:"ㄒㄧㄣ ㄕㄨㄟˇ", py:"xīnshuǐ", m:{ j:"給料", e:"salary, wages", k:"월급·급여" } },
    { w:"加班", zy:"ㄐㄧㄚ ㄅㄢ", py:"jiābān", m:{ j:"残業", e:"to work overtime", k:"야근·초과근무" } },
    { w:"責任制", zy:"ㄗㄜˊ ㄖㄣˋ ㄓˋ", py:"zérènzhì", m:{ j:"責任制（時間ではなく成果で働く制度、実質は長時間労働になりがち）", e:"'responsibility-based' work system (often means unpaid overtime)", k:"책임제(성과 기준 근무제, 사실상 장시간 노동)" } },
    { w:"年終獎金", zy:"ㄋㄧㄢˊ ㄓㄨㄥ ㄐㄧㄤˇ ㄐㄧㄣ", py:"niánzhōng jiǎngjīn", m:{ j:"年末ボーナス", e:"year-end bonus", k:"연말 보너스" } },
    { w:"尾牙", zy:"ㄨㄟˇ ㄧㄚˊ", py:"wěiyá", m:{ j:"尾牙（会社の年末大宴会・忘年会）", e:"weiya, company year-end feast", k:"웨이야(회사 연말 대연회)" } },
    { w:"老闆", zy:"ㄌㄠˇ ㄅㄢˇ", py:"lǎobǎn", m:{ j:"社長・オーナー・店主", e:"boss, owner, proprietor", k:"사장·주인" } },
    { w:"前輩", zy:"ㄑㄧㄢˊ ㄅㄟˋ", py:"qiánbèi", m:{ j:"先輩", e:"senior colleague, mentor", k:"선배" } },
    { w:"主管", zy:"ㄓㄨˇ ㄍㄨㄢˇ", py:"zhǔguǎn", m:{ j:"上司・管理職", e:"supervisor, manager", k:"상사·관리자" } },
    { w:"同事", zy:"ㄊㄨㄥˊ ㄕˋ", py:"tóngshì", m:{ j:"同僚", e:"colleague, coworker", k:"동료" } },
    { w:"便當", zy:"ㄅㄧㄢˋ ㄉㄤ", py:"biàndāng", m:{ j:"弁当", e:"boxed meal, bento", k:"도시락" } },
    { w:"手搖飲", zy:"ㄕㄡˇ ㄧㄠˊ ㄧㄣˇ", py:"shǒuyáoyǐn", m:{ j:"（テイクアウトの）ドリンクスタンドの飲み物", e:"hand-shaken drink (bubble-tea-style beverage)", k:"버블티 등 음료 스탠드 음료" } },
    { w:"抽獎", zy:"ㄔㄡ ㄐㄧㄤˇ", py:"chōujiǎng", m:{ j:"抽選（くじ引き）", e:"lucky draw, raffle", k:"경품 추첨" } }
  ],
  note:{
    j:"「尾牙」の対になる行事に「頭牙（旧暦2月2日）」があり、一年の商売繁盛を祈る最初の『牙』です。かつて尾牙の席では、鶏の丸焼きの頭が向いた席の人が『来年は契約更新なし＝解雇』を暗に告げられる、という怖い言い伝えもありました（今はほとんど廃れています）。また台湾では『22K』という言葉が、若者の初任給の安さを象徴する社会問題を指す流行語になったこともあり、給料の話題は世代の空気を映す鏡でもあります。",
    e:"The 'weiya' has a counterpart called 'touya' (the second day of the second lunar month), the first 'ya' feast of the year, praying for a prosperous business year. There's an old, ominous tradition that at a weiya, whoever the roast chicken's head pointed to was quietly being told 'your contract won't be renewed'—i.e., you're fired (this has largely died out). In Taiwan, the term '22K' also became a buzzword symbolizing the social problem of low starting salaries for young people, so talk of pay is also a mirror of each generation's mood.",
    k:"'웨이야'와 짝을 이루는 행사로 '터우야(음력 2월 2일)'가 있는데, 한 해 장사의 번창을 비는 첫 '야' 잔치입니다. 옛날 웨이야 자리에서는 통닭의 머리가 향한 자리의 사람이 '내년 계약 갱신 없음=해고'를 은근히 통보받았다는 무서운 전설도 있습니다(지금은 거의 사라졌습니다). 또 대만에서는 '22K'라는 말이 청년 초봉이 낮은 사회 문제를 상징하는 유행어가 되기도 해, 월급 이야기는 세대의 분위기를 비추는 거울이기도 합니다."
  }
},
{
  id:"rechao-and-nightlife",
  cat:{ j:"仕事・くらし", e:"Work & Living", k:"일·생활" },
  zhTitle:"熱炒與夜生活：下班後的台灣",
  title:{ j:"熱炒とナイトライフ：仕事帰りの台湾", e:"Stir-Fry Joints and Nightlife: Taiwan After Hours", k:"러차오와 밤 문화: 퇴근 후의 대만" },
  intro:{
    j:"仕事が終わり、日が暮れると、台湾のもう一つの顔が動き出します。プラスチックの椅子、汗をかいたビール、鉄鍋から立ちのぼる炎——「熱炒（レーチャオ）」の店で、同僚や友人と一杯やる。そこから二軒目、三軒目へと流れていく夜。台湾の人々がどう夜を楽しむのか、その熱気のなかへ入ってみましょう。",
    e:"When work ends and the sun goes down, another side of Taiwan comes alive. Plastic stools, sweating bottles of beer, flames leaping from a wok—at a 'rechao' stir-fry joint, you knock back a few with colleagues and friends, then drift on to a second and a third venue. Let's step into the heat and see how Taiwanese unwind after dark.",
    k:"일이 끝나고 해가 지면 대만의 또 다른 얼굴이 깨어납니다. 플라스틱 의자, 물방울 맺힌 맥주병, 웍에서 치솟는 불길—'러차오' 볶음 요리 가게에서 동료·친구와 한잔하고, 다시 2차, 3차로 흘러가는 밤. 대만 사람들이 어떻게 밤을 즐기는지, 그 열기 속으로 들어가 봅시다."
  },
  paras:[
    {
      z:"如果要選一個最能代表台灣夜晚的地方，很多人會投給「熱炒店」。所謂熱炒，就是一種價格親民、上菜快速的台式快炒餐廳。招牌上常常寫著「一百塊熱炒」，意思是很多道菜一盤只要一百塊台幣。店裡通常沒有冷氣，擺著紅色塑膠椅、圓桌，牆上貼滿手寫菜單，廚房大火快炒，鍋鏟叮叮噹噹，整間店熱氣蒸騰、人聲鼎沸。",
      py:"Rúguǒ yào xuǎn yí ge zuì néng dàibiǎo Táiwān yèwǎn de dìfāng, hěnduō rén huì tóu gěi “rèchǎo diàn”. Suǒwèi rèchǎo, jiùshì yì zhǒng jiàgé qīnmín, shàngcài kuàisù de táishì kuàichǎo cāntīng. Zhāopái shàng chángcháng xiězhe “yìbǎi kuài rèchǎo”, yìsi shì hěnduō dào cài yì pán zhǐyào yìbǎi kuài Táibì. Diàn lǐ tōngcháng méiyǒu lěngqì, bǎizhe hóngsè sùjiāoyǐ, yuánzhuō, qiáng shàng tiē mǎn shǒuxiě càidān, chúfáng dàhuǒ kuàichǎo, guōchǎn dīngdīngdāngdāng, zhěng jiān diàn rèqì zhēngténg, rénshēng dǐngfèi.",
      m:{
        j:"台湾の夜を最も象徴する場所を一つ選ぶなら、多くの人が「熱炒店」に一票を投じるでしょう。熱炒とは、値段が手頃で料理が出るのも速い台湾式の炒め物レストランのこと。看板にはよく「一百塊熱炒（百元炒め）」と書かれ、多くの料理が一皿百元台湾ドルという意味です。店内はたいていクーラーがなく、赤いプラスチック椅子と丸テーブルが並び、壁には手書きのメニューがびっしり。厨房では強火で一気に炒め、お玉と鍋がカチャカチャ鳴り、店じゅうが熱気に包まれ、人の声で沸き返っています。",
        e:"If you had to pick the one place that best captures a Taiwanese night, many would vote for the 'rechao' stir-fry joint. A rechao is a Taiwanese quick stir-fry restaurant—affordable and fast. Signs often read 'hundred-dollar stir-fry,' meaning many dishes cost just a hundred NT dollars a plate. There's usually no air-conditioning; red plastic stools and round tables fill the room, handwritten menus paper the walls, the kitchen stir-fries over roaring flames, spatula and wok clang away, and the whole place steams with heat and buzzes with voices.",
        k:"대만의 밤을 가장 잘 대표하는 곳을 하나 고르라면 많은 사람이 '러차오 가게'에 한 표를 던질 겁니다. 러차오란 가격이 저렴하고 요리가 빨리 나오는 대만식 볶음 요리 식당입니다. 간판에는 흔히 '백 원 러차오'라고 쓰여 있는데, 많은 요리가 한 접시에 백 대만달러라는 뜻입니다. 가게 안에는 대개 에어컨이 없고 빨간 플라스틱 의자와 원탁이 놓여 있으며 벽에는 손으로 쓴 메뉴가 빽빽합니다. 주방에서는 센 불로 재빨리 볶고 국자와 웍이 달그락거리며, 가게 전체가 열기로 가득 차고 사람들 소리로 들끓습니다."
      }
    },
    {
      z:"熱炒的靈魂，除了菜，就是「台啤」。台灣啤酒是本地最經典的品牌，冰得透心涼，配上炒海瓜子、鹽酥雞、三杯雞、炒飯，就是最道地的組合。大家會一邊「乾杯」一邊聊天，杯子碰在一起，喊一聲「乎乾啦！」（台語，把酒喝乾的意思）。這種不拘小節、大口吃菜大口喝酒的氣氛，正是台灣人放鬆、交心的方式。",
      py:"Rèchǎo de línghún, chúle cài, jiùshì “táipí”. Táiwān píjiǔ shì běndì zuì jīngdiǎn de pǐnpái, bīng de tòuxīnliáng, pèi shàng chǎo hǎiguāzǐ, yánsūjī, sānbēijī, chǎofàn, jiùshì zuì dàodì de zǔhé. Dàjiā huì yìbiān “gānbēi” yìbiān liáotiān, bēizi pèng zài yìqǐ, hǎn yì shēng “hū gān la!”（Táiyǔ, bǎ jiǔ hēgān de yìsi）. Zhè zhǒng bùjū xiǎojié, dàkǒu chī cài dàkǒu hē jiǔ de qìfēn, zhèng shì Táiwānrén fàngsōng, jiāoxīn de fāngshì.",
      m:{
        j:"熱炒の魂は、料理のほかに「台啤（タイビール）」です。台湾ビールは地元で最も定番のブランドで、キンキンに冷やして、あさりの炒め物、台湾風唐揚げ（塩酥鶏）、三杯鶏、チャーハンと合わせるのが、最も本格的な組み合わせ。みんな「乾杯」しながらおしゃべりし、グラスを合わせて「ホーガンラー！（台湾語で『飲み干せ』の意）」と声をあげます。細かいことにこだわらず、豪快に食べて豪快に飲むこの雰囲気こそ、台湾人がリラックスし、心を通わせるやり方なのです。",
        e:"The soul of rechao, besides the food, is 'Taiwan Beer.' It's the island's most classic brand, chilled ice-cold, and paired with stir-fried clams, popcorn chicken, three-cup chicken, and fried rice for the most authentic combo. Everyone chats while they 'ganbei' (bottoms up), clinking glasses and shouting 'Ho gan la!'—Taiwanese for 'drink it dry.' This unfussy atmosphere of big bites and big gulps is exactly how Taiwanese relax and bond.",
        k:"러차오의 영혼은 요리 외에 '타이완 맥주'입니다. 타이완 맥주는 현지에서 가장 대표적인 브랜드로, 얼음처럼 차갑게 해서 조개 볶음, 대만식 닭튀김(옌쑤지), 싼베이지, 볶음밥과 곁들이는 것이 가장 정통 조합입니다. 모두 '건배'하며 수다를 떨고, 잔을 부딪치며 '호간라!'(대만어로 '술을 다 마셔라'라는 뜻)라고 외칩니다. 사소한 것에 얽매이지 않고 호쾌하게 먹고 마시는 이 분위기야말로 대만 사람이 긴장을 풀고 마음을 나누는 방식입니다."
      }
    },
    {
      z:"台灣人喝酒有個很重要的文化，叫做「續攤」。一頓飯吃完、一攤喝完，如果大家還意猶未盡，就會有人提議「走，再續一攤！」於是從熱炒店移動到居酒屋、酒吧，甚至再到KTV唱歌。第一攤、第二攤、第三攤，一路換場地，越喝越晚。願不願意續攤，有時候也代表了朋友之間的交情夠不夠深。",
      py:"Táiwānrén hējiǔ yǒu ge hěn zhòngyào de wénhuà, jiàozuò “xù tān”. Yí dùn fàn chī wán, yì tān hē wán, rúguǒ dàjiā hái yìyóuwèijìn, jiù huì yǒurén tíyì “zǒu, zài xù yì tān!” Yúshì cóng rèchǎo diàn yídòng dào jūjiǔwū, jiǔbā, shènzhì zài dào KTV chànggē. Dì yī tān, dì èr tān, dì sān tān, yílù huàn chǎngdì, yuè hē yuè wǎn. Yuàn bú yuànyì xù tān, yǒushíhòu yě dàibiǎo le péngyǒu zhījiān de jiāoqíng gòu bú gòu shēn.",
      m:{
        j:"台湾人の飲み方には、とても大切な文化があります。「續攤（はしご酒／二次会）」です。一回の食事が終わり、一軒飲み終えても、まだ物足りなければ、誰かが「行こう、もう一軒！」と提案します。こうして熱炒店から居酒屋、バー、さらにはKTV（カラオケ）へと移動していく。一軒目、二軒目、三軒目と場所を変え、飲むほどに夜は更けていきます。はしご酒に付き合うかどうかは、時に友人同士の親密さの深さを表すことにもなります。",
        e:"Taiwanese drinking has an important culture called 'xu tan'—moving to the next venue (barhopping). When a meal or a round is done, if everyone's still not satisfied, someone will propose 'Come on, let's hit another spot!' So you move from the rechao joint to an izakaya, a bar, even on to KTV to sing. First stop, second stop, third stop—you keep changing venues, drinking later and later. Whether or not you're up for the next round can even signal how deep the friendship runs.",
        k:"대만 사람의 음주에는 아주 중요한 문화가 있는데, 바로 '2차 가기(續攤)'입니다. 한 끼 식사가 끝나고 한 곳에서 다 마셔도 아직 아쉬우면 누군가 '가자, 한 곳 더!'라고 제안합니다. 그래서 러차오 가게에서 이자카야, 바, 심지어 KTV(노래방)로 옮겨 갑니다. 1차, 2차, 3차로 장소를 바꾸며 마실수록 밤이 깊어집니다. 2차에 함께 가느냐 마느냐가 때로는 친구 사이의 정이 얼마나 깊은지를 나타내기도 합니다."
      }
    },
    {
      z:"除了熱炒，台灣的夜生活其實很多元。喜歡日式風格的人，會去「居酒屋」點串燒、清酒，享受比較安靜的氛圍；年輕人想放鬆聊天，會找有調酒師的酒吧，點一杯特調；想要熱鬧一點的，就往夜店跑，在強勁的音樂和燈光裡跳舞到深夜。台北的信義區、東區，各大城市的酒吧一條街，一到週末就人潮滿滿。",
      py:"Chúle rèchǎo, Táiwān de yèshēnghuó qíshí hěn duōyuán. Xǐhuān rìshì fēnggé de rén, huì qù “jūjiǔwū” diǎn chuànshāo, qīngjiǔ, xiǎngshòu bǐjiào ānjìng de fēnwéi; niánqīngrén xiǎng fàngsōng liáotiān, huì zhǎo yǒu tiáojiǔshī de jiǔbā, diǎn yì bēi tètiáo; xiǎng yào rènào yìdiǎn de, jiù wǎng yèdiàn pǎo, zài qiángjìng de yīnyuè hé dēngguāng lǐ tiàowǔ dào shēnyè. Táiběi de Xìnyìqū, Dōngqū, gè dà chéngshì de jiǔbā yìtiáojiē, yí dào zhōumò jiù réncháo mǎnmǎn.",
      m:{
        j:"熱炒のほかにも、台湾のナイトライフは実に多彩です。和風が好きな人は「居酒屋」で串焼きや日本酒を頼み、比較的静かな雰囲気を楽しみます。若者はリラックスして語らいたければ、バーテンダーのいるバーでオリジナルカクテルを一杯。もっとにぎやかにしたい人は、クラブへ繰り出し、力強い音楽と照明のなか深夜まで踊ります。台北の信義区や東区、各都市のバーが並ぶ通りは、週末になると人波であふれます。",
        e:"Beyond rechao, Taiwan's nightlife is genuinely diverse. Those who like a Japanese vibe head to an 'izakaya' for skewers and sake and a quieter mood; young people wanting to relax and chat seek out a bar with a mixologist and order a signature cocktail; those craving something livelier make for a nightclub, dancing into the small hours amid pounding music and lights. Taipei's Xinyi and East districts, and the bar streets of every big city, overflow with crowds come the weekend.",
        k:"러차오 외에도 대만의 밤 문화는 정말 다양합니다. 일본풍을 좋아하는 사람은 '이자카야'에서 꼬치구이와 사케를 시켜 비교적 조용한 분위기를 즐기고, 젊은이들은 편하게 이야기하고 싶으면 바텐더가 있는 바에서 시그니처 칵테일을 한 잔 시킵니다. 더 떠들썩하게 놀고 싶은 사람은 클럽으로 가 강렬한 음악과 조명 속에서 새벽까지 춤을 춥니다. 타이베이의 신이구, 둥구, 각 도시의 바 거리는 주말이 되면 인파로 가득합니다."
      }
    },
    {
      z:"值得一提的是，台灣的夜生活相對來說很安全。就算喝到半夜，走在街上、搭捷運回家，通常也不太需要擔心。深夜的便利商店永遠亮著燈，肚子餓了可以買碗泡麵、關東煮；喝多了想醒酒，路邊還有賣清粥小菜或滷味的攤子。這種「玩得盡興、又能安全回家」的環境，是很多外國人來台灣後特別喜歡的一點。",
      py:"Zhídé yì tí de shì, Táiwān de yèshēnghuó xiāngduì lái shuō hěn ānquán. Jiùsuàn hē dào bànyè, zǒu zài jiē shàng, dā jiéyùn huíjiā, tōngcháng yě bú tài xūyào dānxīn. Shēnyè de biànlì shāngdiàn yǒngyuǎn liàngzhe dēng, dùzi è le kěyǐ mǎi wǎn pàomiàn, guāndōngzhǔ; hē duō le xiǎng xǐngjiǔ, lùbiān hái yǒu mài qīngzhōu xiǎocài huò lǔwèi de tānzi. Zhè zhǒng “wán de jìnxìng, yòu néng ānquán huíjiā” de huánjìng, shì hěnduō wàiguórén lái Táiwān hòu tèbié xǐhuān de yìdiǎn.",
      m:{
        j:"特筆すべきは、台湾のナイトライフが比較的安全なことです。夜中まで飲んでも、街を歩いてMRTで帰るのに、たいてい大きな心配はいりません。深夜のコンビニは常に明かりが灯り、お腹が空けばカップ麺やおでんを買えます。飲みすぎて酔いを覚ましたければ、道端にはお粥とおかず、あるいは煮込み（滷味）を売る屋台もあります。この「思いきり楽しんで、しかも安全に帰れる」環境は、多くの外国人が台湾に来てから特に気に入る点です。",
        e:"Worth noting is that Taiwan's nightlife is relatively safe. Even after drinking into the small hours, walking the streets and taking the MRT home usually isn't much of a worry. Late-night convenience stores are always lit up—hungry, you can grab a bowl of instant noodles or oden; needing to sober up, there are roadside stalls selling rice porridge with side dishes or braised snacks (luwei). This environment of 'party to your heart's content and still get home safely' is something many foreigners especially love after arriving in Taiwan.",
        k:"주목할 만한 점은 대만의 밤 문화가 비교적 안전하다는 것입니다. 한밤중까지 마셔도 거리를 걷고 MRT를 타고 집에 가는 데 대개 크게 걱정할 필요가 없습니다. 심야의 편의점은 늘 불이 켜져 있어 배가 고프면 컵라면이나 오뎅을 살 수 있고, 과음해서 술을 깨고 싶으면 길가에 죽과 반찬, 혹은 조림 안주(루웨이)를 파는 노점도 있습니다. 이런 '마음껏 놀고도 안전하게 집에 갈 수 있는' 환경은 많은 외국인이 대만에 와서 특히 좋아하는 점입니다."
      }
    },
    {
      z:"對台灣人來說，下班後的這幾個小時，不只是喝酒吃飯，更是一種釋放壓力、維繫感情的儀式。白天在辦公室拚業績、被主管盯，晚上就靠一桌熱炒、幾瓶台啤把疲憊沖掉。等到明天鬧鐘一響，又能精神抖擻地重新上工。這種張弛之間的節奏，正是台灣人「認真工作、也認真生活」的最好寫照。",
      py:"Duì Táiwānrén lái shuō, xiàbān hòu de zhè jǐ ge xiǎoshí, bùzhǐ shì hējiǔ chīfàn, gèng shì yì zhǒng shìfàng yālì, wéixì gǎnqíng de yíshì. Báitiān zài bàngōngshì pīn yèjì, bèi zhǔguǎn dīng, wǎnshàng jiù kào yì zhuō rèchǎo, jǐ píng táipí bǎ píbèi chōng diào. Děngdào míngtiān nàozhōng yì xiǎng, yòu néng jīngshén dǒusǒu de chóngxīn shànggōng. Zhè zhǒng zhāngchí zhījiān de jiézòu, zhèng shì Táiwānrén “rènzhēn gōngzuò, yě rènzhēn shēnghuó” de zuì hǎo xiězhào.",
      m:{
        j:"台湾人にとって、退勤後のこの数時間は、単に飲み食いするだけでなく、ストレスを解き放ち、人間関係を保つ一種の儀式です。昼間はオフィスで業績を追い、上司ににらまれ、夜は一卓の熱炒と数本の台啤で疲れを洗い流す。翌朝、目覚まし時計が鳴れば、また元気いっぱいに仕事へ戻れる。この張りと緩みの間のリズムこそ、台湾人の「真剣に働き、真剣に生きる」姿を最もよく表しています。",
        e:"For Taiwanese, these few hours after work aren't just about eating and drinking—they're a ritual for releasing stress and keeping relationships alive. By day you chase targets in the office and get watched by your boss; by night a table of rechao and a few Taiwan Beers wash the exhaustion away. When the alarm rings the next morning, you can head back to work refreshed. This rhythm of tension and release is the best portrait of how Taiwanese 'work hard and live hard' alike.",
        k:"대만 사람에게 퇴근 후의 이 몇 시간은 단순히 먹고 마시는 것이 아니라 스트레스를 풀고 관계를 유지하는 일종의 의식입니다. 낮에는 사무실에서 실적을 좇고 상사에게 감시받다가, 밤에는 러차오 한 상과 타이완 맥주 몇 병으로 피로를 씻어 냅니다. 다음 날 알람이 울리면 다시 기운차게 출근할 수 있습니다. 긴장과 이완 사이의 이 리듬이야말로 대만 사람의 '열심히 일하고 열심히 사는' 모습을 가장 잘 보여 줍니다."
      }
    }
  ],
  vocab:[
    { w:"熱炒", zy:"ㄖㄜˋ ㄔㄠˇ", py:"rèchǎo", m:{ j:"熱炒（台湾式の安くて速い炒め物居酒屋）", e:"rechao, Taiwanese stir-fry eatery/pub", k:"러차오(대만식 저렴한 볶음 요리 술집)" } },
    { w:"台啤", zy:"ㄊㄞˊ ㄆㄧˊ", py:"táipí", m:{ j:"台湾ビール（台灣啤酒の略）", e:"Taiwan Beer", k:"타이완 맥주" } },
    { w:"乾杯", zy:"ㄍㄢ ㄅㄟ", py:"gānbēi", m:{ j:"乾杯（飲み干す）", e:"cheers; bottoms up", k:"건배" } },
    { w:"續攤", zy:"ㄒㄩˋ ㄊㄢ", py:"xù tān", m:{ j:"次の店へ移る・はしご酒・二次会", e:"to move to the next venue; barhopping", k:"2차 가기·자리 옮기기" } },
    { w:"居酒屋", zy:"ㄐㄩ ㄐㄧㄡˇ ㄨ", py:"jūjiǔwū", m:{ j:"居酒屋", e:"izakaya (Japanese-style pub)", k:"이자카야" } },
    { w:"酒吧", zy:"ㄐㄧㄡˇ ㄅㄚ", py:"jiǔbā", m:{ j:"バー", e:"bar", k:"바" } },
    { w:"夜店", zy:"ㄧㄝˋ ㄉㄧㄢˋ", py:"yèdiàn", m:{ j:"クラブ（ナイトクラブ）", e:"nightclub", k:"클럽·나이트클럽" } },
    { w:"鹽酥雞", zy:"ㄧㄢˊ ㄙㄨ ㄐㄧ", py:"yánsūjī", m:{ j:"台湾風フライドチキン（塩胡椒の唐揚げ）", e:"salt-and-pepper fried chicken (popcorn chicken)", k:"대만식 닭튀김(옌쑤지)" } },
    { w:"滷味", zy:"ㄌㄨˇ ㄨㄟˋ", py:"lǔwèi", m:{ j:"滷味（醤油ダレで煮込んだ具の盛り合わせ）", e:"luwei, braised snacks in soy sauce", k:"루웨이(간장 조림 안주)" } },
    { w:"調酒", zy:"ㄊㄧㄠˊ ㄐㄧㄡˇ", py:"tiáojiǔ", m:{ j:"カクテル", e:"cocktail; mixed drink", k:"칵테일" } },
    { w:"醒酒", zy:"ㄒㄧㄥˇ ㄐㄧㄡˇ", py:"xǐngjiǔ", m:{ j:"酔いを覚ます", e:"to sober up", k:"술을 깨다" } },
    { w:"釋放壓力", zy:"ㄕˋ ㄈㄤˋ ㄧㄚ ㄌㄧˋ", py:"shìfàng yālì", m:{ j:"ストレスを発散する", e:"to release stress", k:"스트레스를 풀다" } }
  ],
  note:{
    j:"熱炒店では、酔うと必ず登場する台湾語の掛け声「乎乾啦（ホーガンラー）」がおなじみです。もともとはビールのCMソングから広まった言葉で、今では『飲み干せ！』の合図として定着しています。また台湾では飲酒運転（酒駕）の罰則が非常に厳しく、飲んだら『代駕（運転代行）』を呼ぶか、タクシー・MRTで帰るのが常識。だからこそ、みんな安心して續攤（はしご酒）を楽しめるのです。飲めない人には『喝茶配（お茶で付き合う）』という優しい文化もあります。",
    e:"At rechao joints, the Taiwanese rallying cry 'ho gan la' inevitably appears once people are tipsy. It originally spread from a beer commercial jingle and is now the standard signal for 'drink it dry!' Taiwan also punishes drunk driving (jiujia) very harshly, so after drinking, the norm is to call a 'designated driver' (daijia) or head home by taxi or MRT. That's exactly why everyone can enjoy barhopping worry-free. For non-drinkers, there's also the kind custom of 'joining with tea' instead of alcohol.",
    k:"러차오 가게에서는 취기가 오르면 반드시 등장하는 대만어 구호 '호간라'가 익숙합니다. 원래 맥주 광고 노래에서 퍼진 말로, 이제는 '다 마셔라!'라는 신호로 자리 잡았습니다. 또 대만에서는 음주운전(주가) 처벌이 매우 엄격해서, 마신 뒤에는 '대리운전(다이자)'을 부르거나 택시·MRT로 귀가하는 것이 상식입니다. 그래서 모두 안심하고 2차를 즐길 수 있는 것이죠. 못 마시는 사람에게는 '차로 함께한다'는 배려의 문화도 있습니다."
  }
},
{
  id:"boss-spirit-small-business",
  cat:{ j:"仕事・くらし", e:"Work & Living", k:"일·생활" },
  zhTitle:"頭家精神：從黑手到老闆的台灣夢",
  title:{ j:"頭家（トウケ）精神：職人から社長へという台湾の夢", e:"The 'Boss' Spirit: From Grease-Stained Hands to Owner, a Taiwanese Dream", k:"터우자 정신: 기술공에서 사장으로, 대만의 꿈" },
  intro:{
    j:"台湾を歩くと、通りのあちこちに小さな店や工場がひしめいています。朝市の弁当屋、路地裏の町工場、夜市の屋台——その多くが、家族で切り盛りする小さな商売です。台湾語で社長を「頭家（トウケ）」と呼び、『いつか自分の店を持ちたい』という思いは、多くの台湾人の胸の奥に流れています。台湾経済を底から支える、この起業のDNAをのぞいてみましょう。",
    e:"Walk through Taiwan and you'll find small shops and workshops packed along every street—the morning-market lunchbox stand, the back-alley machine shop, the night-market stall—most of them small businesses run by families. In Taiwanese, a boss is called 'touke,' and the wish to 'one day have a shop of my own' runs deep in many Taiwanese hearts. Let's look at the entrepreneurial DNA that supports Taiwan's economy from the ground up.",
    k:"대만을 걷다 보면 거리 곳곳에 작은 가게와 공장이 빽빽합니다. 아침 시장의 도시락집, 뒷골목의 작은 공장, 야시장의 노점—그 대부분이 가족이 꾸려 가는 작은 장사입니다. 대만어로 사장을 '터우자'라 부르며, '언젠가 내 가게를 갖고 싶다'는 마음은 많은 대만 사람의 가슴 깊이 흐릅니다. 대만 경제를 밑에서 떠받치는 이 창업의 DNA를 들여다봅시다."
  },
  paras:[
    {
      z:"台灣的經濟，表面上有台積電這種舉世聞名的大企業，但真正撐起就業和日常生活的，其實是數量龐大的「中小企業」。全台灣有超過一百五十萬家中小企業，佔了所有企業的絕大多數，也提供了大部分人的工作機會。從街角的早餐店、五金行，到接國際訂單的小工廠，這些不起眼的小生意，才是台灣經濟真正的骨幹。",
      py:"Táiwān de jīngjì, biǎomiàn shàng yǒu Táijīdiàn zhè zhǒng jǔshì wénmíng de dà qǐyè, dàn zhēnzhèng chēng qǐ jiùyè hé rìcháng shēnghuó de, qíshí shì shùliàng pángdà de “zhōngxiǎo qǐyè”. Quán Táiwān yǒu chāoguò yìbǎi wǔshí wàn jiā zhōngxiǎo qǐyè, zhàn le suǒyǒu qǐyè de juédà duōshù, yě tígōng le dàbùfèn rén de gōngzuò jīhuì. Cóng jiējiǎo de zǎocān diàn, wǔjīnháng, dào jiē guójì dìngdān de xiǎo gōngchǎng, zhèxiē bù qǐyǎn de xiǎo shēngyì, cái shì Táiwān jīngjì zhēnzhèng de gǔgàn.",
      m:{
        j:"台湾経済には、表向きにはTSMC（台積電）のような世界的に有名な大企業があります。しかし、雇用と日常生活を本当に支えているのは、実は膨大な数の「中小企業」です。台湾全体で百五十万社を超える中小企業があり、全企業の圧倒的多数を占め、大部分の人の働き口を提供しています。街角の朝食店や金物屋から、国際的な注文を受ける小さな工場まで——こうした目立たない小商いこそが、台湾経済の本当の屋台骨なのです。",
        e:"On the surface, Taiwan's economy has world-famous giants like TSMC, but what truly holds up employment and daily life is a vast number of 'small and medium-sized enterprises' (SMEs). Taiwan has over 1.5 million SMEs—the overwhelming majority of all firms—providing most people's jobs. From the corner breakfast shop and hardware store to small factories filling international orders, these unremarkable little businesses are the real backbone of Taiwan's economy.",
        k:"대만 경제에는 겉으로는 TSMC(타이지뎬) 같은 세계적으로 유명한 대기업이 있습니다. 하지만 고용과 일상생활을 실제로 떠받치는 것은 사실 방대한 수의 '중소기업'입니다. 대만 전체에 150만 개가 넘는 중소기업이 있어 전체 기업의 절대다수를 차지하고 대부분 사람의 일자리를 제공합니다. 길모퉁이의 아침식사 가게, 철물점부터 국제 주문을 받는 작은 공장까지—이 눈에 띄지 않는 작은 장사야말로 대만 경제의 진정한 등뼈입니다."
      }
    },
    {
      z:"在台灣，有一句很生動的話：「黑手變頭家」。「黑手」指的是修車、做黑手工、在工廠裡雙手沾滿油污的技術工人；「頭家」則是台語裡「老闆」的意思。這句話說的，是一個學徒從基層做起，靠著一身好技術和多年打拚，最後自己出來開店、當老闆的故事。這種靠雙手翻身的傳奇，在台灣的上一代身上比比皆是。",
      py:"Zài Táiwān, yǒu yí jù hěn shēngdòng de huà: “hēishǒu biàn tóujiā”. “Hēishǒu” zhǐ de shì xiūchē, zuò hēishǒugōng, zài gōngchǎng lǐ shuāngshǒu zhānmǎn yóuwū de jìshù gōngrén; “tóujiā” zé shì Táiyǔ lǐ “lǎobǎn” de yìsi. Zhè jù huà shuō de, shì yí ge xuétú cóng jīcéng zuò qǐ, kàozhe yìshēn hǎo jìshù hé duōnián dǎpīn, zuìhòu zìjǐ chūlái kāidiàn, dāng lǎobǎn de gùshì. Zhè zhǒng kào shuāngshǒu fānshēn de chuánqí, zài Táiwān de shàng yí dài shēnshàng bǐbǐjiēshì.",
      m:{
        j:"台湾には、とても生き生きとした言い回しがあります。「黑手變頭家（クロテが社長になる）」。「黑手（クロテ）」とは、自動車修理や機械仕事で、工場のなか両手を油だらけにして働く技術工のこと。「頭家（トウケ）」は台湾語で「社長」の意味です。この言葉が語るのは、一人の徒弟が下働きから始まり、確かな技術と長年の頑張りを頼りに、ついには自分で店を構え、社長になるという物語。こうした自らの手で人生を切り開いた伝説は、台湾の上の世代には数えきれないほどあります。",
        e:"Taiwan has a vivid saying: 'grease-stained hands become the boss' (heishou bian touke). 'Heishou'—literally 'black hands'—refers to skilled workers who repair cars or do machine work, their hands coated in grease in the factory; 'touke' is Taiwanese for 'boss.' The saying tells the story of an apprentice who starts at the bottom and, relying on solid skills and years of hard graft, finally opens a shop and becomes the boss. Such legends of turning one's life around by hand abound among Taiwan's older generation.",
        k:"대만에는 아주 생생한 표현이 있습니다. '기름손이 사장이 된다(黑手變頭家)'. '헤이서우(검은 손)'는 자동차 수리나 기계 일로 공장에서 두 손이 기름투성이가 되는 기술공을 말하고, '터우자'는 대만어로 '사장'이라는 뜻입니다. 이 말이 전하는 것은, 한 견습생이 밑바닥부터 시작해 탄탄한 기술과 오랜 노력에 힘입어 마침내 자기 가게를 열고 사장이 되는 이야기입니다. 이렇게 두 손으로 인생을 뒤집은 전설은 대만의 윗세대에게 셀 수 없이 많습니다."
      }
    },
    {
      z:"對很多台灣人來說，「當老闆」不只是賺錢，更是一種人生目標和骨子裡的價值觀。寧願自己當頭家、辛苦一點，也不想一輩子替別人打工——這種心態，讓台灣人特別願意冒險創業。哪怕只是頂下一間小小的飲料店、一台餐車，或在夜市租一個攤位，很多人都想試試看「自己做生意」的滋味。這股不服輸、想拚出頭天的精神，就是所謂的「頭家精神」。",
      py:"Duì hěnduō Táiwānrén lái shuō, “dāng lǎobǎn” bùzhǐ shì zhuànqián, gèng shì yì zhǒng rénshēng mùbiāo hé gǔzi lǐ de jiàzhíguān. Nìngyuàn zìjǐ dāng tóujiā, xīnkǔ yìdiǎn, yě bùxiǎng yíbèizi tì biérén dǎgōng——zhè zhǒng xīntài, ràng Táiwānrén tèbié yuànyì màoxiǎn chuàngyè. Nǎpà zhǐshì dǐng xià yì jiān xiǎoxiǎo de yǐnliào diàn, yì tái cānchē, huò zài yèshì zū yí ge tānwèi, hěnduō rén dōu xiǎng shìshì kàn “zìjǐ zuò shēngyì” de zīwèi. Zhè gǔ bùfúshū, xiǎng pīn chū tóutiān de jīngshén, jiùshì suǒwèi de “tóujiā jīngshén”.",
      m:{
        j:"多くの台湾人にとって、「社長になる」ことは、単に金を稼ぐだけでなく、人生の目標であり、骨の髄まで染みついた価値観です。少々苦労しても自分が頭家になりたい、一生他人に雇われて働きたくはない——この心持ちが、台湾人をとりわけ起業のリスクに飛び込ませます。たとえ小さな飲料店やキッチンカーを一台引き継ぐだけでも、夜市に屋台を一つ借りるだけでも、多くの人が「自分で商売をする」味を試してみたいと思う。この負けん気の、一旗あげたいという精神こそ、いわゆる「頭家精神」です。",
        e:"For many Taiwanese, 'being the boss' is not just about making money—it's a life goal and a bone-deep value. They'd rather be their own touke and toil a bit harder than spend a lifetime working for someone else; this mindset makes Taiwanese especially willing to take the risk of starting a business. Even just taking over a tiny drink shop or a food truck, or renting a stall at the night market, many people want to taste what it's like to 'run your own business.' This unyielding spirit of wanting to make it big is precisely the 'boss spirit' (touke jingshen).",
        k:"많은 대만 사람에게 '사장이 되는 것'은 단순히 돈을 버는 것이 아니라 인생의 목표이자 뼛속 깊이 밴 가치관입니다. 조금 고생하더라도 스스로 터우자가 되고 싶지, 평생 남 밑에서 일하고 싶지 않다—이런 마음가짐이 대만 사람을 특히 창업의 위험에 뛰어들게 합니다. 작은 음료 가게나 푸드트럭 하나를 인수하는 것이든, 야시장에 노점 하나를 빌리는 것이든, 많은 사람이 '스스로 장사하는' 맛을 보고 싶어 합니다. 이 지지 않으려는, 크게 성공하고 싶은 정신이 바로 '터우자 정신'입니다."
      }
    },
    {
      z:"夜市，正是這股頭家精神最好的舞台。想創業卻資金不多的人，常常會先從擺攤開始。租金比開店便宜，一台攤車、一個招牌、一項拿手的小吃，就能開張。很多現在有名的連鎖品牌，最早都是從夜市的一個小攤位做起的。賣雞排、賣珍奶、賣蔥油餅，一步一步累積客人和口碑，最後展店、開分店，這樣的故事在台灣一再上演。",
      py:"Yèshì, zhèng shì zhè gǔ tóujiā jīngshén zuì hǎo de wǔtái. Xiǎng chuàngyè què zījīn bù duō de rén, chángcháng huì xiān cóng bǎitān kāishǐ. Zūjīn bǐ kāidiàn piányí, yì tái tānchē, yí ge zhāopái, yí xiàng náshǒu de xiǎochī, jiù néng kāizhāng. Hěnduō xiànzài yǒumíng de liánsuǒ pǐnpái, zuìzǎo dōu shì cóng yèshì de yí ge xiǎo tānwèi zuò qǐ de. Mài jīpái, mài zhēnnǎi, mài cōngyóubǐng, yí bù yí bù lěijī kèrén hé kǒubēi, zuìhòu zhǎndiàn, kāi fēndiàn, zhèyàng de gùshì zài Táiwān yízài shàngyǎn.",
      m:{
        j:"夜市こそ、この頭家精神が最も輝く舞台です。起業したいけれど資金が少ない人は、まず屋台から始めることがよくあります。家賃は店を構えるより安く、屋台車一台、看板一つ、得意な軽食一品があれば開業できる。今では有名なチェーンブランドの多くも、もともとは夜市の小さな屋台一つから始まりました。フライドチキン（雞排）を売り、タピオカミルクティーを売り、ネギ餅を売り、一歩ずつ客と評判を積み重ね、ついには店舗を広げ、支店を出す——こうした物語が、台湾では何度も繰り返し演じられています。",
        e:"The night market is the finest stage for this boss spirit. Those who want to start a business but lack much capital often begin by running a stall. Rent is cheaper than opening a shop; a cart, a sign, and one signature snack are enough to get going. Many now-famous chain brands began from a single small night-market stall. Selling fried chicken cutlets, bubble tea, scallion pancakes—step by step they build up customers and a reputation, and finally expand and open branches. Stories like this play out again and again in Taiwan.",
        k:"야시장이야말로 이 터우자 정신이 가장 빛나는 무대입니다. 창업하고 싶지만 자금이 넉넉하지 않은 사람은 흔히 노점부터 시작합니다. 임대료가 가게를 여는 것보다 싸고, 노점 수레 하나, 간판 하나, 잘하는 간식 하나면 개업할 수 있습니다. 지금은 유명한 체인 브랜드의 상당수도 처음에는 야시장의 작은 노점 하나에서 시작했습니다. 닭튀김(지파이)을 팔고, 버블티를 팔고, 파전을 팔며 한 걸음씩 손님과 평판을 쌓아 마침내 매장을 넓히고 지점을 냅니다. 이런 이야기가 대만에서는 몇 번이고 되풀이됩니다."
      }
    },
    {
      z:"當然，當老闆從來都不輕鬆。開一家店，要煩惱租金、食材成本、人手、天氣、客人多不多，還要親自站在第一線，早出晚歸、全年無休。很多小店老闆是「校長兼撞鐘」，從採買、料理、收銀到打掃通通自己來。景氣不好的時候，一間又一間店收掉，也是台灣街頭常見的風景。創業的浪漫背後，其實是實實在在的辛苦。",
      py:"Dāngrán, dāng lǎobǎn cónglái dōu bù qīngsōng. Kāi yì jiā diàn, yào fánnǎo zūjīn, shícái chéngběn, rénshǒu, tiānqì, kèrén duō bù duō, hái yào qīnzì zhàn zài dì yī xiàn, zǎochū wǎnguī, quánnián wúxiū. Hěnduō xiǎodiàn lǎobǎn shì “xiàozhǎng jiān zhuàngzhōng”, cóng cǎimǎi, liàolǐ, shōuyín dào dǎsǎo tōngtōng zìjǐ lái. Jǐngqì bù hǎo de shíhòu, yì jiān yòu yì jiān diàn shōu diào, yěshì Táiwān jiētóu chángjiàn de fēngjǐng. Chuàngyè de làngmàn bèihòu, qíshí shì shíshízàizài de xīnkǔ.",
      m:{
        j:"もちろん、社長になるのは決して楽ではありません。店を一軒開けば、家賃、食材コスト、人手、天気、客の入り具合に頭を悩ませ、しかも自ら最前線に立ち、朝早くから夜遅くまで、年中無休で働くことになります。多くの小さな店の主人は「校長兼用務員」——仕入れから調理、レジ打ち、掃除まで、何もかも自分でこなします。景気が悪いときは、店が次々と閉じていくのも、台湾の街角でよく見る風景です。起業のロマンの裏側には、実は紛れもない苦労があるのです。",
        e:"Of course, being the boss is never easy. Open a shop and you'll fret over rent, ingredient costs, staffing, the weather, and whether customers show up—and you have to stand on the front line yourself, out early and back late, no days off all year. Many small-shop owners are 'principal and bell-ringer both,' handling everything from purchasing and cooking to the register and the cleaning. When the economy sours, shops closing one after another is also a common sight on Taiwan's streets. Behind the romance of starting a business lies very real hardship.",
        k:"물론 사장이 되는 것은 결코 쉽지 않습니다. 가게를 하나 열면 임대료, 식자재 원가, 일손, 날씨, 손님이 오는지를 걱정해야 하고, 게다가 직접 최전선에 서서 이른 아침부터 늦은 밤까지 연중무휴로 일해야 합니다. 많은 작은 가게 주인은 '교장 겸 종지기'—장보기부터 조리, 계산, 청소까지 모두 스스로 해냅니다. 경기가 나쁠 때 가게가 하나둘 문을 닫는 것도 대만 거리에서 흔히 보는 풍경입니다. 창업의 낭만 뒤에는 사실 실질적인 고생이 있습니다."
      }
    },
    {
      z:"儘管辛苦，這股「寧為雞首、不為牛後」的頭家精神，還是深深刻在台灣的性格裡。它讓台灣的街道充滿各式各樣的小店和人情味，也讓這座島嶼保有源源不絕的活力與彈性。走在台灣，你看到的每一個攤子、每一家小店，背後可能都藏著一個「想靠自己拚出一片天」的頭家夢。那正是台灣最動人、也最真實的一面。",
      py:"Jǐnguǎn xīnkǔ, zhè gǔ “nìng wéi jī shǒu, bù wéi niú hòu” de tóujiā jīngshén, háishì shēnshēn kè zài Táiwān de xìnggé lǐ. Tā ràng Táiwān de jiēdào chōngmǎn gèshì gèyàng de xiǎodiàn hé rénqíngwèi, yě ràng zhè zuò dǎoyǔ bǎoyǒu yuányuánbùjué de huólì yǔ tánxìng. Zǒu zài Táiwān, nǐ kàndào de měi yí ge tānzi, měi yì jiā xiǎodiàn, bèihòu kěnéng dōu cángzhe yí ge “xiǎng kào zìjǐ pīn chū yí piàn tiān” de tóujiā mèng. Nà zhèng shì Táiwān zuì dòngrén, yě zuì zhēnshí de yí miàn.",
      m:{
        j:"苦労は多くとも、この「鶏口となるも牛後となるなかれ」という頭家精神は、今なお台湾の性格に深く刻まれています。それが台湾の街を色とりどりの小さな店と人情味で満たし、この島に尽きることのない活力としなやかさをもたらしています。台湾を歩けば、目にする一つ一つの屋台、一軒一軒の小さな店の裏に、「自分の力で一旗あげたい」という頭家の夢が隠れているかもしれません。それこそが、台湾の最も心を打つ、そして最も本当の姿なのです。",
        e:"Hardship notwithstanding, this boss spirit—'better be the head of a chicken than the tail of an ox'—remains deeply etched in Taiwan's character. It fills Taiwan's streets with all kinds of small shops and human warmth, and gives this island an inexhaustible vitality and resilience. Walk through Taiwan and behind every stall and every little shop you see may lie a boss's dream of 'carving out a piece of the sky by one's own effort.' That is Taiwan's most moving—and most genuine—side.",
        k:"고생스럽더라도 이 '소의 꼬리가 되느니 닭의 머리가 되겠다'는 터우자 정신은 여전히 대만의 성격에 깊이 새겨져 있습니다. 그것이 대만의 거리를 온갖 작은 가게와 인정미로 채우고, 이 섬에 마르지 않는 활력과 유연함을 안겨 줍니다. 대만을 걷다 보면 눈에 들어오는 노점 하나하나, 작은 가게 하나하나 뒤에 '내 힘으로 한 세상을 이뤄 보고 싶다'는 터우자의 꿈이 숨어 있을지도 모릅니다. 그것이야말로 대만의 가장 감동적이고 가장 진실한 모습입니다."
      }
    }
  ],
  vocab:[
    { w:"頭家", zy:"ㄊㄡˊ ㄐㄧㄚ", py:"tóujiā", m:{ j:"（台湾語）社長・オーナー・店主", e:"(Taiwanese) boss, business owner", k:"(대만어) 사장·주인" } },
    { w:"中小企業", zy:"ㄓㄨㄥ ㄒㄧㄠˇ ㄑㄧˋ ㄧㄝˋ", py:"zhōngxiǎo qǐyè", m:{ j:"中小企業", e:"small and medium-sized enterprises (SMEs)", k:"중소기업" } },
    { w:"創業", zy:"ㄔㄨㄤˋ ㄧㄝˋ", py:"chuàngyè", m:{ j:"起業・開業", e:"to start a business", k:"창업" } },
    { w:"黑手", zy:"ㄏㄟ ㄕㄡˇ", py:"hēishǒu", m:{ j:"（油まみれの）機械・整備の技術工", e:"grease-handed mechanic; blue-collar technician", k:"기름손 기술공·정비공" } },
    { w:"擺攤", zy:"ㄅㄞˇ ㄊㄢ", py:"bǎitān", m:{ j:"屋台・露店を出す", e:"to set up a stall / vend", k:"노점을 차리다" } },
    { w:"攤位", zy:"ㄊㄢ ㄨㄟˋ", py:"tānwèi", m:{ j:"屋台・露店の区画", e:"stall, vendor booth", k:"노점 자리·부스" } },
    { w:"夜市", zy:"ㄧㄝˋ ㄕˋ", py:"yèshì", m:{ j:"夜市", e:"night market", k:"야시장" } },
    { w:"開店", zy:"ㄎㄞ ㄉㄧㄢˋ", py:"kāidiàn", m:{ j:"店を開く・開業する", e:"to open a shop", k:"가게를 열다" } },
    { w:"租金", zy:"ㄗㄨ ㄐㄧㄣ", py:"zūjīn", m:{ j:"家賃・賃料", e:"rent", k:"임대료" } },
    { w:"成本", zy:"ㄔㄥˊ ㄅㄣˇ", py:"chéngběn", m:{ j:"コスト・原価", e:"cost", k:"원가·비용" } },
    { w:"雞排", zy:"ㄐㄧ ㄆㄞˊ", py:"jīpái", m:{ j:"（夜市の名物）フライドチキンカツ", e:"fried chicken cutlet (night-market snack)", k:"닭튀김(지파이, 야시장 명물)" } },
    { w:"出頭天", zy:"ㄔㄨ ㄊㄡˊ ㄊㄧㄢ", py:"chū tóutiān", m:{ j:"（台湾語由来）成功して世に出る・一旗あげる", e:"to make it; rise to success (from Taiwanese)", k:"성공해 두각을 나타내다(대만어 유래)" } }
  ],
  note:{
    j:"「頭家（トウケ）」は台湾語（台語）の言葉で、日常会話にもよく登場します。市場や屋台で値切るとき、客が『頭家、算便宜一點啦（社長、ちょっと安くしてよ）』と声をかけるのは定番のやり取り。台湾の中小企業の多くは家族経営で、1960〜80年代の高度成長期には『客庁即工厰（居間がそのまま工場）』と言われ、一家総出で夜なべして輸出品を作った時代がありました。この草の根の起業力が、台湾を『MIT（Made in Taiwan）』の国へと押し上げた原動力です。",
    e:"'Touke' is a Taiwanese (Hokkien) word that shows up often in everyday talk. Haggling at a market or stall, a customer calling out 'Touke, make it a bit cheaper!' is a classic exchange. Many Taiwanese SMEs are family-run; during the boom of the 1960s–80s, people spoke of 'the living room as the factory,' when whole families stayed up through the night making goods for export. This grassroots entrepreneurial power is the force that pushed Taiwan into being a land of 'MIT' (Made in Taiwan).",
    k:"'터우자'는 대만어(민난어) 단어로 일상 대화에도 자주 등장합니다. 시장이나 노점에서 흥정할 때 손님이 '터우자, 좀 싸게 해 줘요!'라고 부르는 것은 전형적인 대화입니다. 대만 중소기업의 상당수는 가족 경영이며, 1960~80년대 고도성장기에는 '거실이 곧 공장'이라는 말이 있을 만큼 온 가족이 밤새워 수출품을 만들던 시절이 있었습니다. 이 풀뿌리 창업의 힘이 대만을 'MIT(Made in Taiwan)'의 나라로 밀어 올린 원동력입니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_12 };
