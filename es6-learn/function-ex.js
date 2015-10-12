import assert from 'assert';
import _ from 'lodash';

// 参数支持默认值
function f1(x, y = 'world') {
  console.log(x, y);
}

f1('hello');

// 强制不能省参数，否则保存
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

// foo(); // Error: Missing parameter


// rest参数
function add(...values) {
  let sum = 0;
  for (let val of values) {
    sum += val;
  }
  return sum;
}

assert.equal(add(2, 3, 5), 10);

// 扩展运算符，将一个数组转为用逗号分隔的参数序列
var numbers = [2, 3, 5, 7];
assert.equal(add(...numbers), 17);

var arr1 = [0, 1];
var arr2 = [2, 3];
assert.ok(_.isEqual(arr1.push(...arr2), [0, 1, 2, 3]));
var arr3 = [1, 2, ...arr1];
assert.ok(_.isEqual(arr3, [1, 2, 0, 1]));

const [first, ...rest] = [1, 2, 3, 4];
assert.ok(_.isEqual(rest, [2, 3, 4]));

// 获取函数名
assert.ok(add.name === 'add');

// 箭头函数
var f = v => v; // <=> var f = function(v) { return v; }
var f2 = () => 5; // <=> var f2 = function() { return 5 }
var sum = (num1, num2) => num1 + num2; // <=> var sum = function(num1, num2) { return num1 + num2 }
// 如果代码块多余一条语句，需要用大括号，并使用return 语句
var sum2 = (num1, num2) => { num1 += 1; return num1 + num2; }
// 如果返回的是一个对象，则需要在对象外面加上括号
var getTempItem = id => ({ id: id, name: 'Temp' });
var full = ({ first, last }) => first + ' ' + last;

const isEvan = n => n % 2 == 0;
const square = n => n * n;

// 简化回调函数
[1, 2, 3].map(x => x * x);
assert.ok(_.isEqual([2, 1, 3].sort((a, b) => a - b), [1, 2, 3]);