#!/usr/bin/env python3
"""聞いて覚える単語 Podcast を1本つくる(全部ローカル・無料)。

  python3 scripts/make-podcast.py --lang ja --level l1 --start 0 --n 20
  python3 scripts/make-podcast.py --lang ko --level l1 --start 20 --n 20 --title "第2回"

構成(1語ぶん): 意味のナレーション → 台湾の発音 ×2 → 復唱の間 → 例文 → 間
音声は app と同じ mp3 を使うので、読みは教育部辞典に合わせたものがそのまま流れる。
出力: out/podcast/<lang>-<level>-<n>.mp3 と、同名の .txt(番組説明)
"""
import argparse, os, sys, tempfile, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import media_common as M

INTRO = {
 "ja": "台湾華語スタディ、聞いて覚える単語です。{t}。日本語の意味のあとに、台湾の発音が2回流れます。聞こえたとおりに、声に出してみてください。",
 "ko": "StayTW 대만 중국어, 듣고 외우는 단어입니다. {t}. 한국어 뜻 다음에 대만 발음이 두 번 나옵니다. 들리는 대로 따라 말해 보세요.",
 "en": "StayTW Taiwanese Mandarin, listen and learn. {t}. After the English meaning you'll hear the Taiwanese pronunciation twice. Say it out loud.",
}
OUTRO = {
 "ja": "今日はここまでです。全部の単語と音声は、ステイティーダブリュー、staytw.pages.dev で無料で使えます。お疲れさまでした。",
 "ko": "오늘은 여기까지입니다. 모든 단어와 음성은 staytw.pages.dev 에서 무료로 쓰실 수 있습니다. 수고하셨습니다.",
 "en": "That's it for today. All the words and audio are free at staytw.pages.dev. Nice work.",
}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="ja", choices=["ja", "ko", "en"])
    ap.add_argument("--level", default="l1")
    ap.add_argument("--start", type=int, default=0)
    ap.add_argument("--n", type=int, default=20)
    ap.add_argument("--title", default="")
    ap.add_argument("--no-ex", action="store_true", help="例文を入れない(短くしたいとき)")
    a = ap.parse_args()

    vocab = M.load_vocab().get(a.level) or []
    items = vocab[a.start:a.start + a.n]
    if not items:
        print("その範囲に単語がありません"); return 1
    title = a.title or f"{a.level.upper()} #{a.start // max(1, a.n) + 1}"

    outdir = os.path.join(M.ROOT, "out", "podcast"); os.makedirs(outdir, exist_ok=True)
    tmp = tempfile.mkdtemp(prefix="stwpod-")
    parts, used = [], []
    def add_sil(sec):
        p = os.path.join(tmp, f"s{len(parts)}.wav"); M.silence(sec, p); parts.append(p)
    def add_say(text):
        p = os.path.join(tmp, f"n{len(parts)}.wav")
        if M.narrate(text, a.lang, p): parts.append(p)
    def add_mp3(mp3):
        p = os.path.join(tmp, f"a{len(parts)}.wav"); M.to_wav(mp3, p); parts.append(p)

    add_say(INTRO[a.lang].format(t=title)); add_sil(0.8)
    for i, v in enumerate(items, 1):
        wav = M.audio_path(v["w"])
        if not wav: continue
        add_say(M.meaning(v, a.lang)); add_sil(0.35)
        add_mp3(wav); add_sil(0.55); add_mp3(wav)
        add_sil(1.3)                                  # 復唱の間
        ex = (v.get("ex") or {}).get("z")
        if ex and not a.no_ex:
            exp = M.audio_path(ex)
            if exp: add_mp3(exp); add_sil(1.0)
        used.append(v)
    add_sil(0.6); add_say(OUTRO[a.lang])

    out_mp3 = os.path.join(outdir, f"{a.lang}-{a.level}-{a.start:03d}.mp3")
    M.concat_wavs(parts, out_mp3)
    shutil.rmtree(tmp, ignore_errors=True)

    # 番組説明(そのまま貼れる形)
    lines = [f"StayTW — {title}", ""]
    lines += [f"{i}. {v['w']}（{v['zy']}）{M.meaning(v, a.lang)}" for i, v in enumerate(used, 1)]
    lines += ["", {"ja": "全部の単語と音声: https://staytw.pages.dev",
                   "ko": "모든 단어와 음성: https://staytw.pages.dev",
                   "en": "All words and audio: https://staytw.pages.dev"}[a.lang]]
    open(out_mp3[:-4] + ".txt", "w", encoding="utf-8").write("\n".join(lines))
    print(f"→ {out_mp3}  {M.dur(out_mp3)/60:.1f} 分  {len(used)} 語")
    print(f"→ {out_mp3[:-4]}.txt  (番組説明)")
    return 0

if __name__ == "__main__":
    sys.exit(main())
