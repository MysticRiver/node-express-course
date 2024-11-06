const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Welcome to the home page');
    } else if (req.url === '/about') {
        res.end('Here is our story');
    } else {
        res.end(`
        <h1>Oops!</h1>
        <p>Page Not Found</p>
        <a href="/">Back to the Home Page</a>
        `);
    }
}).listen(3000);