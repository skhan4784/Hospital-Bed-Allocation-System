// SidePanel.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SidePanel.css';

const SidePanel = () => {
  const navigate = useNavigate();

  return (
    <aside className="side-panel">
      <nav>
        <ul>
          <li onClick={() => navigate('/home')}>Home</li>
          <li onClick={() => navigate('/dashboard')}>Dashboard</li>
          <li onClick={() => navigate('/add-patient')}>Add Patient</li>
          <li onClick={() => navigate('/system-settings')}>System Settings</li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidePanel;
