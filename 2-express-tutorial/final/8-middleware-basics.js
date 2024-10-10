// express middleware are functions that execute during the request to the server.
// each middleware function has access to the request and response objects
// middleware is the heart of soul of express - express is literally just a bunch of middlewares tapped together

// request comes in, middleware does something, then we send back the response
// req => middlware => res

const express = require('express');
const app = express();

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  // when you work with middleware you must send it to the next middleware (next parameter) or send back a response (res parameter)
  // otherwise you'll get a loading spinner when the browser is refreshed
  // res.send('Testing');
  next(); // sends to the app.get method's res.send() (remember - req => middleware => res)
};

// express provides the arguments but we pass in the parameters during function defintion (req, res, next)
app.get('/', logger, (req, res) => {
  res.send('Home');
});

app.get('/about', logger, (req, res) => {
  res.send('About ');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
