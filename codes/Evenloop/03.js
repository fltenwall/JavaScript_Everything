Promise.resolve().then(() => {
    console.log(0);
    // 直接返回resolve(4)
    return 4 
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
4
2
3
5
6
*/