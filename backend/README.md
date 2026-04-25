EyeHeat Backend

Node.js + Express + SQLite backend for gaze session storage and replay.

Setup
1. cd backend
2. npm install
3. Copy .env.example to .env (optional)
4. npm run dev

Environment
- PORT: API port (default: 3001)
- CLIENT_ORIGIN: CORS origin (default: http://localhost:5173)
- LOGIN_EMAIL: login email for /api/auth/login (default: demo@eyeheat.com)
- LOGIN_PASSWORD: login password for /api/auth/login (default: demo123)

API Endpoints
- GET /health
- POST /api/gaze/start
  Body: { "pageUrl": "https://example.com" }
  Response: { "sessionId": "uuid" }
- POST /api/gaze/batch
  Body: { "sessionId": "uuid", "points": [{ "x": 120, "y": 300, "ts": 1710000000000 }] }
  Response: { "saved": 1 }
- POST /api/gaze/end
  Body: { "sessionId": "uuid" }
  Response: { "ok": true }
- GET /api/sessions
  Response: [{ id, pageUrl, createdAt, endedAt, pointCount, durationMs }]
- GET /api/sessions/:id
  Response: { session, points }
- GET /api/sessions/:id/csv
  Response: CSV file download (x,y,ts)
- POST /api/auth/login
  Body: { "email": "demo@eyeheat.com", "password": "demo123" }
  Response: { "token": "...", "message": "Success" }
- GET /api/stats/live
  Response: live dashboard metrics, heatmap points, alerts, recommendations, and A/B summary

Notes
- SQLite DB file is created at backend/eyeheat.db automatically.
- Schema is managed by src/db/schema.sql at startup.
