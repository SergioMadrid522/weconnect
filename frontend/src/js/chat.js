const form = document.getElementById("chat-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const chat = document.querySelector(".chat");
  //const userName = document.getElementById("user-name");

  const message = document.createElement("div");
  message.classList.add("msg");

  const msg = document.getElementById("message-input").value;

  if (msg === "") {
    alert("msg empty");
    return;
  }
  //message.innerHTML = `${userName}: ${msg}`;
  message.innerHTML = msg;
  chat.appendChild(message);
});
