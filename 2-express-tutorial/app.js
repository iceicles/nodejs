// setting up server with http module to see why we would want to use express

const http = require('http');

const server = http.createServer((req, res) => {
  console.log('user hit the server');
  res.end();
});

server.listen(5000);
