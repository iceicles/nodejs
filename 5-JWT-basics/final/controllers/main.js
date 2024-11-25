/* 
- check username, password in post(login) request
- if it exists, create new JWT on server and send to client
- setup authentication so only the request with JWT can access the dashboard
*/

const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  // three ways to verify user/pass - mongo required(in schema) validations, Joi pkg, check in controller
  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }

  console.log(username, password);
  res.send('Fake Login/Register/Signup Route');
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
