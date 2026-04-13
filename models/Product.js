const mongoose = require('mongoose'); // Add this line!

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    image: { type: String }
});

module.exports = mongoose.model('Product', productSchema);