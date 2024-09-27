const Product = require('../models/Product');

// @desc    Add a new product
// @route   POST /api/products
// @access  Public
const addProduct = async (req, res) => {
  const { name, price, quantity, category, expiry_date } = req.body;
  
  try {
    const product = new Product({ name, price, quantity, category, expiry_date });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, getProducts };
