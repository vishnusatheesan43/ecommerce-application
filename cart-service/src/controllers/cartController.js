const { redisClient } = require('../config/redis');

const CART_TTL = 86400; // 24 hours in seconds

// GET /api/cart/:userId - View current cart contents
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartData = await redisClient.get(`cart:${userId}`);
    
    if (!cartData) {
      return res.status(200).json({ userId, items: [] });
    }
    
    res.status(200).json(JSON.parse(cartData));
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve shopping cart' });
  }
};

// POST /api/cart/:userId - Add or update items in the cart
exports.updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, name, price, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid Product ID and positive quantity required' });
    }

    // Fetch existing cart or initialize an empty one
    const cartData = await redisClient.get(`cart:${userId}`);
    let cart = cartData ? JSON.parse(cartData) : { userId, items: [] };

    // Check if the item already exists in the cart
    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity = quantity;
    } else {
      // Add new item if it doesn't exist
      cart.items.push({ productId, name, price, quantity });
    }

    // Save back to Redis with a 24-hour expiration rule
    await redisClient.setEx(`cart:${userId}`, CART_TTL, JSON.stringify(cart));

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update shopping cart' });
  }
};

// DELETE /api/cart/:userId - Clear whole cart (e.g., after successful checkout)
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await redisClient.del(`cart:${userId}`);
    res.status(200).json({ message: 'Cart successfully cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear shopping cart' });
  }
};

