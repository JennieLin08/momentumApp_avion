// import quote from "./randomQuotes.js";

const section = document.getElementById("main");

const input_name = document.getElementById("input_name");
const timeDisplay = document.getElementById("time");
const greetingDis = document.getElementById("div_greeting");
const quoteDis = document.getElementById("div_quote");
const inputGoal = document.getElementById("input_goal");
const goalDis = document.getElementById("goalDis");
const spanGoal = document.getElementById("spanGoal");
const checkboxGoal = document.getElementById("checkboxGoal");
const btnDel = document.getElementById("btn_del");

const quoteModal = document.getElementById("quoteModal");
const btnAddQuote = document.getElementById("btnAddQuote");
const closeModal = document.getElementsByClassName("closeModal")[0];
let textareaNewQuote = document.getElementById("newQuote");

let inputTodo = document.getElementById("inputTodo");
const ulTodo = document.getElementById("ul-todo");
const checkTodos = document.getElementsByClassName("todos");

const weatherDis = document.getElementById("weather_dis");

let disName = "";

let appStateLS = {
  appName: "",
  appGoal: "",
  appTodos: [],
  appRandomQuotes: [],
};

function bgImage() {
  const no = Math.floor(Math.random() * 4 + 1);
  section.style.backgroundSize = "cover";
  section.style.backgroundImage = "url(assets/images/" + no + ".jpg)";
}

bgImage();
getLS();
getLSInput_Name();
getLSinputGoal();
disTodos();
quote();
initTodo();

// const { appName, appFocus, appTodos, appRandomQuotes } = appState;

function getLS() {
  if (localStorage.getItem("appStateLS")) {
    appStateLS = localStorage.getItem("appStateLS");
    // console.log(appStateLS);
    if (appStateLS) {
      appStateLS = JSON.parse(appStateLS);
    }
  }
}

function getDateTime() {
  const now = new Date();
  // console.log(now.toLocaleTimeString("en-US", hourMinute));
  const hour = now.getHours();
  let minute = now.getMinutes();
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }

  let time = hour + " : " + minute;
  timeDisplay.innerHTML = time;
  if (hour >= 0 && hour <= 11) {
    greetingDis.innerHTML = "Good Morning" + disName + "!";
  } else if (hour >= 12 && hour <= 17) {
    greetingDis.innerHTML = "Good Afternoon" + disName + "!";
  } else {
    greetingDis.innerHTML = "Good Evening" + disName + "!";
  }
}

setInterval(getDateTime, 1000);

input_name.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    appStateLS.appName = input_name.value;
    localStorage.setItem("appStateLS", JSON.stringify(appStateLS));
    getLSInput_Name();
  }
});

function getLSInput_Name() {
  if (appStateLS.appName) {
    disName =
      ", " +
      String(appStateLS.appName).charAt(0).toUpperCase() +
      String(appStateLS.appName).slice(1);
  }
}

inputGoal.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    appStateLS.appGoal = inputGoal.value;
    localStorage.setItem("appStateLS", JSON.stringify(appStateLS));
    getLSinputGoal();
  }
});

function getLSinputGoal() {
  // const LSInputGoal = localStorage.getItem("inputGoal");
  if (appStateLS.appGoal) {
    inputGoal.setAttribute("hidden", "true");
    checkboxGoal.removeAttribute("hidden");
    spanGoal.innerHTML = appStateLS.appGoal;
    btnDel.removeAttribute("hidden");
  } else {
    inputGoal.removeAttribute("hidden");
    inputGoal.value = "";
    checkboxGoal.setAttribute("hidden", "true");
    spanGoal.innerHTML = "";
    btnDel.setAttribute("hidden", "true");
  }
}

btnDel.addEventListener("click", function () {
  appStateLS.appGoal = "";
  localStorage.setItem("appStateLS", JSON.stringify(appStateLS));
  getLSinputGoal();
});

checkboxGoal.addEventListener("click", function () {
  if (checkboxGoal.checked) {
    spanGoal.style.textDecoration = "line-through";
  } else {
    spanGoal.style.textDecoration = "none";
  }
});

function quote() {
  return fetch("https://dummyjson.com/quotes?limit=10")
    .then((data) => data.json())
    .then((data) => {
      appStateLS.appRandomQuotes = data.quotes;
      localStorage.setItem("appStateLS", JSON.stringify(appStateLS));

      let quotelength = appStateLS.appRandomQuotes.length - 1;
      const randomNumber = Math.floor(Math.random() * quotelength + 1);
      // console.log(appStateLS.appRandomQuotes[randomNumber].quote);
      quoteDis.innerHTML = appStateLS.appRandomQuotes[randomNumber].quote;
    });
}

// modal events js
btnAddQuote.onclick = function () {
  quoteModal.style.display = "block";
};

closeModal.onclick = function () {
  quoteModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == quoteModal) {
    quoteModal.style.display = "none";
  }
};

textareaNewQuote.addEventListener("keydown", function (e) {
  // console.log(e.key);
  if (e.key === "Enter") {
    const pushQuote = {
      id: appStateLS.appRandomQuotes.length + 1,
      quote: textareaNewQuote.value,
      author: "",
    };
    appStateLS.appRandomQuotes.push(pushQuote);
    localStorage.setItem("appStateLS", JSON.stringify(appStateLS));
    quoteModal.style.display = "none";
    quoteDis.innerHTML = textareaNewQuote.value;
  }
});

// js for todo modal
// Get the modal
const todoModal = document.getElementById("todosModal");

// Get the button that opens the modal
const btnShowTodo = document.getElementById("btnShowTodo");

// Get the <span> element that closes the modal
const spanClose = document.getElementsByClassName("todo-close")[0];

// When the user clicks the button, open the modal
btnShowTodo.onclick = function () {
  todoModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
spanClose.onclick = function () {
  todoModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == todoModal) {
    todoModal.style.display = "none";
  }
};

function disTodos() {
  // console.log(appStateLS.appTodos.length);
  for (let i = 0; i < appStateLS.appTodos.length; i++) {
    const newTodoLi = document.createElement("li");
    const newTodoInput = document.createElement("input");
    newTodoInput.setAttribute("type", "checkbox");
    newTodoInput.setAttribute("class", "todos");
    newTodoInput.setAttribute("data-index_id", appStateLS.appTodos[i].id);

    const newTodoSpan = document.createElement("span");
    newTodoSpan.innerHTML = appStateLS.appTodos[i].todo;

    if (appStateLS.appTodos[i].completed == true) {
      newTodoSpan.style.textDecoration = "line-through";
      newTodoInput.setAttribute("checked", "true");
    }

    newTodoLi.appendChild(newTodoInput);
    newTodoLi.appendChild(newTodoSpan);
    ulTodo.appendChild(newTodoLi);
  }
}

inputTodo.addEventListener("keydown", function (e) {
  // console.log(e.key);
  if (e.key === "Enter") {
    const pushTodo = {
      id: appStateLS.appTodos.length + 1,
      completed: false,
      todo: inputTodo.value,
    };
    appStateLS.appTodos.push(pushTodo);
    localStorage.setItem("appStateLS", JSON.stringify(appStateLS));
    disTodo(inputTodo.value);
    inputTodo.value = "";
  }
});

function disTodo(todo) {
  const newTodoLi = document.createElement("li");
  const newTodoInput = document.createElement("input");
  newTodoInput.setAttribute("type", "checkbox");
  newTodoInput.setAttribute("class", "todos");
  newTodoInput.setAttribute("data-index_id", appStateLS.appTodos.length);

  const newTodoSpan = document.createElement("span");
  newTodoSpan.innerHTML = todo;

  newTodoLi.appendChild(newTodoInput);
  newTodoLi.appendChild(newTodoSpan);
  ulTodo.appendChild(newTodoLi);
  initTodo();
}

function initTodo() {
  for (let i = 0; i < checkTodos.length; i++) {
    checkTodos[i].addEventListener("click", function (e) {
      const todo_id = this.getAttribute("data-index_id");

      if (this.checked) {
        this.nextSibling.style.textDecoration = "line-through";
        isCompleted(todo_id, true);
      } else {
        this.nextSibling.style.textDecoration = "none";
        isCompleted(todo_id, false);
      }
    });
  }
}

function isCompleted(id, isCom) {
  let index = 0;
  appStateLS.appTodos.map((val) => {
    // console.log(val.id);
    if (val.id == id) {
      // console.log(appStateLS.appTodos[index].completed);
      appStateLS.appTodos[index].completed = isCom;
      console.log(appStateLS);
      localStorage.setItem("appStateLS", JSON.stringify(appStateLS));
    }
    index++;
  });
}

function weatherApi() {
  return fetch(
    "https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=dx6DyZi1v5mhcE4F&lat=14.6042&lon=120.982&asl=13&format=json"
  )
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      // weatherDis.innerHTML = data.data_day.rainspot;
    });
}

weatherApi();
