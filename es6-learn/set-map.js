import assert from 'assert';
import _ from 'lodash';

// 1. Set
//   类似于数组，但是成员的值唯一，没有重复值
var s = new Set([1, 2, 2, 1, 3, 3]);
assert.ok(_.isEqual([...s], [1, 2, 3]));
assert.equal(s.size, 3);
assert.ok(s.has(1));

s.add(3).add(4).add(4);
assert.equal(s.size, 4);

s.delete(2);
assert.ok(!s.has(2));

// Set 的key 和 value是同一个, 下面三种方式得到的结果一致
/*
for (let item of s.keys()) {
  console.log(item);
}

for (let item of s.values()) {
  console.log(item);
}

for (let item of s) {
  console.log(item);
}
*/

// 应用，并集(union)，交集(intersect)
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let union = new Set([...a, ...b]);
assert.ok(_.isEqual([...union], [1, 2, 3, 4]));
let interset = new Set([...a].filter(x => b.has(x)));
assert.ok(_.isEqual([...interset], [2, 3]));

// 2. WeakSet
//   WeakSet的成员只能是对象
//   WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，因此是不可遍历的
let ws = new WeakSet();
// ws.add(1); // TypeError: Invalid value used in weak set

// 应用，存储DOM节点，不用担心节点删除后，会引发内存泄漏

// 3. Map
var items = [
  ['name', 'bill'],
  ['title', 'Author ']
];
var m = new Map(items);
m.set(1, 'number');
m.forEach((key, value) => console.log(key, value));
assert.ok(m.has(1));
assert.equal(m.get(1), 'number');
assert.equal(m.get(2), undefined);
assert.ok(_.isEqual([...m], [ [ 'name', 'bill' ], [ 'title', 'Author ' ], [ 1, 'number' ] ]));

// 4. WeakMap
//   只接受对象作为键名