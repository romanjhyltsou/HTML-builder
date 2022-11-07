const fs = require('fs');
const stream = fs.createReadStream('01-read-file/text.txt', 'utf-8');

let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));

/* let fs = require('fs');
let path = require('path');

fs.readFile(
    path.join(__dirname,'text.txt'),
    'utf-8',
    (err, data) => {
        if (err) throw err;
        console.log(data);
    }
); */

