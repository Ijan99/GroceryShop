const express = require('express');
const router = express.Router();
const { addCustomer, getCustomers } = require('../controllers/customerController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// POST /api/customers - Add a new customer
router.post('/', protect, isAdmin, addCustomer); // Only admin can add customers

// GET /api/customers - Get all customers
router.get('/', protect, isAdmin, getCustomers); // All authenticated users can view customers

router.put('/:id', protect, isAdmin, updateCustomer); // Only admin can update customers

router.delete('/:id', protect, isAdmin, deleteCustomer); // Only admin can delete customers

module.exports = router;
