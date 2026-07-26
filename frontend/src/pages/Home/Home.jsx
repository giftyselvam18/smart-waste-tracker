import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import bgImage from "../../assets/images/green-bin.jpg";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">

      <Navbar />

      <section
        className="hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay">

          <h1>♻ SMART WASTE TRACKER</h1>

          <h2>
            Smart Waste Collection for a
            <br />
            Cleaner & Greener City
          </h2>

          <p>
            Track Waste • Schedule Pickup • Monitor Collection
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;