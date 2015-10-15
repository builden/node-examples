import {promisify} from 'node-promise-es6';
import fs from 'fs';

function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}

async function doSomething() {
  console.log('doSomething beg');
  await promisify(fs.readFile)(__dirname + '/jsconfig.json');
  console.log('doSomething end');
  await timeout();
  console.log('doSomething timeout');
}

async function func() {
  console.log('func beg');
  await timeout();
  console.log('after timeout');

  await doSomething();
  await doSomething();
  console.log('func doSomething end');
  var ctx = await promisify(fs.readFile)(__dirname + '/jsconfig.json');
  console.log('func readFile end');
}

func();