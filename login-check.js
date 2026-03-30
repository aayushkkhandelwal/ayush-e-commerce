document.addEventListener('DOMContentLoaded', function () {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname;

    // Redirect if not logged in
    if (!isLoggedIn && !currentPage.includes('login')) {
        window.location.href = 'login.html';
    }

    // Redirect if already logged in
    if (isLoggedIn && currentPage.includes('login')) {
        window.location.href = 'indexamazon.html';
    }

    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('errorMsg');

            // Validation
            if (!email || !password) {
                errorMsg.textContent = "Please fill all fields";
                return;
            }

            if (!email.includes("@")) {
                errorMsg.textContent = "Invalid email format";
                return;
            }

            if (password.length < 4) {
                errorMsg.textContent = "Password must be at least 4 characters";
                return;
            }

            // Save login
            // localStorage.setItem('isLoggedIn', 'true');
            // localStorage.setItem('userEmail', email);

            // Redirect
            window.location.href = 'indexamazon.html';
        });
    }

    // Show user email (without logout button)
    if (isLoggedIn) {
        const navSign = document.querySelector('.nav-sign');

        if (navSign) {
            navSign.innerHTML = `
                <p>Hello, ${localStorage.getItem('userEmail')}</p>
            `;
        }
    }
});