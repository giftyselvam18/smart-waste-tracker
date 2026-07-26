import { useEffect, useState } from "react";
import axios from "axios";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function CollectionHistory() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchHistory = async () => {
      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/requests/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHistory(response.data);

      } catch (error) {
        console.log("History Fetch Error:", error);
      }
    };

    fetchHistory();

  }, []);


  return (
    <>
    <FeatureTopBar dashboardPath="/UserDashboard" />
    <div className="history-page">

      <h2>📜 Collection History</h2>

      {
        history.length === 0 ? (

          <p>No Completed Collections Found</p>

        ) : (

          history.map((item) => (

            <div className="history-card" key={item.RequestID}>

              <h3>
                Request ID : #{item.RequestID}
              </h3>

              <p>
                ♻ Waste Type : {item.WasteType}
              </p>

              <p>
                ⚖ Weight : {item.Weight} kg
              </p>

              <p>
                📅 Pickup Date : {item.PickupDate}
              </p>

              <p>
                🚛 Collector : {item.CollectorName || "Not Assigned"}
              </p>

              <p>
                ✅ Status : {item.Status}
              </p>

            </div>

          ))

        )
      }

    </div>
    </>
  );
}

export default CollectionHistory;