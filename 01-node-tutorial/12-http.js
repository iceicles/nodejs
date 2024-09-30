const http = require('http');

const server = http.createServer((req, res) => {
  // req - client to server (details about method, body, etc)
  // res - server to client (response with json data, status code, etc)

  if (req.url === '/') {
    return res.end('Welcome to our home page'); // similar to below
    // res.write('Welcome to our home page');
    // res.end(); // end writing data
  }

  if (req.url === '/about') {
    return res.end('Here is our short history');
  }

  return res.end(
    `<h1>Oops!</h1> <p>We can't seem to find the page you are looking for</p> <a href="/">back home</a>`
  );
});

server.listen(5000);
