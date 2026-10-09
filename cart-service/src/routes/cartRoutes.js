const express = require('express');
const router = express.Router();
const { getCart, updateCart, clearCart } = require('../controllers/cartController');

router.get('/:userId', getCart);
router.post('/:userId', updateCart);
router.delete('/:userId', clearCart);

module.exports = router;

