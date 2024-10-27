class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message); // call parent class constructor
    this.statusCode = statusCode; // set property stausCode of class to parameter and therefore the arg passed
  }
}

const createCustomError = (msg, statusCode) => {
  // instantiate CustomAPIError class by calling its constructor
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
