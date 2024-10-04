import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../appwrite/config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const isFormValid = () => {
    return (
      name &&
      email &&
      passwordValid &&
      passwordsMatch &&
      password === confirmPassword
    );
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
    setPasswordsMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordValid || !passwordsMatch) {
      alert("Please correct the password errors before submitting.");
      return;
    }
    try {
      await account.create(crypto.randomUUID(), email, password, name);
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <h1>Sticky Notes</h1>
      </div>
      <div className="formbg">
        <div className="formbg-inner">
          <span>Create your account</span>
          <form id="stripe-login" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  minLength="8"
                  autoComplete="new-password"
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
              {password && !passwordValid && (
                <small style={{ color: "red" }}>
                  Password must be at least 8 characters long and contain a
                  symbol and an uppercase letter.
                </small>
              )}
            </div>
            <div className="field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  minLength="8"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="password-toggle"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash color="black" />
                  ) : (
                    <FaEye color="black" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <small style={{ color: "red" }}>Passwords do not match.</small>
              )}
            </div>
            <div className="field">
              <input
                type="submit"
                name="submit"
                value="Register"
                disabled={!isFormValid()}
                title={
                  isFormValid() ? "" : "Please fill in all fields correctly."
                }
              />
            </div>
            <Link to="/login" className="link">
              Already have an account? Sign In!
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
