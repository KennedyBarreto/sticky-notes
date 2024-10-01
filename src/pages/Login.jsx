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
      // Redirect to the main page after successful login
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error (e.g., show an error message to the user)
    }
  };
  return (
    <div className="container">
      <div className="login-register-container">
        <form onSubmit={handleSubmit}>
          <div className="form-field-wrapper">
            <label>Email:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field-wrapper">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-field-wrapper">
            <input type="submit" value="Login" className="btn" />
          </div>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
