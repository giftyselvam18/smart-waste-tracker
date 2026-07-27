import "./ManageCollectors.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import { useEffect, useState } from "react";
import API from "../../services/api";

function ManageCollectors() {
  const [collectors, setCollectors] = useState([]);

  useEffect(() => {
    fetchCollectors();
  }, []);

  const fetchCollectors = async () => {
    try {
      const response = await API.get("/collectors");
      console.log("Collectors:", response.data);
      setCollectors(response.data);
    } catch (error) {
      console.error("Error fetching collectors:", error);
      alert("Failed to fetch collectors");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this collector?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/collectors/${id}`);
      alert("Collector deleted successfully");
      fetchCollectors();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <>
      <FeatureTopBar dashboardPath="/AdminDashboard" />

      <div className="manage-container">
        <h1>🚛 Manage Collectors</h1>

        <table className="collector-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Collector Code</th>
              <th>Collector Name</th>
              <th>Area</th>
              <th>Phone</th>
              <th>Vehicle Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {collectors.length > 0 ? (
              collectors.map((collector) => (
                <tr key={collector.CollectorID}>
                  <td>{collector.CollectorID}</td>
                  <td>{collector.CollectorCode}</td>
                  <td>{collector.CollectorName}</td>
                  <td>{collector.Area}</td>
                  <td>{collector.Phone}</td>
                  <td>{collector.VehicleNumber}</td>
                  <td>{collector.Status}</td>
                  <td>
                    <button className="edit-btn">
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(collector.CollectorID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No Collectors Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageCollectors;