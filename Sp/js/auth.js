// SP Photography - Auth Logic

const ADMIN_CREDENTIALS = {
    email: 'admin@sp.com',
    password: 'password123' // Demo purposes
};

function initAuth() {
    // Check if user is logged in on admin pages
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    const path = window.location.pathname;

    if (path.includes('/admin/') && !isLoggedIn) {
        window.location.href = '../pages/login.html';
    }
}

function login(email, password) {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
}

function logout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    window.location.href = '../pages/login.html';
}

document.addEventListener('DOMContentLoaded', initAuth);
