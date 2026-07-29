import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { 
  FaTrash, 
  FaRobot, 
  FaMapMarkerAlt, 
  FaRecycle 
} from "react-icons/fa";


function Dashboard() {


  const [stats,setStats] = useState({

    totalRequests:0,
    completedPickup:0,
    pendingRequest:0,
    ecoPoints:0

  });



  useEffect(()=>{


    axios
    .get("http://localhost:5000/api/dashboard/stats")
    .then((res)=>{

      setStats(res.data);

    })
    .catch((error)=>{

      console.log(
        "Dashboard Stats Error:",
        error
      );

    });


  },[]);





  const dashboardStats = [

    {
      icon:"♻",
      count:stats.totalRequests,
      title:"Total Requests"
    },

    {
      icon:"🚛",
      count:stats.completedPickup,
      title:"Completed Pickup"
    },

    {
      icon:"⏳",
      count:stats.pendingRequest,
      title:"Pending Request"
    },

    {
      icon:"⭐",
      count:stats.ecoPoints,
      title:"Eco Points"
    }

  ];





  const actions = [

    {
      icon:<FaTrash />,
      title:"Request Pickup",
      desc:"Schedule waste collection",
      path:"/UserDashboard/request"
    },


    {
      icon:<FaRobot />,
      title:"AI Classifier",
      desc:"Identify waste type",
      path:"/UserDashboard/ai-classifier"
    },


    {
      icon:<FaMapMarkerAlt />,
      title:"Track Status",
      desc:"Check pickup status",
      path:"/UserDashboard/track"
    },


    {
      icon:<FaRecycle />,
      title:"Recycling Centers",
      desc:"Find recycling locations",
      path:"/UserDashboard/RecyclingCenters"
    }

  ];





  return (

    <div className="dashboard-home">



      <div className="welcome-card">

        <h1>
          🌱 Welcome to Smart Waste Tracker
        </h1>


        <p>
          Manage your waste pickup easily and contribute to a cleaner environment.
        </p>

      </div>





      <div className="stats">


        {
          dashboardStats.map((item,index)=>(

            <div 
              className="stat-card" 
              key={index}
            >

              <h2>
                {item.icon} {item.count}
              </h2>


              <p>
                {item.title}
              </p>


            </div>

          ))
        }


      </div>





      <h2 className="title">
        Quick Actions
      </h2>





      <div className="actions">


        {
          actions.map((action,index)=>(


            <Link

              to={action.path}

              className="action-card"

              key={index}

            >


              <div className="action-icon">

                {action.icon}

              </div>



              <h3>

                {action.title}

              </h3>



              <p>

                {action.desc}

              </p>



            </Link>


          ))
        }


      </div>





      <div className="eco-tip">


        <h2>
          🌍 Eco Tip
        </h2>


        <p>
          Separate wet and dry waste to improve recycling efficiency.
        </p>


      </div>




    </div>

  );

}


export default Dashboard;