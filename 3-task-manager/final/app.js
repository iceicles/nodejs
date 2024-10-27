const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasksRouter);

app.use(notFound); // handle invalid route with custom response
app.use(errorHandlerMiddleware); // handle invalid request

const port = process.env.PORT || 3000; // allows us to use the port set by the hosting service or ours for local dev (3000)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
