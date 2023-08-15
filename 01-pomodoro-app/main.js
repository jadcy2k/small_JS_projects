// Global Variables:
const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

// Selectors:
const $ = (selector) => document.querySelector(selector);
const btnAdd  = $("#btnAdd");
const itTask  = $("#itTask");
const form    = $("#form");

// --------------------------------------------------------

// "Add task" Submit function:
form.addEventListener('submit', e => {
  e.preventDefault();
  if (itTask.value !== '') {
    createTask (itTask.value);
    itTask.value = '';
    renderTasks();
  }
});
// --------------------------------------------------------
// CreateTask function:
const createTask = (value) => {
  const newTask = { // generate new object.
    id: getRandom(),
    title: value,
    completed: false,
  };
  tasks.unshift(newTask); //add task to the start of array.
}
// --------------------------------------------------------
// (HELPER) create Random string of 9 chars:
const getRandom = () => {
  // toString(36) represents "base 36", digits beond 9 by letters.
  // slice(3) cuts the first 3 characters.
  // Other way: return Math.random().toString(36).slice(2);
  return (Math.random() * 100).toString(36).slice(3);
}
// --------------------------------------------------------

// Render tasks:
const renderTasks = () => {
  const html = tasks.map(task => {
    return `
    <div class="task grid">
      <div class="title">${task.title}</div>
      <div class="completed">${
        task.completed 
        ? `<button disabled class="contrast">Done</button>`
        : `<button class="startBtn outline" data-id="${task.id}">Start</button>`
      }</div>
      
    </div>
    `;
  });

  $('#tasks').innerHTML = html.join(''); //separate all the array items.
  // --------------------
  // Iterate All buttons:
  // --------------------
  const startButtons = document.querySelectorAll('.task .startBtn');

  startButtons.forEach((btn)=>{
    btn.addEventListener ('click', () => {
      // If there's no timer yet:
      if (!timer) {
        const id = btn.getAttribute('data-id');
        startButtonHandler(id);
        btn.textContent = "In progress...";
      }
    });
  });
}
// --------------------------------------------------------
// Rendering of time:
const renderTime = () => {
  const min = parseInt(time / 60);
  // The 'module' % returns the rest of a division: 65 % 60 = 5 ===> 65 sec = 1 min + 5 sec.
  const sec = parseInt(time % 60); 
  //Format "mm:ss":
  $('#time #value').textContent = `
    ${min < 10 ? "0":""}${min}:${sec < 10 ? "0":""}${sec}
  `;
}
// --------------------------------------------------------
// Task "start Button" handler:
const startButtonHandler = (id) => {
  // Calculate 25 minutes:
  time = 25 * 60;
  time = 5;
  current = id;
  // Find current task:
  const taskId = tasks.findIndex( task => task.id === id);
  $('#time #taskName').textContent = tasks[taskId].title;
  renderTime();
  timer = setInterval (() => {
    timeHandler (id);
  }, 1000);
}
// --------------------------------------------------------

// Decreases the time:
const timeHandler = (id = null) => {
  time --;
  renderTime();
  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTasks();
    startBreak();
  }
}
// --------------------------------------------------------
// Mark as completed function:
const markCompleted = (id) => {
  // Find task by id:
  const taskId = tasks.findIndex( task => task.id === id);
  tasks[taskId].completed = true;
}
// --------------------------------------------------------
// Start a brak function:
const startBreak = () => {
  // A break of 5 minutes:
  time = 5 * 60;
  time = 3;
  $('#time #taskName').textContent = 'Break';
  renderTime();  
  timerBreak = setInterval(timerBreakHandler, 1000);
}
// --------------------------------------------------------
// Decreases the time of break:
const timerBreakHandler = () => {
  time --;
  renderTime();
  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    $('#time #taskName').textContent = '';
    renderTime();
  }
}

// --------------------------------------------------------
// Initial execution:
renderTime();
renderTasks();
// --------------------------------------------------------