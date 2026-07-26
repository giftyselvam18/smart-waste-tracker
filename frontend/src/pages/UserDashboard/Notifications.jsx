import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import "./UserDashboard.css";

function Notifications() {
  return (
        <>
    <FeatureTopBar dashboardPath="/UserDashboard" />
    <div className="content">
      <h2>Notifications</h2>

      <div className="notification">
        ✅ Your pickup request has been accepted.
      </div>

      <div className="notification">
        🚛 Collector is on the way.
      </div>
    </div>
    </>
  );
}

export default Notifications;