import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        await axios.post('/api/customers', { name, email, contact_number: contactNumber });
        setAlert({ type: 'success', message: 'Customer added successfully!' });
        setName('');
        setEmail('');
        setContactNumber('');
      } catch (error) {
        setAlert({ type: 'danger', message: 'There was an error adding the customer.' });
      }
    }
    setValidated(true);
  };

  return (
    <div className="card my-3">
      <div className="card-header">
        <h4>Add Customer</h4>
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
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              required
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a contact number.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Customer
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CustomerForm;
