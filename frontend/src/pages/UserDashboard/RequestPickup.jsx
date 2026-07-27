import "./RequestPickup.css";
import {
  FaRecycle,
  FaWeightHanging,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaStickyNote,
  FaUpload,
  FaPaperPlane,
  FaLeaf,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

import pickupImg from "../../assets/pickup.png"; // Add your illustration

function RequestPickup() {
  return (
    <div className="pickup-page">

      <div className="pickup-card">

        {/* LEFT SIDE */}

        <div className="pickup-form-section">

          <div className="pickup-header">
            <div className="pickup-icon">
              <FaTruck />
            </div>

            <div>
              <h2>Request Waste Pickup</h2>
              <p>
                Fill in the details below to schedule your waste pickup.
              </p>
            </div>
          </div>

          <form>

            <div className="form-group">
              <label>Waste Type</label>

              <div className="input-box">
                <FaRecycle />
                <select>
                  <option>Select Waste Type</option>
                  <option>Plastic</option>
                  <option>Paper</option>
                  <option>Metal</option>
                  <option>Glass</option>
                  <option>Organic</option>
                  <option>E-Waste</option>
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
                    placeholder="Enter Weight"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Pickup Date</label>

                <div className="input-box">
                  <FaCalendarAlt />
                  <input type="date" />
                </div>
              </div>

            </div>

            <div className="row">

              <div className="form-group">
                <label>Pickup Time</label>

                <div className="input-box">
                  <FaClock />
                  <input type="time" />
                </div>
              </div>

              <div className="form-group">
                <label>Pickup Address</label>

                <div className="input-box">
                  <FaMapMarkerAlt />
                  <input
                    type="text"
                    placeholder="Enter Pickup Address"
                  />
                </div>
              </div>

            </div>

            <div className="form-group">
              <label>Additional Notes</label>

              <div className="textarea-box">

                <FaStickyNote />

                <textarea
                  rows="4"
                  placeholder="Any special instructions..."
                ></textarea>

              </div>
            </div>

            <div className="form-group">

              <label>Upload Waste Image</label>

              <div className="upload-box">
                <FaUpload />
                <input type="file" />
              </div>

            </div>

            <button className="submit-btn">

              <FaPaperPlane />

              Submit Pickup Request

            </button>

          </form>

        </div>

        {/* RIGHT SIDE */}

        <div className="pickup-info">

          <img
            src={pickupImg}
            alt="pickup"
          />

          <div className="info-card">

            <div className="info-item">
              <FaLeaf />
              <div>
                <h4>Eco Friendly</h4>
                <p>
                  Safe and sustainable waste collection.
                </p>
              </div>
            </div>

            <div className="info-item">
              <FaTruck />
              <div>
                <h4>Reliable Service</h4>
                <p>
                  Fast pickup by verified collectors.
                </p>
              </div>
            </div>

            <div className="info-item">
              <FaCheckCircle />
              <div>
                <h4>Clean City</h4>
                <p>
                  Together we build a greener tomorrow.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RequestPickup;