import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MedicationsList from './components/MedicationsList';
import CreateMedication from './components/CreateMedication';
import EditMedication from './components/EditMedication';
import MedicationProfile from './components/MedicationProfile';
import UserProfile from './components/UserProfile';
import Hero from './components/Hero';
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
          <Route path="/" element={isAuthenticated ? <MedicationsList /> : <Hero />} />
          <Route path="/create" element={isAuthenticated ? <CreateMedication /> : <Navigate to="/" />} />
          <Route path="/edit/:id" element={isAuthenticated ? <EditMedication /> : <Navigate to="/" />} />
          <Route path="/medications/:id" element={isAuthenticated ? <MedicationProfile /> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
