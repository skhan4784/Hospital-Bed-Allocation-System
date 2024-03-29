// DashboardPage.jsx
import React, { useState } from 'react';
import TopPanel from '../../components/TopPanel';
import SidePanel from '../../components/SidePanel';
import AllocationDetails from '../../components/AllocationDetails';
import WaitList from '../../components/WaitList';
import BedDetails from '../../components/BedDetails';
import Dashboard from '../../components/Dashboard';

import './DashboardPage.css'; // Import the CSS file for DashboardPage

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
          {activeComponent === 'allocation' && <AllocationDetails />}
          {activeComponent === 'waitlist' && <WaitList />}
          {activeComponent === 'beddetails' && <BedDetails />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
