const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  expiry_date: {
    type: Date,
  },
  // Optional: Add a low stock threshold field (default: 10)
  low_stock_threshold: {
    type: Number,
    default: 10,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
