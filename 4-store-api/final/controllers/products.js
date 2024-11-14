const getAllProductsStatic = async (req, res) => {
  // we can use the pkg 'express-async-errors' to throw errors for routes.
  // no need to call next() function provided by express to call middleware with err msgs
  throw new Error('testing async errors');
  res.status(200).json({ msg: 'products testing route' });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products route' });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
