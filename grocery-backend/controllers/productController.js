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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, category, expiry_date } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity, category, expiry_date },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
