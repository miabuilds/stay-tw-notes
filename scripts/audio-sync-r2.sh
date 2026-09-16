#!/usr/bin/env bash
# 音檔同步到 R2（bucket: staytw-audio）。
#   scripts/audio-sync-r2.sh            → 只上傳本機有、R2 沒有的檔（rclone 有裝就用 rclone，沒有就 wrangler 逐檔）
#   scripts/audio-sync-r2.sh <file...>  → 只上傳指定檔（生成腳本呼叫用）
# 音檔目錄預設 audio/tts；搬出 repo 後用 STW_AUDIO_DIR 指過去。
set -euo pipefail
BUCKET="${STW_R2_BUCKET:-staytw-audio}"
DIR="${STW_AUDIO_DIR:-$(cd "$(dirname "$0")/.." && pwd)/audio/tts}"

if [ $# -gt 0 ]; then
  for f in "$@"; do
    [ -f "$f" ] || { echo "skip (missing): $f"; continue; }
    npx wrangler r2 object put "$BUCKET/$(basename "$f")" --file "$f" --content-type audio/mpeg --cache-control "public, max-age=31536000, immutable" >/dev/null && echo "up: $(basename "$f")"
  done
  exit 0
fi

if command -v rclone >/dev/null 2>&1 && rclone listremotes 2>/dev/null | grep -q '^r2:'; then
  # rclone remote 名 r2（S3 相容 API，token 在 Cloudflare 後台 R2 → Manage R2 API Tokens 建）
  rclone copy "$DIR" "r2:$BUCKET" --ignore-existing --transfers 16 --checkers 32 \
    --header-upload "Cache-Control: public, max-age=31536000, immutable" --progress
else
  echo "rclone 未設定 → 用 wrangler 逐檔上傳（慢，約 0.5 秒/檔）"
  existing="$(npx wrangler r2 object list "$BUCKET" 2>/dev/null | grep -oE '[a-f0-9]{12}[a-z0-9]*\.mp3' | sort -u || true)"
  n=0
  for f in "$DIR"/*.mp3; do
    b="$(basename "$f")"
    if grep -qx "$b" <<<"$existing"; then continue; fi
    npx wrangler r2 object put "$BUCKET/$b" --file "$f" --content-type audio/mpeg --cache-control "public, max-age=31536000, immutable" >/dev/null && n=$((n+1))
    [ $((n % 100)) -eq 0 ] && echo "  uploaded $n"
  done
  echo "done: uploaded $n"
fi
