const AUTH_KEY = "isLoggedIn";

function checkauth() {
    return localStorage.getItem(AUTH_KEY) === "true";
}
function login() {
    localStorage.setItem(AUTH_KEY, "true");
}
function logout() {
    localStorage.removeItem(AUTH_KEY);
}

export { login, logout, checkauth };