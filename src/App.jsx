import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MedicationsList from './components/MedicationsList';
import CreateMedication from './components/CreateMedication';
import NavBar from './components/NavBar';

const App = () => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      {isAuthenticated && (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
          <NavBar />
          <Routes>
            <Route path="/" element={<MedicationsList />} />
            <Route path="/create" element={<CreateMedication />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
