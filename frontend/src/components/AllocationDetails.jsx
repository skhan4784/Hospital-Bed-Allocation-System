// AllocationDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    </div>

  );
};

export default AllocationDetails;
