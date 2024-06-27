import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../api/medications';

const EditMedication = () => {
  const { id } = useParams();
  const { getMedications, updateMedication } = useApi();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedication = async () => {
      const medications = await getMedications();
      const medication = medications.find((med) => med._id === id);
      if (medication) {
        setName(medication.name);
        setDosage(medication.dosage);
        setFrequency(medication.frequency);
      }
    };

    fetchMedication();
  }, [id, getMedications]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMedication = { name, dosage, frequency };
    await updateMedication(id, updatedMedication);
    navigate('/');
  };

  return (
    <div>
      <h1>Edit Medication</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditMedication;
