import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PropertyListing from './pages/Property-Listing';
import AddListing from './addlisting/AddListing';
import SellerDashboard from './pages/Seller-Dashboard';
import Unauthorized from './ProtectedRoutes/Unauthorized';
import PrivateRoute from './ProtectedRoutes/index'; 
import Contactus from './pages/Contactus';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/contact" element={<Contactus />} />

        {/* Seller Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={['seller']} />}>
          <Route path="/my-listing" element={<SellerDashboard />} />
          <Route path="/add-props" element={<AddListing />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
