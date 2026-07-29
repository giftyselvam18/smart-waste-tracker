import "./CollectorDashboard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardTopBar from "../../components/TopBar/DashboardTopBar";
import API from "../../services/api";


function CollectorDashboard() {


  const navigate = useNavigate();


  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);


  const collectorId = 2;



  // ==========================
  // Fetch Assigned Pickups
  // ==========================

  const fetchAssignedRequests = async () => {

    try {

      const response = await API.get(
        `/pickups/collector/${collectorId}`
      );


      console.log("Collector Data:", response.data);


      setRequests(response.data);


    } catch(error) {

      console.log(
        "Error fetching collector requests",
        error
      );

    } finally {

      setLoading(false);

    }

  };




  useEffect(()=>{

    fetchAssignedRequests();

  }, []);






  // ==========================
  // Start Pickup
  // ==========================
   const startPickup = async(id)=>{

  try{

    const response = await API.put(
      `/pickups/start/${id}`
    );


    localStorage.setItem(
      "activePickupId",
      id
    );


    alert(response.data.message);


    navigate("/collector/map");


  }catch(error){

    console.log(error);

    alert("Start pickup failed");

  }

};
  



  // ==========================
  // Complete Pickup
  // ==========================

  const completePickup = async(id)=>{

    try{

      const response = await API.put(
        `/pickups/complete/${id}`
      );


      alert(response.data.message);


      fetchAssignedRequests();


    }catch(error){

      console.log(error);

      alert("Pickup completion failed");

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




<li onClick={()=>navigate("/collector/map")}>
📍 Route Map
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



{
loading ?

<h3>
Loading...
</h3>


:

<table>


<thead>

<tr>

<th>User</th>
<th>Location</th>
<th>Waste Type</th>
<th>Weight</th>
<th>Date</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>




<tbody>


{

requests.length > 0 ?

requests.map((item)=>(


<tr key={item.AssignmentID}>


<td>

{
item.PickupRequest?.User?.FullName ||
"User"
}

</td>



<td>

{
 item.PickupRequest?.pickupAddress ||
 "-"
}

</td>




<td>

{
item.PickupRequest?.WasteCategory?.CategoryName ||
item.PickupRequest?.WasteType ||
"Waste"
}

</td>




<td>

{
 item.PickupRequest?.weight ||
 "-"
}

Kg




</td>




<td>

{
 item.PickupRequest?.pickupDate ||
 "-"
}
</td>




<td>

{
item.Status
}

</td>





<td>


{

item.Status==="Assigned" &&

<button
onClick={()=>startPickup(item.RequestID)}
>

🚚 Start

</button>

}




{

item.Status==="Started" &&

<button
onClick={()=>completePickup(item.RequestID)}
>

✅ Complete

</button>

}





{

item.Status==="Completed" &&

<span>
✔ Done
</span>

}


</td>




</tr>


))


:

<tr>

<td colSpan="7">

No Assigned Pickup Requests

</td>

</tr>


}



</tbody>


</table>


}


</div>



</main>



</div>


</>

  );

}


export default CollectorDashboard;