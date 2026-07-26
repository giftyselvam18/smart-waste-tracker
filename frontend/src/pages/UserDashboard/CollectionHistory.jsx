import "./UserDashboard.css";
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";

function CollectionHistory() {
  return (
        <>
    <FeatureTopBar dashboardPath="/UserDashboard" />
    <div className="content">
      <h2>Collection History</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Waste Type</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>25-07-2026</td>
            <td>Plastic</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>20-07-2026</td>
            <td>Organic</td>
            <td>Completed</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
}

export default CollectionHistory;