import { logoutAlert } from "./sweet-alert/alerts.js";

const form = document.getElementById("chat-form");
const socket = io("http://192.168.0.2:3000");

const storedName = localStorage.getItem("userName");

/* socket.on("connect", () => {
  displayMessage(`id: ${socket.id}`);
}); */

socket.on("receive-message", (username, msg) => {
  displayMessage(username, msg);
});

socket.on("online-users", (username) => {
  usersActive(username);
});

if (!storedName) {
  window.location.href = "../../index.html";
} else {
  const userName = document.getElementById("user-name");
  if (userName) {
    userName.textContent = storedName;
  }
  //socket.emit("online", username);
}

logout();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const msgInput = document.getElementById("message-input");
  const msg = msgInput.value;

  if (msg === "") {
    alert("Message input is empty");
    return;
  }

  socket.emit("send-message", storedName, msg);
  msgInput.value = "";
});

function displayMessage(username, msg) {
  const chat = document.querySelector(".chat");
  const message = document.createElement("div");
  message.classList.add("msg");
  message.textContent = `${username}: ${msg}`;
  chat.appendChild(message);

  chat.scrollTop = chat.scrollHeight;
}

/* function usersActive(username) {
  const users = document.getElementById("list");
  users.innerHTML = "";

  userArray.forEach((username) => {
    const list = document.createElement("li");
    list.textContent = username;
    users.appendChild(list);
  });
} */

function logout() {
  const logout = document.getElementById("logout");

  logout.addEventListener("click", () => {
    //localStorage.removeItem("userName");
    logoutAlert();
  });
}
