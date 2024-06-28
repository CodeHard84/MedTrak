import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Container, Button, Spinner } from 'react-bootstrap';
import useApi from '../api/medications';

const MedicationsList = () => {
  const { getMedications, deleteMedication } = useApi();
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

  const handleDelete = async (id) => {
    try {
      await deleteMedication(id);
      setMedications(medications.filter(medication => medication._id !== id));
    } catch (error) {
      console.error('Error deleting medication:', error);
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
      <h1>Medications</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication._id}>
              <td>
                <a href={`/medications/${medication._id}`} onClick={(e) => {
                  e.preventDefault();
                  navigate(`/medications/${medication._id}`);
                }}>
                  {medication.name}
                </a>
              </td>
              <td>{medication.dosage}</td>
              <td>{medication.frequency}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => navigate(`/edit/${medication._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(medication._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MedicationsList;
