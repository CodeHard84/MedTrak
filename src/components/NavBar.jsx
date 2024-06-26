import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isAuthenticated, loginWithRedirect, logout }) => (
  <nav>
    <Link to="/">Medications</Link>
    <Link to="/create">Create Medication</Link>
    {isAuthenticated ? (
      <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
    ) : (
      <button onClick={loginWithRedirect}>Log In</button>
    )}
  </nav>
);

export default NavBar;
