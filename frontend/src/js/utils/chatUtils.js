import { logoutAlert } from "../sweet-alert/alerts.js";

const storedName = localStorage.getItem("userName");

export function displayMessage(username, msg) {
  const chat = document.querySelector(".chat");
  const message = document.createElement("div");

  message.classList.add("msg");
  message.textContent = `${username}: ${msg}`;
  chat.appendChild(message);

  chat.scrollTop = chat.scrollHeight;
}

export function logout() {
  const logout = document.getElementById("logout");

  logout.addEventListener("click", () => {
    //localStorage.removeItem("userName");
    logoutAlert(storedName);
  });
}

export function userStatus(username, status) {
  const chat = document.querySelector(".chat");
  const message = document.createElement("div");

  message.classList.add("msg");
  message.textContent = `${username} ${status}`;
  chat.appendChild(message);

  chat.scrollTop = chat.scrollHeight;
}
