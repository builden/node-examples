import assert from 'assert';
import _ from 'lodash';

var [a, b, c] = [1, 2, 3];
assert.equal(c, 3);

var [head, second, ...tail] = [2, 3, 4, 5];
assert.ok(_.isEqual(tail, [4, 5]));

// support default value
var [x, y = 'b'] = ['a', undefined];
assert.equal(y, 'b');

// : alias, foo不再是变量名
// 默认值生效的条件是，对象的属性值严格等于undefined
var { foo: f, bar, msg = 'default' } = { bar: 'bbb', foo: 'aaa' };
assert.equal(f, 'aaa');
assert.equal(bar, 'bbb');
assert.equal(msg, 'default');

// 对象函数解析赋值
var { log, error } = console;
log('log');
error('error');

// 主要用于
// 1. 变量交换
var [x, y] = [1, 2];
[x, y] = [y, x];
assert.equal(x, 2);
assert.equal(y, 1);

// 2. 从函数返回多个值(支持数组和对象)
function example() {
  return [1, 2, 3];
}

var [aa, bb, cc] = example();
assert.equal(cc, 3);

// 3. 函数参数的定义
// 参数是一组有次序的值
function f1([x, y, z]) {
  assert.equal(z, 3);
}
f1([1, 2, 3]);

// 参数是一组无次序的值
function f2({x, y, z}) {
  assert.equal(z, 3);
}
f2({ z: 3, y: 2, x: 1 });

// 4. 提取JSON数组
var { id, data: arr } = { id: 32, data: [1, 2] };
assert.equal(id, 32);
assert.ok(_.isEqual(arr, [1, 2]));

// 5. 函数参数的默认值
function f3({x = 3, y = 4}) {
  return [x, y];
}
assert.ok(_.isEqual(f3({ x: 2 }), [2, 4]));

// 6. 遍历map对象
var map = new Map();
map.set('x', 1);
map.set('y', 2);
for (let [key, value] of map) {
  console.log(key + ' is ' + value);
}