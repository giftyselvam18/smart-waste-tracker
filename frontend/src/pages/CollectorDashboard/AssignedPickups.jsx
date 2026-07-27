import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import "./AssignedPickups.css";

function AssignedPickups() {

  const [pickups, setPickups] = useState([]);

  const collectorId = 1;

  const navigate = useNavigate();

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/collectors/pickups/${collectorId}`
      );

      console.log("Pickup Response:", response.data);

      setPickups(response.data);

    } catch (error) {

      console.log("Pickup Fetch Error:", error);

    }

  };

  const startPickup = async (requestId) => {

    try {

      await axios.put(
        `http://localhost:5000/api/collectors/startPickup/${requestId}`
      );

      alert("Pickup Started Successfully 🚚");

      fetchPickups();

    } catch (error) {

      console.log(error);

      alert("Failed to Start Pickup");

    }

  };

  return (

    <>

      <FeatureTopBar dashboardPath="/CollectorDashboard" />

      <div className="assigned-container">

        <h1>📋 Assigned Pickups</h1>

        <h3>Total Pickups: {pickups.length}</h3>

        <div className="pickup-grid">

          {pickups.length === 0 ? (

            <h2>No Assigned Pickups Found</h2>

          ) : (

            pickups.map((item) => (

              <div
                className="pickup-card"
                key={item.AssignmentID}
              >

                <h2>📦 Pickup #{item.RequestID}</h2>

                <div className="pickup-info">

                  <span>
                    👤 <b>User ID:</b>{" "}
                    {item.PickupRequest?.UserID || "N/A"}
                  </span>

                  <span>
                    📍 <b>Address:</b>{" "}
                    {item.PickupRequest?.PickupAddress || "No Address"}
                  </span>

                  <span>
                    📅 <b>Date:</b>{" "}
                    {item.PickupRequest?.PickupDate || "No Date"}
                  </span>

                  <span>
                    ♻ <b>Waste:</b>{" "}
                    {item.PickupRequest?.WasteCategory?.CategoryName || "N/A"}
                  </span>

                  <span>
                    📝 <b>Description:</b>{" "}
                    {item.PickupRequest?.Description || "No Description"}
                  </span>

                  <span className="status">
                    {item.PickupRequest?.Status || "Assigned"}
                  </span>

                </div>

                {item.PickupRequest?.Status === "Assigned" ? (

                  <button
                    onClick={() => startPickup(item.RequestID)}
                  >
                    🚚 Start Pickup
                  </button>

                ) : item.PickupRequest?.Status === "In Progress" ? (

                  <button
                    onClick={() => navigate("/collector/map")}
                  >
                    📍 Open Route
                  </button>

                ) : item.PickupRequest?.Status === "Completed" ? (

                  <button disabled>
                    ✅ Completed
                  </button>

                ) : (

                  <button disabled>
                    ⏳ Pending
                  </button>

                )}

              </div>

            ))

          )}

        </div>

      </div>

    </>

  );

}

export default AssignedPickups;