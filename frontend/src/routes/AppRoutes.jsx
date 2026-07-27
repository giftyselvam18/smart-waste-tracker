
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import RoleSelection from "../pages/RoleSelection/RoleSelection";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import Dashboard from "../pages/UserDashboard/Dashboard";
import RequestPickup from "../pages/UserDashboard/RequestPickup";
import TrackStatus from "../pages/UserDashboard/TrackStatus";
import CollectionHistory from "../pages/UserDashboard/CollectionHistory";
import Notifications from "../pages/UserDashboard/Notifications";
import Profile from "../pages/UserDashboard/Profile";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import ManageCollectors from "../pages/AdminDashboard/ManageCollectors";
import PickupRequests from "../pages/AdminDashboard/PickupRequests";
import CollectionAreas from "../pages/AdminDashboard/CollectionAreas";
import CollectorDashboard from "../pages/CollectorDashboard/CollectorDashboard";
import AssignedPickups from "../pages/CollectorDashboard/AssignedPickups";
import TodaysCollection from "../pages/CollectorDashboard/TodaysCollection";
import RouteMap from "../pages/CollectorDashboard/RouteMap";
import CollectorCollectionHistory from "../pages/CollectorDashboard/CollectorCollectionHistory";
import CollectorProfile from "../pages/CollectorDashboard/CollectorProfile";
import About from "../pages/About/About";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/roles" element={<RoleSelection />} />
  <Route path="/login/:role" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/UserDashboard" element={<UserDashboard />} />
   <Route path="/UserDashboard/dashboard" element={<Dashboard />} />
   <Route path="/UserDashboard/request" element={<RequestPickup />} />
   <Route path="/UserDashboard/track" element={<TrackStatus />} />
   <Route path="/UserDashboard/history" element={<CollectionHistory />} />
   <Route path="/UserDashboard/notifications" element={<Notifications />} />
   <Route path="/UserDashboard/profile" element={<Profile />} />
  <Route path="/AdminDashboard" element={<AdminDashboard />} />
   <Route path="/admin/users" element={<ManageUsers />} />
   <Route path="/admin/collectors" element={<ManageCollectors />} />
   <Route path="/admin/pickups" element={<PickupRequests />} />
   <Route path="/admin/areas" element={<CollectionAreas />} />

  <Route path="/CollectorDashboard"element={<CollectorDashboard />} />
   <Route path="/collector/pickups" element={<AssignedPickups />} />
   <Route path="/collector/today" element={<TodaysCollection />} />
   <Route path="/collector/map" element={<RouteMap />} />
   <Route path="/collector/history" element={<CollectorCollectionHistory />} />
   <Route path="/collector/profile" element={<CollectorProfile />} />
  <Route path="/about" element={<About />} />
</Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;