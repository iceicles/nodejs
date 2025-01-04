const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

/* middleware for /users */
const authenticateUser = async (req, res, next) => {
  // check if signed cookies is available
  const token = req.signedCookies.token;

  if (!token) {
    console.log('error, no token present');
  } else {
    console.log('token present');
  }

  next();
};

module.exports = {
  authenticateUser,
};
