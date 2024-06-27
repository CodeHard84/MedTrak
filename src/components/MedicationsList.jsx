import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../api/medications';

const MedicationsList = () => {
  const { getMedications, deleteMedication } = useApi();
  const [medications, setMedications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedications = async () => {
      const data = await getMedications();
      setMedications(data);
    };

    fetchMedications();
  }, []);

  const handleDelete = async (id) => {
    await deleteMedication(id);
    setMedications(medications.filter((medication) => medication._id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h1>Medications</h1>
      <ul>
        {medications.map((medication) => (
          <li key={medication._id}>
            {medication.name} - {medication.dosage} - {medication.frequency}
            <button onClick={() => handleEdit(medication._id)}>Edit</button>
            <button onClick={() => handleDelete(medication._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationsList;
