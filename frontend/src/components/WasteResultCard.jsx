import {
  FaRecycle,
  FaStore
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


function WasteResultCard({ result }) {


  const navigate = useNavigate();


  return (

    <div className="result-card">


      <h3>
        AI Result
      </h3>


      <h2>
        {result.category}
      </h2>


      <p>
        Confidence :
        <b>
          {result.confidence}%
        </b>
      </p>



      <button
        onClick={() => navigate("/UserDashboard/RecyclingCenters")}
      >

        <FaRecycle />

        Find Recycling Centers

      </button>




      <button
        onClick={() => navigate("/UserDashboard/ScrapDealers")}
      >

        <FaStore />

        Find Scrap Dealers

      </button>



    </div>

  );

}


export default WasteResultCard;