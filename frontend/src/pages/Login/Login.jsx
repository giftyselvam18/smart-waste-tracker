import "./Login.css";
import { useNavigate, useParams, Link } from "react-router-dom";
function Login() {
  const { role } = useParams();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Frontend மட்டும் - Temporary Navigation
    if (role === "user") {
      navigate("/UserDashboard");
    } else if (role === "collector") {
      navigate("/CollectorDashboard");
    } else if (role === "admin") {
      navigate("/AdminDashboard");
    }
  };

  return (
    <div className="login-page">
      <div className={`login-card ${role}`}>

        {/* User Login */}
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
                required
              />

              <input
                type="password"
                placeholder="Password"
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

        {/* Collector Login */}
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
                required
              />

              <input
                type="password"
                placeholder="Password"
                required
              />

              <button type="submit">Login</button>
            </form>
          </>
        )}

        {/* Admin Login */}
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
                required
              />

              <input
                type="password"
                placeholder="Password"
                required
              />

              <input
                type="password"
                placeholder="Security Code"
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