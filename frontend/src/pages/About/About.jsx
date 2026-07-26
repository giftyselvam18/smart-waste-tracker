import "./About.css";
import Navbar from "../../components/Navbar/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-page">
        <div className="about-container">
          <h1>♻️ About Smart Waste Tracker</h1>

          <p className="intro">
            Smart Waste Tracker is a modern waste management system designed to
            improve waste collection, recycling, and city cleanliness through
            digital technology.
          </p>

          <div className="about-cards">
            <div className="card">
              <h2>🎯 Our Mission</h2>
              <p>
                To create a cleaner, greener, and healthier environment by
                making waste collection smarter and more efficient.
              </p>
            </div>

            <div className="card">
              <h2>🌍 Our Vision</h2>
              <p>
                To build smart cities where waste is properly managed and
                recycling is encouraged through technology.
              </p>
            </div>

            <div className="card">
              <h2>✨ Key Features</h2>
              <ul>
                <li>✔ Waste Collection Tracking</li>
                <li>✔ Role-Based Login</li>
                <li>✔ Recycling Management</li>
                <li>✔ Smart Dashboard</li>
                <li>✔ Reports & Notifications</li>
              </ul>
            </div>
           </div>
        </div>
      </div>
      <div className="contact-cards">

  <div className="info-card">
    <h2>📞 Contact Us</h2>
    <p><strong>Email:</strong> support@smartwastetracker.com</p>
    <p><strong>Phone:</strong> +91 98765 43210</p>
    <p><strong>Office Hours:</strong> Monday – Saturday</p>
    <p>9:00 AM – 6:00 PM</p>
  </div>

  <div className="info-card">
    <h2>🆘 Help Line</h2>
    <p><strong>Waste Collection:</strong> +91 98765 43211</p>
    <p><strong>Emergency:</strong> +91 98765 43212</p>
    <p><strong>Email:</strong> help@smartwastetracker.com</p>
  </div>

  <div className="info-card">
    <h2>📍 Office Address</h2>
    <p>Smart Waste Tracker</p>
    <p>Green City Innovation Center</p>
    <p>Chennai, Tamil Nadu – 600001</p>
  </div>

</div>
    </>
  );
}

export default About;