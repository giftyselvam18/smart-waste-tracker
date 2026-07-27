import "./CollectionAreas.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import { useEffect, useState } from "react";
import API from "../../services/api";

function CollectionAreas() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await API.get("/collectors");

      // Duplicate areas remove
      const uniqueAreas = [
        ...new Set(
          response.data
            .map((collector) => collector.Area)
            .filter((area) => area)
        ),
      ];

      setAreas(uniqueAreas);
    } catch (error) {
      console.error("Error fetching areas:", error);
      alert("Failed to fetch collection areas");
    }
  };

  return (
    <>
      <FeatureTopBar dashboardPath="/AdminDashboard" />

      <div className="collection-container">
        <h1>📍 Collection Areas</h1>

        {areas.length > 0 ? (
          <ul className="area-list">
            {areas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        ) : (
          <p>No Collection Areas Found</p>
        )}
      </div>
    </>
  );
}

export default CollectionAreas;