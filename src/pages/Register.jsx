import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../appwrite/config";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await account.create(crypto.randomUUID(), email, password, name);
      // await account.createEmailPasswordSession(email, password);
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-register-container">
        <form onSubmit={handleSubmit}>
          <div className="form-field-wrapper">
            <label>Name:</label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              required
              type="password"
              name="password1"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-field-wrapper">
            <label>Confirm Password:</label>
            <input
              required
              type="password"
              name="password2"
              placeholder="Confirm password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="form-field-wrapper">
            <input type="submit" value="Register" className="btn" />
          </div>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
