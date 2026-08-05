// StayTW Study — 分級閲讀 L4（上級・TOCFL upper-intermediate／繁体字＋注音＋拼音）
// 形式: level, title{j,e,k}, lines[{z,zy,py,m{j,e,k}}], vocab[{w,zy,py,m{j,e,k}}], q{ask{j,e,k},opts[{j,e,k}],ans,why{j,e,k}}
// 音声は各 line.z を TTS で読み上げ（事前生成 mp3 があれば高音質、無ければ端末音声）。
const READING_L4 = [
{
  id:"bank-account-arc", level:"l4",
  title:{ j:"ARCで銀行口座と携帯番号を作る", e:"Opening a Bank Account and Getting a Phone Plan with an ARC", k:"거류증으로 은행 계좌와 휴대폰 번호 만들기" },
  lines:[
    { z:"由於下個月要開始領薪水，健太不得不先去銀行開一個帳戶。", py:"Yóuyú xià ge yuè yào kāishǐ lǐng xīnshuǐ, Jiàntài bùdébù xiān qù yínháng kāi yí ge zhànghù.", m:{ j:"来月から給料を受け取ることになったので、健太はまず銀行で口座を開かざるを得ませんでした。", e:"Since he'll start receiving his salary next month, Kenta had no choice but to first go open a bank account.", k:"다음 달부터 급여를 받게 되어, 켄타는 우선 은행에서 계좌를 개설할 수밖에 없었습니다." } },
    { z:"承辦人員說：「除非您帶著居留證和第二證件，否則我們無法為您辦理開戶。」", py:"Chéngbàn rényuán shuō: “Chúfēi nín dàizhe jūliúzhèng hé dì-èr zhèngjiàn, fǒuzé wǒmen wúfǎ wèi nín bànlǐ kāihù.”", m:{ j:"担当者は言いました。「居留証と第二身分証をお持ちでない限り、口座開設のお手続きはできません。」", e:"The staff member said: \"Unless you bring your ARC and a secondary ID, we cannot process the account opening for you.\"", k:"담당 직원이 말했습니다. \"거류증과 제2 신분증을 지참하지 않으시면 계좌 개설을 진행해 드릴 수 없습니다.\"" } },
    { z:"還好健太事先查過資料，把護照也一起帶來了。", py:"Háihǎo Jiàntài shìxiān cháguò zīliào, bǎ hùzhào yě yìqǐ dàilái le.", m:{ j:"幸い健太は事前に調べておいたので、パスポートも一緒に持ってきていました。", e:"Luckily Kenta had looked it up beforehand and brought his passport along as well.", k:"다행히 켄타는 미리 알아봐서 여권도 함께 가져왔습니다." } },
    { z:"填完申請表以後，他還設定了網路銀行和提款卡的密碼。", py:"Tián wán shēnqǐngbiǎo yǐhòu, tā hái shèdìngle wǎnglù yínháng hé tíkuǎnkǎ de mìmǎ.", m:{ j:"申請書を書き終えたあと、彼はネットバンキングとキャッシュカードの暗証番号も設定しました。", e:"After filling out the application form, he also set up passwords for online banking and his ATM card.", k:"신청서를 다 작성한 뒤, 그는 인터넷 뱅킹과 현금카드 비밀번호도 설정했습니다." } },
    { z:"辦好帳戶，他接著到電信門市想申辦一個手機門號。", py:"Bàn hǎo zhànghù, tā jiēzhe dào diànxìn ménshì xiǎng shēnbàn yí ge shǒujī ménhào.", m:{ j:"口座を作り終えると、彼は続いて携帯ショップへ行き、電話番号を契約しようとしました。", e:"With the account done, he next went to a telecom store to apply for a mobile number.", k:"계좌를 다 만든 뒤, 그는 이어서 통신사 매장에 가서 휴대폰 번호를 신청하려 했습니다." } },
    { z:"店員解釋，儘管外國人也能辦門號，但通常需要提供居留證與本國銀行的帳戶證明。", py:"Diànyuán jiěshì, jǐnguǎn wàiguórén yě néng bàn ménhào, dàn tōngcháng xūyào tígōng jūliúzhèng yǔ běnguó yínháng de zhànghù zhèngmíng.", m:{ j:"店員は、外国人でも番号契約はできるものの、通常は居留証と国内銀行の口座証明の提出が必要だと説明しました。", e:"The clerk explained that although foreigners can get a phone number, they usually need to provide an ARC and proof of a local bank account.", k:"점원은 외국인도 번호를 개통할 수 있지만, 보통 거류증과 국내 은행 계좌 증명을 제출해야 한다고 설명했습니다." } },
    { z:"「幸好我剛剛才開好戶頭，」健太鬆了一口氣，把資料遞給店員。", py:"“Xìnghǎo wǒ gānggāng cái kāihǎo hùtóu,” Jiàntài sōngle yì kǒuqì, bǎ zīliào dì gěi diànyuán.", m:{ j:"「ちょうどさっき口座を作ったばかりでよかった」と健太はほっとして、書類を店員に手渡しました。", e:"\"Good thing I just opened my account,\" Kenta said with relief, handing the documents to the clerk.", k:"\"방금 계좌를 막 만들어서 다행이에요,\" 켄타는 안도하며 서류를 점원에게 건넸습니다." } },
    { z:"半個小時後，門號開通了，他終於能用台灣的號碼跟公司聯絡。", py:"Bàn ge xiǎoshí hòu, ménhào kāitōng le, tā zhōngyú néng yòng Táiwān de hàomǎ gēn gōngsī liánluò.", m:{ j:"三十分後、番号が開通し、彼はようやく台湾の番号で会社と連絡が取れるようになりました。", e:"Half an hour later, the number was activated, and he could finally contact his company with a Taiwanese number.", k:"삼십 분 후, 번호가 개통되어 그는 마침내 대만 번호로 회사와 연락할 수 있게 되었습니다." } },
  ],
  vocab:[
    { w:"居留證", zy:"ㄐㄩ ㄌㄧㄡˊ ㄓㄥˋ", py:"jūliúzhèng", m:{ j:"居留証（ARC・在留カードに相当）", e:"ARC (Alien Resident Certificate)", k:"거류증(외국인등록증)" } },
    { w:"開戶", zy:"ㄎㄞ ㄏㄨˋ", py:"kāihù", m:{ j:"口座を開設する", e:"to open a bank account", k:"계좌를 개설하다" } },
    { w:"承辦人員", zy:"ㄔㄥˊ ㄅㄢˋ ㄖㄣˊ ㄩㄢˊ", py:"chéngbàn rényuán", m:{ j:"担当者・窓口係", e:"the person in charge, handling staff", k:"담당 직원" } },
    { w:"第二證件", zy:"ㄉㄧˋ ㄦˋ ㄓㄥˋ ㄐㄧㄢˋ", py:"dì-èr zhèngjiàn", m:{ j:"第二身分証（追加の本人確認書類）", e:"secondary ID document", k:"제2 신분증(추가 신분 증명)" } },
    { w:"提款卡", zy:"ㄊㄧˊ ㄎㄨㄢˇ ㄎㄚˇ", py:"tíkuǎnkǎ", m:{ j:"キャッシュカード", e:"ATM/debit card", k:"현금카드" } },
    { w:"門號", zy:"ㄇㄣˊ ㄏㄠˋ", py:"ménhào", m:{ j:"携帯電話の番号（契約回線）", e:"mobile phone number (plan)", k:"휴대폰 번호(회선)" } },
    { w:"申辦", zy:"ㄕㄣ ㄅㄢˋ", py:"shēnbàn", m:{ j:"申請して手続きする", e:"to apply for and process", k:"신청하여 처리하다" } },
    { w:"儘管", zy:"ㄐㄧㄣˇ ㄍㄨㄢˇ", py:"jǐnguǎn", m:{ j:"〜ではあるものの・たとえ〜でも", e:"although, even though", k:"비록 ~일지라도" } },
    { w:"除非…否則…", zy:"ㄔㄨˊ ㄈㄟ … ㄈㄡˇ ㄗㄜˊ …", py:"chúfēi…fǒuzé…", m:{ j:"〜でない限り、さもなければ〜", e:"unless…, otherwise…", k:"~하지 않으면, 그렇지 않으면~" } },
    { w:"不得不", zy:"ㄅㄨˋ ㄉㄜˊ ㄅㄨˋ", py:"bùdébù", m:{ j:"〜せざるを得ない", e:"to have no choice but to", k:"~할 수밖에 없다" } },
  ],
  q:{
    ask:{ j:"銀行で口座を開くために、健太は何が必要でしたか？", e:"What did Kenta need in order to open a bank account?", k:"은행에서 계좌를 개설하기 위해 켄타는 무엇이 필요했나요?" },
    opts:[ { j:"居留証と第二身分証（パスポートなど）", e:"An ARC and a secondary ID (such as a passport)", k:"거류증과 제2 신분증(여권 등)" }, { j:"居留証だけ", e:"Only an ARC", k:"거류증만" }, { j:"携帯番号の契約書だけ", e:"Only a phone plan contract", k:"휴대폰 계약서만" } ],
    ans:0,
    why:{ j:"「除非您帶著居留證和第二證件，否則…無法辦理開戶」＝居留証に加え第二身分証が必要。健太はパスポートを持参して対応できました。", e:"\"除非您帶著居留證和第二證件，否則…無法辦理開戶\" = both an ARC and a secondary ID are required. Kenta brought his passport to meet this.", k:"\"除非您帶著居留證和第二證件，否則…無法辦理開戶\" = 거류증에 더해 제2 신분증이 필요. 켄타는 여권을 지참해 해결했습니다." }
  }
},
{
  id:"deposit-dispute", level:"l4",
  title:{ j:"敷金トラブルを解決する", e:"Resolving a Rental Deposit Dispute", k:"보증금 분쟁 해결하기" },
  lines:[
    { z:"美玲租的套房到期了，可是房東遲遲不肯退還兩個月的押金。", py:"Měilíng zū de tàofáng dàoqī le, kěshì fángdōng chíchí bù kěn tuìhuán liǎng ge yuè de yājīn.", m:{ j:"美玲が借りていたワンルームの契約が満了しましたが、大家はなかなか二か月分の敷金を返そうとしませんでした。", e:"The lease on the studio Meiling rented had ended, but the landlord was reluctant to return the two months' deposit.", k:"메이링이 빌린 원룸 계약이 만료됐지만, 집주인은 두 달치 보증금을 좀처럼 돌려주려 하지 않았습니다." } },
    { z:"房東主張牆壁有污損，因此要扣一筆修繕費用。", py:"Fángdōng zhǔzhāng qiángbì yǒu wūsǔn, yīncǐ yào kòu yì bǐ xiūshàn fèiyòng.", m:{ j:"大家は壁に汚れや傷があると主張し、そのため修繕費を差し引くと言いました。", e:"The landlord claimed the walls were stained and damaged, and therefore wanted to deduct a repair fee.", k:"집주인은 벽에 오염과 손상이 있다며 수리비를 공제하겠다고 주장했습니다." } },
    { z:"美玲不同意，她說：「這些痕跡是入住前就有的，當初交屋時我還拍了照片存證。」", py:"Měilíng bù tóngyì, tā shuō: “Zhèxiē hénjì shì rùzhù qián jiù yǒu de, dāngchū jiāowū shí wǒ hái pāile zhàopiàn cúnzhèng.”", m:{ j:"美玲は同意せず、こう言いました。「この跡は入居前からあったもので、引き渡しの時に証拠として写真も撮っておきました。」", e:"Meiling disagreed, saying: \"These marks were there before I moved in; I even took photos as evidence when I received the place.\"", k:"메이링은 동의하지 않고 말했습니다. \"이 흔적들은 입주 전부터 있던 것이고, 인수 당시 증거로 사진도 찍어 두었어요.\"" } },
    { z:"由於雙方各執一詞，她決定拿出當初簽的租賃契約來釐清責任。", py:"Yóuyú shuāngfāng gèzhí-yìcí, tā juédìng ná chū dāngchū qiān de zūlìn qìyuē lái líqīng zérèn.", m:{ j:"双方の言い分が食い違ったため、彼女は当初交わした賃貸契約書を出して責任をはっきりさせることにしました。", e:"Since the two sides each told a different story, she decided to take out the lease contract they had signed to clarify responsibility.", k:"양측의 주장이 엇갈렸기 때문에, 그녀는 당초 맺은 임대차 계약서를 꺼내 책임을 명확히 하기로 했습니다." } },
    { z:"契約上寫明，自然的老舊不算損壞，房客不須負賠償責任。", py:"Qìyuē shàng xiěmíng, zìrán de lǎojiù bú suàn sǔnhuài, fángkè bùxū fù péicháng zérèn.", m:{ j:"契約書には、自然な経年劣化は損傷とみなさず、借主は賠償責任を負わないと明記されていました。", e:"The contract clearly stated that natural wear and tear does not count as damage, and the tenant bears no liability for compensation.", k:"계약서에는 자연스러운 노후는 손상으로 보지 않으며, 세입자는 배상 책임을 지지 않는다고 명시되어 있었습니다." } },
    { z:"美玲語氣平和但堅定地表示：「除非您能證明是我造成的損壞，否則押金應該全額退還。」", py:"Měilíng yǔqì pínghé dàn jiāndìng de biǎoshì: “Chúfēi nín néng zhèngmíng shì wǒ zàochéng de sǔnhuài, fǒuzé yājīn yīnggāi quán'é tuìhuán.”", m:{ j:"美玲は穏やかながら毅然とした口調で言いました。「私が生じさせた損傷だと証明できない限り、敷金は全額返還されるべきです。」", e:"In a calm but firm tone, Meiling stated: \"Unless you can prove the damage was caused by me, the deposit should be returned in full.\"", k:"메이링은 차분하지만 단호한 어조로 말했습니다. \"제가 낸 손상이라고 증명하지 못하시면 보증금은 전액 환불되어야 합니다.\"" } },
    { z:"房東看了照片和契約，儘管有些不情願，最後仍同意退還全部押金。", py:"Fángdōng kànle zhàopiàn hé qìyuē, jǐnguǎn yǒuxiē bù qíngyuàn, zuìhòu réng tóngyì tuìhuán quánbù yājīn.", m:{ j:"大家は写真と契約書を見て、いくらか不本意ながらも、最終的に敷金全額の返還に同意しました。", e:"After looking at the photos and the contract, the landlord, though somewhat unwilling, finally agreed to return the entire deposit.", k:"집주인은 사진과 계약서를 보고, 다소 내키지 않았지만 결국 보증금 전액을 돌려주기로 동의했습니다." } },
    { z:"這次經驗讓美玲明白，保留書面證據對保障自己的權益有多重要。", py:"Zhè cì jīngyàn ràng Měilíng míngbái, bǎoliú shūmiàn zhèngjù duì bǎozhàng zìjǐ de quányì yǒu duō zhòngyào.", m:{ j:"今回の経験で美玲は、書面の証拠を残しておくことが自分の権利を守るうえでどれほど大切かを理解しました。", e:"This experience made Meiling realize how important it is to keep written evidence to protect one's own rights.", k:"이번 경험으로 메이링은 서면 증거를 남겨 두는 것이 자신의 권익을 지키는 데 얼마나 중요한지 깨달았습니다." } },
  ],
  vocab:[
    { w:"押金", zy:"ㄧㄚ ㄐㄧㄣ", py:"yājīn", m:{ j:"敷金・保証金", e:"deposit (security deposit)", k:"보증금" } },
    { w:"房東", zy:"ㄈㄤˊ ㄉㄨㄥ", py:"fángdōng", m:{ j:"大家・家主", e:"landlord", k:"집주인" } },
    { w:"退還", zy:"ㄊㄨㄟˋ ㄏㄨㄢˊ", py:"tuìhuán", m:{ j:"返還する・返す", e:"to return, refund", k:"돌려주다·환불하다" } },
    { w:"主張", zy:"ㄓㄨˇ ㄓㄤ", py:"zhǔzhāng", m:{ j:"主張する", e:"to claim, assert", k:"주장하다" } },
    { w:"修繕", zy:"ㄒㄧㄡ ㄕㄢˋ", py:"xiūshàn", m:{ j:"修繕・修理", e:"repair, renovation", k:"수리·보수" } },
    { w:"存證", zy:"ㄘㄨㄣˊ ㄓㄥˋ", py:"cúnzhèng", m:{ j:"証拠として残す", e:"to keep as evidence", k:"증거로 보관하다" } },
    { w:"租賃契約", zy:"ㄗㄨ ㄌㄧㄣˋ ㄑㄧˋ ㄩㄝ", py:"zūlìn qìyuē", m:{ j:"賃貸契約（書）", e:"lease/rental contract", k:"임대차 계약(서)" } },
    { w:"各執一詞", zy:"ㄍㄜˋ ㄓˊ ㄧ ㄘˊ", py:"gèzhí-yìcí", m:{ j:"双方の言い分が食い違う", e:"each side tells a different story", k:"서로 주장이 엇갈리다" } },
    { w:"賠償", zy:"ㄆㄟˊ ㄔㄤˊ", py:"péicháng", m:{ j:"賠償（する）", e:"compensation, to compensate", k:"배상(하다)" } },
    { w:"權益", zy:"ㄑㄩㄢˊ ㄧˋ", py:"quányì", m:{ j:"権利・権益", e:"rights and interests", k:"권익" } },
  ],
  q:{
    ask:{ j:"最終的に美玲が敷金を全額取り戻せた決め手は何でしたか？", e:"What was the key factor that let Meiling get her full deposit back?", k:"메이링이 보증금을 전액 돌려받을 수 있었던 결정적 요인은 무엇이었나요?" },
    opts:[ { j:"入居前に撮った写真と、契約書の条項という書面の証拠", e:"Photos taken before moving in and the contract clauses — written evidence", k:"입주 전 찍은 사진과 계약서 조항 등 서면 증거" }, { j:"大家に大声で抗議したから", e:"Because she loudly protested to the landlord", k:"집주인에게 큰 소리로 항의해서" }, { j:"修繕費を自分で払うことに同意したから", e:"Because she agreed to pay the repair fee herself", k:"수리비를 직접 내기로 동의해서" } ],
    ans:0,
    why:{ j:"美玲は交屋時の写真と、経年劣化は賠償対象外と定めた契約条項を示しました。書面の証拠が決め手です。", e:"Meiling showed photos from the handover and the contract clause stating wear and tear is not compensable. Written evidence was decisive.", k:"메이링은 인수 시 사진과 노후는 배상 대상이 아니라는 계약 조항을 제시했습니다. 서면 증거가 결정적이었습니다." }
  }
},
];
if (typeof module !== "undefined") module.exports = { READING_L4 };
