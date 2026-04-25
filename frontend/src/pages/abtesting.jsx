import React from "react";
import "../styles/abtesting.css";
import LiveHeatmapPanel from "../components/LiveHeatmapPanel";
import { useLiveAnalytics } from "../hooks/useLiveAnalytics";
import { formatDuration, formatNumber } from "../utils/liveFormat";

function ABTesting() {
  const { data, loading, error } = useLiveAnalytics();

  const points = data?.heatmap?.points || [];
  const splitIndex = Math.floor(points.length / 2);
  const pointsA = points.slice(0, splitIndex);
  const pointsB = points.slice(splitIndex);

  const variantA = data?.ab?.variantA || { sessions: 0, avgPoints: 0, avgDurationMs: 0 };
  const variantB = data?.ab?.variantB || { sessions: 0, avgPoints: 0, avgDurationMs: 0 };

  const winner = variantB.avgPoints >= variantA.avgPoints ? "B" : "A";

  return (
    <div className="abtesting-container">
      <div className="abtesting-header">
        <div>
          <h1 className="page-title abtesting-title">A/B Testing (Live Gaze)</h1>
          <p className="page-subtitle abtesting-subtitle">Variant performance computed from live backend sessions.</p>
          {loading ? <p className="page-subtitle">Loading variant stats...</p> : null}
          {error ? <p className="page-subtitle" style={{ color: "#dc2626" }}>{error}</p> : null}
        </div>
      </div>

      <div className="winner-banner">
        <div className="winner-info">
          <h3 className="winner-title">Winner: Version {winner}</h3>
          <p className="winner-desc">
            Winner is selected using higher average points per session from live tracked data.
          </p>
        </div>
      </div>

      <div className="ab-comparison-grid">
        <div className="version-card">
          <div className="version-header">
            <div className="version-title">Version A</div>
            <span className="version-badge">Baseline</span>
          </div>

          <div className="heatmap-visual">
            <LiveHeatmapPanel points={pointsA} height={240} />
          </div>

          <div className="version-metrics">
            <div className="metric-box">
              <span className="metric-name">Sessions</span>
              <span className="metric-value">{formatNumber(variantA.sessions)}</span>
            </div>
            <div className="metric-box">
              <span className="metric-name">Avg Points</span>
              <span className="metric-value">{formatNumber(variantA.avgPoints)}</span>
            </div>
            <div className="metric-box">
              <span className="metric-name">Avg Duration</span>
              <span className="metric-value">{formatDuration(variantA.avgDurationMs)}</span>
            </div>
          </div>
        </div>

        <div className="version-card">
          <div className="version-header winner">
            <div className="version-title">Version B</div>
            <span className="version-badge success">{winner === "B" ? "Winner" : "Live"}</span>
          </div>

          <div className="heatmap-visual">
            <LiveHeatmapPanel points={pointsB} height={240} />
          </div>

          <div className="version-metrics">
            <div className="metric-box highlight">
              <span className="metric-name">Sessions</span>
              <span className="metric-value">{formatNumber(variantB.sessions)}</span>
            </div>
            <div className="metric-box highlight">
              <span className="metric-name">Avg Points</span>
              <span className="metric-value">{formatNumber(variantB.avgPoints)}</span>
            </div>
            <div className="metric-box highlight">
              <span className="metric-name">Avg Duration</span>
              <span className="metric-value">{formatDuration(variantB.avgDurationMs)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ABTesting;
