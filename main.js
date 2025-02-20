//유저가 값을 입력한다
// +버튼을 클릭하면, 할 일이 추가된다
// Delete버튼을 누르면 할 일이 삭제된다
//check버튼을 누르면 할 일이 끝나면서 밑 줄이 간다.
//1. check 버튼을 클릭하면 isComplete를 false에서 true로 바꿔준다
//2. true이면 끝난 걸로 간주하고 밑줄 보여주기
//3. false이면 안 끝난 걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체탭으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addButton.click();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);

function addTask() {
  if (taskInput.value == "") {
    return alert("할 일을 입력해 주세요.");
  }
  let task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);
  taskInput.value = "";

  console.log(taskList);
  console.log("fil : ", filterList);
  filter();
}

function render() {
  //1. 내가 선택한 탭에 따라서
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }
  //2. 리스트를 달리 보여준다

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task" style="background-color:rgb(195, 223, 255)">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <input type="image" src="images/reply-solid.svg" class="check-button" onclick="toggleComplete('${list[i].id}')"/>
          <input type="image" src="/images/trash-can-solid.svg" class="delete-button" onclick="deleteTask('${list[i].id}')"/>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
        <input type="image" src="images/square-check-solid.svg" class="check-button" onclick="toggleComplete('${list[i].id}')"/>
          <input type="image" src="/images/trash-can-solid.svg" class="delete-button" onclick="deleteTask('${list[i].id}')"/>
        </div>
      </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id : ", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
  console.log(taskList);
}

function randomIdGenerate() {
  return Math.random().toString(36).substring(2, 9);
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
  console.log(filterList);
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
  }
  filterList = [];
  if (mode == "all") {
    //전체 리스트를 보여준다.
    render();
  } else if (mode == "ongoing") {
    //진행중인 아이템을 보여준다.
    //task,isComplete = false인 값
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (mode == "done") {
    //끝나는 케이스
    //isComplete = true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("끝남", filterList);
  }
}
