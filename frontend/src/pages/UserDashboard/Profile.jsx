import "./UserDashboard.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function Profile() {
  return (
        <>
    <FeatureTopBar dashboardPath="/UserDashboard" />
    <div className="content">
      <h2>Profile</h2>

      <form className="pickup-form">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Phone Number" />

        <button>Update Profile</button>
      </form>
    </div>
    </>
  );
}

export default Profile;