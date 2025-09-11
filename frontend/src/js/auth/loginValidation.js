import { successAlert, errorAlert } from "../sweet-alert/alerts.js";

const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    errorAlert("Por favor llena todos los campos.");
    if (!email) emailInput.style.border = "1px solid red";
    if (!password) passwordInput.style.border = "1px solid red";
    return;
  }

  try {
    const res = await fetch("http://192.168.0.5:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      let errors = data.errors;

      if (Array.isArray(errors)) {
        errors = errors.join(", ");
      }

      errorAlert(errors || "Unknown error");

      emailInput.style.border = "1px solid red";
      passwordInput.style.border = "1px solid red";

      return;
    }

    const userName = data.user.name;

    localStorage.setItem("userName", userName);
    const link = "/src/chat/chat.html";

    successAlert("login", userName, link);
  } catch (error) {
    console.error("error: ", error);
  }
});

detectLetter();

function detectLetter() {
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  emailInput.addEventListener("input", () => {
    emailInput.style.border = "1px solid gainsboro";
  });
  passwordInput.addEventListener("input", () => {
    passwordInput.style.border = "1px solid gainsboro";
  });
}
