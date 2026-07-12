-- ClutchFuel leads & Clutch Score responses (Cloudflare D1)
-- Apply: wrangler d1 migrations apply LEADS_DB --local
--        wrangler d1 migrations apply LEADS_DB --remote

CREATE TABLE IF NOT EXISTS clutch_score_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  email TEXT NOT NULL,
  answers_json TEXT NOT NULL,
  score INTEGER NOT NULL,
  opportunity TEXT NOT NULL,
  goal TEXT NOT NULL,
  first_clutch_move TEXT NOT NULL,
  marketing_consent INTEGER NOT NULL DEFAULT 0,
  source TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_clutch_score_email ON clutch_score_responses(email);
CREATE INDEX IF NOT EXISTS idx_clutch_score_created ON clutch_score_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_clutch_score_opportunity ON clutch_score_responses(opportunity);

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  type TEXT NOT NULL,
  email TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  marketing_consent INTEGER NOT NULL DEFAULT 0,
  source TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);

CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  accuracy TEXT NOT NULL,
  resonated TEXT,
  missing TEXT,
  recommend TEXT,
  score INTEGER,
  opportunity TEXT,
  first_move TEXT,
  answers_json TEXT
);
