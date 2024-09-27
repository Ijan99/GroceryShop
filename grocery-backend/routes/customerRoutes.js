const express = require('express');
const router = express.Router();
const { addCustomer, getCustomers } = require('../controllers/customerController');

// POST /api/customers - Add a new customer
router.post('/', addCustomer);

// GET /api/customers - Get all customers
router.get('/', getCustomers);

module.exports = router;
