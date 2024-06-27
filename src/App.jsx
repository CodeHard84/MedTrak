import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MedicationsList from './components/MedicationsList';
import CreateMedication from './components/CreateMedication';
import EditMedication from './components/EditMedication';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path="/" element={<MedicationsList />} />
          <Route path="/create" element={<CreateMedication />} />
          <Route path="/edit/:id" element={<EditMedication />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
