// DashboardPage.jsx
import React, { useState } from 'react';
import TopPanel from '../../components/TopPanel';
import SidePanel from '../../components/SidePanel';
import AllocationDetails from '../../components/AllocationDetails';
import WaitList from '../../components/WaitList';
import BedDetails from '../../components/BedDetails';
<<<<<<< HEAD
import Dashboard from '../../components/Dashboard';

import './DashboardPage.css'; // Import the CSS file for DashboardPage
=======
import Dashboard from '../../components/Dashboard'; // Import the Dashboard component
>>>>>>> 4dd9a06b04403d46da03da1f4cae72a3076d7df5

const DashboardPage = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="dashboard-page">
      <TopPanel />
      <div className="main-content-wrapper">
        <SidePanel />
        <main className="content">
<<<<<<< HEAD
          <h1 className="dashboard-heading">Dashboard Page</h1>
          <div className="button-container">
            <button className="dashboard-button" onClick={() => handleButtonClick('patients')}>
              Patients
            </button>
            <button className="dashboard-button" onClick={() => handleButtonClick('allocation')}>
              Allocation Details
            </button>
            <button className="dashboard-button" onClick={() => handleButtonClick('waitlist')}>
              Wait List
            </button>
            <button className="dashboard-button" onClick={() => handleButtonClick('beddetails')}>
              Bed Details
            </button>
          </div>
          {activeComponent === 'patients' && <Dashboard />}
=======
          <h1>Dashboard Page</h1>
          {/* Buttons to switch between components */}
          <div>
            <button onClick={() => handleButtonClick('patients')}>Patients</button>
            <button onClick={() => handleButtonClick('allocation')}>Allocation Details</button>
            <button onClick={() => handleButtonClick('waitlist')}>Wait List</button>
            <button onClick={() => handleButtonClick('beddetails')}>Bed Details</button>
          </div>
          {/* Render the selected component */}
          {activeComponent === 'patients' && <Dashboard />} {/* Render Dashboard component */}
>>>>>>> 4dd9a06b04403d46da03da1f4cae72a3076d7df5
          {activeComponent === 'allocation' && <AllocationDetails />}
          {activeComponent === 'waitlist' && <WaitList />}
          {activeComponent === 'beddetails' && <BedDetails />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
