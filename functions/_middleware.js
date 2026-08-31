// SNS プレビューと検索エンジン向けに、head の title / og を言語ごとに差し替える。
//
// なぜ必要か：i18n は JS で本文を翻訳しているが、SNS のクローラは JS を実行しない。
// そのため韓国語・英語の投稿を共有しても、プレビューは静的な日本語のままになる。
// ここで ?lang=ko / ?lang=en（無ければ Accept-Language）を見てサーバ側で書き換える。
//
// API ルート（functions/api/*）と HTML 以外は素通し。
const META = {
  ja: {
    title: "台湾華語スタディ StayTW — 繁体字・注音で学ぶ台湾の中国語｜TOCFL対応・無料アプリ",
    desc: "日本語話者のための台湾華語（繁体字＋注音＋台湾読み）学習アプリ。単語・文法・フレーズ・模試、TOCFL L1〜5対応。登録不要・ブラウザで無料。iOSアプリも公開中。",
    locale: "ja_JP",
  },
  en: {
    title: "Taiwan Mandarin Study StayTW — Traditional Characters & Zhuyin | TOCFL, Free",
    desc: "Learn Taiwanese Mandarin the way Taiwan actually reads: traditional characters, Zhuyin, native audio. Vocabulary, grammar, phrases and mock exams for TOCFL 1-5. Free in your browser, iOS app available.",
    locale: "en_US",
  },
  ko: {
    title: "대만 화어 스터디 StayTW — 번체자·주음으로 배우는 대만 중국어 | TOCFL 대응·무료",
    desc: "번체자＋주음＋대만식 발음으로 배우는 대만 중국어. 단어·문법·회화·모의고사, TOCFL 1~5급 대응. 가입 없이 브라우저에서 무료, iOS 앱도 있습니다.",
    locale: "ko_KR",
  },
};

class AttrSetter {
  constructor(attr, value) { this.attr = attr; this.value = value; }
  element(el) { el.setAttribute(this.attr, this.value); }
}
class TextSetter {
  constructor(value) { this.value = value; this.done = false; }
  element(el) { el.setInnerContent(this.value); }
}

function pickLang(url, req) {
  const q = (url.searchParams.get("lang") || "").toLowerCase();
  if (META[q]) return q;
  // 投稿のリンクは utm_source=threads_tw_ko / bluesky_tw のような形で来る
  const utm = (url.searchParams.get("utm_source") || "").toLowerCase();
  if (utm.endsWith("_ko")) return "ko";
  if (utm.endsWith("_ja")) return "ja";
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  if (al.startsWith("ko")) return "ko";
  if (al.startsWith("ja")) return "ja";
  if (al.startsWith("en")) return "en";
  return null;   // 判定できなければ元の静的 HTML のまま
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) return next();

  const res = await next();
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("text/html")) return res;

  const lang = pickLang(url, request);
  if (!lang) return res;
  const m = META[lang];

  return new HTMLRewriter()
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
