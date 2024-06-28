import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const timezones = [
  "Pacific/Midway",
  "Pacific/Honolulu",
  "America/Juneau",
  "America/Los_Angeles",
  "America/Tijuana",
  "America/Denver",
  "America/Phoenix",
  "America/Chihuahua",
  "America/Chicago",
  "America/Regina",
  "America/Mexico_City",
  "America/Guatemala",
  "America/New_York",
  "America/Indiana/Indianapolis",
  "America/Bogota",
  "America/Lima",
  "America/Halifax",
  "America/Caracas",
  "America/La_Paz",
  "America/Santiago",
  "America/St_Johns",
  "America/Sao_Paulo",
  "America/Argentina/Buenos_Aires",
  "America/Guyana",
  "America/Godthab",
  "Atlantic/Azores",
  "Atlantic/Cape_Verde",
  "Europe/Dublin",
  "Europe/Lisbon",
  "Europe/London",
  "Africa/Casablanca",
  "Africa/Monrovia",
  "Etc/UTC",
  "Europe/Belgrade",
  "Europe/Bratislava",
  "Europe/Budapest",
  "Europe/Ljubljana",
  "Europe/Prague",
  "Europe/Sarajevo",
  "Europe/Skopje",
  "Europe/Warsaw",
  "Europe/Zagreb",
  "Europe/Brussels",
  "Europe/Copenhagen",
  "Europe/Madrid",
  "Europe/Paris",
  "Europe/Amsterdam",
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Stockholm",
  "Europe/Vienna",
  "Africa/Algiers",
  "Europe/Bucharest",
  "Africa/Cairo",
  "Europe/Helsinki",
  "Europe/Kiev",
  "Europe/Riga",
  "Europe/Sofia",
  "Europe/Tallinn",
  "Europe/Vilnius",
  "Europe/Athens",
  "Europe/Istanbul",
  "Europe/Minsk",
  "Asia/Jerusalem",
  "Africa/Harare",
  "Africa/Johannesburg",
  "Europe/Moscow",
  "Asia/Kuwait",
  "Asia/Riyadh",
  "Africa/Nairobi",
  "Asia/Baghdad",
  "Asia/Tehran",
  "Asia/Muscat",
  "Asia/Baku",
  "Asia/Tbilisi",
  "Asia/Yerevan",
  "Asia/Kabul",
  "Asia/Yekaterinburg",
  "Asia/Karachi",
  "Asia/Tashkent",
  "Asia/Kolkata",
  "Asia/Kathmandu",
  "Asia/Dhaka",
  "Asia/Colombo",
  "Asia/Almaty",
  "Asia/Novosibirsk",
  "Asia/Rangoon",
  "Asia/Bangkok",
  "Asia/Jakarta",
  "Asia/Krasnoyarsk",
  "Asia/Shanghai",
  "Asia/Chongqing",
  "Asia/Hong_Kong",
  "Asia/Urumqi",
  "Asia/Kuala_Lumpur",
  "Asia/Singapore",
  "Asia/Taipei",
  "Australia/Perth",
  "Asia/Irkutsk",
  "Asia/Ulaanbaatar",
  "Asia/Seoul",
  "Asia/Tokyo",
  "Asia/Yakutsk",
  "Australia/Darwin",
  "Australia/Adelaide",
  "Australia/Sydney",
  "Australia/Brisbane",
  "Australia/Hobart",
  "Asia/Vladivostok",
  "Pacific/Guam",
  "Pacific/Port_Moresby",
  "Asia/Magadan",
  "Pacific/Fiji",
  "Asia/Kamchatka",
  "Pacific/Tongatapu"
];

const UserProfile = () => {
  const { getIdTokenClaims } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [timezone, setTimezone] = useState('');
  const navigate = useNavigate();

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
        setEmail(response.data.email);
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
        { name, email, cell, timezone },
        {
          headers: {
            Authorization: `Bearer ${token.__raw}`
          }
        }
      );
      setProfile(response.data);
      navigate('/'); // Redirect after saving
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
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                as="select"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="">Select your timezone</option>
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </Form.Control>
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
