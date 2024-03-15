// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Function to fetch patient data from backend
    const fetchPatients = async () => {
      try {
        // Make GET request to backend endpoint to fetch patients
        const response = await axios.get('http://127.0.0.1:5000/api/get_patients');
        // Update state with fetched patient data
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    // Call fetchPatients function when component mounts
    fetchPatients();
  }, []); // Run effect only once when component mounts

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {/* Display the list of patients */}
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
