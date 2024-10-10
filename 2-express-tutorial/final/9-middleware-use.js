const express = require('express');
const app = express();
const loggerMW = require('./logger');
const authorizeMW = require('./authorize');

// req => middleware => res

// invoke middleware for any route
// note: placement order matters. if you place the middleware **below** the home route (/)
// you won't get the logs for that route
// app.use(loggerMW);

// app.use('/api', loggerMW); // applies api/home/about/products

// to execute multiple MWs (middlewares)
app.use([loggerMW, authorizeMW]); // executed in the order they appear in array. (if authorize comes afterwards, it'll be executed first before logger)

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/about', (req, res) => {
  res.send('About');
});

app.get('/api/products', (req, res) => {
  res.send('Products');
});

app.get('/api/items', (req, res) => {
  console.log(req.user); // returns { name: 'john', id: 3 } sent from authorizeMW
  res.send(`Items for ${req.user.name}`);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
