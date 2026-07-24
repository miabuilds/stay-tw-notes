// StayTW Study — TTS（台湾中国語の音声）
// 端末にある zh 系ボイスを品質スコアで並べ、いちばん良いものを自動選択。
// Chrome の「Google 國語（臺灣）」> macOS/iOS の Enhanced/Premium 版 > 標準 Meijia の順。
// ユーザーが選んだボイスは localStorage("stw-voice") に保存。
const TTS = (() => {
  let list = [];

  // ── 事前生成 mp3（scripts/tts-generate.py）があれば最優先で使う ──
  // manifest: { "原文テキスト": "ハッシュ.mp3" }。無い環境では Web Speech にフォールバック。
  let MANIFEST = null;
  const audioEl = typeof Audio !== "undefined" ? new Audio() : null;
  if (typeof fetch !== "undefined") {
    fetch("audio/manifest.json")
      .then(r => (r.ok ? r.json() : null))
      .then(m => { MANIFEST = m; })
      .catch(() => {});
  }
  function playMp3(text, rate) {
    if (!MANIFEST || !audioEl) return false;
    const f = MANIFEST[text];
    if (!f) return false;
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    audioEl.pause();
    audioEl.src = "audio/tts/" + f;
    audioEl.playbackRate = rate || 1;
    audioEl.play().catch(() => {});
    return true;
  }

  function refresh() {
    if (!("speechSynthesis" in window)) return;
    list = speechSynthesis.getVoices().filter(v => {
      const lang = (v.lang || "").toLowerCase().replace("_", "-");
      if (!lang.startsWith("zh")) return false;
      if (lang.includes("hk") || /cantonese|粵|广东话|廣東話/i.test(v.name)) return false; // 広東語は除外
      return true;
    });
  }

  function score(v) {
    const lang = (v.lang || "").toLowerCase().replace("_", "-");
    const name = v.name || "";
    let s = 0;
    if (lang.includes("tw")) s += 100;               // 台湾中国語を最優先
    if (/google/i.test(name)) s += 60;               // Chrome の Google ボイスは自然
    if (/premium|enhanced|プレミアム|拡張/i.test(name)) s += 40;
    if (/siri/i.test(name)) s += 30;
    if (/eloquence|compact/i.test(name)) s -= 40;    // 機械っぽい系は避ける
    if (lang.includes("cn")) s -= 10;
    if (!v.localService) s += 15;                    // クラウドボイスは概して高品質
    return s;
  }

  function best() {
    if (!list.length) refresh();
    const savedURI = localStorage.getItem("stw-voice");
    if (savedURI) {
      const saved = list.find(v => v.voiceURI === savedURI);
      if (saved) return saved;
    }
    return [...list].sort((a, b) => score(b) - score(a))[0] || null;
  }

  // 記号は読み上げない：スラッシュ・ダッシュ類は「、」の間にし、括弧・引用符・絵文字などは除去
  function sanitize(text) {
    return String(text)
      .replace(/[／/｜|—―–…⋯~〜]+/g, "、")          // 区切り記号 → 短いポーズ
      .replace(/[（）()「」『』【】《》〈〉""''"']/g, "") // 括弧・引用符は無音
      .replace(/[＿_]{2,}/g, "、")                    // 空欄（＿＿）→ ポーズ
      .replace(/[🔊💡✓★☆♪]|[\u{1F300}-\u{1FAFF}]/gu, "") // 絵文字
      .replace(/、{2,}/g, "、")
      .replace(/^、|、$/g, "")
      .trim();
  }

  function speak(text, rate) {
    if (!text) return;
    if (playMp3(text, rate)) return;             // 高音質 mp3 があればそちらを再生
    if (!("speechSynthesis" in window)) return;
    text = sanitize(text);
    if (!text) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-TW";
    const v = best();
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = rate || 0.95;
    u.pitch = 1.05;
    speechSynthesis.speak(u);
  }

  // ボイス選択メニュー用：品質順の {uri, label} 一覧
  function options() {
    if (!list.length) refresh();
    return [...list].sort((a, b) => score(b) - score(a))
      .map(v => ({ uri: v.voiceURI, label: `${v.name} (${v.lang})` }));
  }
  function setVoice(uri) { localStorage.setItem("stw-voice", uri); }
  function currentURI() { const v = best(); return v ? v.voiceURI : ""; }

  if ("speechSynthesis" in window) {
    refresh();
    speechSynthesis.onvoiceschanged = refresh;
  }
  function stop() {
    if (audioEl) audioEl.pause();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  }

  return { speak, stop, options, setVoice, currentURI, refresh };
})();
// 既存コードとの互換用グローバル
function speakZh(text, rate) { TTS.speak(text, rate); }
