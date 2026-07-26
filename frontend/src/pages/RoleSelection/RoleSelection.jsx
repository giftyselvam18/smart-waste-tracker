import "./RoleSelection.css";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <div className="role-container">
        <h1>Select Your Role</h1>
        <p>Choose your role to continue</p>

        <div className="role-cards">

          <div
            className="role-card"
            onClick={() => navigate("/login/user")}
          >
            <div className="role-icon">👤</div>
            <h2>User</h2>
            <p>Report waste, track pickups and recycle responsibly.</p>
          </div>

          <div
            className="role-card"
            onClick={() => navigate("/login/collector")}
          >
            <div className="role-icon">🚛</div>
            <h2>Waste Collector</h2>
            <p>Manage waste collection and update pickup status.</p>
          </div>

          <div
            className="role-card"
            onClick={() => navigate("/login/admin")}
          >
            <div className="role-icon">🛡️</div>
            <h2>Admin</h2>
            <p>Monitor users, collectors and manage the system.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RoleSelection;