// Components/NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href='/'>Back to Home Page</a>
    </div>
  );
};

export default NotFound;
