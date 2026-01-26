import { login } from "./auth.js"

// const loginBtn = document.getElementById('loginBtn');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        window.location.href = 'dashboard.html';
    }

});

(function () {
    const pwd = document.getElementById('password');
    const btn = document.getElementById('togglePwdBtn');
    const eyeOpen = document.getElementById('eye-open');
    const eyeClosed = document.getElementById('eye-closed');

    function setHiddenState(isHidden) {
        // isHidden true => password is masked => show slashed eye (eyeClosed)
        eyeClosed.style.display = isHidden ? '' : 'none';
        eyeOpen.style.display = isHidden ? 'none' : '';
        btn.setAttribute('aria-pressed', String(!isHidden)); // pressed=true when shown (text)
        btn.setAttribute('aria-label', isHidden ? 'Show password' : 'Hide password');
    }

    // initialize (password fields start hidden)
    setHiddenState(true);

    btn.addEventListener('click', function () {
        const currentlyHidden = pwd.type === 'password';
        if (currentlyHidden) {
            pwd.type = 'text';
            setHiddenState(false);
        } else {
            pwd.type = 'password';
            setHiddenState(true);
        }
    });
})();

// loginBtn.addEventListener("click", () => {
//     login();

//     window.location.assign('dashboard.html');
// });
