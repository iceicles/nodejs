const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
  res.send('<h1> Home Page </h1><a href="/api/products">products</a>');
});

app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  // return selected properties (id, name, image)
  res.json(newProducts);
});

// route/path parameter
app.get('/api/products/:productID', (req, res) => {
  // console.log(req.params); // { productID: '1' }
  // console.log(req.params.productID); // 1, 2, etc..

  const { productID } = req.params;

  const singleProduct = products.find(
    (product) => product.id === parseInt(productID) // productID is a string
  );

  if (!singleProduct) {
    return res.status(404).send('<h1>Product not found</h1>');
  }
  //console.log(singleProduct);
  res.json(singleProduct);
});

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params); // { productID: '4', reviewID: 'abc' }
  res.send('hello world');
});

// search/query parameter
// note: you can combine query params, path params and the first request into one single request and just have logic determining if params or queries are present
app.get('/api/v1/query', (req, res) => {
  // console.log(req.query); // { name: 'john', id: '4' } based on url param (?name=john&id=4)
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    // or
    return res.status(200).json({ success: true, data: [] });
  }

  return res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
