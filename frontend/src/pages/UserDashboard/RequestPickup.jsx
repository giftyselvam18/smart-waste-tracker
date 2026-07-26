import "./UserDashboard.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";


function RequestPickup() {
  return (
        <>
    <FeatureTopBar dashboardPath="/UserDashboard" />
    <div className="content">
      <h2>Request Pickup</h2>

      <form className="pickup-form">
        <input type="text" placeholder="Waste Type" />
        <input type="text" placeholder="Address" />
        <input type="date" />
        <textarea placeholder="Additional Details"></textarea>

        <button>Submit Request</button>
      </form>
    </div>
    </>
  );
}

export default RequestPickup;