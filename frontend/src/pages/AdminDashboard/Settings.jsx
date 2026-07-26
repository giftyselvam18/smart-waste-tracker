
import FeatureTopBar from "../../components/TopBar/FeatureTopBar";
function Settings(){

return(
<>
<FeatureTopBar dashboardPath="/AdminDashboard" />
<div>

<h1>⚙ Settings</h1>

<label>
Admin Name
</label>

<input 
type="text"
placeholder="Admin"
/>


<br/>

<button>
Save Changes
</button>


</div>
</>
)

}

export default Settings;