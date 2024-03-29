import React, { useState } from 'react';
import axios from 'axios';
import './AddBedsForm.css';

const AddBedsForm = ({ onAdd }) => {
  const [bedNumber, setBedNumber] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend to add the bed
      await axios.post('http://127.0.0.1:5000/api/add_bed', {
        bed_number: bedNumber
      });
      console.log('Bed added successfully!');
      setFeedback('Bed added successfully');
      setTimeout(() => {
        setFeedback('');
      }, 2000);
      // Clear the input field after adding the bed
      setBedNumber('');
      // Call the parent component function to handle addition
      onAdd && onAdd();
    } catch (error) {
      console.error('Error adding bed:', error);
      setFeedback('An error occurred while adding the bed');
    }
  };

  return (
    <div className="add-beds-form">
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
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
};

export default AddBedsForm;
