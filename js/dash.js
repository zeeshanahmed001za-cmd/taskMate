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

/* ---------------- Responsive sidebar(shortcuts)---------------- */

function togglesidebar() {
    const isOpen = sideBar.classList.contains('open');

    sideBar.classList.toggle("open");
    sideBar.classList.toggle("collapsed");

    openBtn.style.visibility = isOpen ? "visible" : "hidden";

    inboxHeader.classList.toggle("expand", isOpen);
    listSection.classList.toggle("expanded", isOpen);
}
document.addEventListener("keydown", (e) => {
    const isMacShortcut = e.metaKey && e.shiftKey && e.key.toLowerCase() === "s";
    const isWinShortcut = e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s";

    if (isMacShortcut || isWinShortcut) {
        e.preventDefault();
        togglesidebar();
    }
})
/* --------------------- Task-----------------*/
let currentView = 'inbox'; //it tells which part of the page is active 
let selectedPriority = null; //stores the currently selected priority filter(null-> no priority)
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // JSON.parse convertes the stored string value from localstorage into usable JS data


// Render Tasks
function renderTasks() {
    const container = document.getElementById('task-list');
    // const emptyState = document.getElementById('empty-state');

    let filteredTasks = filterTasksByView(currentView); // selects which task should be visible right now

    container.innerHTML = filteredTasks.map(task => {
        const priorityClass = task.priority ? `priority-${task.priority}` : '';
        const priorityLabel = task.priority ? `P${task.priority}` : '';

        // dynamic HTML rendering
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <div class="task-content">
                    <div class="task-text">${task.text}</div>

                    <div class="task-details">
                        ${task.dueDate ? `
                            <div class="task-detail-item">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                    </path>
                                </svg>
                                ${formatDate(task.dueDate)}
                            </div>
                        ` : ''}
                        ${task.priority ? `<span class="priority-badge ${priorityClass}">${priorityLabel}</span>` : ''}
                    </div>
                </div>

                <div class="task-actions">
                    <div class="task-action-btn delete" onclick="deleteTask(${task.id})">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        `;
    }).join(''); // built-in js array method that combines all elements of an array into single string
}

// Filter tasks by view
function filterTasksByView(view) {
    const today = new Date().toISOString().split('T')[0];

    if (view === 'today') {
        return tasks.filter(t => t.dueDate === today);
    }
    else if (view === 'upcoming') {
        return tasks.filter(t => t.dueDate && t.dueDate > today);
    }
    return tasks; // inbox = all tasks
}

// Add Task
function addTask() {
    const input = document.getElementById('new-task-input');
    const dateInput = document.getElementById('task-date-input');
    const text = input.value.trim();


    if (!text) return; // runs when the text is empty, missing

    const task = {
        id: Date.now(),
        text,
        completed: false,
        dueDate: dateInput.value || null,
        priority: selectedPriority,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    saveTasks();

    input.value = '';
    dateInput.value = '';
    selectedPriority = null;

    document.querySelectorAll('.priority-option')
        .forEach(opt => opt.classList.remove('selected'));

    renderTasks();
    updateTaskCounts();
    updateUIState();
}

// Toggle Task
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateTaskCounts();
        updateUIState();
    }
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    updateTaskCounts();
    updateUIState();
}

// Select Priority
function selectPriority(priority) {
    selectedPriority = priority;
    document.querySelectorAll('.priority-option').forEach(opt => {
        opt.classList.remove('selected');
        if (+opt.dataset.priority === priority) {
            opt.classList.add('selected');
        }
    });
}

// Update Task Counts
function updateTaskCounts() {
    const today = new Date().toISOString().split('T')[0];

    document.querySelector('[data-view="inbox"] .task-count').textContent =
        tasks.filter(t => !t.completed).length;

    document.querySelector('[data-view="today"] .task-count').textContent =
        tasks.filter(t => t.dueDate === today && !t.completed).length;

    document.querySelector('[data-view="upcoming"] .task-count').textContent =
        tasks.filter(t => t.dueDate && t.dueDate > today && !t.completed).length;

    const viewTasks = filterTasksByView(currentView).filter(t => !t.completed);
    document.getElementById('task-count-header').textContent =
        `${viewTasks.length} ${viewTasks.length === 1 ? 'task' : 'tasks'}`;
}

// Format Date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dateStr === today.toISOString().split('T')[0]) return 'Today';
    if (dateStr === tomorrow.toISOString().split('T')[0]) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



const taskInput = document.getElementById("inputTaskContainer");
const emptyAddBtn = document.getElementById("emptyAddTaskBtn");
const emptyState = document.getElementById('empty-state');


emptyAddBtn.addEventListener("click", () => {
    // hide empty state
    emptyState.classList.add("hidden");

    // show task input box
    taskInput.classList.remove("hidden");

    // optional: focus input
    document.getElementById("new-task-input").focus();
});
// cancel button
const cancelBtn = document.getElementById("cancel-Task-btn");

cancelBtn.addEventListener("click", () => {
    taskInput.classList.add("hidden");
});

// responsive input task container 
const taskinputfield = document.getElementById("new-task-input");

taskinputfield.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
});

// ui state when task exist or not

function updateUIState() {
    const emptyState = document.getElementById("empty-state");
    const taskInput = document.getElementById("inputTaskContainer");

    if (tasks.length === 0) {
        emptyState.classList.remove("hidden");
        taskInput.classList.add("hidden");
    } else {
        emptyState.classList.add("hidden");
        taskInput.classList.remove("hidden");
    }
}
// Initialize app
init();
