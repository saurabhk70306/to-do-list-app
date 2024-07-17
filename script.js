// Selectors
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const priorityInput = document.getElementById('priority-input');
const dateInput = document.getElementById('date-input');
const todoList = document.getElementById('todo-list');

// Function to get tasks from local storage
function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

// Function to save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks from local storage
function renderTasks() {
    const tasks = getTasks();
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const { name, priority, date, completed } = task;
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${completed ? 'completed' : ''}">${name}</span>
            <span class="priority">${priority}</span>
            <span class="date">${date ? date : ''}</span>
            <button onclick="toggleComplete(${index})">${completed ? 'Undo' : 'Complete'}</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Function to add a new task
function addTask(name, priority, date) {
    const tasks = getTasks();
    tasks.push({ name, priority, date, completed: false });
    saveTasks(tasks);
    renderTasks();
}

// Function to edit an existing task
function editTask(index) {
    const tasks = getTasks();
    const task = tasks[index];
    const newName = prompt('Edit the task name:', task.name);
    if (newName !== null) {
        task.name = newName;
        saveTasks(tasks);
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

// Function to toggle task completion status
function toggleComplete(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = input.value.trim();
    const priority = priorityInput.value.trim();
    const date = dateInput.value.trim();
    if (name !== '') {
        addTask(name, priority, date !== '' ? date : null);
        input.value = '';
        priorityInput.value = 'low'; // Reset priority to default after submission
        dateInput.value = ''; // Clear date input after submission
    }
});

// Initial rendering of tasks
renderTasks();
