import assert from 'assert';

class Point {
  constructor(x, y = 3) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x},${this.y}`;
  }

  getClassName() {
    return Point.name;
  }

  get prop() {
    return 'getter';
  }

  set prop(value) {
    console.log('setter: ' + value);
    // throw new Error('该属性只读')
  }

  static staticFunc() {
    console.log('call static Func');
  }

  tmpProp = 1;
}

var p = new Point(3);
assert.equal(p.toString(), '3,3');
console.log(p.getClassName()); // Point

// 继承
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }

  toString() {
    return `${this.color} ${super.toString() }`;
  }

  set(key, value) {
    this[key] = value;
  }

  get(key) {
    return this[key];
  }

  * gen() {
    console.log('beg gen');
    yield 'next';
  }
}

var cp = new ColorPoint(1, 2, 'red');
assert.equal(cp.toString(), 'red 1,2');
console.log(cp.getClassName()); // Point
assert.ok(cp instanceof ColorPoint);
assert.ok(cp instanceof Point);
cp.prop = 123;
console.log(cp.prop);
cp.add = 'temp prop add';
console.log(cp.add);
// cp.gen().next();
// cp.staticFunc(); // TypeError: undefined is not a function
ColorPoint.staticFunc();

// es7属性 babel --optional es7.classProperties class.js
class Person {
  firstName = "Sebastian";
  static lastName = "McKenzie";
}

assert(new Person().firstName, "Sebastian");
assert(Person.lastName, "McKenzie");