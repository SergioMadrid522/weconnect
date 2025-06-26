const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();
  try {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) {
      throw new Error("Error");
      return;
    }
    alert("You've just signed up, enjoy the chat!");
    setTimeout(()=>{
        window.location.href = "../../"
    })
  } catch (error) {
    console.error("error: ", error);
  }
});
