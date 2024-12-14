//const { writeFile, readFile } = require("fs").promises;  
const fs = require('fs/promises');
async function writer() {
  try {
    const content = '1st Line \n 2nd Line \n 3rd Line \n';
    await fs.writeFile('temp.txt', content);
    console.log('File has been written successfully.');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

async function reader() {
  try {
    const data = await fs.readFile('temp.txt', 'utf-8');
    console.log('File content:\n', data);
  } catch (error) {
    console.error('Error reading from file:', error);
  }
}

async function readWrite() {
  await writer(); // Calls the writer function and waits for it to complete. 
  await reader(); //Calls the reader function and waits for it to complete.
}

// Call the readWrite function to execute both writer and reader in sequence
readWrite();
