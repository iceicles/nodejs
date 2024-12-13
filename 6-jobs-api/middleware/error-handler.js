// const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

/* keep in mind, errorHandlerMiddleware is used by express-async-errors whenever we throw an error in our controller (no need to call next() and no need to wrap code in try/catch block)
/ - the param err (before req, res) is used by this library and any middleware that uses that parameter is called (as is this case) */
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  // not needed since we've created the customError object & still returning a response with it below
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  // handling duplicate error and sending back a more friendly user response (can be used by frontend)
  // 1100 is the default errCode we receive from mongoose
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  console.log('or here?');
  return res.status(customError.statusCode).json({ msg: customError.msg });
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;
