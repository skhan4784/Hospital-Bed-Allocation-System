import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginpage/LoginPage';
import HomePage from './pages/homepage/HomePage';
import AddPatientPage from './pages/addpatient/AddPatient';
import DashboardPage from './pages/dashboard/DashboardPage';
import SystemSettingsPage from './pages/systemsettings/SystemSettings';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* If you had other routes, they would look something like this */}
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/add-patient" element={<AddPatientPage />} /> */}
        <Route path="/add-patient" element={<AddPatientPage />} />
        {/* <Route path="/add-patient" element={<AddPatientPage />} /> */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route path="/system-settings" element={<SystemSettingsPage />} /> */}
        <Route path="/system-settings" element={<SystemSettingsPage />} />
        {/* If no other route matches, you can set a catch-all route like this */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
