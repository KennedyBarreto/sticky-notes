/* eslint-disable no-unused-vars */
import React from "react";
import "../index.css"; // Importing the shared CSS file

const Login = () => {
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
