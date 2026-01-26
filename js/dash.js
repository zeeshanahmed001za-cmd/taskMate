const mockUser = document.getElementById("username");
const navItems = document.querySelectorAll(".subContainer .icon");
const sideBar = document.getElementById("sideBar");
const closeBtn = document.getElementById("toggleInside");
const openBtn = document.getElementById("outsideToggleBar");

/* ---------------- Profile ---------------- */

const user = { name: "Demo user" };
mockUser.textContent = user.name;

/* ---------------- Active nav state ---------------- */

navItems.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();

        navItems.forEach(i => i.removeAttribute("aria-current"));
        item.setAttribute("aria-current", "page");
    });
});

/* ---------------- Sidebar toggle ---------------- */


// Initial state: sidebar open, outside toggle hidden
sideBar.classList.add("open");
openBtn.style.visibility = "hidden";

// Close sidebar (inside button)
closeBtn.addEventListener("click", () => {
    sideBar.classList.remove("open");
    sideBar.classList.add("collapsed");

    openBtn.style.visibility = "visible"; //
});

// Open sidebar (outside button)
openBtn.addEventListener("click", (e) => {
    e.preventDefault();

    sideBar.classList.remove("collapsed");
    sideBar.classList.add("open");

    openBtn.style.visibility = "hidden"; // 
});
