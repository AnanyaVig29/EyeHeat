const db = require('../db/database');

function listSessions(_req, res) {
  const rows = db
    .prepare(
      `SELECT
         id,
         page_url AS pageUrl,
         created_at AS createdAt,
         ended_at AS endedAt,
         point_count AS pointCount
       FROM sessions
       ORDER BY created_at DESC`
    )
    .all();

  const sessions = rows.map((row) => {
    const durationMs = row.endedAt ? Math.max(0, row.endedAt - row.createdAt) : null;
    return {
      ...row,
      durationMs,
    };
  });

  return res.json(sessions);
}

function getSessionPoints(req, res) {
  const { id } = req.params;

  const session = db
    .prepare(
      `SELECT
         id,
         page_url AS pageUrl,
         created_at AS createdAt,
         ended_at AS endedAt,
         point_count AS pointCount
       FROM sessions
       WHERE id = ?`
    )
    .get(id);

  if (!session) {
    return res.status(404).json({ error: 'session not found' });
  }

  const points = db
    .prepare(
      `SELECT
         x,
         y,
         ts
       FROM gaze_points
       WHERE session_id = ?
       ORDER BY ts ASC`
    )
    .all(id);

  return res.json({
    session,
    points,
  });
}

function exportSessionCsv(req, res) {
  const { id } = req.params;

  const session = db
    .prepare('SELECT id FROM sessions WHERE id = ?')
    .get(id);

  if (!session) {
    return res.status(404).json({ error: 'session not found' });
  }

  const points = db
    .prepare(
      `SELECT
         x,
         y,
         ts
       FROM gaze_points
       WHERE session_id = ?
       ORDER BY ts ASC`
    )
    .all(id);

  const csvRows = ['x,y,ts'];
  for (const p of points) {
    csvRows.push(`${p.x},${p.y},${p.ts}`);
  }

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="session-${id}.csv"`);

  return res.send(csvRows.join('\n'));
}

module.exports = {
  listSessions,
  getSessionPoints,
  exportSessionCsv,
};
