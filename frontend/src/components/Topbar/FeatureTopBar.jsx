import "./TopBar.css";
import { useNavigate } from "react-router-dom";

function FeatureTopBar({ title, dashboardPath, rolePath }) {
  const navigate = useNavigate();

  return (
    <div className="topbar">

      <div className="topbar-left">
        <button
          className="topbar-btn"
          onClick={() => navigate(dashboardPath)}
        >
          ⬅ Back to Dashboard
        </button>

        <h2>{title}</h2>
      </div>

      <div className="topbar-right">
        <button
          className="topbar-btn"
          onClick={() => navigate("/")}
        >
          🏠 Home
        </button>


        <button
          className="topbar-btn logout"
          onClick={() => navigate(rolePath)}
        >
          🚪 Logout
        </button>
      </div>

    </div>
  );
}

export default FeatureTopBar;