import React, { useState, useEffect } from 'react';
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

  // Function to set the token and user role after login
  const handleLogin = (authToken, role) => {
    setToken(authToken);
    setUserRole(role);
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('userRole', role);
  };

  // Function to log out the user
  const handleLogout = () => {
    setToken('');
    setUserRole('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  // Effect to redirect to login if token changes
  useEffect(() => {
    if (!token) {
      // Add any side effect you want when token is cleared (e.g., redirect to login)
    }
  }, [token]);

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
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {/* Protected Routes */}
              {/* Only Admin can access Product Management */}
              {userRole === 'admin' && (
                <>
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/add-product" element={<ProductForm />} />
                </>
              )}
              
              {/* Employee and Admin can view Order History */}
              <Route path="/order-history" element={<OrderHistory />} />
              
              {/* Employee and Admin can place orders */}
              <Route path="/add-order" element={<OrderForm />} />
              
              {/* Employee and Admin can manage customers */}
              <Route path="/add-customer" element={<CustomerForm />} />

              {/* Redirect any unknown route to Order History */}
              <Route path="*" element={<Navigate to="/order-history" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
