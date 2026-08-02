# Task Tracker App

A lightweight, responsive, vanilla JavaScript Task Tracker application. This project allows users to create, manage, and persist daily tasks using LocalStorage.

This project is from [roadmap.sh Task Tracker JS Project](https://roadmap.sh/projects/task-tracker-js).

---
## 🔗 Live Demo

Check out the live app here: **[Live Demo Link](https://muhammadhelsharkawy.github.io/Task-Tracker/)**

---

## 🚀 Features

* **Create Tasks:** Add tasks quickly with built-in form validation (minimum 3 characters required).
* **Toggle Task Completion:** Mark tasks as completed or incomplete with dynamic visual updates.
* **Smart Sorting:** Automatically sorts pending tasks to the top while keeping completed tasks at the bottom.
* **Delete Tasks:** Remove individual tasks with a single click.
* **Persistent Storage:** Saves tasks using the browser's `localStorage` so your list persists across page reloads.
* **Responsive UI:** Fully responsive design built to work smoothly on mobile, tablet, and desktop screens.
* **Empty State:** Displays a fallback UI when no tasks are present.

---

## 🛠️ Tech Stack

* **HTML5:** Semantic markup and SVG Lucide icons.
* **CSS3:** Modern CSS with nested rules, Flexbox, CSS Grid, and custom media queries for full mobile responsiveness.
* **JavaScript (ES6+):** Modular, functional vanilla JS using event delegation, state management, dynamic DOM rendering, and LocalStorage integration.

---

## 📁 Project Structure

```text
├── css/
│   └── style.css       # App styling & responsive design rules
├── js/
│   └── main.js        # Core logic, state management, and DOM handlers
├── index.html          # Application HTML layout
└── README.md           # Project documentation
