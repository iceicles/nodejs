const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provdie review text'],
    },
    user: {
      // every review will be tied to a user
      type: mongoose.Types.ObjectId,
      ref: 'User', // user model
      required: true,
    },
    product: {
      // every review ill be tied tyo a product

      type: mongoose.Types.ObjectId,
      ref: 'Product', // product model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ensure the user can leave only one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);
