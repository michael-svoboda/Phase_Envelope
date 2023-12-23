// App.js
import React, { useState } from 'react';
import Login from './pages/Login';
import MainPage from './pages/MainPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <MainPage username={username} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
