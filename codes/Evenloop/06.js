Promise.resolve().then(() => {
    console.log(0);
    // 返回 Promise
    // 先将 Promise.resolve(4)向微任务向后推一次
    // 再将 Promise.resolve(4).then()向微任务向后再推一次
    return Promise.resolve(4)
  }).then((res) => {
    console.log(res)
  })
  
  
  Promise.resolve().then(() => {
    console.log(1);
  }).then(() => {
    console.log(2);
  }).then(() => {
    console.log(3);
  }).then(() => {
    console.log(5);
  }).then(() =>{
    console.log(6);
  })
/*
0
1
2
3
4
5
6
*/
  