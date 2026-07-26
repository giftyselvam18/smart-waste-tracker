import "./Login.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
          role,
          securityCode,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      if (user.role === "user") {
        navigate("/UserDashboard");
      } else if (user.role === "collector") {
        navigate("/CollectorDashboard");
      } else if (user.role === "admin") {
        navigate("/AdminDashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className={`login-card ${role}`}>

        {role === "user" && (
          <>
            <h1>👤 User Login</h1>
            <p className="subtitle">
              Login to report waste and track your requests.
            </p>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>

              <p className="register-text">
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
              </p>
            </form>
          </>
        )}

        {role === "collector" && (
          <>
            <h1>🚛 Waste Collector Login</h1>
            <p className="subtitle">
              Login to manage waste collection activities.
            </p>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Employee ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>
            </form>
          </>
        )}

        {role === "admin" && (
          <>
            <h1>🛡️ Admin Login</h1>
            <p className="subtitle warning">
              Authorized Personnel Only
            </p>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Admin ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Security Code"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                required
              />

              <button type="submit">Secure Login</button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default Login;