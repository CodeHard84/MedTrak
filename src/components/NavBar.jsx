import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = ({ isAuthenticated, loginWithRedirect, logout }) => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">MedTrak</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {isAuthenticated && (
            <>
              <LinkContainer to="/">
                <Nav.Link>Medications</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/create">
                <Nav.Link>Create Medication</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
        <Nav>
          {!isAuthenticated ? (
            <Button onClick={() => loginWithRedirect()}>Log In</Button>
          ) : (
            <Button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
