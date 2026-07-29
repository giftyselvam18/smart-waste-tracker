import { useEffect, useState } from "react";
import API from "../../services/api";
import "./TrackStatus.css";

function TrackStatus() {

  const [pickups, setPickups] = useState([]);


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));


    if (user) {

      API.get(`/pickups/user/${user.id}`)
        .then((res) => {

          console.log("TRACK DATA:", res.data);

          setPickups(res.data);

        })
        .catch((err) => {

          console.log("Track Status Error:", err);

        });

    }

  }, []);



  const getStatusClass = (status) => {

    if (status === "Completed")
      return "completed";


    if (status === "Assigned")
      return "assigned";


    if (status === "In Progress")
      return "progress";


    return "pending";

  };



  return (

    <div className="track-container">


      <h2>
        Track Pickup Status
      </h2>



      {
        pickups.length === 0 ?


        (
          <p>
            No Pickup Requests Found
          </p>
        )


        :


        pickups.map((item) => (


          <div
            className="status-card"
            key={item.RequestID}
          >


            <h3>
              {item.WasteType}
            </h3>



            <p>
              Weight : {item.Weight || item.weight} Kg
            </p>



            <p>
              Pickup Date : {item.PickupDate || item.pickupDate}
            </p>



            <p>
              Pickup Time : {item.PickupTime || item.pickupTime}
            </p>



            <p>
              Address : {item.PickupAddress || item.pickupAddress}
            </p>



            {
              item.WasteCategory &&

              <p>
                Category : {item.WasteCategory.CategoryName}
              </p>

            }



            <div className="status">

              Status :

              <span className={getStatusClass(item.Status)}>

                {item.Status}

              </span>


            </div>



          </div>


        ))

      }



    </div>

  );

}


export default TrackStatus;