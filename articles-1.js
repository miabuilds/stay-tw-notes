// StayTW Notes — 深度閲讀：台湾社会・制度（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_1 = [
{
  id:"national-health-insurance",
  cat:{ j:"社会・制度", e:"Society & Systems", k:"사회·제도" },
  zhTitle:"全民健保：一張卡走遍台灣的醫院",
  title:{ j:"全民健康保険：一枚のカードで病院をめぐる", e:"National Health Insurance: One Card for Every Hospital", k:"전국민 건강보험: 카드 한 장으로 병원을 누비다" },
  intro:{
    j:"熱があってふらっと近所の診療所に入り、数百円で診てもらって薬までもらえる——台湾に住むと、この当たり前が実はすごいことだと気づきます。世界が注目する『全民健保』の仕組みを、日常の目線でのぞいてみましょう。",
    e:"You feel feverish, wander into a neighborhood clinic, and walk out having seen a doctor and picked up medicine for just a few dollars. Live in Taiwan and you realize how remarkable this ordinary experience is. Let's look at the world-famous National Health Insurance up close.",
    k:"열이 나서 동네 의원에 슬쩍 들어가 몇 백 원에 진료받고 약까지 받아 나온다—대만에 살다 보면 이 당연한 일이 사실 대단하다는 걸 깨닫습니다. 세계가 주목하는 '전국민 건강보험'을 일상의 눈으로 들여다봅시다."
  },
  paras:[
    {
      z:"台灣的「全民健保」在一九九五年正式上路，到現在已經三十年了。它的核心概念很簡單：不管你是上班族、學生、老人還是小孩，只要住在台灣、有身分，就一定會被納入這套保險。每個月大家依照收入繳一筆保費，錢集中起來，等到有人生病、受傷、需要開刀的時候，就用這筆共同的錢來分擔醫療費用。",
      py:"Táiwān de “quánmín jiànbǎo” zài yī jiǔ jiǔ wǔ nián zhèngshì shànglù, dào xiànzài yǐjīng sānshí nián le. Tā de héxīn gàiniàn hěn jiǎndān: bùguǎn nǐ shì shàngbānzú, xuéshēng, lǎorén háishì xiǎohái, zhǐyào zhù zài Táiwān, yǒu shēnfèn, jiù yídìng huì bèi nàrù zhè tào bǎoxiǎn. Měi ge yuè dàjiā yīzhào shōurù jiǎo yì bǐ bǎofèi, qián jízhōng qǐlái, děngdào yǒurén shēngbìng, shòushāng, xūyào kāidāo de shíhòu, jiù yòng zhè bǐ gòngtóng de qián lái fēndān yīliáo fèiyòng.",
      m:{
        j:"台湾の「全民健保（国民皆保険）」は1995年に正式にスタートし、今ではもう30年になります。核心となる考え方はとてもシンプルです。会社員でも学生でも高齢者でも子どもでも、台湾に住んでいて身分があれば、必ずこの保険に加入します。毎月みんなが収入に応じて保険料を納め、そのお金をまとめておき、誰かが病気になったり怪我をしたり手術が必要になったりしたときに、その共同のお金で医療費を分担するのです。",
        e:"Taiwan's National Health Insurance (NHI) officially launched in 1995 and is now thirty years old. Its core idea is simple: whether you're an office worker, a student, an elderly person, or a child, as long as you live in Taiwan and have legal residency, you are automatically enrolled. Everyone pays a monthly premium based on income, the money is pooled together, and when someone falls ill, gets injured, or needs surgery, that shared fund covers the medical costs.",
        k:"대만의 '전국민 건강보험'은 1995년에 정식으로 시작되어 이제 30년이 되었습니다. 핵심 개념은 아주 간단합니다. 직장인이든 학생이든 노인이든 아이든, 대만에 살면서 신분이 있으면 반드시 이 보험에 가입됩니다. 매달 모두가 소득에 따라 보험료를 내고 그 돈을 모아 두었다가, 누군가 병이 나거나 다치거나 수술이 필요할 때 그 공동의 돈으로 의료비를 분담합니다."
      }
    },
    {
      z:"對外國人來說，最有感的就是那張綠色的「健保卡」。它是一張小小的IC卡，上面有你的照片和身分資料。看病的時候，只要把卡交給櫃台，護理師輕輕一刷，你所有的就醫紀錄、過敏史、正在吃的藥都會出現在醫生的螢幕上。不用帶一堆紙本病歷，也不用重複說明病史，整個流程又快又順。",
      py:"Duì wàiguórén lái shuō, zuì yǒugǎn de jiùshì nà zhāng lǜsè de “jiànbǎokǎ”. Tā shì yì zhāng xiǎoxiǎo de IC kǎ, shàngmiàn yǒu nǐ de zhàopiàn hé shēnfèn zīliào. Kànbìng de shíhòu, zhǐyào bǎ kǎ jiāo gěi guìtái, hùlǐshī qīngqīng yì shuā, nǐ suǒyǒu de jiùyī jìlù, guòmǐn shǐ, zhèngzài chī de yào dōu huì chūxiàn zài yīshēng de yíngmù shàng. Búyòng dài yì duī zhǐběn bìnglì, yě búyòng chóngfù shuōmíng bìngshǐ, zhěnggè liúchéng yòu kuài yòu shùn.",
      m:{
        j:"外国人にとって一番実感するのは、あの緑色の「健保カード」でしょう。写真と身分情報が入った小さなICカードです。診察のときは、カードを受付に渡すだけで、看護師がさっと読み取ると、あなたの受診記録、アレルギー歴、今飲んでいる薬まで、すべて医師の画面に表示されます。分厚い紙のカルテを持ち歩く必要もなく、病歴を何度も説明する必要もなく、流れがとてもスムーズです。",
        e:"For foreigners, the thing you feel most is that green \"NHI card.\" It's a small IC card with your photo and identity details. When you see a doctor, you just hand the card to the front desk; the nurse gives it a quick swipe, and all your visit records, allergy history, and current medications appear on the doctor's screen. No need to carry a stack of paper records or repeat your medical history—the whole process is fast and seamless.",
        k:"외국인이 가장 실감하는 것은 그 초록색 '건강보험카드'일 겁니다. 사진과 신분 정보가 담긴 작은 IC 카드죠. 진료할 때 카드를 접수처에 건네면 간호사가 살짝 스캔하는 것만으로 진료 기록, 알레르기 이력, 현재 복용 중인 약까지 모두 의사의 화면에 뜹니다. 두꺼운 종이 진료기록을 들고 다닐 필요도, 병력을 몇 번씩 설명할 필요도 없어 전체 과정이 빠르고 매끄럽습니다."
      }
    },
    {
      z:"讓很多人驚訝的是價格。在台灣看一次門診，自己要付的「掛號費」和「部分負擔」加起來，通常只要一百多到三、四百塊台幣，領藥往往也只是幾十塊。就算是感冒、看牙齒、拿慢性病的藥，負擔都很輕。因為大部分的費用早就由健保先付掉了，民眾只需要付一小部分，這也是為什麼很多台灣人有點不舒服就會去看醫生。",
      py:"Ràng hěnduō rén jīngyà de shì jiàgé. Zài Táiwān kàn yí cì ménzhěn, zìjǐ yào fù de “guàhàofèi” hé “bùfèn fùdān” jiā qǐlái, tōngcháng zhǐyào yìbǎi duō dào sān, sì bǎi kuài Táibì, lǐngyào wǎngwǎng yě zhǐshì jǐshí kuài. Jiùsuàn shì gǎnmào, kàn yáchǐ, ná mànxìngbìng de yào, fùdān dōu hěn qīng. Yīnwèi dàbùfèn de fèiyòng zǎo jiù yóu jiànbǎo xiān fù diào le, mínzhòng zhǐ xūyào fù yì xiǎo bùfèn, zhè yěshì wèishénme hěnduō Táiwānrén yǒudiǎn bù shūfú jiù huì qù kàn yīshēng.",
      m:{
        j:"多くの人を驚かせるのは値段です。台湾で外来を一度受診すると、自分で払う「登録料」と「一部負担金」を合わせても、たいてい百数十元から三、四百元台湾ドルほど。薬をもらうのも数十元で済むことが多いです。風邪でも、歯医者でも、慢性病の薬をもらうときでも、負担はとても軽い。費用の大部分は健保が先に払ってくれていて、市民はほんの一部を払うだけ。だからこそ、台湾の人は少し体調が悪いとすぐ医者に行くのです。",
        e:"What surprises many people is the price. For a single outpatient visit in Taiwan, the \"registration fee\" and \"co-payment\" you pay yourself usually add up to just a hundred-something to three or four hundred NT dollars, and picking up medicine is often only tens of dollars. Whether it's a cold, a dental visit, or refilling chronic-illness medication, the burden is light. Most of the cost has already been paid by NHI, and citizens pay only a small share—which is why many Taiwanese go see a doctor at the first sign of feeling unwell.",
        k:"많은 사람을 놀라게 하는 건 가격입니다. 대만에서 외래 진료를 한 번 받으면 본인이 내는 '접수비'와 '본인부담금'을 합쳐도 보통 100몇십 원에서 3, 4백 대만달러 정도이고, 약을 받는 것도 대개 몇십 원이면 됩니다. 감기든 치과든 만성질환 약을 받든 부담이 아주 가볍습니다. 비용 대부분은 이미 건강보험이 먼저 지불했고 국민은 일부만 내면 되기 때문에, 많은 대만 사람이 조금만 몸이 안 좋아도 바로 병원에 갑니다."
      }
    },
    {
      z:"這套制度之所以在國際上有名，除了便宜，還因為「方便」和「公平」。你可以自己決定要看哪一家診所、哪一位醫生，不用像有些國家那樣先預約好幾個星期。大醫院、小診所、中醫、牙醫幾乎都有加入健保。就連在偏遠的鄉下或離島，政府也努力讓大家看得到醫生。世界衛生組織和許多國家都曾經來台灣「取經」，研究這套系統。",
      py:"Zhè tào zhìdù zhīsuǒyǐ zài guójì shàng yǒumíng, chúle piányí, hái yīnwèi “fāngbiàn” hé “gōngpíng”. Nǐ kěyǐ zìjǐ juédìng yào kàn nǎ yì jiā zhěnsuǒ, nǎ yí wèi yīshēng, búyòng xiàng yǒuxiē guójiā nàyàng xiān yùyuē hǎojǐ ge xīngqí. Dà yīyuàn, xiǎo zhěnsuǒ, zhōngyī, yáyī jīhū dōu yǒu jiārù jiànbǎo. Jiù lián zài piānyuǎn de xiāngxià huò lídǎo, zhèngfǔ yě nǔlì ràng dàjiā kàndedào yīshēng. Shìjiè Wèishēng Zǔzhī hé xǔduō guójiā dōu céngjīng lái Táiwān “qǔjīng”, yánjiū zhè tào xìtǒng.",
      m:{
        j:"この制度が国際的に有名なのは、安さだけでなく「便利さ」と「公平さ」ゆえでもあります。どの診療所に行くか、どの医師にかかるか自分で決められ、国によっては何週間も前から予約が必要というようなこともありません。大病院も、小さな診療所も、漢方（中医）も、歯科も、ほとんどが健保に加入しています。辺鄙な田舎や離島でさえ、政府はみんなが医者にかかれるよう努力しています。WHOや多くの国が、この仕組みを研究しに台湾へ「学びに来た」ほどです。",
        e:"This system is internationally famous not only for being cheap but also for being convenient and fair. You can decide for yourself which clinic and which doctor to see, without needing to book weeks in advance as in some countries. Large hospitals, small clinics, traditional Chinese medicine, and dentists are almost all part of NHI. Even in remote countryside and outlying islands, the government works to make sure everyone has access to a doctor. The WHO and many countries have come to Taiwan to \"learn the ropes\" and study the system.",
        k:"이 제도가 국제적으로 유명한 것은 저렴함뿐 아니라 '편리함'과 '공평함' 때문이기도 합니다. 어느 의원, 어느 의사에게 갈지 스스로 정할 수 있고, 일부 국가처럼 몇 주 전에 예약할 필요도 없습니다. 큰 병원, 작은 의원, 한의(중의), 치과 거의 모두가 건강보험에 가입되어 있습니다. 외진 시골이나 외딴섬에서도 정부는 모두가 의사를 만날 수 있도록 애씁니다. WHO와 여러 나라가 이 시스템을 연구하러 대만에 '배우러' 오기도 했습니다."
      }
    },
    {
      z:"當然，這麼好用的制度也有它的煩惱。因為看病太方便、太便宜，有些人只要一點小病就跑醫院，造成醫療資源被大量使用，健保的財務常常出現壓力。醫護人員的工作量也很大，「血汗醫院」的討論每隔一段時間就會被提起。政府因此不斷調整保費、部分負擔和給付範圍，努力在「大家都負擔得起」和「錢要夠用」之間找到平衡。",
      py:"Dāngrán, zhème hǎoyòng de zhìdù yě yǒu tā de fánnǎo. Yīnwèi kànbìng tài fāngbiàn, tài piányí, yǒuxiē rén zhǐyào yìdiǎn xiǎobìng jiù pǎo yīyuàn, zàochéng yīliáo zīyuán bèi dàliàng shǐyòng, jiànbǎo de cáiwù chángcháng chūxiàn yālì. Yīhù rényuán de gōngzuòliàng yě hěn dà, “xiěhàn yīyuàn” de tǎolùn měi gé yí duàn shíjiān jiù huì bèi tíqǐ. Zhèngfǔ yīncǐ búduàn tiáozhěng bǎofèi, bùfèn fùdān hé jǐfù fànwéi, nǔlì zài “dàjiā dōu fùdāndeqǐ” hé “qián yào gòuyòng” zhījiān zhǎodào pínghéng.",
      m:{
        j:"もちろん、これほど便利な制度にも悩みはあります。受診があまりに手軽で安いため、ちょっとした軽い症状でも病院に駆け込む人がいて、医療資源が大量に使われ、健保の財政はしばしば圧迫されます。医療従事者の仕事量も多く、「ブラック病院」の議論も定期的に持ち上がります。そのため政府は、保険料・一部負担金・給付範囲を絶えず調整し、「みんなが負担できること」と「お金が足りること」の間でバランスを取ろうと努めています。",
        e:"Of course, such a handy system has its headaches too. Because seeing a doctor is so easy and cheap, some people rush to the hospital for the smallest ailment, causing heavy use of medical resources and putting frequent financial strain on NHI. Medical staff also carry heavy workloads, and debates about \"sweatshop hospitals\" resurface from time to time. So the government keeps adjusting premiums, co-payments, and coverage, striving to balance \"everyone can afford it\" against \"there's enough money to go around.\"",
        k:"물론 이렇게 편리한 제도에도 고민은 있습니다. 진료가 너무 편하고 저렴하다 보니 작은 병에도 병원으로 달려가는 사람이 있어 의료 자원이 대량으로 쓰이고, 건강보험 재정이 자주 압박을 받습니다. 의료진의 업무량도 많아 '착취 병원' 논의가 주기적으로 불거집니다. 그래서 정부는 보험료, 본인부담금, 급여 범위를 끊임없이 조정하며 '모두가 감당할 수 있는 것'과 '돈이 충분한 것' 사이에서 균형을 찾으려 애씁니다."
      }
    },
    {
      z:"對於在台灣生活的外國人，好消息是：只要在台灣工作、就學，或以居留身分住滿一定時間，通常就能加入健保，享受和本地人幾乎一樣的待遇。很多在台灣住過的外國人回國後，最懷念的往往不是美食，而是那張「隨時可以放心去看醫生」的健保卡。這張小小的卡片，其實裝著整個社會互相照顧的溫度。",
      py:"Duìyú zài Táiwān shēnghuó de wàiguórén, hǎo xiāoxi shì: zhǐyào zài Táiwān gōngzuò, jiùxué, huò yǐ jūliú shēnfèn zhù mǎn yídìng shíjiān, tōngcháng jiù néng jiārù jiànbǎo, xiǎngshòu hé běndìrén jīhū yíyàng de dàiyù. Hěnduō zài Táiwān zhùguò de wàiguórén huíguó hòu, zuì huáiniàn de wǎngwǎng búshì měishí, érshì nà zhāng “suíshí kěyǐ fàngxīn qù kàn yīshēng” de jiànbǎokǎ. Zhè zhāng xiǎoxiǎo de kǎpiàn, qíshí zhuāngzhe zhěnggè shèhuì hùxiāng zhàogù de wēndù.",
      m:{
        j:"台湾で暮らす外国人にとって朗報なのは、台湾で働く・学ぶ、あるいは居留資格で一定期間住めば、たいてい健保に加入でき、地元の人とほぼ同じ待遇を受けられることです。台湾に住んだことのある外国人が帰国後に一番恋しがるのは、グルメではなく、あの「いつでも安心して医者にかかれる」健保カードだったりします。この小さなカードには、実は社会全体で互いを支え合う温かさが詰まっているのです。",
        e:"For foreigners living in Taiwan, the good news is: as long as you work or study here, or have lived here on a residency permit for a set period, you can usually join NHI and receive almost the same treatment as locals. Many foreigners who have lived in Taiwan find that after going home, what they miss most isn't the food but that NHI card that lets you \"see a doctor anytime without worry.\" That little card actually holds the warmth of a whole society looking after one another.",
        k:"대만에 사는 외국인에게 반가운 소식은, 대만에서 일하거나 공부하거나 거류 자격으로 일정 기간 살면 대개 건강보험에 가입해 현지인과 거의 같은 대우를 받을 수 있다는 점입니다. 대만에 살아 본 많은 외국인이 귀국 후 가장 그리워하는 것은 맛집이 아니라 '언제든 안심하고 병원에 갈 수 있는' 그 건강보험카드이곤 합니다. 이 작은 카드에는 사실 사회 전체가 서로를 돌보는 온기가 담겨 있습니다."
      }
    }
  ],
  vocab:[
    { w:"全民健保", zy:"ㄑㄩㄢˊ ㄇㄧㄣˊ ㄐㄧㄢˋ ㄅㄠˇ", py:"quánmín jiànbǎo", m:{ j:"国民皆保険（全民健康保険の略）", e:"National Health Insurance (NHI)", k:"전국민 건강보험" } },
    { w:"健保卡", zy:"ㄐㄧㄢˋ ㄅㄠˇ ㄎㄚˇ", py:"jiànbǎokǎ", m:{ j:"健康保険カード（ICカード）", e:"NHI card (IC card)", k:"건강보험카드" } },
    { w:"保費", zy:"ㄅㄠˇ ㄈㄟˋ", py:"bǎofèi", m:{ j:"保険料", e:"insurance premium", k:"보험료" } },
    { w:"掛號費", zy:"ㄍㄨㄚˋ ㄏㄠˋ ㄈㄟˋ", py:"guàhàofèi", m:{ j:"受付・登録料", e:"registration fee", k:"접수비" } },
    { w:"部分負擔", zy:"ㄅㄨˋ ㄈㄣˋ ㄈㄨˋ ㄉㄢ", py:"bùfèn fùdān", m:{ j:"一部負担金（自己負担）", e:"co-payment", k:"본인부담금" } },
    { w:"門診", zy:"ㄇㄣˊ ㄓㄣˇ", py:"ménzhěn", m:{ j:"外来診療", e:"outpatient visit", k:"외래 진료" } },
    { w:"領藥", zy:"ㄌㄧㄥˇ ㄧㄠˋ", py:"lǐngyào", m:{ j:"薬を受け取る", e:"to pick up medicine", k:"약을 받다" } },
    { w:"診所", zy:"ㄓㄣˇ ㄙㄨㄛˇ", py:"zhěnsuǒ", m:{ j:"診療所・クリニック", e:"clinic", k:"의원·클리닉" } },
    { w:"病歷", zy:"ㄅㄧㄥˋ ㄌㄧˋ", py:"bìnglì", m:{ j:"カルテ・診療記録", e:"medical record", k:"진료기록·차트" } },
    { w:"慢性病", zy:"ㄇㄢˋ ㄒㄧㄥˋ ㄅㄧㄥˋ", py:"mànxìngbìng", m:{ j:"慢性病", e:"chronic illness", k:"만성질환" } },
    { w:"居留", zy:"ㄐㄩ ㄌㄧㄡˊ", py:"jūliú", m:{ j:"居留・在留（滞在資格）", e:"residency (legal stay)", k:"거류·체류" } },
    { w:"給付", zy:"ㄐㄧˇ ㄈㄨˋ", py:"jǐfù", m:{ j:"給付・保険でカバーされる範囲", e:"benefits/coverage", k:"급여·보장" } }
  ],
  note:{
    j:"台湾の健保カードには、実は臓器提供の意思表示も記録できます。また昔は紙のカード（『健保卡』の前は『健保IC卡』以前の紙冊子）でしたが、2004年に全面的にICカード化されました。コロナ禍では、この健保システムと連動させて『マスク実名制』を実現し、カードを提示すればどこで何枚買ったか管理できたことで、世界的に注目を集めました。一枚のカードがここまで社会インフラになっている例は、世界的にも珍しいのです。",
    e:"Taiwan's NHI card can even record your organ-donation wishes. It used to be a paper booklet, but was fully switched to IC cards in 2004. During the pandemic, Taiwan linked this system to a 'mask rationing' scheme—show your card and the system tracked where and how many masks you'd bought—which drew global attention. Few places in the world have turned a single card into such deep social infrastructure.",
    k:"대만 건강보험카드에는 장기 기증 의사까지 기록할 수 있습니다. 예전에는 종이 수첩이었지만 2004년에 전면적으로 IC 카드로 바뀌었습니다. 팬데믹 때는 이 시스템과 연동해 '마스크 실명제'를 구현해, 카드를 제시하면 어디서 몇 장 샀는지 관리할 수 있어 세계적으로 주목받았습니다. 카드 한 장이 이렇게까지 사회 인프라가 된 사례는 세계적으로도 드뭅니다."
  }
},
{
  id:"trash-doesnt-touch-ground",
  cat:{ j:"社会・制度", e:"Society & Systems", k:"사회·제도" },
  zhTitle:"垃圾不落地：追著音樂跑的垃圾車",
  title:{ j:"ゴミを地面に置かない——音楽を鳴らして走るゴミ収集車", e:"Trash Doesn't Touch the Ground: Chasing the Musical Garbage Truck", k:"쓰레기는 땅에 두지 않는다: 음악을 울리며 달리는 쓰레기차" },
  intro:{
    j:"夕方、どこからか『乙女の祈り』のメロディが流れてくると、住民が袋を手に一斉に家から出てくる——台湾ならではの不思議な光景です。なぜゴミ収集車が音楽を鳴らすのか、そしてなぜみんな走って追いかけるのか。台湾の『垃圾不落地』文化をのぞいてみましょう。",
    e:"At dusk, when the melody of 'A Maiden's Prayer' drifts in from somewhere, residents pour out of their homes with bags in hand—a scene unique to Taiwan. Why do garbage trucks play music, and why does everyone run to chase them? Let's peek into Taiwan's 'trash doesn't touch the ground' culture.",
    k:"해질 무렵 어디선가 '소녀의 기도' 멜로디가 흘러나오면 주민들이 봉지를 들고 일제히 집에서 나옵니다—대만만의 신기한 풍경이죠. 왜 쓰레기차가 음악을 울리고, 왜 모두가 뛰어서 쫓아갈까요? 대만의 '쓰레기는 땅에 두지 않는다' 문화를 들여다봅시다."
  },
  paras:[
    {
      z:"在台灣的大街小巷，垃圾車不是安安靜靜地開過去，而是一邊播放音樂一邊前進。最常見的兩首曲子，一首是《少女的祈禱》，另一首是《給愛麗絲》。這兩段旋律幾乎每個台灣人從小聽到大，只要音樂一響起，大家就知道：垃圾車來了，該出門倒垃圾了。",
      py:"Zài Táiwān de dàjiē xiǎoxiàng, lèsè chē búshì ān'ānjìngjìng de kāi guòqù, érshì yìbiān bōfàng yīnyuè yìbiān qiánjìn. Zuì chángjiàn de liǎng shǒu qǔzi, yì shǒu shì «Shàonǚ de Qídǎo», lìng yì shǒu shì «Gěi Àilìsī». Zhè liǎng duàn xuánlǜ jīhū měi ge Táiwānrén cóngxiǎo tīngdào dà, zhǐyào yīnyuè yì xiǎngqǐ, dàjiā jiù zhīdào: lèsè chē lái le, gāi chūmén dào lèsè le.",
      m:{
        j:"台湾の大通りから路地まで、ゴミ収集車は静かに通り過ぎるのではなく、音楽を流しながら進みます。最もよく流れる二曲は、一つは《乙女の祈り》、もう一つは《エリーゼのために》。この二つのメロディは、ほとんどの台湾人が子どもの頃から聞いて育ちます。音楽が鳴り始めれば、みんなすぐわかります——ゴミ収集車が来た、ゴミを出しに行く時間だ、と。",
        e:"On Taiwan's streets and alleys, garbage trucks don't roll by quietly—they play music as they go. The two most common tunes are 'A Maiden's Prayer' and 'Für Elise.' Almost every Taiwanese grows up hearing these two melodies, and the moment the music starts, everyone knows: the garbage truck is here, time to go out and take out the trash.",
        k:"대만의 큰길부터 골목까지, 쓰레기차는 조용히 지나가지 않고 음악을 틀며 나아갑니다. 가장 흔한 두 곡은 하나는 《소녀의 기도》, 다른 하나는 《엘리제를 위하여》입니다. 이 두 멜로디는 거의 모든 대만 사람이 어릴 때부터 들으며 자랍니다. 음악이 울리기 시작하면 모두가 압니다—쓰레기차가 왔으니 나가서 쓰레기를 버릴 시간이라고요."
      }
    },
    {
      z:"這套制度叫做「垃圾不落地」。意思是，大家不能把垃圾隨便堆在路邊的垃圾桶或地上，而是要「等垃圾車來，親手把垃圾交給清潔隊」。垃圾車固定時間、固定路線經過每個社區，居民必須在那個時段拿著垃圾出來，當面丟進車裡。這樣街道上就不會出現一堆堆發臭、招來蟑螂老鼠的垃圾山。",
      py:"Zhè tào zhìdù jiàozuò “lèsè bú luòdì”. Yìsi shì, dàjiā bùnéng bǎ lèsè suíbiàn duī zài lùbiān de lèsètǒng huò dìshàng, érshì yào “děng lèsè chē lái, qīnshǒu bǎ lèsè jiāo gěi qīngjiéduì”. Lèsè chē gùdìng shíjiān, gùdìng lùxiàn jīngguò měi ge shèqū, jūmín bìxū zài nàge shíduàn názhe lèsè chūlái, dāngmiàn diū jìn chē lǐ. Zhèyàng jiēdào shàng jiù búhuì chūxiàn yì duī duī fāchòu, zhāolái zhāngláng lǎoshǔ de lèsèshān.",
      m:{
        j:"この制度は「垃圾不落地（ゴミを地面に置かない）」と呼ばれます。つまり、ゴミを道端のゴミ箱や地面に勝手に積んでおくのではなく、「ゴミ収集車が来るのを待って、自分の手で清掃隊に手渡す」のです。収集車は決まった時間、決まったルートで各地域を通り、住民はその時間帯にゴミを持って出て、その場で車に投げ入れます。こうすれば、街に悪臭を放ち、ゴキブリやネズミを呼び寄せるゴミの山ができません。",
        e:"This system is called 'trash doesn't touch the ground.' It means you can't just pile your garbage in a roadside bin or on the ground—you have to 'wait for the truck and hand your trash directly to the sanitation crew.' The truck passes through each neighborhood at a fixed time on a fixed route, and residents must come out with their trash during that window and toss it into the truck in person. This way, no stinking mounds of garbage—magnets for cockroaches and rats—build up on the streets.",
        k:"이 제도는 '쓰레기는 땅에 두지 않는다'라고 불립니다. 즉 쓰레기를 길가 쓰레기통이나 바닥에 함부로 쌓아 두지 않고 '쓰레기차가 오길 기다렸다가 직접 청소반에게 건네는' 것입니다. 쓰레기차는 정해진 시간, 정해진 노선으로 각 동네를 지나가고, 주민은 그 시간대에 쓰레기를 들고 나와 직접 차에 던져 넣어야 합니다. 이렇게 하면 거리에 악취를 풍기고 바퀴벌레와 쥐를 부르는 쓰레기 산이 생기지 않습니다."
      }
    },
    {
      z:"更重要的是「資源回收」和「廚餘」的分類。跟在垃圾車後面的，通常還有一台「資源回收車」。你要把塑膠瓶、紙類、鐵鋁罐、玻璃、寶特瓶等可以回收的東西分開，交給回收車；家裡的剩菜、果皮、菜渣則要另外裝進「廚餘桶」，這些廚餘會拿去養豬或做堆肥。只有真正沒辦法回收的「一般垃圾」，才裝進政府規定的專用垃圾袋，丟進垃圾車。",
      py:"Gèng zhòngyào de shì “zīyuán huíshōu” hé “chúyú” de fēnlèi. Gēn zài lèsè chē hòumiàn de, tōngcháng hái yǒu yì tái “zīyuán huíshōu chē”. Nǐ yào bǎ sùjiāopíng, zhǐlèi, tiě lǚ guàn, bōli, bǎotèpíng děng kěyǐ huíshōu de dōngxi fēnkāi, jiāo gěi huíshōu chē; jiā lǐ de shèngcài, guǒpí, càizhā zé yào lìngwài zhuāng jìn “chúyútǒng”, zhèxiē chúyú huì náqù yǎngzhū huò zuò duīféi. Zhǐyǒu zhēnzhèng méi bànfǎ huíshōu de “yìbān lèsè”, cái zhuāng jìn zhèngfǔ guīdìng de zhuānyòng lèsèdài, diū jìn lèsè chē.",
      m:{
        j:"さらに大切なのが「資源ゴミ（リサイクル）」と「生ゴミ」の分別です。ゴミ収集車の後ろには、たいてい「資源回収車」がもう一台ついてきます。ペットボトル、紙類、スチール・アルミ缶、ガラスなどリサイクルできるものは分けて回収車へ。家庭の残飯、果物の皮、野菜くずは別に「生ゴミバケツ」に入れ、これらは豚の餌や堆肥にされます。本当にリサイクルできない「一般ゴミ」だけを、政府指定の専用ゴミ袋に入れて収集車に投げ入れるのです。",
        e:"Even more important is sorting 'recyclables' and 'food waste.' Following behind the garbage truck there's usually a second 'recycling truck.' You separate recyclable items—plastic bottles, paper, steel and aluminum cans, glass, PET bottles—and hand them to the recycling truck; household leftovers, fruit peels, and vegetable scraps go separately into a 'food-waste bucket,' and this food waste is used to feed pigs or make compost. Only truly non-recyclable 'general trash' goes into the government-mandated special garbage bags and into the truck.",
        k:"더 중요한 것은 '재활용'과 '음식물 쓰레기'의 분리입니다. 쓰레기차 뒤에는 보통 '재활용 수거차'가 한 대 더 따라옵니다. 플라스틱병, 종이류, 철·알루미늄 캔, 유리, 페트병 등 재활용할 수 있는 것은 따로 나눠 수거차에 건네고, 집안의 남은 반찬, 과일 껍질, 채소 찌꺼기는 별도로 '음식물 쓰레기통'에 담습니다. 이 음식물 쓰레기는 돼지 사료나 퇴비로 쓰입니다. 정말 재활용이 안 되는 '일반 쓰레기'만 정부가 정한 전용 쓰레기봉투에 담아 쓰레기차에 던져 넣습니다."
      }
    },
    {
      z:"對台灣人來說，追垃圾車幾乎是一種全民運動。到了傍晚，你會看到有人穿著拖鞋、提著大包小包從公寓衝下樓，也有人為了不錯過，乾脆站在巷口邊滑手機邊等。如果那天剛好加班、約會或睡過頭，錯過了垃圾車，就得把垃圾放到隔天，或是拜託鄰居、家人幫忙丟。這種「和垃圾車賽跑」的緊張感，是很多台灣人共同的生活記憶。",
      py:"Duì Táiwānrén lái shuō, zhuī lèsè chē jīhū shì yì zhǒng quánmín yùndòng. Dàole bàngwǎn, nǐ huì kàndào yǒurén chuānzhe tuōxié, tízhe dà bāo xiǎo bāo cóng gōngyù chōng xià lóu, yě yǒurén wèile bú cuòguò, gāncuì zhàn zài xiàngkǒu biān huá shǒujī biān děng. Rúguǒ nàtiān gānghǎo jiābān, yuēhuì huò shuìguòtóu, cuòguò le lèsè chē, jiù děi bǎ lèsè fàngdào gétiān, huòshì bàituō línjū, jiārén bāngmáng diū. Zhè zhǒng “hé lèsè chē sàipǎo” de jǐnzhānggǎn, shì hěnduō Táiwānrén gòngtóng de shēnghuó jìyì.",
      m:{
        j:"台湾人にとって、ゴミ収集車を追いかけるのはほとんど国民的スポーツです。夕方になると、サンダル履きで大きな袋小さな袋を提げ、マンションから駆け下りてくる人が見えますし、逃さないために路地の入口でスマホをいじりながら待つ人もいます。もしその日、残業やデート、寝坊で収集車を逃すと、ゴミを翌日まで持ち越すか、近所の人や家族に頼んで出してもらうしかありません。この「収集車との徒競走」の緊張感は、多くの台湾人に共通する生活の記憶です。",
        e:"For Taiwanese, chasing the garbage truck is almost a national sport. Come evening, you'll see people in flip-flops dashing down from their apartments with bags big and small, and others who, to avoid missing it, just stand at the mouth of the alley scrolling on their phones while they wait. If that day you happen to work overtime, go on a date, or oversleep and miss the truck, you have to keep your trash until the next day—or ask a neighbor or family member to take it out for you. That tense feeling of 'racing the garbage truck' is a shared life memory for many Taiwanese.",
        k:"대만 사람에게 쓰레기차를 쫓아가는 일은 거의 국민 스포츠입니다. 저녁이 되면 슬리퍼 차림으로 크고 작은 봉지를 들고 아파트에서 뛰어 내려오는 사람도, 놓치지 않으려고 아예 골목 입구에서 휴대폰을 보며 기다리는 사람도 보입니다. 그날 마침 야근, 데이트, 늦잠으로 쓰레기차를 놓치면 쓰레기를 다음 날까지 두거나 이웃, 가족에게 대신 버려 달라고 부탁해야 합니다. 이 '쓰레기차와의 달리기' 긴장감은 많은 대만 사람이 공유하는 생활의 기억입니다."
      }
    },
    {
      z:"這套制度剛開始推行時，其實不少人覺得麻煩：為什麼不能像以前一樣，隨時把垃圾丟到樓下就好？但幾十年下來，台灣的街道變得乾淨許多，資源回收率也名列世界前段班。過去堆滿垃圾的巷弄不見了，取而代之的是準時響起的音樂和排隊等待的居民。習慣之後，大家反而覺得這樣的城市又整潔又有秩序。",
      py:"Zhè tào zhìdù gāng kāishǐ tuīxíng shí, qíshí bùshǎo rén juéde máfan: wèishénme bùnéng xiàng yǐqián yíyàng, suíshí bǎ lèsè diū dào lóuxià jiù hǎo? Dàn jǐshí nián xiàlái, Táiwān de jiēdào biàndé gānjìng xǔduō, zīyuán huíshōu lǜ yě míngliè shìjiè qiánduànbān. Guòqù duīmǎn lèsè de xiànglòng bújiàn le, qǔ'érdàizhī de shì zhǔnshí xiǎngqǐ de yīnyuè hé páiduì děngdài de jūmín. Xíguàn zhīhòu, dàjiā fǎn'ér juéde zhèyàng de chéngshì yòu zhěngjié yòu yǒu zhìxù.",
      m:{
        j:"この制度が導入され始めた頃は、実は面倒だと感じる人も少なくありませんでした。以前のように、いつでも階下にゴミを出せばいいのに、なぜダメなのか、と。しかし数十年を経て、台湾の街はずっときれいになり、資源回収率も世界のトップクラスに名を連ねています。かつてゴミで溢れていた路地は姿を消し、代わりに時間どおりに鳴る音楽と、列を作って待つ住民が現れました。慣れてしまえば、みんなむしろこういう街のほうが清潔で秩序があると感じています。",
        e:"When this system was first rolled out, quite a few people found it a hassle: why couldn't they just dump trash downstairs anytime, like before? But over the decades, Taiwan's streets have become much cleaner, and its recycling rate ranks among the world's best. The alleys once piled with garbage are gone, replaced by music that sounds right on time and residents lining up to wait. Once people got used to it, they actually came to feel that a city like this is cleaner and more orderly.",
        k:"이 제도가 막 시행됐을 때는 사실 번거롭다고 느낀 사람도 적지 않았습니다. 예전처럼 아무 때나 아래층에 쓰레기를 버리면 되는데 왜 안 되느냐고요. 하지만 수십 년이 지나 대만의 거리는 훨씬 깨끗해졌고 재활용률도 세계 상위권에 이름을 올렸습니다. 과거 쓰레기로 가득했던 골목은 사라지고, 대신 정시에 울리는 음악과 줄 서서 기다리는 주민들이 나타났습니다. 익숙해지고 나니 오히려 이런 도시가 깔끔하고 질서 있다고 느끼게 되었습니다."
      }
    },
    {
      z:"如果你剛搬到台灣，第一件要打聽的生活情報，往往就是「我家這一區，垃圾車幾點來？」你可以問房東、鄰居，或上網查政府提供的垃圾車時間和路線。等你哪天也開始一聽到《少女的祈禱》就反射性地抓起垃圾袋往外衝，恭喜你，你已經融入台灣人的日常了。",
      py:"Rúguǒ nǐ gāng bāndào Táiwān, dì yī jiàn yào dǎtīng de shēnghuó qíngbào, wǎngwǎng jiùshì “wǒ jiā zhè yí qū, lèsè chē jǐ diǎn lái?” Nǐ kěyǐ wèn fángdōng, línjū, huò shàngwǎng chá zhèngfǔ tígōng de lèsè chē shíjiān hé lùxiàn. Děng nǐ nǎtiān yě kāishǐ yì tīngdào «Shàonǚ de Qídǎo» jiù fǎnshèxìng de zhuā qǐ lèsèdài wǎng wài chōng, gōngxǐ nǐ, nǐ yǐjīng róngrù Táiwānrén de rìcháng le.",
      m:{
        j:"もし台湾に引っ越したばかりなら、まず聞き込むべき生活情報は、たいてい「うちのこの地区、ゴミ収集車は何時に来るの？」でしょう。大家さんや近所の人に尋ねてもいいし、政府が提供する収集車の時間とルートをネットで調べてもいい。いつか、あなたも《乙女の祈り》を聞いた瞬間に反射的にゴミ袋をつかんで外へ飛び出すようになったら——おめでとうございます、あなたはもう台湾人の日常に溶け込んでいます。",
        e:"If you've just moved to Taiwan, the first bit of daily-life intel you'll want to dig up is usually: 'What time does the garbage truck come to my area?' You can ask your landlord or neighbors, or look up the government's published truck times and routes online. And the day you too start reflexively grabbing your trash bag and rushing out the moment you hear 'A Maiden's Prayer'—congratulations, you've blended into everyday Taiwanese life.",
        k:"대만에 막 이사했다면 가장 먼저 알아봐야 할 생활 정보는 대개 '우리 동네는 쓰레기차가 몇 시에 오나요?'일 겁니다. 집주인이나 이웃에게 물어봐도 되고, 정부가 제공하는 쓰레기차 시간과 노선을 인터넷으로 찾아봐도 됩니다. 언젠가 당신도 《소녀의 기도》를 듣는 순간 반사적으로 쓰레기봉투를 쥐고 밖으로 뛰쳐나가게 된다면—축하합니다, 이미 대만 사람의 일상에 녹아든 것입니다."
      }
    }
  ],
  vocab:[
    { w:"垃圾車", zy:"ㄌㄜˋ ㄙㄜˋ ㄔㄜ", py:"lèsè chē", m:{ j:"ゴミ収集車", e:"garbage truck", k:"쓰레기차" } },
    { w:"垃圾不落地", zy:"ㄌㄜˋ ㄙㄜˋ ㄅㄨˊ ㄌㄨㄛˋ ㄉㄧˋ", py:"lèsè bú luòdì", m:{ j:"ゴミを地面に置かない（台湾の収集方式）", e:"'trash doesn't touch the ground' (collection system)", k:"쓰레기는 땅에 두지 않기(수거 방식)" } },
    { w:"資源回收", zy:"ㄗ ㄩㄢˊ ㄏㄨㄟˊ ㄕㄡ", py:"zīyuán huíshōu", m:{ j:"資源リサイクル", e:"recycling", k:"자원 재활용" } },
    { w:"廚餘", zy:"ㄔㄨˊ ㄩˊ", py:"chúyú", m:{ j:"生ゴミ", e:"food waste", k:"음식물 쓰레기" } },
    { w:"分類", zy:"ㄈㄣ ㄌㄟˋ", py:"fēnlèi", m:{ j:"分別・分類", e:"sorting/classification", k:"분리·분류" } },
    { w:"清潔隊", zy:"ㄑㄧㄥ ㄐㄧㄝˊ ㄉㄨㄟˋ", py:"qīngjiéduì", m:{ j:"清掃隊（収集作業員）", e:"sanitation crew", k:"청소반·환경미화원" } },
    { w:"寶特瓶", zy:"ㄅㄠˇ ㄊㄜˋ ㄆㄧㄥˊ", py:"bǎotèpíng", m:{ j:"ペットボトル", e:"PET/plastic bottle", k:"페트병" } },
    { w:"專用垃圾袋", zy:"ㄓㄨㄢ ㄩㄥˋ ㄌㄜˋ ㄙㄜˋ ㄉㄞˋ", py:"zhuānyòng lèsèdài", m:{ j:"（政府指定の）専用ゴミ袋", e:"designated garbage bag", k:"전용 쓰레기봉투" } },
    { w:"堆肥", zy:"ㄉㄨㄟ ㄈㄟˊ", py:"duīféi", m:{ j:"堆肥（コンポスト）", e:"compost", k:"퇴비" } },
    { w:"巷弄", zy:"ㄒㄧㄤˋ ㄌㄨㄥˋ", py:"xiànglòng", m:{ j:"路地・小道", e:"alleys and lanes", k:"골목" } },
    { w:"傍晚", zy:"ㄅㄤ ㄨㄢˇ", py:"bàngwǎn", m:{ j:"夕方", e:"dusk, early evening", k:"해질 무렵" } },
    { w:"融入", zy:"ㄖㄨㄥˊ ㄖㄨˋ", py:"róngrù", m:{ j:"溶け込む・馴染む", e:"to blend in, integrate", k:"녹아들다·적응하다" } }
  ],
  note:{
    j:"じつは、あの『乙女の祈り』が使われるようになったのは偶然だそうです。1960〜70年代、当時の衛生署長の娘がこの曲をピアノで練習していたのを聞いて『これはいい』と収集車のメロディに採用した、という逸話が広く語られています。台湾では『垃圾車』の『垃圾』を『lèsè』と読むのが一般的で、辞書的な『lājī』とは発音が違う点も面白いところ。近年はアプリで収集車の現在地をリアルタイムに追える地域も増えています。",
    e:"The choice of 'A Maiden's Prayer' was reportedly an accident. A widely told story says that in the 1960s–70s, a health official heard his daughter practicing the piece on the piano, thought it was nice, and adopted it as the truck's tune. Note that in Taiwan '垃圾' is commonly pronounced 'lèsè' rather than the dictionary 'lājī'—a fun quirk of local usage. In recent years, more areas offer apps that track the truck's location in real time.",
    k:"사실 그 《소녀의 기도》가 쓰이게 된 건 우연이라고 합니다. 1960~70년대에 당시 위생 담당 관리가 딸이 이 곡을 피아노로 연습하는 걸 듣고 '좋다'며 쓰레기차 멜로디로 채택했다는 이야기가 널리 전해집니다. 대만에서는 '垃圾'를 사전상의 'lājī'가 아니라 'lèsè'로 읽는 것이 일반적이라는 점도 재미있습니다. 최근에는 앱으로 쓰레기차 위치를 실시간으로 추적할 수 있는 지역도 늘고 있습니다."
  }
},
{
  id:"democracy-and-elections",
  cat:{ j:"社会・制度", e:"Society & Systems", k:"사회·제도" },
  zhTitle:"台灣的民主與選舉文化",
  title:{ j:"台湾の民主主義と選挙文化", e:"Taiwan's Democracy and Election Culture", k:"대만의 민주주의와 선거 문화" },
  intro:{
    j:"選挙が近づくと、街は旗とのぼりで埋め尽くされ、夜には大音量の応援集会が開かれ、候補者は朝から市場で握手してまわる——台湾の選挙はまるでお祭りのようです。なぜここまで盛り上がるのか、そして民主主義が台湾の人々にとって何を意味するのかを、のぞいてみましょう。",
    e:"As elections near, streets fill with flags and banners, loud rallies light up the nights, and candidates shake hands at markets from early morning—elections in Taiwan feel like a festival. Let's look at why they get so lively, and what democracy means to the people of Taiwan.",
    k:"선거가 다가오면 거리는 깃발과 현수막으로 뒤덮이고, 밤에는 큰 소리의 응원 집회가 열리며, 후보들은 아침부터 시장에서 악수를 하고 다닙니다—대만의 선거는 마치 축제 같습니다. 왜 이렇게 뜨거워지는지, 그리고 민주주의가 대만 사람들에게 무엇을 의미하는지 들여다봅시다."
  },
  paras:[
    {
      z:"台灣現在的民主，其實是一段不算太長、卻得來不易的歷史。從一九八〇年代末解除戒嚴，到一九九六年第一次由人民「直接投票」選出總統，台灣在幾十年間，從威權體制走向今天大家習以為常的自由選舉。正因為這條路走得辛苦，許多台灣人特別珍惜手上那一張選票。",
      py:"Táiwān xiànzài de mínzhǔ, qíshí shì yí duàn bú suàn tài cháng, què déláibúyì de lìshǐ. Cóng yī jiǔ bā líng niándài mò jiěchú jièyán, dào yī jiǔ jiǔ liù nián dì yī cì yóu rénmín “zhíjiē tóupiào” xuǎn chū zǒngtǒng, Táiwān zài jǐshí nián jiān, cóng wēiquán tǐzhì zǒuxiàng jīntiān dàjiā xíyǐwéicháng de zìyóu xuǎnjǔ. Zhèng yīnwèi zhè tiáo lù zǒu de xīnkǔ, xǔduō Táiwānrén tèbié zhēnxī shǒushàng nà yì zhāng xuǎnpiào.",
      m:{
        j:"台湾の今の民主主義は、実はそれほど長くはないけれど、簡単には得られなかった歴史の産物です。1980年代末に戒厳令が解除され、1996年に初めて国民が「直接投票」で総統を選出するまで、台湾は数十年のあいだに、権威主義体制から今日みんなが当たり前に思う自由な選挙へと歩んできました。この道のりが苦しいものだったからこそ、多くの台湾人は手にした一票をとりわけ大切にします。",
        e:"Taiwan's democracy today is the product of a history that isn't very long but was hard-won. From the lifting of martial law in the late 1980s to the first direct popular election of a president in 1996, Taiwan moved over a few decades from an authoritarian system to the free elections everyone now takes for granted. Precisely because that road was hard, many Taiwanese especially cherish the ballot in their hands.",
        k:"오늘날 대만의 민주주의는 사실 그리 길지 않지만 쉽게 얻지 못한 역사의 산물입니다. 1980년대 말 계엄 해제부터 1996년 처음으로 국민이 '직접 투표'로 총통을 선출하기까지, 대만은 수십 년 사이에 권위주의 체제에서 오늘날 모두가 당연하게 여기는 자유 선거로 걸어왔습니다. 이 길이 힘들었기에 많은 대만 사람은 손에 쥔 한 표를 특히 소중히 여깁니다."
      }
    },
    {
      z:"台灣的選舉種類很多，總統、立法委員、縣市長、議員、里長……幾乎每隔一兩年就有一場重要選舉。每到選舉季，最熱鬧的畫面之一就是「造勢晚會」。支持者聚集在廣場或體育場，揮舞旗幟、高喊口號，台上有候選人演講，台下有音樂、有加油聲，氣氛熱烈得像一場大型演唱會。",
      py:"Táiwān de xuǎnjǔ zhǒnglèi hěnduō, zǒngtǒng, lìfǎ wěiyuán, xiànshìzhǎng, yìyuán, lǐzhǎng…… jīhū měi gé yì liǎng nián jiù yǒu yì chǎng zhòngyào xuǎnjǔ. Měi dào xuǎnjǔ jì, zuì rènào de huàmiàn zhī yī jiùshì “zàoshì wǎnhuì”. Zhīchízhě jùjí zài guǎngchǎng huò tǐyùchǎng, huīwǔ qízhì, gāohǎn kǒuhào, tái shàng yǒu hòuxuǎnrén yǎnjiǎng, tái xià yǒu yīnyuè, yǒu jiāyóu shēng, qìfēn rèliè de xiàng yì chǎng dàxíng yǎnchànghuì.",
      m:{
        j:"台湾の選挙は種類が多く、総統、立法委員（国会議員）、県市長、議員、里長（町内会長のような役職）……ほぼ一、二年ごとに重要な選挙があります。選挙シーズンになると、最もにぎやかな光景の一つが「造勢晚会（決起集会）」です。支持者が広場や競技場に集まり、旗を振り、スローガンを叫び、壇上では候補者が演説し、客席では音楽が流れ応援の声が上がって、雰囲気はまるで大型コンサートのようです。",
        e:"Taiwan holds many kinds of elections—president, legislators, city and county mayors, councilors, borough chiefs—so there's an important election almost every year or two. In election season, one of the liveliest sights is the 'rally' (zàoshì wǎnhuì). Supporters gather in plazas or stadiums, wave flags and chant slogans, candidates give speeches on stage, and below there's music and cheering—an atmosphere as fervent as a big concert.",
        k:"대만의 선거는 종류가 많습니다. 총통, 입법위원(국회의원), 현·시장, 의원, 리장(통·반장 격)…거의 1~2년마다 중요한 선거가 있습니다. 선거철이 되면 가장 떠들썩한 장면 중 하나가 '조세완회(궐기 집회)'입니다. 지지자들이 광장이나 경기장에 모여 깃발을 흔들고 구호를 외치며, 무대 위에서는 후보가 연설하고 아래에서는 음악과 응원 소리가 울려 분위기가 마치 대형 콘서트 같습니다."
      }
    },
    {
      z:"除了大型晚會，還有一種更貼近日常的拜票方式，叫「掃街」。候選人和團隊會走進傳統市場、夜市、廟口，沿街和民眾握手、鞠躬、發文宣，一句「拜託拜託，多多支持」說上千百遍。你可能正在買菜，就被候選人熱情地握了手。這種面對面的接觸，讓政治不再是遙遠的名字，而是活生生站在你面前的人。",
      py:"Chúle dàxíng wǎnhuì, hái yǒu yì zhǒng gèng tiējìn rìcháng de bàipiào fāngshì, jiào “sǎojiē”. Hòuxuǎnrén hé tuánduì huì zǒujìn chuántǒng shìchǎng, yèshì, miàokǒu, yánjiē hé mínzhòng wòshǒu, jūgōng, fā wénxuān, yí jù “bàituō bàituō, duōduō zhīchí” shuō shàng qiānbǎi biàn. Nǐ kěnéng zhèngzài mǎicài, jiù bèi hòuxuǎnrén rèqíng de wò le shǒu. Zhè zhǒng miànduìmiàn de jiēchù, ràng zhèngzhì búzài shì yáoyuǎn de míngzì, érshì huóshēngshēng zhàn zài nǐ miànqián de rén.",
      m:{
        j:"大型集会のほかに、もっと日常に近い票のお願いの仕方があり、「掃街（街頭練り歩き）」と呼ばれます。候補者とチームは伝統市場、夜市、廟の前などに入り込み、通り沿いで市民と握手し、お辞儀をし、チラシを配り、「よろしくお願いします、ぜひご支持を」と何百回も繰り返します。買い物中に、いきなり候補者から熱心に握手される、なんてことも。この面と向かった触れ合いが、政治を遠い名前ではなく、目の前に立つ生身の人間にしてくれるのです。",
        e:"Beyond big rallies, there's a more everyday way of canvassing called 'sweeping the streets' (sǎojiē). Candidates and their teams walk into traditional markets, night markets, and temple squares, shaking hands with people along the way, bowing, handing out flyers, and repeating 'please, please, your support means a lot' hundreds of times. You might be buying groceries when a candidate warmly shakes your hand. This face-to-face contact turns politics from a distant name into a living person standing right in front of you.",
        k:"대형 집회 외에도 일상에 더 가까운 표심 호소 방식이 있는데 '거리 훑기(사오제)'라고 합니다. 후보와 팀은 전통시장, 야시장, 사당 앞으로 들어가 길을 따라 사람들과 악수하고 인사하며 전단을 나눠 주고 '부탁드립니다, 많이 지지해 주세요'를 수백 번 반복합니다. 장을 보다가 후보에게 열정적으로 악수를 받을 수도 있습니다. 이런 얼굴을 맞댄 접촉은 정치를 먼 이름이 아니라 눈앞에 서 있는 생생한 사람으로 만들어 줍니다."
      }
    },
    {
      z:"投票日當天，台灣的投票所大多設在學校或活動中心。台灣採用的是「圈選」和「人工開票」：選民拿到選票後，在候選人旁邊蓋章，投進票匭。等投票時間一結束，開票人員當場把一張張票拿出來、大聲唱名、正字計票，過程完全公開，任何人都可以在旁邊看。這種「開箱見光」的透明方式，是台灣人對選舉結果有信心的重要原因。",
      py:"Tóupiào rì dàngtiān, Táiwān de tóupiàosuǒ dàduō shè zài xuéxiào huò huódòng zhōngxīn. Táiwān cǎiyòng de shì “quānxuǎn” hé “réngōng kāipiào”: xuǎnmín nádào xuǎnpiào hòu, zài hòuxuǎnrén pángbiān gàizhāng, tóu jìn piàoguī. Děng tóupiào shíjiān yì jiéshù, kāipiào rényuán dāngchǎng bǎ yì zhāng zhāng piào ná chūlái, dàshēng chàngmíng, zhèngzì jìpiào, guòchéng wánquán gōngkāi, rènhé rén dōu kěyǐ zài pángbiān kàn. Zhè zhǒng “kāixiāng jiànguāng” de tòumíng fāngshì, shì Táiwānrén duì xuǎnjǔ jiéguǒ yǒu xìnxīn de zhòngyào yuányīn.",
      m:{
        j:"投票日当日、台湾の投票所はたいてい学校や地域センターに設けられます。台湾が採用しているのは「印を押す方式」と「手作業の開票」です。有権者は投票用紙を受け取り、候補者の横に印を押して投票箱に入れます。投票時間が終わると、開票係がその場で一枚ずつ票を取り出し、大声で名前を読み上げ、「正」の字で数える——過程は完全に公開され、誰でもそばで見学できます。この「箱を開けて明るみに出す」透明なやり方が、台湾人が選挙結果を信頼できる大きな理由です。",
        e:"On election day, Taiwan's polling stations are usually set up in schools or community centers. Taiwan uses paper marking and hand-counting: voters receive a ballot, stamp a mark next to their chosen candidate, and drop it in the box. When voting closes, counting staff pull out each ballot on the spot, call out the name aloud, and tally with tick marks—the whole process fully public, with anyone free to watch from the side. This 'open the box in the light' transparency is a key reason Taiwanese trust their election results.",
        k:"투표일 당일, 대만의 투표소는 대개 학교나 주민센터에 마련됩니다. 대만은 '도장 찍기'와 '수개표'를 채택합니다. 유권자는 투표용지를 받아 후보 옆에 도장을 찍고 투표함에 넣습니다. 투표 시간이 끝나면 개표원이 그 자리에서 한 장씩 표를 꺼내 큰 소리로 이름을 부르고 '정(正)' 자로 집계하는데, 과정이 완전히 공개되어 누구나 옆에서 볼 수 있습니다. 이 '상자를 열어 밝은 곳에서' 진행하는 투명한 방식은 대만 사람이 선거 결과를 신뢰하는 중요한 이유입니다."
      }
    },
    {
      z:"台灣的投票率一直維持在很高的水準，總統大選常常超過七成。許多在外地工作或讀書的人，會特地在投票日搭車、坐高鐵「返鄉投票」，因為台灣目前仍需回到戶籍地才能投票。車站擠滿了拖著行李的返鄉人潮，成了選舉季獨特的風景。這份「再遠也要回去投一票」的心情，說明了選舉對很多人來說有多重要。",
      py:"Táiwān de tóupiào lǜ yìzhí wéichí zài hěn gāo de shuǐzhǔn, zǒngtǒng dàxuǎn chángcháng chāoguò qī chéng. Xǔduō zài wàidì gōngzuò huò dúshū de rén, huì tèdì zài tóupiào rì dāchē, zuò gāotiě “fǎnxiāng tóupiào”, yīnwèi Táiwān mùqián réng xū huídào hùjídì cáinéng tóupiào. Chēzhàn jǐmǎn le tuōzhe xínglǐ de fǎnxiāng réncháo, chéng le xuǎnjǔ jì dútè de fēngjǐng. Zhè fèn “zài yuǎn yě yào huíqù tóu yì piào” de xīnqíng, shuōmíng le xuǎnjǔ duì hěnduō rén lái shuō yǒu duō zhòngyào.",
      m:{
        j:"台湾の投票率はずっと非常に高い水準を保っており、総統選ではしばしば七割を超えます。他の土地で働いたり学んだりしている人の多くは、投票日にわざわざバスや高速鉄道に乗って「帰郷して投票」します。台湾では今のところ、戸籍地に戻らないと投票できないからです。駅は荷物を引いた帰郷ラッシュの人波であふれ、選挙シーズン独特の風景になります。この「どんなに遠くても一票を投じに帰る」という気持ちが、選挙が多くの人にとってどれほど大切かを物語っています。",
        e:"Taiwan's voter turnout stays consistently high, often exceeding 70% in presidential elections. Many people who work or study away from home make a special trip on election day—by bus or high-speed rail—to 'go home and vote,' because in Taiwan you currently still have to return to your registered household district to cast a ballot. Stations fill with crowds of returnees dragging luggage, a distinctive scene of election season. This feeling of 'no matter how far, I'll go back to cast my vote' shows just how much elections matter to many people.",
        k:"대만의 투표율은 계속 매우 높은 수준을 유지하며 총통 선거에서는 종종 70%를 넘습니다. 타지에서 일하거나 공부하는 많은 사람이 투표일에 일부러 버스나 고속철도를 타고 '고향에 돌아가 투표'합니다. 대만은 현재까지도 호적지로 돌아가야 투표할 수 있기 때문입니다. 역은 짐을 끄는 귀향 인파로 가득 차 선거철 특유의 풍경이 됩니다. 이 '아무리 멀어도 한 표를 던지러 돌아간다'는 마음은 선거가 많은 사람에게 얼마나 중요한지를 말해 줍니다."
      }
    },
    {
      z:"當然，選舉再熱鬧，也有它嚴肅的一面。開票結束、結果揭曉之後，落選的一方通常會發表談話、承認敗選，社會很快回到平常的節奏。對許多台灣人來說，能夠用選票和平地決定誰來領導自己的社會，是身分認同裡很重要的一部分。這份「我的一票有用」的信念，正是台灣民主文化最動人的地方。",
      py:"Dāngrán, xuǎnjǔ zài rènào, yě yǒu tā yánsù de yímiàn. Kāipiào jiéshù, jiéguǒ jiēxiǎo zhīhòu, luòxuǎn de yìfāng tōngcháng huì fābiǎo tánhuà, chéngrèn bàixuǎn, shèhuì hěn kuài huídào píngcháng de jiézòu. Duì xǔduō Táiwānrén lái shuō, nénggòu yòng xuǎnpiào hépíng de juédìng shéi lái lǐngdǎo zìjǐ de shèhuì, shì shēnfèn rèntóng lǐ hěn zhòngyào de yí bùfèn. Zhè fèn “wǒ de yì piào yǒuyòng” de xìnniàn, zhèng shì Táiwān mínzhǔ wénhuà zuì dòngrén de dìfāng.",
      m:{
        j:"もちろん、選挙がどれほどにぎやかでも、そこには厳粛な一面があります。開票が終わり結果が明らかになると、落選した側はたいてい談話を発表して敗北を認め、社会はすぐに普段のリズムへと戻ります。多くの台湾人にとって、選挙で平和的に自分たちの社会を率いる人を決められることは、アイデンティティの中でとても大切な一部です。この「私の一票には意味がある」という信念こそ、台湾の民主文化の最も心を打つところなのです。",
        e:"Of course, however lively an election is, it also has a solemn side. Once counting ends and the results are clear, the losing side usually gives a statement and concedes defeat, and society quickly returns to its normal rhythm. For many Taiwanese, being able to peacefully decide through the ballot who leads their society is an important part of their identity. This belief that 'my vote matters' is the most moving thing about Taiwan's democratic culture.",
        k:"물론 선거가 아무리 떠들썩해도 엄숙한 면이 있습니다. 개표가 끝나고 결과가 드러나면 낙선한 쪽은 대개 담화를 발표하며 패배를 인정하고, 사회는 곧 평소의 리듬으로 돌아갑니다. 많은 대만 사람에게 선거로 평화롭게 자신들의 사회를 이끌 사람을 정할 수 있다는 것은 정체성에서 매우 중요한 부분입니다. 이 '내 한 표가 의미 있다'는 믿음이야말로 대만 민주주의 문화의 가장 감동적인 대목입니다."
      }
    }
  ],
  vocab:[
    { w:"民主", zy:"ㄇㄧㄣˊ ㄓㄨˇ", py:"mínzhǔ", m:{ j:"民主主義", e:"democracy", k:"민주주의" } },
    { w:"選舉", zy:"ㄒㄩㄢˇ ㄐㄩˇ", py:"xuǎnjǔ", m:{ j:"選挙", e:"election", k:"선거" } },
    { w:"選票", zy:"ㄒㄩㄢˇ ㄆㄧㄠˋ", py:"xuǎnpiào", m:{ j:"投票用紙・一票", e:"ballot, vote", k:"투표용지·표" } },
    { w:"總統", zy:"ㄗㄨㄥˇ ㄊㄨㄥˇ", py:"zǒngtǒng", m:{ j:"総統（大統領）", e:"president", k:"총통(대통령)" } },
    { w:"立法委員", zy:"ㄌㄧˋ ㄈㄚˇ ㄨㄟˇ ㄩㄢˊ", py:"lìfǎ wěiyuán", m:{ j:"立法委員（国会議員）", e:"legislator", k:"입법위원(국회의원)" } },
    { w:"造勢晚會", zy:"ㄗㄠˋ ㄕˋ ㄨㄢˇ ㄏㄨㄟˋ", py:"zàoshì wǎnhuì", m:{ j:"決起集会・応援集会", e:"campaign rally", k:"궐기·응원 집회" } },
    { w:"掃街", zy:"ㄙㄠˇ ㄐㄧㄝ", py:"sǎojiē", m:{ j:"街頭を練り歩いて票を頼むこと", e:"street canvassing", k:"거리 유세" } },
    { w:"拜票", zy:"ㄅㄞˋ ㄆㄧㄠˋ", py:"bàipiào", m:{ j:"票をお願いして回る", e:"to canvass for votes", k:"표를 부탁하다" } },
    { w:"投票所", zy:"ㄊㄡˊ ㄆㄧㄠˋ ㄙㄨㄛˇ", py:"tóupiàosuǒ", m:{ j:"投票所", e:"polling station", k:"투표소" } },
    { w:"開票", zy:"ㄎㄞ ㄆㄧㄠˋ", py:"kāipiào", m:{ j:"開票", e:"vote counting", k:"개표" } },
    { w:"投票率", zy:"ㄊㄡˊ ㄆㄧㄠˋ ㄌㄩˋ", py:"tóupiào lǜ", m:{ j:"投票率", e:"voter turnout", k:"투표율" } },
    { w:"返鄉", zy:"ㄈㄢˇ ㄒㄧㄤ", py:"fǎnxiāng", m:{ j:"帰郷する", e:"to return to one's hometown", k:"귀향하다" } }
  ],
  note:{
    j:"台湾では今も原則として『戸籍地』に戻らないと投票できず、不在者投票（郵送投票など）はまだ導入されていません。そのため選挙前日は、都市部から地方への『返郷投票』ラッシュで交通機関が混み合います。また台湾の選挙は、候補者ごとに割り当てられた番号を大切にする文化があり、演説では『◯番、○○○、拜託拜託！』と番号と名前をセットで連呼するのが定番。投票所での『唱票（票を一枚ずつ読み上げる）』も、テレビで生中継されるほど台湾人が見慣れた光景です。",
    e:"In Taiwan you still generally must return to your registered household district to vote—absentee or mail-in voting hasn't been introduced. So the day before an election, transport gets crowded with the rush of people heading from cities back to their hometowns. Taiwanese campaigns also make much of each candidate's assigned number, and speeches typically chant number and name together: 'Number X, so-and-so, please, please!' The 'reading out' of each ballot at counting is a scene so familiar it's broadcast live on TV.",
    k:"대만에서는 지금도 원칙적으로 '호적지'로 돌아가야 투표할 수 있고 부재자·우편 투표는 아직 도입되지 않았습니다. 그래서 선거 전날에는 도시에서 지방으로 향하는 '귀향 투표' 인파로 교통이 붐빕니다. 또 대만 선거는 후보마다 배정된 번호를 중시하는 문화가 있어, 연설에서 '◯번, ○○○, 부탁드립니다!'라고 번호와 이름을 함께 외치는 것이 정석입니다. 개표 때 표를 한 장씩 읽는 '창표'도 TV로 생중계될 만큼 대만 사람에게 익숙한 풍경입니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_1 };
