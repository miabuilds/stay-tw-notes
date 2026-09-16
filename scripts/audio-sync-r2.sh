#!/usr/bin/env bash
# 音檔同步到 R2（bucket: staytw-audio）。
#   scripts/audio-sync-r2.sh            → 全部上傳（rclone 有設定就差分同步，沒有就 wrangler 全件 put，冪等）
#   scripts/audio-sync-r2.sh <file...>  → 只上傳指定檔（生成腳本呼叫用）
# 音檔目錄預設 audio/tts；搬出 repo 後用 STW_AUDIO_DIR 指過去。
set -euo pipefail
BUCKET="${STW_R2_BUCKET:-staytw-audio}"
DIR="${STW_AUDIO_DIR:-$(cd "$(dirname "$0")/.." && pwd)/audio/tts}"
CC="public, max-age=31536000, immutable"

put_one() {  # $1 = path
  npx wrangler r2 object put --remote "$BUCKET/$(basename "$1")" --file "$1" --content-type audio/mpeg --cache-control "$CC" >/dev/null 2>&1 || echo "FAIL $1"
}
export -f put_one; export BUCKET CC

if [ $# -gt 0 ]; then
  for f in "$@"; do
    [ -f "$f" ] || { echo "skip (missing): $f"; continue; }
    put_one "$f" && echo "up: $(basename "$f")"
  done
  exit 0
fi

if command -v rclone >/dev/null 2>&1 && rclone listremotes 2>/dev/null | grep -q '^r2:'; then
  # rclone remote 名 r2（S3 相容 API，token 在 Cloudflare 後台 R2 → Manage R2 API Tokens 建）
  rclone copy "$DIR" "r2:$BUCKET" --ignore-existing --transfers 16 --checkers 32 \
    --header-upload "Cache-Control: $CC" --progress
else
  # wrangler には object list が無いので差分判定はできない → 全件 put（同名上書き・冪等）。8 並列。
  # ※ macOS xargs の -I は 255 bytes 制限があるので -n 1 で引数渡し。
  echo "rclone 未設定 → wrangler で全件 put（8 並列、冪等）: $(ls "$DIR"/*.mp3 | wc -l | tr -d ' ') 檔"
  ls "$DIR"/*.mp3 | xargs -P 8 -n 1 bash -c 'put_one "$0"'
  echo "done"
fi
