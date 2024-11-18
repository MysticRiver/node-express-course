const fs = require('fs/promises');

fs.writeFile('temp.txt', 'Line 1\n')
  .then(() => {
    return fs.appendFile('temp.txt', 'Line 2\n');
  })
  .then(() => {
    return fs.appendFile('temp.txt', 'Line 3\n');
  })
  .then(() => {
    return fs.readFile('temp.txt', 'utf-8');
  })
  .then((data) => {
    console.log('File content:\n', data);
  })
  .catch((error) => {
    console.log('An error occurred:', error);
  });