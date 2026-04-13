import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Login from './pages/Login'; 
import Register from './pages/Register'; // Added Register
import Checkout from './pages/Checkout'; // Added Checkout for later
import { useCart } from './context/CartContext';

function App() {
  const { cartItems } = useCart();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-slate-900 p-4 text-white shadow-xl sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-black text-blue-400 italic">SHOPSMART PRO</Link>
            <div className="space-x-6 flex items-center">
              <Link to="/" className="hover:text-blue-400 font-bold">Home</Link>
              <Link to="/admin" className="hover:text-blue-400 font-bold">Admin</Link>
              <Link to="/cart" className="relative bg-blue-600 px-4 py-2 rounded-lg font-bold">
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto py-10">
          {/* ONLY ONE ROUTES BLOCK IS NEEDED */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;