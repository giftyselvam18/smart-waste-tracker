import "./RouteMap.css";
import { useNavigate } from "react-router-dom";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function RouteMap() {

  const navigate = useNavigate();
const pickupLocation = [13.0827, 80.2707]; // Chennai
  const reachedDestination = () => {
    alert("Destination Reached 📍");
  };

  return (
    <>
      <FeatureTopBar dashboardPath="/CollectorDashboard" />

      <div className="route-container">

        <h1>📍 Route Map</h1>

        <div className="route-card">

          <h3>🟢 Status : In Progress</h3>

          <p>
            <b>Pickup Address</b>
          </p>

          <p>No.12, Gandhi Street, Chennai</p>
<MapContainer
  center={pickupLocation}
  zoom={15}
  style={{
    height: "350px",
    width: "100%",
    borderRadius: "12px"
  }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <Marker position={pickupLocation}>
    <Popup>
      Pickup Location
    </Popup>
  </Marker>

</MapContainer>s
          <p>
            <b>Distance :</b> 2.4 km
          </p>

          <p>
            <b>ETA :</b> 8 mins
          </p>

          <button
            className="reach-btn"
            onClick={reachedDestination}
          >
            📍 Destination Reached
          </button>

          <button
            className="back-btn"
            onClick={() => navigate("/collector/pickups")}
          >
            ⬅ Back
          </button>

        </div>

      </div>
    </>
  );
}

export default RouteMap;