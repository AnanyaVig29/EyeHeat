import React from "react";
import "../styles/analytics.css";
import { useLiveAnalytics } from "../hooks/useLiveAnalytics";
import { formatDuration, formatNumber, formatPercent } from "../utils/liveFormat";

const Analytics = () => {
  const { data, loading, error } = useLiveAnalytics();

  const totals = data?.totals || {};
  const topElements = data?.topElements || [];
  const topPages = data?.topPages || [];
  const scrollDepth = data?.scrollDepth || [0, 0, 0, 0];
  const sectionEngagement = data?.sectionEngagement || [];

  const clickOverview = [
    { label: "Total Gaze Points", value: formatNumber(totals.points || 0), change: `${formatPercent(totals.attentionRetention || 0)} retained`, positive: true },
    { label: "Avg Points / Session", value: formatNumber(totals.avgPointsPerSession || 0), change: `${formatNumber(totals.sessions || 0)} sessions`, positive: true },
    { label: "Bounce Rate", value: formatPercent(totals.bounceRate || 0), change: "lower is better", positive: false },
    { label: "Return Visitors", value: formatPercent(totals.returnVisitors || 0), change: "live cohort", positive: true },
  ];

  return (
    <div className="analytics-container">
      <h1 className="page-title analytics-title">Analytics</h1>
      <p className="page-subtitle">Live behavior analytics synced from backend sessions and gaze points.</p>
      {loading ? <p className="page-subtitle">Loading live analytics...</p> : null}
      {error ? <p className="page-subtitle" style={{ color: "#dc2626" }}>{error}</p> : null}

      <div className="analytics-kpi-grid">
        {clickOverview.map((item) => (
          <div className="analytics-kpi" key={item.label}>
            <span className="analytics-kpi-label">{item.label}</span>
            <div className="analytics-kpi-row">
              <span className="analytics-kpi-value">{item.value}</span>
              <span className={`analytics-kpi-change ${item.positive ? "positive" : "negative"}`}>
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-bento">
        <div className="analytics-card card-clicked-elements">
          <h2 className="analytics-card-title">Most Viewed Areas</h2>
          <div className="clicked-list">
            {topElements.length ? (
              topElements.map((el, i) => (
                <div className="clicked-item" key={el.element}>
                  <div className="clicked-info">
                    <span className="clicked-rank">#{i + 1}</span>
                    <span className="clicked-name">{el.element}</span>
                    <span className="clicked-count">{formatNumber(el.views)}</span>
                  </div>
                  <div className="clicked-bar-bg">
                    <div className="clicked-bar-fill" style={{ width: `${el.percentage}%` }}></div>
                  </div>
                </div>
              ))
            ) : (
              <p>No live points yet.</p>
            )}
          </div>
        </div>

        <div className="analytics-card card-scroll-depth">
          <h2 className="analytics-card-title">Scroll Depth Analysis</h2>
          <p className="analytics-card-subtitle">Generated from recent gaze-y distribution</p>

          <div className="scroll-pie-container">
            <svg viewBox="0 0 36 36" className="scroll-pie-chart">
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#f1f5f9" strokeWidth="6"></circle>
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#ef4444" strokeWidth="6" strokeDasharray={`${scrollDepth[3]} ${100 - scrollDepth[3]}`} strokeDashoffset="25"></circle>
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#f59e0b" strokeWidth="6" strokeDasharray={`${scrollDepth[2]} ${100 - scrollDepth[2]}`} strokeDashoffset={-scrollDepth[3]}></circle>
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray={`${scrollDepth[1]} ${100 - scrollDepth[1]}`} strokeDashoffset={-(scrollDepth[3] + scrollDepth[2])}></circle>
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#10b981" strokeWidth="6" strokeDasharray={`${scrollDepth[0]} ${100 - scrollDepth[0]}`} strokeDashoffset={-(scrollDepth[3] + scrollDepth[2] + scrollDepth[1])}></circle>
              <text x="18" y="18" className="pie-center-text" dominantBaseline="middle" textAnchor="middle">Live</text>
            </svg>

            <div className="scroll-pie-legend">
              <div className="legend-item"><span className="legend-color" style={{ background: "#ef4444" }}></span> 75-100%: {formatPercent(scrollDepth[3])}</div>
              <div className="legend-item"><span className="legend-color" style={{ background: "#f59e0b" }}></span> 50-75%: {formatPercent(scrollDepth[2])}</div>
              <div className="legend-item"><span className="legend-color" style={{ background: "#3b82f6" }}></span> 25-50%: {formatPercent(scrollDepth[1])}</div>
              <div className="legend-item"><span className="legend-color" style={{ background: "#10b981" }}></span> 0-25%: {formatPercent(scrollDepth[0])}</div>
            </div>
          </div>
        </div>

        <div className="analytics-card card-section-engagement">
          <h2 className="analytics-card-title">Section Engagement Trend</h2>
          <p className="analytics-card-subtitle">Normalized scores from live gaze sessions</p>
          <div className="line-chart-container">
            <div className="line-chart-labels" style={{ marginTop: 0, marginBottom: 14 }}>
              {sectionEngagement.map((s) => (
                <span key={s.label}>{s.label}</span>
              ))}
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {sectionEngagement.map((section) => (
                <div key={section.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span>{section.label}</span>
                    <span>{section.score}%</span>
                  </div>
                  <div className="clicked-bar-bg">
                    <div className="clicked-bar-fill" style={{ width: `${section.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="analytics-card card-top-pages">
          <h2 className="analytics-card-title">Top Pages (Live)</h2>
          <p className="analytics-card-subtitle">Ranked by session volume and gaze intensity</p>
          <div className="top-pages-list">
            {topPages.map((page, i) => (
              <div className="top-page-item" key={page.page + i}>
                <div className="top-page-rank">
                  <span className={`rank-badge ${i < 3 ? "top" : ""}`}>{i + 1}</span>
                </div>
                <div className="top-page-info">
                  <span className="top-page-path">{page.page}</span>
                  <div className="top-page-stats">
                    <span>{formatNumber(page.sessions)} sessions</span>
                    <span>{formatNumber(page.points)} points</span>
                    <span>{formatDuration(page.avgDurationMs)}</span>
                  </div>
                </div>
                <div className="top-page-score">{page.engagementScore}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
