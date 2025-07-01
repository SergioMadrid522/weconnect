const form = document.getElementById("chat-form");
const socket = io("http://localhost:3001");

const storedName = localStorage.getItem("userName");

socket.on("connect", () => {
  displayMessage(`id: ${socket.id}`);
});

socket.on("receive-message", (username, msg) => {
  displayMessage(username, msg);
});

if (!storedName) {
  window.location.href = "../../index.html";
} else {
  const userName = document.getElementById("user-name");
  if (userName) {
    userName.textContent = storedName;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const msgInput = document.getElementById("message-input");
  const msg = msgInput.value;

  if (msg === "") {
    alert("Message input is empty");
    return;
  }
  //displayMessage(msg);
  socket.emit("send-message", storedName, msg);
  msgInput.value = "";
});

function displayMessage(username, msg) {
  const chat = document.querySelector(".chat");
  const message = document.createElement("div");
  message.classList.add("msg");
  message.textContent = `${username}: ${msg}`;
  chat.appendChild(message);
}
