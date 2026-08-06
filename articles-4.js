// StayTW Notes — 深度閲讀：台湾の祭り・信仰（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_4 = [
{
  id:"lunar-new-year",
  cat:{ j:"祭り・信仰", e:"Festivals & Belief", k:"축제·신앙" },
  zhTitle:"過年：一年之中最溫暖的團圓",
  title:{ j:"旧正月：一年でいちばん温かい団らん", e:"Lunar New Year: The Warmest Reunion of the Year", k:"설날: 일 년 중 가장 따뜻한 가족 상봉" },
  intro:{
    j:"街じゅうが赤いランタンと『春聯』で彩られ、家々からは煮込み料理の匂いが漂い、離れて暮らす家族が一斉に故郷へ帰っていく——台湾で『過年』は、単なる休日ではなく、一年でいちばん大切な団らんの時間です。除夜の鍋を囲む食卓から、お年玉、そして初詣まで、台湾のお正月をのぞいてみましょう。",
    e:"The whole town glows with red lanterns and 'spring couplets,' the smell of slow-cooked dishes drifts from every home, and family members who live apart all head back to their hometowns at once—in Taiwan, 'guònián' is not just a holiday but the most important reunion of the year. From the reunion hotpot on New Year's Eve to red envelopes and temple visits, let's take a peek at the Taiwanese New Year.",
    k:"온 거리가 붉은 등롱과 '춘련'으로 물들고, 집집마다 오래 끓인 음식 냄새가 퍼지며, 떨어져 사는 가족이 일제히 고향으로 돌아갑니다—대만에서 '설날(過年)'은 단순한 휴일이 아니라 일 년 중 가장 소중한 상봉의 시간입니다. 섣달그믐 둘러앉는 전골에서 세뱃돈, 그리고 새해 참배까지, 대만의 설을 들여다봅시다."
  },
  paras:[
    {
      z:"台灣人說的「過年」，指的是農曆的新年，通常落在陽曆的一月底或二月初，跟世界上大多數國家慶祝的元旦不一樣。過年不是只有一天，而是一整段熱鬧的日子：從除夕前的大掃除、辦年貨，到除夕圍爐，再到初一到初五陸續拜年、走春，前前後後可以熱鬧將近半個月。對很多在外地工作、讀書的人來說，過年就是「無論如何都要回家」的日子。",
      py:"Táiwānrén shuō de “guònián”, zhǐ de shì nónglì de xīnnián, tōngcháng luò zài yánglì de yī yuè dǐ huò èr yuè chū, gēn shìjiè shàng dàduōshù guójiā qìngzhù de yuándàn bù yíyàng. Guònián búshì zhǐyǒu yì tiān, érshì yì zhěng duàn rènào de rìzi: cóng chúxì qián de dàsǎochú, bàn niánhuò, dào chúxì wéilú, zài dào chūyī dào chūwǔ lùxù bàinián, zǒuchūn, qiánqián-hòuhòu kěyǐ rènào jiāngjìn bàn ge yuè. Duì hěnduō zài wàidì gōngzuò, dúshū de rén lái shuō, guònián jiùshì “wúlùn rúhé dōu yào huíjiā” de rìzi.",
      m:{
        j:"台湾の人が言う「過年（旧正月）」は、旧暦の新年を指し、たいてい新暦の一月末か二月初めにあたります。世界の多くの国が祝う元旦とは別物です。過年は一日だけではなく、にぎやかな期間まるごとを指します。大晦日前の大掃除や年越しの買い出し（辦年貨）から、大晦日の「圍爐（鍋を囲む団らん）」、そして元日から五日目まで続く新年の挨拶回りや初詣（走春）まで、前後あわせて半月近くもにぎわいます。地方で働いたり学んだりする多くの人にとって、過年は「何があっても家に帰る」日なのです。",
        e:"When Taiwanese say 'guònián,' they mean the lunar New Year, which usually falls in late January or early February on the solar calendar—unlike the January 1st New Year most countries celebrate. Guònián isn't just one day but a whole stretch of festivity: from the big pre–New Year's Eve house cleaning and shopping for New Year goods, to the reunion hotpot on New Year's Eve, to the rounds of New Year greetings and outings from the first through the fifth day. All told, the buzz can last nearly half a month. For many who work or study away from home, guònián is simply the time you go home 'no matter what.'",
        k:"대만 사람이 말하는 '설날(過年)'은 음력 새해를 가리키며 보통 양력 1월 말이나 2월 초에 옵니다. 세계 대부분의 나라가 기념하는 1월 1일 새해와는 다릅니다. 설날은 하루가 아니라 떠들썩한 기간 전체를 뜻합니다. 섣달그믐 전의 대청소와 설 장보기(辦年貨)부터 그믐날의 '위루(전골을 둘러앉는 상봉)', 그리고 초하루부터 초닷새까지 이어지는 세배와 새해 나들이(走春)까지, 앞뒤로 보름 가까이 북적입니다. 타지에서 일하거나 공부하는 많은 이에게 설날은 '무슨 일이 있어도 집에 가는' 날입니다."
      }
    },
    {
      z:"過年最重要的一頓飯，是除夕晚上的「年夜飯」，台灣人常說「圍爐」。全家人圍著桌子坐下來，桌上一定有幾道有好意頭的菜：吃魚代表「年年有餘」，吃長長的菜代表「長長久久」，吃丸子代表「團團圓圓」，餃子則像元寶，象徵招財。就算平常再忙、住得再遠，這一晚大家也會盡量趕回家，一起把這頓飯吃完。",
      py:"Guònián zuì zhòngyào de yì dùn fàn, shì chúxì wǎnshàng de “niányèfàn”, Táiwānrén cháng shuō “wéilú”. Quánjiā rén wéizhe zhuōzi zuò xiàlái, zhuō shàng yídìng yǒu jǐ dào yǒu hǎo yìtou de cài: chī yú dàibiǎo “niánnián-yǒuyú”, chī chángcháng de cài dàibiǎo “chángcháng-jiǔjiǔ”, chī wánzi dàibiǎo “tuántuán-yuányuán”, jiǎozi zé xiàng yuánbǎo, xiàngzhēng zhāocái. Jiùsuàn píngcháng zài máng, zhù de zài yuǎn, zhè yì wǎn dàjiā yě huì jǐnliàng gǎn huíjiā, yìqǐ bǎ zhè dùn fàn chī wán.",
      m:{
        j:"過年で最も大切な食事が、大晦日の夜の「年夜飯（年越しのごちそう）」で、台湾では「圍爐（鍋を囲むこと）」とよく言います。家族全員が食卓を囲んで座り、食卓には縁起のよい料理が必ず並びます。魚を食べれば「年年有餘（毎年ゆとりがある）」、長い葉物を食べれば「長長久久（末永く）」、団子を食べれば「團團圓圓（円満な団らん）」、餃子は昔の金塊（元寶）の形に似ていて金運を招くとされます。ふだんどんなに忙しくても、遠くに住んでいても、この夜だけはみんなできるだけ家に駆けつけ、一緒にこの食事を囲みます。",
        e:"The most important meal of the New Year is the 'reunion dinner' on New Year's Eve, which Taiwanese often call 'wéilú' (gathering around the pot). The whole family sits around the table, which always holds several auspicious dishes: eating fish means 'surplus year after year,' eating long leafy greens means 'long and lasting,' eating meatballs means 'togetherness and reunion,' and dumplings resemble old gold ingots, symbolizing wealth. No matter how busy people usually are or how far away they live, on this one night everyone tries their best to rush home and finish this meal together.",
        k:"설날에서 가장 중요한 식사는 섣달그믐 저녁의 '설 음식(年夜飯)'으로, 대만에서는 흔히 '위루(전골을 둘러앉기)'라고 합니다. 온 가족이 식탁에 둘러앉고, 식탁에는 반드시 좋은 뜻을 담은 음식이 오릅니다. 생선을 먹으면 '해마다 여유가 있다', 긴 잎채소를 먹으면 '오래오래', 완자를 먹으면 '둥글둥글 화목한 상봉', 만두는 옛 금덩이(원보)를 닮아 재물을 부른다고 합니다. 평소 아무리 바쁘고 멀리 살아도 이 밤만큼은 모두 최대한 집으로 달려와 함께 이 식사를 마칩니다."
      }
    },
    {
      z:"吃完年夜飯，最讓小孩期待的時刻就來了——「發紅包」。長輩會把錢裝進紅色的小袋子，也就是「紅包」，發給晚輩，祝他們新的一年平安、健康、順利。收到紅包的孩子要說幾句吉祥話，像是「新年快樂」、「恭喜發財」、「身體健康」。等到孩子長大、開始工作賺錢，就換成他們包紅包給爸媽和阿公阿嬤，這種角色的轉換，也是台灣人心裡很在意的一種孝順。",
      py:"Chī wán niányèfàn, zuì ràng xiǎohái qídài de shíkè jiù lái le——“fā hóngbāo”. Zhǎngbèi huì bǎ qián zhuāng jìn hóngsè de xiǎo dàizi, yě jiùshì “hóngbāo”, fā gěi wǎnbèi, zhù tāmen xīn de yì nián píng'ān, jiànkāng, shùnlì. Shōudào hóngbāo de háizi yào shuō jǐ jù jíxiánghuà, xiàngshì “xīnnián kuàilè”, “gōngxǐ fācái”, “shēntǐ jiànkāng”. Děngdào háizi zhǎngdà, kāishǐ gōngzuò zhuànqián, jiù huànchéng tāmen bāo hóngbāo gěi bàmā hé āgōng āmà, zhè zhǒng juésè de zhuǎnhuàn, yěshì Táiwānrén xīnlǐ hěn zàiyì de yì zhǒng xiàoshùn.",
      m:{
        j:"年夜飯を食べ終えると、子どもが一番心待ちにする瞬間がやってきます——「發紅包（お年玉を配る）」です。年長者はお金を赤い小さな袋、つまり「紅包（お年玉袋）」に入れ、年下の者に配って、新しい一年の無事・健康・順調を祈ります。お年玉をもらった子どもは、「新年快樂（あけましておめでとう）」「恭喜發財（お金持ちになりますように）」「身體健康（ご健康を）」といった縁起のよい言葉をいくつか口にします。子どもが成長し、働いてお金を稼ぐようになると、今度は自分が両親や祖父母（阿公阿嬤）にお年玉を包む番になります。この役割の入れ替わりも、台湾人が心で大切にする親孝行の一つです。",
        e:"After the reunion dinner comes the moment children look forward to most—handing out 'red envelopes.' Elders tuck money into small red pouches, the 'hóngbāo,' and give them to the younger generation, wishing them peace, health, and smooth sailing in the new year. Children who receive them say a few auspicious phrases like 'Happy New Year,' 'Wishing you prosperity,' and 'Good health.' Once children grow up and start earning, the roles reverse and they give red envelopes to their parents and grandparents (āgōng, āmà). This switching of roles is a form of filial piety that Taiwanese hold dear.",
        k:"설 음식을 다 먹고 나면 아이들이 가장 기다리는 순간이 옵니다—'세뱃돈 주기(發紅包)'입니다. 어른들은 돈을 붉은 작은 봉투, 즉 '홍바오(세뱃돈 봉투)'에 넣어 아랫사람에게 주며 새해의 평안, 건강, 순조로움을 빕니다. 세뱃돈을 받은 아이는 '새해 복 많이 받으세요', '부자 되세요(恭喜發財)', '건강하세요' 같은 덕담을 몇 마디 합니다. 아이가 자라 일하며 돈을 벌게 되면 이번엔 자신이 부모와 조부모(아공·아마)에게 세뱃돈을 드릴 차례가 됩니다. 이 역할의 전환도 대만 사람이 마음속으로 소중히 여기는 효도의 하나입니다."
      }
    },
    {
      z:"除夕夜還有一個特別的習俗，叫做「守歲」。吃完飯、發完紅包，全家人不急著睡覺，而是一起聊天、看電視上的特別節目、打打牌或玩桌遊，盡量守到半夜十二點以後。傳統上認為，守歲可以為長輩「添壽」，也象徵珍惜這一年最後的時光，把舊的一年好好送走，再迎接新的一年。到了午夜，家家戶戶會放鞭炮、煙火，用響亮的聲音把「年」趕走，也把新年迎進門。",
      py:"Chúxì yè hái yǒu yí ge tèbié de xísú, jiàozuò “shǒusuì”. Chī wán fàn, fā wán hóngbāo, quánjiā rén bù jízhe shuìjiào, érshì yìqǐ liáotiān, kàn diànshì shàng de tèbié jiémù, dǎdǎ pái huò wán zhuōyóu, jǐnliàng shǒu dào bànyè shí'èr diǎn yǐhòu. Chuántǒng shàng rènwéi, shǒusuì kěyǐ wèi zhǎngbèi “tiānshòu”, yě xiàngzhēng zhēnxī zhè yì nián zuìhòu de shíguāng, bǎ jiù de yì nián hǎohǎo sòngzǒu, zài yíngjiē xīn de yì nián. Dàole wǔyè, jiājiā-hùhù huì fàng biānpào, yānhuǒ, yòng xiǎngliàng de shēngyīn bǎ “nián” gǎnzǒu, yě bǎ xīnnián yíng jìn mén.",
      m:{
        j:"大晦日の夜には、もう一つ特別な習わしがあります。「守歲（歳を守る／年越しの夜更かし）」です。食事を終え、お年玉も配り終えても、家族はすぐには寝ず、一緒におしゃべりをしたり、テレビの特別番組を見たり、トランプや卓上ゲームをしたりして、できるだけ夜中の十二時過ぎまで起きています。伝統的に、守歲は年長者の「寿命を延ばす（添壽）」とされ、また一年最後の時間を大切にし、旧年をきちんと送り出して新年を迎える象徴でもあります。真夜中になると、家々が爆竹や花火を鳴らし、大きな音で「年（という魔物）」を追い払い、同時に新年を家に迎え入れます。",
        e:"New Year's Eve has another special custom called 'shǒusuì' (staying up through the night). After the meal and the red envelopes, the family doesn't rush to bed but stays up together chatting, watching special TV programs, and playing cards or board games, trying to keep vigil past midnight. Traditionally, shǒusuì is thought to 'add years' to the elders' lives and symbolizes treasuring the year's final hours—sending off the old year properly and welcoming the new one. At midnight, every household sets off firecrackers and fireworks, using loud sounds to chase away the 'nián' (a legendary beast) and welcome the New Year through the door.",
        k:"섣달그믐 밤에는 또 하나의 특별한 풍습이 있습니다. '수세(守歲, 밤새우기)'입니다. 식사를 마치고 세뱃돈을 다 나눠 준 뒤에도 가족은 서둘러 자지 않고 함께 이야기하고, TV 특별 프로그램을 보고, 카드나 보드게임을 하며 되도록 자정 열두 시가 지나도록 깨어 있습니다. 전통적으로 수세는 어른의 '수명을 늘린다(添壽)'고 여겨지며, 한 해의 마지막 시간을 소중히 하고 묵은해를 잘 보내며 새해를 맞는 상징이기도 합니다. 자정이 되면 집집마다 폭죽과 불꽃을 터뜨려 큰 소리로 '녠(전설의 짐승)'을 쫓고 새해를 문 안으로 맞이합니다."
      }
    },
    {
      z:"大年初一開始，就進入「拜年」和「走春」的時段。人們穿上新衣服，走訪親戚朋友家，互道「新年好」，也順便到廟裡拜拜、求一支籤，祈求整年順利，這叫做「走春」。台灣人也很重視「初二回娘家」的習俗：出嫁的女兒在這一天帶著先生和小孩，回到自己父母家過節，讓娘家也熱鬧起來。過年期間，商店常常大排長龍，高速公路則會塞得水泄不通，因為全台灣的人幾乎都在移動、都在團圓。",
      py:"Dà nián chūyī kāishǐ, jiù jìnrù “bàinián” hé “zǒuchūn” de shíduàn. Rénmen chuān shàng xīn yīfú, zǒufǎng qīnqi péngyǒu jiā, hù dào “xīnnián hǎo”, yě shùnbiàn dào miào lǐ bàibài, qiú yì zhī qiān, qíqiú zhěng nián shùnlì, zhè jiàozuò “zǒuchūn”. Táiwānrén yě hěn zhòngshì “chū'èr huí niángjiā” de xísú: chūjià de nǚ'ér zài zhè yì tiān dàizhe xiānshēng hé xiǎohái, huídào zìjǐ fùmǔ jiā guòjié, ràng niángjiā yě rènào qǐlái. Guònián qíjiān, shāngdiàn chángcháng dàpái-chánglóng, gāosù gōnglù zé huì sāi de shuǐxiè-bùtōng, yīnwèi quán Táiwān de rén jīhū dōu zài yídòng, dōu zài tuányuán.",
      m:{
        j:"元日（大年初一）からは、「拜年（新年の挨拶回り）」と「走春（初詣がてらの新春の外出）」の時間に入ります。人々は新しい服を着て、親戚や友人の家を訪ね、「新年好（あけましておめでとう）」と挨拶を交わし、ついでにお寺やお宮で参拝し、おみくじ（籤）を引いて一年の順調を祈ります。これが「走春」です。台湾では「初二回娘家（二日に里帰りする）」習わしも大切にされます。嫁いだ娘がこの日、夫と子どもを連れて自分の実家に帰って正月を過ごし、実家もにぎやかになります。過年の期間、店はしばしば長い行列ができ、高速道路は身動きが取れないほど渋滞します。台湾じゅうの人がほぼみんな移動し、団らんしているからです。",
        e:"Starting on New Year's Day (the first day), it becomes time for 'bàinián' (New Year greetings) and 'zǒuchūn' (spring outings). People put on new clothes, visit the homes of relatives and friends, exchange 'Happy New Year,' and along the way stop by temples to worship and draw a fortune stick, praying for a smooth year—this is 'zǒuchūn.' Taiwanese also value the custom of 'married daughters returning to their parents' home on the second day': on this day a married daughter brings her husband and children back to her own parents' house to celebrate, filling that home with cheer too. During the New Year, shops often have long queues and highways jam up bumper to bumper, because nearly everyone in Taiwan is on the move and reuniting.",
        k:"설날 초하루부터는 '세배(拜年)'와 '봄나들이(走春)'의 시간이 됩니다. 사람들은 새 옷을 입고 친척과 친구 집을 찾아 '새해 복 많이 받으세요'를 주고받으며, 가는 김에 사찰이나 사당에서 참배하고 제비(籤)를 뽑아 한 해의 순조로움을 빕니다. 이것이 '봄나들이'입니다. 대만에서는 '초이튿날 친정 가기' 풍습도 소중히 여깁니다. 시집간 딸이 이날 남편과 아이를 데리고 친정에 돌아가 명절을 보내며 친정집도 북적이게 합니다. 설 기간에는 가게마다 긴 줄이 서고 고속도로는 꼼짝 못 할 만큼 막힙니다. 대만 전역의 사람이 거의 모두 이동하며 상봉하고 있기 때문입니다."
      }
    },
    {
      z:"對第一次在台灣過年的外國人來說，最深刻的感受，往往不是鞭炮或紅包，而是那股「回家」的力量。你會發現，這個平常步調很快、很現代的社會，在過年這幾天忽然慢了下來，把最多的時間留給家人。如果你有台灣朋友，很可能會被邀請一起吃頓年夜飯；那頓熱騰騰的火鍋，還有滿桌吉祥話，會讓你真正感受到，台灣人是怎麼用食物和陪伴，表達他們對家的愛。",
      py:"Duì dì yī cì zài Táiwān guònián de wàiguórén lái shuō, zuì shēnkè de gǎnshòu, wǎngwǎng búshì biānpào huò hóngbāo, érshì nà gǔ “huíjiā” de lìliàng. Nǐ huì fāxiàn, zhège píngcháng bùdiào hěn kuài, hěn xiàndài de shèhuì, zài guònián zhè jǐ tiān hūrán màn le xiàlái, bǎ zuìduō de shíjiān liú gěi jiārén. Rúguǒ nǐ yǒu Táiwān péngyǒu, hěn kěnéng huì bèi yāoqǐng yìqǐ chī dùn niányèfàn; nà dùn rètēngtēng de huǒguō, háiyǒu mǎn zhuō jíxiánghuà, huì ràng nǐ zhēnzhèng gǎnshòudào, Táiwānrén shì zěnme yòng shíwù hé péibàn, biǎodá tāmen duì jiā de ài.",
      m:{
        j:"初めて台湾で過年を過ごす外国人にとって、最も強く心に残るのは、爆竹やお年玉よりも、あの「家に帰る」という力であることが多いです。ふだんは歩みが速く、とても現代的なこの社会が、過年の数日間だけは急にペースを落とし、いちばん多くの時間を家族のために取っておく——そのことに気づくでしょう。もし台湾の友人がいれば、一緒に年夜飯を食べようと誘われるかもしれません。あの湯気の立つ鍋と、食卓いっぱいの縁起のよい言葉が、台湾人が食べ物と寄り添いによって、いかに家族への愛を表しているかを、あなたに本当に感じさせてくれるはずです。",
        e:"For a foreigner spending the New Year in Taiwan for the first time, the deepest impression is often not the firecrackers or the red envelopes but the sheer pull of 'going home.' You'll notice that this normally fast-paced, very modern society suddenly slows down during these few days, saving most of its time for family. If you have Taiwanese friends, you may well be invited to share a reunion dinner; that steaming hotpot and a table full of auspicious words will let you truly feel how Taiwanese express their love for family through food and togetherness.",
        k:"처음으로 대만에서 설을 보내는 외국인에게 가장 깊은 인상은 폭죽이나 세뱃돈이 아니라 '집으로 돌아가는' 그 힘일 때가 많습니다. 평소 걸음이 빠르고 아주 현대적인 이 사회가 설 며칠 동안만은 갑자기 속도를 늦추고 가장 많은 시간을 가족에게 남겨 둔다는 걸 알게 될 겁니다. 대만 친구가 있다면 함께 설 음식을 먹자고 초대받을지도 모릅니다. 그 김이 나는 전골과 식탁 가득한 덕담이, 대만 사람이 음식과 곁에 있어 줌으로 가족을 향한 사랑을 어떻게 표현하는지 진정으로 느끼게 해 줄 것입니다."
      }
    }
  ],
  vocab:[
    { w:"過年", zy:"ㄍㄨㄛˋ ㄋㄧㄢˊ", py:"guònián", m:{ j:"旧正月を過ごす・年越し", e:"to celebrate Lunar New Year", k:"설을 쇠다" } },
    { w:"除夕", zy:"ㄔㄨˊ ㄒㄧˋ", py:"chúxì", m:{ j:"大晦日", e:"New Year's Eve", k:"섣달그믐" } },
    { w:"圍爐", zy:"ㄨㄟˊ ㄌㄨˊ", py:"wéilú", m:{ j:"大晦日に家族で鍋を囲む団らん", e:"reunion dinner around the pot", k:"온 가족이 전골을 둘러앉기" } },
    { w:"年夜飯", zy:"ㄋㄧㄢˊ ㄧㄝˋ ㄈㄢˋ", py:"niányèfàn", m:{ j:"年越しのごちそう", e:"New Year's Eve reunion dinner", k:"섣달그믐 저녁 식사" } },
    { w:"紅包", zy:"ㄏㄨㄥˊ ㄅㄠ", py:"hóngbāo", m:{ j:"お年玉（赤い袋に入れたお金）", e:"red envelope (of money)", k:"세뱃돈(붉은 봉투)" } },
    { w:"守歲", zy:"ㄕㄡˇ ㄙㄨㄟˋ", py:"shǒusuì", m:{ j:"大晦日に夜更かしして年を越すこと", e:"staying up on New Year's Eve", k:"섣달그믐 밤새우기" } },
    { w:"拜年", zy:"ㄅㄞˋ ㄋㄧㄢˊ", py:"bàinián", m:{ j:"新年の挨拶回り", e:"paying New Year visits", k:"세배·새해 인사" } },
    { w:"走春", zy:"ㄗㄡˇ ㄔㄨㄣ", py:"zǒuchūn", m:{ j:"初詣を兼ねた新春の外出", e:"New Year outings (incl. temple visits)", k:"새해 나들이(참배 포함)" } },
    { w:"吉祥話", zy:"ㄐㄧˊ ㄒㄧㄤˊ ㄏㄨㄚˋ", py:"jíxiánghuà", m:{ j:"縁起のよい言葉", e:"auspicious phrases", k:"덕담·길한 말" } },
    { w:"恭喜發財", zy:"ㄍㄨㄥ ㄒㄧˇ ㄈㄚ ㄘㄞˊ", py:"gōngxǐ fācái", m:{ j:"お金持ちになりますように（新年の定番挨拶）", e:"wishing you wealth (common New Year greeting)", k:"부자 되세요(새해 인사)" } },
    { w:"辦年貨", zy:"ㄅㄢˋ ㄋㄧㄢˊ ㄏㄨㄛˋ", py:"bàn niánhuò", m:{ j:"年越しの買い出しをする", e:"shopping for New Year goods", k:"설 장을 보다" } },
    { w:"團圓", zy:"ㄊㄨㄢˊ ㄩㄢˊ", py:"tuányuán", m:{ j:"一家団らん・再会", e:"family reunion", k:"가족 상봉·단란" } }
  ],
  note:{
    j:"台湾では『初一（元日）は掃除をしない』という習わしがあります。せっかく入ってきた福や財運を、ほうきで掃き出してしまうと縁起が悪いとされるためです。また、割れ物を落として割ってしまったら、慌てず『歲歲（碎碎）平安（毎年平安でありますように）』と唱えて縁起直しをします。『碎（割れる）』と『歲（歳）』が同じ発音であることを利用した言葉遊びです。旧正月の連休は台湾で最も長い休みの一つで、多くの店が数日間閉まるため、旅行するなら営業状況の確認をお忘れなく。",
    e:"In Taiwan, there's a custom of not sweeping on the first day of the New Year, because sweeping out the good fortune and wealth that has just arrived is considered unlucky. And if you drop and break something, you calmly say 'suìsuì píng'ān' (may every year be peaceful) to undo the bad omen—a pun on 'suì' (to shatter) sounding the same as 'suì' (year). The Lunar New Year holiday is one of Taiwan's longest breaks, and many shops close for several days, so if you're traveling, don't forget to check opening hours.",
    k:"대만에는 '초하루(설날)에는 청소하지 않는다'는 풍습이 있습니다. 막 들어온 복과 재운을 빗자루로 쓸어내면 불길하다고 여기기 때문입니다. 또 물건을 떨어뜨려 깨뜨리면 당황하지 않고 '쑤이쑤이 핑안(해마다 평안하기를)'이라고 외워 액운을 되돌립니다. '깨지다(碎)'와 '해(歲)'가 같은 발음인 점을 이용한 말놀이입니다. 설 연휴는 대만에서 가장 긴 휴일 중 하나로 많은 가게가 며칠간 문을 닫으니, 여행한다면 영업 여부를 꼭 확인하세요."
  }
},
{
  id:"ghost-month-zhongyuan",
  cat:{ j:"祭り・信仰", e:"Festivals & Belief", k:"축제·신앙" },
  zhTitle:"中元節與鬼月：對看不見的世界，多一份體貼",
  title:{ j:"中元節と鬼月——目に見えない世界への、ひとつの心遣い", e:"Ghost Month & the Zhongyuan Festival: A Little Kindness for the Unseen World", k:"중원절과 귀신 달: 보이지 않는 세계를 향한 작은 배려" },
  intro:{
    j:"旧暦七月になると、台湾のあちこちで、店先や家の前に果物やお菓子、飲み物がずらりと並び、線香の煙が立ちのぼります。『鬼月（幽霊の月）』と呼ばれるこのひと月、台湾の人々は怖がるというより、むしろ『あの世からの客人』を丁寧にもてなします。畏れと優しさが同居する、台湾ならではの信仰の世界をのぞいてみましょう。",
    e:"When the seventh lunar month arrives, fruit, snacks, and drinks line up in front of shops and homes all over Taiwan, and incense smoke rises into the air. During this month known as 'Ghost Month,' Taiwanese don't so much fear it as graciously host 'guests from the other world.' Let's peek into a world of belief unique to Taiwan, where awe and kindness live side by side.",
    k:"음력 칠월이 오면 대만 곳곳에서 가게 앞과 집 앞에 과일, 과자, 음료가 죽 늘어서고 향 연기가 피어오릅니다. '귀신 달(鬼月)'이라 불리는 이 한 달, 대만 사람들은 두려워하기보다 오히려 '저세상에서 온 손님'을 정성껏 대접합니다. 두려움과 다정함이 함께하는 대만만의 신앙 세계를 들여다봅시다."
  },
  paras:[
    {
      z:"在台灣的傳統信仰裡，農曆七月被稱為「鬼月」。相傳這個月的一開始，地府的大門會打開，那些平常在另一個世界的靈魂，可以回到人間走走，接受大家的供奉。台灣人不會直接叫他們「鬼」，而是客氣地稱為「好兄弟」，帶著一種尊重和不冒犯的心情。整個七月，社會的氣氛會變得比較收斂、比較謹慎，但並不是充滿恐懼，而更像是「對看不見的客人，多一點禮貌」。",
      py:"Zài Táiwān de chuántǒng xìnyǎng lǐ, nónglì qī yuè bèi chēngwéi “guǐyuè”. Xiāngchuán zhège yuè de yì kāishǐ, dìfǔ de dàmén huì dǎkāi, nàxiē píngcháng zài lìng yí ge shìjiè de línghún, kěyǐ huídào rénjiān zǒuzǒu, jiēshòu dàjiā de gòngfèng. Táiwānrén búhuì zhíjiē jiào tāmen “guǐ”, érshì kèqì de chēngwéi “hǎoxiōngdì”, dàizhe yì zhǒng zūnzhòng hé bú màofàn de xīnqíng. Zhěnggè qī yuè, shèhuì de qìfēn huì biàndé bǐjiào shōuliǎn, bǐjiào jǐnshèn, dàn bìng búshì chōngmǎn kǒngjù, ér gèng xiàng shì “duì kànbújiàn de kèrén, duō yìdiǎn lǐmào”.",
      m:{
        j:"台湾の伝統的な信仰では、旧暦七月は「鬼月（幽霊の月）」と呼ばれます。言い伝えでは、この月の初めに地府（あの世）の門が開き、ふだんは別の世界にいる霊たちが人間界に戻ってきて、人々のお供えを受け取れるとされます。台湾人は彼らを直接「鬼（幽霊）」とは呼ばず、丁寧に「好兄弟（よき兄弟）」と呼び、敬意と、相手を怒らせないという気持ちを込めます。七月のあいだ、社会の空気は少し控えめで慎重になりますが、恐怖に満ちているわけではなく、むしろ「目に見えないお客さんに、もう少し礼儀正しく」といった感覚に近いのです。",
        e:"In Taiwan's traditional beliefs, the seventh lunar month is called 'Ghost Month.' Legend says that at the start of this month the gates of the underworld open, and the spirits who normally dwell in the other world can return to the human realm to wander and receive people's offerings. Taiwanese don't call them 'ghosts' outright but politely refer to them as 'good brothers,' with a feeling of respect and a wish not to offend. Throughout the month, the social mood becomes more restrained and careful—yet not full of fear, more like 'showing a little more courtesy to unseen guests.'",
        k:"대만의 전통 신앙에서 음력 칠월은 '귀신 달'이라 불립니다. 전해지는 이야기로는 이 달 초에 저승의 문이 열려, 평소 다른 세계에 있던 영혼들이 인간 세상으로 돌아와 거닐며 사람들의 제물을 받을 수 있다고 합니다. 대만 사람들은 그들을 직접 '귀신'이라 부르지 않고 정중하게 '좋은 형제(好兄弟)'라 부르며 존중과 상대를 거스르지 않으려는 마음을 담습니다. 칠월 내내 사회 분위기는 다소 조심스럽고 신중해지지만 두려움으로 가득한 것은 아니고, 오히려 '보이지 않는 손님에게 조금 더 예의를 갖추는' 느낌에 가깝습니다."
      }
    },
    {
      z:"鬼月最重要的活動，就是「普渡」。所謂普渡，是準備豐盛的供品，來款待這些回到人間的好兄弟，讓他們吃飽、被照顧到，不會因為沒人理會而作亂。家庭、公司、社區、廟宇都會辦普渡：桌上擺滿水果、餅乾、飲料、泡麵、零食，還有整隻雞、整條魚，前面點著香和蠟燭。拜完之後，這些供品並不會浪費，而是分給大家一起吃，象徵和好兄弟「共享」這份心意。",
      py:"Guǐyuè zuì zhòngyào de huódòng, jiùshì “pǔdù”. Suǒwèi pǔdù, shì zhǔnbèi fēngshèng de gòngpǐn, lái kuǎndài zhèxiē huídào rénjiān de hǎoxiōngdì, ràng tāmen chībǎo, bèi zhàogùdào, búhuì yīnwèi méi rén lǐhuì ér zuòluàn. Jiātíng, gōngsī, shèqū, miàoyǔ dōu huì bàn pǔdù: zhuō shàng bǎimǎn shuǐguǒ, bǐnggān, yǐnliào, pàomiàn, língshí, háiyǒu zhěng zhī jī, zhěng tiáo yú, qiánmiàn diǎnzhe xiāng hé làzhú. Bài wán zhīhòu, zhèxiē gòngpǐn bìng búhuì làngfèi, érshì fēn gěi dàjiā yìqǐ chī, xiàngzhēng hé hǎoxiōngdì “gòngxiǎng” zhè fèn xīnyì.",
      m:{
        j:"鬼月で最も大切な行事が「普渡（施餓鬼供養）」です。普渡とは、豊かなお供えを用意して、人間界に戻ってきた好兄弟をもてなし、彼らに満腹になってもらい、きちんと世話を受けてもらうことで、誰にも構われず暴れることのないようにする、というものです。家庭、会社、地域、寺廟がそれぞれ普渡を行います。机の上には果物、ビスケット、飲み物、インスタントラーメン、お菓子がずらりと並び、鶏一羽、魚一尾を丸ごと供え、その前で線香とろうそくを灯します。お参りが済んだあと、これらのお供えは無駄にはならず、みんなで分け合って食べます。好兄弟とこの気持ちを「分かち合う」象徴なのです。",
        e:"The most important activity of Ghost Month is 'pǔdù' (the universal deliverance rite). Pǔdù means preparing lavish offerings to host these good brothers who have returned to the human world—letting them eat their fill and be cared for so they won't cause trouble out of neglect. Families, companies, communities, and temples all hold pǔdù: tables are piled with fruit, biscuits, drinks, instant noodles, and snacks, plus a whole chicken and a whole fish, with incense and candles burning in front. After the worship, the offerings aren't wasted but shared among everyone, symbolizing 'sharing' this gesture of care with the good brothers.",
        k:"귀신 달에서 가장 중요한 행사는 '보도(普渡)'입니다. 보도란 푸짐한 제물을 준비해 인간 세상으로 돌아온 좋은 형제들을 대접하여, 그들이 배불리 먹고 보살핌을 받아 아무도 돌보지 않아 소란을 피우는 일이 없도록 하는 것입니다. 가정, 회사, 지역, 사찰이 저마다 보도를 행합니다. 상 위에는 과일, 과자, 음료, 라면, 간식이 가득 놓이고, 닭 한 마리와 생선 한 마리를 통째로 올리며 그 앞에 향과 초를 밝힙니다. 참배가 끝난 뒤 이 제물들은 낭비되지 않고 모두 나눠 먹습니다. 좋은 형제와 이 마음을 '함께 나누는' 상징입니다."
      }
    },
    {
      z:"為了讓好兄弟找得到路，也有一些貼心的安排。有些地方會在河邊或海邊「放水燈」，讓一盞盞小燈順著水流漂走，替水裡的靈魂照亮回家的方向。廟口也常常搭起高高的「孤棚」，把供品高高疊起，場面十分壯觀。這些儀式看起來熱鬧，背後其實藏著一種很溫柔的想法：不管是誰、來自哪裡、有沒有後人祭拜，在這個月，都值得被好好對待。",
      py:"Wèile ràng hǎoxiōngdì zhǎodedào lù, yě yǒu yìxiē tiēxīn de ānpái. Yǒuxiē dìfāng huì zài hébiān huò hǎibiān “fàng shuǐdēng”, ràng yì zhǎn zhǎn xiǎo dēng shùnzhe shuǐliú piāozǒu, tì shuǐ lǐ de línghún zhàoliàng huíjiā de fāngxiàng. Miàokǒu yě chángcháng dā qǐ gāogāo de “gūpéng”, bǎ gòngpǐn gāogāo dié qǐ, chǎngmiàn shífēn zhuàngguān. Zhèxiē yíshì kànqǐlái rènào, bèihòu qíshí cángzhe yì zhǒng hěn wēnróu de xiǎngfǎ: bùguǎn shì shéi, láizì nǎlǐ, yǒu méiyǒu hòurén jìbài, zài zhège yuè, dōu zhídé bèi hǎohǎo duìdài.",
      m:{
        j:"好兄弟が道に迷わないよう、心遣いの仕掛けもあります。地域によっては川辺や海辺で「放水燈（灯籠流し）」を行い、小さな灯りを一つひとつ水の流れに乗せて流し、水中の霊たちに帰り道を照らしてあげます。廟の前には、高くそびえる「孤棚（供物を積み上げる棚）」がしばしば組まれ、お供えを高々と積み上げて、たいへん壮観です。これらの儀式は華やかに見えますが、その裏には実はとても優しい考えが隠れています。誰であろうと、どこから来ようと、供養してくれる子孫がいようといまいと、この月には、みな丁重にもてなされる価値がある——という思いです。",
        e:"To help the good brothers find their way, there are thoughtful arrangements too. In some places people 'float water lanterns' on rivers or by the sea, letting small lights drift along the current to light the way home for spirits in the water. In front of temples, tall 'lonely-soul scaffolds' are often built, stacking offerings up high in a truly spectacular sight. These rituals look festive, but behind them hides a very gentle idea: no matter who you are, where you come from, or whether you have descendants to make offerings, in this month everyone deserves to be treated well.",
        k:"좋은 형제가 길을 잃지 않도록 세심한 장치도 있습니다. 어떤 곳에서는 강가나 바닷가에서 '물 등불 띄우기(放水燈)'를 하여, 작은 등불을 하나하나 물결에 실어 흘려보내 물속 영혼에게 돌아갈 길을 밝혀 줍니다. 사당 앞에는 높이 솟은 '고붕(孤棚, 제물을 쌓는 시렁)'을 자주 세워 제물을 높이 쌓아 올려 매우 장관을 이룹니다. 이 의식들은 화려해 보이지만 그 뒤에는 사실 아주 다정한 생각이 담겨 있습니다. 누구든, 어디서 왔든, 제사 지내 줄 후손이 있든 없든 이 달에는 모두 잘 대접받을 자격이 있다는 마음입니다."
      }
    },
    {
      z:"鬼月也有不少「禁忌」，也就是長輩會提醒你「這個月最好不要做」的事。比較常聽到的有：晚上不要去海邊、河邊玩水，因為傳說水裡的靈魂會「找替身」；晚上曬在外面的衣服要收進來，避免被好兄弟「借去穿」；半夜聽到有人叫你的名字，不要隨便回頭答應。此外，這個月一般也不太適合搬家、結婚、開刀等重要的事，很多人會盡量避開，等七月過了再進行。",
      py:"Guǐyuè yě yǒu bùshǎo “jìnjì”, yě jiùshì zhǎngbèi huì tíxǐng nǐ “zhège yuè zuìhǎo búyào zuò” de shì. Bǐjiào cháng tīngdào de yǒu: wǎnshàng búyào qù hǎibiān, hébiān wánshuǐ, yīnwèi chuánshuō shuǐ lǐ de línghún huì “zhǎo tìshēn”; wǎnshàng shài zài wàimiàn de yīfú yào shōu jìnlái, bìmiǎn bèi hǎoxiōngdì “jièqù chuān”; bànyè tīngdào yǒurén jiào nǐ de míngzì, búyào suíbiàn huítóu dāying. Cǐwài, zhège yuè yìbān yě bú tài shìhé bānjiā, jiéhūn, kāidāo děng zhòngyào de shì, hěnduō rén huì jǐnliàng bìkāi, děng qī yuè guò le zài jìnxíng.",
      m:{
        j:"鬼月には「禁忌（タブー）」も少なくありません。年長者が「今月はやめておいたほうがいい」と注意してくれることです。よく耳にするものとしては——夜に海辺や川辺で水遊びをしない（水中の霊が「身代わりを探す」という言い伝えがあるため）、夜に外に干した服は取り込む（好兄弟に「借りて着られる」のを避けるため）、真夜中に誰かに名前を呼ばれても、うかつに振り返って返事をしない、など。さらにこの月は一般に、引っ越し・結婚・手術などの重要事もあまり向かないとされ、多くの人は七月が過ぎるのを待ってから行うよう、できるだけ避けます。",
        e:"Ghost Month also has quite a few 'taboos'—things your elders will remind you are 'best not to do this month.' Commonly heard ones include: don't go swimming at the beach or river at night, because legend says water spirits look for 'a substitute'; bring in clothes left drying outside at night so the good brothers don't 'borrow and wear' them; and if you hear someone call your name in the dead of night, don't casually turn around and answer. Moreover, this month is generally seen as unsuitable for important matters like moving house, getting married, or having surgery, so many people try to avoid them and wait until the seventh month has passed.",
        k:"귀신 달에는 '금기(터부)'도 적지 않습니다. 어른들이 '이번 달엔 안 하는 게 좋다'고 일러 주는 일들입니다. 자주 듣는 것으로는—밤에 바닷가나 강가에서 물놀이하지 않기(물속 영혼이 '대신할 사람을 찾는다'는 이야기 때문), 밤에 밖에 널어 둔 옷은 걷어 들이기(좋은 형제가 '빌려 입는' 것을 피하려고), 한밤중에 누군가 이름을 부르면 함부로 돌아보며 대답하지 않기 등이 있습니다. 또 이 달은 대체로 이사, 결혼, 수술 같은 중요한 일에 적합하지 않다고 여겨져, 많은 사람이 되도록 피하고 칠월이 지나기를 기다렸다가 진행합니다."
      }
    },
    {
      z:"到了農曆七月十五，就是整個鬼月的高潮——「中元節」。這一天，家家戶戶和大大小小的廟宇都會舉行最盛大的普渡，感謝天地、祭拜祖先，也普施給所有的好兄弟。中元節其實融合了民間信仰、道教的「中元」和佛教的「盂蘭盆」等好幾種傳統，核心的精神很接近：慎終追遠、體恤亡者，也提醒活著的人要懂得感恩與分享。",
      py:"Dàole nónglì qī yuè shíwǔ, jiùshì zhěnggè guǐyuè de gāocháo——“Zhōngyuánjié”. Zhè yì tiān, jiājiā-hùhù hé dàdà-xiǎoxiǎo de miàoyǔ dōu huì jǔxíng zuì shèngdà de pǔdù, gǎnxiè tiāndì, jìbài zǔxiān, yě pǔshī gěi suǒyǒu de hǎoxiōngdì. Zhōngyuánjié qíshí rónghé le mínjiān xìnyǎng, Dàojiào de “zhōngyuán” hé Fójiào de “yúlánpén” děng hǎojǐ zhǒng chuántǒng, héxīn de jīngshén hěn jiējìn: shènzhōng-zhuīyuǎn, tǐxù wángzhě, yě tíxǐng huózhe de rén yào dǒngdé gǎn'ēn yǔ fēnxiǎng.",
      m:{
        j:"旧暦七月十五日になると、鬼月全体のクライマックス——「中元節」です。この日、家々や大小さまざまな寺廟が、最も盛大な普渡を執り行い、天地に感謝し、祖先を祀り、すべての好兄弟にあまねく施しをします。中元節は実は、民間信仰、道教の「中元」、仏教の「盂蘭盆（うらぼん）」など、いくつもの伝統が融合したものですが、核となる精神はどれもよく似ています。亡くなった人を敬い偲び（慎終追遠）、死者を思いやり、そして生きている者にも、感謝と分かち合いの心を忘れないよう促す——というものです。",
        e:"On the fifteenth day of the seventh lunar month comes the climax of the whole Ghost Month—the 'Zhongyuan Festival.' On this day, every household and temples large and small hold their grandest pǔdù, giving thanks to heaven and earth, honoring ancestors, and offering alms to all the good brothers. Zhongyuan actually blends several traditions—folk belief, the Taoist 'Zhongyuan,' and the Buddhist 'Ullambana'—but the core spirit is much alike: honoring and remembering the departed, showing compassion for the dead, and reminding the living to know gratitude and sharing.",
        k:"음력 칠월 보름이 되면 귀신 달 전체의 절정인 '중원절'입니다. 이날 집집마다, 크고 작은 사찰마다 가장 성대한 보도를 열어 천지에 감사하고 조상을 모시며 모든 좋은 형제에게 두루 베풉니다. 중원절은 사실 민간 신앙, 도교의 '중원', 불교의 '우란분' 등 여러 전통이 어우러진 것이지만 핵심 정신은 서로 비슷합니다. 세상을 떠난 이를 공경하고 추모하며, 죽은 자를 헤아리고, 살아 있는 이에게도 감사와 나눔의 마음을 잊지 말라고 일깨우는 것입니다."
      }
    },
    {
      z:"對外國人來說，鬼月剛開始可能覺得有點神秘、甚至有點可怕，但只要多了解一點，就會發現它其實充滿人情味。台灣人並不是活在恐懼裡，而是用一種「有拜有保庇」的心情，跟看不見的世界維持一份和平相處。你不必完全相信這些習俗，但如果願意在拜拜的桌前停下腳步，安靜地看一看，也許就能體會到：這是一個社會對生命、對死亡、對記憶，所保留的一份溫柔與敬意。",
      py:"Duì wàiguórén lái shuō, guǐyuè gāng kāishǐ kěnéng juéde yǒudiǎn shénmì, shènzhì yǒudiǎn kěpà, dàn zhǐyào duō liǎojiě yìdiǎn, jiù huì fāxiàn tā qíshí chōngmǎn rénqíngwèi. Táiwānrén bìng búshì huó zài kǒngjù lǐ, érshì yòng yì zhǒng “yǒu bài yǒu bǎobì” de xīnqíng, gēn kànbújiàn de shìjiè wéichí yí fèn hépíng xiāngchǔ. Nǐ búbì wánquán xiāngxìn zhèxiē xísú, dàn rúguǒ yuànyì zài bàibài de zhuō qián tíngxià jiǎobù, ānjìng de kàn yí kàn, yěxǔ jiù néng tǐhuì dào: zhè shì yí ge shèhuì duì shēngmìng, duì sǐwáng, duì jìyì, suǒ bǎoliú de yí fèn wēnróu yǔ jìngyì.",
      m:{
        j:"外国人にとって、鬼月は最初こそ少し神秘的で、いささか怖いとさえ感じるかもしれません。しかし少し理解を深めれば、実は人情味にあふれていることに気づきます。台湾人は恐怖の中で生きているのではなく、「拝めば守ってもらえる（有拜有保庇）」という気持ちで、目に見えない世界と平和に付き合い続けているのです。これらの習わしを完全に信じる必要はありません。それでも、もしお参りの机の前で足を止め、静かに眺めてみる気になれば、こう感じ取れるかもしれません——これは、一つの社会が、生命に、死に、記憶に対して残してきた、ひとつの優しさと敬意なのだ、と。",
        e:"For foreigners, Ghost Month may at first feel a bit mysterious, even a little frightening, but once you understand it a bit more, you'll find it's actually full of warmth. Taiwanese don't live in fear; rather, with a mindset of 'worship brings protection,' they keep up a peaceful coexistence with the unseen world. You don't have to fully believe these customs, but if you're willing to pause before an offering table and quietly take it in, you may come to feel this: it is the tenderness and respect a society has kept for life, for death, and for memory.",
        k:"외국인에게 귀신 달은 처음엔 조금 신비롭고 심지어 다소 무섭게 느껴질 수도 있습니다. 하지만 조금만 더 이해하면 사실 인정이 넘친다는 걸 알게 됩니다. 대만 사람들은 두려움 속에 사는 것이 아니라 '빌면 보살핌을 받는다(有拜有保庇)'는 마음으로 보이지 않는 세계와 평화롭게 지냅니다. 이 풍습을 완전히 믿을 필요는 없습니다. 그래도 제사상 앞에서 걸음을 멈추고 조용히 바라볼 마음이 든다면 이렇게 느낄지도 모릅니다. 이것은 한 사회가 생명에, 죽음에, 기억에 남겨 둔 하나의 다정함과 경의라고요."
      }
    }
  ],
  vocab:[
    { w:"鬼月", zy:"ㄍㄨㄟˇ ㄩㄝˋ", py:"guǐyuè", m:{ j:"鬼月（旧暦七月）", e:"Ghost Month (the 7th lunar month)", k:"귀신 달(음력 칠월)" } },
    { w:"中元節", zy:"ㄓㄨㄥ ㄩㄢˊ ㄐㄧㄝˊ", py:"Zhōngyuánjié", m:{ j:"中元節（旧暦七月十五日）", e:"Zhongyuan Festival (7/15 lunar)", k:"중원절(음력 7월 15일)" } },
    { w:"普渡", zy:"ㄆㄨˇ ㄉㄨˋ", py:"pǔdù", m:{ j:"普渡・施餓鬼供養", e:"universal deliverance offering rite", k:"보도(영혼을 두루 제도하는 제사)" } },
    { w:"好兄弟", zy:"ㄏㄠˇ ㄒㄩㄥ ㄉㄧˋ", py:"hǎoxiōngdì", m:{ j:"『好兄弟』（幽霊への丁寧な呼び名）", e:"'good brothers' (polite term for ghosts)", k:"'좋은 형제'(귀신의 완곡한 호칭)" } },
    { w:"供品", zy:"ㄍㄨㄥˋ ㄆㄧㄣˇ", py:"gòngpǐn", m:{ j:"お供え物", e:"offerings", k:"제물·공물" } },
    { w:"祭拜", zy:"ㄐㄧˋ ㄅㄞˋ", py:"jìbài", m:{ j:"祀る・お参りする", e:"to worship, make offerings", k:"제사 지내다·참배하다" } },
    { w:"禁忌", zy:"ㄐㄧㄣˋ ㄐㄧˋ", py:"jìnjì", m:{ j:"禁忌・タブー", e:"taboo", k:"금기" } },
    { w:"燒香", zy:"ㄕㄠ ㄒㄧㄤ", py:"shāoxiāng", m:{ j:"線香をあげる", e:"to burn incense", k:"향을 피우다" } },
    { w:"水燈", zy:"ㄕㄨㄟˇ ㄉㄥ", py:"shuǐdēng", m:{ j:"灯籠（水に流す灯り）", e:"water lantern", k:"물 등불" } },
    { w:"祖先", zy:"ㄗㄨˇ ㄒㄧㄢ", py:"zǔxiān", m:{ j:"祖先", e:"ancestors", k:"조상" } },
    { w:"保庇", zy:"ㄅㄠˇ ㄅㄧˋ", py:"bǎobì", m:{ j:"（神仏が）守り加護する（台湾語由来）", e:"to bless and protect (from Taiwanese)", k:"(신불이) 보호하고 가호하다" } },
    { w:"靈魂", zy:"ㄌㄧㄥˊ ㄏㄨㄣˊ", py:"línghún", m:{ j:"霊魂・魂", e:"soul, spirit", k:"영혼" } }
  ],
  note:{
    j:"『好兄弟』という呼び方には、相手を刺激しないための知恵が込められています。台湾では鬼月に限らず、縁起の悪い言葉を避け、遠回しで丁寧な言い方を選ぶ文化があります。また、お供えの果物にも決まりがあり、パイナップル（台湾語で『旺来（ワンライ）』＝繁盛を招く音）は歓迎される一方、バナナ・ナシ・スモモを一緒に供えると台湾語で『招你來（あなたを招く）』と聞こえてしまうため避ける、といった言葉遊びの縁起担ぎもあります。基隆（キールン）の『鶏籠中元祭』は台湾で最も有名な中元行事の一つで、放水燈の幻想的な光景で知られています。",
    e:"The term 'good brothers' carries the wisdom of not provoking the spirits. Beyond Ghost Month, Taiwan has a culture of avoiding inauspicious words and choosing indirect, polite phrasing. There are rules for offering fruit too: pineapple is welcome (in Taiwanese it sounds like 'ong-lai,' inviting prosperity), while offering bananas, pears, and plums together is avoided because in Taiwanese it can sound like 'inviting you to come'—another pun-based superstition. Keelung's 'Chicken-Cage Zhongyuan Festival' is one of Taiwan's most famous Ghost Month events, known for the dreamlike sight of floating water lanterns.",
    k:"'좋은 형제'라는 호칭에는 영혼을 자극하지 않으려는 지혜가 담겨 있습니다. 귀신 달뿐 아니라 대만에는 불길한 말을 피하고 완곡하고 정중한 표현을 고르는 문화가 있습니다. 제물 과일에도 규칙이 있어 파인애플은 환영받지만(대만어로 '왕라이', 번성을 부르는 음), 바나나·배·자두를 함께 올리는 것은 대만어로 '너를 오라고 부른다'처럼 들려 피하는 등 말놀이식 미신도 있습니다. 지룽(基隆)의 '지롱 중원제'는 대만에서 가장 유명한 중원 행사 중 하나로, 물 등불을 띄우는 환상적인 광경으로 알려져 있습니다."
  }
},
{
  id:"mazu-pilgrimage",
  cat:{ j:"祭り・信仰", e:"Festivals & Belief", k:"축제·신앙" },
  zhTitle:"媽祖遶境：跟著神明走上百公里的信仰之路",
  title:{ j:"媽祖巡行——神さまとともに百キロを歩く信仰の道", e:"The Mazu Pilgrimage: Walking a Hundred Kilometers Alongside a Goddess", k:"마조 순행: 신과 함께 백 킬로미터를 걷는 신앙의 길" },
  intro:{
    j:"毎年春、台湾中部の小さな町から、一体の女神の神輿が九日間の旅に出ます。三百キロ以上を歩き、数百万人が沿道に集い、疲れも忘れて神輿を追いかける——『大甲媽祖遶境』は、いまや世界最大級の宗教行事の一つに数えられます。台湾人の心の奥にある、海の女神『媽祖』への深い信頼をのぞいてみましょう。",
    e:"Every spring, from a small town in central Taiwan, the palanquin of a goddess sets out on a nine-day journey. It travels over three hundred kilometers on foot, millions gather along the route, and people forget their exhaustion to follow the palanquin—the 'Dajia Mazu Pilgrimage' is now counted among the world's largest religious events. Let's peek into the deep trust Taiwanese hold, deep in their hearts, for Mazu, goddess of the sea.",
    k:"해마다 봄, 대만 중부의 작은 마을에서 한 여신의 가마가 아흐레 여정에 오릅니다. 삼백 킬로미터 넘게 걸어가고 수백만 명이 길가에 모여 피로도 잊은 채 가마를 쫓습니다—'다자 마조 순행'은 이제 세계 최대급 종교 행사 중 하나로 꼽힙니다. 대만 사람의 마음 깊은 곳에 있는 바다의 여신 '마조'를 향한 깊은 신뢰를 들여다봅시다."
  },
  paras:[
    {
      z:"要了解「媽祖遶境」，得先認識「媽祖」這位神明。相傳媽祖本名林默娘，是一千多年前住在海邊的女子，心地善良、能預知天氣，經常在風浪中拯救出海的漁民和船隻。她過世之後，人們相信她化為守護海上平安的女神，尊稱她為「媽祖」。台灣四面環海，早年許多先民渡海而來，媽祖自然成為最受信賴、香火最旺的神明之一。",
      py:"Yào liǎojiě “Māzǔ ràojìng”, děi xiān rènshì “Māzǔ” zhè wèi shénmíng. Xiāngchuán Māzǔ běnmíng Lín Mòniáng, shì yìqiān duō nián qián zhù zài hǎibiān de nǚzǐ, xīndì shànliáng, néng yùzhī tiānqì, jīngcháng zài fēnglàng zhōng zhěngjiù chūhǎi de yúmín hé chuánzhī. Tā guòshì zhīhòu, rénmen xiāngxìn tā huàwéi shǒuhù hǎishàng píng'ān de nǚshén, zūnchēng tā wéi “Māzǔ”. Táiwān sìmiàn huánhǎi, zǎonián xǔduō xiānmín dùhǎi ér lái, Māzǔ zìrán chéngwéi zuì shòu xìnlài, xiānghuǒ zuì wàng de shénmíng zhī yī.",
      m:{
        j:"「媽祖遶境（媽祖巡行）」を理解するには、まず「媽祖」という神さまを知る必要があります。言い伝えでは、媽祖の本名は林默娘（りん・もくじょう）といい、千年余り前に海辺に住んでいた女性で、心優しく、天気を予知でき、しばしば風波の中で漁に出た漁民や船を救ったとされます。彼女が世を去ったのち、人々は彼女が海上の平安を守る女神になったと信じ、「媽祖」と敬って呼びました。台湾は四方を海に囲まれ、昔、多くの先人が海を渡ってやってきたため、媽祖は自然と、最も信頼され、最も参拝者の多い（香火が盛んな）神さまの一柱となりました。",
        e:"To understand the 'Mazu pilgrimage,' you first need to know the goddess Mazu. Legend says Mazu's given name was Lin Moniang, a woman who lived by the sea over a thousand years ago—kind-hearted and able to foresee the weather, she often saved fishermen and boats caught in storms. After she passed away, people believed she became a goddess guarding safety at sea and honored her as 'Mazu.' Taiwan is surrounded by ocean, and in earlier times many settlers crossed the sea to reach it, so Mazu naturally became one of the most trusted and most widely worshipped deities.",
        k:"'마조 순행'을 이해하려면 먼저 '마조'라는 신을 알아야 합니다. 전설에 따르면 마조의 본명은 린모냥(林默娘)으로, 천여 년 전 바닷가에 살던 여성이며 마음씨가 착하고 날씨를 예지할 수 있어 자주 풍랑 속에서 바다에 나간 어민과 배를 구했다고 합니다. 그녀가 세상을 떠난 뒤 사람들은 그녀가 해상의 평안을 지키는 여신이 되었다고 믿고 '마조'라 높여 불렀습니다. 대만은 사방이 바다로 둘러싸여 있고 옛날 많은 선조가 바다를 건너왔기에, 마조는 자연스레 가장 신뢰받고 참배객이 가장 많은 신 중 하나가 되었습니다."
      }
    },
    {
      z:"所謂「遶境」，就是把廟裡的媽祖神像請上神轎，抬著祂沿途巡視信徒居住的地方，象徵媽祖親自出巡、賜福給沿路的百姓。台灣中部的「大甲媽祖遶境」規模最大，也最有名。每年農曆三月，來自台中大甲鎮瀾宮的媽祖，會展開一趟為期九天八夜、來回三百多公里的徒步旅程，經過台中、彰化、雲林、嘉義好幾個縣市，最後再回到大甲。",
      py:"Suǒwèi “ràojìng”, jiùshì bǎ miào lǐ de Māzǔ shénxiàng qǐng shàng shénjiào, táizhe tā yántú xúnshì xìntú jūzhù de dìfāng, xiàngzhēng Māzǔ qīnzì chūxún, cìfú gěi yánlù de bǎixìng. Táiwān zhōngbù de “Dàjiǎ Māzǔ ràojìng” guīmó zuìdà, yě zuì yǒumíng. Měinián nónglì sān yuè, láizì Táizhōng Dàjiǎ Zhènlángōng de Māzǔ, huì zhǎnkāi yí tàng wéiqī jiǔ tiān bā yè, láihuí sānbǎi duō gōnglǐ de túbù lǚchéng, jīngguò Táizhōng, Zhānghuà, Yúnlín, Jiāyì hǎojǐ ge xiànshì, zuìhòu zài huídào Dàjiǎ.",
      m:{
        j:"いわゆる「遶境（巡行）」とは、廟に祀られた媽祖の神像を神輿にお乗せし、それを担いで信徒の住む地域を沿道にわたって巡ることで、媽祖が自ら出向いて道すがらの人々に福を授ける、という象徴です。台湾中部の「大甲媽祖遶境」が最も規模が大きく、最も有名です。毎年旧暦三月、台中・大甲の鎮瀾宮（ちんらんぐう）の媽祖が、九日八夜、往復三百キロ以上に及ぶ徒歩の旅に出発し、台中・彰化・雲林・嘉義といういくつもの県市を通り、最後にまた大甲へと戻ります。",
        e:"A 'ràojìng' (procession, literally 'circuit of the territory') means placing the temple's Mazu statue on a sacred palanquin and carrying her to inspect the places where devotees live along the route—symbolizing Mazu going out in person to bestow blessings on the people along the way. Central Taiwan's 'Dajia Mazu Pilgrimage' is the largest and most famous. Every third lunar month, the Mazu of Zhenlan Temple in Dajia, Taichung sets out on a nine-day, eight-night walking journey of over three hundred kilometers round trip, passing through Taichung, Changhua, Yunlin, and Chiayi before finally returning to Dajia.",
        k:"이른바 '순행(遶境)'이란 사당에 모신 마조 신상을 신가마에 태우고, 그것을 메고 신도들이 사는 지역을 길 따라 두루 살피는 것으로, 마조가 몸소 나서 길가의 백성에게 복을 내린다는 상징입니다. 대만 중부의 '다자 마조 순행'이 규모가 가장 크고 가장 유명합니다. 해마다 음력 삼월, 타이중 다자 전란궁(鎮瀾宮)의 마조가 아흐레 여드레 밤, 왕복 삼백 킬로미터가 넘는 도보 여정을 떠나 타이중, 장화, 윈린, 자이 등 여러 현·시를 지나 마지막에 다시 다자로 돌아옵니다."
      }
    },
    {
      z:"遶境隊伍最前面，是各式各樣的「陣頭」。陣頭是廟會裡負責表演、開路、護衛神明的隊伍，有踩著鼓聲前進的、有揮舞旗幟的，也有大家最熟悉的「電音三太子」——把傳統神將和電子音樂結合，一邊跳舞一邊前進，非常有台灣特色。此外還有「報馬仔」負責通報、「頭旗」在前面帶路，一整支隊伍浩浩蕩蕩，光是看陣頭經過，就足以感受到那股熱鬧滾滾的能量。",
      py:"Ràojìng duìwǔ zuì qiánmiàn, shì gèshì-gèyàng de “zhèntóu”. Zhèntóu shì miàohuì lǐ fùzé biǎoyǎn, kāilù, hùwèi shénmíng de duìwǔ, yǒu cǎizhe gǔshēng qiánjìn de, yǒu huīwǔ qízhì de, yě yǒu dàjiā zuì shúxī de “diànyīn sān tàizǐ”——bǎ chuántǒng shénjiàng hé diànzǐ yīnyuè jiéhé, yìbiān tiàowǔ yìbiān qiánjìn, fēicháng yǒu Táiwān tèsè. Cǐwài háiyǒu “bàomǎzǎi” fùzé tōngbào, “tóuqí” zài qiánmiàn dàilù, yì zhěng zhī duìwǔ hàohào-dàngdàng, guāng shì kàn zhèntóu jīngguò, jiù zúyǐ gǎnshòudào nà gǔ rènào-gǔngǔn de néngliàng.",
      m:{
        j:"巡行の行列の先頭を行くのは、さまざまな「陣頭（じんとう）」です。陣頭とは、廟の祭りで演舞・露払い・神さまの護衛を担う一団で、太鼓の音に合わせて進むもの、旗を振るもの、そしてみんながよく知る「電音三太子（エレクトロ三太子）」——伝統的な神将の人形とエレクトロ・ミュージックを組み合わせ、踊りながら進む、実に台湾らしいものもあります。さらに、先触れを担う「報馬仔（ほうまや）」、先頭で道を導く「頭旗（とうき）」もいて、行列全体が堂々と連なります。陣頭が通り過ぎるのを見るだけでも、あの沸き立つような熱気を十分に感じ取れます。",
        e:"At the very front of the procession are all kinds of 'zhèntóu' (performance troupes). Zhèntóu are the groups in temple festivals responsible for performing, clearing the way, and guarding the deity—some advancing to drumbeats, some waving flags, and the one everyone knows best, the 'Electro-Techno Third Prince,' which fuses traditional deity-costume figures with electronic music, dancing as it moves forward—very distinctively Taiwanese. There's also the 'herald' who announces the way and the 'head banner' leading in front; the whole procession stretches out grandly. Just watching the zhèntóu pass is enough to feel that surging, boisterous energy.",
        k:"순행 행렬의 맨 앞에는 온갖 '진두(陣頭)'가 섭니다. 진두는 사당 축제에서 공연, 길 트기, 신 호위를 맡는 무리로, 북소리에 맞춰 나아가는 것, 깃발을 흔드는 것, 그리고 모두가 가장 잘 아는 '일렉트로 삼태자'—전통 신장 인형과 전자 음악을 결합해 춤추며 나아가는, 매우 대만다운 것도 있습니다. 또 소식을 알리는 '보마자', 앞에서 길을 이끄는 '두기'도 있어 행렬 전체가 당당하게 이어집니다. 진두가 지나가는 것만 봐도 그 들끓는 열기를 충분히 느낄 수 있습니다."
      }
    },
    {
      z:"整場遶境裡，最令人動容的，是信徒「鑽轎腳」的畫面。當媽祖的神轎經過時，許多信徒會跪趴在地上，讓沉重的神轎從自己的身體上方抬過去，相信這樣能得到媽祖的保佑，消災解厄。有的人為家中生病的親人祈福，有的人求事業、求平安、求心安。看著白髮的阿嬤、抱著嬰兒的媽媽、西裝筆挺的上班族一起跪在路上，你會明白，這不只是一場活動，而是無數人把最深的心願，交託給一位女神。",
      py:"Zhěng chǎng ràojìng lǐ, zuì lìng rén dòngróng de, shì xìntú “zuān jiàojiǎo” de huàmiàn. Dāng Māzǔ de shénjiào jīngguò shí, xǔduō xìntú huì guì pā zài dìshàng, ràng chénzhòng de shénjiào cóng zìjǐ de shēntǐ shàngfāng tái guòqù, xiāngxìn zhèyàng néng dédào Māzǔ de bǎoyòu, xiāozāi-jiě'è. Yǒude rén wèi jiā zhōng shēngbìng de qīnrén qífú, yǒude rén qiú shìyè, qiú píng'ān, qiú xīn'ān. Kànzhe báifà de āmà, bàozhe yīng'ér de māma, xīzhuāng bǐtǐng de shàngbānzú yìqǐ guì zài lù shàng, nǐ huì míngbái, zhè bùzhǐ shì yì chǎng huódòng, érshì wúshù rén bǎ zuì shēn de xīnyuàn, jiāotuō gěi yí wèi nǚshén.",
      m:{
        j:"巡行全体のなかで最も心を打つのが、信徒が「鑽轎腳（かんきょうきゃく／神輿の下をくぐる）」場面です。媽祖の神輿が通るとき、多くの信徒は地面にひれ伏し、重い神輿を自分の体の上を通り抜けさせます。こうすれば媽祖の加護を得て、災いを消し厄を払えると信じているのです。ある人は病気の家族のために祈り、ある人は仕事の成功を、平安を、心の安らぎを求めます。白髪のおばあさん、赤ん坊を抱いた母親、パリッとスーツを着た会社員が、一緒に路上にひざまずく——その姿を見れば、これが単なるイベントではなく、無数の人が最も深い願いを一柱の女神に託しているのだと分かるでしょう。",
        e:"The most moving scene in the whole pilgrimage is devotees 'passing under the palanquin.' As Mazu's sacred palanquin comes by, many devotees kneel and prostrate on the ground, letting the heavy palanquin be carried over their bodies, believing this brings Mazu's protection and dispels misfortune. Some pray for a sick family member, some seek success in their careers, safety, or peace of mind. Watching white-haired grandmothers, mothers cradling infants, and sharply suited office workers kneel together on the road, you'll understand this is not just an event but countless people entrusting their deepest wishes to a goddess.",
        k:"순행 전체에서 가장 마음을 울리는 것은 신도가 '가마 밑을 지나가는(鑽轎腳)' 장면입니다. 마조의 신가마가 지날 때 많은 신도가 땅에 엎드려 무거운 가마가 자기 몸 위로 지나가게 합니다. 이렇게 하면 마조의 가호를 얻어 재앙을 없애고 액을 물리칠 수 있다고 믿습니다. 어떤 이는 병든 가족을 위해 빌고, 어떤 이는 사업, 평안, 마음의 안녕을 구합니다. 백발의 할머니, 아기를 안은 어머니, 말끔한 정장의 직장인이 함께 길 위에 무릎 꿇은 모습을 보면, 이것이 단순한 행사가 아니라 수많은 사람이 가장 깊은 소원을 한 여신에게 맡기는 일임을 알게 됩니다."
      }
    },
    {
      z:"遶境的路上，還有一件事讓許多外國人非常驚訝——沿途的「無私招待」。神轎和信徒經過的城鎮，家家戶戶會把飯菜、水果、飲料、點心擺出來，免費請所有跟著走的香客吃。有人煮上百碗麵，有人提供地方讓大家休息、洗澡，甚至幫忙按摩痠痛的雙腳。這些人多半不求回報，只因為相信「幫助遠道而來的香客，就是替媽祖做好事」，也是替自己和家人積福。這種人與人之間的溫暖，正是遶境最動人的風景。",
      py:"Ràojìng de lù shàng, háiyǒu yí jiàn shì ràng xǔduō wàiguórén fēicháng jīngyà——yántú de “wúsī zhāodài”. Shénjiào hé xìntú jīngguò de chéngzhèn, jiājiā-hùhù huì bǎ fàncài, shuǐguǒ, yǐnliào, diǎnxīn bǎi chūlái, miǎnfèi qǐng suǒyǒu gēnzhe zǒu de xiāngkè chī. Yǒurén zhǔ shàngbǎi wǎn miàn, yǒurén tígōng dìfāng ràng dàjiā xiūxí, xǐzǎo, shènzhì bāngmáng ànmó suāntòng de shuāng jiǎo. Zhèxiē rén duōbàn bù qiú huíbào, zhǐ yīnwèi xiāngxìn “bāngzhù yuǎndào ér lái de xiāngkè, jiùshì tì Māzǔ zuò hǎoshì”, yěshì tì zìjǐ hé jiārén jīfú. Zhè zhǒng rén yǔ rén zhījiān de wēnnuǎn, zhèng shì ràojìng zuì dòngrén de fēngjǐng.",
      m:{
        j:"巡行の道中には、多くの外国人をとても驚かせるものがもう一つあります——沿道での「見返りを求めないもてなし」です。神輿と信徒が通る町では、家々がご飯やおかず、果物、飲み物、お菓子を並べ、ついて歩くすべての巡礼者（香客）を無料でふるまいます。麺を百杯以上も茹でる人、みんなが休んだり体を洗ったりできる場所を提供する人、さらには痛む足をマッサージしてくれる人までいます。彼らの多くは見返りを求めません。ただ「遠くから来た巡礼者を助けることは、媽祖のために善いことをするのと同じ」であり、自分と家族のために徳を積むことにもなる、と信じているからです。この人と人とのあいだの温かさこそ、巡行の最も心を打つ風景です。",
        e:"On the pilgrimage route there's one more thing that astonishes many foreigners—the 'selfless hospitality' along the way. In the towns the palanquin and devotees pass through, households set out meals, fruit, drinks, and snacks, treating all the pilgrims following along for free. Some cook hundreds of bowls of noodles, some offer a place to rest and bathe, and some even massage aching, sore feet. Most ask nothing in return, simply because they believe that 'helping pilgrims who have come from afar is doing good on Mazu's behalf'—and also accumulates blessings for themselves and their families. This human warmth is the most touching sight of the whole pilgrimage.",
        k:"순행 길에는 많은 외국인을 크게 놀라게 하는 것이 하나 더 있습니다—길가의 '대가 없는 대접'입니다. 신가마와 신도가 지나는 마을에서는 집집마다 밥과 반찬, 과일, 음료, 간식을 내놓고 따라 걷는 모든 순례자(향객)에게 무료로 대접합니다. 국수를 백 그릇 넘게 삶는 사람, 모두가 쉬고 씻을 곳을 내주는 사람, 심지어 쑤신 두 발을 안마해 주는 사람까지 있습니다. 이들 대부분은 대가를 바라지 않습니다. 그저 '멀리서 온 순례자를 돕는 것은 마조를 위해 좋은 일을 하는 것'이며 자신과 가족을 위해 덕을 쌓는 일이라 믿기 때문입니다. 이 사람과 사람 사이의 온기야말로 순행의 가장 감동적인 풍경입니다."
      }
    },
    {
      z:"近年來，「大甲媽祖遶境」被許多國際媒體報導，甚至和麥加朝聖、梵蒂岡的活動相提並論，被視為世界規模最大的宗教盛事之一。有趣的是，走上這條路的，不只有虔誠的老信徒，也有很多年輕人、外國背包客、甚至只是想挑戰自己的人。他們或許不完全懂得所有儀式，卻在九天的徒步裡，體會到台灣社會最深層的東西：一種對信仰的虔誠、對陌生人的善意，以及那份「人在路上，心有所寄」的踏實與感動。",
      py:"Jìnnián lái, “Dàjiǎ Māzǔ ràojìng” bèi xǔduō guójì méitǐ bàodǎo, shènzhì hé Màijiā cháoshèng, Fàndìgāng de huódòng xiāngtí-bìnglùn, bèi shìwéi shìjiè guīmó zuìdà de zōngjiào shèngshì zhī yī. Yǒuqù de shì, zǒu shàng zhè tiáo lù de, bùzhǐ yǒu qiánchéng de lǎo xìntú, yě yǒu hěnduō niánqīngrén, wàiguó bèibāokè, shènzhì zhǐshì xiǎng tiǎozhàn zìjǐ de rén. Tāmen huòxǔ bù wánquán dǒngdé suǒyǒu yíshì, què zài jiǔ tiān de túbù lǐ, tǐhuì dào Táiwān shèhuì zuì shēncéng de dōngxi: yì zhǒng duì xìnyǎng de qiánchéng, duì mòshēngrén de shànyì, yǐjí nà fèn “rén zài lù shàng, xīn yǒu suǒ jì” de tāshí yǔ gǎndòng.",
      m:{
        j:"近年、「大甲媽祖遶境」は多くの国際メディアに報じられ、メッカ巡礼やバチカンの行事と並び称されることさえあり、世界最大規模の宗教的祭典の一つと見なされています。興味深いのは、この道を歩くのが敬虔な古参の信徒だけではないことです。多くの若者、外国人バックパッカー、さらには単に自分に挑戦したいという人までいます。彼らはすべての儀式を完全に理解しているわけではないかもしれません。それでも九日間の徒歩のなかで、台湾社会の最も深い部分を体得します——信仰への敬虔さ、見知らぬ人への善意、そして「人は道の上にあり、心には拠りどころがある」という、地に足のついた感動を。",
        e:"In recent years, the 'Dajia Mazu Pilgrimage' has been covered by many international media, even mentioned in the same breath as the Hajj to Mecca and Vatican events, and is regarded as one of the world's largest religious gatherings. Interestingly, those who walk this road are not only devout old believers but also many young people, foreign backpackers, and even people simply wanting to test themselves. They may not fully grasp every ritual, yet over nine days of walking they come to feel the deepest layer of Taiwanese society: a devotion to faith, kindness toward strangers, and that grounded, moving sense of 'being on the road with your heart anchored to something.'",
        k:"최근 '다자 마조 순행'은 여러 국제 언론에 보도되었고, 심지어 메카 순례나 바티칸 행사와 나란히 언급되며 세계 최대 규모의 종교 성사 중 하나로 여겨집니다. 흥미로운 것은 이 길을 걷는 사람이 독실한 노신도만이 아니라는 점입니다. 많은 젊은이, 외국인 배낭여행객, 심지어 그저 자신에게 도전하고 싶은 사람까지 있습니다. 그들은 모든 의식을 완전히 이해하지는 못할지 몰라도, 아흐레의 도보 속에서 대만 사회의 가장 깊은 것을 체득합니다. 신앙을 향한 경건함, 낯선 이를 향한 선의, 그리고 '사람은 길 위에 있고 마음은 기댈 곳이 있다'는 든든하고 뭉클한 감동입니다."
      }
    }
  ],
  vocab:[
    { w:"媽祖", zy:"ㄇㄚ ㄗㄨˇ", py:"Māzǔ", m:{ j:"媽祖（海の女神）", e:"Mazu (goddess of the sea)", k:"마조(바다의 여신)" } },
    { w:"遶境", zy:"ㄖㄠˋ ㄐㄧㄥˋ", py:"ràojìng", m:{ j:"神さまの巡行・巡回", e:"deity's procession around its territory", k:"신의 순행" } },
    { w:"進香", zy:"ㄐㄧㄣˋ ㄒㄧㄤ", py:"jìnxiāng", m:{ j:"（他の廟へ）参拝・巡礼に行く", e:"pilgrimage to offer incense at another temple", k:"다른 사당으로 분향·순례 가기" } },
    { w:"神轎", zy:"ㄕㄣˊ ㄐㄧㄠˋ", py:"shénjiào", m:{ j:"神輿（神像を載せる轎）", e:"sacred palanquin", k:"신가마" } },
    { w:"鑽轎腳", zy:"ㄗㄨㄢ ㄐㄧㄠˋ ㄐㄧㄠˇ", py:"zuān jiàojiǎo", m:{ j:"神輿の下をくぐって加護を受ける儀式", e:"passing under the palanquin for blessing", k:"가마 밑을 지나 가호를 받는 의식" } },
    { w:"陣頭", zy:"ㄓㄣˋ ㄊㄡˊ", py:"zhèntóu", m:{ j:"廟会の演舞・護衛の隊", e:"temple-festival performance troupe", k:"사당 축제 공연·호위대" } },
    { w:"香客", zy:"ㄒㄧㄤ ㄎㄜˋ", py:"xiāngkè", m:{ j:"参拝者・巡礼者", e:"pilgrim, worshipper", k:"순례자·참배객" } },
    { w:"廟宇", zy:"ㄇㄧㄠˋ ㄩˇ", py:"miàoyǔ", m:{ j:"寺廟・お宮", e:"temple", k:"사당·묘우" } },
    { w:"信徒", zy:"ㄒㄧㄣˋ ㄊㄨˊ", py:"xìntú", m:{ j:"信者・信徒", e:"believer, devotee", k:"신도" } },
    { w:"保佑", zy:"ㄅㄠˇ ㄧㄡˋ", py:"bǎoyòu", m:{ j:"（神仏が）守り助ける", e:"to bless and protect", k:"(신불이) 지키고 돕다" } },
    { w:"祈福", zy:"ㄑㄧˊ ㄈㄨˊ", py:"qífú", m:{ j:"福を祈る", e:"to pray for blessings", k:"복을 빌다" } },
    { w:"虔誠", zy:"ㄑㄧㄢˊ ㄔㄥˊ", py:"qiánchéng", m:{ j:"敬虔な・信心深い", e:"devout, pious", k:"경건한·독실한" } }
  ],
  note:{
    j:"『大甲媽祖遶境』の出発の日取りは、毎年『擲筊（じょうこう）』——三日月形の木片『筊杯』を投げ、その表裏で神意を伺う占い——によって媽祖自身に『いつ出発するか』を尋ねて決めるのが伝統です。また、台湾にはもう一つ有名な『白沙屯（はくさとん）媽祖』の巡礼もあり、こちらは決まったルートがなく、神輿の進む方向を媽祖の『意志』に委ねるため、どこへ向かうか誰にも分からないことで知られています。遶境に参加する際は、歩きやすい靴と、日焼け・雨対策をお忘れなく。無理をせず、途中から歩いたり、区間だけ参加したりする人もたくさんいます。",
    e:"The start date of the Dajia Mazu Pilgrimage is traditionally decided by asking Mazu herself 'when to set out,' using 'jiao-cup divination'—tossing crescent-shaped wooden blocks and reading their faces for the deity's will. Taiwan also has another famous pilgrimage, the 'Baishatun Mazu,' which has no fixed route: the palanquin's direction is left to Mazu's 'will,' so no one knows where it will head—which is what it's famous for. If you join a pilgrimage, don't forget comfortable shoes and protection against sun and rain. Don't overdo it; plenty of people join partway or walk only a segment.",
    k:"'다자 마조 순행'의 출발 날짜는 전통적으로 마조 본인에게 '언제 떠날지'를 묻는 '점가(擲筊)'—초승달 모양 나무 조각을 던져 앞뒤로 신의 뜻을 헤아리는 점—로 정합니다. 대만에는 또 하나 유명한 '바이사툰 마조' 순례가 있는데, 정해진 노선이 없이 가마가 나아갈 방향을 마조의 '뜻'에 맡겨 어디로 향할지 아무도 모르는 것으로 알려져 있습니다. 순행에 참가할 때는 걷기 편한 신발과 햇볕·비 대비를 잊지 마세요. 무리하지 말고 중간부터 걷거나 한 구간만 참가하는 사람도 많습니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_4 };
