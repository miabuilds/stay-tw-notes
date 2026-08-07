// StayTW Notes — 深度閲讀：くらしの実務（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_14 = [
{
  id:"seeing-a-doctor-in-taiwan",
  cat:{ j:"くらしの実務", e:"Practical Living", k:"생활 실무" },
  zhTitle:"在台灣看病：診所、醫院與健保卡的實用指南",
  title:{ j:"台湾で病院にかかる：クリニック・病院・健保カードの実用ガイド", e:"Seeing a Doctor in Taiwan: A Practical Guide to Clinics, Hospitals, and Your NHI Card", k:"대만에서 병원 가기: 의원·병원·건강보험카드 실용 가이드" },
  intro:{
    j:"喉が痛い、熱が出た、腰をひねった——台湾で暮らしていると、いつかは病院にかかる日がやってきます。でも『どこに行けばいい？』『何を持っていく？』『いくらかかる？』と不安になる人は多いはず。この記事では、台湾で病院にかかる一連の流れを、初めての人でも迷わないように順を追って解説します。",
    e:"A sore throat, a fever, a wrenched back—live in Taiwan long enough and a day will come when you need to see a doctor. But many people worry: 'Where do I go? What do I bring? How much will it cost?' This article walks you through the whole process of seeing a doctor in Taiwan, step by step, so that even a first-timer won't get lost.",
    k:"목이 아프고, 열이 나고, 허리를 삐끗하고—대만에 살다 보면 언젠가 병원에 가야 하는 날이 옵니다. 하지만 '어디로 가지? 뭘 가져가지? 얼마나 들지?' 하고 불안해하는 사람이 많습니다. 이 글에서는 대만에서 병원에 가는 전 과정을 처음인 사람도 헤매지 않도록 순서대로 설명합니다."
  },
  paras:[
    {
      z:"在台灣看病，第一個要搞懂的觀念是「診所」和「醫院」的差別。小病、感冒、拉肚子、皮膚癢這種日常的毛病，通常直接去住家附近的「診所」就好，不用大老遠跑去大醫院。診所規模小、看診快、通常不用預約，走進去掛號等一下就能看到醫生。真正需要住院、開刀，或是病情比較複雜、要做精密檢查的時候，才會去「醫院」，尤其是設備齊全的「醫學中心」。",
      py:"Zài Táiwān kànbìng, dì yī ge yào gǎodǒng de guānniàn shì “zhěnsuǒ” hé “yīyuàn” de chābié. Xiǎobìng, gǎnmào, lādùzi, pífū yǎng zhè zhǒng rìcháng de máobìng, tōngcháng zhíjiē qù zhùjiā fùjìn de “zhěnsuǒ” jiù hǎo, búyòng dàlǎoyuǎn pǎo qù dà yīyuàn. Zhěnsuǒ guīmó xiǎo, kànzhěn kuài, tōngcháng búyòng yùyuē, zǒu jìnqù guàhào děng yíxià jiù néng kàndào yīshēng. Zhēnzhèng xūyào zhùyuàn, kāidāo, huòshì bìngqíng bǐjiào fùzá, yào zuò jīngmì jiǎnchá de shíhòu, cái huì qù “yīyuàn”, yóuqí shì shèbèi qíquán de “yīxué zhōngxīn”.",
      m:{
        j:"台湾で病院にかかるとき、まず理解すべきなのが「診所（クリニック）」と「醫院（病院）」の違いです。軽い病気、風邪、下痢、皮膚のかゆみといった日常のちょっとした不調なら、たいてい家の近くの「診所」に直接行けばよく、わざわざ大病院まで行く必要はありません。診所は規模が小さく、診察が早く、予約も普通は不要で、入って受付をすませ少し待てば医師に診てもらえます。本当に入院や手術が必要なとき、あるいは症状が複雑で精密検査が必要なときに初めて「醫院」、とりわけ設備の整った「医学センター」に行くのです。",
        e:"The first concept to grasp when seeing a doctor in Taiwan is the difference between a 'clinic' (zhěnsuǒ) and a 'hospital' (yīyuàn). For minor illnesses—colds, diarrhea, an itchy rash and other everyday complaints—you usually just go straight to a clinic near your home; there's no need to trek all the way to a big hospital. Clinics are small, see you quickly, usually take no appointment, and you can walk in, register, wait a bit, and see the doctor. Only when you genuinely need to be hospitalized, have surgery, or have a complex condition requiring detailed tests do you go to a 'hospital,' especially a fully-equipped 'medical center.'",
        k:"대만에서 병원에 갈 때 먼저 이해해야 할 개념은 '의원(zhěnsuǒ)'과 '병원(yīyuàn)'의 차이입니다. 가벼운 병, 감기, 설사, 피부 가려움 같은 일상적인 증상이라면 보통 집 근처 '의원'에 바로 가면 되고, 굳이 멀리 큰 병원까지 갈 필요가 없습니다. 의원은 규모가 작고 진료가 빠르며 보통 예약이 필요 없어, 들어가서 접수하고 조금 기다리면 의사를 만날 수 있습니다. 정말로 입원이나 수술이 필요하거나 증상이 복잡해 정밀 검사가 필요할 때 비로소 '병원', 특히 시설이 잘 갖춰진 '의료센터'에 갑니다."
      }
    },
    {
      z:"看病一定要記得帶「健保卡」。這張卡是你在台灣看病最重要的東西，有了它，掛號費和藥費才能用健保的價格計算，通常一次門診自己只要付一百到四百塊台幣左右。到了診所，第一步是到櫃台「掛號」，把健保卡交出去，護理師會幫你登記、排號碼。如果是第一次去那家診所，可能還要填一張基本資料表。掛完號就坐在候診區等，牆上或螢幕會顯示現在看到幾號。",
      py:"Kànbìng yídìng yào jìdé dài “jiànbǎokǎ”. Zhè zhāng kǎ shì nǐ zài Táiwān kànbìng zuì zhòngyào de dōngxi, yǒule tā, guàhàofèi hé yàofèi cái néng yòng jiànbǎo de jiàgé jìsuàn, tōngcháng yí cì ménzhěn zìjǐ zhǐyào fù yìbǎi dào sìbǎi kuài Táibì zuǒyòu. Dàole zhěnsuǒ, dì yī bù shì dào guìtái “guàhào”, bǎ jiànbǎokǎ jiāo chūqù, hùlǐshī huì bāng nǐ dēngjì, pái hàomǎ. Rúguǒ shì dì yī cì qù nà jiā zhěnsuǒ, kěnéng hái yào tián yì zhāng jīběn zīliào biǎo. Guà wán hào jiù zuò zài hòuzhěnqū děng, qiáng shàng huò yíngmù huì xiǎnshì xiànzài kàndào jǐ hào.",
      m:{
        j:"病院にかかるときは必ず「健保カード」を持っていくのを忘れずに。このカードは台湾で受診するうえで最も大切なもので、これがあってこそ受付料や薬代が健保価格で計算され、たいてい一回の外来で自己負担は台湾ドルで百〜四百元ほどですみます。診所に着いたら、まず受付で「掛號（受付登録）」をし、健保カードを渡すと、看護師が登録して番号を振ってくれます。そのクリニックが初めてなら、基本情報を書く用紙を記入することもあります。受付をすませたら待合エリアで待ち、壁や画面に今何番まで診察が進んでいるかが表示されます。",
        e:"Always remember to bring your 'NHI card' (jiànbǎokǎ). This card is the single most important thing for seeing a doctor in Taiwan; with it, your registration and medicine fees are calculated at insured rates, so one outpatient visit usually costs you only about NT$100 to NT$400 out of pocket. When you arrive at the clinic, the first step is to 'register' (guàhào) at the front desk and hand over your NHI card; the nurse will log you in and give you a number. If it's your first time at that clinic, you may also fill out a basic information form. Once registered, you sit in the waiting area, and a wall sign or screen shows which number is currently being seen.",
        k:"병원에 갈 때는 반드시 '건강보험카드(jiànbǎokǎ)'를 챙기는 걸 잊지 마세요. 이 카드는 대만에서 진료받을 때 가장 중요한 것으로, 이것이 있어야 접수비와 약값이 건강보험 가격으로 계산되어 보통 외래 한 번에 본인 부담이 대만달러로 100~400원 정도면 됩니다. 의원에 도착하면 첫 단계는 접수처에서 '접수(guàhào)'를 하고 건강보험카드를 건네는 것으로, 간호사가 등록하고 번호를 매겨 줍니다. 그 의원이 처음이라면 기본 정보를 적는 양식을 작성하기도 합니다. 접수를 마치면 대기실에서 기다리고, 벽이나 화면에 지금 몇 번까지 진료 중인지 표시됩니다."
      }
    },
    {
      z:"很多人一開始最頭痛的，是「到底該看哪一科」。台灣的診所大多有分科，招牌上會寫得很清楚：感冒、發燒、咳嗽找「家醫科」或「耳鼻喉科」；肚子痛、拉肚子看「腸胃科」；皮膚問題找「皮膚科」；眼睛不舒服看「眼科」；牙齒痛當然是「牙科」。如果真的不確定，最保險的做法就是先掛「家醫科」，家庭醫學科什麼都看一點，需要的話醫生會再幫你「轉診」到更專門的科別。",
      py:"Hěnduō rén yì kāishǐ zuì tóuténg de, shì “dàodǐ gāi kàn nǎ yì kē”. Táiwān de zhěnsuǒ dàduō yǒu fēnkē, zhāopái shàng huì xiě de hěn qīngchǔ: gǎnmào, fāshāo, késòu zhǎo “jiāyīkē” huò “ěrbíhóukē”; dùziténg, lādùzi kàn “chángwèikē”; pífū wèntí zhǎo “pífūkē”; yǎnjīng bù shūfú kàn “yǎnkē”; yáchǐ téng dāngrán shì “yákē”. Rúguǒ zhēnde bú quèdìng, zuì bǎoxiǎn de zuòfǎ jiùshì xiān guà “jiāyīkē”, jiātíng yīxuékē shénme dōu kàn yìdiǎn, xūyào de huà yīshēng huì zài bāng nǐ “zhuǎnzhěn” dào gèng zhuānmén de kēbié.",
      m:{
        j:"多くの人が最初に一番悩むのが「結局どの科にかかればいいのか」です。台湾の診所はたいてい科が分かれていて、看板にはっきり書いてあります。風邪・発熱・咳は「家醫科（家庭医学科）」か「耳鼻喉科（耳鼻咽喉科）」、腹痛・下痢は「腸胃科（消化器内科）」、皮膚の悩みは「皮膚科」、目の不調は「眼科」、歯の痛みはもちろん「牙科（歯科）」。本当に分からなければ、一番無難なのはまず「家醫科」にかかること。家庭医学科は何でも少しずつ診てくれ、必要なら医師がより専門の科へ「転診（紹介）」してくれます。",
        e:"What stumps many people at first is 'which department should I actually see?' Most clinics in Taiwan are divided by specialty, clearly marked on the signboard: for a cold, fever, or cough, look for 'family medicine' (jiāyīkē) or 'ENT' (ěrbíhóukē); for stomachache or diarrhea, 'gastroenterology' (chángwèikē); for skin problems, 'dermatology'; for eye trouble, 'ophthalmology'; and for a toothache, of course, 'dentistry.' If you're truly unsure, the safest bet is to register with 'family medicine' first—family doctors handle a bit of everything, and if needed the doctor will 'refer' (zhuǎnzhěn) you to a more specialized department.",
        k:"많은 사람이 처음에 가장 고민하는 것이 '도대체 어느 과에 가야 하나'입니다. 대만의 의원은 대부분 과가 나뉘어 있고 간판에 분명히 적혀 있습니다. 감기·발열·기침은 '가정의학과(jiāyīkē)'나 '이비인후과(ěrbíhóukē)', 배가 아프거나 설사는 '소화기내과(chángwèikē)', 피부 문제는 '피부과', 눈이 불편하면 '안과', 치통은 당연히 '치과'입니다. 정말 확실하지 않다면 가장 안전한 방법은 우선 '가정의학과'에 접수하는 것입니다. 가정의학과는 무엇이든 조금씩 봐 주고, 필요하면 의사가 더 전문적인 과로 '전원(zhuǎnzhěn)'을 해 줍니다."
      }
    },
    {
      z:"看完醫生之後，接下來是「領藥」。在小診所，很多是「醫藥合一」，看完診直接在同一個櫃台領藥、付錢，很方便。在大醫院或部分診所，醫生會開一張「處方箋」，你拿著它到「藥局」領藥。台灣的健保藥很便宜，藥師會跟你說明每種藥怎麼吃、一天幾次、飯前還是飯後。記得聽清楚，或者看藥袋上印的說明，上面通常寫得很詳細。如果對某種藥過敏，一定要先告訴醫生和藥師。",
      py:"Kàn wán yīshēng zhīhòu, jiē xiàlái shì “lǐngyào”. Zài xiǎo zhěnsuǒ, hěnduō shì “yīyào héyī”, kàn wán zhěn zhíjiē zài tóng yí ge guìtái lǐngyào, fùqián, hěn fāngbiàn. Zài dà yīyuàn huò bùfèn zhěnsuǒ, yīshēng huì kāi yì zhāng “chǔfāngjiān”, nǐ názhe tā dào “yàojú” lǐngyào. Táiwān de jiànbǎo yào hěn piányí, yàoshī huì gēn nǐ shuōmíng měi zhǒng yào zěnme chī, yì tiān jǐ cì, fàn qián háishì fàn hòu. Jìdé tīng qīngchǔ, huòzhě kàn yàodài shàng yìn de shuōmíng, shàngmiàn tōngcháng xiě de hěn xiángxì. Rúguǒ duì mǒu zhǒng yào guòmǐn, yídìng yào xiān gàosù yīshēng hé yàoshī.",
      m:{
        j:"医師の診察が終わったら、次は「領藥（薬の受け取り）」です。小さな診所では「医薬一体（院内処方）」が多く、診察後に同じ受付で薬を受け取り会計もすませられて便利です。大病院や一部の診所では、医師が「処方箋」を書いてくれ、それを持って「薬局」で薬をもらいます。台湾の健保の薬はとても安く、薬剤師が各薬の飲み方、一日何回、食前か食後かを説明してくれます。しっかり聞くか、薬袋に印刷された説明を見ましょう。たいてい詳しく書いてあります。もし特定の薬にアレルギーがあるなら、必ず先に医師と薬剤師に伝えてください。",
        e:"After seeing the doctor, the next step is 'picking up medicine' (lǐngyào). At small clinics, care and pharmacy are often combined (yīyào héyī): after the consultation you collect your medicine and pay at the same desk—very convenient. At large hospitals or some clinics, the doctor writes a 'prescription' (chǔfāngjiān), which you take to a 'pharmacy' (yàojú) to fill. Insured medicine in Taiwan is cheap, and the pharmacist will explain how to take each drug, how many times a day, and whether before or after meals. Be sure to listen carefully, or read the printed instructions on the medicine bag—they're usually quite detailed. If you're allergic to any medication, always tell the doctor and pharmacist first.",
        k:"의사 진료가 끝나면 다음은 '약 받기(lǐngyào)'입니다. 작은 의원에서는 '의약 일체(원내 처방)'가 많아 진료 후 같은 접수처에서 약을 받고 계산까지 마칠 수 있어 편리합니다. 큰 병원이나 일부 의원에서는 의사가 '처방전(chǔfāngjiān)'을 써 주고, 그것을 들고 '약국(yàojú)'에서 약을 받습니다. 대만의 건강보험 약은 매우 저렴하고, 약사가 각 약의 복용법, 하루 몇 번, 식전인지 식후인지 설명해 줍니다. 잘 듣거나 약봉지에 인쇄된 설명을 보세요. 대개 자세히 적혀 있습니다. 특정 약에 알레르기가 있다면 반드시 먼저 의사와 약사에게 알려야 합니다."
      }
    },
    {
      z:"如果是半夜突然發高燒、受傷流血、或身體出現很嚴重的狀況，就要去醫院的「急診」。急診二十四小時都有醫生，但它是給「緊急、危險」的病人用的，會依照病情的嚴重程度分級，最危急的先看，所以如果只是小感冒去急診，可能要等很久，費用也比一般門診高。另外，長期要吃的「慢性病」藥，例如高血壓、糖尿病，醫生可以開「慢性病連續處方箋」，讓你一次拿三個月的藥，不用每個月都跑一趟。",
      py:"Rúguǒ shì bànyè túrán fā gāoshāo, shòushāng liúxiě, huò shēntǐ chūxiàn hěn yánzhòng de zhuàngkuàng, jiù yào qù yīyuàn de “jízhěn”. Jízhěn èrshísì xiǎoshí dōu yǒu yīshēng, dàn tā shì gěi “jǐnjí, wéixiǎn” de bìngrén yòng de, huì yīzhào bìngqíng de yánzhòng chéngdù fēnjí, zuì wéijí de xiān kàn, suǒyǐ rúguǒ zhǐshì xiǎo gǎnmào qù jízhěn, kěnéng yào děng hěnjiǔ, fèiyòng yě bǐ yìbān ménzhěn gāo. Lìngwài, chángqí yào chī de “mànxìngbìng” yào, lìrú gāoxiěyā, tángniàobìng, yīshēng kěyǐ kāi “mànxìngbìng liánxù chǔfāngjiān”, ràng nǐ yí cì ná sān ge yuè de yào, búyòng měi ge yuè dōu pǎo yí tàng.",
      m:{
        j:"もし真夜中に突然高熱が出た、怪我で出血している、あるいは体にとても深刻な状態が現れたら、病院の「急診（救急）」へ行きます。救急は24時間医師がいますが、あくまで「緊急・危険」な患者のためのもので、症状の重さで優先順位が分けられ、最も危険な人から診るため、ただの軽い風邪で救急に行くと長く待たされることもあり、費用も通常の外来より高くなります。また、長期に飲む「慢性病」の薬、たとえば高血圧や糖尿病は、医師が「慢性病連続処方箋」を出してくれ、一度に三か月分もらえるので、毎月通う必要がありません。",
        e:"If in the middle of the night you suddenly run a high fever, bleed from an injury, or develop a very serious condition, go to the hospital 'emergency room' (jízhěn). The ER has doctors around the clock, but it's for 'urgent, dangerous' patients: cases are triaged by severity and the most critical are seen first, so going to the ER for a mild cold may mean a long wait and a higher cost than a regular outpatient visit. Also, for long-term 'chronic illness' medications—such as high blood pressure or diabetes—the doctor can issue a 'chronic-illness repeat prescription,' letting you collect three months' worth at once so you don't have to come in every month.",
        k:"만약 한밤중에 갑자기 고열이 나거나, 부상으로 피가 나거나, 몸에 매우 심각한 상태가 나타나면 병원의 '응급실(jízhěn)'로 갑니다. 응급실은 24시간 의사가 있지만 어디까지나 '긴급하고 위험한' 환자를 위한 곳으로, 증상의 심각도에 따라 등급을 나눠 가장 위급한 사람부터 진료하므로, 단순한 가벼운 감기로 응급실에 가면 오래 기다릴 수 있고 비용도 일반 외래보다 높습니다. 또 장기간 복용하는 '만성질환' 약, 예를 들어 고혈압이나 당뇨는 의사가 '만성질환 연속 처방전'을 발급해 한 번에 3개월치를 받을 수 있어 매달 다닐 필요가 없습니다."
      }
    },
    {
      z:"總結來說，在台灣看病其實比很多人想像的簡單：帶著健保卡，先判斷是小病還是大病，選對科別，掛號、看診、領藥，整個流程往往半小時到一小時就結束了。剛來台灣的外國人可以先把住家附近的診所、藥局位置記起來，也可以問問同事或鄰居「這附近哪間診所比較好」。等你熟悉之後就會發現，這套又便宜又方便的醫療系統，是在台灣生活最讓人安心的一件事。",
      py:"Zǒngjié lái shuō, zài Táiwān kànbìng qíshí bǐ hěnduō rén xiǎngxiàng de jiǎndān: dàizhe jiànbǎokǎ, xiān pànduàn shì xiǎobìng háishì dàbìng, xuǎn duì kēbié, guàhào, kànzhěn, lǐngyào, zhěnggè liúchéng wǎngwǎng bàn xiǎoshí dào yì xiǎoshí jiù jiéshù le. Gāng lái Táiwān de wàiguórén kěyǐ xiān bǎ zhùjiā fùjìn de zhěnsuǒ, yàojú wèizhì jì qǐlái, yě kěyǐ wènwen tóngshì huò línjū “zhè fùjìn nǎ jiān zhěnsuǒ bǐjiào hǎo”. Děng nǐ shúxī zhīhòu jiù huì fāxiàn, zhè tào yòu piányí yòu fāngbiàn de yīliáo xìtǒng, shì zài Táiwān shēnghuó zuì ràng rén ānxīn de yí jiàn shì.",
      m:{
        j:"まとめると、台湾で病院にかかるのは、多くの人が想像するよりずっと簡単です。健保カードを持ち、まず軽い病気か重い病気かを見極め、科を正しく選び、受付・診察・薬の受け取り——この一連の流れはたいてい30分から1時間で終わります。台湾に来たばかりの外国人は、まず家の近くの診所や薬局の場所を覚えておき、同僚や近所の人に「この辺でどのクリニックがいい？」と聞いてみるのもよいでしょう。慣れてくれば、この安くて便利な医療システムが、台湾生活で最も安心できることの一つだと気づくはずです。",
        e:"In short, seeing a doctor in Taiwan is actually simpler than many imagine: bring your NHI card, first judge whether it's a minor or major illness, pick the right department, register, get examined, pick up your medicine—the whole process often wraps up in half an hour to an hour. Foreigners new to Taiwan can start by memorizing where the nearby clinics and pharmacies are, and ask a colleague or neighbor, 'Which clinic around here is good?' Once you're familiar with it, you'll find that this cheap and convenient medical system is one of the most reassuring things about living in Taiwan.",
        k:"정리하면, 대만에서 병원에 가는 일은 사실 많은 사람이 상상하는 것보다 훨씬 간단합니다. 건강보험카드를 챙기고, 먼저 가벼운 병인지 큰 병인지 판단하고, 과를 제대로 고르고, 접수·진료·약 받기—이 전 과정이 대개 30분에서 1시간이면 끝납니다. 대만에 막 온 외국인은 우선 집 근처 의원과 약국 위치를 기억해 두고, 동료나 이웃에게 '이 근처 어느 의원이 좋아요?'라고 물어보는 것도 좋습니다. 익숙해지면 이 저렴하고 편리한 의료 시스템이 대만 생활에서 가장 안심되는 일 중 하나임을 알게 될 것입니다."
      }
    }
  ],
  vocab:[
    { w:"看病", zy:"ㄎㄢˋ ㄅㄧㄥˋ", py:"kànbìng", m:{ j:"病院にかかる・診てもらう", e:"to see a doctor", k:"병원에 가다·진료받다" } },
    { w:"診所", zy:"ㄓㄣˇ ㄙㄨㄛˇ", py:"zhěnsuǒ", m:{ j:"診療所・クリニック", e:"clinic", k:"의원·클리닉" } },
    { w:"醫院", zy:"ㄧ ㄩㄢˋ", py:"yīyuàn", m:{ j:"病院", e:"hospital", k:"병원" } },
    { w:"掛號", zy:"ㄍㄨㄚˋ ㄏㄠˋ", py:"guàhào", m:{ j:"受付登録・受診受付", e:"to register (for a visit)", k:"접수하다" } },
    { w:"健保卡", zy:"ㄐㄧㄢˋ ㄅㄠˇ ㄎㄚˇ", py:"jiànbǎokǎ", m:{ j:"健康保険カード", e:"NHI card", k:"건강보험카드" } },
    { w:"科別", zy:"ㄎㄜ ㄅㄧㄝˊ", py:"kēbié", m:{ j:"診療科・科目", e:"medical department/specialty", k:"진료과" } },
    { w:"家醫科", zy:"ㄐㄧㄚ ㄧ ㄎㄜ", py:"jiāyīkē", m:{ j:"家庭医学科", e:"family medicine", k:"가정의학과" } },
    { w:"耳鼻喉科", zy:"ㄦˇ ㄅㄧˊ ㄏㄡˊ ㄎㄜ", py:"ěrbíhóukē", m:{ j:"耳鼻咽喉科", e:"ENT (otolaryngology)", k:"이비인후과" } },
    { w:"領藥", zy:"ㄌㄧㄥˇ ㄧㄠˋ", py:"lǐngyào", m:{ j:"薬を受け取る", e:"to pick up medicine", k:"약을 받다" } },
    { w:"處方箋", zy:"ㄔㄨˇ ㄈㄤ ㄐㄧㄢ", py:"chǔfāngjiān", m:{ j:"処方箋", e:"prescription", k:"처방전" } },
    { w:"急診", zy:"ㄐㄧˊ ㄓㄣˇ", py:"jízhěn", m:{ j:"救急・救急外来", e:"emergency room", k:"응급실" } },
    { w:"慢性病", zy:"ㄇㄢˋ ㄒㄧㄥˋ ㄅㄧㄥˋ", py:"mànxìngbìng", m:{ j:"慢性病", e:"chronic illness", k:"만성질환" } },
    { w:"轉診", zy:"ㄓㄨㄢˇ ㄓㄣˇ", py:"zhuǎnzhěn", m:{ j:"転診・紹介（他科・他院へ）", e:"referral", k:"전원·의뢰" } }
  ],
  note:{
    j:"補足：台湾では大病院を予約なしで受診すると『部分負担金』が高くなる一方、診所や地域のクリニックから紹介状（転診）を持って行くと安くなる仕組みがあり、これは軽症で大病院に集中するのを防ぐためです。夜間や休日に軽い症状で困ったら、まず街の『夜間・假日看診』を掲げる診所を探すのも手。多くの診所は健保署のサイトや Google マップで診療時間を確認でき、初診でもパスポートや居留証があればスムーズです。薬をもらったら『藥袋（薬の袋）』は捨てずに取っておくと、次の受診で医師に見せられて便利です。",
    e:"Note: In Taiwan, visiting a large hospital without a referral means a higher co-payment, while coming with a referral (zhuǎnzhěn) from a clinic costs less—a design meant to keep minor cases from flooding big hospitals. If you have a mild problem at night or on a holiday, look for a clinic advertising 'night/holiday hours.' You can check most clinics' hours on the NHI Administration website or Google Maps, and a first visit goes smoothly with your passport or residency permit. Keep the printed 'medicine bag' rather than tossing it—you can show it to the doctor at your next visit.",
    k:"참고: 대만에서는 큰 병원을 소개 없이 방문하면 '본인부담금'이 높아지는 반면, 의원에서 소개(zhuǎnzhěn)를 받아 가면 저렴해지는데, 이는 경증 환자가 큰 병원에 몰리는 것을 막기 위한 장치입니다. 밤이나 휴일에 가벼운 문제가 생기면 '야간·휴일 진료'를 내건 동네 의원을 먼저 찾아보세요. 대부분 의원의 진료 시간은 건강보험서 사이트나 구글 지도에서 확인할 수 있고, 초진이라도 여권이나 거류증이 있으면 수월합니다. 받은 '약봉지'는 버리지 말고 보관해 두면 다음 진료 때 의사에게 보여 줄 수 있어 편리합니다."
  }
},
{
  id:"working-in-taiwan-for-foreigners",
  cat:{ j:"くらしの実務", e:"Practical Living", k:"생활 실무" },
  zhTitle:"在台灣找工作：外國人的求職與職場實務",
  title:{ j:"台湾で仕事を探す：外国人の就職活動と職場の実務", e:"Working in Taiwan: A Foreigner's Guide to Job Hunting and the Workplace", k:"대만에서 일자리 찾기: 외국인의 구직과 직장 실무" },
  intro:{
    j:"台湾で働いてみたい——そう思ったとき、どこで仕事を探し、どんな書類が必要で、給料や社会保険はどうなっているのか、気になることは山ほどあります。この記事では、外国人が台湾で仕事を見つけ、働き始めるまでの流れを、求人サイトから履歴書、面接、就労ビザ、税金まで、実用的にまとめて解説します。",
    e:"You'd like to work in Taiwan—and the moment you decide, a pile of questions appears: where to look for jobs, what documents you need, and how salary and social insurance work. This article lays out, in practical terms, the whole journey of a foreigner finding a job and starting work in Taiwan—from job sites and résumés to interviews, work permits, and taxes.",
    k:"대만에서 일해 보고 싶다—그렇게 마음먹는 순간, 어디서 일을 찾고, 어떤 서류가 필요하며, 급여와 사회보험은 어떻게 되는지 궁금한 것이 산더미입니다. 이 글에서는 외국인이 대만에서 일자리를 찾아 일을 시작하기까지의 과정을 구인 사이트부터 이력서, 면접, 취업 비자, 세금까지 실용적으로 정리해 설명합니다."
  },
  paras:[
    {
      z:"在台灣找工作，最主流的方式是上「求職網站」。最多人用的是104人力銀行和1111人力銀行，還有比較新、給年輕人和外商用的CakeResume、Yourator。你在上面註冊、填好自己的「履歷」，就可以搜尋職缺、直接投遞。如果你會中文，選擇會多很多；如果主要靠英文，可以特別找「外商」或「新創公司」，這些地方比較常用英文工作，也比較習慣聘用外國人。",
      py:"Zài Táiwān zhǎo gōngzuò, zuì zhǔliú de fāngshì shì shàng “qiúzhí wǎngzhàn”. Zuìduō rén yòng de shì yāo líng sì rénlì yínháng hé yāo yāo yāo yāo rénlì yínháng, hái yǒu bǐjiào xīn, gěi niánqīngrén hé wàishāng yòng de CakeResume, Yourator. Nǐ zài shàngmiàn zhùcè, tián hǎo zìjǐ de “lǚlì”, jiù kěyǐ sōuxún zhíquē, zhíjiē tóudì. Rúguǒ nǐ huì Zhōngwén, xuǎnzé huì duō hěnduō; rúguǒ zhǔyào kào Yīngwén, kěyǐ tèbié zhǎo “wàishāng” huò “xīnchuàng gōngsī”, zhèxiē dìfāng bǐjiào cháng yòng Yīngwén gōngzuò, yě bǐjiào xíguàn pìnyòng wàiguórén.",
      m:{
        j:"台湾で仕事を探すもっとも主流の方法は「求人サイト」を使うことです。最も利用者が多いのは104人力銀行と1111人力銀行、そして比較的新しく、若者や外資向けのCakeResumeやYouratorもあります。サイトに登録して自分の「履歴書」を書き込めば、求人を検索して直接応募できます。中国語ができれば選択肢はぐっと増えますし、主に英語で勝負するなら「外商（外資系）」や「新創公司（スタートアップ）」を特に狙うとよいでしょう。こうした企業は英語での業務が多く、外国人の採用にも慣れています。",
        e:"The mainstream way to find a job in Taiwan is through 'job sites.' The most popular are 104 Job Bank and 1111 Job Bank, plus the newer CakeResume and Yourator aimed at younger people and foreign firms. You register, fill in your 'résumé' (lǚlì), and then search for openings and apply directly. If you speak Chinese, your options multiply; if you rely mainly on English, specifically target 'foreign companies' (wàishāng) or 'startups' (xīnchuàng gōngsī), which more often work in English and are more used to hiring foreigners.",
        k:"대만에서 일자리를 찾는 가장 주류의 방법은 '구인 사이트'를 이용하는 것입니다. 이용자가 가장 많은 곳은 104 인력은행과 1111 인력은행이고, 비교적 새롭고 젊은 층과 외국계를 위한 CakeResume, Yourator도 있습니다. 사이트에 등록해 자신의 '이력서(lǚlì)'를 작성하면 채용 공고를 검색해 바로 지원할 수 있습니다. 중국어를 할 줄 알면 선택지가 훨씬 늘고, 주로 영어로 승부한다면 '외국계 기업(wàishāng)'이나 '스타트업(xīnchuàng gōngsī)'을 특히 노리는 게 좋습니다. 이런 곳은 영어 업무가 많고 외국인 채용에도 익숙합니다."
      }
    },
    {
      z:"投履歷之後，接下來就是「面試」。台灣的面試通常會先問你的經歷、為什麼想來這家公司、對薪水的期待等等。面試時穿著整齊、準時到、態度誠懇，這幾點很重要。外國人常被問到的還有「你的簽證狀況」和「中文程度」，所以最好事先想好怎麼回答。面試可能不只一關，有些公司會有初試、複試，甚至請你做一份「作業」或小測驗，這在台灣越來越常見，不用太緊張。",
      py:"Tóu lǚlì zhīhòu, jiē xiàlái jiùshì “miànshì”. Táiwān de miànshì tōngcháng huì xiān wèn nǐ de jīnglì, wèishénme xiǎng lái zhè jiā gōngsī, duì xīnshuǐ de qídài děngděng. Miànshì shí chuānzhuó zhěngqí, zhǔnshí dào, tàidù chéngkěn, zhè jǐ diǎn hěn zhòngyào. Wàiguórén cháng bèi wèn dào de hái yǒu “nǐ de qiānzhèng zhuàngkuàng” hé “Zhōngwén chéngdù”, suǒyǐ zuìhǎo shìxiān xiǎng hǎo zěnme huídá. Miànshì kěnéng bùzhǐ yì guān, yǒuxiē gōngsī huì yǒu chūshì, fùshì, shènzhì qǐng nǐ zuò yí fèn “zuòyè” huò xiǎo cèyàn, zhè zài Táiwān yuèláiyuè chángjiàn, búyòng tài jǐnzhāng.",
      m:{
        j:"履歴書を送ったら、次は「面接」です。台湾の面接ではたいてい、あなたの経歴、なぜこの会社に来たいのか、給与への希望などをまず聞かれます。面接では服装を整え、時間を守り、誠実な態度で臨むこと——この数点が大切です。外国人がよく聞かれるのは「ビザの状況」と「中国語のレベル」なので、あらかじめ答えを考えておくとよいでしょう。面接は一回とは限らず、一次・二次があったり、「課題（宿題）」や小テストを課す会社もあります。これは台湾でも増えてきているので、あまり緊張しなくて大丈夫です。",
        e:"After sending your résumé comes the 'interview.' A Taiwanese interview usually starts by asking about your experience, why you want to join this company, and your salary expectations. Dressing neatly, arriving on time, and showing a sincere attitude—these few things matter. Foreigners are often also asked about 'your visa status' and 'your Chinese level,' so it's best to prepare answers in advance. There may be more than one round: some companies have a first and second interview, or even ask you to do an 'assignment' (zuòyè) or a short test—increasingly common in Taiwan, so no need to be too nervous.",
        k:"이력서를 보내면 다음은 '면접'입니다. 대만의 면접에서는 보통 먼저 경력, 왜 이 회사에 오고 싶은지, 급여에 대한 기대 등을 묻습니다. 면접에서는 단정한 복장, 정시 도착, 성실한 태도—이 몇 가지가 중요합니다. 외국인이 자주 받는 질문으로는 '비자 상황'과 '중국어 수준'도 있으니 미리 답을 생각해 두는 게 좋습니다. 면접은 한 번으로 끝나지 않을 수 있어, 어떤 회사는 1차·2차가 있거나 '과제(zuòyè)'나 짧은 테스트를 내기도 합니다. 이는 대만에서도 점점 흔해지고 있으니 너무 긴장하지 않아도 됩니다."
      }
    },
    {
      z:"外國人在台灣合法工作，最關鍵的是「工作許可」和「居留證」。一般來說，是公司先幫你申請「工作許可」（也就是俗稱的工作證），拿到之後，你再憑它去辦「居留證」，也就是ARC。有了居留證，你才能合法長期居住、工作，還能辦手機門號、開銀行帳戶、加入健保。這一整套手續大多由公司的人資協助處理，你要做的是準備好護照、學歷證明、照片等文件，並且耐心配合。",
      py:"Wàiguórén zài Táiwān héfǎ gōngzuò, zuì guānjiàn de shì “gōngzuò xǔkě” hé “jūliúzhèng”. Yìbān lái shuō, shì gōngsī xiān bāng nǐ shēnqǐng “gōngzuò xǔkě” (yě jiùshì súchēng de gōngzuòzhèng), ná dào zhīhòu, nǐ zài píng tā qù bàn “jūliúzhèng”, yě jiùshì ARC. Yǒule jūliúzhèng, nǐ cái néng héfǎ chángqí jūzhù, gōngzuò, hái néng bàn shǒujī ménhào, kāi yínháng zhànghù, jiārù jiànbǎo. Zhè yìzhěngtào shǒuxù dàduō yóu gōngsī de rénzī xiézhù chǔlǐ, nǐ yào zuò de shì zhǔnbèi hǎo hùzhào, xuélì zhèngmíng, zhàopiàn děng wénjiàn, bìngqiě nàixīn pèihé.",
      m:{
        j:"外国人が台湾で合法的に働くうえで最も重要なのが「工作許可（就労許可）」と「居留證（在留カード）」です。一般には、まず会社があなたのために「工作許可」（いわゆる就労証）を申請し、それを取得したら、それをもとに「居留證」＝ARCを申請します。居留證があって初めて、合法的に長期滞在・就労でき、携帯電話の契約、銀行口座の開設、健保への加入も可能になります。この一連の手続きの多くは会社の人事（人資）が手伝ってくれるので、あなたがすべきはパスポート、学歴証明、写真などの書類を用意し、辛抱強く協力することです。",
        e:"For a foreigner to work legally in Taiwan, the crucial items are a 'work permit' (gōngzuò xǔkě) and a 'residency permit' (jūliúzhèng). Typically the company first applies for your 'work permit' (commonly called a work card); once you have it, you use it to apply for the 'residency permit,' the ARC. Only with an ARC can you legally reside and work long-term, and also get a phone number, open a bank account, and join the NHI. Most of this paperwork is handled with help from the company's HR (rénzī); your job is to prepare documents like your passport, proof of education, and photos, and to cooperate patiently.",
        k:"외국인이 대만에서 합법적으로 일하는 데 가장 중요한 것이 '취업 허가(gōngzuò xǔkě)'와 '거류증(jūliúzhèng)'입니다. 일반적으로 회사가 먼저 당신을 위해 '취업 허가'(흔히 워크 카드라고 부름)를 신청하고, 그것을 받으면 그것을 근거로 '거류증' 즉 ARC를 신청합니다. 거류증이 있어야 비로소 합법적으로 장기 거주·취업할 수 있고, 휴대폰 개통, 은행 계좌 개설, 건강보험 가입도 가능해집니다. 이 일련의 절차 대부분은 회사의 인사(rénzī)가 도와주므로, 당신이 할 일은 여권, 학력 증명, 사진 등 서류를 준비하고 끈기 있게 협조하는 것입니다."
      }
    },
    {
      z:"開始上班之後，公司會幫你加保「勞保」和「健保」，這是台灣受僱員工的基本保障。「勞保」（勞工保險）在你失業、受傷、生育、退休時提供給付；「健保」則是看病用的全民健康保險。另外還有「勞退」（勞工退休金），雇主每個月要提撥至少你薪水的百分之六到你的退休金專戶。這些錢一部分從你的薪水扣、一部分由公司負擔，你每個月拿到的薪資單上都會清清楚楚列出來。",
      py:"Kāishǐ shàngbān zhīhòu, gōngsī huì bāng nǐ jiābǎo “láobǎo” hé “jiànbǎo”, zhè shì Táiwān shòugù yuángōng de jīběn bǎozhàng. “Láobǎo” (láogōng bǎoxiǎn) zài nǐ shīyè, shòushāng, shēngyù, tuìxiū shí tígōng jǐfù; “jiànbǎo” zé shì kànbìng yòng de quánmín jiànkāng bǎoxiǎn. Lìngwài hái yǒu “láotuì” (láogōng tuìxiūjīn), gùzhǔ měi ge yuè yào tíbō zhìshǎo nǐ xīnshuǐ de bǎifēnzhī liù dào nǐ de tuìxiūjīn zhuānhù. Zhèxiē qián yíbùfèn cóng nǐ de xīnshuǐ kòu, yíbùfèn yóu gōngsī fùdān, nǐ měi ge yuè ná dào de xīnzīdān shàng dōu huì qīngqīngchǔchǔ liè chūlái.",
      m:{
        j:"働き始めると、会社があなたを「勞保（労働者保険）」と「健保（健康保険）」に加入させます。これは台湾の被雇用者の基本的な保障です。「勞保」は失業・怪我・出産・退職のときに給付を提供し、「健保」は受診に使う国民皆保険です。さらに「勞退（労働者退職金）」があり、雇用主は毎月あなたの給与の少なくとも6％を、あなたの退職金専用口座に積み立てます。これらのお金は一部があなたの給与から天引きされ、一部は会社が負担し、毎月受け取る給与明細（薪資単）にきちんと記載されます。",
        e:"Once you start work, the company enrolls you in 'labor insurance' (láobǎo) and 'health insurance' (jiànbǎo)—the basic protections for employees in Taiwan. 'Labor insurance' pays benefits when you're unemployed, injured, giving birth, or retiring; 'health insurance' is the National Health Insurance you use to see doctors. There's also the 'labor pension' (láotuì): the employer must contribute at least 6% of your salary each month into your personal pension account. Part of this money is deducted from your salary and part is borne by the company, all clearly itemized on the monthly pay slip (xīnzīdān) you receive.",
        k:"일을 시작하면 회사가 당신을 '노동보험(láobǎo)'과 '건강보험(jiànbǎo)'에 가입시킵니다. 이는 대만 피고용자의 기본 보장입니다. '노동보험'은 실업·부상·출산·퇴직 시 급여를 제공하고, '건강보험'은 진료에 쓰는 전국민 건강보험입니다. 또 '노동퇴직금(láotuì)'이 있어, 고용주는 매달 당신 급여의 최소 6%를 당신의 퇴직금 전용 계좌에 적립해야 합니다. 이 돈은 일부가 급여에서 공제되고 일부는 회사가 부담하며, 매달 받는 급여 명세서(xīnzīdān)에 명확히 기재됩니다."
      }
    },
    {
      z:"薪水方面，台灣是「月薪制」為主，通常談的是「月薪」，很多公司還有「年終獎金」，一般會發一到兩個月的薪水，好一點的更多。要注意的是，招募時講的數字要問清楚是「月薪乘以幾個月」，因為有些公司會把年終算進去，讓年薪看起來比較高。另外，台灣的最低工資（基本工資）每年會調整，法律也規定了加班費、特休假、勞健保等，這些都是你應有的權利，簽約前最好看清楚勞動契約的內容。",
      py:"Xīnshuǐ fāngmiàn, Táiwān shì “yuèxīnzhì” wéizhǔ, tōngcháng tán de shì “yuèxīn”, hěnduō gōngsī hái yǒu “niánzhōng jiǎngjīn”, yìbān huì fā yì dào liǎng ge yuè de xīnshuǐ, hǎo yìdiǎn de gèng duō. Yào zhùyì de shì, zhāomù shí jiǎng de shùzì yào wèn qīngchǔ shì “yuèxīn chéng yǐ jǐ ge yuè”, yīnwèi yǒuxiē gōngsī huì bǎ niánzhōng suàn jìnqù, ràng niánxīn kàn qǐlái bǐjiào gāo. Lìngwài, Táiwān de zuìdī gōngzī (jīběn gōngzī) měi nián huì tiáozhěng, fǎlǜ yě guīdìngle jiābānfèi, tèxiūjià, láojiànbǎo děng, zhèxiē dōu shì nǐ yīng yǒu de quánlì, qiānyuē qián zuìhǎo kàn qīngchǔ láodòng qìyuē de nèiróng.",
      m:{
        j:"給与について、台湾は「月給制」が主流で、話に出るのはたいてい「月給」です。多くの会社には「年終奨金（年末賞与）」があり、一般に1〜2か月分、条件のよい会社ならそれ以上出ます。注意すべきは、募集時に示された数字が「月給×何か月分」なのかをはっきり確認すること。会社によっては年末賞与を含めて年収を高く見せることがあるからです。また、台湾の最低賃金（基本工資）は毎年調整され、残業代、有給休暇（特休）、労保・健保なども法律で定められています。これらはあなたの当然の権利なので、契約前に労働契約の内容をよく確認するとよいでしょう。",
        e:"On pay, Taiwan mainly uses a 'monthly salary' system, and what's usually quoted is the 'monthly salary.' Many companies also give a 'year-end bonus,' typically one to two months' pay, more at better firms. Note: when a figure is quoted during recruiting, clarify 'monthly salary times how many months,' because some companies fold the year-end bonus in to make the annual figure look higher. Also, Taiwan's minimum wage (basic wage) is adjusted yearly, and the law sets overtime pay, annual leave (tèxiū), and labor/health insurance—all rights you're entitled to, so it's best to read the employment contract carefully before signing.",
        k:"급여 면에서 대만은 '월급제'가 주류로, 보통 이야기하는 것은 '월급'입니다. 많은 회사에 '연말 상여금(niánzhōng jiǎngjīn)'이 있어 일반적으로 1~2개월치를 주고, 좋은 회사는 그 이상입니다. 주의할 점은 채용 시 제시된 숫자가 '월급 곱하기 몇 개월분'인지 분명히 확인하는 것입니다. 일부 회사는 연말 상여금을 포함해 연봉을 높아 보이게 하기 때문입니다. 또 대만의 최저임금(기본급)은 매년 조정되고, 초과근무 수당, 유급휴가(특휴), 노동·건강보험 등도 법으로 정해져 있습니다. 이는 모두 당신의 당연한 권리이니 계약 전에 근로계약 내용을 잘 확인하는 게 좋습니다."
      }
    },
    {
      z:"最後是「報稅」。在台灣有收入就要繳所得稅，每年五月是報稅季。外國人的稅率跟你在台灣住多久有關：一年當中在台灣居住滿一百八十三天，就算「稅務居民」，可以用跟本地人一樣的累進稅率報稅，還能列舉扣除額；如果住不到那個天數，稅率會比較高。公司平常會先幫你「預扣」一部分稅，五月報稅時再多退少補。台灣的報稅系統做得很方便，網路上就能完成，第一次不懂可以問公司或用政府的線上教學。",
      py:"Zuìhòu shì “bàoshuì”. Zài Táiwān yǒu shōurù jiù yào jiǎo suǒdéshuì, měi nián wǔ yuè shì bàoshuì jì. Wàiguórén de shuìlǜ gēn nǐ zài Táiwān zhù duōjiǔ yǒuguān: yì nián dāngzhōng zài Táiwān jūzhù mǎn yìbǎi bāshísān tiān, jiù suàn “shuìwù jūmín”, kěyǐ yòng gēn běndìrén yíyàng de lěijìn shuìlǜ bàoshuì, hái néng lièjǔ kòuchú é; rúguǒ zhù bú dào nàge tiānshù, shuìlǜ huì bǐjiào gāo. Gōngsī píngcháng huì xiān bāng nǐ “yùkòu” yíbùfèn shuì, wǔ yuè bàoshuì shí zài duōtuì shǎobǔ. Táiwān de bàoshuì xìtǒng zuò de hěn fāngbiàn, wǎnglù shàng jiù néng wánchéng, dì yī cì bùdǒng kěyǐ wèn gōngsī huò yòng zhèngfǔ de xiànshàng jiàoxué.",
      m:{
        j:"最後は「報稅（確定申告・納税）」です。台湾では収入があれば所得税を納める必要があり、毎年5月が申告シーズンです。外国人の税率は台湾にどれだけ住んだかで変わります。一年のうち台湾での居住が183日以上なら「税務上の居住者」とみなされ、地元の人と同じ累進税率で申告でき、各種控除も使えます。その日数に満たなければ税率は高めになります。会社は普段あなたの税の一部を先に「源泉徴収（予扣）」しておき、5月の申告で過不足を精算します。台湾の申告システムはとても便利で、ネット上で完結でき、初めてで分からなければ会社に聞くか、政府のオンライン解説を使えます。",
        e:"Finally, there's 'filing taxes' (bàoshuì). If you have income in Taiwan you must pay income tax, and every May is filing season. A foreigner's tax rate depends on how long you've lived in Taiwan: reside 183 days or more within the year and you count as a 'tax resident,' able to file at the same progressive rates as locals and to itemize deductions; live fewer days than that and the rate is higher. Your company usually 'withholds' (yùkòu) part of your tax in advance, and the May filing settles any over- or under-payment. Taiwan's filing system is very convenient—you can complete it online—and if you're lost the first time, ask your company or use the government's online tutorials.",
        k:"마지막은 '세금 신고(bàoshuì)'입니다. 대만에서는 소득이 있으면 소득세를 내야 하며, 매년 5월이 신고 시즌입니다. 외국인의 세율은 대만에 얼마나 오래 살았는지에 따라 달라집니다. 한 해 동안 대만 거주가 183일 이상이면 '세무 거주자'로 간주되어 현지인과 같은 누진세율로 신고할 수 있고 각종 공제도 쓸 수 있습니다. 그 일수에 못 미치면 세율이 높아집니다. 회사는 평소 당신 세금의 일부를 먼저 '원천징수(yùkòu)'해 두고, 5월 신고 때 과부족을 정산합니다. 대만의 신고 시스템은 매우 편리해 인터넷으로 완결할 수 있고, 처음이라 모르겠으면 회사에 묻거나 정부의 온라인 안내를 이용하면 됩니다."
      }
    }
  ],
  vocab:[
    { w:"求職", zy:"ㄑㄧㄡˊ ㄓˊ", py:"qiúzhí", m:{ j:"求職・仕事探し", e:"job hunting", k:"구직" } },
    { w:"人力銀行", zy:"ㄖㄣˊ ㄌㄧˋ ㄧㄣˊ ㄏㄤˊ", py:"rénlì yínháng", m:{ j:"求人サイト（人材バンク）", e:"job bank / recruiting site", k:"구인 사이트(인력은행)" } },
    { w:"履歷", zy:"ㄌㄩˇ ㄌㄧˋ", py:"lǚlì", m:{ j:"履歴書", e:"résumé/CV", k:"이력서" } },
    { w:"面試", zy:"ㄇㄧㄢˋ ㄕˋ", py:"miànshì", m:{ j:"面接", e:"job interview", k:"면접" } },
    { w:"工作許可", zy:"ㄍㄨㄥ ㄗㄨㄛˋ ㄒㄩˇ ㄎㄜˇ", py:"gōngzuò xǔkě", m:{ j:"就労許可（工作証）", e:"work permit", k:"취업 허가" } },
    { w:"居留證", zy:"ㄐㄩ ㄌㄧㄡˊ ㄓㄥˋ", py:"jūliúzhèng", m:{ j:"居留証（在留カード・ARC）", e:"residency permit (ARC)", k:"거류증(ARC)" } },
    { w:"勞保", zy:"ㄌㄠˊ ㄅㄠˇ", py:"láobǎo", m:{ j:"労働者保険（労保）", e:"labor insurance", k:"노동보험" } },
    { w:"勞退", zy:"ㄌㄠˊ ㄊㄨㄟˋ", py:"láotuì", m:{ j:"労働者退職金（積立年金）", e:"labor pension", k:"노동퇴직금" } },
    { w:"薪水", zy:"ㄒㄧㄣ ㄕㄨㄟˇ", py:"xīnshuǐ", m:{ j:"給料・賃金", e:"salary/wages", k:"급여·월급" } },
    { w:"年終獎金", zy:"ㄋㄧㄢˊ ㄓㄨㄥ ㄐㄧㄤˇ ㄐㄧㄣ", py:"niánzhōng jiǎngjīn", m:{ j:"年末賞与（ボーナス）", e:"year-end bonus", k:"연말 상여금" } },
    { w:"報稅", zy:"ㄅㄠˋ ㄕㄨㄟˋ", py:"bàoshuì", m:{ j:"確定申告・納税申告", e:"filing taxes", k:"세금 신고" } },
    { w:"所得稅", zy:"ㄙㄨㄛˇ ㄉㄜˊ ㄕㄨㄟˋ", py:"suǒdéshuì", m:{ j:"所得税", e:"income tax", k:"소득세" } },
    { w:"勞動契約", zy:"ㄌㄠˊ ㄉㄨㄥˋ ㄑㄧˋ ㄩㄝ", py:"láodòng qìyuē", m:{ j:"労働契約", e:"employment contract", k:"근로계약" } }
  ],
  note:{
    j:"補足：外国人が台湾で就職する際、雇用主には『外国人ひとりあたりの最低月給』などの条件が課される職種があり（専門職はおおむね一定額以上）、これは自国民の雇用を守るための仕組みです。近年は高度人材向けに『就業金卡（ゴールドカード）』という制度もでき、対象者は雇用主なしで来台・就労・居留・税優遇まで一括で得られます。転職時は居留証の『職業』変更手続きが必要な場合があるので、辞める前に次の会社や労働部の窓口で確認を。給与明細は健保・所得証明として住宅ローンや各種申請でも使うので、保管しておくと安心です。",
    e:"Note: When foreigners take jobs in Taiwan, some roles impose conditions on the employer, such as a minimum monthly salary per foreign hire (professional posts generally above a set amount)—a mechanism to protect local employment. Recently an 'Employment Gold Card' was created for highly skilled talent; qualifying holders get entry, work, residence, and even tax benefits bundled together, with no employer needed. When changing jobs, you may need to update the 'occupation' on your residency permit, so confirm with the new company or the Ministry of Labor before quitting. Keep your pay slips—they serve as proof of insurance and income for mortgages and various applications.",
    k:"참고: 외국인이 대만에서 취업할 때 일부 직종은 고용주에게 '외국인 1인당 최저 월급' 같은 조건이 부과되며(전문직은 대체로 일정액 이상), 이는 자국민 고용을 보호하기 위한 장치입니다. 최근에는 고급 인재를 위한 '취업 골드카드' 제도도 생겨, 대상자는 고용주 없이도 입국·취업·거류·세제 혜택까지 한 번에 받을 수 있습니다. 이직 시에는 거류증의 '직업' 변경 절차가 필요한 경우가 있으니 그만두기 전에 새 회사나 노동부 창구에서 확인하세요. 급여 명세서는 보험·소득 증명으로 주택담보대출이나 각종 신청에도 쓰이니 보관해 두면 안심입니다."
  }
},
{
  id:"renting-and-moving-in-taiwan",
  cat:{ j:"くらしの実務", e:"Practical Living", k:"생활 실무" },
  zhTitle:"租屋與搬家：從找房到入住的完整流程",
  title:{ j:"部屋を借りて引っ越す：物件探しから入居までの完全ガイド", e:"Renting and Moving: The Complete Process from House-Hunting to Move-In", k:"집 구하기와 이사: 방 찾기부터 입주까지의 완전 가이드" },
  intro:{
    j:"台湾で暮らすなら、まず必要になるのが『住むところ』。でも、どこで物件を探し、内見で何を見て、敷金はいくらで、契約はどう結ぶのか——初めてだと戸惑うことばかりです。この記事では、物件探しから内見、契約、水道・電気・ネットの手続き、引っ越し、そしてゴミ出しの準備まで、台湾で部屋を借りて住み始める一連の流れを実用的に案内します。",
    e:"To live in Taiwan, the first thing you need is a place to stay. But where do you search for a place, what should you check when viewing, how much is the deposit, and how do you sign the lease? For a first-timer it's all a bit bewildering. This article practically walks you through the whole process of renting and settling in—from finding a place, viewing, and signing, to water, electricity, and internet setup, moving day, and getting your trash routine ready.",
    k:"대만에서 살려면 가장 먼저 필요한 것이 '살 곳'입니다. 하지만 어디서 집을 찾고, 집을 볼 때 무엇을 확인하며, 보증금은 얼마이고, 계약은 어떻게 맺는지—처음이면 당황스러운 것투성이입니다. 이 글에서는 집 찾기부터 집 보기, 계약, 수도·전기·인터넷 수속, 이사, 그리고 쓰레기 배출 준비까지, 대만에서 방을 빌려 살기 시작하는 전 과정을 실용적으로 안내합니다."
  },
  paras:[
    {
      z:"在台灣找租屋，最多人用的網站是「591租屋網」，幾乎所有房東和仲介都會把物件放上去。你可以依照地區、租金、房型（套房、雅房、整層住家）來篩選。「套房」是有獨立衛浴的單間，「雅房」則是房間獨立、但要跟別人共用衛浴和廚房，租金比較便宜。除了591，也可以看看臉書上的租屋社團，或直接在想住的社區走走，很多老公寓會在門口貼紅紙「租」的告示。",
      py:"Zài Táiwān zhǎo zūwū, zuìduō rén yòng de wǎngzhàn shì “wǔ jiǔ yāo zūwū wǎng”, jīhū suǒyǒu fángdōng hé zhòngjiè dōu huì bǎ wùjiàn fàng shàngqù. Nǐ kěyǐ yīzhào dìqū, zūjīn, fángxíng (tàofáng, yǎfáng, zhěngcéng zhùjiā) lái shāixuǎn. “Tàofáng” shì yǒu dúlì wèiyù de dānjiān, “yǎfáng” zé shì fángjiān dúlì, dàn yào gēn biérén gòngyòng wèiyù hé chúfáng, zūjīn bǐjiào piányí. Chúle wǔ jiǔ yāo, yě kěyǐ kànkan Liǎnshū shàng de zūwū shètuán, huò zhíjiē zài xiǎng zhù de shèqū zǒuzǒu, hěnduō lǎo gōngyù huì zài ménkǒu tiē hóngzhǐ “zū” de gàoshì.",
      m:{
        j:"台湾で賃貸物件を探すとき、最も多くの人が使うサイトは「591租屋網」で、ほぼすべての大家や仲介が物件を掲載します。地域、家賃、間取り（套房・雅房・一棟まるごとの住居）で絞り込めます。「套房」は独立したバス・トイレのあるワンルーム、「雅房」は部屋は独立していてもトイレやキッチンを他人と共用するタイプで、家賃は安めです。591のほか、Facebookの賃貸グループを見たり、住みたい地域を実際に歩いてみるのもよく、古いアパートは玄関先に「租（賃貸あり）」と書いた赤い紙を貼っていることが多いです。",
        e:"For finding rentals in Taiwan, the site most people use is '591 (591租屋網),' where nearly all landlords and agents post listings. You can filter by area, rent, and unit type (suite, private room, whole-floor home). A 'suite' (tàofáng) is a single room with its own bathroom, while a 'private room' (yǎfáng) is a separate room but shares the bathroom and kitchen with others, so the rent is cheaper. Besides 591, you can also check rental groups on Facebook, or simply walk around the neighborhood you want to live in—many older apartments post a red paper reading '租' (for rent) by the entrance.",
        k:"대만에서 임대 물건을 찾을 때 가장 많은 사람이 쓰는 사이트는 '591 임대망(591租屋網)'으로, 거의 모든 집주인과 중개인이 물건을 올립니다. 지역, 임대료, 방 유형(스위트·개인방·한 층 전체 주택)으로 걸러낼 수 있습니다. '스위트(tàofáng)'는 독립 욕실이 있는 원룸이고, '개인방(yǎfáng)'은 방은 독립되어 있지만 욕실과 주방을 다른 사람과 공용하는 유형으로 임대료가 저렴합니다. 591 외에 페이스북의 임대 그룹을 보거나, 살고 싶은 동네를 직접 걸어 다니는 것도 좋은데, 오래된 아파트는 현관에 '租(임대함)'라고 쓴 빨간 종이를 붙여 두는 경우가 많습니다."
      }
    },
    {
      z:"看到喜歡的物件，一定要「看房」，也就是親自去現場看。看房時有幾個重點：水壓夠不夠、有沒有漏水的痕跡、通風和採光好不好、附近會不會太吵、手機收訊和熱水器正不正常。也要問清楚「租金有沒有包含水電網路」、「押金要付幾個月」、「可不可以開伙、養寵物」。台灣的套房通常會附基本家具家電，像床、冰箱、冷氣、洗衣機，但每間不太一樣，最好當場一項一項確認。",
      py:"Kàn dào xǐhuān de wùjiàn, yídìng yào “kànfáng”, yě jiùshì qīnzì qù xiànchǎng kàn. Kànfáng shí yǒu jǐ ge zhòngdiǎn: shuǐyā gòu bú gòu, yǒu méiyǒu lòushuǐ de hénjì, tōngfēng hé cǎiguāng hǎo bù hǎo, fùjìn huì bú huì tài chǎo, shǒujī shōuxùn hé rèshuǐqì zhèng bú zhèngcháng. Yě yào wèn qīngchǔ “zūjīn yǒu méiyǒu bāohán shuǐdiàn wǎnglù”, “yājīn yào fù jǐ ge yuè”, “kě bù kěyǐ kāihuǒ, yǎng chǒngwù”. Táiwān de tàofáng tōngcháng huì fù jīběn jiājù jiādiàn, xiàng chuáng, bīngxiāng, lěngqì, xǐyījī, dàn měi jiān bú tài yíyàng, zuìhǎo dāngchǎng yí xiàng yí xiàng quèrèn.",
      m:{
        j:"気に入った物件を見つけたら、必ず「看房（内見）」、つまり自分で現地を見に行きましょう。内見のポイントはいくつかあります。水圧は十分か、水漏れの跡はないか、風通しと採光はよいか、周りがうるさすぎないか、携帯の電波と給湯器（熱水器）は正常か。そして「家賃に水道・電気・ネットが含まれるか」「敷金（押金）は何か月分か」「自炊やペット飼育は可能か」もはっきり確認しましょう。台湾の套房はたいていベッド、冷蔵庫、エアコン、洗濯機など基本の家具家電が付きますが、部屋ごとに違うので、その場で一つずつ確認するのがおすすめです。",
        e:"When you find a place you like, always 'view it' (kànfáng)—go see it in person. A few key things to check: is the water pressure enough, are there signs of leaks, is the ventilation and natural light good, is the area too noisy, and are the phone signal and water heater working properly. Also clarify 'does the rent include water, electricity, and internet,' 'how many months' deposit (yājīn) is required,' and 'is cooking or keeping pets allowed.' Taiwanese suites usually come with basic furniture and appliances—bed, fridge, air conditioner, washing machine—but every unit differs, so it's best to confirm each item on the spot.",
        k:"마음에 드는 물건을 찾으면 반드시 '집 보기(kànfáng)', 즉 직접 현장에 가서 봐야 합니다. 집 볼 때 몇 가지 포인트가 있습니다. 수압이 충분한지, 누수 흔적은 없는지, 통풍과 채광이 좋은지, 주변이 너무 시끄럽지 않은지, 휴대폰 신호와 온수기가 정상인지. 그리고 '임대료에 수도·전기·인터넷이 포함되는지', '보증금(yājīn)은 몇 개월치인지', '취사나 반려동물이 가능한지'도 분명히 확인하세요. 대만의 스위트는 보통 침대, 냉장고, 에어컨, 세탁기 같은 기본 가구·가전이 딸려 있지만 방마다 다르니 그 자리에서 하나씩 확인하는 게 좋습니다."
      }
    },
    {
      z:"決定要租之後，就進入「簽約」和「付押金」的階段。台灣的租約通常一簽就是一年，租金一個月一付，押金一般是「兩個月租金」，退租時如果房子沒有損壞，房東要把押金退還給你。簽約前務必把「租賃契約」從頭到尾看清楚：租期、租金、押金、水電怎麼算、能不能提前解約、修繕由誰負責等等都要白紙黑字寫下來。政府有提供「租賃契約範本」，如果房東給的合約條件很奇怪，可以拿範本來對照。",
      py:"Juédìng yào zū zhīhòu, jiù jìnrù “qiānyuē” hé “fù yājīn” de jiēduàn. Táiwān de zūyuē tōngcháng yì qiān jiùshì yì nián, zūjīn yí ge yuè yí fù, yājīn yìbān shì “liǎng ge yuè zūjīn”, tuìzū shí rúguǒ fángzi méiyǒu sǔnhuài, fángdōng yào bǎ yājīn tuìhuán gěi nǐ. Qiānyuē qián wùbì bǎ “zūlìn qìyuē” cóng tóu dào wěi kàn qīngchǔ: zūqí, zūjīn, yājīn, shuǐdiàn zěnme suàn, néng bù néng tíqián jiěyuē, xiūshàn yóu shéi fùzé děngděng dōu yào báizhǐ hēizì xiě xiàlái. Zhèngfǔ yǒu tígōng “zūlìn qìyuē fànběn”, rúguǒ fángdōng gěi de héyuē tiáojiàn hěn qíguài, kěyǐ ná fànběn lái duìzhào.",
      m:{
        j:"借りると決めたら、「簽約（契約）」と「押金の支払い」の段階に入ります。台湾の賃貸契約はふつう一度で一年契約、家賃は一か月ごとの後払いで、敷金（押金）は一般に「家賃二か月分」です。退去時に部屋に損傷がなければ、大家は敷金を返さなければなりません。契約前には必ず「賃貸契約書（租賃契約）」を最初から最後までよく読みましょう。契約期間、家賃、敷金、水道光熱費の計算方法、途中解約の可否、修繕の負担者などをすべて文書に明記してもらうこと。政府は「賃貸契約書のひな型（範本）」を提供しているので、大家が出す契約条件が変だと感じたら、ひな型と照らし合わせられます。",
        e:"Once you decide to rent, you enter the 'signing' (qiānyuē) and 'paying the deposit' stage. A Taiwanese lease is usually for one year, rent is paid monthly, and the deposit (yājīn) is generally 'two months' rent'; when you move out, if the place isn't damaged, the landlord must return the deposit. Before signing, be sure to read the 'lease contract' (zūlìn qìyuē) from start to finish: the term, rent, deposit, how utilities are calculated, whether early termination is allowed, who's responsible for repairs, and so on—all should be put in black and white. The government provides a 'model lease contract'; if the landlord's terms seem odd, you can compare them against the template.",
        k:"빌리기로 정하면 '계약(qiānyuē)'과 '보증금 지불' 단계로 들어갑니다. 대만의 임대 계약은 보통 한 번에 1년 계약이고, 임대료는 한 달에 한 번 후불이며, 보증금(yājīn)은 일반적으로 '임대료 2개월치'입니다. 퇴거 시 집에 손상이 없으면 집주인은 보증금을 돌려줘야 합니다. 계약 전에는 반드시 '임대차 계약서(zūlìn qìyuē)'를 처음부터 끝까지 잘 읽으세요. 계약 기간, 임대료, 보증금, 수도·전기 요금 계산법, 중도 해지 가능 여부, 수리 부담자 등을 모두 문서에 명시하도록 하세요. 정부가 '임대차 계약서 표준안(범본)'을 제공하니, 집주인이 주는 계약 조건이 이상하면 표준안과 대조해 볼 수 있습니다."
      }
    },
    {
      z:"入住前後，最重要的生活手續就是「水、電、瓦斯、網路」的過戶或申辦。如果是「整層住家」，水電費常常是你自己直接繳給台電、自來水公司，這時要確認前一位房客有沒有結清，並把帳單「過戶」到自己名下。瓦斯分「桶裝瓦斯」和「天然氣」兩種，用桶裝的要記瓦斯行電話，快沒了打電話請他們送。網路則可以自己找中華電信等業者申辦，通常幾天內就能牽線安裝。這些細節最好在簽約時就跟房東一項項確認清楚。",
      py:"Rùzhù qiánhòu, zuì zhòngyào de shēnghuó shǒuxù jiùshì “shuǐ, diàn, wǎsī, wǎnglù” de guòhù huò shēnbàn. Rúguǒ shì “zhěngcéng zhùjiā”, shuǐdiànfèi chángcháng shì nǐ zìjǐ zhíjiē jiǎo gěi Táidiàn, Zìláishuǐ gōngsī, zhè shí yào quèrèn qián yí wèi fángkè yǒu méiyǒu jiéqīng, bìng bǎ zhàngdān “guòhù” dào zìjǐ míngxià. Wǎsī fēn “tǒngzhuāng wǎsī” hé “tiānránqì” liǎng zhǒng, yòng tǒngzhuāng de yào jì wǎsīháng diànhuà, kuài méile dǎ diànhuà qǐng tāmen sòng. Wǎnglù zé kěyǐ zìjǐ zhǎo Zhōnghuá Diànxìn děng yèzhě shēnbàn, tōngcháng jǐ tiān nèi jiù néng qiānxiàn ānzhuāng. Zhèxiē xìjié zuìhǎo zài qiānyuē shí jiù gēn fángdōng yí xiàng xiàng quèrèn qīngchǔ.",
      m:{
        j:"入居の前後で最も大切な生活手続きが、「水・電気・ガス・ネット」の名義変更や新規申し込みです。「一棟まるごとの住居（整層住家）」なら、水道光熱費は自分で台電（台湾電力）や水道公司に直接払うことが多く、その際は前の入居者が精算済みか確認し、請求を自分名義に「過戶（名義変更）」します。ガスは「ボンベ式（桶裝瓦斯）」と「都市ガス（天然氣）」の二種類があり、ボンベ式ならガス屋の電話番号を控え、なくなりそうなら電話して届けてもらいます。ネットは中華電信などの業者に自分で申し込め、たいてい数日で開通・設置できます。これらの細部は契約時に大家と一つずつ確認しておくのがおすすめです。",
        e:"Around move-in, the most important practical steps are transferring or setting up 'water, electricity, gas, and internet.' If it's a 'whole-floor home,' you often pay water and electricity directly to Taipower and the water company yourself, so confirm the previous tenant settled their bills and 'transfer' (guòhù) the accounts into your name. Gas comes in two kinds—'bottled gas' and 'natural (piped) gas'; with bottled gas, note the gas shop's phone number and call for a delivery when you're running low. For internet, you can apply yourself with providers like Chunghwa Telecom, and installation usually happens within a few days. It's best to confirm these details with the landlord one by one at signing.",
        k:"입주 전후로 가장 중요한 생활 수속이 '수도·전기·가스·인터넷'의 명의 변경이나 신규 신청입니다. '한 층 전체 주택'이라면 수도·전기 요금을 직접 대만전력과 수도공사에 내는 경우가 많으니, 이전 세입자가 정산했는지 확인하고 청구서를 자기 명의로 '이전(guòhù)'하세요. 가스는 '통 가스(桶裝瓦斯)'와 '도시가스(天然氣)' 두 종류가 있는데, 통 가스라면 가스 가게 전화번호를 적어 두고 떨어질 때쯤 전화해 배달받습니다. 인터넷은 중화전신 같은 업체에 직접 신청할 수 있고 보통 며칠 안에 개통·설치됩니다. 이런 세부 사항은 계약할 때 집주인과 하나씩 확인해 두는 게 좋습니다."
      }
    },
    {
      z:"接下來就是「搬家」。如果東西不多，自己叫計程車或搬家的「小貨車」跑幾趟就好；如果家當很多、有大型家具，可以找「搬家公司」，網路上都查得到報價，記得先問清楚是「論件計價」還是「論時計價」，有沒有算樓層、有沒有電梯。搬家當天，先把易碎的東西用氣泡紙包好、紙箱外面寫上內容物，會省很多力氣。台灣人也有「搬家看日子」的習慣，很多人會挑個好日子入宅，圖個安心。",
      py:"Jiē xiàlái jiùshì “bānjiā”. Rúguǒ dōngxi bù duō, zìjǐ jiào jìchéngchē huò bānjiā de “xiǎo huòchē” pǎo jǐ tàng jiù hǎo; rúguǒ jiādàng hěnduō, yǒu dàxíng jiājù, kěyǐ zhǎo “bānjiā gōngsī”, wǎnglù shàng dōu chá de dào bàojià, jìdé xiān wèn qīngchǔ shì “lùnjiàn jìjià” háishì “lùnshí jìjià”, yǒu méiyǒu suàn lóucéng, yǒu méiyǒu diàntī. Bānjiā dàngtiān, xiān bǎ yìsuì de dōngxi yòng qìpàozhǐ bāo hǎo, zhǐxiāng wàimiàn xiě shàng nèiróngwù, huì shěng hěnduō lìqì. Táiwānrén yě yǒu “bānjiā kàn rìzi” de xíguàn, hěnduō rén huì tiāo ge hǎo rìzi rùzhái, tú ge ānxīn.",
      m:{
        j:"次は「搬家（引っ越し）」です。荷物が少なければ、自分でタクシーや引っ越し用の「小型トラック（小貨車）」を呼んで数往復すればすみます。荷物が多く大型家具があるなら「引っ越し業者（搬家公司）」を頼めます。ネットで見積もりが調べられ、「件数で計算（論件）」か「時間で計算（論時）」か、階数や、エレベーターの有無を数えるかを先に確認しましょう。引っ越し当日は、割れ物を先に気泡緩衝材（プチプチ）で包み、段ボールの外に中身を書いておくと、ずいぶん手間が省けます。台湾人には「引っ越しの日取りを見る（吉日を選ぶ）」習慣もあり、多くの人が縁起のよい日を選んで入居し、安心を求めます。",
        e:"Next comes 'moving' (bānjiā). If you don't have much, you can just call a taxi or a small moving 'van' (xiǎo huòchē) and make a few trips; if you have a lot or large furniture, hire a 'moving company,' whose quotes you can find online—just clarify upfront whether it's priced 'by the job' or 'by the hour,' and whether they charge for floors and whether there's an elevator. On moving day, wrap fragile items in bubble wrap first and label the outside of each box with its contents to save a lot of effort. Taiwanese also have a custom of 'picking an auspicious date to move,' and many choose a lucky day to move in for peace of mind.",
        k:"다음은 '이사(bānjiā)'입니다. 짐이 적으면 직접 택시나 이사용 '소형 트럭(xiǎo huòchē)'을 불러 몇 번 왕복하면 됩니다. 짐이 많고 대형 가구가 있으면 '이사 업체(搬家公司)'를 부를 수 있는데, 인터넷에서 견적을 알아볼 수 있으니 '건당 계산'인지 '시간당 계산'인지, 층수를 계산하는지, 엘리베이터가 있는지 먼저 확인하세요. 이사 당일에는 깨지기 쉬운 물건을 먼저 에어캡으로 싸고 상자 겉면에 내용물을 적어 두면 힘을 많이 아낄 수 있습니다. 대만 사람에게는 '이사 날짜를 보는(길일을 고르는)' 관습도 있어, 많은 사람이 좋은 날을 골라 입주하며 안심을 얻습니다."
      }
    },
    {
      z:"最後別忘了「垃圾與回收」的設定。台灣多數地方是「垃圾不落地」，垃圾車固定時間來，你要在對的時段拿垃圾出去交給清潔隊，一般垃圾要用政府規定的「專用垃圾袋」，資源回收和廚餘則要分開。所以搬進去後，一定要先問房東或鄰居：「這裡垃圾車幾點來？停在哪個路口？」有些管理較好的社區或大樓則設有「垃圾集中處」，可以隨時丟，那就方便多了。把這件事搞定，你在台灣的新生活才算真正安頓下來。",
      py:"Zuìhòu bié wàngle “lèsè yǔ huíshōu” de shèdìng. Táiwān duōshù dìfāng shì “lèsè bú luòdì”, lèsè chē gùdìng shíjiān lái, nǐ yào zài duì de shíduàn ná lèsè chūqù jiāo gěi qīngjiéduì, yìbān lèsè yào yòng zhèngfǔ guīdìng de “zhuānyòng lèsèdài”, zīyuán huíshōu hé chúyú zé yào fēnkāi. Suǒyǐ bān jìnqù hòu, yídìng yào xiān wèn fángdōng huò línjū: “Zhèlǐ lèsè chē jǐ diǎn lái? Tíng zài nǎge lùkǒu?” Yǒuxiē guǎnlǐ jiào hǎo de shèqū huò dàlóu zé shè yǒu “lèsè jízhōng chù”, kěyǐ suíshí diū, nà jiù fāngbiàn duō le. Bǎ zhè jiàn shì gǎodìng, nǐ zài Táiwān de xīn shēnghuó cái suàn zhēnzhèng āndùn xiàlái.",
      m:{
        j:"最後に忘れてはいけないのが「ゴミと回収」の設定です。台湾の多くの地域は「垃圾不落地（ゴミを地面に置かない）」方式で、ゴミ収集車が決まった時間に来るので、正しい時間帯にゴミを持って出て清掃隊に渡します。一般ゴミは政府指定の「専用ゴミ袋」を使い、資源ゴミと生ゴミは分けます。だから引っ越したら、まず大家や近所の人に「ここはゴミ収集車が何時に来る？どの交差点に停まる？」と必ず聞きましょう。管理のよい団地やマンションには「ゴミ集積所（垃圾集中處）」があり、いつでも捨てられて便利です。これを片づけて初めて、台湾での新生活が本当に落ち着いたと言えます。",
        e:"Finally, don't forget to set up your 'trash and recycling.' Most places in Taiwan use 'trash doesn't touch the ground': the garbage truck comes at fixed times, and you must bring your trash out at the right window and hand it to the sanitation crew; general trash must go in the government-mandated 'designated garbage bags,' while recyclables and food waste are separated. So after moving in, be sure to first ask the landlord or neighbors, 'What time does the garbage truck come here, and which corner does it stop at?' Some better-managed complexes or buildings have a 'central trash room' where you can drop it off anytime—much more convenient. Only once you've sorted this out is your new life in Taiwan truly settled.",
        k:"마지막으로 잊지 말아야 할 것이 '쓰레기와 재활용' 설정입니다. 대만 대부분 지역은 '쓰레기는 땅에 두지 않기' 방식으로, 쓰레기차가 정해진 시간에 오니 알맞은 시간대에 쓰레기를 들고 나가 청소반에게 건넵니다. 일반 쓰레기는 정부가 정한 '전용 쓰레기봉투'를 써야 하고, 재활용과 음식물 쓰레기는 따로 나눕니다. 그러니 이사한 뒤에는 반드시 먼저 집주인이나 이웃에게 '여기는 쓰레기차가 몇 시에 오나요? 어느 길목에 서나요?'라고 물어보세요. 관리가 잘 되는 단지나 건물에는 '쓰레기 집하장'이 있어 언제든 버릴 수 있어 훨씬 편리합니다. 이 일을 해결해야 비로소 대만에서의 새 생활이 정말로 자리 잡았다고 할 수 있습니다."
      }
    }
  ],
  vocab:[
    { w:"租屋", zy:"ㄗㄨ ㄨ", py:"zūwū", m:{ j:"部屋を借りる・賃貸住宅", e:"to rent a place / rental housing", k:"셋집·집을 빌리다" } },
    { w:"看房", zy:"ㄎㄢˋ ㄈㄤˊ", py:"kànfáng", m:{ j:"内見・部屋の下見", e:"to view a property", k:"집 보기·내부 확인" } },
    { w:"套房", zy:"ㄊㄠˋ ㄈㄤˊ", py:"tàofáng", m:{ j:"独立バス・トイレ付きワンルーム", e:"studio suite (with private bath)", k:"독립 욕실 딸린 원룸" } },
    { w:"雅房", zy:"ㄧㄚˇ ㄈㄤˊ", py:"yǎfáng", m:{ j:"個室（水回り共用）", e:"private room (shared bath/kitchen)", k:"개인방(욕실·주방 공용)" } },
    { w:"押金", zy:"ㄧㄚ ㄐㄧㄣ", py:"yājīn", m:{ j:"敷金・保証金", e:"deposit", k:"보증금" } },
    { w:"租約", zy:"ㄗㄨ ㄩㄝ", py:"zūyuē", m:{ j:"賃貸契約", e:"lease/rental contract", k:"임대차 계약" } },
    { w:"房東", zy:"ㄈㄤˊ ㄉㄨㄥ", py:"fángdōng", m:{ j:"大家・家主", e:"landlord", k:"집주인" } },
    { w:"仲介", zy:"ㄓㄨㄥˋ ㄐㄧㄝˋ", py:"zhòngjiè", m:{ j:"仲介・不動産業者", e:"agent/broker", k:"중개인" } },
    { w:"過戶", zy:"ㄍㄨㄛˋ ㄏㄨˋ", py:"guòhù", m:{ j:"名義変更（水道・電気など）", e:"transfer of account/title", k:"명의 변경" } },
    { w:"瓦斯", zy:"ㄨㄚˇ ㄙ", py:"wǎsī", m:{ j:"ガス", e:"gas", k:"가스" } },
    { w:"搬家", zy:"ㄅㄢ ㄐㄧㄚ", py:"bānjiā", m:{ j:"引っ越し", e:"to move (house)", k:"이사" } },
    { w:"入住", zy:"ㄖㄨˋ ㄓㄨˋ", py:"rùzhù", m:{ j:"入居する", e:"to move in", k:"입주하다" } },
    { w:"專用垃圾袋", zy:"ㄓㄨㄢ ㄩㄥˋ ㄌㄜˋ ㄙㄜˋ ㄉㄞˋ", py:"zhuānyòng lèsèdài", m:{ j:"（政府指定の）専用ゴミ袋", e:"designated garbage bag", k:"전용 쓰레기봉투" } }
  ],
  note:{
    j:"補足：台湾の賃貸では、大家が『所得税や地価税が上がる』ことを理由に、契約書に住所を書かないよう求めたり、住民登録（遷入戶籍）や賃料の領収書を渋るケースがあります。しかし契約書は敷金トラブルや会社・ビザ手続きで役立つので、きちんと交わすのが賢明です。家賃は年末の確定申告で一定額まで控除できる場合があります。エアコン(冷氣)は台湾の夏に必須で、電気代が別計算のときは1度あたりの単価を必ず確認を。退去時は『恢復原狀（原状回復）』が原則で、入居時に部屋の傷や汚れを写真に撮っておくと、敷金返還のときにもめにくくなります。",
    e:"Note: In Taiwan rentals, some landlords—citing higher income or land-value taxes—ask you not to put the address in the contract, or are reluctant to let you register residency (household registration) or to issue rent receipts. But a proper contract helps with deposit disputes and company/visa procedures, so it's wise to sign one properly. Rent may be deductible up to a limit on your year-end tax return. Air conditioning is essential in Taiwan's summer, so if electricity is billed separately, always check the per-unit rate. On move-out, 'restoring the original condition' is the rule, so photographing any existing scratches or stains at move-in makes deposit return far less contentious.",
    k:"참고: 대만 임대에서는 일부 집주인이 '소득세나 지가세가 오른다'는 이유로 계약서에 주소를 적지 말라고 하거나, 주민 등록(전입 신고)이나 임대료 영수증 발급을 꺼리는 경우가 있습니다. 하지만 계약서는 보증금 분쟁이나 회사·비자 수속에 도움이 되니 제대로 작성하는 게 현명합니다. 임대료는 연말 세금 신고에서 일정액까지 공제받을 수 있는 경우가 있습니다. 에어컨은 대만 여름에 필수이니 전기요금이 별도 계산일 때는 단위당 요금을 반드시 확인하세요. 퇴거 시에는 '원상 복구'가 원칙이므로 입주 때 방의 흠집이나 얼룩을 사진으로 찍어 두면 보증금 반환 때 다툼이 줄어듭니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_14 };
