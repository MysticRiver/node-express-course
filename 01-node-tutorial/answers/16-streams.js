const fs = require('fs');
const path = require('path');

// Path to the big file
const filePath = path.join(__dirname, '../content/big.txt');

// Create a read stream with specified encoding and highWaterMark
const readStream = fs.createReadStream(filePath, {
  encoding: 'utf8',
  highWaterMark: 500 // Adjust this value to test different chunk sizes
});

let chunkCount = 0;

// Handle the 'data' event
readStream.on('data', (chunk) => {
  chunkCount++;
  console.log(`Received chunk ${chunkCount}:`, chunk);
});

// Handle the 'end' event
readStream.on('end', () => {
  console.log(`Stream ended. Total chunks received: ${chunkCount}`);
});

// Handle the 'error' event
readStream.on('error', (error) => {
  console.error('An error occurred:', error);
});