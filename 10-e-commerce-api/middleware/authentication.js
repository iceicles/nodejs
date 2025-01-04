const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

/* middleware for /users */
const authenticateUser = async (req, res, next) => {
  // check if signed cookies is available
  const token = req.signedCookies.token;

  // no token - auth is invalid
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }

  // if token is present
  try {
    // check if it's valid
    const payload = isTokenValid({ token });
    // then save data in req.user to be used by routes /users
    req.user = {
      name: payload.name,
      userId: payload.userId,
      role: payload.role,
    };
    // console.log(payload);
    //then call next middleware (getAllUsers, getSingleUser, etc)
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

module.exports = {
  authenticateUser,
};
