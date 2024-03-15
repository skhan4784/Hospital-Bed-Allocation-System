// AddBedsForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AddBedsForm = () => {
  const [bedNumber, setBedNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend to add the bed
      await axios.post('http://127.0.0.1:5000/api/add_bed', {
        bed_number: bedNumber
      });
      console.log('Bed added successfully!');
      // Clear the input field after adding the bed
      setBedNumber('');
    } catch (error) {
      console.error('Error adding bed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Bed Number:
        <input
          type="number"
          value={bedNumber}
          onChange={(e) => setBedNumber(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Bed</button>
    </form>
  );
};

export default AddBedsForm;
