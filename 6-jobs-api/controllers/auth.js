const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  // no error checking here as mongoose provides validations errors using the 'required' property in schema
  // however, we are sending a custom message in error-handler.js
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // if no email or password is initially provided by user
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // find the email (as inputed by the user in request body) in the database
  const user = await User.findOne({ email });

  // if user email doesn't exist in database
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // compare the password (done as instance method in models folder)
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // create token
  const token = user.createJWT(); // get back token
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
