const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({ 
    service: "Product Catalog Microservice", 
    status: "Healthy" 
  });
});

app.use('/api/products', productRoutes);

module.exports = app;