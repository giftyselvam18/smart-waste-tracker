import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import { useEffect, useState } from "react";
import axios from "axios";

function ManageCollectors() {

  const [collectors, setCollectors] = useState([]);

  useEffect(() => {
    fetchCollectors();
  }, []);

  const fetchCollectors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/collectors"
      );

      setCollectors(response.data);

    } catch (error) {
      console.log("Error fetching collectors", error);
    }
  };


  return (
    <>
      <FeatureTopBar dashboardPath="/AdminDashboard" />

      <div className="manage-container">

        <h1>🚛 Manage Collectors</h1>

        <h3>Collector List</h3>


        <table border="1" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Collector Name</th>
              <th>Area</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>

          {
            collectors.map((collector)=>(
              <tr key={collector.CollectorID}>

                <td>
                  {collector.CollectorID}
                </td>

                <td>
                  {collector.Name}
                </td>

                <td>
                  {collector.Area}
                </td>

                <td>
                  {collector.Status}
                </td>

                <td>
                  <button>
                    Edit
                  </button>

                  <button>
                    Delete
                  </button>
                </td>

              </tr>
            ))
          }

          </tbody>

        </table>

      </div>
    </>
  )
}


export default ManageCollectors;