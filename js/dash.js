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

// Initial state
sideBar.classList.add("open");
openBtn.style.display = "none";

// Close sidebar (inside button)
closeBtn.addEventListener("click", () => {
    sideBar.classList.add("collapsed");
    sideBar.classList.remove("open");

    openBtn.style.visibility = "visible"; // show outside button
});

// Open sidebar (outside button)
openBtn.addEventListener("click", (e) => {
    e.preventDefault();

    sideBar.classList.remove("collapsed");
    sideBar.classList.add("open");

    openBtn.style.visibility = "hidden"; // hide outside button
});
