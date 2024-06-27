import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../api/medications';

const CreateMedication = () => {
  const { createMedication } = useApi();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMedication = { name, dosage, frequency };
    await createMedication(newMedication);
    // Redirect to the medication list after successful creation
    navigate('/');
  };

  return (
    <div>
      <h1>Create Medication</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Dosage</label>
          <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} />
        </div>
        <div>
          <label>Frequency</label>
          <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateMedication;
