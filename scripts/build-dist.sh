#!/bin/sh
# 把要上線的檔案複製到 dist/（不含後端 staytw-api、腳本、產生用資料、文件、dotfiles）
# 2026-11-07 資安檢查:原本 pages_build_output_dir="." 把整個 repo 連 worker.js/schema.sql/scripts 都上線了
# 部署：sh scripts/build-dist.sh && npx wrangler pages deploy dist --project-name=staytw --branch=master --commit-dirty=true  (正式站是 master;--branch=main 只會更新預覽 main.staytw.pages.dev)
# （functions/ 由 wrangler 從 repo 根目錄讀,不用進 dist;audio/tts 在 R2）
set -e
cd "$(dirname "$0")/.."
rm -rf dist && mkdir dist
rsync -a --exclude dist --exclude .git --exclude '.*' --exclude scripts --exclude staytw-api \
  --exclude functions --exclude 'audio/tts' --exclude out --exclude review --exclude 'data/tbcl' --exclude 'data/*.bak' \
  --exclude 'images/social/video' --exclude '*.md' --exclude wrangler.toml --exclude firebase.json --exclude firestore.rules \
  --exclude node_modules --exclude pw-raw.png ./ dist/
echo "dist/：$(find dist -type f | wc -l | tr -d ' ') 個檔案，$(du -sh dist | cut -f1)"
