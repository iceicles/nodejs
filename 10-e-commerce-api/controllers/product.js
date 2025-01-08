const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');
const CustomError = require('../errors');

const createProduct = async (req, res) => {
  // using userId to know which user created which product
  // remember: any request made by the client will always include the cookie which has the access JWT
  const { userId } = req.user;

  // pass the user to req.body
  // note that 'user' property needs to match what is setup in ProductSchema
  req.body.user = userId;

  // then create the product with the product inputed by the user
  // which now also includes user property with userId
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  res.send('get all products');
};
const getSingleProduct = async (req, res) => {
  res.send('get single product');
};
const updateProduct = async (req, res) => {
  res.send('update product');
};
const deleteProduct = async (req, res) => {
  res.send('delete product');
};
const uploadImage = async (req, res) => {
  res.send('upload image');
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
