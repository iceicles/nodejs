require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// rest of packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const reviewRouter = require('./routes/review');

// middleware
const notFoundMW = require('./middleware/not-found');
const errorHandlerMW = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET)); // signing cookies with JWT SECRET
app.use(express.static('./public'));
app.use(fileUpload());

// routes
app.get('/', (req, res) => {
  res.send('<h1>E-commerce API</h1>');
});
app.get('/api/v1', (req, res) => {
  // regular cookies - req.cookies
  // signed cookies - req.signedCookies
  console.log('cookies from frontend - ', req.signedCookies);
  res.send('<h1>E-commerce API</h1>');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use(notFoundMW);
app.use(errorHandlerMW);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
