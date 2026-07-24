# stay-tw-notes

台湾華語スタディ **StayTW Study** — 日本語・英語・韓国語話者向けの台湾繁體中文学習サイト。
[stay-jp-notes](../stay-jp-notes)（StayJP Study）の反向版：同じ「和紙＋朱印」デザインシステムで、内容を「中国語を学ぶ」方向に反転。吉祥物は珍奶を持った台湾黒熊（珍奶黑熊）。

## 構成

| ファイル | 役割 |
|---|---|
| `home.html` | Landing page（StayJP と同じ版面＋黒熊マスコット） |
| `index.html` | 学習ツール：単語カード / 単語リスト / 文法 / フレーズ / クイズ（4択・入力）/ スピーキング / SRS復習 / 模試（聴解つき）|
| `vocab-l1..l5.js` | TOCFL Level 1〜5 単語 計 1,037 語（L1:317 / L2:260 / L3:200 / L4:130 / L5:130）（繁體字＋注音＋拼音＋日英韓訳＋例文） |
| `grammar-l1..l5.js` | 文法 計 84 点（日英韓解説＋例文） |
| `phrases-l1.js` | 場面別フレーズ 66 句（旅行/台湾暮らしフィルタつき）（夜市・ドリンク・MRT・買い物…） |
| `srs.js` | 三段階評価（覚えた/あいまい/わからない → 1週間/1時間/10分後）の間隔復習。StayJP の srs.js と同設計 |
| `mock-exam.js` | ミニ模試：聴解4＋詞彙8＋語法6＋閱讀2、制限時間つき。間違いは SRS へ自動登録 |
| `tts.js` | 事前生成 mp3（audio/tts/ 2,297 ファイル・edge-tts 製）を最優先で再生、なければ Web Speech API。zh-TW ボイスを品質スコアで自動選択（Chrome の Google 國語（臺灣）優先）＋手動選択メニュー |
| `sync.js` / `firebase-config.js` | Google ログイン＋Firestore 同期（SRS・模試履歴を端末間マージ）。config 未設定時は localStorage のみで動作 |
| `i18n.js` | UI 多言語（ja / en / ko） |
| `images/bear.svg` / `favicon.svg` | 珍奶黑熊マスコット & favicon |

## 特徴

- レベルは JLPT N5–N1 のミラーとして **TOCFL Level 1–5**（全レベル利用可）
- 発音は **注音（ㄅㄆㄇㄈ）と拼音を併記**、台湾読み（和 = hàn、垃圾 = lèsè、休息 = xiūxí など）
- カード・例文・フレーズ・文法例文はどれも**枠内タップで即発音**（原サイトと同じ挙動）
- 学習履歴：SRS の進捗と模試スコアを保存。ログインすれば**アカウント単位で複数端末に同期**
  （単語ごとに lastReviewTs の新しい方を採用してマージ → 端末A/Bどちらの学習も消えない）
- ダークモード対応、静的サイト（Firebase Hosting にそのまま置ける）

## デプロイ手順（Firebase Hosting）

```bash
# 1. Firebase Console で新規プロジェクト作成（例: staytw-study）
#    https://console.firebase.google.com
# 2. Authentication → Google ログイン有効化
# 3. Firestore Database 作成
# 4. ウェブアプリを追加 → firebase-config.js の設定値を貼り替え
# 5. .firebaserc の "staytw-study" を実際のプロジェクトIDに変更
firebase deploy          # hosting + firestore.rules 一括デプロイ
```

`firebase-config.js` 未設定のままでも全機能ローカル保存で動く（ログインボタンが出ないだけ）。

## ローカル確認

```bash
python3 -m http.server 8080
# http://localhost:8080/home.html
```

## 今後（アイデア）

- 語彙・文法の増量（StayJP 並みの 7,000 語級へ）
- 台湾語（台語）ミニコーナー、繁簡対照
