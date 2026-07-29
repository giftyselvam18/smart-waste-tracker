import "./RouteMap.css";

import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import API from "../../services/api";



// Fix marker icon issue

delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

});





function RouteMap(){


const [address,setAddress] = useState("");

const [position,setPosition] = useState(null);


// Logged collector

const collectorId = 2;





useEffect(()=>{

 fetchLocation();

},[]);








const fetchLocation = async()=>{


try{


// Get started pickup id

const activePickupId =
localStorage.getItem("activePickupId");



console.log(
"Active Pickup ID:",
activePickupId
);




const response = await API.get(

 `/pickups/collector/${collectorId}`

);



console.log(
"Collector Pickup Data:",
response.data
);




// Find started pickup only

const pickup = response.data.find(

(item)=>

String(item.RequestID) ===
String(activePickupId)

);




console.log(
"Selected Pickup:",
pickup
);





if(pickup?.PickupRequest){



const userAddress =

pickup.PickupRequest.pickupAddress ||

pickup.PickupRequest.PickupAddress;



setAddress(userAddress);





// Convert address to latitude longitude


const geoResponse = await fetch(

`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(userAddress)}`

);



const geoData = await geoResponse.json();




if(geoData.length > 0){


setPosition([

parseFloat(geoData[0].lat),

parseFloat(geoData[0].lon)

]);


}



}



}catch(error){


console.log(
"Map Error:",
error
);


}


};







return(


<div className="route-map-page">



<h1>
📍 Collector Route Map
</h1>




<h3>
Pickup Address : {address || "No Address Found"}
</h3>





{

position ?



<MapContainer

center={position}

zoom={15}

style={{

height:"500px",

width:"100%"

}}

>



<TileLayer

url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

/>




<Marker position={position}>


<Popup>

Pickup Location

<br/>

{address}

</Popup>


</Marker>



</MapContainer>




:


<h3>
Loading Map...
</h3>


}



</div>


);


}



export default RouteMap;