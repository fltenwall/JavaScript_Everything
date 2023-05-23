Promise.resolve().then(() => {
    console.log(0);
    // 返回的是一个thenable的，多推一次微任务
    return {
        then : function(resolve){
            resolve(4)
        }
    }
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
4
3
5
6
*/
  
  