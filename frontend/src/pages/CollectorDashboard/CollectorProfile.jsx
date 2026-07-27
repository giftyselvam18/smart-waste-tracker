import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import "./CollectorProfile.css";


function CollectorProfile(){

  return(
    <>

    <FeatureTopBar dashboardPath="/CollectorDashboard" />


    <div className="profile-container">


      <h1>👤 Collector Profile</h1>


      <div className="profile-card">


        <div className="profile-item">

          <h3>Name</h3>

          <p>Collector Name</p>

        </div>



        <div className="profile-item">

          <h3>📍 Area</h3>

          <p>Chennai</p>

        </div>



        <div className="profile-item">

          <h3>Status</h3>

          <p className="active-status">
            🟢 Active
          </p>

        </div>



      </div>



      <div className="stats-card">


        <div>
          <h3>📦 Total Pickups</h3>
          <h2>25</h2>
        </div>


        <div>
          <h3>✅ Completed</h3>
          <h2>20</h2>
        </div>


        <div>
          <h3>⏳ Pending</h3>
          <h2>5</h2>
        </div>


      </div>


    </div>


    </>

  );

}


export default CollectorProfile;