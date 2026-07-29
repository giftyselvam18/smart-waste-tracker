import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";


// User
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import Dashboard from "../pages/UserDashboard/Dashboard";
import RequestPickup from "../pages/UserDashboard/RequestPickup";
import AIWasteClassifier from "../pages/UserDashboard/AIWasteClassifier/AIWasteClassifier";
import RecyclingCenters from "../pages/UserDashboard/RecyclingCenters/RecyclingCenters";
import ScrapDealers from "../pages/UserDashboard/ScrapDealers/ScrapDealers";
import TrackStatus from "../pages/UserDashboard/TrackStatus";
import Profile from "../pages/UserDashboard/Profile";


// Admin
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import ManageCollectors from "../pages/AdminDashboard/ManageCollectors";
import PickupRequests from "../pages/AdminDashboard/PickupRequests";
import CollectionAreas from "../pages/AdminDashboard/CollectionAreas";
import AssignCollector from "../pages/AdminDashboard/AssignCollector";


// Collector
import CollectorDashboard from "../pages/CollectorDashboard/CollectorDashboard";
import AssignedPickups from "../pages/CollectorDashboard/AssignedPickups";
import RouteMap from "../pages/CollectorDashboard/RouteMap";
import CollectorProfile from "../pages/CollectorDashboard/CollectorProfile";
import About from "../pages/About/About";



function AppRoutes(){


return (

<BrowserRouter>

<Routes>


{/* Common */}

<Route path="/" element={<Home/>}/>

<Route path="/roles" element={<RoleSelection/>}/>

<Route path="/login/:role" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>




{/* ================= USER ================= */}


<Route path="/UserDashboard" element={<UserDashboard/>}>


    {/* Default Dashboard */}

    <Route 
      index 
      element={<Dashboard/>}
    />


    <Route 
      path="dashboard" 
      element={<Dashboard/>}
    />


    <Route 
      path="request" 
      element={<RequestPickup/>}
    />


    <Route 
      path="ai-classifier" 
      element={<AIWasteClassifier/>}
    />


    <Route 
      path="RecyclingCenters" 
      element={<RecyclingCenters/>}
    />


    <Route 
      path="ScrapDealers" 
      element={<ScrapDealers/>}
    />


    <Route 
      path="track" 
      element={<TrackStatus/>}
    />

    <Route 
      path="profile" 
      element={<Profile/>}
    />

</Route>

{/* ================= ADMIN ================= */}


<Route 
 path="/AdminDashboard" 
 element={<AdminDashboard/>}
/>


<Route 
 path="/admin/users" 
 element={<ManageUsers/>}
/>


<Route 
 path="/admin/collectors" 
 element={<ManageCollectors/>}
/>


<Route 
 path="/admin/pickups" 
 element={<PickupRequests/>}
/>


<Route 
 path="/admin/areas" 
 element={<CollectionAreas/>}
/>


<Route
 path="/admin/assign/:id"
 element={<AssignCollector/>}
/>





{/* ================= COLLECTOR ================= */}


<Route 
 path="/CollectorDashboard" 
 element={<CollectorDashboard/>}
/>


<Route 
 path="/collector/pickups" 
 element={<AssignedPickups/>}
/>

<Route 
 path="/collector/map" 
 element={<RouteMap/>}
/>


<Route 
 path="/collector/profile" 
 element={<CollectorProfile/>}
/>


<Route 
 path="/about" 
 element={<About/>}
/>

</Routes>

</BrowserRouter>

)

}

export default AppRoutes;