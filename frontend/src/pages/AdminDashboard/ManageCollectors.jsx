import "./ManageCollectors.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import { useEffect, useState } from "react";
import API from "../../services/api";


function ManageCollectors() {


  const [collectors, setCollectors] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);

  const [editCollector, setEditCollector] = useState(null);



  const [newCollector, setNewCollector] = useState({

    CollectorCode:"",
    CollectorName:"",
    Area:"",
    Phone:"",
    VehicleNumber:"",
    Password:"",
    Status:"Available"

  });




  useEffect(()=>{

    fetchCollectors();

  },[]);





  // Get Collectors

  const fetchCollectors = async()=>{

    try{


      const response = await API.get("/collectors");


      setCollectors(response.data);


    }
    catch(error){

      console.log(error);

      alert("Failed to fetch collectors");

    }

  };







  // Add Collector

  const addCollector = async()=>{


    try{


      await API.post(
        "/collectors",
        newCollector
      );



      alert("Collector Added Successfully");



      setShowAddForm(false);



      setNewCollector({

        CollectorCode:"",
        CollectorName:"",
        Area:"",
        Phone:"",
        VehicleNumber:"",
        Password:"",
        Status:"Available"

      });



      fetchCollectors();



    }
    catch(error){

      console.log(error);

      alert("Add Collector Failed");

    }


  };







  // Update Collector

  const updateCollector = async()=>{


    try{


      await API.put(

        `/collectors/${editCollector.CollectorID}`,

        editCollector

      );



      alert("Collector Updated Successfully");



      setEditCollector(null);



      fetchCollectors();



    }
    catch(error){

      console.log(error);

      alert("Update Failed");

    }


  };







  // Delete Collector

  const handleDelete = async(id)=>{


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this collector?"
    );



    if(!confirmDelete)
      return;



    try{


      await API.delete(
        `/collectors/${id}`
      );



      alert("Collector Deleted Successfully");


      fetchCollectors();



    }
    catch(error){

      console.log(error);

      alert("Delete Failed");

    }


  };







return (

<>


<FeatureTopBar dashboardPath="/AdminDashboard" />



<div className="manage-container">



<h1>
🚛 Manage Collectors
</h1>





<button

className="add-btn"

onClick={()=>setShowAddForm(true)}

>

➕ Add Collector

</button>








{/* Add Collector Form */}


{

showAddForm &&


<div className="edit-form">


<h2>
Add Collector
</h2>




<input

placeholder="Collector Code"

value={newCollector.CollectorCode}

onChange={(e)=>

setNewCollector({

...newCollector,

CollectorCode:e.target.value

})

}

/>




<input

placeholder="Collector Name"

value={newCollector.CollectorName}

onChange={(e)=>

setNewCollector({

...newCollector,

CollectorName:e.target.value

})

}

/>





<input

placeholder="Area"

value={newCollector.Area}

onChange={(e)=>

setNewCollector({

...newCollector,

Area:e.target.value

})

}

/>





<input

placeholder="Phone"

value={newCollector.Phone}

onChange={(e)=>

setNewCollector({

...newCollector,

Phone:e.target.value

})

}

/>





<input

placeholder="Vehicle Number"

value={newCollector.VehicleNumber}

onChange={(e)=>

setNewCollector({

...newCollector,

VehicleNumber:e.target.value

})

}

/>





<input

placeholder="Password"

type="password"

value={newCollector.Password}

onChange={(e)=>

setNewCollector({

...newCollector,

Password:e.target.value

})

}

/>




<button

className="update-btn"

onClick={addCollector}

>

Save Collector

</button>



<button

className="cancel-btn"

onClick={()=>setShowAddForm(false)}

>

Cancel

</button>



</div>


}









{/* Edit Form */}


{

editCollector &&


<div className="edit-form">


<h2>
Edit Collector
</h2>




<input

value={editCollector.CollectorName}

onChange={(e)=>

setEditCollector({

...editCollector,

CollectorName:e.target.value

})

}

/>




<input

value={editCollector.Area}

onChange={(e)=>

setEditCollector({

...editCollector,

Area:e.target.value

})

}

/>




<input

value={editCollector.Phone}

onChange={(e)=>

setEditCollector({

...editCollector,

Phone:e.target.value

})

}

/>




<input

value={editCollector.VehicleNumber}

onChange={(e)=>

setEditCollector({

...editCollector,

VehicleNumber:e.target.value

})

}

/>




<button

className="update-btn"

onClick={updateCollector}

>

Update

</button>




<button

className="cancel-btn"

onClick={()=>setEditCollector(null)}

>

Cancel

</button>



</div>


}









<table className="collector-table">


<thead>

<tr>

<th>ID</th>

<th>Collector Code</th>

<th>Name</th>

<th>Area</th>

<th>Phone</th>

<th>Vehicle</th>

<th>Status</th>

<th>Action</th>


</tr>


</thead>





<tbody>


{

collectors.length > 0 ?


collectors.map((collector)=>(


<tr key={collector.CollectorID}>


<td>
{collector.CollectorID}
</td>



<td>
{collector.CollectorCode}
</td>



<td>
{collector.CollectorName}
</td>



<td>
{collector.Area}
</td>



<td>
{collector.Phone}
</td>



<td>
{collector.VehicleNumber}
</td>



<td>
{collector.Status}
</td>



<td>



<button

className="edit-btn"

onClick={()=>setEditCollector(collector)}

>

Edit

</button>





<button

className="delete-btn"

onClick={()=>handleDelete(collector.CollectorID)}

>

Delete

</button>



</td>



</tr>


))


:

<tr>

<td colSpan="8">

No Collectors Found

</td>

</tr>


}



</tbody>


</table>




</div>



</>


);


}


export default ManageCollectors;