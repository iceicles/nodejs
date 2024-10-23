const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasksRouter);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
