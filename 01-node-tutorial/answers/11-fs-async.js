const { writeFile } = require("fs");
console.log("at start");
writeFile("./temporary/output.txt", "This is the first line \n", (err) => {
    if (err) throw err;
    console.log('First line written');

    // here you write your next line
    writeFile("./temporary/output.txt", "This is the second line\n", {flag: 'a'}, (err) => {
        if (err) throw err;
        console.log("Second Line written");
    });
    writeFile("./temporary/output.txt", "This is the third line \n", {flag: 'a'}, (err) => {
        if (err) throw err;
        console.log("Third Line written");
    });
});
console.log("at end");