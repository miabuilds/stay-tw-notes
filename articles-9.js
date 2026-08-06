// StayTW Notes — 深度閲讀：娯楽・スポーツ（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_9 = [
{
  id:"baseball-national-sport",
  cat:{ j:"娯楽・スポーツ", e:"Entertainment & Sports", k:"엔터·스포츠" },
  zhTitle:"棒球：台灣的國球",
  title:{ j:"野球：台湾の『国球』", e:"Baseball: Taiwan's National Sport", k:"야구: 대만의 '국민 스포츠'" },
  intro:{
    j:"夏の夜、球場のスタンドが応援団のドラムと歌でひとつになり、見知らぬ人同士がハイタッチで盛り上がる——台湾で野球は単なるスポーツではなく、世代を超えて受け継がれてきた集団の記憶です。なぜ野球が『国球（国民的スポーツ）』と呼ばれるのか、その熱気の源をのぞいてみましょう。",
    e:"On a summer night, the stands come alive as drums and chants from the cheer squads merge into one, and total strangers high-five in the excitement—in Taiwan, baseball is more than a sport; it's a collective memory passed down across generations. Let's explore why baseball is called the 'national sport' and where that passion comes from.",
    k:"여름밤, 관중석이 응원단의 북소리와 노래로 하나가 되고 낯선 사람끼리 하이파이브를 나누며 달아오릅니다—대만에서 야구는 단순한 스포츠가 아니라 세대를 넘어 이어져 온 집단의 기억입니다. 왜 야구가 '국구(국민 스포츠)'라 불리는지, 그 열기의 근원을 들여다봅시다."
  },
  paras:[
    {
      z:"在台灣，如果問一個人「什麼運動最能代表台灣？」答案幾乎都是棒球。大家甚至直接叫它「國球」。這份感情其實有很長的歷史：早在日治時期，棒球就傳進台灣；而真正讓全台灣為之瘋狂的，是一九六〇、七〇年代的「少棒」。當時台灣的少年棒球隊多次拿下世界冠軍，深夜的比賽讓無數家庭守在收音機和電視前，全家人一起熬夜加油。",
      py:"Zài Táiwān, rúguǒ wèn yí ge rén “shénme yùndòng zuì néng dàibiǎo Táiwān?” dá'àn jīhū dōu shì bàngqiú. Dàjiā shènzhì zhíjiē jiào tā “guóqiú”. Zhè fèn gǎnqíng qíshí yǒu hěn cháng de lìshǐ: zǎo zài Rìzhì shíqí, bàngqiú jiù chuán jìn Táiwān; ér zhēnzhèng ràng quán Táiwān wèi zhī fēngkuáng de, shì yī jiǔ liù líng, qī líng niándài de “shàoqiú”. Dāngshí Táiwān de shàonián bàngqiú duì duō cì nádào shìjiè guànjūn, shēnyè de bǐsài ràng wúshù jiātíng shǒu zài shōuyīnjī hé diànshì qián, quánjiā rén yìqǐ áoyè jiāyóu.",
      m:{
        j:"台湾で「どのスポーツが一番台湾を代表するか」と尋ねれば、答えはほぼ野球です。人々はそれを直接「国球」とさえ呼びます。この思い入れには長い歴史があります。早くも日本統治時代に野球は台湾へ伝わり、そして本当に台湾じゅうを熱狂させたのは、1960〜70年代の「少年野球」でした。当時、台湾の少年野球チームは何度も世界一に輝き、深夜の試合には無数の家庭がラジオやテレビの前に集まり、家族そろって夜通し応援したのです。",
        e:"In Taiwan, if you ask someone 'Which sport best represents Taiwan?' the answer is almost always baseball. People even call it outright the 'national ball.' This attachment has a long history: baseball arrived in Taiwan as early as the Japanese colonial era, and what truly sent the whole island into a frenzy was youth baseball in the 1960s and '70s. Back then, Taiwan's Little League teams repeatedly won world championships, and late-night games drew countless families to their radios and TVs, staying up all night to cheer together.",
        k:"대만에서 '어떤 스포츠가 가장 대만을 대표하느냐'고 물으면 답은 거의 야구입니다. 사람들은 아예 그것을 '국구'라고 부르기까지 합니다. 이 애정에는 긴 역사가 있습니다. 일찍이 일제강점기에 야구가 대만에 전해졌고, 진정으로 대만 전체를 열광시킨 것은 1960~70년대의 '소년 야구'였습니다. 당시 대만의 소년 야구팀은 여러 차례 세계 챔피언에 올랐고, 심야의 경기에는 수많은 가정이 라디오와 텔레비전 앞에 모여 온 가족이 밤새 응원했습니다."
      }
    },
    {
      z:"到了一九九〇年，台灣成立了自己的職業棒球聯盟，也就是「中華職棒」，英文簡稱CPBL。從此每年三月到十月，全台各地的球場都會擠滿球迷。目前有幾支球隊，像是統一獅、中信兄弟、樂天桃猿、味全龍等等，每一隊都有死忠的支持者。看球對很多台灣人來說，不只是看比賽輸贏，更是一種假日的生活方式：買張票，帶家人朋友進場，邊吃鹹酥雞邊看球。",
      py:"Dàole yī jiǔ jiǔ líng nián, Táiwān chénglì le zìjǐ de zhíyè bàngqiú liánméng, yě jiùshì “Zhōnghuá Zhíbàng”, Yīngwén jiǎnchēng CPBL. Cóngcǐ měinián sān yuè dào shí yuè, quán Tái gèdì de qiúchǎng dōu huì jǐ mǎn qiúmí. Mùqián yǒu jǐ zhī qiúduì, xiàngshì Tǒngyī Shī, Zhōngxìn Xiōngdì, Lètiān Táoyuán, Wèiquán Lóng děngděng, měi yí duì dōu yǒu sǐzhōng de zhīchízhě. Kànqiú duì hěnduō Táiwānrén lái shuō, bùzhǐ shì kàn bǐsài shūyíng, gèng shì yì zhǒng jiàrì de shēnghuó fāngshì: mǎi zhāng piào, dài jiārén péngyǒu jìnchǎng, biān chī xiánsūjī biān kànqiú.",
      m:{
        j:"1990年、台湾は自前のプロ野球リーグ、すなわち「中華職棒」（英語略称CPBL）を発足させました。以来、毎年3月から10月にかけて、台湾各地の球場は野球ファンでいっぱいになります。現在は統一ライオンズ、中信ブラザーズ、楽天モンキーズ、味全ドラゴンズなどいくつかのチームがあり、どのチームにも熱狂的な支持者がいます。野球観戦は多くの台湾人にとって、勝ち負けを見るだけでなく、休日の過ごし方そのもの。チケットを買い、家族や友人を連れて球場に入り、鹹酥雞（台湾風のから揚げ）をつまみながら試合を観るのです。",
        e:"In 1990, Taiwan founded its own professional baseball league, the Chinese Professional Baseball League (CPBL). Ever since, from March to October each year, ballparks across Taiwan fill with fans. Today there are several teams—the Uni-President Lions, CTBC Brothers, Rakuten Monkeys, Wei Chuan Dragons, and more—each with die-hard supporters. For many Taiwanese, going to a game isn't just about who wins; it's a way to spend a day off: buy a ticket, bring family and friends into the stadium, and watch the game while munching on salt-and-pepper fried chicken.",
        k:"1990년, 대만은 자체 프로야구 리그, 즉 '중화직봉'(영문 약칭 CPBL)을 창설했습니다. 이후 매년 3월부터 10월까지 대만 각지의 야구장은 팬들로 가득 찹니다. 현재 통일 라이온스, 중신 브라더스, 라쿠텐 몽키스, 웨이취안 드래건스 등 여러 팀이 있고, 각 팀마다 열혈 지지자가 있습니다. 야구 관람은 많은 대만 사람에게 승패를 보는 것만이 아니라 휴일을 보내는 방식 그 자체입니다. 표를 사서 가족과 친구를 데리고 경기장에 들어가, 옌수지(대만식 닭튀김)를 먹으며 경기를 봅니다."
      }
    },
    {
      z:"真正讓外國人大開眼界的，是台灣球場獨特的「應援文化」。每一隊都有自己的「應援團」，帶頭的是站在看台前方、拿著麥克風的「應援團長」，還有跳舞帶動氣氛的「啦啦隊女孩」。每個球員一上場打擊，全場就會唱起專屬於他的「應援曲」，觀眾跟著節奏拍手、揮舞加油棒。這種從頭唱到尾、幾乎沒有冷場的看球方式，讓很多來自日本、韓國、歐美的球迷都印象深刻。",
      py:"Zhēnzhèng ràng wàiguórén dàkāiyǎnjiè de, shì Táiwān qiúchǎng dútè de “yìngyuán wénhuà”. Měi yí duì dōu yǒu zìjǐ de “yìngyuántuán”, dàitóu de shì zhàn zài kàntái qiánfāng, názhe màikèfēng de “yìngyuán tuánzhǎng”, hái yǒu tiàowǔ dàidòng qìfēn de “lālāduì nǚhái”. Měi ge qiúyuán yí shàngchǎng dǎjí, quánchǎng jiù huì chàng qǐ zhuānshǔ yú tā de “yìngyuánqǔ”, guānzhòng gēnzhe jiézòu pāishǒu, huīwǔ jiāyóubàng. Zhè zhǒng cóng tóu chàng dào wěi, jīhū méiyǒu lěngchǎng de kànqiú fāngshì, ràng hěnduō láizì Rìběn, Hánguó, Ōu-Měi de qiúmí dōu yìnxiàng shēnkè.",
      m:{
        j:"外国人が本当に目を見張るのは、台湾の球場ならではの「応援文化」です。どのチームにも自前の「応援団」があり、その先頭に立つのがスタンド前方でマイクを握る「応援団長」、さらに踊って場を盛り上げる「チアリーダー（啦啦隊女孩）」がいます。各選手が打席に立つたびに、球場全体がその選手専用の「応援歌」を歌い、観客はリズムに合わせて手拍子し、応援バットを振ります。最初から最後まで歌いっぱなしで、ほとんど盛り下がる瞬間のない観戦スタイルは、日本・韓国・欧米から来たファンにも強い印象を残します。",
        e:"What truly opens foreigners' eyes is the unique 'cheering culture' of Taiwanese ballparks. Each team has its own 'cheer squad,' led by a 'cheer leader' who stands at the front of the stands with a microphone, plus 'cheerleaders' who dance to rev up the crowd. Every time a player comes up to bat, the whole stadium sings a 'cheer song' written just for him, while fans clap to the beat and wave inflatable thunder sticks. This never-a-dull-moment style of watching—singing from start to finish—leaves a deep impression on fans from Japan, Korea, and the West alike.",
        k:"외국인이 정말 눈이 휘둥그레지는 것은 대만 야구장 특유의 '응원 문화'입니다. 각 팀에는 자체 '응원단'이 있고, 그 선두에 관중석 앞에서 마이크를 쥔 '응원단장', 그리고 춤으로 분위기를 띄우는 '치어리더(啦啦隊女孩)'가 있습니다. 선수가 타석에 설 때마다 경기장 전체가 그 선수 전용 '응원가'를 부르고, 관중은 리듬에 맞춰 박수치며 응원봉을 흔듭니다. 처음부터 끝까지 노래가 끊이지 않고 조용해지는 순간이 거의 없는 관람 방식은 일본, 한국, 서구에서 온 팬들에게도 깊은 인상을 남깁니다."
      }
    },
    {
      z:"除了在國內看球，台灣人也很關心「旅外球員」，也就是到國外打職業棒球的台灣選手。最讓大家驕傲的，是能夠站上美國「大聯盟（MLB）」舞台的球員。早年有陳金鋒、王建民，王建民在紐約洋基隊當先發投手的那幾年，台灣清晨的電視前總是坐滿了球迷。後來也有陳偉殷、郭泓志等人在海外發光。每當台灣球員在異鄉出賽，整座島彷彿都跟著他一起緊張、一起歡呼。",
      py:"Chúle zài guónèi kànqiú, Táiwānrén yě hěn guānxīn “lǚwài qiúyuán”, yě jiùshì dào guówài dǎ zhíyè bàngqiú de Táiwān xuǎnshǒu. Zuì ràng dàjiā jiāo'ào de, shì nénggòu zhàn shàng Měiguó “Dàliánméng (MLB)” wǔtái de qiúyuán. Zǎonián yǒu Chén Jīnfēng, Wáng Jiànmín, Wáng Jiànmín zài Niǔyuē Yángjī duì dāng xiānfā tóushǒu de nà jǐ nián, Táiwān qīngchén de diànshì qián zǒngshì zuò mǎn le qiúmí. Hòulái yě yǒu Chén Wěiyìn, Guō Hóngzhì děng rén zài hǎiwài fāguāng. Měi dāng Táiwān qiúyuán zài yìxiāng chūsài, zhěng zuò dǎo fǎngfú dōu gēnzhe tā yìqǐ jǐnzhāng, yìqǐ huānhū.",
      m:{
        j:"国内での観戦だけでなく、台湾人は「旅外球員」、つまり海外でプロ野球をプレーする台湾選手にも強い関心を寄せます。とりわけ誇りに思うのが、アメリカの「メジャーリーグ（MLB）」の舞台に立てる選手です。かつては陳金鋒、王建民がおり、王建民がニューヨーク・ヤンキースで先発投手を務めた数年間、台湾では早朝のテレビの前がいつもファンで埋まりました。その後も陳偉殷、郭泓志らが海外で活躍しました。台湾の選手が異国で試合に出るたび、島じゅうがまるで彼と一緒に緊張し、一緒に歓声を上げるかのようです。",
        e:"Beyond watching games at home, Taiwanese also follow their 'overseas players'—Taiwanese athletes playing pro baseball abroad. The greatest source of pride is players who make it to America's Major League Baseball (MLB). In earlier years there were Chen Chin-feng and Wang Chien-ming; during the years Wang started as a pitcher for the New York Yankees, TVs across Taiwan were packed with fans at dawn. Later, players like Chen Wei-yin and Kuo Hong-chih shone overseas too. Whenever a Taiwanese player takes the field in a foreign land, the whole island seems to hold its breath and cheer right along with him.",
        k:"국내 관람뿐 아니라 대만 사람들은 '해외 진출 선수', 즉 외국에서 프로야구를 뛰는 대만 선수에게도 큰 관심을 보입니다. 특히 자랑스러워하는 것은 미국 '메이저리그(MLB)' 무대에 서는 선수입니다. 예전에는 천진펑, 왕젠민이 있었고, 왕젠민이 뉴욕 양키스에서 선발 투수로 뛰던 몇 년간 대만에서는 이른 아침 텔레비전 앞이 늘 팬들로 가득 찼습니다. 이후에도 천웨이인, 궈훙즈 등이 해외에서 빛을 발했습니다. 대만 선수가 타지에서 경기에 나설 때마다 온 섬이 마치 그와 함께 긴장하고 함께 환호하는 듯합니다."
      }
    },
    {
      z:"棒球對台灣的意義，早就超越了運動本身。在國際比賽中，像是世界棒球經典賽（WBC）或亞洲的賽事，只要中華隊出賽，整個社會的氣氛都會不一樣。上班族偷偷用手機看直播，餐廳、便利商店的電視全轉到同一台，一支關鍵的安打或全壘打，能讓整條街同時發出歡呼。對台灣人來說，為中華隊加油，也是一種凝聚彼此、確認「我們是一起的」的方式。",
      py:"Bàngqiú duì Táiwān de yìyì, zǎo jiù chāoyuè le yùndòng běnshēn. Zài guójì bǐsài zhōng, xiàngshì Shìjiè Bàngqiú Jīngdiǎn Sài (WBC) huò Yàzhōu de sàishì, zhǐyào Zhōnghuá duì chūsài, zhěnggè shèhuì de qìfēn dōu huì bù yíyàng. Shàngbānzú tōutōu yòng shǒujī kàn zhíbò, cāntīng, biànlì shāngdiàn de diànshì quán zhuǎn dào tóng yì tái, yì zhī guānjiàn de āndǎ huò quánlěidǎ, néng ràng zhěng tiáo jiē tóngshí fāchū huānhū. Duì Táiwānrén lái shuō, wèi Zhōnghuá duì jiāyóu, yěshì yì zhǒng níngjù bǐcǐ, quèrèn “wǒmen shì yìqǐ de” de fāngshì.",
      m:{
        j:"野球が台湾にとって持つ意味は、とうにスポーツそのものを超えています。ワールド・ベースボール・クラシック（WBC）やアジアの大会などの国際試合で、中華チーム（台湾代表）が出場するとなれば、社会全体の空気が一変します。会社員はこっそりスマホで生中継を見て、レストランやコンビニのテレビは一斉に同じチャンネルへ。決定的なヒットやホームラン一本で、通り全体が同時に歓声を上げるのです。台湾人にとって、中華チームを応援することは、互いを結びつけ、「私たちは一つだ」と確かめ合う一つの方法でもあります。",
        e:"What baseball means to Taiwan long ago surpassed the sport itself. In international competitions like the World Baseball Classic (WBC) or Asian tournaments, the moment Team Taiwan takes the field, the whole society's mood shifts. Office workers sneak a look at the livestream on their phones, and TVs in restaurants and convenience stores all switch to the same channel; a single clutch hit or home run can make an entire street erupt in cheers at once. For Taiwanese, cheering for the national team is also a way of binding people together and affirming that 'we're in this as one.'",
        k:"야구가 대만에 갖는 의미는 이미 스포츠 그 자체를 넘어섰습니다. 월드 베이스볼 클래식(WBC)이나 아시아 대회 같은 국제 경기에서 대만 대표팀이 출전하면 사회 전체의 분위기가 달라집니다. 직장인은 몰래 휴대폰으로 생중계를 보고, 식당과 편의점의 텔레비전은 일제히 같은 채널로 바뀝니다. 결정적인 안타나 홈런 하나에 거리 전체가 동시에 환호를 터뜨립니다. 대만 사람에게 대표팀을 응원하는 것은 서로를 하나로 묶고 '우리는 함께다'라고 확인하는 하나의 방식이기도 합니다."
      }
    },
    {
      z:"如果你人在台灣，非常推薦找一天親自進場看一場職棒。你不需要很懂棒球規則，光是感受滿場觀眾一起唱歌、一起跳、一起為一支全壘打瘋狂的那股能量，就非常值得。買一份鹹酥雞、一杯啤酒或珍奶，跟著身邊的人一起喊「安打！安打！全壘打！」，你會發現，原來看懂一個地方最快的方法之一，就是走進他們最熱愛的球場。",
      py:"Rúguǒ nǐ rén zài Táiwān, fēicháng tuījiàn zhǎo yìtiān qīnzì jìnchǎng kàn yì chǎng zhíbàng. Nǐ bù xūyào hěn dǒng bàngqiú guīzé, guāng shì gǎnshòu mǎnchǎng guānzhòng yìqǐ chànggē, yìqǐ tiào, yìqǐ wèi yì zhī quánlěidǎ fēngkuáng de nà gǔ néngliàng, jiù fēicháng zhídé. Mǎi yí fèn xiánsūjī, yì bēi píjiǔ huò zhēnnǎi, gēnzhe shēnbiān de rén yìqǐ hǎn “āndǎ! āndǎ! quánlěidǎ!”, nǐ huì fāxiàn, yuánlái kàndǒng yí ge dìfāng zuì kuài de fāngfǎ zhī yī, jiùshì zǒujìn tāmen zuì rè'ài de qiúchǎng.",
      m:{
        j:"もしあなたが台湾にいるなら、一日を割いて自分でプロ野球を観に行くことを強くおすすめします。野球のルールに詳しくなくてかまいません。満員の観客が一緒に歌い、一緒に飛び跳ね、一本のホームランに一緒に熱狂する、あのエネルギーを肌で感じるだけでも十分に価値があります。鹹酥雞を一つ、ビールかタピオカミルクティーを一杯買い、隣の人と一緒に「ヒット！ヒット！ホームラン！」と叫んでみてください。ある土地を理解する一番の近道の一つは、その人たちが最も愛する球場に足を踏み入れることだと気づくはずです。",
        e:"If you're in Taiwan, I highly recommend setting aside a day to catch a CPBL game in person. You don't need to know the rules well—just feeling the energy of a packed crowd singing, jumping, and going wild for a single home run is more than worth it. Grab an order of salt-and-pepper chicken and a beer or bubble tea, and shout 'Base hit! Base hit! Home run!' along with the people around you. You'll discover that one of the fastest ways to understand a place is to step into the ballpark its people love most.",
        k:"만약 대만에 있다면 하루를 내어 직접 프로야구 경기를 보러 가는 것을 강력히 추천합니다. 야구 규칙을 잘 몰라도 괜찮습니다. 만원 관중이 함께 노래하고 함께 뛰며 홈런 하나에 함께 열광하는 그 에너지를 몸으로 느끼는 것만으로도 충분히 가치가 있습니다. 옌수지 하나와 맥주나 버블티 한 잔을 사서 옆 사람과 함께 '안타! 안타! 홈런!'을 외쳐 보세요. 한 지역을 이해하는 가장 빠른 방법 중 하나는 그들이 가장 사랑하는 야구장에 발을 들이는 것임을 깨닫게 될 겁니다."
      }
    }
  ],
  vocab:[
    { w:"棒球", zy:"ㄅㄤˋ ㄑㄧㄡˊ", py:"bàngqiú", m:{ j:"野球", e:"baseball", k:"야구" } },
    { w:"國球", zy:"ㄍㄨㄛˊ ㄑㄧㄡˊ", py:"guóqiú", m:{ j:"国民的スポーツ（国を代表する球技）", e:"national sport (lit. 'national ball')", k:"국구(나라를 대표하는 구기)" } },
    { w:"中華職棒", zy:"ㄓㄨㄥ ㄏㄨㄚˊ ㄓˊ ㄅㄤˋ", py:"Zhōnghuá Zhíbàng", m:{ j:"CPBL（台湾プロ野球リーグ）", e:"CPBL (Taiwan pro baseball league)", k:"CPBL(대만 프로야구 리그)" } },
    { w:"少棒", zy:"ㄕㄠˋ ㄅㄤˋ", py:"shàobàng", m:{ j:"少年野球（リトルリーグ）", e:"youth/Little League baseball", k:"소년 야구(리틀리그)" } },
    { w:"應援團", zy:"ㄧㄥ ㄩㄢˊ ㄊㄨㄢˊ", py:"yìngyuántuán", m:{ j:"応援団", e:"cheer squad", k:"응원단" } },
    { w:"啦啦隊", zy:"ㄌㄚ ㄌㄚ ㄉㄨㄟˋ", py:"lālāduì", m:{ j:"チアリーダー・応援隊", e:"cheerleaders", k:"치어리더" } },
    { w:"加油", zy:"ㄐㄧㄚ ㄧㄡˊ", py:"jiāyóu", m:{ j:"がんばれ・応援する", e:"to cheer someone on; 'go!'", k:"힘내라·응원하다" } },
    { w:"全壘打", zy:"ㄑㄩㄢˊ ㄌㄟˇ ㄉㄚˇ", py:"quánlěidǎ", m:{ j:"ホームラン", e:"home run", k:"홈런" } },
    { w:"安打", zy:"ㄢ ㄉㄚˇ", py:"āndǎ", m:{ j:"ヒット・安打", e:"base hit", k:"안타" } },
    { w:"投手", zy:"ㄊㄡˊ ㄕㄡˇ", py:"tóushǒu", m:{ j:"投手・ピッチャー", e:"pitcher", k:"투수" } },
    { w:"旅外球員", zy:"ㄌㄩˇ ㄨㄞˋ ㄑㄧㄡˊ ㄩㄢˊ", py:"lǚwài qiúyuán", m:{ j:"海外でプレーする選手", e:"player based overseas", k:"해외 진출 선수" } },
    { w:"大聯盟", zy:"ㄉㄚˋ ㄌㄧㄢˊ ㄇㄥˊ", py:"Dàliánméng", m:{ j:"メジャーリーグ（MLB）", e:"the Major Leagues (MLB)", k:"메이저리그(MLB)" } }
  ],
  note:{
    j:"台湾の球場でぜひ注目してほしいのが、応援を仕切る「應援團長（応援団長）」の存在感と、チームごとに用意された選手個人の「応援歌」。日本のプロ野球に近い部分もありますが、台湾はステージ上のチアチームが試合中ずっと踊り続けるなど、よりショー的な要素が強いのが特徴です。『加油（jiāyóu）』は野球に限らず、試験前の友人や仕事で疲れた同僚にもかける万能の応援語。覚えておくと日常でとても役立ちます。",
    e:"At a Taiwanese ballpark, watch for the commanding presence of the 'cheer leader' who conducts the crowd, and the personal 'cheer songs' written for each player. There are similarities to Japanese pro baseball, but Taiwan leans more toward a show, with on-stage cheer teams dancing throughout the game. '加油 (jiāyóu),' meaning 'go/keep it up,' isn't just for baseball—it's an all-purpose word of encouragement you can offer a friend before an exam or a tired coworker. It's very handy to know in daily life.",
    k:"대만 야구장에서 꼭 눈여겨볼 것은 관중을 이끄는 '응원단장'의 존재감과 팀마다 마련된 선수 개인 '응원가'입니다. 일본 프로야구와 비슷한 면도 있지만, 대만은 무대 위 치어팀이 경기 내내 춤을 추는 등 더 쇼에 가까운 요소가 강합니다. '加油(jiāyóu)'는 야구에만 쓰는 말이 아니라 시험 앞둔 친구나 지친 동료에게도 건네는 만능 응원어입니다. 알아 두면 일상에서 매우 유용합니다."
  }
},
{
  id:"ktv-culture",
  cat:{ j:"娯楽・スポーツ", e:"Entertainment & Sports", k:"엔터·스포츠" },
  zhTitle:"KTV 文化：唱到天亮的夜晚",
  title:{ j:"KTV文化——朝まで歌う夜", e:"KTV Culture: Singing Until Dawn", k:"KTV 문화: 날이 밝을 때까지 노래하는 밤" },
  intro:{
    j:"防音の個室、分厚い曲リスト、次々と運ばれてくる料理とドリンク——台湾のKTVは、単にカラオケを歌う場所ではありません。誕生日会も、失恋の慰めも、久しぶりの再会も、みんなここに集まって歌います。友だち同士が朝まで歌い明かす、その独特の社交儀式をのぞいてみましょう。",
    e:"A soundproof private room, a thick book of songs, and a steady stream of food and drinks—KTV in Taiwan is far more than a place to sing karaoke. Birthday parties, comforting the heartbroken, long-awaited reunions—everyone gathers here to sing. Let's step into this distinctive social ritual, where friends sing the night away until dawn.",
    k:"방음 개별 룸, 두툼한 노래 책자, 끊임없이 나오는 음식과 음료—대만의 KTV는 단순히 노래방에서 노래하는 곳이 아닙니다. 생일 파티도, 실연의 위로도, 오랜만의 재회도 모두 여기에 모여 노래합니다. 친구끼리 날이 밝을 때까지 노래하는 이 독특한 사교 의식을 들여다봅시다."
  },
  paras:[
    {
      z:"在台灣，KTV幾乎是每個人生活裡都出現過的關鍵字。它其實就是「卡拉OK」加上「電視螢幕」的組合，但台灣的KTV和很多人想像的不太一樣。這裡不是一個人對著大家唱的酒吧舞台，而是一間又一間「包廂」——也就是有門、有沙發、有大螢幕的獨立房間。你和朋友關起門來，這個空間就完全屬於你們，想怎麼唱、唱多難聽都沒關係。",
      py:"Zài Táiwān, KTV jīhū shì měi ge rén shēnghuó lǐ dōu chūxiàn guò de guānjiàncí. Tā qíshí jiùshì “kǎlā OK” jiā shàng “diànshì yíngmù” de zǔhé, dàn Táiwān de KTV hé hěnduō rén xiǎngxiàng de bú tài yíyàng. Zhèlǐ búshì yí ge rén duìzhe dàjiā chàng de jiǔbā wǔtái, érshì yì jiān yòu yì jiān “bāoxiāng”——yě jiùshì yǒu mén, yǒu shāfā, yǒu dà yíngmù de dúlì fángjiān. Nǐ hé péngyǒu guān qǐ mén lái, zhège kōngjiān jiù wánquán shǔyú nǐmen, xiǎng zěnme chàng, chàng duō nántīng dōu méi guānxì.",
      m:{
        j:"台湾では、KTVはほとんど誰の生活にも登場したことのあるキーワードです。要は「カラオケ」に「テレビ画面」を組み合わせたものですが、台湾のKTVは多くの人が想像するのとは少し違います。ここは一人が皆の前で歌うバーのステージではなく、「包廂（個室）」——つまりドアがあり、ソファがあり、大きな画面のある独立した部屋が並んでいます。友だちとドアを閉めれば、その空間は完全にあなたたちのもの。どんなふうに歌おうと、どんなに音痴でも全然かまいません。",
        e:"In Taiwan, KTV is a keyword that has surely shown up in nearly everyone's life. It's basically karaoke plus a TV screen, but Taiwan's KTV is a bit different from what many people picture. It's not a bar stage where one person sings in front of everyone; instead there are rows of 'private rooms'—self-contained spaces with a door, sofas, and a big screen. Once you and your friends close the door, the space is entirely yours: sing however you like, and it doesn't matter how badly you sing.",
        k:"대만에서 KTV는 거의 모든 사람의 삶에 한 번쯤 등장한 키워드입니다. 사실 '가라오케'에 '텔레비전 화면'을 더한 것이지만, 대만의 KTV는 많은 사람이 상상하는 것과 조금 다릅니다. 이곳은 한 사람이 모두 앞에서 노래하는 술집 무대가 아니라, '개별 룸(包廂)'—즉 문이 있고 소파가 있고 큰 화면이 있는 독립된 방들이 늘어서 있습니다. 친구와 문을 닫으면 그 공간은 완전히 여러분의 것입니다. 어떻게 부르든, 아무리 음치여도 전혀 상관없습니다."
      }
    },
    {
      z:"台灣最有名的KTV連鎖店，就是「錢櫃」和「好樂迪」。走進去，裝潢常常又氣派又明亮，櫃台幫你安排包廂，接著服務生會帶你穿過長長的走廊，兩旁都是傳出歌聲的房間。包廂裡有點歌用的觸控螢幕或平板，你只要輸入歌名或歌手，就能把想唱的歌一首一首「點」進待播清單。想唱中文歌、英文歌、日文歌、韓文歌，甚至台語老歌，幾乎都找得到。",
      py:"Táiwān zuì yǒumíng de KTV liánsuǒ diàn, jiùshì “Qiánguì” hé “Hǎolèdí”. Zǒu jìnqù, zhuānghuáng chángcháng yòu qìpài yòu míngliàng, guìtái bāng nǐ ānpái bāoxiāng, jiēzhe fúwùshēng huì dài nǐ chuānguò chángcháng de zǒuláng, liǎngpáng dōu shì chuánchū gēshēng de fángjiān. Bāoxiāng lǐ yǒu diǎngē yòng de chùkòng yíngmù huò píngbǎn, nǐ zhǐyào shūrù gēmíng huò gēshǒu, jiù néng bǎ xiǎng chàng de gē yì shǒu yì shǒu “diǎn” jìn dàibò qīngdān. Xiǎng chàng Zhōngwén gē, Yīngwén gē, Rìwén gē, Hánwén gē, shènzhì Táiyǔ lǎogē, jīhū dōu zhǎodedào.",
      m:{
        j:"台湾で最も有名なKTVチェーンは「錢櫃（キャッシュボックス）」と「好樂迪（ホーライドー）」です。中に入ると、内装はしばしば豪華で明るく、受付が個室を手配してくれ、店員が長い廊下を案内してくれます。両側は歌声が漏れてくる部屋ばかり。個室には曲を選ぶためのタッチスクリーンやタブレットがあり、曲名か歌手名を入力すれば、歌いたい曲を一曲ずつ再生待ちリストに「入れて（点歌）」いけます。中国語の歌、英語の歌、日本語の歌、韓国語の歌、さらに台湾語の古い歌まで、たいてい見つかります。",
        e:"Taiwan's most famous KTV chains are Cashbox and Holiday KTV. Step inside and the décor is often grand and bright; the front desk assigns you a room, and a staff member leads you down a long corridor lined with rooms leaking song after song. Inside your room there's a touchscreen or tablet for picking songs—just type a title or artist and you can queue up the songs you want, one by one, into the play list. Mandarin songs, English songs, Japanese songs, Korean songs, even old Taiwanese-language classics—you can find almost anything.",
        k:"대만에서 가장 유명한 KTV 체인은 '첸구이(캐시박스)'와 '하오러디(홀리데이)'입니다. 안으로 들어가면 인테리어가 대개 웅장하고 밝으며, 접수처가 룸을 배정해 주고 직원이 긴 복도를 안내합니다. 양옆은 온통 노랫소리가 새어 나오는 방들입니다. 룸 안에는 곡을 고르는 터치스크린이나 태블릿이 있어, 곡명이나 가수명을 입력하면 부르고 싶은 노래를 한 곡씩 재생 대기 목록에 '넣을(점곡)' 수 있습니다. 중국어 노래, 영어 노래, 일본어 노래, 한국어 노래, 심지어 대만어 옛 노래까지 거의 다 찾을 수 있습니다."
      }
    },
    {
      z:"KTV在台灣之所以這麼受歡迎，是因為它不只是唱歌，更是一種「聚會方式」。生日想慶祝，就約大家去KTV；朋友從國外回來，就約KTV；同事下班想放鬆、社團辦活動、甚至情侶約會，都可能選擇KTV。在包廂裡，有人搶著唱，有人負責點歌，有人專門幫大家錄影、拍照，還有人躺在沙發上邊吃邊聊。唱得好不好其實不重要，重要的是大家「在一起」。",
      py:"KTV zài Táiwān zhīsuǒyǐ zhème shòu huānyíng, shì yīnwèi tā bùzhǐ shì chànggē, gèng shì yì zhǒng “jùhuì fāngshì”. Shēngrì xiǎng qìngzhù, jiù yuē dàjiā qù KTV; péngyǒu cóng guówài huílái, jiù yuē KTV; tóngshì xiàbān xiǎng fàngsōng, shètuán bàn huódòng, shènzhì qínglǚ yuēhuì, dōu kěnéng xuǎnzé KTV. Zài bāoxiāng lǐ, yǒurén qiǎngzhe chàng, yǒurén fùzé diǎngē, yǒurén zhuānmén bāng dàjiā lùyǐng, pāizhào, hái yǒurén tǎng zài shāfā shàng biān chī biān liáo. Chàng de hǎo bù hǎo qíshí bú zhòngyào, zhòngyào de shì dàjiā “zài yìqǐ”.",
      m:{
        j:"KTVが台湾でこれほど人気なのは、単に歌う場所ではなく、一つの「集まり方」だからです。誕生日を祝いたければみんなでKTVへ、友だちが海外から帰ってくればKTVへ、同僚が仕事帰りにくつろぎたいとき、サークルのイベント、さらにはカップルのデートまで、KTVが選ばれます。個室の中では、我先にと歌う人、点歌担当の人、みんなの動画や写真をせっせと撮る人、ソファに寝そべって食べながらしゃべる人がいます。歌がうまいかどうかは実はどうでもよく、大事なのはみんなが「一緒にいる」ことなのです。",
        e:"KTV is so popular in Taiwan because it isn't just about singing—it's a way of gathering. Want to celebrate a birthday? Invite everyone to KTV. A friend is back from abroad? KTV. Coworkers unwinding after work, a club event, even a couple's date—KTV is a likely pick. Inside the room, someone hogs the mic, someone handles the song queue, someone busily films and photographs everyone, and someone sprawls on the sofa eating and chatting. Whether you sing well doesn't really matter; what matters is that everyone is 'together.'",
        k:"KTV가 대만에서 이토록 인기 있는 것은 단순히 노래하는 곳이 아니라 하나의 '모임 방식'이기 때문입니다. 생일을 축하하고 싶으면 다 같이 KTV로, 친구가 해외에서 돌아오면 KTV로, 동료가 퇴근 후 쉬고 싶을 때, 동아리 행사, 심지어 커플 데이트까지 KTV를 고릅니다. 룸 안에서는 서로 먼저 부르려는 사람, 점곡을 맡은 사람, 모두의 영상과 사진을 열심히 찍는 사람, 소파에 누워 먹으며 수다 떠는 사람이 있습니다. 노래를 잘하는지는 사실 중요하지 않고, 중요한 것은 모두가 '함께 있다'는 것입니다."
      }
    },
    {
      z:"台灣的KTV還有一個讓外國人驚訝的地方，就是「吃」。這裡不只提供飲料，還有非常完整的餐點：炸物、火鍋、義大利麵、水果盤、甜點，應有盡有。很多人去KTV根本是「唱歌兼吃飯」，一待就是好幾個小時。有些人甚至笑說，去KTV最認真的其實是點餐那部分。一群人邊唱、邊吃、邊聊，時間常常一下子就過去了。",
      py:"Táiwān de KTV hái yǒu yí ge ràng wàiguórén jīngyà de dìfāng, jiùshì “chī”. Zhèlǐ bùzhǐ tígōng yǐnliào, hái yǒu fēicháng wánzhěng de cāndiǎn: zháwù, huǒguō, Yìdàlì miàn, shuǐguǒ pán, tiándiǎn, yīngyǒujìnyǒu. Hěnduō rén qù KTV gēnběn shì “chànggē jiān chīfàn”, yì dāi jiùshì hǎojǐ ge xiǎoshí. Yǒuxiē rén shènzhì xiào shuō, qù KTV zuì rènzhēn de qíshí shì diǎncān nà bùfèn. Yìqún rén biān chàng, biān chī, biān liáo, shíjiān chángcháng yíxiàzi jiù guòqù le.",
      m:{
        j:"台湾のKTVには、外国人を驚かせるもう一つの点があります。それは「食べること」です。ここは飲み物だけでなく、揚げ物、火鍋、パスタ、フルーツの盛り合わせ、デザートまで、実に充実した料理がそろっています。多くの人にとってKTVは「歌いながら食事する」場所で、一度入れば何時間も居座ります。中には、KTVで一番真剣なのは実は注文の部分だ、と冗談を言う人もいるほど。仲間で歌い、食べ、しゃべっていると、時間はあっという間に過ぎていきます。",
        e:"Taiwan's KTV has another thing that surprises foreigners: the food. Beyond drinks, there's a full menu—fried snacks, hot pot, pasta, fruit platters, desserts, you name it. For many, going to KTV is really 'singing plus dining,' and once they settle in, they stay for hours. Some even joke that the part people take most seriously at KTV is ordering food. Singing, eating, and chatting together, a group often finds the hours slipping by in a flash.",
        k:"대만의 KTV에는 외국인을 놀라게 하는 또 하나가 있습니다. 바로 '먹는 것'입니다. 이곳은 음료뿐 아니라 튀김, 훠궈, 파스타, 과일 접시, 디저트까지 아주 알찬 음식이 갖춰져 있습니다. 많은 사람에게 KTV는 '노래하면서 밥 먹는' 곳이라, 한번 들어가면 몇 시간씩 머뭅니다. 어떤 이들은 KTV에서 가장 진지한 부분은 사실 음식 주문이라고 농담하기도 합니다. 무리 지어 노래하고 먹고 수다 떨다 보면 시간은 순식간에 지나가곤 합니다."
      }
    },
    {
      z:"如果一次還不夠盡興，台灣人常常會「續攤」。所謂續攤，就是一個活動結束後，再換一個地方繼續玩。吃完晚餐去KTV，是很典型的續攤路線。而如果唱得太開心，還可能一路唱到半夜甚至天亮，這就叫「夜唱」。夜唱通常比較便宜，一群朋友從晚上十一點唱到隔天早上，走出KTV時天已經亮了，大家眼睛紅紅、聲音沙啞，卻笑得很開心。",
      py:"Rúguǒ yí cì hái bú gòu jìnxìng, Táiwānrén chángcháng huì “xùtān”. Suǒwèi xùtān, jiùshì yí ge huódòng jiéshù hòu, zài huàn yí ge dìfāng jìxù wán. Chī wán wǎncān qù KTV, shì hěn diǎnxíng de xùtān lùxiàn. Ér rúguǒ chàng de tài kāixīn, hái kěnéng yílù chàng dào bànyè shènzhì tiānliàng, zhè jiù jiào “yèchàng”. Yèchàng tōngcháng bǐjiào piányí, yìqún péngyǒu cóng wǎnshàng shíyī diǎn chàng dào gétiān zǎoshang, zǒu chū KTV shí tiān yǐjīng liàng le, dàjiā yǎnjīng hónghóng, shēngyīn shāyǎ, què xiào de hěn kāixīn.",
      m:{
        j:"一度では物足りないと、台湾人はよく「續攤（次の店へはしごする）」をします。續攤とは、一つの集まりが終わったあと、場所を変えて遊び続けること。夕食のあとKTVへ、というのは典型的なはしごコースです。そして歌が盛り上がりすぎると、そのまま真夜中、さらには夜明けまで歌い続けることもあり、これを「夜唱（オールで歌う）」と呼びます。夜唱はたいてい料金が安く、仲間が夜11時から翌朝まで歌い、KTVを出るころにはもう外は明るい。みんな目は真っ赤で声はガラガラ、それでも満面の笑みなのです。",
        e:"If one round isn't enough, Taiwanese often 'move on to the next spot' (xùtān)—after one activity ends, they switch venues and keep the fun going. Dinner followed by KTV is a classic route. And if the singing gets too fun, they might sing straight through midnight or even until dawn—that's called an 'all-night sing' (yèchàng). All-night sessions are usually cheaper; a group sings from 11 p.m. until the next morning, and when they step out of KTV, it's already light. Everyone's eyes are bloodshot and their voices hoarse, yet they're grinning ear to ear.",
        k:"한 번으로는 아쉬우면 대만 사람들은 흔히 '다음 자리로 이어 가기(續攤)'를 합니다. 이는 한 모임이 끝난 뒤 장소를 바꿔 계속 노는 것으로, 저녁을 먹은 뒤 KTV로 가는 것이 전형적인 코스입니다. 그리고 노래가 너무 신나면 그대로 한밤중, 심지어 동틀 때까지 부르기도 하는데 이를 '밤새 노래(夜唱)'라고 합니다. 밤샘 노래는 대개 요금이 저렴해서, 무리가 밤 11시부터 다음 날 아침까지 부르고 KTV를 나올 때면 이미 밖이 밝습니다. 모두 눈은 벌겋고 목소리는 쉬었지만 환하게 웃습니다."
      }
    },
    {
      z:"對外國人來說，KTV是快速融入台灣朋友圈的好機會。你不需要唱得多好，選一首自己熟悉的歌，勇敢拿起麥克風，大家一定會用力幫你鼓掌加油。你也會發現，透過一起唱歌，語言和文化的距離縮短得特別快。下次台灣朋友問你「要不要去唱歌？」別急著害羞拒絕——那可能是他們把你當自己人的邀請。",
      py:"Duì wàiguórén lái shuō, KTV shì kuàisù róngrù Táiwān péngyǒu quān de hǎo jīhuì. Nǐ bù xūyào chàng de duō hǎo, xuǎn yì shǒu zìjǐ shúxī de gē, yǒnggǎn ná qǐ màikèfēng, dàjiā yídìng huì yònglì bāng nǐ gǔzhǎng jiāyóu. Nǐ yě huì fāxiàn, tòuguò yìqǐ chànggē, yǔyán hé wénhuà de jùlí suōduǎn de tèbié kuài. Xià cì Táiwān péngyǒu wèn nǐ “yào bú yào qù chànggē?” bié jízhe hàixiū jùjué——nà kěnéng shì tāmen bǎ nǐ dàng zìjǐrén de yāoqǐng.",
      m:{
        j:"外国人にとって、KTVは台湾の友人の輪にすばやく溶け込む絶好の機会です。うまく歌う必要はありません。自分のよく知っている曲を一つ選び、勇気を出してマイクを握れば、みんなが力いっぱい拍手して応援してくれます。そして一緒に歌うことで、言語や文化の距離が驚くほど早く縮まることにも気づくでしょう。次に台湾の友だちに「歌いに行かない？」と誘われたら、恥ずかしがってすぐ断らないで——それはきっと、あなたを仲間として迎え入れる招待なのですから。",
        e:"For foreigners, KTV is a great chance to blend quickly into a Taiwanese friend group. You don't need to sing well—pick a song you know, bravely grab the mic, and everyone will clap and cheer you on with all their might. You'll also find that singing together shrinks the distance of language and culture remarkably fast. Next time a Taiwanese friend asks, 'Want to go sing?' don't shyly refuse right away—it may well be their invitation to treat you as one of their own.",
        k:"외국인에게 KTV는 대만 친구 무리에 빠르게 녹아들 좋은 기회입니다. 잘 부를 필요는 없습니다. 자신이 잘 아는 노래 한 곡을 골라 용기 내어 마이크를 잡으면 모두가 힘껏 박수 치며 응원해 줍니다. 그리고 함께 노래하다 보면 언어와 문화의 거리가 놀랄 만큼 빨리 좁혀지는 것을 느끼게 됩니다. 다음에 대만 친구가 '노래하러 갈래?'라고 물으면 부끄러워서 바로 거절하지 마세요—그것은 아마 당신을 자기 사람으로 여기는 초대일 테니까요."
      }
    }
  ],
  vocab:[
    { w:"包廂", zy:"ㄅㄠ ㄒㄧㄤ", py:"bāoxiāng", m:{ j:"個室（カラオケなどの）", e:"private room (at a KTV, etc.)", k:"개별 룸(노래방 등의)" } },
    { w:"點歌", zy:"ㄉㄧㄢˇ ㄍㄜ", py:"diǎngē", m:{ j:"曲を選ぶ・リクエストする", e:"to queue up / request a song", k:"곡을 고르다·신청하다" } },
    { w:"麥克風", zy:"ㄇㄞˋ ㄎㄜˋ ㄈㄥ", py:"màikèfēng", m:{ j:"マイク", e:"microphone", k:"마이크" } },
    { w:"續攤", zy:"ㄒㄩˋ ㄊㄢ", py:"xùtān", m:{ j:"次の店へはしごする（二次会・三次会）", e:"to move on to the next venue", k:"다음 자리로 이어 가다(2차·3차)" } },
    { w:"夜唱", zy:"ㄧㄝˋ ㄔㄤˋ", py:"yèchàng", m:{ j:"夜通し歌う・オールで歌う", e:"to sing all night", k:"밤새 노래하다" } },
    { w:"聚會", zy:"ㄐㄩˋ ㄏㄨㄟˋ", py:"jùhuì", m:{ j:"集まり・パーティー", e:"gathering, get-together", k:"모임" } },
    { w:"連鎖店", zy:"ㄌㄧㄢˊ ㄙㄨㄛˇ ㄉㄧㄢˋ", py:"liánsuǒ diàn", m:{ j:"チェーン店", e:"chain store", k:"체인점" } },
    { w:"服務生", zy:"ㄈㄨˊ ㄨˋ ㄕㄥ", py:"fúwùshēng", m:{ j:"店員・ウェイター", e:"waiter, service staff", k:"직원·종업원" } },
    { w:"沙啞", zy:"ㄕㄚ ㄧㄚˇ", py:"shāyǎ", m:{ j:"（声が）かすれる・ガラガラ", e:"hoarse (voice)", k:"(목소리가) 쉬다" } },
    { w:"放鬆", zy:"ㄈㄤˋ ㄙㄨㄥ", py:"fàngsōng", m:{ j:"リラックスする・くつろぐ", e:"to relax, unwind", k:"긴장을 풀다·쉬다" } },
    { w:"自己人", zy:"ㄗˋ ㄐㄧˇ ㄖㄣˊ", py:"zìjǐrén", m:{ j:"身内・仲間", e:"one of us, insider", k:"자기 사람·한 식구" } },
    { w:"盡興", zy:"ㄐㄧㄣˋ ㄒㄧㄥˋ", py:"jìnxìng", m:{ j:"思う存分楽しむ・満喫する", e:"to enjoy to the fullest", k:"실컷 즐기다" } }
  ],
  note:{
    j:"台湾のKTVは時間帯によって料金がかなり変わります。平日の昼間は驚くほど安く、逆に金曜・土曜の夜や祝前日は高くなりがち。学生は『歡唱時段』と呼ばれる格安のパック（歌い放題＋ドリンクバーやビュッフェ付き）を狙うことも多いです。マナーとして、他人の歌を勝手に途中でカット（切歌）するのは嫌がられるので注意。ちなみに一人で気軽に歌える小型カラオケボックスも近年は増えており、『一人KTV』を楽しむ人もいます。",
    e:"KTV prices in Taiwan vary a lot by time slot. Weekday afternoons are surprisingly cheap, while Friday and Saturday nights or the eve of a holiday tend to be pricey. Students often hunt for the 'happy-singing time slot' package deals (all-you-can-sing plus a drink bar or buffet). As etiquette, cutting off someone else's song midway without asking is frowned upon, so be careful. Incidentally, small solo karaoke booths have been growing in recent years, and some people enjoy 'KTV for one.'",
    k:"대만의 KTV는 시간대에 따라 요금이 꽤 달라집니다. 평일 낮은 놀랄 만큼 저렴하고, 반대로 금·토요일 밤이나 공휴일 전날은 비싸지기 쉽습니다. 학생들은 '환창 시간대'라 불리는 저렴한 패키지(무제한 노래+음료바나 뷔페 포함)를 노리는 경우가 많습니다. 예절로서 남의 노래를 마음대로 중간에 끊는(切歌) 것은 싫어하니 주의하세요. 참고로 혼자 가볍게 부를 수 있는 소형 노래방 부스도 최근 늘어, '혼자 KTV'를 즐기는 사람도 있습니다."
  }
},
{
  id:"tw-drama-pop-culture",
  cat:{ j:"娯楽・スポーツ", e:"Entertainment & Sports", k:"엔터·스포츠" },
  zhTitle:"台劇與流行文化：從偶像劇到金曲獎",
  title:{ j:"台湾ドラマとポップカルチャー——アイドルドラマから金曲賞まで", e:"Taiwanese Dramas & Pop Culture: From Idol Dramas to the Golden Melody Awards", k:"대만 드라마와 대중문화: 아이돌 드라마부터 금곡상까지" },
  intro:{
    j:"甘酸っぱいアイドルドラマ、社会の痛みに切り込む話題作、街に流れる華語ポップス、そしてSNSで一晩じゅうに広がるネットスラング——台湾のポップカルチャーは、小さな島から驚くほど遠くまで届きます。台湾の『ソフトパワー』がどのように広がっていくのか、その道のりをのぞいてみましょう。",
    e:"Bittersweet idol dramas, buzz-worthy shows that cut into society's pain, Mandarin pop drifting through the streets, and internet slang that spreads overnight on social media—Taiwan's pop culture reaches remarkably far from such a small island. Let's trace how Taiwan's 'soft power' travels out into the world.",
    k:"달콤씁쓸한 아이돌 드라마, 사회의 아픔을 파고드는 화제작, 거리에 흐르는 화어 팝, 그리고 SNS에서 하룻밤 새 퍼지는 인터넷 유행어—대만의 대중문화는 작은 섬에서 놀랄 만큼 멀리까지 닿습니다. 대만의 '소프트파워'가 어떻게 퍼져 나가는지 그 여정을 들여다봅시다."
  },
  paras:[
    {
      z:"很多亞洲觀眾對台灣的第一印象，其實來自「偶像劇」。二〇〇〇年代初，一部改編自日本漫畫的《流星花園》紅遍整個亞洲，也把台灣的偶像劇推向高峰。那個年代的台劇，主角常常是帥氣的男孩和努力的女孩，故事甜甜的、青春洋溢，配上朗朗上口的主題曲，讓無數觀眾守在電視機前，也捧紅了一批又一批的偶像明星。",
      py:"Hěnduō Yàzhōu guānzhòng duì Táiwān de dì yī yìnxiàng, qíshí láizì “ǒuxiàngjù”. Èr líng líng líng niándài chū, yí bù gǎibiān zì Rìběn mànhuà de «Liúxīng Huāyuán» hóng biàn zhěnggè Yàzhōu, yě bǎ Táiwān de ǒuxiàngjù tuīxiàng gāofēng. Nàge niándài de Táijù, zhǔjiǎo chángcháng shì shuàiqì de nánhái hé nǔlì de nǚhái, gùshì tiántián de, qīngchūn yángyì, pèishàng lǎnglǎng shàngkǒu de zhǔtíqǔ, ràng wúshù guānzhòng shǒu zài diànshìjī qián, yě pěng hóng le yì pī yòu yì pī de ǒuxiàng míngxīng.",
      m:{
        j:"多くのアジアの視聴者が台湾に抱く第一印象は、実は「アイドルドラマ（偶像劇）」から来ています。2000年代初め、日本の漫画を原作とした《流星花園（花より男子）》がアジア全体で大ヒットし、台湾のアイドルドラマを頂点へと押し上げました。あの時代の台湾ドラマは、主人公はたいていイケメンの男の子とがんばり屋の女の子で、物語は甘く、青春に満ちあふれ、口ずさみやすい主題歌が添えられ、無数の視聴者をテレビの前に釘付けにし、次々とアイドルスターを生み出しました。",
        e:"For many Asian viewers, their first impression of Taiwan actually comes from 'idol dramas.' In the early 2000s, 'Meteor Garden,' adapted from a Japanese manga, became a smash hit across Asia and pushed Taiwan's idol dramas to their peak. Dramas of that era typically starred a dashing boy and a hardworking girl; the stories were sweet, brimming with youth, paired with catchy theme songs that glued countless viewers to their TVs—and launched wave after wave of idol stars.",
        k:"많은 아시아 시청자가 대만에 갖는 첫인상은 사실 '아이돌 드라마(偶像劇)'에서 옵니다. 2000년대 초, 일본 만화를 원작으로 한 《유성화원(꽃보다 남자)》이 아시아 전역에서 크게 흥행하며 대만 아이돌 드라마를 정점으로 끌어올렸습니다. 그 시절 대만 드라마의 주인공은 대개 잘생긴 남자아이와 노력파 여자아이였고, 이야기는 달콤하고 청춘이 넘쳤으며 입에 착 붙는 주제가가 곁들여져 수많은 시청자를 텔레비전 앞에 붙들고 잇달아 아이돌 스타를 배출했습니다."
      }
    },
    {
      z:"不過，台劇並沒有停在甜美的偶像劇。近十幾年，台灣的戲劇越拍越大膽，也越來越敢碰觸真實的社會議題。像是討論死刑與媒體的《我們與惡的距離》、講校園霸凌與升學壓力的作品、還有各種懸疑、犯罪、家庭與同志題材的影集，都在網路串流平台上被大量討論。這些新一代的台劇，不再只是談戀愛，而是認真地問：我們身處的社會，到底發生了什麼事？",
      py:"Búguò, Táijù bìng méiyǒu tíng zài tiánměi de ǒuxiàngjù. Jìn shí jǐ nián, Táiwān de xìjù yuè pāi yuè dàdǎn, yě yuèláiyuè gǎn pèngchù zhēnshí de shèhuì yìtí. Xiàngshì tǎolùn sǐxíng yǔ méitǐ de «Wǒmen yǔ È de Jùlí», jiǎng xiàoyuán bàlíng yǔ shēngxué yālì de zuòpǐn, háiyǒu gèzhǒng xuányí, fànzuì, jiātíng yǔ tóngzhì tícái de yǐngjí, dōu zài wǎnglù chuànliú píngtái shàng bèi dàliàng tǎolùn. Zhèxiē xīn yídài de Táijù, búzài zhǐshì tán liàn'ài, érshì rènzhēn de wèn: wǒmen shēnchǔ de shèhuì, dàodǐ fāshēng le shénme shì?",
      m:{
        j:"けれども、台湾ドラマは甘いアイドルドラマにとどまりませんでした。ここ十数年、台湾のドラマはますます大胆になり、現実の社会問題に踏み込むことを恐れなくなっています。死刑とメディアを論じた《我們與惡的距離（悪との距離）》、校内いじめや受験圧力を描いた作品、さらにサスペンス、犯罪、家族、LGBTを題材にした連続ドラマなどが、ネットの配信プラットフォームで盛んに議論されています。この新世代の台湾ドラマは、もはや恋愛を語るだけでなく、真剣にこう問いかけます——私たちが生きるこの社会で、いったい何が起きているのか、と。",
        e:"But Taiwanese drama didn't stay with sweet idol romances. Over the past decade or so, its shows have grown bolder and increasingly willing to confront real social issues. Series like 'The World Between Us,' which examines the death penalty and the media, works about school bullying and academic pressure, plus all kinds of suspense, crime, family, and LGBT-themed shows, have been hotly discussed on streaming platforms. This new generation of Taiwanese drama no longer just talks about romance; it earnestly asks: what is really happening in the society we live in?",
        k:"하지만 대만 드라마는 달콤한 아이돌 드라마에 머물지 않았습니다. 최근 십여 년간 대만 드라마는 점점 대담해지고 현실의 사회 문제를 파고드는 것을 두려워하지 않게 되었습니다. 사형과 언론을 다룬 《우리와 악의 거리》, 학교 폭력과 입시 압박을 그린 작품, 그리고 각종 미스터리, 범죄, 가족, 성소수자 소재의 시리즈가 인터넷 스트리밍 플랫폼에서 활발히 논의됩니다. 이 새로운 세대의 대만 드라마는 더 이상 연애만 이야기하지 않고 진지하게 묻습니다—우리가 사는 이 사회에서 도대체 무슨 일이 벌어지고 있는가?"
      }
    },
    {
      z:"在音樂方面，台灣一直是「華語流行音樂」的重要基地。許多紅遍華語世界的歌手和作品，都是從台灣走出去的。每年最受矚目的音樂盛事，就是被稱為「華語樂壇金曲」的「金曲獎」。它有點像華語音樂界的重要獎項，得獎名單一公布，往往就是隔天大家討論的話題。從流行、搖滾、嘻哈到原住民語、台語、客語的作品，都能在這個舞台上被看見。",
      py:"Zài yīnyuè fāngmiàn, Táiwān yìzhí shì “Huáyǔ liúxíng yīnyuè” de zhòngyào jīdì. Xǔduō hóng biàn Huáyǔ shìjiè de gēshǒu hé zuòpǐn, dōu shì cóng Táiwān zǒu chūqù de. Měinián zuì shòu zhǔmù de yīnyuè shèngshì, jiùshì bèi chēngwéi “Huáyǔ yuètán jīnqǔ” de “Jīnqǔ Jiǎng”. Tā yǒudiǎn xiàng Huáyǔ yīnyuè jiè de zhòngyào jiǎngxiàng, déjiǎng míngdān yì gōngbù, wǎngwǎng jiùshì gétiān dàjiā tǎolùn de huàtí. Cóng liúxíng, yáogǔn, xīhā dào yuánzhùmínyǔ, Táiyǔ, Kèyǔ de zuòpǐn, dōu néng zài zhège wǔtái shàng bèi kànjiàn.",
      m:{
        j:"音楽の面では、台湾はずっと「華語ポップス（中国語圏のポップミュージック）」の重要な拠点であり続けています。華語圏で大ヒットした歌手や作品の多くが、台湾から世界へ飛び出していきました。毎年最も注目される音楽の祭典が、「華語音楽界の金の楽曲」と称される「金曲獎（ゴールデン・メロディ・アワード）」です。これは華語音楽界の重要な賞のようなもので、受賞リストが発表されれば、翌日にはみんなの話題になります。ポップ、ロック、ヒップホップから、原住民の言語、台湾語、客家語の作品まで、この舞台で光を浴びることができます。",
        e:"In music, Taiwan has long been a key base for 'Mandarin pop.' Many singers and works that swept the Mandarin-speaking world got their start in Taiwan. The most anticipated music event each year is the Golden Melody Awards, dubbed the crowning honors of the Mandarin music scene. It's rather like the major prize of Mandarin music, and the moment the winners are announced, it's usually what everyone is talking about the next day. From pop, rock, and hip-hop to works in Indigenous languages, Taiwanese, and Hakka, all can be seen on this stage.",
        k:"음악 면에서 대만은 오랫동안 '화어 팝(중화권 대중음악)'의 중요한 거점이었습니다. 화어권에서 크게 흥행한 가수와 작품 다수가 대만에서 세계로 뻗어 나갔습니다. 매년 가장 주목받는 음악 축제가 '화어 음악계의 금빛 노래'라 불리는 '금곡상(골든 멜로디 어워드)'입니다. 이는 화어 음악계의 중요한 상 같은 것으로, 수상자 명단이 발표되면 대개 다음 날 모두의 화제가 됩니다. 팝, 록, 힙합부터 원주민 언어, 대만어, 객가어 작품까지 이 무대에서 조명받을 수 있습니다."
      }
    },
    {
      z:"除了戲劇和音樂，台灣的流行文化也大量活在「網路」上。年輕人愛用的社群平台、迷因（把好笑的圖片配上文字的梗圖）、還有各種「網路流行語」，都是台灣文化的一部分。像是形容心情很複雜的「五味雜陳」，或是網路上常見的「已讀不回」（訊息看了卻不回覆）、「+1」（表示我也要、我同意），這些用語每隔一段時間就會有新的流行，也快速地在朋友之間傳開。",
      py:"Chúle xìjù hé yīnyuè, Táiwān de liúxíng wénhuà yě dàliàng huó zài “wǎnglù” shàng. Niánqīngrén ài yòng de shèqún píngtái, mímīn (bǎ hǎoxiào de túpiàn pèi shàng wénzì de gěngtú), háiyǒu gèzhǒng “wǎnglù liúxíngyǔ”, dōu shì Táiwān wénhuà de yíbùfèn. Xiàngshì xíngróng xīnqíng hěn fùzá de “wǔwèi záchén”, huòshì wǎnglù shàng chángjiàn de “yǐdú bùhuí” (xùnxí kàn le què bù huífù), “+1” (biǎoshì wǒ yě yào, wǒ tóngyì), zhèxiē yòngyǔ měi gé yí duàn shíjiān jiù huì yǒu xīn de liúxíng, yě kuàisù de zài péngyǒu zhījiān chuán kāi.",
      m:{
        j:"ドラマや音楽のほかに、台湾のポップカルチャーは「ネット」の上にも大量に息づいています。若者が好んで使うSNS、ミーム（面白い画像に文字を添えたネタ画像＝梗圖）、そしてさまざまな「ネット流行語」も、台湾文化の一部です。たとえば複雑な心境を表す「五味雑陳（さまざまな感情が入り混じる）」や、ネットでよく見る「已讀不回（メッセージを読んだのに返信しない）」、「+1（私も／賛成、の意）」など、こうした言い回しは一定の周期で新しい流行が生まれ、友だちのあいだにあっという間に広がっていきます。",
        e:"Beyond drama and music, Taiwan's pop culture also thrives online. The social platforms young people love, memes (funny images captioned with text), and all sorts of 'internet slang' are part of Taiwanese culture too. Take '五味雜陳' (a jumble of mixed feelings) to describe a complicated mood, or the common online phrases '已讀不回' (seeing a message but not replying) and '+1' (meaning 'me too / I agree')—such expressions keep spawning new trends over time and spread among friends in a flash.",
        k:"드라마와 음악 외에도 대만의 대중문화는 '인터넷' 위에서도 활발히 살아 숨 쉽니다. 젊은이들이 즐겨 쓰는 SNS, 밈(웃긴 이미지에 글자를 붙인 짤방=梗圖), 그리고 각종 '인터넷 유행어'도 대만 문화의 일부입니다. 예를 들어 복잡한 심경을 나타내는 '오미잡진(온갖 감정이 뒤섞이다)', 인터넷에서 흔한 '이독불회(메시지를 읽고도 답하지 않음)', '+1(나도·동의한다는 뜻)' 등, 이런 표현은 일정 주기로 새로운 유행이 생기고 친구들 사이에 순식간에 퍼집니다."
      }
    },
    {
      z:"這些看似輕鬆的娛樂，其實累積成了台灣的「軟實力」。一部好看的台劇，可能讓外國觀眾開始對台灣的城市、小吃、生活方式產生興趣；一首打動人心的歌，可能讓人願意去學中文；一個爆紅的迷因，也可能讓更多人認識台灣人幽默、直率又有點溫暖的性格。文化的力量往往是這樣，不靠說教，而是靠一次次「原來台灣是這樣啊」的驚喜。",
      py:"Zhèxiē kànsì qīngsōng de yúlè, qíshí lěijī chéng le Táiwān de “ruǎnshílì”. Yí bù hǎokàn de Táijù, kěnéng ràng wàiguó guānzhòng kāishǐ duì Táiwān de chéngshì, xiǎochī, shēnghuó fāngshì chǎnshēng xìngqù; yì shǒu dǎdòng rénxīn de gē, kěnéng ràng rén yuànyì qù xué Zhōngwén; yí ge bàohóng de mímīn, yě kěnéng ràng gèng duō rén rènshì Táiwānrén yōumò, zhíshuài yòu yǒudiǎn wēnnuǎn de xìnggé. Wénhuà de lìliàng wǎngwǎng shì zhèyàng, bú kào shuōjiào, érshì kào yícì cì “yuánlái Táiwān shì zhèyàng a” de jīngxǐ.",
      m:{
        j:"こうした一見気軽な娯楽が、実は台湾の「ソフトパワー」として積み重なっていきます。よくできた台湾ドラマ一本が、外国の視聴者に台湾の街や屋台料理、暮らし方への興味を芽生えさせるかもしれない。心を打つ歌一曲が、中国語を学んでみようという気持ちにさせるかもしれない。爆発的に広まったミーム一つが、台湾人のユーモアがあって率直で、どこか温かい人柄を、より多くの人に知ってもらうきっかけになるかもしれない。文化の力とは往々にしてこういうもの——説教ではなく、「台湾ってこうなんだ！」という一つひとつの驚きによって広がっていくのです。",
        e:"These seemingly light forms of entertainment actually accumulate into Taiwan's 'soft power.' A well-made Taiwanese drama might spark foreign viewers' interest in Taiwan's cities, street food, and way of life; a moving song might make someone want to learn Chinese; a viral meme might help more people discover Taiwanese people's humorous, straightforward, and somewhat warm-hearted character. The power of culture often works this way—not through preaching, but through one small surprise after another of 'oh, so this is what Taiwan is like.'",
        k:"이처럼 가벼워 보이는 오락이 사실 대만의 '소프트파워'로 쌓여 갑니다. 잘 만든 대만 드라마 한 편이 외국 시청자에게 대만의 도시, 길거리 음식, 생활 방식에 대한 흥미를 싹틔울 수 있고, 마음을 울리는 노래 한 곡이 중국어를 배우고 싶게 만들 수 있으며, 크게 퍼진 밈 하나가 더 많은 사람에게 대만인의 유머 있고 솔직하며 어딘가 따뜻한 성격을 알릴 수 있습니다. 문화의 힘은 흔히 이렇습니다—설교가 아니라 '대만이 이렇구나!' 하는 하나하나의 놀라움을 통해 퍼져 나갑니다."
      }
    },
    {
      z:"如果你正在學中文，台灣的流行文化其實是很好的教材。追一部台劇，你能學到自然的口語和語氣；聽華語流行歌，你能記住實用的句子和情感表達；看懂朋友傳來的迷因和流行語，你就能真正笑在同一個點上。文化和語言從來不是分開的兩件事——當你開始享受台灣的娛樂，你的中文，也會在不知不覺中變得更像「台灣人在講的中文」。",
      py:"Rúguǒ nǐ zhèngzài xué Zhōngwén, Táiwān de liúxíng wénhuà qíshí shì hěn hǎo de jiàocái. Zhuī yí bù Táijù, nǐ néng xuédào zìrán de kǒuyǔ hé yǔqì; tīng Huáyǔ liúxíng gē, nǐ néng jìzhù shíyòng de jùzi hé qínggǎn biǎodá; kàndǒng péngyǒu chuán lái de mímīn hé liúxíngyǔ, nǐ jiù néng zhēnzhèng xiào zài tóng yí ge diǎn shàng. Wénhuà hé yǔyán cónglái búshì fēnkāi de liǎng jiàn shì——dāng nǐ kāishǐ xiǎngshòu Táiwān de yúlè, nǐ de Zhōngwén, yě huì zài bùzhībùjué zhōng biàndé gèng xiàng “Táiwānrén zài jiǎng de Zhōngwén”.",
      m:{
        j:"もしあなたが中国語を学んでいるなら、台湾のポップカルチャーは実にすぐれた教材です。台湾ドラマを追いかければ、自然な口語や言い回しのニュアンスが学べます。華語ポップスを聴けば、実用的なフレーズや感情表現が身につきます。友だちが送ってくるミームや流行語が分かるようになれば、本当に同じツボで笑えるようになります。文化と言語はもともと別々のものではありません——台湾の娯楽を楽しみ始めれば、あなたの中国語も、知らず知らずのうちに「台湾人が話す中国語」へと近づいていくのです。",
        e:"If you're learning Chinese, Taiwan's pop culture is actually excellent study material. Follow a Taiwanese drama and you'll pick up natural colloquial speech and tone; listen to Mandarin pop and you'll remember practical sentences and ways to express emotion; understand the memes and slang your friends send you and you'll truly laugh at the same punchlines. Culture and language were never two separate things—once you start enjoying Taiwan's entertainment, your Chinese will, without your realizing it, come to sound more like 'the Chinese Taiwanese people actually speak.'",
        k:"만약 중국어를 배우고 있다면 대만의 대중문화는 사실 훌륭한 교재입니다. 대만 드라마를 챙겨 보면 자연스러운 구어와 말투의 뉘앙스를 배울 수 있고, 화어 팝을 들으면 실용적인 문장과 감정 표현을 익힐 수 있으며, 친구가 보내는 밈과 유행어를 이해하면 정말로 같은 지점에서 웃을 수 있습니다. 문화와 언어는 애초에 별개가 아닙니다—대만의 오락을 즐기기 시작하면 당신의 중국어도 어느새 '대만 사람이 쓰는 중국어'에 가까워집니다."
      }
    }
  ],
  vocab:[
    { w:"偶像劇", zy:"ㄡˇ ㄒㄧㄤˋ ㄐㄩˋ", py:"ǒuxiàngjù", m:{ j:"アイドルドラマ（青春恋愛ドラマ）", e:"idol drama", k:"아이돌 드라마" } },
    { w:"台劇", zy:"ㄊㄞˊ ㄐㄩˋ", py:"Táijù", m:{ j:"台湾ドラマ", e:"Taiwanese drama", k:"대만 드라마" } },
    { w:"金曲獎", zy:"ㄐㄧㄣ ㄑㄩˇ ㄐㄧㄤˇ", py:"Jīnqǔ Jiǎng", m:{ j:"金曲賞（ゴールデン・メロディ・アワード）", e:"Golden Melody Awards", k:"금곡상(골든 멜로디 어워드)" } },
    { w:"流行音樂", zy:"ㄌㄧㄡˊ ㄒㄧㄥˊ ㄧㄣ ㄩㄝˋ", py:"liúxíng yīnyuè", m:{ j:"ポップミュージック", e:"pop music", k:"대중음악·팝" } },
    { w:"華語", zy:"ㄏㄨㄚˊ ㄩˇ", py:"Huáyǔ", m:{ j:"華語（中国語圏で使う中国語の呼び方）", e:"Mandarin/Chinese (Sinophone)", k:"화어(중화권 중국어)" } },
    { w:"迷因", zy:"ㄇㄧˊ ㄧㄣ", py:"mímīn", m:{ j:"ミーム（ネタ画像・ネットのネタ）", e:"meme", k:"밈" } },
    { w:"流行語", zy:"ㄌㄧㄡˊ ㄒㄧㄥˊ ㄩˇ", py:"liúxíngyǔ", m:{ j:"流行語", e:"buzzword, slang", k:"유행어" } },
    { w:"已讀不回", zy:"ㄧˇ ㄉㄨˊ ㄅㄨˋ ㄏㄨㄟˊ", py:"yǐdú bùhuí", m:{ j:"既読スルー（読んだのに返信しない）", e:"read but no reply (leave on 'read')", k:"읽씹(읽고 답 안 함)" } },
    { w:"軟實力", zy:"ㄖㄨㄢˇ ㄕˊ ㄌㄧˋ", py:"ruǎnshílì", m:{ j:"ソフトパワー", e:"soft power", k:"소프트파워" } },
    { w:"主題曲", zy:"ㄓㄨˇ ㄊㄧˊ ㄑㄩˇ", py:"zhǔtíqǔ", m:{ j:"主題歌・テーマソング", e:"theme song", k:"주제가" } },
    { w:"議題", zy:"ㄧˋ ㄊㄧˊ", py:"yìtí", m:{ j:"（社会）問題・テーマ・論点", e:"issue, topic (of debate)", k:"의제·이슈" } },
    { w:"串流", zy:"ㄔㄨㄢˋ ㄌㄧㄡˊ", py:"chuànliú", m:{ j:"ストリーミング（配信）", e:"streaming", k:"스트리밍" } }
  ],
  note:{
    j:"『華語』という言い方を押さえておくと便利です。台湾では標準的な中国語を指すとき、状況によって『中文』『國語』『華語』などが使い分けられます。『金曲獎』は音楽の賞ですが、台湾には映画の『金馬獎』、テレビの『金鐘獎』もあり、この三つをまとめて『三金』と呼びます。ネットスラングは移り変わりが速いので、台湾の友だちに『これ、今でも使う？』と確かめながら覚えると、古い言い方を使ってしまう失敗を防げます。",
    e:"It helps to note the term '華語 (Huáyǔ).' In Taiwan, standard Chinese may be called '中文,' '國語,' or '華語' depending on context. The Golden Melody Awards are for music, but Taiwan also has the Golden Horse Awards for film and the Golden Bell Awards for television—together the three are called the 'Three Golds.' Internet slang changes fast, so learning it while checking with Taiwanese friends—'Is this still used?'—will help you avoid the mistake of using outdated phrases.",
    k:"'화어(華語)'라는 표현을 알아 두면 편리합니다. 대만에서는 표준 중국어를 가리킬 때 상황에 따라 '중문(中文)', '국어(國語)', '화어(華語)' 등을 나눠 씁니다. '금곡상'은 음악상이지만, 대만에는 영화의 '금마상', 텔레비전의 '금종상'도 있어 이 셋을 묶어 '삼금(三金)'이라 부릅니다. 인터넷 유행어는 변화가 빨라서, 대만 친구에게 '이거 지금도 써?'라고 확인하며 익히면 낡은 표현을 쓰는 실수를 피할 수 있습니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_9 };
