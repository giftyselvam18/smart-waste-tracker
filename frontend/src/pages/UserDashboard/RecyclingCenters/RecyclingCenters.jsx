import "./RecyclingCenters.css";
import { FaMapMarkerAlt, FaRecycle } from "react-icons/fa";


function RecyclingCenters() {


  const centers = [
    {
      name: "Green Recycling Center",
      location: "Chennai",
      waste: "Plastic, Paper, E-Waste"
    },

    {
      name: "Eco Waste Solutions",
      location: "Coimbatore",
      waste: "Metal, Glass, Organic"
    },

    {
      name: "Clean Earth Recycling",
      location: "Madurai",
      waste: "All Waste Types"
    },

    {
      name: "Smart Recycle Hub",
      location: "Tirunelveli",
      waste: "Plastic, Electronic Waste"
    }

  ];



  return (

    <div className="recycling-page">


      <div className="recycling-header">

        <FaRecycle />

        <div>

          <h1>
            Recycling Centers
          </h1>

          <p>
            Find nearby recycling centers and dispose waste responsibly
          </p>

        </div>

      </div>




      <div className="center-grid">


        {
          centers.map((center,index)=>(


            <div 
              className="center-card"
              key={index}
            >


              <FaRecycle className="center-icon"/>


              <h2>
                {center.name}
              </h2>


              <p>
                <FaMapMarkerAlt/>
                {center.location}
              </p>


              <span>
                ♻ Accepts:
                <br/>
                {center.waste}
              </span>



              <button>
                View Location
              </button>


            </div>


          ))
        }


      </div>


    </div>

  );

}


export default RecyclingCenters;