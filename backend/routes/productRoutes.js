const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Product = require('../models/product');
const Shop = require('../models/shop');

// Add product
router.post('/', protect, async (req, res) => {
  const { name, description, price, shopId } = req.body;
  try {
    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(404).json({ msg: 'Shop not found' });
    if (shop.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    const product = await Product.create({ name, description, price, shop: shopId });
    shop.products.push(product._id);
    await shop.save();

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update product
router.put('/:id', protect, async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await Product.findById(req.params.id).populate('shop');
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (product.shop.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete product
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('shop');
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (product.shop.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await Product.findByIdAndDelete(product._id);
    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
