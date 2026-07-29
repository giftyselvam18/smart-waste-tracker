import { useNavigate } from "react-router-dom";
import "./PickupRequests.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import { useEffect, useState } from "react";
import API from "../../services/api";

function PickupRequests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await API.get("/pickups/request");

      console.log("========== PICKUP RESPONSE ==========");
      console.log(response.data);

      setRequests(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to fetch pickup requests");
    }
  };

  // Reject Request
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/pickups/request/${id}`, {
        Status: status,
      });

      alert(`Request ${status}`);
      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Failed to update request");
    }
  };

  // Accept Request
  const acceptRequest = async (id) => {
    try {
      await API.put(`/pickups/request/${id}`, {
        Status: "Accepted",
      });

      alert("Request Accepted");
      navigate(`/admin/assign/${id}`);
    } catch (error) {
      console.log(error);
      alert("Failed to accept request");
    }
  };

  return (
    <>
      <FeatureTopBar dashboardPath="/AdminDashboard" />

      <div className="pickup-container">
        <h1>🗑 Pickup Requests</h1>

        <table className="pickup-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Waste Type</th>
              <th>Weight</th>
              <th>Address</th>
              <th>Pickup Date</th>
              <th>Pickup Time</th>
              <th>Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <tr key={index}>
                  <td>{request.RequestID || request.requestId}</td>

                  <td>{request.User?.FullName || "-"}</td>

                  <td>
                    {request.WasteCategory?.CategoryName ||
                      request.wasteType ||
                      "-"}
                  </td>

                  <td>{request.Weight || request.weight || "-"} Kg</td>

                  <td>
                    {request.PickupAddress ||
                      request.pickupAddress ||
                      "-"}
                  </td>

                  <td>
                    {request.PickupDate ||
                      request.pickupDate ||
                      "-"}
                  </td>

                  <td>
                    {request.PickupTime ||
                      request.pickupTime ||
                      "-"}
                  </td>

                  <td>
                    {request.WasteImage || request.wasteImage ? (
                      <img
                        src={`http://localhost:5000/uploads/${
                          request.WasteImage || request.wasteImage
                        }`}
                        alt="Waste"
                        width="80"
                        height="80"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>{request.Status || "Pending"}</td>

                  <td>
                    <button
                      className="accept-btn"
                      onClick={() =>
                        acceptRequest(
                          request.RequestID || request.requestId
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateStatus(
                          request.RequestID || request.requestId,
                          "Rejected"
                        )
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No Pickup Requests Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PickupRequests;