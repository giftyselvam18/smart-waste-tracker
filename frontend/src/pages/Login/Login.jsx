import "./Login.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const { role } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [collectorCode, setCollectorCode] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response;

      // USER LOGIN
      if (role === "user") {
        response = await API.post("/auth/login", {
          username,
          password,
          role: "user",
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "user");
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("User Login Successful");
        navigate("/UserDashboard");
      }

      // ADMIN LOGIN
      else if (role === "admin") {
        response = await API.post("/auth/login", {
          username,
          password,
          securityCode,
          role: "admin",
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "admin");

        alert("Admin Login Successful");
        navigate("/AdminDashboard");
      }

      // COLLECTOR LOGIN
      else if (role === "collector") {
        response = await API.post("/auth/login", {
          username: collectorCode,
          password,
          role: "collector",
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "collector");

        alert("Collector Login Successful");
        navigate("/CollectorDashboard");
      }
    } catch (error) {
      console.log("Login Error:", error.response);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{role?.toUpperCase()} LOGIN</h2>

        <form onSubmit={handleLogin}>
          {role === "collector" ? (
            <input
              type="text"
              placeholder="Collector Code"
              value={collectorCode}
              onChange={(e) => setCollectorCode(e.target.value)}
              required
            />
          ) : (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {role === "admin" && (
            <input
              type="text"
              placeholder="Security Code"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              required
            />
          )}

          <button type="submit">Login</button>

          <p className="register-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;