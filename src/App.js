import React, { useEffect } from 'react';
import CartPage from './Cart/index';
import PrivacyPolicy from './FAQ/Privacy/PrivacyPolicy';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    // Add Google Fonts link to <head>
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []); // Run only once when the app initializes

  return (
    <div style={{ fontFamily: 'Lato, sans-serif' }}>
      <Router>
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
