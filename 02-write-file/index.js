const {stdin, stdout, exit} = process;
const fs = require('fs');
const path = require('path');

const textTxt = fs.createWriteStream(path.join(__dirname, 'text.txt'), (err) => {
  if (err) throw err;
  console.log('Created file ');
});

stdout.write('Please enter something\n');

stdin.on('data', data => { 
  try {
      if (data.toString().trim().length === 0) {
          throw err;
      } else if (data.toString().trim() === 'exit'){
        process.exit();
      } else {
        textTxt.write(data);
      }
  } catch (err) {
      console.log('String cannot be empty!');      
  }
});

process.on('exit', () => stdout.write('\ngood bye'));
process.on('SIGINT', () => process.exit());