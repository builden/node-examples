var fs = require('fs');
var archiver = require('archiver');

function createZipFromDir() {
  var output = fs.createWriteStream(__dirname + '/tmp-zip/dir.zip');
  var archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  // 第二个参数是在zip文件夹中的目录名称，默认会把第一个参数的全路径压缩到zip文件中，'.'表示放在zip的根目录
  archive.directory(__dirname + '/../inquirer', 'inquirer');
  archive.directory(__dirname + '/../vantage', '.');
  archive.finalize();
}

function createZipFromFiles() {
  var output = fs.createWriteStream(__dirname + '/tmp-zip/files.zip');
  var archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('createZipFromFiles archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  var file1 = __dirname + '/../package.json';
  var file2 = __dirname + '/../vantage/server.js';

  archive
    .append(fs.createReadStream(file1), { name: 'dir/file1.txt' })
    .append(fs.createReadStream(file2), { name: 'file2.txt' })
    .finalize();
}

function createZipFromGlob() {
  var output = fs.createWriteStream(__dirname + '/tmp-zip/glob.zip');
  var archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  var cwd = __dirname + '/../inquirer';
  archive.bulk([
    { expand: true, cwd: cwd, src: ['**/*.+(js|txt)'] }
  ]);

  archive.finalize();
}

createZipFromDir();
createZipFromFiles();
createZipFromGlob();