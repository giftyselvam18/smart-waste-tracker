
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
function AssignedPickups(){

return(
    <>
<FeatureTopBar dashboardPath="/CollectorDashboard" />
    

<div>
<h1>📋 Assigned Pickups</h1>

<p>Area: Chennai North</p>
<p>Waste Type: Plastic</p>
<p>Status: Pending</p>

<button>Start Pickup</button>

</div>
</>
)

}

export default AssignedPickups;