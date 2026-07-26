
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
function PickupRequests(){

return(
    <>
<FeatureTopBar dashboardPath="/AdminDashboard" />

<div>

<h1>🗑 Pickup Requests</h1>

<div>
<p>User : Gifty</p>
<p>Waste Type : Plastic</p>
<p>Status : Pending</p>

<button>Accept</button>
<button>Reject</button>

</div>

</div>
</>
)

}

export default PickupRequests;