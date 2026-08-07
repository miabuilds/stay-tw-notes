// StayTW Notes — 深度閲讀：社会のいま（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_15 = [
{
  id:"aging-and-low-birthrate",
  cat:{ j:"社会のいま", e:"Society Today", k:"오늘의 사회" },
  zhTitle:"少子化與高齡化：一起變老的台灣",
  title:{ j:"少子化と高齢化——ともに老いていく台湾", e:"Low Birth Rate and an Aging Society: A Taiwan Growing Old Together", k:"저출산과 고령화: 함께 늙어가는 대만" },
  intro:{
    j:"街を歩くと、赤ちゃんの泣き声より、公園でゆっくり体操をするお年寄りの姿のほうをよく見かける——ここ数年の台湾を、多くの人がそう感じています。子どもが減り、高齢者が増える。この静かで大きな変化が、社会のあり方をどう変えているのかを、のぞいてみましょう。",
    e:"Walk down the street and you may spot elderly people doing slow morning exercises in the park more often than you hear a baby cry—that's how many people in Taiwan feel these days. Fewer children, more seniors. Let's look at how this quiet but sweeping change is reshaping the whole society.",
    k:"거리를 걷다 보면 아기 울음소리보다 공원에서 느긋하게 체조하는 어르신의 모습을 더 자주 보게 된다—요즘 대만을 많은 사람이 그렇게 느낍니다. 아이는 줄고 노인은 늘어난다. 이 조용하지만 거대한 변화가 사회의 모습을 어떻게 바꾸고 있는지 들여다봅시다."
  },
  paras:[
    {
      z:"台灣正在同時面對兩件事：一是「少子化」，也就是每年出生的孩子越來越少；二是「高齡化」，也就是六十五歲以上的老人家在總人口裡的比例越來越高。這兩件事其實是一體的兩面。當一對夫妻平均只生不到一個小孩，年輕人的數量自然一年比一年少，而醫療進步又讓大家越活越長壽，於是整個社會的年齡結構，就慢慢從「年輕」轉向「年長」。",
      py:"Táiwān zhèngzài tóngshí miànduì liǎng jiàn shì: yī shì “shǎozǐhuà”, yě·jiùshì měinián chūshēng de háizi yuèláiyuè shǎo; èr shì “gāolínghuà”, yě·jiùshì liùshíwǔ suì yǐshàng de lǎorénjiā zài zǒng rénkǒu lǐ de bǐlì yuèláiyuè gāo. Zhè liǎng jiàn shì qíshí shì yìtǐ de liǎng miàn. Dāng yí duì fūqī píngjūn zhǐ shēng bú dào yí ge xiǎohái, niánqīngrén de shùliàng zìrán yì nián bǐ yì nián shǎo, ér yīliáo jìnbù yòu ràng dàjiā yuè huó yuè chángshòu, yúshì zhěnggè shèhuì de niánlíng jiégòu, jiù mànman cóng “niánqīng” zhuǎnxiàng “niánzhǎng”.",
      m:{
        j:"台湾は今、二つのことに同時に直面しています。一つは「少子化」、つまり毎年生まれる子どもがどんどん少なくなること。もう一つは「高齢化」、つまり65歳以上のお年寄りが総人口に占める割合がどんどん高くなること。この二つは、実は一つのことの表と裏です。夫婦一組が平均して一人にも満たない子どもしか産まなくなれば、若者の数は当然年々減っていき、医療の進歩でみんなの寿命は延びる。こうして社会全体の年齢構成は、少しずつ「若い」から「年長」へと移っていくのです。",
        e:"Taiwan is now facing two things at once. The first is a \"low birth rate\": every year, fewer babies are born. The second is an \"aging society\": people aged 65 and over make up an ever-larger share of the total population. These two are really two sides of the same coin. When the average couple has fewer than one child, the number of young people naturally shrinks year by year, while advances in medicine let everyone live longer. And so the age structure of the whole society slowly shifts from \"young\" toward \"old.\"",
        k:"대만은 지금 두 가지를 동시에 마주하고 있습니다. 하나는 '저출산', 즉 해마다 태어나는 아이가 점점 줄어드는 것. 다른 하나는 '고령화', 즉 65세 이상 어르신이 전체 인구에서 차지하는 비율이 점점 높아지는 것입니다. 이 둘은 사실 한 몸의 양면입니다. 부부 한 쌍이 평균 한 명도 안 되는 아이만 낳게 되면 젊은이 수는 당연히 해마다 줄고, 의료 발전으로 모두가 더 오래 살게 됩니다. 그리하여 사회 전체의 연령 구조가 조금씩 '젊음'에서 '노년'으로 옮겨 갑니다."
      }
    },
    {
      z:"為什麼台灣人越生越少？原因很多，也很現實。房子太貴、薪水漲得慢，很多年輕人光是養活自己就很吃力，更別說再多養一個孩子。托育和教育的花費也讓人卻步——保母費、學費、才藝班，一項一項加起來都是負擔。加上現代人結婚的年紀越來越晚，甚至選擇不婚，生育的意願自然就跟著下降。對許多夫妻來說，「要不要生小孩」已經不是理所當然的事，而是需要認真計算的決定。",
      py:"Wèishénme Táiwānrén yuè shēng yuè shǎo? Yuányīn hěnduō, yě hěn xiànshí. Fángzi tài guì, xīnshuǐ zhǎng de màn, hěnduō niánqīngrén guāng shì yǎnghuó zìjǐ jiù hěn chīlì, gèng bié shuō zài duō yǎng yí ge háizi. Tuōyù hé jiàoyù de huāfèi yě ràng rén quèbù——bǎomǔ fèi, xuéfèi, cáiyìbān, yí xiàng yí xiàng jiā qǐlái dōu shì fùdān. Jiāshàng xiàndàirén jiéhūn de niánjì yuèláiyuè wǎn, shènzhì xuǎnzé bùhūn, shēngyù de yìyuàn zìrán jiù gēnzhe xiàjiàng. Duì xǔduō fūqī lái shuō, “yào bú yào shēng xiǎohái” yǐjīng búshì lǐsuǒdāngrán de shì, érshì xūyào rènzhēn jìsuàn de juédìng.",
      m:{
        j:"なぜ台湾人はますます子どもを産まなくなったのでしょう。理由は多く、そして現実的です。家は高すぎ、給料はなかなか上がらず、多くの若者は自分一人を食べさせるだけでも精一杯。まして子どもをもう一人育てるなど、と考えてしまいます。保育や教育の費用も足を止めさせます——ベビーシッター代、学費、習い事、一つひとつ積み上げればどれも負担です。加えて現代人は結婚する年齢がますます遅くなり、結婚しない選択をする人さえいる。出産の意欲が自然と下がっていくのです。多くの夫婦にとって「子どもを産むかどうか」は、もはや当たり前のことではなく、真剣に計算して下す決断になっています。",
        e:"Why are Taiwanese having fewer and fewer children? The reasons are many, and very practical. Housing is too expensive, wages rise slowly, and many young people struggle just to support themselves—let alone raise another child. The cost of childcare and education gives people pause too: nanny fees, tuition, extracurricular classes—item by item, it all adds up to a burden. On top of that, people now marry later, and some choose not to marry at all, so the desire to have children naturally declines. For many couples, \"whether to have a child\" is no longer a given but a decision that requires serious calculation.",
        k:"왜 대만 사람들은 점점 아이를 덜 낳을까요? 이유는 많고 매우 현실적입니다. 집은 너무 비싸고 월급은 더디게 오르니, 많은 젊은이가 자기 한 몸 건사하기도 벅찹니다. 아이를 하나 더 키우는 건 말할 것도 없죠. 보육과 교육 비용도 발길을 멈추게 합니다—베이비시터 비용, 학비, 학원, 하나하나 더하면 모두 부담입니다. 게다가 현대인은 결혼 나이가 점점 늦어지고 아예 결혼을 선택하지 않는 사람도 있어, 출산 의욕이 자연히 떨어집니다. 많은 부부에게 '아이를 낳을지 말지'는 더 이상 당연한 일이 아니라 진지하게 계산해야 하는 결정이 되었습니다."
      }
    },
    {
      z:"人口變老，最直接受影響的就是「照顧」這件事。以前一個大家庭裡，老人家生病了，兒女媳婦輪流照顧就好；但現在家庭人口變少，年輕人又常在外地工作，誰來照顧年邁的父母，就成了很多家庭的難題。為了回應這個需求，政府推動了「長照」——也就是「長期照顧」的服務，包括居家照顧、日間照顧中心、送餐、復健、還有喘息服務，希望減輕家屬的壓力。",
      py:"Rénkǒu biàn lǎo, zuì zhíjiē shòu yǐngxiǎng de jiùshì “zhàogù” zhè jiàn shì. Yǐqián yí ge dà jiātíng lǐ, lǎorénjiā shēngbìng le, érnǚ xífù lúnliú zhàogù jiù hǎo; dàn xiànzài jiātíng rénkǒu biàn shǎo, niánqīngrén yòu cháng zài wàidì gōngzuò, shéi lái zhàogù niánmài de fùmǔ, jiù chéngle hěnduō jiātíng de nántí. Wèile huíyìng zhège xūqiú, zhèngfǔ tuīdòng le “chángzhào”——yě·jiùshì “chángqí zhàogù” de fúwù, bāokuò jūjiā zhàogù, rìjiān zhàogù zhōngxīn, sòngcān, fùjiàn, háiyǒu chuǎnxí fúwù, xīwàng jiǎnqīng jiāshǔ de yālì.",
      m:{
        j:"人口が高齢化して、真っ先に影響を受けるのが「介護」です。昔は大家族の中で、お年寄りが病気になっても、息子や娘、嫁が交代で世話をすればよかった。しかし今は家族の人数が減り、若者は遠方で働いていることも多く、年老いた親を誰が世話するのかが、多くの家庭の難題になっています。この需要に応えるため、政府は「長照」——つまり「長期介護」のサービスを推し進めています。訪問介護、デイケアセンター、配食、リハビリ、そして家族が一息つくためのレスパイト（休息）サービスなどを含み、家族の負担を軽くしようとしています。",
        e:"As the population ages, the thing most directly affected is caregiving. In the past, within a large extended family, if an elder fell ill, the sons, daughters, and daughters-in-law would simply take turns looking after them. But now families are smaller and young people often work away from home, so who will care for aging parents has become a hard problem for many households. To meet this need, the government has promoted \"long-term care\" services—including home care, daycare centers, meal delivery, rehabilitation, and respite care—hoping to ease the burden on family members.",
        k:"인구가 고령화되면 가장 직접적으로 영향을 받는 것이 '돌봄'입니다. 예전에는 대가족 안에서 어르신이 병이 나도 아들딸, 며느리가 번갈아 돌보면 됐습니다. 하지만 지금은 가족 수가 줄고 젊은이는 타지에서 일하는 경우가 많아, 나이 든 부모를 누가 돌볼지가 많은 가정의 난제가 되었습니다. 이 수요에 부응하기 위해 정부는 '창자오'—즉 '장기 돌봄' 서비스를 추진하고 있습니다. 방문 요양, 주간보호센터, 도시락 배달, 재활, 그리고 가족이 한숨 돌릴 수 있는 휴식 서비스 등을 포함해 가족의 부담을 덜어 주려 합니다."
      }
    },
    {
      z:"另一頭，政府也想盡辦法鼓勵大家生小孩。近年來，各縣市紛紛推出「生育補助」，生一胎給一筆錢，第二胎、第三胎再加碼；還有每個月的「育兒津貼」，以及擴大公立和平價的「托育」名額，讓雙薪家庭比較放心把小孩交出去。不過，很多年輕父母坦白說，這些補助雖然有幫助，但跟養一個孩子十幾年的花費比起來，還是杯水車薪。要真正提高生育率，需要的是整體環境的改變。",
      py:"Lìng yì tóu, zhèngfǔ yě xiǎng jìn bànfǎ gǔlì dàjiā shēng xiǎohái. Jìnnián lái, gè xiànshì fēnfēn tuīchū “shēngyù bǔzhù”, shēng yì tāi gěi yì bǐ qián, dì-èr tāi, dì-sān tāi zài jiāmǎ; háiyǒu měi ge yuè de “yù'ér jīntiē”, yǐjí kuòdà gōnglì hé píngjià de “tuōyù” míng'é, ràng shuāngxīn jiātíng bǐjiào fàngxīn bǎ xiǎohái jiāo chūqù. Búguò, hěnduō niánqīng fùmǔ tǎnbái shuō, zhèxiē bǔzhù suīrán yǒu bāngzhù, dàn gēn yǎng yí ge háizi shí jǐ nián de huāfèi bǐ qǐlái, háishì bēishuǐchēxīn. Yào zhēnzhèng tígāo shēngyùlǜ, xūyào de shì zhěngtǐ huánjìng de gǎibiàn.",
      m:{
        j:"もう一方で、政府はあの手この手で出産を奨励しています。近年、各県・市が次々と「出産補助金」を打ち出し、一人目にまとまったお金を、二人目、三人目にはさらに上乗せして支給。毎月の「育児手当」もあり、公立や手ごろな価格の「保育」の定員も拡大して、共働き家庭が安心して子どもを預けられるようにしています。とはいえ、多くの若い親は率直に言います——こうした補助は助かるけれど、子ども一人を十数年育てる費用に比べれば、焼け石に水だと。出生率を本当に上げるには、社会環境全体の変化が必要なのです。",
        e:"On the other side, the government is trying every possible way to encourage people to have children. In recent years, cities and counties have rolled out \"birth subsidies\"—a lump sum for the first child, with more added for a second or third—along with monthly \"childcare allowances,\" and have expanded the number of public and affordable childcare places so that dual-income families can hand over their kids with more peace of mind. Still, many young parents say frankly that while these subsidies help, compared with the cost of raising a child for over a decade, they are a drop in the bucket. To truly raise the birth rate, what's needed is a change in the whole environment.",
        k:"다른 한편으로 정부는 온갖 방법으로 출산을 장려하고 있습니다. 최근 각 현·시가 잇달아 '출산 보조금'을 내놓아, 첫째에게 목돈을 주고 둘째, 셋째에게는 금액을 더 얹어 줍니다. 매달 '양육 수당'도 있고, 공립과 저렴한 '보육' 정원도 확대해 맞벌이 가정이 안심하고 아이를 맡길 수 있게 합니다. 그러나 많은 젊은 부모는 솔직히 말합니다—이런 보조가 도움은 되지만 아이 하나를 십수 년 키우는 비용에 비하면 언 발에 오줌 누기라고요. 출산율을 진정으로 높이려면 사회 환경 전체의 변화가 필요합니다."
      }
    },
    {
      z:"人口老化也悄悄改變了台灣的日常風景。走進社區，你會看到越來越多的「日照中心」和「樂齡學習」的教室，長輩們在裡面唱歌、畫畫、學智慧型手機。市場、公車上，銀髮族的身影越來越常見；很多店家、公家機關也開始重視「無障礙」設計，加裝電梯、斜坡和扶手。照顧產業也需要大量人力，除了本地的照服員，也有許多來自東南亞的「移工」，成為支撐台灣長照體系的重要力量。",
      py:"Rénkǒu lǎohuà yě qiāoqiāo gǎibiàn le Táiwān de rìcháng fēngjǐng. Zǒujìn shèqū, nǐ huì kàndào yuèláiyuè duō de “rìzhào zhōngxīn” hé “lèlíng xuéxí” de jiàoshì, zhǎngbèimen zài lǐmiàn chànggē, huàhuà, xué zhìhuìxíng shǒujī. Shìchǎng, gōngchē shàng, yínfàzú de shēnyǐng yuèláiyuè chángjiàn; hěnduō diànjiā, gōngjiā jīguān yě kāishǐ zhòngshì “wúzhàng'ài” shèjì, jiāzhuāng diàntī, xiépō hé fúshǒu. Zhàogù chǎnyè yě xūyào dàliàng rénlì, chúle běndì de zhàofúyuán, yěyǒu xǔduō láizì Dōngnányà de “yígōng”, chéngwéi zhīchēng Táiwān chángzhào tǐxì de zhòngyào lìliàng.",
      m:{
        j:"人口の高齢化は、台湾の日常風景も静かに変えています。地域に足を踏み入れると、「デイケアセンター」や「楽齢学習（シニア向け生涯学習）」の教室がどんどん増え、お年寄りたちがそこで歌い、絵を描き、スマホの使い方を学んでいます。市場やバスの中でも、白髪世代の姿がますますよく見られるように。多くの店や役所も「バリアフリー」設計を重視し始め、エレベーターやスロープ、手すりを増設しています。介護産業も大量の人手を必要とし、地元の介護士に加え、東南アジアから来た多くの「移住労働者（移工）」が、台湾の長期介護制度を支える重要な力になっています。",
        e:"An aging population is also quietly changing the everyday scenery of Taiwan. Step into a neighborhood and you'll see ever more \"daycare centers\" and \"senior learning\" classrooms, where elders sing, paint, and learn to use smartphones. In markets and on buses, silver-haired figures are increasingly common; many shops and government offices have begun to prioritize \"barrier-free\" design, adding elevators, ramps, and handrails. The care industry also needs a lot of manpower: alongside local care workers, many \"migrant workers\" from Southeast Asia have become a vital force supporting Taiwan's long-term care system.",
        k:"인구 고령화는 대만의 일상 풍경도 조용히 바꾸고 있습니다. 동네에 들어서면 '주간보호센터'와 '낙령 학습(어르신 평생교육)' 교실이 점점 늘어, 어르신들이 그 안에서 노래하고 그림 그리고 스마트폰 사용법을 배웁니다. 시장과 버스 안에서도 백발 세대의 모습이 점점 흔해집니다. 많은 가게와 관공서도 '무장애' 설계를 중시하기 시작해 엘리베이터, 경사로, 손잡이를 늘립니다. 돌봄 산업도 많은 인력을 필요로 해, 현지 요양보호사 외에 동남아에서 온 많은 '이주 노동자'가 대만 장기 돌봄 체계를 떠받치는 중요한 힘이 되고 있습니다."
      }
    },
    {
      z:"少子化和高齡化，是台灣接下來幾十年最重要的課題之一。它牽動的不只是幾個數字，而是勞動力、健保、退休金、房地產，甚至城市和鄉村的樣貌。這條路沒有簡單的答案，但台灣社會正在一邊摸索、一邊調整。或許重點不只是「怎麼讓大家多生」，而是「怎麼讓不管是老人、小孩還是年輕人，都能在這座島上安心地生活」。這才是整個社會要一起面對的功課。",
      py:"Shǎozǐhuà hé gāolínghuà, shì Táiwān jiēxiàlái jǐshí nián zuì zhòngyào de kètí zhī yī. Tā qiāndòng de bùzhǐ shì jǐ ge shùzì, érshì láodònglì, jiànbǎo, tuìxiūjīn, fángdìchǎn, shènzhì chéngshì hé xiāngcūn de yàngmào. Zhè tiáo lù méiyǒu jiǎndān de dá'àn, dàn Táiwān shèhuì zhèngzài yìbiān mōsuǒ, yìbiān tiáozhěng. Huòxǔ zhòngdiǎn bùzhǐ shì “zěnme ràng dàjiā duō shēng”, érshì “zěnme ràng bùguǎn shì lǎorén, xiǎohái háishì niánqīngrén, dōu néng zài zhè zuò dǎo shàng ānxīn de shēnghuó”. Zhè cái shì zhěnggè shèhuì yào yìqǐ miànduì de gōngkè.",
      m:{
        j:"少子化と高齢化は、台湾がこれから数十年で向き合う最も重要な課題の一つです。それが揺り動かすのはいくつかの数字だけではありません。労働力、健保（国民皆保険）、年金、不動産、さらには都市と農村のかたちまで関わってきます。この道に簡単な答えはありませんが、台湾社会は手探りしながら少しずつ調整を続けています。大切なのは「どうやってみんなにもっと産んでもらうか」だけでなく、「お年寄りも、子どもも、若者も、この島で安心して暮らせるようにするにはどうすればいいか」なのかもしれません。それこそが、社会全体で一緒に向き合うべき宿題なのです。",
        e:"A low birth rate and an aging society are among the most important challenges Taiwan will face over the coming decades. What they move is not just a few numbers, but the labor force, health insurance, pensions, real estate—even the very look of cities and countryside. There is no simple answer to this road, but Taiwanese society is feeling its way forward and adjusting as it goes. Perhaps the point is not only \"how to get people to have more children,\" but \"how to make sure that the old, the young, and children alike can all live with peace of mind on this island.\" That is the homework the whole society must face together.",
        k:"저출산과 고령화는 대만이 앞으로 수십 년간 마주할 가장 중요한 과제 중 하나입니다. 그것이 흔드는 것은 몇 개의 숫자만이 아니라 노동력, 건강보험, 연금, 부동산, 나아가 도시와 농촌의 모습까지입니다. 이 길에 간단한 답은 없지만, 대만 사회는 더듬어 가며 조금씩 조정하고 있습니다. 어쩌면 핵심은 '어떻게 모두가 더 많이 낳게 할까'만이 아니라, '노인도 아이도 젊은이도 모두 이 섬에서 안심하고 살 수 있게 하려면 어떻게 할까'일지도 모릅니다. 그것이야말로 사회 전체가 함께 마주해야 할 숙제입니다."
      }
    }
  ],
  vocab:[
    { w:"少子化", zy:"ㄕㄠˇ ㄗˇ ㄏㄨㄚˋ", py:"shǎozǐhuà", m:{ j:"少子化", e:"declining/low birth rate", k:"저출산" } },
    { w:"高齡化", zy:"ㄍㄠ ㄌㄧㄥˊ ㄏㄨㄚˋ", py:"gāolínghuà", m:{ j:"高齢化", e:"population aging", k:"고령화" } },
    { w:"生育率", zy:"ㄕㄥ ㄩˋ ㄌㄩˋ", py:"shēngyùlǜ", m:{ j:"出生率・出生率", e:"birth rate / fertility rate", k:"출산율" } },
    { w:"長照", zy:"ㄔㄤˊ ㄓㄠˋ", py:"chángzhào", m:{ j:"長期介護（長期照顧の略）", e:"long-term care", k:"장기 돌봄" } },
    { w:"托育", zy:"ㄊㄨㄛ ㄩˋ", py:"tuōyù", m:{ j:"保育・託児", e:"childcare (for young children)", k:"보육" } },
    { w:"照服員", zy:"ㄓㄠˋ ㄈㄨˊ ㄩㄢˊ", py:"zhàofúyuán", m:{ j:"介護士（介護サービス員）", e:"care worker / caregiver", k:"요양보호사" } },
    { w:"日照中心", zy:"ㄖˋ ㄓㄠˋ ㄓㄨㄥ ㄒㄧㄣ", py:"rìzhào zhōngxīn", m:{ j:"デイケアセンター（日間照顧中心）", e:"adult daycare center", k:"주간보호센터" } },
    { w:"銀髮族", zy:"ㄧㄣˊ ㄈㄚˇ ㄗㄨˊ", py:"yínfàzú", m:{ j:"シニア・高齢者層（銀髪世代）", e:"seniors, the silver-haired generation", k:"실버 세대·고령층" } },
    { w:"育兒津貼", zy:"ㄩˋ ㄦˊ ㄐㄧㄣ ㄊㄧㄝ", py:"yù'ér jīntiē", m:{ j:"育児手当", e:"childcare allowance", k:"양육 수당" } },
    { w:"移工", zy:"ㄧˊ ㄍㄨㄥ", py:"yígōng", m:{ j:"移住労働者（外国人労働者）", e:"migrant worker", k:"이주 노동자" } },
    { w:"無障礙", zy:"ㄨˊ ㄓㄤˋ ㄞˋ", py:"wúzhàng'ài", m:{ j:"バリアフリー", e:"barrier-free / accessible", k:"무장애·배리어프리" } },
    { w:"喘息服務", zy:"ㄔㄨㄢˇ ㄒㄧˊ ㄈㄨˊ ㄨˋ", py:"chuǎnxí fúwù", m:{ j:"レスパイト（家族介護者の休息）サービス", e:"respite care service", k:"돌봄 가족 휴식 서비스" } }
  ],
  note:{
    j:"台湾はすでに『高齢社会』に入っており、65歳以上が総人口の14%を超えました。近い将来、その割合が20%を超える『超高齢社会』に入ると見込まれています。数字の面でもう一つ特徴的なのは、出生数の少なさで、近年は年間の出生数が死亡数を下回る『人口の自然減』が続いています。台湾の若者のあいだでは、経済的な理由から結婚や出産をためらう状況を『不敢生（産む勇気が持てない）』と表現することもあります。政策として『0〜6歳は国が一緒に育てる（0-6歲國家一起養）』というスローガンが掲げられ、補助の拡充が進められています。",
    e:"Taiwan has already entered an \"aged society,\" with people 65 and older exceeding 14% of the population, and is expected to become a \"super-aged society\" (over 20%) in the near future. Another striking figure is how few babies are born—in recent years annual deaths have outnumbered births, a \"natural population decline.\" Among young Taiwanese, hesitation to marry or have children for financial reasons is sometimes summed up as \"bù gǎn shēng\" (not daring to have kids). A signature policy slogan, \"Ages 0–6, the nation raises them with you,\" has driven the expansion of subsidies.",
    k:"대만은 이미 '고령 사회'에 진입해 65세 이상이 인구의 14%를 넘었고, 가까운 미래에 20%를 넘는 '초고령 사회'에 들어설 것으로 전망됩니다. 또 하나 눈에 띄는 수치는 출생아 수가 적다는 점으로, 최근에는 연간 사망자가 출생아보다 많은 '인구 자연 감소'가 이어지고 있습니다. 대만 젊은이들 사이에서는 경제적 이유로 결혼과 출산을 망설이는 상황을 '부간성(낳을 엄두를 못 낸다)'이라고 표현하기도 합니다. '0~6세는 나라가 함께 키운다'라는 정책 구호 아래 보조 확대가 추진되고 있습니다."
  }
},
{
  id:"religious-diversity",
  cat:{ j:"社会のいま", e:"Society Today", k:"오늘의 사회" },
  zhTitle:"台灣的多元宗教：一條街上的眾神",
  title:{ j:"台湾の多元的な宗教——一つの通りに集う神々", e:"Taiwan's Religious Diversity: A Street Full of Gods", k:"대만의 다원적 종교: 한 거리에 깃든 신들" },
  intro:{
    j:"同じ一本の通りに、線香の煙がたなびく道教のお廟があり、その隣に静かなキリスト教の教会が建ち、少し先には仏教のお寺がある——台湾では、これがごく当たり前の光景です。多くの神さまと信仰が、驚くほど穏やかに共存する台湾の宗教世界を、のぞいてみましょう。",
    e:"On a single street you may find a Taoist temple wreathed in incense smoke, a quiet Christian church next door, and a Buddhist temple just beyond—in Taiwan this is an utterly ordinary sight. Let's explore Taiwan's religious world, where a great many gods and faiths coexist with remarkable ease.",
    k:"같은 거리 하나에 향 연기가 피어오르는 도교 사당이 있고, 그 옆에 조용한 기독교 교회가 서 있으며, 조금 앞에는 불교 사찰이 있다—대만에서는 이것이 지극히 당연한 풍경입니다. 수많은 신과 신앙이 놀랍도록 평온하게 공존하는 대만의 종교 세계를 들여다봅시다."
  },
  paras:[
    {
      z:"台灣是一個宗教非常多元的地方。這裡有佛教、道教、基督教、天主教、伊斯蘭教，還有數不清的「民間信仰」。有趣的是，這些信仰並不是各過各的，而是熱熱鬧鬧地混在一起。很多台灣人如果被問到「你信什麼教？」，常常會愣一下，因為他們可能同時會拜佛祖、拜媽祖、拜關公，過年到廟裡點光明燈，也可能會跟著朋友去教會唱詩歌。對他們來說，信仰是生活的一部分，而不是非此即彼的選擇。",
      py:"Táiwān shì yí ge zōngjiào fēicháng duōyuán de dìfāng. Zhèlǐ yǒu Fójiào, Dàojiào, Jīdūjiào, Tiānzhǔjiào, Yīsīlánjiào, háiyǒu shǔ bù qīng de “mínjiān xìnyǎng”. Yǒuqù de shì, zhèxiē xìnyǎng bìng búshì gè guò gè de, érshì rèrènàonào de hùn zài yìqǐ. Hěnduō Táiwānrén rúguǒ bèi wèndào “nǐ xìn shénme jiào?”, chángcháng huì lèng yíxià, yīnwèi tāmen kěnéng tóngshí huì bài Fózǔ, bài Māzǔ, bài Guāngōng, guònián dào miào lǐ diǎn guāngmíngdēng, yě kěnéng huì gēnzhe péngyǒu qù jiàohuì chàng shīgē. Duì tāmen lái shuō, xìnyǎng shì shēnghuó de yí bùfèn, ér búshì fēicǐjíbǐ de xuǎnzé.",
      m:{
        j:"台湾は宗教が非常に多様な場所です。仏教、道教、キリスト教（プロテスタント）、カトリック、イスラム教があり、さらに数えきれないほどの「民間信仰」があります。面白いのは、これらの信仰がそれぞれ別々に営まれているのではなく、にぎやかに混ざり合っていること。多くの台湾人は「あなたは何の宗教を信じていますか？」と聞かれると、しばし戸惑います。というのも、彼らは仏さまも、媽祖（まそ）も、関公（かんこう）も同時に拝み、旧正月にはお廟で光明灯をともし、友達についていって教会で讃美歌を歌うこともあるからです。彼らにとって信仰は生活の一部であって、どちらか一方を選ぶものではないのです。",
        e:"Taiwan is an extraordinarily religiously diverse place. Here you'll find Buddhism, Taoism, Protestant Christianity, Catholicism, Islam, and countless forms of \"folk belief.\" What's fascinating is that these faiths don't each keep to themselves—they mingle together in a lively jumble. Ask many Taiwanese \"What religion do you follow?\" and they'll often pause, because they may worship the Buddha, Mazu, and Lord Guan all at once, light a \"bright-light lamp\" at a temple over New Year, and also tag along with friends to sing hymns at church. For them, faith is part of life, not an either-or choice.",
        k:"대만은 종교가 매우 다양한 곳입니다. 불교, 도교, 개신교, 천주교, 이슬람교가 있고, 게다가 셀 수 없이 많은 '민간 신앙'이 있습니다. 흥미로운 점은 이 신앙들이 각자 따로 노는 것이 아니라 떠들썩하게 뒤섞여 있다는 것입니다. 많은 대만 사람은 '무슨 종교를 믿나요?'라는 질문을 받으면 잠시 멈칫합니다. 왜냐하면 그들은 부처님도, 마조도, 관공도 동시에 모시고, 설에 사당에서 광명등을 켜며, 친구를 따라 교회에 가 찬송가를 부르기도 하기 때문입니다. 그들에게 신앙은 생활의 일부이지 둘 중 하나를 고르는 선택이 아닙니다."
      }
    },
    {
      z:"在台灣，「廟」是最常見、也最貼近生活的信仰中心。幾乎每個村莊、每條老街都有一座廟，主祀的神明各有不同：海邊的漁村多半拜「媽祖」，因為祂保佑出海平安；生意人常拜「關公」，敬祂的義氣和財運；想求功名、考試順利的學生會去拜「文昌帝君」。廟不只是拜拜的地方，也是社區的活動中心，過節時演布袋戲、辦流水席，平常則是阿公阿嬤泡茶聊天的地方。",
      py:"Zài Táiwān, “miào” shì zuì chángjiàn, yě zuì tiējìn shēnghuó de xìnyǎng zhōngxīn. Jīhū měi ge cūnzhuāng, měi tiáo lǎojiē dōu yǒu yí zuò miào, zhǔsì de shénmíng gè yǒu bùtóng: hǎibiān de yúcūn duōbàn bài “Māzǔ”, yīnwèi tā bǎoyòu chūhǎi píng'ān; shēngyìrén cháng bài “Guāngōng”, jìng tā de yìqì hé cáiyùn; xiǎng qiú gōngmíng, kǎoshì shùnlì de xuéshēng huì qù bài “Wénchāng Dìjūn”. Miào bùzhǐ shì bàibài de dìfāng, yěshì shèqū de huódòng zhōngxīn, guòjié shí yǎn bùdàixì, bàn liúshuǐxí, píngcháng zé shì āgōng āmà pàochá liáotiān de dìfāng.",
      m:{
        j:"台湾で「廟（お宮）」は、最もよく見かけ、生活に最も近い信仰の中心です。ほとんどの村、どの古い通りにも一つはお廟があり、主に祀られる神さまはそれぞれ違います。海辺の漁村では航海の無事を守ってくれる「媽祖」を拝むことが多く、商売人は義理堅さと金運にあやかって「関公」をよく拝み、立身出世や試験の合格を願う学生は「文昌帝君」を拝みに行きます。お廟は参拝する場所であるだけでなく、地域の活動の中心でもあります。祭りのときには布袋戯（人形劇）を上演し、青空宴会（流水席）を開き、ふだんはおじいちゃんおばあちゃんがお茶を飲んでおしゃべりする場所です。",
        e:"In Taiwan, the \"temple\" is the most common and most down-to-earth center of faith. Nearly every village and every old street has one, and the main deity enshrined varies: seaside fishing villages mostly worship \"Mazu,\" who protects those who go out to sea; businesspeople often worship \"Lord Guan,\" revering his loyalty and his blessings for wealth; students hoping for success and good exam results go to worship \"Wenchang Dijun,\" the god of scholarship. A temple isn't only a place to pray—it's the community's activity hub, staging glove-puppet shows and open-air banquets during festivals, and serving as a spot where grandpas and grandmas sip tea and chat on ordinary days.",
        k:"대만에서 '사당(먀오)'은 가장 흔하고 생활에 가장 가까운 신앙의 중심입니다. 거의 모든 마을, 모든 옛 거리에 사당이 하나씩 있고, 주로 모시는 신은 저마다 다릅니다. 바닷가 어촌에서는 출항의 안전을 지켜 주는 '마조'를 많이 모시고, 장사꾼은 의리와 재물운을 기려 '관공'을 자주 모시며, 입신출세와 시험 합격을 바라는 학생은 '문창제군'을 모시러 갑니다. 사당은 참배하는 곳일 뿐 아니라 지역 활동의 중심이기도 합니다. 명절에는 포대희(인형극)를 공연하고 야외 잔치를 열며, 평소에는 할아버지 할머니가 차를 마시며 이야기 나누는 곳입니다."
      }
    },
    {
      z:"「拜拜」是台灣人日常生活中很自然的一件事。開新店要拜、搬新家要拜、考試前要拜、身體不舒服也可以去廟裡求個平安。拜拜的時候，人們準備水果、餅乾、飲料當供品，點上香，雙手合十對神明說出心裡的願望，這叫「拜拜」或「祭拜」。想問神明的意見，就擲「筊杯」——把兩塊半月形的木片丟到地上，看正反面來判斷神明是同意還是不同意；想求指點，還可以抽「籤詩」。這些儀式，構成了台灣人和神明之間親切的對話。",
      py:"“Bàibài” shì Táiwānrén rìcháng shēnghuó zhōng hěn zìrán de yí jiàn shì. Kāi xīn diàn yào bài, bān xīn jiā yào bài, kǎoshì qián yào bài, shēntǐ bù shūfú yě kěyǐ qù miào lǐ qiú ge píng'ān. Bàibài de shíhòu, rénmen zhǔnbèi shuǐguǒ, bǐnggān, yǐnliào dàng gòngpǐn, diǎn shàng xiāng, shuāngshǒu hézhǎng duì shénmíng shuō chū xīnlǐ de yuànwàng, zhè jiào “bàibài” huò “jìbài”. Xiǎng wèn shénmíng de yìjiàn, jiù zhí “jiǎobēi”——bǎ liǎng kuài bànyuèxíng de mùpiàn diū dào dìshàng, kàn zhèngfǎnmiàn lái pànduàn shénmíng shì tóngyì háishì bù tóngyì; xiǎng qiú zhǐdiǎn, hái kěyǐ chōu “qiānshī”. Zhèxiē yíshì, gòuchéng le Táiwānrén hé shénmíng zhījiān qīnqiè de duìhuà.",
      m:{
        j:"「拜拜（お参り）」は、台湾人の日常でごく自然な営みです。新しい店を開くときも、引っ越しのときも、試験の前も、体調が悪いときも、お廟へ行って無事を願います。お参りのときは、果物やお菓子、飲み物をお供えとして用意し、線香をともし、両手を合わせて神さまに心の願いを告げます。これを「拜拜」または「祭拜」と言います。神さまの意見を伺いたいときは「筊杯（ジャオベイ）」を投げます——半月形の木片二つを地面に落とし、その表裏で神さまが賛成か反対かを読み取るのです。導きを求めるなら「おみくじ（籤詩）」を引くこともできます。こうした儀式が、台湾人と神さまとの親しみある対話をかたちづくっています。",
        e:"\"Bàibài\" (worshipping) is a very natural part of daily life for Taiwanese. Opening a new shop calls for it, so does moving into a new home; you pray before exams, and you can go to a temple to ask for safety when you feel unwell. When worshipping, people prepare fruit, cookies, and drinks as offerings, light incense, press their palms together, and voice their heartfelt wishes to the deity—this is called \"bàibài\" or \"jìbài.\" To ask the god's opinion, you cast \"jiǎobēi\": two crescent-shaped wooden blocks dropped on the ground, whose face-up or face-down landing tells you whether the god agrees. For guidance, you can also draw a \"fortune poem\" (qiānshī). These rituals form an intimate dialogue between Taiwanese and their gods.",
        k:"'바이바이(참배)'는 대만 사람의 일상에서 아주 자연스러운 일입니다. 새 가게를 열 때도, 이사할 때도, 시험 전에도, 몸이 안 좋을 때도 사당에 가서 평안을 빕니다. 참배할 때는 과일, 과자, 음료를 제물로 준비하고 향을 피우며 두 손을 모아 신에게 마음속 소원을 아룁니다. 이것을 '바이바이' 또는 '제배'라고 합니다. 신의 뜻을 묻고 싶으면 '자오베이'를 던집니다—반달 모양의 나무 조각 두 개를 바닥에 떨어뜨려 그 앞뒷면으로 신이 찬성인지 반대인지 헤아립니다. 가르침을 구하려면 '점괘 시(첨시)'를 뽑을 수도 있습니다. 이런 의식이 대만 사람과 신 사이의 다정한 대화를 이룹니다."
      }
    },
    {
      z:"一年當中，最能感受到台灣民間信仰能量的，就是各種「繞境」和廟會活動。所謂「繞境」，是把神明的神像請上神轎，抬著祂沿著固定的路線巡視地方，替居民驅邪、祈福。其中最有名的，就是每年春天的「媽祖繞境」，成千上萬的信眾徒步跟著媽祖走上好幾天、好幾百公里，沿途村莊的人準備飲食免費招待，場面浩大又溫暖。廟會現場常常鑼鼓喧天，還有色彩鮮豔、播放音樂的「電子花車」，熱鬧得像一場流動的嘉年華。",
      py:"Yì nián dāngzhōng, zuì néng gǎnshòudào Táiwān mínjiān xìnyǎng néngliàng de, jiùshì gèzhǒng “ràojìng” hé miàohuì huódòng. Suǒwèi “ràojìng”, shì bǎ shénmíng de shénxiàng qǐng shàng shénjiào, táizhe tā yánzhe gùdìng de lùxiàn xúnshì dìfāng, tì jūmín qūxié, qífú. Qízhōng zuì yǒumíng de, jiùshì měinián chūntiān de “Māzǔ ràojìng”, chéngqiān-shàngwàn de xìnzhòng túbù gēnzhe Māzǔ zǒu shàng hǎojǐ tiān, hǎojǐbǎi gōnglǐ, yántú cūnzhuāng de rén zhǔnbèi yǐnshí miǎnfèi zhāodài, chǎngmiàn hàodà yòu wēnnuǎn. Miàohuì xiànchǎng chángcháng luógǔ xuāntiān, háiyǒu sècǎi xiānyàn, bōfàng yīnyuè de “diànzǐ huāchē”, rènào de xiàng yì chǎng liúdòng de jiāniánhuá.",
      m:{
        j:"一年のうちで、台湾の民間信仰のエネルギーを最も感じられるのが、さまざまな「繞境（じょうきょう＝神様の巡行）」やお祭りです。「繞境」とは、神さまの神像を神輿にお乗せし、決まったルートに沿って地域を巡り、住民のために厄払いと祈願をすること。中でも最も有名なのが、毎年春の「媽祖繞境」で、何万人もの信者が媽祖のあとを歩いて何日も、何百キロもついていきます。沿道の村の人々は飲み物や食べ物を用意して無料でふるまい、スケールが大きく、そして温かい光景です。お祭りの現場では、しばしば鉦や太鼓が鳴り響き、色鮮やかで音楽を流す「電子花車（ステージ付きの派手なトラック）」も登場して、まるで移動するカーニバルのようににぎわいます。",
        e:"The time of year when you can feel the energy of Taiwanese folk belief most strongly is during the various \"deity processions\" (ràojìng) and temple fairs. A \"procession\" means placing a deity's statue on a palanquin and carrying it along a fixed route to tour the district, warding off evil and praying for blessings on the residents' behalf. The most famous is the springtime \"Mazu procession,\" in which tens of thousands of believers walk on foot behind Mazu for days on end and hundreds of kilometers, while people in the villages along the way prepare free food and drink—a scene both vast and warm. Temple fairs often ring with gongs and drums, and feature brightly colored \"electric flower floats\" blaring music, as lively as a traveling carnival.",
        k:"한 해 중 대만 민간 신앙의 에너지를 가장 잘 느낄 수 있는 때가 갖가지 '요경(신의 순행)'과 사당 축제입니다. '요경'이란 신의 신상을 가마에 모시고 정해진 노선을 따라 지역을 돌며 주민을 위해 액을 물리치고 복을 비는 것입니다. 그중 가장 유명한 것이 매년 봄의 '마조 요경'으로, 수만 명의 신도가 마조를 따라 며칠 동안 수백 킬로미터를 걸어갑니다. 길가 마을 사람들은 먹을거리를 준비해 무료로 대접하니, 규모가 크면서도 따뜻한 광경입니다. 사당 축제 현장에서는 흔히 징과 북이 요란하게 울리고, 색이 화려하며 음악을 트는 '전자 꽃수레(무대 트럭)'도 등장해 마치 이동하는 카니발처럼 떠들썩합니다."
      }
    },
    {
      z:"除了熱鬧的民間信仰，台灣的佛教也很興盛，而且發展出獨特的「人間佛教」風格，強調把慈悲落實在社會服務上。像是慈濟、佛光山、法鼓山這些團體，不只講經說法，也做慈善、辦醫院和大學、在災難發生時第一時間投入救援。另一方面，基督教和天主教雖然信徒比例不算最高，卻在早期為台灣帶進了現代的醫療與教育，許多歷史悠久的醫院和學校，最初都是由教會創辦的。",
      py:"Chúle rènào de mínjiān xìnyǎng, Táiwān de Fójiào yě hěn xīngshèng, érqiě fāzhǎn chū dútè de “rénjiān Fójiào” fēnggé, qiángdiào bǎ cíbēi luòshí zài shèhuì fúwù shàng. Xiàng shì Cíjì, Fóguāngshān, Fǎgǔshān zhèxiē tuántǐ, bùzhǐ jiǎngjīng shuōfǎ, yě zuò císhàn, bàn yīyuàn hé dàxué, zài zāinàn fāshēng shí dì-yī shíjiān tóurù jiùyuán. Lìng yì fāngmiàn, Jīdūjiào hé Tiānzhǔjiào suīrán xìntú bǐlì bú suàn zuìgāo, què zài zǎoqí wèi Táiwān dài jìn le xiàndài de yīliáo yǔ jiàoyù, xǔduō lìshǐ yōujiǔ de yīyuàn hé xuéxiào, zuìchū dōu shì yóu jiàohuì chuàngbàn de.",
      m:{
        j:"にぎやかな民間信仰のほかに、台湾では仏教も非常に盛んで、独特の「人間仏教」というスタイルを発展させました。慈悲を社会奉仕として実践することを重んじる考え方です。慈済（じさい）、佛光山（ぶっこうさん）、法鼓山（ほうこさん）といった教団は、経典を説くだけでなく、慈善活動を行い、病院や大学を運営し、災害が起きればいち早く救援に駆けつけます。一方、キリスト教（プロテスタント）やカトリックは、信者の割合こそ最も高いわけではありませんが、早い時期に台湾へ近代的な医療と教育をもたらしました。歴史ある病院や学校の多くは、もともと教会が創設したものなのです。",
        e:"Besides the lively folk beliefs, Buddhism also thrives in Taiwan and has developed a distinctive style of \"Humanistic Buddhism,\" emphasizing putting compassion into practice through social service. Groups like Tzu Chi, Fo Guang Shan, and Dharma Drum Mountain not only expound the scriptures but also run charities, hospitals, and universities, and are among the first to rush in with relief when disaster strikes. Christianity and Catholicism, meanwhile, though not the largest in terms of followers, brought modern medicine and education to Taiwan early on—many long-established hospitals and schools were originally founded by churches.",
        k:"떠들썩한 민간 신앙 외에 대만에서는 불교도 매우 성행하며, 독특한 '인간 불교' 양식을 발전시켰습니다. 자비를 사회봉사로 실천하는 것을 강조하는 사상입니다. 자제, 불광산, 법고산 같은 교단은 경전을 설파할 뿐 아니라 자선 활동을 하고 병원과 대학을 운영하며, 재난이 발생하면 가장 먼저 구호에 뛰어듭니다. 한편 개신교와 천주교는 신도 비율이 가장 높지는 않지만, 이른 시기에 대만에 근대 의료와 교육을 들여왔습니다. 역사 깊은 병원과 학교 상당수가 원래 교회가 세운 것입니다."
      }
    },
    {
      z:"讓外國人印象最深的，往往是台灣宗教之間的「包容」。這裡的信仰很少為了「誰才是真神」而爭吵，反而是你拜你的、我信我的，還能互相尊重。同一個家庭裡，有人吃素念佛，有人上教堂做禮拜，逢年過節照樣一起圍爐吃飯。這種平和共存的氛圍，來自台灣社會長期以來的多元與開放。走進一間香火鼎盛的廟宇，或安靜地坐在教堂裡，你感受到的其實是同一件事：人們對平安、健康與幸福，共同的渴望。",
      py:"Ràng wàiguórén yìnxiàng zuì shēn de, wǎngwǎng shì Táiwān zōngjiào zhījiān de “bāoróng”. Zhèlǐ de xìnyǎng hěn shǎo wèile “shéi cái shì zhēnshén” ér zhēngchǎo, fǎn'ér shì nǐ bài nǐ de, wǒ xìn wǒ de, hái néng hùxiāng zūnzhòng. Tóng yí ge jiātíng lǐ, yǒurén chīsù niànfó, yǒurén shàng jiàotáng zuò lǐbài, féng nián guòjié zhàoyàng yìqǐ wéilú chīfàn. Zhè zhǒng pínghé gòngcún de fēnwéi, láizì Táiwān shèhuì chángqí yǐlái de duōyuán yǔ kāifàng. Zǒujìn yì jiān xiānghuǒ dǐngshèng de miàoyǔ, huò ānjìng de zuò zài jiàotáng lǐ, nǐ gǎnshòudào de qíshí shì tóng yí jiàn shì: rénmen duì píng'ān, jiànkāng yǔ xìngfú, gòngtóng de kěwàng.",
      m:{
        j:"外国人に最も強い印象を与えるのは、しばしば台湾の宗教どうしの「寛容さ」です。ここでは「どちらが本物の神か」をめぐって争うことはめったになく、むしろ「あなたはあなたの神を、私は私の神を」拝みながら、互いに尊重し合えます。同じ家庭の中に、菜食をして念仏を唱える人もいれば、教会に礼拝に行く人もいて、正月や節句にはやはり一緒に食卓を囲みます。この穏やかな共存の空気は、台湾社会が長く育んできた多様さと開放性から来ています。線香の煙がもうもうと立ちこめるお廟に足を踏み入れても、静かに教会の座席に腰かけても、あなたが感じ取るのは実は同じこと——平安、健康、幸福への、人々に共通する願いなのです。",
        e:"What impresses foreigners most is often the tolerance among Taiwan's religions. Here, faiths rarely quarrel over \"whose is the true god\"; instead, you worship yours and I believe in mine, and we can still respect each other. Within one family, someone may be vegetarian and chant to the Buddha while another attends church services, yet they still gather around the same table at New Year and festivals. This peaceful, coexisting atmosphere springs from the diversity and openness Taiwanese society has long cultivated. Whether you step into a temple thick with incense or sit quietly inside a church, what you feel is really the same thing: people's shared longing for peace, health, and happiness.",
        k:"외국인에게 가장 깊은 인상을 남기는 것은 대만 종교 간의 '포용'인 경우가 많습니다. 이곳의 신앙은 '누가 진짜 신인가'를 두고 다투는 일이 드물고, 오히려 '너는 네 신을, 나는 내 신을' 모시면서 서로 존중합니다. 같은 가정 안에 채식하며 염불하는 사람도, 교회에 예배하러 가는 사람도 있지만, 설과 명절에는 여전히 함께 식탁에 둘러앉습니다. 이 평화로운 공존의 분위기는 대만 사회가 오랫동안 길러 온 다양성과 개방성에서 비롯됩니다. 향 연기가 자욱한 사당에 들어서든, 조용히 교회 좌석에 앉든, 당신이 느끼는 것은 사실 같은 것입니다—평안, 건강, 행복을 향한 사람들의 공통된 갈망입니다."
      }
    }
  ],
  vocab:[
    { w:"民間信仰", zy:"ㄇㄧㄣˊ ㄐㄧㄢ ㄒㄧㄣˋ ㄧㄤˇ", py:"mínjiān xìnyǎng", m:{ j:"民間信仰", e:"folk belief / folk religion", k:"민간 신앙" } },
    { w:"廟", zy:"ㄇㄧㄠˋ", py:"miào", m:{ j:"廟・お宮（道教/民間信仰の社）", e:"temple (Taoist/folk)", k:"사당·묘" } },
    { w:"拜拜", zy:"ㄅㄞˋ ㄅㄞˋ", py:"bàibài", m:{ j:"お参り・拝む", e:"to worship / pay respects", k:"참배하다·절하다" } },
    { w:"媽祖", zy:"ㄇㄚ ㄗㄨˇ", py:"Māzǔ", m:{ j:"媽祖（航海の守り神）", e:"Mazu (sea goddess)", k:"마조(바다의 여신)" } },
    { w:"神明", zy:"ㄕㄣˊ ㄇㄧㄥˊ", py:"shénmíng", m:{ j:"神さま・神々", e:"deity, god(s)", k:"신·신령" } },
    { w:"供品", zy:"ㄍㄨㄥˋ ㄆㄧㄣˇ", py:"gòngpǐn", m:{ j:"お供え物", e:"offering(s)", k:"제물·공물" } },
    { w:"擲筊", zy:"ㄓˊ ㄐㄧㄠˇ", py:"zhíjiǎo", m:{ j:"筊杯を投げる（神意を問う占い）", e:"casting moon blocks (to ask the gods)", k:"자오베이 던지기(신의 뜻 묻기)" } },
    { w:"籤詩", zy:"ㄑㄧㄢ ㄕ", py:"qiānshī", m:{ j:"おみくじ（詩の形の神託）", e:"fortune poem / oracle slip", k:"점괘 시·제비" } },
    { w:"繞境", zy:"ㄖㄠˋ ㄐㄧㄥˋ", py:"ràojìng", m:{ j:"繞境（神像の巡行）", e:"deity procession (touring the district)", k:"요경(신상 순행)" } },
    { w:"電子花車", zy:"ㄉㄧㄢˋ ㄗˇ ㄏㄨㄚ ㄔㄜ", py:"diànzǐ huāchē", m:{ j:"電子花車（音楽・照明つきの派手な山車）", e:"electric flower float (music/light truck)", k:"전자 꽃수레(음악·조명 트럭)" } },
    { w:"教會", zy:"ㄐㄧㄠˋ ㄏㄨㄟˋ", py:"jiàohuì", m:{ j:"教会", e:"church", k:"교회" } },
    { w:"包容", zy:"ㄅㄠ ㄖㄨㄥˊ", py:"bāoróng", m:{ j:"寛容・受け入れること", e:"tolerance, inclusiveness", k:"포용·관용" } }
  ],
  note:{
    j:"台湾には正式に登録された寺廟や教会が全国で1万か所以上あるといわれ、人口あたりの『神様の家』の密度は世界でも指折りです。線香をあげる文化は根強い一方、近年は健康や環境への配慮から、線香を減らしたり、紙のお金（金紙）を燃やす量を控えたりする廟も増えています。『擲筊』で表と裏が一つずつ出れば『聖筊（神様がイエス）』、両方伏せれば『陰筊（ノー）』、両方表なら『笑筊（判断保留・笑っている）』と読むなど、細かな作法があります。旅行者もマナーを守れば自由に参拝でき、多くの廟は誰にでも開かれています。",
    e:"Taiwan is said to have over ten thousand officially registered temples and churches nationwide—among the highest densities of \"houses of the gods\" per capita in the world. While the incense tradition runs deep, in recent years, out of concern for health and the environment, more temples have cut back on incense or on burning \"spirit money.\" Casting moon blocks has its own fine etiquette: one up and one down means \"shèng jiǎo\" (the god says yes), both face-down is \"yīn jiǎo\" (no), and both face-up is \"xiào jiǎo\" (the god is \"laughing\"—undecided). Travelers who mind their manners are free to visit, as most temples are open to all.",
    k:"대만에는 정식 등록된 사당과 교회가 전국에 1만 곳이 넘는다고 하며, 인구 대비 '신의 집' 밀도는 세계에서도 손꼽힙니다. 향을 피우는 문화가 뿌리 깊은 한편, 최근에는 건강과 환경을 고려해 향을 줄이거나 지전(금지)을 태우는 양을 줄이는 사당도 늘고 있습니다. '자오베이'는 하나가 앞, 하나가 뒤면 '성교(신이 예)', 둘 다 엎어지면 '음교(아니오)', 둘 다 앞이면 '소교(신이 웃는 중·판단 보류)'로 읽는 등 세세한 예법이 있습니다. 여행자도 예절만 지키면 자유롭게 참배할 수 있고, 대부분의 사당은 누구에게나 열려 있습니다."
  }
},
{
  id:"public-transport-network",
  cat:{ j:"社会のいま", e:"Society Today", k:"오늘의 사회" },
  zhTitle:"一張卡遊台灣：便利的大眾運輸網",
  title:{ j:"カード一枚で台湾めぐり——便利な公共交通ネットワーク", e:"See Taiwan with One Card: A Convenient Public Transport Network", k:"카드 한 장으로 대만 일주: 편리한 대중교통망" },
  intro:{
    j:"高鉄で島の南北をひとっ飛び、都市では地下鉄とバスを乗り継ぎ、最後の一区間はシェア自転車で——台湾では、車を持たなくても、カード一枚あれば島じゅうをかなり自由に動き回れます。旅行者にも生活者にもありがたい、台湾の公共交通ネットワークをのぞいてみましょう。",
    e:"Zip north–south across the island by high-speed rail, hop between metro and bus in the cities, and cover the last stretch on a shared bike—in Taiwan, even without a car, one card lets you roam the whole island quite freely. Let's look at Taiwan's public transport network, a boon to travelers and residents alike.",
    k:"고속철도로 섬의 남북을 단숨에, 도시에서는 지하철과 버스를 갈아타고, 마지막 한 구간은 공유 자전거로—대만에서는 차가 없어도 카드 한 장이면 섬 전체를 꽤 자유롭게 돌아다닐 수 있습니다. 여행자에게도 생활자에게도 고마운 대만의 대중교통망을 들여다봅시다."
  },
  paras:[
    {
      z:"台灣雖然是一座島，面積不大，但大眾運輸卻發展得相當完整。想在城市之間快速移動，最方便的就是「高鐵」。高鐵沿著西部走廊，把台北、台中、台南、高雄這些主要城市串在一起，從最北到最南只要一個多小時，讓「早上在台北開會、中午到高雄吃飯」變成很平常的事。車廂又新又乾淨，班次密集，是很多商務人士和旅客的首選。",
      py:"Táiwān suīrán shì yí zuò dǎo, miànjī bú dà, dàn dàzhòng yùnshū què fāzhǎn de xiāngdāng wánzhěng. Xiǎng zài chéngshì zhījiān kuàisù yídòng, zuì fāngbiàn de jiùshì “gāotiě”. Gāotiě yánzhe xībù zǒuláng, bǎ Táiběi, Táizhōng, Táinán, Gāoxióng zhèxiē zhǔyào chéngshì chuàn zài yìqǐ, cóng zuì běi dào zuì nán zhǐyào yí ge duō xiǎoshí, ràng “zǎoshàng zài Táiběi kāihuì, zhōngwǔ dào Gāoxióng chīfàn” biànchéng hěn píngcháng de shì. Chēxiāng yòu xīn yòu gānjìng, bāncì mìjí, shì hěnduō shāngwù rénshì hé lǚkè de shǒuxuǎn.",
      m:{
        j:"台湾は島で面積こそ大きくありませんが、公共交通はかなり充実しています。都市間をすばやく移動したいなら、最も便利なのが「高鉄（台湾高速鉄道）」です。高鉄は西部の回廊沿いに、台北・台中・台南・高雄といった主要都市を一本につなぎ、最北から最南まで一時間あまり。「朝は台北で会議、昼は高雄でごはん」がごく普通のことになりました。車両は新しくて清潔、本数も多く、多くのビジネスパーソンや旅行者の第一の選択肢です。",
        e:"Though Taiwan is an island of no great size, its public transport is remarkably complete. To move quickly between cities, the most convenient option is the \"High Speed Rail\" (HSR). Running along the western corridor, the HSR strings together major cities like Taipei, Taichung, Tainan, and Kaohsiung; from the far north to the far south takes only a little over an hour, making \"a morning meeting in Taipei and lunch in Kaohsiung\" quite ordinary. The trains are new and clean and run frequently—the top choice for many business travelers and tourists.",
        k:"대만은 섬이라 면적이 크진 않지만 대중교통은 상당히 잘 갖춰져 있습니다. 도시 사이를 빠르게 이동하려면 가장 편리한 것이 '고속철도(가오톄)'입니다. 고속철도는 서부 회랑을 따라 타이베이, 타이중, 타이난, 가오슝 같은 주요 도시를 하나로 잇고, 최북단에서 최남단까지 한 시간 남짓이면 됩니다. '아침엔 타이베이에서 회의, 점심엔 가오슝에서 식사'가 아주 평범한 일이 되었습니다. 객차는 새것처럼 깨끗하고 배차가 촘촘해 많은 비즈니스맨과 여행객의 첫 번째 선택입니다."
      }
    },
    {
      z:"如果高鐵是「快」，那麼「台鐵」就是「深入」。台鐵是台灣歷史悠久的傳統鐵路，路線幾乎繞行全島一圈，連東部的宜蘭、花蓮、台東，還有許多小鎮和鄉下，都能靠它抵達。台鐵的車種很多，從停靠每一站的「區間車」，到速度較快的「自強號」和景觀漂亮的「普悠瑪」、「太魯閣」。搭台鐵沿著東海岸行駛，一邊是山、一邊是太平洋，是很多人心中最美的鐵道風景。",
      py:"Rúguǒ gāotiě shì “kuài”, nàme “táitiě” jiùshì “shēnrù”. Táitiě shì Táiwān lìshǐ yōujiǔ de chuántǒng tiělù, lùxiàn jīhū ràoxíng quándǎo yì quān, lián dōngbù de Yílán, Huālián, Táidōng, háiyǒu xǔduō xiǎozhèn hé xiāngxià, dōu néng kào tā dǐdá. Táitiě de chēzhǒng hěnduō, cóng tíngkào měi yí zhàn de “qūjiānchē”, dào sùdù jiào kuài de “zìqiánghào” hé jǐngguān piàoliang de “Pǔyōumǎ”, “Tàilǔgé”. Dā táitiě yánzhe dōng hǎi'àn xíngshǐ, yìbiān shì shān, yìbiān shì Tàipíngyáng, shì hěnduō rén xīnzhōng zuì měi de tiědào fēngjǐng.",
      m:{
        j:"高鉄が「速さ」なら、「台鉄（台湾鉄路）」は「奥深さ」です。台鉄は歴史ある在来鉄道で、路線はほぼ島を一周し、東部の宜蘭（ぎらん）・花蓮（かれん）・台東（たいとう）、そして多くの小さな町や田舎までたどり着けます。台鉄は車種が豊富で、各駅停車の「区間車」から、速い「自強号」、車窓が美しい「プユマ号」「タロコ号」まであります。台鉄で東海岸沿いを走れば、片側は山、片側は太平洋。多くの人にとって、心に残る最も美しい鉄道風景です。",
        e:"If the HSR means \"fast,\" then \"Taiwan Railways\" (TRA) means \"reaching deep.\" The TRA is Taiwan's venerable conventional railway, its lines nearly circling the whole island, reaching the eastern regions of Yilan, Hualien, and Taitung as well as many small towns and rural areas. The TRA runs many train types, from the \"local train\" that stops at every station to the faster \"Tze-Chiang\" and the scenic \"Puyuma\" and \"Taroko\" expresses. Riding the TRA along the east coast, mountains on one side and the Pacific on the other, is for many the most beautiful railway scenery imaginable.",
        k:"고속철도가 '빠름'이라면 '대만 철도(타이톄)'는 '깊숙함'입니다. 타이톄는 역사 깊은 재래 철도로, 노선이 거의 섬을 한 바퀴 돌아 동부의 이란, 화롄, 타이둥은 물론 많은 작은 마을과 시골까지 닿습니다. 타이톄는 열차 종류가 많아, 모든 역에 서는 '구간차'부터 빠른 '쯔창호', 경치가 아름다운 '푸유마호'와 '타이루거호'까지 있습니다. 타이톄로 동해안을 따라 달리면 한쪽은 산, 한쪽은 태평양—많은 사람의 마음속에 가장 아름다운 철도 풍경입니다."
      }
    },
    {
      z:"在大城市裡，最方便的移動工具就是「捷運」。台北捷運（MRT）路線密、班次多、又準時，是很多外國人一到台北就愛上的交通工具。高雄、桃園和台中也陸續有了自己的捷運，讓南部和中部的交通更方便。捷運站不只帶你到目的地，也常常是逛街、吃美食、轉乘公車的樞紐。要提醒的是，台灣捷運車廂裡有「博愛座」，也明文規定不能飲食，這些小規矩讓乘車環境保持得很舒適。",
      py:"Zài dà chéngshì lǐ, zuì fāngbiàn de yídòng gōngjù jiùshì “jiéyùn”. Táiběi jiéyùn (MRT) lùxiàn mì, bāncì duō, yòu zhǔnshí, shì hěnduō wàiguórén yí dào Táiběi jiù àishàng de jiāotōng gōngjù. Gāoxióng, Táoyuán hé Táizhōng yě lùxù yǒu le zìjǐ de jiéyùn, ràng nánbù hé zhōngbù de jiāotōng gèng fāngbiàn. Jiéyùn zhàn bùzhǐ dài nǐ dào mùdìdì, yě chángcháng shì guàngjiē, chī měishí, zhuǎnchéng gōngchē de shūniǔ. Yào tíxǐng de shì, Táiwān jiéyùn chēxiāng lǐ yǒu “bó'àizuò”, yě míngwén guīdìng bùnéng yǐnshí, zhèxiē xiǎo guījǔ ràng chéngchē huánjìng bǎochí de hěn shūshì.",
      m:{
        j:"大都市の中で最も便利な移動手段が「捷運（MRT＝都市鉄道）」です。台北捷運は路線が密で、本数が多く、時間も正確。多くの外国人が台北に着くなり気に入る乗り物です。高雄、桃園、台中にも次々と独自の捷運ができ、南部や中部の交通がより便利になりました。捷運の駅は目的地へ運んでくれるだけでなく、買い物やグルメ、バスへの乗り換えの拠点でもあります。注意したいのは、台湾の捷運車内には「博愛座（優先席）」があり、飲食禁止も明文で定められていること。こうした小さなルールが、車内環境を心地よく保っています。",
        e:"In the big cities, the handiest way to get around is the \"MRT\" (metro). The Taipei Metro—with its dense network, frequent service, and punctuality—is a mode of transport many foreigners fall in love with the moment they arrive in Taipei. Kaohsiung, Taoyuan, and Taichung have each gained their own metro systems in turn, making travel in the south and center more convenient. Metro stations don't just take you to your destination; they're often hubs for shopping, eating, and transferring to buses. Note that Taiwan's metro cars have \"priority seats,\" and eating and drinking are expressly forbidden—small rules that keep the riding environment very comfortable.",
        k:"대도시 안에서 가장 편리한 이동 수단은 '지하철(제윈, MRT)'입니다. 타이베이 지하철은 노선이 촘촘하고 배차가 많으며 정시성도 좋아, 많은 외국인이 타이베이에 도착하자마자 반하는 교통수단입니다. 가오슝, 타오위안, 타이중에도 잇따라 자체 지하철이 생겨 남부와 중부의 교통이 더 편리해졌습니다. 지하철역은 목적지로 데려다줄 뿐 아니라 쇼핑, 맛집, 버스 환승의 거점이기도 합니다. 주의할 점은 대만 지하철 객차에 '배려석(우선석)'이 있고 음식물 섭취 금지가 명문으로 규정돼 있다는 것입니다. 이런 작은 규칙들이 승차 환경을 아주 쾌적하게 유지합니다."
      }
    },
    {
      z:"捷運到不了的地方，就靠「公車」和「客運」補上。市區的公車路線綿密，幾乎哪裡都能到；至於城市與城市之間、或是要上山下海去景點，就搭「客運」（長途巴士）。客運票價便宜、班次也多，是預算有限時很實用的選擇。要提醒的是，台灣有些公車上下車都要刷卡，有些則是「上車收費」或「下車收費」，第一次搭最好看清楚站牌或問司機，才不會手忙腳亂。",
      py:"Jiéyùn dào bùliǎo de dìfāng, jiù kào “gōngchē” hé “kèyùn” bǔshàng. Shìqū de gōngchē lùxiàn miánmì, jīhū nǎlǐ dōu néng dào; zhìyú chéngshì yǔ chéngshì zhījiān, huòshì yào shàngshān-xiàhǎi qù jǐngdiǎn, jiù dā “kèyùn” (chángtú bāshì). Kèyùn piàojià piányí, bāncì yě duō, shì yùsuàn yǒuxiàn shí hěn shíyòng de xuǎnzé. Yào tíxǐng de shì, Táiwān yǒuxiē gōngchē shàngxià chē dōu yào shuākǎ, yǒuxiē zé shì “shàngchē shōufèi” huò “xiàchē shōufèi”, dì-yī cì dā zuìhǎo kàn qīngchǔ zhànpái huò wèn sījī, cái búhuì shǒumáng-jiǎoluàn.",
      m:{
        j:"捷運が届かない場所は、「公車（路線バス）」と「客運（都市間バス）」が補います。市街地の路線バスは網の目のように張り巡らされ、ほとんどどこへでも行けます。都市と都市のあいだ、あるいは山や海の観光地へ行くなら「客運（長距離バス）」に乗ります。客運は運賃が安く、本数も多いので、予算が限られているときにとても実用的な選択肢です。注意したいのは、台湾のバスは乗り降りの両方でカードをタッチする路線もあれば、「乗車時払い」や「降車時払い」の路線もあること。初めて乗るときは、停留所の表示をよく見るか運転手さんに聞くと、あわてずにすみます。",
        e:"Where the metro can't reach, \"city buses\" and \"intercity coaches\" fill the gap. Urban bus routes are densely woven and can get you almost anywhere; for travel between cities, or heading up mountains and down to the coast to reach attractions, you take a \"coach\" (long-distance bus). Coaches are cheap and frequent—a very practical choice on a tight budget. One thing to note: on some Taiwan buses you tap your card both boarding and alighting, while others charge \"on boarding\" or \"on alighting.\" The first time, it's best to read the sign carefully or ask the driver so you're not caught fumbling.",
        k:"지하철이 닿지 않는 곳은 '시내버스(궁처)'와 '시외버스(커윈)'가 메웁니다. 시내 버스 노선은 촘촘히 짜여 거의 어디든 갈 수 있고, 도시와 도시 사이나 산과 바다의 명소로 갈 때는 '시외버스(장거리 버스)'를 탑니다. 시외버스는 요금이 싸고 배차도 많아 예산이 빠듯할 때 매우 실용적인 선택입니다. 주의할 점은, 대만 버스는 타고 내릴 때 모두 카드를 대는 노선도 있고, '승차 시 요금' 또는 '하차 시 요금' 노선도 있다는 것입니다. 처음 탈 때는 정류장 표지를 잘 보거나 기사에게 물어보면 허둥대지 않습니다."
      }
    },
    {
      z:"把這一整套系統串起來、讓一切變得無比方便的，就是那張小小的「悠遊卡」或「一卡通」。這兩張是台灣最普及的電子票證，儲值之後，搭捷運、公車、台鐵、租借公共自行車幾乎都能用，連在便利商店買東西、投飲料販賣機都嗶一下就付款完成。搭車不用一直找零錢、算票價，還常常有轉乘優惠。可以說，一張感應卡就等於一把打開台灣交通的鑰匙。",
      py:"Bǎ zhè yìzhěngtào xìtǒng chuàn qǐlái, ràng yíqiè biàn de wúbǐ fāngbiàn de, jiùshì nà zhāng xiǎoxiǎo de “yōuyóukǎ” huò “yìkǎtōng”. Zhè liǎng zhāng shì Táiwān zuì pǔjí de diànzǐ piàozhèng, chúzhí zhīhòu, dā jiéyùn, gōngchē, táitiě, zūjiè gōnggòng zìxíngchē jīhū dōu néng yòng, lián zài biànlì shāngdiàn mǎi dōngxi, tóu yǐnliào fànmàijī dōu bī yíxià jiù fùkuǎn wánchéng. Dāchē búyòng yìzhí zhǎo língqián, suàn piàojià, hái chángcháng yǒu zhuǎnchéng yōuhuì. Kěyǐ shuō, yì zhāng gǎnyìngkǎ jiù děngyú yì bǎ dǎkāi Táiwān jiāotōng de yàoshi.",
      m:{
        j:"このシステム全体をつなぎ、あらゆることをこの上なく便利にしてくれるのが、あの小さな「悠遊カード（EasyCard）」や「一卡通（iPASS）」です。この二枚は台湾で最も普及している電子乗車券で、チャージしておけば、捷運・バス・台鉄・シェア自転車の利用にほとんど使え、コンビニでの買い物や自販機の飲み物も「ピッ」で支払い完了。乗車のたびに小銭を探したり運賃を計算したりする必要がなく、乗り継ぎ割引もよくあります。一枚のICカードは、まさに台湾の交通を開ける鍵だと言っていいでしょう。",
        e:"What ties this whole system together and makes everything incredibly convenient is that little \"EasyCard\" or \"iPASS.\" These two are Taiwan's most widespread electronic fare cards; once loaded with value, they work for the metro, buses, the TRA, and renting public bicycles—and a single \"beep\" also pays for purchases at convenience stores and drinks from vending machines. You never have to dig for change or calculate fares, and there are often transfer discounts. You could say one contactless card is a key that unlocks transport across Taiwan.",
        k:"이 시스템 전체를 잇고 모든 것을 더없이 편리하게 만들어 주는 것이 그 작은 '유유카드(EasyCard)'와 '이카통(iPASS)'입니다. 이 두 장은 대만에서 가장 보편적인 전자 승차권으로, 충전해 두면 지하철, 버스, 대만 철도, 공유 자전거 이용에 거의 다 쓸 수 있고, 편의점 쇼핑이나 자판기 음료도 '삑' 한 번이면 결제 완료입니다. 탈 때마다 잔돈을 찾거나 요금을 계산할 필요가 없고, 환승 할인도 자주 있습니다. IC 카드 한 장이 곧 대만 교통을 여는 열쇠라고 할 수 있습니다."
      }
    },
    {
      z:"最後一段路，常常靠「YouBike」搞定。這是台灣的公共自行車系統，橘黃色的車身在各大城市的街頭隨處可見。只要用悠遊卡或手機App租借，就能騎到下一個站點還車，前面一小段時間往往免費或很便宜，非常適合「捷運站到目的地」的最後一哩路。把高鐵、台鐵、捷運、公車、客運，再加上YouBike和一張感應卡組合起來，就算不會開車、不懂中文，也能靠著大眾運輸，把整座台灣島玩透透。",
      py:"Zuìhòu yí duàn lù, chángcháng kào “YouBike” gǎodìng. Zhè shì Táiwān de gōnggòng zìxíngchē xìtǒng, júhuángsè de chēshēn zài gè dà chéngshì de jiētóu suíchù kějiàn. Zhǐyào yòng yōuyóukǎ huò shǒujī App zūjiè, jiù néng qí dào xià yí ge zhàndiǎn huánchē, qiánmiàn yì xiǎoduàn shíjiān wǎngwǎng miǎnfèi huò hěn piányí, fēicháng shìhé “jiéyùn zhàn dào mùdìdì” de zuìhòu yì lǐ lù. Bǎ gāotiě, táitiě, jiéyùn, gōngchē, kèyùn, zài jiāshàng YouBike hé yì zhāng gǎnyìngkǎ zǔhé qǐlái, jiùsuàn búhuì kāichē, bù dǒng Zhōngwén, yě néng kàozhe dàzhòng yùnshū, bǎ zhěng zuò Táiwān dǎo wán tòutòu.",
      m:{
        j:"最後の一区間は、しばしば「YouBike」で解決します。これは台湾の公共シェア自転車システムで、オレンジ色の車体が各都市の街角のあちこちで見られます。悠遊カードやスマホアプリで借り、次のステーションで返却できます。最初の一定時間はたいてい無料か格安なので、「捷運の駅から目的地まで」のラストワンマイルにぴったり。高鉄・台鉄・捷運・バス・客運、それにYouBikeと一枚のICカードを組み合わせれば、車を運転できなくても、中国語がわからなくても、公共交通だけで台湾島まるごとを遊び尽くせます。",
        e:"The last stretch is often handled by \"YouBike.\" This is Taiwan's public bike-share system, its orange frames a common sight on street corners in every major city. Just rent one with an EasyCard or a phone app and ride to the next station to return it; the first short spell is usually free or very cheap—perfect for the last mile \"from the metro station to your destination.\" Combine the HSR, TRA, metro, buses, and coaches with YouBike and one contactless card, and even if you can't drive and don't understand Chinese, you can rely on public transport to explore every corner of the island of Taiwan.",
        k:"마지막 한 구간은 흔히 'YouBike'로 해결합니다. 이것은 대만의 공공 자전거 시스템으로, 주황색 차체가 각 대도시 길목 곳곳에서 보입니다. 유유카드나 휴대폰 앱으로 빌려 다음 정류소에서 반납하면 되고, 처음 짧은 시간은 대개 무료거나 아주 저렴해 '지하철역에서 목적지까지'의 라스트 마일에 딱 맞습니다. 고속철도, 대만 철도, 지하철, 버스, 시외버스에 YouBike와 IC 카드 한 장을 조합하면, 운전을 못 하고 중국어를 몰라도 대중교통만으로 대만섬 전체를 구석구석 즐길 수 있습니다."
      }
    }
  ],
  vocab:[
    { w:"高鐵", zy:"ㄍㄠ ㄊㄧㄝˇ", py:"gāotiě", m:{ j:"高鉄（台湾高速鉄道 HSR）", e:"High Speed Rail (HSR)", k:"고속철도(가오톄)" } },
    { w:"台鐵", zy:"ㄊㄞˊ ㄊㄧㄝˇ", py:"táitiě", m:{ j:"台鉄（台湾鉄路・在来線）", e:"Taiwan Railways (TRA)", k:"대만 철도(타이톄)" } },
    { w:"捷運", zy:"ㄐㄧㄝˊ ㄩㄣˋ", py:"jiéyùn", m:{ j:"MRT・都市鉄道（地下鉄）", e:"metro / MRT", k:"지하철(제윈)" } },
    { w:"公車", zy:"ㄍㄨㄥ ㄔㄜ", py:"gōngchē", m:{ j:"路線バス", e:"city bus", k:"시내버스" } },
    { w:"客運", zy:"ㄎㄜˋ ㄩㄣˋ", py:"kèyùn", m:{ j:"都市間バス・長距離バス", e:"intercity coach", k:"시외버스" } },
    { w:"悠遊卡", zy:"ㄧㄡ ㄧㄡˊ ㄎㄚˇ", py:"yōuyóukǎ", m:{ j:"悠遊カード（EasyCard）", e:"EasyCard", k:"유유카드" } },
    { w:"一卡通", zy:"ㄧˋ ㄎㄚˇ ㄊㄨㄥ", py:"yìkǎtōng", m:{ j:"一卡通（iPASS・交通ICカード）", e:"iPASS (transit card)", k:"이카통(교통카드)" } },
    { w:"儲值", zy:"ㄔㄨˊ ㄓˊ", py:"chúzhí", m:{ j:"チャージ・入金", e:"to top up / add value", k:"충전" } },
    { w:"轉乘", zy:"ㄓㄨㄢˇ ㄔㄥˊ", py:"zhuǎnchéng", m:{ j:"乗り換え", e:"to transfer (between lines/modes)", k:"환승" } },
    { w:"博愛座", zy:"ㄅㄛˊ ㄞˋ ㄗㄨㄛˋ", py:"bó'àizuò", m:{ j:"優先席", e:"priority seat", k:"배려석·노약자석" } },
    { w:"班次", zy:"ㄅㄢ ㄘˋ", py:"bāncì", m:{ j:"運行本数・便数", e:"service frequency / departures", k:"배차·운행 편수" } },
    { w:"公共自行車", zy:"ㄍㄨㄥ ㄍㄨㄥˋ ㄗˋ ㄒㄧㄥˊ ㄔㄜ", py:"gōnggòng zìxíngchē", m:{ j:"公共シェア自転車（YouBike）", e:"public bike-share (YouBike)", k:"공공 자전거(유유바이크)" } }
  ],
  note:{
    j:"『悠遊卡』はもともと台北捷運のために生まれ、『一卡通』は高雄が中心でしたが、今では相互に使える範囲が大きく広がり、どちらか一枚あれば全国の多くの交通機関に乗れます。高鉄には自由席（非予約席）もあり、当日ふらっと乗ることも可能。YouBikeは初期の『YouBike 1.0』から、より借りやすい『YouBike 2.0』へと更新が進んでいます。なお台湾の鉄道やバスでは、優先席（博愛座）を必要な人に譲る意識がとても強く、混雑時でも空いていることが多いのが特徴です。旅行者は交通ICカードを一枚買っておくと、移動が一気に楽になります。",
    e:"The \"EasyCard\" was originally created for the Taipei Metro and the \"iPASS\" centered on Kaohsiung, but the two are now widely interoperable—either one lets you ride most transport nationwide. The HSR also offers non-reserved seats, so you can hop on the same day. YouBike has evolved from the early \"YouBike 1.0\" to the easier-to-use \"YouBike 2.0.\" One notable thing: on Taiwan's trains and buses there's a strong ethic of yielding priority seats to those who need them, so these seats often stay empty even in crowds. Travelers who buy one transit card will find getting around suddenly much easier.",
    k:"'유유카드'는 원래 타이베이 지하철을 위해 만들어졌고 '이카통'은 가오슝을 중심으로 했지만, 지금은 서로 호환되는 범위가 크게 넓어져 둘 중 한 장만 있으면 전국 대부분의 교통을 이용할 수 있습니다. 고속철도에는 자유석(비지정석)도 있어 당일에 훌쩍 탈 수도 있습니다. YouBike는 초기 'YouBike 1.0'에서 더 빌리기 쉬운 'YouBike 2.0'으로 갱신되고 있습니다. 또 대만의 철도와 버스에서는 배려석을 필요한 사람에게 양보하는 의식이 매우 강해, 붐빌 때도 비어 있는 경우가 많습니다. 여행자는 교통 IC 카드를 한 장 사 두면 이동이 훨씬 수월해집니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_15 };
