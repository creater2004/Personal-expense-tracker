import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { expenseService } from "../services/expenseService";

export default function AddExpense() {
  const navigate = useNavigate();

  async function save(details) {
    await expenseService.create(details);
    navigate("/expenses");
  }

  return (
    <div className="page-container narrow-container">
      <Link to="/expenses" className="back-link">Back to expenses</Link>
      <div className="page-heading"><h1>Add expense</h1></div>
      <ExpenseForm onSubmit={save} submitLabel="Save expense" />
    </div>
  );
}
