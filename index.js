const addBtn = document.getElementById("add"); // for  adding new itmes
const todoText = document.getElementById("todoText"); //  for adding text
const addingTodo = document.getElementsByClassName("todoItems")[0]; // todo item container
const totalTasks = document.getElementById("totaltasks"); // total tasks
const taskCompleted = document.getElementById("tasksCompleted"); // tasks completed
const remainingTasks = document.getElementById("remainingTasks"); // tasks remaining
const notification = document.getElementById("notification"); // notification container

let countTodos = 0;
let todoCompleted = 0;

let checked; // checked wheter item is checked or not

const notificationMessage = (msg) => {
  let text = ""; // toast text
  let toast = document.createElement("p"); // created empty toast

  if (msg.includes("success")) {
    //for success  msg
    toast.classList.add("success"); // added success class ,now color of this toasst will be green using css
    text = `Todo Added successfully <i class="fa-solid fa-thumbs-up fa-beat"></i>`;
  }
  if (msg.includes("deleted")) {
    //for deleted msg
    toast.classList.add("delete"); // added delete class ,now color of this toasst will be red using css
    text = `Todo Deleted <i class="fa-solid fa-thumbs-up fa-beat"></i>`;
  }

  if (msg.includes("empty")) {
    toast.classList.add("empty"); // added delete class ,now color of this toasst will be red using css
    text = `Please write something !!!!`;
  }

  toast.innerHTML = text;
  notification.appendChild(toast); // appending text int the toast container

  setTimeout(() => {
    // now after 3s seconds taost will disappered
    toast.remove();
  }, 3000);
};

const addTodo = (e) => {
  const text = todoText.value; // taking the user input from intput text
  if (text === "") {
    // checking if user entered empty text
    notificationMessage("empty");
  } else {
    addingTodo.innerHTML += `           
    <div class="items">
    <div><input type="checkbox"  name="checkBox_item"  >
    <span id="todo-id">${text}</span></div>
    <i class="fa-solid fa-trash fa-2x" name="fa-icons"></i>
  </div>`;
    todoText.value = ""; // clearing the input filed after user added item in todo list
    countTodos++; // incremeting total todos
    totalTasks.innerHTML = countTodos;
    remainingTasks.innerHTML = countTodos - todoCompleted; //remaing todos
    notificationMessage("success"); // displaying todo msg
  }
};

const deleteTodo = (e) => {
  e.target.parentElement.remove();
  if (e.target.checked) todoCompleted--; // if element node is checked
  else if (todoCompleted > 0) {
    // iftodocompleted is positive intger
    todoCompleted--;
  }
  countTodos--; // decremneting total todos
  totalTasks.innerHTML = countTodos;
  taskCompleted.innerHTML = todoCompleted;
  remainingTasks.innerHTML = countTodos - todoCompleted;
  notificationMessage("deleted");
};

const completeTodo = (e) => {
  if (e.target.checked) {
    // is elemnet is checked
    // if user clicked in the checkbox means tasks is completed
    todoCompleted++; // increment todoCompleted
    taskCompleted.innerHTML = todoCompleted;
    remainingTasks.innerHTML = countTodos - todoCompleted;
  } else if (e.target.checked == false) {
    //if user unchecks the checkbox
    todoCompleted--; // decrement todoCompleted
    taskCompleted.innerHTML = todoCompleted;
    remainingTasks.innerHTML = countTodos - todoCompleted;
  }
};

addBtn.addEventListener("click", addTodo);
addingTodo.addEventListener("click", function (e) {
  if (e.target.type === "checkbox") {
    // if user clicks checkbox
    checked = true;
    completeTodo(e);
  }
  if (e.target.tagName === "I") {
    // if user clicks deletd box
    deleteTodo(e, checked);
  }
});
