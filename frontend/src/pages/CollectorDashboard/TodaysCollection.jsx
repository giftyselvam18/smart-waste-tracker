import { useEffect, useState } from "react";
import axios from "axios";

import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import "./TodaysCollection.css";


function TodaysCollection() {


  const [collection, setCollection] = useState({

    totalCollection: 0,

    completed: 0,

    pending: 0,

    collections: []

  });




  useEffect(()=>{

    fetchTodayCollection();

  },[]);







  const fetchTodayCollection = async()=>{


    try{


      const response = await axios.get(

        "http://localhost:5000/api/pickups/today-collection"

      );



      console.log(
        "Today Collection Data:",
        response.data
      );



      setCollection({

        totalCollection:
          response.data.totalCollection || 0,


        completed:
          response.data.completed || 0,


        pending:
          response.data.pending || 0,


        collections:
          response.data.collections || []

      });



    }catch(error){


      console.log(
        "Today Collection Error:",
        error
      );


    }


  };








  const completionRate =

    collection.totalCollection > 0

    ?

    Math.round(

      (collection.completed /
      collection.totalCollection) * 100

    )

    :

    0;







return (

<>


<FeatureTopBar dashboardPath="/CollectorDashboard" />



<div className="collection-container">



<h1>
🚛 Today's Collection
</h1>





<div className="collection-cards">



<div className="collection-card">

<h3>
Total Pickup
</h3>

<h2>
{collection.totalCollection}
</h2>

</div>





<div className="collection-card completed">

<h3>
Completed
</h3>

<h2>
{collection.completed}
</h2>

</div>





<div className="collection-card pending">

<h3>
Pending
</h3>

<h2>
{collection.pending}
</h2>

</div>



</div>









<div className="progress-section">


<h3>
Completion Rate
</h3>



<div className="progress-bar">


<div

className="progress-fill"

style={{

width:`${completionRate}%`

}}

>

{completionRate}%

</div>



</div>


</div>









<div className="pickup-details">


<h2>
📋 Today's Pickup Details
</h2>





<table>


<thead>

<tr>

<th>
Address
</th>

<th>
Category
</th>

<th>
Weight
</th>

<th>
Status
</th>


</tr>

</thead>





<tbody>



{

collection.collections.length > 0 ?


collection.collections.map((item)=>(


<tr key={item.RequestID}>


<td>

{
item.PickupAddress ||
item.pickupAddress ||
"-"
}

</td>



<td>

{
item.WasteCategory?.CategoryName ||
item.WasteType ||
"-"
}

</td>



<td>

{
item.Weight ||
item.weight ||
0
}

Kg

</td>



<td>

{
item.Status ||
"-"
}

</td>



</tr>



))


:



<tr>

<td colSpan="4">

No Today's Collection Found

</td>


</tr>


}



</tbody>



</table>



</div>





</div>


</>


);


}



export default TodaysCollection;