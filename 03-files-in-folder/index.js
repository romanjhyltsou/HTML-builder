const fs = require('fs');
const path =  require('path');

fs.readdir('03-files-in-folder/secret-folder', (err, data) =>{

    data.forEach( file => {

        fs.stat(`03-files-in-folder/secret-folder/${file}`, (err, stats) => {

            if(stats.isFile()){
                let indexFile = file.indexOf('.');
                let size = fs.statSync('03-files-in-folder/secret-folder/' + file).size;
                let name = file.slice(0, indexFile);
                let ext  = path.extname(file).slice(1);
                console.log(`${name}: ${ext} - ${size / 1024} KB`);
            }

        });

    });
});

/* IsDirectory и isFile */