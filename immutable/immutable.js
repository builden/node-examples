import Immutable from 'immutable';
import assert from 'assert';

// constructor
// Object => Map, Array => List
var nested = Immutable.fromJS({a:{b:{c:[3,4,5]}}});
const map1 = Immutable.Map({ a: 1, b: 2});

console.log('nested', nested); // nested Map { "a": Map { "b": Map { "c": List [ 3, 4, 5 ] } } }
const map2 = map1.set('b', 3);
console.log('map1', map1); // map1 Map { "a": 1, "b": 2 }
console.log('map2', map2); // map2 Map { "a": 1, "b": 3 }
console.log(map2.get('b')); // 3


const map3 = map1.set('b', 2);
assert.ok(map1.equals(map3));
assert.ok(map1 === map3);
assert(!map1.equals(map2));

