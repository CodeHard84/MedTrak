import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import useApi from '../api/medications';

const CreateMedication = () => {
  const { createMedication } = useApi();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMedication = { name, dosage, frequency };
    await createMedication(newMedication);
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <h1>Create Medication</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDosage">
          <Form.Label>Dosage</Form.Label>
          <Form.Control
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFrequency">
          <Form.Label>Frequency</Form.Label>
          <Form.Control
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateMedication;
