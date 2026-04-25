import React from "react";
import "../styles/alerts.css";
import { useLiveAnalytics } from "../hooks/useLiveAnalytics";
import { formatDuration, formatPercent } from "../utils/liveFormat";

function Alerts() {
  const { data, loading, error } = useLiveAnalytics();

  const alerts = data?.alerts || [];
  const recommendations = data?.recommendations || [];
  const totals = data?.totals || {};

  return (
    <div className="alerts-container">
      <h1 className="page-title alerts-title">Alerts</h1>
      <p className="page-subtitle">Live insights generated from backend gaze/session stream.</p>
      {loading ? <p className="page-subtitle">Loading live alerts...</p> : null}
      {error ? <p className="page-subtitle" style={{ color: "#dc2626" }}>{error}</p> : null}

      <div className="alerts-grid">
        <div className="alerts-card">
          <h2 className="alerts-card-title">AI Insights &amp; Recommendations</h2>
          <div className="insights-list">
            {recommendations.map((item) => (
              <div className="insight-item" key={item.title}>
                <div className="insight-content">
                  <span className="insight-severity">• Live Suggestion</span>
                  <p className="insight-text"><strong>{item.title}:</strong> {item.summary}</p>
                </div>
                <button className="view-details-btn">Live</button>
              </div>
            ))}
          </div>
        </div>

        <div className="alerts-card">
          <div className="alerts-card-header">
            <h2 className="alerts-card-title">Current Alerts</h2>
          </div>

          <div className="alert-list">
            {alerts.map((alert) => (
              <div className="alert-item" key={alert.title}>
                <div className="alert-content">
                  <span className="alert-title">{alert.title}</span>
                  <span className="alert-desc">{alert.desc}</span>
                </div>
                <span className="alert-time">{alert.severity.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ux-section">
        <h2 className="ux-section-title">UI/UX Improvement Suggestions</h2>
        <p className="ux-section-subtitle">Live KPI summary</p>

        <div className="ux-cards-grid">
          <div className="ux-card priority-high">
            <div className="ux-card-badge high">Attention</div>
            <h3 className="ux-card-title">Retention and Bounce</h3>
            <p className="ux-card-desc">
              Attention retention is <strong>{formatPercent(totals.attentionRetention || 0)}</strong> with a bounce rate of <strong>{formatPercent(totals.bounceRate || 0)}</strong>.
            </p>
          </div>

          <div className="ux-card priority-medium">
            <div className="ux-card-badge medium">Engagement</div>
            <h3 className="ux-card-title">Session Duration Quality</h3>
            <p className="ux-card-desc">
              Average session duration is <strong>{formatDuration(totals.avgDurationMs || 0)}</strong>.
            </p>
          </div>

          <div className="ux-card priority-low">
            <div className="ux-card-badge low">Traffic</div>
            <h3 className="ux-card-title">Returning Visitor Ratio</h3>
            <p className="ux-card-desc">
              Returning visitor signal is currently <strong>{formatPercent(totals.returnVisitors || 0)}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;
