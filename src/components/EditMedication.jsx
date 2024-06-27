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
    frequency: 'daily',
    howManyTimes: 1,
    times: ['']
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const medications = await getMedications();
        const med = medications.find((medication) => medication._id === id);
        if (med && initialLoad) {
          setFormState({
            name: med.name,
            dosage: med.dosage,
            frequency: med.frequency,
            howManyTimes: med.howManyTimes || 1,
            times: med.times.length > 0 ? med.times : Array(med.howManyTimes || 1).fill('')
          });
          setInitialLoad(false);
        }
      } catch (error) {
        console.error('Error fetching medication:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [id, getMedications, initialLoad]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === 'frequency' && value !== 'daily' ? { howManyTimes: undefined, times: [] } : {}),
      ...(name === 'frequency' && value === 'daily' ? { howManyTimes: 1, times: [''] } : {})
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
      await updateMedication(id, formState);
      navigate('/');
    } catch (error) {
      console.error('Error updating medication:', error);
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
                How Many Doses Daily
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  name="howManyTimes"
                  min="1"
                  value={formState.howManyTimes || ''}
                  onChange={(e) => {
                    handleInputChange(e);
                    const newHowManyTimes = parseInt(e.target.value);
                    setFormState((prevState) => ({
                      ...prevState,
                      times: Array(newHowManyTimes).fill('').map((_, index) => prevState.times[index] || '')
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
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default EditMedication;
