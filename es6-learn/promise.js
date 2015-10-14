/**
 * 有三个状态：Pending(进行中),Resolved(已完成),Rejected(已失败)
 * 状态改变只可能是 Pending => Resolved 和 Pending => Rejected
 * 和事件不一样，事件已经发生了，再对Promise对象添加回调函数，也会得到这个结果
 *
 * throw 相当于调用了reject
 */

function timeout(ms, isReject = false) {
  return new Promise((resolve, reject) => {
    setTimeout(isReject ? reject : resolve, ms, ms + ' done');
  });
}

timeout(100)
  .then(value => console.log('resolve: ' + value))
  .catch(error => console.log('reject: ' + error));

timeout(200, true)
  .then(value => console.log('resolve: ' + value))
  .catch(error => console.log('reject: ' + error));

timeout(100)
  .then(value => timeout(300, true))
  .then(value => console.log('chain'))
  .catch(error => console.log('reject chain: ' + error));