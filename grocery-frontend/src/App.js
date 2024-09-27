import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import OrderForm from './components/OrderForm';
import CustomerForm from './components/CustomerForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-center mb-4">Welcome to Grocery Shop Management System</h1>
                <Dashboard />    
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-center mb-4">Grocery Shop Management System</h1>
              </div>
            }
          />
          <Route
            path="/customers"
            element={
              <div className="row">
                <div className="col-md-12">
                  <CustomerForm />
                </div>
              </div>
            }
          />
          <Route
            path="/products"
            element={
              <div className="row">
                <div className="col-md-6">
                  <ProductForm />
                </div>
                <div className="col-md-12">
                  <ProductList />
                </div>
              </div>
            }
          />
          <Route
            path="/orders"
            element={
              <div className="row">
                <div className="col-md-12">
                  <OrderForm />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
