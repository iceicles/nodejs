const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const search = 'ab';
  const products = await Product.find({
    name: { $regex: search, $options: 'i' },
  });
  // we can use the pkg 'express-async-errors' to throw errors for routes.
  // no need to call next() function provided by express to call middleware with err msgs
  // throw new Error('testing async errors');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // in for ex., /api/v1/products?featured=true, featured=true is req.query
  const { featured, company, name } = req.query; // pull out only what we need
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    // see mongoDB docs: https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-regex
    queryObject.name = { $regex: name, $options: 'i' };
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
