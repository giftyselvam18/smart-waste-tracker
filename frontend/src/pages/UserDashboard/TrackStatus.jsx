import {useEffect,useState} from "react";
import axios from "axios";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";



function TrackStatus(){

const [requests,setRequests]=useState([]);


useEffect(()=>{

axios.get(
"http://localhost:5000/api/requests/myrequests"
)
.then(res=>{
setRequests(res.data);
})


},[]);



return(
<>
  <FeatureTopBar dashboardPath="/UserDashboard" />

<div>

<h2>📍 Track Status</h2>


{
requests.map((item)=>(
<div key={item._id}>

<h3>{item.wasteType}</h3>

<p>
Weight : {item.weight} kg
</p>

<p>
Status : {item.status}
</p>


</div>
))
}


</div>
</>

)

}

export default TrackStatus;