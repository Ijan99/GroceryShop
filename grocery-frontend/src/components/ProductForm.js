import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        await axios.post('/api/products', { name, price, quantity, category, expiry_date: expiryDate });
        setAlert({ type: 'success', message: 'Product added successfully!' });
        setName('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setExpiryDate('');
      } catch (error) {
        setAlert({ type: 'danger', message: 'There was an error adding the product.' });
      }
    }
    setValidated(true);
  };

  return (
    <div className="card my-3">
      <div className="card-header">
        <h4>Add Product</h4>
      </div>
      <div className="card-body">
        {alert.message && (
          <Alert variant={alert.type}>
            {alert.message}
          </Alert>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a product name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a price.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              required
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a quantity.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              required
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a category.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="expiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
