// StayTW Study — TTS（台湾中国語の音声）
// 端末にある zh 系ボイスを品質スコアで並べ、いちばん良いものを自動選択。
// Chrome の「Google 國語（臺灣）」> macOS/iOS の Enhanced/Premium 版 > 標準 Meijia の順。
// ユーザーが選んだボイスは localStorage("stw-voice") に保存。
const TTS = (() => {
  let list = [];

  // ── 事前生成 mp3（scripts/tts-generate.py）があれば最優先で使う ──
  // manifest: { "原文テキスト": "ハッシュ.mp3" }。無い環境では Web Speech にフォールバック。
  let MANIFEST = null;
  // 音檔位置。"" = 本站相對路徑（現況、Pages で配信）。
  // 将来ファイルが Pages の 2 万件上限に近づいたら、ここを R2 の公開ドメイン（末尾 / つき、
  // 例 "https://media.example.com/"）にするだけで R2 配信に切替できる。それ以外は無変更。
  const TTS_BASE = "";
  let playToken = 0;   // stop() で増やし、読込中に解決した play() を無効化（＝押した瞬間に止める）
  // 再生速度（全音声共通。0.5〜2 倍、localStorage で永続）
  let SPD = 1; try { SPD = Math.max(0.5, Math.min(2, parseFloat(localStorage.getItem("stw_tts_rate")) || 1)); } catch (e) {}
  const audioEl = typeof Audio !== "undefined" ? new Audio() : null;
  if (typeof fetch !== "undefined") {
    fetch("audio/manifest.json?v=" + Date.now())
      .then(r => (r.ok ? r.json() : null))
      .then(m => { MANIFEST = m; })
      .catch(() => {});
  }
  function playMp3(text, rate, onend, onprog) {
    if (!MANIFEST || !audioEl) return false;
    const f = MANIFEST[text];
    if (!f) return false;
    if ("speechSynthesis" in window && speechSynthesis.speaking) speechSynthesis.cancel();
    audioEl.playbackRate = SPD;
    // 再生完了で次へ進めるよう ended を通知（読み上げの自動送り用）
    audioEl.onended = () => { if (onprog) onprog(1); if (onend) onend(); };
    // mp3 が読めない（弱い回線など）→ Web Speech にフォールバック（無音防止）
    audioEl.onerror = () => { synthSpeak(text, onend, onprog); };
    // 同じ音声を連打したときは読み込み直さず頭出しだけ（連続タップのカクつき防止）
    if (audioEl.dataset.f === f && audioEl.readyState >= 2) {
      try { audioEl.currentTime = 0; } catch (e) {}
    } else {
      audioEl.src = TTS_BASE + "audio/tts/" + f;
      audioEl.dataset.f = f;
    }
    const myToken = ++playToken;
    const p = audioEl.play();
    // 読込に時間がかかり、その間に stop() されたら、再生開始した瞬間に止める（＝一時停止が空振りしない）
    if (p && p.then) p.then(() => { if (myToken !== playToken) { try { audioEl.pause(); } catch (e) {} } }).catch(() => {});
    // 逐字ハイライト（karaoke）：音源の再生位置から「今どの文字か」を毎フレーム通知。
    // 中国語は 1 漢字＝ほぼ 1 音節でテンポが均一なので、時間比で十分正確に追える。
    if (onprog) {
      const tick = () => {
        if (myToken !== playToken) return;                 // stop / 次の再生が来たら止める
        const d = audioEl.duration;
        if (d && isFinite(d) && d > 0) onprog(Math.min(1, audioEl.currentTime / d));
        if (!audioEl.paused && !audioEl.ended && myToken === playToken) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
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

  function speak(text, rate, onend, onprog) {
    if (!text) { if (onend) onend(); return; }
    if (playMp3(text, rate, onend, onprog)) return;      // 高音質 mp3 があればそちらを再生（ended で送り）
    synthSpeak(text, onend, onprog);
  }
  // Web Speech（mp3 が無い/読めない時のフォールバック）
  function synthSpeak(text, onend, onprog) {
    if (!("speechSynthesis" in window)) { if (onend) onend(); return; }
    text = sanitize(text);
    if (!text) { if (onend) onend(); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-TW";
    const v = best();
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = SPD;
    u.pitch = 1.05;
    // 逐字ハイライト：boundary で読み上げ位置（文字インデックス）を通知（対応ブラウザのみ）
    if (onprog) u.onboundary = e => { if (e.charIndex != null) onprog(Math.min(1, e.charIndex / (text.length || 1))); };
    let done = false; const fin = () => { if (done) return; done = true; if (onprog) onprog(1); if (onend) onend(); };
    u.onend = fin; u.onerror = fin;
    speechSynthesis.speak(u);
  }

  // キー指定再生：事前生成 mp3 を key で引いて再生。無ければ fallback テキストを読む
  // （注音のように「符号」をキーに専用音声を持たせ、語彙の同字と音声を分離するため）
  function speakKey(key, fallback, rate) {
    if (playMp3(key, rate)) return;
    speak(fallback != null ? fallback : key, rate);
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
    playToken++;   // 読込中の play() を無効化（押した瞬間に止める）
    if (audioEl) {
      try {
        audioEl.onended = null; audioEl.onerror = null;   // ★ 先に外す（src 除去の onerror→synthSpeak を防ぐ）
        audioEl.pause();
        // iOS では pause() だけだと「今の一文を読み切る」ことがある → 音源を外して load() で完全停止
        audioEl.removeAttribute("src");
        audioEl.load();
        audioEl.dataset.f = "";   // 次回は読み込み直す
      } catch (e) {}
    }
    if ("speechSynthesis" in window) { try { speechSynthesis.cancel(); speechSynthesis.cancel(); } catch (e) {} }
  }

  function setRate(r){ SPD = Math.max(0.5, Math.min(2, +r || 1)); try { localStorage.setItem("stw_tts_rate", SPD); } catch (e) {} if (audioEl) { try { audioEl.playbackRate = SPD; } catch (e) {} } }
  function getRate(){ return SPD; }
  return { speak, speakKey, stop, options, setVoice, currentURI, refresh, setRate, getRate };
})();
// 既存コードとの互換用グローバル
// ★重要：TTS は const 宣言なので window に自動では乗らない。全画面の一時停止は
//   `if (window.TTS && TTS.stop) TTS.stop()` で守られており、window.TTS が undefined だと
//   停止が一度も呼ばれない（＝暫停が効かない）。ここで明示的に公開して全ガードを有効化する。
if (typeof window !== "undefined") { window.TTS = TTS; }
function speakZh(text, rate, onend, onprog) { TTS.speak(text, rate, onend, onprog); }
