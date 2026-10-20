import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { expenseService } from "../services/expenseService";

export default function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    expenseService.getById(id)
      .then((data) => setExpense(data.expense))
      .catch((err) => setError(err.response?.data?.message || "Could not find this expense."))
      .finally(() => setLoading(false));
  }, [id]);

  async function save(details) {
    await expenseService.update(id, details);
    navigate("/expenses");
  }

  return (
    <div className="page-container narrow-container">
      <Link to="/expenses" className="back-link">Back to expenses</Link>
      <div className="page-heading"><h1>Edit expense</h1></div>
      {loading ? <div className="panel">Loading expense...</div> : error ? <div className="alert alert-error">{error}</div> : <ExpenseForm key={expense._id} initialValues={expense} onSubmit={save} submitLabel="Update expense" />}
    </div>
  );
}
