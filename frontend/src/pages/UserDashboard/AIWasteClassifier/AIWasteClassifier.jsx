import "./AIWasteClassifier.css";
import { useState } from "react";

import UploadImage from "../../../components/UploadImage";
import WasteResultCard from "../../../components/WasteResultCard";
import { classifyWaste } from "../../../services/aiService";

import { FaRobot, FaRecycle } from "react-icons/fa";
function AIWasteClassifier() {

  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleClassify = async () => {

    if(!image){
      alert("Please upload waste image");
      return;
    }


    try {

      setLoading(true);

      const response = await classifyWaste(image);

      setResult(response);

    } 
    catch(error){

      console.log(error);
      alert("AI Classification Failed");

    }
    finally{

      setLoading(false);

    }

  };


  return (

    <div className="ai-page">


      <div className="ai-card">


        <div className="ai-header">

          <FaRobot />

          <div>
            <h2>
              AI Waste Classification
            </h2>

            <p>
              Upload waste image and identify recyclable category
            </p>
          </div>


        </div>



        <UploadImage
          setImage={setImage}
        />



        {
          image &&

          <button
            className="classify-btn"
            onClick={handleClassify}
          >

            <FaRecycle />

            {
              loading
              ?
              "Analyzing..."
              :
              "Classify Waste"
            }

          </button>

        }



        {
          result &&

          <WasteResultCard
            result={result}
          />

        }



      </div>


    </div>

  );

}


export default AIWasteClassifier;