// wraps the function in our controller with try/catch block
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // next passes code execution to next middleware
      next(error);
    }
  };
};

module.exports = asyncWrapper;
