const express = require('express');
const router = express.Router();
const { addOrder, getOrders } = require('../controllers/orderController');

// POST /api/orders - Add a new order
router.post('/', addOrder);

// GET /api/orders - Get all orders
router.get('/', getOrders);

module.exports = router;
