import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import "./AssignedPickups.css";


function AssignedPickups() {


  const [pickups, setPickups] = useState([]);

  const navigate = useNavigate();



  const collector = JSON.parse(
    localStorage.getItem("collector")
  );

  const collectorId = collector?.CollectorID;




  useEffect(()=>{

    if(collectorId){

      fetchPickups();

    }

  },[collectorId]);





  const fetchPickups = async()=>{

    try{


      const response = await axios.get(

        `http://localhost:5000/api/collectors/pickups/${collectorId}`

      );


      setPickups(response.data);



    }catch(error){

      console.log(
        "Pickup Fetch Error:",
        error
      );

      alert(
        "Failed to load assigned pickups"
      );

    }

  };








  // Start Pickup

  const startPickup = async(requestId)=>{


    try{


      await axios.put(

        `http://localhost:5000/api/collectors/startPickup/${requestId}`

      );



      localStorage.setItem(
        "activePickupId",
        requestId
      );



      alert(
        "Pickup Started Successfully"
      );



      navigate("/collector/map");



    }catch(error){

      console.log(error);

      alert(
        "Failed to Start Pickup"
      );

    }


  };







  // Complete Pickup

  const completePickup = async(requestId)=>{


    try{


      await axios.put(

        `http://localhost:5000/api/pickups/complete/${requestId}`

      );



      alert(
        "Pickup Completed Successfully"
      );



      navigate("/CollectorDashboard");



    }catch(error){


      console.log(
        "Complete Error:",
        error
      );


      alert(
        "Failed to Complete Pickup"
      );


    }


  };








return (

<>


<FeatureTopBar dashboardPath="/CollectorDashboard" />



<div className="assigned-container">


<h1>
📋 Assigned Pickups
</h1>



<h3>
Total Pickups : {pickups.length}
</h3>





<div className="pickup-grid">


{

pickups.length === 0 ?


<h2>
No Assigned Pickups Found
</h2>



:


pickups.map((item)=>(



<div
className="pickup-card"
key={item.AssignmentID}
>



<h2>
📦 Pickup #{item.RequestID}
</h2>




<div className="pickup-info">



<span>
<b>User :</b>{" "}
{
item.PickupRequest?.User?.FullName || "-"
}
</span>



<span>
<b>Address :</b>{" "}
{
item.PickupRequest?.pickupAddress ||
item.PickupRequest?.PickupAddress ||
"-"
}
</span>



<span>
<b>Date :</b>{" "}
{
item.PickupRequest?.pickupDate ||
item.PickupRequest?.PickupDate ||
"-"
}
</span>



<span>
<b>Time :</b>{" "}
{
item.PickupRequest?.pickupTime ||
item.PickupRequest?.PickupTime ||
"-"
}
</span>



<span>
<b>Waste :</b>{" "}
{
item.PickupRequest?.wasteType ||
item.PickupRequest?.WasteType ||
"-"
}
</span>



<span>
<b>Weight :</b>{" "}
{
item.PickupRequest?.weight ||
item.PickupRequest?.Weight ||
"-"
}
 Kg
</span>



<span>
<b>Description :</b>{" "}
{
item.PickupRequest?.Description ||
"-"
}
</span>




<span className="status">

<b>Status :</b>{" "}
{
item.Status ||
item.PickupRequest?.Status
}

</span>



</div>







{

(item.Status === "Assigned" ||
item.PickupRequest?.Status === "Assigned") &&


<button

onClick={()=>
startPickup(item.RequestID)
}

>

🚚 Start Pickup

</button>


}








{

(item.Status === "Started" ||
item.PickupRequest?.Status === "Started") &&


<button

onClick={()=>
navigate("/collector/map")
}

>

📍 Open Route

</button>


}









{

(item.Status === "Started" ||
item.PickupRequest?.Status === "Started") &&


<button

onClick={()=>
completePickup(item.RequestID)
}

>

✅ Complete Pickup

</button>


}









{

(item.Status === "Completed" ||
item.PickupRequest?.Status === "Completed") &&


<button disabled>

✅ Completed

</button>


}



</div>


))


}



</div>


</div>


</>

);


}


export default AssignedPickups;