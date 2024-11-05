const path = require('node:path'); 

let filename = path.basename('/Users/admin/foobar.js');
console.log(filename);

let winfilepath = path.win32.basename('C:\\temp\\myfile.html');
console.log(winfilepath);
// Returns: 'myfile.html' 

let joinpath= path.join('/tmp', 'guest', 'sent/mail', 'logs', '..');
// Returns: '/tmp/guest/sent/mail/logs'
console.log(joinpath);