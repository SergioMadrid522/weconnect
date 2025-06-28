const form = document.getElementById("chat-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const chat = document.querySelector(".chat");

  const message = document.createElement("div");
  message.classList.add("msg");

  const msgInput = document.getElementById("message-input");
  const msg = msgInput.value;

  if (msg === "") {
    alert("msg empty");
    return;
  }

  //message.innerHTML = `${userName}: ${msg}`;
  message.innerHTML = msg;
  chat.appendChild(message);

  //Clean the message input
  msgInput.value = "";
});
