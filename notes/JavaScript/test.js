
function createPromise(val){
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            resolve(val)
        },1000)
    })
}

(async function(){
    const list = [1,2,3]

    for (const num of list) {
        const res = await createPromise(num)
        console.log(res)
    }
})()

