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
  // 1. 내가 선택한 탭에 따라서
  let list = [];
  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'ongoing' || mode === 'done') {
    list = filterList;
  }
  // 2. 리스트를 달리 보여준다

  let resultHTML = '';
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

function filter(event) {
  mode = event.target.id;
  if (event) {
    underLine.style.width = event.target.offsetWidth + 'px';
    underLine.style.left = event.target.offsetLeft + 'px';
    underLine.style.top =
      event.target.offsetTop + event.target.offsetHeight + 'px';
  }

  filterList = [];
  if (mode === 'all') {
    //전체 리스트를 보여준다
    render();
  } else if (mode === 'ongoing') {
    // 진행중인 아이템을 보여준다.
    // task.isComplete = false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log('진행중', filterList);
  } else if (mode === 'done') {
    // 끝나는 케이스
    // task.isComplete = true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    console.log('끝남', filterList);
    render();
  }
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substring(2, 11);
}
