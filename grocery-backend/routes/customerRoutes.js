const express = require('express');
const router = express.Router();
const { addCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerController'); // Import functions
const { protect, isAdmin } = require('../middleware/authMiddleware');

// POST /api/customers - Add a new customer
router.post('/', protect, addCustomer); // All authenticated users can create customers

// GET /api/customers - Get all customers
router.get('/', protect, getCustomers); // All authenticated users can view customers

// PUT /api/customers/:id - Update a customer
router.put('/:id', protect, isAdmin, updateCustomer); // Only admin can update customers

// DELETE /api/customers/:id - Delete a customer
router.delete('/:id', protect, isAdmin, deleteCustomer); // Only admin can delete customers

module.exports = router;
