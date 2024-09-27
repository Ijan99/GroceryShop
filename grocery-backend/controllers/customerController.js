const Customer = require('../models/Customer');

// @desc    Add a new customer
// @route   POST /api/customers
// @access  Public
const addCustomer = async (req, res) => {
  const { name, email, contact_number } = req.body;
  
  try {
    const customer = new Customer({ name, email, contact_number });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCustomer, getCustomers };
