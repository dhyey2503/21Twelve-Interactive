
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Links to the User model
        required: true
    },
    /* We can add a field to store products as an array of ObjectIds
    This allows us to easily find all products for a given shop*/
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product' // Links to the Product model
    }]
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Shop', ShopSchema);