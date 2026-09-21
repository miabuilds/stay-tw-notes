/* StayTW — 新機能のお知らせ
 *
 * app-version.json の「新しい版が出ています」は “更新してね” を言うだけで、
 * 何が増えたのかは誰にも伝わっていなかった。ここは中身の方を出す。
 *
 * ・NEWS の先頭 nid を見ていなければハブに 1 枚だけ出す。閉じたら二度と出さない。
 * ・web でもアプリでも同じものが出る（本文は web 側で共通なので）。
 * ・新しい項目は先頭に足す。nid は日付にして、過去分は消さずに残す。
 */
const WhatsNew = (() => {
  const K = "stw_news_seen";
  const esc = (x) => String(x == null ? "" : x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const L = () => { try { return twGetLang(); } catch (e) { return "ja"; } };
  const T = (k, fb) => { try { const v = twT(k); return v && v !== k ? v : fb; } catch (e) { return fb; } };

  // 先頭が最新。t=見出し / b=箇条書き / go=押したら開くパネル
  const NEWS = [
    {
      nid: "2026-09-21",   // ★ id にしない:同じオブジェクトの id(インドネシア語)に潰される
      go: "myvocab",
      ja: { t: "新しく増えたもの", b: ["My単語帳：気になった語を自分で足して複習にまわせます", "毎日の打卡と今日の運勢（宜・忌と幸運の一字）", "必修の基礎に 13〜19 を追加、クイズに「なぜ間違えたか」の解説"] },
      en: { t: "What's new", b: ["My words: add your own words and send them to review", "Daily check-in with a Taiwan-style fortune", "Numbers 13–19 added, and quizzes now explain why you missed it"] },
      ko: { t: "새로 생긴 것", b: ["내 단어장: 마주친 단어를 직접 추가해 복습으로", "매일 출석과 오늘의 운세 (宜·忌와 행운의 글자)", "필수 기초에 13~19 추가, 퀴즈에 «왜 틀렸는지» 해설"] },
      vi: { t: "Có gì mới", b: ["Sổ từ của tôi: tự thêm từ và đưa vào ôn tập", "Điểm danh mỗi ngày kèm quẻ vận may kiểu Đài Loan", "Thêm số 13–19, trắc nghiệm nay giải thích vì sao bạn sai"] },
      id: { t: "Yang baru", b: ["Kata saya: tambah katamu sendiri lalu kirim ke pengulangan", "Absen harian dengan ramalan ala Taiwan", "Angka 13–19 ditambahkan, kuis kini menjelaskan kenapa kamu salah"] },
    },
  ];

  function seen() { try { return localStorage.getItem(K) || ""; } catch (e) { return ""; } }
  function latest() { return NEWS[0] || null; }
  function pending() { const n = latest(); return n && seen() !== n.nid ? n : null; }
  function dismiss() {
    const n = latest(); if (!n) return;
    try { localStorage.setItem(K, n.nid); } catch (e) {}
    try { PA.render(); } catch (e) {}
  }
  function open(panel) {
    dismiss();
    try { switchPanel(panel); } catch (e) {}
  }

  /** ハブに差し込むカード。見るものが無ければ空文字。 */
  function card() {
    const n = pending();
    if (!n) return "";
    const c = n[L()] || n.en || n.ja;
    return `<div class="wn-card">
      <div class="wn-head">
        <span class="wn-tag">${esc(T("wnTag", "NEW"))}</span>
        <span class="wn-t">${esc(c.t)}</span>
        <button class="wn-x" onclick="WhatsNew.dismiss()" aria-label="${esc(T("wnClose", "閉じる"))}">✕</button>
      </div>
      <ul class="wn-l">${c.b.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      ${n.go ? `<button class="wn-go" onclick="WhatsNew.open('${esc(n.go)}')">${esc(T("wnGo", "見てみる"))} ›</button>` : ""}
    </div>`;
  }

  return { card, dismiss, open, pending };
})();
if (typeof window !== "undefined") window.WhatsNew = WhatsNew;   // const は window に乗らない
