import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { API_BASE_URL } from "../../config.js";

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Failed to sign up");
    }
  };

  return (
    <div className="authPage">
      <h1>Sign Up</h1>

      <form className="authForm" onSubmit={handleSignup}>
        <div className="formRow">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formRow">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      {error && <p className="message">{error}</p>}
    </div>
  );
}

export default SignUp;
