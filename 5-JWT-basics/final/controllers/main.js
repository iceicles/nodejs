/* 
- check username, password in post(login) request
- if it exists, create new JWT on server and send to client
- setup authentication so only the request with JWT can access the dashboard
*/

const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  // three ways to verify user/pass - mongo required(in schema) validations, Joi pkg, check in controller
  if (!username || !password) {
    throw new CustomAPIError('Please provide username and password', 400);
  }

  // just for demo, normally provided by DB!!
  const id = new Date().getDate();

  // create a new token payload
  // try to keep payload small, better experience for user since it'll be transferred everytime the client/user makes a req
  // the current jwt secret is just for demo, in production, use long, complex, and unguessable string value!!!
  // expiresIn - expires in 30 days
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
