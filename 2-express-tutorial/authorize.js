// note: this is not how to authorize users lol..
const authorizeMW = (req, res, next) => {
  const { user } = req.query;
  if (user === 'john') {
    // adding 'user' property to req object
    req.user = { name: 'john', id: 3 };
    next(); // still need to call this
  } else {
    res.status(401).send('Unauthorized');
  }

  // console.log('authorize');
  // next();
};

module.exports = authorizeMW;
