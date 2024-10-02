/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <h1>Sign In</h1>
      </div>
      <div className="formbg">
        <div className="formbg-inner">
          <span>Sign in to your account</span>
          <form id="stripe-login" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <div className="grid">
                <label htmlFor="password">Password</label>
                <div className="reset-pass">
                  <a href="#">Forgot your password?</a>
                </div>
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                autoComplete="current-password"
              />
            </div>
            <div className="field">
              <input type="submit" name="submit" value="Continue" />
            </div>
            <div className="field">
              <Link to="/register" className="link">
                Don't have an account? Sign Up!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
