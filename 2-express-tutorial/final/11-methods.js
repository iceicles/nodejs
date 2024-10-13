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
  // console.log('name - ', name);
  if (!name)
    return res
      .status(400)
      .json({ sucess: false, msg: 'please provide name value' });
  res.status(201).json({ success: true, person: name });
});

// using postman :)
app.post('/api/postman/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});

app.post('/login', (req, res) => {
  // console.log(req.body);
  const { name } = req.body;

  if (!name) return res.status(401).send('Please Provide Credentials');

  res.status(200).send(`Welcome ${name}`);

  //res.send('POST');
});

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // console.log(id, name);
  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});

app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }

  const newPeople = people.filter((person) => person.id !== Number(id));
  res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
