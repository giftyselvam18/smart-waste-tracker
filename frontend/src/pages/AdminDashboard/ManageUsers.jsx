
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
function ManageUsers(){

  return(
    <>
     <FeatureTopBar dashboardPath="/AdminDashboard" />
    <div>
      <h1>👥 Manage Users</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Gifty</td>
            <td>gifty@gmail.com</td>
            <td>Active</td>
          </tr>
        </tbody>

      </table>

    </div>
    </>
  )
}

export default ManageUsers;