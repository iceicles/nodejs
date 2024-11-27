const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // check if the auth header exists - no auth header or doesn't start with 'Bearer '
  // as seen in authorization properties in request headers
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401);
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
    throw new CustomAPIError('Not authorized to access this route', 401);
  }
};

module.exports = authenticationMiddleware;
