// https://github.com/oliver-moran/jimp
var Jimp = require('jimp');

var boom = new Jimp(__dirname + '/test/res/png/buff_boom_1.png', function (err, img) {
  this.resize(40, 40) // resize
    .write("lenna-small.png") // save
    .quality(60) // set JPEG quality
    .write("lenna-small.jpg") // save as JPEG
    .greyscale() // set greyscale  灰化
    .write("lena-small-bw.png") // save again
    .crop(10, 10, 10, 10) // crop  裁剪
    .write("lena-small-bw-cropped.png"); // save again
});