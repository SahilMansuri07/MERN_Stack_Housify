import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PropertyListing from './pages/Property-Listing';
import AddListing from './addlisting/AddListing';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login/>} />
        <Route path="/properties" element={<PropertyListing/>} />
        <Route path="/add-props" element={<AddListing/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
