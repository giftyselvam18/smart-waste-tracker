
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
function TodaysCollection(){

return(
    <>
<FeatureTopBar dashboardPath="/CollectorDashboard" />
<div>

<h1>🚛 Today's Collection</h1>

<h3>Total Pickup: 15</h3>
<h3>Completed: 10</h3>
<h3>Pending: 5</h3>

</div>
</>
)

}

export default TodaysCollection;