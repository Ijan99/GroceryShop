const express = require('express');
const router = express.Router();
const { addOrder, getOrders } = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// POST /api/orders - Add a new order
router.post('/', protect, addOrder); // All authenticated users can create orders

// GET /api/orders - Get all orders
router.get('/', protect, getOrders); // All authenticated users can view orders

router.put('/:id', protect, isAdmin, updateOrder); // Only admin can update orders

router.delete('/:id', protect, isAdmin, deleteOrder); // Only admin can delete orders

module.exports = router;
