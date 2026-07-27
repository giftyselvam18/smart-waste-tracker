import "./AssignCollector.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";


function AssignCollector(){

    const { id } = useParams();

    const navigate = useNavigate();


    const [collectors,setCollectors] = useState([]);

    const [collectorId,setCollectorId] = useState("");



    useEffect(()=>{

        fetchCollectors();

    },[]);



    const fetchCollectors = async()=>{

        try{

            const response = await API.get("/collectors");

            setCollectors(response.data);


        }
        catch(error){

            console.log(error);

        }

    };





    const assignCollector = async()=>{


        if(!collectorId){

            alert("Please select collector");

            return;

        }



        try{


            await API.post(
                "/pickups/assign",
                {
                    RequestID:id,
                    CollectorID:collectorId
                }
            );



            alert("Collector Assigned Successfully");


            navigate("/admin/pickups");



        }
        catch(error){

            console.log(error);

            alert("Assignment Failed");

        }


    };




return(

<>


<FeatureTopBar dashboardPath="/AdminDashboard" />



<div className="assign-container">


<h1>
🚛 Assign Collector
</h1>



<div className="assign-card">


<h3>
Pickup Request ID : {id}
</h3>



<label>
Select Collector
</label>



<select

value={collectorId}

onChange={(e)=>setCollectorId(e.target.value)}

>


<option value="">
Select Collector
</option>



{

collectors.map((collector)=>(


<option

key={collector.CollectorID}

value={collector.CollectorID}

>

{
collector.Name
}


</option>


))


}


</select>




<button

onClick={assignCollector}

>

Assign Collector

</button>



</div>


</div>


</>


)


}


export default AssignCollector;