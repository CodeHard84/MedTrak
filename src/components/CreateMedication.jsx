import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import useApi from '../api/medications';

const CreateMedication = () => {
  const { createMedication } = useApi();
  const [formState, setFormState] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    howManyTimes: 1,
    times: ['']
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === 'frequency' && value !== 'daily' ? { howManyTimes: undefined, times: [] } : {})
    }));
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...formState.times];
    updatedTimes[index] = value;
    setFormState((prevState) => ({
      ...prevState,
      times: updatedTimes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedication(formState);
      navigate('/');
    } catch (error) {
      console.error('Error creating medication:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Create Medication</h1>
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
              as="select"
              name="frequency"
              value={formState.frequency}
              onChange={handleInputChange}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Form.Control>
          </Col>
        </Form.Group>
        {formState.frequency === 'daily' && (
          <>
            <Form.Group as={Row} className="mb-3" controlId="formHowManyTimes">
              <Form.Label column sm={2}>
                How Many Times
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  name="howManyTimes"
                  value={formState.howManyTimes || ''}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFormState((prevState) => ({
                      ...prevState,
                      times: Array(parseInt(e.target.value)).fill('')
                    }));
                  }}
                />
              </Col>
            </Form.Group>
            {Array.from({ length: formState.howManyTimes }).map((_, index) => (
              <Form.Group as={Row} className="mb-3" controlId={`formTime${index}`} key={index}>
                <Form.Label column sm={2}>
                  Time {index + 1}
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="time"
                    value={formState.times[index] || ''}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                  />
                </Col>
              </Form.Group>
            ))}
          </>
        )}
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateMedication;
