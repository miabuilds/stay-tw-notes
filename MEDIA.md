# 影片與 Podcast 的產法

全部在本機跑，**零 API 費用**。聲音用的是網站同一批 mp3（讀音都對照過教育部辭典），
旁白用 macOS 內建的日文 / 韓文語音。

## 短影片（YouTube Shorts / Reels / TikTok）

```
cd ~/Documents/GitHub/stay-tw-notes
python3 scripts/make-short.py --lang ja --level l1 --start 0 --n 5
```

出來的檔案在 `out/short/ja-l1-000.mp4`，1080×1920、約 22 秒。

| 參數 | 說明 |
|---|---|
| `--lang` | `ja` `ko` `en` `vi` `id` |
| `--level` | `l1`～`l6` |
| `--start` | 從第幾個字開始（換一批就往後加） |
| `--n` | 幾個字。5 個約 22 秒，8 個約 35 秒 |
| `--ex` | 連例句的語音也放（片長大約翻倍） |

**連做一週的量**（每支 5 個字，不重複）：
```
for s in 0 5 10 15 20 25 30; do python3 scripts/make-short.py --lang ja --level l1 --start $s --n 5; done
```

## Podcast

```
python3 scripts/make-podcast.py --lang ja --level l1 --start 0 --n 20 --title "第1回"
```

出來 `out/podcast/ja-l1-000.mp3`（約 5～6 分）跟同名的 `.txt`（節目說明，可直接貼）。

一集的結構：意思旁白 →台灣發音 ×2 → 跟讀的空檔 → 例句 → 空檔。
`--no-ex` 可以拿掉例句，片長會短一半。

## 上傳

- **短影片**：同一支 mp4 可以直接上 YouTube Shorts、Instagram Reels、TikTok。標題用該語言，說明欄放 `https://staytw.pages.dev`
- **Podcast**：Spotify for Podcasters（免費，會自動轉送到 Apple Podcasts 等）。`.txt` 的內容貼進節目說明

## 備註

- 音檔路徑預設 `../stay-tw-audio/tts`，可用 `STW_AUDIO_DIR` 覆寫
- `out/` 已加進 .gitignore，產物不會進版控
- 字型：漢字與注音用 Hiragino Sans GB，各語言譯文用 Arial Unicode
  （實測只有它同時涵蓋越南文、韓文與注音）
