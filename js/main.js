// DOM references
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-btn");
const tasksContainer = document.getElementById("tasks-container");
const errorMessage = document.getElementById("error-message");
const form = document.getElementById("task-form");

// Constants
const STORAGE_KEY = "Tasks-List-Key";

// Storage / data layer
const loadSavedTasks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
};

let tasksList = loadSavedTasks();

const saveTasks = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksList));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};

const addTask = (task) => {
  taskInput.value = "";
  tasksList.push(task);
  saveTasks();
  render();
};

const deleteTask = (taskId) => {
  newList = tasksList.filter((task) => task.id !== taskId);
  if (newList.length === tasksList.length) return;
  tasksList = newList;
  saveTasks();
  render();
};

const getTaskById = (taskId) => {
  return tasksList.find((task) => task.id === taskId);
};

const toggleComplete = (taskId) => {
  const task = getTaskById(taskId);
  if (!task) return;
  task.isCompleted = !task.isCompleted;
  saveTasks();
  render();
};

const renderTask = (task) => {
  return `<div class="task-item ${task.isCompleted ? "completed" : ""}" data-task-id="${task.id}">
                <div data-task-id="${task.id}" class="task-label">
                    <div class="checkbox">
                      ${
                        task.isCompleted
                          ? `<svg xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-check-icon lucide-check">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>`
                          : ""
                      }
                    </div>
                    <span class="">${task.title}</span>
                </div>
                <button data-task-id="${task.id}" class="delete-task-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-trash2-icon lucide-trash-2">
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </button>
  </div>`;
};

const render = () => {
  if (tasksList.length === 0) {
    tasksContainer.innerHTML = `
    <div class="empty-tasks">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="lucide lucide-folder-open-icon lucide-folder-open">
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
      </svg>
      <p class="text-sm">No tasks yet</p>
    </div>`;
  } else {
    const reversed = [...tasksList].reverse();
    const sortedList = [...reversed].sort((a, b) => {
      if (a.isCompleted === b.isCompleted) return 0;
      if (b.isCompleted) return -1;
      return 1;
    });
    tasksContainer.innerHTML = sortedList
      .map((task) => renderTask(task))
      .join("");
  }
};

// Validation
const requiredValidator = (value) => {
  return value.trim().length > 0;
};

const minLengthValidator = (value, min) => {
  const trimmedValue = value.trim();
  return trimmedValue.length === 0 || trimmedValue.length >= min;
};

const validateForm = () => {
  let isValid = true;

  if (!requiredValidator(taskInput.value)) {
    isValid = false;
    errorMessage.classList.remove("hidden");
    errorMessage.innerHTML = "Task title is required";
  } else if (!minLengthValidator(taskInput.value, 3)) {
    isValid = false;
    errorMessage.classList.remove("hidden");
    errorMessage.innerHTML = "Title must be at least 3 characters";
  }

  return isValid;
};

// Event handlers
const handleSubmit = () => {
  if (!validateForm()) return;

  const task = {
    title: taskInput.value.trim(),
    id: `task-${Date.now()}`,
    isCompleted: false,
  };

  addTask(task);
};

const handleTasksContainerClick = (event) => {
  const target = event.target;
  const deleteTaskBtn = target.closest(".delete-task-btn");
  const toggleTask = target.closest(".task-label");

  if (deleteTaskBtn) {
    const taskId = deleteTaskBtn.dataset.taskId;
    if (!taskId) return;
    deleteTask(taskId);
  }
  if (toggleTask) {
    const taskId = toggleTask.dataset.taskId;
    if (!taskId) return;
    toggleComplete(taskId);
  }
};

// Event wiring
form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit();
});

tasksContainer.addEventListener("click", (event) => {
  handleTasksContainerClick(event);
});

taskInput.addEventListener("input", () => {
  errorMessage.classList.add("hidden");
});

render();
