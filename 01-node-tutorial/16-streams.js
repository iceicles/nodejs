// Read big data sequencially

const { createReadStream } = require('fs');

const stream = createReadStream('./content/big.txt', {
  highWaterMark: 90000,
  encoding: 'utf8', // to read the actual content from the file
});

// reading data in chunks
// by default, size of buffer is 64kb. we can control it (the size) by passing in the option with property key 'highWaterMark'
// last buffer - remainder
// 'highWaterMark' - control size
//
stream.on('data', (result) => {
  console.log(result);
  console.log(`Received chunk of ${result.length} bytes of data`);
});
// error event - (for instance, provide a wrong path to see this in action)
stream.on('error', (err) => {
  console.log(err);
});
