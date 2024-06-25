import React from 'react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <div className="App">
      <h1>Welcome to My App</h1>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;