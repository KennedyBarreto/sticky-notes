/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
      toast.error("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="header">
        <h1>Sticky Notes</h1>
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
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                >
                  {showPassword ? (
                    <FaEyeSlash color="black" />
                  ) : (
                    <FaEye color="black" />
                  )}
                </button>
              </div>
            </div>
            <div className="field">
              <input type="submit" name="submit" value="Continue" />
            </div>

            <Link to="/register" className="link">
              Don't have an account? Sign Up!
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
