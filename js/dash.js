const mockUser = document.getElementById("username");
const navItems = document.querySelectorAll(".subContainer .icon");
const sideBar = document.getElementById("sideBar");
const closeBtn = document.getElementById("toggleInside");
const openBtn = document.getElementById("toggleOutside");
const inboxHeader = document.getElementById("inboxIdSection");
const listSection = document.getElementById("listIdsection")

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
    sideBar.classList.toggle("open");
    sideBar.classList.toggle("collapsed");

    openBtn.style.visibility = "visible"; //
});

// Open sidebar (outside button)
openBtn.addEventListener("click", (e) => {
    e.preventDefault();

    sideBar.classList.toggle("collapsed");
    sideBar.classList.toggle("open");

    openBtn.style.visibility = "hidden"; // 
});
/* ---------------- Responsive design---------------- */

closeBtn.addEventListener("click", () => {
    inboxHeader.classList.add('expand');
    listSection.classList.add('expanded');
});
openBtn.addEventListener("click", () => {
    inboxHeader.classList.remove('expand');
    listSection.classList.remove('expanded');
});

