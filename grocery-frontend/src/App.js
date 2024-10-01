import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import OrderHistory from './components/OrderHistory';
import ProductForm from './components/ProductForm';
import OrderForm from './components/OrderForm';
import CustomerForm from './components/CustomerForm';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

  const handleLogin = (authToken, role) => {
    setToken(authToken);
    setUserRole(role);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setToken('');
    setUserRole('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  return (
    <Router>
      <Navbar handleLogout={handleLogout} token={token} userRole={userRole} />
      <div className="container my-4">
        <Routes>
          {/* Public Routes */}
          {!token ? (
            <>
              <Route path="/login" element={<Login setToken={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              {/* Redirect any unknown route to login or register */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {/* Protected Routes */}
              {userRole === 'admin' && (
                <>
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/add-product" element={<ProductForm />} />
                </>
              )}
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/add-order" element={<OrderForm />} />
              <Route path="/add-customer" element={<CustomerForm />} />
              <Route path="*" element={<Navigate to="/order-history" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
