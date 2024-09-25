/* eslint-disable no-unused-vars */
import React from "react";
import "../index.css"; // Importing the shared CSS file

const Register = () => {
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
