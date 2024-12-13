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

  // handling cast error
  if (err.name === 'CastError') {
    customError.msg = ` No item found in id: ${err.value}`;
    customError.statusCode = 404;
  }

  // handling validation error
  if (err.name === 'ValidationError') {
    // console.log(err);
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = 400;
  }

  // handling duplicate error and sending back a more friendly user response (can be used by frontend)
  // 1100 is the default errCode we receive from mongoose
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    ``;
    customError.statusCode = 400;
  }
  console.log('or here?');
  return res.status(customError.statusCode).json({ msg: customError.msg });
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandlerMiddleware;

// validation error  -
// if we uncomment return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }); and don't pass password and email
// when registering we get this in postman -
// we're checking for validation error to provide custom validation errors when this happens
/* 
{
    "err": {
        "errors": {
            "password": {
                "name": "ValidatorError",
                "message": "Please provide  password",
                "properties": {
                    "message": "Please provide  password",
                    "type": "required",
                    "path": "password"
                },
                "kind": "required",
                "path": "password"
            },
            "email": {
                "name": "ValidatorError",
                "message": "Please provide email",
                "properties": {
                    "message": "Please provide email",
                    "type": "required",
                    "path": "email"
                },
                "kind": "required",
                "path": "email"
            }
        },
        "_message": "User validation failed",
        "name": "ValidationError",
        "message": "User validation failed: password: Please provide  password, email: Please provide email"
    }
}

*/

// cast error (if we return the entire err object)-
// cast error happens when the param id (in our case for getting (update or delete) a single job) doesn't exist in the db
/* 
{
    "err": {
        "stringValue": "\"6758c81acd58f8db4cc533323\"",
        "valueType": "string",
        "kind": "ObjectId",
        "value": "6758c81acd58f8db4cc533323",
        "path": "_id",
        "reason": {},
        "name": "CastError",
        "message": "Cast to ObjectId failed for value \"6758c81acd58f8db4cc533323\" (type string) at path \"_id\" for model \"Job\""
    }
}

*/
