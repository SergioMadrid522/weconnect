import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert("Sign up successful");
      navigate("/chat");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main-content">
      <div className="logo">
        <img src={logoImage} alt="WeConnnect Logo" />
        <div className="catchphrase">
          <h3>Talk. Share. Connect.</h3>
        </div>
      </div>
      <div className="login-wrap">
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="userName-input"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username?.message && <p>{errors.username.message}</p>}
          <input
            type="email"
            id="email-input"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email?.message && <p>{errors.email.message}</p>}
          <input
            type="password"
            id="password-input"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password?.message && <p>{errors.password.message}</p>}
          <button type="submit">Sign up</button>
        </form>
        <div className="more-info">
          <p>
            Already have an account? <a href="/main">Login here!</a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Register;
