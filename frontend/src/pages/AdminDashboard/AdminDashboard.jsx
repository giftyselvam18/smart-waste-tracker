import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import DashboardTopBar from "../../components/TopBar/DashboardTopBar";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <DashboardTopBar role="Admin" />

      <div className="AdminDashboard">

        <aside className="admin-sidebar">

          <h2>♻ Smart Waste</h2>

          <ul>
            <li onClick={() => navigate("/AdminDashboard")}>
              📊 Dashboard
            </li>

            <li onClick={() => navigate("/admin/users")}>
              👥 Manage Users
            </li>

            <li onClick={() => navigate("/admin/collectors")}>
              🚛 Manage Collectors
            </li>

            <li onClick={() => navigate("/admin/pickups")}>
              🗑 Pickup Requests
            </li>

            <li onClick={() => navigate("/admin/areas")}>
              📍 Collection Areas
            </li>

            
          </ul>

        </aside>

        <main className="admin-main">

          <h1>Admin Dashboard</h1>

          <div className="stats">

            <div className="stat-card">
              <h2>250</h2>
              <p>Total Users</p>
            </div>

            <div className="stat-card">
              <h2>32</h2>
              <p>Collectors</p>
            </div>

            <div className="stat-card">
              <h2>84</h2>
              <p>Pending Requests</p>
            </div>

            <div className="stat-card">
              <h2>156</h2>
              <p>Completed Pickups</p>
            </div>

          </div>

          <div className="requests">

            <h2>Recent Pickup Requests</h2>

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
                  <td>Arun</td>
                  <td>Chennai</td>
                  <td>Plastic</td>
                  <td>Pending</td>
                </tr>

                <tr>
                  <td>Priya</td>
                  <td>Madurai</td>
                  <td>Organic</td>
                  <td>Assigned</td>
                </tr>

                <tr>
                  <td>Rahul</td>
                  <td>Coimbatore</td>
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

export default AdminDashboard;