import { useEffect, useState } from "react";
import axios from "axios";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function PickupRequests(){

    const [requests, setRequests] = useState([]);


    useEffect(()=>{

        getPickupRequests();

    },[]);



    const getPickupRequests = async()=>{

        try{

            const response = await axios.get(
                "http://localhost:5000/api/pickups"
            );

            console.log(response.data);

            setRequests(response.data);

        }
        catch(error){

            console.log("Pickup Fetch Error:", error);

        }

    };



    return(
        <>

        <FeatureTopBar dashboardPath="/AdminDashboard" />

        <div>

            <h1>🗑 Pickup Requests</h1>


            {
                requests.length > 0 ?

                requests.map((pickup)=>(
                    
                    <div key={pickup.PickupID}>

                        <p>User : {pickup.UserName}</p>

                        <p>
                          Waste Type : {pickup.WasteType}
                        </p>

                        <p>
                          Status : {pickup.Status}
                        </p>


                        <button>
                            Accept
                        </button>


                        <button>
                            Reject
                        </button>


                    </div>

                ))

                :

                <p>No Pickup Found</p>

            }


        </div>

        </>
    )

}

export default PickupRequests;