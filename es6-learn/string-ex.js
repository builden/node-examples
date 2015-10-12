import assert from 'assert';
var s = '中国';
assert.equal(s.length, 2);
console.log(s.at(0));  // 中
console.log(s.charAt(0)); // 中
console.log(s.codePointAt(0)); // 20013
console.log(s.charCodeAt(0)); // 20013


assert.ok(s.startsWith('中'));
assert.ok(s.endsWith('国'));
assert.ok(s.includes('国')); // 是否有子串
assert.equal('x'.repeat(3), 'xxx');

// 字符串模块，支持多行
var muti = `first line
second line
param s ${s}`;
console.log(muti);

// 大括号中支持任意的javascript表达式
var [x, y] = [1, 2];
console.log(`${x} + ${y * 2} = ${x + y * 2}`);