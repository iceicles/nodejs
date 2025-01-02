require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// rest of packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');

// middleware
const notFoundMW = require('./middleware/not-found');
const errorHandlerMW = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// routes
app.get('/', (req, res) => {
  res.send('<h1>E-commerce API</h1>');
});
app.get('/api/v1', (req, res) => {
  console.log('cookies from frontend - ', req.cookies);
  res.send('<h1>E-commerce API</h1>');
});

app.use('/api/v1/auth', authRouter);

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
