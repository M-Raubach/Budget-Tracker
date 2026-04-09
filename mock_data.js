(function seedMockData(){
    try {
        const existing = JSON.parse(localStorage.getItem('transactions')) || [];
        // If there are already transactions, do not overwrite
        if (existing.length) return;

        const sample = [
            { type: 'income',  category: 'Salary',      amount: 3200.00, description: 'Monthly paycheck', date: '2026-04-01' },
            { type: 'income',  category: 'Freelance',   amount: 450.00,  description: 'Project work',     date: '2026-04-04' },
            { type: 'expense', category: 'Rent',        amount: 950.00,  description: 'April rent',       date: '2026-04-03' },
            { type: 'expense', category: 'Groceries',   amount: 185.25,  description: 'Weekly groceries', date: '2026-04-06' },
            { type: 'expense', category: 'Utilities',   amount: 120.40,  description: 'Electric + water', date: '2026-04-05' },
            { type: 'expense', category: 'Transport',   amount: 60.00,   description: 'Gas',              date: '2026-04-07' },
            { type: 'expense', category: 'Entertainment',amount: 45.00,   description: 'Movies',           date: '2026-04-08' },
            { type: 'income',  category: 'Dividends',   amount: 30.00,   description: 'Stocks',           date: '2026-04-02' }
        ];

        localStorage.setItem('transactions', JSON.stringify(sample));

        // If the page exposes these functions, call them to refresh UI
        if (typeof loadTransactions === 'function') loadTransactions();
        if (typeof updateSummary === 'function') updateSummary();
        if (typeof updateCategoryBreakdown === 'function') updateCategoryBreakdown();
    } catch (err) {
        // fail silently in case run on pages without the dashboard
        console.error('mock_data seed failed:', err);
    }
})();
