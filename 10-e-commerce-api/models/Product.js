const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, 'Please provide product price'],
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    image: { type: String, default: '/uploads/example.jpeg' },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['office', 'kitchen', 'bedroom'],
    },
    company: {
      type: String,
      required: [true, 'Please provide company'],
      // another way to setup enum that returns a message if a passed in value does not exist in the array
      enum: {
        values: ['ikea', 'liddy', 'marcos'],
        message: '{VALUE} is not supported',
      },
    },
    colors: {
      type: [String],
      default: ['#222'],
      required: true,
    },
    featured: { type: Boolean, default: false },
    freeShipping: { type: Boolean, default: false },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: { type: Number, default: 0 },
    user: {
      // every product created will be associated with a user (admin)
      // tying product model to user model
      type: mongoose.Types.ObjectId,
      ref: 'User', // user model
      required: true,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
