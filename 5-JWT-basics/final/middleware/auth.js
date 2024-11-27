const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check if the auth header exists - no auth header or doesn't start with 'Bearer '
  // as seen in authorization properties in request headers
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }

  // { authorization: 'Bearer eyJhb...'} [1] => eyJ...
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next(); // calls next middleware
  } catch (error) {
    // throw error if decoded token is either expired, or not valid for other reasons
    throw new UnauthenticatedError('Not authorized to access this route');
  }
};

module.exports = authenticationMiddleware;
