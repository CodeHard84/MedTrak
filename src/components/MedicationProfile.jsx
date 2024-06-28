import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Button } from 'react-bootstrap';
import useApi from '../api/medications';

const MedicationProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMedicationById, generateDescription } = useApi();
  const [medication, setMedication] = useState(null);
  const [description, setDescription] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const medicationData = await getMedicationById(id);
        setMedication(medicationData);

        if (!medicationData.description || !medicationData.sideEffects) {
          const generatedData = await generateDescription(medicationData.name, id);
          setDescription(generatedData.description);
          setSideEffects(generatedData.sideEffects);
        } else {
          setDescription(medicationData.description);
          setSideEffects(medicationData.sideEffects);
        }
      } catch (error) {
        console.error('Error fetching medication:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [id, getMedicationById, generateDescription]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);

    try {
      await deleteMedication(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting medication:', error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1>{medication.name}</h1>
      <p>Dosage: {medication.dosage}</p>
      <p>Frequency: {medication.frequency}</p>
      {description ? (
        <div className="mt-3">
          <h3>Description:</h3>
          <p>{description}</p>
          <h3>Common Side Effects:</h3>
          <p>{sideEffects}</p>
        </div>
      ) : (
        <p>Loading description and side effects...</p>
      )}
      <div className="mt-3">
        <Button variant="warning" onClick={handleEdit} className="me-2">
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Container>
  );
};

export default MedicationProfile;
