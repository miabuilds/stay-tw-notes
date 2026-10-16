/* StayTW 後台 — 財務分析(參考 StayJP admin-dash 的口徑)
 * 資料:/api/admin/finance(RevenueCat webhook → D1 rc_events,正式環境全事件)
 * 一筆收入的拆法:售價(含稅) − 代扣消費稅 − 商店抽成 − RevenueCat 1% − 綜所稅 = 實際到手
 *   ・代扣稅用 RC 給的 tax_percentage(日本 10% 內含 → 9.09%)。沒給就當 0
 *   ・抽成用下面輸入框的費率(Apple 小型企業 15%／Google 15%),乘在「扣稅後」的金額上。
 *     RC 自己附的 commission_percentage 是它的估計(常是 30% 口徑),不拿來算,只在明細裡給參考
 *   ・金額以 RC 的美金(price)為準,換成台幣用輸入的匯率
 * 退款:RC 以 CANCELLATION + cancel_reason=CUSTOMER_SUPPORT 通知,金額為負或 0 → 用原交易金額扣回
 */
const FIN = (() => {
  let EV = [], FROM = 0, TO = Infinity;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (id, d) => { const v = Number(($(id) || {}).value); return isFinite(v) && v >= 0 ? v : d; };
  const PAID = new Set(["INITIAL_PURCHASE", "RENEWAL", "NON_RENEWING_PURCHASE"]);
  const PLAN = (p) => /lifetime/i.test(p || "") ? "買斷" : /year|annual/i.test(p || "") ? "年費" : /month/i.test(p || "") ? "月費" : (p || "—");
  const STORE = (s) => s === "PLAY_STORE" ? "Google Play" : s === "APP_STORE" ? "App Store" : (s || "App Store");
  const ms = (e) => Date.parse(String(e.ts).replace(" ", "T") + "Z");
  const fmtD = (t) => { const d = new Date(t); return isNaN(d) ? "—" : d.toISOString().slice(0, 10); };

  function rates() {
    return { fx: num("finFx", 31.6), apple: num("finApple", 15) / 100, google: num("finGoogle", 15) / 100,
             rc: num("finRc", 1) / 100, tax: num("finTax", 10) / 100 };
  }
  const tw = (usd) => "NT$" + Math.round(usd * rates().fx).toLocaleString();
  const twNeg = (usd) => (usd > 0 ? "−" : "") + tw(Math.abs(usd));

  // 1 筆收入事件 → 拆帳(美金)
  function split(e) {
    const R = rates();
    const gross = Number(e.usd) || 0;
    const taxP = Number(e.tax) || 0;
    const vat = gross * taxP;
    const fee = (gross - vat) * (e.st === "PLAY_STORE" ? R.google : R.apple);
    const rc = gross * R.rc;
    return { gross, vat, fee, rc, net: gross - vat - fee - rc };
  }
  const isRefund = (e) => e.t === "CANCELLATION" && e.cr === "CUSTOMER_SUPPORT";

  // 退款の元取引:同じ original_transaction_id か、無ければ同じ人・同じ商品の直近の収入
  function refundBase(e) {
    let base = null;
    for (const x of EV) {
      if (!PAID.has(x.t) || ms(x) > ms(e)) continue;
      if ((e.otx && x.otx === e.otx) || (x.u === e.u && x.p === e.p)) base = x;
    }
    return base;
  }

  // 人×商品ごとの今の状態
  function subscriptions() {
    const m = new Map();
    for (const e of EV) {
      // 同じ訂閱は Apple/Google の original_transaction_id で束ねる。RC の user id は
      // 匿名 ID → ログイン後の ID に変わるので、人で束ねると試用→課金が別人に分かれる
      const k = e.otx || (e.u + "|" + e.p);
      const s = m.get(k) || { u: e.u, p: e.p, st: e.st, c: e.c, first: ms(e), paid: 0, n: 0, trial: false, everTrial: false, conv: false, will: true, refunded: false, exp: 0, last: "" };
      if (e.st) s.st = e.st; if (e.c) s.c = e.c;
      if (e.t === "INITIAL_PURCHASE" || e.t === "RENEWAL" || e.t === "NON_RENEWING_PURCHASE" || e.t === "UNCANCELLATION" || e.t === "PRODUCT_CHANGE") {
        // 初期の数件は raw の形が違い expiration が無い → 月費は 1 か月、年費は 1 年で推定
        const est = /year|annual/i.test(e.p || "") ? 365 * 864e5 : /month/i.test(e.p || "") ? 31 * 864e5 : 0;
        const exp = e.ems ? Number(e.ems) : (est ? ms(e) + est : 0);
        if (exp) s.exp = Math.max(s.exp, exp);
        if (e.t === "NON_RENEWING_PURCHASE") s.exp = Infinity;
        s.trial = e.pt === "TRIAL";
        if (e.pt === "TRIAL") s.everTrial = true;
        if (e.t === "RENEWAL" && (e.conv || s.everTrial)) { s.conv = true; s.everTrial = true; }
        if (e.t !== "PRODUCT_CHANGE") s.will = true;
        if (PAID.has(e.t) && Number(e.usd) > 0) { s.paid += Number(e.usd); s.n++; }
      }
      if (e.t === "CANCELLATION") { s.will = false; if (isRefund(e)) s.refunded = true; }
      if (e.t === "EXPIRATION") s.exp = Math.min(s.exp || ms(e), ms(e));
      if (e.t === "BILLING_ISSUE") s.billing = true;
      s.last = e.t;
      m.set(k, s);
    }
    const now = Date.now();
    return [...m.values()].map((s) => {
      const alive = !s.refunded && (s.exp === Infinity || s.exp > now);
      s.status = s.refunded ? "已退款" : !alive ? "已到期" : s.exp === Infinity ? "買斷" : s.trial ? (s.will ? "試用中" : "試用中・已取消") : (s.will ? "付費中" : "付費中・不續訂");
      s.alive = alive;
      return s;
    });
  }

  function load(rows) { EV = (rows || []).filter((e) => e.t !== "TEST" && e.t !== "TRANSFER"); setRange("month"); }

  function setRange(k) {
    const n = new Date();
    if (k === "month") { FROM = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), 1); TO = Infinity; }
    else if (k === "last") { FROM = Date.UTC(n.getUTCFullYear(), n.getUTCMonth() - 1, 1); TO = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), 1) - 1; }
    else if (k === "30") { FROM = Date.now() - 30 * 864e5; TO = Infinity; }
    else if (k === "year") { FROM = Date.UTC(n.getUTCFullYear(), 0, 1); TO = Infinity; }
    else { FROM = 0; TO = Infinity; }
    document.querySelectorAll("[data-finr]").forEach((b) => b.classList.toggle("on", b.dataset.finr === k));
    const f = $("finFrom"), t = $("finTo");
    if (f) f.value = FROM ? fmtD(FROM) : ""; if (t) t.value = TO !== Infinity ? fmtD(TO) : "";
    render();
  }
  function custom() {
    const f = $("finFrom").value, t = $("finTo").value;
    FROM = f ? Date.parse(f + "T00:00:00Z") : 0; TO = t ? Date.parse(t + "T23:59:59Z") : Infinity;
    document.querySelectorAll("[data-finr]").forEach((b) => b.classList.remove("on"));
    render();
  }
  const inP = (e) => { const t = ms(e); return t >= FROM && t <= TO; };

  function render() {
    if (!$("finBox")) return;
    const R = rates();
    // ── 期間の収入・退款 ──
    const rows = {};   // key: store|plan
    let G = { gross: 0, vat: 0, fee: 0, rc: 0, net: 0, n: 0, ref: 0, nref: 0, newN: 0, renN: 0 };
    for (const e of EV) {
      if (!inP(e)) continue;
      if (PAID.has(e.t) && Number(e.usd) > 0) {
        const x = split(e), k = STORE(e.st) + "|" + PLAN(e.p);
        const r = rows[k] = rows[k] || { store: STORE(e.st), plan: PLAN(e.p), gross: 0, vat: 0, fee: 0, rc: 0, net: 0, n: 0, ref: 0, nref: 0 };
        for (const f of ["gross", "vat", "fee", "rc", "net"]) { r[f] += x[f]; G[f] += x[f]; }
        r.n++; G.n++;
        if (e.t === "RENEWAL") G.renN++; else G.newN++;
      }
      if (isRefund(e)) {
        const b = refundBase(e); if (!b) continue;
        const x = split(b), k = STORE(b.st) + "|" + PLAN(b.p);
        const r = rows[k] = rows[k] || { store: STORE(b.st), plan: PLAN(b.p), gross: 0, vat: 0, fee: 0, rc: 0, net: 0, n: 0, ref: 0, nref: 0 };
        r.ref += x.net; r.nref++; G.ref += x.net; G.nref++;   // 返金されるのは手取り分(商店手数料も戻る)
      }
    }
    const preTax = G.net - G.ref;
    const incomeTax = Math.max(0, preTax) * R.tax;
    const take = preTax - incomeTax;

    // ── 今の訂閱 ──
    const S = subscriptions(), now = Date.now();
    const paying = S.filter((s) => s.alive && !s.trial && s.exp !== Infinity);
    const trials = S.filter((s) => s.alive && s.trial);
    const life = S.filter((s) => s.exp === Infinity && !s.refunded);
    const lastPrice = (s) => { let p = 0; for (const e of EV) if (e.u === s.u && e.p === s.p && PAID.has(e.t) && Number(e.usd) > 0) p = Number(e.usd); return p; };
    let mrr = 0; paying.forEach((s) => { const p = lastPrice(s); mrr += /年費/.test(PLAN(s.p)) ? p / 12 : p; });
    const mrrNet = mrr * (1 - 0.0909) * (1 - R.apple) * (1 - R.rc);
    const willChurn = paying.filter((s) => !s.will).length;

    // 試用轉換(全期間)
    const everT = S.filter((s) => s.everTrial);
    const tConv = everT.filter((s) => s.conv).length;
    const tLive = everT.filter((s) => s.alive && s.trial).length;
    const tDone = everT.length - tLive;
    const tRate = tDone ? Math.round(tConv / tDone * 100) : 0;

    $("finHero").innerHTML = [
      ["本期實際到手", tw(take), "扣代扣稅・抽成・RC・退款・綜所稅", true],
      ["本期營收（含稅）", tw(G.gross), `${G.n} 筆（新購 ${G.newN}／續訂 ${G.renN}）`],
      ["付費中訂閱", paying.length, `不續訂 ${willChurn}・買斷累計 ${life.length}`],
      ["試用中", trials.length, `試用轉付費率 ${tRate}%（${tConv}/${tDone}）`],
      ["月經常性收入 MRR", tw(mrr), `撥款估 ${tw(mrrNet)}／月`],
    ].map(([l, v, d, hero]) => `<div class="fcard${hero ? " hero" : ""}"><span>${l}</span><b>${v}</b><i>${d}</i></div>`).join("");

    // ── 對帳表 ──
    const list = Object.values(rows).sort((a, b) => b.gross - a.gross);
    const c = (v, cls) => `<td class="n${cls ? " " + cls : ""}">${v}</td>`;
    $("finRecon").innerHTML = list.length ? `<table><thead><tr><th>商店</th><th>方案</th><th class="n">筆數</th><th class="n">營收（含稅）</th><th class="n">代扣消費稅</th><th class="n">商店抽成</th><th class="n">RevenueCat</th><th class="n">退款</th><th class="n">撥款淨額</th></tr></thead><tbody>`
      + list.map((r) => `<tr><td>${r.store}</td><td>${r.plan}</td>${c(r.n + (r.nref ? ` <span class="bad">+${r.nref}退</span>` : ""))}${c(tw(r.gross))}${c(twNeg(r.vat), "bad")}${c(twNeg(r.fee), "bad")}${c(twNeg(r.rc), "bad")}${c(r.ref ? twNeg(r.ref) : "—", r.ref ? "bad" : "muted")}${c("<b>" + tw(r.net - r.ref) + "</b>")}</tr>`).join("")
      + `<tr class="tot"><td colspan=2>合計</td>${c(G.n)}${c(tw(G.gross))}${c(twNeg(G.vat))}${c(twNeg(G.fee))}${c(twNeg(G.rc))}${c(G.ref ? twNeg(G.ref) : "—")}${c("<b>" + tw(preTax) + "</b>")}</tr></tbody></table>`
      + `<table class="waterfall"><tbody>
          <tr><td>營收（含稅）</td>${c(tw(G.gross))}</tr>
          <tr><td>− 代扣消費稅（商店代收代繳）</td>${c(twNeg(G.vat), "bad")}</tr>
          <tr><td>− 商店抽成</td>${c(twNeg(G.fee), "bad")}</tr>
          <tr><td>− RevenueCat ${Math.round(R.rc * 100)}%</td>${c(twNeg(G.rc), "bad")}</tr>
          <tr><td>− 退款</td>${c(twNeg(G.ref), "bad")}</tr>
          <tr><td>＝ 撥款前淨額</td>${c(tw(preTax))}</tr>
          <tr><td>− 綜所稅估算 ${Math.round(R.tax * 100)}%</td>${c(twNeg(incomeTax), "bad")}</tr>
          <tr class="tot"><td>＝ 實際到手</td>${c("<b>" + tw(take) + "</b>")}</tr>
          <tr><td class="muted">美金參考</td>${c("$" + take.toFixed(2), "muted")}</tr>
        </tbody></table>` : `<p class="muted pad">此期間沒有收入。</p>`;

    // ── 月趨勢(全期間)──
    const mon = {};
    for (const e of EV) {
      const k = String(e.ts).slice(0, 7); const r = mon[k] = mon[k] || { gross: 0, net: 0, newN: 0, renN: 0, trials: 0, cancel: 0, ref: 0 };
      if (PAID.has(e.t) && Number(e.usd) > 0) { const x = split(e); r.gross += x.gross; r.net += x.net; if (e.t === "RENEWAL") r.renN++; else r.newN++; }
      if (e.t === "INITIAL_PURCHASE" && e.pt === "TRIAL") r.trials++;
      if (e.t === "CANCELLATION" && !isRefund(e)) r.cancel++;
      if (isRefund(e)) { const b = refundBase(e); if (b) r.ref += split(b).net; }
    }
    const ks = Object.keys(mon).sort().reverse();
    const maxG = Math.max(1, ...ks.map((k) => mon[k].gross));
    $("finMonthly").innerHTML = `<table><thead><tr><th>月份</th><th class="n">新購</th><th class="n">續訂</th><th class="n">新試用</th><th class="n">取消</th><th class="n">營收（含稅）</th><th class="n">撥款淨額</th><th style="width:30%"></th></tr></thead><tbody>`
      + ks.map((k) => { const r = mon[k]; return `<tr><td>${k}</td>${c(r.newN)}${c(r.renN)}${c(r.trials)}${c(r.cancel)}${c(tw(r.gross))}${c("<b>" + tw(r.net - r.ref) + "</b>")}<td><span class="bar"><i style="width:${Math.round(r.gross / maxG * 100)}%"></i></span></td></tr>`; }).join("") + `</tbody></table>`;

    // ── 方案・國家 ──
    const agg = (keyFn) => { const o = {}; for (const e of EV) { if (!inP(e) || !PAID.has(e.t) || !(Number(e.usd) > 0)) continue; const k = keyFn(e); const r = o[k] = o[k] || { n: 0, g: 0 }; r.n++; r.g += Number(e.usd); } return Object.entries(o).sort((a, b) => b[1].g - a[1].g); };
    const small = (arr) => arr.length ? `<table><tbody>${arr.map(([k, r]) => `<tr><td>${esc(k)}</td>${c(r.n + " 筆")}${c(tw(r.g))}</tr>`).join("")}</tbody></table>` : `<p class="muted pad">—</p>`;
    $("finByPlan").innerHTML = small(agg((e) => PLAN(e.p)));
    $("finByCountry").innerHTML = small(agg((e) => e.c || "不明（早期資料）"));

    // ── 訂閱狀態と會員明細 ──
    const order = { "付費中": 0, "付費中・不續訂": 1, "試用中": 2, "試用中・已取消": 3, "買斷": 4, "已到期": 5, "已退款": 6 };
    const cnt = {}; S.forEach((s) => cnt[s.status] = (cnt[s.status] || 0) + 1);
    $("finStatus").innerHTML = Object.keys(order).filter((k) => cnt[k]).map((k) => `<span class="pill">${k} <b>${cnt[k]}</b></span>`).join("");
    const q = (($("finSearch") || {}).value || "").toLowerCase();
    const mem = S.filter((s) => !q || (s.u + s.p + s.status + (s.c || "")).toLowerCase().includes(q))
      .sort((a, b) => (order[a.status] - order[b.status]) || (b.first - a.first));
    $("finMembers").innerHTML = `<table><thead><tr><th>狀態</th><th>方案</th><th>商店</th><th>國家</th><th>開始</th><th>到期／下次扣款</th><th class="n">累計付款</th><th>使用者 ID</th></tr></thead><tbody>`
      + mem.map((s) => `<tr><td><span class="st st-${order[s.status]}">${s.status}</span>${s.billing && s.alive ? ' <span class="bad">扣款失敗過</span>' : ""}${s.conv ? ' <span class="muted">試用轉正</span>' : ""}</td><td>${PLAN(s.p)}</td><td>${STORE(s.st)}</td><td>${esc(s.c || "—")}</td><td>${fmtD(s.first)}</td><td>${s.exp === Infinity || !s.exp ? "—" : fmtD(s.exp)}</td>${c(s.paid ? tw(s.paid) : "—")}<td class="muted" title="${esc(s.u)}">${esc(String(s.u).slice(0, 14))}…</td></tr>`).join("")
      + `</tbody></table>`;
  }

  return { load, setRange, custom, render };
})();
