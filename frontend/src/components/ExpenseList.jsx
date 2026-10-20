import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

export default function ExpenseList({ expenses, onDelete, deletingId }) {
  if (!expenses.length) {
    return <div className="empty-state"><p>No expenses found.</p><Link className="button" to="/expenses/add">Add an expense</Link></div>;
  }

  return (
    <div className="table-wrap">
      <table className="expense-table">
        <thead><tr><th>Title</th><th>Category</th><th>Payment</th><th>Date</th><th>Amount</th><th>Actions</th></tr></thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td><strong>{expense.title}</strong>{expense.description && <small className="description-cell">{expense.description}</small>}</td>
              <td>{expense.category}</td>
              <td>{expense.paymentMethod}</td>
              <td>{new Date(expense.date).toLocaleDateString("en-IN")}</td>
              <td className="amount-cell">{formatCurrency(expense.amount)}</td>
              <td><div className="row-actions">
                <Link to={`/expenses/${expense._id}/edit`}>Edit</Link>
                <button disabled={deletingId === expense._id} onClick={() => onDelete(expense._id)}>Delete</button>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
