import { useEffect, useState } from "react";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import API from "../../services/api";
import "./PickupRequests.css";


function PickupRequests() {

  const [requests, setRequests] = useState([]);


  useEffect(() => {
    fetchRequests();
  }, []);



  const fetchRequests = async () => {

    try {

      const response = await API.get("/pickups/request");

      setRequests(response.data);

    } catch(error) {

      console.error(error);

      alert("Failed to fetch pickup requests");

    }

  };



  const updateStatus = async (id,status)=>{

    try{

      await API.put(
        `/pickups/request/${id}`,
        {
          Status: status
        }
      );


      alert(`Request ${status}`);


      fetchRequests();


    }catch(error){

      console.log(error);

    }

  };



  return (

    <>

      <FeatureTopBar dashboardPath="/AdminDashboard" />


      <div className="pickup-container">


        <h1>🗑 Pickup Requests</h1>



        <table className="pickup-table">


          <thead>

            <tr>

              <th>ID</th>
              <th>User</th>
              <th>Waste Type</th>
              <th>Weight</th>
              <th>Address</th>
              <th>Date</th>
              <th>Time</th>
              <th>Image</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>



          <tbody>


          {
            requests.length > 0 ? (

              requests.map((request)=>(


                <tr key={request.RequestID}>


                  <td>
                    {request.RequestID}
                  </td>


                  <td>
                    {request.User?.FullName || "User"}
                  </td>


                  <td>
                    {request.WasteCategory?.CategoryName || request.WasteType}
                  </td>


                  <td>
                    {request.Weight} Kg
                  </td>


                  <td>
                    {request.PickupAddress}
                  </td>


                  <td>
                    {request.PickupDate}
                  </td>


                  <td>
                    {request.PickupTime}
                  </td>


                  <td>

                    {
                      request.WasteImage ?

                      <img
                        src={`http://localhost:5000/uploads/${request.WasteImage}`}
                        alt="waste"
                        width="70"
                        height="70"
                      />

                      :

                      "No Image"

                    }

                  </td>


                  <td>
                    {request.Status}
                  </td>


                  <td>


                    <button
                      className="accept-btn"
                      onClick={()=>updateStatus(
                        request.RequestID,
                        "Accepted"
                      )}
                    >
                      Accept
                    </button>



                    <button
                      className="reject-btn"
                      onClick={()=>updateStatus(
                        request.RequestID,
                        "Rejected"
                      )}
                    >
                      Reject
                    </button>


                  </td>


                </tr>


              ))

            )

            :

            (

              <tr>

                <td colSpan="10">
                  No Pickup Requests Found
                </td>

              </tr>

            )

          }


          </tbody>


        </table>


      </div>


    </>

  );

}


export default PickupRequests;