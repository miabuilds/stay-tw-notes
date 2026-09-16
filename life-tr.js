// life.js の ko / vi / id 訳。key = 英文原文(m.en / name.en / tip.en), value = 訳。無いキーは英語にフォールバック。
// 中文原句(z)を基準に訳出。越=anh/chị・mình の中立口語、印=saya/Anda(場面により kamu)、韓=해요체。
const LIFE_TR = {
ko: {
  // ── cats ──
  "Clinic & pharmacy": "병원·약국",
  "Paperwork & bank": "행정 절차·은행",
  "Housing": "주거",
  "Shopping & food": "쇼핑·식사",
  "Work & people": "일·인간관계",
  "Getting around & weather": "이동·날씨",

  // ── clinic-checkin ──
  "Checking in at a clinic": "병원(診所)에서 접수하기",
  "掛號 means registering to see the doctor. For a first visit, hand over your NHI card and ARC.": "掛號는 진료 접수를 뜻해요. 초진이면 건강보험카드와 거류증만 내면 돼요.",
  "Do you have your NHI card?": "건강보험카드 있으세요?",
  "Yes, here's my NHI card.": "네, 여기 제 건강보험카드요.",
  "First visit or follow-up?": "초진이세요, 재진이세요?",
  "First visit. It's my first time here.": "초진이에요. 여기 처음 왔어요.",
  "Take your temperature first; we'll call you shortly.": "먼저 체온 재시고요, 잠시 후에 불러 드릴게요.",
  "OK, I'll wait outside.": "네, 밖에서 기다릴게요.",

  // ── symptoms ──
  "Describing symptoms": "증상 말하기",
  "不舒服 is the all-purpose 'I feel unwell'. Pointing and saying 這裡痛 (it hurts here) works fine.": "不舒服는 '몸이 안 좋다'는 만능 표현이에요. 아픈 곳을 가리키며 這裡痛(여기가 아파요)이라고 하면 통해요.",
  "What's bothering you?": "어디가 불편하세요?",
  "I've had a fever since yesterday and my throat really hurts.": "어제부터 열이 나고 목이 많이 아파요.",
  "Any coughing or diarrhea?": "기침이나 설사는요?",
  "A little cough, no diarrhea.": "기침은 조금 있고 설사는 없어요.",
  "I'm allergic to penicillin.": "저는 페니실린 알레르기가 있어요.",
  "OK, I'll prescribe three days of medicine.": "네, 3일분 약 처방해 드릴게요.",

  // ── pharmacy ──
  "Buying medicine at a pharmacy": "약국에서 약 사기",
  "Over-the-counter medicine is 成藥. Tell the pharmacist your symptoms and they'll pick one for you.": "처방전 없이 살 수 있는 약은 成藥이에요. 약사에게 증상을 말하면 골라 줘요.",
  "I have a headache. Do you have painkillers?": "머리가 아픈데 진통제 있어요?",
  "Yes. Take one tablet at a time.": "있어요. 이거 한 번에 한 알 드세요.",
  "How many times a day can I take it?": "하루에 몇 번까지 먹을 수 있어요?",
  "Three times at most, after meals.": "최대 세 번, 식후에 드세요.",
  "Will it make me sleepy?": "먹으면 졸려요?",
  "This one won't.": "이건 안 졸려요.",

  // ── take-medicine ──
  "Understanding your prescription": "약 복용법 알아듣기",
  "Medicine bags say things like 三餐飯後 (after each meal), 睡前 (before bed), 外用 (external use). Just show the bag and ask.": "약봉지에는 三餐飯後(매 식후), 睡前(자기 전), 外用(외용) 같은 말이 쓰여 있어요. 모르면 봉지를 보여 주며 물어보세요.",
  "Here's your medicine, three times a day.": "약 여기 있어요. 하루 세 번이에요.",
  "Before or after meals?": "식전에 먹어요, 식후에 먹어요?",
  "After meals. This packet is for before bed.": "식후에요. 이 봉지는 자기 전에 드세요.",
  "How do I use this ointment?": "이 연고는 어떻게 써요?",
  "Apply twice a day, just a thin layer.": "하루 두 번, 얇게 바르면 돼요.",
  "Thanks, got it.": "감사해요, 알겠어요.",

  // ── emergency ──
  "Emergencies & calling an ambulance": "응급 상황·구급차 부르기",
  "Ambulance/fire: 119. Police: 110. If you can't say the address, read a nearby shop sign.": "구급차·화재는 119, 경찰은 110이에요. 주소를 말하기 어려우면 근처 가게 간판을 읽어 주세요.",
  "Help! Please call an ambulance.": "도와주세요! 구급차 좀 불러 주세요.",
  "What happened? Where are you?": "무슨 일이에요? 어디세요?",
  "Someone fainted, in front of the FamilyMart on Zhongshan Road.": "사람이 쓰러졌어요. 중산로(中山路) 훼미리마트 앞이에요.",
  "Is he still breathing?": "숨은 쉬고 있어요?",
  "Yes, but he won't wake up.": "네, 그런데 불러도 안 일어나요.",
  "The ambulance is on its way. Don't move him.": "구급차 바로 가요. 환자 움직이지 마세요.",

  // ── arc-renew ──
  "Renewing your ARC": "거류증(ARC) 연장하기",
  "At the immigration office, take a 號碼牌 (number ticket) and wait. You can renew from 30 days before expiry.": "이민서에서는 號碼牌(번호표)를 뽑고 기다려요. 만료 30일 전부터 연장할 수 있어요.",
  "I'd like to renew my ARC.": "거류증 연장하려고요.",
  "Please take a number first. Have your passport and ARC ready.": "먼저 번호표 뽑으시고요, 여권과 거류증 준비해 주세요.",
  "You'll also need a photo and the application form.": "사진하고 신청서도 필요해요.",
  "Where can I get the form?": "신청서는 어디서 받아요?",
  "On that shelf. Fill it in and come back.": "저쪽 선반에요. 작성해서 다시 오세요.",
  "How long is the wait?": "대략 얼마나 기다려야 해요?",

  // ── bank-account ──
  "Opening a bank account": "은행 계좌 만들기",
  "You need your ARC, passport, and a seal or signature. 存摺 = passbook, 提款卡 = ATM card.": "거류증, 여권, 도장 또는 서명이 필요해요. 存摺=통장, 提款卡=현금카드.",
  "I'd like to open an account.": "계좌 개설하려고요.",
  "Your ARC and passport, please. Do you have a seal?": "거류증과 여권 주세요. 도장 있으세요?",
  "No seal. Can I sign instead?": "도장은 없는데 서명으로 해도 돼요?",
  "Sure. Do you want an ATM card and online banking too?": "돼요. 현금카드와 인터넷뱅킹도 하실래요?",
  "Both, please.": "둘 다 해 주세요.",
  "Sign here. The card will be mailed in a week.": "여기 서명해 주세요. 카드는 일주일 뒤에 우편으로 보내 드려요.",

  // ── remit ──
  "Sending money home": "고향에 송금하기",
  "Wire transfer is 匯款, the fee is 手續費. Writing the amount and recipient's account details on paper speeds things up.": "은행 송금은 匯款, 수수료는 手續費예요. 금액과 받는 사람 계좌 정보를 종이에 적어서 주면 빨라요.",
  "I want to send money to Vietnam.": "베트남으로 송금하려고요.",
  "How much? Do you have the recipient's account number?": "얼마 보내세요? 받는 분 계좌번호 있으세요?",
  "20,000 NTD. The details are on this paper.": "2만 타이완달러요. 정보는 이 종이에 적어 놨어요.",
  "The fee is 300 NTD; it arrives in about three business days.": "수수료는 300위안이고, 영업일 기준 3일 정도면 도착해요.",
  "What's today's exchange rate?": "오늘 환율이 얼마예요?",
  "It's on this screen. Please confirm the amount.": "이 화면에 있어요. 금액 확인해 주세요.",

  // ── sim-card ──
  "Getting a SIM card": "휴대폰 SIM 개통하기",
  "預付卡 = prepaid, 月租 = monthly plan. Foreigners need both ARC and passport.": "預付卡=선불, 月租=월정액 요금제. 외국인은 거류증과 여권 두 가지가 필요해요.",
  "I'd like a prepaid SIM. Is there an unlimited data plan?": "선불 SIM 하려고요. 데이터 무제한 요금제 있어요?",
  "Yes, 30 days for 499 with unlimited data.": "있어요. 30일 499위안에 데이터 무제한이에요.",
  "Two IDs please: your ARC and passport.": "신분증 두 개 주세요. 거류증과 여권요.",
  "Can I keep my current number?": "지금 쓰는 번호 그대로 쓸 수 있어요?",
  "Yes, that's number porting; it takes about a day.": "돼요. 번호이동(攜碼) 신청하면 하루 정도 걸려요.",
  "OK, let's do that one.": "네, 그럼 그걸로 할게요.",

  // ── police-lost ──
  "Reporting lost or stolen items": "분실·도난 신고하기",
  "報案 = filing a police report. For a lost card, call the bank first and ask to 停卡 (freeze the card).": "報案=경찰 신고. 카드를 잃어버렸으면 먼저 은행에 전화해서 停卡(카드 정지)를 요청하세요.",
  "I lost my wallet. I want to file a report.": "지갑을 잃어버렸어요. 신고하려고요.",
  "When and where did you lose it?": "언제 어디서 잃어버리셨어요?",
  "This afternoon, probably on the MRT.": "오늘 오후에요. 아마 지하철(MRT)에서요.",
  "What was inside?": "안에 뭐가 들어 있었어요?",
  "My ARC, ATM card, and 2,000 in cash.": "거류증, 현금카드, 현금 2천 위안요.",
  "This is your report receipt; you'll need it to replace your documents.": "이건 신고 접수증이에요. 서류 재발급할 때 필요해요.",

  // ── view-room ──
  "Viewing an apartment": "집 보러 가기",
  "押金 = deposit (usually 2 months), 租金 = rent. Always ask 含水電嗎 (are utilities included?).": "押金=보증금(보통 2개월), 租金=월세. 含水電嗎(수도·전기 포함이에요?)는 꼭 물어보세요.",
  "Hello, I'd like to view the room.": "안녕하세요, 집 좀 보려고요.",
  "8,000 a month, two months' deposit.": "한 달 8천 위안이고 보증금은 두 달치예요.",
  "Are utilities and internet included?": "수도·전기와 인터넷 포함이에요?",
  "Internet is included; electricity is 5 per unit.": "인터넷은 포함이고 전기는 1도(kWh)에 5위안이에요.",
  "Are pets allowed? What's the minimum lease?": "반려동물 키울 수 있어요? 최소 계약 기간은요?",
  "No pets, and the minimum lease is one year.": "반려동물은 안 되고, 최소 1년 계약이에요.",

  // ── landlord-repair ──
  "Asking the landlord for repairs": "집주인에게 수리 요청하기",
  "壞了 = broken, 漏水 = leaking, 跳電 = the breaker tripped. Sending a photo on LINE is the Taiwanese way.": "壞了=고장 났어요, 漏水=물이 새요, 跳電=차단기가 내려갔어요. 사진을 LINE으로 보내는 게 타이완식이에요.",
  "Hi, the AC is broken; it doesn't cool.": "집주인님, 에어컨이 고장 나서 안 시원해요.",
  "Since when? Any strange noises?": "언제부터요? 이상한 소리 나요?",
  "Since last night. I'll send you a photo.": "어젯밤부터요. 사진 찍어서 보내 드릴게요.",
  "I'll have a repairman come tomorrow afternoon. Will you be home?": "내일 오후에 기사님 보낼게요. 집에 있어요?",
  "I'll be home after three.": "3시 이후에는 집에 있어요.",
  "Also, the bathroom tap is leaking.": "그리고 욕실 수도꼭지도 물이 새요.",

  // ── garbage ──
  "Taking out the trash": "쓰레기 버리기·쓰레기차",
  "Garbage trucks come at fixed times playing music (Für Elise). Regular trash needs the official bag; recyclables go to the second truck.": "쓰레기차(垃圾車)가 정해진 시간에 음악(엘리제를 위하여)을 울리며 와요. 일반 쓰레기는 전용 봉투에, 재활용은 뒤따라오는 차에 따로 내요.",
  "What time does the garbage truck come?": "쓰레기차가 몇 시에 와요?",
  "7:30 pm, at the end of the lane.": "저녁 7시 반에 골목 입구로 와요.",
  "Do I need the official bag for regular trash?": "일반 쓰레기는 전용 봉투를 써야 해요?",
  "In Taipei, yes; convenience stores sell them. Recycling goes separately.": "타이베이는 써야 해요. 편의점에서 팔아요. 재활용은 따로 분리해요.",
  "Where does food waste go?": "음식물 쓰레기는 어디에 버려요?",
  "Into the bucket next to the truck.": "쓰레기차 옆에 있는 통에 버리세요.",

  // ── neighbor ──
  "Talking to the doorman & neighbors": "경비원·이웃과 이야기하기",
  "The building 管理員 (doorman) handles parcels and repairs. A parcel is 包裹; you'll hear 有你的包裹 when one arrives.": "건물 管理員(경비원)이 택배와 수리를 담당해요. 택배는 包裹, 도착하면 有你的包裹라고 해요.",
  "Are you the new tenant? Which floor?": "새로 이사 오셨어요? 몇 층 사세요?",
  "Yes, fifth floor. Nice to meet you.": "네, 5층 살아요. 잘 부탁드려요.",
  "There's a parcel for you at the front desk.": "택배 왔어요. 카운터에 있어요.",
  "Thanks. How do I pay the management fee?": "감사해요. 관리비는 어떻게 내요?",
  "Bring it to the office before the 5th each month.": "매달 5일 전에 관리실로 가져오세요.",
  "Sorry, the upstairs neighbor is noisy at night. Could you have a word with them?": "죄송한데 위층이 밤에 너무 시끄러워요. 말씀 좀 해 주실 수 있어요?",

  // ── pay-bills ──
  "Paying bills at a convenience store": "편의점에서 공과금 내기",
  "Electricity, water, gas and phone bills can all be paid by scanning the barcode at any convenience store. Overdue (逾期) bills may be refused.": "전기·수도·가스·전화 요금은 편의점에서 바코드를 찍으면 다 낼 수 있어요. 기한이 지난(逾期) 청구서는 거절될 수 있어요.",
  "I'd like to pay my electricity bill.": "전기요금 내려고요.",
  "Sure, the bill please. That's 1,230 in total.": "네, 청구서 주세요. 총 1,230위안이에요.",
  "Can I pay by card?": "카드로 결제할 수 있어요?",
  "Bills can only be paid in cash or with EasyCard.": "공과금은 현금이나 이지카드로만 낼 수 있어요.",
  "This one is past due; can I still pay it?": "이건 기한이 지났는데 아직 낼 수 있어요?",
  "Overdue ones have to be paid at Taipower.": "기한 지난 건 타이완전력(台電)에 가서 내야 해요.",

  // ── convenience ──
  "Checking out at a convenience store": "편의점에서 계산하기",
  "You'll be asked three things: bag? heat it up? receipt? 載具 is a digital receipt app; just say 不用 (no need).": "물어보는 건 세 가지예요: 봉투? 데워 드릴까요? 영수증(發票)? 載具는 영수증을 앱에 연결하는 거라 그냥 不用(필요 없어요)이라고 하면 돼요.",
  "Do you need a bag?": "봉투 필요하세요?",
  "No thanks.": "아니요, 괜찮아요.",
  "Should I heat up the bento?": "도시락 데워 드릴까요?",
  "Yes, please.": "네, 부탁해요.",
  "Do you have a receipt carrier? Print the receipt?": "載具 있으세요? 영수증 출력해 드릴까요?",
  "No carrier; I'll take the receipt.": "載具는 없어요. 영수증 주세요.",

  // ── drink-stand ──
  "Ordering at a drink stand": "음료 가게에서 주문하기",
  "Sweetness: 正常, 少糖, 半糖, 微糖, 無糖. Ice: 正常冰, 少冰, 微冰, 去冰. Sizes: M (中杯) and L (大杯).": "당도: 正常, 少糖, 半糖, 微糖, 無糖. 얼음: 正常冰, 少冰, 微冰, 去冰. 사이즈는 M(中杯)과 L(大杯)이에요.",
  "Hi, what would you like?": "안녕하세요, 뭐 드릴까요?",
  "One bubble milk tea, large.": "버블 밀크티 한 잔, 라지로요.",
  "Sweetness and ice?": "당도와 얼음은요?",
  "Half sugar, less ice.": "반당, 얼음 적게요.",
  "Any toppings?": "토핑 추가하실래요?",
  "No. Can I pay with EasyCard?": "아니요. 이지카드로 결제할 수 있어요?",

  // ── night-market ──
  "Buying food at a night market": "야시장에서 음식 사기",
  "一份 = one portion, 不要辣 = not spicy, 內用/外帶 = eat here / take away. Stalls are mostly cash only.": "一份=1인분, 不要辣=안 맵게, 內用/外帶=매장/포장. 노점은 대부분 현금만 받아요.",
  "One fried chicken cutlet please, not spicy.": "사장님, 지파이(雞排) 하나요, 안 맵게 해 주세요.",
  "Should I cut it up?": "잘라 드릴까요?",
  "Yes please. How much?": "네, 잘라 주세요. 얼마예요?",
  "85. It'll be about five minutes.": "85위안이에요. 5분 정도 기다려 주세요.",
  "What's this? Can I try a piece?": "이건 뭐예요? 시식해 볼 수 있어요?",
  "Sweet potato balls. Here, try one.": "고구마볼(地瓜球)이에요. 자, 한번 드셔 보세요.",

  // ── market ──
  "Asking prices at the market": "시장에서 가격 묻기",
  "Markets sell by the 斤 (600g). 算便宜一點 asks for a discount; vendors bundle like 兩個一百 (two for 100).": "시장은 斤(600g) 단위로 팔아요. 算便宜一點은 좀 싸게 해 달라는 말이고, 상인은 兩個一百(두 개 100위안)처럼 묶어서 불러요.",
  "Ma'am, how much is this per jin?": "사장님, 이거 한 근(斤)에 얼마예요?",
  "60 a jin, or two for 100.": "한 근 60위안, 두 근에 100위안.",
  "Two jin then. Could you pick sweeter ones for me?": "그럼 두 근 주세요. 좀 단 걸로 골라 주실래요?",
  "Sure, these ones are very sweet.": "그럼요, 이것들이 아주 달아요.",
  "What vegetable is this? How do you cook it?": "이건 무슨 채소예요? 어떻게 요리해요?",
  "Sweet potato leaves. Stir-fry with garlic and it's delicious.": "고구마 잎이에요. 마늘 넣고 볶으면 아주 맛있어요.",

  // ── return-item ──
  "Returning or exchanging an item": "반품·교환하기",
  "Many stores accept returns within 7 days with the receipt (發票). Online purchases have a 7-day 鑑賞期 (cooling-off period).": "많은 가게가 영수증(發票)이 있으면 7일 안에 반품을 받아요. 온라인 구매는 7일 鑑賞期(청약 철회 기간)가 있어요.",
  "Excuse me, I'd like to return this.": "실례합니다, 이거 반품하려고요.",
  "Do you have the receipt? What's the problem?": "영수증 있으세요? 무슨 문제예요?",
  "Yes. It's too small; can I exchange it for one size up?": "있어요. 사이즈가 너무 작아서 한 사이즈 큰 걸로 교환할 수 있어요?",
  "Sure, as long as the tag is still on.": "돼요. 태그 안 떼셨으면 교환 가능해요.",
  "If you don't have a larger one, can I get a refund?": "큰 사이즈가 없으면 환불해 주실 수 있어요?",
  "Refunds are fine within seven days.": "7일 이내면 환불 돼요.",

  // ── restaurant ──
  "Ordering & paying at a local eatery": "식당에서 주문·계산하기",
  "Local eateries often use paper order slips: write quantities and hand it over. Say 內用 to eat in; ask for the bill with 買單 or 結帳.": "동네 식당은 종이 주문표에 수량을 써서 건네는 곳이 많아요. 內用이라고 하면 매장 식사, 계산은 買單이나 結帳라고 해요.",
  "Eating in or take-out? How many?": "매장에서 드세요, 포장이세요? 몇 분이세요?",
  "Eating in, two people.": "매장에서요, 두 명이에요.",
  "The menu's on the table; fill it out and bring it over.": "메뉴판은 테이블에 있어요. 적어서 가져오세요.",
  "One beef noodle soup, one braised platter, no green onion.": "우육면 하나, 루웨이(滷味) 하나, 파는 빼 주세요.",
  "Check, please.": "사장님, 계산할게요.",
  "240 in total. Do you want a receipt?": "총 240위안이에요. 영수증 필요하세요?",

  // ── ask-leave ──
  "Asking for time off": "휴가 신청하기",
  "請假 = request leave. Types: 病假 (sick), 事假 (personal), 特休 (paid annual leave). 補休 = compensatory day off.": "請假=휴가 신청. 종류: 病假(병가), 事假(개인 사유), 特休(유급 연차). 補休=대체 휴무.",
  "Boss, I'd like to take next Friday off.": "사장님, 다음 주 금요일에 하루 휴가 내고 싶어요.",
  "What for? Which type of leave?": "무슨 일로요? 어떤 휴가로 할 거예요?",
  "I need to go to immigration for my ARC; personal leave.": "이민서에 거류증 처리하러 가야 해서요. 事假로 할게요.",
  "OK, remember to fill in the leave form.": "알았어요. 휴가 신청서 잊지 말고 써 주세요.",
  "I'm not feeling well today; I'd like to take sick leave.": "오늘 몸이 안 좋아서 병가 내고 싶어요.",
  "Get some rest. Bring a doctor's note tomorrow.": "푹 쉬세요. 내일 진단서 제출하세요.",

  // ── overtime ──
  "Overtime & shifts": "야근·근무 교대",
  "加班 = overtime, 加班費 = overtime pay, 排班 = the shift schedule, 輪班 = rotating shifts. 時薪 = hourly wage.": "加班=야근, 加班費=야근 수당, 排班=근무표, 輪班=교대 근무. 時薪=시급.",
  "Can you work overtime until eight today?": "오늘 8시까지 야근할 수 있어요?",
  "Yes. How is overtime pay calculated?": "네. 야근 수당은 어떻게 계산돼요?",
  "The first two hours are paid at 1.33x.": "처음 두 시간은 1.33배예요.",
  "Is next month's schedule out yet?": "다음 달 근무표 나왔어요?",
  "It's posted in the break room; go take a look.": "휴게실에 붙어 있어요. 직접 가서 보세요.",
  "I'd like to swap shifts with a coworker. Is that OK?": "동료와 근무 바꾸고 싶은데 괜찮아요?",

  // ── didnt-understand ──
  "When you didn't catch that": "못 알아들었을 때",
  "You'll use these five lines more than anything. Starting with 不好意思 softens it.": "이 다섯 문장을 가장 많이 쓸 거예요. 不好意思로 시작하면 부드러워져요.",
  "Sorry, could you say that again?": "죄송한데 다시 한 번 말씀해 주실래요?",
  "Could you speak more slowly? My Chinese isn't great.": "좀 천천히 말해 주실래요? 제가 중국어를 잘 못해요.",
  "How do you write that? Could you write it down for me?": "그 글자 어떻게 써요? 써서 보여 주실래요?",
  "Do you mean like this?": "이런 뜻이에요?",
  "Yes, exactly.": "맞아요, 맞아요. 바로 그거예요.",
  "Got it. Thanks for your patience.": "알겠어요. 친절하게 설명해 주셔서 감사해요.",

  // ── work-injury ──
  "Reporting a workplace injury": "업무 중 부상 보고하기",
  "A work injury is 職災. Report it to your supervisor the same day; at the hospital say 這是職災 so labor insurance covers it.": "업무 중 부상은 職災(산업재해)예요. 당일에 상사에게 보고하고, 병원에서 這是職災라고 말하면 노동보험으로 처리돼요.",
  "Sir, I just got injured while working.": "팀장님, 방금 일하다가 다쳤어요.",
  "Where are you hurt? Is it serious?": "어디 다쳤어요? 심해요?",
  "My hand got caught in the machine; it's bleeding.": "손이 기계에 끼어서 피가 나요.",
  "Go to the hospital first; I'll go with you.": "먼저 병원 가요. 내가 같이 갈게요.",
  "Does this count as a work injury? Can I use labor insurance?": "이거 산업재해로 인정돼요? 노동보험 쓸 수 있어요?",
  "Yes, I'll file the report for you.": "돼요. 내가 신고해 줄게요.",

  // ── small-talk ──
  "Small talk & introducing yourself": "가벼운 대화·자기소개",
  "Taiwanese often ask 你哪裡人 (where are you from?) and 來台灣多久了 (how long have you been here?). It's friendly curiosity.": "타이완 사람들은 你哪裡人(어디 사람이에요?), 來台灣多久了(타이완에 온 지 얼마나 됐어요?)를 자주 물어요. 친근한 호기심이에요.",
  "Where are you from? How long have you been in Taiwan?": "어디 사람이에요? 타이완에 온 지 얼마나 됐어요?",
  "I'm Indonesian. I've been in Taiwan for two years.": "인도네시아 사람이에요. 타이완에 온 지 2년 됐어요.",
  "Your Chinese is great! Have you gotten used to it here?": "중국어 정말 잘하시네요! 이제 적응됐어요?",
  "Still learning. It's hot, but people are kind.": "아직 배우고 있어요. 날씨는 덥지만 사람들이 친절해요.",
  "Let's grab a meal sometime!": "시간 나면 같이 밥 먹어요!",
  "Sure, let's add each other on LINE.": "좋아요, LINE 친구 추가해요.",

  // ── say-no ──
  "Turning down sales & solicitations": "영업·권유 거절하기",
  "Street promoters, phone sales, religious invites: 不用，謝謝 and keep walking is enough. If they persist: 我沒興趣 (not interested).": "거리 홍보, 전화 영업, 종교 권유는 不用，謝謝 하고 계속 걸어가면 충분해요. 계속 따라오면 我沒興趣(관심 없어요).",
  "Miss, would you like to look at our plans?": "아가씨, 저희 상품 한번 보실래요?",
  "Just one minute, it's free!": "1분만요, 무료예요!",
  "I'm not interested, and I'm in a hurry.": "관심 없어요. 지금 바빠요.",
  "Here's our flyer; contact us if you need anything.": "이건 저희 전단지예요. 필요하시면 연락 주세요.",
  "Please stop calling me.": "더 이상 전화하지 마세요.",

  // ── taxi ──
  "Taking a taxi": "택시 타기",
  "Showing the address on your phone is fastest. 跳表 = by the meter; 這裡停 = stop here. Drivers are called 運將.": "휴대폰으로 주소를 보여 주는 게 제일 빨라요. 跳表=미터기로, 這裡停=여기서 세워 주세요. 기사님은 運將이라고 불러요.",
  "Hi, I'd like to go to this address.": "안녕하세요, 이 주소로 가 주세요.",
  "OK. Should I take the highway?": "네. 고속도로로 갈까요?",
  "Whichever is faster. Roughly how much?": "빠른 쪽으로 가 주세요. 대략 얼마쯤 나와요?",
  "By the meter, around 300.": "미터기로 300위안 정도요.",
  "You can stop at the next intersection, thanks.": "앞 교차로에서 세워 주세요. 감사해요.",
  "Could I have a receipt?": "영수증 좀 주실 수 있어요?",

  // ── mrt-easycard ──
  "MRT & topping up your EasyCard": "지하철·이지카드 충전",
  "Top up (加值) your EasyCard at any convenience store or station. On buses, tap both when boarding and alighting.": "이지카드는 편의점이나 역에서 加值(충전)할 수 있어요. 버스는 탈 때와 내릴 때 모두 찍어요.",
  "Which line goes to Taipei Main Station?": "타이베이역까지 어느 노선을 타야 해요?",
  "Take the red line, toward Tamsui.": "빨간 노선 타고 단수이(淡水) 방향으로 가세요.",
  "My EasyCard is out of money. Where can I top it up?": "이지카드에 잔액이 없는데 어디서 충전해요?",
  "At that machine, or the service counter.": "저쪽 기계나 안내 데스크에서요.",
  "I'd like to top up 500.": "500위안 충전할게요.",
  "OK, place your card here.": "네, 카드를 여기에 올려 주세요.",

  // ── typhoon ──
  "Typhoons & work/school closures": "태풍·휴업·휴교",
  "停班停課 means work and school are cancelled. Each city announces it the night before. Stay indoors on typhoon days.": "停班停課는 직장과 학교가 모두 쉰다는 뜻이에요. 각 시에서 전날 밤에 발표해요. 태풍 날에는 밖에 나가지 마세요.",
  "A typhoon's coming tomorrow. Did you see the news?": "내일 태풍 온대요. 뉴스 봤어요?",
  "Will work and school be cancelled tomorrow?": "내일 휴업·휴교 해요?",
  "They announce it after 8 pm.": "저녁 8시 이후에 발표해요.",
  "If work is cancelled, do we still get paid that day?": "휴업하면 그날 월급 나와요?",
  "Salaried staff still get paid. Go stock up on some food first.": "월급제는 그대로 나와요. 먼저 먹을 것 좀 사다 놓으세요.",
  "OK, I'll bring in the things from the balcony.": "네, 베란다에 있는 것들 안으로 들여놓을게요."
},

vi: {
  // ── cats ──
  "Clinic & pharmacy": "Phòng khám & nhà thuốc",
  "Paperwork & bank": "Giấy tờ & ngân hàng",
  "Housing": "Nhà ở",
  "Shopping & food": "Mua sắm & ăn uống",
  "Work & people": "Công việc & giao tiếp",
  "Getting around & weather": "Đi lại & thời tiết",

  // ── clinic-checkin ──
  "Checking in at a clinic": "Đăng ký khám ở phòng khám",
  "掛號 means registering to see the doctor. For a first visit, hand over your NHI card and ARC.": "掛號 nghĩa là đăng ký khám bệnh. Lần đầu đi khám, chỉ cần đưa thẻ bảo hiểm y tế và thẻ cư trú là được.",
  "Do you have your NHI card?": "Anh/chị có thẻ bảo hiểm y tế không?",
  "Yes, here's my NHI card.": "Có, đây là thẻ bảo hiểm y tế của mình.",
  "First visit or follow-up?": "Khám lần đầu hay tái khám?",
  "First visit. It's my first time here.": "Khám lần đầu, mình mới đến đây lần đầu.",
  "Take your temperature first; we'll call you shortly.": "Đo nhiệt độ trước nhé, lát nữa gọi tên anh/chị.",
  "OK, I'll wait outside.": "Vâng, mình đợi ở ngoài.",

  // ── symptoms ──
  "Describing symptoms": "Nói về triệu chứng",
  "不舒服 is the all-purpose 'I feel unwell'. Pointing and saying 這裡痛 (it hurts here) works fine.": "不舒服 là cách nói chung cho 'thấy không khỏe'. Chỉ vào chỗ đau và nói 這裡痛 (đau ở đây) là người ta hiểu.",
  "What's bothering you?": "Anh/chị thấy khó chịu ở đâu?",
  "I've had a fever since yesterday and my throat really hurts.": "Mình bị sốt từ hôm qua, họng đau lắm.",
  "Any coughing or diarrhea?": "Có ho hay tiêu chảy không?",
  "A little cough, no diarrhea.": "Ho một chút, không tiêu chảy.",
  "I'm allergic to penicillin.": "Mình bị dị ứng với penicillin.",
  "OK, I'll prescribe three days of medicine.": "Được rồi, tôi kê thuốc ba ngày cho anh/chị.",

  // ── pharmacy ──
  "Buying medicine at a pharmacy": "Mua thuốc ở nhà thuốc",
  "Over-the-counter medicine is 成藥. Tell the pharmacist your symptoms and they'll pick one for you.": "Thuốc không cần đơn gọi là 成藥. Nói triệu chứng cho dược sĩ, họ sẽ chọn thuốc cho mình.",
  "I have a headache. Do you have painkillers?": "Mình đau đầu, có thuốc giảm đau không?",
  "Yes. Take one tablet at a time.": "Có, cái này mỗi lần uống một viên.",
  "How many times a day can I take it?": "Một ngày uống được mấy lần?",
  "Three times at most, after meals.": "Tối đa ba lần, uống sau khi ăn.",
  "Will it make me sleepy?": "Uống có bị buồn ngủ không?",
  "This one won't.": "Loại này thì không.",

  // ── take-medicine ──
  "Understanding your prescription": "Hiểu cách uống thuốc",
  "Medicine bags say things like 三餐飯後 (after each meal), 睡前 (before bed), 外用 (external use). Just show the bag and ask.": "Túi thuốc thường ghi 三餐飯後 (sau ba bữa ăn), 睡前 (trước khi ngủ), 外用 (dùng ngoài da). Không hiểu thì cứ đưa túi thuốc ra hỏi.",
  "Here's your medicine, three times a day.": "Thuốc của anh/chị đây, ngày uống ba lần.",
  "Before or after meals?": "Uống trước hay sau khi ăn?",
  "After meals. This packet is for before bed.": "Sau khi ăn. Gói này thì uống trước khi ngủ.",
  "How do I use this ointment?": "Thuốc mỡ này dùng thế nào?",
  "Apply twice a day, just a thin layer.": "Ngày bôi hai lần, bôi một lớp mỏng thôi.",
  "Thanks, got it.": "Cảm ơn, mình hiểu rồi.",

  // ── emergency ──
  "Emergencies & calling an ambulance": "Khẩn cấp & gọi xe cấp cứu",
  "Ambulance/fire: 119. Police: 110. If you can't say the address, read a nearby shop sign.": "Cấp cứu/cháy: 119. Cảnh sát: 110. Không nói được địa chỉ thì đọc bảng hiệu cửa hàng gần đó.",
  "Help! Please call an ambulance.": "Cứu với! Gọi xe cấp cứu giúp mình!",
  "What happened? Where are you?": "Có chuyện gì? Ở đâu vậy?",
  "Someone fainted, in front of the FamilyMart on Zhongshan Road.": "Có người ngất xỉu, ở trước FamilyMart đường Trung Sơn (中山路).",
  "Is he still breathing?": "Người đó còn thở không?",
  "Yes, but he won't wake up.": "Còn, nhưng gọi không tỉnh.",
  "The ambulance is on its way. Don't move him.": "Xe cấp cứu đến ngay, đừng di chuyển người đó.",

  // ── arc-renew ──
  "Renewing your ARC": "Gia hạn thẻ cư trú (ARC)",
  "At the immigration office, take a 號碼牌 (number ticket) and wait. You can renew from 30 days before expiry.": "Ở Sở Di dân, lấy 號碼牌 (số thứ tự) rồi ngồi đợi. Có thể gia hạn từ 30 ngày trước khi hết hạn.",
  "I'd like to renew my ARC.": "Mình muốn gia hạn thẻ cư trú.",
  "Please take a number first. Have your passport and ARC ready.": "Lấy số trước nhé, chuẩn bị hộ chiếu và thẻ cư trú.",
  "You'll also need a photo and the application form.": "Còn cần thêm ảnh và đơn đăng ký nữa.",
  "Where can I get the form?": "Đơn lấy ở đâu?",
  "On that shelf. Fill it in and come back.": "Ở kệ đằng kia, điền xong rồi quay lại.",
  "How long is the wait?": "Phải đợi khoảng bao lâu?",

  // ── bank-account ──
  "Opening a bank account": "Mở tài khoản ngân hàng",
  "You need your ARC, passport, and a seal or signature. 存摺 = passbook, 提款卡 = ATM card.": "Cần thẻ cư trú, hộ chiếu, con dấu hoặc chữ ký. 存摺 = sổ ngân hàng, 提款卡 = thẻ ATM.",
  "I'd like to open an account.": "Mình muốn mở tài khoản.",
  "Your ARC and passport, please. Do you have a seal?": "Cho tôi xin thẻ cư trú và hộ chiếu. Anh/chị có con dấu không?",
  "No seal. Can I sign instead?": "Không có con dấu, ký tên được không?",
  "Sure. Do you want an ATM card and online banking too?": "Được. Có làm thẻ ATM và ngân hàng trực tuyến luôn không?",
  "Both, please.": "Làm cả hai luôn, cảm ơn.",
  "Sign here. The card will be mailed in a week.": "Ký vào đây nhé, thẻ sẽ gửi qua bưu điện sau một tuần.",

  // ── remit ──
  "Sending money home": "Gửi tiền về nước",
  "Wire transfer is 匯款, the fee is 手續費. Writing the amount and recipient's account details on paper speeds things up.": "Chuyển tiền gọi là 匯款, phí là 手續費. Viết sẵn số tiền và thông tin tài khoản người nhận ra giấy sẽ nhanh hơn.",
  "I want to send money to Vietnam.": "Mình muốn gửi tiền về Việt Nam.",
  "How much? Do you have the recipient's account number?": "Gửi bao nhiêu? Có số tài khoản người nhận không?",
  "20,000 NTD. The details are on this paper.": "20.000 Đài tệ, thông tin mình viết trên tờ giấy này.",
  "The fee is 300 NTD; it arrives in about three business days.": "Phí 300 Đài tệ, khoảng ba ngày làm việc là tới.",
  "What's today's exchange rate?": "Tỷ giá hôm nay bao nhiêu?",
  "It's on this screen. Please confirm the amount.": "Trên màn hình này, anh/chị xác nhận số tiền nhé.",

  // ── sim-card ──
  "Getting a SIM card": "Đăng ký SIM điện thoại",
  "預付卡 = prepaid, 月租 = monthly plan. Foreigners need both ARC and passport.": "預付卡 = trả trước, 月租 = gói tháng. Người nước ngoài cần cả thẻ cư trú và hộ chiếu.",
  "I'd like a prepaid SIM. Is there an unlimited data plan?": "Mình muốn làm SIM trả trước, có gói mạng không giới hạn không?",
  "Yes, 30 days for 499 with unlimited data.": "Có, 30 ngày 499 Đài tệ, mạng không giới hạn.",
  "Two IDs please: your ARC and passport.": "Cho tôi xin hai giấy tờ: thẻ cư trú và hộ chiếu.",
  "Can I keep my current number?": "Mình giữ số cũ được không?",
  "Yes, that's number porting; it takes about a day.": "Được, đó là chuyển mạng giữ số (攜碼), khoảng một ngày là xong.",
  "OK, let's do that one.": "Vậy làm cái đó đi.",

  // ── police-lost ──
  "Reporting lost or stolen items": "Báo mất đồ hoặc bị trộm",
  "報案 = filing a police report. For a lost card, call the bank first and ask to 停卡 (freeze the card).": "報案 = trình báo công an. Mất thẻ thì gọi ngân hàng trước để 停卡 (khóa thẻ).",
  "I lost my wallet. I want to file a report.": "Mình mất ví, mình muốn trình báo.",
  "When and where did you lose it?": "Mất lúc nào, ở đâu?",
  "This afternoon, probably on the MRT.": "Chiều nay, có lẽ là trên tàu điện MRT.",
  "What was inside?": "Trong ví có gì?",
  "My ARC, ATM card, and 2,000 in cash.": "Thẻ cư trú, thẻ ATM và 2.000 Đài tệ tiền mặt.",
  "This is your report receipt; you'll need it to replace your documents.": "Đây là giấy xác nhận trình báo, làm lại giấy tờ sẽ cần đến.",

  // ── view-room ──
  "Viewing an apartment": "Đi xem phòng",
  "押金 = deposit (usually 2 months), 租金 = rent. Always ask 含水電嗎 (are utilities included?).": "押金 = tiền cọc (thường 2 tháng), 租金 = tiền thuê. Nhớ hỏi 含水電嗎 (có bao điện nước không?).",
  "Hello, I'd like to view the room.": "Chào anh/chị, mình muốn xem phòng.",
  "8,000 a month, two months' deposit.": "Một tháng 8.000, cọc hai tháng.",
  "Are utilities and internet included?": "Có bao điện nước và mạng không?",
  "Internet is included; electricity is 5 per unit.": "Mạng thì bao, tiền điện 5 Đài tệ một số.",
  "Are pets allowed? What's the minimum lease?": "Nuôi thú cưng được không? Thuê ngắn nhất là bao lâu?",
  "No pets, and the minimum lease is one year.": "Không được nuôi thú cưng, hợp đồng ít nhất một năm.",

  // ── landlord-repair ──
  "Asking the landlord for repairs": "Nhờ chủ nhà sửa đồ",
  "壞了 = broken, 漏水 = leaking, 跳電 = the breaker tripped. Sending a photo on LINE is the Taiwanese way.": "壞了 = hỏng rồi, 漏水 = rò nước, 跳電 = nhảy cầu dao. Chụp ảnh gửi qua LINE là kiểu người Đài Loan hay làm.",
  "Hi, the AC is broken; it doesn't cool.": "Chủ nhà ơi, máy lạnh hỏng rồi, không lạnh.",
  "Since when? Any strange noises?": "Từ khi nào? Có tiếng gì lạ không?",
  "Since last night. I'll send you a photo.": "Từ tối qua, mình chụp ảnh gửi anh/chị.",
  "I'll have a repairman come tomorrow afternoon. Will you be home?": "Mai chiều tôi cho thợ qua xem, em có ở nhà không?",
  "I'll be home after three.": "Sau ba giờ mình ở nhà.",
  "Also, the bathroom tap is leaking.": "Với lại, vòi nước trong nhà tắm cũng bị rò.",

  // ── garbage ──
  "Taking out the trash": "Đổ rác & xe rác",
  "Garbage trucks come at fixed times playing music (Für Elise). Regular trash needs the official bag; recyclables go to the second truck.": "Xe rác (垃圾車) đến giờ cố định, có nhạc (Für Elise). Rác thường phải dùng túi chuyên dụng; rác tái chế bỏ lên xe thứ hai.",
  "What time does the garbage truck come?": "Cho hỏi xe rác mấy giờ tới?",
  "7:30 pm, at the end of the lane.": "Bảy giờ rưỡi tối, ở đầu hẻm.",
  "Do I need the official bag for regular trash?": "Rác thường có phải dùng túi chuyên dụng không?",
  "In Taipei, yes; convenience stores sell them. Recycling goes separately.": "Ở Đài Bắc thì phải, cửa hàng tiện lợi có bán. Rác tái chế phân riêng.",
  "Where does food waste go?": "Rác thức ăn thừa đổ ở đâu?",
  "Into the bucket next to the truck.": "Đổ vào thùng cạnh xe rác.",

  // ── neighbor ──
  "Talking to the doorman & neighbors": "Nói chuyện với bảo vệ & hàng xóm",
  "The building 管理員 (doorman) handles parcels and repairs. A parcel is 包裹; you'll hear 有你的包裹 when one arrives.": "管理員 (bảo vệ tòa nhà) lo nhận bưu phẩm và sửa chữa. Bưu phẩm là 包裹; hàng tới sẽ nghe 有你的包裹.",
  "Are you the new tenant? Which floor?": "Bạn mới chuyển đến à? Ở tầng mấy?",
  "Yes, fifth floor. Nice to meet you.": "Vâng, mình ở tầng năm, mong được giúp đỡ.",
  "There's a parcel for you at the front desk.": "Có bưu phẩm của bạn ở quầy.",
  "Thanks. How do I pay the management fee?": "Cảm ơn. Cho hỏi phí quản lý đóng thế nào?",
  "Bring it to the office before the 5th each month.": "Mỗi tháng đem tới phòng quản lý trước ngày 5.",
  "Sorry, the upstairs neighbor is noisy at night. Could you have a word with them?": "Xin lỗi, tầng trên ban đêm ồn quá, anh/chị nhắc họ giúp mình được không?",

  // ── pay-bills ──
  "Paying bills at a convenience store": "Đóng hóa đơn ở cửa hàng tiện lợi",
  "Electricity, water, gas and phone bills can all be paid by scanning the barcode at any convenience store. Overdue (逾期) bills may be refused.": "Tiền điện, nước, gas, điện thoại đều đóng được ở cửa hàng tiện lợi, chỉ cần quét mã vạch. Hóa đơn quá hạn (逾期) có thể bị từ chối.",
  "I'd like to pay my electricity bill.": "Mình muốn đóng tiền điện.",
  "Sure, the bill please. That's 1,230 in total.": "Được, cho tôi hóa đơn. Tổng cộng 1.230.",
  "Can I pay by card?": "Trả bằng thẻ được không?",
  "Bills can only be paid in cash or with EasyCard.": "Đóng hóa đơn chỉ nhận tiền mặt hoặc thẻ EasyCard.",
  "This one is past due; can I still pay it?": "Tờ này quá hạn rồi, còn đóng được không?",
  "Overdue ones have to be paid at Taipower.": "Quá hạn thì phải đến công ty điện lực Taipower (台電) đóng.",

  // ── convenience ──
  "Checking out at a convenience store": "Thanh toán ở cửa hàng tiện lợi",
  "You'll be asked three things: bag? heat it up? receipt? 載具 is a digital receipt app; just say 不用 (no need).": "Họ sẽ hỏi ba thứ: túi? hâm nóng? hóa đơn? 載具 là app lưu hóa đơn điện tử, cứ nói 不用 (không cần) là được.",
  "Do you need a bag?": "Có cần túi không?",
  "No thanks.": "Không cần, cảm ơn.",
  "Should I heat up the bento?": "Cơm hộp có hâm nóng không?",
  "Yes, please.": "Có, hâm giúp mình.",
  "Do you have a receipt carrier? Print the receipt?": "Có 載具 không? Có in hóa đơn không?",
  "No carrier; I'll take the receipt.": "Không có 載具, cho mình hóa đơn.",

  // ── drink-stand ──
  "Ordering at a drink stand": "Gọi đồ ở quán trà sữa",
  "Sweetness: 正常, 少糖, 半糖, 微糖, 無糖. Ice: 正常冰, 少冰, 微冰, 去冰. Sizes: M (中杯) and L (大杯).": "Độ ngọt: 正常, 少糖, 半糖, 微糖, 無糖. Đá: 正常冰, 少冰, 微冰, 去冰. Cỡ: M (中杯) và L (大杯).",
  "Hi, what would you like?": "Chào bạn, uống gì?",
  "One bubble milk tea, large.": "Một ly trà sữa trân châu, cỡ lớn.",
  "Sweetness and ice?": "Đường đá thế nào?",
  "Half sugar, less ice.": "Nửa đường, ít đá.",
  "Any toppings?": "Có thêm topping không?",
  "No. Can I pay with EasyCard?": "Không. Trả bằng thẻ EasyCard được không?",

  // ── night-market ──
  "Buying food at a night market": "Mua đồ ăn ở chợ đêm",
  "一份 = one portion, 不要辣 = not spicy, 內用/外帶 = eat here / take away. Stalls are mostly cash only.": "一份 = một phần, 不要辣 = không cay, 內用/外帶 = ăn tại chỗ / mang về. Hàng quán đa số chỉ nhận tiền mặt.",
  "One fried chicken cutlet please, not spicy.": "Chủ quán, cho một phần gà chiên (雞排), không cay.",
  "Should I cut it up?": "Có cắt không?",
  "Yes please. How much?": "Cắt giúp mình, cảm ơn. Bao nhiêu tiền?",
  "85. It'll be about five minutes.": "85, đợi khoảng năm phút nhé.",
  "What's this? Can I try a piece?": "Cái này là gì? Nếm thử được không?",
  "Sweet potato balls. Here, try one.": "Bánh khoai lang viên (地瓜球) đó, đây, thử đi.",

  // ── market ──
  "Asking prices at the market": "Hỏi giá ở chợ",
  "Markets sell by the 斤 (600g). 算便宜一點 asks for a discount; vendors bundle like 兩個一百 (two for 100).": "Chợ bán theo 斤 (600g). 算便宜一點 là xin bớt giá; người bán hay gom kiểu 兩個一百 (hai cái 100).",
  "Ma'am, how much is this per jin?": "Cô ơi, cái này một cân (斤) bao nhiêu?",
  "60 a jin, or two for 100.": "Một cân 60, hai cân 100.",
  "Two jin then. Could you pick sweeter ones for me?": "Vậy cho mình hai cân, chọn quả ngọt ngọt giúp mình được không?",
  "Sure, these ones are very sweet.": "Được, mấy quả này ngọt lắm.",
  "What vegetable is this? How do you cook it?": "Rau này là rau gì? Nấu thế nào?",
  "Sweet potato leaves. Stir-fry with garlic and it's delicious.": "Rau lang đó, xào tỏi là ngon.",

  // ── return-item ──
  "Returning or exchanging an item": "Trả hoặc đổi hàng",
  "Many stores accept returns within 7 days with the receipt (發票). Online purchases have a 7-day 鑑賞期 (cooling-off period).": "Nhiều cửa hàng cho trả hàng trong 7 ngày nếu có hóa đơn (發票). Mua online có 7 ngày 鑑賞期 (thời gian được trả hàng).",
  "Excuse me, I'd like to return this.": "Xin lỗi, mình muốn trả cái này.",
  "Do you have the receipt? What's the problem?": "Có mang hóa đơn không? Bị sao vậy?",
  "Yes. It's too small; can I exchange it for one size up?": "Có. Nó nhỏ quá, đổi lên một size được không?",
  "Sure, as long as the tag is still on.": "Được, chưa cắt tag là đổi được.",
  "If you don't have a larger one, can I get a refund?": "Nếu không có size lớn, hoàn tiền được không?",
  "Refunds are fine within seven days.": "Trong bảy ngày đều hoàn tiền được.",

  // ── restaurant ──
  "Ordering & paying at a local eatery": "Gọi món & tính tiền ở quán ăn",
  "Local eateries often use paper order slips: write quantities and hand it over. Say 內用 to eat in; ask for the bill with 買單 or 結帳.": "Quán ăn hay dùng phiếu gọi món bằng giấy: ghi số lượng rồi đưa. Nói 內用 là ăn tại quán; tính tiền thì nói 買單 hoặc 結帳.",
  "Eating in or take-out? How many?": "Ăn ở đây hay mang về? Mấy người?",
  "Eating in, two people.": "Ăn ở đây, hai người.",
  "The menu's on the table; fill it out and bring it over.": "Menu ở trên bàn, ghi xong đem lại đây.",
  "One beef noodle soup, one braised platter, no green onion.": "Một tô mì bò, một phần đồ kho (滷味), không hành.",
  "Check, please.": "Chủ quán, tính tiền.",
  "240 in total. Do you want a receipt?": "Tổng cộng 240, có lấy hóa đơn không?",

  // ── ask-leave ──
  "Asking for time off": "Xin nghỉ phép",
  "請假 = request leave. Types: 病假 (sick), 事假 (personal), 特休 (paid annual leave). 補休 = compensatory day off.": "請假 = xin nghỉ. Các loại: 病假 (nghỉ bệnh), 事假 (nghỉ việc riêng), 特休 (phép năm có lương). 補休 = nghỉ bù.",
  "Boss, I'd like to take next Friday off.": "Sếp, thứ sáu tuần sau em muốn xin nghỉ một ngày.",
  "What for? Which type of leave?": "Việc gì? Xin loại nghỉ nào?",
  "I need to go to immigration for my ARC; personal leave.": "Em phải đi Sở Di dân làm thẻ cư trú, xin nghỉ việc riêng (事假).",
  "OK, remember to fill in the leave form.": "Được, nhớ điền đơn xin nghỉ.",
  "I'm not feeling well today; I'd like to take sick leave.": "Hôm nay em thấy không khỏe, em muốn xin nghỉ bệnh.",
  "Get some rest. Bring a doctor's note tomorrow.": "Nghỉ ngơi cho khỏe, mai nộp giấy khám bệnh.",

  // ── overtime ──
  "Overtime & shifts": "Tăng ca & ca làm",
  "加班 = overtime, 加班費 = overtime pay, 排班 = the shift schedule, 輪班 = rotating shifts. 時薪 = hourly wage.": "加班 = tăng ca, 加班費 = tiền tăng ca, 排班 = lịch ca, 輪班 = làm theo ca xoay. 時薪 = lương theo giờ.",
  "Can you work overtime until eight today?": "Hôm nay tăng ca đến tám giờ được không?",
  "Yes. How is overtime pay calculated?": "Được. Tiền tăng ca tính thế nào?",
  "The first two hours are paid at 1.33x.": "Hai giờ đầu tính 1,33 lần.",
  "Is next month's schedule out yet?": "Lịch ca tháng sau ra chưa?",
  "It's posted in the break room; go take a look.": "Dán ở phòng nghỉ, tự đi xem nhé.",
  "I'd like to swap shifts with a coworker. Is that OK?": "Em muốn đổi ca với đồng nghiệp, được không?",

  // ── didnt-understand ──
  "When you didn't catch that": "Khi nghe không kịp",
  "You'll use these five lines more than anything. Starting with 不好意思 softens it.": "Năm câu này sẽ dùng nhiều hơn bất cứ câu nào. Mở đầu bằng 不好意思 sẽ nghe nhẹ nhàng hơn.",
  "Sorry, could you say that again?": "Xin lỗi, nói lại lần nữa được không?",
  "Could you speak more slowly? My Chinese isn't great.": "Nói chậm một chút được không? Tiếng Trung mình chưa tốt.",
  "How do you write that? Could you write it down for me?": "Chữ đó viết thế nào? Viết cho mình xem được không?",
  "Do you mean like this?": "Ý anh/chị là như vậy hả?",
  "Yes, exactly.": "Đúng đúng, đúng rồi.",
  "Got it. Thanks for your patience.": "Mình hiểu rồi, cảm ơn anh/chị đã kiên nhẫn.",

  // ── work-injury ──
  "Reporting a workplace injury": "Báo tai nạn lao động",
  "A work injury is 職災. Report it to your supervisor the same day; at the hospital say 這是職災 so labor insurance covers it.": "Bị thương khi làm việc là 職災 (tai nạn lao động). Báo quản lý ngay trong ngày; ở bệnh viện nói 這是職災 để được bảo hiểm lao động chi trả.",
  "Sir, I just got injured while working.": "Anh quản lý, em vừa bị thương khi đang làm việc.",
  "Where are you hurt? Is it serious?": "Bị thương ở đâu? Nặng không?",
  "My hand got caught in the machine; it's bleeding.": "Tay em bị máy kẹp, chảy máu rồi.",
  "Go to the hospital first; I'll go with you.": "Đi bệnh viện trước, anh đi cùng em.",
  "Does this count as a work injury? Can I use labor insurance?": "Cái này có tính là tai nạn lao động không? Dùng bảo hiểm lao động được không?",
  "Yes, I'll file the report for you.": "Có, anh sẽ khai báo cho em.",

  // ── small-talk ──
  "Small talk & introducing yourself": "Trò chuyện & giới thiệu bản thân",
  "Taiwanese often ask 你哪裡人 (where are you from?) and 來台灣多久了 (how long have you been here?). It's friendly curiosity.": "Người Đài Loan hay hỏi 你哪裡人 (bạn người nước nào?) và 來台灣多久了 (đến Đài Loan bao lâu rồi?). Chỉ là tò mò thân thiện thôi.",
  "Where are you from? How long have you been in Taiwan?": "Bạn người nước nào? Đến Đài Loan bao lâu rồi?",
  "I'm Indonesian. I've been in Taiwan for two years.": "Mình là người Indonesia, đến Đài Loan hai năm rồi.",
  "Your Chinese is great! Have you gotten used to it here?": "Bạn nói tiếng Trung giỏi quá! Quen chưa?",
  "Still learning. It's hot, but people are kind.": "Vẫn đang học. Trời nóng, nhưng người ở đây tốt lắm.",
  "Let's grab a meal sometime!": "Khi nào rảnh đi ăn chung nhé!",
  "Sure, let's add each other on LINE.": "Được đó, thêm LINE đi.",

  // ── say-no ──
  "Turning down sales & solicitations": "Từ chối chào hàng & mời gọi",
  "Street promoters, phone sales, religious invites: 不用，謝謝 and keep walking is enough. If they persist: 我沒興趣 (not interested).": "Người phát tờ rơi, bán hàng qua điện thoại, mời đi lễ: nói 不用，謝謝 rồi đi tiếp là đủ. Nếu họ còn nài: 我沒興趣 (không quan tâm).",
  "Miss, would you like to look at our plans?": "Chị ơi, xem qua gói dịch vụ của bên em không?",
  "Just one minute, it's free!": "Một phút thôi, miễn phí mà!",
  "I'm not interested, and I'm in a hurry.": "Mình không quan tâm, mình đang vội.",
  "Here's our flyer; contact us if you need anything.": "Đây là tờ rơi của bên em, cần thì liên hệ nhé.",
  "Please stop calling me.": "Xin đừng gọi cho mình nữa.",

  // ── taxi ──
  "Taking a taxi": "Đi taxi",
  "Showing the address on your phone is fastest. 跳表 = by the meter; 這裡停 = stop here. Drivers are called 運將.": "Đưa địa chỉ trên điện thoại cho tài xế xem là nhanh nhất. 跳表 = tính theo đồng hồ, 這裡停 = dừng ở đây. Tài xế được gọi là 運將.",
  "Hi, I'd like to go to this address.": "Chào anh, cho mình đến địa chỉ này.",
  "OK. Should I take the highway?": "Được, có đi đường cao tốc không?",
  "Whichever is faster. Roughly how much?": "Đường nào nhanh thì đi. Khoảng bao nhiêu tiền?",
  "By the meter, around 300.": "Tính theo đồng hồ, khoảng 300.",
  "You can stop at the next intersection, thanks.": "Dừng ở ngã tư phía trước là được, cảm ơn anh.",
  "Could I have a receipt?": "Cho mình xin hóa đơn được không?",

  // ── mrt-easycard ──
  "MRT & topping up your EasyCard": "Tàu MRT & nạp tiền thẻ EasyCard",
  "Top up (加值) your EasyCard at any convenience store or station. On buses, tap both when boarding and alighting.": "Nạp tiền (加值) thẻ EasyCard ở bất kỳ cửa hàng tiện lợi hay ga nào. Đi xe buýt nhớ quẹt thẻ cả khi lên và khi xuống.",
  "Which line goes to Taipei Main Station?": "Cho hỏi đi ga Đài Bắc thì lên tuyến nào?",
  "Take the red line, toward Tamsui.": "Đi tuyến đỏ, hướng Đạm Thủy (淡水).",
  "My EasyCard is out of money. Where can I top it up?": "Thẻ EasyCard của mình hết tiền rồi, nạp ở đâu?",
  "At that machine, or the service counter.": "Ở máy đằng kia, hoặc quầy dịch vụ.",
  "I'd like to top up 500.": "Mình nạp 500.",
  "OK, place your card here.": "Được, để thẻ vào đây.",

  // ── typhoon ──
  "Typhoons & work/school closures": "Bão & nghỉ làm nghỉ học",
  "停班停課 means work and school are cancelled. Each city announces it the night before. Stay indoors on typhoon days.": "停班停課 nghĩa là nghỉ làm nghỉ học. Mỗi thành phố công bố vào tối hôm trước. Ngày bão thì ở trong nhà.",
  "A typhoon's coming tomorrow. Did you see the news?": "Mai bão vào đó, bạn xem tin chưa?",
  "Will work and school be cancelled tomorrow?": "Mai có nghỉ làm nghỉ học không?",
  "They announce it after 8 pm.": "Sau tám giờ tối mới công bố.",
  "If work is cancelled, do we still get paid that day?": "Nếu nghỉ làm thì hôm đó có lương không?",
  "Salaried staff still get paid. Go stock up on some food first.": "Lương tháng thì vẫn tính. Bạn đi mua sẵn ít đồ đi.",
  "OK, I'll bring in the things from the balcony.": "Vâng, mình dọn đồ ngoài ban công vào."
},

id: {
  // ── cats ──
  "Clinic & pharmacy": "Klinik & apotek",
  "Paperwork & bank": "Urusan dokumen & bank",
  "Housing": "Tempat tinggal",
  "Shopping & food": "Belanja & makan",
  "Work & people": "Kerja & pergaulan",
  "Getting around & weather": "Transportasi & cuaca",

  // ── clinic-checkin ──
  "Checking in at a clinic": "Mendaftar di klinik",
  "掛號 means registering to see the doctor. For a first visit, hand over your NHI card and ARC.": "掛號 artinya mendaftar untuk berobat. Kalau kunjungan pertama, cukup serahkan kartu asuransi kesehatan NHI dan ARC.",
  "Do you have your NHI card?": "Ada kartu asuransi kesehatan NHI-nya?",
  "Yes, here's my NHI card.": "Ada, ini kartu asuransi kesehatan saya.",
  "First visit or follow-up?": "Kunjungan pertama atau kontrol ulang?",
  "First visit. It's my first time here.": "Kunjungan pertama, saya baru pertama kali ke sini.",
  "Take your temperature first; we'll call you shortly.": "Ukur suhu badan dulu ya, nanti dipanggil.",
  "OK, I'll wait outside.": "Baik, saya tunggu di luar.",

  // ── symptoms ──
  "Describing symptoms": "Menjelaskan gejala",
  "不舒服 is the all-purpose 'I feel unwell'. Pointing and saying 這裡痛 (it hurts here) works fine.": "不舒服 itu kata serba guna untuk 'badan tidak enak'. Tunjuk bagian yang sakit sambil bilang 這裡痛 (sakit di sini) juga sudah cukup.",
  "What's bothering you?": "Mana yang terasa tidak enak?",
  "I've had a fever since yesterday and my throat really hurts.": "Saya demam sejak kemarin, tenggorokan sakit sekali.",
  "Any coughing or diarrhea?": "Ada batuk atau diare?",
  "A little cough, no diarrhea.": "Batuk sedikit, tidak diare.",
  "I'm allergic to penicillin.": "Saya alergi penisilin.",
  "OK, I'll prescribe three days of medicine.": "Baik, saya resepkan obat untuk tiga hari.",

  // ── pharmacy ──
  "Buying medicine at a pharmacy": "Membeli obat di apotek",
  "Over-the-counter medicine is 成藥. Tell the pharmacist your symptoms and they'll pick one for you.": "Obat tanpa resep disebut 成藥. Bilang saja gejalanya ke apoteker, nanti dipilihkan.",
  "I have a headache. Do you have painkillers?": "Saya sakit kepala, ada obat pereda nyeri?",
  "Yes. Take one tablet at a time.": "Ada. Ini minum satu tablet setiap kali.",
  "How many times a day can I take it?": "Sehari boleh minum berapa kali?",
  "Three times at most, after meals.": "Paling banyak tiga kali, sesudah makan.",
  "Will it make me sleepy?": "Kalau diminum bikin ngantuk tidak?",
  "This one won't.": "Yang ini tidak.",

  // ── take-medicine ──
  "Understanding your prescription": "Memahami cara minum obat",
  "Medicine bags say things like 三餐飯後 (after each meal), 睡前 (before bed), 外用 (external use). Just show the bag and ask.": "Kantong obat biasanya tertulis 三餐飯後 (sesudah tiga kali makan), 睡前 (sebelum tidur), 外用 (obat luar). Kalau tidak paham, tunjukkan kantongnya dan tanya saja.",
  "Here's your medicine, three times a day.": "Ini obatnya, sehari tiga kali.",
  "Before or after meals?": "Sebelum atau sesudah makan?",
  "After meals. This packet is for before bed.": "Sesudah makan. Yang bungkus ini diminum sebelum tidur.",
  "How do I use this ointment?": "Salep ini cara pakainya bagaimana?",
  "Apply twice a day, just a thin layer.": "Oleskan dua kali sehari, tipis-tipis saja.",
  "Thanks, got it.": "Terima kasih, saya mengerti.",

  // ── emergency ──
  "Emergencies & calling an ambulance": "Keadaan darurat & memanggil ambulans",
  "Ambulance/fire: 119. Police: 110. If you can't say the address, read a nearby shop sign.": "Ambulans/kebakaran: 119. Polisi: 110. Kalau tidak bisa menyebut alamat, bacakan papan nama toko di dekat situ.",
  "Help! Please call an ambulance.": "Tolong! Tolong panggil ambulans.",
  "What happened? Where are you?": "Ada apa? Di mana lokasinya?",
  "Someone fainted, in front of the FamilyMart on Zhongshan Road.": "Ada orang pingsan, di depan FamilyMart di Jalan Zhongshan (中山路).",
  "Is he still breathing?": "Dia masih bernapas?",
  "Yes, but he won't wake up.": "Masih, tapi tidak bangun.",
  "The ambulance is on its way. Don't move him.": "Ambulans segera datang. Jangan pindahkan dia.",

  // ── arc-renew ──
  "Renewing your ARC": "Memperpanjang ARC (kartu izin tinggal)",
  "At the immigration office, take a 號碼牌 (number ticket) and wait. You can renew from 30 days before expiry.": "Di kantor imigrasi, ambil 號碼牌 (nomor antrean) lalu tunggu. Bisa diperpanjang mulai 30 hari sebelum masa berlaku habis.",
  "I'd like to renew my ARC.": "Saya mau memperpanjang ARC.",
  "Please take a number first. Have your passport and ARC ready.": "Ambil nomor antrean dulu ya, siapkan paspor dan ARC.",
  "You'll also need a photo and the application form.": "Perlu juga foto dan formulir permohonan.",
  "Where can I get the form?": "Formulirnya ambil di mana?",
  "On that shelf. Fill it in and come back.": "Di rak sebelah sana. Isi dulu, lalu kembali ke sini.",
  "How long is the wait?": "Kira-kira nunggu berapa lama?",

  // ── bank-account ──
  "Opening a bank account": "Membuka rekening bank",
  "You need your ARC, passport, and a seal or signature. 存摺 = passbook, 提款卡 = ATM card.": "Perlu ARC, paspor, dan stempel atau tanda tangan. 存摺 = buku tabungan, 提款卡 = kartu ATM.",
  "I'd like to open an account.": "Saya mau buka rekening.",
  "Your ARC and passport, please. Do you have a seal?": "Tolong ARC dan paspornya. Ada stempel?",
  "No seal. Can I sign instead?": "Tidak ada stempel, boleh tanda tangan saja?",
  "Sure. Do you want an ATM card and online banking too?": "Boleh. Mau bikin kartu ATM dan internet banking juga?",
  "Both, please.": "Dua-duanya, ya.",
  "Sign here. The card will be mailed in a week.": "Tanda tangan di sini. Kartunya dikirim lewat pos seminggu lagi.",

  // ── remit ──
  "Sending money home": "Mengirim uang ke kampung",
  "Wire transfer is 匯款, the fee is 手續費. Writing the amount and recipient's account details on paper speeds things up.": "Transfer uang disebut 匯款, biayanya 手續費. Tulis dulu jumlah dan data rekening penerima di kertas supaya lebih cepat.",
  "I want to send money to Vietnam.": "Saya mau kirim uang ke Vietnam.",
  "How much? Do you have the recipient's account number?": "Berapa? Ada nomor rekening penerimanya?",
  "20,000 NTD. The details are on this paper.": "20.000 NTD, datanya ada di kertas ini.",
  "The fee is 300 NTD; it arrives in about three business days.": "Biayanya 300 NTD, sampai sekitar tiga hari kerja.",
  "What's today's exchange rate?": "Kurs hari ini berapa?",
  "It's on this screen. Please confirm the amount.": "Ada di layar ini, tolong cek jumlahnya.",

  // ── sim-card ──
  "Getting a SIM card": "Membeli kartu SIM",
  "預付卡 = prepaid, 月租 = monthly plan. Foreigners need both ARC and passport.": "預付卡 = prabayar, 月租 = paket bulanan. Orang asing perlu ARC dan paspor, dua-duanya.",
  "I'd like a prepaid SIM. Is there an unlimited data plan?": "Saya mau SIM prabayar, ada paket data unlimited?",
  "Yes, 30 days for 499 with unlimited data.": "Ada, 30 hari 499 NTD, data unlimited.",
  "Two IDs please: your ARC and passport.": "Tolong dua identitas: ARC dan paspor.",
  "Can I keep my current number?": "Nomor saya yang sekarang bisa tetap dipakai?",
  "Yes, that's number porting; it takes about a day.": "Bisa, itu pindah operator (攜碼), aktif sekitar satu hari.",
  "OK, let's do that one.": "Oke, yang itu saja.",

  // ── police-lost ──
  "Reporting lost or stolen items": "Melapor barang hilang atau dicuri",
  "報案 = filing a police report. For a lost card, call the bank first and ask to 停卡 (freeze the card).": "報案 = melapor ke polisi. Kalau kartu hilang, telepon bank dulu untuk 停卡 (blokir kartu).",
  "I lost my wallet. I want to file a report.": "Dompet saya hilang, saya mau buat laporan.",
  "When and where did you lose it?": "Hilang kapan dan di mana?",
  "This afternoon, probably on the MRT.": "Sore ini, mungkin di MRT.",
  "What was inside?": "Isinya apa saja?",
  "My ARC, ATM card, and 2,000 in cash.": "ARC, kartu ATM, dan uang tunai 2.000 NTD.",
  "This is your report receipt; you'll need it to replace your documents.": "Ini bukti laporan, nanti diperlukan untuk mengurus dokumen pengganti.",

  // ── view-room ──
  "Viewing an apartment": "Melihat kamar sewaan",
  "押金 = deposit (usually 2 months), 租金 = rent. Always ask 含水電嗎 (are utilities included?).": "押金 = deposit (biasanya 2 bulan), 租金 = uang sewa. Selalu tanya 含水電嗎 (sudah termasuk listrik dan air?).",
  "Hello, I'd like to view the room.": "Halo, saya mau lihat kamarnya.",
  "8,000 a month, two months' deposit.": "Sebulan 8.000, deposit dua bulan.",
  "Are utilities and internet included?": "Sudah termasuk listrik, air, dan internet?",
  "Internet is included; electricity is 5 per unit.": "Internet sudah termasuk, listrik 5 NTD per kWh.",
  "Are pets allowed? What's the minimum lease?": "Boleh pelihara hewan? Sewa minimal berapa lama?",
  "No pets, and the minimum lease is one year.": "Tidak boleh pelihara hewan, kontrak minimal satu tahun.",

  // ── landlord-repair ──
  "Asking the landlord for repairs": "Minta pemilik rumah memperbaiki",
  "壞了 = broken, 漏水 = leaking, 跳電 = the breaker tripped. Sending a photo on LINE is the Taiwanese way.": "壞了 = rusak, 漏水 = bocor, 跳電 = listrik jepret (MCB turun). Kirim foto lewat LINE itu cara orang Taiwan.",
  "Hi, the AC is broken; it doesn't cool.": "Bu/Pak, AC-nya rusak, tidak dingin.",
  "Since when? Any strange noises?": "Sejak kapan? Ada bunyi aneh?",
  "Since last night. I'll send you a photo.": "Sejak tadi malam. Saya kirim fotonya.",
  "I'll have a repairman come tomorrow afternoon. Will you be home?": "Besok siang saya suruh tukang datang lihat. Kamu ada di rumah?",
  "I'll be home after three.": "Saya di rumah setelah jam tiga.",
  "Also, the bathroom tap is leaking.": "Selain itu, keran kamar mandi juga bocor.",

  // ── garbage ──
  "Taking out the trash": "Membuang sampah & truk sampah",
  "Garbage trucks come at fixed times playing music (Für Elise). Regular trash needs the official bag; recyclables go to the second truck.": "Truk sampah (垃圾車) datang pada jam tetap sambil memutar musik (Für Elise). Sampah biasa harus pakai kantong resmi; sampah daur ulang masuk ke truk kedua.",
  "What time does the garbage truck come?": "Truk sampah datang jam berapa?",
  "7:30 pm, at the end of the lane.": "Jam setengah delapan malam, di ujung gang.",
  "Do I need the official bag for regular trash?": "Sampah biasa harus pakai kantong resmi?",
  "In Taipei, yes; convenience stores sell them. Recycling goes separately.": "Di Taipei harus, dijual di minimarket. Sampah daur ulang dipisah sendiri.",
  "Where does food waste go?": "Sampah sisa makanan dibuang ke mana?",
  "Into the bucket next to the truck.": "Ke ember di samping truk.",

  // ── neighbor ──
  "Talking to the doorman & neighbors": "Berbicara dengan satpam & tetangga",
  "The building 管理員 (doorman) handles parcels and repairs. A parcel is 包裹; you'll hear 有你的包裹 when one arrives.": "管理員 (satpam gedung) mengurus paket dan perbaikan. Paket disebut 包裹; kalau ada paket datang, kamu akan dengar 有你的包裹.",
  "Are you the new tenant? Which floor?": "Baru pindah ke sini ya? Tinggal di lantai berapa?",
  "Yes, fifth floor. Nice to meet you.": "Iya, lantai lima. Salam kenal.",
  "There's a parcel for you at the front desk.": "Ada paket untukmu di meja depan.",
  "Thanks. How do I pay the management fee?": "Terima kasih. Iuran pengelolaan bayarnya bagaimana?",
  "Bring it to the office before the 5th each month.": "Bawa ke kantor pengelola sebelum tanggal 5 setiap bulan.",
  "Sorry, the upstairs neighbor is noisy at night. Could you have a word with them?": "Maaf, tetangga atas berisik sekali kalau malam. Bisa tolong ditegur?",

  // ── pay-bills ──
  "Paying bills at a convenience store": "Membayar tagihan di minimarket",
  "Electricity, water, gas and phone bills can all be paid by scanning the barcode at any convenience store. Overdue (逾期) bills may be refused.": "Tagihan listrik, air, gas, dan telepon semua bisa dibayar di minimarket, cukup scan barcode-nya. Tagihan yang lewat jatuh tempo (逾期) bisa ditolak.",
  "I'd like to pay my electricity bill.": "Saya mau bayar tagihan listrik.",
  "Sure, the bill please. That's 1,230 in total.": "Baik, tagihannya. Totalnya 1.230.",
  "Can I pay by card?": "Bisa bayar pakai kartu?",
  "Bills can only be paid in cash or with EasyCard.": "Bayar tagihan hanya bisa tunai atau kartu EasyCard.",
  "This one is past due; can I still pay it?": "Yang ini sudah lewat jatuh tempo, masih bisa dibayar?",
  "Overdue ones have to be paid at Taipower.": "Yang sudah lewat harus dibayar di kantor Taipower (台電, perusahaan listrik).",

  // ── convenience ──
  "Checking out at a convenience store": "Membayar di kasir minimarket",
  "You'll be asked three things: bag? heat it up? receipt? 載具 is a digital receipt app; just say 不用 (no need).": "Biasanya ditanya tiga hal: kantong? dipanaskan? struk? 載具 itu aplikasi struk digital, jawab saja 不用 (tidak perlu).",
  "Do you need a bag?": "Perlu kantong?",
  "No thanks.": "Tidak, terima kasih.",
  "Should I heat up the bento?": "Bentonya dipanaskan?",
  "Yes, please.": "Ya, tolong.",
  "Do you have a receipt carrier? Print the receipt?": "Ada 載具? Struknya dicetak?",
  "No carrier; I'll take the receipt.": "Tidak ada 載具, struknya saya ambil.",

  // ── drink-stand ──
  "Ordering at a drink stand": "Memesan di kedai minuman",
  "Sweetness: 正常, 少糖, 半糖, 微糖, 無糖. Ice: 正常冰, 少冰, 微冰, 去冰. Sizes: M (中杯) and L (大杯).": "Kadar gula: 正常, 少糖, 半糖, 微糖, 無糖. Es: 正常冰, 少冰, 微冰, 去冰. Ukuran: M (中杯) dan L (大杯).",
  "Hi, what would you like?": "Halo, mau minum apa?",
  "One bubble milk tea, large.": "Satu bubble milk tea, ukuran besar.",
  "Sweetness and ice?": "Gula dan esnya?",
  "Half sugar, less ice.": "Setengah gula, esnya sedikit.",
  "Any toppings?": "Mau tambah topping?",
  "No. Can I pay with EasyCard?": "Tidak. Bisa bayar pakai kartu EasyCard?",

  // ── night-market ──
  "Buying food at a night market": "Membeli makanan di pasar malam",
  "一份 = one portion, 不要辣 = not spicy, 內用/外帶 = eat here / take away. Stalls are mostly cash only.": "一份 = satu porsi, 不要辣 = tidak pedas, 內用/外帶 = makan di sini / bawa pulang. Kios kebanyakan hanya terima tunai.",
  "One fried chicken cutlet please, not spicy.": "Bos, satu ayam goreng (雞排), tidak pedas.",
  "Should I cut it up?": "Dipotong?",
  "Yes please. How much?": "Iya, tolong dipotong. Berapa?",
  "85. It'll be about five minutes.": "85, tunggu sekitar lima menit.",
  "What's this? Can I try a piece?": "Ini apa? Boleh coba?",
  "Sweet potato balls. Here, try one.": "Bola ubi (地瓜球). Ini, cobain.",

  // ── market ──
  "Asking prices at the market": "Menanyakan harga di pasar",
  "Markets sell by the 斤 (600g). 算便宜一點 asks for a discount; vendors bundle like 兩個一百 (two for 100).": "Pasar menjual per 斤 (600 g). 算便宜一點 artinya minta diskon; penjual sering menawarkan borongan seperti 兩個一百 (dua seharga 100).",
  "Ma'am, how much is this per jin?": "Bu, ini satu jin (斤) berapa?",
  "60 a jin, or two for 100.": "Satu jin 60, dua jin 100.",
  "Two jin then. Could you pick sweeter ones for me?": "Dua jin ya. Bisa pilihkan yang manis?",
  "Sure, these ones are very sweet.": "Bisa, yang ini manis sekali.",
  "What vegetable is this? How do you cook it?": "Ini sayur apa? Masaknya bagaimana?",
  "Sweet potato leaves. Stir-fry with garlic and it's delicious.": "Daun ubi. Tumis dengan bawang putih, enak.",

  // ── return-item ──
  "Returning or exchanging an item": "Mengembalikan atau menukar barang",
  "Many stores accept returns within 7 days with the receipt (發票). Online purchases have a 7-day 鑑賞期 (cooling-off period).": "Banyak toko menerima retur dalam 7 hari kalau ada struk (發票). Belanja online punya 7 hari 鑑賞期 (masa boleh dikembalikan).",
  "Excuse me, I'd like to return this.": "Maaf, saya mau mengembalikan ini.",
  "Do you have the receipt? What's the problem?": "Ada struknya? Masalahnya apa?",
  "Yes. It's too small; can I exchange it for one size up?": "Ada. Ukurannya kekecilan, bisa ditukar satu ukuran lebih besar?",
  "Sure, as long as the tag is still on.": "Bisa, asal label harganya belum dilepas.",
  "If you don't have a larger one, can I get a refund?": "Kalau tidak ada ukuran besar, bisa dikembalikan uangnya?",
  "Refunds are fine within seven days.": "Dalam tujuh hari bisa refund.",

  // ── restaurant ──
  "Ordering & paying at a local eatery": "Memesan & membayar di warung makan",
  "Local eateries often use paper order slips: write quantities and hand it over. Say 內用 to eat in; ask for the bill with 買單 or 結帳.": "Warung makan sering pakai kertas pesanan: tulis jumlahnya lalu serahkan. Bilang 內用 untuk makan di tempat; minta bon dengan 買單 atau 結帳.",
  "Eating in or take-out? How many?": "Makan di sini atau bawa pulang? Berapa orang?",
  "Eating in, two people.": "Makan di sini, dua orang.",
  "The menu's on the table; fill it out and bring it over.": "Menunya di meja, isi lalu bawa ke sini.",
  "One beef noodle soup, one braised platter, no green onion.": "Satu mi sapi, satu porsi lauk rebus kecap (滷味), tanpa daun bawang.",
  "Check, please.": "Bos, bayar.",
  "240 in total. Do you want a receipt?": "Totalnya 240, mau struk?",

  // ── ask-leave ──
  "Asking for time off": "Mengajukan izin cuti",
  "請假 = request leave. Types: 病假 (sick), 事假 (personal), 特休 (paid annual leave). 補休 = compensatory day off.": "請假 = minta izin cuti. Jenisnya: 病假 (sakit), 事假 (urusan pribadi), 特休 (cuti tahunan berbayar). 補休 = libur pengganti.",
  "Boss, I'd like to take next Friday off.": "Bos, Jumat depan saya mau izin libur sehari.",
  "What for? Which type of leave?": "Untuk apa? Cutinya jenis apa?",
  "I need to go to immigration for my ARC; personal leave.": "Saya harus ke imigrasi urus ARC, izin urusan pribadi (事假).",
  "OK, remember to fill in the leave form.": "Boleh, jangan lupa isi formulir cutinya.",
  "I'm not feeling well today; I'd like to take sick leave.": "Hari ini badan saya tidak enak, saya mau izin sakit.",
  "Get some rest. Bring a doctor's note tomorrow.": "Istirahat ya, besok bawa surat dokternya.",

  // ── overtime ──
  "Overtime & shifts": "Lembur & jadwal shift",
  "加班 = overtime, 加班費 = overtime pay, 排班 = the shift schedule, 輪班 = rotating shifts. 時薪 = hourly wage.": "加班 = lembur, 加班費 = uang lembur, 排班 = jadwal shift, 輪班 = shift bergilir. 時薪 = upah per jam.",
  "Can you work overtime until eight today?": "Hari ini bisa lembur sampai jam delapan?",
  "Yes. How is overtime pay calculated?": "Bisa. Uang lemburnya dihitung bagaimana?",
  "The first two hours are paid at 1.33x.": "Dua jam pertama dibayar 1,33 kali.",
  "Is next month's schedule out yet?": "Jadwal shift bulan depan sudah keluar?",
  "It's posted in the break room; go take a look.": "Ditempel di ruang istirahat, lihat sendiri ya.",
  "I'd like to swap shifts with a coworker. Is that OK?": "Saya mau tukar shift dengan teman kerja, boleh?",

  // ── didnt-understand ──
  "When you didn't catch that": "Saat tidak menangkap ucapannya",
  "You'll use these five lines more than anything. Starting with 不好意思 softens it.": "Lima kalimat ini yang paling sering kamu pakai. Mulai dengan 不好意思 supaya terdengar lebih sopan.",
  "Sorry, could you say that again?": "Maaf, bisa diulang lagi?",
  "Could you speak more slowly? My Chinese isn't great.": "Bisa bicara lebih pelan? Bahasa Mandarin saya belum lancar.",
  "How do you write that? Could you write it down for me?": "Hurufnya ditulis bagaimana? Bisa tuliskan untuk saya?",
  "Do you mean like this?": "Maksudnya seperti ini?",
  "Yes, exactly.": "Iya iya, betul begitu.",
  "Got it. Thanks for your patience.": "Saya mengerti. Terima kasih sudah sabar.",

  // ── work-injury ──
  "Reporting a workplace injury": "Melaporkan kecelakaan kerja",
  "A work injury is 職災. Report it to your supervisor the same day; at the hospital say 這是職災 so labor insurance covers it.": "Cedera saat bekerja disebut 職災 (kecelakaan kerja). Laporkan ke atasan hari itu juga; di rumah sakit bilang 這是職災 supaya ditanggung asuransi tenaga kerja.",
  "Sir, I just got injured while working.": "Pak, saya baru saja terluka saat bekerja.",
  "Where are you hurt? Is it serious?": "Yang luka di mana? Parah?",
  "My hand got caught in the machine; it's bleeding.": "Tangan saya terjepit mesin, berdarah.",
  "Go to the hospital first; I'll go with you.": "Ke rumah sakit dulu, saya temani.",
  "Does this count as a work injury? Can I use labor insurance?": "Ini termasuk kecelakaan kerja? Bisa pakai asuransi tenaga kerja?",
  "Yes, I'll file the report for you.": "Termasuk, saya yang akan laporkan.",

  // ── small-talk ──
  "Small talk & introducing yourself": "Obrolan ringan & memperkenalkan diri",
  "Taiwanese often ask 你哪裡人 (where are you from?) and 來台灣多久了 (how long have you been here?). It's friendly curiosity.": "Orang Taiwan sering tanya 你哪裡人 (dari mana?) dan 來台灣多久了 (sudah berapa lama di Taiwan?). Itu cuma rasa penasaran yang ramah.",
  "Where are you from? How long have you been in Taiwan?": "Kamu dari mana? Sudah berapa lama di Taiwan?",
  "I'm Indonesian. I've been in Taiwan for two years.": "Saya orang Indonesia, sudah dua tahun di Taiwan.",
  "Your Chinese is great! Have you gotten used to it here?": "Bahasa Mandarinmu bagus sekali! Sudah terbiasa di sini?",
  "Still learning. It's hot, but people are kind.": "Masih belajar. Cuacanya panas, tapi orangnya baik.",
  "Let's grab a meal sometime!": "Kapan-kapan makan bareng ya!",
  "Sure, let's add each other on LINE.": "Boleh, tukar LINE yuk.",

  // ── say-no ──
  "Turning down sales & solicitations": "Menolak penjualan & tawaran",
  "Street promoters, phone sales, religious invites: 不用，謝謝 and keep walking is enough. If they persist: 我沒興趣 (not interested).": "Sales di jalan, telemarketing, ajakan keagamaan: cukup bilang 不用，謝謝 dan terus jalan. Kalau masih memaksa: 我沒興趣 (tidak tertarik).",
  "Miss, would you like to look at our plans?": "Kak, mau lihat paket kami sebentar?",
  "Just one minute, it's free!": "Sebentar saja satu menit, gratis!",
  "I'm not interested, and I'm in a hurry.": "Saya tidak tertarik, saya sedang buru-buru.",
  "Here's our flyer; contact us if you need anything.": "Ini brosur kami, kalau perlu hubungi kami.",
  "Please stop calling me.": "Tolong jangan telepon saya lagi.",

  // ── taxi ──
  "Taking a taxi": "Naik taksi",
  "Showing the address on your phone is fastest. 跳表 = by the meter; 這裡停 = stop here. Drivers are called 運將.": "Paling cepat tunjukkan alamat di HP. 跳表 = pakai argo, 這裡停 = berhenti di sini. Sopir dipanggil 運將.",
  "Hi, I'd like to go to this address.": "Halo, saya mau ke alamat ini.",
  "OK. Should I take the highway?": "Baik. Lewat jalan tol?",
  "Whichever is faster. Roughly how much?": "Mana yang lebih cepat saja. Kira-kira berapa?",
  "By the meter, around 300.": "Pakai argo, sekitar 300.",
  "You can stop at the next intersection, thanks.": "Berhenti di perempatan depan saja, terima kasih.",
  "Could I have a receipt?": "Boleh minta kuitansinya?",

  // ── mrt-easycard ──
  "MRT & topping up your EasyCard": "MRT & mengisi saldo kartu EasyCard",
  "Top up (加值) your EasyCard at any convenience store or station. On buses, tap both when boarding and alighting.": "Isi saldo (加值) kartu EasyCard bisa di minimarket atau stasiun mana saja. Di bus, tap saat naik dan saat turun.",
  "Which line goes to Taipei Main Station?": "Ke Stasiun Utama Taipei naik jalur yang mana?",
  "Take the red line, toward Tamsui.": "Naik jalur merah, arah Tamsui (淡水).",
  "My EasyCard is out of money. Where can I top it up?": "Saldo kartu EasyCard saya habis, isi ulangnya di mana?",
  "At that machine, or the service counter.": "Di mesin sebelah sana, atau di loket layanan.",
  "I'd like to top up 500.": "Saya mau isi 500.",
  "OK, place your card here.": "Baik, taruh kartunya di sini.",

  // ── typhoon ──
  "Typhoons & work/school closures": "Topan & libur kerja dan sekolah",
  "停班停課 means work and school are cancelled. Each city announces it the night before. Stay indoors on typhoon days.": "停班停課 artinya libur kerja dan sekolah. Tiap kota mengumumkannya malam sebelumnya. Saat topan, tetap di dalam rumah.",
  "A typhoon's coming tomorrow. Did you see the news?": "Besok ada topan, kamu sudah lihat berita?",
  "Will work and school be cancelled tomorrow?": "Besok libur kerja dan sekolah tidak?",
  "They announce it after 8 pm.": "Baru diumumkan setelah jam delapan malam.",
  "If work is cancelled, do we still get paid that day?": "Kalau libur kerja, hari itu tetap digaji?",
  "Salaried staff still get paid. Go stock up on some food first.": "Yang gaji bulanan tetap dibayar. Kamu beli stok makanan dulu ya.",
  "OK, I'll bring in the things from the balcony.": "Oke, saya masukkan barang-barang di balkon."
}
};
if (typeof window !== "undefined") window.LIFE_TR = LIFE_TR;
