const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/productController');

// POST /api/products - Add a new product
router.post('/', addProduct);

// GET /api/products - Get all products
router.get('/', getProducts);

module.exports = router;
