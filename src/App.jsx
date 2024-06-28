import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MedicationsList from './components/MedicationsList';
import CreateMedication from './components/CreateMedication';
import EditMedication from './components/EditMedication';
import MedicationProfile from './components/MedicationProfile';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const App = () => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
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
          <Route path="/medications/:id" element={isAuthenticated ? <MedicationProfile /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
