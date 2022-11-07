const {stdin, stdout} = process;
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const pathFolder = path.join(__dirname, 'files');
const pathFolderMain = path.join(__dirname, 'files-copy');

async function copyDirectory() {
    try {
        await fs.promises.rm(pathFolderMain, { recursive: true, force: true });
        await fs.promises.mkdir(pathFolderMain, { recursive: true });
        fs.readdir(pathFolder, {
            withFileTypes: true
        }, (err, files) => {
            if (err) stdout.write('err');
            files.forEach(file => {
                if (file.isFile()) {
                    fs.copyFile(path.join(__dirname, 'files', file.name), 
                    path.join(__dirname, 'files-copy', file.name), err => {
                        if (err) stdout.write('err');
                    });
                }
            });
        });
    } catch (err) {
        stdout.write('err');
    }
}
copyDirectory();