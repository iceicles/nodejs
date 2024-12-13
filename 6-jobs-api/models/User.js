const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true, // creates a unique index. returns a duplicate err msg if there's a user with the same email alrdy in use
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
});

// before we save the document, we hash the password
// doc - https://mongoosejs.com/docs/middleware.html#pre
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10); // generate random bytes
  this.password = await bcrypt.hash(this.password, salt); // hash user's password with random bytes
});

// definine a custom instance method
// doc - https://mongoosejs.com/docs/guide.html#methods
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// compare encrypted(hashed) passwords
// candidatePassword - password as inputed by user in request
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // remember, 'this' keyword gives access to schema properties saved in db
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
