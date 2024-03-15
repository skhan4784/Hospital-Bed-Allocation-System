import React, { useState } from 'react';
import axios from 'axios';

const AddPatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [lengthOfStay, setLengthOfStay] = useState('');

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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Length of Stay:
        <input type="number" value={lengthOfStay} onChange={(e) => setLengthOfStay(e.target.value)} />
      </label>
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default AddPatientForm;
