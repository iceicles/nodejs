const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide  name'],
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
    required: [true, 'Please provide  password'],
    // below won't matter when passwords get hashed
    minlength: 6,
    maxlength: 12,
  },
});

module.exports = mongoose.model('User', UserSchema);
