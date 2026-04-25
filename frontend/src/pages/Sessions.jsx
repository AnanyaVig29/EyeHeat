import React from "react";
import { Video, Play, Clock, User, Calendar, ExternalLink } from "lucide-react";
import "../styles/Sessions.css";

const SESSIONS_DATA = [
    { id: "SESS-9281", user: "User #821", duration: "4m 12s", date: "May 18, 14:20", events: 42, thumbnail: "rgba(180, 100, 69, 0.1)" },
    { id: "SESS-9275", user: "User #104", duration: "1m 45s", date: "May 18, 13:45", events: 18, thumbnail: "rgba(59, 130, 246, 0.1)" },
    { id: "SESS-9260", user: "User #452", duration: "12m 30s", date: "May 18, 12:10", events: 156, thumbnail: "rgba(16, 185, 129, 0.1)" },
    { id: "SESS-9255", user: "User #309", duration: "2m 05s", date: "May 18, 11:30", events: 24, thumbnail: "rgba(245, 158, 11, 0.1)" },
];

const Sessions = () => {
    return (
        <div className="sessions-container">
            <header className="sessions-header">
                <div>
                    <h1>Session Recordings</h1>
                    <p>Watch real-time user journeys and identify friction points</p>
                </div>
                <div className="header-stats">
                    <div className="stat-pill">
                        <Video size={16} />
                        <span>1,284 Total Sessions</span>
                    </div>
                </div>
            </header>

            <div className="sessions-grid">
                {SESSIONS_DATA.map((session) => (
                    <div className="session-card" key={session.id}>
                        <div className="thumbnail-wrapper" style={{ background: session.thumbnail }}>
                            <div className="play-overlay">
                                <Play fill="white" size={32} />
                            </div>
                            <span className="duration-badge">{session.duration}</span>
                        </div>
                        <div className="session-info">
                            <div className="session-top">
                                <h3>{session.id}</h3>
                                <span className="event-count">{session.events} events</span>
                            </div>
                            <div className="session-details">
                                <div className="detail-item">
                                    <User size={14} />
                                    <span>{session.user}</span>
                                </div>
                                <div className="detail-item">
                                    <Calendar size={14} />
                                    <span>{session.date}</span>
                                </div>
                            </div>
                            <button className="view-session-btn">
                                <span>Analyze Recording</span>
                                <ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sessions-empty-state">
                <p>Showing 4 of 1,284 sessions. Use filters to narrow down results.</p>
                <button className="btn-secondary">Load More Sessions</button>
            </div>
        </div>
    );
};

export default Sessions;
