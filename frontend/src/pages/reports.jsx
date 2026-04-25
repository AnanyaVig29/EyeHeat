import React from "react";
<<<<<<< HEAD
import "../styles/Reports.css";

const DocIcon = ({ color }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M9 15h6" />
    </svg>
);

const PdfIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const ArrowDownIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
    </svg>
);

const ArrowUpIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
    </svg>
);

const reports = [
    { title: "Executive Summary", date: "May 12 - May 18, 2024", color: "#ef4444", bg: "#fef2f2" },
    { title: "Heatmap Analysis", date: "May 12 - May 18, 2024", color: "#6366f1", bg: "#eef2ff" },
    { title: "User Behavior Report", date: "May 12 - May 18, 2024", color: "#10b981", bg: "#ecfdf5" },
    { title: "A/B Test Results", date: "May 12 - May 18, 2024", color: "#f59e0b", bg: "#fffbeb" },
];

const flowNodes = [
    { path: "/", users: "12,842" },
    { path: "/features", users: "9,842" },
    { path: "/pricing", users: "6,125" },
    { path: "/contact", users: "2,156" },
];

const branchNodes = [
    { path: "/about", users: "3,842", connectFrom: 1 },
    { path: "/blog", users: "4,123", connectFrom: 2 },
];
=======
import "../styles/reports.css";
import { useLiveAnalytics } from "../hooks/useLiveAnalytics";
import { formatDuration, formatNumber } from "../utils/liveFormat";
>>>>>>> afd3fe2f182745079a258921570903b63d11621e

function Reports() {
  const { data, loading, error } = useLiveAnalytics();
  const recentSessions = data?.recentSessions || [];
  const topPages = data?.topPages || [];

  return (
    <div className="reports-container">
      <h1 className="page-title reports-title">Reports</h1>
      <p className="page-subtitle">Live export-ready summaries from backend tracking data.</p>
      {loading ? <p className="page-subtitle">Loading report data...</p> : null}
      {error ? <p className="page-subtitle" style={{ color: "#dc2626" }}>{error}</p> : null}

      <div className="reports-grid">
        <div className="reports-card">
          <div className="reports-card-header">
            <h2 className="reports-card-title">Recent Sessions</h2>
          </div>

          <div className="reports-list">
            {recentSessions.length ? (
              recentSessions.map((session) => (
                <div className="report-item" key={session.id}>
                  <div className="report-info">
                    <span className="report-title">{session.pageUrl || "/"}</span>
                    <span className="report-date">{new Date(session.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="report-pdf-btn">{formatNumber(session.pointCount)} pts</div>
                </div>
              ))
            ) : (
              <p>No sessions yet.</p>
            )}
          </div>

          <button className="create-report-btn">Generate Latest Snapshot</button>
        </div>

        <div className="reports-card flow-card">
          <h2 className="reports-card-title">User Behavior Flow</h2>
          <p className="flow-subtitle">Top paths ranked by live session activity</p>

          <div className="flow-diagram" style={{ display: "grid", gap: 16 }}>
            {topPages.map((page, idx) => (
              <div key={page.page + idx} className="flow-node" style={{ width: "100%", justifyContent: "space-between" }}>
                <span className="flow-path">{idx + 1}. {page.page}</span>
                <span className="flow-users">
                  {formatNumber(page.sessions)} sessions • {formatNumber(page.points)} points • {formatDuration(page.avgDurationMs)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
