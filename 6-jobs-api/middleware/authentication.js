const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

/*
  Authentication Middleware
  This makes sure only user's with valid JWT (json web tokens) can access routes/resources
*/

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError(
      'Authentication invalid - no token provided'
    );
  }

  // get token
  const token = authHeader.split(' ')[1];

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    // option #1 -
    // where we check that the user does exist in the db
    // no point in this project since we have no functionality to remove the user anyway..
    // select('-password') removes the password as there's no point to pass it to the next middleware
    // const user = User.findById(decodedPayload.userId).select('-password')
    // req.user = user

    // option #2 -
    // retrieve 'userId' and 'name' used to sign JWT in User models
    const { userId, name } = decodedPayload;
    // attach user to job routes
    req.user = { userId, name };
    next(); // call next middleware (recall - every function in express is a bunch of middlewares)
  } catch (error) {
    throw new UnauthenticatedError(
      'Authentication invalid - Not authorized to access this resource'
    );
  }
};

module.exports = auth;
