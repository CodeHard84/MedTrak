import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Button } from 'react-bootstrap';
import useApi from '../api/medications';

const MedicationProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMedicationById, generateDescription } = useApi();
  const [medication, setMedication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [descriptionLoading, setDescriptionLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const fetchedMedication = await getMedicationById(id);
        setMedication(fetchedMedication);

        if (!fetchedMedication.description || !fetchedMedication.sideEffects) {
          const { description, sideEffects } = await generateDescription(fetchedMedication.name, id);
          setMedication(prev => ({ ...prev, description, sideEffects }));
        }

        setDescriptionLoading(false);
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

  const renderSideEffects = () => {
    if (!medication.sideEffects) return null;
    const sideEffectsList = medication.sideEffects.split(/[\d+]\.\s/).filter(effect => effect.trim() !== '');
    return (
      <ul>
        {sideEffectsList.map((effect, index) => (
          <li key={index}>{effect}</li>
        ))}
      </ul>
    );
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
      {descriptionLoading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <div className="mt-3">
            <h3>Description:</h3>
            <p>{medication.description}</p>
          </div>
          <div className="mt-3">
            <h3>Side Effects:</h3>
            {renderSideEffects()}
          </div>
        </>
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
