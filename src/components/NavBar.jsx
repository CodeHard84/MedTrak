import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = ({ isAuthenticated, loginWithRedirect, logout }) => (
  <Navbar bg="light" expand="lg">
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>MedTrack</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Medications</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create">
            <Nav.Link>Create Medication</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <Nav.Link onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Nav.Link>
          ) : (
            <Nav.Link onClick={loginWithRedirect}>Log In</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBa
