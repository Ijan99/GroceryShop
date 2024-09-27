import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch customers and products
  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await axios.get('/api/customers');
      setCustomers(data);
    };
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    
    fetchCustomers();
    fetchProducts();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/orders', {
        customer_id: selectedCustomer,
        items: selectedItems,
        total_amount: totalAmount,
        payment_method: paymentMethod,
      });
      alert('Order placed successfully!');
    } catch (error) {
      console.error('There was an error placing the order:', error);
    }
  };

  // Add item to order
  const addItemToOrder = (product, quantity) => {
    setSelectedItems([...selectedItems, { product_id: product._id, quantity, price: product.price }]);
    setTotalAmount(totalAmount + product.price * quantity);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer</label>
        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
          <option value="">Select a customer</option>
          {customers.map(customer => (
            <option key={customer._id} value={customer._id}>{customer.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Products</label>
        {products.map(product => (
          <div key={product._id}>
            <span>{product.name} - ${product.price}</span>
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              onBlur={(e) => addItemToOrder(product, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div>
        <label>Payment Method</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
        </select>
      </div>
      <div>
        <label>Total Amount: ${totalAmount}</label>
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
