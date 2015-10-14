/**
 * Generator函数是ES6提供的一种异步编程方案
 * 内部封装了多个状态，执行Generator函数会返回一个遍历器对象
 */

function* helloWorldGenerator() {
  console.log('beg hello');
  yield 'hello';
  console.log('beg world');
  yield 'world';
  console.log('beg ending');
  return 'ending';
}

let hw = helloWorldGenerator();  // return iterator (不执行任何函数中的代码)
console.log(hw.next()); // { value: 'hello', done: false } (执行到yield 'hello'位置，暂停)
console.log(hw.next()); // { value: 'world', done: false }
console.log(hw.next()); // { value: 'ending', done: true }

// 内部调用的是next()，上面如果已经执行到了最后，则不会再继续
for (let v of hw) {
  console.log(v);
}

function* f() {
  const start = new Date;
  yield console.log('at next');
  const ms = new Date - start;
  console.log(`do it after ${ms}`);
}

var gen = f();
gen.next(); // at next
setTimeout(() => gen.next(), 1000);


function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (; ;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

// yield* 语句
//   如果要在一个Generator函数中调用另一个Generator函数
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  yield* foo(); // 直接执行foo()，没有任何效果
  yield 'y';
}

for (let v of bar()) {
  console.log(v); // x a b y
}

// 内部状态机，不需要在外面定义一个状态变量
function* clock(_) {
  while (true) {
    yield _;
    console.log('Tick!');
    yield _;
    console.log('Tock!');
  }
};

var c = clock('xx');
console.log(c.next());
console.log(c.next());