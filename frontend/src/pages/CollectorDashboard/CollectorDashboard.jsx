import "./CollectorDashboard.css";
import { useNavigate } from "react-router-dom";
import DashboardTopBar from "../../components/TopBar/DashboardTopBar";

function CollectorDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <DashboardTopBar role="Collector" />

      <div className="collector-dashboard">

        <aside className="collector-sidebar">
          <h2>♻ Smart Waste</h2>

          <ul>
            <li onClick={() => navigate("/CollectorDashboard")}>
              🏠 Dashboard
            </li>

            <li onClick={() => navigate("/collector/pickups")}>
              📋 Assigned Pickups
            </li>

            <li onClick={() => navigate("/collector/today")}>
              🚛 Today's Collection
            </li>

            <li onClick={() => navigate("/collector/map")}>
              📍 Route Map
            </li>

            <li onClick={() => navigate("/collector/history")}>
              📜 Collection History
            </li>

            <li onClick={() => navigate("/collector/profile")}>
              👤 Profile
            </li>

            <li onClick={() => navigate("/login/collector")}>
              🚪 Logout
            </li>
          </ul>
        </aside>

        <main className="collector-main">

          <h1>Waste Collector Dashboard</h1>

          <div className="collector-cards">

            <div className="collector-card">
              <h2>15</h2>
              <p>Today's Pickups</p>
            </div>

            <div className="collector-card">
              <h2>5</h2>
              <p>Pending</p>
            </div>

            <div className="collector-card">
              <h2>10</h2>
              <p>Completed</p>
            </div>

          </div>

          <div className="pickup-table">

            <h2>Assigned Pickup Requests</h2>

            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Location</th>
                  <th>Waste Type</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Gifty</td>
                  <td>Tirunelveli</td>
                  <td>Plastic</td>
                  <td>Pending</td>
                </tr>

                <tr>
                  <td>Rahul</td>
                  <td>Madurai</td>
                  <td>Organic</td>
                  <td>On the Way</td>
                </tr>

                <tr>
                  <td>Priya</td>
                  <td>Chennai</td>
                  <td>E-Waste</td>
                  <td>Completed</td>
                </tr>
              </tbody>

            </table>

          </div>

        </main>

      </div>
    </>
  );
}

export default CollectorDashboard;