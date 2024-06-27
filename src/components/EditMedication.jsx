import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import useApi from '../api/medications';

const EditMedication = () => {
  const { id } = useParams();
  const { getMedications, updateMedication } = useApi();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [formState, setFormState] = useState({
    name: '',
    dosage: '',
    frequency: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const medications = await getMedications();
        const med = medications.find(medication => medication._id === id);
        if (med && initialLoad) {
          setFormState({
            name: med.name,
            dosage: med.dosage,
            frequency: med.frequency
          });
          setInitialLoad(false);
        }
      } catch (error) {
        console.error("Error fetching medication:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [id, getMedications, initialLoad]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
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
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1>Edit Medication</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDosage">
          <Form.Label column sm={2}>
            Dosage
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="dosage"
              value={formState.dosage}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formFrequency">
          <Form.Label column sm={2}>
            Frequency
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="frequency"
              value={formState.frequency}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default EditMedication;
