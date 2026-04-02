document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    initializeDefaultUser();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(user =>
            user.username === username && user.password === password
        );

        if (matchedUser) {
            localStorage.setItem("currentUser", matchedUser.username);
            alert("Login successful!");
            window.location.href = "budgetDataDisplay.html";
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    });

    function initializeDefaultUser() {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.some(user => user.username === "student");

        if (!exists) {
            users.push({
                username: "student",
                email: "student@example.com",
                password: "budget123"
            });
            localStorage.setItem("users", JSON.stringify(users));
        }
    }
});
