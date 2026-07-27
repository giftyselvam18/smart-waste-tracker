import { useEffect, useState } from "react";
import axios from "axios";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import "./PickupRequests.css";

function PickupRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadPickups();
  }, []);

  const loadPickups = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/pickups/request"
      );
      setRequests(res.data);
    } catch (error) {
      console.error("Error loading pickups:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/pickups/request/${id}`,
        {
          status: "Accepted",
        }
      );

      loadPickups();
    } catch (error) {
      console.error("Accept Error:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/pickups/request/${id}`,
        {
          status: "Rejected",
        }
      );

      loadPickups();
    } catch (error) {
      console.error("Reject Error:", error);
    }
  };

  return (
    <>
      <FeatureTopBar dashboardPath="/AdminDashboard" />

      <div className="pickup-container">
        <h1>🗑 Pickup Requests</h1>

        {requests.length === 0 ? (
          <h3>No Pickup Requests Found</h3>
        ) : (
          requests.map((request) => (
            <div className="pickup-card" key={request.RequestID || request._id}>
              <h2>👤 {request.userName || request.UserName}</h2>

              <p>
                ♻ Waste Type: <b>{request.wasteType || request.WasteType}</b>
              </p>

              <p>
                ⚖ Weight: <b>{request.weight || request.Weight} Kg</b>
              </p>

              <p>
                📅 Date: {request.pickupDate || request.PickupDate}
              </p>

              <p>
                📍 Address: {request.pickupAddress || request.PickupAddress}
              </p>

              <p>
                Status:{" "}
                <span>{request.status || request.Status}</span>
              </p>

              <div className="button-group">
                <button
                  onClick={() =>
                    handleAccept(request.RequestID || request._id)
                  }
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleReject(request.RequestID || request._id)
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PickupRequests;