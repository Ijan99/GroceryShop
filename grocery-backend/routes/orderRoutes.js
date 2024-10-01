const express = require('express');
const router = express.Router();
const { addOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController'); // Import necessary functions
const { protect, isAdmin } = require('../middleware/authMiddleware');

// POST /api/orders - Add a new order
router.post('/', protect, addOrder); // All authenticated users can create orders

// GET /api/orders - Get all orders
router.get('/', protect, getOrders); // All authenticated users can view orders

// PUT /api/orders/:id - Update an order
router.put('/:id', protect, isAdmin, updateOrder); // Only admin can update orders

// DELETE /api/orders/:id - Delete an order
router.delete('/:id', protect, isAdmin, deleteOrder); // Only admin can delete orders

module.exports = router;
