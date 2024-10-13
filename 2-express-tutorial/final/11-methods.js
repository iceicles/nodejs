const express = require('express');
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));

// parses form data
// urlencoded parses incoming reqs and populates the request's body (req.body) by creating a new object containing the parsed data
app.use(express.urlencoded({ extended: false }));

// parse json data
// middleware that only parses json
app.use(express.json());

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body; // can do this thanks to the middleware express.json that parses and attaches to body
  console.log('name - ', name);
  if (!name)
    return res
      .status(400)
      .json({ sucess: false, msg: 'please provide name value' });
  res.status(201).json({ success: true, person: name });
});

app.post('/login', (req, res) => {
  // console.log(req.body);
  const { name } = req.body;

  if (!name) return res.status(401).send('Please Provide Credentials');

  res.status(200).send(`Welcome ${name}`);

  //res.send('POST');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
