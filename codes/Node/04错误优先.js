function fn(callback){
    if(Math.random()<0.5){
        callback('success')
    }else{
        callback(new Error('error'))
    }
}

fn((res)=>{
    if(res) return console.log('error')
    console.log('success')
})