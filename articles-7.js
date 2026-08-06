// StayTW Notes — 深度閲讀：台湾の歴史・遺産（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_7 = [
{
  id:"taiwan-layered-history",
  cat:{ j:"歴史・人物", e:"History & People", k:"역사·인물" },
  zhTitle:"台灣的多元歷史：許多文化交織成的島嶼",
  title:{ j:"台湾の重層的な歴史——多くの文化が織りなした島", e:"Taiwan's Layered History: An Island Woven from Many Cultures", k:"대만의 다층적 역사: 여러 문화가 엮어 낸 섬" },
  intro:{
    j:"台湾を歩いていると、原住民族の言葉、閩南語や客家語、日本統治時代の建物、戦後の街並みが、あちこちで重なり合っているのに気づきます。この島の歴史は、一つの民族や一つの時代だけでできたのではありません。海を越えてやってきた人々が、それぞれの文化を少しずつ積み重ねてきた——その重なりこそが、今日の台湾らしさをつくっています。",
    e:"Walk around Taiwan and you'll notice Indigenous languages, Hokkien and Hakka, buildings from the Japanese era, and postwar streetscapes all overlapping. This island's history wasn't made by a single people or a single age. People who crossed the sea each left a layer of their own culture—and that layering is exactly what makes Taiwan what it is today.",
    k:"대만을 걷다 보면 원주민 언어, 민남어와 객가어, 일본 통치 시대의 건물, 전후의 거리 풍경이 곳곳에서 겹쳐 있는 것을 알게 됩니다. 이 섬의 역사는 하나의 민족이나 한 시대만으로 만들어지지 않았습니다. 바다를 건너온 사람들이 저마다의 문화를 조금씩 쌓아 온 것—그 겹겹의 층이 바로 오늘날의 대만다움을 만들어 냅니다."
  },
  paras:[
    {
      z:"要認識台灣的歷史，最好從「原住民族」開始說起。早在其他人來到這座島之前幾千年，南島語系的原住民族就已經在這裡生活。今天官方認定的原住民族有十六族，像阿美族、泰雅族、排灣族、布農族、達悟族等等，每一族都有自己的語言、祭典和傳統。他們的文化，是台灣最古老、也最根本的一層。",
      py:"Yào rènshì Táiwān de lìshǐ, zuìhǎo cóng “yuánzhùmínzú” kāishǐ shuōqǐ. Zǎo zài qítā rén láidào zhè zuò dǎo zhīqián jǐqiān nián, Nándǎo yǔxì de yuánzhùmínzú jiù yǐjīng zài zhèlǐ shēnghuó. Jīntiān guānfāng rèndìng de yuánzhùmínzú yǒu shíliù zú, xiàng Āměizú, Tàiyǎzú, Páiwānzú, Bùnóngzú, Dáwùzú děngděng, měi yì zú dōu yǒu zìjǐ de yǔyán, jìdiǎn hé chuántǒng. Tāmen de wénhuà, shì Táiwān zuì gǔlǎo, yě zuì gēnběn de yì céng.",
      m:{
        j:"台湾の歴史を知るには、まず「原住民族」から語り始めるのがよいでしょう。ほかの人々がこの島に来るより数千年も前から、オーストロネシア（南島）語族の原住民族がすでにここで暮らしていました。現在、公式に認定されている原住民族は十六族——アミ族、タイヤル族、パイワン族、ブヌン族、タオ族など——で、どの族もそれぞれ独自の言語、祭祀、伝統を持っています。彼らの文化は、台湾で最も古く、最も根源的な一層です。",
        e:"To understand Taiwan's history, it's best to begin with the Indigenous peoples. Thousands of years before anyone else arrived on this island, Austronesian-speaking Indigenous peoples were already living here. Today the state officially recognizes sixteen groups—such as the Amis, Atayal, Paiwan, Bunun, and Tao—each with its own language, ceremonies, and traditions. Their cultures form the oldest and most fundamental layer of Taiwan.",
        k:"대만의 역사를 알려면 '원주민족'부터 이야기를 시작하는 것이 좋습니다. 다른 사람들이 이 섬에 오기 수천 년 전부터, 오스트로네시아(남도)어족의 원주민족이 이미 이곳에서 살고 있었습니다. 오늘날 공식적으로 인정된 원주민족은 열여섯 부족—아미족, 타이야족, 파이완족, 부눈족, 타오족 등—으로, 각 부족마다 고유한 언어, 제의, 전통을 지니고 있습니다. 그들의 문화는 대만에서 가장 오래되고 가장 근원적인 한 층입니다."
      }
    },
    {
      z:"到了十七世紀，台灣開始出現在世界地圖上。荷蘭人與西班牙人先後來到南部與北部，建立據點、做貿易，這段被稱為「荷西時期」。荷蘭人在今天的台南一帶蓋了城堡，引進甘蔗、稻米的種植，也招募了不少來自對岸的漢人移民來開墾。雖然這段外來政權的統治時間不算長，卻讓台灣正式進入了海洋貿易的大時代。",
      py:"Dàole shíqī shìjì, Táiwān kāishǐ chūxiàn zài shìjiè dìtú shàng. Hélánrén yǔ Xībānyárén xiānhòu láidào nánbù yǔ běibù, jiànlì jùdiǎn, zuò màoyì, zhè duàn bèi chēngwéi “Hé-Xī shíqī”. Hélánrén zài jīntiān de Táinán yídài gàile chéngbǎo, yǐnjìn gānzhè, dàomǐ de zhòngzhí, yě zhāomùle bùshǎo láizì duì'àn de Hànrén yímín lái kāikěn. Suīrán zhè duàn wàilái zhèngquán de tǒngzhì shíjiān bú suàn cháng, què ràng Táiwān zhèngshì jìnrùle hǎiyáng màoyì de dà shídài.",
      m:{
        j:"十七世紀になると、台湾は世界地図に現れ始めます。オランダ人とスペイン人が相前後して南部と北部にやってきて拠点を築き、交易を行いました。この時代は「オランダ・スペイン期（荷西時期）」と呼ばれます。オランダ人は今日の台南あたりに城塞を築き、サトウキビや稲の栽培を持ち込み、対岸から多くの漢人移民を募って開墾させました。この外来政権の統治期間はさほど長くありませんでしたが、台湾を正式に海洋貿易の大時代へと導いたのです。",
        e:"By the seventeenth century, Taiwan began to appear on world maps. The Dutch and the Spanish arrived, in the south and north respectively, setting up outposts and trading—a period known as the Dutch–Spanish era. The Dutch built a fort around present-day Tainan, introduced sugarcane and rice cultivation, and recruited many Han migrants from across the strait to open up farmland. Though this foreign rule didn't last very long, it formally ushered Taiwan into the great age of maritime trade.",
        k:"17세기에 이르러 대만은 세계 지도에 나타나기 시작합니다. 네덜란드인과 스페인인이 잇따라 남부와 북부에 와서 거점을 세우고 무역을 했는데, 이 시기를 '네덜란드·스페인 시기(하서 시기)'라고 부릅니다. 네덜란드인은 오늘날의 타이난 일대에 성채를 짓고 사탕수수와 벼 재배를 들여왔으며, 건너편에서 많은 한족 이민자를 모아 개간하게 했습니다. 이 외래 정권의 통치 기간은 그리 길지 않았지만, 대만을 정식으로 해양 무역의 대시대로 이끌었습니다."
      }
    },
    {
      z:"接著是「明鄭」與「清領」時期。十七世紀中期，鄭成功率軍趕走荷蘭人，在台灣建立政權，帶來更多漢人移民、儒家教育與農耕技術。之後台灣被納入清朝的版圖，長達兩百多年。這段期間，來自福建、廣東的移民一批批渡海而來，帶著閩南語、客家語，也帶著媽祖、關公等信仰。今天台灣許多老廟、老地名和飲食習慣，都是在這個時期慢慢定型的。",
      py:"Jiēzhe shì “Míng-Zhèng” yǔ “Qīnglǐng” shíqī. Shíqī shìjì zhōngqī, Zhèng Chénggōng shuàijūn gǎnzǒu Hélánrén, zài Táiwān jiànlì zhèngquán, dàilái gèng duō Hànrén yímín, Rújiā jiàoyù yǔ nónggēng jìshù. Zhīhòu Táiwān bèi nàrù Qīngcháo de bǎntú, cháng dá liǎngbǎi duō nián. Zhè duàn qíjiān, láizì Fújiàn, Guǎngdōng de yímín yìpī yìpī dùhǎi ér lái, dàizhe Mǐnnányǔ, Kèjiāyǔ, yě dàizhe Māzǔ, Guāngōng děng xìnyǎng. Jīntiān Táiwān xǔduō lǎo miào, lǎo dìmíng hé yǐnshí xíguàn, dōu shì zài zhège shíqī mànman dìngxíng de.",
      m:{
        j:"続いて「明鄭」と「清朝統治（清領）」の時代です。十七世紀半ば、鄭成功が軍を率いてオランダ人を追い払い、台湾に政権を築いて、さらに多くの漢人移民、儒教教育、農耕技術をもたらしました。その後、台湾は清朝の版図に組み込まれ、二百年以上続きます。この間、福建・広東からの移民が次々と海を渡って来て、閩南語や客家語を、そして媽祖や関公などの信仰を持ち込みました。今日の台湾の多くの古い廟、古い地名、食習慣は、この時期に少しずつ形づくられたのです。",
        e:"Next came the Zheng (Ming loyalist) and Qing periods. In the mid-seventeenth century, Zheng Chenggong led troops that drove out the Dutch and established a regime in Taiwan, bringing more Han migrants, Confucian education, and farming techniques. Taiwan was then incorporated into the Qing empire for over two hundred years. During this time, migrants from Fujian and Guangdong crossed the sea in wave after wave, bringing Hokkien and Hakka along with beliefs such as Mazu and Lord Guan. Many of Taiwan's old temples, old place names, and food customs gradually took shape in this era.",
        k:"이어서 '명정(明鄭)'과 '청 통치(清領)' 시기입니다. 17세기 중반, 정성공이 군대를 이끌고 네덜란드인을 몰아낸 뒤 대만에 정권을 세우고 더 많은 한족 이민, 유교 교육, 농경 기술을 들여왔습니다. 이후 대만은 청 제국의 판도에 편입되어 200여 년간 이어집니다. 이 기간에 푸젠, 광둥에서 온 이민자들이 무리를 지어 바다를 건너와 민남어와 객가어를, 그리고 마조와 관공 같은 신앙을 들여왔습니다. 오늘날 대만의 많은 오래된 사당, 옛 지명, 음식 습관은 이 시기에 조금씩 자리 잡았습니다."
      }
    },
    {
      z:"一八九五年，台灣進入「日治時期」，這一段長達五十年，對台灣的影響非常深遠。這段期間，鐵路、公路、港口、自來水、電力、學校、醫院等現代基礎建設一項項建立起來；許多城市的街道規劃、老車站和官廳建築，也都是那時留下的。今天你在台灣看到的日式木造宿舍、紅磚洋樓，還有許多長輩會說的幾句日語，都是這段歷史留下的痕跡。",
      py:"Yī bā jiǔ wǔ nián, Táiwān jìnrù “Rìzhì shíqī”, zhè yí duàn cháng dá wǔshí nián, duì Táiwān de yǐngxiǎng fēicháng shēnyuǎn. Zhè duàn qíjiān, tiělù, gōnglù, gǎngkǒu, zìláishuǐ, diànlì, xuéxiào, yīyuàn děng xiàndài jīchǔ jiànshè yíxiàng yíxiàng jiànlì qǐlái; xǔduō chéngshì de jiēdào guīhuà, lǎo chēzhàn hé guāntīng jiànzhú, yě dōu shì nàshí liúxià de. Jīntiān nǐ zài Táiwān kàndào de Rìshì mùzào sùshè, hóngzhuān yánglóu, háiyǒu xǔduō zhǎngbèi huì shuō de jǐ jù Rìyǔ, dōu shì zhè duàn lìshǐ liúxià de hénjì.",
      m:{
        j:"一八九五年、台湾は「日本統治時代（日治時期）」に入ります。これは五十年に及び、台湾への影響は非常に大きなものでした。この間、鉄道、道路、港湾、水道、電力、学校、病院といった近代的なインフラが次々と整えられ、多くの都市の街路計画、古い駅舎や官庁建築も、この時に残されたものです。今日、台湾で見かける和風の木造宿舎や赤レンガの洋館、そして年配の方が話す数語の日本語も、この歴史が残した痕跡です。",
        e:"In 1895, Taiwan entered the Japanese colonial period, which lasted fifty years and left a deep and lasting mark. During this time, modern infrastructure—railways, roads, harbors, running water, electricity, schools, and hospitals—was built up piece by piece; the street plans of many cities, old train stations, and government buildings also date from then. The Japanese-style wooden dormitories and red-brick Western-style houses you see in Taiwan today, along with the few Japanese phrases many elders still speak, are all traces left by this chapter of history.",
        k:"1895년, 대만은 '일본 통치 시대(일치 시기)'에 들어섭니다. 이 시기는 50년에 이르며 대만에 미친 영향이 매우 깊고 넓었습니다. 이 기간에 철도, 도로, 항만, 수도, 전력, 학교, 병원 같은 근대 기반 시설이 하나하나 세워졌고, 많은 도시의 도로 계획, 오래된 역사(驛舍)와 관청 건물도 이때 남겨진 것입니다. 오늘날 대만에서 볼 수 있는 일본식 목조 관사, 붉은 벽돌 양옥, 그리고 어르신들이 하는 몇 마디 일본어도 모두 이 역사가 남긴 흔적입니다."
      }
    },
    {
      z:"一九四五年之後，台灣進入「戰後」的新階段。大量來自各地的移民再一次湧入，帶來不同的鄉音、口味與文化，也讓台灣社會變得更加多元。經過幾十年的發展，台灣從農業社會一步步走向工業與科技，並在一九八〇、九〇年代逐漸開放，最終走向今天大家熟悉的民主社會。這段「民主化」的過程，是許多台灣人心中重要的共同記憶。",
      py:"Yī jiǔ sì wǔ nián zhīhòu, Táiwān jìnrù “zhànhòu” de xīn jiēduàn. Dàliàng láizì gèdì de yímín zài yícì yǒngrù, dàilái bùtóng de xiāngyīn, kǒuwèi yǔ wénhuà, yě ràng Táiwān shèhuì biànde gèngjiā duōyuán. Jīngguò jǐshí nián de fāzhǎn, Táiwān cóng nóngyè shèhuì yíbùbù zǒuxiàng gōngyè yǔ kējì, bìng zài yī jiǔ bā líng, jiǔ líng niándài zhújiàn kāifàng, zuìzhōng zǒuxiàng jīntiān dàjiā shúxī de mínzhǔ shèhuì. Zhè duàn “mínzhǔhuà” de guòchéng, shì xǔduō Táiwānrén xīnzhōng zhòngyào de gòngtóng jìyì.",
      m:{
        j:"一九四五年以降、台湾は「戦後」という新しい段階に入ります。各地からの大量の移民が再び流れ込み、さまざまな訛りや味、文化をもたらして、台湾社会をいっそう多様なものにしました。数十年の発展を経て、台湾は農業社会から工業・科学技術へと一歩ずつ歩み、一九八〇〜九〇年代に徐々に開放が進み、やがて今日みんながよく知る民主社会へと向かいました。この「民主化」の過程は、多くの台湾人の心にある大切な共通の記憶です。",
        e:"After 1945, Taiwan entered a new postwar phase. A large wave of migrants from many places flowed in again, bringing different accents, tastes, and cultures, and making Taiwanese society even more diverse. Over several decades of development, Taiwan moved step by step from an agricultural society toward industry and technology, gradually opened up in the 1980s and 1990s, and eventually arrived at the democratic society everyone knows today. This process of democratization is an important shared memory in the hearts of many Taiwanese.",
        k:"1945년 이후, 대만은 '전후'라는 새로운 단계에 들어섭니다. 각지에서 온 대규모 이민자가 다시 밀려들어 서로 다른 억양, 입맛, 문화를 가져오며 대만 사회를 한층 다양하게 만들었습니다. 수십 년의 발전을 거쳐 대만은 농업 사회에서 공업과 과학기술로 한 걸음씩 나아갔고, 1980~90년대에 점차 개방되어 마침내 오늘날 모두에게 익숙한 민주 사회로 향했습니다. 이 '민주화' 과정은 많은 대만 사람의 마음속에 자리한 중요한 공통의 기억입니다."
      }
    },
    {
      z:"把這一層層的歷史疊在一起，你會發現台灣真正迷人的地方，就在於它的「多元」。原住民族的祭典、閩南與客家的廟會、日治時代的老屋、戰後各地帶來的家鄉味，全都在這座島上並存。走在街上，一間廟、一棟老房子、一道小吃，背後往往就藏著一段跨越好幾個時代的故事。理解了這些，你看台灣的眼光，也會變得更溫柔、更立體。",
      py:"Bǎ zhè yìcéng yìcéng de lìshǐ dié zài yìqǐ, nǐ huì fāxiàn Táiwān zhēnzhèng mírén de dìfāng, jiù zàiyú tā de “duōyuán”. Yuánzhùmínzú de jìdiǎn, Mǐnnán yǔ Kèjiā de miàohuì, Rìzhì shídài de lǎo wū, zhànhòu gèdì dàilái de jiāxiāng wèi, quán dōu zài zhè zuò dǎo shàng bìngcún. Zǒu zài jiē shàng, yì jiān miào, yí dòng lǎo fángzi, yí dào xiǎochī, bèihòu wǎngwǎng jiù cángzhe yí duàn kuàyuè hǎojǐ ge shídài de gùshì. Lǐjiěle zhèxiē, nǐ kàn Táiwān de yǎnguāng, yě huì biànde gèng wēnróu, gèng lìtǐ.",
      m:{
        j:"こうした幾層もの歴史を重ね合わせると、台湾の本当に魅力的なところは、その「多様さ」にあると気づきます。原住民族の祭祀、閩南と客家の廟会、日本統治時代の古民家、戦後に各地からもたらされた故郷の味——それらすべてが、この島の上で共存しています。街を歩けば、一つの廟、一棟の古い家、一皿の軽食の背後に、いくつもの時代をまたぐ物語が隠れていることがよくあります。それを理解すると、台湾を見るまなざしも、より優しく、より立体的になるでしょう。",
        e:"Stack these layers of history together and you'll find that what truly makes Taiwan enchanting is its diversity. Indigenous ceremonies, Hokkien and Hakka temple fairs, old houses from the Japanese era, and hometown flavors brought from all over after the war all coexist on this island. Walk down a street and behind a single temple, an old house, or a small dish there often hides a story spanning several eras. Once you understand this, your way of seeing Taiwan becomes gentler and more three-dimensional.",
        k:"이렇게 겹겹의 역사를 포개어 보면, 대만이 정말로 매력적인 지점은 바로 그 '다양함'에 있음을 알게 됩니다. 원주민족의 제의, 민남과 객가의 묘회(廟會), 일치 시대의 옛집, 전후 각지에서 가져온 고향의 맛—이 모두가 이 섬 위에서 공존합니다. 거리를 걷다 보면 사당 하나, 오래된 집 한 채, 간식 한 접시 뒤에 여러 시대를 넘나드는 이야기가 숨어 있는 경우가 많습니다. 이를 이해하면 대만을 바라보는 시선도 더 다정하고 입체적으로 변합니다."
      }
    }
  ],
  vocab:[
    { w:"原住民族", zy:"ㄩㄢˊ ㄓㄨˋ ㄇㄧㄣˊ ㄗㄨˊ", py:"yuánzhùmínzú", m:{ j:"原住民族（先住民）", e:"Indigenous peoples", k:"원주민족" } },
    { w:"南島語系", zy:"ㄋㄢˊ ㄉㄠˇ ㄩˇ ㄒㄧˋ", py:"Nándǎo yǔxì", m:{ j:"オーストロネシア（南島）語族", e:"Austronesian language family", k:"오스트로네시아(남도)어족" } },
    { w:"荷西時期", zy:"ㄏㄜˊ ㄒㄧ ㄕˊ ㄑㄧ", py:"Hé-Xī shíqī", m:{ j:"オランダ・スペイン統治期", e:"the Dutch–Spanish period", k:"네덜란드·스페인 시기" } },
    { w:"貿易", zy:"ㄇㄠˋ ㄧˋ", py:"màoyì", m:{ j:"貿易・交易", e:"trade", k:"무역" } },
    { w:"移民", zy:"ㄧˊ ㄇㄧㄣˊ", py:"yímín", m:{ j:"移民", e:"immigrant, migration", k:"이민(자)" } },
    { w:"開墾", zy:"ㄎㄞ ㄎㄣˇ", py:"kāikěn", m:{ j:"開墾・土地を切り開く", e:"to reclaim/cultivate land", k:"개간" } },
    { w:"閩南語", zy:"ㄇㄧㄣˇ ㄋㄢˊ ㄩˇ", py:"Mǐnnányǔ", m:{ j:"閩南語（台湾語のもとになった言語）", e:"Hokkien (Southern Min)", k:"민남어" } },
    { w:"客家語", zy:"ㄎㄜˋ ㄐㄧㄚ ㄩˇ", py:"Kèjiāyǔ", m:{ j:"客家語", e:"Hakka language", k:"객가어" } },
    { w:"日治時期", zy:"ㄖˋ ㄓˋ ㄕˊ ㄑㄧ", py:"Rìzhì shíqī", m:{ j:"日本統治時代", e:"Japanese colonial period", k:"일본 통치 시대" } },
    { w:"基礎建設", zy:"ㄐㄧ ㄔㄨˇ ㄐㄧㄢˋ ㄕㄜˋ", py:"jīchǔ jiànshè", m:{ j:"インフラ・基盤整備", e:"infrastructure", k:"기반 시설" } },
    { w:"民主化", zy:"ㄇㄧㄣˊ ㄓㄨˇ ㄏㄨㄚˋ", py:"mínzhǔhuà", m:{ j:"民主化", e:"democratization", k:"민주화" } },
    { w:"多元", zy:"ㄉㄨㄛ ㄩㄢˊ", py:"duōyuán", m:{ j:"多元的・多様", e:"diverse, pluralistic", k:"다원·다양" } }
  ],
  note:{
    j:"台湾の歴史を語るとき、『どの立場から見るか』で解釈が変わりやすいテーマも多いため、この記事ではできるだけ中立に、『多くの文化が積み重なった』という視点で紹介しています。ちなみに、台湾には日本統治時代に建てられた建物が今も数多く残り、修復されてカフェや書店、資料館として使われている例が増えています。原住民族の言語や文化を守る動きも近年活発で、学校教育や公共放送で各族の言葉を学べる番組も作られています。歴史の『層』が、今も生き続けているのです。",
    e:"Because interpretations of Taiwan's history can shift depending on one's standpoint, this article keeps to a neutral view: that of many cultures layered upon one another. Notably, many buildings from the Japanese colonial era still stand in Taiwan, and more and more of them have been restored and turned into cafés, bookstores, and heritage museums. Efforts to preserve Indigenous languages and cultures have also grown in recent years, with school programs and public broadcasts that let people learn each group's language. The 'layers' of history are still very much alive.",
    k:"대만의 역사는 '어느 입장에서 보느냐'에 따라 해석이 달라지기 쉬운 주제가 많기에, 이 글은 최대한 중립적으로 '여러 문화가 겹겹이 쌓였다'는 관점에서 소개합니다. 참고로 대만에는 일본 통치 시대에 지어진 건물이 지금도 많이 남아 있고, 복원되어 카페나 서점, 자료관으로 쓰이는 사례가 늘고 있습니다. 원주민족의 언어와 문화를 지키려는 움직임도 최근 활발해, 학교 교육과 공영방송에서 각 부족의 언어를 배울 수 있는 프로그램도 만들어집니다. 역사의 '층'이 지금도 살아 숨 쉬고 있는 것입니다."
  }
},
{
  id:"old-streets-and-heritage",
  cat:{ j:"歴史・人物", e:"History & People", k:"역사·인물" },
  zhTitle:"老街與古蹟：過去如何活在今天",
  title:{ j:"老街と古跡——過去が今も生きる場所", e:"Old Streets and Heritage: How the Past Lives on Today", k:"옛 거리와 고적: 과거가 오늘에 살아 있는 곳" },
  intro:{
    j:"赤レンガの騎楼（アーケード）をくぐり、木の看板が並ぶ路地を歩くと、まるで時間が少しゆっくり流れているように感じます。台湾の老街や古跡は、ただの観光地ではありません。かつての商いや暮らし、信仰の記憶が、今も店先やお茶の香りとともに息づいているのです。代表的な場所をいくつか、一緒にめぐってみましょう。",
    e:"Duck under a red-brick arcade and stroll a lane lined with wooden signboards, and time seems to slow just a little. Taiwan's old streets and heritage sites aren't mere tourist spots. The memory of old trades, daily life, and faith still lives on in the shopfronts and the scent of tea. Let's wander through a few of the most iconic places together.",
    k:"붉은 벽돌 기루(아케이드)를 지나 나무 간판이 늘어선 골목을 걸으면, 마치 시간이 조금 느리게 흐르는 듯합니다. 대만의 옛 거리와 고적은 그저 관광지가 아닙니다. 지난날의 장사와 삶, 신앙의 기억이 지금도 가게 앞과 차 향기와 함께 숨 쉬고 있습니다. 대표적인 곳 몇 군데를 함께 거닐어 봅시다."
  },
  paras:[
    {
      z:"說到台北的老街，很多人第一個想到的是「大稻埕」。這裡從十九世紀就是重要的商業中心，靠著淡水河的碼頭，做起茶葉、南北貨和布料的生意。走進「迪化街」，兩旁一整排的老屋，有的是閩南式的紅磚店面，有的是帶著巴洛克花紋的洋樓。今天這裡除了老字號的中藥行、乾貨店，也進駐了不少文創小店和咖啡館，新舊交錯，特別有味道。",
      py:"Shuōdào Táiběi de lǎojiē, hěnduō rén dì yī ge xiǎngdào de shì “Dàdàochéng”. Zhèlǐ cóng shíjiǔ shìjì jiùshì zhòngyào de shāngyè zhōngxīn, kàozhe Dànshuǐ Hé de mǎtóu, zuòqǐ cháyè, nánběihuò hé bùliào de shēngyì. Zǒujìn “Díhuà Jiē”, liǎngpáng yìzhěngpái de lǎo wū, yǒude shì Mǐnnán shì de hóngzhuān diànmiàn, yǒude shì dàizhe Bāluòkè huāwén de yánglóu. Jīntiān zhèlǐ chúle lǎozìhào de zhōngyào háng, gānhuò diàn, yě jìnzhùle bùshǎo wénchuàng xiǎodiàn hé kāfēiguǎn, xīnjiù jiāocuò, tèbié yǒu wèidào.",
      m:{
        j:"台北の老街といえば、多くの人がまず思い浮かべるのが「大稻埕（ダーダオチェン）」です。ここは十九世紀から重要な商業の中心地で、淡水河の埠頭を頼りに、茶葉や乾物、布地の商いで栄えました。「迪化街」に入ると、両側にずらりと並ぶ古い店構えは、閩南式の赤レンガの店もあれば、バロック風の装飾をまとった洋館もあります。今日ここには、老舗の漢方薬屋や乾物屋のほか、多くのクリエイティブな小さな店やカフェも入り、新旧が入り交じって独特の趣があります。",
        e:"When it comes to old streets in Taipei, the first one many people think of is Dadaocheng. This has been an important commercial hub since the nineteenth century, thriving on trade in tea, dry goods, and fabric thanks to the wharves along the Tamsui River. Step into Dihua Street and the rows of old buildings on both sides include Hokkien-style red-brick shopfronts and Western-style houses decorated with Baroque flourishes. Today, alongside long-established herbal-medicine and dry-goods shops, many creative boutiques and cafés have moved in—old and new interlacing with a special charm.",
        k:"타이베이의 옛 거리 하면 많은 사람이 가장 먼저 떠올리는 곳이 '다다오청'입니다. 이곳은 19세기부터 중요한 상업 중심지로, 단수이강 부두에 기대어 찻잎, 건어물·잡화, 옷감 장사로 번성했습니다. '디화제'에 들어서면 양옆으로 죽 늘어선 옛 건물 가운데 민남식 붉은 벽돌 점포도 있고, 바로크풍 장식을 두른 양옥도 있습니다. 오늘날 이곳에는 오래된 한약방과 건어물 가게 외에도 문화창작 소품 가게와 카페가 많이 들어와, 신구가 어우러진 특별한 정취가 있습니다."
      }
    },
    {
      z:"如果想看更完整的清代街屋，就要往中部的「鹿港」走。鹿港曾經是台灣數一數二的大港口，商船往來、香火鼎盛，留下了許多古廟、老宅和窄窄的巷子。這裡最有名的就是「摸乳巷」——一條窄到兩個人要側身才能通過的小巷，還有雕工精細的龍山寺、天后宮。走在鹿港，你能真切感受到一座老城市當年的繁華，以及它如何被小心地保存下來。",
      py:"Rúguǒ xiǎng kàn gèng wánzhěng de Qīngdài jiēwū, jiù yào wǎng zhōngbù de “Lùgǎng” zǒu. Lùgǎng céngjīng shì Táiwān shǔyīshǔ'èr de dà gǎngkǒu, shāngchuán wǎnglái, xiānghuǒ dǐngshèng, liúxiàle xǔduō gǔmiào, lǎozhái hé zhǎizhǎi de xiàngzi. Zhèlǐ zuì yǒumíng de jiùshì “Mōrǔ Xiàng”—yìtiáo zhǎi dào liǎng ge rén yào cèshēn cáinéng tōngguò de xiǎoxiàng, háiyǒu diāogōng jīngxì de Lóngshān Sì, Tiānhòu Gōng. Zǒu zài Lùgǎng, nǐ néng zhēnqiè gǎnshòudào yí zuò lǎo chéngshì dāngnián de fánhuá, yǐjí tā rúhé bèi xiǎoxīn de bǎocún xiàlái.",
      m:{
        j:"より完全な清代の街屋を見たいなら、中部の「鹿港（ルーガン）」へ足を運ぶとよいでしょう。鹿港はかつて台湾でも指折りの大きな港で、商船が行き交い、廟の香煙が絶えず、多くの古い廟、旧家、細い路地を残しました。ここで最も有名なのが「摸乳巷（モールーシャン）」——二人がすれ違うには体を横にしないと通れないほど狭い路地です。そのほか、彫刻の精緻な龍山寺や天后宮もあります。鹿港を歩けば、古い都市のかつての繁栄と、それがいかに大切に保存されてきたかを、しみじみと感じられます。",
        e:"If you want to see more intact Qing-dynasty street houses, head to Lukang in central Taiwan. Lukang was once one of Taiwan's greatest ports, with merchant ships coming and going and temples thick with incense, leaving behind many old temples, historic homes, and narrow lanes. Its most famous spot is 'Breast-Touching Lane'—an alley so narrow two people must turn sideways to pass—along with the finely carved Longshan Temple and Tianhou Temple. Walking through Lukang, you can vividly feel the former prosperity of an old city and how carefully it has been preserved.",
        k:"더 온전한 청대 거리 가옥을 보고 싶다면 중부의 '루강'으로 가야 합니다. 루강은 한때 대만에서 손꼽히는 큰 항구로, 상선이 오가고 사당의 향불이 끊이지 않아 많은 옛 사당, 고택, 좁은 골목을 남겼습니다. 이곳에서 가장 유명한 곳은 '모유항(摸乳巷)'—두 사람이 지나가려면 몸을 옆으로 틀어야 할 만큼 좁은 골목입니다. 그 밖에 조각이 정교한 룽산사와 천후궁도 있습니다. 루강을 걸으면 옛 도시의 그 시절 번영과, 그것이 얼마나 세심히 보존되어 왔는지를 생생히 느낄 수 있습니다."
      }
    },
    {
      z:"北部山區的「九份」，則是另一種截然不同的風情。九份原本是採金礦的山城，隨著礦業沒落一度沉寂，後來因為電影和旅遊重新熱鬧起來。沿著石階往上走，兩旁是層層疊疊、依山而建的老房子，紅燈籠一路掛到山頂。傍晚時分，海霧從山下漫上來，燈火在霧裡透著暖光，那種山海交界的氣氛，讓九份成了許多人心中最難忘的台灣風景。",
      py:"Běibù shānqū de “Jiǔfèn”, zé shì lìng yì zhǒng jiérán bùtóng de fēngqíng. Jiǔfèn yuánběn shì cǎi jīnkuàng de shānchéng, suízhe kuàngyè mòluò yídù chénjì, hòulái yīnwèi diànyǐng hé lǚyóu chóngxīn rènào qǐlái. Yánzhe shíjiē wǎngshàng zǒu, liǎngpáng shì céngcéng diédié, yīshān ér jiàn de lǎo fángzi, hóng dēnglóng yílù guà dào shāndǐng. Bàngwǎn shífēn, hǎiwù cóng shānxià màn shànglái, dēnghuǒ zài wù lǐ tòuzhe nuǎnguāng, nà zhǒng shānhǎi jiāojiè de qìfēn, ràng Jiǔfèn chéngle xǔduō rén xīnzhōng zuì nánwàng de Táiwān fēngjǐng.",
      m:{
        j:"北部の山あいにある「九份（ジォウフェン）」は、まったく違った趣です。九份はもともと金鉱を採掘する山の町で、鉱業の衰退とともに一時は静まり返りましたが、後に映画や観光をきっかけに再びにぎわいを取り戻しました。石段を上へ登っていくと、両側には山肌に沿って幾重にも積み重なる古い家々があり、赤い提灯が山頂まで連なります。夕暮れどき、海霧が麓から立ちのぼり、灯りが霧の中で暖かく透けて見える——その山と海が出会う雰囲気が、九份を多くの人の心に残る台湾の風景にしています。",
        e:"Jiufen, in the mountains of the north, has a completely different feel. Originally a gold-mining mountain town, Jiufen fell quiet for a time as mining declined, then came alive again thanks to film and tourism. Climb the stone steps and on both sides are old houses stacked layer upon layer against the hillside, with red lanterns strung all the way to the top. At dusk, sea mist drifts up from below and the lights glow warmly through the fog—that atmosphere where mountain meets sea has made Jiufen one of the most unforgettable Taiwanese scenes in many people's hearts.",
        k:"북부 산간의 '주펀'은 전혀 다른 정취를 지녔습니다. 주펀은 본래 금광을 캐던 산속 마을로, 광업이 쇠퇴하며 한동안 조용해졌다가 훗날 영화와 관광을 계기로 다시 붐볐습니다. 돌계단을 따라 위로 오르면 양옆으로 산비탈을 따라 겹겹이 쌓인 옛집들이 있고, 붉은 등롱이 산꼭대기까지 이어집니다. 해질 무렵 바다 안개가 산 아래에서 피어오르고 등불이 안개 속에서 따뜻하게 비쳐 나오는—그 산과 바다가 맞닿는 분위기가 주펀을 많은 이의 마음속에 가장 잊지 못할 대만 풍경으로 만들었습니다."
      }
    },
    {
      z:"除了成片的老街，台灣各地也散布著許多單獨的「古蹟」和老建築。日治時代留下的火車站、官廳、學校、宿舍，很多都是磚木結構，帶著簡潔優雅的線條。像是紅磚砌成的官署、木造的日式房舍，經過整修之後，常常變身為博物館、圖書館或藝文空間。這些老房子沒有被拆掉，而是被重新利用，讓歷史不只是留在課本裡，而是真的能走進去、坐下來慢慢感受。",
      py:"Chúle chéngpiàn de lǎojiē, Táiwān gèdì yě sànbùzhe xǔduō dāndú de “gǔjī” hé lǎo jiànzhú. Rìzhì shídài liúxià de huǒchēzhàn, guāntīng, xuéxiào, sùshè, hěnduō dōu shì zhuānmù jiégòu, dàizhe jiǎnjié yōuyǎ de xiàntiáo. Xiàngshì hóngzhuān qìchéng de guānshǔ, mùzào de Rìshì fángshè, jīngguò zhěngxiū zhīhòu, chángcháng biànshēn wéi bówùguǎn, túshūguǎn huò yìwén kōngjiān. Zhèxiē lǎo fángzi méiyǒu bèi chāidiào, érshì bèi chóngxīn lìyòng, ràng lìshǐ bùzhǐshì liú zài kèběn lǐ, érshì zhēnde néng zǒujìnqù, zuòxiàlái mànman gǎnshòu.",
      m:{
        j:"ひと続きの老街のほかにも、台湾の各地には単独の「古跡」や古い建物が数多く点在しています。日本統治時代に残された駅舎、官庁、学校、宿舎の多くは煉瓦と木の構造で、簡潔で優雅な線を帯びています。赤レンガ造りの官署や、木造の和風家屋は、修復を経てしばしば博物館、図書館、アート空間へと生まれ変わります。こうした古い建物は取り壊されずに再利用され、歴史が教科書の中にとどまるだけでなく、実際に足を踏み入れ、腰を下ろしてゆっくり感じられるものになっているのです。",
        e:"Beyond whole clusters of old streets, individual heritage sites and old buildings are scattered across Taiwan too. Many train stations, government offices, schools, and dormitories left from the Japanese era are of brick-and-wood construction, with clean, elegant lines. Red-brick official buildings and wooden Japanese-style houses, after restoration, are often reborn as museums, libraries, or arts spaces. These old buildings weren't torn down but repurposed, so that history doesn't just stay in textbooks—you can actually walk in, sit down, and feel it slowly.",
        k:"이어진 옛 거리 외에도 대만 각지에는 단독의 '고적'과 오래된 건물이 곳곳에 흩어져 있습니다. 일치 시대에 남겨진 역사(驛舍), 관청, 학교, 관사 상당수는 벽돌과 목재 구조로, 간결하고 우아한 선을 지녔습니다. 붉은 벽돌로 지은 관서나 목조 일본식 가옥은 보수를 거쳐 박물관, 도서관, 예술 공간으로 다시 태어나는 경우가 많습니다. 이런 옛 건물은 헐리지 않고 재활용되어, 역사가 교과서 속에만 머무는 것이 아니라 실제로 들어가 앉아 천천히 느낄 수 있는 것이 되었습니다."
      }
    },
    {
      z:"為什麼台灣人願意花心思保存這些老東西？因為對很多人來說，老街和古蹟不只是磚瓦，而是一種「根」。阿公阿嬤在這裡做過生意、拜過拜、成長過，這些空間裝著一代又一代的記憶。近年來，「文化資產保存」的觀念越來越受到重視，居民、政府和年輕的創業者一起想辦法，讓老房子在不失去原本味道的前提下，也能符合現代生活的需要。",
      py:"Wèishénme Táiwānrén yuànyì huā xīnsi bǎocún zhèxiē lǎo dōngxi? Yīnwèi duì hěnduō rén láishuō, lǎojiē hé gǔjī bùzhǐshì zhuānwǎ, érshì yì zhǒng “gēn”. Āgōng āmà zài zhèlǐ zuòguò shēngyì, bàiguò bài, chéngzhǎngguò, zhèxiē kōngjiān zhuāngzhe yídài yòu yídài de jìyì. Jìnnián lái, “wénhuà zīchǎn bǎocún” de guānniàn yuèláiyuè shòudào zhòngshì, jūmín, zhèngfǔ hé niánqīng de chuàngyèzhě yìqǐ xiǎng bànfǎ, ràng lǎo fángzi zài bù shīqù yuánběn wèidào de qiántí xià, yě néng fúhé xiàndài shēnghuó de xūyào.",
      m:{
        j:"なぜ台湾の人は、こうした古いものを手間をかけて残そうとするのでしょう。多くの人にとって、老街や古跡はただの煉瓦や瓦ではなく、一種の「根」だからです。おじいさんおばあさんがここで商いをし、参拝し、育った——これらの空間には、世代から世代へと受け継がれる記憶が詰まっています。近年、「文化資産の保存」という考え方がますます重視され、住民、政府、そして若い起業家が一緒に知恵を絞り、古い家がもとの味わいを失わないまま、現代の暮らしのニーズにも合うよう工夫しています。",
        e:"Why are Taiwanese willing to put in the effort to preserve these old things? Because for many people, old streets and heritage sites aren't just bricks and tiles but a kind of 'root.' Grandparents did business here, prayed here, grew up here—these spaces hold the memories of generation after generation. In recent years, the idea of 'heritage preservation' has drawn ever more attention, with residents, government, and young entrepreneurs working together to make old buildings meet the needs of modern life without losing their original character.",
        k:"왜 대만 사람들은 이런 옛것을 정성 들여 보존하려 할까요? 많은 이에게 옛 거리와 고적은 그저 벽돌과 기와가 아니라 일종의 '뿌리'이기 때문입니다. 할아버지 할머니가 이곳에서 장사하고, 참배하고, 자랐던—이 공간들에는 세대에서 세대로 이어지는 기억이 담겨 있습니다. 최근 '문화재 보존'이라는 개념이 갈수록 중시되어, 주민과 정부, 젊은 창업자가 함께 머리를 맞대 옛집이 본래의 정취를 잃지 않으면서도 현대 생활의 필요에 맞도록 궁리하고 있습니다."
      }
    },
    {
      z:"下次你來台灣，不妨挑一條老街，放慢腳步走一走。買一包古早味的糕餅，喝一杯老茶行泡的茶，抬頭看看門楣上的雕花和斑駁的招牌。你會發現，這些地方之所以動人，不是因為它們「很舊」，而是因為它們「還活著」——店還在開，人還在住，故事還在繼續。過去，就用這種方式，靜靜地活在今天的台灣裡。",
      py:"Xiàcì nǐ lái Táiwān, bùfáng tiāo yìtiáo lǎojiē, fàngmàn jiǎobù zǒu yì zǒu. Mǎi yìbāo gǔzǎowèi de gāobǐng, hē yìbēi lǎo cháháng pào de chá, táitóu kànkan ménméi shàng de diāohuā hé bānbó de zhāopái. Nǐ huì fāxiàn, zhèxiē dìfāng zhīsuǒyǐ dòngrén, búshì yīnwèi tāmen “hěn jiù”, érshì yīnwèi tāmen “hái huózhe”—diàn hái zài kāi, rén hái zài zhù, gùshì hái zài jìxù. Guòqù, jiù yòng zhè zhǒng fāngshì, jìngjìng de huó zài jīntiān de Táiwān lǐ.",
      m:{
        j:"次に台湾へ来たら、ぜひ一つの老街を選んで、歩調をゆるめて歩いてみてください。昔ながらの味の焼き菓子を一袋買い、老舗の茶屋が淹れたお茶を一杯飲み、顔を上げて門の上の彫刻や色あせた看板を眺める。気づくはずです——こうした場所が人の心を打つのは、「古いから」ではなく、「まだ生きているから」だと。店はまだ開き、人はまだ住み、物語はまだ続いている。過去は、こうしてそっと、今日の台湾の中で生き続けているのです。",
        e:"Next time you come to Taiwan, why not pick an old street and walk it slowly? Buy a pack of old-fashioned pastries, sip tea brewed by a long-established tea shop, and look up at the carvings above the doorways and the weathered signboards. You'll realize these places move us not because they are 'old,' but because they are 'still alive'—shops still open, people still live here, and the stories go on. The past, in just this way, lives quietly on in today's Taiwan.",
        k:"다음에 대만에 오거든 옛 거리 하나를 골라 걸음을 늦춰 걸어 보세요. 옛맛 나는 과자 한 봉지를 사고, 오래된 찻집이 우린 차 한 잔을 마시고, 고개를 들어 문 위의 조각과 빛바랜 간판을 바라보세요. 알게 될 겁니다—이런 곳이 마음을 울리는 것은 '오래되어서'가 아니라 '아직 살아 있어서'라는 것을. 가게는 여전히 열려 있고, 사람은 여전히 살고 있으며, 이야기는 여전히 이어집니다. 과거는 바로 이런 방식으로 오늘의 대만 속에 조용히 살아 있습니다."
      }
    }
  ],
  vocab:[
    { w:"老街", zy:"ㄌㄠˇ ㄐㄧㄝ", py:"lǎojiē", m:{ j:"古い商店街・オールドストリート", e:"old street", k:"옛 거리" } },
    { w:"古蹟", zy:"ㄍㄨˇ ㄐㄧ", py:"gǔjī", m:{ j:"古跡・史跡", e:"historic site, heritage site", k:"고적·유적" } },
    { w:"碼頭", zy:"ㄇㄚˇ ㄊㄡˊ", py:"mǎtóu", m:{ j:"埠頭・波止場", e:"wharf, dock", k:"부두·선착장" } },
    { w:"紅磚", zy:"ㄏㄨㄥˊ ㄓㄨㄢ", py:"hóngzhuān", m:{ j:"赤レンガ", e:"red brick", k:"붉은 벽돌" } },
    { w:"洋樓", zy:"ㄧㄤˊ ㄌㄡˊ", py:"yánglóu", m:{ j:"洋館・西洋風の建物", e:"Western-style building", k:"양옥·서양식 건물" } },
    { w:"文創", zy:"ㄨㄣˊ ㄔㄨㄤˋ", py:"wénchuàng", m:{ j:"文化クリエイティブ（文化創意の略）", e:"cultural-creative (industry)", k:"문화창작" } },
    { w:"礦業", zy:"ㄎㄨㄤˋ ㄧㄝˋ", py:"kuàngyè", m:{ j:"鉱業", e:"mining industry", k:"광업" } },
    { w:"燈籠", zy:"ㄉㄥ ㄌㄨㄥˊ", py:"dēnglóng", m:{ j:"提灯（ちょうちん）", e:"lantern", k:"등롱·초롱" } },
    { w:"整修", zy:"ㄓㄥˇ ㄒㄧㄡ", py:"zhěngxiū", m:{ j:"修復・改修", e:"to restore, renovate", k:"보수·수리" } },
    { w:"文化資產", zy:"ㄨㄣˊ ㄏㄨㄚˋ ㄗ ㄔㄢˇ", py:"wénhuà zīchǎn", m:{ j:"文化資産・文化財", e:"cultural heritage/property", k:"문화재·문화 자산" } },
    { w:"古早味", zy:"ㄍㄨˇ ㄗㄠˇ ㄨㄟˋ", py:"gǔzǎowèi", m:{ j:"昔ながらの味・懐かしい味", e:"old-fashioned/nostalgic flavor", k:"옛맛·정겨운 맛" } },
    { w:"招牌", zy:"ㄓㄠ ㄆㄞˊ", py:"zhāopái", m:{ j:"看板・店の看板", e:"shop sign, signboard", k:"간판" } }
  ],
  note:{
    j:"大稻埕の迪化街は、旧正月前になると「年貨大街」として大にぎわいになり、ナッツやドライフルーツ、乾物などお正月用の品を買い求める人でごった返します。また九份は、日本のアニメ映画の世界観を思わせるとして海外の旅行者に人気ですが、制作側は『直接のモデルではない』としています。とはいえ、赤い提灯と石段、山と海が織りなすあの風景は、一度見ると忘れられません。老街を訪ねるなら、混み合う週末より、平日の朝や夕方がおすすめです。",
    e:"Before Lunar New Year, Dihua Street in Dadaocheng turns into a bustling 'New Year goods street,' packed with people buying nuts, dried fruit, and dry goods for the holiday. Jiufen, meanwhile, is popular with overseas visitors for evoking the world of a famous Japanese animated film, though the filmmakers have said it wasn't a direct model. Either way, the scene of red lanterns, stone steps, and mountains meeting the sea is unforgettable once you've seen it. If you visit an old street, weekday mornings or evenings are better than the crowded weekends.",
    k:"다다오청의 디화제는 설 전이 되면 '설 대목 거리(年貨大街)'로 크게 붐벼, 견과류와 말린 과일, 건어물 등 명절 용품을 사려는 사람들로 북적입니다. 한편 주펀은 일본의 한 유명 애니메이션 영화의 세계관을 떠올리게 한다며 해외 여행자에게 인기지만, 제작진은 '직접적인 모델은 아니다'라고 밝혔습니다. 그래도 붉은 등롱과 돌계단, 산과 바다가 어우러진 그 풍경은 한 번 보면 잊기 어렵습니다. 옛 거리를 찾는다면 붐비는 주말보다 평일 아침이나 저녁이 좋습니다."
  }
},
{
  id:"pride-of-taiwan",
  cat:{ j:"歴史・人物", e:"History & People", k:"역사·인물" },
  zhTitle:"台灣之光：在世界舞台上發光的台灣人",
  title:{ j:"台湾の光——世界の舞台で輝く台湾の人々", e:"The Pride of Taiwan: Taiwanese Who Shine on the World Stage", k:"대만의 빛: 세계 무대에서 빛나는 대만 사람들" },
  intro:{
    j:"面積はさほど大きくなく、人口も多いとは言えない島。それでも台湾からは、映画、スポーツ、料理、そして半導体まで、世界の頂点で活躍する人や企業がいくつも生まれてきました。台湾ではこうした人たちを、親しみと誇りを込めて「台灣之光（台湾の光）」と呼びます。今日はその何人か、そしていくつかの分野を紹介しましょう。",
    e:"An island not very large, with a population that isn't huge. And yet Taiwan has produced people and companies who stand at the very top of the world—in film, sports, cuisine, and even semiconductors. Taiwanese affectionately and proudly call such people 'the pride of Taiwan.' Today, let's meet a few of them and look at a few of these fields.",
    k:"면적이 그리 크지 않고 인구도 많다고 할 수 없는 섬. 그럼에도 대만에서는 영화, 스포츠, 요리, 나아가 반도체까지 세계 정상에서 활약하는 사람과 기업이 여럿 나왔습니다. 대만에서는 이런 이들을 친근함과 자부심을 담아 '대만의 빛(台灣之光)'이라 부릅니다. 오늘은 그중 몇 사람과 몇 분야를 소개해 봅니다."
  },
  paras:[
    {
      z:"說到「台灣之光」，很多人第一個想到的是導演李安。他出生於台灣，後來到美國學電影，一路從默默無聞拍到享譽國際。他的作品題材非常廣，從華人家庭的故事，到西方的文學名著都有，還曾經兩度拿下奧斯卡最佳導演獎。李安常說，他花了很多年才慢慢找到自己說故事的方式，這份耐心和堅持，也鼓勵了許多想走創作這條路的年輕人。",
      py:"Shuōdào “Táiwān zhī guāng”, hěnduō rén dì yī ge xiǎngdào de shì dǎoyǎn Lǐ Ān. Tā chūshēng yú Táiwān, hòulái dào Měiguó xué diànyǐng, yílù cóng mòmò wúwén pāidào xiǎngyù guójì. Tā de zuòpǐn tícái fēicháng guǎng, cóng Huárén jiātíng de gùshì, dào Xīfāng de wénxué míngzhù dōu yǒu, hái céngjīng liǎngdù náxià Àosīkǎ zuìjiā dǎoyǎn jiǎng. Lǐ Ān cháng shuō, tā huāle hěnduō nián cái mànman zhǎodào zìjǐ shuō gùshì de fāngshì, zhè fèn nàixīn hé jiānchí, yě gǔlìle xǔduō xiǎng zǒu chuàngzuò zhè tiáo lù de niánqīngrén.",
      m:{
        j:"「台湾の光」といえば、多くの人がまず思い浮かべるのが映画監督のアン・リー（李安）です。台湾に生まれ、のちにアメリカで映画を学び、無名の時代から国際的に高く評価される存在へと歩みました。彼の作品はテーマがとても幅広く、華人の家族の物語から西洋の文学の名作まで手がけ、アカデミー監督賞を二度受賞したこともあります。アン・リーは、自分の物語の語り方を少しずつ見つけるのに何年もかかった、とよく語ります。その忍耐と粘り強さは、創作の道を歩みたい多くの若者を勇気づけました。",
        e:"When it comes to 'the pride of Taiwan,' the first name many people think of is the film director Ang Lee. Born in Taiwan, he later studied film in the United States and went from obscurity to international acclaim. His films span a very wide range of subjects, from stories of Chinese families to Western literary classics, and he has won the Academy Award for Best Director twice. Ang Lee often says it took him many years to slowly find his own way of telling stories, and that patience and persistence have encouraged many young people who want to pursue a creative path.",
        k:"'대만의 빛' 하면 많은 사람이 가장 먼저 떠올리는 이가 영화감독 이안(李安)입니다. 대만에서 태어나 훗날 미국에서 영화를 공부했고, 무명 시절부터 국제적으로 높이 평가받는 존재로 걸어왔습니다. 그의 작품은 소재가 매우 폭넓어, 화인 가정의 이야기부터 서양 문학 명작까지 다루었으며, 아카데미 감독상을 두 차례 받은 적도 있습니다. 이안은 자신만의 이야기 방식을 조금씩 찾는 데 오랜 세월이 걸렸다고 자주 말합니다. 그 인내와 끈기는 창작의 길을 걷고 싶어 하는 많은 젊은이에게 용기를 주었습니다."
      }
    },
    {
      z:"如果說李安代表的是文化與藝術，那麼麵包師傅吳寶春，走的則是另一條動人的路。他從小家境清苦，年輕時到麵包店當學徒，靠著不斷鑽研台灣在地的食材，做出充滿本土風味的麵包。後來他在世界級的麵包大賽中拿下冠軍，讓「台灣味」的麵包登上國際舞台。他的故事告訴大家：不一定要念很多書，只要把一件事做到極致，一樣可以站上世界的頂端。",
      py:"Rúguǒ shuō Lǐ Ān dàibiǎo de shì wénhuà yǔ yìshù, nàme miànbāo shīfù Wú Bǎochūn, zǒu de zé shì lìng yìtiáo dòngrén de lù. Tā cóngxiǎo jiājìng qīngkǔ, niánqīng shí dào miànbāodiàn dāng xuétú, kàozhe búduàn zuānyán Táiwān zàidì de shícái, zuòchū chōngmǎn běntǔ fēngwèi de miànbāo. Hòulái tā zài shìjiè jí de miànbāo dàsài zhōng náxià guànjūn, ràng “Táiwān wèi” de miànbāo dēngshàng guójì wǔtái. Tā de gùshì gàosù dàjiā: bù yídìng yào niàn hěnduō shū, zhǐyào bǎ yí jiàn shì zuòdào jízhì, yíyàng kěyǐ zhànshàng shìjiè de dǐngduān.",
      m:{
        j:"アン・リーが文化と芸術を象徴するなら、パン職人の呉寶春（ウー・バオチュン）が歩んだのは、また別の心を打つ道です。幼い頃から家は貧しく、若くしてパン屋の見習いとなり、台湾の地元の食材をひたすら研究して、郷土の風味あふれるパンを作り上げました。のちに世界レベルのパンコンテストで優勝し、「台湾の味」のパンを国際舞台へと押し上げます。彼の物語は教えてくれます——たくさん勉強しなくても、一つのことを極めれば、同じように世界の頂点に立てるのだ、と。",
        e:"If Ang Lee stands for culture and art, then the baker Wu Pao-chun walked another moving path. Growing up poor, he became an apprentice at a bakery as a young man and, by relentlessly studying Taiwan's local ingredients, created bread bursting with homegrown flavor. He later won a world-class baking competition, lifting bread with 'the taste of Taiwan' onto the international stage. His story tells everyone: you don't necessarily need a lot of schooling—if you take one thing to its extreme, you can stand at the top of the world all the same.",
        k:"이안이 문화와 예술을 상징한다면, 제빵사 우바오춘(吳寶春)이 걸어온 길은 또 다른 감동의 길입니다. 어릴 때부터 집안이 가난해 젊은 나이에 빵집 견습생이 되었고, 대만 현지 식재료를 끊임없이 연구해 향토의 풍미가 가득한 빵을 만들어 냈습니다. 훗날 세계적인 제빵 대회에서 우승하며 '대만의 맛'을 담은 빵을 국제 무대에 올렸습니다. 그의 이야기는 알려 줍니다—공부를 많이 하지 않아도 한 가지 일을 극한까지 해내면 똑같이 세계의 정상에 설 수 있다는 것을요."
      }
    },
    {
      z:"在運動場上，台灣同樣有讓人驕傲的名字。羽球選手戴資穎，就是其中最亮眼的一位。她個子不算高大，卻靠著細膩的手感和聰明的球路，在球場上打出許多讓人驚呼的好球，曾經長時間排在世界球后的位置。每次她在國際大賽出場，許多台灣人都會守在電視機前替她加油。她讓世界看見，來自台灣的小將，也能在最高等級的比賽裡，和各國頂尖高手一較高下。",
      py:"Zài yùndòngchǎng shàng, Táiwān tóngyàng yǒu ràng rén jiāo'ào de míngzì. Yǔqiú xuǎnshǒu Dài Zīyǐng, jiùshì qízhōng zuì liàngyǎn de yí wèi. Tā gèzi bú suàn gāodà, què kàozhe xìnì de shǒugǎn hé cōngmíng de qiúlù, zài qiúchǎng shàng dǎchū xǔduō ràng rén jīnghū de hǎoqiú, céngjīng cháng shíjiān páizài shìjiè qiúhòu de wèizhì. Měicì tā zài guójì dàsài chūchǎng, xǔduō Táiwānrén dōu huì shǒuzài diànshìjī qián tì tā jiāyóu. Tā ràng shìjiè kànjiàn, láizì Táiwān de xiǎojiàng, yě néng zài zuìgāo děngjí de bǐsài lǐ, hé gèguó dǐngjiān gāoshǒu yíjiào gāoxià.",
      m:{
        j:"スポーツの舞台でも、台湾には誇らしい名前があります。バドミントン選手の戴資穎（タイ・ツーイン）は、その中でも最も輝く一人です。体格は決して大きくありませんが、繊細なタッチと巧みなコース取りで、コート上で何度も人を驚かせる好プレーを見せ、長期間にわたって世界ランキング一位（女王）の座にありました。彼女が国際大会に出場するたび、多くの台湾人がテレビの前で応援します。台湾出身の若き選手も、最高峰の試合で各国のトップ選手と互角に渡り合えるのだと、彼女は世界に示しました。",
        e:"On the sports field, Taiwan has names to be proud of too. Badminton player Tai Tzu-ying is one of the most brilliant. Not especially tall, she relies on a delicate touch and clever shot placement to produce stroke after jaw-dropping stroke, and she held the world number-one (queen of the court) ranking for a long stretch. Every time she plays in an international tournament, many Taiwanese sit in front of the TV cheering her on. She showed the world that a young athlete from Taiwan can go toe-to-toe with the top players of every nation at the highest level of competition.",
        k:"스포츠 무대에서도 대만에는 자랑스러운 이름이 있습니다. 배드민턴 선수 다이쯔잉(戴資穎)은 그중에서도 가장 빛나는 한 사람입니다. 체격이 큰 편은 아니지만 섬세한 손끝 감각과 영리한 코스 배치로 코트에서 감탄을 자아내는 좋은 플레이를 여러 번 보여 주었고, 오랜 기간 세계 랭킹 1위(여왕)의 자리에 있었습니다. 그녀가 국제 대회에 출전할 때마다 많은 대만 사람이 TV 앞에서 응원합니다. 대만 출신의 젊은 선수도 최고 수준의 경기에서 각국의 정상급 선수와 대등하게 겨룰 수 있음을 그녀는 세계에 보여 주었습니다."
      }
    },
    {
      z:"除了個人，台灣還有一項讓世界都得認真對待的產業，那就是半導體。台灣的晶片製造技術世界領先，其中最具代表性的就是台積電。你手上的手機、電腦，甚至汽車和各種家電裡，很可能都裝著在台灣製造的晶片。這些看不見的小小晶片，是現代科技的心臟，也讓台灣在全球供應鏈裡，站上了一個非常關鍵的位置，有人形容它是「護國神山」。",
      py:"Chúle gèrén, Táiwān hái yǒu yí xiàng ràng shìjiè dōu děi rènzhēn duìdài de chǎnyè, nà jiùshì bàndǎotǐ. Táiwān de jīngpiàn zhìzào jìshù shìjiè lǐngxiān, qízhōng zuì jù dàibiǎoxìng de jiùshì Táijīdiàn. Nǐ shǒushàng de shǒujī, diànnǎo, shènzhì qìchē hé gèzhǒng jiādiàn lǐ, hěn kěnéng dōu zhuāngzhe zài Táiwān zhìzào de jīngpiàn. Zhèxiē kànbújiàn de xiǎoxiǎo jīngpiàn, shì xiàndài kējì de xīnzàng, yě ràng Táiwān zài quánqiú gōngyìngliàn lǐ, zhànshàngle yí ge fēicháng guānjiàn de wèizhì, yǒurén xíngróng tā shì “hùguó shénshān”.",
      m:{
        j:"個人だけでなく、台湾には世界が真剣に向き合わざるを得ない産業があります。半導体です。台湾のチップ製造技術は世界をリードしており、その中でも最も代表的なのがTSMC（台積電）です。あなたの手元のスマートフォンやパソコン、さらには自動車やさまざまな家電の中にも、台湾で製造されたチップが入っている可能性が高いのです。この目に見えない小さなチップは、現代テクノロジーの心臓であり、台湾を世界のサプライチェーンの中で非常に重要な位置に押し上げました。人はそれを「護国神山（国を守る神の山）」と呼んだりします。",
        e:"Beyond individuals, Taiwan has an industry the whole world must take seriously: semiconductors. Taiwan leads the world in chip-manufacturing technology, and the most iconic name is TSMC. The phone or computer in your hand—even cars and all kinds of home appliances—very likely contain chips made in Taiwan. These invisible little chips are the heart of modern technology, and they have placed Taiwan at an extremely crucial position in the global supply chain. Some describe it as the 'sacred mountain that guards the nation.'",
        k:"개인뿐 아니라 대만에는 세계가 진지하게 대할 수밖에 없는 산업이 있습니다. 바로 반도체입니다. 대만의 칩 제조 기술은 세계를 선도하며, 그중 가장 대표적인 것이 TSMC(台積電)입니다. 당신 손안의 스마트폰과 컴퓨터, 나아가 자동차와 각종 가전 속에도 대만에서 만든 칩이 들어 있을 가능성이 높습니다. 이 보이지 않는 작은 칩은 현대 기술의 심장이며, 대만을 세계 공급망에서 매우 핵심적인 위치에 올려놓았습니다. 어떤 이는 이를 '나라를 지키는 신령한 산(護國神山)'이라 표현하기도 합니다."
      }
    },
    {
      z:"為什麼一個不算大的地方，能出這麼多「台灣之光」？其中一個原因，或許是台灣人身上那股「不服輸」和「肯拚」的精神。資源有限，市場也不大，很多人只好把眼光放到全世界，用更用功、更靈活的方式去闖。無論是拍電影、做麵包、打球，還是做晶片，背後往往都有一段長時間默默努力、跌倒又爬起來的故事。",
      py:"Wèishénme yí ge bú suàn dà de dìfāng, néng chū zhème duō “Táiwān zhī guāng”? Qízhōng yí ge yuányīn, huòxǔ shì Táiwānrén shēnshàng nà gǔ “bù fúshū” hé “kěn pīn” de jīngshén. Zīyuán yǒuxiàn, shìchǎng yě bú dà, hěnduō rén zhǐhǎo bǎ yǎnguāng fàngdào quán shìjiè, yòng gèng yònggōng, gèng línghuó de fāngshì qù chuǎng. Wúlùn shì pāi diànyǐng, zuò miànbāo, dǎqiú, háishì zuò jīngpiàn, bèihòu wǎngwǎng dōu yǒu yí duàn cháng shíjiān mòmò nǔlì, diēdǎo yòu páqǐlái de gùshì.",
      m:{
        j:"なぜ、それほど大きくない土地から、これほど多くの「台湾の光」が生まれるのでしょう。理由の一つはおそらく、台湾の人が持つあの「負けず嫌い」で「頑張り屋」な精神です。資源は限られ、市場も大きくないからこそ、多くの人は視線を世界全体に向け、より勤勉に、より柔軟なやり方で挑んでいきます。映画を撮るのも、パンを作るのも、球を打つのも、チップを作るのも、その裏にはたいてい、長い時間をかけて黙々と努力し、転んでもまた立ち上がってきた物語があるのです。",
        e:"Why can a place that isn't very big produce so many 'prides of Taiwan'? One reason may be that spirit of 'refusing to lose' and 'willing to grind' that runs through the Taiwanese. With limited resources and a market that isn't large, many people have no choice but to set their sights on the whole world and strike out with harder work and greater flexibility. Whether making films, baking bread, playing ball, or making chips, behind it there is usually a long story of quiet effort—of falling down and getting back up again.",
        k:"왜 그리 크지 않은 곳에서 이렇게 많은 '대만의 빛'이 나올 수 있을까요? 그 이유 중 하나는 아마도 대만 사람에게 있는 '지기 싫어하고' '기꺼이 애쓰는' 정신일 것입니다. 자원은 한정되어 있고 시장도 크지 않기에, 많은 사람이 시선을 온 세계로 돌려 더 부지런하고 더 유연한 방식으로 부딪쳐 나아갑니다. 영화를 찍든, 빵을 만들든, 공을 치든, 칩을 만들든, 그 뒤에는 대개 오랜 시간 묵묵히 노력하며 넘어져도 다시 일어선 이야기가 있습니다."
      }
    },
    {
      z:"「台灣之光」這個詞，其實不只屬於那些站在鎂光燈下的人。在世界各地默默打拚的留學生、廚師、工程師、運動員，還有在自己崗位上認真過生活的每一個台灣人，某種程度上都是這道光的一部分。它代表的，是一種即使身處小小的島嶼，也願意抬起頭、努力發光、讓世界看見自己的心意。這份心意，或許正是台灣最動人的力量。",
      py:"“Táiwān zhī guāng” zhège cí, qíshí bùzhǐ shǔyú nàxiē zhànzài méiguāngdēng xià de rén. Zài shìjiè gèdì mòmò dǎpīn de liúxuéshēng, chúshī, gōngchéngshī, yùndòngyuán, háiyǒu zài zìjǐ gǎngwèi shàng rènzhēn guò shēnghuó de měi yí ge Táiwānrén, mǒuzhǒng chéngdù shàng dōu shì zhè dào guāng de yíbùfèn. Tā dàibiǎo de, shì yì zhǒng jíshǐ shēnchǔ xiǎoxiǎo de dǎoyǔ, yě yuànyì táiqǐ tóu, nǔlì fāguāng, ràng shìjiè kànjiàn zìjǐ de xīnyì. Zhè fèn xīnyì, huòxǔ zhèngshì Táiwān zuì dòngrén de lìliàng.",
      m:{
        j:"「台湾の光」という言葉は、実はスポットライトの下に立つ人だけのものではありません。世界各地で黙々と奮闘する留学生、料理人、エンジニア、スポーツ選手、そして自分の持ち場でまじめに生きる一人ひとりの台湾人も、ある意味この光の一部です。それが表しているのは、小さな島に身を置いていても、顔を上げ、努力して輝き、世界に自分を見てもらおうとする心——その思いです。この思いこそ、もしかすると台湾のもっとも人を打つ力なのかもしれません。",
        e:"The phrase 'the pride of Taiwan' actually doesn't belong only to those standing in the spotlight. The students, chefs, engineers, and athletes quietly striving all over the world, and every Taiwanese who lives earnestly at their own post, are in a sense part of this light too. What it represents is a spirit that, even on a small island, is willing to lift its head, work to shine, and let the world see who it is. That spirit may be the most moving strength Taiwan has.",
        k:"'대만의 빛'이라는 말은 사실 스포트라이트 아래 선 사람만의 것이 아닙니다. 세계 곳곳에서 묵묵히 분투하는 유학생, 요리사, 엔지니어, 운동선수, 그리고 자기 자리에서 성실히 살아가는 한 사람 한 사람의 대만인도 어떤 의미에서는 이 빛의 일부입니다. 그것이 나타내는 것은, 작은 섬에 몸담고 있어도 고개를 들고 애써 빛나며 세계에 자신을 보이려는 마음입니다. 이 마음이야말로 어쩌면 대만의 가장 감동적인 힘일지 모릅니다."
      }
    }
  ],
  vocab:[
    { w:"台灣之光", zy:"ㄊㄞˊ ㄨㄢ ㄓ ㄍㄨㄤ", py:"Táiwān zhī guāng", m:{ j:"台湾の光（台湾の誇りとなる人・こと）", e:"'the pride of Taiwan'", k:"대만의 빛(대만의 자랑)" } },
    { w:"導演", zy:"ㄉㄠˇ ㄧㄢˇ", py:"dǎoyǎn", m:{ j:"（映画などの）監督", e:"(film) director", k:"감독" } },
    { w:"享譽國際", zy:"ㄒㄧㄤˇ ㄩˋ ㄍㄨㄛˊ ㄐㄧˋ", py:"xiǎngyù guójì", m:{ j:"国際的に名声を得る", e:"to be internationally renowned", k:"국제적으로 명성을 얻다" } },
    { w:"麵包師傅", zy:"ㄇㄧㄢˋ ㄅㄠ ㄕ ㄈㄨ˙", py:"miànbāo shīfù", m:{ j:"パン職人", e:"baker", k:"제빵사" } },
    { w:"學徒", zy:"ㄒㄩㄝˊ ㄊㄨˊ", py:"xuétú", m:{ j:"見習い・弟子", e:"apprentice", k:"견습생·도제" } },
    { w:"羽球", zy:"ㄩˇ ㄑㄧㄡˊ", py:"yǔqiú", m:{ j:"バドミントン", e:"badminton", k:"배드민턴" } },
    { w:"選手", zy:"ㄒㄩㄢˇ ㄕㄡˇ", py:"xuǎnshǒu", m:{ j:"選手", e:"athlete, player", k:"선수" } },
    { w:"半導體", zy:"ㄅㄢˋ ㄉㄠˇ ㄊㄧˇ", py:"bàndǎotǐ", m:{ j:"半導体", e:"semiconductor", k:"반도체" } },
    { w:"晶片", zy:"ㄐㄧㄥ ㄆㄧㄢˋ", py:"jīngpiàn", m:{ j:"（半導体）チップ", e:"chip (semiconductor)", k:"칩·반도체 칩" } },
    { w:"供應鏈", zy:"ㄍㄨㄥ ㄧㄥˋ ㄌㄧㄢˋ", py:"gōngyìngliàn", m:{ j:"サプライチェーン・供給網", e:"supply chain", k:"공급망" } },
    { w:"不服輸", zy:"ㄅㄨˋ ㄈㄨˊ ㄕㄨ", py:"bù fúshū", m:{ j:"負けず嫌い", e:"unwilling to admit defeat", k:"지기 싫어함" } },
    { w:"打拚", zy:"ㄉㄚˇ ㄆㄧㄣˋ", py:"dǎpīn", m:{ j:"懸命に頑張る・奮闘する（台湾でよく使う語）", e:"to work/strive hard (common Taiwan term)", k:"열심히 분투하다(대만식 표현)" } }
  ],
  note:{
    j:"「台灣之光」は、台湾のメディアや日常会話でとてもよく使われる言葉で、国際的な賞を取った人、世界大会で活躍した選手、海外で認められた企業などをたたえるときに登場します。台積電（TSMC）は世界最大級の半導体受託製造企業で、その動向は世界中の経済ニュースで注目されています。ちなみに、台湾は野球も盛んで、大リーグで活躍した選手も『台灣之光』と呼ばれてきました。誰が『光』かは時代とともに変わりますが、『小さな島から世界へ』という物語は、いつも台湾の人々を励ましています。",
    e:"'The pride of Taiwan' is a phrase used very often in Taiwanese media and everyday conversation, brought out to honor people who win international awards, athletes who shine at world championships, or companies recognized abroad. TSMC is one of the world's largest contract chipmakers, and its every move draws attention in economic news worldwide. Baseball is also popular in Taiwan, and players who have starred in the U.S. Major Leagues have long been called 'the pride of Taiwan' too. Who counts as the 'light' changes with the times, but the story of 'from a small island to the world' has always encouraged the people of Taiwan.",
    k:"'대만의 빛'은 대만 언론과 일상 대화에서 아주 자주 쓰이는 말로, 국제적인 상을 받은 사람, 세계 대회에서 활약한 선수, 해외에서 인정받은 기업 등을 기릴 때 등장합니다. TSMC는 세계 최대급의 반도체 위탁 제조 기업으로, 그 동향은 전 세계 경제 뉴스에서 주목받습니다. 참고로 대만은 야구도 활발해, 미국 메이저리그에서 활약한 선수도 오랫동안 '대만의 빛'이라 불려 왔습니다. 누가 '빛'인지는 시대에 따라 바뀌지만, '작은 섬에서 세계로'라는 이야기는 언제나 대만 사람들을 북돋아 줍니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_7 };
