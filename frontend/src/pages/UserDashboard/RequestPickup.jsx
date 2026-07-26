import { useState } from "react";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function RequestPickup() {
  const [formData, setFormData] = useState({
    wasteType: "",
    weight: "",
    pickupDate: "",
    pickupTime: "",
    address: "",
    notes: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    alert("Pickup Request Submitted Successfully!");
  };

  return (
<>
<FeatureTopBar dashboardPath="/UserDashboard" />

    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2>🗑 Waste Pickup Request</h2>

      <form onSubmit={handleSubmit}>

        <label>Waste Type</label>
        <br />
        <select
          name="wasteType"
          value={formData.wasteType}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        >
          <option value="">Select Waste Type</option>
          <option value="Plastic">Plastic</option>
          <option value="Paper">Paper</option>
          <option value="Metal">Metal</option>
          <option value="E-Waste">E-Waste</option>
          <option value="Organic">Organic</option>
        </select>

        <label>Weight (kg)</label>
        <br />
        <input
          type="number"
          name="weight"
          placeholder="Enter Weight"
          value={formData.weight}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>Pickup Date</label>
        <br />
        <input
          type="date"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>Pickup Time</label>
        <br />
        <input
          type="time"
          name="pickupTime"
          value={formData.pickupTime}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>Pickup Address</label>
        <br />
        <textarea
          name="address"
          rows="3"
          placeholder="Enter Pickup Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>Additional Notes</label>
        <br />
        <textarea
          name="notes"
          rows="3"
          placeholder="Any special instructions..."
          value={formData.notes}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>Upload Waste Image (Optional)</label>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "20px" }}
        />

        {formData.image && (
          <p>
            <strong>Selected Image:</strong> {formData.image.name}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Request
        </button>

      </form>
    </div>
    </>
  );
}

export default RequestPickup;