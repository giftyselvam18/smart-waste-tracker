import "./ScrapDealers.css";
import { FaStore, FaMapMarkerAlt } from "react-icons/fa";


function ScrapDealers() {


  const dealers = [

    {
      name: "Green Scrap Dealers",
      location: "Chennai",
      waste: "Metal, Plastic, E-Waste",
      phone: "9876543210"
    },


    {
      name: "Eco Scrap Hub",
      location: "Coimbatore",
      waste: "Paper, Glass, Electronics",
      phone: "9876501234"
    },


    {
      name: "Smart Scrap Solutions",
      location: "Madurai",
      waste: "All Recyclable Waste",
      phone: "8765432109"
    },


    {
      name: "Clean Waste Traders",
      location: "Tirunelveli",
      waste: "Plastic, Metal, Old Electronics",
      phone: "7654321098"
    }

  ];



  return (

    <div className="scrap-page">


      <div className="scrap-header">

        <FaStore />

        <div>

          <h1>
            Scrap Dealers
          </h1>


          <p>
            Find nearby scrap dealers and sell recyclable waste
          </p>

        </div>


      </div>





      <div className="dealer-grid">


        {
          dealers.map((dealer,index)=>(


            <div 
              className="dealer-card"
              key={index}
            >


              <FaStore className="dealer-icon"/>


              <h2>
                {dealer.name}
              </h2>



              <p>
                <FaMapMarkerAlt/>
                {dealer.location}
              </p>



              <div className="waste-box">

                ♻ Accepts:
                <br/>

                {dealer.waste}

              </div>




              <p className="phone">

                📞 {dealer.phone}

              </p>



              <button>

                Contact Dealer

              </button>



            </div>


          ))
        }


      </div>


    </div>

  );

}


export default ScrapDealers;