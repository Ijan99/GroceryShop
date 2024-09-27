import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import OrderForm from './components/OrderForm';
import CustomerForm from './components/CustomerForm';

function App() {
  return (
    <div className="App">
      <h1>Grocery Shop Management System</h1>
      <CustomerForm />
      <ProductForm />
      <ProductList />
      <OrderForm />
    </div>
  );
}

export default App;
