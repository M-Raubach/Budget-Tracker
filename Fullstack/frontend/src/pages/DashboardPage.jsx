import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardSummary } from "../services/api";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");

  async function loadData() {
    try {
      const userId = localStorage.getItem("userId") || "1";
      const data = await getDashboardSummary(userId);
      setSummary(data);
    } catch (error) {
      setMessage("Unable to load dashboard.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="page">
      <header>
        <h1>Budget Dashboard</h1>
        <p>View your totals, recent transactions, and spending by category.</p>
      </header>

      {message && <p className="message error">{message}</p>}

      {!summary ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <section className="summary-grid">
            <div className="card">
              <h2>Total Income</h2>
              <p className="money">${summary.incomeTotal.toFixed(2)}</p>
            </div>

            <div className="card">
              <h2>Total Expenses</h2>
              <p className="money">${summary.expenseTotal.toFixed(2)}</p>
            </div>

            <div className="card">
              <h2>Remaining Balance</h2>
              <p className="money">${summary.balanceTotal.toFixed(2)}</p>
            </div>
          </section>

          <div className="row">
            <div className="col">
              <section className="card">
                <h2>Category Spending</h2>
                <ul>
                  {summary.categoryBreakdown.map((item) => (
                    <li key={item.category}>
                      {item.category}: ${item.total.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="col">
              <section className="card">
                <h2>Recent Transactions</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.recentTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td>{tx.date}</td>
                        <td>{tx.type}</td>
                        <td>{tx.category}</td>
                        <td>${tx.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </>
      )}

      <div className="card">
        <Link to="/edit-budget" className="button-link">Edit Budget</Link>
        <Link to="/report" className="button-link">Create Financial Report</Link>
        <button onClick={loadData}>Refresh Dashboard</button>
      </div>
    </div>
  );
}
