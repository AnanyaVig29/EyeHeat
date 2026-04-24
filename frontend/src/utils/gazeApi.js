const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function startSession(pageUrl) {
  const res = await fetch(`${BASE}/gaze/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pageUrl }),
  });

  if (!res.ok) {
    throw new Error('Failed to start session');
  }

  return res.json();
}

export async function postBatch(sessionId, points) {
  if (!points.length) return;

  const res = await fetch(`${BASE}/gaze/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, points }),
  });

  if (!res.ok) {
    throw new Error('Failed to save gaze batch');
  }

  return res.json();
}

export async function endSession(sessionId) {
  const res = await fetch(`${BASE}/gaze/end`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });

  if (!res.ok) {
    throw new Error('Failed to end session');
  }

  return res.json();
}

export async function getSessions() {
  const res = await fetch(`${BASE}/sessions`);
  if (!res.ok) {
    throw new Error('Failed to fetch sessions');
  }

  return res.json();
}

export function startBatchInterval(sessionId, getPoints, clearBuffer, onSaved) {
  return setInterval(async () => {
    const points = getPoints();
    if (!points.length) return;

    const result = await postBatch(sessionId, points);
    clearBuffer();
    onSaved?.(result?.saved || points.length);
  }, 5000);
}
