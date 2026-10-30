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
