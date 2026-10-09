const express = require('express');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(express.json());

// Mount the cart endpoints
app.use('/api/cart', cartRoutes);

module.exports = app;

