const User = require('../models/User');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
} = require('../utils');
const crypto = require('crypto');

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  // generate verification token
  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = 'http://localhost:3000';

  /*  

  Notes on proxy --
  frontend (reverse) proxy for api requests allowing communication with the backend on a different port while bypassing same-origin policy restrictions
  the reverse proxy (another server), accepts connection requests from our backend and forwards them to our frontend on localhost:3000 (or another server), then sends the reply of our server to the frontend original connection request 

  these are all from request headers -- 

  const tempOrigin = req.get('origin'); // frontend (or reverse ) proxy
  const protocol = req.protocol;
  const host = req.get('host');
  const forwardedHost = req.get('x-forwarded-host');
  const forwardedProtocol = req.get('x-forwarded-proto'); 
  

  tempOrigin : http://localhost:4000/
  host : localhost:4000
  protocol : http
  forwardedHost : localhost:3000
  forwardedProtocol : http
    
  
  */

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  // send verification token only while testing in postman!!!
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // check if user is verified
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError('Please verify your email');
  }

  // creates object used to sign the token
  const tokenUser = createTokenUser(user);

  // initialize refresh token to empty string
  let refreshToken = '';
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  // if token exists, set refresh token to token stored in db (don't create a new one then send back as cookie in response
  if (existingToken) {
    const { isValid } = existingToken;

    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    refreshToken = existingToken.refreshToken;
    // creates both access and refresh tokens
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  // creates token document
  await Token.create(userToken);

  // creates both access and refresh tokens
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Verification Failed');
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError('Verification Failed');
  }

  // if everything's ok
  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = ''; // second time user makes the request, the verification token won't match

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};
