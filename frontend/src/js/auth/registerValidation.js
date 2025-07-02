const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();
  try {
    const res = await fetch("http://192.168.0.12:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error");
      return;
    }
    const data = await res.json();
    localStorage.setItem("userName", data);
    alert("You've just signed up, enjoy the chat!");
    window.location.href = "../chat/chat.html";
  } catch (error) {
    console.error("error: ", error);
  }
});
