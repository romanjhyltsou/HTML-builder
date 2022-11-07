const {stdout} = process;
const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname);

const pathCompS = path.join(__dirname, 'components');
const pathFolderAssets = path.join(__dirname, 'assets');
const pathFolderStyles = path.join(__dirname, 'styles');
const pathFolderHtml = path.join(__dirname, 'template.html');

const pathFolderMain = path.join(__dirname, 'project-dist');
const pathFolderMainHtml = path.join(__dirname, 'project-dist', 'index.html');
const pathFolderMainAssets = path.join(__dirname, 'project-dist', 'assets');
const pathFolderMainStyles = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

async function сreatePage() {
    try {
        await fs.promises.mkdir(pathFolderMain, {
            recursive: true
        });
        createHtml(pathFolderHtml, pathFolderMainHtml, pathCompS);
        copyDir(pathFolderAssets, pathFolderMainAssets);
        mainStyles();
    } catch (err) {
        stdout.write('err');
    }
}
сreatePage();

async function copyDir(pathFolderAssets, pathFolderMainAssets) {
    try {
        await fs.promises.rm(pathFolderMainAssets, {
            recursive: true,
            force: true
        });
        await fs.promises.mkdir(pathFolderMainAssets, {
            recursive: true
        });

        const folders = await fs.promises.readdir(pathFolderAssets, {
            withFileTypes: true
        });
        for (let folder of folders) {
            const original = path.join(pathFolderAssets, folder.name);
            const copy = path.join(pathFolderMainAssets, folder.name);
            if (folder.isFile()) {
                await fs.promises.copyFile(original, copy);
            } else {
                await copyDir(original, copy);
            }
        }
    } catch (err) {
        stdout.write('err');
    }
}

async function mainStyles() {
    try {
        fs.readdir(pathFolderStyles, {
            withFileTypes: true
        }, (err, files) => {
            if (err) stdout.write('err');
            files.forEach(file => {
                if (file.isFile()) {
                    const pathFile = path.join(pathFolderStyles, file.name);
                    fs.stat(pathFile, (err, stats) => {
                        if (err) stdout.write('err');
                        const ext = `${path.parse(file.name).ext.slice(1)}`;
                        if (ext == 'css') {
                            const readableStream = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
                            readableStream.on('data', data => pathFolderMainStyles.write(data));
                        }
                    });
                }
            });
        });
    } catch (err) {
        stdout.write('err');
    }
}

async function createHtml(pathFolderHtml, pathFolderMainHtml, pathCompS) {
    try {
        let textHtml = await fs.promises.readFile(pathFolderHtml, 'utf-8');
        const components = await fs.promises.readdir(pathCompS);
        for (const component of components) {
            const pathComp = path.join(pathCompS, component);
            const extComp = path.parse(component).ext;
            const nameComp = path.basename(pathComp, extComp);
            let dataComp = await fs.promises.readFile(pathComp, 'utf-8');
            textHtml = textHtml.replace(`{{${nameComp}}}`, dataComp);
        }
        await fs.promises.writeFile(pathFolderMainHtml, textHtml);

    } catch (err) {
        stdout.write('err');
    }
}