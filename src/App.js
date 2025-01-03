 import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Cart';
import PrivacyPolicy from './FAQ/PrivacyPolicy'
import RentalTerms from './FAQ/RentalTerms';
import PaymentTerms from './FAQ/PaymentTerms';
import CompensationTerms from './FAQ/CompensationTerms';
import  Admin  from './Admin/Admin';
import  ManageProduct from './Admin/ManageProduct'
import ManageOrder from './Admin/ManageOrder'
import HomePage from './Home/Homepage';
import ProductInfo from './Category/Product/ProductInfo'
import Category from './Category/Category';
import Congratulation from './Authentication/SignUp/Congratulation';
import SignUp from './Authentication/SignUp/SignUp';
import SignIn from './Authentication/SignIn/SignIn';
import ResetVerification from './Authentication/ResetPassword/ResetVerification';
import ResetPassword from './Authentication/ResetPassword/ResetPassword';
import Company from './FAQ/Company'
import Owner from './FAQ/Owner'
import Success from './LoginComponent/Success';


import {User} from './Authentication/User/User'



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
      <Route path="/verification" element={<ResetVerification/>}/>
      <Route path="/category" element={<Category/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/resetpassword' element={<ResetPassword/>}/>
      <Route path='/congratulation' element={<Congratulation/>}/>
      <Route path="/product-info/:productId" element={<ProductInfo />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/company" element={<Company/>}/>
      <Route path="/user" element={<User/>}/>
      <Route path="/owner" element={<Owner/>}/>
      <Route path="/success" element={<Success/>}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
      <Route path="/rental-terms" element={<RentalTerms/>} />
      <Route path="/payment-terms" element={<PaymentTerms/>} />
      <Route path="/compensation-terms" element={<CompensationTerms/>} />
      <Route path="/admin" element={<Admin/>} >
        <Route path="product" element={<ManageProduct/>} />
        <Route path="order" element={<ManageOrder/>} />
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
