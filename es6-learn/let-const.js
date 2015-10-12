/**
 * let
 *   所申明的变量只在代码块内有效
 */

import assert from 'assert';

{
  let a = 1;
  var b = 2;
  const c = 3; // 和let一样，只在作用域内有效
  assert(a, 1);
}

// console.log(a);  // ReferenceError: a is not defined
assert(b, 2);
// console.log(c);  // ReferenceError: c is not defined

// 很适用
for (let i = 0; i < 5; i++) {}
// console.log(i); // ReferenceError: i is not defined

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    return i;
  };
}
assert.equal(a[6](), 10); // 10

for (let i = 0; i < 10; i++) {
  a[i] = function () {
    return i;
  };
}
assert.equal(a[6](), 6); // 6


const PI = 3.1415;
// PI = 3; // TypeError: Assignment to constant variable.
assert.equal(PI, 3.1415); // 3.1415