var express = require('express');
var app = express();

app.get('/', function(req, res) {
  console.log('req from ' + req.ip);
  console.log('ua: ' + req.headers['user-agent']);
  res.send('Hello World!');
});

app.post('/', function(req, res) {
  res.send('Got a POST request');
});

app.put('/user', function(req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function(req, res) {
  res.send('Got a DELETE request at /user');
});

// 使用子路由
app.use('/api', require('./router.js'));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  var family = server.address().family; // IPv6

  console.log('app listening at %s http://%s:%s', family, host, port);
});