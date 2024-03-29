// TopPanel.jsx
import React from 'react';
import logo from '../assets/images/logo.jpeg';
import { useNavigate } from 'react-router-dom';
import './TopPanel.css';

const TopPanel = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="top-panel">
      <div className="left-content">
        <img src={logo} alt="Logo" className="home-logo" onClick={handleLogoClick} />
      </div>
      <div className="right-content">
        <button onClick={handleLogout} className="logout-button bigger-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopPanel;
