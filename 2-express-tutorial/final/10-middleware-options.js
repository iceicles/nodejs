const express = require('express');
const app = express();
const loggerMW = require('./logger');
const authorizeMW = require('./authorize');
const morgan = require('morgan');

// req => middleware => res

// 1. use vs route (using app.use or passing directly to specific routes)
// 2. options - our own / express / third party

// app.use([loggerMW, authorizeMW]); - our own
// app.use(express.static('./public')) - express
// third party -
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/about', (req, res) => {
  res.send('About');
});

app.get('/api/products', (req, res) => {
  res.send('Products');
});

// can also pass logger and authorize MWs like so for specific routes
app.get('/api/items', [loggerMW, authorizeMW], (req, res) => {
  console.log(req.user); // returns { name: 'john', id: 3 } sent from authorizeMW
  res.send(`Items for ${req.user.name}`);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
