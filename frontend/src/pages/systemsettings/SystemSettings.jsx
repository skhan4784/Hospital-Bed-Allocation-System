import React from 'react';
import axios from 'axios';
import './SystemSettings.css';
import AddBedsForm from '../../components/AddBedsForm';
import TopPanel from '../../components/TopPanel';
import SidePanel from '../../components/SidePanel';

const SystemSettingsPage = () => {
  // Define a function to handle adding a new patient
  const handleAddPatient = async (newPatient) => {
    try {
      // Make a POST request to your backend API endpoint to add the patient
      await axios.post('/api/add_patient', newPatient);
      // Optionally, show a success message or perform any other action upon successful addition
      console.log('Patient added successfully!');
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="system-settings-page">
      <TopPanel/>
      <div className="main-content-wrapper">
        <SidePanel/>
        <main className="content">
          <h2 className="systemSettingsPage-title">System Settings</h2>
          <div className="systemSettingsForm-container">
            <h3 className="systemSettingsForm-title">Add New Bed</h3>
            <AddBedsForm onAdd={handleAddPatient} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default SystemSettingsPage;
