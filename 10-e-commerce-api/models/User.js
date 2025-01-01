const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true, // mongoose will throw 'duplicate error'. can check in controller as well
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail, // alternative approach to previous implementations
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

// hash user's inputed password
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10); // generate random bytes
  this.password = await bcrypt.hash(this.password, salt); // hash password with salt
});

// compare the passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(canadidatePassword, this.password);
  return isMatch; // returns a boolean
};

module.exports = mongoose.model('User', UserSchema);
