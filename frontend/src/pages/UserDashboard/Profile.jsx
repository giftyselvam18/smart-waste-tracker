import { useEffect, useState } from "react";
import axios from "axios";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);

      } catch (error) {
        console.log("Profile Error:", error);
      }

    };

    fetchProfile();

  }, []);


  if (!user) {
    return <h3>Loading Profile...</h3>;
  }


  return (
    <>
    <FeatureTopBar dashboardPath="/UserDashboard" />
    <div className="profile-page">

      <div className="profile-card">

        <h2>👤 My Profile</h2>

        <div className="profile-details">

          <p>
            <strong>Full Name:</strong> {user.FullName}
          </p>

          <p>
            <strong>Username:</strong> {user.Username}
          </p>

          <p>
            <strong>Email:</strong> {user.Email}
          </p>

          <p>
            <strong>Phone:</strong> {user.Phone}
          </p>

          <p>
            <strong>Address:</strong> {user.Address}
          </p>

        </div>


        <button>
          ✏️ Edit Profile
        </button>


        <button>
          🔒 Change Password
        </button>


      </div>

    </div>
    </>
  );
}

export default Profile;