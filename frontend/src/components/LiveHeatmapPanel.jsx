import { useEffect, useRef } from 'react';

function normalizePoints(points, width, height) {
  if (!points.length) return [];

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const xRange = Math.max(1, maxX - minX);
  const yRange = Math.max(1, maxY - minY);

  return points.map((p) => ({
    x: Math.round(((p.x - minX) / xRange) * Math.max(1, width - 12) + 6),
    y: Math.round(((p.y - minY) / yRange) * Math.max(1, height - 12) + 6),
    value: 1,
  }));
}

// Generate color palette (returns Uint8ClampedArray of 256 colors * 4 bytes)
function createPalette() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 1;

  const gradient = ctx.createLinearGradient(0, 0, 256, 0);
  gradient.addColorStop(0.2, '#3b82f6');
  gradient.addColorStop(0.45, '#22c55e');
  gradient.addColorStop(0.7, '#f59e0b');
  gradient.addColorStop(1.0, '#ef4444');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 1);
  return ctx.getImageData(0, 0, 256, 1).data;
}

const palette = createPalette();

export default function LiveHeatmapPanel({ points = [], height = 280 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const { clientWidth, clientHeight } = containerRef.current;

    canvas.width = clientWidth;
    canvas.height = clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!points.length) return;

    const dataPoints = normalizePoints(points, clientWidth, clientHeight);

    // 1. Draw points using shadow blur to create the alpha map
    const radius = 32;
    dataPoints.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fill();
    });

    // 2. Colorize the alpha map using our palette
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        // Multiply alpha by some factor to increase intensity (e.g. maxing out at 255)
        const intensity = Math.min(255, alpha * 4);
        const offset = intensity * 4;

        data[i] = palette[offset];         // R
        data[i + 1] = palette[offset + 1]; // G
        data[i + 2] = palette[offset + 2]; // B
        data[i + 3] = Math.min(255, alpha * 2); // A
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [points, height]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: 14,
        border: '1px solid #e2e8f0',
        background:
          'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(244,114,182,0.08), transparent 40%), #f8fafc',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.85
        }}
      />
      {!points.length ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            color: '#64748b',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          No live gaze points yet. Start tracking to populate heatmap.
        </div>
      ) : null}
    </div>
  );
}
