import { useMemo, useState } from 'react';

const POINTS = [
  { id: 0, x: '10%', y: '10%' },
  { id: 1, x: '50%', y: '10%' },
  { id: 2, x: '90%', y: '10%' },
  { id: 3, x: '10%', y: '50%' },
  { id: 4, x: '50%', y: '50%' },
  { id: 5, x: '90%', y: '50%' },
  { id: 6, x: '10%', y: '90%' },
  { id: 7, x: '50%', y: '90%' },
  { id: 8, x: '90%', y: '90%' },
];

const CLICKS_NEEDED = 5;

export default function CalibrationOverlay({ onComplete }) {
  const [counts, setCounts] = useState({});

  const completed = useMemo(
    () => POINTS.every((p) => (counts[p.id] || 0) >= CLICKS_NEEDED),
    [counts]
  );

  const handleClick = (id, event) => {
    if (window.webgazer?.recordScreenPosition) {
      window.webgazer.recordScreenPosition(event.clientX, event.clientY, 'click');
    }

    setCounts((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      const done = POINTS.every((p) => (next[p.id] || 0) >= CLICKS_NEEDED);
      if (done) {
        onComplete?.();
      }
      return next;
    });
  };

  return (
    <div className="calibration-overlay">
      {POINTS.map((p) => {
        const currentCount = counts[p.id] || 0;
        const done = currentCount >= CLICKS_NEEDED;

        return (
          <button
            key={p.id}
            onClick={(e) => handleClick(p.id, e)}
            className={`calibration-dot ${done ? 'done' : ''}`}
            style={{ left: p.x, top: p.y }}
            type="button"
            aria-label={`Calibration point ${p.id + 1}`}
          >
            <span>{Math.min(currentCount, CLICKS_NEEDED)}/{CLICKS_NEEDED}</span>
          </button>
        );
      })}

      <div className="calibration-message">
        <p>Click each point {CLICKS_NEEDED} times to finish calibration.</p>
        <p>{completed ? 'Calibration complete.' : 'Keep your head still and click all points.'}</p>
      </div>
    </div>
  );
}
