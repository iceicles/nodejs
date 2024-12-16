require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
// store images in cloud - cloudinary
// use v2 (never forget this)
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
const connectDB = require('./db/connect');

// access files in public folder
app.use(express.static('./public'));

// parsing json from req.body
app.use(express.json());

// adds a files object to the req when files (type='file') are sent
// for example - <input name="foo" type="file" />
// creating tempdir path with fileupload so cloudinary can use that path for uploading images - bypass all that code in uploadProductImageLocal
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// product router
const productRouter = require('./routes/productRoutes');
app.use('/api/v1/products', productRouter);

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

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
