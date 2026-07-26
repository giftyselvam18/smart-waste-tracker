import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        ♻️ Smart Waste Tracker
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        

        <Link to="/roles">Login</Link>

        <Link to="/register">Register</Link>
        <Link to="/about">About</Link>
      </div>

    </nav>
  );
}

export default Navbar;