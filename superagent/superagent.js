// https://github.com/visionmedia/superagent
// support webpack (request lib unsupport)
var request = require('superagent');
var _ = require('lodash');

request
  .get('http://www.qq.com')
  .charset('gbk')
  .end(function(err, res) {
    // 内容 res.text
    console.log(_.keys(res));
    console.log(res.headers);
    console.log(res.charset);
  });