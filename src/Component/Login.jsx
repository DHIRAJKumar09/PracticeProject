import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      {/* LEFT PANEL */}
      <div className="login-left">
        <h4 className="brand">GENESIS</h4>
        <h1>Welcome Back.</h1>
        <p>Login to continue your journey with us.</p>

        <span className="footer-text">
          TERMS OF USE AND CONTRAINDICATIONS
        </span>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <h2>LOGIN</h2>

        <div className="avatar">
          <img
            src="https://i.imgur.com/1X6bY6G.png"
            alt="avatar"
          />
        </div>

        <form>
          <input
            type="email"
            placeholder="Email address"
            required
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁
            </span>
          </div>

          <a href="#" className="forgot">
            Forgot Password?
          </a>

          <button type="submit">LOGIN</button>

          <p className="signup-text">
            Don’t have an account? <a href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

