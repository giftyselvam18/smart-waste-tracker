import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>
        <p>Register to Smart Waste Tracker</p>

        <form>

          <input
            type="text"
            placeholder="Full Name"
          />
          <input
            type="tel"
            placeholder="Phone Number"
          />

          <input
            type="text"
            placeholder="Address"
          />

          <input
            type="password"
            placeholder="Password"
          />
          <button type="submit">
            Register
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;