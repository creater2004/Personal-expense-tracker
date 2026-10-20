import { useState } from "react";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Education", "Bills", "Health", "Other"];
const paymentMethods = ["Cash", "UPI", "Card", "Net Banking", "Other"];

export default function ExpenseForm({ initialValues, onSubmit, submitLabel = "Save expense" }) {
  const [form, setForm] = useState({
    title: initialValues?.title || "",
    amount: initialValues?.amount ?? "",
    category: initialValues?.category || "Food",
    paymentMethod: initialValues?.paymentMethod || "UPI",
    date: initialValues?.date ? new Date(initialValues.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    description: initialValues?.description || ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (Number(form.amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    setSaving(true);
    try {
      await onSubmit({ ...form, amount: Number(form.amount) });
    } catch (err) {
      setError(err.response?.data?.message || "Could not save expense. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="panel form-panel" onSubmit={submit}>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-grid">
        <label>Title *<input name="title" value={form.title} onChange={change} placeholder="e.g. Lunch" maxLength="100" required /></label>
        <label>Amount (₹) *<input name="amount" type="number" min="0.01" step="0.01" value={form.amount} onChange={change} placeholder="250" required /></label>
        <label>Category *<select name="category" value={form.category} onChange={change} required>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Payment method<select name="paymentMethod" value={form.paymentMethod} onChange={change}>{paymentMethods.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Date *<input name="date" type="date" value={form.date} onChange={change} required /></label>
        <label className="full-width">Description<textarea name="description" value={form.description} onChange={change} rows="3" maxLength="500" placeholder="Optional notes..." /></label>
      </div>
      <div className="form-actions">
        <button className="button" disabled={saving}>{saving ? "Saving..." : submitLabel}</button>
      </div>
    </form>
  );
}
