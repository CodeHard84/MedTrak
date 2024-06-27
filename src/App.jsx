import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MedicationsList from './components/MedicationsList';
import CreateMedication from './components/CreateMedication';
import EditMedication from './components/EditMedication';
import NavBar from './components/NavBar';
import { Container, Spinner } from 'react-bootstrap'; // Added Spinner for loading state
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <div>
      <NavBar
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        logout={logout}
      />
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={isAuthenticated ? <MedicationsList /> : <Navigate to="/login" />} />
          <Route path="/create" element={isAuthenticated ? <CreateMedication /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={isAuthenticated ? <EditMedication /> : <Navigate to="/login" />} />
          <Route path="/login" element={<div className="text-center mt-5"><button onClick={() => loginWithRedirect()}>Log In</button></div>} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
