// StayPay — 網頁直接購買(綠界網頁版結帳)前端。五站共用同一支,設定由各站 paywall.js 先放在 window.STAYPAY_CFG:
//   { product:"pollytalk", sessionKey:"sen_session", api:"https://staypay.getclockin.workers.dev",
//     app:"/", lang:()=>"zh", login:()=>SenSync.login(), name:"PollyTalk", refundUrl:"/refund.html" }
// 規則:
//   ・App(WebView)內絕對不出現(Apple 3.1.1):isNative() 一律 return
//   ・網頁只賣年費(一次付清,不自動續扣)與終身;月費請在 App 內訂
//   ・不用原生 alert/confirm,視窗都畫在 #pwBg/#pwBox(沒有就自己建一個)
//   ・付完綠界會導回 ?paid=1&no=…(信用卡)或 ?paid=back&no=…(ATM/超商取號後、或按返回);這裡重抓 /api/me 解鎖
(function () {
  if (window.StayPay) return;
  var C = window.STAYPAY_CFG || {};
  var API = (C.api || "https://staypay.getclockin.workers.dev").replace(/\/$/, "");
  var KEY_LAST = "staypay_last_no", KEY_REF = "staypay_ref", KEY_UNTIL = (C.product || "x") + "_web_prem_until", KEY_SET = (C.product || "x") + "_web_prem_set";
  var isNative = function () { return !!window.ReactNativeWebView || !!(window.STAYTW_NATIVE && window.STAYTW_NATIVE.isNativeApp); };
  var ls = { get: function (k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }, del: function (k) { try { localStorage.removeItem(k); } catch (e) {} } };
  var token = function () { return ls.get(C.sessionKey || ""); };
  var lang = function () { try { var l = C.lang ? C.lang() : "zh"; return String(l || "zh").slice(0, 2); } catch (e) { return "zh"; } };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var fmt = function (n) { return "NT$" + Number(n).toLocaleString("en-US"); };
  // 推薦碼:輸入框、或連結 ?ref=CODE 帶進來,存 localStorage(跨站共用一組碼:總部 partners)。大寫英數、最多 20 字
  var normRef = function (s) { return String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20); };
  var refCode = function () { return normRef(ls.get(KEY_REF)); };

  // ── 文案(網站語言找不到就用英文;StayKR/TH/PollyTalk/Ajolito 介面是中文,TW 是外國人用)──
  var I = {
    zh: { title: "網頁直接購買", sub: "信用卡、ATM 轉帳、超商代碼都可以,付款在綠界安全頁面完成。", yearly: "年費", lifetime: "終身", yearlyNote: "一次付清 12 個月,不會自動續扣", lifetimeNote: "付一次,一直用", family: "家族價", launch: "新朋友限時", list: "原價", monthly: "月費方案請在 App 內訂閱。", taxId: "統一編號(選填,報帳用)", consent: "我已滿 18 歲,並了解這是數位內容,付款後立即開通,開通後不適用七日鑑賞期(詳見退款政策)。", pay: "前往綠界付款", loginFirst: "請先登入再購買", login: "登入", processing: "處理中…", needConsent: "請先勾選同意", badTax: "統一編號格式不正確", err: "系統忙碌中,請稍後再試", priceChanged: "價格已更新,請重新確認", paid: "付款成功,Premium 已開通!", pending: "付款處理中,入帳後會自動開通。", atmTitle: "ATM 轉帳資訊", cvsTitle: "超商繳費代碼", bank: "銀行代碼", account: "虛擬帳號", code: "繳費代碼", amount: "金額", expire: "繳費期限", atmNote: "繳費完成後(通常幾分鐘內)重新整理頁面就會開通。", close: "關閉", refund: "退款政策", cancel: "先不用", refLabel: "推薦碼(選填)", refApply: "套用", refOk: "推薦碼已套用,年費、買斷再打 9 折", refBad: "查無此推薦碼,請確認後再輸入。", refSelf: "這是你自己的推薦碼,請分享給別人。", refTag: "推薦碼價", refClear: "清除" },
    en: { title: "Buy on the web", sub: "Credit card, ATM transfer or convenience-store code. Payment is completed on ECPay's secure page.", yearly: "Yearly", lifetime: "Lifetime", yearlyNote: "One payment for 12 months, no auto-renewal", lifetimeNote: "Pay once, use forever", family: "Family price", launch: "New-member offer", list: "List price", monthly: "Monthly plan is available in the app.", taxId: "Taiwan tax ID (optional)", consent: "I am 18+ and understand this is digital content unlocked immediately after payment; the 7-day cooling-off period does not apply (see refund policy).", pay: "Pay with ECPay", loginFirst: "Please sign in first", login: "Sign in", processing: "Processing…", needConsent: "Please tick the consent box", badTax: "Invalid tax ID", err: "Something went wrong, please try again", priceChanged: "Price updated, please check again", paid: "Payment received. Premium is unlocked!", pending: "Payment is being processed. Premium unlocks automatically once confirmed.", atmTitle: "ATM transfer details", cvsTitle: "Convenience-store payment code", bank: "Bank code", account: "Account", code: "Code", amount: "Amount", expire: "Pay by", atmNote: "After paying, reload the page (usually within minutes) and Premium will be on.", close: "Close", refund: "Refund policy", cancel: "Not now", refLabel: "Referral code (optional)", refApply: "Apply", refOk: "Code applied: 10% off yearly and lifetime", refBad: "Code not found, please check and try again.", refSelf: "That is your own code. Share it with someone else.", refTag: "Referral price", refClear: "Clear" },
    ja: { title: "Web で購入", sub: "クレジットカード・ATM 振込・コンビニ決済に対応。支払いは ECPay(綠界)の安全なページで行います。", yearly: "年額", lifetime: "買い切り", yearlyNote: "12 か月分を一括払い、自動更新なし", lifetimeNote: "一度払えばずっと使える", family: "ファミリー価格", launch: "新規限定", list: "通常価格", monthly: "月額プランはアプリ内でご登録ください。", taxId: "統一編號(任意・領収用)", consent: "18 歳以上で、デジタルコンテンツのため支払い後すぐ開通し、開通後は 7 日間のクーリングオフが適用されないことを理解しました(返金ポリシー参照)。", pay: "ECPay で支払う", loginFirst: "先にログインしてください", login: "ログイン", processing: "処理中…", needConsent: "同意にチェックしてください", badTax: "統一編號の形式が正しくありません", err: "エラーが発生しました。もう一度お試しください", priceChanged: "価格が更新されました。ご確認ください", paid: "お支払い完了。Premium が有効になりました!", pending: "お支払い処理中です。入金確認後、自動で有効になります。", atmTitle: "ATM 振込先", cvsTitle: "コンビニ支払いコード", bank: "銀行コード", account: "口座番号", code: "支払いコード", amount: "金額", expire: "支払期限", atmNote: "お支払い後(通常数分以内)にページを再読み込みすると有効になります。", close: "閉じる", refund: "返金ポリシー", cancel: "今はしない", refLabel: "紹介コード(任意)", refApply: "適用", refOk: "紹介コード適用:年額・買い切りが 10% OFF", refBad: "紹介コードが見つかりません。ご確認ください。", refSelf: "ご自身の紹介コードは使えません。", refTag: "紹介価格", refClear: "クリア" },
    ko: { title: "웹에서 구매", sub: "신용카드, ATM 이체, 편의점 결제 가능. 결제는 ECPay(綠界) 보안 페이지에서 진행됩니다.", yearly: "연간", lifetime: "평생", yearlyNote: "12개월 일시불, 자동 갱신 없음", lifetimeNote: "한 번 결제로 평생 사용", family: "패밀리 가격", launch: "신규 한정", list: "정가", monthly: "월간 플랜은 앱에서 구독해 주세요.", taxId: "통일번호(선택)", consent: "만 18세 이상이며, 디지털 콘텐츠로 결제 후 즉시 개통되고 개통 후에는 7일 청약철회가 적용되지 않음을 이해합니다(환불 정책 참고).", pay: "ECPay로 결제", loginFirst: "먼저 로그인해 주세요", login: "로그인", processing: "처리 중…", needConsent: "동의에 체크해 주세요", badTax: "통일번호 형식이 올바르지 않습니다", err: "오류가 발생했습니다. 다시 시도해 주세요", priceChanged: "가격이 변경되었습니다. 다시 확인해 주세요", paid: "결제 완료! Premium이 활성화되었습니다.", pending: "결제 처리 중입니다. 입금 확인 후 자동으로 활성화됩니다.", atmTitle: "ATM 이체 정보", cvsTitle: "편의점 결제 코드", bank: "은행 코드", account: "계좌번호", code: "결제 코드", amount: "금액", expire: "결제 기한", atmNote: "결제 후(보통 몇 분 내) 페이지를 새로고침하면 활성화됩니다.", close: "닫기", refund: "환불 정책", cancel: "다음에", refLabel: "추천 코드(선택)", refApply: "적용", refOk: "추천 코드 적용: 연간·평생 10% 할인", refBad: "추천 코드를 찾을 수 없습니다. 다시 확인해 주세요.", refSelf: "본인의 추천 코드는 사용할 수 없습니다.", refTag: "추천가", refClear: "지우기" },
  };
  I.vi = I.en; I.id = I.en; I.th = I.en; I.es = I.en;
  var T = function (k) { var L = I[lang()] || I.en; return L[k] || I.en[k] || k; };

  // ── 視窗(優先用付費牆的 #pwBg/#pwBox;pricing.html 之類沒有就自建)──
  function box() {
    var bg = document.getElementById("pwBg"), bx = document.getElementById("pwBox");
    if (bg && bx) return { bg: bg, box: bx, show: function () { bg.classList.add("show"); }, hide: function () { bg.classList.remove("show"); } };
    bg = document.getElementById("spBg");
    if (!bg) {
      bg = document.createElement("div"); bg.id = "spBg";
      bg.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9998;display:none;align-items:flex-end;justify-content:center;padding:0";
      bg.innerHTML = '<div id="spBox" style="background:var(--bg,#fff);color:var(--tx,#222);width:100%;max-width:480px;max-height:92vh;overflow:auto;border-radius:18px 18px 0 0;padding:18px 18px 28px;box-shadow:0 -10px 40px rgba(0,0,0,.25);font:15px/1.6 system-ui,-apple-system,sans-serif"></div>';
      bg.addEventListener("click", function (e) { if (e.target === bg) hide(); });
      document.body.appendChild(bg);
    }
    bx = document.getElementById("spBox");
    return { bg: bg, box: bx, show: function () { bg.style.display = "flex"; }, hide: function () { bg.style.display = "none"; } };
  }
  function hide() { var b = box(); b.hide(); }
  function toast(msg) { try { if (typeof showToast === "function") { showToast(msg); return; } } catch (e) {} try { if (window.showToast) { window.showToast(msg); return; } } catch (e) {} var t = document.createElement("div"); t.textContent = msg; t.style.cssText = "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#222;color:#fff;padding:11px 18px;border-radius:12px;z-index:9999;font-size:14px;max-width:90%"; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 3500); }
  var btnStyle = "width:100%;padding:13px;border-radius:12px;border:none;font:inherit;font-weight:700;cursor:pointer;background:var(--ac,#e8503a);color:#fff;font-size:15px";
  var ghostStyle = "width:100%;padding:11px;border-radius:12px;border:1px solid var(--line,var(--bd,#ddd));font:inherit;cursor:pointer;background:transparent;color:var(--tx2,#555);margin-top:8px";

  // ── 購買視窗 ──
  var plans = null, chosen = "lifetime";
  function open(preselect) {
    if (isNative()) return;
    chosen = preselect === "yearly" ? "yearly" : "lifetime";
    var b = box();
    b.box.innerHTML = '<p style="text-align:center;padding:30px 0;color:var(--tx3,#888)">' + esc(T("processing")) + "</p>";
    b.show();
    var tok = token();
    var rc = refCode();
    fetch(API + "/api/plans?product=" + encodeURIComponent(C.product) + (rc ? "&ref=" + encodeURIComponent(rc) : ""), { headers: tok ? { Authorization: "Bearer " + tok } : {} })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (!d || !d.plans) throw new Error("plans"); plans = d; render(); })
      .catch(function (e) { try { console.error("[StayPay] open failed", e); } catch (_) {} b.box.innerHTML = '<p style="text-align:center;padding:30px 0">' + esc(T("err")) + '</p><button style="' + ghostStyle + '" onclick="StayPay.close()">' + esc(T("close")) + "</button>"; });
  }
  function planCard(k) {
    var p = plans.plans[k], sel = chosen === k;
    var fam = !!p.family, launch = !!p.launch, ref = !!p.ref;
    var was = ref ? (p.base_twd || p.list_twd) : p.list_twd, strike = (fam || launch || ref) && Number(was) > Number(p.twd);
    return '<label style="display:flex;align-items:center;gap:12px;padding:12px 14px;border:2px solid ' + (sel ? "var(--ac,#e8503a)" : "var(--line,var(--bd,#ddd))") + ';border-radius:14px;cursor:pointer;margin-bottom:10px">' +
      '<input type="radio" name="spPlan" value="' + k + '" ' + (sel ? "checked" : "") + ' onchange="StayPay.pick(\'' + k + '\')" style="width:18px;height:18px;accent-color:var(--ac,#e8503a)">' +
      '<span style="flex:1"><b style="font-size:16px">' + esc(T(k)) + '</b>' + (fam || launch || ref ? ' <span style="font-size:11px;background:var(--ac,#e8503a);color:#fff;border-radius:999px;padding:2px 8px;vertical-align:middle">' + esc(T(ref ? "refTag" : fam ? "family" : "launch")) + "</span>" : "") +
      '<br><span style="font-size:12.5px;color:var(--tx3,#888)">' + esc(T(k + "Note")) + "</span></span>" +
      '<span style="text-align:right"><b style="font-size:18px">' + esc(fmt(p.twd)) + "</b>" + (strike ? '<br><s style="font-size:12px;color:var(--tx3,#888)">' + esc(fmt(was)) + "</s>" : "") + "</span></label>";
  }
  function render() {
    var b = box(), tok = token();
    var html = '<button class="qclose" style="float:right;border:none;background:none;font-size:18px;cursor:pointer;color:var(--tx3,#888)" onclick="StayPay.close()">✕</button>' +
      '<h3 style="font-size:20px;font-weight:700;margin:4px 0 6px">' + esc(T("title")) + "</h3>" +
      '<p style="font-size:13px;color:var(--tx2,#555);margin:0 0 14px">' + esc(T("sub")) + "</p>" +
      planCard("lifetime") + planCard("yearly") +
      '<p style="font-size:12px;color:var(--tx3,#888);margin:0 0 12px">' + esc(T("monthly")) + "</p>";
    html += refRow();
    if (!tok) {
      html += '<p style="text-align:center;font-size:14px;margin:6px 0 10px">' + esc(T("loginFirst")) + "</p>" +
        '<button style="' + btnStyle + '" onclick="StayPay.login()">' + esc(T("login")) + "</button>";
    } else {
      html += '<input id="spTax" inputmode="numeric" maxlength="8" placeholder="' + esc(T("taxId")) + '" style="width:100%;padding:11px 12px;border:1px solid var(--line,var(--bd,#ddd));border-radius:10px;background:var(--bg2,#fafafa);color:inherit;font:inherit;font-size:14px;margin-bottom:10px">' +
        '<label style="display:flex;gap:8px;align-items:flex-start;font-size:12.5px;color:var(--tx2,#555);line-height:1.55;margin-bottom:12px"><input id="spConsent" type="checkbox" style="margin-top:3px;width:16px;height:16px;flex:none;accent-color:var(--ac,#e8503a)"><span>' + esc(T("consent")) + (C.refundUrl ? ' <a href="' + esc(C.refundUrl) + '" target="_blank" style="color:var(--ac,#e8503a)">' + esc(T("refund")) + "</a>" : "") + "</span></label>" +
        '<button id="spPay" style="' + btnStyle + '" onclick="StayPay.start()">' + esc(T("pay")) + "</button>";
    }
    html += '<button style="' + ghostStyle + '" onclick="StayPay.close()">' + esc(T("cancel")) + "</button>" +
      '<p id="spMsg" style="text-align:center;font-size:12.5px;color:var(--ac2,#c0392b);margin:10px 0 0;min-height:1em"></p>';
    b.box.innerHTML = html;
    b.show();
  }
  function pick(k) { chosen = k; if (plans) render(); }
  // ── 推薦碼列:輸入 → 套用(重抓 /api/plans 讓後端算價);已套用就顯示綠字 + 清除
  function refRow() {
    var r = plans && plans.ref, cur = refCode();
    var inputStyle = "flex:1;min-width:0;padding:10px 12px;border:1px solid var(--line,var(--bd,#ddd));border-radius:10px;background:var(--bg2,#fafafa);color:inherit;font:inherit;font-size:14px;text-transform:uppercase";
    var applyStyle = "flex:none;padding:10px 14px;border-radius:10px;border:1px solid var(--ac,#e8503a);background:transparent;color:var(--ac,#e8503a);font:inherit;font-weight:700;cursor:pointer;font-size:14px";
    var html = '<div style="display:flex;gap:8px;align-items:center;margin:0 0 6px"><input id="spRef" value="' + esc(cur) + '" placeholder="' + esc(T("refLabel")) + '" autocapitalize="characters" autocomplete="off" maxlength="20" style="' + inputStyle + '" onkeydown="if(event.key===\'Enter\'){event.preventDefault();StayPay.applyRef();}">';
    html += (r && r.ok && cur) ? '<button type="button" style="' + applyStyle + '" onclick="StayPay.clearRef()">' + esc(T("refClear")) + "</button>" : '<button type="button" style="' + applyStyle + '" onclick="StayPay.applyRef()">' + esc(T("refApply")) + "</button>";
    html += "</div>";
    var note = "", color = "var(--tx3,#888)";
    if (r && cur) { if (r.ok) { note = T("refOk"); color = "#16A34A"; } else { note = r.reason === "self" ? T("refSelf") : T("refBad"); color = "var(--ac2,#c0392b)"; } }
    html += '<p id="spRefMsg" style="font-size:12.5px;color:' + color + ';margin:0 0 12px;min-height:1em">' + esc(note) + "</p>";
    return html;
  }
  function applyRef() {
    var el = document.getElementById("spRef"), code = normRef(el && el.value);
    if (!code) { clearRef(); return; }
    ls.set(KEY_REF, code);
    open(chosen);
  }
  function clearRef() { ls.del(KEY_REF); open(chosen); }
  function login() {
    try { sessionStorage.setItem("staypay_resume", chosen); } catch (e) {}
    hide();
    try { if (C.login) C.login(); } catch (e) {}
    // 登入完(同頁換 token)就把購買視窗再打開;最多等 3 分鐘
    var n = 0, t = setInterval(function () { if (token()) { clearInterval(t); open(chosen); } else if (++n > 180) clearInterval(t); }, 1000);
  }
  var busy = false;
  function start(plan) {
    if (isNative()) return;
    if (plan) chosen = plan === "yearly" ? "yearly" : "lifetime";
    if (!plans) { open(chosen); return; }   // 從 pricing 頁直接呼叫:先開視窗讓人確認
    var tok = token(); if (!tok) { login(); return; }
    var msg = document.getElementById("spMsg"), consent = document.getElementById("spConsent"), taxEl = document.getElementById("spTax"), payBtn = document.getElementById("spPay");
    if (!consent || !consent.checked) { if (msg) msg.textContent = T("needConsent"); return; }
    var tax = (taxEl && taxEl.value || "").replace(/\D/g, "");
    if (tax && tax.length !== 8) { if (msg) msg.textContent = T("badTax"); return; }
    if (busy) return; busy = true;
    if (payBtn) { payBtn.disabled = true; payBtn.textContent = T("processing"); }
    var p = plans.plans[chosen];
    fetch(API + "/api/create", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + tok },
      body: JSON.stringify({ product: C.product, plan: chosen, expected_twd: p.twd, tax_id: tax, lang: lang(), ref: (plans.ref && plans.ref.ok) ? plans.ref.code : "" }) })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, status: r.status, d: d }; }); })
      .then(function (x) {
        if (!x.ok) {
          busy = false; if (payBtn) { payBtn.disabled = false; payBtn.textContent = T("pay"); }
          if (x.status === 409) { if (msg) msg.textContent = T("priceChanged"); plans = null; setTimeout(function () { open(chosen); }, 1200); return; }
          if (x.status === 401) { if (msg) msg.textContent = T("loginFirst"); return; }
          if (x.d && (x.d.error === "bad_ref" || x.d.error === "self_ref")) { ls.del(KEY_REF); if (msg) msg.textContent = x.d.error === "self_ref" ? T("refSelf") : T("refBad"); plans = null; setTimeout(function () { open(chosen); }, 1500); return; }
          if (msg) msg.textContent = (x.d && (x.d.reason || x.d.error)) || T("err");
          return;
        }
        ls.set(KEY_LAST, x.d.merchantTradeNo || "");
        var f = document.createElement("form"); f.method = "POST"; f.action = x.d.endpoint; f.style.display = "none";
        Object.keys(x.d.params).forEach(function (k) { var i = document.createElement("input"); i.type = "hidden"; i.name = k; i.value = String(x.d.params[k]); f.appendChild(i); });
        document.body.appendChild(f); f.submit();
      })
      .catch(function () { busy = false; if (payBtn) { payBtn.disabled = false; payBtn.textContent = T("pay"); } if (msg) msg.textContent = T("err"); });
  }

  // ── 付完回來 ──
  function applyEntitled(me) {
    var on = !!(me && (me.entitled || me.premium));
    if (on && window.Paywall && Paywall.setEntitled) {
      try { if (!Paywall.isPremium()) Paywall.setEntitled(true); } catch (e) {}
      if (me.premiumUntil) { ls.set(KEY_UNTIL, String(me.premiumUntil)); ls.set(KEY_SET, "1"); }
    }
    return on;
  }
  function fetchMe() {
    var tok = token(); if (!tok) return Promise.resolve(null);
    return fetch("/api/me", { headers: { Authorization: "Bearer " + tok } }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  }
  function showPayInfo(o) {
    var b = box(), info = o.pay_info || {}, isAtm = /ATM/i.test(info.type || o.payment_type || "");
    var rows = isAtm
      ? [[T("bank"), info.bank_code], [T("account"), info.v_account]]
      : [[T("code"), info.payment_no || [info.barcode1, info.barcode2, info.barcode3].filter(Boolean).join(" ")]];
    rows.push([T("amount"), fmt(info.amount || o.amount)]); if (info.expire_date) rows.push([T("expire"), info.expire_date]);
    b.box.innerHTML = '<button style="float:right;border:none;background:none;font-size:18px;cursor:pointer;color:var(--tx3,#888)" onclick="StayPay.close()">✕</button>' +
      '<h3 style="font-size:20px;font-weight:700;margin:4px 0 12px">' + esc(isAtm ? T("atmTitle") : T("cvsTitle")) + "</h3>" +
      rows.map(function (r) { return '<div style="display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid var(--line,var(--bd,#eee))"><span style="color:var(--tx3,#888)">' + esc(r[0]) + '</span><b style="font-size:17px;letter-spacing:.5px;user-select:all">' + esc(r[1]) + "</b></div>"; }).join("") +
      '<p style="font-size:12.5px;color:var(--tx2,#555);margin:12px 0 14px">' + esc(T("atmNote")) + "</p>" +
      '<button style="' + btnStyle + '" onclick="StayPay.close()">' + esc(T("close")) + "</button>";
    b.show();
  }
  function onReturn() {
    var q; try { q = new URLSearchParams(location.search); } catch (e) { return; }
    var paid = q.get("paid"), no = q.get("no") || ls.get(KEY_LAST), buy = q.get("buy");
    // KOL 連結 ?ref=CODE:先記起來,之後開購買視窗自動套用(沒登入也先存)
    var refQ = normRef(q.get("ref")); if (refQ) ls.set(KEY_REF, refQ);
    if (paid) {
      q.delete("paid"); q.delete("no");
      try { history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q.toString() : "") + location.hash); } catch (e) {}
      var tok = token();
      var afterMe = function (me) {
        if (applyEntitled(me)) { toast(T("paid")); ls.del(KEY_LAST); return; }
        if (!no || !tok) { toast(T("pending")); return; }
        fetch(API + "/api/status?no=" + encodeURIComponent(no), { headers: { Authorization: "Bearer " + tok } }).then(function (r) { return r.ok ? r.json() : null; }).then(function (o) {
          if (o && o.status === "paid") { fetchMe().then(function (m2) { applyEntitled(m2); toast(T("paid")); }); ls.del(KEY_LAST); }
          else if (o && o.status === "awaiting" && o.pay_info) showPayInfo(o);
          else toast(T("pending"));
        }).catch(function () { toast(T("pending")); });
      };
      // 信用卡 callback 跟瀏覽器導回幾乎同時,等一下再問,免得先問到還沒開通
      setTimeout(function () { fetchMe().then(afterMe); }, paid === "1" ? 1500 : 200);
      return;
    }
    if (buy && !isNative()) {
      q.delete("buy");
      try { history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q.toString() : "") + location.hash); } catch (e) {}
      setTimeout(function () { token() ? open(buy) : (chosen = buy, login()); }, 600);
      return;
    }
    // 平常開頁:網頁買的年費到期就收回(只收回我們自己設的);有登入但本機沒 Premium 旗標 → 問一次後端(TH/EN/ES 的網頁原本不會問)
    var until = Number(ls.get(KEY_UNTIL) || 0);
    if (ls.get(KEY_SET) === "1" && until && until < Date.now() && window.Paywall && Paywall.setEntitled) { ls.del(KEY_SET); ls.del(KEY_UNTIL); try { Paywall.setEntitled(false); } catch (e) {} }
    if (token() && window.Paywall && !Paywall.isPremium()) {
      var d = new Date().toISOString().slice(0, 10);
      if (ls.get("staypay_me_day") !== d) { ls.set("staypay_me_day", d); fetchMe().then(applyEntitled); }
    }
  }

  window.StayPay = { open: open, start: start, pick: pick, login: login, close: hide, onReturn: onReturn, isNative: isNative, applyRef: applyRef, clearRef: clearRef };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onReturn); else onReturn();
})();
