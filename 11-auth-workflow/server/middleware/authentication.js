const CustomError = require('../errors');
const { isTokenValid, attachCookiesToResponse } = require('../utils');
const Token = require('../models/Token');

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    // check access token first because it'll have a shorter expiration
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    // checks if refresh token is valid using jwt.verify
    // decoded using the tokenUser object in login controller and refreshToken value passed to attachCookiesToResponse
    // -- this is why we can access userId and refreshToken after decoding on payload
    const payload = isTokenValid(refreshToken);

    // get existing token from db
    const existingToken = await Token.findOne({
      // both userId and refreshToken properties were used to sign the JWT for refreshToken in attachCookiesToresponse
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    // check if token doesn't exist and is valid is false
    // note: isValid can be used to restrict access to user in the future (for any reasons :] )
    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    // attach both tokens to cookies in response
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken, // use refreshToken from db
    });

    // attach user to req.user to be used by other middleware(s)/controller(s)
    // for example, /showMe endpoint passes req.user in response
    // it should be the payload user since it was used to sign the JWT
    req.user = payload.user;
    next(); // call next middleware
  } catch (error) {
    // when the refresh token expires --
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
