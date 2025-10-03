const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Shop = require('../models/shop');
const Product = require('../models/product');

// Create shop
router.post('/', protect, async (req, res) => {
  const { name, description } = req.body;
  try {
    const newShop = new Shop({ name, description, owner: req.user.id });
    const shop = await newShop.save();
    res.status(201).json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update shop
router.put('/:id', protect, async (req, res) => {
  const { name, description } = req.body;
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ msg: 'Shop not found' });
    if (shop.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    shop.name = name || shop.name;
    shop.description = description || shop.description;
    await shop.save();

    res.json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete shop + its products
router.delete('/:id', protect, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ msg: 'Shop not found' });
    if (shop.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await Product.deleteMany({ shop: shop._id });
    await Shop.findByIdAndDelete(shop._id);

    res.json({ msg: 'Shop deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

// Get all shops with products
router.get('/all', async (req, res) => {
  try {
    const shops = await Shop.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'shop',
          as: 'products'
        }
      }
    ]);
    res.json(shops);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get single shop by ID with products
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ msg: 'Shop not found' });

    const products = await Product.find({ shop: shop._id });
    res.json({ ...shop.toObject(), products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
