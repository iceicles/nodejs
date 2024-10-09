const express = require('express');
const path = require('path');

const app = express();

// setup static (assets/files that server don't need to change) and middleware (app.use)
// note: browser-app.js is part of /public because even tho JS is dynamic in nature, it is dynamic on the browser (in this case)
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
});

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});

app.listen(5000, () => {
  console.log(`server is listening on port 5000...`);
});
