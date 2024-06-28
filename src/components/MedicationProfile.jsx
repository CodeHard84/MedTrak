import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Button } from 'react-bootstrap';

const MedicationProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medication, setMedication] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await axios.get(`/api/medications/${id}`);
        setMedication(response.data);

        // Automatically generate the description after fetching the medication
        const generateDescription = async (medicationName) => {
          try {
            const descriptionResponse = await axios.post('/api/openai/generate-description', { medicationName });
            setDescription(descriptionResponse.data.description);
          } catch (error) {
            console.error('Error generating description:', error);
          }
        };

        await generateDescription(response.data.name);
      } catch (error) {
        console.error('Error fetching medication:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);

    try {
      await axios.delete(`/api/medications/${id}`);
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
