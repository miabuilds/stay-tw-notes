-- StayTW 後台資料庫
CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  type TEXT NOT NULL DEFAULT 'other',   -- bug / content / feature / other
  message TEXT NOT NULL,
  email TEXT DEFAULT '',
  lang TEXT DEFAULT '',
  ua TEXT DEFAULT ''
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
