<<<<<<< HEAD
// WaitList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './WaitList.css'; // Import the CSS file for WaitList

const WaitList = () => {
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Waitlist = () => {
>>>>>>> 4dd9a06b04403d46da03da1f4cae72a3076d7df5
  const [waitlist, setWaitlist] = useState([]);

  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/waitlist');
        setWaitlist(response.data);
      } catch (error) {
        console.error('Error fetching waitlist:', error);
      }
    };

    fetchWaitlist();
  }, []);

  return (
<<<<<<< HEAD
    <div className="waitlist">
      <h2>Waitlist</h2>
      <div className="patient-list">
        {waitlist.map((patient, index) => (
          <div className="patient-card" key={index}>
            <div className="patient-avatar">
              <img src={`https://source.unsplash.com/100x100/?patient,hospital`} alt="Patient Avatar" />
            </div>
            <div className="patient-details">
              <h3>Patient ID: {patient.patient_id}</h3>
              <p>Arrival Date: {patient.arrival_date}</p>
              <p>Waiting Time: {patient.waiting_time}</p>
            </div>
          </div>
        ))}
      </div>
=======
    <div>
      <h2>Waitlist</h2>
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Arrival Date</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          {waitlist.map((patient, index) => (
            <tr key={index}>
              <td>{patient.patient_id}</td>
              <td>{patient.arrival_date}</td>
              <td>{patient.waiting_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
>>>>>>> 4dd9a06b04403d46da03da1f4cae72a3076d7df5
    </div>
  );
};

export default Waitlist;
