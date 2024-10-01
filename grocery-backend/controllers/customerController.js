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

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private/Admin
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact_number } = req.body;

  try {
    // Find the customer and update their details
    const customer = await Customer.findByIdAndUpdate(
      id,
      { name, email, contact_number },
      { new: true, runValidators: true } // Return the updated customer
    );

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private/Admin
const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the customer
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all controller functions
module.exports = { addCustomer, getCustomers, updateCustomer, deleteCustomer };
