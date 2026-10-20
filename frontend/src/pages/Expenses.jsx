import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpenseList from "../components/ExpenseList";
import { expenseService } from "../services/expenseService";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const loadExpenses = useCallback(async () => {
    setError("");
    try {
      const data = await expenseService.getAll();
      setExpenses(data.expenses || []);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load expenses.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadExpenses(); }, [loadExpenses]);

  async function deleteExpense(id) {
    if (!window.confirm("Delete this expense? This action cannot be undone.")) return;
    setDeletingId(id);
    setError("");
    try {
      await expenseService.remove(id);
      setExpenses((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete expense.");
    } finally {
      setDeletingId("");
    }
  }

  const filtered = expenses.filter((item) =>
    `${item.title} ${item.category} ${item.paymentMethod}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Expenses</h1>
        <Link to="/expenses/add" className="button">Add expense</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <section className="panel">
        <div className="list-toolbar"><p>{expenses.length} expense(s)</p><input className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search expenses" aria-label="Search expenses" /></div>
        {loading ? <p className="loading-line">Loading expenses...</p> : <ExpenseList expenses={filtered} onDelete={deleteExpense} deletingId={deletingId} />}
      </section>
    </div>
  );
}
