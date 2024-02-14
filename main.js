let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList = [];

addButton.addEventListener('click', addTask);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class="task-done">${taskList[i].taskContent}</div>
      <div>
        <i class="fa-solid fa-rotate-left" onclick="toggleComplete('${taskList[i].id}')"></i>
        <i class="fa-solid fa-trash" onclick="deleteTask('${taskList[i].id}')"></i>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <div class="task-progress">${taskList[i].taskContent}</div>
    <div>
      <i class="fa-solid fa-check" onclick="toggleComplete('${taskList[i].id}')"></i>
      <i class="fa-solid fa-trash" onclick="deleteTask('${taskList[i].id}')"></i>
    </div>
  </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList = taskList.filter((id) => id !== taskList[i]);
      break;
    }
  }
  render();
  console.log(taskList);
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substring(2, 11);
}
