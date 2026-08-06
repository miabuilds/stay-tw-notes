// StayTW Notes — 深度閲讀：都市・地方（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_10 = [
{
  id:"taipei-fast-paced-capital",
  cat:{ j:"都市・地方", e:"Cities & Regions", k:"도시·지역" },
  zhTitle:"台北：快步調的首都",
  title:{ j:"台北：テンポの速い首都", e:"Taipei: The Fast-Paced Capital", k:"타이베이: 빠른 템포의 수도" },
  intro:{
    j:"改札を抜けて捷運（MRT）に乗れば、数分おきに電車が来て、時間どおりに次の街へ運んでくれる——台北はそんな『速さ』の街です。ビルの向こうにはすぐ緑の山が見え、路地に入れば古い喫茶店やカフェが息づく。忙しいのに、どこか落ち着ける。台湾の首都・台北の顔をのぞいてみましょう。",
    e:"Tap through the gate onto the MRT, and a train arrives every few minutes, carrying you on schedule to the next neighborhood—Taipei is a city of speed. Yet just beyond the towers, green mountains rise up, and duck into an alley and you'll find old teahouses and cafés breathing quietly. Busy, yet somehow calming. Let's look at the many faces of Taiwan's capital.",
    k:"개찰구를 지나 지하철(MRT)에 오르면 몇 분마다 열차가 와서 시간에 맞춰 다음 동네로 데려다줍니다—타이베이는 그런 '속도'의 도시입니다. 빌딩 너머로는 곧 초록 산이 보이고, 골목으로 들어서면 오래된 찻집과 카페가 숨 쉬고 있죠. 바쁘지만 어딘가 편안한. 대만의 수도 타이베이의 얼굴을 들여다봅시다."
  },
  paras:[
    {
      z:"台北是台灣的政治、經濟和文化中心，也是很多人對台灣的第一印象。它位在台灣島的北部，被一圈山包圍，中間是平坦的盆地，淡水河從市區旁邊流過。整個大台北地區住了好幾百萬人，白天上班、上學的人潮從四面八方湧進市中心，一到傍晚又慢慢散回郊區，像潮水一樣有規律地來回。",
      py:"Táiběi shì Táiwān de zhèngzhì, jīngjì hé wénhuà zhōngxīn, yěshì hěnduō rén duì Táiwān de dì yī yìnxiàng. Tā wèi zài Táiwān dǎo de běibù, bèi yì quān shān bāowéi, zhōngjiān shì píngtǎn de péndì, Dànshuǐ Hé cóng shìqū pángbiān liúguò. Zhěnggè Dà Táiběi dìqū zhùle hǎojǐ bǎiwàn rén, báitiān shàngbān, shàngxué de réncháo cóng sìmiànbāfāng yǒng jìn shì zhōngxīn, yí dào bàngwǎn yòu mànman sàn huí jiāoqū, xiàng cháoshuǐ yíyàng yǒu guīlǜ de láihuí.",
      m:{
        j:"台北は台湾の政治・経済・文化の中心であり、多くの人が台湾に対して抱く第一印象でもあります。台湾島の北部に位置し、ぐるりと山に囲まれ、真ん中は平らな盆地で、淡水河が市街地のそばを流れています。大台北地区全体には数百万人が暮らし、日中は通勤・通学の人波が四方八方から都心へ押し寄せ、夕方になるとゆっくりと郊外へ戻っていく。まるで潮の満ち引きのように規則正しく行き来します。",
        e:"Taipei is Taiwan's political, economic, and cultural center, and for many people it's their first impression of the island. It sits in the north, ringed by mountains, with a flat basin in the middle and the Tamsui River flowing past the city. The Greater Taipei area is home to several million people; by day, crowds of commuters and students pour into the center from every direction, and by evening they drift back out to the suburbs—an ebb and flow as regular as the tides.",
        k:"타이베이는 대만의 정치·경제·문화 중심이자 많은 사람이 대만에 대해 갖는 첫인상이기도 합니다. 대만섬 북부에 자리해 산으로 빙 둘러싸여 있고, 가운데는 평평한 분지이며 단수이강이 시가지 옆을 흐릅니다. 대(大)타이베이 지역 전체에는 수백만 명이 살고, 낮에는 출근·통학 인파가 사방에서 도심으로 밀려들었다가 저녁이면 천천히 교외로 돌아갑니다. 마치 밀물과 썰물처럼 규칙적으로 오갑니다."
      }
    },
    {
      z:"讓台北的「快」變得可能的，是它的大眾運輸系統，尤其是「捷運」。台北捷運又乾淨又準時，車廂裡不能吃東西、喝飲料，大家在手扶梯上會自動靠右站，把左邊留給趕時間的人。班距短、轉乘方便，加上一張「悠遊卡」就能搭捷運、公車、還能在超商買東西，讓在這座城市移動變得非常順暢。對很多台北人來說，生活是照著捷運的時刻表在走的。",
      py:"Ràng Táiběi de “kuài” biànde kěnéng de, shì tā de dàzhòng yùnshū xìtǒng, yóuqí shì “jiéyùn”. Táiběi jiéyùn yòu gānjìng yòu zhǔnshí, chēxiāng lǐ bùnéng chī dōngxi, hē yǐnliào, dàjiā zài shǒufútī shàng huì zìdòng kào yòu zhàn, bǎ zuǒbiān liú gěi gǎn shíjiān de rén. Bānjù duǎn, zhuǎnchéng fāngbiàn, jiāshàng yì zhāng “Yōuyóukǎ” jiù néng dā jiéyùn, gōngchē, hái néng zài chāoshāng mǎi dōngxi, ràng zài zhè zuò chéngshì yídòng biànde fēicháng shùnchàng. Duì hěnduō Táiběirén lái shuō, shēnghuó shì zhàozhe jiéyùn de shíkèbiǎo zài zǒu de.",
      m:{
        j:"台北の「速さ」を可能にしているのは、その公共交通システム、とりわけ「捷運（MRT）」です。台北MRTは清潔で時間に正確、車内での飲食は禁止、エスカレーターではみんな自然と右側に立ち、急ぐ人のために左側を空けます。運行間隔が短く乗り換えも便利で、しかも「悠遊カード（EasyCard）」一枚でMRTもバスも乗れ、コンビニでの買い物までできる。だからこの街での移動はとてもスムーズです。多くの台北の人にとって、生活はMRTの時刻表に沿って動いているのです。",
        e:"What makes Taipei's speed possible is its public transit, above all the MRT. Taipei's MRT is clean and punctual; eating and drinking are banned in the carriages, and on escalators people automatically stand on the right, leaving the left for those in a hurry. With short intervals and easy transfers—plus a single EasyCard that works on the MRT, buses, and even convenience-store purchases—getting around the city is remarkably smooth. For many Taipei residents, life runs on the MRT timetable.",
        k:"타이베이의 '빠름'을 가능하게 하는 것은 대중교통 시스템, 특히 'MRT(지하철)'입니다. 타이베이 MRT는 깨끗하고 시간이 정확하며 객차 안에서는 음식과 음료가 금지됩니다. 에스컬레이터에서는 모두 자연스럽게 오른쪽에 서서 급한 사람을 위해 왼쪽을 비워 둡니다. 배차 간격이 짧고 환승이 편리하며, '유유카드(이지카드)' 한 장으로 MRT와 버스를 타고 편의점 결제까지 가능해 이 도시에서의 이동이 매우 매끄럽습니다. 많은 타이베이 사람에게 생활은 MRT 시간표를 따라 움직입니다."
      }
    },
    {
      z:"說到台北的地標，最有名的當然是「台北101」。這棟曾經是世界第一高的摩天大樓，形狀像一節一節往上長的竹子，象徵節節高升。它腳下的「信義區」是台北最時髦的地方，百貨公司一間接一間，週末人潮不斷，跨年夜更是幾十萬人擠在這裡，抬頭看101放的煙火，一起倒數迎接新的一年。信義區也是很多國際企業、金融公司的總部所在地，西裝筆挺的上班族在這裡進進出出。",
      py:"Shuōdào Táiběi de dìbiāo, zuì yǒumíng de dāngrán shì “Táiběi Yāolíngyāo”. Zhè dòng céngjīng shì shìjiè dì yī gāo de mótiān dàlóu, xíngzhuàng xiàng yì jié yì jié wǎng shàng zhǎng de zhúzi, xiàngzhēng jiéjié gāoshēng. Tā jiǎoxià de “Xìnyìqū” shì Táiběi zuì shímáo de dìfāng, bǎihuò gōngsī yì jiān jiē yì jiān, zhōumò réncháo búduàn, kuànián yè gèngshì jǐshí wàn rén jǐ zài zhèlǐ, táitóu kàn yāolíngyāo fàng de yānhuǒ, yìqǐ dàoshǔ yíngjiē xīn de yì nián. Xìnyìqū yěshì hěnduō guójì qǐyè, jīnróng gōngsī de zǒngbù suǒzàidì, xīzhuāng bǐtǐng de shàngbānzú zài zhèlǐ jìnjìn chūchū.",
      m:{
        j:"台北のランドマークといえば、最も有名なのはやはり「台北101」でしょう。かつて世界一の高さを誇ったこの超高層ビルは、竹が節を重ねて伸びていくような形をしていて、「節々高升（どんどん昇っていく）」を象徴しています。その足元の「信義区」は台北で最もおしゃれな一帯で、デパートが軒を連ね、週末は人波が絶えません。大晦日には数十万人がここにひしめき、101が打ち上げる花火を見上げ、みんなでカウントダウンして新年を迎えます。信義区は多くの国際企業や金融会社の本社が集まる場所でもあり、スーツをぴしっと着た会社員が行き交います。",
        e:"When it comes to Taipei landmarks, the most famous is of course Taipei 101. This skyscraper—once the tallest building in the world—is shaped like segments of bamboo growing upward, symbolizing steady rise. At its foot lies Xinyi District, Taipei's most fashionable area, where department stores line up one after another and crowds never stop on weekends. On New Year's Eve, hundreds of thousands pack in here to look up at the fireworks launched from 101 and count down to the new year together. Xinyi is also home to the headquarters of many international and financial firms, with sharply dressed office workers streaming in and out.",
        k:"타이베이의 랜드마크라면 가장 유명한 것은 역시 '타이베이 101'입니다. 한때 세계에서 가장 높았던 이 초고층 빌딩은 대나무가 마디마디 위로 자라는 모양으로, '마디마디 높이 오른다'는 의미를 상징합니다. 그 아래 '신이구'는 타이베이에서 가장 세련된 지역으로 백화점이 줄지어 있고 주말이면 인파가 끊이지 않습니다. 새해 전야에는 수십만 명이 이곳에 몰려 101이 쏘아 올리는 불꽃을 올려다보며 함께 카운트다운으로 새해를 맞이합니다. 신이구는 많은 국제 기업과 금융 회사의 본사가 모인 곳이기도 해 정장을 갖춰 입은 직장인들이 드나듭니다."
      }
    },
    {
      z:"不過台北並不是只有高樓和快節奏。往「師大」和「公館」這一帶走，氣氛就完全不一樣了。這裡靠近好幾所大學，街上有很多學生，也有一間又一間的獨立書店、小咖啡館、二手唱片行和便宜的小吃。年輕人喜歡窩在咖啡館裡看書、打電腦、跟朋友聊天，一坐就是一個下午。台北的咖啡館文化非常發達，從連鎖店到只有幾張桌子的個性小店，總能找到一個屬於自己的角落。",
      py:"Búguò Táiběi bìng búshì zhǐyǒu gāolóu hé kuài jiézòu. Wǎng “Shīdà” hé “Gōngguǎn” zhè yídài zǒu, qìfēn jiù wánquán bù yíyàng le. Zhèlǐ kàojìn hǎojǐ suǒ dàxué, jiē shàng yǒu hěnduō xuéshēng, yě yǒu yì jiān yòu yì jiān de dúlì shūdiàn, xiǎo kāfēiguǎn, èrshǒu chàngpiānháng hé piányí de xiǎochī. Niánqīngrén xǐhuān wō zài kāfēiguǎn lǐ kànshū, dǎ diànnǎo, gēn péngyǒu liáotiān, yí zuò jiùshì yí ge xiàwǔ. Táiběi de kāfēiguǎn wénhuà fēicháng fādá, cóng liánsuǒdiàn dào zhǐyǒu jǐ zhāng zhuōzi de gèxìng xiǎodiàn, zǒng néng zhǎodào yí ge shǔyú zìjǐ de jiǎoluò.",
      m:{
        j:"とはいえ、台北には高層ビルと速いテンポだけがあるわけではありません。「師大」や「公館」のあたりへ行くと、雰囲気はがらりと変わります。この一帯はいくつもの大学に近く、街には学生が多く、独立系書店、小さなカフェ、中古レコード店、安い屋台料理が次々と並びます。若者はカフェにこもって本を読んだり、パソコンを打ったり、友達とおしゃべりしたりして、一度座れば午後いっぱい過ごします。台北のカフェ文化はとても発達していて、チェーン店から数席しかない個性的な小さな店まで、いつでも自分だけの居場所を見つけられます。",
        e:"But Taipei isn't only high-rises and fast tempo. Head toward the Shida and Gongguan areas and the mood changes completely. Close to several universities, these streets are full of students, along with one independent bookshop, small café, secondhand record store, and cheap eatery after another. Young people love to curl up in cafés to read, work on laptops, or chat with friends, staying a whole afternoon once they sit down. Taipei's café culture is highly developed—from chains to quirky little places with just a few tables, you can always find a corner to call your own.",
        k:"하지만 타이베이에 고층 빌딩과 빠른 템포만 있는 것은 아닙니다. '스다(사대)'와 '궁관' 일대로 가면 분위기가 완전히 달라집니다. 이곳은 여러 대학과 가까워 거리에 학생이 많고, 독립 서점, 작은 카페, 중고 음반점, 저렴한 먹거리가 줄줄이 이어집니다. 젊은이들은 카페에 틀어박혀 책을 읽거나 노트북을 하거나 친구와 수다를 떨며 한번 앉으면 오후 내내 보냅니다. 타이베이의 카페 문화는 매우 발달해 프랜차이즈부터 테이블 몇 개뿐인 개성 있는 작은 가게까지, 언제나 자기만의 자리를 찾을 수 있습니다."
      }
    },
    {
      z:"台北另一個迷人的地方，是「城市和山離得很近」。從市中心搭捷運再轉個公車，很快就能到「陽明山」，春天看花、冬天泡溫泉；想爬山的話，「象山」離信義區只有幾站，走個二、三十分鐘就能登上稜線，回頭一看，整座台北盆地和101就在腳下。忙碌了一整週的上班族，週末常常一大早就出門，走進山裡呼吸新鮮空氣，讓自己從快步調裡慢下來。",
      py:"Táiběi lìng yí ge mírén de dìfāng, shì “chéngshì hé shān lí de hěn jìn”. Cóng shì zhōngxīn dā jiéyùn zài zhuǎn ge gōngchē, hěn kuài jiù néng dào “Yángmíngshān”, chūntiān kànhuā, dōngtiān pào wēnquán; xiǎng páshān dehuà, “Xiàngshān” lí Xìnyìqū zhǐyǒu jǐ zhàn, zǒu ge èr, sānshí fēnzhōng jiù néng dēngshàng língxiàn, huítóu yí kàn, zhěng zuò Táiběi péndì hé yāolíngyāo jiù zài jiǎoxià. Mánglù le yì zhěng zhōu de shàngbānzú, zhōumò chángcháng yí dàzǎo jiù chūmén, zǒu jìn shān lǐ hūxī xīnxiān kōngqì, ràng zìjǐ cóng kuài jiézòu lǐ màn xiàlái.",
      m:{
        j:"台北のもう一つの魅力は、「街と山がとても近い」ことです。都心からMRTに乗り、バスに乗り換えれば、すぐに「陽明山」へ行けます。春は花を眺め、冬は温泉に浸かる。山に登りたければ「象山」は信義区からわずか数駅、二、三十分ほど歩けば稜線に立て、振り返ると台北盆地全体と101が足元に広がります。一週間忙しく働いた会社員は、週末になると朝早くから出かけ、山に入って新鮮な空気を吸い込み、速いテンポからゆっくりと自分を解き放つのです。",
        e:"Another of Taipei's charms is that the city and the mountains are very close. From downtown, take the MRT and switch to a bus and you'll soon reach Yangmingshan—flowers in spring, hot springs in winter. If you fancy a hike, Elephant Mountain (Xiangshan) is just a few stops from Xinyi; twenty or thirty minutes on foot and you're on the ridge, and when you turn around, the whole Taipei basin and 101 lie at your feet. Office workers who've been busy all week often head out at the crack of dawn on weekends, walking into the hills to breathe fresh air and let themselves slow down from the fast pace.",
        k:"타이베이의 또 다른 매력은 '도시와 산이 아주 가깝다'는 점입니다. 도심에서 MRT를 타고 버스로 갈아타면 금세 '양명산'에 갈 수 있어 봄에는 꽃을 보고 겨울에는 온천을 즐깁니다. 등산을 하고 싶다면 '상산'은 신이구에서 몇 정거장뿐이라 이삼십 분만 걸으면 능선에 올라, 돌아보면 타이베이 분지 전체와 101이 발밑에 펼쳐집니다. 일주일 내내 바쁘게 일한 직장인들은 주말이면 아침 일찍 나가 산으로 들어가 신선한 공기를 마시며 빠른 템포에서 천천히 자신을 내려놓습니다."
      }
    },
    {
      z:"所以台北其實有很多張臉：早上是趕捷運的緊張，中午是信義區的忙碌，傍晚是師大巷子裡的咖啡香，週末又變成山上的悠閒。它步調快，卻不冷漠；擁擠，卻很方便。第一次來的人可能會被它的節奏嚇一跳，但住久了會發現，這座城市總有辦法讓你在快與慢之間，找到自己舒服的方式。這，或許就是台北最迷人的地方。",
      py:"Suǒyǐ Táiběi qíshí yǒu hěnduō zhāng liǎn: zǎoshàng shì gǎn jiéyùn de jǐnzhāng, zhōngwǔ shì Xìnyìqū de mánglù, bàngwǎn shì Shīdà xiàngzi lǐ de kāfēi xiāng, zhōumò yòu biànchéng shān shàng de yōuxián. Tā bùdiào kuài, què bù lěngmò; yōngjǐ, què hěn fāngbiàn. Dì yī cì lái de rén kěnéng huì bèi tā de jiézòu xià yí tiào, dàn zhù jiǔ le huì fāxiàn, zhè zuò chéngshì zǒng yǒu bànfǎ ràng nǐ zài kuài yǔ màn zhījiān, zhǎodào zìjǐ shūfú de fāngshì. Zhè, huòxǔ jiùshì Táiběi zuì mírén de dìfāng.",
      m:{
        j:"だから台北には、実にいくつもの顔があります。朝はMRTに駆け込む緊張、昼は信義区の忙しなさ、夕方は師大の路地に漂うコーヒーの香り、週末は山の上ののんびり。テンポは速いのに冷たくなく、混んでいるのに便利。初めて訪れる人はそのリズムに面食らうかもしれませんが、長く住むと気づきます——この街は、速さと遅さのあいだで、あなたが心地よくいられるやり方を必ず見つけさせてくれる、と。それこそが、台北のいちばんの魅力なのかもしれません。",
        e:"So Taipei really has many faces: the morning tension of catching the MRT, the midday bustle of Xinyi, the aroma of coffee in a Shida alley at dusk, and the leisure of the mountains on weekends. Its pace is fast but not cold, crowded but convenient. First-time visitors may be startled by its rhythm, but live here a while and you'll find that this city always has a way of letting you find your own comfortable balance between fast and slow. That, perhaps, is what makes Taipei most enchanting.",
        k:"그래서 타이베이에는 사실 여러 얼굴이 있습니다. 아침은 MRT에 뛰어드는 긴장, 낮은 신이구의 분주함, 저녁은 스다 골목에 감도는 커피 향, 주말은 산 위의 여유. 템포는 빠르지만 차갑지 않고, 붐비지만 편리합니다. 처음 온 사람은 그 리듬에 놀랄지 모르지만 오래 살다 보면 알게 됩니다—이 도시는 빠름과 느림 사이에서 당신이 편안할 방법을 늘 찾게 해 준다는 것을. 그것이 바로 타이베이의 가장 큰 매력일지도 모릅니다."
      }
    }
  ],
  vocab:[
    { w:"首都", zy:"ㄕㄡˇ ㄉㄨ", py:"shǒudū", m:{ j:"首都", e:"capital city", k:"수도" } },
    { w:"捷運", zy:"ㄐㄧㄝˊ ㄩㄣˋ", py:"jiéyùn", m:{ j:"MRT・都市鉄道（台湾での呼称）", e:"MRT / metro (Taiwan term)", k:"MRT·도시철도(대만식 명칭)" } },
    { w:"悠遊卡", zy:"ㄧㄡ ㄧㄡˊ ㄎㄚˇ", py:"Yōuyóukǎ", m:{ j:"悠遊カード（交通ICカード、EasyCard）", e:"EasyCard (transit IC card)", k:"유유카드(교통 IC카드, 이지카드)" } },
    { w:"盆地", zy:"ㄆㄣˊ ㄉㄧˋ", py:"péndì", m:{ j:"盆地", e:"basin", k:"분지" } },
    { w:"摩天大樓", zy:"ㄇㄛˊ ㄊㄧㄢ ㄉㄚˋ ㄌㄡˊ", py:"mótiān dàlóu", m:{ j:"超高層ビル", e:"skyscraper", k:"초고층 빌딩" } },
    { w:"信義區", zy:"ㄒㄧㄣˋ ㄧˋ ㄑㄩ", py:"Xìnyìqū", m:{ j:"信義区（台北の繁華街・ビジネス街）", e:"Xinyi District (Taipei's downtown)", k:"신이구(타이베이 번화가·비즈니스 구역)" } },
    { w:"跨年", zy:"ㄎㄨㄚˋ ㄋㄧㄢˊ", py:"kuànián", m:{ j:"年越し・カウントダウン", e:"New Year's Eve countdown", k:"새해맞이·카운트다운" } },
    { w:"獨立書店", zy:"ㄉㄨˊ ㄌㄧˋ ㄕㄨ ㄉㄧㄢˋ", py:"dúlì shūdiàn", m:{ j:"独立系書店", e:"independent bookshop", k:"독립 서점" } },
    { w:"咖啡館", zy:"ㄎㄚ ㄈㄟ ㄍㄨㄢˇ", py:"kāfēiguǎn", m:{ j:"カフェ・喫茶店", e:"café", k:"카페" } },
    { w:"溫泉", zy:"ㄨㄣ ㄑㄩㄢˊ", py:"wēnquán", m:{ j:"温泉", e:"hot spring", k:"온천" } },
    { w:"稜線", zy:"ㄌㄥˊ ㄒㄧㄢˋ", py:"língxiàn", m:{ j:"稜線・尾根", e:"mountain ridge", k:"능선" } },
    { w:"步調", zy:"ㄅㄨˋ ㄉㄧㄠˋ", py:"bùdiào", m:{ j:"ペース・テンポ", e:"pace, tempo", k:"보조·템포" } }
  ],
  note:{
    j:"台北101は年越しの花火で世界的に有名ですが、実は超高速エレベーターでも知られ、地下1階から89階の展望台まで約37秒で駆け上がります。また、揺れを抑えるために上層階に巨大な金色の『マスダンパー（制震装置）』の球が吊るされ、観光名所として見学できるのも面白いところ。台北で『山が近い』のは偶然ではなく、市街地がぐるりと山に囲まれた盆地にあるためで、夏は熱がこもって蒸し暑くなりやすい一因にもなっています。",
    e:"Taipei 101 is world-famous for its New Year's fireworks, but it's also known for ultra-fast elevators that whisk you from B1 to the 89th-floor observatory in about 37 seconds. To counter swaying, a giant golden 'tuned mass damper'—a huge suspended ball—hangs near the top and can be viewed as a tourist attraction. Taipei's closeness to mountains is no accident: the city lies in a basin ringed by hills, which is also part of why summers can feel hot and muggy as heat gets trapped.",
    k:"타이베이 101은 새해 불꽃놀이로 세계적으로 유명하지만, 지하 1층에서 89층 전망대까지 약 37초 만에 오르는 초고속 엘리베이터로도 알려져 있습니다. 흔들림을 줄이기 위해 상층부에 거대한 금색 '동조질량감쇠기(제진 장치)' 공이 매달려 있어 관광 명소로 볼 수 있는 점도 흥미롭습니다. 타이베이가 '산과 가까운' 것은 우연이 아니라 시가지가 산으로 둘러싸인 분지에 있기 때문이며, 여름에 열이 갇혀 후텁지근해지기 쉬운 한 원인이기도 합니다."
  }
},
{
  id:"tainan-slow-old-capital",
  cat:{ j:"都市・地方", e:"Cities & Regions", k:"도시·지역" },
  zhTitle:"台南：慢活的古都與美食",
  title:{ j:"台南：スローライフの古都とグルメ", e:"Tainan: The Slow-Living Old Capital and Its Food", k:"타이난: 느린 삶의 옛 수도와 미식" },
  intro:{
    j:"朝、まだ涼しいうちに一杯の牛肉湯（牛肉スープ）から一日が始まり、路地を曲がれば四百年前の廟に行き当たる——台南は、時間の流れが少しゆっくりな街です。台湾で最も古い都であり、『食の都』とも呼ばれるこの街の、のんびりとした魅力と美味しさをのぞいてみましょう。",
    e:"The day begins, while it's still cool, with a bowl of beef soup, and turn a corner into an alley and you'll run into a four-hundred-year-old temple—Tainan is a city where time flows a little more slowly. Let's explore the easygoing charm and delicious flavors of Taiwan's oldest capital, also known as its 'food capital.'",
    k:"아침, 아직 선선할 때 한 그릇의 소고기탕으로 하루가 시작되고, 골목을 돌면 사백 년 된 사당과 마주칩니다—타이난은 시간이 조금 천천히 흐르는 도시입니다. 대만에서 가장 오래된 수도이자 '미식의 도시'라 불리는 이 도시의 느긋한 매력과 맛을 들여다봅시다."
  },
  paras:[
    {
      z:"台南位在台灣的西南部，是台灣歷史最悠久的城市，也曾經是台灣的首都。四百多年前，這裡就是漢人和外來勢力最早開發的地方，留下了大量的廟宇、老街和古蹟。走在台南的街道上，你會發現這座城市沒有那麼多高樓，取而代之的是低矮的老房子、紅磚牆和樹蔭。這裡的生活步調明顯比台北慢，人們說話的口氣也比較溫和、比較有人情味。",
      py:"Táinán wèi zài Táiwān de xīnán bù, shì Táiwān lìshǐ zuì yōujiǔ de chéngshì, yě céngjīng shì Táiwān de shǒudū. Sìbǎi duō nián qián, zhèlǐ jiùshì hànrén hé wàilái shìlì zuìzǎo kāifā de dìfāng, liúxià le dàliàng de miàoyǔ, lǎojiē hé gǔjī. Zǒu zài Táinán de jiēdào shàng, nǐ huì fāxiàn zhè zuò chéngshì méiyǒu nàme duō gāolóu, qǔ'érdàizhī de shì dī'ǎi de lǎofángzi, hóngzhuān qiáng hé shùyìn. Zhèlǐ de shēnghuó bùdiào míngxiǎn bǐ Táiběi màn, rénmen shuōhuà de kǒuqì yě bǐjiào wēnhé, bǐjiào yǒu rénqíngwèi.",
      m:{
        j:"台南は台湾の南西部に位置し、台湾で最も歴史の古い都市であり、かつては台湾の首都でもありました。四百年あまり前、この地は漢人や外来勢力が最も早く開拓した場所で、数多くの廟、古い街並み、史跡を残しています。台南の街を歩くと、この街には高層ビルがそれほど多くなく、代わりに背の低い古い家並み、赤レンガの壁、木陰があることに気づくでしょう。ここの生活のテンポは台北より明らかにゆっくりで、人々の話し方も穏やかで人情味があります。",
        e:"Tainan lies in southwestern Taiwan and is the island's oldest city, and it was once Taiwan's capital. More than four hundred years ago, this was among the first places developed by Han settlers and outside powers, leaving behind a wealth of temples, old streets, and historic sites. Walk through Tainan and you'll notice there aren't many tall buildings—instead there are low old houses, red-brick walls, and tree shade. The pace of life here is clearly slower than in Taipei, and people speak in a gentler, warmer tone.",
        k:"타이난은 대만 남서부에 자리한, 대만에서 가장 오래된 도시이며 한때 대만의 수도이기도 했습니다. 사백여 년 전 이곳은 한족과 외래 세력이 가장 먼저 개척한 곳으로, 수많은 사당, 옛 거리, 고적을 남겼습니다. 타이난 거리를 걷다 보면 이 도시에 고층 빌딩이 그리 많지 않고, 대신 낮은 옛집, 붉은 벽돌 담, 나무 그늘이 있음을 알게 됩니다. 이곳의 생활 템포는 타이베이보다 확연히 느리고, 사람들의 말투도 부드럽고 인정미가 있습니다."
      }
    },
    {
      z:"台南被稱為「古都」，最主要就是因為這裡的古蹟和廟宇特別多。像是「赤崁樓」和「安平古堡」，都是四百年前留下來的歷史建築；「孔廟」是全台灣最早的官方學校，紅牆綠瓦，安靜莊嚴。台南人的生活跟廟宇緊緊連在一起，大大小小的廟就藏在住宅巷弄之間，逢年過節有熱鬧的祭典和遶境，平常則是居民聊天、乘涼、拜拜的地方。",
      py:"Táinán bèi chēngwéi “gǔdū”, zuì zhǔyào jiùshì yīnwèi zhèlǐ de gǔjī hé miàoyǔ tèbié duō. Xiàngshì “Chìkǎnlóu” hé “Ānpíng Gǔbǎo”, dōu shì sìbǎi nián qián liú xiàlái de lìshǐ jiànzhú; “Kǒngmiào” shì quán Táiwān zuìzǎo de guānfāng xuéxiào, hóngqiáng lǜwǎ, ānjìng zhuāngyán. Táinánrén de shēnghuó gēn miàoyǔ jǐnjǐn lián zài yìqǐ, dàdàxiǎoxiǎo de miào jiù cáng zài zhùzhái xiànglòng zhījiān, féngnián guòjié yǒu rènào de jìdiǎn hé ràojìng, píngcháng zé shì jūmín liáotiān, chéngliáng, bàibài de dìfāng.",
      m:{
        j:"台南が「古都」と呼ばれるのは、何よりここに史跡や廟が特に多いからです。「赤崁楼」や「安平古堡」は四百年前から残る歴史的建造物であり、「孔廟」は台湾で最も古い官営の学校で、赤い壁に緑の瓦、静かで荘厳です。台南の人々の暮らしは廟と固く結びついていて、大小さまざまな廟が住宅街の路地の間に隠れています。年中行事や祭りの時期には賑やかな祭典や遶境（神輿の巡行）が行われ、普段は住民がおしゃべりをし、涼み、お参りをする場所になっています。",
        e:"Tainan is called the 'old capital' mainly because it has especially many historic sites and temples. Chihkan Tower and Anping Fort are historic structures that have survived for four hundred years, and the Confucius Temple is Taiwan's earliest official school—red walls, green tiles, quiet and dignified. Life for Tainan people is tightly bound up with temples; shrines large and small are tucked between residential alleys, hosting lively festivals and deity processions on holidays, and serving as places where residents chat, cool off, and pray on ordinary days.",
        k:"타이난이 '옛 수도'라 불리는 것은 무엇보다 이곳에 고적과 사당이 특히 많기 때문입니다. '적감루'와 '안핑구바오(안핑 옛 성)'는 사백 년 전부터 남은 역사 건축물이며, '공묘(공자 사당)'는 대만에서 가장 오래된 관립 학교로 붉은 벽에 푸른 기와, 고요하고 장엄합니다. 타이난 사람들의 삶은 사당과 단단히 얽혀 있어 크고 작은 사당이 주택가 골목 사이에 숨어 있습니다. 명절과 축제 때는 떠들썩한 제전과 요경(신을 모신 행렬 순행)이 열리고, 평소에는 주민들이 이야기하고 더위를 식히며 참배하는 곳이 됩니다."
      }
    },
    {
      z:"不過，讓最多人專程來台南的，還是「吃」。台南被公認是台灣的「美食之都」，很多小吃甚至就是在這裡發源的。清晨的「牛肉湯」是台南人的招牌早餐：把切得薄薄的溫體牛肉放進碗裡，直接沖入滾燙的高湯，肉一下子就變成粉嫩的顏色，再配一碗肉燥飯，就是完美的一天開始。「擔仔麵」則是用蝦頭熬湯，麵上放一小匙肉燥和一隻蝦，份量不大，卻濃縮了台南味道的精華。",
      py:"Búguò, ràng zuìduō rén zhuānchéng lái Táinán de, háishì “chī”. Táinán bèi gōngrèn shì Táiwān de “měishí zhī dū”, hěnduō xiǎochī shènzhì jiùshì zài zhèlǐ fāyuán de. Qīngchén de “niúròu tāng” shì Táinánrén de zhāopái zǎocān: bǎ qiē de báobáo de wēntǐ niúròu fàng jìn wǎn lǐ, zhíjiē chōng rù gǔntàng de gāotāng, ròu yíxiàzi jiù biànchéng fěnnèn de yánsè, zài pèi yì wǎn ròuzào fàn, jiùshì wánměi de yì tiān kāishǐ. “Dānzǐ miàn” zé shì yòng xiātóu áo tāng, miàn shàng fàng yì xiǎo chí ròuzào hé yì zhī xiā, fènliàng bú dà, què nóngsuō le Táinán wèidào de jīnghuá.",
      m:{
        j:"とはいえ、最も多くの人がわざわざ台南を訪れる理由は、やはり「食」です。台南は台湾の「グルメの都」と広く認められ、多くの屋台料理はここが発祥です。早朝の「牛肉湯（牛肉スープ）」は台南人の看板朝食。薄く切った新鮮な牛肉を碗に入れ、そこへ熱々のスープを直接注ぐと、肉は一瞬で淡いピンク色に変わります。それに「肉燥飯（肉そぼろご飯）」を一杯添えれば、完璧な一日の始まりです。「担仔麺」はエビの頭で出汁を取り、麺の上に肉そぼろ一さじとエビ一尾をのせる。量は多くないのに、台南の味の真髄がぎゅっと凝縮されています。",
        e:"Still, what draws the most people to Tainan on purpose is the food. Tainan is widely acknowledged as Taiwan's 'food capital,' and many local snacks originated right here. Early-morning beef soup is a signature Tainan breakfast: thinly sliced fresh (never frozen) beef is placed in a bowl and scalding broth is poured straight over it, turning the meat a tender pink in an instant; add a bowl of minced-pork rice and you have a perfect start to the day. Danzai noodles use a broth simmered from shrimp heads, topped with a small spoon of minced pork and a single shrimp—modest in size, yet a concentrated essence of Tainan flavor.",
        k:"그래도 가장 많은 사람이 일부러 타이난을 찾는 이유는 역시 '먹거리'입니다. 타이난은 대만의 '미식의 도시'로 널리 인정받고, 많은 먹거리가 바로 이곳에서 유래했습니다. 새벽의 '소고기탕'은 타이난 사람의 대표 아침 식사입니다. 얇게 썬 신선한(냉동하지 않은) 소고기를 그릇에 담고 펄펄 끓는 육수를 바로 부으면 고기가 순식간에 연분홍빛으로 변합니다. 여기에 '러우자오판(고기 소보로 덮밥)' 한 그릇을 곁들이면 완벽한 하루의 시작입니다. '단자이몐'은 새우 머리로 육수를 내고 면 위에 고기 소보로 한 숟갈과 새우 한 마리를 올립니다. 양은 많지 않아도 타이난 맛의 정수가 응축돼 있습니다."
      }
    },
    {
      z:"台南的美食清單長得數不完。「碗粿」是把在來米漿蒸成軟嫩的糕，裡面包著肉、蛋黃和香菇，淋上特製的醬汁，鹹香又滑順；「蝦捲」把新鮮蝦漿裹起來下鍋油炸，外酥內軟，是安平一帶的招牌；還有「棺材板」、「鱔魚意麵」、「虱目魚粥」、各式各樣的豆花和芒果冰……幾乎每一條老街，都藏著一兩間排隊的名店。很多店只賣半天，賣完就收，想吃還得早點起床。",
      py:"Táinán de měishí qīngdān cháng de shǔ bù wán. “Wǎnguǒ” shì bǎ zàiláimǐ jiāng zhēng chéng ruǎnnèn de gāo, lǐmiàn bāozhe ròu, dànhuáng hé xiānggū, lín shàng tèzhì de jiàngzhī, xiánxiāng yòu huáshùn; “xiājuǎn” bǎ xīnxiān xiā jiāng guǒ qǐlái xià guō yóuzhá, wài sū nèi ruǎn, shì Ānpíng yídài de zhāopái; háiyǒu “guāncaibǎn”, “shànyú yìmiàn”, “shīmùyú zhōu”, gèshì gèyàng de dòuhuā hé mángguǒ bīng…… jīhū měi yì tiáo lǎojiē, dōu cángzhe yì liǎng jiān páiduì de míngdiàn. Hěnduō diàn zhǐ mài bàntiān, mài wán jiù shōu, xiǎng chī hái děi zǎodiǎn qǐchuáng.",
      m:{
        j:"台南のグルメリストは数え切れないほど長い。「碗粿（ワーグエ）」はうるち米の粉を蒸した柔らかい餅で、中に肉、卵黄、しいたけを包み、特製のタレをかける。塩気があり香ばしく、なめらかです。「蝦捲（エビ巻き）」は新鮮なエビのすり身を包んで揚げたもので、外はサクサク中はふんわり、安平一帯の名物です。ほかにも「棺材板（かんおけパン）」「鱔魚意麺（タウナギの炒め麺）」「虱目魚粥（サバヒーの粥）」、さまざまな豆花（トウファ）やマンゴーかき氷……ほぼどの古い通りにも、行列のできる名店が一、二軒隠れています。多くの店は半日しか営業せず、売り切れれば店じまい。食べたければ早起きが必要です。",
        e:"Tainan's food list is endless. Wa-gui (savory rice pudding) is soft steamed rice-flour cake filled with pork, egg yolk, and mushroom, drizzled with a special sauce—savory, fragrant, and smooth. Shrimp rolls wrap fresh shrimp paste and deep-fry it, crisp outside and tender within, a specialty of the Anping area. There's also 'coffin bread,' eel yi-mian noodles, milkfish congee, and all sorts of douhua (tofu pudding) and mango shaved ice. Almost every old street hides a famous shop or two with a queue. Many places open only half a day and close once they sell out, so if you want to eat, you'll need to get up early.",
        k:"타이난의 미식 목록은 셀 수 없이 깁니다. '완궈(짭짤한 쌀 푸딩)'는 멥쌀 반죽을 쪄서 부드럽게 만든 떡으로, 안에 고기, 노른자, 표고버섯을 넣고 특제 소스를 뿌립니다. 짭짤하고 고소하며 매끄럽죠. '샤쥐안(새우롤)'은 신선한 새우 반죽을 싸서 튀긴 것으로 겉은 바삭 속은 부드러워 안핑 일대의 명물입니다. 이 밖에도 '관차이반(관 모양 빵)', '드렁허리 이몐', '밀크피시 죽', 각양각색의 더우화(두부 푸딩)와 망고 빙수까지…거의 모든 옛 거리에 줄 서는 유명 가게가 한두 곳 숨어 있습니다. 많은 가게가 반나절만 영업하고 다 팔리면 문을 닫아, 먹으려면 일찍 일어나야 합니다."
      }
    },
    {
      z:"外地人來台南吃東西，常常會發現一件事：這裡的食物「偏甜」。就連炒麵、肉燥、滷味，都會帶一點甜味。關於為什麼台南這麼愛甜，有很多說法：有人說是因為以前台南是產糖的地方，糖很便宜；也有人說，甜代表待客的大方和誠意。不管原因是什麼，這股淡淡的甜，已經成為台南料理最鮮明的個性，是別的城市模仿不來的味道。",
      py:"Wàidìrén lái Táinán chī dōngxi, chángcháng huì fāxiàn yí jiàn shì: zhèlǐ de shíwù “piān tián”. Jiù lián chǎomiàn, ròuzào, lǔwèi, dōu huì dài yìdiǎn tiánwèi. Guānyú wèishénme Táinán zhème ài tián, yǒu hěnduō shuōfǎ: yǒurén shuō shì yīnwèi yǐqián Táinán shì chǎn táng de dìfāng, táng hěn piányí; yě yǒurén shuō, tián dàibiǎo dàikè de dàfāng hé chéngyì. Bùguǎn yuányīn shì shénme, zhè gǔ dàndàn de tián, yǐjīng chéngwéi Táinán liàolǐ zuì xiānmíng de gèxìng, shì biéde chéngshì mófǎng bù lái de wèidào.",
      m:{
        j:"よその土地から台南へ食べに来た人は、よくあることに気づきます——ここの食べ物は「甘め」なのです。炒麺も、肉そぼろも、煮込み（滷味）でさえ、少し甘みを帯びています。なぜ台南がこれほど甘さを好むのかには諸説あります。昔の台南は砂糖の産地で糖が安かったからという人もいれば、甘さは客をもてなす気前のよさと誠意の表れだという人もいます。理由が何であれ、この淡い甘さはすでに台南料理の最も際立った個性となっていて、ほかの街には真似のできない味です。",
        e:"Visitors who come to eat in Tainan often notice one thing: the food here tends to be sweet. Even fried noodles, minced pork, and braised dishes carry a hint of sweetness. There are many theories about why Tainan loves sweetness so much: some say it's because Tainan used to produce sugar, which was cheap; others say sweetness signals generosity and sincerity toward guests. Whatever the reason, that faint sweetness has become the most distinctive character of Tainan cuisine—a flavor other cities can't imitate.",
        k:"외지에서 타이난으로 먹으러 온 사람은 흔히 한 가지를 알아챕니다—이곳 음식은 '단맛이 강한' 편입니다. 볶음면도, 고기 소보로도, 조림(루웨이)도 약간의 단맛을 띱니다. 타이난이 왜 이렇게 단맛을 좋아하는지에 대해선 여러 설이 있습니다. 옛날 타이난이 설탕 산지여서 설탕이 저렴했기 때문이라는 사람도 있고, 단맛이 손님을 대접하는 넉넉함과 정성을 뜻한다는 사람도 있습니다. 이유가 무엇이든 이 은은한 단맛은 이미 타이난 요리의 가장 뚜렷한 개성이 되었고, 다른 도시가 흉내 낼 수 없는 맛입니다."
      }
    },
    {
      z:"在台南待上幾天，你會慢慢明白這座城市的哲學：不用急。早上悠閒地吃一碗牛肉湯，中午在老屋改建的咖啡館躲太陽，傍晚到廟埕散步、看夕陽，晚上再到夜市吃一輪。時間在這裡好像變慢了，人和人之間的距離也變近了。如果台北代表台灣的速度，那台南就代表台灣的溫度——它提醒你，好好吃飯、好好過日子，本身就是一件值得認真對待的事。",
      py:"Zài Táinán dāi shàng jǐ tiān, nǐ huì mànman míngbái zhè zuò chéngshì de zhéxué: búyòng jí. Zǎoshàng yōuxián de chī yì wǎn niúròu tāng, zhōngwǔ zài lǎowū gǎijiàn de kāfēiguǎn duǒ tàiyáng, bàngwǎn dào miàochéng sànbù, kàn xìyáng, wǎnshàng zài dào yèshì chī yì lún. Shíjiān zài zhèlǐ hǎoxiàng biàn màn le, rén hé rén zhījiān de jùlí yě biàn jìn le. Rúguǒ Táiběi dàibiǎo Táiwān de sùdù, nà Táinán jiù dàibiǎo Táiwān de wēndù——tā tíxǐng nǐ, hǎohǎo chīfàn, hǎohǎo guò rìzi, běnshēn jiùshì yí jiàn zhídé rènzhēn duìdài de shì.",
      m:{
        j:"台南に数日滞在すると、この街の哲学が少しずつわかってきます——焦らなくていい。朝はのんびり牛肉湯を一杯食べ、昼は古民家を改装したカフェで日差しを避け、夕方は廟の前庭を散歩して夕日を眺め、夜はまた夜市を一巡り。ここでは時間がゆっくり流れているようで、人と人との距離も近くなります。台北が台湾の「速度」を象徴するなら、台南は台湾の「温度」を象徴する——ちゃんとご飯を食べ、ちゃんと日々を暮らすこと自体が、真剣に向き合う価値のあることなのだと、そっと思い出させてくれるのです。",
        e:"Spend a few days in Tainan and you'll gradually grasp the city's philosophy: no need to rush. Have a leisurely bowl of beef soup in the morning, hide from the sun in a café built inside an old house at noon, stroll the temple forecourt and watch the sunset at dusk, and make a round of the night market in the evening. Time seems to slow here, and the distance between people shrinks too. If Taipei represents Taiwan's speed, Tainan represents its warmth—a gentle reminder that eating well and living well are, in themselves, things worth taking seriously.",
        k:"타이난에서 며칠 머물면 이 도시의 철학을 조금씩 알게 됩니다—서두를 필요 없다. 아침엔 느긋하게 소고기탕 한 그릇을 먹고, 낮엔 옛집을 개조한 카페에서 햇볕을 피하며, 저녁엔 사당 앞뜰을 거닐며 노을을 보고, 밤엔 다시 야시장을 한 바퀴 돕니다. 이곳에선 시간이 천천히 흐르는 듯하고 사람과 사람 사이의 거리도 가까워집니다. 타이베이가 대만의 '속도'를 상징한다면 타이난은 대만의 '온도'를 상징합니다—밥을 잘 챙겨 먹고 하루하루를 잘 사는 것 자체가 진지하게 대할 가치가 있는 일임을 살며시 일깨워 줍니다."
      }
    }
  ],
  vocab:[
    { w:"古都", zy:"ㄍㄨˇ ㄉㄨ", py:"gǔdū", m:{ j:"古都・古い都", e:"old / ancient capital", k:"옛 수도·고도" } },
    { w:"古蹟", zy:"ㄍㄨˇ ㄐㄧ", py:"gǔjī", m:{ j:"史跡・古い遺跡や建造物", e:"historic site / monument", k:"고적·유적" } },
    { w:"廟宇", zy:"ㄇㄧㄠˋ ㄩˇ", py:"miàoyǔ", m:{ j:"廟・寺社", e:"temples", k:"사당·묘우" } },
    { w:"牛肉湯", zy:"ㄋㄧㄡˊ ㄖㄡˋ ㄊㄤ", py:"niúròu tāng", m:{ j:"牛肉スープ（台南の名物朝食）", e:"beef soup (Tainan breakfast specialty)", k:"소고기탕(타이난 명물 아침식사)" } },
    { w:"擔仔麵", zy:"ㄉㄢ ㄗˇ ㄇㄧㄢˋ", py:"dānzǐ miàn", m:{ j:"担仔麺（エビ出汁の小さな麺料理）", e:"danzai noodles (shrimp-broth noodles)", k:"단자이몐(새우 육수 국수)" } },
    { w:"肉燥飯", zy:"ㄖㄡˋ ㄗㄠˋ ㄈㄢˋ", py:"ròuzào fàn", m:{ j:"肉そぼろご飯", e:"minced-pork rice", k:"고기 소보로 덮밥" } },
    { w:"碗粿", zy:"ㄨㄢˇ ㄍㄨㄛˇ", py:"wǎnguǒ", m:{ j:"碗粿（米粉を蒸した塩味の餅料理）", e:"wa-gui (savory steamed rice pudding)", k:"완궈(쌀 반죽 짭짤한 찜)" } },
    { w:"蝦捲", zy:"ㄒㄧㄚ ㄐㄩㄢˇ", py:"xiājuǎn", m:{ j:"エビ巻き（揚げ物）", e:"shrimp roll (deep-fried)", k:"새우롤(튀김)" } },
    { w:"虱目魚", zy:"ㄕ ㄇㄨˋ ㄩˊ", py:"shīmùyú", m:{ j:"サバヒー（ミルクフィッシュ）", e:"milkfish", k:"밀크피시" } },
    { w:"小吃", zy:"ㄒㄧㄠˇ ㄔ", py:"xiǎochī", m:{ j:"屋台料理・軽食（B級グルメ）", e:"local snacks / street food", k:"먹거리·분식" } },
    { w:"偏甜", zy:"ㄆㄧㄢ ㄊㄧㄢˊ", py:"piān tián", m:{ j:"やや甘め・甘い傾向がある", e:"tends to be sweet", k:"단맛이 강한 편" } },
    { w:"慢活", zy:"ㄇㄢˋ ㄏㄨㄛˊ", py:"mànhuó", m:{ j:"スローライフ", e:"slow living", k:"느린 삶·슬로 라이프" } }
  ],
  note:{
    j:"台南の『牛肉湯』が美味しいのは、近くで牛が育てられ、朝しめたばかりの『温体牛（冷凍していない新鮮な牛肉）』をその日のうちに使うから、と言われます。だから牛肉湯の名店は早朝から開き、昼前には売り切れることも珍しくありません。また台南では2010年まで長く『台南市』と『台南県』に分かれていましたが、現在は合併して一つの直轄市になっています。『食は台南にあり』という言葉があるほど、地元の人の食へのこだわりとプライドは格別です。",
    e:"Tainan's beef soup is said to taste so good because cattle are raised nearby and 'warm' (never frozen, freshly slaughtered) beef is used the same morning. That's why famous beef-soup shops open at dawn and often sell out before noon. Tainan was long split into 'Tainan City' and 'Tainan County' until 2010, when they merged into a single special municipality. There's even a saying, 'For food, go to Tainan'—locals' devotion to and pride in their cuisine is exceptional.",
    k:"타이난의 '소고기탕'이 맛있는 것은 근처에서 소를 기르고, 아침에 갓 잡은 '온체우(냉동하지 않은 신선한 소고기)'를 그날 바로 쓰기 때문이라고 합니다. 그래서 유명 소고기탕 가게는 새벽부터 열고 점심 전에 다 팔리는 일도 드물지 않습니다. 타이난은 2010년까지 오랫동안 '타이난시'와 '타이난현'으로 나뉘어 있었지만 지금은 합쳐져 하나의 직할시가 되었습니다. '먹거리는 타이난에 있다'는 말이 있을 만큼 현지인의 음식에 대한 집착과 자부심은 각별합니다."
  }
},
{
  id:"east-coast-and-islands",
  cat:{ j:"都市・地方", e:"Cities & Regions", k:"도시·지역" },
  zhTitle:"花東與離島：後山與海上的桃花源",
  title:{ j:"花蓮・台東と離島——『後山』と海の桃源郷", e:"The East Coast and Islands: The 'Back Mountains' and Ocean Escapes", k:"화롄·타이둥과 외딴섬: '뒷산'과 바다 위의 도원경" },
  intro:{
    j:"台北や台南の賑わいから離れ、山を越えて東へ——そこには太平洋の青い海と、どこまでも続く緑の谷が広がっています。花蓮・台東、そして澎湖や蘭嶼といった離島。台湾で最ものんびりとして、最も自然が濃い『裏側』の世界を、のぞいてみましょう。",
    e:"Leave the bustle of Taipei and Tainan behind, cross the mountains and head east—there you'll find the blue Pacific and endless green valleys. Hualien and Taitung, and outlying islands like Penghu and Orchid Island. Let's explore the most laid-back, most nature-rich 'other side' of Taiwan.",
    k:"타이베이와 타이난의 번잡함을 뒤로하고 산을 넘어 동쪽으로—그곳엔 태평양의 푸른 바다와 끝없이 이어지는 초록 계곡이 펼쳐집니다. 화롄과 타이둥, 그리고 펑후와 란위 같은 외딴섬. 대만에서 가장 느긋하고 자연이 짙은 '뒤편'의 세계를 들여다봅시다."
  },
  paras:[
    {
      z:"台灣的東部，也就是「花蓮」和「台東」這兩個縣，因為被高聳的中央山脈擋在後面，開發得比較晚，人口也比較少。以前住在西部的人，把這一帶稱為「後山」，帶著一點遙遠、神秘的意味。正因為交通不便、開發不多，花東反而保留了台灣最乾淨的空氣、最遼闊的風景，成了很多人心目中的一片淨土。",
      py:"Táiwān de dōngbù, yě jiùshì “Huālián” hé “Táidōng” zhè liǎng ge xiàn, yīnwèi bèi gāosǒng de Zhōngyāng Shānmài dǎng zài hòumiàn, kāifā de bǐjiào wǎn, rénkǒu yě bǐjiào shǎo. Yǐqián zhù zài xībù de rén, bǎ zhè yídài chēngwéi “hòushān”, dàizhe yìdiǎn yáoyuǎn, shénmì de yìwèi. Zhèng yīnwèi jiāotōng búbiàn, kāifā bù duō, Huādōng fǎn'ér bǎoliú le Táiwān zuì gānjìng de kōngqì, zuì liáokuò de fēngjǐng, chéngle hěnduō rén xīnmùzhōng de yí piàn jìngtǔ.",
      m:{
        j:"台湾の東部、つまり「花蓮」と「台東」の二つの県は、高くそびえる中央山脈に背後を遮られているため、開発が比較的遅く、人口も少なめです。かつて西部に住む人々は、この一帯を「後山（うらやま）」と呼び、どこか遠く神秘的な響きを込めていました。交通が不便で開発が進まなかったからこそ、花東はかえって台湾で最も澄んだ空気と最も広々とした景色を保ち、多くの人の心の中の「浄土」となっています。",
        e:"Eastern Taiwan—the counties of Hualien and Taitung—developed relatively late and has a smaller population, because it's blocked behind the towering Central Mountain Range. People in the west used to call this region the 'back mountains,' with a hint of remoteness and mystery. Precisely because transport was inconvenient and development limited, the east instead preserved Taiwan's cleanest air and most expansive scenery, becoming a kind of pure land in many people's hearts.",
        k:"대만 동부, 즉 '화롄'과 '타이둥' 두 현은 높이 솟은 중앙산맥에 뒤가 가로막혀 개발이 비교적 늦고 인구도 적은 편입니다. 예전에 서부에 사는 사람들은 이 일대를 '뒷산(후산)'이라 부르며 어딘가 멀고 신비로운 뉘앙스를 담았습니다. 교통이 불편하고 개발이 더뎠기에 화둥은 오히려 대만에서 가장 깨끗한 공기와 가장 광활한 풍경을 간직해, 많은 사람의 마음속 '정토'가 되었습니다."
      }
    },
    {
      z:"花東最讓人難忘的，就是「山」和「海」擠在一起的壯麗景色。這裡有兩條平行的山脈，中間夾著一條長長的「花東縱谷」，稻田、部落和小鎮就散落在谷地裡，四季顏色不斷變化。而在山脈的另一邊，是一望無際的太平洋。開車走在「台11線」海岸公路上，左邊是懸崖峭壁，右邊就是深藍色的大海，那種遼闊，會讓人忍不住停下車，只是靜靜地看著。",
      py:"Huādōng zuì ràng rén nánwàng de, jiùshì “shān” hé “hǎi” jǐ zài yìqǐ de zhuànglì jǐngsè. Zhèlǐ yǒu liǎng tiáo píngxíng de shānmài, zhōngjiān jiāzhe yì tiáo chángcháng de “Huādōng Zònggǔ”, dàotián, bùluò hé xiǎozhèn jiù sànluò zài gǔdì lǐ, sìjì yánsè búduàn biànhuà. Ér zài shānmài de lìng yìbiān, shì yíwàngwújì de Tàipíngyáng. Kāichē zǒu zài “Tái shíyī xiàn” hǎi'àn gōnglù shàng, zuǒbiān shì xuányá qiàobì, yòubiān jiùshì shēnlánsè de dàhǎi, nà zhǒng liáokuò, huì ràng rén rěnbúzhù tíng xià chē, zhǐshì jìngjìng de kànzhe.",
      m:{
        j:"花東で最も忘れがたいのは、「山」と「海」がぎゅっと寄り添った壮麗な景色です。ここには二本の平行する山脈があり、その間に長い「花東縦谷」が挟まれ、谷あいには田んぼ、原住民の集落（部落）、小さな町が点在し、四季ごとに色を変えていきます。そして山脈の反対側には、見渡す限りの太平洋。海岸道路「台11線」を車で走ると、左は断崖絶壁、右は濃紺の大海原。その広大さに、人は思わず車を停め、ただ静かに見入ってしまいます。",
        e:"The most unforgettable thing about the east is the magnificent scenery where mountains and sea press up against each other. Here two parallel mountain ranges enclose the long East Rift Valley, where rice paddies, indigenous villages, and small towns are scattered across the valley floor, their colors shifting with the seasons. On the other side of the ranges lies the boundless Pacific. Drive the Provincial Highway 11 coastal road and there are sheer cliffs on your left and the deep-blue ocean on your right—a vastness that makes you pull over just to gaze quietly.",
        k:"화둥에서 가장 잊기 힘든 것은 '산'과 '바다'가 바짝 맞붙은 웅장한 풍경입니다. 이곳엔 두 개의 평행한 산맥이 있고 그 사이에 긴 '화둥 종곡(리프트 밸리)'이 끼어 있어, 골짜기에 논, 원주민 부락, 작은 마을이 흩어져 사계절 색이 끊임없이 바뀝니다. 산맥 반대편에는 끝없이 펼쳐진 태평양이 있습니다. 해안 도로 '타이 11선'을 차로 달리면 왼쪽은 깎아지른 절벽, 오른쪽은 짙푸른 바다. 그 광활함에 사람들은 저도 모르게 차를 세우고 그저 조용히 바라보게 됩니다."
      }
    },
    {
      z:"花蓮最有名的景點，是氣勢磅礴的「太魯閣」。溪水經過幾百萬年，把堅硬的大理石切出又深又窄的峽谷，兩旁的岩壁高聳入雲，公路和步道就沿著懸崖鑿出來。而台東則多了一份悠閒，「伯朗大道」上金黃的稻浪一路延伸到山腳，天空又高又藍；每年夏天的「熱氣球嘉年華」，讓一顆顆彩色的氣球飄在鹿野高台的天空，成為台東最浪漫的招牌畫面。",
      py:"Huālián zuì yǒumíng de jǐngdiǎn, shì qìshì pángbó de “Tàilǔgé”. Xīshuǐ jīngguò jǐ bǎiwàn nián, bǎ jiānyìng de dàlǐshí qiē chū yòu shēn yòu zhǎi de xiágǔ, liǎngpáng de yánbì gāosǒng rù yún, gōnglù hé bùdào jiù yánzhe xuányá záo chūlái. Ér Táidōng zé duōle yí fèn yōuxián, “Bólǎng Dàdào” shàng jīnhuáng de dàolàng yílù yánshēn dào shānjiǎo, tiānkōng yòu gāo yòu lán; měinián xiàtiān de “rèqìqiú jiāniánhuá”, ràng yì kē kē cǎisè de qìqiú piāo zài Lùyě Gāotái de tiānkōng, chéngwéi Táidōng zuì làngmàn de zhāopái huàmiàn.",
      m:{
        j:"花蓮で最も有名な景勝地は、雄大な「太魯閣（タロコ）」です。渓流が数百万年をかけて硬い大理石を削り、深く狭い峡谷を刻み出しました。両側の岩壁は雲に届くほど高くそびえ、道路や遊歩道は断崖に沿って掘られています。一方、台東はもう少しのんびりしていて、「伯朗大道（ブラウン通り）」では黄金色の稲穂の波が山裾までまっすぐ延び、空は高く青い。毎年夏の「熱気球フェスティバル」では、色とりどりの気球が鹿野高台の空に浮かび、台東の最もロマンチックな名物風景になっています。",
        e:"Hualien's most famous sight is the majestic Taroko Gorge. Over millions of years, river water carved deep, narrow gorges out of hard marble; the rock walls tower into the clouds, and roads and trails are cut along the cliffs. Taitung, meanwhile, is more relaxed: on 'Mr. Brown Avenue,' golden waves of rice stretch all the way to the foot of the mountains beneath a high blue sky, and each summer the Hot Air Balloon Festival sends colorful balloons drifting over the Luye Highland—Taitung's most romantic signature scene.",
        k:"화롄에서 가장 유명한 명소는 웅장한 '타이루거(타로코)'입니다. 계곡물이 수백만 년에 걸쳐 단단한 대리석을 깎아 깊고 좁은 협곡을 만들었습니다. 양옆 암벽은 구름에 닿을 듯 높이 솟아 있고, 도로와 산책로는 절벽을 따라 뚫려 있습니다. 반면 타이둥은 좀 더 여유로워, '보랑 대로(브라운 애비뉴)'에서는 황금빛 벼 물결이 산기슭까지 곧게 뻗고 하늘은 높고 푸릅니다. 매년 여름 '열기구 축제'에서는 알록달록한 기구가 루예 고원 하늘에 떠올라 타이둥의 가장 낭만적인 대표 풍경이 됩니다."
      }
    },
    {
      z:"除了本島的東部，台灣還有好幾座迷人的「離島」，各有各的性格。「澎湖」由許多小島組成，有白色的沙灘、透明的海水和古老的玄武岩地形，夏天是玩水、看花火的天堂。「金門」離對岸很近，留著許多戰爭時期的坑道和碉堡，還有傳統的閩南聚落和高粱酒，氣氛安靜又厚重，和台灣本島很不一樣。",
      py:"Chúle běndǎo de dōngbù, Táiwān hái yǒu hǎojǐ zuò mírén de “lídǎo”, gèyǒu gèzìde gèxìng. “Pénghú” yóu xǔduō xiǎodǎo zǔchéng, yǒu báisè de shātān, tòumíng de hǎishuǐ hé gǔlǎo de xuánwǔyán dìxíng, xiàtiān shì wánshuǐ, kàn huāhuǒ de tiāntáng. “Jīnmén” lí duì'àn hěn jìn, liúzhe xǔduō zhànzhēng shíqí de kēngdào hé diāobǎo, háiyǒu chuántǒng de Mǐnnán jùluò hé gāoliáng jiǔ, qìfēn ānjìng yòu hòuzhòng, hé Táiwān běndǎo hěn bù yíyàng.",
      m:{
        j:"本島の東部のほかにも、台湾にはいくつもの魅力的な「離島」があり、それぞれに個性があります。「澎湖」は多くの小島から成り、白い砂浜、透き通った海水、古い玄武岩の地形を持ち、夏は海遊びや花火を楽しむ楽園です。「金門」は対岸にとても近く、戦争時代の坑道やトーチカが数多く残り、伝統的な閩南（びんなん）の集落や高粱酒（コーリャン酒）もあって、静かで重厚な雰囲気は台湾本島とはずいぶん違います。",
        e:"Beyond the main island's east coast, Taiwan has several enchanting outlying islands, each with its own character. Penghu is made up of many small islands, with white beaches, crystal-clear water, and ancient basalt formations—a summer paradise for swimming and fireworks. Kinmen lies very close to the opposite shore and preserves many wartime tunnels and bunkers, along with traditional Minnan villages and sorghum liquor; its quiet, weighty atmosphere is quite different from the main island.",
        k:"본섬 동부 외에도 대만에는 매력적인 '외딴섬'이 여럿 있고, 저마다 개성이 있습니다. '펑후'는 많은 작은 섬으로 이루어져 흰 모래사장, 투명한 바닷물, 오래된 현무암 지형을 지녀 여름엔 물놀이와 불꽃놀이의 천국입니다. '진먼'은 맞은편 해안과 매우 가까워 전쟁 시기의 갱도와 벙커가 많이 남아 있고, 전통 민난 마을과 고량주도 있어 조용하고 묵직한 분위기가 대만 본섬과는 사뭇 다릅니다."
      }
    },
    {
      z:"再往台東的外海走，還有兩座更原始的小島——「蘭嶼」和「綠島」。蘭嶼是達悟族的家鄉，島上有傳統的地下屋、獨特的拼板舟，還有一年一度的飛魚季，文化和大海緊緊相連。綠島以清澈的海底世界聞名，是潛水客的最愛，島上還有全世界少見的「海底溫泉」。這些離島交通不算方便，卻正因為如此，保留了最純粹的自然和最慢的生活節奏。",
      py:"Zài wǎng Táidōng de wàihǎi zǒu, háiyǒu liǎng zuò gèng yuánshǐ de xiǎodǎo——“Lányǔ” hé “Lǜdǎo”. Lányǔ shì Dáwùzú de jiāxiāng, dǎo shàng yǒu chuántǒng de dìxiàwū, dútè de pīnbǎnzhōu, háiyǒu yìnián yídù de fēiyú jì, wénhuà hé dàhǎi jǐnjǐn xiānglián. Lǜdǎo yǐ qīngchè de hǎidǐ shìjiè wénmíng, shì qiánshuǐkè de zuì'ài, dǎo shàng háiyǒu quán shìjiè shǎojiàn de “hǎidǐ wēnquán”. Zhèxiē lídǎo jiāotōng bú suàn fāngbiàn, què zhèng yīnwèi rúcǐ, bǎoliú le zuì chúncuì de zìrán hé zuì màn de shēnghuó jiézòu.",
      m:{
        j:"さらに台東の沖へ進むと、より原始的な二つの小島——「蘭嶼」と「緑島」があります。蘭嶼はタオ族（達悟族）の故郷で、島には伝統的な半地下の家、独特の板を組み合わせた舟（拼板舟）があり、年に一度の「トビウオ漁の季節（飛魚季）」もあって、文化と海が固く結びついています。緑島は澄んだ海中世界で知られ、ダイバーに大人気。島には世界的にも珍しい「海底温泉」まであります。これらの離島は交通が決して便利とはいえませんが、だからこそ最も純粋な自然と最もゆっくりした生活のリズムが守られているのです。",
        e:"Farther out to sea off Taitung lie two even more pristine islands—Orchid Island (Lanyu) and Green Island (Ludao). Lanyu is the homeland of the Tao people, with traditional semi-underground houses, distinctive plank boats, and an annual flying-fish season—a culture tightly bound to the sea. Green Island is famous for its clear underwater world and is a diver's favorite, home to one of the world's rare 'seabed hot springs.' Getting to these islands isn't easy, but that's exactly why they preserve the purest nature and the slowest pace of life.",
        k:"타이둥 앞바다로 더 나아가면 더욱 원시적인 두 작은 섬—'란위(오키드섬)'와 '뤼다오(녹도)'가 있습니다. 란위는 타오족(다우족)의 고향으로, 섬에는 전통 반지하 가옥과 독특한 판자배(핀반저우)가 있고 일 년에 한 번 '날치잡이 철'이 있어 문화와 바다가 단단히 이어져 있습니다. 뤼다오는 맑은 바닷속 세계로 유명해 다이버들이 가장 좋아하며, 섬에는 세계적으로도 드문 '해저 온천'까지 있습니다. 이 외딴섬들은 교통이 결코 편하다고 할 수 없지만, 그렇기에 가장 순수한 자연과 가장 느린 생활 리듬을 지키고 있습니다."
      }
    },
    {
      z:"對很多在西部大城市過著快步調生活的台灣人來說，花東和離島是「逃離日常」的地方。放個長假，搭火車沿著東海岸南下，或坐船、坐飛機到離島住上幾天，看海、發呆、吃海鮮，把行程排得鬆鬆的，什麼都不趕。回到都市之後，心裡好像被重新充飽了電。這片「後山」和海上的世界，就像台灣的後花園，提醒著大家：這座島嶼，遠比城市所看到的更寬、更美。",
      py:"Duì hěnduō zài xībù dà chéngshì guòzhe kuài bùdiào shēnghuó de Táiwānrén lái shuō, Huādōng hé lídǎo shì “táolí rìcháng” de dìfāng. Fàng ge chángjià, dā huǒchē yánzhe dōng hǎi'àn nánxià, huò zuò chuán, zuò fēijī dào lídǎo zhù shàng jǐ tiān, kàn hǎi, fādāi, chī hǎixiān, bǎ xíngchéng pái de sōngsōng de, shénme dōu bù gǎn. Huídào dūshì zhīhòu, xīnlǐ hǎoxiàng bèi chóngxīn chōngbǎo le diàn. Zhè piàn “hòushān” hé hǎishàng de shìjiè, jiù xiàng Táiwān de hòu huāyuán, tíxǐngzhe dàjiā: zhè zuò dǎoyǔ, yuǎn bǐ chéngshì suǒ kàndào de gèng kuān, gèng měi.",
      m:{
        j:"西部の大都市で速いテンポの暮らしを送る多くの台湾人にとって、花東と離島は「日常から逃れる」場所です。長い休みを取り、列車で東海岸を南下したり、船や飛行機で離島へ渡って数日過ごしたり。海を眺め、ぼんやりし、海鮮を味わい、予定はゆるゆるに組んで、何も急がない。都会に戻ると、心がもう一度満充電されたような気がします。この「後山」と海の世界は、まるで台湾の裏庭のよう。この島は、都市から見えるよりもずっと広く、ずっと美しいのだと、そっと思い出させてくれるのです。",
        e:"For many Taiwanese living the fast pace of the big western cities, the east coast and islands are a place to 'escape everyday life.' Take a long holiday, ride the train south along the east coast, or hop a boat or plane to an island for a few days—watch the sea, space out, eat seafood, keep your itinerary loose, and rush nothing. Back in the city, your heart feels recharged. This world of 'back mountains' and open sea is like Taiwan's back garden, a reminder to everyone that this island is far wider and more beautiful than what you see from the cities.",
        k:"서부 대도시에서 빠른 템포의 삶을 사는 많은 대만 사람에게 화둥과 외딴섬은 '일상에서 벗어나는' 곳입니다. 긴 휴가를 내어 기차로 동해안을 따라 남하하거나, 배나 비행기로 섬에 건너가 며칠을 보냅니다. 바다를 보고, 멍하니 있고, 해산물을 먹고, 일정을 느슨하게 짜서 아무것도 서두르지 않죠. 도시로 돌아오면 마음이 다시 완충된 듯합니다. 이 '뒷산'과 바다 위의 세계는 마치 대만의 뒤뜰 같아서, 이 섬이 도시에서 보이는 것보다 훨씬 넓고 아름답다는 것을 살며시 일깨워 줍니다."
      }
    }
  ],
  vocab:[
    { w:"後山", zy:"ㄏㄡˋ ㄕㄢ", py:"hòushān", m:{ j:"『裏山』（東部＝花蓮・台東の俗称）", e:"'back mountains' (nickname for the east coast)", k:"'뒷산'(동부=화롄·타이둥의 별칭)" } },
    { w:"縱谷", zy:"ㄗㄨㄥˋ ㄍㄨˇ", py:"zònggǔ", m:{ j:"縦谷（花東の細長い谷地）", e:"rift valley", k:"종곡·리프트 밸리" } },
    { w:"太平洋", zy:"ㄊㄞˋ ㄆㄧㄥˊ ㄧㄤˊ", py:"Tàipíngyáng", m:{ j:"太平洋", e:"the Pacific Ocean", k:"태평양" } },
    { w:"太魯閣", zy:"ㄊㄞˋ ㄌㄨˇ ㄍㄜˊ", py:"Tàilǔgé", m:{ j:"太魯閣（タロコ峡谷）", e:"Taroko Gorge", k:"타이루거(타로코 협곡)" } },
    { w:"峽谷", zy:"ㄒㄧㄚˊ ㄍㄨˇ", py:"xiágǔ", m:{ j:"峡谷", e:"gorge, canyon", k:"협곡" } },
    { w:"離島", zy:"ㄌㄧˊ ㄉㄠˇ", py:"lídǎo", m:{ j:"離島", e:"outlying island", k:"외딴섬·부속 도서" } },
    { w:"澎湖", zy:"ㄆㄥˊ ㄏㄨˊ", py:"Pénghú", m:{ j:"澎湖（諸島）", e:"Penghu (islands)", k:"펑후(제도)" } },
    { w:"玄武岩", zy:"ㄒㄩㄢˊ ㄨˇ ㄧㄢˊ", py:"xuánwǔyán", m:{ j:"玄武岩", e:"basalt", k:"현무암" } },
    { w:"部落", zy:"ㄅㄨˋ ㄌㄨㄛˋ", py:"bùluò", m:{ j:"（原住民の）集落・村", e:"(indigenous) village, tribe", k:"부락(원주민 마을)" } },
    { w:"潛水", zy:"ㄑㄧㄢˊ ㄕㄨㄟˇ", py:"qiánshuǐ", m:{ j:"ダイビング・潜水", e:"diving", k:"다이빙·잠수" } },
    { w:"飛魚", zy:"ㄈㄟ ㄩˊ", py:"fēiyú", m:{ j:"トビウオ", e:"flying fish", k:"날치" } },
    { w:"逃離日常", zy:"ㄊㄠˊ ㄌㄧˊ ㄖˋ ㄔㄤˊ", py:"táolí rìcháng", m:{ j:"日常から逃れる", e:"to escape everyday life", k:"일상에서 벗어나다" } }
  ],
  note:{
    j:"『後山』という呼び方は、かつて政治や経済の中心が西部にあり、山の向こう側の東部を『裏側』とみなした名残です。今ではむしろ、その手つかずの自然が最大の魅力になっています。蘭嶼のタオ族は『飛魚』を神聖な魚として大切にし、漁の時期や食べ方に細かい伝統的なきまりがあります。また澎湖の花火大会（澎湖海上花火節）は毎年夏の名物で、海の上に打ち上がる花火を目当てに多くの観光客が訪れます。東部を走るなら、断崖に沿う『蘇花公路』や、稲田を貫く『台11線』『台9線』のドライブは格別です。",
    e:"The name 'back mountains' is a leftover from when political and economic power sat in the west, casting the east beyond the ranges as the 'other side.' Today, that untouched nature is its greatest draw. The Tao people of Orchid Island treat flying fish as sacred, with detailed traditional rules about when to catch and how to eat them. Penghu's summer fireworks festival is a beloved annual event, drawing crowds for fireworks launched over the sea. If you travel the east, the cliff-hugging Suhua Highway and drives along Highway 11 and Highway 9 through the rice fields are especially spectacular.",
    k:"'뒷산'이라는 표현은 예전에 정치·경제 중심이 서부에 있어 산 너머 동부를 '뒤편'으로 여겼던 흔적입니다. 지금은 오히려 그 손대지 않은 자연이 최대의 매력이 되었습니다. 란위의 타오족은 '날치'를 신성한 물고기로 여겨 잡는 시기와 먹는 법에 세세한 전통 규칙이 있습니다. 또 펑후의 여름 불꽃 축제는 매년 명물로, 바다 위로 쏘아 올리는 불꽃을 보러 많은 관광객이 찾습니다. 동부를 달린다면 절벽을 따라가는 '쑤화 공로'나 논을 가로지르는 '타이 11선', '타이 9선' 드라이브가 각별합니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_10 };
