import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './utils/sidebar';
import Profile from './components/admin/Profile/Profile'
import Dashboard from './components/admin/Dashboard/Dashboard';
import Report from './components/admin/Report/Report'
import TelecallersDashboard from './components/telecaller/Dashboard/Dashboard';
import Telecallers from './components/admin/Telecallers/Telecallers';
import LoginPage from './components/admin/Login/Login'
const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report/>}/>
        <Route path="/telecallers" element={<Telecallers/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
