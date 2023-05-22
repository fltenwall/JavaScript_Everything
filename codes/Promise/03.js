// 若传入了一个实现了 then 方法的对象，则执行该then方法且由此方法决定状态

const testObj = {
    then : function(resolve, reject){
        resolve('ok');
    }
}

new Promise((resolve, reject)=>{
    resolve(testObj);
}).then((res)=>{
    console.log('res', res); // 执行
}, (err)=>{
    console.log('err', err);
})