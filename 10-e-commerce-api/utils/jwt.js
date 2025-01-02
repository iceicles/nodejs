const jwt = require('jsonwebtoken');

// create jwt access token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

// check if access token is valid
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// sending both access and refresh tokens in response
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;
  // set token in cookies - https://expressjs.com/en/api.html#res.cookie
  res.cookie('token', token, {
    httpOnly: true, // cookie can only be set/modified by (set-cookie) from server not document.cookie
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', // secure (http*S*) only in prod
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
