import React from "react";
import "../styles/EyeMovementPatterns.css";
import GazeTracker from "../components/GazeTracker";
import { useLiveAnalytics } from "../hooks/useLiveAnalytics";
import { formatPercent } from "../utils/liveFormat";

const DonutChart = ({ percent, label, color = "#b46445" }) => {
  const size = 110;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="donut-wrapper">
      <svg width={size} height={size} className="donut-svg">
        <circle cx={size / 2} cy={size / 2} r={radius} className="donut-track" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="donut-fill"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="donut-content">
        <span className="donut-percent">{Math.round(percent)}%</span>
        <span className="donut-label">{label}</span>
      </div>
    </div>
  );
};

export default function EyeMovementPatterns() {
  const { data, loading, error } = useLiveAnalytics();
  const patterns = data?.patterns || { f: 0, z: 0, layerCake: 0, spotted: 0 };
  const totals = data?.totals || {};

  const cards = [
    { id: "f", title: "F Pattern", desc: "Users focus top and left-heavy zones.", usage: patterns.f },
    { id: "z", title: "Z Pattern", desc: "Users scan diagonally through major landmarks.", usage: patterns.z },
    { id: "cake", title: "Layer Cake", desc: "Users scan horizontal content bands.", usage: patterns.layerCake },
    { id: "spot", title: "Spotted", desc: "Users jump between disconnected points.", usage: patterns.spotted },
  ];

  return (
    <div className="emp-page">
      <div className="emp-header">
        <div>
          <h1 className="page-title emp-title">Eye Movement Patterns</h1>
          <p className="page-subtitle emp-subtitle">Pattern analytics generated from live gaze points.</p>
          {loading ? <p className="page-subtitle">Computing live movement patterns...</p> : null}
          {error ? <p className="page-subtitle" style={{ color: "#dc2626" }}>{error}</p> : null}
        </div>
      </div>

      <GazeTracker />

      <div className="emp-patterns-grid">
        {cards.map((p) => (
          <div className="emp-pattern-card" key={p.id}>
            <h3>{p.title}</h3>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "0" }}>{p.desc}</p>
            <div style={{ width: "100%", marginTop: "auto" }}>
              <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" }}>
                <div style={{ width: `${p.usage}%`, height: "100%", background: "#b46445" }}></div>
              </div>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600" }}>{formatPercent(p.usage)} prevalence</span>
            </div>
          </div>
        ))}
      </div>

      <div className="emp-stats-section">
        <h2 className="emp-section-title">Visual Engagement Overview</h2>
        <div className="emp-stats-grid">
          <div className="emp-stat-card">
            <DonutChart percent={totals.attentionRetention || 0} label="Attention" color="#10b981" />
            <div className="emp-stat-info">
              <h4>Attention Retention</h4>
              <p>{formatPercent(totals.attentionRetention || 0)} of sessions remain engaged.</p>
            </div>
          </div>
          <div className="emp-stat-card">
            <DonutChart percent={totals.engagementScore || 0} label="Focus" color="#3b82f6" />
            <div className="emp-stat-info">
              <h4>Engagement Score</h4>
              <p>Live engagement score from points/session and retention.</p>
            </div>
          </div>
          <div className="emp-stat-card">
            <DonutChart percent={totals.bounceRate || 0} label="Bounce" color="#ef4444" />
            <div className="emp-stat-info">
              <h4>Bounce Pressure</h4>
              <p>{formatPercent(totals.bounceRate || 0)} sessions have low interaction depth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
