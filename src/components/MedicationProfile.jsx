import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import useApi from '../api/medications';

const MedicationProfile = () => {
  const { id } = useParams();
  const { getMedicationById, deleteMedication } = useApi();
  const [medication, setMedication] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const med = await getMedicationById(id);
        setMedication(med);
      } catch (error) {
        console.error('Error fetching medication:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [id, getMedicationById]);

  const handleDelete = async () => {
    try {
      await deleteMedication(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (!medication) {
    return (
      <Container className="text-center mt-5">
        <p>Medication not found</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1>{medication.name}</h1>
      <Row>
        <Col sm={2}><strong>Dosage:</strong></Col>
        <Col sm={10}>{medication.dosage}</Col>
      </Row>
      <Row>
        <Col sm={2}><strong>Frequency:</strong></Col>
        <Col sm={10}>{medication.frequency}</Col>
      </Row>
      {medication.frequency === 'daily' && (
        <Row>
          <Col sm={2}><strong>Times per day:</strong></Col>
          <Col sm={10}>{medication.howManyTimes}</Col>
        </Row>
      )}
      {medication.frequency === 'weekly' && (
        <Row>
          <Col sm={2}><strong>Day of the week:</strong></Col>
          <Col sm={10}>{medication.dayOfWeek}</Col>
        </Row>
      )}
      {medication.frequency === 'monthly' && (
        <Row>
          <Col sm={2}><strong>Day of the month:</strong></Col>
          <Col sm={10}>{medication.dayOfMonth}</Col>
        </Row>
      )}
      <Row>
        <Col sm={2}><strong>Time:</strong></Col>
        <Col sm={10}>{medication.time}</Col>
      </Row>
      <Button variant="warning" onClick={handleEdit} className="mt-3 me-2">Edit</Button>
      <Button variant="danger" onClick={handleDelete} className="mt-3">Delete</Button>
    </Container>
  );
};

export default MedicationProfile;
