export function userStatus(username, status) {
  const chat = document.querySelector(".chat");
  const message = document.createElement("div");

  message.classList.add("msg");
  message.textContent = `${username} ${status}`;
  chat.appendChild(message);

  chat.scrollTop = chat.scrollHeight;
}
