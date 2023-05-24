function fn(callback){
    if(Math.random()<0.5){
        callback('success')
    }else{
        throw new Error(new Error('error'))
    }
}

try {
    fn(()=>{
        console.log('success')
    })
    
} catch (error) {
    console.log('err',error)
}