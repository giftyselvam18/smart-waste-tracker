import "./UserDashboard.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function TrackStatus() {
  return (
    <>
    <FeatureTopBar dashboardPath="/UserDashboard" />
    <div className="content">
      <h2>Track Status</h2>

      <div className="status-card">
        <p><strong>Request ID:</strong> #1025</p>
        <p><strong>Status:</strong> Collector Assigned</p>
        <p><strong>Collector:</strong> Arun</p>
      </div>
    </div>
    </>
  );
}

export default TrackStatus;