// StayTW Study — 深度閲讀（追加2）：端午・市場・地震
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_17 = [
  {
    "id": "dragon-boat-festival",
    "cat": {
      "j": "祭り・信仰",
      "e": "Festivals & Belief",
      "k": "축제·신앙"
    },
    "zhTitle": "端午節：粽子、龍舟與立蛋",
    "title": {
      "j": "端午節：ちまき、ドラゴンボート、そして卵立て",
      "e": "Dragon Boat Festival: Zongzi, Dragon Boats, and Standing Eggs",
      "k": "단오절: 쫑쯔, 용선, 그리고 달걀 세우기"
    },
    "intro": {
      "j": "旧暦5月5日は端午節。ちまきを食べ、ドラゴンボートを漕ぎ、お昼には卵を立てる——台湾三大節句の一つを、日常の目線でのぞいてみましょう。",
      "e": "The 5th day of the 5th lunar month is the Dragon Boat Festival. People eat zongzi, race dragon boats, and stand eggs upright at noon. Let's look at one of Taiwan's three biggest festivals up close.",
      "k": "음력 5월 5일은 단오절입니다. 쫑쯔를 먹고 용선을 젓고, 정오에는 달걀을 세웁니다—대만 3대 명절 중 하나를 일상의 눈으로 들여다봅시다."
    },
    "paras": [
      {
        "z": "農曆五月初五是端午節，是台灣三大節日之一。這一天，家家戶戶都會吃粽子。粽子是用竹葉包著糯米，裡面包著豬肉、香菇、鹹蛋黃、花生等等，再用繩子綁好，蒸或煮熟。每到端午前，很多人家會自己包粽子，或是收到長輩、鄰居送來的一串串粽子。那股竹葉和糯米的香味，就是端午節的味道。",
        "py": "Nóng lì wǔ yuè chū wǔ shì duān wǔ jié, shì tái wān sān dà jié rì zhī yī. Zhè yī tiān, jiā jiā hù hù dōu huì chī zòng zi. Zòng zi shì yòng zhú yè bāo zhù nuò mǐ, lǐ miàn bāo zhù zhū ròu, xiāng gū, xián dàn huáng, huā shēng děng děng, zài yòng shéng zi bǎng hǎo, zhēng huò zhǔ shú. Měi dào duān wǔ qián, hěn duō rén jiā huì zì jǐ bāo zòng zi, huò shì shōu dào zhǎng bèi, lín jū sòng lái de yī chuàn chuàn zòng zi. Nà gǔ zhú yè hé nuò mǐ de xiāng wèi, jiù shì duān wǔ jié de wèi dào.",
        "m": {
          "j": "旧暦5月5日は端午節、台湾三大節句の一つです。この日、どの家庭もちまきを食べます。ちまきは竹の葉でもち米を包み、中に豚肉、しいたけ、塩漬け卵黄、ピーナッツなどを入れ、ひもで縛って蒸したり茹でたりします。端午の前になると、自分でちまきを包む家も多く、また目上の人や近所からひと連なりのちまきをもらうこともあります。あの竹の葉ともち米の香りこそ、端午節の味です。",
          "e": "The 5th day of the 5th lunar month is the Dragon Boat Festival, one of Taiwan's three biggest holidays. On this day every household eats zongzi—sticky rice wrapped in bamboo leaves, stuffed with pork, shiitake mushrooms, salted egg yolk, peanuts and more, tied with string and steamed or boiled. As the festival nears, many families wrap their own, or receive strings of zongzi from elders and neighbors. That scent of bamboo leaves and glutinous rice is the very taste of the festival.",
          "k": "음력 5월 5일은 단오절로, 대만 3대 명절 중 하나입니다. 이날 집집마다 쫑쯔를 먹습니다. 쫑쯔는 대나무 잎으로 찹쌀을 싸고 안에 돼지고기, 표고버섯, 소금에 절인 노른자, 땅콩 등을 넣어 끈으로 묶어 찌거나 삶은 것입니다. 단오 전이 되면 직접 쫑쯔를 싸는 집도 많고, 어른이나 이웃에게서 줄줄이 엮인 쫑쯔를 받기도 합니다. 그 대나무 잎과 찹쌀 향이야말로 단오절의 맛입니다."
        }
      },
      {
        "z": "端午節最有看頭的活動，是划龍舟。在河邊或海邊，一艘艘長長的龍舟上坐滿了選手，隨著鼓聲整齊地划槳，船頭還有人負責抓住終點的旗子。岸邊擠滿了加油的人群，鑼鼓喧天，非常熱鬧。這個習俗和古代的傳說有關，據說是為了紀念投江的詩人屈原。",
        "py": "Duān wǔ jié zuì yǒu kàn tóu de huó dòng, shì huà lóng zhōu. Zài hé biān huò hǎi biān, yī sōu sōu zhǎng zhǎng de lóng zhōu shàng zuò mǎn le xuǎn shǒu, suí zhù gǔ shēng zhěng qí dì huà jiǎng, chuán tóu hái yǒu rén fù zé zhuā zhù zhōng diǎn de qí zi. Àn biān jǐ mǎn le jiā yóu de rén qún, luó gǔ xuān tiān, fēi cháng rè nào. Zhè gè xí sú hé gǔ dài de chuán shuō yǒu guān, jù shuō shì wèi le jì niàn tóu jiāng de shī rén qū yuán.",
        "m": {
          "j": "端午節でいちばんの見どころは、ドラゴンボート競争です。川辺や海辺で、細長い龍船に選手がぎっしり乗り込み、太鼓の音に合わせて息を合わせて漕ぎます。船首には、ゴールの旗をつかむ役の人も。岸には応援の人が詰めかけ、銅鑼と太鼓が鳴り響き、大変なにぎわいです。この習わしは古代の伝説に由来し、川に身を投げた詩人・屈原を偲ぶためだと言われています。",
          "e": "The festival's main spectacle is dragon boat racing. On rivers and coasts, long dragon boats fill with rowers who paddle in unison to the beat of a drum, while someone at the bow reaches to grab the finish-line flag. Crowds pack the banks cheering, gongs and drums thundering—it's tremendously lively. The custom traces to an ancient legend, said to commemorate the poet Qu Yuan, who threw himself into a river.",
          "k": "단오절의 최고 볼거리는 용선 경기입니다. 강가나 바닷가에서 길쭉한 용선에 선수들이 가득 타고 북소리에 맞춰 일사불란하게 노를 젓습니다. 뱃머리에는 결승 깃발을 잡는 역할의 사람도 있습니다. 강변에는 응원 인파가 몰리고 징과 북이 울려 퍼져 무척 떠들썩합니다. 이 관습은 고대 전설에서 유래해, 강에 몸을 던진 시인 굴원을 기리기 위한 것이라고 합니다."
        }
      },
      {
        "z": "除了吃粽子和划龍舟，端午節還有一個很有趣的小活動，叫立蛋。傳說在端午節中午十二點，因為某種神秘的力量，雞蛋比較容易立起來。於是這一天中午，很多小孩和大人都會蹲在地上，小心翼翼地把雞蛋直立在桌上或地上。成功的時候，大家都會開心地歡呼。這其實只是一個好玩的遊戲，卻充滿了節日的樂趣。",
        "py": "Chú le chī zòng zi hé huà lóng zhōu, duān wǔ jié hái yǒu yī gè hěn yǒu qù de xiǎo huó dòng, jiào lì dàn. Chuán shuō zài duān wǔ jié zhōng wǔ shí èr diǎn, yīn wèi mǒu zhǒng shén mì de lì liàng, jī dàn bǐ jiào róng yì lì qǐ lái. Yú shì zhè yī tiān zhōng wǔ, hěn duō xiǎo hái hé dà rén dōu huì dūn zài dì shàng, xiǎo xīn yì yì dì bǎ jī dàn zhí lì zài zhuō shàng huò dì shàng. Chéng gōng de shí hòu, dà jiā dōu huì kāi xīn dì huān hū. Zhè qí shí zhǐ shì yī gè hǎo wán de yóu xì, què chōng mǎn le jié rì de lè qù.",
        "m": {
          "j": "ちまきとドラゴンボートのほかに、端午節にはとても面白い小さな行事があります。「卵立て」です。伝説では、端午の正午12時には、ある神秘的な力によって卵が立ちやすくなるのだとか。そこでこの日のお昼、多くの子どもや大人が地面にしゃがみ、慎重に卵をテーブルや床の上に立てようとします。成功すると、みんなうれしそうに歓声を上げます。実際はただの楽しい遊びですが、節句ならではの楽しさに満ちています。",
          "e": "Besides zongzi and dragon boats, the festival has a delightful little activity: standing eggs upright. Legend says that at exactly noon on this day, some mysterious force makes eggs easier to balance. So at midday, many kids and adults crouch on the ground, carefully trying to stand an egg on a table or the floor. When it works, everyone cheers happily. It's really just a fun game, yet it's full of festive joy.",
          "k": "쫑쯔와 용선 말고도 단오절에는 아주 재미있는 작은 행사가 있습니다. 바로 '달걀 세우기'입니다. 전설에 따르면 단오절 정오 12시에는 어떤 신비한 힘으로 달걀이 더 잘 선다고 합니다. 그래서 이날 낮, 많은 아이와 어른이 바닥에 쭈그리고 앉아 조심스럽게 달걀을 탁자나 바닥에 세우려 합니다. 성공하면 모두 기뻐하며 환호합니다. 사실 그저 재미있는 놀이지만 명절다운 즐거움이 가득합니다."
        }
      },
      {
        "z": "端午節正好在夏天的開始，天氣開始變熱，古人認為這是容易生病、蟲蛇出沒的「毒月」。所以端午還有很多驅邪避毒的習俗：門口會掛上艾草和菖蒲，小孩身上會戴香包，有些地方還會喝雄黃酒。這些習俗的背後，其實是古人希望全家在炎熱的季節裡平安健康的心意。",
        "py": "Duān wǔ jié zhèng hǎo zài xià tiān de kāi shǐ, tiān qì kāi shǐ biàn rè, gǔ rén rèn wèi zhè shì róng yì shēng bìng, chóng shé chū méi de\"dú yuè\". Suǒ yǐ duān wǔ hái yǒu hěn duō qū xié bì dú de xí sú: mén kǒu huì guà shàng ài cǎo hé chāng pú, xiǎo hái shēn shàng huì dài xiāng bāo, yǒu xiē dì fāng hái huì hē xióng huáng jiǔ. Zhè xiē xí sú de bèi hòu, qí shí shì gǔ rén xī wàng quán jiā zài yán rè de jì jié lǐ píng ān jiàn kāng de xīn yì.",
        "m": {
          "j": "端午節はちょうど夏の初め、暑くなり始める頃。昔の人はこの時期を、病気になりやすく、虫や蛇が出る「毒月」と考えました。そのため端午には、邪気や毒を払う習わしも多くあります。玄関にヨモギやショウブを掛け、子どもは香り袋を身につけ、地域によっては雄黄酒を飲むことも。これらの習わしの奥には、暑い季節に家族みんなが無事で健康であってほしいという、昔の人の願いが込められています。",
          "e": "The festival falls right at the start of summer, as the heat sets in—a time the ancients saw as a \"poison month\" when illness spreads and insects and snakes appear. So the festival is also full of customs to ward off evil and poison: mugwort and calamus hung by the door, children wearing scented sachets, and in some places drinking realgar wine. Behind these customs lies the old wish for the whole family to stay safe and healthy through the hot season.",
          "k": "단오절은 마침 여름의 시작, 더워지기 시작할 무렵입니다. 옛사람들은 이 시기를 병에 걸리기 쉽고 벌레와 뱀이 나오는 '독월'로 여겼습니다. 그래서 단오에는 액운과 독을 물리치는 관습도 많습니다. 문 앞에 쑥과 창포를 걸고, 아이는 향낭을 차며, 일부 지역에서는 웅황주를 마시기도 합니다. 이 관습들 뒤에는 무더운 계절에 온 가족이 무탈하고 건강하기를 바라는 옛사람의 마음이 담겨 있습니다."
        }
      },
      {
        "z": "對外國人來說，端午節是認識台灣傳統文化很好的機會。你可以去河邊看一場龍舟賽，感受那種全場一起吶喊的氣氛；也可以買幾顆不同口味的粽子來比較看看，從南部粽到北部粽，甚至還有沾糖吃的甜鹼粽。中午別忘了試試立蛋，說不定你就是今年運氣最好的那一個。",
        "py": "Duì wài guó rén lái shuō, duān wǔ jié shì rèn shí tái wān chuán tǒng wén huà hěn hǎo de jī huì. Nǐ kě yǐ qù hé biān kàn yī chǎng lóng zhōu sài, gǎn shòu nà zhǒng quán chǎng yì qǐ nà hǎn de qì fēn; yě kě yǐ mǎi jǐ kē bù tóng kǒu wèi de zòng zi lái bǐ jiào kàn kàn, cóng nán bù zòng dào běi bù zòng, shèn zhì hái yǒu zhān táng chī de tián jiǎn zòng. Zhōng wǔ bié wàng le shì shì lì dàn, shuō bù dìng nǐ jiù shì jīn nián yùn qì zuì hǎo de nà yī gè.",
        "m": {
          "j": "外国人にとって端午節は、台湾の伝統文化を知るとてもよい機会です。川辺でドラゴンボート競争を観て、会場全体が一緒に叫ぶあの雰囲気を味わうのもいいでしょう。味の違うちまきをいくつか買って食べ比べるのも楽しい——南部ちまき、北部ちまき、さらには砂糖をつけて食べる甘いアルカリちまき（鹼粽）まであります。お昼には卵立てもお忘れなく。もしかすると、あなたが今年いちばん運のいい人かもしれません。",
          "e": "For foreigners, the festival is a great chance to get to know Taiwan's traditional culture. You can watch a dragon boat race by the river and feel the whole crowd shouting together, or buy a few zongzi of different styles to compare—southern-style, northern-style, even the sweet alkaline zongzi eaten dipped in sugar. And at noon, don't forget to try standing an egg—you just might be this year's luckiest person.",
          "k": "외국인에게 단오절은 대만 전통문화를 알기에 아주 좋은 기회입니다. 강가에서 용선 경기를 보며 온 현장이 함께 외치는 그 분위기를 느껴 보세요. 맛이 다른 쫑쯔를 몇 개 사서 비교해 먹는 것도 재미있습니다—남부식, 북부식, 심지어 설탕에 찍어 먹는 달콤한 잰쫑까지 있습니다. 정오에는 달걀 세우기도 잊지 마세요. 어쩌면 당신이 올해 가장 운 좋은 사람일지도 모릅니다."
        }
      }
    ],
    "vocab": [
      {
        "w": "端午節",
        "zy": "ㄉㄨㄢ ㄨˇ ㄐㄧㄝˊ",
        "py": "duānwǔjié",
        "m": {
          "j": "端午節",
          "e": "Dragon Boat Festival",
          "k": "단오절"
        }
      },
      {
        "w": "粽子",
        "zy": "ㄗㄨㄥˋ ㄗ˙",
        "py": "zòngzi",
        "m": {
          "j": "ちまき",
          "e": "zongzi (sticky rice dumpling)",
          "k": "쫑쯔(찹쌀 만두)"
        }
      },
      {
        "w": "龍舟",
        "zy": "ㄌㄨㄥˊ ㄓㄡ",
        "py": "lóngzhōu",
        "m": {
          "j": "ドラゴンボート・龍船",
          "e": "dragon boat",
          "k": "용선"
        }
      },
      {
        "w": "糯米",
        "zy": "ㄋㄨㄛˋ ㄇㄧˇ",
        "py": "nuòmǐ",
        "m": {
          "j": "もち米",
          "e": "glutinous rice",
          "k": "찹쌀"
        }
      },
      {
        "w": "立蛋",
        "zy": "ㄌㄧˋ ㄉㄢˋ",
        "py": "lìdàn",
        "m": {
          "j": "卵を立てる遊び",
          "e": "standing an egg upright",
          "k": "달걀 세우기"
        }
      },
      {
        "w": "香包",
        "zy": "ㄒㄧㄤ ㄅㄠ",
        "py": "xiāngbāo",
        "m": {
          "j": "香り袋・匂い袋",
          "e": "scented sachet",
          "k": "향낭"
        }
      },
      {
        "w": "驅邪",
        "zy": "ㄑㄩ ㄒㄧㄝˊ",
        "py": "qūxié",
        "m": {
          "j": "邪気を払う",
          "e": "to ward off evil",
          "k": "액운을 물리치다"
        }
      }
    ],
    "note": {
      "j": "ちまきは地域で違い、南部粽は具を生米と一緒に煮て柔らかく、北部粽は具を炒めてから蒸すので粒立ちがよいのが特徴。端午の卵立ては科学的根拠のない言い伝えですが、家族で盛り上がる楽しい風物詩です。",
      "e": "Zongzi vary by region: southern-style is boiled with the raw rice for a softer texture, while northern-style is stir-fried first and steamed, giving firmer grains. Standing eggs at noon has no scientific basis, but it's a fun family tradition of the season.",
      "k": "쫑쯔는 지역마다 다릅니다. 남부식은 생쌀과 함께 삶아 부드럽고, 북부식은 먼저 볶은 뒤 쪄서 알알이 살아 있습니다. 정오의 달걀 세우기는 과학적 근거는 없지만 온 가족이 즐기는 이 계절의 재미난 전통입니다."
    }
  },
  {
    "id": "traditional-market",
    "cat": {
      "j": "食・グルメ",
      "e": "Food",
      "k": "음식"
    },
    "zhTitle": "菜市場：台灣人的廚房與人情味",
    "title": {
      "j": "伝統市場：台湾の台所と人情",
      "e": "The Traditional Market: Taiwan's Kitchen and Its Warmth",
      "k": "재래시장: 대만의 부엌과 정"
    },
    "intro": {
      "j": "スーパーやコンビニのほかに、台湾には活気あふれる「菜市場（伝統市場）」があります。新鮮で安く、値切りもでき、屋台グルメも。冷たいスーパーにはない「人情味」をのぞいてみましょう。",
      "e": "Beyond supermarkets and convenience stores, Taiwan has the lively traditional market. Fresh, cheap, open to haggling, and full of street food—let's look at the human warmth a cold supermarket can't offer.",
      "k": "슈퍼와 편의점 말고도 대만에는 활기 넘치는 '재래시장'이 있습니다. 신선하고 저렴하며 흥정도 되고 노점 먹거리도 가득—차가운 슈퍼에는 없는 '정'을 들여다봅시다."
    },
    "paras": [
      {
        "z": "在台灣，除了超市和便利商店，還有一個充滿生命力的地方，叫菜市場。清晨的傳統市場裡，人聲鼎沸：賣菜的、賣魚的、賣肉的攤販一個接一個，蔬菜水果堆得像小山，老闆大聲吆喝著今天的價格。這裡的東西不但新鮮，價格通常也比超市便宜，是很多台灣家庭每天採買的地方。",
        "py": "Zài tái wān, chú le chāo shì hé biàn lì shāng diàn, hái yǒu yī gè chōng mǎn shēng mìng lì de dì fāng, jiào cài shì chǎng. Qīng chén de chuán tǒng shì chǎng lǐ, rén shēng dǐng fèi: mài cài de, mài yú de, mài ròu de tān fàn yī gè jiē yī gè, shū cài shuǐ guǒ duī dé xiàng xiǎo shān, lǎo bǎn dà shēng yāo hē zhù jīn tiān de jià gé. Zhè lǐ de dōng xī bù dàn xīn xiān, jià gé tōng cháng yě bǐ chāo shì pián yi, shì hěn duō tái wān jiā tíng měi tiān cǎi mǎi de dì fāng.",
        "m": {
          "j": "台湾には、スーパーやコンビニのほかに、生命力あふれる場所があります。「菜市場（伝統市場）」です。早朝の市場は、人の声でにぎやか。野菜売り、魚売り、肉売りの屋台が次々と並び、野菜や果物は小山のように積まれ、店主は今日の値段を大声で呼びかけます。ここの品はどれも新鮮で、値段もたいていスーパーより安く、多くの台湾の家庭が毎日買い出しに来る場所です。",
          "e": "In Taiwan, beyond supermarkets and convenience stores, there's a place bursting with life: the traditional market. In the early morning it hums with voices—vegetable sellers, fishmongers, butchers one after another, produce piled like little hills, vendors calling out today's prices. The goods are fresh and usually cheaper than at the supermarket, making it where many Taiwanese families shop every day.",
          "k": "대만에는 슈퍼와 편의점 말고도 생명력이 넘치는 곳이 있습니다. 바로 '재래시장'입니다. 이른 아침의 시장은 사람들 목소리로 왁자합니다. 채소 장수, 생선 장수, 정육 노점이 줄줄이 늘어서고, 채소와 과일은 작은 산처럼 쌓여 있으며, 주인은 오늘의 가격을 큰 소리로 외칩니다. 이곳의 물건은 신선하고 값도 대개 슈퍼보다 저렴해, 많은 대만 가정이 매일 장을 보러 오는 곳입니다."
        }
      },
      {
        "z": "逛菜市場，最有趣的是那份人情味。在傳統市場買東西，常常可以殺價，或是和老闆聊上幾句。買菜的阿姨、賣魚的大哥，很多都認識彼此，甚至知道你家愛吃什麼。老闆有時候還會多送你一把蔥、一點薑，說一句「這個送你，回去煮！」。這種人與人之間的溫暖，是冷冰冰的超市給不了的。",
        "py": "Guàng cài shì chǎng, zuì yǒu qù de shì nà fèn rén qíng wèi. Zài chuán tǒng shì chǎng mǎi dōng xī, cháng cháng kě yǐ shā jià, huò shì hé lǎo bǎn liáo shàng jǐ jù. Mǎi cài de ā yí, mài yú de dà gē, hěn duō dōu rèn shí bǐ cǐ, shèn zhì zhī dào nǐ jiā ài chī shén me. Lǎo bǎn yǒu shí hòu hái huì duō sòng nǐ yī bǎ cōng, yī diǎn jiāng, shuō yī jù\"zhè gè sòng nǐ, huí qù zhǔ! \". Zhè zhǒng rén yǔ rén zhī jiān de wēn nuǎn, shì lěng bīng bīng de chāo shì gěi bù liǎo de.",
        "m": {
          "j": "市場歩きでいちばん面白いのは、あの「人情味」。伝統市場では、よく値切りができ、店主とひと言ふた言おしゃべりもできます。買い物に来るおばさん、魚屋のお兄さん——多くが互いに顔なじみで、あなたの家が何を好きかまで知っていることも。店主は時々、ねぎを一束、しょうがを少し、「これはおまけ、帰って料理しな！」と言って持たせてくれます。この人と人との温かさは、冷たいスーパーには出せないものです。",
          "e": "The best part of wandering the market is the human warmth. At a traditional market you can often haggle or chat a few words with the vendor. The aunties buying vegetables and the fishmonger big brother often all know one another—some even know what your family likes to eat. Sometimes the vendor tosses in an extra bunch of scallions or a bit of ginger, saying, \"This one's on me—go home and cook!\" That warmth between people is something a cold supermarket just can't give.",
          "k": "시장 구경에서 가장 재미있는 것은 그 '정'입니다. 재래시장에서는 흥정을 하거나 주인과 몇 마디 나눌 수 있습니다. 장을 보러 오는 아주머니, 생선 파는 아저씨—많은 이가 서로 얼굴을 알고, 심지어 당신 집이 뭘 좋아하는지까지 압니다. 주인은 가끔 파 한 단, 생강 조금을 더 얹어 주며 '이건 서비스, 가서 해 먹어요!'라고 말합니다. 이런 사람과 사람 사이의 따뜻함은 차가운 슈퍼가 줄 수 없는 것입니다."
        }
      },
      {
        "z": "台灣的菜市場，其實不只賣菜。裡面往往藏著許多好吃的小吃：現做的蔥油餅、熱騰騰的肉圓、剛炸好的甜甜圈，還有各種熟食和滷味。很多人一早去買菜，順便就在市場裡吃了早餐。對愛吃的人來說，逛市場本身就是一場美食探險。",
        "py": "Tái wān de cài shì chǎng, qí shí bù zhǐ mài cài. Lǐ miàn wǎng wǎng cáng zhù xǔ duō hǎo chī de xiǎo chī: xiàn zuò de cōng yóu bǐng, rè téng téng de ròu yuán, gāng zhà hǎo de tián tián quān, hái yǒu gè zhǒng shú shí hé lǔ wèi. Hěn duō rén yī zǎo qù mǎi cài, shùn biàn jiù zài shì chǎng lǐ chī le zǎo cān. Duì ài chī de rén lái shuō, guàng shì chǎng běn shēn jiù shì yī chǎng měi shí tàn xiǎn.",
        "m": {
          "j": "台湾の菜市場は、実は野菜だけを売る場所ではありません。中にはおいしい屋台グルメがたくさん潜んでいます。作りたてのねぎ餅、熱々の肉圓（バーワン）、揚げたてのドーナツ、さらにさまざまなお惣菜や煮込み（滷味）。朝、買い物ついでに市場で朝ごはんを済ませる人も多いのです。食いしん坊にとって、市場歩きそのものがグルメ探検です。",
          "e": "A Taiwanese market isn't only for vegetables. Tucked inside are all kinds of delicious snacks: freshly made scallion pancakes, piping-hot bawan (meatball dumplings), just-fried doughnuts, and every sort of prepared food and braised delicacies. Many people run their morning errands and eat breakfast right there in the market. For a food lover, browsing the market is itself a culinary adventure.",
          "k": "대만의 재래시장은 사실 채소만 파는 곳이 아닙니다. 안에는 맛있는 먹거리가 잔뜩 숨어 있습니다. 갓 만든 파전, 뜨끈한 바완(고기완자), 방금 튀긴 도넛, 그리고 온갖 반찬과 조림(루웨이). 많은 사람이 아침에 장을 보는 김에 시장에서 아침을 해결합니다. 먹는 걸 좋아하는 사람에게 시장 구경은 그 자체로 미식 탐험입니다."
        }
      },
      {
        "z": "除了早上的市場，台灣還有黃昏市場和夜市。黃昏市場開在傍晚，方便下班的人採買；夜市則更偏向小吃和娛樂。不同時段的市場，服務著不同作息的人，也讓買菜這件事變得很有彈性。想吃什麼、什麼時候去，都有地方可以逛。",
        "py": "Chú le zǎo shàng de shì chǎng, tái wān hái yǒu huáng hūn shì chǎng hé yè shì. Huáng hūn shì chǎng kāi zài bàng wǎn, fāng biàn xià bān de rén cǎi mǎi; yè shì zé gèng piān xiàng xiǎo chī hé yú lè. Bù tóng shí duàn de shì chǎng, fú wù zhù bù tóng zuò xī de rén, yě ràng mǎi cài zhè jiàn shì biàn dé hěn yǒu dàn xìng. Xiǎng chī shén me, shén me shí hòu qù, dōu yǒu dì fāng kě yǐ guàng.",
        "m": {
          "j": "朝の市場のほかに、台湾には「夕暮れ市場（黄昏市場）」と「夜市」もあります。黄昏市場は夕方に開き、仕事帰りの買い物に便利。夜市はより屋台グルメと娯楽寄りです。時間帯の違う市場が、生活リズムの違う人々に応え、「買い物」をとても融通のきくものにしています。何を食べたいか、いつ行くか——どんな時でも、ぶらつける場所があるのです。",
          "e": "Beyond the morning market, Taiwan also has evening markets and night markets. The evening market opens at dusk, convenient for people shopping after work, while the night market leans more toward street food and fun. Markets at different times serve people on different schedules, making \"buying groceries\" wonderfully flexible. Whatever you crave, whenever you go, there's always somewhere to browse.",
          "k": "아침 시장 말고도 대만에는 '황혼 시장'과 야시장이 있습니다. 황혼 시장은 저녁에 열려 퇴근길 장보기에 편하고, 야시장은 먹거리와 오락에 더 가깝습니다. 시간대가 다른 시장이 생활 리듬이 다른 사람들을 맞아, '장보기'를 아주 유연하게 만듭니다. 무엇을 먹고 싶든, 언제 가든 둘러볼 곳이 늘 있습니다."
        }
      },
      {
        "z": "對剛到台灣的外國人來說，菜市場可能有點吵、有點擠，但它其實是認識台灣生活最快的方式。學會幾句簡單的中文，像「這個怎麼賣？」「算便宜一點啦！」，你就能像在地人一樣，在攤販之間穿梭。當老闆對你笑著多送一把蔥的時候，你就真正嚐到了台灣的人情味。",
        "py": "Duì gāng dào tái wān de wài guó rén lái shuō, cài shì chǎng kě néng yǒu diǎn chǎo, yǒu diǎn jǐ, dàn tā qí shí shì rèn shí tái wān shēng huó zuì kuài de fāng shì. Xué huì jǐ jù jiǎn dān de zhōng wén, xiàng\"zhè gè zěn me mài? \" \"suàn pián yi yī diǎn la! \", nǐ jiù néng xiàng zài dì rén yī yàng, zài tān fàn zhī jiān chuān suō. Dāng lǎo bǎn duì nǐ xiào zhù duō sòng yī bǎ cōng de shí hòu, nǐ jiù zhēn zhèng cháng dào le tái wān de rén qíng wèi.",
        "m": {
          "j": "台湾に来たばかりの外国人にとって、菜市場は少しうるさく、少し混んでいるかもしれません。でも実は、台湾の暮らしを知るいちばんの近道です。「これいくら？」「もう少し安くして！」といった簡単な中国語を覚えれば、地元の人のように屋台の間を行き来できます。店主が笑顔でねぎを一束おまけしてくれたとき、あなたは本当の意味で台湾の人情味を味わったことになるのです。",
          "e": "For newcomers to Taiwan, the market may feel a little loud and crowded, but it's actually the fastest way to get to know Taiwanese life. Learn a few simple phrases like \"How much is this?\" and \"Give me a better price!\" and you can weave among the stalls like a local. And when a vendor smiles and slips you an extra bunch of scallions, you'll have truly tasted Taiwan's human warmth.",
          "k": "대만에 막 온 외국인에게 시장은 조금 시끄럽고 붐빌 수 있지만, 사실 대만 생활을 알기에 가장 빠른 방법입니다. '이거 얼마예요?' '좀 싸게 해 주세요!' 같은 간단한 중국어를 익히면 현지인처럼 노점 사이를 누빌 수 있습니다. 주인이 웃으며 파 한 단을 더 얹어 줄 때, 당신은 진짜 대만의 정을 맛본 것입니다."
        }
      }
    ],
    "vocab": [
      {
        "w": "菜市場",
        "zy": "ㄘㄞˋ ㄕˋ ㄔㄤˇ",
        "py": "càishìchǎng",
        "m": {
          "j": "（生鮮）市場・伝統市場",
          "e": "traditional market",
          "k": "재래시장"
        }
      },
      {
        "w": "攤販",
        "zy": "ㄊㄢ ㄈㄢˋ",
        "py": "tānfàn",
        "m": {
          "j": "露店・屋台の商売人",
          "e": "vendor; street stall",
          "k": "노점상"
        }
      },
      {
        "w": "殺價",
        "zy": "ㄕㄚ ㄐㄧㄚˋ",
        "py": "shājià",
        "m": {
          "j": "値切る",
          "e": "to haggle over the price",
          "k": "값을 깎다"
        }
      },
      {
        "w": "新鮮",
        "zy": "ㄒㄧㄣ ㄒㄧㄢ",
        "py": "xīnxiān",
        "m": {
          "j": "新鮮な",
          "e": "fresh",
          "k": "신선하다"
        }
      },
      {
        "w": "人情味",
        "zy": "ㄖㄣˊ ㄑㄧㄥˊ ㄨㄟˋ",
        "py": "rénqíngwèi",
        "m": {
          "j": "人情・人の温かみ",
          "e": "human warmth; kindness",
          "k": "인정·정"
        }
      },
      {
        "w": "吆喝",
        "zy": "ㄧㄠ ㄏㄜ",
        "py": "yāohē",
        "m": {
          "j": "（客寄せに）大声で呼びかける",
          "e": "to hawk; call out",
          "k": "큰 소리로 호객하다"
        }
      },
      {
        "w": "採買",
        "zy": "ㄘㄞˇ ㄇㄞˇ",
        "py": "cǎimǎi",
        "m": {
          "j": "買い出しをする",
          "e": "to shop for groceries",
          "k": "장을 보다"
        }
      }
    ],
    "note": {
      "j": "「這個怎麼賣？（これいくら？）」は市場で最もよく使うひと言。値切りは伝統市場では一般的ですが、スーパーやチェーン店ではしません。市場のグルメは現金払いが基本なので、小銭を用意しておくとスムーズです。",
      "e": "\"How much is this?\" is the phrase you'll use most at a market. Haggling is normal at traditional markets but not at supermarkets or chains. Market food is mostly cash-only, so having small bills and coins makes things smooth.",
      "k": "'이거 얼마예요?'는 시장에서 가장 자주 쓰는 말입니다. 흥정은 재래시장에서는 흔하지만 슈퍼나 체인점에서는 하지 않습니다. 시장 먹거리는 대개 현금 결제라 잔돈을 준비해 두면 편합니다."
    }
  },
  {
    "id": "earthquake-preparedness",
    "cat": {
      "j": "暮らし・文化",
      "e": "Life & Culture",
      "k": "생활·문화"
    },
    "zhTitle": "地震來了怎麼辦：住在會搖的島上",
    "title": {
      "j": "地震が来たら：揺れる島で暮らすということ",
      "e": "When the Ground Shakes: Living on a Trembling Island",
      "k": "지진이 오면: 흔들리는 섬에서 산다는 것"
    },
    "intro": {
      "j": "台湾はプレートの境目にある、地震の多い島。遅かれ早かれ地震に出会います。台湾人がなぜ落ち着いていられるのか、その「備え」と、いざという時の身の守り方をのぞいてみましょう。",
      "e": "Taiwan sits on a plate boundary—an island of frequent earthquakes. Sooner or later you'll feel one. Let's look at why Taiwanese stay calm, the preparation behind it, and how to protect yourself when it counts.",
      "k": "대만은 판 경계에 있는 지진이 잦은 섬입니다. 머지않아 지진을 겪게 됩니다. 대만 사람들이 왜 침착할 수 있는지, 그 '대비'와 결정적인 순간 몸을 지키는 법을 들여다봅시다."
    },
    "paras": [
      {
        "z": "台灣位在板塊交界的地方，是一個地震很多的島嶼。住在台灣，你遲早會遇到地震：可能是輕輕的一下搖晃，也可能是讓整棟樓都搖起來的大地震。對台灣人來說，小地震幾乎是生活的一部分，很多人搖一搖就繼續做自己的事，還會淡定地說一句：「喔，地震。」",
        "py": "Tái wān wèi zài bǎn kuài jiāo jiè de dì fāng, shì yī gè dì zhèn hěn duō de dǎo yǔ. Zhù zài tái wān, nǐ chí zǎo huì yù dào dì zhèn: kě néng shì qīng qīng de yī xià yáo huǎng, yě kě néng shì ràng zhěng dòng lóu dōu yáo qǐ lái de dà dì zhèn. Duì tái wān rén lái shuō, xiǎo dì zhèn jǐ hū shì shēng huó de yī bù fèn, hěn duō rén yáo yī yáo jiù jì xù zuò zì jǐ de shì, hái huì dàn dìng dì shuō yī jù: \"ō, dì zhèn. \"",
        "m": {
          "j": "台湾はプレートの境目に位置する、地震の多い島です。台湾に住めば、遅かれ早かれ地震に出会います。ほんの軽い揺れのこともあれば、建物全体が揺れる大地震のことも。台湾人にとって、小さな地震はほとんど生活の一部。多くの人は少し揺れても平然と自分のことを続け、「あ、地震だ」とひと言つぶやくだけです。",
          "e": "Taiwan sits at the boundary of tectonic plates, an island with many earthquakes. Live here and sooner or later you'll feel one—maybe a gentle sway, maybe a big quake that rocks the whole building. For Taiwanese, small quakes are almost part of daily life; many just keep doing what they're doing after a shake, calmly remarking, \"Oh, earthquake.\"",
          "k": "대만은 판의 경계에 위치한 지진이 잦은 섬입니다. 대만에 살면 머지않아 지진을 겪습니다. 가벼운 흔들림일 수도, 건물 전체가 흔들리는 큰 지진일 수도 있습니다. 대만 사람들에게 작은 지진은 거의 생활의 일부라, 많은 이가 조금 흔들려도 태연히 하던 일을 계속하며 '아, 지진이네' 한마디 할 뿐입니다."
        }
      },
      {
        "z": "雖然台灣人看起來很冷靜，但這份冷靜其實來自「準備」。台灣的建築物有嚴格的耐震規定，學校每年都會有地震演習，手機也會在強震來臨前幾秒發出「國家級警報」，用很大的聲音提醒大家。這幾秒鐘雖然短，卻可能讓你有時間躲到安全的地方。",
        "py": "Suī rán tái wān rén kàn qǐ lái hěn lěng jìng, dàn zhè fèn lěng jìng qí shí lái zì\"zhǔn bèi\". Tái wān de jiàn zhù wù yǒu yán gé de nài zhèn guī dìng, xué xiào měi nián dōu huì yǒu dì zhèn yǎn xí, shǒu jī yě huì zài qiáng zhèn lái lín qián jǐ miǎo fā chū\"guó jiā jí jǐng bào\", yòng hěn dà de shēng yīn tí xǐng dà jiā. Zhè jǐ miǎo zhōng suī rán duǎn, què kě néng ràng nǐ yǒu shí jiān duǒ dào ān quán de dì fāng.",
        "m": {
          "j": "台湾人は落ち着いて見えますが、その冷静さは実は「備え」から来ています。台湾の建物には厳しい耐震基準があり、学校では毎年地震訓練が行われ、スマホは強い揺れが来る数秒前に「国家級警報」を大音量で鳴らして知らせます。このわずか数秒でも、安全な場所に隠れる時間を与えてくれるかもしれません。",
          "e": "Taiwanese may look calm, but that calm comes from preparation. Buildings follow strict earthquake-resistance codes, schools run earthquake drills every year, and phones blast a \"national alert\" a few seconds before strong shaking arrives. Those few seconds are short, but they may give you just enough time to get somewhere safe.",
          "k": "대만 사람들은 침착해 보이지만, 그 침착함은 사실 '대비'에서 옵니다. 대만 건물에는 엄격한 내진 규정이 있고, 학교에서는 매년 지진 훈련을 하며, 휴대폰은 강한 흔들림이 오기 몇 초 전에 '국가급 경보'를 큰 소리로 울려 알립니다. 이 몇 초는 짧지만 안전한 곳으로 피할 시간을 줄 수 있습니다."
        }
      },
      {
        "z": "地震發生的時候，最重要的口訣是「趴下、掩護、穩住」。趴到地上，躲在堅固的桌子底下，用手護住頭和脖子，抓住桌腳穩住身體，等搖晃停止。不要急著往外跑，也不要站在窗戶或大型家具旁邊。搖完之後，再冷靜地檢查瓦斯、關好電源，必要時往空曠的地方避難。",
        "py": "Dì zhèn fā shēng de shí hòu, zuì zhòng yào de kǒu jué shì\"pā xià, yǎn hù, wěn zhù\". Pā dào dì shàng, duǒ zài jiān gù de zhuō zi dǐ xià, yòng shǒu hù zhù tóu hé bó zi, zhuā zhù zhuō jiǎo wěn zhù shēn tǐ, děng yáo huǎng tíng zhǐ. Bú yào jí zhù wǎng wài pǎo, yě bú yào zhàn zài chuāng hù huò dà xíng jiā jù páng biān. Yáo wán zhī hòu, zài lěng jìng dì jiǎn chá wǎ sī, guān hǎo diàn yuán, bì yào shí wǎng kōng kuàng de dì fāng bì nán.",
        "m": {
          "j": "地震が起きたとき、いちばん大切な合言葉は「伏せる・隠れる・動かない（趴下・掩護・穩住）」です。床に伏せ、丈夫な机の下に隠れ、手で頭と首を守り、机の脚をつかんで体を安定させ、揺れが収まるのを待ちます。あわてて外に飛び出したり、窓や大きな家具のそばに立ったりしてはいけません。揺れが収まったら、落ち着いてガスを確認し、電源を切り、必要なら広い場所へ避難します。",
          "e": "When an earthquake hits, the key mantra is \"Drop, Cover, Hold On.\" Drop to the floor, take cover under a sturdy table, protect your head and neck with your hands, grip a table leg to steady yourself, and wait for the shaking to stop. Don't rush outside, and don't stand near windows or large furniture. Once it's over, calmly check the gas, switch off the power, and if needed evacuate to an open area.",
          "k": "지진이 나면 가장 중요한 구호는 '엎드리고, 가리고, 붙잡아라'입니다. 바닥에 엎드려 튼튼한 탁자 밑에 숨고, 손으로 머리와 목을 보호하며, 탁자 다리를 잡아 몸을 고정하고 흔들림이 멈추길 기다립니다. 급히 밖으로 뛰쳐나가거나 창문·큰 가구 옆에 서지 마세요. 흔들림이 끝나면 침착하게 가스를 확인하고 전원을 끄며, 필요하면 넓은 곳으로 대피합니다."
        }
      },
      {
        "z": "平常的準備也很重要。很多台灣家庭會準備一個「地震包」，裡面放著手電筒、水、乾糧、行動電源、常用藥品和一點現金。家具最好固定在牆上，重的東西不要放在高處。這些準備平常用不到，但真正遇到大地震的時候，可能就是保護自己和家人的關鍵。",
        "py": "Píng cháng de zhǔn bèi yě hěn zhòng yào. Hěn duō tái wān jiā tíng huì zhǔn bèi yī gè\"dì zhèn bāo\", lǐ miàn fàng zhù shǒu diàn tǒng, shuǐ, qián liáng, xíng dòng diàn yuán, cháng yòng yào pǐn hé yī diǎn xiàn jīn. Jiā jù zuì hǎo gù dìng zài qiáng shàng, zhòng de dōng xī bú yào fàng zài gāo chù. Zhè xiē zhǔn bèi píng cháng yòng bú dào, dàn zhēn zhèng yù dào dà dì zhèn de shí hòu, kě néng jiù shì bǎo hù zì jǐ hé jiā rén de guān jiàn.",
        "m": {
          "j": "日ごろの備えも大切です。多くの台湾の家庭は「防災バッグ（地震包）」を用意していて、中には懐中電灯、水、非常食、モバイルバッテリー、常備薬、そして少しの現金を入れています。家具はできるだけ壁に固定し、重いものは高い場所に置かないように。こうした備えは普段は使いませんが、いざ大地震に遭ったとき、自分と家族を守る鍵になるかもしれません。",
          "e": "Everyday preparation matters too. Many Taiwanese families keep an \"earthquake bag\" with a flashlight, water, dry food, a power bank, everyday medicine, and a little cash. Secure furniture to the wall, and don't put heavy things up high. You won't use this preparation most of the time, but in a real major quake it could be the key to protecting yourself and your family.",
          "k": "평소의 대비도 중요합니다. 많은 대만 가정이 '지진 가방'을 준비해 손전등, 물, 비상식량, 보조배터리, 상비약, 그리고 약간의 현금을 넣어 둡니다. 가구는 되도록 벽에 고정하고 무거운 물건은 높은 곳에 두지 마세요. 이런 대비는 평소엔 쓸 일이 없지만, 실제 큰 지진을 만났을 때 자신과 가족을 지키는 열쇠가 될 수 있습니다."
        }
      },
      {
        "z": "對外國人來說，第一次在台灣遇到地震可能會很緊張，這很正常。可以先把手機的地震警報打開，記住「趴下、掩護、穩住」的口訣，並且知道住處附近的避難地點。地震雖然無法預測，但只要有準備、不慌張，就能大大降低危險。住在這座會搖的島上，學會和地震共處，也是認識台灣的一部分。",
        "py": "Duì wài guó rén lái shuō, dì yī cì zài tái wān yù dào dì zhèn kě néng huì hěn jǐn zhāng, zhè hěn zhèng cháng. Kě yǐ xiān bǎ shǒu jī de dì zhèn jǐng bào dǎ kāi, jì zhù\"pā xià, yǎn hù, wěn zhù\" De kǒu jué, bìng qiě zhī dào zhù chù fù jìn de bì nán dì diǎn. Dì zhèn suī rán wú fǎ yù cè, dàn zhǐ yào yǒu zhǔn bèi, bù huāng zhāng, jiù néng dà dà jiàng dī wēi xiǎn. Zhù zài zhè zuò huì yáo de dǎo shàng, xué huì hé dì zhèn gòng chù, yě shì rèn shí tái wān de yī bù fèn.",
        "m": {
          "j": "外国人にとって、台湾で初めて地震に遭うと、とても緊張するかもしれません。それは当たり前のことです。まずはスマホの地震警報をオンにし、「伏せる・隠れる・動かない」の合言葉を覚え、住まいの近くの避難場所を知っておきましょう。地震は予測できませんが、備えがあって、慌てなければ、危険は大きく減らせます。この揺れる島に暮らし、地震とうまく付き合っていくことも、台湾を知ることの一部なのです。",
          "e": "For foreigners, feeling your first earthquake in Taiwan can be very nerve-wracking—and that's completely normal. Start by turning on your phone's earthquake alert, memorize \"Drop, Cover, Hold On,\" and know the shelter points near your home. Earthquakes can't be predicted, but with preparation and a cool head, you can greatly reduce the danger. Living on this trembling island and learning to coexist with earthquakes is part of getting to know Taiwan too.",
          "k": "외국인에게 대만에서 처음 지진을 겪는 것은 매우 긴장될 수 있는데, 지극히 자연스러운 일입니다. 우선 휴대폰의 지진 경보를 켜고 '엎드리고, 가리고, 붙잡아라'를 외워 두며, 집 근처 대피 장소를 알아 두세요. 지진은 예측할 수 없지만 대비가 있고 당황하지 않으면 위험을 크게 줄일 수 있습니다. 이 흔들리는 섬에 살며 지진과 잘 지내는 법을 익히는 것도 대만을 아는 일부입니다."
        }
      }
    ],
    "vocab": [
      {
        "w": "地震",
        "zy": "ㄉㄧˋ ㄓㄣˋ",
        "py": "dìzhèn",
        "m": {
          "j": "地震",
          "e": "earthquake",
          "k": "지진"
        }
      },
      {
        "w": "搖晃",
        "zy": "ㄧㄠˊ ㄏㄨㄤˇ",
        "py": "yáohuǎng",
        "m": {
          "j": "揺れる・ぐらぐらする",
          "e": "to shake; sway",
          "k": "흔들리다"
        }
      },
      {
        "w": "耐震",
        "zy": "ㄋㄞˋ ㄓㄣˋ",
        "py": "nàizhèn",
        "m": {
          "j": "耐震（の）",
          "e": "earthquake-resistant",
          "k": "내진"
        }
      },
      {
        "w": "警報",
        "zy": "ㄐㄧㄥˇ ㄅㄠˋ",
        "py": "jǐngbào",
        "m": {
          "j": "警報・アラート",
          "e": "alert; alarm",
          "k": "경보"
        }
      },
      {
        "w": "掩護",
        "zy": "ㄧㄢˇ ㄏㄨˋ",
        "py": "yǎnhù",
        "m": {
          "j": "身を隠して守る・カバーする",
          "e": "to take cover; shield",
          "k": "몸을 가려 보호하다"
        }
      },
      {
        "w": "演習",
        "zy": "ㄧㄢˇ ㄒㄧˊ",
        "py": "yǎnxí",
        "m": {
          "j": "訓練・演習",
          "e": "drill; exercise",
          "k": "훈련·연습"
        }
      },
      {
        "w": "冷靜",
        "zy": "ㄌㄥˇ ㄐㄧㄥˋ",
        "py": "lěngjìng",
        "m": {
          "j": "冷静な・落ち着いた",
          "e": "calm; composed",
          "k": "침착하다"
        }
      }
    ],
    "note": {
      "j": "「趴下・掩護・穩住（Drop, Cover, Hold On）」は世界共通の地震時の基本行動。台湾ではスマホの「国家級警報（緊急地震速報）」が既定でオンになっています。地震包（防災バッグ）と家具の固定は、住み始めたら早めに準備しておくと安心です。",
      "e": "\"Drop, Cover, Hold On\" is the universal basic response during a quake. In Taiwan, the phone's \"national alert\" (early earthquake warning) is on by default. Preparing an earthquake bag and securing your furniture early after you move in brings real peace of mind.",
      "k": "'엎드리고, 가리고, 붙잡아라(Drop, Cover, Hold On)'는 지진 시 세계 공통의 기본 행동입니다. 대만에서는 휴대폰의 '국가급 경보(긴급 지진 속보)'가 기본으로 켜져 있습니다. 지진 가방과 가구 고정은 이사한 뒤 일찍 준비해 두면 든든합니다."
    }
  }
];
