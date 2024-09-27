const Order = require('../models/Order');

// @desc    Add a new order
// @route   POST /api/orders
// @access  Public
const addOrder = async (req, res) => {
  const { customer_id, items, total_amount, payment_method } = req.body;
  
  try {
    const order = new Order({ customer_id, items, total_amount, payment_method });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer_id').populate('items.product_id');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrder, getOrders };
