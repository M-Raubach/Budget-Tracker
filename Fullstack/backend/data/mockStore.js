// Simple in-memory data store for the first full-stack pass.
// This lets the frontend and backend work together immediately before PostgreSQL is wired in.

const transactions = [
  { id: 1, userId: 1, date: "2026-04-01", type: "income", category: "Paycheck", amount: 2000, description: "Main paycheck" },
  { id: 2, userId: 1, date: "2026-04-03", type: "expense", category: "Rent", amount: 1200, description: "Monthly rent" },
  { id: 3, userId: 1, date: "2026-04-05", type: "expense", category: "Food", amount: 80, description: "Groceries" },
  { id: 4, userId: 1, date: "2026-04-07", type: "expense", category: "Utilities", amount: 150, description: "Electric + water" },
  { id: 5, userId: 1, date: "2026-04-10", type: "income", category: "Freelance", amount: 500, description: "Side work" }
];

function getTransactionsForUser(userId) {
  return transactions.filter((tx) => tx.userId === Number(userId));
}

function addTransaction(transaction) {
  const nextId = transactions.length ? Math.max(...transactions.map((tx) => tx.id)) + 1 : 1;
  const saved = { id: nextId, ...transaction };
  transactions.push(saved);
  return saved;
}

function getDashboardSummary(userId) {
  const userTransactions = getTransactionsForUser(userId);

  const incomeTotal = userTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const expenseTotal = userTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const balanceTotal = incomeTotal - expenseTotal;

  const categoryTotals = {};
  userTransactions.forEach((tx) => {
    if (tx.type === "expense") {
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + Number(tx.amount);
    }
  });

  const categoryBreakdown = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total
  }));

  const recentTransactions = [...userTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return {
    incomeTotal,
    expenseTotal,
    balanceTotal,
    categoryBreakdown,
    recentTransactions
  };
}

module.exports = {
  getTransactionsForUser,
  addTransaction,
  getDashboardSummary
};
