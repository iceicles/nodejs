const http = require('http');

// previous way -
// const server = http.createServer((req, res) => {
//   res.end('Welcome')
// })

// Using Event Emitter API
const server = http.createServer();
// emits request event
// subcribe to it / listen for it / respond to it
// https://nodejs.org/api/http.html#event-request
server.on('request', (req, res) => {
  res.end('Welcome');
});

server.listen(5000);
