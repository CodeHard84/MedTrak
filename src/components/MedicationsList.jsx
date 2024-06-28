import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ListGroup, Spinner } from 'react-bootstrap';
import useApi from '../api/medications';

const MedicationsList = () => {
  const { getMedications } = useApi();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const meds = await getMedications();
        setMedications(meds);
      } catch (error) {
        console.error('Error fetching medications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, [getMedications]);

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
      <h1>Medications</h1>
      <ListGroup>
        {medications.map((medication) => (
          <ListGroup.Item
            key={medication._id}
            action
            onClick={() => navigate(`/medications/${medication._id}`)}
          >
            {medication.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default MedicationsList;
