const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Load environment variables from .env file
dotenv.config();


const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.json());

// Configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 1. Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        // Exit process with failure if DB connection fails
        process.exit(1);
    });

// 2. Define Base Route (Public Test)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// 3. Define Main API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/products', require('./routes/productRoutes'));


// 4. Start the Server
app.listen(PORT, () => console.log(`Server running successfully on port ${PORT}`));
