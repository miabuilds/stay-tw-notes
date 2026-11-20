/* StayTW — 新手「每天幾分鐘 → 你的專屬計畫」(2026-11-17 Mia:「有啥可以先做的 做吧」)
 *
 * 為什麼:11/10 診斷 KR/TW 的付費牆「看到的人會買,但很少人碰到」。iOS 教育類前段班
 *   (PictureThis/Simply Piano/Headway/Learna…)都是「問幾題 → 給一份專屬計畫 → 計畫頁就是付費牆」。
 * 流程:pickPersona(目的) → 這裡兩步 → TOUR(原本的 4 步導覽)。跳過目的的人不出(不打擾)。
 *
 * 誠實原則:
 *  - 天數用真的課數算(data/lessons-*.json 的課數,下面 LESSONS),免費 = 1 天 2 課(lessons.js DAILY_FREE)。
 *  - Premium 一課約 3 分鐘 → 每天 分鐘/3 課。選 5 分鐘的人 Premium 也只有 2 課/天 → 不放比較,直接說免費版剛好夠。
 *  - 可以關、可以先免費。App 內不寫價格(價格只在原生付費牆);網頁點下去走 Paywall.show("onboard")。
 * 量測:看到計畫頁 → hits /__paywall/onboard_plan;點 Premium → /__paywall/onboard(網頁由 Paywall.show 記,App 由這裡記)。
 */
const OnboardPlan = (() => {
  const LESSONS = { l1: 80, l2: 112, l3: 126, l4: 256, l5: 397, l6: 544 };   // 2026-11-17 data/lessons-l*.json
  const FREE_PER_DAY = 2;
  const MINS = [5, 10, 15, 20];
  const TX = {
    ja: { q: "1 日どのくらい勉強しますか？", qd: "あとで設定から変えられます。", m: "{n} 分", lv: ["気軽に", "ふつう", "しっかり", "集中"],
      pt: "あなたの学習プラン", goal: "目的", start: "スタート", per: "{m} 分 ≈ 約 {l} 課", daily: "1 日", skip: "スキップ",
      fin: "Level {lv} をクリアするまで({c} 課・{w} 語)", pre: "Premium", free: "無料版", days: "約 {d} 日", eq: "1 日 {m} 分なら無料版(1 日 {f} 課)でちょうど足ります。",
      more: "Premium でできること", b1: "闖關が 1 日 2 課まで → 無制限", b2: "記事すべて・上級単語", b3: "復習・模試が回数無制限",
      cta: "Premium でこのプランを始める", ctaFree: "まず無料ではじめる", note: "月額プランは 7 日間無料で試せます。いつでも解約できます。",
      pw: "あなたのプランを最短で。闖關・復習・模試を回数制限なしで。", per_: { travel: "旅行・短期滞在", live: "台湾で暮らす・働く", exam: "TOCFL・試験対策" } },
    en: { q: "How much time per day?", qd: "You can change this later in Settings.", m: "{n} min", lv: ["Casual", "Regular", "Serious", "Intense"],
      pt: "Your learning plan", goal: "Goal", start: "Start at", per: "{m} min ≈ {l} lessons", daily: "Daily", skip: "Skip",
      fin: "To finish Level {lv} ({c} lessons · {w} words)", pre: "Premium", free: "Free", days: "~{d} days", eq: "At {m} min a day, the free plan ({f} lessons a day) is all you need.",
      more: "What Premium adds", b1: "Lessons: 2 a day → unlimited", b2: "All articles + advanced vocabulary", b3: "Unlimited reviews & mock exams",
      cta: "Follow this plan with Premium", ctaFree: "Start free first", note: "The monthly plan comes with a 7-day free trial. Cancel anytime.",
      pw: "Reach your goal faster — unlimited lessons, reviews and mock exams.", per_: { travel: "Travel / short stay", live: "Living or working in Taiwan", exam: "TOCFL / exams" } },
    ko: { q: "하루에 얼마나 공부할까요?", qd: "나중에 설정에서 바꿀 수 있어요.", m: "{n}분", lv: ["가볍게", "보통", "열심히", "집중"],
      pt: "나만의 학습 플랜", goal: "목표", start: "시작", per: "{m}분 ≈ {l}과", daily: "하루", skip: "건너뛰기",
      fin: "Level {lv} 끝내기까지 ({c}과 · {w}단어)", pre: "Premium", free: "무료", days: "약 {d}일", eq: "하루 {m}분이면 무료 버전(하루 {f}과)으로 충분해요.",
      more: "Premium으로 할 수 있는 것", b1: "레슨 하루 2과 → 무제한", b2: "모든 글 + 고급 단어", b3: "복습·모의고사 횟수 무제한",
      cta: "Premium으로 이 플랜 시작", ctaFree: "먼저 무료로 시작", note: "월간 플랜은 7일 무료 체험이 있어요. 언제든 해지할 수 있어요.",
      pw: "목표까지 가장 빠르게 — 레슨·복습·모의고사 무제한.", per_: { travel: "여행·단기 체류", live: "대만에서 생활·일하기", exam: "TOCFL·시험 대비" } },
    vi: { q: "Mỗi ngày bạn học bao lâu?", qd: "Bạn có thể đổi sau trong Cài đặt.", m: "{n} phút", lv: ["Nhẹ nhàng", "Bình thường", "Nghiêm túc", "Tập trung"],
      pt: "Kế hoạch học của bạn", goal: "Mục tiêu", start: "Bắt đầu từ", per: "{m} phút ≈ {l} bài", daily: "Mỗi ngày", skip: "Bỏ qua",
      fin: "Để học xong Level {lv} ({c} bài · {w} từ)", pre: "Premium", free: "Miễn phí", days: "~{d} ngày", eq: "Với {m} phút mỗi ngày, bản miễn phí ({f} bài/ngày) là đủ.",
      more: "Premium có thêm", b1: "Bài học: 2 bài/ngày → không giới hạn", b2: "Tất cả bài đọc + từ vựng nâng cao", b3: "Ôn tập & thi thử không giới hạn",
      cta: "Theo kế hoạch này với Premium", ctaFree: "Bắt đầu miễn phí trước", note: "Gói tháng có 7 ngày dùng thử miễn phí. Hủy bất cứ lúc nào.",
      pw: "Đạt mục tiêu nhanh nhất — bài học, ôn tập, thi thử không giới hạn.", per_: { travel: "Du lịch / lưu trú ngắn", live: "Sống hoặc làm việc ở Đài Loan", exam: "TOCFL / thi cử" } },
    id: { q: "Berapa lama belajar per hari?", qd: "Bisa diubah nanti di Pengaturan.", m: "{n} menit", lv: ["Santai", "Biasa", "Serius", "Intens"],
      pt: "Rencana belajarmu", goal: "Tujuan", start: "Mulai dari", per: "{m} menit ≈ {l} pelajaran", daily: "Per hari", skip: "Lewati",
      fin: "Untuk menyelesaikan Level {lv} ({c} pelajaran · {w} kata)", pre: "Premium", free: "Gratis", days: "~{d} hari", eq: "Dengan {m} menit per hari, versi gratis ({f} pelajaran/hari) sudah cukup.",
      more: "Yang ditambahkan Premium", b1: "Pelajaran: 2 per hari → tanpa batas", b2: "Semua artikel + kosakata lanjutan", b3: "Review & ujian simulasi tanpa batas",
      cta: "Ikuti rencana ini dengan Premium", ctaFree: "Mulai gratis dulu", note: "Paket bulanan ada uji coba gratis 7 hari. Bisa batal kapan saja.",
      pw: "Capai tujuanmu paling cepat — pelajaran, review, dan ujian simulasi tanpa batas.", per_: { travel: "Wisata / tinggal singkat", live: "Tinggal atau bekerja di Taiwan", exam: "TOCFL / ujian" } },
    zh: { q: "每天想學多久？", qd: "之後可以在設定裡改。", m: "{n} 分鐘", lv: ["輕鬆", "普通", "認真", "衝刺"],
      pt: "你的學習計畫", goal: "目標", start: "從這裡開始", per: "{m} 分鐘 ≈ {l} 課", daily: "每天", skip: "略過",
      fin: "學完 Level {lv}（{c} 課・{w} 個單字）", pre: "Premium", free: "免費版", days: "約 {d} 天", eq: "每天 {m} 分鐘的話，免費版（每天 {f} 課）剛好夠用。",
      more: "Premium 多了什麼", b1: "闖關每天 2 課 → 不限課數", b2: "全部文章＋進階單字", b3: "複習、模擬考不限次數",
      cta: "用 Premium 照這個計畫走", ctaFree: "先用免費版開始", note: "月費方案可以免費試用 7 天，隨時可以取消。",
      pw: "用最短的時間達成目標：闖關、複習、模擬考都不限次數。", per_: { travel: "旅行・短期停留", live: "在台灣生活・工作", exam: "TOCFL・考試" } },
  };
  const L = () => TX[(typeof twGetLang === "function" && twGetLang()) || "ja"] || TX.en;
  const isNative = () => typeof window !== "undefined" && !!window.ReactNativeWebView;
  const esc = (x) => String(x == null ? "" : x).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (_, k) => (o[k] != null ? o[k] : ""));
  const ic = (n, s) => (typeof window.icon === "function" ? window.icon(n, { size: s || 16 }) : "");
  function hit(path) {
    try { fetch("/api/hit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path, ref: location.pathname, app: !!(window.STAYTW_NATIVE && window.STAYTW_NATIVE.isNativeApp) }) }); } catch (e) {}
  }
  const ga = (ev, p) => { try { if (typeof gtag === "function") gtag("event", ev, p || {}); } catch (e) {} };

  let persona = "", mins = 0, bg = null;
  function css() {
    if (document.getElementById("obPlanCss")) return;
    const s = document.createElement("style"); s.id = "obPlanCss";
    s.textContent = `
#obPlanBg .quiz-box{max-width:420px;text-align:center;padding:22px 20px 18px}
.obp-h{font-family:var(--serif);font-size:20px;font-weight:700;margin:6px 0 4px;color:var(--tx)}
.obp-d{font-size:13px;color:var(--tx2);margin:0 0 18px}
.obp-mins{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.obp-min{display:flex;flex-direction:column;align-items:center;gap:4px;padding:16px 8px;border:1px solid var(--bd);border-radius:14px;background:var(--bg2);cursor:pointer;font-family:inherit;color:var(--tx)}
.obp-min b{font-size:18px;font-weight:700}
.obp-min span{font-size:12px;color:var(--tx2)}
.obp-min:active{background:var(--ac-soft)}
@media(hover:hover){.obp-min:hover{border-color:var(--ac);background:var(--ac-soft)}}
.obp-sum{display:flex;flex-direction:column;gap:0;text-align:left;border:1px solid var(--line);border-radius:14px;background:var(--bg2);margin:0 0 16px}
.obp-row{display:flex;justify-content:space-between;gap:12px;padding:11px 14px;font-size:13.5px;border-bottom:1px solid var(--line)}
.obp-row:last-child{border-bottom:0}
.obp-row span{color:var(--tx2)}
.obp-row b{color:var(--tx);font-weight:700;text-align:right}
.obp-fin{font-size:13px;color:var(--tx2);text-align:left;margin:0 0 10px}
.obp-bars{display:flex;flex-direction:column;gap:10px;margin:0 0 18px}
.obp-bar{display:grid;grid-template-columns:72px 1fr 64px;align-items:center;gap:10px;font-size:13px;text-align:left}
.obp-track{height:10px;border-radius:999px;background:var(--bg3);overflow:hidden}
.obp-fill{height:100%;border-radius:999px;background:var(--tx3)}
.obp-bar.pre .obp-fill{background:var(--ac)}
.obp-bar.pre b,.obp-bar.pre em{color:var(--ac)}
.obp-bar em{font-style:normal;font-weight:700;text-align:right;color:var(--tx2)}
.obp-eq{font-size:13px;color:var(--tx2);background:var(--bg3);border-radius:10px;padding:10px 12px;margin:0 0 18px;text-align:left;line-height:1.55}
.obp-more{text-align:left;margin:0 0 18px}
.obp-more h4{font-size:13.5px;font-weight:700;margin:0 0 8px;color:var(--tx)}
.obp-more li{list-style:none;display:flex;align-items:center;gap:8px;font-size:13px;color:var(--tx2);padding:6px 0}
.obp-more li svg{color:var(--ac);flex:none}
.obp-cta{width:100%;padding:13px;margin:0 0 10px}
.obp-free{width:100%;padding:11px;background:transparent;border:0;color:var(--tx2);font:inherit;font-size:14px;cursor:pointer}
.obp-note{font-size:11.5px;color:var(--tx3);margin:8px 0 0;line-height:1.5}`;
    document.head.appendChild(s);
  }
  function box() {
    css();
    if (!bg) {
      bg = document.createElement("div"); bg.className = "quiz-bg"; bg.id = "obPlanBg";
      bg.innerHTML = '<div class="quiz-box" id="obPlanBox"></div>';
      document.body.appendChild(bg);
    }
    bg.classList.add("show");
    return document.getElementById("obPlanBox");
  }
  function hide() { if (bg) bg.classList.remove("show"); }

  function start(p) {
    persona = p || "";
    const t = L();
    box().innerHTML = `
      <img src="images/bear.svg" alt="" style="width:52px;height:auto;margin:2px 0 4px">
      <h3 class="obp-h">${esc(t.q)}</h3>
      <p class="obp-d">${esc(t.qd)}</p>
      <div class="obp-mins">${MINS.map((m, i) => `<button class="obp-min" onclick="OnboardPlan.pick(${m})"><b>${esc(fill(t.m, { n: m }))}</b><span>${esc(t.lv[i])}</span></button>`).join("")}</div>
      <button class="obp-free" style="margin-top:12px" onclick="OnboardPlan.free()">${esc(t.skip)}</button>`;
    ga("onboard_minutes_shown");
  }

  function pick(m) {
    mins = m;
    try { localStorage.setItem("stw_ob_min", String(m)); } catch (e) {}
    try { if (typeof setGoalTarget === "function") setGoalTarget(m * 2); } catch (e) {}   // 今日目標(動作數):1 分鐘 ≈ 2 張卡
    ga("onboard_minutes", { minutes: m });
    plan();
  }

  function plan() {
    const t = L();
    const lv = (typeof currentLevel !== "undefined" && currentLevel) || "l1";
    const n = +String(lv).slice(1) || 1;
    const lessons = LESSONS[lv] || 80;
    const words = { l1: 481, l2: 498, l3: 513, l4: 1474, l5: 2719, l6: 4306 }[lv] || 0;   // lessons-l*.json 的 total
    const prePer = Math.max(FREE_PER_DAY, Math.round(mins / 3));
    const freeDays = Math.ceil(lessons / FREE_PER_DAY), preDays = Math.ceil(lessons / prePer);
    const faster = prePer > FREE_PER_DAY;
    const pct = (d) => Math.max(8, Math.round(d / freeDays * 100));
    const goal = t.per_[persona] || "";
    box().innerHTML = `
      <img class="il" src="images/il/10_quiz.webp" alt="" width="96" height="96" style="width:96px;height:96px;display:block;margin:0 auto 4px">
      <h3 class="obp-h" style="margin-bottom:14px">${esc(t.pt)}</h3>
      <div class="obp-sum">
        ${goal ? `<div class="obp-row"><span>${esc(t.goal)}</span><b>${esc(goal)}</b></div>` : ""}
        <div class="obp-row"><span>${esc(t.start)}</span><b>Level ${n}</b></div>
        <div class="obp-row"><span>${esc(t.daily)}</span><b>${esc(fill(t.per, { m: mins, l: prePer }))}</b></div>
      </div>
      <p class="obp-fin">${esc(fill(t.fin, { lv: n, c: lessons, w: words.toLocaleString() }))}</p>
      ${faster ? `<div class="obp-bars">
        <div class="obp-bar pre"><b>${esc(t.pre)}</b><div class="obp-track"><div class="obp-fill" style="width:${pct(preDays)}%"></div></div><em>${esc(fill(t.days, { d: preDays }))}</em></div>
        <div class="obp-bar"><b>${esc(t.free)}</b><div class="obp-track"><div class="obp-fill" style="width:100%"></div></div><em>${esc(fill(t.days, { d: freeDays }))}</em></div>
      </div>` : `<p class="obp-eq">${esc(fill(t.eq, { m: mins, f: FREE_PER_DAY }))}</p>`}
      <div class="obp-more"><h4>${esc(t.more)}</h4><ul style="margin:0;padding:0">
        <li>${ic("check")}${esc(t.b1)}</li><li>${ic("check")}${esc(t.b2)}</li><li>${ic("check")}${esc(t.b3)}</li></ul></div>
      <button class="btn primary obp-cta" onclick="OnboardPlan.premium()">${esc(t.cta)}</button>
      <button class="obp-free" onclick="OnboardPlan.free()">${esc(t.ctaFree)}</button>
      <p class="obp-note">${esc(t.note)}</p>`;
    hit("/__paywall/onboard_plan");
    ga("onboard_plan_shown", { minutes: mins, level: lv, faster });
  }

  function tour() { try { setTimeout(() => TOUR.start(), 400); } catch (e) {} }
  function free() { hide(); ga("onboard_free"); tour(); }
  function premium() {
    hide(); ga("onboard_premium");
    if (isNative() && window.Paywall) { hit("/__paywall/onboard"); Paywall.openNative(); tour(); }
    else if (window.Paywall) Paywall.show("onboard");
  }
  const isOpen = () => !!(bg && bg.classList.contains("show"));
  return { start, pick, free, premium, isOpen, pwDesc: () => L().pw };
})();
if (typeof window !== "undefined") window.OnboardPlan = OnboardPlan;
