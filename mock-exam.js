// StayTW Study — 模擬試験（StayJP Study の mock-exam.js と同じ構成の TOCFL 風ミニ模試）
// 構成: 詞彙 8問 → 語法 6問 → 閱讀 2〜3問 / 制限時間つき / 結果は stw_exam_history に保存
// 間違えた単語は SRS に「不正解」として記録 → 復習キューに自動で入る
const MockExam = (() => {
  // ── 閱讀 題庫（レベル別・本文も設問も中国語 = 本試験と同じ形式）──
  const PASSAGES = {
    l1: [
      {text:"我叫小美，我是學生。我家有四個人：爸爸、媽媽、哥哥和我。爸爸是醫生，媽媽是老師。",q:"小美的媽媽做什麼工作？",opts:["醫生","老師","學生","工程師"],ans:1},
      {text:"今天天氣很好。我和朋友去夜市。我們吃了小籠包，還喝了珍珠奶茶。東西很好吃，可是人很多。",q:"他們在夜市做了什麼？",opts:["買衣服","看電影","吃東西","唱歌"],ans:2},
      {text:"我每天早上七點起床，坐捷運去公司。捷運站離我家很近，走路五分鐘就到了。",q:"他怎麼去公司？",opts:["開車","坐捷運","坐公車","騎機車"],ans:1},
      {text:"這是我的貓，牠叫小黑。小黑今年三歲，最喜歡吃魚。牠每天都睡很久。",q:"小黑最喜歡吃什麼？",opts:["飯","魚","水果","麵"],ans:1},
      {text:"下星期六是媽媽的生日。我想買一個蛋糕，晚上大家一起吃飯。",q:"下星期六是誰的生日？",opts:["爸爸","媽媽","哥哥","我"],ans:1},
      {text:"我叫田中，是日本人。我住在台北，在學校學中文。我喜歡台灣，這裡的人很好。我每天早上七點起床，八點去上課。",q:"田中每天早上幾點起床？",opts:["六點","七點","八點","九點"],ans:1,why:"短文說「我每天早上七點起床」，八點是去上課的時間。"},
      {text:"今天天氣很好，太陽很大，不會下雨。我和朋友一起去公園走路。公園裡有很多花，很漂亮，我們玩得很開心。",q:"今天天氣怎麼樣？",opts:["下雨","天氣很好","很冷","下雪"],ans:1,why:"短文說「今天天氣很好，太陽很大，不會下雨」。"},
      {text:"我很喜歡運動。星期六我常常去打籃球，星期天我去游泳。我的朋友喜歡看電影，可是我覺得運動比較好玩。",q:"這個人星期天做什麼？",opts:["打籃球","游泳","看電影","走路"],ans:1,why:"短文說「星期天我去游泳」，打籃球是星期六的事。"},
      {text:"我家附近有一家便利商店，很方便。我常常去那裡買早餐和牛奶。我用悠遊卡付錢，不用帶零錢。便利商店二十四小時都開。",q:"這個人用什麼付錢？",opts:["現金","悠遊卡","信用卡","零錢"],ans:1,why:"短文說「我用悠遊卡付錢，不用帶零錢」。"},
    ],
    l2: [
      {text:"小林上個月搬家了。新房子離捷運站很近，房租也不貴，可是房間有一點小。他打算買一個小一點的桌子。",q:"新房子有什麼問題？",opts:["房租太貴","離捷運站太遠","房間有一點小","沒有冷氣"],ans:2},
      {text:"明天有颱風，公司通知大家不用上班。小王本來要和朋友去爬山，現在只好在家休息。他覺得有一點無聊。",q:"小王明天為什麼不去爬山？",opts:["他要上班","因為颱風","他生病了","朋友沒空"],ans:1},
      {text:"台灣的垃圾車會放音樂。聽到音樂，大家就把垃圾拿出來，等垃圾車來。第一次看到的外國人都覺得很有趣。",q:"聽到垃圾車的音樂，大家會做什麼？",opts:["開始唱歌","把垃圾拿出來","關窗戶","去買冰淇淋"],ans:1},
      {text:"小美感冒了，頭很痛，還有一點發燒。她去藥局買藥，藥師說要多喝水、早點睡覺。",q:"藥師建議小美做什麼？",opts:["多運動","多喝水、早點睡覺","去旅行","吃冰"],ans:1},
      {text:"我家附近新開了一家早餐店，蛋餅特別好吃，而且不貴。現在我每天上班以前都會去買。",q:"他為什麼每天去那家早餐店？",opts:["離公司很近","蛋餅好吃又不貴","老闆是他朋友","只有那一家店"],ans:1},
      {text:"王先生下個星期要搬到台北工作，所以在網路上找房子。他找到一間套房，離捷運站走路只要五分鐘，房租一個月一萬兩千元。房間裡有冷氣、桌子和床，很方便。他覺得價錢還可以，就打電話跟房東約時間去看房子。",q:"王先生找的套房離捷運站多遠？",opts:["走路五分鐘","走路二十分鐘","坐車五分鐘","走路半個小時"],ans:0,why:"文中說套房離捷運站走路只要五分鐘。"},
      {text:"昨天陳小姐要去火車站，本來想坐公車，可是她等了很久，公車都沒有來。後來她看時間快來不及了，就改坐計程車。雖然計程車比較貴，可是很快就到了。她提醒自己，下次要早一點出門，才不會這麼緊張。",q:"陳小姐最後怎麼去火車站？",opts:["坐公車","坐計程車","坐捷運","走路去"],ans:1,why:"公車一直沒來，她改坐計程車去火車站。"},
      {text:"今天超市的水果特價，蘋果一斤只要三十元，比平常便宜很多。林太太買了兩斤蘋果，還買了一些青菜和牛奶。回家的時候，她才發現忘了買雞蛋，只好明天再去一次。她想，下次要先寫好要買的東西，才不會忘記。",q:"林太太今天忘了買什麼？",opts:["蘋果","青菜","牛奶","雞蛋"],ans:3,why:"回家後她發現忘了買雞蛋，要明天再去買。"},
      {text:"早上出門的時候天氣很好，太陽很大，所以小明沒有帶雨傘。下午三點左右，天空突然變黑，開始下大雨。小明沒有傘，只好先在便利商店等雨停。等了半個小時，雨還是很大，他只好買了一把新的雨傘才回家。",q:"小明為什麼買了一把新雨傘？",opts:["舊的雨傘壞了","早上沒帶傘又遇到下大雨","想送給朋友","雨傘剛好特價"],ans:1,why:"他早上沒帶傘，下午下大雨等不到停，只好買新傘。"},
    ],
    l3: [
      {text:"很多公司開始讓員工在家工作。有人覺得在家工作很方便，不用花時間通勤；可是也有人覺得在家容易分心，工作效率反而變差。",q:"反對在家工作的人的理由是什麼？",opts:["通勤太累","容易分心","薪水變少","沒有網路"],ans:1},
      {text:"小陳最近壓力很大，常常熬夜加班，連週末都要開會。醫生建議他多運動、早點睡覺，不要把工作帶回家。",q:"醫生沒有建議哪一件事？",opts:["多運動","早點睡覺","換工作","不要把工作帶回家"],ans:2},
      {text:"在台灣租房子，除了房租以外，通常還要付兩個月的押金。簽約以前，最好先確認冷氣、熱水器這些設備能不能正常使用，以免之後和房東發生糾紛。",q:"這段話主要在提醒什麼？",opts:["房租越便宜越好","簽約前要確認設備","押金不用付","要跟房東當朋友"],ans:1},
      {text:"台灣的便利商店什麼都能做：繳水電費、取包裹、買高鐵票，甚至還能影印。對外國人來說，只要學會幾句中文，生活就會方便很多。",q:"這段話主要在說什麼？",opts:["便利商店的東西很貴","便利商店功能很多，生活很方便","外國人不需要學中文","高鐵票很難買"],ans:1},
      {text:"小林第一次參加公司的尾牙。同事告訴他，尾牙就是年底公司請大家吃飯，還會抽獎。聽說今年的大獎是一台機車，大家都很期待。",q:"關於尾牙，哪一個是對的？",opts:["是年初的活動","只有主管參加","會請大家吃飯和抽獎","大獎是一台電腦"],ans:2},
      {text:"最近很多公司開始重視員工的健康，除了提供健保之外，也鼓勵大家別常常加班。以前小玲每天都工作到晚上九點，回家後累得什麼都不想做。後來主管規定六點一定要下班，她才發現自己多了很多時間運動、看書。她說，工作雖然重要，但把身體弄壞了就得不償失，公司願意改變真的很好。",q:"這篇短文主要想說什麼？",opts:["加班可以領到更多薪水","公司開始重視員工的健康與休息","小玲不喜歡運動和看書","健保的費用越來越貴"],ans:1,why:"全文圍繞公司規定準時下班、重視員工健康。"},
      {text:"很多台灣的父母下班後還要送孩子去補習班。他們覺得學校教的不夠，多補一點英文或數學，將來考試才有把握。不過也有人有不同看法，認為孩子每天上課已經很累，晚上還要補習，根本沒時間休息和玩。與其花錢補習，不如讓孩子多睡覺、培養自己有興趣的事。",q:"根據這篇短文，反對補習的人為什麼這麼想？",opts:["補習班的老師教得不好","補習的費用實在太貴了","孩子太累、沒時間休息","學校的考試已經取消了"],ans:2,why:"文中反對者認為孩子上課已很累、晚上補習沒時間休息。"},
      {text:"為了保護環境，台灣的便利商店和超市現在都不免費提供塑膠袋了，想要的話得另外花錢買。剛開始很多人覺得麻煩，常常忘記帶袋子。但過了一段時間，大家漸漸習慣出門前先把環保袋放進包包。雖然只是一個小小的改變，累積起來卻能減少很多垃圾。",q:"關於現在買東西時的塑膠袋，下列哪一項正確？",opts:["商店完全不提供塑膠袋","想要塑膠袋必須另外付錢","只有超市才需要付錢買","塑膠袋比以前更便宜了"],ans:1,why:"文中說塑膠袋不再免費，想要得另外花錢買。"},
      {text:"小美租房子住了兩年，最近要搬家。房東當初收了她兩個月的押金，說退房時如果房子沒有損壞就會全部退還。搬家那天，房東仔細檢查了牆壁和家具，確認一切都好，就把押金還給了她。小美提醒朋友，租屋前一定要把押金的規定問清楚，並把房子的狀況拍照留著，以免以後有爭議。",q:"小美為什麼能拿回全部的押金？",opts:["因為她多住了兩年","因為房子沒有損壞","因為她和房東是朋友","因為她多付了房租"],ans:1,why:"房東檢查後確認房子沒損壞，才全額退還押金。"},
    ],
    l4: [
      {text:"根據調查，台灣的少子化問題越來越嚴重，去年的出生人數再創新低。專家指出，高房價與低薪資是年輕人不敢生小孩的主要原因，政府雖然推出多項補助政策，效果卻相當有限。",q:"專家認為少子化的主要原因是什麼？",opts:["教育程度提高","高房價與低薪資","醫療資源不足","補助政策太多"],ans:1},
      {text:"隨著環保意識抬頭，越來越多店家不再提供免費塑膠袋，民眾也逐漸習慣自備購物袋。研究顯示，這項政策實施後，塑膠袋的使用量大幅減少，對環境的負擔明顯降低。",q:"這段話的主旨是什麼？",opts:["塑膠袋越來越便宜","環保政策產生了效果","店家生意變差","民眾反對新政策"],ans:1},
      {text:"報導指出，隨著遠距工作普及，台北市中心的辦公室空置率逐漸上升，部分企業改採混合辦公模式，以降低租金成本。專家認為，這個趨勢短期內不會改變。",q:"企業採用混合辦公的目的是什麼？",opts:["提高員工薪資","降低租金成本","增加辦公空間","吸引外國人才"],ans:1},
      {text:"調查顯示，超過六成的民眾支持延長超商的垃圾代收服務。不過也有學者提醒，垃圾處理成本不應該完全轉嫁給業者，政府應該提出配套措施。",q:"學者的觀點是什麼？",opts:["應該取消這項服務","成本不應全由業者承擔","民眾不支持這項政策","超商應該漲價"],ans:1},
      {text:"根據內政部統計，台灣六十五歲以上人口比例持續攀升，早已跨過「高齡社會」的門檻，並朝「超高齡社會」邁進。專家指出，人口老化不只是醫療照護的負擔，更牽動整體勞動力的結構。近年許多企業開始延長員工的退休年齡，並重新聘用具經驗的資深人力，以彌補年輕勞動力不足的缺口。學者認為，若能善用高齡者的專業與經驗，反而可能成為社會的一項資產，而非單純的成本。",q:"根據本文，學者對高齡人口的看法為何？",opts:["高齡者應盡早退休以讓位給年輕人","妥善運用高齡者的經驗可能成為社會資產","人口老化只會造成醫療上的負擔","企業不應再聘用資深員工"],ans:1,why:"文末明確指出善用高齡者專業經驗可能成為社會資產。"},
      {text:"為了減少對進口化石燃料的依賴，政府近年積極推動再生能源，包括太陽光電與離岸風電。根據能源主管機關的規劃，未來再生能源在總發電量中的占比將逐年提高。不過，也有專家提醒，太陽能與風力發電容易受天候影響，供電較不穩定，因此仍需搭配儲能設備與其他發電方式，才能維持電力調度的彈性。如何在減碳目標與供電穩定之間取得平衡，是政策推動時必須面對的課題。",q:"根據本文，專家提醒再生能源的主要限制是什麼？",opts:["建設成本過於低廉","發電量完全無法計算","容易受天候影響，供電較不穩定","會增加對進口燃料的依賴"],ans:2,why:"文中專家指出太陽能與風力易受天候影響、供電較不穩定。"},
      {text:"近年來，台灣各縣市積極發展在地觀光，除了推廣自然風景，也結合地方特色小吃與傳統文化。根據觀光相關單位的調查，越來越多旅客不再只是走馬看花，而是希望深入體驗當地生活，例如參加農事活動或學習手工藝。這種「深度旅遊」的趨勢，讓不少偏鄉小鎮獲得新的發展機會。不過，也有居民擔心，若遊客人數暴增卻缺乏妥善規劃，反而可能破壞原有的環境與生活步調。",q:"根據本文，下列何者「不是」文中提到的內容？",opts:["旅客越來越傾向深度體驗當地生活","深度旅遊為偏鄉帶來發展機會","居民擔心遊客暴增可能破壞環境","政府已決定限制各地遊客的人數"],ans:3,why:"文中未提及政府決定限制遊客人數，其餘三項皆有敘述。"},
      {text:"為了改善都市交通與空氣品質，各大城市持續擴建捷運與公車路網，並鼓勵民眾多搭乘大眾運輸。然而，專家指出，光是增加路線並不足以吸引民眾改變習慣，關鍵在於「轉乘」是否便利。如果從家裡到車站、再從車站到目的地的接駁不夠順暢，許多人仍會選擇騎機車或開車。因此，近年不少地方政府開始整合公共自行車、公車與捷運的票證與班次，希望讓整段旅程更加無縫接軌。",q:"根據本文，專家認為吸引民眾使用大眾運輸的關鍵是什麼？",opts:["不斷降低票價","轉乘與接駁是否便利順暢","全面禁止民眾騎乘機車","只要增加捷運路線即可"],ans:1,why:"文中專家強調關鍵在於轉乘是否便利、接駁是否順暢。"},
    ],
    l5: [
      {text:"有學者認為，語言不僅是溝通的工具，更承載著一個族群的歷史與價值觀。倘若一種語言消失，隨之而去的往往是整個文化的記憶。因此，母語的傳承與其說是語言問題，不如說是文化認同的課題。",q:"作者認為母語傳承的本質是什麼？",opts:["溝通技巧的訓練","文化認同的課題","教育資源的分配","觀光產業的需求"],ans:1},
      {text:"企業在追求利潤之餘，勢必得兼顧社會責任。消費者的價值觀已然改變：一個品牌倘若忽視環境與勞工權益，縱使產品再優秀，也難以獲得長期的信任。",q:"這段話認為品牌要獲得長期信任，關鍵是什麼？",opts:["產品夠優秀","價格夠便宜","兼顧社會責任","廣告做得好"],ans:2},
      {text:"所謂「無現金社會」，在台灣的推行始終不如預期。學者分析，這固然與民眾的使用習慣有關，但更深層的原因在於小型店家對手續費的顧慮，以及部分消費者對個資外洩的疑慮。",q:"根據本文，推行不順的原因不包括哪一項？",opts:["店家在意手續費","消費者擔心個資外洩","民眾的使用習慣","政府全面禁止行動支付"],ans:3},
      {text:"文化評論者指出，台灣的夜市不僅是飲食場所，更承載著庶民生活的集體記憶。倘若只以衛生或市容的角度看待夜市，未免忽略了其作為文化資產的價值。",q:"作者對夜市的看法是什麼？",opts:["應該全面改建","只是吃東西的地方","是有文化價值的庶民空間","衛生問題比文化重要"],ans:2},
      {text:"在資訊爆炸的時代，人人皆可成為訊息的發布者，真假難辨的內容於是充斥於各個社群平台。有論者主張，與其寄望政府立法管制，不如從教育著手，培養民眾獨立查證的能力。倘若閱聽人只憑標題便轉發，或僅相信與自身立場相符的說法，那麼再嚴密的法規也難以遏止謠言的擴散。換言之，媒體識讀的核心，不在於教人分辨哪一則新聞為假，而在於養成一種面對任何訊息都先存疑、再求證的習慣。",q:"作者認為遏止謠言最根本的做法是什麼？",opts:["由政府立法嚴格管制平台的內容","培養民眾主動查證的思辨習慣","要求社群平台迅速刪除不實訊息","只採信與自己立場相符的新聞"],ans:1,why:"文中主張「不如從教育著手，培養民眾獨立查證的能力」。"},
      {text:"台灣即將邁入超高齡社會，每五人中便有一位是六十五歲以上的長者。面對此一趨勢，社會上常見兩種聲音：一者憂心醫療與照護支出將拖垮財政，視高齡化為沉重的負擔；另一者則主張，倘若能善用長者累積數十年的經驗與智慧，並打造友善的就業與參與環境，銀髮族未必只是被照顧的對象，反而可能成為社會的資產。作者以為，問題的關鍵並不在於老年人口的多寡，而在於整個社會是否願意轉換思維，重新看待老年的價值。",q:"作者對高齡化社會的看法最接近下列何者？",opts:["高齡化必然導致國家財政崩潰","應限縮醫療照護支出以減輕負擔","關鍵在於社會能否轉念看待老年的價值","長者應及早退出職場把機會讓給年輕人"],ans:2,why:"文末指出關鍵在於社會是否願意轉換思維、重新看待老年的價值。"},
      {text:"近年來，職場中的世代摩擦時有所聞。資深主管每每感嘆年輕世代缺乏忠誠、動輒離職；年輕員工則抱怨上一輩只知埋頭苦幹，把加班當成美德。然而，若細究其因，這未必是誰對誰錯的問題，而是成長背景使然。老一輩歷經經濟起飛，深信付出必有回報；年輕一代則在低薪與高房價的夾縫中成長，自然更看重工作與生活的平衡。與其相互指責，不如試著理解彼此的處境。",q:"關於職場的世代差異，下列何者最符合作者的主張？",opts:["年輕世代確實比上一輩缺乏責任感","差異源於不同的成長背景，應相互理解","把加班當成美德是敬業精神的展現","資深主管理應主動退位以讓賢能"],ans:1,why:"文中說差異是成長背景使然，並主張理解彼此的處境。"},
      {text:"「快時尚」以低廉的價格與快速更迭的款式，席捲了全球的服飾市場。消費者只需花費不多，便能追上最新的潮流。然而，這股風潮的背後，卻隱藏著驚人的環境代價：大量成衣在僅穿數次後便遭丟棄，紡織過程更耗費可觀的水資源並排放污染。有識者因此呼籲，消費者縱使無法完全擺脫流行，至少應在購買之前多想一步：這件衣服是否真有需要？能否穿得長久？畢竟，最環保的消費，往往就是「少買一件」。",q:"這段文字主要想傳達的觀點是什麼？",opts:["快時尚讓人人都能負擔流行，值得推廣","消費者應理性節制購買，減少浪費","政府應立法全面禁止快時尚產業","價格昂貴的衣服必然比便宜的更環保"],ans:1,why:"文末點題「最環保的消費，往往就是少買一件」，呼籲節制購買。"},
    ],
  };
  const TIME_LIMIT = { l1: 14, l2: 15, l3: 17, l4: 19, l5: 20, l6: 22 }; // 分（題數増加→時間延長。l6 精通級）
  // 量詞：台灣標準用法の精選リスト（曖昧なものは除外＝正確性を担保）
  const MEASURE = [
    {n:"書",mw:"本"},{n:"雜誌",mw:"本"},{n:"筆",mw:"支"},{n:"紙",mw:"張"},{n:"照片",mw:"張"},{n:"票",mw:"張"},
    {n:"咖啡",mw:"杯"},{n:"茶",mw:"杯"},{n:"飯",mw:"碗"},{n:"湯",mw:"碗"},{n:"貓",mw:"隻"},{n:"狗",mw:"隻"},
    {n:"電腦",mw:"台"},{n:"電視",mw:"台"},{n:"衣服",mw:"件"},{n:"事情",mw:"件"},{n:"鞋子",mw:"雙"},{n:"襪子",mw:"雙"},
    {n:"路",mw:"條"},{n:"房間",mw:"間"},{n:"教室",mw:"間"},{n:"蘋果",mw:"顆"},{n:"花",mw:"朵"},{n:"雨傘",mw:"把"},
    {n:"信",mw:"封"},{n:"樹",mw:"棵"}
  ];

  let lvl = "l1", questions = [], cur = 0, score = 0, wrongs = [], deadline = 0, timerId = null, active = false;

  const shuf = a => [...a].sort(() => Math.random() - .5);

  function buildQuestions(level) {
    const vocab = getVocabData(level) || [];
    const grammar = getGrammarData(level) || [];
    const mk = twMKey();
    const qs = [];
    const wm = (w, n = 3) => shuf(vocab.filter(v => v.w !== w.w)).slice(0, n);   // 誤答の単語
    const withEx = vocab.filter(v => v.ex && v.ex.z);
    const withZy = vocab.filter(v => v.zy);
    // ① 聽力A：例文を聞いて意味を選ぶ（本文は見せない = TOCFL 聴解形式）
    shuf(withEx).slice(0, 4).forEach(w => {
      const opts = shuf([w, ...wm(w)]);
      qs.push({ sec: "listen", audio: w.ex.z, word: w,
        opts: opts.map(o => (o.ex && (o.ex[mk] || o.ex.e || o.ex.j)) || o.m[mk] || o.m.e || o.m.j), ans: opts.indexOf(w) });
    });
    // ② 聽力B：単語を聞いて意味を選ぶ（NEW）
    shuf(vocab).slice(0, 3).forEach(w => {
      const opts = shuf([w, ...wm(w)]);
      qs.push({ sec: "listenW", audio: w.w, word: w, opts: opts.map(o => o.m[mk] || o.m.e || o.m.j), ans: opts.indexOf(w) });
    });
    // ③ 詞彙：単語 → 意味
    shuf(vocab).slice(0, 6).forEach(w => {
      const opts = shuf([w, ...wm(w)]);
      qs.push({ sec: "vocab", stem: w.w, word: w, opts: opts.map(o => o.m[mk] || o.m.e || o.m.j), ans: opts.indexOf(w) });
    });
    // ④ 詞彙：意味 → 単語（NEW 逆方向）
    shuf(vocab).slice(0, 5).forEach(w => {
      const opts = shuf([w, ...wm(w)]);
      qs.push({ sec: "vocabR", stem: (w.m[mk] || w.m.e || w.m.j), stemPlain: true, word: w, opts: opts.map(o => o.w), ans: opts.indexOf(w) });
    });
    // ⑤ 発音：単語 → 正しい注音（NEW・ユーザー設定でオフにできる）
    if (examPronOn()) shuf(withZy).slice(0, 4).forEach(w => {
      const wrong = shuf(withZy.filter(v => v.zy !== w.zy)).slice(0, 3);
      const opts = shuf([w, ...wrong]);
      qs.push({ sec: "pron", stem: w.w, word: w, opts: opts.map(o => o.zy), ans: opts.indexOf(w) });
    });
    // ⑥ クローズ：例文の単語を空欄に → 正しい単語（NEW）
    shuf(withEx.filter(v => v.ex.z.includes(v.w))).slice(0, 4).forEach(w => {
      const opts = shuf([w, ...wm(w)]);
      qs.push({ sec: "cloze", stem: w.ex.z.replace(w.w, "（　　）"), word: w, opts: opts.map(o => o.w), ans: opts.indexOf(w) });
    });
    // ⑦ 語法：例文の <em>…</em> を空欄に → 正しい語を選ぶ
    const egs = [];
    grammar.forEach(g => g.eg.forEach(e => {
      const m = e.z.match(/<em>(.+?)<\/em>/g);
      if (m && m.length === 1) egs.push({ g, e, key: m[0].replace(/<\/?em>/g, "") });
    }));
    shuf(egs).slice(0, 6).forEach(({ g, e, key }) => {
      const pool = shuf(egs.filter(x => x.key !== key)).slice(0, 3).map(x => x.key);
      const opts = shuf([key, ...pool]);
      qs.push({ sec: "grammar", stem: e.z.replace(/<em>.+?<\/em>/, "（　　）"), opts, ans: opts.indexOf(key), gid: g.id });
    });
    // ⑧ 量詞（NEW・精選リストで正確性担保）
    shuf(MEASURE).slice(0, 3).forEach(it => {
      const others = [...new Set(MEASURE.map(x => x.mw))].filter(mw => mw !== it.mw);
      const opts = shuf([it.mw, ...shuf(others).slice(0, 3)]);
      qs.push({ sec: "measure", stem: "一（　　）" + it.n, noun: it.n, opts, ans: opts.indexOf(it.mw) });
    });
    // ⑨ 閱讀（L6 は専用長文が未整備なので L5 の上級長文で代替）
    shuf(PASSAGES[level] || PASSAGES.l5 || PASSAGES.l1).slice(0, 3).forEach(p => {
      qs.push({ sec: "read", stem: p.q, passage: p.text, opts: p.opts, ans: p.ans, why: p.why });
    });
    return qs;
  }

  function start(level) {
    lvl = level || (typeof currentLevel !== "undefined" ? currentLevel : "l1");
    questions = buildQuestions(lvl);
    cur = 0; score = 0; wrongs = []; active = true;
    deadline = Date.now() + (TIME_LIMIT[lvl] || 20) * 60 * 1000;   // 未知レベルでも NaN にしない
    clearInterval(timerId);
    timerId = setInterval(tick, 1000);
    render();
  }

  function tick() {
    const el = document.getElementById("exTimer");
    const left = deadline - Date.now();
    if (left <= 0) { finish(true); return; }
    if (el) {
      const m = Math.floor(left / 60000), s = Math.floor(left % 60000 / 1000);
      el.textContent = `⏱ ${m}:${String(s).padStart(2, "0")}`;
      if (left < 60000) el.style.color = "var(--ac)";
    }
  }

  const SEC_LABEL = () => ({ listen: twT("exSecListen"), listenW: twT("exSecListen"), vocab: twT("exSecVocab"), vocabR: twT("exSecVocab"), pron: twT("exSecPron"), cloze: twT("exSecCloze"), measure: twT("exSecMeasure"), grammar: twT("exSecGrammar"), read: twT("exSecRead") });
  const SEC_PROMPT = () => ({ vocabR: twT("exQvocabR"), pron: twT("exQpron"), cloze: twT("exQcloze"), measure: twT("exQmeasure") });

  function render() {
    const box = document.getElementById("examBox");
    if (!box) return;
    const q = questions[cur];
    box.innerHTML = `
      <div class="ex-top">
        <span class="ex-sec">${SEC_LABEL()[q.sec]}</span>
        <span style="color:var(--tx3);font-size:13px">${cur + 1} / ${questions.length}</span>
        <span id="exTimer" style="font-weight:700;font-size:14px;margin-left:auto"></span>
        <button class="btn" style="padding:4px 12px;font-size:12px" onclick="MockExam.quit()">✕</button>
      </div>
      ${q.passage ? `<div class="ex-passage" onclick="speakZh(this.textContent)">${q.passage}</div>` : ""}
      ${(q.sec === "listen" || q.sec === "listenW")
        ? `<div class="ex-listen">
             <button class="ex-play" onclick="speakZh(this.dataset.z)" data-z="${q.audio}"><svg viewBox="0 0 24 24" class="ic"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.3 8.7a4.5 4.5 0 0 1 0 6.6"/></svg></button>
             <div style="font-size:13px;color:var(--tx3);margin-top:8px">${twT("exListenHint")}</div>
           </div>`
        : `${SEC_PROMPT()[q.sec] ? `<div class="ex-prompt">${SEC_PROMPT()[q.sec]}</div>` : ""}
           <div class="ex-stem ${(q.sec === "vocab" || q.sec === "pron" || q.sec === "measure") ? "big" : ""} ${q.sec === "vocabR" ? "mean" : ""}" ${(q.sec !== "grammar" && q.sec !== "cloze" && q.sec !== "measure" && !q.stemPlain) ? `onclick="speakZh('${(q.stem || "").replace(/（　　）/g, "")}')"` : ""}>${q.stem}</div>`}
      <div class="qz-opts ${q.sec === "pron" ? "zy" : ""}">${q.opts.map((o, i) =>
        `<button class="qz-opt" data-i="${i}" onclick="MockExam.answer(${i})">${"ABCD"[i]}. ${o}</button>`).join("")}
      </div>`;
    tick();
    if (q.sec === "listen" || q.sec === "listenW") setTimeout(() => speakZh(q.audio), 300); // 出題と同時に1回再生
  }

  function examExplain(q) {
    const mk = twMKey(), correct = q.opts[q.ans];
    let h = `<div>${twT("qzCorrectIs")}<b>${"ABCD"[q.ans]}. ${correct}</b></div>`;
    if (q.word) { const w = q.word;
      h += `<div style="margin-top:6px"><b style="font-family:var(--serif);font-size:18px;cursor:pointer" onclick="speakZh('${w.w}')">${w.w}</b>（${w.zy}｜${w.py}）— ${w.m[mk] || w.m.e || w.m.j}</div>`;
      if ((q.sec === "listen" || q.sec === "listenW" || q.sec === "cloze") && w.ex) h += `<div style="font-size:13px;color:var(--tx2);margin-top:4px;cursor:pointer" onclick="speakZh('${w.ex.z}')"><svg viewBox="0 0 24 24" class="ic"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.3 8.7a4.5 4.5 0 0 1 0 6.6"/></svg> ${w.ex.z}<br>${w.ex[mk] || w.ex.e || w.ex.j || ""}</div>`;
    } else if (q.sec === "measure") {
      h += `<div style="margin-top:6px;font-family:var(--serif);font-size:20px" onclick="speakZh('一${correct}${q.noun}')">一<b style="color:var(--ac)">${correct}</b>${q.noun}</div>`;
    }
    if (q.sec === "read" && q.why) h += `<div style="font-size:13px;color:var(--tx2);margin-top:6px">${q.why}</div>`;
    return h;
  }
  function recordWrong(q) {
    if (typeof WrongBook === "undefined") return;
    const correct = q.opts[q.ans];
    if (q.word) WrongBook.add({ type: "exam-" + q.sec, word: q.word.w,
      q: (q.sec === "listen" ? "🎧 " + (q.word.ex ? q.word.ex.z : "") : q.word.w),
      correct: q.word.w + "：" + correct, detail: q.word.zy + "｜" + q.word.py });
    else if (q.sec === "measure") WrongBook.add({ type: "exam-measure", word: "一" + correct + q.noun, q: q.stem, correct: "一" + correct + q.noun, detail: "" });
    else WrongBook.add({ type: "exam-" + q.sec, word: "", q: (q.stem || "").replace(/<[^>]+>/g, "").replace(/（　　）/g, "___"), correct: correct, detail: "" });
  }
  function answer(i) {
    const q = questions[cur];
    const ok = i === q.ans;
    document.querySelectorAll("#examBox .qz-opt").forEach(b => {
      b.disabled = true;
      if (+b.dataset.i === q.ans) b.classList.add("ok");
    });
    if (!ok) document.querySelector(`#examBox .qz-opt[data-i="${i}"]`)?.classList.add("ng");
    if (ok) score++; else { wrongs.push(q); recordWrong(q); }
    if (q.word) SRS.record(lvl, q.word.w, ok); // 模試（聽力・詞彙）の結果を SRS に反映
    // 停住:顯示正解+詳解+「下一題」，不自動跳（使用者要求）
    document.getElementById("examBox").insertAdjacentHTML("beforeend",
      `<div class="qz-fb ${ok ? "ok" : "ng"}">
         <div style="font-weight:700;font-size:15px">${ok ? "⭕ " + twT("qzRight") : "❌ " + twT("qzWrong")}</div>
         <div style="margin-top:6px">${examExplain(q)}</div>
         <div style="margin-top:14px"><button class="btn primary" onclick="MockExam.next()">${twT("quizNext")} ›</button></div>
       </div>`);
    const fb = document.querySelector("#examBox .qz-fb"); if (fb) fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  function next() { cur++; cur >= questions.length ? finish(false) : render(); }

  function finish(timeout) {
    clearInterval(timerId);
    if (!active) return;
    active = false;
    const total = questions.length;
    const pct = Math.round(score / total * 100);
    // 学習履歴に保存（クラウド同期の対象）
    try {
      const h = JSON.parse(localStorage.getItem("stw_exam_history") || "[]");
      h.push({ ts: Date.now(), level: lvl, score, total });
      localStorage.setItem("stw_exam_history", JSON.stringify(h.slice(-100)));
      if (typeof window.onSRSChange === "function") window.onSRSChange();
    } catch (e) {}
    const mk = twMKey();
    const box = document.getElementById("examBox");
    box.innerHTML = `
      <div style="text-align:center;padding:20px 0">
        ${timeout ? `<p style="color:var(--ac);font-weight:700">${twT("exTimeUp")}</p>` : ""}
        <div style="font-size:15px;color:var(--tx2);margin-top:8px">${lvl.toUpperCase()} ${twT("exResult")}</div>
        <div class="qz-big">${score} / ${total}</div>
        <div style="font-size:14px;color:${pct >= 70 ? "#2F7A5D" : "var(--ac)"};font-weight:700;margin:6px 0 18px">${pct}%　${pct >= 70 ? twT("exPass") : twT("exKeepGoing")}</div>
        ${wrongs.length ? `<div style="text-align:left;max-width:520px;margin:0 auto;border-top:1px solid var(--line);padding-top:14px">
          <div style="font-size:13px;color:var(--tx3);margin-bottom:8px">${twT("exWrongList")}</div>
          ${wrongs.map(q => `<div style="font-size:14px;padding:6px 0;border-bottom:1px dashed var(--line)">
            ${(q.sec === "listen" || q.sec === "listenW") && q.word ? `🎧 <b onclick="speakZh('${q.word.w}')" style="cursor:pointer">${q.word.w}</b>（${q.word.zy}｜${q.word.py}）— ${q.word.m[mk] || q.word.m.e || q.word.m.j}`
              : q.word ? `<b onclick="speakZh('${q.word.w}')" style="cursor:pointer">${q.word.w}</b>（${q.word.zy}｜${q.word.py}）— ${q.word.m[mk] || q.word.m.e || q.word.m.j}`
              : q.sec === "grammar" ? q.stem.replace("（　　）", `<b style="color:var(--ac)">${q.opts[q.ans]}</b>`)
              : `${q.stem}<br>→ <b style="color:var(--ac)">${q.opts[q.ans]}</b>`}
          </div>`).join("")}</div>` : ""}
        <div style="margin-top:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn primary" onclick="Paywall.gate('exam',()=>MockExam.start('${lvl}'))">${twT("quizRetry")}</button>
          <button class="btn" onclick="MockExam.quit()">OK</button>
        </div>
        ${(typeof WrongBook!=="undefined" && WrongBook.forLevel(lvl).length) ? `<div><button class="wb-link" onclick="openWrongBook()">${twT("wbReview")} (${WrongBook.forLevel(lvl).length})</button></div>` : ""}
      </div>`;
    if (typeof updateSrsBadges === "function") updateSrsBadges();
    if (typeof renderExamHome === "function") return; // quit() で戻る
  }

  function quit() {
    clearInterval(timerId);
    active = false;
    if (typeof renderExamHome === "function") renderExamHome();
  }

  function history() {
    try { return JSON.parse(localStorage.getItem("stw_exam_history") || "[]"); } catch (e) { return []; }
  }

  // 注音発音セクションの ON/OFF（既定 ON。ユーザーが「注音が苦手／不要」なら試験から外せる）
  function examPronOn() { try { return localStorage.getItem("stw_ex_pron") !== "0"; } catch (e) { return true; } }
  function setExamPron(on) { try { localStorage.setItem("stw_ex_pron", on ? "1" : "0"); } catch (e) {} }
  return { start, answer, next, quit, finish, history, examPronOn, setExamPron,
           _import(h) { localStorage.setItem("stw_exam_history", JSON.stringify(h)); } };
})();
