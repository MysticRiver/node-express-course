//load writeFileSync and readFileSync functions from the fs module. 
const { writeFileSync, readFileSync } = require('fs');

//use writeFileSync to write 3 lines to a file, ./temporary/fileA.txt, using the "append" flag for each line after the first one.
writeFileSync('./temporary/fileA.txt',`This is the First Line`,{ flag: 'a' });
writeFileSync('./temporary/fileA.txt',`This is the Second Line`,{ flag: 'a' });
writeFileSync('./temporary/fileA.txt',`This is the Third Line`,{ flag: 'a' });

// use readFileSync to read the file, and log the contents to the console.
const fileContents = readFileSync('./temporary/fileA.txt', 'utf8')
console.log(fileContents);
