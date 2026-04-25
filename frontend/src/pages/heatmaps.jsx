import React from "react";
import { Info } from "lucide-react";
import "../styles/heatmaps.css";
import LiveHeatmapPanel from "../components/LiveHeatmapPanel";
import { useLiveAnalytics } from "../hooks/useLiveAnalytics";
import { formatNumber, formatPercent } from "../utils/liveFormat";

const Heatmaps = () => {
  const { data, loading, error } = useLiveAnalytics();
  const points = data?.heatmap?.points || [];
  const totals = data?.totals || {};
  const topElements = data?.topElements || [];

  return (
    <div className="heatmaps-container">
      <header className="heatmaps-header">
        <div className="title-group">
          <h1>Heatmap Analytics</h1>
          <p style={{ marginTop: "0.5rem" }}>Live heatmap generated from backend gaze tracking data.</p>
          {loading ? <p style={{ marginTop: "0.5rem" }}>Loading live heatmap...</p> : null}
          {error ? <p style={{ marginTop: "0.5rem", color: "#dc2626" }}>{error}</p> : null}
        </div>
      </header>

      <div className="heatmap-main-layout">
        <div className="heatmap-viewer-card" style={{ padding: 16 }}>
          <LiveHeatmapPanel points={points} height={460} />
        </div>

        <aside className="heatmap-sidebar">
          <div className="info-card">
            <h3><Info size={18} style={{ verticalAlign: "middle", marginRight: "8px" }} /> Live Heatmap Status</h3>
            <p>Sessions: {formatNumber(totals.sessions || 0)}</p>
            <p>Total Points: {formatNumber(totals.points || 0)}</p>
            <p>Bounce Rate: {formatPercent(totals.bounceRate || 0)}</p>
          </div>

          <div className="info-card" style={{ background: "rgba(180, 100, 69, 0.1)", borderColor: "rgba(180, 100, 69, 0.3)" }}>
            <h3 style={{ color: "#4a3b32" }}>Top Attention Regions</h3>
            {topElements.length ? (
              topElements.map((element) => (
                <p key={element.element} style={{ color: "#5a4b42" }}>
                  {element.element}: {formatPercent(element.percentage)}
                </p>
              ))
            ) : (
              <p style={{ color: "#5a4b42" }}>No attention regions available yet.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Heatmaps;
