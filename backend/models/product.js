
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop', // Links to the Shop model
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);