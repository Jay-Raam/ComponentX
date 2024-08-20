import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashbord from "./components/Dashbord";
import { AuthProvider } from "./components/ui/AuthContext";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Home from "./components/Home";
import Profile from "./components/ui/profile";
import Company from "./components/ui/Company";
import Chart from "./components/ui/dashboardhome";
import Datepicker from "./components/ui/Datepicker";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashbord />} />}
        >
          {/* Nested routes for the dashboard */}
          <Route index element={<Datepicker />} />
          <Route path="profile" element={<Profile />} />
          <Route path="company" element={<Company />} />
          <Route path="chart" element={<Chart />} />
          <Route path="datapicker" element={<Datepicker />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
