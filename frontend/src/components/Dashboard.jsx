// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/get_patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/delete_patient/${id}`);
      setPatients(patients.filter(patient => patient._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // Function to handle delete patient
  // Function to handle delete patient
  const handleDelete = async (id) => {
    try {
      // Make DELETE request to backend endpoint to delete patient
      await axios.delete(`http://127.0.0.1:5000/api/delete_patient/${id}`);
      // Update state to remove deleted patient
      setPatients(patients.filter(patient => patient._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };


  return (
<<<<<<< HEAD
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Patient Dashboard</h2>
      <div className="dashboard-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Length of Stay</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.patient_id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.length_of_stay} days</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(patient._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
=======
    <div className="dashboard">
      <h2>Patients</h2>
      {/* Display the list of patients */}
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>
            {patient.name}
            {/* Delete button */}
            <button onClick={() => handleDelete(patient._id)}>Delete</button>
          </li>
        ))}
      </ul>
>>>>>>> 4dd9a06b04403d46da03da1f4cae72a3076d7df5
    </div>
  );
};

export default Dashboard;
