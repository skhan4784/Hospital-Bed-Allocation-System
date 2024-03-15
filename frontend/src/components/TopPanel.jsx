// TopPanel.jsx
import React from 'react';
import logo from '../assets/images/logo.jpeg';
import { useNavigate } from 'react-router-dom';

const TopPanel = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality
    // For now, we will just redirect to the login page
    navigate('/');
  };

  return (
    <header className="top-panel">
      <img src={logo} alt="Logo" className="home-logo" />
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </header>
  );
};

export default TopPanel;
