import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Button } from 'react-bootstrap';
import useApi from '../api/medications';

const MedicationProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMedicationById, deleteMedication, generateDescription } = useApi();
  const [medication, setMedication] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await getMedicationById(id);
        setMedication(response);

        // Check if description exists and generate if necessary
        if (response.description) {
          setDescription(response.description);
          setLoading(false); // Stop loading if description already exists
        } else {
          const descriptionResponse = await generateDescription(response.name);
          setDescription(descriptionResponse.description);
          setLoading(false); // Stop loading after description is generated
        }
      } catch (error) {
        console.error('Error fetching medication:', error);
        setLoading(false); // Stop loading on error
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
        </div>
      ) : (
        <p>Loading description...</p>
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
