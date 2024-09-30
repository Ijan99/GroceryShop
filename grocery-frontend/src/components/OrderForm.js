import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import StripeWrapper from './CheckoutButton';

const OrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [totalAmount, setTotalAmount] = useState(0);
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        await axios.post('/api/orders', {
          customer_id: selectedCustomer,
          items: selectedItems,
          total_amount: totalAmount,
          payment_method: paymentMethod,
        });
        setAlert({ type: 'success', message: 'Order placed successfully!' });
        setSelectedItems([]);
        setTotalAmount(0);
      } catch (error) {
        setAlert({ type: 'danger', message: 'There was an error placing the order.' });
      }
    }
    setValidated(true);
  };

  const addItemToOrder = (product, quantity) => {
    setSelectedItems([...selectedItems, { product_id: product._id, quantity, price: product.price }]);
    setTotalAmount(totalAmount + product.price * quantity);
  };

  return (
    <div className="card my-3">
      <div className="card-header">
        <h4>Place Order</h4>
      </div>
      <div className="card-body">
        {alert.message && (
          <Alert variant={alert.type}>
            {alert.message}
          </Alert>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="customerSelect">
            <Form.Label>Customer</Form.Label>
            <Form.Select
              required
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="">Select a customer</option>
              {customers.map(customer => (
                <option key={customer._id} value={customer._id}>{customer.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a customer.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="products">
            <Form.Label>Products</Form.Label>
            {products.map(product => (
              <div key={product._id} className="d-flex align-items-center mb-2">
                <span className="me-2">{product.name} - ${product.price}</span>
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  className="form-control me-2"
                  onBlur={(e) => addItemToOrder(product, e.target.value)}
                />
              </div>
            ))}
          </Form.Group>

          <Form.Group className="mb-3" controlId="paymentMethod">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </Form.Select>
          </Form.Group>

          <div className="mb-3">
            <label>Total Amount: ${totalAmount}</label>
          </div>

          <StripeWrapper amount={totalAmount} />

          <Button variant="primary" type="submit">
            Place Order
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default OrderForm;
