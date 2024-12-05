const fs = require('node:fs');
const path = require('node:path');


fs.mkdir(path.join(process.cwd(), 'baseFolder'), () => {
});

const dirs = ['dir1', 'dir2', 'dir3', 'dir4', 'dir5'];

for (const dir of dirs) {
    fs.mkdir(path.join('baseFolder', dir), () => {
    });
}

const files = ['file1', 'file2', 'file3', 'file4', 'file5'];

for (const dir of dirs) {
    for (const file of files) {
        fs.writeFile(path.join('baseFolder', dir, file), 'text', () => {
        });
    }
}

console.log('path to baseFolder:', path.join(process.cwd(), 'baseFolder'));
fs.stat(path.join(process.cwd(), 'baseFolder'), (err, stats) => {
    console.log(`is baseFolder Directory?`, stats.isDirectory());
    console.log(`is baseFolder File?`, stats.isFile());
});

console.log('');

for (const dir of dirs) {
    console.log(`path to subfolder ${dir}:`, path.join(process.cwd(), 'baseFolder', dir));
    fs.stat(path.join(process.cwd(), 'baseFolder', dir), (err, stats) => {
        console.log(`is ${dir} Directory?`, stats.isDirectory());
        console.log(`is ${dir} File?`, stats.isFile());
    });
}

console.log('');

for (const dir of dirs) {
    for (const file of files) {
        console.log(`path to file ${file}:`, path.join(process.cwd(), 'baseFolder', dir, file));
        fs.stat(path.join(process.cwd(), 'baseFolder', dir, file), (err, stats) => {
            console.log(`is ${file} in ${dir} Directory?`, stats.isDirectory());
            console.log(`is ${file} in ${dir} File?`, stats.isFile());
        });
    }
    console.log('');
}







