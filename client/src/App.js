import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <MainPage username={username} /> : <Login onLogin={handleLogin} />} />
        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
};

export default App;
