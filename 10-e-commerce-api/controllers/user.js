const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllUsers = async (req, res) => {
  // accessing req.user from authentication middlware (if token is valid)
  // console.log('req.user - ', req.user);
  const user = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ user });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

// the client should call this endpoint first in the /login, /register, etc routes to check if there is a user (i.e., valid token) & authenticate them
const showCurrentUser = async (req, res) => {
  // accessing req.user from authentication middlware
  res.status(StatusCodes.OK).json({ user: req.user });
};
const updateUser = async (req, res) => {
  res.send('update user');
};

// user needs to be authenticated (or at least hit the auth MW) to access this controller bc we need the id
const updateUserPassword = async (req, res) => {
  // get oldpassword and newpassword inputs from client
  const { oldPassword, newPassword } = req.body;

  // if oldPassword or newPassword is not inputed at all by user
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values');
  }

  // find user by _id in db
  const user = await User.findOne({ _id: req.user.userId });

  // compare old password with password stored in db
  const isPasswordCorrect = await user.comparePassword(oldPassword);

  // throw err if passwords don't match
  if (!isPasswordCorrect)
    throw new CustomError.UnauthenticatedError('Invalid Credentials');

  // if password match, set password in db to new password
  user.password = newPassword;

  // save method does two things - creates a new document or update an existing document
  // read more - https://mongoosejs.com/docs/api/model.html#Model.prototype.save()
  // in this case, we're updating the existing document with the new password and it invokes .pre('save') in our schema
  // so it hashes the password
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
