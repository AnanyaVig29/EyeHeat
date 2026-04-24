export default function SessionControls({
  status,
  trackingActive,
  calibrated,
  sessionId,
  pointCount,
  onStart,
  onStop,
  onRefreshSessions,
}) {
  return (
    <div className="tracker-panel">
      <div className="tracker-grid">
        <div>
          <h3>Live Eye Tracking Session</h3>
          <p>Status: <strong>{status}</strong></p>
          <p>Calibrated: <strong>{calibrated ? 'Yes' : 'No'}</strong></p>
          <p>Points in memory: <strong>{pointCount}</strong></p>
          <p>Session ID: <strong>{sessionId || 'Not started'}</strong></p>
        </div>
        <div className="tracker-actions">
          <button type="button" onClick={onStart} disabled={trackingActive}>
            Start Tracking
          </button>
          <button type="button" onClick={onStop} disabled={!trackingActive} className="stop-btn">
            Stop Tracking
          </button>
          <button type="button" onClick={onRefreshSessions}>
            Refresh Sessions
          </button>
        </div>
      </div>
    </div>
  );
}
