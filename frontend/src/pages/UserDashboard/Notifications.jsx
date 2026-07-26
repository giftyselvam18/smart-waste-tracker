import { useEffect, useState } from "react";
import axios from "axios";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function Notifications() {

  const [notifications, setNotifications] = useState([]);


  useEffect(() => {

    const fetchNotifications = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotifications(response.data);

      } catch (error) {

        console.log("Notification Error:", error);

      }

    };


    fetchNotifications();

  }, []);


  return (
    <>
<FeatureTopBar dashboardPath="/UserDashboard" />
    <div className="notification-page">

      <h2>🔔 Notifications</h2>


      {
        notifications.length === 0 ? (

          <p>No Notifications Available</p>

        ) : (

          notifications.map((item) => (

            <div 
              className="notification-card"
              key={item.NotificationID}
            >

              <h3>
                {item.Title}
              </h3>

              <p>
                {item.Message}
              </p>

              <small>
                {item.CreatedAt}
              </small>

            </div>

          ))

        )
      }


    </div>
    </>

  );
}

export default Notifications;