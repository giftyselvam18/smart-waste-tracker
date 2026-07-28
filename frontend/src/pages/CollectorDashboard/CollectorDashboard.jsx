import "./CollectorDashboard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardTopBar from "../../components/TopBar/DashboardTopBar";
import API from "../../services/api";


function CollectorDashboard() {

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);


  // Temporary Collector ID
  const collectorId = 2;



  // Fetch Assigned Pickup Requests
  const fetchAssignedRequests = async () => {

    try {

      const response = await API.get(
        `/pickups/collector/${collectorId}`
      );

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

  },[]);






  // Start Pickup

  const startPickup = async(id)=>{

    try{

      const response = await API.put(
        `/pickups/start/${id}`
      );


      alert(response.data.message);


      fetchAssignedRequests();


    }catch(error){

      console.log(error);

      alert("Start pickup failed");

    }

  };







  // Complete Pickup

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

<DashboardTopBar role="Collector"/>


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







{/* Main Content */}

<main className="collector-main">


<h1>
Waste Collector Dashboard
</h1>





{/* Cards */}

<div className="collector-cards">


<div className="collector-card">

<h2>
{requests.length}
</h2>

<p>
Total Pickups
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









{/* Table */}

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

<th>Address</th>

<th>Waste</th>

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
item.PickupRequest?.PickupAddress ||
"-"
}

</td>





<td>

{
item.PickupRequest?.WasteCategory?.CategoryName ||
"Waste"
}

</td>





<td>

{
item.PickupRequest?.Weight ||
"-"
}

Kg

</td>





<td>

{
item.PickupRequest?.PickupDate ||
"-"
}

</td>





<td>

{
item.Status
}

</td>





<td>



{/* Start Button */}

{

item.Status==="Assigned" &&

<button
onClick={()=>startPickup(
item.PickupRequest.RequestID
)}
>

🚚 Start

</button>

}






{/* Complete Button */}

{

(item.Status==="Started" ||
item.Status==="On the Way") &&


<button
onClick={()=>completePickup(
item.PickupRequest.RequestID
)}
>

✅ Complete

</button>


}





{/* Completed */}

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