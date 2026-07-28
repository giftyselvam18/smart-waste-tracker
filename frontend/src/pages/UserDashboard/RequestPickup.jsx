import "./RequestPickup.css";

import { useState } from "react";
import { submitPickupRequest } from "../../services/pickupService";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

import {
  FaRecycle,
  FaWeightHanging,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUpload,
  FaPaperPlane,
  FaTruck,
} from "react-icons/fa";

import pickupImg from "../../assets/pickup.png";


function RequestPickup() {

  const [formData, setFormData] = useState({

    wasteType: "",
    weight: "",
    pickupDate: "",
    pickupTime: "",
    pickupAddress: "",
    notes: "",

  });



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      const user = JSON.parse(localStorage.getItem("user"));


      console.log("Logged User:", user);



      if (!user || (!user.id && !user.UserID)) {


        alert("User not logged in. Please login again.");

        return;


      }



      const requestData = {


        UserID: user.id || user.UserID,


        wasteType: formData.wasteType,

        weight: formData.weight,

        pickupDate: formData.pickupDate,

        pickupTime: formData.pickupTime,

        pickupAddress: formData.pickupAddress,

        notes: formData.notes,


      };



      console.log(
        "Sending Pickup Data:",
        requestData
      );



      const response = await submitPickupRequest(requestData);



      alert(

        response.message ||

        "Pickup Request Submitted Successfully!"

      );



      setFormData({

        wasteType: "",

        weight: "",

        pickupDate: "",

        pickupTime: "",

        pickupAddress: "",

        notes: "",

      });



    } catch(error) {


      console.log(
        "Pickup Error:",
        error.response?.data || error.message
      );



      alert(

        error.response?.data?.message ||

        "Failed to submit pickup request"

      );


    }

  };



  return (

    <>


      <FeatureTopBar dashboardPath="/UserDashboard" />


      <div className="pickup-page">


        <img

          src={pickupImg}

          alt="Pickup Background"

          className="background-image"

        />



        <div className="overlay">


          <div className="pickup-card">


            <div className="pickup-form-section">


              <div className="pickup-header">


                <div className="pickup-icon">

                  <FaTruck />

                </div>



                <div>

                  <h2>
                    Request Waste Pickup
                  </h2>


                  <p>
                    Schedule your waste pickup quickly and help keep our city clean.
                  </p>

                </div>


              </div>



              <form onSubmit={handleSubmit}>


                <div className="form-group">

                  <label>
                    Waste Type
                  </label>


                  <div className="input-box">

                    <FaRecycle />


                    <select

                      name="wasteType"

                      value={formData.wasteType}

                      onChange={handleChange}

                    >

                      <option value="">
                        Select Waste Type
                      </option>

                      <option value="Plastic">
                        Plastic
                      </option>

                      <option value="Paper">
                        Paper
                      </option>

                      <option value="Metal">
                        Metal
                      </option>

                      <option value="Glass">
                        Glass
                      </option>

                      <option value="Organic">
                        Organic
                      </option>

                      <option value="E-Waste">
                        E-Waste
                      </option>


                    </select>


                  </div>

                </div>



                <div className="row">


                  <div className="form-group">

                    <label>
                      Weight (kg)
                    </label>


                    <div className="input-box">

                      <FaWeightHanging />


                      <input

                        type="number"

                        name="weight"

                        placeholder="Enter Weight"

                        value={formData.weight}

                        onChange={handleChange}

                      />

                    </div>

                  </div>




                  <div className="form-group">


                    <label>
                      Pickup Date
                    </label>


                    <div className="input-box">

                      <FaCalendarAlt />


                      <input

                        type="date"

                        name="pickupDate"

                        value={formData.pickupDate}

                        onChange={handleChange}

                      />

                    </div>


                  </div>


                </div>




                <div className="row">


                  <div className="form-group">


                    <label>
                      Pickup Time
                    </label>


                    <div className="input-box">

                      <FaClock />


                      <input

                        type="time"

                        name="pickupTime"

                        value={formData.pickupTime}

                        onChange={handleChange}

                      />

                    </div>


                  </div>




                  <div className="form-group">


                    <label>
                      Pickup Address
                    </label>


                    <div className="input-box">


                      <FaMapMarkerAlt />


                      <input

                        type="text"

                        name="pickupAddress"

                        placeholder="Enter Pickup Address"

                        value={formData.pickupAddress}

                        onChange={handleChange}

                      />


                    </div>


                  </div>


                </div>




                <div className="form-group">


                  <label>
                    Upload Waste Image (Optional)
                  </label>


                  <div className="upload-box">

                    <FaUpload />


                    <input

                      type="file"

                      accept="image/*"

                    />


                  </div>


                </div>




                <button

                  type="submit"

                  className="submit-btn"

                >

                  <FaPaperPlane />

                  Submit Pickup Request


                </button>



              </form>



            </div>


          </div>


        </div>


      </div>


    </>

  );

}


export default RequestPickup;