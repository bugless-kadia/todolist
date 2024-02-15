let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let underLine = document.getElementById('under-line');

let taskList = [];
let filterList = [];
let mode = 'all';
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

function addTask() {
  if (taskInput.value == '') {
    return alert('할일을 입력해주세요');
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  taskInput.value = '';
  render();
}

function render() {
  let resultHTML = '';
  let list = [];
  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'ongoing' || mode === 'done') {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <i class="fa-solid fa-rotate-left" onclick="toggleComplete('${list[i].id}')"></i>
        <i class="fa-solid fa-trash" onclick="deleteTask('${list[i].id}')"></i>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <div class="task-progress">${list[i].taskContent}</div>
    <div>
      <i class="fa-solid fa-check" onclick="toggleComplete('${list[i].id}')"></i>
      <i class="fa-solid fa-trash" onclick="deleteTask('${list[i].id}')"></i>
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
  filter();
  console.log(taskList);
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
  console.log(taskList);
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + 'px';
    underLine.style.left = event.target.offsetLeft + 'px';
    underLine.style.top =
      event.target.offsetTop + event.target.offsetHeight + 'px';
  }

  filterList = [];
  if (mode === 'ongoing') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === 'done') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substring(2, 11);
}
