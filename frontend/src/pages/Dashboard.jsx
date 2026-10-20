import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { expenseService } from "../services/expenseService";
import { formatCurrency } from "../utils/formatCurrency";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ totalAmount: 0, totalExpenses: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([expenseService.getAll(), expenseService.summary()])
      .then(([list, stats]) => {
        setExpenses(list.expenses || []);
        setSummary(stats);
      })
      .catch((err) => setError(err.response?.data?.message || "Could not load dashboard."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="screen-center">Loading your dashboard...</div>;

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Dashboard</h1>
        <Link to="/expenses/add" className="button">Add expense</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="stats-grid">
        <div className="stat-card"><p>Total spent</p><h2>{formatCurrency(summary.totalAmount)}</h2></div>
        <div className="stat-card"><p>Number of expenses</p><h2>{summary.totalExpenses}</h2></div>
      </div>
      <section className="panel">
        <div className="section-heading"><h2>Recent expenses</h2><Link to="/expenses">View all</Link></div>
        {expenses.length === 0 ? (
          <div className="empty-state"><p>No expenses yet.</p><Link className="button" to="/expenses/add">Add an expense</Link></div>
        ) : (
          <div className="recent-list">{expenses.slice(0, 5).map((item) => <div className="recent-item" key={item._id}><div className="recent-info"><strong>{item.title}</strong><span>{item.category} · {new Date(item.date).toLocaleDateString("en-IN")}</span></div><strong className="amount-cell">{formatCurrency(item.amount)}</strong></div>)}</div>
        )}
      </section>
    </div>
  );
}
