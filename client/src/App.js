import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/ui/AuthContext";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Image000001 from "./components/image/m1.png";

// Dynamically import your components
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashbord"));
const Home = lazy(() => import("./components/Home"));
const Profile = lazy(() => import("./components/ui/profile"));
const Company = lazy(() => import("./components/ui/Company"));
const Chart = lazy(() => import("./components/ui/dashboardhome"));
const Datepicker = lazy(() => import("./components/ui/Datepicker"));

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <img
              src={Image000001}
              alt="Loading..."
              className="w-24 h-24 animate-wave"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          >
            {/* Nested routes for the dashboard */}
            <Route index element={<Datepicker />} />
            <Route path="profile" element={<Profile />} />
            <Route path="company" element={<Company />} />
            <Route path="chart" element={<Chart />} />
            <Route path="datepicker" element={<Datepicker />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
