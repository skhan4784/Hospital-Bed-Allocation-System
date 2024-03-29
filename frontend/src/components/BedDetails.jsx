// BedDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BedDetails.css';

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
    <div className="bed-details">
      <h2>Bed Details</h2>
      <div className="beds-container">
        {beds.map((bed, index) => (
          <div className={`bed-card ${bed.is_occupied ? 'occupied' : 'vacant'}`} key={index}>
            <div className="bed-number">
              <label>Bed Number: </label>
              <span>{bed.bed_number}</span>
            </div>
            <div className="status">{bed.is_occupied ? 'Occupied' : 'Vacant'}</div>
            <div className="patient-id">
              <label>Patient ID: </label>
              <span>{bed.patient_id || 'N/A'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BedDetails;
