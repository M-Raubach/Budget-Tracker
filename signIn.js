document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    initializeDefaultUser();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const users = getUsers();

        const matchedUser = users.find(function (user) {
            return user.username === username && user.password === password;
        });

        if (matchedUser) {
            localStorage.setItem("currentUser", matchedUser.username);
            alert("Login successful!");
            window.location.href = "budgetDataDisplay.html";
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    });

    function getUsers() {
        const users = localStorage.getItem("users");
        return users ? JSON.parse(users) : [];
    }

    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    function initializeDefaultUser() {
        let users = getUsers();

        const demoUserExists = users.some(function (user) {
            return user.username === "student";
        });

        if (!demoUserExists) {
            users.push({
                username: "student",
                email: "student@example.com",
                password: "budget123"
            });
            saveUsers(users);
        }
    }
});
