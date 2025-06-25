import { logoImage } from "../data";
function LoginContent() {
  return (
    <div className="main-content">
      <div className="logo">
        <img src={logoImage} alt="WeConnnect Logo" />
        <div className="catchphrase">
          <h3>Talk. Share. Connect.</h3>
        </div>
      </div>
      <div className="login-wrap">
        <form id="login-form">
          <input type="email" id="email-input" placeholder="Email" required />
          <input
            type="password"
            id="password-input"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="more-info">
          <a href="#">Forgot password?</a>
          <p>
            Don't you have an account? <a href="#">Register here!</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginContent;
