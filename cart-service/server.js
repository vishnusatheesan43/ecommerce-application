const app = require('./src/app');
const { connectRedis } = require('./src/config/redis');

const PORT = process.env.PORT || 3001; // Running on 3001 to avoid conflict with Product Service

// Initialize connections
(async () => {
  await connectRedis();
  
  app.listen(PORT, () => {
    console.log(`Cart service active on port ${PORT}`);
  });
})();

