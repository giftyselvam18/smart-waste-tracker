import "./UserDashboard.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function Dashboard() {
  return (
        <>
    <FeatureTopBar dashboardPath="/UserDashboard" />
    <div className="content">
      <h2>Dashboard</h2>

      <div className="cards">
        <div className="card">
          <h3>12</h3>
          <p>Total Requests</p>
        </div>

        <div className="card">
          <h3>3</h3>
          <p>Pending</p>
        </div>

        <div className="card">
          <h3>9</h3>
          <p>Completed</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;

