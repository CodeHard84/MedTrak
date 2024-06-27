import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useApi from '../api/medications';

const CreateMedication = () => {
  const { createMedication } = useApi();
  const [formState, setFormState] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    howManyTimes: 1,
    times: [''],
    dayOfWeek: '',
    dayOfMonth: null,
    time: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === 'frequency' && value !== 'daily' ? { howManyTimes: undefined, times: [], dayOfWeek: '', dayOfMonth: null, time: '' } : {}),
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

  const handleDateChange = (date) => {
    setFormState((prevState) => ({
      ...prevState,
      dayOfMonth: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedication({
        ...formState,
        dayOfMonth: formState.dayOfMonth ? formState.dayOfMonth.toISOString() : null
      });
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
        {formState.frequency === 'weekly' && (
          <>
            <Form.Group as={Row} className="mb-3" controlId="formDayOfWeek">
              <Form.Label column sm={2}>
                Day of the Week
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  name="dayOfWeek"
                  value={formState.dayOfWeek}
                  onChange={handleInputChange}
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formTimeWeekly">
              <Form.Label column sm={2}>
                Time
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="time"
                  name="time"
                  value={formState.time || ''}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>
          </>
        )}
        {formState.frequency === 'monthly' && (
          <>
            <Form.Group as={Row} className="mb-3" controlId="formDayOfMonth">
              <Form.Label column sm={2}>
                Day and Time
              </Form.Label>
              <Col sm={10}>
                <DatePicker
                  selected={formState.dayOfMonth}
                  onChange={handleDateChange}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="form-control"
                  name="dayOfMonth"
                />
              </Col>
            </Form.Group>
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
