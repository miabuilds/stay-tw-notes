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

-- ───── 網頁金流（綠界 ECPay）─────
-- 會員狀態：一個 Firebase uid 一列，是否 premium 由 status + expires_at 判定
CREATE TABLE IF NOT EXISTS entitlements (
  uid         TEXT PRIMARY KEY,         -- Firebase Auth uid
  email_hash  TEXT DEFAULT '',
  plan        TEXT,                     -- monthly / yearly / lifetime
  status      TEXT DEFAULT 'active',    -- active / cancelled / expired
  expires_at  INTEGER,                  -- epoch ms（lifetime = now + 100 年）
  will_renew  INTEGER DEFAULT 0,        -- 1 = 信用卡定期定額續扣中
  pay_type    TEXT,                     -- credit / atm / cvs
  ecpay_order TEXT,                     -- 首次 MerchantTradeNo（取消定期定額用）
  source      TEXT DEFAULT 'web',       -- web / app
  started_at  INTEGER,
  updated_at  INTEGER
);

-- 交易帳本（含 pending / success / failed）
CREATE TABLE IF NOT EXISTS pay_txns (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  ts          TEXT NOT NULL DEFAULT (datetime('now')),
  uid         TEXT,
  type        TEXT,                     -- subscribe / renew / fail
  plan        TEXT,
  amount_twd  REAL,
  method      TEXT DEFAULT 'ecpay',     -- ecpay / paypal
  pay_type    TEXT,
  external_id TEXT,                     -- TradeNo 或 MerchantTradeNo
  status      TEXT,                     -- pending / success / failed
  note        TEXT,
  email_hash  TEXT DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_txn_uid ON pay_txns(uid);
CREATE INDEX IF NOT EXISTS idx_txn_ext ON pay_txns(external_id);

-- 錢已收但開通失敗的告警（人工對帳用，絕不動 entitlements）
CREATE TABLE IF NOT EXISTS pay_failures (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  ts                TEXT NOT NULL DEFAULT (datetime('now')),
  uid               TEXT,
  plan              TEXT,
  merchant_trade_no TEXT,
  trade_no          TEXT,
  amount_twd        REAL,
  reason            TEXT,
  error             TEXT
);
