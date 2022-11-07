const {stdin, stdout, exit} = process;
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const pathFolder = path.join(__dirname, 'styles');
const pathFolderMain = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

async function mainStyles() {
    try {
        fs.readdir(pathFolder, {
            withFileTypes: true
        }, (err, files) => {
            if (err) stdout.write('err');
            files.forEach(file => {
                if (file.isFile()) {
                    const pathFile = path.join(pathFolder, file.name);
                    fs.stat(pathFile, (err, stats) => {
                        if (err) stdout.write('err');
                        const ext = `${path.parse(file.name).ext.slice(1)}`;
                        if (ext == 'css') {
                            const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
                            readableStream.on('data', data => pathFolderMain.write(data));
                        }
                    });
                }
            });
        });
    } catch (err) {
        stdout.write('err');
    }
}
mainStyles();
