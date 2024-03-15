// BedDetails.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BedDetails = () => {
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    // Fetch bed details from the backend when the component mounts
    const fetchBedDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/bed_details');
        setBeds(response.data);
      } catch (error) {
        console.error('Error fetching bed details:', error);
      }
    };

    fetchBedDetails();
  }, []); // Empty dependency array to only run once on mount

  return (
    <div>
      <h2>Bed Details</h2>
      <table>
        <thead>
          <tr>
            <th>Bed Number</th>
            <th>Is Occupied</th>
            <th>Patient ID</th>
          </tr>
        </thead>
        <tbody>
          {beds.map((bed, index) => (
            <tr key={index}>
              <td>{bed.bed_number}</td>
              <td>{bed.is_occupied ? 'Occupied' : 'Vacant'}</td>
              <td>{bed.patient_id || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BedDetails;
