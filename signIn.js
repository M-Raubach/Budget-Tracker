// Event listener 
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get username and password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Test login
    if (username === 'username' && password === 'password') {
        // Redirect to budget data display
        window.location.replace('budgetDataDisplay.html'); 
    } else {
        // Invalid login
        alert('Invalid username or password');
    }
});
