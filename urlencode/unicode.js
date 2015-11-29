// unescape是用来处理%uXXXX这样格式的字符串, 将\uXXXX替换成%uXXXX后unescape就可以处理了
//    \u4e0a\u6c99\u4e2d\u5b66
// => 上沙中学
function decode(s) {
  return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
}

// export decode;

// 和解码中相对应, 使用escape编码, 然后将%uXXXX替换为\uXXXX, 因为escape还可能把一些字符编码成%XX的格式, 所以这些字符还需要使用unescape还原回来.
//  escape编码结果%uXXXX中的XXXX是大写的, 所以后面的replace只处理大写的A-F
//    上沙中学
// => \u4e0a\u6c99\u4e2d\u5b66
function encode(s) {
  return escape(s).replace(/%(u[0-9A-F]{4})|(%[0-9A-F]{2})/gm, function($0, $1, $2) {
      return $1 && '\\' + $1.toLowerCase() || unescape($2);
  });
}

// export encode;
// '&#28145;&#22323;&#24066;&#32418;&#26690;&#20013;&#23398;'
// 深圳市红桂中学
function mbDecode(s) {
  return s.replace(/&#(\d+);/gm, ($0, $1) => String.fromCharCode($1));
}

function mbEncode(s) {
  var rst = '';
  for (var i = 0; i < s.length; i++) {
    rst += '&#' + s[i].charCodeAt().toString() + ';';
  }
  return rst;
}

console.log(mbEncode('深圳市红桂中学d'));

console.log(mbDecode('&#28145;&#22323;&#24066;&#32418;&#26690;&#20013;&#23398;&#100;'));

/*
// javascript中，字符串可以直接用\uxxxx表示，xxxx表示字符的码点
// 这种表示法只限于 \u0000 - \uffff之间的字符，大于这两个的需要用两个表示
console.log('\u4e0a\u6c99\u4e2d\u5b66'); // => 上沙中学

// es6做了改进
assert.ok('\u{1F680}' === '\uD83D\uDE80');

// 表示一个字符可以用下面6种方式
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
*/