import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Cart';
import PrivacyPolicy from './FAQ/Privacy/PrivacyPolicy'
import  Admin  from './Admin/Admin';
import  ManageProduct from './Admin/ManageProduct'
import  ManageUser from './Admin/ManageUser'
import HomePage from './Home/Homepage';
import ProductInfo from './Category/Product/ProductInfo'
import Category from './Category/Category';
import Congratulation from './Authentication/SignUp/Congratulation';
import SignUp from './Authentication/SignUp/SignUp';
import SignIn from './Authentication/SignIn/SignIn';
import Verification from './Authentication/SignUp/Verification';
import ResetPassword from './Authentication/ResetPassword/ResetPassword';



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
      <Route path="/" element={<HomePage/>} />
      <Route path="/verification" element={<Verification/>}/>
      <Route path="/Category" element={<Category/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
      <Route path='/ResetPassword' element={<ResetPassword/>}/>
      <Route path='/Congratulation' element={<Congratulation/>}/>
      <Route path="/ProductInfo" element={<ProductInfo/>} />
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
