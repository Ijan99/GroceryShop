const Order = require('../models/Order');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// @desc    Add a new order
// @route   POST /api/orders
// @access  Public
const addOrder = async (req, res) => {
  const { customer_id, items, total_amount, payment_method } = req.body;
  
  try {
    // Create the order
    const order = new Order({ customer_id, items, total_amount, payment_method });
    await order.save();

    // Update the stock for each item in the order
    for (const item of items) {
      const product = await Product.findById(item.product_id);
      if (product) {
        product.quantity -= item.quantity;
        await product.save();
      }
    }

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
    const orders = await Order.find()
      .populate('customer_id', 'name')
      .populate('items.product_id', 'name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an order
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customer_id, items, total_amount, payment_method } = req.body;

  try {
    // Find the order and update the details
    const order = await Order.findByIdAndUpdate(
      id,
      { customer_id, items, total_amount, payment_method },
      { new: true } // Return the updated order
    ).populate('customer_id', 'name')
     .populate('items.product_id', 'name');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the order
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all controller functions
module.exports = {
  addOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
