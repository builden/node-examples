// reduce
//   和数组中的数据依次做运算，返回的值成为下一次运算的previousValue
const rst = [0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, index, array) {
  console.log(previousValue, currentValue, index, array);
  return previousValue + currentValue;
});

console.log('rst', rst);

const rst2 = [0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, index, array) {
  console.log(previousValue, currentValue, index, array);
  return previousValue + currentValue;
}, 10);

console.log('rst2', rst2);