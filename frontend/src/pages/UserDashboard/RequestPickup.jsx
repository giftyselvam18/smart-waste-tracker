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
    wasteImage: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      wasteImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await submitPickupRequest(formData);

      alert(response.message || "Pickup Request Submitted Successfully!");

      setFormData({
        wasteType: "",
        weight: "",
        pickupDate: "",
        pickupTime: "",
        pickupAddress: "",
        wasteImage: null,
      });

    } catch (error) {
      console.log("Pickup Error:", error);

      alert(error.message || "Failed to submit pickup request");
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
                  <h2>Request Waste Pickup</h2>
                  <p>
                    Schedule your waste pickup quickly and keep the city clean.
                  </p>
                </div>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="form-group">

                  <label>Waste Type</label>

                  <div className="input-box">

                    <FaRecycle />

                    <select
                      name="wasteType"
                      value={formData.wasteType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Waste Type</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Paper">Paper</option>
                      <option value="Metal">Metal</option>
                      <option value="Glass">Glass</option>
                      <option value="Organic">Organic</option>
                      <option value="E-Waste">E-Waste</option>
                    </select>

                  </div>

                </div>

                <div className="row">

                  <div className="form-group">

                    <label>Weight (kg)</label>

                    <div className="input-box">

                      <FaWeightHanging />

                      <input
                        type="number"
                        name="weight"
                        placeholder="Enter Weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <div className="form-group">

                    <label>Pickup Date</label>

                    <div className="input-box">

                      <FaCalendarAlt />

                      <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                </div>

                <div className="row">

                  <div className="form-group">

                    <label>Pickup Time</label>

                    <div className="input-box">

                      <FaClock />

                      <input
                        type="time"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <div className="form-group">

                    <label>Pickup Address</label>

                    <div className="input-box">

                      <FaMapMarkerAlt />

                      <input
                        type="text"
                        name="pickupAddress"
                        placeholder="Enter Pickup Address"
                        value={formData.pickupAddress}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                </div>

                <div className="form-group">

                  <label>
                    Upload Waste Image <span>(Optional)</span>
                  </label>

                  <div className="upload-box">

                    <FaUpload />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
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