import React, { useEffect, useState } from 'react';
import useApi from '../api/medications';

const MedicationsList = () => {
  const { getMedications, deleteMedication } = useApi();
  const [medications, setMedications] = useState([]);

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

  return (
    <div>
      <h1>Medications</h1>
      <ul>
        {medications.map((medication) => (
          <li key={medication._id}>
            {medication.name} - {medication.dosage} - {medication.frequency}
            <button onClick={() => handleDelete(medication._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicationsList;
