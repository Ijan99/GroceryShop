const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// Use product routes
app.use('/api/products', productRoutes);

// Use order routes
app.use('/api/orders', orderRoutes);

// Use customer routes
app.use('/api/customers', customerRoutes);

// Use auth routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
