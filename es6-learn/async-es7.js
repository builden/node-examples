import {promisify} from 'node-promise-es6';
import fs from 'fs';
import assert from 'assert';

function timeout(ms = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(ms), ms);
  });
}

async function doSomething(ms) {
  console.log('doSomething beg');
  await timeout(ms);
  console.log('doSomething timeout');
  await promisify(fs.readFile)(__dirname + '/jsconfig.json');
  console.log('doSomething end');
  return ms;
}

async function func() {
  console.log('func beg');
  await timeout();
  console.log('after timeout');

  // 并行 await* promises <=> await Promise.all(promises)
  var [x, y] = await* [doSomething(1000), doSomething(2000)];
  assert.equal(x, 1000);
  assert.equal(y, 2000);
  console.log('func doSomething end');
  var ctx = await promisify(fs.readFile)(__dirname + '/jsconfig.json');
  console.log('func readFile end');
}

func();

function callbackFn(x, y, cb) {
  return cb(null, x, y);
}
// 返回{returnX: 1, returnY: 2};
var cbf = promisify(callbackFn, ['returnX', 'returnY']);

// 返回 [1, 2]
var cbf2 = promisify(callbackFn);

async function test() {
  const {returnX, returnY} = await cbf(1, 2);
  assert.equal(returnX, 1);
  assert.equal(returnY, 2);

  const [x, y] = await cbf2(1, 2);
  assert.equal(x, 1);
  assert.equal(y, 2);
}

test();