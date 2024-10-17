const express = require('express');
const app = express();

// get people router
const peopleRouter = require('./routes/people');

// get login router
const authRouter = require('./routes/auth');

// static assets
app.use(express.static('./methods-public'));

// parses form data
// urlencoded parses incoming reqs and populates the request's body (req.body) by creating a new object containing the parsed data
app.use(express.urlencoded({ extended: false }));

// parse json data
// middleware that only parses json
app.use(express.json());

// only applied to '/api/people' (base route)
app.use('/api/people', peopleRouter);

// applied to auth router
app.use('/login', authRouter);

// listen on port 5000 [think of ports like unit #'s in an apartment :) ]
app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
