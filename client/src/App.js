import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom"; // Ensure BrowserRouter is imported
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './utils/sidebar';
import Profile from './components/admin/profile'
import Dashboard from './components/admin/dashboard';
import Report from './components/admin/report'
const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
