const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();

  try {
    const res = await fetch("http://192.168.0.12:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error");
    }

    const data = await res.json();
    localStorage.setItem("userName", data.user.name);

    window.location.href = "src/chat/chat.html";
  } catch (error) {
    console.error("error: ", error);
  }
});
