import { successAlert, errorAlert } from "../sweet-alert/alerts.js";

const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usernameInput = document.getElementById("username-input");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !email || !password) {
    errorAlert("Por favor llena todos los campos.");
    if (!username) usernameInput.style.border = "1px solid red";
    if (!email) emailInput.style.border = "1px solid red";
    if (!password) passwordInput.style.border = "1px solid red";
    return;
  }

  try {
    const res = await fetch("https://weconnect-4on0.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      let errors = data.errors;

      if (Array.isArray(errors)) {
        errors = errors.join(", ");
      }

      errorAlert(errors || "Unknown Error");

      usernameInput.style.border = "1px solid red";
      emailInput.style.border = "1px solid red";
      passwordInput.style.border = "1px solid red";

      return;
    }

    const userName = data.user.name;

    localStorage.setItem("userName", userName);
    const link = "../chat/chat.html";

    successAlert("sign up", userName, link);
  } catch (error) {
    console.error("error: ", error);
  }
});

detectLetter();

function detectLetter() {
  const usernameInput = document.getElementById("username-input");
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  usernameInput.addEventListener("input", () => {
    usernameInput.style.border = "1px solid gainsboro";
  });
  emailInput.addEventListener("input", () => {
    emailInput.style.border = "1px solid gainsboro";
  });
  passwordInput.addEventListener("input", () => {
    passwordInput.style.border = "1px solid gainsboro";
  });
}
