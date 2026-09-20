#!/usr/bin/env python3
"""縦型ショート動画(YouTube Shorts / Reels / TikTok)を1本つくる。全部ローカル・無料。

  python3 scripts/make-short.py --lang ja --level l1 --start 0 --n 5
  python3 scripts/make-short.py --lang ko --level l2 --start 10 --n 6 --ex

音声は app と同じ mp3(教育部辞典に合わせた読み)。出力は out/short/<lang>-<level>-<start>.mp4
"""
import argparse, os, subprocess, sys, tempfile, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import media_common as M
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
BG, TX, AC, TX3 = (250, 248, 243), (28, 28, 30), (184, 54, 42), (150, 146, 138)
F_CJK = "/System/Library/Fonts/Hiragino Sans GB.ttc"     # 漢字・注音
F_UNI = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"   # 日韓英越印の訳文

def fc(sz):
    for i in (2, 1, 0):
        try: return ImageFont.truetype(F_CJK, sz, index=i)
        except Exception: pass
    return ImageFont.truetype(F_CJK, sz)
fu = lambda sz: ImageFont.truetype(F_UNI, sz)

def center(d, y, text, font, fill, bold=False):
    w = d.textlength(text, font=font)
    kw = {"stroke_width": 1, "stroke_fill": fill} if bold else {}
    d.text(((W - w) / 2, y), text, font=font, fill=fill, **kw)

TONES = "\u02CA\u02CB\u02C7\u02D9"
def center_zy(d, y, zy, size, fill):
    """注音。声調記号(ˊ ˇ ˋ ˙)は修飾文字で本体の半分しか無いので 1.4 倍で描く。
       サイト側で同じことをしている(小さいと2声3声4声が見分けられない)。"""
    big, sml = fc(size), fc(int(size * 1.4))
    total = sum(d.textlength(c, font=(sml if c in TONES else big)) for c in zy)
    x = (W - total) / 2
    base = y + size            # ベースラインを揃える
    for c in zy:
        f = sml if c in TONES else big
        d.text((x, base - (int(size * 1.4) if c in TONES else size)), c,
               font=f, fill=fill, stroke_width=1, stroke_fill=fill)
        x += d.textlength(c, font=f)

def wrap_center(d, y, text, font, fill, maxw, lh):
    line, lines = "", []
    for ch in text:
        if d.textlength(line + ch, font=font) > maxw and line:
            lines.append(line); line = ch
        else: line += ch
    if line: lines.append(line)
    for ln in lines[:3]:
        center(d, y, ln, font, fill); y += lh
    return y

def frame_word(v, lang, idx, total, path):
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im)
    center(d, 150, f"{idx} / {total}", fu(34), TX3)
    center(d, 330, v["w"], fc(230 if len(v["w"]) <= 2 else 170), TX, bold=True)
    center_zy(d, 645, v["zy"], 84, AC)
    center(d, 790, v["py"], fu(52), TX3)
    d.line([(160, 900), (W - 160, 900)], fill=(226, 221, 209), width=2)
    wrap_center(d, 960, M.meaning(v, lang), fu(60), TX, W - 200, 82)
    ex = (v.get("ex") or {}).get("z") or ""
    if ex:
        y = wrap_center(d, 1280, ex, fc(56), TX, W - 190, 78)
        wrap_center(d, y + 24, M.ex_meaning(v, lang), fu(38), TX3, W - 200, 54)
    center(d, H - 130, "staytw.pages.dev", fu(36), TX3)
    im.save(path)

def frame_text(big, small, path):
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im)
    center(d, 720, big, fc(96), TX, bold=True)
    center(d, 900, small, fu(46), AC)
    zy = fc(150); x = (W - 4 * 165) / 2
    for i, ch in enumerate("ㄅㄆㄇㄈ"):
        d.text((x, 1150), ch, font=zy, fill=AC if i % 2 == 0 else TX3); x += 165
    center(d, H - 130, "staytw.pages.dev", fu(36), TX3)
    im.save(path)

TITLE = {"ja": ("台湾で使う中国語", "繁体字・注音・台湾の発音"),
         "ko": ("대만에서 쓰는 중국어", "번체자·주음·대만 발음"),
         "en": ("Mandarin as Taiwan speaks it", "Traditional characters · Zhuyin"),
         "vi": ("Tiếng Trung dùng ở Đài Loan", "Phồn thể · Chú âm · giọng Đài"),
         "id": ("Mandarin yang dipakai di Taiwan", "Tradisional · Zhuyin · audio asli")}
ENDING = {"ja": ("もっと覚える", "staytw.pages.dev で無料"),
          "ko": ("더 외우기", "staytw.pages.dev 에서 무료"),
          "en": ("Keep going", "free at staytw.pages.dev"),
          "vi": ("Học tiếp", "miễn phí tại staytw.pages.dev"),
          "id": ("Lanjut belajar", "gratis di staytw.pages.dev")}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="ja", choices=list(TITLE))
    ap.add_argument("--level", default="l1")
    ap.add_argument("--start", type=int, default=0)
    ap.add_argument("--n", type=int, default=5)
    ap.add_argument("--ex", action="store_true", help="例文の音声も流す(1本が長くなる)")
    a = ap.parse_args()

    items = (M.load_vocab().get(a.level) or [])[a.start:a.start + a.n]
    if not items: print("その範囲に単語がありません"); return 1
    tmp = tempfile.mkdtemp(prefix="stwshort-")
    segs = []          # (png, 秒数)
    wavs = []
    def sil(sec):
        p = os.path.join(tmp, f"s{len(wavs)}.wav"); M.silence(sec, p); wavs.append(p); return sec
    def mp3(path):
        p = os.path.join(tmp, f"a{len(wavs)}.wav"); M.to_wav(path, p); wavs.append(p); return M.dur(p)

    big, small = TITLE[a.lang]
    p = os.path.join(tmp, "intro.png"); frame_text(big, small, p)
    segs.append((p, 1.6)); sil(1.6)

    used = 0
    for i, v in enumerate(items, 1):
        wp = M.audio_path(v["w"])
        if not wp: continue
        used += 1
        t = 0.25 + mp3(wp); t += sil(0.55); t += mp3(wp); t += sil(0.9)
        sil(0.25)
        if a.ex:
            ep = M.audio_path((v.get("ex") or {}).get("z") or "")
            if ep: t += mp3(ep) + sil(0.7)
        p = os.path.join(tmp, f"w{i}.png"); frame_word(v, a.lang, i, len(items), p)
        segs.append((p, round(t, 3)))

    big, small = ENDING[a.lang]
    p = os.path.join(tmp, "outro.png"); frame_text(big, small, p)
    segs.append((p, 2.4)); sil(2.4)

    audio = os.path.join(tmp, "audio.wav"); M.concat_wavs(wavs, audio)
    lst = os.path.join(tmp, "frames.txt")
    with open(lst, "w") as f:
        for png, sec in segs:
            f.write(f"file '{png}'\nduration {sec}\n")
        f.write(f"file '{segs[-1][0]}'\n")        # concat demuxer は最後の1枚を二度書く必要がある
    outdir = os.path.join(M.ROOT, "out", "short"); os.makedirs(outdir, exist_ok=True)
    out = os.path.join(outdir, f"{a.lang}-{a.level}-{a.start:03d}.mp4")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-i", audio,
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "30",
                    "-vf", "scale=1080:1920", "-c:a", "aac", "-b:a", "128k",
                    "-shortest", out], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    shutil.rmtree(tmp, ignore_errors=True)
    print(f"→ {out}  {M.dur(out):.1f} 秒  {used} 語")
    return 0

if __name__ == "__main__":
    sys.exit(main())
