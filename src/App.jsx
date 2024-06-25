import React from 'react';
import AuthButton from './components/AuthButton';
import ProtectedComponent from './components/ProtectedComponent';

function App() {
  return (
    <div className="App">
      <h1>Welcome to My App</h1>
      <AuthButton />
      <ProtectedComponent />
    </div>
  );
}

export default App;
