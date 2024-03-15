// DashboardPage.jsx
import React, { useState } from 'react';
import TopPanel from '../../components/TopPanel';
import SidePanel from '../../components/SidePanel';
import AllocationDetails from '../../components/AllocationDetails';
import WaitList from '../../components/WaitList';
import BedDetails from '../../components/BedDetails';

const DashboardPage = () => {
  // State to manage which component to display
  const [activeComponent, setActiveComponent] = useState(null);

  // Function to handle button click and set the active component
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="home-page">
      <TopPanel />
      <div className="main-content-wrapper">
        <SidePanel />
        <main className="content">
          <h1>Dashboard Page</h1>
          {/* Buttons to switch between components */}
          <div>
            <button onClick={() => handleButtonClick('allocation')}>Allocation Details</button>
            <button onClick={() => handleButtonClick('waitlist')}>Wait List</button>
            <button onClick={() => handleButtonClick('beddetails')}>Bed Details</button>
          </div>
          {/* Render the selected component */}
          {activeComponent === 'allocation' && <AllocationDetails />}
          {activeComponent === 'waitlist' && <WaitList />}
          {activeComponent === 'beddetails' && <BedDetails />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
