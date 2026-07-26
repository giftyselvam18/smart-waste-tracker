import "./TopBar.css";
import { useNavigate } from "react-router-dom";

function DashboardTopBar({ role }) {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="logo">
        ♻ Smart Waste Tracker
      </div>

      <div className="topbar-right">
        <button className="topbar-btn" onClick={() => navigate("/")}>
          🏠 Home
        </button>


        <button
          className="topbar-btn logout"
          onClick={() => navigate(`/login/${role.toLowerCase()}`)}
        >
          🚪 Logout
        </button>
      </div>
    </header>
  );
}

export default DashboardTopBar;