import "./UserDashboard.css";
import { Link, Outlet } from "react-router-dom";
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

            <li>
              <Link to="/UserDashboard/dashboard">
                🏠 Dashboard
              </Link>
            </li>


            <li>
              <Link to="/UserDashboard/request">
                🗑 Request Pickup
              </Link>
            </li>


            <li>
              <Link to="/UserDashboard/ai-classifier">

                <FaRobot />

                <span>
                  AI Waste Classifier
                </span>

              </Link>
            </li>


            <li>
              <Link to="/UserDashboard/track">
                📍 Track Status
              </Link>
            </li>


            <li>
              <Link to="/UserDashboard/history">
                📜 Collection History
              </Link>
            </li>


            <li>
              <Link to="/UserDashboard/notifications">
                🔔 Notifications
              </Link>
            </li>


            <li>
              <Link to="/UserDashboard/profile">
                👤 Profile
              </Link>
            </li>


            <li>
              <Link to="/">
                🚪 Logout
              </Link>
            </li>


          </ul>

        </aside>



        <main className="main-content">

          {/* Child pages render here */}
          <Outlet />


        </main>


      </div>

    </>
  );
}


export default UserDashboard;