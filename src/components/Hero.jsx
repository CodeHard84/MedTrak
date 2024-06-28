import React from 'react';
import { Container, Jumbotron, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const Hero = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Jumbotron fluid className="text-center">
      <Container>
        <h1>Welcome to MedTrak</h1>
        <p>Please log in to manage your medications.</p>
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      </Container>
    </Jumbotron>
  );
};

export default Hero;
