import React, { useState } from 'react';
import axios from 'axios';
import './AddPatientForm.css';

const AddPatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [lengthOfStay, setLengthOfStay] = useState('');
  const [feedback, setFeedback] = useState(''); // State for feedback message

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');

    // Generate a unique numeric patient ID
    const patientId = await generatePatientId();

    try {
      // Send a POST request to the backend with patient data
      await axios.post('http://127.0.0.1:5000/api/add_patient', {
        patient_id: patientId,
        name,
        age,
        length_of_stay: lengthOfStay
      });
      console.log('Request sent to backend!');
      setFeedback('Patient Added Successfully'); // Set feedback message
      setTimeout(() => {
        setFeedback(''); // Clear feedback message after 2 seconds
      }, 2000);

      // Clear input fields
      setName('');
      setAge('');
      setLengthOfStay('');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const generatePatientId = async () => {
    let uniqueId;
    let isUnique = false;

    // Keep generating random numeric IDs until a unique one is found
    while (!isUnique) {
      uniqueId = Math.floor(Math.random() * 100000); // Generate a random numeric ID

      // Check if the generated ID already exists in the database
      const response = await axios.get(`http://127.0.0.1:5000/api/check_patient_id/${uniqueId}`);
      isUnique = response.data.isUnique;
    }

    return uniqueId;
  };

  return (
    <div>
      {feedback && <div className="feedback">{feedback}</div>}
      <form onSubmit={handleSubmit} className="add-patient-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lengthOfStay">Length of Stay:</label>
          <input type="number" id="lengthOfStay" value={lengthOfStay} onChange={(e) => setLengthOfStay(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatientForm;
