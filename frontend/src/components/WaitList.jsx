import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Waitlist = () => {
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
    </div>
  );
};

export default Waitlist;
