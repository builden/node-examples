// forEach for...in 都无法中途跳出循环
// for...of可以

var arr = [1, 2, 3, 4];

for (let item of arr) {
  if (item === 2) {
    break;
  }
  console.log(item);
}