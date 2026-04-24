CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  page_url TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  ended_at INTEGER,
  point_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gaze_points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  x REAL NOT NULL,
  y REAL NOT NULL,
  ts INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gaze_session ON gaze_points(session_id);
CREATE INDEX IF NOT EXISTS idx_gaze_ts ON gaze_points(ts);
