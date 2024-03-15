import React from 'react';
import './HomePage.css';
import TopPanel from '../../components/TopPanel';
import SidePanel from '../../components/SidePanel';

function HomePage() {

  return (
    <div className="home-page">
      <TopPanel/>
      <div className="main-content-wrapper">
        <SidePanel/>
        <main className="content">
          {/* Main content goes here */}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
