var request = require('request');
var console = require('better-console');
var querystring = require('querystring');
var qs = require('qs-lite');

var testUrl = 'http://localhost:3000';
/*
request(testUrl, {
  headers: {
    'user-agent': 'request client'
  }
}, function (err, res, body) {
  if (!err && res.statusCode === 200) {
    console.log(body) // Show the HTML for the Google homepage.
  } else {
    console.error(res.statusCode, err);
  }
});

request.post({
  url: testUrl,
  form: { key: 'value' }
}, function (err, res, body) {
  if (!err && res.statusCode === 200) {
    console.log(body);
  } else {
    console.error(res.statusCode, err);
  }
});

request.put(testUrl + '/user', function (err, res, body) {
  if (!err && res.statusCode === 200) {
    console.log(body);
  } else {
    console.error(res.statusCode, err);
  }
});

request.del(testUrl + '/user', function (err, res, body) {
  if (!err && res.statusCode === 200) {
    console.log(body);
  } else {
    console.error(res.statusCode, err);
  }
});*/


var apiUrl = testUrl + '/api';
var sendObj = {
  "get": '中文\" \\ /* ad-_.!~*\'()',
  "arr": [1, 2, '中文\" \\ * ad'],
  "adress": "中文",
  http: "http://www.qq.com/?dadf=123&ad=22#23345",
  inObj: JSON.stringify({
    "a": '中文\" \\ /* ad-_.!~*\'()',
    "b": "http://www.qq.com/?dadf=123&ad=22#23345"
  })
};
var getUrl = apiUrl + '?' + querystring.stringify(sendObj);

request.get(getUrl, function (err, res, body) {
  if (!err && res.statusCode === 200) {
    // console.log(body); // string
    console.log(body);
    var json = safeParse(body);
    console.log(json);
    console.log(json.get);
  } else {
    console.error(res.statusCode, err);
  }
});


request.post(apiUrl, {
  form: {
    "post": '中文\" \\ * ad-_.!~*\'()',
    "arr": [1, 2, '中文\" \\ * ad'],
    "adress": "中文"
  }
}, function (err, res, body) {
  if (!err && res.statusCode === 200) {
    var json = safeParse(body);
    console.log(body);
    console.log(json);
    console.log(json.post);
  } else {
    console.error(res.statusCode, err);
  }
});

function safeParse(str) {
  var json = {};
  try {
    json = JSON.parse(str);
  } catch (e) {
    console.error('parse %s failed', str);
    console.error(e.stack);
  }
  // catch到异常后依然会执行到这里
  return json;
}