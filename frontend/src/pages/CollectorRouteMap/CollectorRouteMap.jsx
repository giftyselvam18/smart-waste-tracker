import "./CollectorRouteMap.css";

import { useEffect, useState } from "react";
import API from "../../services/api";


function CollectorRouteMap() {


  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);


  // Temporary Collector ID
  const collectorId = 2;



  useEffect(()=>{

    fetchPickupLocation();

  },[]);




  const fetchPickupLocation = async()=>{

    try{

      const response = await API.get(
        `/pickups/collector/${collectorId}`
      );


      const pickup = response.data[0];


      if(
        pickup &&
        pickup.PickupRequest
      ){

        setAddress(
          pickup.PickupRequest.pickupAddress
        );

      }


    }catch(error){

      console.log(
        "Map location error",
        error
      );

    }
    finally{

      setLoading(false);

    }

  };






  const openMap = ()=>{


    if(address){


      const url =
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;


      window.open(
        url,
        "_blank"
      );


    }


  };





  return (

    <div className="route-map-page">


      <h1>
        📍 Collector Route Map
      </h1>



      {

      loading ?

      <h3>
        Loading Location...
      </h3>


      :

      <>

      <div className="location-card">


        <h2>
          Pickup Location
        </h2>


        <p>
          📌 {address || "No Address Found"}
        </p>



        {

        address &&

        <button
        onClick={openMap}
        >
          🗺 Open Google Map
        </button>

        }


      </div>


      </>


      }



    </div>

  );


}


export default CollectorRouteMap;