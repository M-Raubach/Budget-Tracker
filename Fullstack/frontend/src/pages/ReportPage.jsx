import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMonthlyReport } from "../services/api";

export default function ReportPage() {
  const [month, setMonth] = useState("2026-04");
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadReport() {
      try {
        const userId = localStorage.getItem("userId") || "1";
        const data = await getMonthlyReport(userId, month);
        setReport(data);
      } catch (error) {
        setMessage("Unable to load report.");
      }
    }

    loadReport();
  }, [month]);

  return (
    <div className="page">
      <header>
        <h1>Financial Report</h1>
        <p>This is the page where the financial report based on the budget will display.</p>
      </header>

      <section className="card">
        <label htmlFor="month">Select Month</label>
        <input
          id="month"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </section>

      {message && <p className="message error">{message}</p>}

      {report && (
        <>
          <section className="summary-grid">
            <div className="card">
              <h2>Income</h2>
              <p className="money">${report.incomeTotal.toFixed(2)}</p>
            </div>
            <div className="card">
              <h2>Expenses</h2>
              <p className="money">${report.expenseTotal.toFixed(2)}</p>
            </div>
            <div className="card">
              <h2>Balance</h2>
              <p className="money">${report.balanceTotal.toFixed(2)}</p>
            </div>
          </section>

          <section className="card">
            <h2>Category Breakdown</h2>
            <ul>
              {report.categoryBreakdown.map((item) => (
                <li key={item.category}>
                  {item.category}: ${item.total.toFixed(2)}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <Link to="/dashboard" className="button-link">Return to Budget Display Page</Link>
    </div>
  );
}
