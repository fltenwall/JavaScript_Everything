const delay = function(interval){
    return new Promise((resolve, reject) =>{
        setTimeout(function(){
            resolve(interval)
        },interval)
    })
}

let tasks = [()=>{
    return delay(1000)
},()=>{
    return delay(1000)
},()=>{
    return delay(1001)
},()=>{
    return delay(1002)
},()=>{
    return delay(1003)
},()=>{
    return delay(1004)
},()=>{
    return delay(1001)
},()=>{
    return delay(1002)
}]

function createRequest(tasks, pool = 3){
    const results = []
    let together = new Array(pool).fill(null)
    let index = 0
    together = together.map(()=>{
        return new Promise((resolve , reject)=>{
                const run = function(){
                    if(index >= tasks.length){
                        resolve()
                        return
                    }
                    let old_index = index
                    let task = tasks[index++]
                    task().then(res => {
                        results[old_index] = res
                        run()
                    }).catch(err => {
                        reject(err)
                    })
                }
                run()
            })
    })

    return Promise.all(together).then(()=>results)
}
createRequest(tasks, 3).then(res => console.log(res)).catch(err => console.log('失败了', err))


