import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './Cart';
import PrivacyPolicy from './FAQ/Privacy/PrivacyPolicy'
import  Admin  from './Admin/Admin';
import  ManageProduct from './Admin/ManageProduct'
import  ManageUser from './Admin/ManageUser'

function App() {
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
