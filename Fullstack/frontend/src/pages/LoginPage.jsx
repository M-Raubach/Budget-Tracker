import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function LoginPage() {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const result = await loginUser({ username, password });
      localStorage.setItem("userId", String(result.user.id));
      localStorage.setItem("username", result.user.username);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="auth-shell">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        {message && <p className="message error">{message}</p>}
      </form>
    </div>
  );
}
