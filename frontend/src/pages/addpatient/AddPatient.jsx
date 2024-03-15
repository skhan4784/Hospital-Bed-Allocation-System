import React from 'react';
import axios from 'axios';
import './AddPatient.css';
import AddPatientForm from '../../components/AddPatientForm';
import TopPanel from '../../components/TopPanel';
import SidePanel from '../../components/SidePanel';

const AddPatientPage = () => {

  // Define a function to handle adding a new patient
  const handleAddPatient = async (newPatient) => {
    try {
      // Make a POST request to your backend API endpoint to add the patient
      await axios.post('/api/add_patient', newPatient);
      // Optionally, show a success message or perform any other action upon successful addition
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="home-page">
      <TopPanel/>
      <div className="main-content-wrapper">
        <SidePanel/>
        <main className="content">
          <h2>Add Patient</h2>
          <AddPatientForm onAdd={handleAddPatient} />
        </main>
      </div>
    </div>
  );
}

export default AddPatientPage;
