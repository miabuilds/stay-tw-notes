// StayTW Notes — 深度閲讀：台湾の教育・社会習慣（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_8 = [
{
  id:"cram-school-culture",
  cat:{ j:"教育・社会", e:"Education & Society", k:"교육·사회" },
  zhTitle:"補習文化：下課後的另一間教室",
  title:{ j:"塾（じゅく）文化：放課後のもう一つの教室", e:"Cram-School Culture: The Other Classroom After School", k:"보습 문화: 방과 후의 또 다른 교실" },
  intro:{
    j:"夕方、学校が終わってもまっすぐ家に帰らず、そのまま『補習班』へ向かう——台湾の子どもや学生にとって、これはごく普通の日常です。ネオンだらけの塾ビルから、駅前の『南陽街』まで、台湾の受験社会を支えるこの巨大な『放課後エコシステム』をのぞいてみましょう。",
    e:"When school lets out in the evening, many kids and teens don't head straight home—they go to a 'cram school.' For Taiwanese students, that's just an ordinary part of daily life. From neon-lit tutoring buildings to the famous 'Nanyang Street' by the station, let's look inside the vast after-school ecosystem that props up Taiwan's exam-driven society.",
    k:"저녁에 학교가 끝나도 곧장 집에 가지 않고 그대로 '보습반'으로 향한다—대만의 아이들과 학생들에게는 아주 평범한 일상입니다. 네온으로 가득한 학원 건물부터 역 앞의 유명한 '난양가'까지, 대만의 입시 사회를 떠받치는 이 거대한 '방과 후 생태계'를 들여다봅시다."
  },
  paras:[
    {
      z:"在台灣，「補習班」幾乎是每個學生成長過程中都會碰到的地方。所謂補習，就是在正規學校的課程之外，另外花錢去上加強班，把數學、英文、理化這些科目再多學一遍。走在市區的街上，抬頭看看那些掛滿招牌的大樓，你會發現一整棟從一樓到頂樓，全部都是各式各樣的補習班，明亮的燈光一直亮到深夜。",
      py:"Zài Táiwān, “bǔxíbān” jīhū shì měi ge xuéshēng chéngzhǎng guòchéng zhōng dōu huì pèngdào de dìfāng. Suǒwèi bǔxí, jiùshì zài zhèngguī xuéxiào de kèchéng zhīwài, lìngwài huāqián qù shàng jiāqiángbān, bǎ shùxué, yīngwén, lǐhuà zhèxiē kēmù zài duō xué yí biàn. Zǒu zài shìqū de jiē shàng, táitóu kànkan nàxiē guàmǎn zhāopái de dàlóu, nǐ huì fāxiàn yì zhěng dòng cóng yìlóu dào dǐnglóu, quánbù dōu shì gèshì gèyàng de bǔxíbān, míngliàng de dēngguāng yìzhí liàng dào shēnyè.",
      m:{
        j:"台湾では、「補習班（塾）」はほぼすべての学生が成長の過程で通うことになる場所です。補習とは、正規の学校のカリキュラムとは別に、お金を払って強化クラスに通い、数学・英語・理科といった科目をもう一度学び直すこと。市街地の通りを歩いて、看板だらけのビルを見上げてみると、一階から最上階までまるごと、さまざまな塾で埋まっていて、明るい照明が深夜までこうこうと灯っているのに気づくでしょう。",
        e:"In Taiwan, the 'cram school' (bǔxíbān) is a place almost every student encounters while growing up. 'Cramming' means paying to attend extra reinforcement classes outside the regular school curriculum, going over subjects like math, English, and science one more time. Walk through a city district, look up at the signboard-covered buildings, and you'll notice that whole towers—from the ground floor to the top—are packed with all kinds of cram schools, their bright lights glowing late into the night.",
        k:"대만에서 '보습반(학원)'은 거의 모든 학생이 성장 과정에서 다니게 되는 곳입니다. 보습이란 정규 학교 커리큘럼 외에 따로 돈을 내고 강화반에 다니며 수학, 영어, 이과 같은 과목을 한 번 더 배우는 것입니다. 시내 거리를 걷다가 간판으로 뒤덮인 건물을 올려다보면, 1층부터 꼭대기까지 통째로 온갖 학원으로 가득 차 밝은 조명이 밤늦게까지 환하게 켜져 있는 것을 보게 될 겁니다."
      }
    },
    {
      z:"補習班的種類其實比外國人想像的還多。年紀小的孩子放學後，父母如果還在上班沒辦法照顧，就會把小孩送去「安親班」，那裡的老師會盯著他們寫作業、複習功課，順便照顧到晚上下班。國中、高中生則多半是為了「升學」而補習，準備會考、學測、分科測驗這些關鍵考試。除了學科，還有專門補英文、作文、程式、才藝的班，選擇多到眼花撩亂。",
      py:"Bǔxíbān de zhǒnglèi qíshí bǐ wàiguórén xiǎngxiàng de hái duō. Niánjì xiǎo de háizi fàngxué hòu, fùmǔ rúguǒ hái zài shàngbān méi bànfǎ zhàogù, jiù huì bǎ xiǎohái sòng qù “ānqīnbān”, nàlǐ de lǎoshī huì dīngzhe tāmen xiě zuòyè, fùxí gōngkè, shùnbiàn zhàogù dào wǎnshàng xiàbān. Guózhōng, gāozhōng shēng zé duōbàn shì wèile “shēngxué” ér bǔxí, zhǔnbèi huìkǎo, xuécè, fēnkē cèyàn zhèxiē guānjiàn kǎoshì. Chúle xuékē, hái yǒu zhuānmén bǔ yīngwén, zuòwén, chéngshì, cáiyì de bān, xuǎnzé duō dào yǎnhuāliáoluàn.",
      m:{
        j:"塾の種類は、実は外国人が思うより多彩です。年少の子どもは、放課後に親がまだ仕事で面倒を見られない場合、「安親班（学童保育兼塾）」に預けられます。そこでは先生が宿題や復習をしっかり見てくれ、ついでに親が退勤する夜まで面倒をみてくれます。中学生・高校生は多くが「進学」のために塾に通い、会考・学測・分科測験といった重要な試験に備えます。教科だけでなく、英語・作文・プログラミング・習い事に特化したクラスもあり、選択肢は目移りするほどです。",
        e:"There are more types of cram schools than foreigners tend to imagine. For younger children, if parents are still at work and can't look after them after school, they're sent to an 'ānqīnbān' (after-school care class), where teachers watch over their homework and review, and also mind them until the parents get off work in the evening. Middle- and high-schoolers mostly cram for 'advancement'—preparing for key exams like the huìkǎo, xuécè, and subject tests. Beyond academic subjects, there are classes devoted to English, essay writing, coding, and talents—so many options it makes your head spin.",
        k:"학원의 종류는 사실 외국인이 생각하는 것보다 다양합니다. 어린아이는 방과 후 부모가 아직 일하느라 돌볼 수 없으면 '안친반(방과 후 돌봄 겸 학원)'에 맡겨집니다. 그곳 선생님은 아이들의 숙제와 복습을 챙겨 주고, 겸사겸사 부모가 퇴근하는 저녁까지 돌봐 줍니다. 중·고등학생은 대부분 '진학'을 위해 학원에 다니며 회고, 학측, 분과 시험 같은 중요한 시험을 준비합니다. 교과 외에도 영어, 작문, 프로그래밍, 특기에 특화된 반이 있어 선택지가 눈이 어지러울 만큼 많습니다."
      }
    },
    {
      z:"為什麼台灣的補習風氣這麼盛？背後最大的原因，就是「升學壓力」。長久以來，社會普遍相信「考上好學校，才有好出路」，一場考試的成績，可能就決定了你進哪所高中、哪所大學。家長怕孩子輸在起跑點，就算學費不便宜，也願意咬牙讓孩子多補一點。孩子則在學校和補習班之間來回奔波，晚上九點、十點才回家，是很多台灣學生共同的青春回憶。",
      py:"Wèishénme Táiwān de bǔxí fēngqì zhème shèng? Bèihòu zuìdà de yuányīn, jiùshì “shēngxué yālì”. Chángjiǔ yǐlái, shèhuì pǔbiàn xiāngxìn “kǎoshàng hǎo xuéxiào, cái yǒu hǎo chūlù”, yì chǎng kǎoshì de chéngjī, kěnéng jiù juédìng le nǐ jìn nǎ suǒ gāozhōng, nǎ suǒ dàxué. Jiāzhǎng pà háizi shū zài qǐpǎodiǎn, jiùsuàn xuéfèi bù piányí, yě yuànyì yǎoyá ràng háizi duō bǔ yìdiǎn. Háizi zé zài xuéxiào hé bǔxíbān zhījiān láihuí bēnbō, wǎnshàng jiǔ diǎn, shí diǎn cái huíjiā, shì hěnduō Táiwān xuéshēng gòngtóng de qīngchūn huíyì.",
      m:{
        j:"なぜ台湾ではこれほど塾通いが盛んなのか。その最大の理由は「進学のプレッシャー」です。長らく社会には「良い学校に受かってこそ、良い将来がある」という考えが広く根づいており、一度の試験の成績が、どの高校・どの大学に進むかを左右しかねません。親は子どもがスタートラインで負けることを恐れ、学費が安くなくても、歯を食いしばって少しでも多く塾に通わせます。子どもは学校と塾のあいだを行き来し、夜九時、十時にようやく帰宅する——それが多くの台湾の学生に共通する青春の記憶です。",
        e:"Why is the cram-school habit so strong in Taiwan? The biggest reason behind it is 'academic pressure.' For a long time, society has widely believed that 'only by getting into a good school do you have good prospects,' and the score on a single exam can decide which high school or university you enter. Parents fear their child losing at the starting line, so even when tuition isn't cheap, they grit their teeth and let their kids cram a bit more. Children shuttle back and forth between school and cram school, getting home only at nine or ten at night—a shared memory of youth for many Taiwanese students.",
        k:"왜 대만에서는 이렇게 학원 다니는 풍조가 성행할까요? 그 가장 큰 이유는 '진학 압박'입니다. 오랫동안 사회에는 '좋은 학교에 붙어야 좋은 앞날이 있다'는 생각이 널리 뿌리내려, 한 번의 시험 성적이 어느 고등학교, 어느 대학에 들어갈지를 좌우할 수 있습니다. 부모는 아이가 출발선에서 지는 것을 두려워해 학비가 싸지 않아도 이를 악물고 조금이라도 더 학원에 보냅니다. 아이는 학교와 학원 사이를 오가며 밤 9시, 10시에야 겨우 귀가하는데, 이는 많은 대만 학생이 공유하는 청춘의 기억입니다."
      }
    },
    {
      z:"講到補習，就不能不提台北車站附近的「南陽街」。這條短短的街，從很久以前就聚集了大量的補習班，尤其是專門幫重考生準備大學考試的「重考班」，因此被大家稱為「補習街」。街上到處是背著書包、拿著講義的學生，還有一間間便宜的自助餐和便當店，讓學生匆匆扒完一頓飯就趕去上課。對很多台灣人來說，南陽街幾乎就是「拚考試」這件事的代名詞。",
      py:"Jiǎngdào bǔxí, jiù bùnéng bù tí Táiběi chēzhàn fùjìn de “Nányáng Jiē”. Zhè tiáo duǎnduǎn de jiē, cóng hěnjiǔ yǐqián jiù jùjí le dàliàng de bǔxíbān, yóuqí shì zhuānmén bāng chóngkǎoshēng zhǔnbèi dàxué kǎoshì de “chóngkǎobān”, yīncǐ bèi dàjiā chēngwéi “bǔxí jiē”. Jiē shàng dàochù shì bēizhe shūbāo, názhe jiǎngyì de xuéshēng, hái yǒu yì jiān jiān piányí de zìzhùcān hé biàndāng diàn, ràng xuéshēng cōngcōng pá wán yí dùn fàn jiù gǎn qù shàngkè. Duì hěnduō Táiwānrén lái shuō, Nányáng Jiē jīhū jiùshì “pàn kǎoshì” zhè jiàn shì de dàimíngcí.",
      m:{
        j:"補習といえば、台北駅近くの「南陽街」に触れないわけにはいきません。この短い通りには、ずっと昔から大量の塾が集まっており、とくに浪人生の大学受験を専門に支える「重考班（浪人予備校）」が多いことから、みんなに「補習街」と呼ばれています。通りには、かばんを背負い講義プリントを手にした学生があふれ、安い定食屋や弁当屋が軒を連ね、学生はさっと一食かき込んで授業へ急ぎます。多くの台湾人にとって、南陽街はほとんど「受験に打ち込む」ことそのものの代名詞です。",
        e:"Speaking of cramming, you can't skip 'Nanyang Street' near Taipei Main Station. This short street has gathered a huge concentration of cram schools since long ago—especially 'retake classes' that prepare repeat candidates for the university exam—so everyone calls it 'Cram-School Street.' The street is full of students carrying backpacks and lecture handouts, lined with cheap buffet eateries and lunchbox shops where students wolf down a meal and rush off to class. For many Taiwanese, Nanyang Street is practically a byword for 'grinding for exams.'",
        k:"보습을 말하면 타이베이역 근처의 '난양가'를 빼놓을 수 없습니다. 이 짧은 거리에는 아주 오래전부터 대량의 학원이 모여 있고, 특히 재수생의 대학 시험을 전문으로 돕는 '재수반'이 많아 모두에게 '학원가'라고 불립니다. 거리에는 가방을 메고 강의 프린트를 든 학생들이 넘쳐나고, 저렴한 뷔페 식당과 도시락 가게가 늘어서 학생들이 후다닥 한 끼를 해치우고 수업에 달려갑니다. 많은 대만 사람에게 난양가는 거의 '시험에 매달리는 것' 자체의 대명사입니다."
      }
    },
    {
      z:"當然，這幾年整個社會也開始反省補習文化。有人覺得，孩子從小就被塞滿課程，睡眠不足、沒有玩耍的時間，太辛苦了；也有人質疑，一直補習真的有比較會念書嗎？隨著少子化、教育制度改革，還有「多元入學」的推行，升學不再只看一次考試，補習的方式也慢慢在改變。不過整體來說，補習在台灣依然非常普遍，短時間內大概還很難消失。",
      py:"Dāngrán, zhè jǐ nián zhěnggè shèhuì yě kāishǐ fǎnxǐng bǔxí wénhuà. Yǒurén juéde, háizi cóngxiǎo jiù bèi sāimǎn kèchéng, shuìmián bùzú, méiyǒu wánshuǎ de shíjiān, tài xīnkǔ le; yě yǒurén zhìyí, yìzhí bǔxí zhēnde yǒu bǐjiào huì niànshū ma? Suízhe shǎozǐhuà, jiàoyù zhìdù gǎigé, hái yǒu “duōyuán rùxué” de tuīxíng, shēngxué búzài zhǐ kàn yí cì kǎoshì, bǔxí de fāngshì yě mànman zài gǎibiàn. Búguò zhěngtǐ lái shuō, bǔxí zài Táiwān yīrán fēicháng pǔbiàn, duǎn shíjiān nèi dàgài hái hěn nán xiāoshī.",
      m:{
        j:"もちろん、ここ数年は社会全体が塾文化を見直し始めています。子どもが幼い頃から授業漬けにされ、睡眠不足で遊ぶ時間もなく、あまりに大変だと感じる人もいれば、ずっと塾に通えば本当に勉強ができるようになるのか、と疑問を呈する人もいます。少子化や教育制度改革、そして「多元入学（複数の評価による入試）」の推進とともに、進学は一度の試験だけで決まらなくなり、塾のあり方も少しずつ変わりつつあります。とはいえ全体としては、塾は台湾で依然として非常に一般的で、短期間で消えることはまずなさそうです。",
        e:"Of course, in recent years society as a whole has begun to reflect on cram-school culture. Some feel that stuffing children full of classes from a young age—leaving them sleep-deprived with no time to play—is simply too hard on them; others question whether endless cramming really makes you better at studying. With falling birthrates, education reforms, and the push for 'multiple-pathway admissions,' advancement no longer hinges on a single exam, and the shape of cramming is slowly shifting. Overall, though, cramming remains extremely common in Taiwan and is unlikely to disappear anytime soon.",
        k:"물론 최근 몇 년 사이 사회 전체가 보습 문화를 되돌아보기 시작했습니다. 아이가 어릴 때부터 수업으로 가득 채워져 수면 부족에 놀 시간도 없이 너무 힘들다고 느끼는 사람도 있고, 계속 학원에 다니면 정말 공부를 더 잘하게 되느냐고 의문을 던지는 사람도 있습니다. 저출산, 교육 제도 개혁, 그리고 '다원 입학(여러 평가에 의한 입시)' 추진과 함께 진학이 더 이상 한 번의 시험만으로 결정되지 않게 되면서 보습의 방식도 조금씩 바뀌고 있습니다. 하지만 전체적으로 보습은 대만에서 여전히 매우 보편적이어서 단기간에 사라지기는 어려울 것입니다."
      }
    }
  ],
  vocab:[
    { w:"補習班", zy:"ㄅㄨˇ ㄒㄧˊ ㄅㄢ", py:"bǔxíbān", m:{ j:"塾・予備校", e:"cram school", k:"보습반·학원" } },
    { w:"安親班", zy:"ㄢ ㄑㄧㄣ ㄅㄢ", py:"ānqīnbān", m:{ j:"学童保育を兼ねた塾（低学年向け）", e:"after-school care class", k:"방과 후 돌봄 겸 학원" } },
    { w:"升學", zy:"ㄕㄥ ㄒㄩㄝˊ", py:"shēngxué", m:{ j:"進学（上級学校へ進むこと）", e:"advancement to higher schooling", k:"진학" } },
    { w:"升學壓力", zy:"ㄕㄥ ㄒㄩㄝˊ ㄧㄚ ㄌㄧˋ", py:"shēngxué yālì", m:{ j:"進学のプレッシャー", e:"academic/advancement pressure", k:"진학 압박" } },
    { w:"補習", zy:"ㄅㄨˇ ㄒㄧˊ", py:"bǔxí", m:{ j:"塾で補習する・学び直す", e:"to take supplementary lessons; cram", k:"보습하다·학원 다니다" } },
    { w:"重考班", zy:"ㄔㄨㄥˊ ㄎㄠˇ ㄅㄢ", py:"chóngkǎobān", m:{ j:"浪人予備校（再受験生向け）", e:"retake/repeater class", k:"재수반" } },
    { w:"學測", zy:"ㄒㄩㄝˊ ㄘㄜˋ", py:"xuécè", m:{ j:"学科能力測験（大学入試の一つ）", e:"the General Scholastic Ability Test (a university entrance exam)", k:"학과능력시험(대학 입시)" } },
    { w:"會考", zy:"ㄏㄨㄟˋ ㄎㄠˇ", py:"huìkǎo", m:{ j:"（中学の）進学のための統一試験", e:"the junior-high comprehensive assessment", k:"(중학) 회고 시험" } },
    { w:"講義", zy:"ㄐㄧㄤˇ ㄧˋ", py:"jiǎngyì", m:{ j:"講義プリント・教材", e:"lecture handout / study material", k:"강의 프린트·교재" } },
    { w:"南陽街", zy:"ㄋㄢˊ ㄧㄤˊ ㄐㄧㄝ", py:"Nányáng Jiē", m:{ j:"南陽街（台北の有名な塾街）", e:"Nanyang Street (Taipei's famous cram-school street)", k:"난양가(타이베이의 유명한 학원가)" } },
    { w:"起跑點", zy:"ㄑㄧˇ ㄆㄠˇ ㄉㄧㄢˇ", py:"qǐpǎodiǎn", m:{ j:"スタートライン", e:"starting line", k:"출발선" } },
    { w:"多元入學", zy:"ㄉㄨㄛ ㄩㄢˊ ㄖㄨˋ ㄒㄩㄝˊ", py:"duōyuán rùxué", m:{ j:"多元入学（複数の評価による入試制度）", e:"multiple-pathway admissions", k:"다원 입학(여러 평가에 의한 입시)" } }
  ],
  note:{
    j:"『補習』という言葉は、大人の世界でも使われます。社会人が資格試験（公務員試験や語学試験など）のために通う『補習班』も多く、台湾では『考公職（公務員試験）』のための塾は一つの大きな業界です。また『名師（有名講師）』の存在も特徴的で、人気講師は看板やバスの広告に顔写真が大きく載り、まるでスターのように扱われます。台湾の学生に『你有補習嗎？（塾に通ってる？）』と聞くのは、日本で『部活は何？』と聞くのと同じくらい自然な会話の入り口です。",
    e:"The word 'bǔxí' is used in the adult world too. Many working adults attend cram schools to prepare for qualifying exams (civil-service or language tests), and in Taiwan, prep schools for the 'civil-service exam' are a whole big industry. The phenomenon of the 'star teacher' (míngshī) is also distinctive: popular instructors have their faces plastered large on signboards and bus ads, treated almost like celebrities. Asking a Taiwanese student 'Do you go to cram school?' is as natural an ice-breaker as asking about someone's club activities elsewhere.",
    k:"'보습'이라는 말은 어른의 세계에서도 쓰입니다. 직장인이 자격시험(공무원 시험이나 어학 시험 등)을 준비하러 다니는 학원도 많고, 대만에서 '공직 시험'을 위한 학원은 하나의 큰 산업입니다. 또 '명사(유명 강사)'의 존재도 특징적이어서, 인기 강사는 간판이나 버스 광고에 얼굴 사진이 크게 실려 마치 스타처럼 대우받습니다. 대만 학생에게 '학원 다녀?'라고 묻는 것은 다른 나라에서 동아리 활동을 묻는 것만큼 자연스러운 대화의 시작입니다."
  }
},
{
  id:"military-service",
  cat:{ j:"教育・社会", e:"Education & Society", k:"교육·사회" },
  zhTitle:"當兵：台灣男生共同的成年禮",
  title:{ j:"兵役——台湾の男性に共通する通過儀礼", e:"Military Service: A Shared Rite of Passage for Taiwanese Men", k:"군 복무: 대만 남성이 공유하는 성년의 통과의례" },
  intro:{
    j:"台湾で男性の友人と話していると、遅かれ早かれ必ず出てくる話題があります——『當兵（兵役）』です。丸刈りにされた新兵時代の写真、教官の怖い話、除隊の日の解放感……。台湾の男性にとって兵役は、人生の一大イベントであり、世代を超えて分かち合える共通の記憶なのです。",
    e:"Talk with male friends in Taiwan long enough and one topic is sure to come up: 'serving in the military' (dāng bīng). Shaved-head boot-camp photos, scary stories about drill instructors, the sweet relief of discharge day… For Taiwanese men, military service is a major life event and a shared memory passed across generations.",
    k:"대만에서 남성 친구와 이야기하다 보면 늦든 이르든 반드시 나오는 화제가 있습니다—'군 복무(당빙)'입니다. 빡빡 깎인 신병 시절 사진, 교관의 무서운 이야기, 전역하는 날의 해방감…. 대만 남성에게 군 복무는 인생의 큰 이벤트이자 세대를 넘어 함께 나눌 수 있는 공통의 기억입니다."
  },
  paras:[
    {
      z:"在台灣，只要是符合條件的成年男性，都有服兵役的義務，這就叫「義務役」。到了一定的年紀，收到兵單之後，就得放下手邊的工作或學業，去軍隊裡接受訓練、過一段團體生活。這件事在台灣被簡單地稱為「當兵」。對很多台灣男生來說，當兵是從男孩變成男人的一道關卡，也是幾乎每個人都躲不掉的人生經歷。",
      py:"Zài Táiwān, zhǐyào shì fúhé tiáojiàn de chéngnián nánxìng, dōu yǒu fú bīngyì de yìwù, zhè jiù jiào “yìwùyì”. Dàole yídìng de niánjì, shōudào bīngdān zhīhòu, jiù děi fàngxià shǒubiān de gōngzuò huò xuéyè, qù jūnduì lǐ jiēshòu xùnliàn, guò yí duàn tuántǐ shēnghuó. Zhè jiàn shì zài Táiwān bèi jiǎndān de chēngwéi “dāng bīng”. Duì hěnduō Táiwān nánshēng lái shuō, dāng bīng shì cóng nánhái biànchéng nánrén de yí dào guānkǎ, yěshì jīhū měi ge rén dōu duǒbudiào de rénshēng jīnglì.",
      m:{
        j:"台湾では、条件を満たす成人男性には兵役の義務があり、これを「義務役（義務兵役）」と呼びます。一定の年齢になり、召集令状（兵単）を受け取ると、手元の仕事や学業をいったん置いて、軍隊で訓練を受け、一定期間の団体生活を送らなければなりません。これを台湾では簡単に「當兵（兵役に就く）」と言います。多くの台湾男性にとって、兵役は少年から男へと変わる一つの関門であり、ほぼ誰もが避けられない人生経験です。",
        e:"In Taiwan, any adult man who meets the criteria has the duty to serve in the military—this is called 'compulsory service' (yìwùyì). When you reach a certain age and receive your draft notice, you must set aside your current job or studies and go to the armed forces for training and a period of group living. Taiwanese simply call this 'dāng bīng' (serving as a soldier). For many Taiwanese men, service is a threshold in becoming a man from a boy, and a life experience almost no one can dodge.",
        k:"대만에서는 조건을 충족하는 성인 남성에게 병역의 의무가 있으며, 이를 '의무역(의무 병역)'이라고 합니다. 일정 나이가 되어 소집 영장(병단)을 받으면, 하던 일이나 학업을 잠시 내려놓고 군대에서 훈련을 받으며 일정 기간 단체 생활을 해야 합니다. 이를 대만에서는 간단히 '당빙(군 복무를 하다)'이라고 합니다. 많은 대만 남성에게 군 복무는 소년에서 남자로 변하는 하나의 관문이자, 거의 누구도 피할 수 없는 인생 경험입니다."
      }
    },
    {
      z:"當兵的第一站，是「新訓」，也就是新兵訓練中心。剛進去的第一件事，往往就是「剃頭」——理成一顆光溜溜的平頭，把每個人原本的髮型全部歸零。接著是穿上軍服、學立正稍息、疊豆腐乾一樣方正的棉被、每天早起出操。這段日子最辛苦，但也因為大家一起吃苦，很容易和同梯的弟兄培養出革命情感。",
      py:"Dāng bīng de dì yī zhàn, shì “xīnxùn”, yějiùshì xīnbīng xùnliàn zhōngxīn. Gāng jìnqù de dì yī jiàn shì, wǎngwǎng jiùshì “tì tóu”——lǐchéng yì kē guāngliūliū de píngtóu, bǎ měi ge rén yuánběn de fǎxíng quánbù guīlíng. Jiēzhe shì chuānshàng jūnfú, xué lìzhèng shāoxī, dié dòufǔgān yíyàng fāngzhèng de miánbèi, měitiān zǎoqǐ chū cāo. Zhè duàn rìzi zuì xīnkǔ, dàn yě yīnwèi dàjiā yìqǐ chīkǔ, hěn róngyì hé tóngtī de dìxiōng péiyǎng chū gémìng gǎnqíng.",
      m:{
        j:"兵役の第一関門は「新訓（新兵訓練）」、つまり新兵訓練センターです。入所してまず行われるのが「剃頭（丸刈り）」——つるつるの坊主頭にされ、それぞれの元の髪型がすべてリセットされます。続いて軍服を着て、気をつけ・休めの姿勢を習い、豆腐のように角がぴしっと立った布団のたたみ方を覚え、毎朝早起きして訓練に出ます。この時期が一番きついのですが、みんなで苦労を共にするからこそ、同期（同梯）の仲間と『革命情感（戦友の絆）』が芽生えやすいのです。",
        e:"The first stop of service is 'xīnxùn'—the new-recruit training center. The very first thing when you arrive is often 'shaving the head': you're clipped to a smooth buzz cut, resetting everyone's original hairstyle to zero. Next come putting on the uniform, learning attention and at-ease, folding a quilt into a crisp tofu-block square, and rising early each day for drills. This stretch is the hardest, but precisely because everyone endures it together, it's easy to build a 'band-of-brothers' bond with the buddies in your cohort (tóngtī).",
        k:"군 복무의 첫 관문은 '신훈(신병 훈련)', 즉 신병 훈련소입니다. 들어가서 가장 먼저 하는 것이 보통 '삭발'—반들반들한 빡빡머리로 밀려 각자의 원래 머리 모양이 모두 초기화됩니다. 이어서 군복을 입고 차렷·쉬어 자세를 배우며, 두부처럼 각이 딱 잡힌 이불 개는 법을 익히고, 매일 일찍 일어나 훈련을 나갑니다. 이 시기가 가장 힘들지만, 다 함께 고생을 나누기에 동기(동제) 형제들과 '전우애'가 싹트기 쉽습니다."
      }
    },
    {
      z:"軍中的生活，和外面的世界很不一樣。時間被切得很細，什麼時候起床、吃飯、出操、睡覺，全都有規定。手機通常會被集中保管，只有特定時間才能使用，剛開始很多人會不習慣。放假回家的時候，穿著軍便服、剃著平頭的年輕人，在客運站或火車站特別顯眼，一看就知道「這個是阿兵哥，正在當兵」。",
      py:"Jūnzhōng de shēnghuó, hé wàimiàn de shìjiè hěn bù yíyàng. Shíjiān bèi qiē de hěn xì, shénme shíhòu qǐchuáng, chīfàn, chū cāo, shuìjiào, quándōu yǒu guīdìng. Shǒujī tōngcháng huì bèi jízhōng bǎoguǎn, zhǐyǒu tèdìng shíjiān cái néng shǐyòng, gāng kāishǐ hěnduō rén huì bù xíguàn. Fàngjià huíjiā de shíhòu, chuānzhe jūnbiànfú, tìzhe píngtóu de niánqīngrén, zài kèyùnzhàn huò huǒchēzhàn tèbié xiǎnyǎn, yí kàn jiù zhīdào “zhège shì ābīnggē, zhèngzài dāng bīng”.",
      m:{
        j:"軍隊の生活は、外の世界とはずいぶん違います。時間は細かく区切られ、何時に起床・食事・訓練・就寝するか、すべて規定があります。スマホはたいてい一括保管され、決められた時間しか使えないので、最初は戸惑う人も多いです。休暇で帰宅するとき、軍の作業服（軍便服）を着て坊主頭の若者は、バスターミナルや駅でひときわ目立ち、ひと目で「これは阿兵哥（兵隊さん）、今まさに兵役中だ」とわかります。",
        e:"Life in the military is quite unlike the outside world. Time is sliced fine: when to wake, eat, drill, and sleep are all regulated. Phones are usually collected and kept together, usable only at set times, which many find hard to get used to at first. When soldiers head home on leave, a young man in fatigues (jūnbiànfú) with a buzz cut stands out at the bus terminal or train station—one glance tells you 'that's an ābīnggē (soldier), currently serving.'",
        k:"군대 생활은 바깥세상과 사뭇 다릅니다. 시간이 잘게 나뉘어 언제 기상, 식사, 훈련, 취침할지 모두 규정이 있습니다. 휴대폰은 보통 한꺼번에 보관되어 정해진 시간에만 쓸 수 있어 처음에는 적응하기 어려운 사람이 많습니다. 휴가로 귀가할 때 군 작업복(군편복)을 입고 빡빡머리를 한 젊은이는 버스 터미널이나 기차역에서 유난히 눈에 띄어, 한눈에 '저 사람은 아빙거(병사), 지금 군 복무 중이구나' 하고 알 수 있습니다."
      }
    },
    {
      z:"對每一個當兵的人來說，最期待的一天，就是「退伍」。退伍代表服役期滿，可以正式脫下軍服，重新回到自由的生活。快退伍的人常被戲稱為「老鳥」，會一天一天倒數，甚至在日曆上把剩下的天數一格一格劃掉。真正退伍的那天，很多人會把軍中用的東西丟掉、大喊一聲，那種重獲自由的心情，是當過兵的人才懂的痛快。",
      py:"Duì měi yí ge dāng bīng de rén lái shuō, zuì qīdài de yì tiān, jiùshì “tuìwǔ”. Tuìwǔ dàibiǎo fúyì qīmǎn, kěyǐ zhèngshì tuōxià jūnfú, chóngxīn huídào zìyóu de shēnghuó. Kuài tuìwǔ de rén cháng bèi xìchēng wéi “lǎoniǎo”, huì yì tiān yì tiān dàoshǔ, shènzhì zài rìlì shàng bǎ shèngxià de tiānshù yì gé yì gé huàdiào. Zhēnzhèng tuìwǔ de nà tiān, hěnduō rén huì bǎ jūnzhōng yòng de dōngxi diūdiào, dàhǎn yì shēng, nà zhǒng chónghuò zìyóu de xīnqíng, shì dāngguo bīng de rén cái dǒng de tòngkuài.",
      m:{
        j:"兵役に就くすべての人にとって、最も待ち望む日が「退伍（除隊）」です。除隊は服役期間の満了を意味し、正式に軍服を脱ぎ、自由な生活に戻れます。除隊間近の人はよく「老鳥（ベテラン兵）」と冗談めかして呼ばれ、一日一日カウントダウンし、カレンダーに残りの日数を一マスずつ消していく人もいます。いよいよ除隊のその日、多くの人は軍で使った物を捨て、大声を上げます。あの自由を取り戻した気持ちは、兵役を経験した者だけが分かる爽快感です。",
        e:"For everyone serving, the most anticipated day is 'discharge' (tuìwǔ). Discharge means the term is complete—you formally take off the uniform and return to a free life. Those near discharge are jokingly called 'old birds' (lǎoniǎo); they count down day by day, some crossing off the remaining days one box at a time on a calendar. On the actual day, many toss out their army-issue things and let out a shout—that feeling of regaining freedom is a rush only those who've served truly understand.",
        k:"군 복무를 하는 모든 사람에게 가장 기다려지는 날은 '전역(퇴오)'입니다. 전역은 복무 기간의 만료를 뜻하며 정식으로 군복을 벗고 자유로운 생활로 돌아갈 수 있습니다. 전역이 임박한 사람은 흔히 '노새(고참병)'라고 농담조로 불리며, 하루하루 카운트다운을 하고 달력에 남은 날짜를 한 칸씩 지워 가는 사람도 있습니다. 마침내 전역하는 그날, 많은 사람이 군에서 쓰던 물건을 버리고 크게 소리를 지릅니다. 그 자유를 되찾은 기분은 군 복무를 겪어 본 사람만이 아는 통쾌함입니다."
      }
    },
    {
      z:"因為幾乎每個男生都當過兵，「當兵的故事」就成了台灣男性之間最好聊的話題之一。聚在一起吃飯喝酒，很容易就聊起「你以前在哪裡當兵？」「抽到什麼籤？」「遇過什麼誇張的學長或長官？」有些人講得眉飛色舞，好像在講當年的英雄事蹟；也有人半開玩笑地說，當兵最大的收穫就是學會「忍耐」和「等待」。這些共同的回憶，成了世代之間的一種默契。",
      py:"Yīnwèi jīhū měi ge nánshēng dōu dāngguo bīng, “dāng bīng de gùshì” jiù chéngle Táiwān nánxìng zhījiān zuì hǎo liáo de huàtí zhī yī. Jù zài yìqǐ chīfàn hējiǔ, hěn róngyì jiù liáoqǐ “nǐ yǐqián zài nǎlǐ dāng bīng?” “chōudào shénme qiān?” “yùguò shénme kuāzhāng de xuézhǎng huò zhǎngguān?” Yǒuxiē rén jiǎng de méifēisèwǔ, hǎoxiàng zài jiǎng dāngnián de yīngxióng shìjì; yě yǒurén bàn kāiwánxiào de shuō, dāng bīng zuìdà de shōuhuò jiùshì xuéhuì “rěnnài” hé “děngdài”. Zhèxiē gòngtóng de huíyì, chéngle shìdài zhījiān de yì zhǒng mòqì.",
      m:{
        j:"ほぼすべての男性が兵役を経験しているため、「兵役の話」は台湾男性のあいだで最も盛り上がる話題の一つです。集まって食事や酒を囲むと、すぐに「昔どこで兵役に就いた？」「どんな籤（配属）を引いた？」「とんでもない先輩や上官に当たった？」という話になります。武勇伝のように得意げに語る人もいれば、半分冗談めかして「兵役で一番身についたのは『我慢』と『待つこと』だ」と言う人もいます。こうした共通の思い出は、世代を超えた一種の暗黙の了解になっています。",
        e:"Because nearly every man has served, 'army stories' are one of the easiest topics to bond over among Taiwanese men. Sit down to eat and drink together and it quickly turns into: 'Where did you serve?' 'What assignment did you draw?' 'Did you run into any outrageous senior or officer?' Some tell it with beaming pride, as if recounting heroic deeds; others half-joke that the biggest thing they gained from service was learning to 'endure' and to 'wait.' These shared memories become a kind of unspoken understanding across generations.",
        k:"거의 모든 남성이 군 복무를 겪었기에 '군대 이야기'는 대만 남성 사이에서 가장 이야기꽃이 피는 화제 중 하나입니다. 모여서 밥 먹고 술 마시면 금세 '예전에 어디서 복무했어?' '무슨 제비(배치)를 뽑았어?' '어떤 어이없는 선임이나 상관을 만났어?' 하는 이야기가 됩니다. 무용담처럼 신나게 이야기하는 사람도 있고, 반쯤 농담으로 '군대에서 가장 크게 얻은 건 참을성과 기다림을 배운 것'이라고 말하는 사람도 있습니다. 이런 공통의 추억은 세대를 넘나드는 일종의 암묵적 이해가 됩니다."
      }
    }
  ],
  vocab:[
    { w:"當兵", zy:"ㄉㄤ ㄅㄧㄥ", py:"dāng bīng", m:{ j:"兵役に就く・軍隊に入る", e:"to serve in the military", k:"군 복무를 하다" } },
    { w:"兵役", zy:"ㄅㄧㄥ ㄧˋ", py:"bīngyì", m:{ j:"兵役", e:"military service", k:"병역" } },
    { w:"義務役", zy:"ㄧˋ ㄨˋ ㄧˋ", py:"yìwùyì", m:{ j:"義務兵役（徴兵）", e:"compulsory/conscript service", k:"의무역·의무 병역" } },
    { w:"新訓", zy:"ㄒㄧㄣ ㄒㄩㄣˋ", py:"xīnxùn", m:{ j:"新兵訓練（新兵訓練センター）", e:"basic training / boot camp", k:"신병 훈련" } },
    { w:"剃頭", zy:"ㄊㄧˋ ㄊㄡˊ", py:"tì tóu", m:{ j:"丸刈りにする・散髪する", e:"to shave one's head", k:"삭발하다·머리를 밀다" } },
    { w:"退伍", zy:"ㄊㄨㄟˋ ㄨˇ", py:"tuìwǔ", m:{ j:"除隊・退役", e:"to be discharged from service", k:"전역·제대" } },
    { w:"阿兵哥", zy:"ㄚ ㄅㄧㄥ ㄍㄜ", py:"ābīnggē", m:{ j:"兵隊さん（親しみを込めた呼び方）", e:"soldier (affectionate term)", k:"병사(친근한 호칭)" } },
    { w:"兵單", zy:"ㄅㄧㄥ ㄉㄢ", py:"bīngdān", m:{ j:"召集令状", e:"draft/conscription notice", k:"소집 영장" } },
    { w:"同梯", zy:"ㄊㄨㄥˊ ㄊㄧ", py:"tóngtī", m:{ j:"同期入隊の仲間", e:"fellow recruit of the same cohort", k:"동기(같이 입대한 사람)" } },
    { w:"軍服", zy:"ㄐㄩㄣ ㄈㄨˊ", py:"jūnfú", m:{ j:"軍服", e:"military uniform", k:"군복" } },
    { w:"出操", zy:"ㄔㄨ ㄘㄠ", py:"chū cāo", m:{ j:"訓練・演習に出る", e:"to go out for drills", k:"훈련을 나가다" } },
    { w:"服役", zy:"ㄈㄨˊ ㄧˋ", py:"fúyì", m:{ j:"兵役に服する・服役する", e:"to serve (a term of duty)", k:"복무하다" } }
  ],
  note:{
    j:"台湾の兵役制度は時代とともに大きく変わってきました。かつては二〜三年と長かった義務役の期間は段階的に短縮され、一時は四か月の『軍事訓練』が中心の時期もありましたが、近年ふたたび一年に延長されました。徴兵の配属先はくじ引き（抽籤）で決まることが多く、陸・海・空のどこに、どんな部隊に行くかは運次第——だから『抽到什麼籤（どんな籤を引いたか）』は当兵トークの定番です。ちなみに兵役があるのは男性で、女性は志願制。徴兵検査の結果によっては『替代役（社会奉仕などで代替する役務）』になる人もいます。",
    e:"Taiwan's conscription system has changed a great deal over time. The once two-to-three-year term was shortened in stages—at one point centered on just four months of 'military training'—but in recent years it was extended back to one year. Assignments are often decided by lottery (chōu qiān), so which branch (army, navy, air force) and which unit you end up in is down to luck—hence 'what lot did you draw?' is a staple of army chat. Note that service applies to men; women serve voluntarily. Depending on the physical exam, some do 'alternative service' (tìdàiyì), fulfilling their duty through civil or social work instead.",
    k:"대만의 징병 제도는 시대에 따라 크게 바뀌어 왔습니다. 한때 2~3년으로 길었던 의무역 기간은 단계적으로 단축되어 4개월 '군사 훈련' 중심이던 시기도 있었지만, 최근 다시 1년으로 연장되었습니다. 배치는 제비뽑기(추첨)로 정해지는 경우가 많아, 육·해·공 어디로, 어떤 부대로 가는지는 운에 달렸습니다—그래서 '무슨 제비를 뽑았어?'는 군대 이야기의 단골 소재입니다. 참고로 병역은 남성에게 해당하며 여성은 지원제입니다. 신체검사 결과에 따라 사회봉사 등으로 대체하는 '대체역(체대역)'을 하는 사람도 있습니다."
  }
},
{
  id:"taiwan-weddings",
  cat:{ j:"教育・社会", e:"Education & Society", k:"교육·사회" },
  zhTitle:"台灣的婚禮：從訂婚到喜宴的禮數",
  title:{ j:"台湾の結婚式——婚約から披露宴までの作法", e:"Taiwan Weddings: Etiquette from Engagement to the Banquet", k:"대만의 결혼식: 약혼부터 피로연까지의 예법" },
  intro:{
    j:"台湾で結婚式（喜宴）に招かれたら、まず戸惑うのが『いくら包めばいいの？』かもしれません。金額に4を避け、偶数で包む——そんな細やかな『礼数（しきたり）』が随所にあります。婚約から結納、迎えの儀式、円卓を囲む披露宴、そして乾杯まで、台湾の結婚をめぐる習わしをのぞいてみましょう。",
    e:"Get invited to a Taiwanese wedding banquet (xǐyàn) and your first puzzle may be: 'How much should I put in the red envelope?' Avoid the number four, give an even amount—such fine points of 'etiquette' (lǐshù) appear at every turn. From engagement and betrothal gifts to the bride-fetching ritual, the round-table banquet, and the toasts, let's peek into the customs surrounding a Taiwanese wedding.",
    k:"대만에서 결혼식(피로연)에 초대받으면 가장 먼저 당황하는 것이 '얼마를 넣어야 하지?'일지 모릅니다. 금액에 4를 피하고 짝수로 넣는다—그런 세세한 '예법(예수)'이 곳곳에 있습니다. 약혼과 예물부터 신부를 맞이하는 의식, 원탁을 둘러싼 피로연, 그리고 건배까지, 대만의 결혼을 둘러싼 관습을 들여다봅시다."
  },
  paras:[
    {
      z:"傳統的台灣婚禮，通常分成兩個階段：先「訂婚」，再「結婚」。訂婚是兩家人正式確認這門親事，男方會準備聘禮和「喜餅」，女方則把喜餅分送給親朋好友，等於昭告大家「我們家女兒要出嫁了」。收到喜餅的人心裡有數，之後就會準備紅包來祝賀。雖然現代很多年輕人把儀式簡化，但訂婚、送喜餅這些環節，還是很多家庭會保留的傳統。",
      py:"Chuántǒng de Táiwān hūnlǐ, tōngcháng fēnchéng liǎng ge jiēduàn: xiān “dìnghūn”, zài “jiéhūn”. Dìnghūn shì liǎng jiā rén zhèngshì quèrèn zhè mén qīnshì, nánfāng huì zhǔnbèi pìnlǐ hé “xǐbǐng”, nǚfāng zé bǎ xǐbǐng fēnsòng gěi qīnpéng hǎoyǒu, děngyú zhāogào dàjiā “wǒmen jiā nǚ'ér yào chūjià le”. Shōudào xǐbǐng de rén xīnlǐ yǒushù, zhīhòu jiù huì zhǔnbèi hóngbāo lái zhùhè. Suīrán xiàndài hěnduō niánqīngrén bǎ yíshì jiǎnhuà, dàn dìnghūn, sòng xǐbǐng zhèxiē huánjié, háishì hěnduō jiātíng huì bǎoliú de chuántǒng.",
      m:{
        j:"伝統的な台湾の結婚は、たいてい二つの段階に分かれます。まず「訂婚（婚約）」、次に「結婚」です。婚約は両家が正式にこの縁談を確認する場で、男性側は結納の品と「喜餅（婚礼用の菓子）」を用意し、女性側はその喜餅を親戚や友人に配ります。これは「うちの娘が嫁ぐことになりました」と皆に知らせる意味を持ちます。喜餅を受け取った人は心得たもので、のちにご祝儀（紅包）を用意して祝います。現代では儀式を簡略化する若者も多いですが、婚約や喜餅を配る習わしは、今も多くの家庭が残す伝統です。",
        e:"A traditional Taiwanese wedding usually splits into two stages: first the 'engagement' (dìnghūn), then the 'wedding' (jiéhūn). The engagement is when the two families formally confirm the match; the groom's side prepares betrothal gifts and 'wedding cakes' (xǐbǐng), which the bride's side distributes to relatives and friends—effectively announcing, 'our daughter is getting married.' Those who receive the cakes take the hint and later prepare a red envelope to offer their congratulations. Though many young people today streamline the rituals, the engagement and the giving of wedding cakes are traditions many families still keep.",
        k:"전통적인 대만의 결혼은 대개 두 단계로 나뉩니다. 먼저 '약혼(정혼)', 그다음 '결혼'입니다. 약혼은 두 집안이 정식으로 이 혼사를 확인하는 자리로, 신랑 측은 예물과 '희병(혼례용 과자)'을 준비하고 신부 측은 그 희병을 친척과 친구에게 나눠 줍니다. 이는 '우리 딸이 시집간다'고 모두에게 알리는 의미입니다. 희병을 받은 사람은 눈치를 채고 나중에 축의금(홍바오)을 준비해 축하합니다. 현대에는 의식을 간소화하는 젊은이도 많지만, 약혼과 희병 나누기 같은 절차는 지금도 많은 가정이 지키는 전통입니다."
      }
    },
    {
      z:"結婚當天，最有畫面感的儀式之一是「迎娶」。新郎會帶著一群兄弟，開著綁上彩帶和花的禮車，浩浩蕩蕩地到新娘家去把新娘接走。到了女方家門口，還常常要通過伴娘們設下的「闖關遊戲」，讓新郎和他的兄弟們做出各種承諾、甚至有點糗的表演，才肯開門讓他見到新娘。整個過程又緊張又好笑，是很多婚禮上最歡樂的橋段。",
      py:"Jiéhūn dàngtiān, zuì yǒu huàmiàngǎn de yíshì zhī yī shì “yíngqǔ”. Xīnláng huì dàizhe yì qún xiōngdì, kāizhe bǎngshàng cǎidài hé huā de lǐchē, hàohàodàngdàng de dào xīnniáng jiā qù bǎ xīnniáng jiēzǒu. Dàole nǚfāng jiā ménkǒu, hái chángcháng yào tōngguò bànniángmen shèxià de “chuǎngguān yóuxì”, ràng xīnláng hé tā de xiōngdìmen zuòchū gèzhǒng chéngnuò, shènzhì yǒudiǎn qiǔ de biǎoyǎn, cái kěn kāimén ràng tā jiàndào xīnniáng. Zhěnggè guòchéng yòu jǐnzhāng yòu hǎoxiào, shì hěnduō hūnlǐ shàng zuì huānlè de qiáoduàn.",
      m:{
        j:"結婚当日、最も絵になる儀式の一つが「迎娶（花嫁を迎えに行くこと）」です。新郎は仲間の男たち（兄弟）を引き連れ、リボンと花で飾った『礼車（花嫁を迎える車）』を連ね、堂々と新婦の家へ花嫁を迎えに行きます。女性側の家の玄関に着くと、たいてい伴娘（ブライズメイド）たちが仕掛けた「闖關遊戲（関門ゲーム）」を突破しなければなりません。新郎とその仲間たちにさまざまな誓いを立てさせ、ちょっと恥ずかしい余興までやらせて、ようやくドアを開けて花嫁に会わせてくれるのです。この一連の流れは緊張感がありつつ笑いも絶えず、多くの結婚式で最も盛り上がる場面です。",
        e:"On the wedding day, one of the most vivid rituals is 'fetching the bride' (yíngqǔ). The groom leads a band of buddies ('brothers') in a motorcade of cars decked with ribbons and flowers, sweeping grandly to the bride's home to bring her back. At the door of the bride's house, the groom often has to clear the 'gate-crashing games' (chuǎngguān) set up by the bridesmaids—making him and his brothers offer all sorts of vows, even do slightly embarrassing stunts, before they'll open the door and let him see the bride. The whole thing is tense and hilarious at once—one of the most joyful segments of many weddings.",
        k:"결혼 당일 가장 그림이 되는 의식 중 하나가 '신부 맞이(영취)'입니다. 신랑은 친구 무리(형제)를 이끌고 리본과 꽃으로 장식한 '예차(신부를 맞이하는 차)'를 줄지어, 당당하게 신부 집으로 신부를 데리러 갑니다. 신부 집 문 앞에 이르면 대개 신부 들러리들이 마련한 '관문 게임(촹관)'을 통과해야 합니다. 신랑과 형제들에게 온갖 맹세를 시키고 조금 민망한 장기까지 시킨 뒤에야 문을 열어 신부를 만나게 해 줍니다. 이 모든 과정은 긴장되면서도 웃음이 끊이지 않아 많은 결혼식에서 가장 즐거운 장면입니다."
      }
    },
    {
      z:"如果你被邀請去參加婚禮，最重要的功課就是準備「紅包」。這裡面有幾條大家心照不宣的禮數：金額一定要是「偶數」，因為好事要成雙，一般常見的是包兩千兩百、三千六、六千六這類數字；而且絕對要避開「四」，因為「四」的發音和「死」很接近，非常不吉利。包紅包的多少，通常也會看你和新人的關係，以及婚宴辦在什麼等級的場地。",
      py:"Rúguǒ nǐ bèi yāoqǐng qù cānjiā hūnlǐ, zuì zhòngyào de gōngkè jiùshì zhǔnbèi “hóngbāo”. Zhè lǐmiàn yǒu jǐ tiáo dàjiā xīnzhàobùxuān de lǐshù: jīn'é yídìng yào shì “ǒushù”, yīnwèi hǎoshì yào chéngshuāng, yìbān chángjiàn de shì bāo liǎngqiān liǎngbǎi, sānqiān liù, liùqiān liù zhè lèi shùzì; érqiě juéduì yào bìkāi “sì”, yīnwèi “sì” de fāyīn hé “sǐ” hěn jiējìn, fēicháng bù jílì. Bāo hóngbāo de duōshǎo, tōngcháng yě huì kàn nǐ hé xīnrén de guānxì, yǐjí hūnyàn bàn zài shénme děngjí de chǎngdì.",
      m:{
        j:"もし結婚式に招かれたら、一番大切な準備は「紅包（ご祝儀袋）」です。ここには皆が暗黙のうちに守る作法がいくつかあります。金額は必ず「偶数」にすること——良いことは対になるべきだからで、よくあるのは二千二百、三千六百、六千六百といった数字。そして「四」は絶対に避けます。「四（sì）」の発音が「死（sǐ）」に近く、非常に縁起が悪いからです。包む金額は、新郎新婦との関係の深さや、披露宴がどのくらいの格の会場で行われるかによっても変わります。",
        e:"If you're invited to a wedding, your most important task is preparing the 'red envelope' (hóngbāo). There are a few unspoken rules of etiquette here: the amount must be 'even,' because good things should come in pairs—common figures are 2,200, 3,600, or 6,600; and you must absolutely avoid 'four,' since 'four' (sì) sounds close to 'death' (sǐ) and is very unlucky. How much you give also depends on your relationship with the couple and on how upscale the banquet venue is.",
        k:"결혼식에 초대받으면 가장 중요한 준비는 '홍바오(축의금 봉투)'입니다. 여기에는 모두가 암묵적으로 지키는 예법이 몇 가지 있습니다. 금액은 반드시 '짝수'로 해야 합니다—좋은 일은 쌍을 이뤄야 하기 때문으로, 흔히 2,200, 3,600, 6,600 같은 숫자를 넣습니다. 그리고 '4'는 절대 피합니다. '4(sì)'의 발음이 '죽을 사(sǐ)'와 가까워 매우 불길하기 때문입니다. 넣는 금액은 신랑 신부와의 관계, 그리고 피로연이 어느 정도 격의 장소에서 열리는지에 따라서도 달라집니다."
      }
    },
    {
      z:"台灣的婚宴形式很多元。有的人在飯店的大廳裡辦，一桌一桌坐得體體面面；也有很多人選擇「辦桌」，也就是在廟埕、空地或自家門口的騎樓，直接搭起棚子、擺上圓桌，請專門的「總鋪師」來現場掌廚。辦桌的菜色澎湃又熱鬧，龍蝦、佛跳牆、大蝦一道道端上桌，親戚鄰居坐滿好幾十桌，充滿濃濃的人情味，是很多台灣人記憶中的婚禮風景。",
      py:"Táiwān de hūnyàn xíngshì hěn duōyuán. Yǒu de rén zài fàndiàn de dàtīng lǐ bàn, yì zhuō yì zhuō zuò de tǐtǐmiànmiàn; yě yǒu hěnduō rén xuǎnzé “bànzhuō”, yějiùshì zài miàochéng, kòngdì huò zìjiā ménkǒu de qílóu, zhíjiē dāqǐ péngzi, bǎishàng yuánzhuō, qǐng zhuānmén de “zǒngpùshī” lái xiànchǎng zhǎngchú. Bànzhuō de càisè péngpài yòu rènào, lóngxiā, fótiàoqiáng, dàxiā yí dào dào duānshàng zhuō, qīnqi línjū zuòmǎn hǎojǐshí zhuō, chōngmǎn nóngnóng de rénqíngwèi, shì hěnduō Táiwānrén jìyì zhōng de hūnlǐ fēngjǐng.",
      m:{
        j:"台湾の披露宴の形はとても多彩です。ホテルの大広間で、円卓ごとに礼儀正しく着席して行う人もいれば、「辦桌（屋外の宴会）」を選ぶ人も多くいます。これは廟の前庭や空き地、自宅前のアーケード（騎樓）に直接テントを張り、円卓を並べ、専門の「総鋪師（宴会料理人）」を招いてその場で調理してもらう形式です。辦桌の料理は豪勢でにぎやかで、伊勢海老、仏跳牆（高級スープ）、大エビと次々に運ばれ、親戚や近所の人が何十卓も埋め尽くし、濃い人情味にあふれます。多くの台湾人の記憶に残る結婚式の風景です。",
        e:"Taiwanese wedding banquets come in many forms. Some hold them in a hotel ballroom, everyone seated table by table in dignified style; many others choose 'bàn zhuō'—an open-air feast set up right in a temple forecourt, an empty lot, or the arcade (qílóu) in front of one's home, with tents pitched, round tables laid out, and a specialist 'master chef' (zǒngpùshī) brought in to cook on site. The 'bàn zhuō' spread is lavish and lively—lobster, 'Buddha Jumps Over the Wall' soup, and big prawns brought out dish after dish—with relatives and neighbors filling dozens of tables, brimming with warm human feeling. It's the wedding scene lodged in many Taiwanese memories.",
        k:"대만의 피로연 형태는 매우 다양합니다. 호텔 대연회장에서 원탁마다 예의 바르게 앉아 여는 사람도 있고, '반좌(야외 잔치)'를 택하는 사람도 많습니다. 이는 사당 앞뜰, 공터, 자기 집 앞 아케이드(치러우)에 직접 천막을 치고 원탁을 늘어놓은 뒤 전문 '총포사(잔치 요리사)'를 불러 현장에서 조리하는 방식입니다. 반좌의 요리는 푸짐하고 떠들썩해서 바닷가재, 불도장(고급 수프), 큰 새우가 잇달아 나오고, 친척과 이웃이 수십 상을 가득 채워 짙은 인정미가 넘칩니다. 많은 대만 사람의 기억에 남은 결혼식 풍경입니다."
      }
    },
    {
      z:"婚宴進行到一半，新郎新娘會換上禮服，開始一桌一桌地「敬酒」。他們端著酒杯，向每一桌的賓客敬酒、道謝，賓客則會回敬祝福的話，像是「白頭偕老」「早生貴子」。有些場合還會有「鬧洞房」的橋段，也就是親友對新人開一些玩笑、出些趣味的題目，把氣氛炒得更熱。等到宴席快結束，新人和雙方父母會站在門口，一一送客、握手道謝，還會回送小禮物或喜糖，讓大家把喜氣帶回家。",
      py:"Hūnyàn jìnxíng dào yíbàn, xīnláng xīnniáng huì huànshàng lǐfú, kāishǐ yì zhuō yì zhuō de “jìngjiǔ”. Tāmen duānzhe jiǔbēi, xiàng měi yì zhuō de bīnkè jìngjiǔ, dàoxiè, bīnkè zé huì huíjìng zhùfú de huà, xiàng shì “báitóu xiélǎo” “zǎoshēng guìzǐ”. Yǒuxiē chǎnghé hái huì yǒu “nào dòngfáng” de qiáoduàn, yějiùshì qīnyǒu duì xīnrén kāi yìxiē wánxiào, chū xiē qùwèi de tímù, bǎ qìfēn chǎo de gèng rè. Děngdào yànxí kuài jiéshù, xīnrén hé shuāngfāng fùmǔ huì zhàn zài ménkǒu, yīyī sòngkè, wòshǒu dàoxiè, hái huì huísòng xiǎo lǐwù huò xǐtáng, ràng dàjiā bǎ xǐqì dài huí jiā.",
      m:{
        j:"披露宴が半ばに差しかかると、新郎新婦は礼服に着替え、円卓を一つひとつ回って「敬酒（挨拶の酒を注ぐこと）」を始めます。杯を手に、各卓の招待客に酒を勧めて感謝を述べると、客のほうも「白頭偕老（共に白髪になるまで）」「早生貴子（早く子宝に恵まれますように）」といった祝福の言葉を返します。場合によっては「鬧洞房（新婚をからかう余興）」もあり、親戚や友人が新郎新婦に冗談を言い、面白いお題を出して、雰囲気をさらに盛り上げます。宴もお開き間近になると、新郎新婦と双方の両親が入口に並び、一人ひとり見送って握手し礼を述べ、小さな引き出物や喜糖（お祝いの飴）を手渡して、皆に幸せのお裾分けを持ち帰ってもらいます。",
        e:"Midway through the banquet, the bride and groom change into formal attire and begin 'toasting' (jìngjiǔ) table by table. Cups in hand, they offer a drink and thanks to the guests at each table, while guests return blessings such as 'grow old together' and 'may you soon have a child.' At some events there's also 'teasing the newlyweds' (nào dòngfáng), where relatives and friends crack jokes and set playful challenges for the couple to heat up the mood further. As the feast winds down, the couple and both sets of parents stand at the door to see each guest off, shaking hands and giving thanks, and hand out small return gifts or 'wedding candy' so everyone can carry the joy home.",
        k:"피로연이 절반에 이르면 신랑 신부는 예복으로 갈아입고 원탁을 하나하나 돌며 '건배 인사(경주)'를 시작합니다. 잔을 들고 각 상의 하객에게 술을 권하며 감사를 전하면, 하객들은 '백년해로' '득남하시길' 같은 축복의 말을 건넵니다. 경우에 따라 '신방 놀리기(나오둥팡)'도 있는데, 친척과 친구가 신랑 신부에게 농담을 하고 재미있는 과제를 내며 분위기를 더욱 달굽니다. 잔치가 끝날 무렵이면 신랑 신부와 양가 부모가 입구에 나란히 서서 하객을 한 명씩 배웅하며 악수하고 감사를 전하고, 작은 답례품이나 '희당(축하 사탕)'을 건네 모두가 기쁨을 집으로 가져가게 합니다."
      }
    }
  ],
  vocab:[
    { w:"訂婚", zy:"ㄉㄧㄥˋ ㄏㄨㄣ", py:"dìnghūn", m:{ j:"婚約する", e:"to get engaged; engagement", k:"약혼하다" } },
    { w:"結婚", zy:"ㄐㄧㄝˊ ㄏㄨㄣ", py:"jiéhūn", m:{ j:"結婚する", e:"to marry; wedding", k:"결혼하다" } },
    { w:"迎娶", zy:"ㄧㄥˊ ㄑㄩˇ", py:"yíngqǔ", m:{ j:"花嫁を迎えに行く儀式", e:"to fetch the bride (ritual)", k:"신부를 맞이하는 의식" } },
    { w:"喜餅", zy:"ㄒㄧˇ ㄅㄧㄥˇ", py:"xǐbǐng", m:{ j:"婚礼用の菓子（親戚友人に配る）", e:"wedding cakes/pastries (given to relatives and friends)", k:"희병(혼례 과자)" } },
    { w:"紅包", zy:"ㄏㄨㄥˊ ㄅㄠ", py:"hóngbāo", m:{ j:"ご祝儀袋・祝い金", e:"red envelope (cash gift)", k:"홍바오(축의금 봉투)" } },
    { w:"禮數", zy:"ㄌㄧˇ ㄕㄨˋ", py:"lǐshù", m:{ j:"礼儀・しきたり・作法", e:"etiquette; proper courtesy", k:"예법·격식" } },
    { w:"婚宴", zy:"ㄏㄨㄣ ㄧㄢˋ", py:"hūnyàn", m:{ j:"結婚披露宴", e:"wedding banquet", k:"결혼 피로연" } },
    { w:"喜宴", zy:"ㄒㄧˇ ㄧㄢˋ", py:"xǐyàn", m:{ j:"祝いの宴・披露宴", e:"wedding feast", k:"경사 잔치·피로연" } },
    { w:"辦桌", zy:"ㄅㄢˋ ㄓㄨㄛ", py:"bàn zhuō", m:{ j:"屋外で開く伝統的な宴会", e:"outdoor banquet (traditional catered feast)", k:"야외에서 여는 전통 잔치" } },
    { w:"總鋪師", zy:"ㄗㄨㄥˇ ㄆㄨˋ ㄕ", py:"zǒngpùshī", m:{ j:"宴会料理を仕切る料理人（台湾語由来）", e:"head banquet chef (from Taiwanese)", k:"잔치 요리를 총괄하는 요리사" } },
    { w:"敬酒", zy:"ㄐㄧㄥˋ ㄐㄧㄡˇ", py:"jìngjiǔ", m:{ j:"（挨拶として）酒を勧める・乾杯する", e:"to offer a toast", k:"술을 권하다·건배하다" } },
    { w:"鬧洞房", zy:"ㄋㄠˋ ㄉㄨㄥˋ ㄈㄤˊ", py:"nào dòngfáng", m:{ j:"新婚夫婦をからかう余興", e:"teasing the newlyweds (wedding-night games)", k:"신방 놀리기(신혼부부 놀리는 여흥)" } }
  ],
  note:{
    j:"紅包の金額は、渡す相手や地域によって『相場』があります。よく言われる目安は、宴席に出席するなら『あなたが食べる分の元は取らせる』のがマナー、というもの。招待状（『紅色炸彈（赤い爆弾）』と冗談で呼ばれます。出費がかさむから！）が届くと、みんな相場を調べて偶数の金額を用意します。ちなみに『偶数がよい』のは結婚などの慶事の話で、お葬式の香典（『白包』）はまったく別の作法になります。喜餅は箱ごと配られることが多く、中華風とクッキー系（西洋風）を選べるセットも人気です。",
    e:"The amount for a red envelope has a 'going rate' that varies by recipient and region. A common rule of thumb: if you attend the banquet, courtesy is to give at least enough to 'cover your seat.' When the invitation arrives—jokingly called a 'red bomb' (hóngsè zhàdàn), because it blows up your budget!—everyone checks the going rate and prepares an even sum. Note that the 'even is good' rule applies to happy occasions like weddings; a funeral condolence gift ('white envelope,' báibāo) follows entirely different rules. Wedding cakes are often given by the box, and sets that let you pick between Chinese-style and Western cookie-style are popular.",
    k:"홍바오 금액은 주는 상대와 지역에 따라 '시세'가 있습니다. 흔히 말하는 기준은, 잔치에 참석한다면 최소한 '내 자리 값은 하는' 것이 예의라는 것입니다. 청첩장이 오면—농담으로 '붉은 폭탄(훙써 자단)'이라 불립니다. 지출이 커지니까요!—모두 시세를 알아보고 짝수 금액을 준비합니다. 참고로 '짝수가 좋다'는 것은 결혼 같은 경사 이야기이고, 장례식 부의금('백봉투', 바이바오)은 완전히 다른 예법을 따릅니다. 희병은 상자째로 나눠 주는 경우가 많고, 중화풍과 서양식 쿠키 중 고를 수 있는 세트도 인기입니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_8 };
