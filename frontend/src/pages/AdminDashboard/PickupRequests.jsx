import { useEffect, useState } from "react";
import axios from "axios";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import "./PickupRequests.css";

function PickupRequests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/pickups")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  const handleAccept = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/pickups/${id}`,
        {
          status: "Accepted"
        }
      );

      setRequests(
        requests.map((item) =>
          item._id === id
            ? { ...item, status: "Accepted" }
            : item
        )
      );

    } catch (error) {
      console.log(error);
    }

  };


  const handleReject = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/pickup/${id}`,
        {
          status: "Rejected"
        }
      );


      setRequests(
        requests.map((item) =>
          item._id === id
            ? { ...item, status: "Rejected" }
            : item
        )
      );


    } catch (error) {
      console.log(error);
    }

  };


  return (
    <>
      <FeatureTopBar dashboardPath="/AdminDashboard" />

      <div className="pickup-container">

        <h1>🗑 Pickup Requests</h1>


        {
          requests.length === 0 ? (

            <h3>No Pickup Requests Found</h3>

          ) : (

            requests.map((request) => (

              <div className="pickup-card" key={request._id}>


                <h2>👤 {request.userName}</h2>


                <p>
                  ♻ Waste Type :
                  <b> {request.wasteType}</b>
                </p>


                <p>
                  ⚖ Weight :
                  <b> {request.weight} Kg</b>
                </p>


                <p>
                  📅 Date :
                  {request.pickupDate}
                </p>


                <p>
                  📍 Address :
                  {request.address}
                </p>


                <p>
                  Status :
                  <span>
                    {request.status}
                  </span>
                </p>


                <div>

                  <button
                    onClick={() =>
                      handleAccept(request._id)
                    }
                  >
                    Accept
                  </button>


                  <button
                    onClick={() =>
                      handleReject(request._id)
                    }
                  >
                    Reject
                  </button>


                </div>


              </div>

            ))

          )
        }


      </div>

    </>
  );
}

export default PickupRequests;