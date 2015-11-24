var _ = require('lodash');
var s = require('underscore.string');
var assert = require('assert');
var querysting = require('querystring');
var qs = require('qs');


// RFC 3986 section 2.3
// unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"

/**
 * encodeURI / decodeURI
 *  不会对ASCII 字母和数字进行编码
 *  也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( )
 *  该方法的目的是对URI进行完整的编码，因此对URI具体特殊含义的ASCII字符，也不会进行编码：;/?:@&=+$,#
 */
(function () {
  var oriStr = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n\b\t\f\r111";
  var decStr = "%20!%22#$%25&'()*+,-./0123456789:;%3C=%3E?@ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D~%0A%08%09%0C%0D111";
  assert(encodeURI(oriStr) === decStr);
  assert(decodeURI(decStr) === oriStr);

  var str1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  assert(encodeURI(str1) === str1);
  var str2 = "-_.!~*'()"; // 这些标点符号不会编码
  assert(encodeURI(str2) === str2);

  var str3 = ";/?:@&=+$,#"; // 对URI具有特殊含义的字符，也不会编码
  assert(encodeURI(str3) === str3);

  // 空格，双引号，左中括号，左倾斜线，右中括号，左尖括号，右尖括号，百分号
  assert(encodeURI(" \"[\\]<>%") === "%20%22%5B%5C%5D%3C%3E%25");

  assert(decodeURI("%21%27%28%29%2A") === "!'()*");

  assert(encodeURI("中文") === "%E4%B8%AD%E6%96%87");
})();

/**
 * encodeURIComponent / decodeURIComponent
 *  如果 URI 组件中含有分隔符，比如 ? 和 #
 *  和encodeURI的区别只是对URI具体特殊含义的字符，进行编码
 */
(function () {
  var str1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  assert(encodeURIComponent(str1) === str1);
  var str2 = "-_.!~*'()"; // 这些标点符号不会编码
  assert(encodeURIComponent(str2) === str2);

  var str3 = ";/?:@&=+$,#"; // 对URI具有特殊含义的字符，会编码
  assert(encodeURIComponent(str3) === "%3B%2F%3F%3A%40%26%3D%2B%24%2C%23");

  // 空格，双引号，左中括号，左倾斜线，右中括号，左尖括号，右尖括号
  assert(encodeURIComponent(" \"[\\]<>") === "%20%22%5B%5C%5D%3C%3E");

  assert(decodeURIComponent("%21%27%28%29%2A") === "!'()*");

  assert(encodeURIComponent("中文") === "%E4%B8%AD%E6%96%87");
})();

// 注意：
//  encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。
//  因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号

/**
 * x5 在encodeURIComponent()的基础上
 * 增加了对这些ASCII字符的编码
 */
function x5Quote(uri) {
  var ret = encodeURIComponent(uri);
  ret = s.replaceAll(ret, "!", "%21");
  ret = s.replaceAll(ret, "'", "%27");
  ret = s.replaceAll(ret, "\\(", "%28");
  ret = s.replaceAll(ret, "\\)", "%29");
  ret = s.replaceAll(ret, "\\*", "%2A");
  return ret;
}

/**
 * lodash escape / unescape
 *
 */
(function () {
  var oriStr = "'fred, barney, & pebbles'";
  var decStr = "&#39;fred, barney, &amp; pebbles&#39;";
  assert(_.escape(oriStr) === decStr);
  assert(_.unescape(decStr) === oriStr);
})();


(function () {
  // don't support subObj
  // var obj = {
  //   foo: "bar",
  //   arr: [1, 2, 3],
  //   subObj: {
  //     a: "b"
  //   },
  //   spec: '中,^*()$#\\/'
  // };
  var obj = { arr: [1, 2, 3] };
  console.log(querysting.stringify(obj));
  console.log(qs.stringify(obj));
})();


var htmlCode = '{"\u4e0a\u6c99\u4e2d\u5b66":["\u91d1\u5730\u6d77\u666f\u82b1\u56ed","\u91d1\u5730\u6d77\u666f\u7fe0\u5824\u6e7e","\u5168\u6d77\u82b1\u56ed","\u7eff\u666f\u84dd\u6e7e\u534a\u5c9b","\u91d1\u6d77\u4e3d\u540d\u5c45","\u661f\u6cb3\u9526\u5c45","\u597d\u666f\u8c6a\u56ed","\u91d1\u5730\u540d\u8f69","\u6c99\u5634\u4e1c\u6751","\u6c99\u5634\u897f\u6751","\u91d1\u5730\u82b1\u56ed","\u91d1\u6d77\u6e7e\u82b1\u56ed","\u798f\u6c11\u65b0\u82d1","\u4e0a\u6c99\u4e1c\u6751","\u4e0a\u6c99\u5858\u664f\u6751","\u4e0a\u6c99\u9f99\u79cb\u6751","\u4e0a\u6c99\u82b1\u56ed","\u4e0a\u6c99\u6930\u6811\u6751","\u798f\u8363\u697c","\u60e0\u53d1\u82b1\u56ed","\u4e0b\u6c99\u6751","\u91d1\u57df\u84dd\u6e7e","\u9e3f\u666f\u6e7e\u540d\u82d1","\u6cf0\u7136\u5e7f\u573a","\u82b1\u597d\u56ed","\u78a7\u6d77\u7ea2\u6811\u56ed"]}';
console.log(JSON.parse(htmlCode));  // 自动转成了中文

console.log(_.unescape('&amp;, &lt;, &gt;, &quot;, &#39;, &#8482;, &#23398;'));
// => &, <, >, ", ', &#8482;, &#23398;

console.log(_.escape('&, <, >, \", \', ™, 深'));
// => &amp;, &lt;, &gt;, &quot;, &#39;, 深

console.log(s.unescapeHTML('&amp;, &lt;, &gt;, &quot;, &#39;, &#8482;, &#23398;'));
// => &, <, >, ", &#39;, &#8482;, &#23398;

console.log(s.escapeHTML('&, <, >, \", \', ™, 深'));
// => &amp;, &lt;, &gt;, &quot;, &apos;, ™, 深

console.log(unescape('&amp;, &lt;, &gt;, &quot;, &#39;, &#8482;, &#23398;'));
// => &amp;, &lt;, &gt;, &quot;, &#39;, &#8482;, &#23398;

console.log(escape('&, <, >, \", \', 深'));
// => %26%2C%20%3C%2C%20%3E%2C%20%22%2C%20%27%2C%20%u6DF1

// 无需转码，js原生支持这种编码方式
console.log('\u4e0a\u6c99\u4e2d\u5b66'); // => 上沙中学