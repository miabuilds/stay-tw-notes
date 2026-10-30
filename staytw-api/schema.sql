-- StayTW 後台資料庫
CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  type TEXT NOT NULL DEFAULT 'other',   -- bug / content / feature / other
  message TEXT NOT NULL,
  email TEXT DEFAULT '',
  lang TEXT DEFAULT '',
  ua TEXT DEFAULT '',
  -- new / replied / done(回信不要だが対応済み) / wontfix / spam
  -- replied_at は「いつ返したか」だけを持つ。捌いたかどうかは status を見る。
  status TEXT NOT NULL DEFAULT 'new'
);
CREATE TABLE IF NOT EXISTS rc_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  event_id TEXT UNIQUE,                 -- RevenueCat event id（防重放）
  event_type TEXT,                      -- INITIAL_PURCHASE / RENEWAL / CANCELLATION / ...
  product_id TEXT,
  price REAL,                           -- 美金計價（RC price 欄位）
  price_in_purchased_currency REAL,
  currency TEXT,
  country TEXT,
  environment TEXT,                     -- PRODUCTION / SANDBOX
  app_user_id TEXT,
  raw TEXT
);
CREATE INDEX IF NOT EXISTS idx_rc_ts ON rc_events(ts);
CREATE INDEX IF NOT EXISTS idx_fb_ts ON feedback(ts);
-- メール購読リスト（iOS 上架・更新通知用。ログイン不要で集める）
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  email TEXT UNIQUE NOT NULL,
  lang TEXT DEFAULT '',
  source TEXT DEFAULT ''
);
-- ログインユーザー（Google/Apple。web-login が INSERT）
CREATE TABLE IF NOT EXISTS auth_users (
  uid TEXT PRIMARY KEY,
  provider TEXT,
  sub TEXT,
  email TEXT DEFAULT '',
  created_at INTEGER,
  updated_at INTEGER
);

-- KOL 推廣碼(2026-10-30):碼本身的正本在 StayHQ partners 表,這裡只記點擊、帳號綁定、已回報的分潤
CREATE TABLE IF NOT EXISTS ref_clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT,
  ip_hash TEXT,
  app INTEGER DEFAULT 0,               -- 1 = App 首次開啟對回來的
  at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_ref_clicks_ip ON ref_clicks(ip_hash, at);
CREATE INDEX IF NOT EXISTS idx_ref_clicks_code ON ref_clicks(code);
-- 登入帳號 ↔ 推廣碼(first touch,不覆蓋)
CREATE TABLE IF NOT EXISTS ref_attrib (
  uid TEXT PRIMARY KEY,
  code TEXT,
  at INTEGER
);
-- 已回報給 StayHQ 的分潤(一買家只算首筆真實付款;退款時用這筆金額回沖)
CREATE TABLE IF NOT EXISTS kol_sales (
  id TEXT PRIMARY KEY,                 -- code_buyer
  code TEXT,
  buyer TEXT,
  product TEXT,
  store TEXT,
  gross_twd REAL,
  net_twd REAL,
  ext_id TEXT,                         -- RC transaction id(HQ 防重)
  state TEXT DEFAULT 'paid',           -- paid / refund
  at INTEGER,
  refunded_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_kol_sales_buyer ON kol_sales(buyer);
