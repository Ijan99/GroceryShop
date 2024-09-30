const express = require('express');
const router = express.Router();
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// POST /api/products - Add a new product
router.post('/', protect, isAdmin, addProduct);

// GET /api/products - Get all products
router.get('/', protect, isAdmin, getProducts);

// PUT /api/products/:id - Update a product
router.put('/:id', protect, isAdmin, updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', protect, isAdmin, deleteProduct);

module.exports = router;
