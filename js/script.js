import { checkauth } from "./auth.js";
console.log(checkauth());

const ctalinks = document.querySelectorAll(".cta-link");

ctalinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = checkauth() ? "dashboard.html" : "login.html";
        window.location.assign(target);
    });
});