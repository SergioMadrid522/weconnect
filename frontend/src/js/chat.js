import { displayMessage, logout, userStatus } from "./utils/chatUtils.js";
import { errorAlert } from "./sweet-alert/alerts.js";

const form = document.getElementById("chat-form");
const socket = io("http://192.168.0.5:3000");

const storedName = localStorage.getItem("userName");

/* socket.on("connect", () => {
  userConnect(`id: ${socket.id}`);
}); */

socket.on("receive-message", (username, msg) => {
  displayMessage(username, msg);
});

socket.on("online-users", (username) => {
  userStatus(username, "is connected");
});

if (!storedName) {
  window.location.href = "../../index.html";
} else {
  const userName = document.getElementById("user-name");
  if (userName) {
    userName.textContent = storedName;
    socket.emit("online", storedName);
  }
}

logout();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const msgInput = document.getElementById("message-input");
  const msg = msgInput.value;

  if (msg === "") {
    errorAlert("Message input is empty");
    return;
  }

  socket.emit("send-message", storedName, msg);
  msgInput.value = "";
});
