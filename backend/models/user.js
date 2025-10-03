const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'shop_owner'], default: 'user' }
});

// IMPORTANT: The model name MUST match the import used in routes (e.g., 'User')
module.exports = mongoose.model('User', UserSchema);
