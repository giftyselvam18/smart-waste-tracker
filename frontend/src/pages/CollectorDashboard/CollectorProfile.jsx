import { useEffect, useState } from "react";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import "./CollectorProfile.css";


function CollectorProfile(){

const [collector,setCollector] = useState(null);


useEffect(()=>{

const data = JSON.parse(
localStorage.getItem("collector")
);

setCollector(data);


},[]);



return(

<>

<FeatureTopBar dashboardPath="/CollectorDashboard"/>


<div className="profile-container">


<h1>
👤 Collector Profile
</h1>



{
collector ?

<div className="profile-card">


<h2>
🚛 {collector.CollectorName}
</h2>


<div className="profile-details">


<p>
<b>Collector Code :</b>
{collector.CollectorCode}
</p>


<p>
<b>Phone :</b>
{collector.Phone}
</p>


<p>
<b>Vehicle Number :</b>
{collector.VehicleNumber}
</p>


<p>
<b>Area :</b>
{collector.Area}
</p>


<p>
<b>Status :</b>
{collector.Status}
</p>


</div>


</div>


:

<h3>
No Collector Data Found
</h3>


}


</div>


</>

);


}


export default CollectorProfile;