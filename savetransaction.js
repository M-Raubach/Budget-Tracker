// saveTransaction()
// Runs when the user clicks Save Transaction
// Reads the form inputs, validates them, saves to localStorage, and updates the table
function saveTransaction() {
    const type        = document.getElementById('type').value;
    const category    = document.getElementById('category').value.trim();
    const amount      = document.getElementById('amount').value.trim();
    const description = document.getElementById('description').value.trim();
    const date        = document.getElementById('date').value;
    const message     = document.getElementById('message');

    // Validate that all fields are filled in
    if (!category || !amount || !description || !date) {
        message.style.color = 'red';
        message.textContent = 'Please fill in all fields.';
        return;
    }

    // Validate that amount is a valid positive number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        message.style.color = 'red';
        message.textContent = 'Please enter a valid amount.';
        return;
    }

    // Build the transaction object
    const transaction = {
        type,
        category,
        amount: parsedAmount,
        description,
        date
    };

    // Load existing transactions from localStorage, add the new one, and save back
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Show success message
    message.style.color = 'green';
    message.textContent = 'Transaction saved successfully.';

    // Add the new row to the table without reloading the page
    addRowToTable(transaction);

    // Clear the form inputs
    clearForm();
}

// clearForm() 
// Resets all form inputs back to their defaults
function clearForm() {
    document.getElementById('type').value        = 'income';
    document.getElementById('category').value    = '';
    document.getElementById('amount').value      = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value        = '';
}

// addRowToTable() 
// Adds a single transaction as a new row in the Recent Transactions table
function addRowToTable(transaction) {
    const tbody = document.getElementById('transactionList');
    const row = document.createElement('tr');
    row.innerHTML =
        '<td>' + transaction.type        + '</td>' +
        '<td>' + transaction.category    + '</td>' +
        '<td>$' + transaction.amount.toFixed(2) + '</td>' +
        '<td>' + transaction.description + '</td>' +
        '<td>' + transaction.date        + '</td>';
    tbody.appendChild(row);
}

// loadTransactions() 
// Runs on page load to populate the table with any previously saved transactions
function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Clear the hardcoded placeholder row first
    document.getElementById('transactionList').innerHTML = '';

    transactions.forEach(t => addRowToTable(t));
}

// Load existing transactions when the page opens
loadTransactions();
