import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/customers', { name, email, contact_number: contactNumber });
      alert('Customer added successfully!');
    } catch (error) {
      console.error('There was an error adding the customer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Contact Number</label>
        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
      </div>
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;
