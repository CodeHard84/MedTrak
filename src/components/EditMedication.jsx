import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../api/medications';

const EditMedication = () => {
  const { id } = useParams();
  const { getMedications, updateMedication } = useApi();
  const [loading, setLoading] = useState(true);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    dosage: '',
    frequency: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const medications = await getMedications();
        const med = medications.find((medication) => medication._id === id);
        if (med) {
          setFormState({
            name: med.name,
            dosage: med.dosage,
            frequency: med.frequency,
          });
          setInitialDataFetched(true);
        }
      } catch (error) {
        console.error("Error fetching medication:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [id, getMedications]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMedication(id, formState);
      navigate('/');
    } catch (error) {
      console.error("Error updating medication:", error);
    }
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
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Dosage</label>
          <input
            type="text"
            name="dosage"
            value={formState.dosage}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Frequency</label>
          <input
            type="text"
            name="frequency"
            value={formState.frequency}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditMedication;
