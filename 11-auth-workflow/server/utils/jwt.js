const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  // no need to sign jwt with expiresIn JWT_LIFETIME as cookie expiration will be controlled with the 'expires/maxAge' property on the token in the cookie

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  // access tokens should expire quicker than refresh tokens - they can be 15mins, 1hr, 1day, etc but they MUST have a short TTL
  // refresh tokens can be 30days, 60days etc
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 1000,
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
};

// can be used to attach a single token (like the access token) to cookies
const attachSingleCookieToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
