const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided'], // if true, and custom err msg
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided'], // if true, and custom err msg
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported', // VALUE - the user's input
    },
    // enum: ['ikea', 'liddy', 'caressa', 'marcos']
  },
});

module.exports = mongoose.model('Product', productSchema);
