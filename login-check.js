// Login check script
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        // If not logged in, redirect to login page
        if (window.location.pathname !== '/login.html' && window.location.pathname !== '/login') {
            window.location.href = 'login.html';
        }
    } else {
        // Add logout button if logged in
        addLogoutButton();
    }
});

// Handle login form submission
const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Simple login simulation (accepts any email and password)
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Accept any email and password for simulation
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            window.location.href = 'indexamazon.html';
        } else {
            alert('Please enter both email and password.');
        }
    });
}

// Add logout button to navigation
function addLogoutButton() {
    const navSign = document.querySelector('.nav-sign');
    if (navSign) {
        navSign.innerHTML = `
            <p><span>Hello, ${localStorage.getItem('userEmail')}</span></p>
            <p class="nav-second"><button onclick="logout()" style="background: none; border: none; color: white; cursor: pointer; text-decoration: underline;">Sign Out</button></p>
        `;
    }
}

// Handle logout (if needed, add a logout button)
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('cart');
    window.location.href = 'login.html';
}
