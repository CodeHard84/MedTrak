import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <Link to="/">Medications</Link>
    <Link to="/create">Create Medication</Link>
  </nav>
);

export default NavBar;
