import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your API server and credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-landing">
      <section className="login-intro">
        <span className="login-eyebrow"><span aria-hidden="true" /> YOUR MONEY, IN FOCUS</span>
        <h1>A little more clarity with every expense.</h1>
        <p className="login-intro-copy">
          Keep your spending organized, understand your habits, and make your next money decision with confidence.
        </p>
        <div className="login-art" aria-hidden="true">
          <div className="art-topline">
            <div className="art-title">
              <span className="art-icon">↗</span>
              <span><strong>Spending overview</strong><small>Your activity at a glance</small></span>
            </div>
            <span className="art-period">THIS MONTH <span>⌄</span></span>
          </div>
          <div className="art-chart">
            <div className="art-y-labels"><span>More</span><span /></div>
            <div className="art-bars">
              <span /><span /><span /><span /><span /><span /><span />
            </div>
            <div className="art-x-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div>
          </div>
          <div className="art-footer"><span><i /> Expenses</span><span>One simple view, more peace of mind</span></div>
        </div>
        <div className="login-benefits">
          <span><i aria-hidden="true">✓</i> Easy expense tracking</span>
          <span><i aria-hidden="true">✓</i> Clear spending summaries</span>
        </div>
      </section>

      <section className="auth-card login-card">
        <img className="login-card-logo" src="/expense-tracker.svg" alt="" aria-hidden="true" />
        <span className="login-card-kicker">WELCOME BACK</span>
        <h2>Sign in to your account</h2>
        <p className="login-card-copy">Pick up right where you left off.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form className="stack-form" onSubmit={submit}>
          <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" placeholder="you@example.com" required /></label>
          <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete="current-password" placeholder="Enter your password" required /></label>
          <button className="button button-wide" disabled={loading}>{loading ? "Logging in..." : "Sign in"} <span className="login-button-arrow" aria-hidden="true">→</span></button>
        </form>
        <p className="auth-switch">New to Expense Tracker? <Link to="/register">Create an account</Link></p>
      </section>
    </div>
  );
}
