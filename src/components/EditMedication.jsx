import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../api/medications';

const EditMedication = () => {
  const { id } = useParams();
  const { getMedications, updateMedication } = useApi();
  const [loading, setLoading] = useState(true);
  const [medication, setMedication] = useState(null);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedication = async () => {
      const medications = await getMedications();
      const med = medications.find((medication) => medication._id === id);
      if (med) {
        setMedication(med);
        setName(med.name);
        setDosage(med.dosage);
        setFrequency(med.frequency);
        setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
