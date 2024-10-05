// setting up server with http module to see why we would want to use express

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.write('<h1>home page</h1>');
  res.end();
});

server.listen(5000);
