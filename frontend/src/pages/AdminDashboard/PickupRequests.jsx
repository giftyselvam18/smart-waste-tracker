import "./PickupRequests.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import { useEffect, useState } from "react";
import API from "../../services/api";

function PickupRequests() {

  const [requests, setRequests] = useState([]);


  useEffect(() => {
    fetchRequests();
  }, []);



  const fetchRequests = async () => {

    try {

      const response = await API.get("/pickups/request");

      console.log(response.data);

      setRequests(response.data);


    } catch(error){

      console.error(error);

      alert("Failed to fetch pickup requests");

    }

  };



  const updateStatus = async(id,status)=>{

    try{

      await API.put(
        `/pickups/request/${id}`,
        {
          Status:status
        }
      );

      alert(`Request ${status}`);

      fetchRequests();


    }catch(error){

      console.log(error);

    }

  };



return (

<>

<FeatureTopBar dashboardPath="/AdminDashboard" />


<div className="pickup-container">


<h1>🗑 Pickup Requests</h1>



<table className="pickup-table">


<thead>

<tr>

<th>ID</th>

<th>User</th>

<th>Waste Type</th>

<th>Weight (Kg)</th>

<th>Address</th>

<th>Pickup Date</th>

<th>Pickup Time</th>

<th>Image</th>

<th>Status</th>

<th>Action</th>


</tr>

</thead>



<tbody>


{
requests.length > 0 ? (

requests.map((request)=>(


<tr key={request.RequestID}>


<td>
{request.RequestID}
</td>



<td>
{request.User?.FullName}
</td>



<td>
{request.WasteCategory?.CategoryName}
</td>



<td>
{request.Weight} Kg
</td>



<td>
{request.PickupAddress}
</td>



<td>
{request.PickupDate}
</td>



<td>
{request.PickupTime}
</td>



<td>


{
request.WasteImage ? (

<img
src={`http://localhost:5000/uploads/${request.WasteImage}`}
alt="waste"
width="80"
height="80"
/>

)

:

(
"No Image"
)

}


</td>



<td>
{request.Status}
</td>



<td>


<button
className="accept-btn"
onClick={()=>updateStatus(
request.RequestID,
"Accepted"
)}
>
Accept
</button>



<button
className="reject-btn"
onClick={()=>updateStatus(
request.RequestID,
"Rejected"
)}
>
Reject
</button>


</td>


</tr>


))


)

:

(

<tr>

<td colSpan="10">
No Pickup Requests Found
</td>

</tr>

)

}


</tbody>


</table>


</div>


</>

)

}


export default PickupRequests;