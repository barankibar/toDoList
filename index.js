// Load the old tasks from local storage
window.onload = loadTasks;

// On form submit run the addTask function
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

function loadTasks() {
  // Check if localStorage has any old task
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach((task) => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
      task.completed ? "checked" : ""
    }>
          <input type="text" value="${task.task}" class="task ${
      task.completed ? "completed" : ""
    }" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");

  // Ping if task is empty
  if (task.value === "") {
    alert("Invalid Value");
    return false;
  }

  // Check is task already exist
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("This task already exist");
    return false;
  }

  // Add task to localStorage
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task.value, completed: false },
    ])
  );

  // Create list item
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
    <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  list.insertBefore(li, list.children[0]);

  // Clear input
  task.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task) => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify("tasks"));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach((task) => {
    if (task.task === event.parentNode.children[1].value) {
      // Delete Item
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // check if task is empty
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  // task already exist
  tasks.forEach((task) => {
    if (task.task === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  // update task
  tasks.forEach((task) => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
}
// Update localStorage
localStorage.setItem("tasks", JSON.stringify(tasks));
