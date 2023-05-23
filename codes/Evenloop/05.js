Promise.resolve().then(() => {
    console.log(0);
    // thenable对象实现的then方法是一个宏任务
    return {
        then : function(resolve){
                setTimeout(function(){
                    resolve(4)
            })
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
3
5
6
4
*/
  
  