// 1) ルート(/)の出し分け：初めての訪問者にはランディング(home.html)を、
//    アプリ利用者(?app=1 / cookie stw_app=1 / ネイティブアプリ)には学習ツール(index.html)を返す。
//    以前は index.html が JS で /home へ location.replace していたが、
//    ・クローラは JS を実行しないので "/" の OG/description はツール側のまま
//    ・replace で ?utm_source / ?lang が全部落ちて GA4 の流入元も言語も消える
//    ・1 ホップ余計
//    という問題があった（StayJP が 2026-07 に直したのと同じ構造）。サーバ側で出し分ければ全部解決する。
//
// 2) SNS プレビューと検索エンジン向けに、head の title / og を言語ごとに差し替える
//    （i18n は JS で本文を翻訳しているが、SNS のクローラは JS を実行しない）。
//
// API ルート（functions/api/*）と HTML 以外は素通し。
const META = {
  ja: {
    title: "台湾華語スタディ StayTW — 繁体字・注音で学ぶ台湾の中国語｜TOCFL対応・無料アプリ",
    desc: "日本語話者のための台湾華語（繁体字＋注音＋台湾読み）学習アプリ。単語・文法・フレーズ・模試、TOCFL L1〜6対応。登録不要・ブラウザで無料。iOSアプリも公開中。",
    locale: "ja_JP",
  },
  en: {
    title: "Taiwan Mandarin Study StayTW — Traditional Characters & Zhuyin | TOCFL, Free",
    desc: "Learn Taiwanese Mandarin the way Taiwan actually reads: traditional characters, Zhuyin, native audio. Vocabulary, grammar, phrases and mock exams for TOCFL 1-6. Free in your browser, iOS app available.",
    locale: "en_US",
  },
  ko: {
    title: "대만 화어 스터디 StayTW — 번체자·주음으로 배우는 대만 중국어 | TOCFL 대응·무료",
    desc: "번체자＋주음＋대만식 발음으로 배우는 대만 중국어. 단어·문법·회화·모의고사, TOCFL 1~6급 대응. 가입 없이 브라우저에서 무료, iOS 앱도 있습니다.",
    locale: "ko_KR",
  },
  vi: {
    title: "StayTW — Học tiếng Trung Đài Loan: chữ phồn thể, Zhuyin, phát âm Đài Loan | TOCFL, Miễn phí",
    desc: "Học tiếng Trung đúng cách người Đài Loan dùng: chữ phồn thể, Zhuyin (ㄅㄆㄇ), âm thanh người bản xứ. Từ vựng, ngữ pháp, câu giao tiếp, thi thử TOCFL 1-6. Giao diện tiếng Việt, miễn phí trên trình duyệt, có app iOS.",
    locale: "vi_VN",
  },
  id: {
    title: "StayTW — Belajar Mandarin Taiwan: karakter tradisional, Zhuyin, pelafalan Taiwan | TOCFL, Gratis",
    desc: "Belajar Mandarin seperti yang dipakai di Taiwan: karakter tradisional, Zhuyin (ㄅㄆㄇ), audio penutur asli. Kosakata, tata bahasa, frasa, ujian latihan TOCFL 1-6. Antarmuka bahasa Indonesia, gratis di browser, ada aplikasi iOS.",
    locale: "id_ID",
  },
};

class AttrSetter {
  constructor(attr, value) { this.attr = attr; this.value = value; }
  element(el) { el.setAttribute(this.attr, this.value); }
}
class TextSetter {
  constructor(value) { this.value = value; }
  element(el) { el.setInnerContent(this.value); }
}

function pickLang(url, req) {
  const q = (url.searchParams.get("lang") || "").toLowerCase();
  if (META[q]) return q;
  // 投稿のリンクは utm_source=threads_tw_ko / bluesky_tw / fb_vi のような形で来る
  const utm = (url.searchParams.get("utm_source") || "").toLowerCase();
  for (const l of Object.keys(META)) if (utm.endsWith("_" + l)) return l;
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  for (const l of ["ko", "ja", "vi", "id", "en"]) if (al.startsWith(l)) return l;
  return null;   // 判定できなければ元の静的 HTML のまま
}

function hasAppCookie(req) {
  const c = req.headers.get("cookie") || "";
  return /(?:^|;\s*)stw_app=1(?:;|$)/.test(c);
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) return next();

  const isRoot = url.pathname === "/" || url.pathname === "/index.html";
  const wantsApp = url.searchParams.has("app");
  let res;
  let setAppCookie = false;

  if (isRoot && !wantsApp && !hasAppCookie(request) && request.method === "GET") {
    // 初回訪問者・クローラ → ランディング。URL は "/" のまま（リダイレクトしない）ので
    // ?utm_source / ?lang は残り、ページ側の JS がそのまま読める。
    const lp = await env.ASSETS.fetch(new Request(new URL("/home", url), request));
    res = lp && lp.status === 200 ? lp : await next();
  } else {
    res = await next();
    // ツールに入った印。以後 "/" に来てもツールを返す（ネイティブアプリの WebView も同じ挙動）。
    if (isRoot && wantsApp) setAppCookie = true;
  }

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("text/html")) return res;

  // title/og の差し替えはトップ(ランディング / ツール)だけ。compare/*, kanji-gap, life などの
  // 独立ページは自前の SEO タイトルを持っているので触らない（2026-09-16 まで全ページ上書きしていたバグを修正）。
  const isTopPage = isRoot || url.pathname === "/home" || url.pathname === "/home.html";
  const lang = isTopPage ? pickLang(url, request) : null;
  let out = res;
  if (lang) {
    const m = META[lang];
    out = new HTMLRewriter()
      .on("title", new TextSetter(m.title))
      .on('meta[name="description"]', new AttrSetter("content", m.desc))
      .on('meta[property="og:title"]', new AttrSetter("content", m.title))
      .on('meta[property="og:description"]', new AttrSetter("content", m.desc))
      .on('meta[property="og:locale"]', new AttrSetter("content", m.locale))
      .on('meta[name="twitter:title"]', new AttrSetter("content", m.title))
      .on('meta[name="twitter:description"]', new AttrSetter("content", m.desc))
      .on("html", new AttrSetter("lang", lang))
      .transform(res);
  }
  if (setAppCookie) {
    out = new Response(out.body, out);
    out.headers.append("Set-Cookie", "stw_app=1; Max-Age=31536000; Path=/; SameSite=Lax; Secure");
  }
  return out;
}
