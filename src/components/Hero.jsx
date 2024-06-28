import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const Hero = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container fluid className="text-center py-5 bg-light">
      <h1>Welcome to MedTrak</h1>
      <p>Please log in to manage your medications.</p>
      <Button onClick={() => loginWithRedirect()}>Log In</Button>
    </Container>
  );
};

export default Hero;
