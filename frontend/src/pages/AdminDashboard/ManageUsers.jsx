import "./ManageUsers.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
import { useEffect, useState } from "react";
import API from "../../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");
      console.log("Users:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users");
    }
  };

  return (
    <>
      <FeatureTopBar dashboardPath="/AdminDashboard" />

      <div className="manage-users-container">
        <h1>👥 Manage Users</h1>

        <table className="users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.UserID}>
                  <td>{user.UserID}</td>
                  <td>{user.FullName}</td>
                  <td>{user.Username}</td>
                  <td>{user.Email}</td>
                  <td>{user.Phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Users Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageUsers;