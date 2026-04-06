import { useState } from "react";
import { Link } from "react-router-dom";
import { createTransaction } from "../services/api";

export default function EditBudgetPage() {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  function updateField(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const payload = {
        userId: Number(localStorage.getItem("userId") || "1"),
        type: form.type,
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        description: form.description
      };

      const result = await createTransaction(payload);
      setMessage(result.message);
      setForm({
        type: "expense",
        amount: "",
        category: "",
        date: "",
        description: ""
      });
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="page">
      <header>
        <h1>Edit Budget Page</h1>
        <p>This is the page where you will be able to edit your budget.</p>
      </header>

      <form className="card" onSubmit={handleSubmit}>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" value={form.type} onChange={updateField}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label htmlFor="amount">Amount</label>
        <input id="amount" name="amount" type="number" step="0.01" value={form.amount} onChange={updateField} required />

        <label htmlFor="category">Category</label>
        <input id="category" name="category" value={form.category} onChange={updateField} required />

        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" value={form.date} onChange={updateField} required />

        <label htmlFor="description">Description</label>
        <input id="description" name="description" value={form.description} onChange={updateField} />

        <button type="submit">Save Transaction</button>
        {message && <p className="message success">{message}</p>}
      </form>

      <Link to="/dashboard" className="button-link">Return to Budget Display Page</Link>
    </div>
  );
}
