import "./CollectorDashboard.css";
import { useNavigate } from "react-router-dom";
import DashboardTopBar from "../../components/TopBar/DashboardTopBar";
import { useEffect, useState } from "react";
import API from "../../services/api";


function CollectorDashboard() {


  const navigate = useNavigate();


  const [requests,setRequests] = useState([]);



  // Temporary collector id
  // Later login user id use pannalam
  const collectorId = 2;



  useEffect(()=>{

    fetchAssignedRequests();

  },[]);




  const fetchAssignedRequests = async()=>{

    try{


      const response = await API.get(
        `/pickups/collector/${collectorId}`
      );


      console.log(response.data);


      setRequests(response.data);



    }
    catch(error){

      console.log(
        "Error fetching collector requests",
        error
      );

    }

  };





return (

<>


<DashboardTopBar role="Collector" />



<div className="collector-dashboard">



{/* Sidebar */}

<aside className="collector-sidebar">


<h2>
♻ Smart Waste
</h2>



<ul>


<li onClick={()=>navigate("/CollectorDashboard")}>
🏠 Dashboard
</li>


<li onClick={()=>navigate("/collector/pickups")}>
📋 Assigned Pickups
</li>


<li onClick={()=>navigate("/collector/today")}>
🚛 Today's Collection
</li>


<li onClick={()=>navigate("/collector/map")}>
📍 Route Map
</li>


<li onClick={()=>navigate("/collector/history")}>
📜 Collection History
</li>


<li onClick={()=>navigate("/collector/profile")}>
👤 Profile
</li>


<li onClick={()=>navigate("/login/collector")}>
🚪 Logout
</li>


</ul>


</aside>





{/* Main */}

<main className="collector-main">


<h1>
Waste Collector Dashboard
</h1>




<div className="collector-cards">


<div className="collector-card">

<h2>
{requests.length}
</h2>

<p>
Assigned Pickups
</p>

</div>



<div className="collector-card">

<h2>
{
requests.filter(
item=>item.Status==="Assigned"
).length
}
</h2>

<p>
Pending
</p>

</div>



<div className="collector-card">

<h2>
{
requests.filter(
item=>item.Status==="Completed"
).length
}
</h2>

<p>
Completed
</p>

</div>



</div>







<div className="pickup-table">


<h2>
Assigned Pickup Requests
</h2>




<table>


<thead>

<tr>

<th>
User
</th>


<th>
Location
</th>


<th>
Waste Type
</th>


<th>
Weight
</th>


<th>
Date
</th>


<th>
Status
</th>


</tr>


</thead>





<tbody>


{


requests.length > 0 ?


requests.map((item)=>(


<tr key={item.AssignmentID}>


<td>

{
item.PickupRequest?.User?.FullName || "User"
}

</td>




<td>

{
item.PickupRequest?.PickupAddress
}

</td>





<td>

{
item.PickupRequest?.WasteCategory?.CategoryName || "Waste"
}

</td>





<td>

{
item.PickupRequest?.Weight || "-"
}

Kg

</td>





<td>

{
item.PickupRequest?.PickupDate
}

</td>





<td>

{
item.Status
}

</td>



</tr>


))


:


<tr>

<td colSpan="6">

No Assigned Pickup Requests

</td>

</tr>


}


</tbody>



</table>


</div>



</main>



</div>



</>

);


}


export default CollectorDashboard;