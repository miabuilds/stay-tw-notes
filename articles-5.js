// StayTW Notes — 深度閲讀：自然・旅（繁体字＋拼音＋多言語訳）
// 形式: id, cat{j,e,k}, zhTitle, title{j,e,k}, intro{j,e,k}, paras[{z,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], note{j,e,k}
const ARTICLES_5 = [
{
  id:"taiwan-hot-springs",
  cat:{ j:"自然・旅", e:"Nature & Travel", k:"자연·여행" },
  zhTitle:"台灣的溫泉文化：在火山島上泡湯",
  title:{ j:"台湾の温泉文化——火山の島で湯につかる", e:"Taiwan's Hot Spring Culture: Soaking on a Volcanic Island", k:"대만의 온천 문화—화산섬에서 온천을 즐기다" },
  intro:{
    j:"冬の夜、外は雨で肌寒いのに、湯船に肩までつかると全身がじんわりほどけていく——台湾の温泉は、じつは日本にも負けないほど豊かで奥深いのです。なぜこの小さな島にこれほど温泉が湧くのか、そして台湾ならではの『泡湯（湯につかる）』文化を、のぞいてみましょう。",
    e:"On a winter night, chilly and rainy outside, you sink into the water up to your shoulders and feel your whole body slowly unwind—Taiwan's hot springs are richer and deeper than many people expect. Let's explore why this small island bubbles with so many springs, and the local culture of 'pàotāng,' soaking in the hot water.",
    k:"겨울밤, 밖은 비가 내려 쌀쌀한데 탕에 어깨까지 몸을 담그면 온몸이 서서히 풀립니다—대만의 온천은 사실 일본에 뒤지지 않을 만큼 풍부하고 깊습니다. 왜 이 작은 섬에 이렇게 온천이 솟는지, 그리고 대만만의 '파오탕(온천에 몸을 담그기)' 문화를 들여다봅시다."
  },
  paras:[
    {
      z:"很多人不知道，台灣其實是一個溫泉大國。這座島坐落在環太平洋的火山帶上，地底下岩漿活動旺盛，加上板塊擠壓、地殼變動，讓地下水被加熱後從地表冒出來。從北到南、從平地到高山，全台灣有超過一百處溫泉，密度在世界上名列前茅。可以說，台灣人天生就住在一個「地熱寶庫」上面。",
      py:"Hěnduō rén bù zhīdào, Táiwān qíshí shì yí ge wēnquán dàguó. Zhè zuò dǎo zuòluò zài huán Tàipíngyáng de huǒshān dài shàng, dìdǐ xià yánjiāng huódòng wàngshèng, jiāshàng bǎnkuài jǐyā, dìqiào biàndòng, ràng dìxià shuǐ bèi jiārè hòu cóng dìbiǎo mào chūlái. Cóng běi dào nán, cóng píngdì dào gāoshān, quán Táiwān yǒu chāoguò yìbǎi chù wēnquán, mìdù zài shìjiè shàng míngliè qiánmáo. Kěyǐ shuō, Táiwānrén tiānshēng jiù zhù zài yí ge “dìrè bǎokù” shàngmiàn.",
      m:{
        j:"意外に知られていませんが、台湾はじつは温泉大国です。この島は環太平洋の火山帯の上に位置し、地下ではマグマの活動が活発で、そこにプレートの押し合いや地殻変動が加わって、地下水が熱せられ地表から湧き出します。北から南まで、平地から高山まで、台湾全土には百か所を超える温泉があり、その密度は世界でも屈指です。台湾人は生まれながらにして「地熱の宝庫」の上に暮らしている、といってもいいでしょう。",
        e:"Many people don't realize that Taiwan is actually a hot-spring powerhouse. The island sits on the Pacific Ring of Fire, with vigorous magma activity underground; add the squeezing of tectonic plates and shifts in the crust, and groundwater gets heated and surges up to the surface. From north to south, from lowlands to high mountains, Taiwan has more than a hundred hot springs—a density among the highest in the world. You could say Taiwanese are born living atop a 'geothermal treasure trove.'",
        k:"의외로 잘 알려지지 않았지만, 대만은 사실 온천 대국입니다. 이 섬은 환태평양 화산대 위에 있어 지하 마그마 활동이 활발하고, 여기에 판의 압력과 지각 변동이 더해져 지하수가 데워진 뒤 지표로 솟아오릅니다. 북에서 남까지, 평지에서 고산까지 대만 전역에 온천이 백여 곳 넘게 있어 그 밀도가 세계에서도 손꼽힙니다. 대만 사람은 태어날 때부터 '지열의 보고' 위에 사는 셈입니다."
      }
    },
    {
      z:"說到台灣最有名的溫泉區，很多人第一個想到的是台北的「北投」。從捷運站走出來，空氣裡就飄著淡淡的硫磺味，山谷間白煙裊裊，那是著名的「地熱谷」。北投的溫泉多屬於白磺、青磺這類硫磺泉，據說對皮膚和筋骨都有幫助。這裡從日本時代就是有名的溫泉鄉，留下許多老溫泉旅館和公共浴場，充滿懷舊的味道。",
      py:"Shuōdào Táiwān zuì yǒumíng de wēnquán qū, hěnduō rén dì yī ge xiǎngdào de shì Táiběi de “Běitóu”. Cóng jiéyùn zhàn zǒu chūlái, kōngqì lǐ jiù piāozhe dàndàn de liúhuáng wèi, shāngǔ jiān bái yān niǎoniǎo, nà shì zhùmíng de “Dìrègǔ”. Běitóu de wēnquán duō shǔyú báihuáng, qīnghuáng zhè lèi liúhuáng quán, jùshuō duì pífū hé jīngǔ dōu yǒu bāngzhù. Zhèlǐ cóng Rìběn shídài jiùshì yǒumíng de wēnquán xiāng, liúxià xǔduō lǎo wēnquán lǚguǎn hé gōnggòng yùchǎng, chōngmǎn huáijiù de wèidào.",
      m:{
        j:"台湾で最も有名な温泉地といえば、多くの人がまず思い浮かべるのは台北の「北投」でしょう。MRTの駅を出ると、空気にほのかな硫黄の匂いが漂い、谷あいには白い湯けむりが立ちのぼっています。有名な「地熱谷」です。北投の温泉は白磺・青磺といった硫黄泉が多く、肌や筋・関節によいとされます。ここは日本時代から名高い温泉郷で、古い温泉旅館や公共浴場が数多く残り、レトロな風情に満ちています。",
        e:"When it comes to Taiwan's most famous hot-spring district, many people first think of Beitou in Taipei. Step out of the metro station and a faint whiff of sulfur hangs in the air, with white steam curling up from the valley—the celebrated 'Thermal Valley.' Beitou's springs are mostly sulfur springs of the 'white sulfur' and 'green sulfur' types, said to be good for the skin and joints. This has been a renowned hot-spring town since the Japanese era, leaving behind many old inns and public bathhouses full of nostalgic charm.",
        k:"대만에서 가장 유명한 온천지라면 많은 사람이 가장 먼저 타이베이의 '베이터우(北投)'를 떠올립니다. 지하철역을 나서면 공기 중에 은은한 유황 냄새가 감돌고, 골짜기 사이로 하얀 김이 피어오릅니다. 바로 유명한 '지열곡'입니다. 베이터우의 온천은 백황·청황 같은 유황천이 많아 피부와 근골에 좋다고 합니다. 이곳은 일본 시대부터 이름난 온천 마을로, 오래된 온천 여관과 공중목욕탕이 많이 남아 향수 어린 정취가 가득합니다."
      }
    },
    {
      z:"如果想找氣氛更悠閒的溫泉小鎮，宜蘭的「礁溪」是很多人的口袋名單。礁溪的溫泉屬於碳酸氫鈉泉，泉水無色無味、摸起來滑滑的，被暱稱為「美人湯」。特別的是，這裡的溫泉直接湧進市區，車站附近就有免費的泡腳池，走幾步路就能找到溫泉飯店。冬天來礁溪，白天逛老街、吃溫泉空心菜，晚上泡湯，是台灣人很愛的小旅行。",
      py:"Rúguǒ xiǎng zhǎo qìfēn gèng yōuxián de wēnquán xiǎozhèn, Yílán de “Jiāoxī” shì hěnduō rén de kǒudài míngdān. Jiāoxī de wēnquán shǔyú tànsuān qīng nà quán, quánshuǐ wúsè wúwèi, mō qǐlái huáhuá de, bèi nìchēng wéi “měirén tāng”. Tèbié de shì, zhèlǐ de wēnquán zhíjiē yǒng jìn shìqū, chēzhàn fùjìn jiù yǒu miǎnfèi de pàojiǎochí, zǒu jǐ bù lù jiù néng zhǎodào wēnquán fàndiàn. Dōngtiān lái Jiāoxī, báitiān guàng lǎojiē, chī wēnquán kōngxīncài, wǎnshàng pàotāng, shì Táiwānrén hěn ài de xiǎo lǚxíng.",
      m:{
        j:"もっとのんびりした雰囲気の温泉町を探すなら、宜蘭の「礁溪」が多くの人のお気に入りリストに入っています。礁溪の温泉は炭酸水素ナトリウム泉で、無色無臭、触るとつるつるしていて「美人の湯」と愛称で呼ばれます。おもしろいのは、ここでは温泉が市街地までじかに湧き出ていて、駅の近くに無料の足湯があり、数歩歩けば温泉ホテルが見つかること。冬に礁溪へ行き、昼は老街（古い商店街）を歩いて温泉育ちの空心菜を食べ、夜は湯につかる——台湾人が大好きな小旅行です。",
        e:"If you want a more laid-back hot-spring town, Jiaoxi in Yilan is on many people's short list. Jiaoxi's water is a sodium bicarbonate spring—colorless, odorless, and silky to the touch, nicknamed the 'beauty bath.' What's special is that the spring water flows right into the town center: there's a free foot-soaking pool near the station, and hot-spring hotels are just a few steps away. Coming to Jiaoxi in winter to stroll the old street by day, eat hot-spring-grown water spinach, and soak at night is a favorite little getaway for Taiwanese.",
        k:"좀 더 여유로운 분위기의 온천 마을을 찾는다면 이란(宜蘭)의 '자오시(礁溪)'가 많은 사람의 위시리스트에 있습니다. 자오시의 온천은 탄산수소나트륨천으로, 무색무취에 만지면 매끄러워 '미인탕'이라는 애칭으로 불립니다. 특이한 점은 이곳 온천이 시가지까지 직접 솟아나, 역 근처에 무료 족욕탕이 있고 몇 걸음만 걸으면 온천 호텔이 있다는 것입니다. 겨울에 자오시에 가서 낮에는 라오제(옛 거리)를 거닐며 온천에서 자란 공심채를 먹고 밤에는 온천을 즐기는 것은 대만 사람이 무척 좋아하는 짧은 여행입니다."
      }
    },
    {
      z:"泡溫泉時，你會遇到兩種選擇：「大眾池」和「湯屋」。大眾池是很多人一起泡的公共浴池，通常男女分開、需要脫光衣服，價格便宜、氣氛熱鬧，適合想體驗傳統泡湯的人。湯屋則是一間一間獨立的房間，一群朋友或一家人可以關起門來自己泡，隱私性高，情侶或帶小孩的家庭特別喜歡。想穿泳衣一起泡的，也有露天的溫泉游泳池可以選。",
      py:"Pào wēnquán shí, nǐ huì yùdào liǎng zhǒng xuǎnzé: “dàzhòng chí” hé “tāngwū”. Dàzhòng chí shì hěnduō rén yìqǐ pào de gōnggòng yùchí, tōngcháng nánnǚ fēnkāi, xūyào tuōguāng yīfú, jiàgé piányí, qìfēn rènào, shìhé xiǎng tǐyàn chuántǒng pàotāng de rén. Tāngwū zé shì yì jiān yì jiān dúlì de fángjiān, yì qún péngyǒu huò yì jiā rén kěyǐ guān qǐ mén lái zìjǐ pào, yǐnsī xìng gāo, qínglǚ huò dài xiǎohái de jiātíng tèbié xǐhuān. Xiǎng chuān yǒngyī yìqǐ pào de, yě yǒu lùtiān de wēnquán yóuyǒngchí kěyǐ xuǎn.",
      m:{
        j:"温泉に入るときは、二つの選択肢に出会います。「大眾池（大浴場）」と「湯屋（個室風呂）」です。大眾池は多くの人が一緒に入る公共浴場で、たいてい男女別、衣服を脱いで裸で入ります。値段が安く賑やかで、伝統的な湯浴びを体験したい人向き。一方、湯屋は一部屋ずつ独立した個室で、友だち同士や家族が扉を閉めて自分たちだけで入れます。プライバシーが高く、カップルや子連れの家庭に特に人気です。水着を着て一緒に入りたい人には、露天の温泉プールという選択肢もあります。",
        e:"When you go soaking, you'll face two options: the 'public pool' and the 'private room bath.' The public pool is a shared bath where many people soak together—usually separated by sex and requiring you to bathe naked; it's cheap and lively, ideal for those who want the traditional experience. A private room bath is a self-contained room where a group of friends or a family can shut the door and soak on their own—very private, and especially popular with couples or families with kids. If you'd rather wear a swimsuit and soak together, there are also outdoor hot-spring pools to choose from.",
        k:"온천을 즐길 때는 두 가지 선택지를 만납니다. '대중탕'과 '탕옥(개별 룸)'입니다. 대중탕은 여러 사람이 함께 들어가는 공중 욕탕으로, 보통 남녀가 나뉘고 옷을 벗고 알몸으로 들어갑니다. 값이 싸고 활기차며 전통적인 온천을 체험하고 싶은 사람에게 좋습니다. 탕옥은 하나하나 독립된 방으로, 친구들이나 가족이 문을 닫고 자기들끼리 즐길 수 있어 프라이버시가 높고 커플이나 아이를 데려온 가정에 특히 인기입니다. 수영복을 입고 함께 즐기고 싶다면 노천 온천 수영장도 있습니다."
      }
    },
    {
      z:"泡湯雖然舒服，但也有一些「眉角」要注意。進大眾池之前，一定要先在旁邊把身體洗乾淨才能下水；泡的時候不要把毛巾泡進池子裡，通常把毛巾放在頭上或池邊。一次泡太久容易頭暈，最好泡個五到十分鐘就起來休息一下，補充水分。心臟不好、喝了酒或剛吃飽的時候，也不建議馬上去泡。記得這些基本禮儀，泡起來才安心又自在。",
      py:"Pàotāng suīrán shūfú, dàn yě yǒu yìxiē “méijiǎo” yào zhùyì. Jìn dàzhòng chí zhīqián, yídìng yào xiān zài pángbiān bǎ shēntǐ xǐ gānjìng cái néng xià shuǐ; pào de shíhòu búyào bǎ máojīn pào jìn chízi lǐ, tōngcháng bǎ máojīn fàng zài tóu shàng huò chí biān. Yí cì pào tài jiǔ róngyì tóuyūn, zuìhǎo pào ge wǔ dào shí fēnzhōng jiù qǐlái xiūxí yíxià, bǔchōng shuǐfèn. Xīnzàng bù hǎo, hē le jiǔ huò gāng chībǎo de shíhòu, yě bú jiànyì mǎshàng qù pào. Jìdé zhèxiē jīběn lǐyí, pào qǐlái cái ānxīn yòu zìzài.",
      m:{
        j:"温泉は気持ちいいものですが、いくつか気をつけたい「コツ・作法」があります。大浴場に入る前には、必ず脇で体を洗ってから湯に入ること。つかっている間はタオルを湯に浸けず、ふつうは頭の上か浴槽の縁に置きます。一度に長く入りすぎるとのぼせやすいので、五分から十分ほどで一度上がって休み、水分を補給するのがおすすめ。心臓が弱い人、お酒を飲んだ後や食べたばかりのときも、すぐに入るのは勧められません。こうした基本のマナーを覚えておけば、安心してくつろげます。",
        e:"Soaking feels wonderful, but there are a few 'fine points' to mind. Before entering a public pool, you must wash your body clean at the side first; while soaking, don't dip your towel into the water—people usually rest it on their head or the pool's edge. Staying in too long can make you dizzy, so it's best to soak for five to ten minutes, get out to rest, and drink some water. If you have heart problems, have been drinking, or have just eaten a big meal, going straight in is not advised. Remember these basic manners and you can soak with ease and peace of mind.",
        k:"온천은 편안하지만 몇 가지 주의할 '요령·예절'이 있습니다. 대중탕에 들어가기 전에는 반드시 옆에서 몸을 깨끗이 씻고 물에 들어가야 합니다. 몸을 담글 때는 수건을 탕에 담그지 말고 보통 머리 위나 탕 가장자리에 둡니다. 한 번에 너무 오래 있으면 어지러워지기 쉬우니 5~10분 정도 담그고 나와 쉬며 수분을 보충하는 것이 좋습니다. 심장이 약하거나 술을 마셨거나 방금 배불리 먹었을 때도 바로 들어가는 것은 권하지 않습니다. 이런 기본 예절을 기억해 두면 안심하고 편안하게 즐길 수 있습니다."
      }
    },
    {
      z:"對台灣人來說，泡湯不只是洗澡，更是一種冬天的享受。天氣一冷，全家人或三五好友就會相約去泡溫泉。泡到全身暖呼呼、臉頰紅通通之後，最幸福的就是坐下來吃一頓熱騰騰的火鍋，或是點一盤溫泉區特有的野菜、白斬雞、烤香腸。外面越冷，湯裡越暖，這種對比，正是台灣冬天最療癒的味道。",
      py:"Duì Táiwānrén lái shuō, pàotāng bù zhǐshì xǐzǎo, gèng shì yì zhǒng dōngtiān de xiǎngshòu. Tiānqì yì lěng, quánjiā rén huò sānwǔ hǎoyǒu jiù huì xiāngyuē qù pào wēnquán. Pào dào quánshēn nuǎnhūhū, liǎnjiá hóngtōngtōng zhīhòu, zuì xìngfú de jiùshì zuò xiàlái chī yí dùn rètēngtēng de huǒguō, huòshì diǎn yì pán wēnquán qū tèyǒu de yěcài, báizhǎnjī, kǎo xiāngcháng. Wàimiàn yuè lěng, tāng lǐ yuè nuǎn, zhè zhǒng duìbǐ, zhèng shì Táiwān dōngtiān zuì liáoyù de wèidào.",
      m:{
        j:"台湾人にとって、湯につかることは単なる入浴ではなく、冬ならではの楽しみです。寒くなると、家族そろって、あるいは気の合う仲間で誘い合わせて温泉に出かけます。全身がぽかぽかになり、頬が赤く火照ったあと、いちばん幸せなのは、腰を下ろして湯気の立つ火鍋を囲むこと。あるいは温泉地ならではの山菜や白斬鶏（蒸し鶏）、焼きソーセージを一皿頼むのもいい。外が寒ければ寒いほど、湯は暖かく感じられる。この対比こそが、台湾の冬でいちばん癒される味わいなのです。",
        e:"For Taiwanese, soaking isn't just bathing—it's a distinctly wintry pleasure. When the weather turns cold, the whole family or a few close friends make a date to go to the springs. After soaking until you're warm all over and your cheeks are flushed red, the happiest thing is to sit down to a steaming hot pot, or order a plate of the wild greens, poached chicken, and grilled sausage the spring towns are known for. The colder it is outside, the warmer the water feels—that very contrast is the most soothing flavor of a Taiwanese winter.",
        k:"대만 사람에게 온천은 단순한 목욕이 아니라 겨울만의 즐거움입니다. 날이 추워지면 온 가족이, 혹은 마음 맞는 친구들끼리 약속해 온천에 갑니다. 온몸이 따끈따끈해지고 뺨이 발갛게 달아오른 뒤 가장 행복한 것은 앉아서 김이 모락모락 나는 훠궈를 먹는 것, 아니면 온천지 특유의 산나물, 백숙 닭, 구운 소시지를 한 접시 시키는 것입니다. 밖이 추울수록 탕은 더 따뜻하게 느껴지고, 이 대비야말로 대만 겨울에서 가장 힐링이 되는 맛입니다."
      }
    }
  ],
  vocab:[
    { w:"溫泉", zy:"ㄨㄣ ㄑㄩㄢˊ", py:"wēnquán", m:{ j:"温泉", e:"hot spring", k:"온천" } },
    { w:"泡湯", zy:"ㄆㄠˋ ㄊㄤ", py:"pàotāng", m:{ j:"湯につかる・温泉に入る", e:"to soak in a hot spring", k:"온천에 몸을 담그다" } },
    { w:"硫磺", zy:"ㄌㄧㄡˊ ㄏㄨㄤˊ", py:"liúhuáng", m:{ j:"硫黄", e:"sulfur", k:"유황" } },
    { w:"地熱", zy:"ㄉㄧˋ ㄖㄜˋ", py:"dìrè", m:{ j:"地熱", e:"geothermal heat", k:"지열" } },
    { w:"火山帶", zy:"ㄏㄨㄛˇ ㄕㄢ ㄉㄞˋ", py:"huǒshān dài", m:{ j:"火山帯", e:"volcanic belt", k:"화산대" } },
    { w:"大眾池", zy:"ㄉㄚˋ ㄓㄨㄥˋ ㄔˊ", py:"dàzhòng chí", m:{ j:"大浴場・公共浴池", e:"public bath pool", k:"대중탕" } },
    { w:"湯屋", zy:"ㄊㄤ ㄨ", py:"tāngwū", m:{ j:"個室風呂（貸切風呂）", e:"private hot-spring room", k:"개별 온천 룸" } },
    { w:"泡腳池", zy:"ㄆㄠˋ ㄐㄧㄠˇ ㄔˊ", py:"pàojiǎochí", m:{ j:"足湯", e:"foot-soaking pool", k:"족욕탕" } },
    { w:"美人湯", zy:"ㄇㄟˇ ㄖㄣˊ ㄊㄤ", py:"měirén tāng", m:{ j:"美人の湯（肌に良い泉質の愛称）", e:"'beauty bath' (skin-friendly spring)", k:"미인탕" } },
    { w:"眉角", zy:"ㄇㄟˊ ㄐㄧㄠˇ", py:"méijiǎo", m:{ j:"コツ・要領（台湾語由来の口語）", e:"knack, fine points (colloquial)", k:"요령·핵심 포인트" } },
    { w:"頭暈", zy:"ㄊㄡˊ ㄩㄣ", py:"tóuyūn", m:{ j:"めまい・のぼせ", e:"dizziness", k:"어지러움" } },
    { w:"火鍋", zy:"ㄏㄨㄛˇ ㄍㄨㄛ", py:"huǒguō", m:{ j:"火鍋（鍋料理）", e:"hot pot", k:"훠궈·샤브샤브" } }
  ],
  note:{
    j:"台湾には海のなかから湧く珍しい温泉もあります。台東の緑島にある『朝日温泉』は、世界でも数少ない海底温泉のひとつで、太平洋を眺めながら日の出とともに湯につかれることで有名です。また台湾南部の関子嶺には、泥のように濁った灰黒色の『泥湯』もあり、泉質のバリエーションの豊かさは驚くほど。日本時代に温泉文化が根づいた土地も多く、北投には当時の公共浴場を保存した『北投温泉博物館』があり、無料で見学できます。",
    e:"Taiwan even has rare springs that bubble up from the sea. 'Zhaori Hot Spring' on Green Island off Taitung is one of the world's few seabed hot springs, famous for soaking at sunrise while gazing over the Pacific. In Guanziling in the south, there's even a muddy, gray-black 'mud spring'—the variety of water types is astonishing. Many areas took root as hot-spring towns in the Japanese era; in Beitou, the preserved public bathhouse from that time is now the free-to-visit 'Beitou Hot Spring Museum.'",
    k:"대만에는 바닷속에서 솟는 진귀한 온천도 있습니다. 타이둥 뤼다오(綠島)의 '차오르 온천'은 세계에서도 몇 안 되는 해저 온천으로, 태평양을 바라보며 일출과 함께 몸을 담글 수 있어 유명합니다. 남부 관쯔링에는 진흙처럼 탁한 회흑색 '진흙탕'도 있어 온천 수질의 다양함이 놀랍습니다. 일본 시대에 온천 문화가 자리 잡은 곳도 많은데, 베이터우에는 당시 공중목욕탕을 보존한 '베이터우 온천 박물관'이 있어 무료로 관람할 수 있습니다."
  }
},
{
  id:"train-around-taiwan",
  cat:{ j:"自然・旅", e:"Nature & Travel", k:"자연·여행" },
  zhTitle:"搭火車環島：在鐵道上看見台灣",
  title:{ j:"列車で台湾一周——線路の上から島を見る", e:"Circling Taiwan by Train: Seeing the Island from the Rails", k:"기차로 대만 한 바퀴—철길 위에서 섬을 보다" },
  intro:{
    j:"窓の外を海が流れ、膝の上には温かい駅弁——台湾を鉄道でぐるりと一周する『環島』は、多くの台湾人にとって一生に一度はやってみたい旅です。新幹線のような高速鉄道から、各駅停車ののんびりした在来線まで、線路の上から見える台湾を旅してみましょう。",
    e:"The sea streams past the window, a warm bento box rests on your lap—circling Taiwan by rail, called 'huándǎo,' is a trip many Taiwanese dream of doing at least once in their lives. From the bullet-train-like high-speed line to the leisurely local trains that stop at every station, let's travel the Taiwan you can see from the rails.",
    k:"창밖으로 바다가 흐르고 무릎 위엔 따뜻한 도시락—기차로 대만을 한 바퀴 도는 '환도(環島)'는 많은 대만 사람이 평생 한 번은 해 보고 싶어 하는 여행입니다. 고속철도부터 역마다 서는 느긋한 재래선까지, 철길 위에서 보이는 대만을 여행해 봅시다."
  },
  paras:[
    {
      z:"台灣的鐵路系統，簡單分成兩大類：「台鐵」和「高鐵」。台鐵，也就是台灣鐵路，是一條環繞整座島的環狀鐵道，從西部平原一路沿著海岸線繞到東部，把大大小小的城鎮串在一起。高鐵則是西部的高速鐵路，時速可以到三百公里，讓你從北邊的台北到南邊的高雄，最快一個半小時就能抵達。一個像慢慢流動的血管，一個像貫穿全身的高速公路。",
      py:"Táiwān de tiělù xìtǒng, jiǎndān fēnchéng liǎng dà lèi: “Táitiě” hé “Gāotiě”. Táitiě, yě jiùshì Táiwān Tiělù, shì yì tiáo huánrào zhěng zuò dǎo de huánzhuàng tiědào, cóng xībù píngyuán yílù yánzhe hǎi'ànxiàn rào dào dōngbù, bǎ dàdà xiǎoxiǎo de chéngzhèn chuàn zài yìqǐ. Gāotiě zé shì xībù de gāosù tiělù, shísù kěyǐ dào sānbǎi gōnglǐ, ràng nǐ cóng běibiān de Táiběi dào nánbiān de Gāoxióng, zuì kuài yí ge bàn xiǎoshí jiù néng dǐdá. Yí ge xiàng mànmàn liúdòng de xuèguǎn, yí ge xiàng guànchuān quánshēn de gāosù gōnglù.",
      m:{
        j:"台湾の鉄道は、大きく二種類に分けられます。「台鉄」と「高鉄」です。台鉄（台湾鉄路）は島全体をぐるりと囲む環状の鉄道で、西部の平野から海岸線に沿って東部まで回り込み、大小の町を数珠つなぎにしています。高鉄は西部を走る高速鉄道で、時速は三百キロに達し、北の台北から南の高雄まで最速一時間半で到達できます。片や、ゆっくり流れる血管のよう。片や、全身を貫く高速道路のようです。",
        e:"Taiwan's rail system splits simply into two big categories: 'Taiwan Railway' (Taitie) and 'High Speed Rail' (Gaotie). Taiwan Railway is a loop line encircling the whole island, running from the western plains along the coastline around to the east, stringing towns big and small together like beads. The High Speed Rail is the western bullet line, reaching 300 km/h, taking you from Taipei in the north to Kaohsiung in the south in as little as an hour and a half. One is like a slowly flowing blood vessel; the other, like an expressway running through the body.",
        k:"대만의 철도는 크게 두 종류로 나뉩니다. '타이톄(台鐵)'와 '가오톄(高鐵)'입니다. 타이톄(대만 철로)는 섬 전체를 빙 두르는 순환 철도로, 서부 평야에서 해안선을 따라 동부까지 돌아 크고 작은 도시를 구슬처럼 이어 줍니다. 가오톄는 서부를 달리는 고속철도로 시속 300킬로미터에 달해, 북쪽 타이베이에서 남쪽 가오슝까지 가장 빠르면 1시간 반이면 도착합니다. 하나는 천천히 흐르는 혈관 같고, 하나는 온몸을 관통하는 고속도로 같습니다."
      }
    },
    {
      z:"在台鐵裡，車種也有分等級。最快、最舒適的是「自強號」，停的站少、速度快，適合長途移動。「區間車」則是每一站都停的通勤電車，票價便宜，是當地人上下班、上下學最常搭的車，也是背包客慢慢玩、隨興下車的好夥伴。此外還有太魯閣號、普悠瑪號這些傾斜式列車，過彎的時候會微微傾斜，跑東部的山海路線特別快。",
      py:"Zài Táitiě lǐ, chēzhǒng yě yǒu fēn děngjí. Zuì kuài, zuì shūshì de shì “Zìqiáng hào”, tíng de zhàn shǎo, sùdù kuài, shìhé chángtú yídòng. “Qūjiānchē” zé shì měi yí zhàn dōu tíng de tōngqín diànchē, piàojià piányí, shì dāngdì rén shàngxiàbān, shàngxiàxué zuì cháng dā de chē, yěshì bēibāokè mànmàn wán, suíxìng xiàchē de hǎo huǒbàn. Cǐwài hái yǒu Tàilǔgé hào, Pǔyōumǎ hào zhèxiē qīngxié shì lièchē, guòwān de shíhòu huì wéiwéi qīngxié, pǎo dōngbù de shānhǎi lùxiàn tèbié kuài.",
      m:{
        j:"台鉄のなかでも、列車の種類には等級があります。最も速く快適なのは「自強号」で、停車駅が少なく速度も速く、長距離移動に向いています。「区間車」は各駅停車の通勤電車で、運賃が安く、地元の人が通勤・通学でいちばんよく乗る列車。バックパッカーがのんびり気ままに途中下車するのにも最高の相棒です。さらに太魯閣号・普悠瑪号といった振り子式列車もあり、カーブでわずかに車体を傾けて、東部の山と海の路線を特に速く走ります。",
        e:"Within Taiwan Railway, trains also come in classes. The fastest and most comfortable is the 'Tze-Chiang' express: few stops, high speed, ideal for long hauls. The 'local train' (qūjiānchē) stops at every station—cheap fares, the train locals ride most for commuting and school, and a great companion for backpackers who want to take it slow and hop off on a whim. There are also tilting trains like the Taroko and Puyuma, which lean slightly through curves, making the mountain-and-sea routes of the east especially fast.",
        k:"타이톄 안에서도 열차 종류에 등급이 있습니다. 가장 빠르고 편안한 것은 '쯔창호'로, 정차역이 적고 속도가 빨라 장거리 이동에 적합합니다. '구간차'는 역마다 서는 통근 전철로 요금이 싸서 현지인이 출퇴근·통학에 가장 많이 타는 열차이며, 배낭여행자가 느긋하게 내키는 대로 내리기에도 좋은 동반자입니다. 이 밖에 타이루거호, 푸유마호 같은 틸팅 열차도 있어 커브에서 차체를 살짝 기울이며 동부의 산과 바다 노선을 특히 빠르게 달립니다."
      }
    },
    {
      z:"「環島」是台灣鐵道旅行的浪漫代名詞。你可以買一張票，從台北出發，順時針或逆時針繞台灣一圈。西部路段人多、城市密集，一站接著一站都是熱鬧的都會；但當火車轉進東部，景色就完全變了。過了宜蘭、花蓮，鐵軌一邊是連綿的中央山脈，一邊是遼闊的太平洋，藍得發亮的海就在窗外不停流動，很多人第一次看到都會忍不住拿起手機猛拍。",
      py:"“Huándǎo” shì Táiwān tiědào lǚxíng de làngmàn dàimíngcí. Nǐ kěyǐ mǎi yì zhāng piào, cóng Táiběi chūfā, shùnshízhēn huò nìshízhēn rào Táiwān yì quān. Xībù lùduàn rén duō, chéngshì mìjí, yí zhàn jiēzhe yí zhàn dōu shì rènào de dūhuì; dàn dāng huǒchē zhuǎn jìn dōngbù, jǐngsè jiù wánquán biàn le. Guòle Yílán, Huālián, tiěguǐ yìbiān shì liánmián de Zhōngyāng Shānmài, yìbiān shì liáokuò de Tàipíngyáng, lán de fāliàng de hǎi jiù zài chuāng wài bùtíng liúdòng, hěnduō rén dì yī cì kàndào dōu huì rěnbúzhù ná qǐ shǒujī měng pāi.",
      m:{
        j:"「環島（島を一周する）」は、台湾の鉄道旅のロマンの代名詞です。切符を一枚買って、台北を出発し、時計回りでも反時計回りでも台湾をぐるっと一周できます。西部の区間は人が多く都市が密集し、駅から駅までにぎやかな都会が続きます。ところが列車が東部に入ると、景色は一変します。宜蘭、花蓮を過ぎると、線路の片側には連なる中央山脈、もう片側には広大な太平洋。青く輝く海が窓の外を絶え間なく流れていき、初めて見る人の多くは思わずスマホを取り出して撮りまくってしまいます。",
        e:"'Huándǎo'—circling the island—is the romantic byword of Taiwanese rail travel. Buy one ticket, set off from Taipei, and loop around Taiwan clockwise or counterclockwise. The western stretch is crowded and city-dense, one bustling metropolis after another; but once the train turns into the east, the scenery changes completely. Past Yilan and Hualien, one side of the tracks is the unbroken Central Mountain Range and the other the vast Pacific—a sea so brightly blue it streams endlessly past the window, and many first-timers can't resist pulling out their phones to snap away.",
        k:"'환도(섬 한 바퀴 돌기)'는 대만 철도 여행의 낭만을 상징하는 말입니다. 표 한 장을 사서 타이베이에서 출발해 시계 방향으로든 반시계 방향으로든 대만을 한 바퀴 돌 수 있습니다. 서부 구간은 사람이 많고 도시가 밀집해 역마다 번화한 도회지가 이어집니다. 하지만 열차가 동부로 접어들면 풍경이 완전히 달라집니다. 이란, 화롄을 지나면 철길 한쪽은 끝없이 이어지는 중앙산맥, 다른 한쪽은 광활한 태평양. 눈부시게 파란 바다가 창밖으로 끊임없이 흘러, 처음 보는 사람은 대개 저도 모르게 휴대폰을 꺼내 마구 찍게 됩니다."
      }
    },
    {
      z:"東部的「花東縱谷」和海岸線，是很多人心中台灣最美的一段鐵道。花蓮到台東之間，火車有時候鑽進山谷，兩旁是綠油油的稻田和檳榔樹；有時候又貼著海邊跑，太平洋的浪一波一波打上岸。這一帶人口少、開發也少，保留了大片乾淨的自然。看著看著，你會理解為什麼台灣人常說：「東部是台灣的後花園。」",
      py:"Dōngbù de “Huādōng Zònggǔ” hé hǎi'ànxiàn, shì hěnduō rén xīnzhōng Táiwān zuì měi de yí duàn tiědào. Huālián dào Táidōng zhījiān, huǒchē yǒushíhòu zuān jìn shāngǔ, liǎngpáng shì lǜyóuyóu de dàotián hé bīngláng shù; yǒushíhòu yòu tiēzhe hǎibiān pǎo, Tàipíngyáng de làng yì bō yì bō dǎ shàng àn. Zhè yídài rénkǒu shǎo, kāifā yě shǎo, bǎoliú le dàpiàn gānjìng de zìrán. Kànzhe kànzhe, nǐ huì lǐjiě wèishénme Táiwānrén cháng shuō: “Dōngbù shì Táiwān de hòu huāyuán.”",
      m:{
        j:"東部の「花東縦谷」と海岸線は、多くの人の心に残る、台湾でいちばん美しい鉄道区間です。花蓮から台東のあいだ、列車はときに谷あいへ分け入り、両側には青々とした田んぼとビンロウの木が広がります。かと思えば海辺に沿って走り、太平洋の波が一つ、また一つと岸に打ち寄せます。この一帯は人口が少なく開発も進んでおらず、広々とした手つかずの自然が残されています。眺めているうちに、台湾人がよく言う「東部は台湾の裏庭（後花園）」という言葉の意味がわかってきます。",
        e:"The 'East Rift Valley' and coastline of the east are, for many, the most beautiful stretch of railway in Taiwan. Between Hualien and Taitung, the train sometimes bores into valleys flanked by lush green rice paddies and betel-nut palms; other times it hugs the shore as Pacific waves roll in one after another. This region is sparsely populated and lightly developed, preserving vast tracts of pristine nature. Watching it go by, you come to understand why Taiwanese often say, 'The east is Taiwan's back garden.'",
        k:"동부의 '화둥 종곡(리프트 밸리)'과 해안선은 많은 사람의 마음에 대만에서 가장 아름다운 철도 구간으로 남아 있습니다. 화롄에서 타이둥 사이, 열차는 때로 골짜기로 파고들어 양쪽에 푸릇푸릇한 논과 빈랑나무가 펼쳐지고, 때로는 바닷가를 따라 달려 태평양의 파도가 한 겹 한 겹 해안에 밀려옵니다. 이 일대는 인구가 적고 개발도 덜 되어 넓은 청정 자연이 남아 있습니다. 바라보다 보면 대만 사람들이 자주 말하는 '동부는 대만의 뒷마당(후화원)'이라는 말의 뜻을 알게 됩니다."
      }
    },
    {
      z:"搭火車不能不提「便當」。台鐵便當是台灣鐵道旅行的靈魂，最經典的就是那個圓圓的鐵盒或紙盒，裡面鋪著白飯，上面放一塊滷得油亮的排骨或雞腿，配上滷蛋、酸菜和青菜。火車一開，很多人就迫不及待打開便當，濃濃的滷汁香氣飄滿整個車廂。一邊看著窗外的風景，一邊扒著熱便當，這種簡單的幸福，是很多台灣人共同的回憶。",
      py:"Dā huǒchē bùnéng bù tí “biàndāng”. Táitiě biàndāng shì Táiwān tiědào lǚxíng de línghún, zuì jīngdiǎn de jiùshì nàge yuányuán de tiěhé huò zhǐhé, lǐmiàn pūzhe báifàn, shàngmiàn fàng yí kuài lǔ de yóuliàng de páigǔ huò jītuǐ, pèi shàng lǔdàn, suāncài hé qīngcài. Huǒchē yì kāi, hěnduō rén jiù pòbùjídài dǎkāi biàndāng, nóngnóng de lǔzhī xiāngqì piāo mǎn zhěnggè chēxiāng. Yìbiān kànzhe chuāng wài de fēngjǐng, yìbiān pázhe rè biàndāng, zhè zhǒng jiǎndān de xìngfú, shì hěnduō Táiwānrén gòngtóng de huíyì.",
      m:{
        j:"列車の話をするなら「弁当」を外せません。台鉄弁当は台湾の鉄道旅の魂で、いちばん定番なのはあの丸い金属容器か紙箱。中には白いご飯が敷かれ、その上につやつやに煮込んだ排骨（骨付き豚）か鶏もも肉が一枚、煮玉子や高菜、青菜が添えられています。列車が動き出すと、多くの人が待ちきれずに弁当を開け、濃厚な煮汁の香りが車両いっぱいに広がります。窓の外の景色を眺めながら、温かい弁当をかき込む——このささやかな幸福は、多くの台湾人に共通する思い出です。",
        e:"You can't talk about riding the train without mentioning the 'bento.' The Taiwan Railway bento is the soul of Taiwanese rail travel; the most classic is that round metal tin or paper box, lined with white rice and topped with a glossy braised pork rib or chicken leg, alongside a braised egg, pickled greens, and vegetables. The moment the train pulls out, many people can't wait to open their boxes, and the rich aroma of braising sauce fills the whole carriage. Watching the scenery slide past while shoveling down a hot bento—that simple happiness is a shared memory for many Taiwanese.",
        k:"기차 이야기에서 '도시락'을 빼놓을 수 없습니다. 타이톄 도시락은 대만 철도 여행의 영혼으로, 가장 대표적인 것은 그 둥근 금속 통이나 종이 상자입니다. 안에는 흰밥이 깔리고 그 위에 윤기 나게 조린 갈비나 닭다리 한 조각, 그리고 조림 달걀, 갓지, 채소가 곁들여집니다. 기차가 출발하면 많은 사람이 기다리지 못하고 도시락을 열어, 진한 조림 국물 향이 객차 안 가득 퍼집니다. 창밖 풍경을 바라보며 따뜻한 도시락을 퍼먹는 이 소박한 행복은 많은 대만 사람이 공유하는 추억입니다."
      }
    },
    {
      z:"火車旅行的迷人之處，正在於它的「慢」。你不必自己開車、不用盯著導航，只要靠著窗坐好，就能看著海和山慢慢在眼前展開。可以聽著車輪規律的「哐噹哐噹」聲打個盹，也可以和鄰座的陌生人聊上幾句。如果你剛到台灣，不妨挑一段東部的鐵道，帶著一個便當上車。或許你會發現，最能認識這座島的方式，不是趕行程，而是讓火車帶著你，慢慢地走。",
      py:"Huǒchē lǚxíng de mírén zhī chù, zhèngzài yú tā de “màn”. Nǐ búbì zìjǐ kāichē, búyòng dīngzhe dǎoháng, zhǐyào kàozhe chuāng zuò hǎo, jiù néng kànzhe hǎi hé shān mànmàn zài yǎnqián zhǎnkāi. Kěyǐ tīngzhe chēlún guīlǜ de “kuāngdāng kuāngdāng” shēng dǎ ge dǔn, yě kěyǐ hé línzuò de mòshēngrén liáo shàng jǐ jù. Rúguǒ nǐ gāng dào Táiwān, bùfáng tiāo yí duàn dōngbù de tiědào, dàizhe yí ge biàndāng shàng chē. Huòxǔ nǐ huì fāxiàn, zuì néng rènshi zhè zuò dǎo de fāngshì, búshì gǎn xíngchéng, érshì ràng huǒchē dàizhe nǐ, mànmàn de zǒu.",
      m:{
        j:"列車の旅の魅力は、まさにその「遅さ」にあります。自分で運転する必要も、ナビを気にする必要もなく、窓辺にゆったり座っているだけで、海と山が目の前にゆっくり広がっていきます。車輪の規則正しい「ガタンゴトン」という音を聞きながらうたた寝してもいいし、隣の見知らぬ人と少し言葉を交わしてもいい。台湾に着いたばかりなら、東部の鉄道を一区間選んで、弁当を持って乗ってみてはどうでしょう。この島をいちばんよく知る方法は、予定を詰め込むことではなく、列車に身をあずけて、ゆっくり進むことなのだと気づくかもしれません。",
        e:"The charm of train travel lies precisely in its 'slowness.' You don't have to drive or watch a navigation screen—just settle in by the window and let the sea and mountains unfold slowly before you. You can doze to the regular 'clackety-clack' of the wheels, or trade a few words with the stranger beside you. If you've just arrived in Taiwan, why not pick a stretch of eastern railway and board with a bento in hand? You may find that the best way to know this island isn't rushing through an itinerary, but letting the train carry you along, slowly.",
        k:"기차 여행의 매력은 바로 그 '느림'에 있습니다. 직접 운전할 필요도, 내비게이션을 볼 필요도 없이 창가에 편히 앉아 있기만 하면 바다와 산이 눈앞에 천천히 펼쳐집니다. 바퀴의 규칙적인 '덜컹덜컹' 소리를 들으며 잠깐 졸아도 되고, 옆자리 낯선 사람과 몇 마디 나눠도 됩니다. 대만에 막 도착했다면 동부 철도 한 구간을 골라 도시락을 들고 타 보세요. 이 섬을 가장 잘 아는 방법은 일정을 몰아붙이는 것이 아니라 기차에 몸을 맡기고 천천히 나아가는 것임을 깨닫게 될지도 모릅니다."
      }
    }
  ],
  vocab:[
    { w:"環島", zy:"ㄏㄨㄢˊ ㄉㄠˇ", py:"huándǎo", m:{ j:"島を一周する（台湾一周旅行）", e:"to circle the island (round-island trip)", k:"섬 한 바퀴 돌기(환도)" } },
    { w:"台鐵", zy:"ㄊㄞˊ ㄊㄧㄝˇ", py:"Táitiě", m:{ j:"台湾鉄路（在来線）", e:"Taiwan Railway", k:"대만 철로(재래선)" } },
    { w:"高鐵", zy:"ㄍㄠ ㄊㄧㄝˇ", py:"Gāotiě", m:{ j:"高速鉄道（台湾新幹線）", e:"High Speed Rail", k:"고속철도" } },
    { w:"自強號", zy:"ㄗˋ ㄑㄧㄤˊ ㄏㄠˋ", py:"Zìqiáng hào", m:{ j:"自強号（特急・最速の在来線列車）", e:"Tze-Chiang express (fastest local train)", k:"쯔창호(특급 열차)" } },
    { w:"區間車", zy:"ㄑㄩ ㄐㄧㄢ ㄔㄜ", py:"qūjiānchē", m:{ j:"区間車（各駅停車の通勤電車）", e:"local (all-stops) commuter train", k:"구간차(각역 정차 통근 열차)" } },
    { w:"便當", zy:"ㄅㄧㄢˋ ㄉㄤ", py:"biàndāng", m:{ j:"弁当", e:"boxed meal, bento", k:"도시락" } },
    { w:"排骨", zy:"ㄆㄞˊ ㄍㄨˇ", py:"páigǔ", m:{ j:"排骨（骨付き豚肉・スペアリブ）", e:"pork rib (chop)", k:"갈비·돼지갈비" } },
    { w:"縱谷", zy:"ㄗㄨㄥˋ ㄍㄨˇ", py:"zònggǔ", m:{ j:"縦谷（細長い谷・リフトバレー）", e:"rift valley", k:"종곡·리프트 밸리" } },
    { w:"稻田", zy:"ㄉㄠˋ ㄊㄧㄢˊ", py:"dàotián", m:{ j:"田んぼ・稲田", e:"rice paddy", k:"논" } },
    { w:"山脈", zy:"ㄕㄢ ㄇㄞˋ", py:"shānmài", m:{ j:"山脈", e:"mountain range", k:"산맥" } },
    { w:"車廂", zy:"ㄔㄜ ㄒㄧㄤ", py:"chēxiāng", m:{ j:"車両・客車", e:"train carriage", k:"객차·차량" } },
    { w:"打盹", zy:"ㄉㄚˇ ㄉㄨㄣˇ", py:"dǎdǔn", m:{ j:"うたた寝する・居眠りする", e:"to doze off", k:"깜빡 졸다" } }
  ],
  note:{
    j:"台湾を鉄道で一周する『環島』は、じつは自転車でも人気があり、多くの台湾人が人生の節目に自転車での島一周にチャレンジします（映画やCMの題材にもなりました）。鉄道ファンにとっては、南部の『集集線』や阿里山の登山鉄道など、味わい深いローカル線も見どころ。なお台鉄便当は駅の売店や車内で買えるほか、台北駅などでは持ち帰り用に行列ができることもあり、『鉄道弁当』そのものが一つの名物になっています。",
    e:"Circling Taiwan by rail ('huándǎo') is also hugely popular by bicycle—many Taiwanese take on a round-island cycle ride at milestones in life (it's even been the subject of films and ads). For rail fans, charming local lines like the Jiji Line in the south and the Alishan mountain railway are highlights. Taiwan Railway bentos can be bought at station kiosks or on board, and at stations like Taipei Main there are sometimes queues for takeaway—the 'railway bento' has become a specialty in its own right.",
    k:"기차로 대만을 한 바퀴 도는 '환도'는 사실 자전거로도 인기가 많아, 많은 대만 사람이 인생의 전환점에 자전거 섬 일주에 도전합니다(영화와 광고의 소재가 되기도 했습니다). 철도 팬에게는 남부의 '지지선'이나 아리산 등산 철도 같은 정취 있는 로컬 노선도 볼거리입니다. 타이톄 도시락은 역 매점이나 차내에서 살 수 있고, 타이베이역 등에서는 포장용으로 줄이 서기도 해 '철도 도시락' 자체가 하나의 명물이 되었습니다."
  }
},
{
  id:"taiwan-high-mountains",
  cat:{ j:"自然・旅", e:"Nature & Travel", k:"자연·여행" },
  zhTitle:"台灣的高山：小島上的三千米世界",
  title:{ j:"台湾の高山——小さな島にそびえる三千メートルの世界", e:"Taiwan's High Mountains: A World Above 3,000 Meters on a Small Island", k:"대만의 고산—작은 섬에 솟은 3,000미터의 세계" },
  intro:{
    j:"台湾と聞いて、夜市やグルメを思い浮かべる人は多くても、雲海の上にそびえる三千メートル級の峰々を想像する人は少ないかもしれません。じつはこの小さな島には、富士山より高い山がいくつもあります。なぜ島国にこれほど高い山が並ぶのか、そして台湾ならではの登山文化を、のぞいてみましょう。",
    e:"Say 'Taiwan' and many picture night markets and food, but few imagine peaks over 3,000 meters rising above a sea of clouds. In fact, this small island has many mountains taller than Mount Fuji. Let's explore why an island nation has such towering peaks, and the mountaineering culture unique to Taiwan.",
    k:"'대만'이라고 하면 야시장과 먹거리를 떠올리는 사람은 많아도, 운해 위로 솟은 3,000미터급 봉우리를 상상하는 사람은 드뭅니다. 사실 이 작은 섬에는 후지산보다 높은 산이 여럿 있습니다. 왜 섬나라에 이렇게 높은 산이 늘어서 있는지, 그리고 대만만의 등산 문화를 들여다봅시다."
  },
  paras:[
    {
      z:"很多人對台灣的第一印象是海島、是沙灘、是熱鬧的城市，卻不知道台灣其實是一座「高山之島」。全台灣有超過兩百座海拔三千公尺以上的高山，這在世界的島嶼裡非常罕見。從飛機上往下看，你會發現島的中央幾乎被一整片綠色的山脈佔滿，那就是縱貫南北、被稱為台灣「屋脊」的中央山脈。",
      py:"Hěnduō rén duì Táiwān de dì yī yìnxiàng shì hǎidǎo, shì shātān, shì rènào de chéngshì, què bù zhīdào Táiwān qíshí shì yí zuò “gāoshān zhī dǎo”. Quán Táiwān yǒu chāoguò liǎngbǎi zuò hǎibá sānqiān gōngchǐ yǐshàng de gāoshān, zhè zài shìjiè de dǎoyǔ lǐ fēicháng hǎnjiàn. Cóng fēijī shàng wǎng xià kàn, nǐ huì fāxiàn dǎo de zhōngyāng jīhū bèi yì zhěng piàn lǜsè de shānmài zhànmǎn, nà jiùshì zòngguàn nánběi, bèi chēngwéi Táiwān “wūjǐ” de Zhōngyāng Shānmài.",
      m:{
        j:"多くの人が台湾に対して抱く第一印象は、南の島、砂浜、にぎやかな都市。けれど台湾がじつは「高山の島」であることは、あまり知られていません。台湾全土には標高三千メートルを超える高山が二百座以上あり、これは世界の島々のなかでも極めて珍しいことです。飛行機から見下ろすと、島の中央がほぼ一面の緑の山脈で埋め尽くされているのに気づくでしょう。それが南北を貫き、台湾の「屋根の背（屋脊）」と呼ばれる中央山脈です。",
        e:"Many people's first impression of Taiwan is an ocean isle, sandy beaches, bustling cities—few know that Taiwan is in fact a 'mountain island.' The whole island has more than 200 peaks above 3,000 meters, extraordinarily rare among the world's islands. Looking down from a plane, you'll notice the center is almost entirely filled by a swath of green mountains: the Central Mountain Range, running north to south and known as Taiwan's 'ridgepole.'",
        k:"많은 사람이 대만에 대해 갖는 첫인상은 바다 섬, 모래사장, 번화한 도시입니다. 하지만 대만이 사실 '고산의 섬'이라는 것은 잘 알려지지 않았습니다. 대만 전역에는 해발 3,000미터가 넘는 고산이 200개 넘게 있어, 이는 세계의 섬들 가운데서도 매우 드문 일입니다. 비행기에서 내려다보면 섬의 중앙이 거의 온통 초록빛 산맥으로 뒤덮여 있음을 알게 됩니다. 그것이 남북을 관통하며 대만의 '지붕 마루(屋脊)'라 불리는 중앙산맥입니다."
      }
    },
    {
      z:"為什麼一座面積不算大的島，會有這麼多高山？答案藏在地底下。台灣正好位在歐亞板塊和菲律賓海板塊的交界，兩塊巨大的板塊長年互相推擠，把原本在海底的地層一點一點往上頂，硬是擠出了一整排高聳的山脈。這股力量到現在都還沒停，台灣的山其實每年都還在悄悄「長高」，同時也讓這裡地震頻繁。",
      py:"Wèishénme yí zuò miànjī bú suàn dà de dǎo, huì yǒu zhème duō gāoshān? Dá'àn cáng zài dìdǐ xià. Táiwān zhènghǎo wèi zài Ōuyà bǎnkuài hé Fēilǜbīn hǎi bǎnkuài de jiāojiè, liǎng kuài jùdà de bǎnkuài chángnián hùxiāng tuījǐ, bǎ yuánběn zài hǎidǐ de dìcéng yìdiǎn yìdiǎn wǎng shàng dǐng, yìngshì jǐ chū le yì zhěng pái gāosǒng de shānmài. Zhè gǔ lìliàng dào xiànzài dōu hái méi tíng, Táiwān de shān qíshí měinián dōu hái zài qiāoqiāo “zhǎng gāo”, tóngshí yě ràng zhèlǐ dìzhèn pínfán.",
      m:{
        j:"面積がそれほど大きくない島に、なぜこれほど多くの高山があるのでしょう。答えは地下に隠れています。台湾はちょうどユーラシアプレートとフィリピン海プレートの境界に位置し、二つの巨大なプレートが長年にわたって互いに押し合い、もともと海底にあった地層を少しずつ上へ押し上げ、高くそびえる山脈を丸ごと一列、無理やり隆起させました。この力は今なお止まっておらず、台湾の山はじつは毎年ひそかに「背を伸ばし」続けており、同時にこの地に地震が多い理由にもなっています。",
        e:"Why would an island of modest size have so many high mountains? The answer lies underground. Taiwan sits right at the boundary of the Eurasian and Philippine Sea plates; these two vast plates have pushed against each other for ages, shoving what was once seabed strata upward bit by bit, forcing up an entire row of soaring ranges. That force hasn't stopped even now—Taiwan's mountains are actually still quietly 'growing taller' each year, which is also why earthquakes here are frequent.",
        k:"면적이 그리 크지 않은 섬에 왜 이렇게 고산이 많을까요? 답은 지하에 숨어 있습니다. 대만은 마침 유라시아판과 필리핀해판의 경계에 있어, 두 거대한 판이 오랜 세월 서로 밀어붙이며 원래 해저에 있던 지층을 조금씩 위로 밀어 올려 높이 솟은 산맥을 통째로 한 줄 융기시켰습니다. 이 힘은 지금도 멈추지 않아 대만의 산은 사실 해마다 조용히 '키가 자라고' 있으며, 동시에 이곳에 지진이 잦은 이유이기도 합니다."
      }
    },
    {
      z:"台灣最高的山，是海拔三千九百五十二公尺的「玉山」。它不只是台灣第一高峰，也比日本的富士山還要高，是許多台灣人心中的精神象徵，連新台幣一千元鈔票上都印著它。爬上玉山主峰、在山頂看日出，是很多台灣登山客一生的夢想。清晨天還沒亮就摸黑往上爬，等到太陽從雲海裡緩緩升起，那一刻的感動，讓再累的雙腿都值得了。",
      py:"Táiwān zuì gāo de shān, shì hǎibá sānqiān jiǔbǎi wǔshí'èr gōngchǐ de “Yùshān”. Tā bùzhǐ shì Táiwān dì yī gāofēng, yě bǐ Rìběn de Fùshìshān hái yào gāo, shì xǔduō Táiwānrén xīnzhōng de jīngshén xiàngzhēng, lián xīn Táibì yìqiān yuán chāopiào shàng dōu yìnzhe tā. Pá shàng Yùshān zhǔfēng, zài shāndǐng kàn rìchū, shì hěnduō Táiwān dēngshānkè yìshēng de mèngxiǎng. Qīngchén tiān hái méi liàng jiù mōhēi wǎng shàng pá, děngdào tàiyáng cóng yúnhǎi lǐ huǎnhuǎn shēngqǐ, nà yí kè de gǎndòng, ràng zài lèi de shuāngtuǐ dōu zhídé le.",
      m:{
        j:"台湾で最も高い山は、標高三千九百五十二メートルの「玉山（ぎょくざん／ユーシャン）」です。台湾一の高峰であるだけでなく、日本の富士山よりも高く、多くの台湾人にとって心の拠りどころとなる精神的な象徴で、千台湾ドル紙幣にもその姿が刷られています。玉山の主峰に登り、山頂で日の出を見ることは、多くの台湾の登山者にとって一生の夢。夜明け前、まだ暗いうちからヘッドライトを頼りに登り、太陽が雲海のなかからゆっくりと昇ってくる——その瞬間の感動が、どんなに疲れた両脚をも報いてくれます。",
        e:"Taiwan's highest mountain is Yushan (Jade Mountain), at 3,952 meters. It's not only Taiwan's tallest peak but also higher than Japan's Mount Fuji, and a spiritual symbol for many Taiwanese—it's even printed on the NT$1,000 bill. Climbing to Yushan's main summit to watch the sunrise is a lifelong dream for many Taiwanese hikers. You set off in the dark before dawn, and when the sun rises slowly out of the sea of clouds, the emotion of that moment makes even the weariest legs worth it.",
        k:"대만에서 가장 높은 산은 해발 3,952미터의 '위산(玉山)'입니다. 대만 최고봉일 뿐 아니라 일본의 후지산보다도 높아, 많은 대만 사람의 정신적 상징이며 1,000 대만달러 지폐에도 그 모습이 인쇄되어 있습니다. 위산 주봉에 올라 정상에서 일출을 보는 것은 많은 대만 등산객의 평생 꿈입니다. 동트기 전 아직 어두울 때 헤드랜턴에 의지해 오르다가 태양이 운해 속에서 천천히 떠오르는 그 순간의 감동은, 아무리 지친 두 다리도 보상해 줍니다."
      }
    },
    {
      z:"在台灣的登山圈裡，有一個特別的名詞叫「百岳」。這是前輩登山家從三千公尺以上的高山中，挑選出來的一百座代表性山峰，每一座都有自己的特色和難度。對很多熱愛爬山的台灣人來說，「完百」（爬完全部一百座）是一個崇高的目標，可能要花上好幾年、甚至一輩子去慢慢累積。這份名單，也成了台灣登山文化裡一張獨特的「藏寶圖」。",
      py:"Zài Táiwān de dēngshān quān lǐ, yǒu yí ge tèbié de míngcí jiào “bǎiyuè”. Zhè shì qiánbèi dēngshānjiā cóng sānqiān gōngchǐ yǐshàng de gāoshān zhōng, tiāoxuǎn chūlái de yìbǎi zuò dàibiǎoxìng shānfēng, měi yí zuò dōu yǒu zìjǐ de tèsè hé nándù. Duì hěnduō rè'ài páshān de Táiwānrén lái shuō, “wánbǎi” (pá wán quánbù yìbǎi zuò) shì yí ge chónggāo de mùbiāo, kěnéng yào huā shàng hǎojǐ nián, shènzhì yíbèizi qù mànmàn lěijī. Zhè fèn míngdān, yě chéng le Táiwān dēngshān wénhuà lǐ yì zhāng dútè de “cángbǎo tú”.",
      m:{
        j:"台湾の登山界には、「百岳（ひゃくがく）」という特別な言葉があります。これは先輩の登山家たちが、標高三千メートル以上の高山のなかから選び出した百の代表的な山々のこと。一座ごとに独自の個性と難易度があります。登山を愛する多くの台湾人にとって、「完百（百座すべてを登り切る）」は崇高な目標であり、達成には何年も、ときには一生をかけて少しずつ積み上げていくことになります。このリストは、台湾の登山文化における独特の「宝の地図」にもなっているのです。",
        e:"In Taiwan's mountaineering community there's a special term: the 'Baiyue,' or Hundred Peaks. Veteran climbers selected one hundred representative summits from among the mountains over 3,000 meters, each with its own character and difficulty. For many Taiwanese who love climbing, 'completing the Hundred' (climbing all one hundred) is a lofty goal that may take years—even a lifetime—to accumulate. This list has become a unique 'treasure map' within Taiwan's mountaineering culture.",
        k:"대만 등산계에는 '백악(百岳)'이라는 특별한 말이 있습니다. 이는 선배 산악인들이 해발 3,000미터 이상의 고산 가운데서 골라낸 대표적인 봉우리 100개로, 저마다 고유한 개성과 난이도를 지닙니다. 등산을 사랑하는 많은 대만 사람에게 '완백(100개를 모두 오르기)'은 숭고한 목표이며, 달성하려면 몇 년, 때로는 평생에 걸쳐 조금씩 쌓아 가야 합니다. 이 목록은 대만 등산 문화에서 독특한 '보물 지도'가 되었습니다."
      }
    },
    {
      z:"高山不只養出了登山文化，也孕育出台灣有名的「高山茶」。在一千五百公尺以上的山坡上，日夜溫差大、常年雲霧繚繞，茶樹生長得慢，長出來的葉子特別柔嫩、香氣清雅。梨山、阿里山、杉林溪這些高山茶區，泡出來的烏龍茶入口甘醇、喉韻回甘，是很多人送禮的首選。可以說，台灣的高山把「高度」直接變成了杯子裡的味道。",
      py:"Gāoshān bùzhǐ yǎng chū le dēngshān wénhuà, yě yùnyù chū Táiwān yǒumíng de “gāoshān chá”. Zài yìqiān wǔbǎi gōngchǐ yǐshàng de shānpō shàng, rìyè wēnchā dà, chángnián yúnwù liáorào, cháshù shēngzhǎng de màn, zhǎng chūlái de yèzi tèbié róunèn, xiāngqì qīngyǎ. Líshān, Ālǐshān, Shānlínxī zhèxiē gāoshān chá qū, pào chūlái de wūlóngchá rùkǒu gānchún, hóuyùn huígān, shì hěnduō rén sònglǐ de shǒuxuǎn. Kěyǐ shuō, Táiwān de gāoshān bǎ “gāodù” zhíjiē biànchéng le bēizi lǐ de wèidào.",
      m:{
        j:"高山は登山文化を育んだだけでなく、台湾で有名な「高山茶」も生み出しました。標高千五百メートル以上の斜面では、昼夜の寒暖差が大きく、一年を通して雲霧が立ちこめるため、茶の木の生育はゆっくり。育った葉はとりわけ柔らかく、香りは清らかで上品です。梨山、阿里山、杉林渓といった高山茶の産地で淹れる烏龍茶は、口当たりがまろやかで、飲んだあとに喉の奥から甘みが戻ってくる（回甘）。贈り物の定番として多くの人に選ばれています。台湾の高山は、「標高」をそのまま茶碗のなかの味わいに変えている、といってもいいでしょう。",
        e:"The high mountains didn't just nurture a climbing culture—they also gave rise to Taiwan's famous 'high-mountain tea.' On slopes above 1,500 meters, with big day-night temperature swings and clouds and mist wrapping the hills year-round, tea bushes grow slowly, and the leaves they produce are especially tender with a delicate, refined fragrance. The oolong brewed from high-mountain tea areas like Lishan, Alishan, and Shanlinxi is mellow on the palate with a sweet aftertaste rising in the throat, making it a top choice for gifts. You could say Taiwan's high mountains turn 'altitude' directly into the flavor in your cup.",
        k:"고산은 등산 문화를 길러 냈을 뿐 아니라 대만의 유명한 '고산차'도 낳았습니다. 해발 1,500미터 이상의 비탈에서는 밤낮의 기온 차가 크고 일 년 내내 구름과 안개가 감돌아 차나무가 천천히 자라며, 자라난 잎은 유난히 부드럽고 향이 맑고 우아합니다. 리산, 아리산, 산린시 같은 고산차 산지에서 우린 우롱차는 입에 감도는 맛이 부드럽고 마신 뒤 목 안쪽에서 단맛이 돌아와, 많은 사람이 선물로 첫손에 꼽습니다. 대만의 고산은 '높이'를 그대로 찻잔 속 맛으로 바꾼다고 할 수 있습니다."
      }
    },
    {
      z:"對台灣人來說，高山早已不只是遠方的風景，而是一種可以親近的生活。假日開車上合歡山看雲海、賞星空，或是花好幾天縱走一段稜線，早就是很多家庭和年輕人的共同記憶。近年來政府也逐步開放山林、鼓勵大家安全地走進山裡。如果你有機會來台灣，不妨抬頭看看那些藏在雲後的山峰——它們安靜地站在島的中央，提醒著你：這座島，遠比你想像的還要立體、還要遼闊。",
      py:"Duì Táiwānrén lái shuō, gāoshān zǎoyǐ bùzhǐ shì yuǎnfāng de fēngjǐng, érshì yì zhǒng kěyǐ qīnjìn de shēnghuó. Jiàrì kāichē shàng Héhuānshān kàn yúnhǎi, shǎng xīngkōng, huòshì huā hǎojǐ tiān zòngzǒu yí duàn língxiàn, zǎo jiùshì hěnduō jiātíng hé niánqīngrén de gòngtóng jìyì. Jìnnián lái zhèngfǔ yě zhúbù kāifàng shānlín, gǔlì dàjiā ānquán de zǒu jìn shān lǐ. Rúguǒ nǐ yǒu jīhuì lái Táiwān, bùfáng táitóu kànkan nàxiē cáng zài yún hòu de shānfēng——tāmen ānjìng de zhàn zài dǎo de zhōngyāng, tíxǐngzhe nǐ: zhè zuò dǎo, yuǎn bǐ nǐ xiǎngxiàng de hái yào lìtǐ, hái yào liáokuò.",
      m:{
        j:"台湾人にとって、高山はもはや遠い風景ではなく、身近に親しめる暮らしの一部です。休日に車で合歡山（ごうかんざん）へ上って雲海を眺め星空を楽しんだり、何日もかけて稜線を縦走したりすることは、多くの家庭や若者にとって共通の思い出になっています。近年は政府も少しずつ山林を開放し、みんなが安全に山へ入ることを後押ししています。もし台湾に来る機会があれば、雲の向こうに隠れた峰々を、ぜひ見上げてみてください。それらは島の中央に静かにそびえ、あなたにこう告げているのです——この島は、あなたが想像するよりもずっと立体的で、ずっと広いのだ、と。",
        e:"For Taiwanese, the high mountains long ago became not a distant view but a way of life within reach. Driving up Hehuanshan on a day off to watch the sea of clouds and stargaze, or traversing a ridgeline over several days, has become a shared memory for many families and young people. In recent years the government has gradually opened up the mountains and forests, encouraging everyone to head into them safely. If you get the chance to come to Taiwan, do look up at those peaks hidden behind the clouds—they stand quietly at the island's heart, reminding you that this island is far more three-dimensional, and far vaster, than you imagined.",
        k:"대만 사람에게 고산은 이미 먼 풍경이 아니라 가까이서 누릴 수 있는 삶의 일부입니다. 휴일에 차로 허환산에 올라 운해를 바라보고 별을 감상하거나, 며칠에 걸쳐 능선을 종주하는 것은 많은 가정과 젊은이의 공통된 추억이 되었습니다. 최근에는 정부도 차츰 산림을 개방해 모두가 안전하게 산으로 들어가도록 장려하고 있습니다. 대만에 올 기회가 있다면 구름 뒤에 숨은 봉우리들을 꼭 올려다보세요. 그것들은 섬 한가운데 조용히 솟아 이렇게 일러 줍니다—이 섬은 당신이 상상하는 것보다 훨씬 입체적이고 훨씬 광활하다고요."
      }
    }
  ],
  vocab:[
    { w:"高山", zy:"ㄍㄠ ㄕㄢ", py:"gāoshān", m:{ j:"高山", e:"high mountain", k:"고산" } },
    { w:"玉山", zy:"ㄩˋ ㄕㄢ", py:"Yùshān", m:{ j:"玉山（台湾最高峰、3,952m）", e:"Yushan (Jade Mountain, Taiwan's highest)", k:"위산(대만 최고봉)" } },
    { w:"百岳", zy:"ㄅㄞˇ ㄩㄝˋ", py:"bǎiyuè", m:{ j:"百岳（台湾を代表する100の高山）", e:"the Hundred Peaks (Baiyue)", k:"백악(대만 대표 고산 100좌)" } },
    { w:"海拔", zy:"ㄏㄞˇ ㄅㄚˊ", py:"hǎibá", m:{ j:"海抜・標高", e:"elevation, altitude", k:"해발·고도" } },
    { w:"山脈", zy:"ㄕㄢ ㄇㄞˋ", py:"shānmài", m:{ j:"山脈", e:"mountain range", k:"산맥" } },
    { w:"板塊", zy:"ㄅㄢˇ ㄎㄨㄞˋ", py:"bǎnkuài", m:{ j:"プレート（地殻の板）", e:"tectonic plate", k:"판·지각판" } },
    { w:"雲海", zy:"ㄩㄣˊ ㄏㄞˇ", py:"yúnhǎi", m:{ j:"雲海", e:"sea of clouds", k:"운해" } },
    { w:"日出", zy:"ㄖˋ ㄔㄨ", py:"rìchū", m:{ j:"日の出", e:"sunrise", k:"일출" } },
    { w:"登山", zy:"ㄉㄥ ㄕㄢ", py:"dēngshān", m:{ j:"登山・山登り", e:"mountain climbing, hiking", k:"등산" } },
    { w:"高山茶", zy:"ㄍㄠ ㄕㄢ ㄔㄚˊ", py:"gāoshān chá", m:{ j:"高山茶", e:"high-mountain tea", k:"고산차" } },
    { w:"稜線", zy:"ㄌㄥˊ ㄒㄧㄢˋ", py:"língxiàn", m:{ j:"稜線・尾根", e:"ridgeline", k:"능선" } },
    { w:"回甘", zy:"ㄏㄨㄟˊ ㄍㄢ", py:"huígān", m:{ j:"回甘（後から戻ってくる甘み）", e:"sweet aftertaste", k:"회감(뒷맛의 단맛)" } }
  ],
  note:{
    j:"台湾の百岳には、初心者でも比較的登りやすい山から、経験者向けの難関まで幅があります。人気の合歡山は車道が標高三千メートル付近まで通じており、『台湾でいちばん近づきやすい三千メートル峰』として、日の出や雪(冬にはうっすら積もることも)を見に多くの人が訪れます。玉山などの主要な高山は、生態系保護と安全のため入山に事前申請と抽選が必要で、山小屋の予約もいります。近年は無理な単独行や準備不足による遭難も問題になっており、『安全に、山に敬意を持って』というのが台湾登山界の合言葉です。",
    e:"Taiwan's Hundred Peaks range from mountains fairly easy even for beginners to tough climbs for the experienced. Popular Hehuanshan has a road reaching near 3,000 meters, making it the 'most accessible 3,000-meter peak in Taiwan,' drawing crowds for sunrises and even snow (which occasionally dusts it in winter). Major high peaks like Yushan require advance application and a lottery for entry—plus mountain-hut reservations—for the sake of ecological protection and safety. In recent years, reckless solo trips and poor preparation leading to accidents have become a concern, and 'climb safely, with respect for the mountains' is a watchword of Taiwan's mountaineering community.",
    k:"대만의 백악에는 초보자도 비교적 오르기 쉬운 산부터 경험자를 위한 난코스까지 폭이 넓습니다. 인기 있는 허환산은 차도가 해발 3,000미터 부근까지 이어져 '대만에서 가장 접근하기 쉬운 3,000미터 봉우리'로, 일출이나 눈(겨울에 살짝 쌓이기도)을 보러 많은 사람이 찾습니다. 위산 등 주요 고산은 생태계 보호와 안전을 위해 입산에 사전 신청과 추첨이 필요하고 산장 예약도 해야 합니다. 최근에는 무리한 단독 산행과 준비 부족으로 인한 조난도 문제가 되어, '안전하게, 산을 존중하며'가 대만 등산계의 표어입니다."
  }
}
];
if (typeof module !== "undefined") module.exports = { ARTICLES_5 };
