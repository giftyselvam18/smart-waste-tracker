import "./AssignCollector.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function AssignCollector() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [collectors, setCollectors] = useState([]);
  const [collectorId, setCollectorId] = useState("");

  useEffect(() => {
    fetchCollectors();
  }, []);

  const fetchCollectors = async () => {
    try {
      const response = await API.get("/collectors");

      console.log("Collectors:", response.data);

      setCollectors(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load collectors");
    }
  };

  const assignCollector = async () => {
    if (!collectorId) {
      alert("Please select a collector");
      return;
    }

    try {
      const response = await API.post("/pickups/assign", {
        RequestID: parseInt(id),
        CollectorID: parseInt(collectorId),
      });

      alert(response.data.message);

      navigate("/admin/pickups");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to assign collector"
      );
    }
  };

  return (
    <>
      <FeatureTopBar dashboardPath="/AdminDashboard" />

      <div className="assign-container">
        <div className="assign-card">

          <h1>Assign Collector</h1>

          <p className="pickup-id">
            Pickup Request ID :
            <strong> {id}</strong>
          </p>

          <label>Select Collector</label>

          <select
            value={collectorId}
            onChange={(e) =>
              setCollectorId(e.target.value)
            }
          >
            <option value="">
              -- Select Collector --
            </option>

            {collectors.map((collector) => (
              <option
                key={collector.CollectorID}
                value={collector.CollectorID}
              >
                {collector.CollectorName}
              </option>
            ))}
          </select>

          <button
            className="assign-btn"
            onClick={assignCollector}
          >
            Assign Collector
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/admin/pickups")}
          >
            Cancel
          </button>

        </div>
      </div>
    </>
  );
}

export default AssignCollector;