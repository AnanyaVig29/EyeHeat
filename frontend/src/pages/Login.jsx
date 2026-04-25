import { useState } from "react";
import { API_BASE } from "../utils/gazeApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/overview";
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch {
      setError("Cannot reach server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  /** Fill the form with demo credentials for quick access */
  const fillDemo = () => {
    setForm({ email: "demo@eyeheat.com", password: "demo123" });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap"
        rel="stylesheet"
      />

      {/* ===== SCOPED STYLES ===== */}
      <style>{`
        .login-page-wrapper {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #f7ede2 0%, #fdf6ee 50%, #f0e0d0 100%);
        }

        .login-card {
          background: #fff;
          border-radius: 24px;
          padding: 40px;
          width: 100%;
          max-width: 420px;
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.06);
          animation: fadeSlideUp 0.5s ease-out;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .login-input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1.5px solid #ddd;
          font-size: 16px;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          background: #fafafa;
        }

        .login-input::placeholder { color: #9e8472; }

        .login-input:focus {
          border-color: #c17a50;
          box-shadow: 0 0 0 3px rgba(193,122,80,.15);
          background: #fff;
        }

        .login-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #c17a50, #a5623e);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(193,122,80,.35);
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .demo-btn {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          background: transparent;
          color: #c17a50;
          border: 2px solid #c17a50;
          border-radius: 8px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .demo-btn:hover {
          background: #c17a50;
          color: #fff;
        }

        .error-msg {
          color: #d94040;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .remember-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .custom-checkbox {
          width: 17px;
          height: 17px;
          border: 1.8px solid #c17a50;
          border-radius: 4px;
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s;
        }

        .custom-checkbox.checked {
          background: #c17a50;
        }

        .custom-checkbox svg { display: none; }
        .custom-checkbox.checked svg { display: block; }

        .forgot-link {
          color: #888;
          text-decoration: none;
          transition: color 0.15s;
        }

        .forgot-link:hover { color: #c17a50; }

        @media (max-width: 480px) {
          .login-card { padding: 24px; }
          .login-title { font-size: 24px !important; }
        }
      `}</style>

      {/* ===== PAGE WRAPPER ===== */}
      <div className="login-page-wrapper">

        {/* ===== CARD ===== */}
        <div className="login-card">

          {/* LOGO */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 30
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <ellipse cx="20" cy="20" rx="18" ry="12" stroke="#c17a50" strokeWidth="2" fill="none" />
              <circle cx="20" cy="20" r="6" fill="#c17a50" />
            </svg>

            <div>
              <div style={{ fontWeight: 600, fontSize: 18 }}>EyeHeat</div>
              <small style={{ color: "#888" }}>See What Matters</small>
            </div>
          </div>

          {/* HEADING */}
          <h2 className="login-title" style={{ marginBottom: 8, fontSize: 28, fontWeight: 600 }}>Welcome Back</h2>
          <p style={{ marginBottom: 24, color: "#777", fontSize: 15 }}>Login to your account</p>

          {/* DEMO HINT */}
          <button type="button" onClick={fillDemo} className="demo-btn">
            ✨ Fill Demo Credentials
          </button>

          {error && <p className="error-msg">{error}</p>}

          {/* FORM */}
          <form onSubmit={handleLogin}>

            <div style={{ marginBottom: 12 }}>
              <input
                id="login-email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className="login-input"
                required
              />
            </div>

            <div style={{ position: "relative", marginBottom: 12 }}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                className="login-input"
                required
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#888",
                  padding: "4px",
                  fontSize: 18,
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            {/* REMEMBER / FORGOT */}
            <div className="remember-row">
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <span
                  className={`custom-checkbox ${remember ? "checked" : ""}`}
                  onClick={() => setRemember(!remember)}
                >
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4L4 7L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ color: "#666" }}>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="login-btn"
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
