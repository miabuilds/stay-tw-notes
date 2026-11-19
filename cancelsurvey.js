// 取消問卷(2026-11-19 Mia)。取消是在 App Store / Google Play 設定裡按的,攔不到那一刻;
// 後端從 RevenueCat 事件知道這個帳號剛取消 → /api/me 帶 cancelAsk → 下次開啟時問一次(答或略過都不再問)。
// 入口:websync.js fetchMe() 之後呼叫 CancelSurvey.maybe(me, session)。不放 emoji、不用原生 alert。
(function () {
  const TX = {
    ja: { t: "解約の理由を教えてください", d: "1 分で終わります。今後の改善に使います(返金や再課金には関係ありません)。", dTrial: "無料体験を解約された理由を教えてください。1 分で終わります。",
      o: { price: "値段が高い", trial_only: "試しただけ・自動課金されたくなかった", level: "内容が自分のレベルに合わない", no_time: "使う時間がない", feature: "欲しい機能がない", bug: "不具合・使いにくい", other_app: "他のアプリを使う", forgot: "同意ボタンを押し忘れた・解約するつもりはなかった", other: "その他" },
      ph: "よければ詳しく教えてください(任意)", send: "送信", skip: "スキップ", thanks: "ありがとうございます。参考にします。" },
    ko: { t: "해지하신 이유를 알려 주세요", d: "1분이면 끝나요. 서비스 개선에만 사용합니다(환불·재결제와는 무관합니다).", dTrial: "무료 체험을 해지하신 이유를 알려 주세요. 1분이면 끝나요.",
      o: { price: "가격이 비싸요", trial_only: "그냥 체험만 해 봤어요 · 자동 결제가 싫었어요", level: "내용이 제 수준에 안 맞아요", no_time: "쓸 시간이 없어요", feature: "원하는 기능이 없어요", bug: "오류가 있거나 쓰기 불편해요", other_app: "다른 앱을 써요", forgot: "동의 버튼을 못 눌렀어요 · 해지할 생각은 없었어요", other: "기타" },
      ph: "자세히 알려 주시면 큰 도움이 돼요(선택)", send: "보내기", skip: "건너뛰기", thanks: "감사합니다. 참고할게요." },
    en: { t: "Why did you cancel?", d: "Takes one minute. We only use this to improve the app (it doesn't affect refunds or billing).", dTrial: "Why did you cancel your free trial? Takes one minute.",
      o: { price: "Too expensive", trial_only: "Just trying it out / didn't want to be charged automatically", level: "Content doesn't match my level", no_time: "No time to use it", feature: "Missing a feature I need", bug: "Bugs or hard to use", other_app: "Using another app", forgot: "I missed the consent step / didn't mean to cancel", other: "Other" },
      ph: "Tell us more (optional)", send: "Send", skip: "Skip", thanks: "Thank you. This helps a lot." },
    vi: { t: "Vì sao bạn hủy gói?", d: "Chỉ mất 1 phút. Chúng tôi chỉ dùng để cải thiện ứng dụng (không ảnh hưởng đến hoàn tiền hay thanh toán).", dTrial: "Vì sao bạn hủy dùng thử miễn phí? Chỉ mất 1 phút.",
      o: { price: "Giá cao", trial_only: "Chỉ dùng thử / không muốn bị tự động trừ tiền", level: "Nội dung không hợp trình độ của tôi", no_time: "Không có thời gian dùng", feature: "Thiếu tính năng tôi cần", bug: "Có lỗi hoặc khó dùng", other_app: "Dùng ứng dụng khác", forgot: "Tôi quên bấm đồng ý / không định hủy", other: "Khác" },
      ph: "Chia sẻ thêm (không bắt buộc)", send: "Gửi", skip: "Bỏ qua", thanks: "Cảm ơn bạn. Chúng tôi sẽ tham khảo." },
    id: { t: "Kenapa kamu berhenti berlangganan?", d: "Cuma 1 menit. Hanya dipakai untuk memperbaiki aplikasi (tidak memengaruhi refund atau tagihan).", dTrial: "Kenapa kamu membatalkan uji coba gratis? Cuma 1 menit.",
      o: { price: "Harganya mahal", trial_only: "Cuma coba-coba / tidak mau ditagih otomatis", level: "Materinya tidak sesuai level saya", no_time: "Tidak ada waktu", feature: "Fitur yang saya butuhkan belum ada", bug: "Ada bug atau sulit dipakai", other_app: "Pakai aplikasi lain", forgot: "Lupa menekan tombol setuju / tidak berniat batal", other: "Lainnya" },
      ph: "Ceritakan lebih lanjut (opsional)", send: "Kirim", skip: "Lewati", thanks: "Terima kasih. Ini sangat membantu." },
  };
  const ORDER = ["price", "trial_only", "level", "no_time", "feature", "bug", "other_app", "forgot", "other"];
  const lang = () => { try { return localStorage.getItem("stw-lang") || "ja"; } catch (e) { return "ja"; } };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let shown = false;
  function css() {
    if (document.getElementById("cs-css")) return;
    const st = document.createElement("style"); st.id = "cs-css";
    st.textContent = `
.cs-bg{position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:center;padding:16px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px))}
@media(min-width:560px){.cs-bg{align-items:center}}
.cs-box{width:100%;max-width:440px;max-height:92vh;overflow:auto;background:var(--bg2,#fff);color:var(--tx,#1c1c1e);border:1px solid var(--bd,#e5decf);border-radius:18px;padding:22px 20px 18px;box-shadow:0 12px 40px rgba(0,0,0,.25)}
.cs-box h3{margin:0 0 8px;font-size:18px;line-height:1.4}
.cs-box p{margin:0 0 12px;font-size:13.5px;line-height:1.6;color:var(--tx2,#6a6a6a)}
.cs-opts{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.cs-opt{display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:9px 14px;border:1px solid var(--bd,#e5decf);border-radius:12px;background:var(--bg,#faf8f3);color:var(--tx,#1c1c1e);font:inherit;font-size:14.5px;line-height:1.4;cursor:pointer}
.cs-opt::before{content:"";flex:none;width:16px;height:16px;border-radius:50%;border:1.5px solid var(--tx3,#a9a9a9);box-sizing:border-box}
.cs-opt.on{border-color:var(--ac,#b8362a)}
.cs-opt.on::before{border:5px solid var(--ac,#b8362a)}
.cs-note{width:100%;box-sizing:border-box;min-height:52px;margin-bottom:14px;padding:10px 12px;border:1px solid var(--bd,#e5decf);border-radius:12px;background:var(--bg,#faf8f3);color:var(--tx,#1c1c1e);font:inherit;font-size:14px;resize:vertical}
.cs-acts{display:flex;gap:10px}
.cs-acts button{flex:1;padding:12px;border-radius:12px;font:inherit;font-size:15px;font-weight:600;cursor:pointer}
.cs-skip{border:1px solid var(--bd,#e5decf);background:transparent;color:var(--tx2,#6a6a6a)}
.cs-send{border:1px solid var(--ac,#b8362a);background:var(--ac,#b8362a);color:#fff}
.cs-send:disabled{opacity:.4;cursor:default}`;
    document.head.appendChild(st);
  }
  function post(session, body) {
    return fetch("/api/cancel-survey", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + session }, body: JSON.stringify(body) }).catch(function () {});
  }
  function open(ask, session) {
    const L = TX[lang()] || TX.en; let pick = "";
    css();
    const bg = document.createElement("div"); bg.className = "cs-bg"; bg.id = "csBg";
    bg.innerHTML = `<div class="cs-box" role="dialog" aria-modal="true">
      <h3>${esc(L.t)}</h3><p>${esc(ask.trial ? L.dTrial : L.d)}</p>
      <div class="cs-opts">${ORDER.map((k) => `<button type="button" class="cs-opt" data-k="${k}">${esc(L.o[k])}</button>`).join("")}</div>
      <textarea class="cs-note" id="csNote" maxlength="1000" placeholder="${esc(L.ph)}"></textarea>
      <div class="cs-acts"><button type="button" class="cs-skip" id="csSkip">${esc(L.skip)}</button><button type="button" class="cs-send" id="csSend" disabled>${esc(L.send)}</button></div>
    </div>`;
    document.body.appendChild(bg);
    const close = () => { bg.remove(); };
    bg.querySelectorAll(".cs-opt").forEach((b) => b.addEventListener("click", () => {
      pick = b.dataset.k; bg.querySelectorAll(".cs-opt").forEach((x) => x.classList.toggle("on", x === b)); bg.querySelector("#csSend").disabled = false;
    }));
    bg.querySelector("#csSkip").addEventListener("click", () => { post(session, { skip: true, lang: lang() }); close(); });
    bg.querySelector("#csSend").addEventListener("click", () => {
      if (!pick) return;
      post(session, { reason: pick, note: bg.querySelector("#csNote").value, lang: lang() }); close();
      try { if (typeof showToast === "function") showToast(L.thanks); } catch (e) {}
    });
  }
  // 測驗/闖關進行中不打斷:等回到面板才跳;最多等 10 分鐘,這次沒跳下次開再問。
  function maybe(me, session) {
    if (shown || !me || !me.cancelAsk || !session) return;
    shown = true; let tries = 0;
    const tick = () => {
      const busy = document.querySelector(".cs-bg, .pw-bg.show, .modal.show, .sheet.show, .lesson-run, .quiz-run");
      if (!busy && document.visibilityState === "visible") return open(me.cancelAsk, session);
      if (++tries < 120) setTimeout(tick, 5000);
    };
    setTimeout(tick, 2500);
  }
  window.CancelSurvey = { maybe: maybe, _open: open };
})();
