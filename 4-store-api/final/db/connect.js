const mongoose = require('mongoose');

// connect to mongoDB database
const connectDB = (url) => {
  return mongoose.connect(url); // returns a promise
};

module.exports = connectDB;
