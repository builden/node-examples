import assert from 'assert';
import _ from 'lodash';

// 1. 属性的简介表达式
var foo = 'bar';
var baz = { foo }; // <=> baz = { foo: foo }

var o = { func() { return 'call'; } }
// <=> var o = { func: function() { return 'call'; }};

function getPoint() {
  var x = 1;
  var y = 10;
  return { x, y }
}

assert.ok(_.isEqual(getPoint(), { x: 1, y: 10 }));

// 2. 属性名表达式
var lastWord = 'last word';
var a = {
  'first word': 'hello',
  [lastWord]: 'word',
  ['h' + 'i']() {
    console.log('hi');
  }
};
assert.equal(a[lastWord], a['last word']);
a.hi();
