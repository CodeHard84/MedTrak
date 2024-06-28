import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, Table, Spinner, Modal } from 'react-bootstrap';
import useApi from '../api/medications';
import moment from 'moment-timezone';

const MedicationsList = () => {
  const { getMedications, deleteMedication } = useApi();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteMedicationDetails, setDeleteMedicationDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedications = async () => {
      const data = await getMedications();
      setMedications(data);
      setLoading(false);
    };

    fetchMedications();
  }, [getMedications]);

  const handleShowModal = (medication) => {
    setDeleteMedicationDetails(medication);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteMedicationDetails(null);
  };

  const handleDelete = async () => {
    await deleteMedication(deleteMedicationDetails._id);
    setMedications(medications.filter((medication) => medication._id !== deleteMedicationDetails._id));
    handleCloseModal();
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const getNextDoseTime = (medication) => {
    const now = moment();
    const timezone = medication.timezone;

    for (let time of medication.times) {
      let medTime = moment.tz(time, 'HH:mm', timezone).set({
        year: now.year(),
        month: now.month(),
        date: now.date()
      });

      if (medTime.isBefore(now)) {
        medTime.add(1, 'day');
      }

      return medTime.format('YYYY-MM-DD HH:mm');
    }

    return 'No doses scheduled';
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
            <th>Next Dose</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication._id}>
              <td>
                <Link to={`/medications/${medication._id}`}>{medication.name}</Link>
              </td>
              <td>{medication.dosage}</td>
              <td>{medication.frequency}</td>
              <td>{getNextDoseTime(medication)}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(medication._id)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleShowModal(medication)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the medication {deleteMedicationDetails?.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MedicationsList;
