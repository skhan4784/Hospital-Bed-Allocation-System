// AllocationDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './AllocationDetails.css'; // Import the CSS file for AllocationDetails

const AllocationDetails = () => {
  const [allocationDetails, setAllocationDetails] = useState([]);

  useEffect(() => {
    // Function to fetch allocation details from backend
    const fetchAllocationDetails = async () => {
      try {
        // Make GET request to backend endpoint to fetch allocation details
        const response = await axios.get('http://127.0.0.1:5000/api/get_allocation_details');
        // Update state with fetched allocation details
        setAllocationDetails(response.data);
      } catch (error) {
        console.error('Error fetching allocation details:', error);
      }
    };

    // Call fetchAllocationDetails function when component mounts
    fetchAllocationDetails();
  }, []); // Run effect only once when component mounts

  return (
<<<<<<< HEAD
    <div className="allocation-details">
      <h2>Allocation Details</h2>
      <div className='patient-list'>
        {allocationDetails.map((detail, index) => (
          <div className="patient-card" key={index}>
            <div className="patient-avatar">
              <img src={`https://source.unsplash.com/100x100/?patient,hospital`} alt="Patient Avatar" />
            </div>
            <div className="patient-card-content">
              <h3>Patient ID: {detail.patient_id}</h3>
              <p>Arrival Date: {detail.arrival_date}</p>
              <p>Bed Number: {detail.bed_number}</p>
            </div>
          </div>
        ))}
      </div>
=======
    <div>
    <h2>Allocation Details</h2>
    <table>
      <thead>
        <tr>
          <th>Patient ID</th>
          <th>Arrival Date</th>
          <th>Bed Number</th>
        </tr>
      </thead>
      <tbody>
        {allocationDetails.map((detail, index) => (
          <tr key={index}>
            <td>{detail.patient_id}</td>
            <td>{detail.arrival_date}</td>
            <td>{detail.bed_number}</td>
          </tr>
        ))}
      </tbody>
    </table>
>>>>>>> 4dd9a06b04403d46da03da1f4cae72a3076d7df5
    </div>

  );
};

export default AllocationDetails;
