import "./UserDashboard.css";
import { Link } from "react-router-dom";
import DashboardTopBar from "../../components/TopBar/DashboardTopBar";
import { FaRobot } from "react-icons/fa";

function UserDashboard() {
  return (
    <>
      <DashboardTopBar role="User" />

      <div className="dashboard">

        <aside className="sidebar">
          <h2>♻ Smart Waste</h2>

          <ul>
            <li><Link to="/UserDashboard/dashboard">🏠 Dashboard</Link></li>
            <li><Link to="/UserDashboard/request">🗑 Request Pickup</Link></li>
            <li>
  <Link to="/AIWasteClassifier">

    <FaRobot />

    <span>
      AI Waste Classifier
    </span>

  </Link>
</li>
            <li><Link to="/UserDashboard/track">📍 Track Status</Link></li>
            <li><Link to="/UserDashboard/history">📜 Collection History</Link></li>
            <li><Link to="/UserDashboard/notifications">🔔 Notifications</Link></li>
            <li><Link to="/UserDashboard/profile">👤 Profile</Link></li>
            <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </aside>

        <main className="main-content">

          <h1>Welcome, User 👋</h1>

          <div className="cards">

            <div className="card">
              <h2>12</h2>
              <p>Total Requests</p>
            </div>

            <div className="card">
              <h2>4</h2>
              <p>Pending Pickups</p>
            </div>

            <div className="card">
              <h2>8</h2>
              <p>Completed Pickups</p>
            </div>

          </div>

          <div className="recent">

            <h2>Recent Requests</h2>

            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Waste Type</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>24 Jul 2026</td>
                  <td>Plastic</td>
                  <td>Pending</td>
                </tr>

                <tr>
                  <td>22 Jul 2026</td>
                  <td>Organic</td>
                  <td>Completed</td>
                </tr>

                <tr>
                  <td>20 Jul 2026</td>
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

export default UserDashboard;