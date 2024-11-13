//load writeFileSync and readFileSync functions from the fs module. 
const { writeFileSync, readFileSync } = require('fs');

//use writeFileSync to write 3 lines to a file, ./temporary/fileB.txt, using the "append" flag for each line after the first one.
writeFileSync('./temporary/fileB.txt',`This is the First Line\n`,{ flag: 'a' });
writeFileSync('./temporary/fileB.txt',`This is the Second Line\n`,{ flag: 'a' });
writeFileSync('./temporary/fileB.txt',`This is the Third Line\n`,{ flag: 'a' });

// use readFileSync to read the file, and log the contents to the console.
const fileContents = readFileSync('./temporary/fileB.txt', 'utf8')
console.log(fileContents);
