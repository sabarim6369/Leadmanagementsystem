import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './utils/sidebar';
import Profile from './components/admin/Profile/Profile';
import Dashboard from './components/admin/Dashboard/Dashboard';
import Report from './components/admin/Report/Report';
import TelecallersDashboard from './components/telecaller/Dashboard/Dashboard';
import Telecallers from './components/admin/Telecallers/Telecallers';
import LoginPage from './components/admin/Login/Login';
import ProtectedRoute from './utils/Protectedroute';
import Leads from "./components/admin/Leads/Leads" 
import TelecallersLeads from './components/telecaller/Leads/Leads';
import { jwtDecode } from 'jwt-decode'; 

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const getRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.role;
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    return null;
  };

  useEffect(() => {
    setUserRole(getRoleFromToken());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null); 
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />

        <Route path="/" element={<Sidebar onLogout={handleLogout} />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute 
              element={userRole === "admin" ? <Dashboard /> : <TelecallersDashboard />} 
              allowedRoles={["admin", "telecaller"]} 
            />
          } 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute element={<Profile />} allowedRoles={["admin"]} />} 
        />
        <Route 
          path="/report" 
          element={<ProtectedRoute element={<Report />} allowedRoles={["admin", "telecaller"]} />} 
        />
        <Route 
          path="/telecallers" 
          element={<ProtectedRoute element={<Telecallers />} allowedRoles={["admin"]} />} 
        />
        <Route 
          path="/leads" 
          element={<ProtectedRoute element={userRole==="admin"?<Leads />:<TelecallersLeads/>} allowedRoles={["admin","telecaller"]} />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
