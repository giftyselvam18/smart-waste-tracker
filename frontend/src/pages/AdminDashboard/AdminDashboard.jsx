import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import DashboardTopBar from "../../components/TopBar/DashboardTopBar";
import { useEffect, useState } from "react";
import API from "../../services/api";


function AdminDashboard() {

  const navigate = useNavigate();


  const [requests,setRequests] = useState([]);

  const [stats,setStats] = useState({
    users:0,
    collectors:0,
    pending:0,
    completed:0
  });



  useEffect(()=>{

    fetchRequests();

  },[]);



  const fetchRequests = async()=>{

    try{

      const response =
      await API.get("/pickups/request");


      setRequests(response.data);



      // statistics calculation

      const pending =
      response.data.filter(
        item=>item.Status==="Pending"
      ).length;


      const completed =
      response.data.filter(
        item=>item.Status==="Completed"
      ).length;



      setStats({

        users:
        new Set(
          response.data.map(
            item=>item.UserID
          )
        ).size,


        collectors:10,

        pending,

        completed

      });



    }
    catch(error){

      console.log(
        "Error fetching dashboard data",
        error
      );

    }

  };



return (

<>

<DashboardTopBar role="Admin" />


<div className="AdminDashboard">


{/* LEFT SIDEBAR */}

<aside className="admin-sidebar">


<h2>
♻ Smart Waste
</h2>


<ul>


<li onClick={()=>navigate("/AdminDashboard")}>
📊 Dashboard
</li>


<li onClick={()=>navigate("/admin/users")}>
👥 Manage Users
</li>


<li onClick={()=>navigate("/admin/collectors")}>
🚛 Manage Collectors
</li>


<li onClick={()=>navigate("/admin/pickups")}>
🗑 Pickup Requests
</li>


<li onClick={()=>navigate("/admin/areas")}>
📍 Collection Areas
</li>


</ul>


</aside>





{/* MAIN CONTENT */}

<main className="admin-main">


<h1>
Admin Dashboard
</h1>


<p className="dashboard-title">
Manage users, collectors and waste pickup activities
</p>





{/* STAT CARDS */}


<div className="stats">


<div className="stat-card">

<h2>
{stats.users}
</h2>

<p>
Total Users
</p>

</div>



<div className="stat-card">

<h2>
{stats.collectors}
</h2>

<p>
Collectors
</p>

</div>




<div className="stat-card">

<h2>
{stats.pending}
</h2>

<p>
Pending Requests
</p>

</div>





<div className="stat-card">

<h2>
{stats.completed}
</h2>

<p>
Completed Pickups
</p>

</div>



</div>






{/* RECENT REQUESTS */}



<div className="requests">


<h2>
Recent Pickup Requests
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


requests.slice(0,5).map((request)=>(


<tr key={request.RequestID}>


<td>

{
request.User?.FullName ||
"User"
}

</td>



<td>

{
request.PickupAddress
}

</td>




<td>

{
request.WasteCategory?.CategoryName ||
"Waste"
}

</td>




<td>

{
request.Weight || "-"
}

Kg

</td>



<td>

{
request.PickupDate
}

</td>



<td>

{
request.Status
}

</td>



</tr>


))


:


<tr>

<td colSpan="6">

No Recent Pickup Requests

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


export default AdminDashboard;