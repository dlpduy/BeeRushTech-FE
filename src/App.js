import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Cart';
import PrivacyPolicy from './FAQ/Privacy/PrivacyPolicy'
import  Admin  from './Admin/Admin';
import  ManageProduct from './Admin/ManageProduct'
import  ManageUser from './Admin/ManageUser'

function App() {
  useEffect(() => {
    // Add Google Fonts link to <head>
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []); // Run only once when the app initializes


  return (
    <Router>
      <Routes>
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
        <Route path="/Admin" element={<Admin/>} >
          <Route path="product" element={<ManageProduct/>} />
          <Route path="user" element={<ManageUser/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
