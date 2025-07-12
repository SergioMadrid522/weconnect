import { successAlert, errorAlert } from "../sweet-alert/alerts.js";
//import { userSignUpValidation } from "../../../../backend/validations/user.validation.js";

const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();

  //const errors = userSignUpValidation(req.body);

  /* if (errors.length > 0) {
    return res.status(400).json({ errors });
  } */
  try {
    const res = await fetch("http://192.168.0.2:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      const error = errorData.message;

      errorAlert(error || "Unknown Error");
      return;
    }

    const data = await res.json();
    const userName = data.user.name;

    localStorage.setItem("userName", userName);
    const link = "../chat/chat.html";
    successAlert("sign up", userName, link);
  } catch (error) {
    console.error("error: ", error);
  }
});
