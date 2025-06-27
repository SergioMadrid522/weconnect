const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Error");
      return;
    }

    setTimeout(() => {
      window.location.href = "src/chat/chat.html";
    }, 1500);
  } catch (error) {
    console.error("error: ", error);
  }
});
