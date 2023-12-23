// MainPage.js
import React from 'react';

const MainPage = ({ username }) => {
  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>This is the main page.</p>
    </div>
  );
};

export default MainPage;
