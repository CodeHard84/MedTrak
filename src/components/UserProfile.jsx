import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const UserProfile = () => {
  const { getIdTokenClaims } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [cell, setCell] = useState('');
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getIdTokenClaims();
        const response = await axios.get(`https://medtrakback.onrender.com/api/userProfile`, {
          headers: {
            Authorization: `Bearer ${token.__raw}`
          }
        });
        setProfile(response.data);
        setName(response.data.name);
        setCell(response.data.cell);
        setTimezone(response.data.timezone);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [getIdTokenClaims]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getIdTokenClaims();
      const response = await axios.put(
        `https://medtrakback.onrender.com/api/userProfile`,
        { name, cell, timezone },
        {
          headers: {
            Authorization: `Bearer ${token.__raw}`
          }
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
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
      <h1>User Profile</h1>
      {profile && (
        <div>
          <p>Email: {profile.email}</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCell">
              <Form.Label>Cell</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your cell number"
                value={cell}
                onChange={(e) => setCell(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTimezone">
              <Form.Label>Timezone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save
            </Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default UserProfile;
