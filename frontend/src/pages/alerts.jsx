import React from "react";
<<<<<<< HEAD
import "../styles/Alerts.css";

const WarningIcon = ({ color = "#f59e0b" }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" x2="12" y1="9" y2="13" />
        <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
);

const AlertCircleIcon = ({ color = "#ef4444" }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
);

const MessageIcon = ({ color = "#ef4444" }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const ZapIcon = ({ color = "#f59e0b" }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const CheckCircleIcon = ({ color = "#10b981" }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const TrendDownIcon = ({ color = "#ef4444" }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
        <polyline points="16 17 22 17 22 11" />
    </svg>
);

const insights = [
    {
        severity: "High Impact",
        severityColor: "#ef4444",
        icon: <WarningIcon color="#ef4444" />,
        iconBg: "#fef2f2",
        text: "The pricing section has high attention but low engagement. Consider improving CTA visibility.",
    },
    {
        severity: "Medium Impact",
        severityColor: "#f59e0b",
        icon: <WarningIcon color="#f59e0b" />,
        iconBg: "#fffbeb",
        text: "Users are not scrolling much on mobile devices. Try shorter content or better mobile layout.",
    },
    {
        severity: "High Impact",
        severityColor: "#ef4444",
        icon: <MessageIcon color="#ef4444" />,
        iconBg: "#fef2f2",
        text: "The contact form is getting attention but has high drop-off rate.",
    },
];

const alerts = [
    {
        icon: <TrendDownIcon color="#ef4444" />,
        iconBg: "#fef2f2",
        title: "High Bounce Rate",
        desc: "The bounce rate on /pricing page is 35.4%",
        time: "2h ago",
    },
    {
        icon: <ZapIcon color="#f59e0b" />,
        iconBg: "#fffbeb",
        title: "Low Scroll Depth",
        desc: "Users are not scrolling past 50% on mobile",
        time: "5h ago",
    },
    {
        icon: <AlertCircleIcon color="#ef4444" />,
        iconBg: "#fef2f2",
        title: "Tracking Issue",
        desc: "Some pages are missing tracking code",
        time: "1d ago",
    },
    {
        icon: <CheckCircleIcon color="#10b981" />,
        iconBg: "#ecfdf5",
        title: "Great Performance",
        desc: "New CTA button test is performing well!",
        time: "2d ago",
    },
];
=======
import "../styles/alerts.css";
import { useLiveAnalytics } from "../hooks/useLiveAnalytics";
import { formatDuration, formatPercent } from "../utils/liveFormat";
>>>>>>> afd3fe2f182745079a258921570903b63d11621e

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
