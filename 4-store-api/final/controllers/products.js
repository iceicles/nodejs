const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    name: 'vase table',
  });
  // we can use the pkg 'express-async-errors' to throw errors for routes.
  // no need to call next() function provided by express to call middleware with err msgs
  // throw new Error('testing async errors');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // in for ex., /api/v1/products?featured=true, featured=true is req.query
  const { featured } = req.query; // pull out only what we need
  const queryObject = {}; // either featured or {} - this helps if we pass properties not in our schema like page=2 for instance
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
