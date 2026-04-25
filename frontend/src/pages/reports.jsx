import React from "react";
import "../styles/reports.css";
import { useLiveAnalytics } from "../hooks/useLiveAnalytics";
import { formatDuration, formatNumber } from "../utils/liveFormat";

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
