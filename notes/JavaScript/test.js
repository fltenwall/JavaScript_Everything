const fn = function(count, start, res){
    const mid = Math.ceil(count / 2)
    let index = start
    let arrCount = 0
    let tempArr = []
    while(index <= mid && arrCount < count){
        tempArr.push(index)
        arrCount += index
        if(arrCount === count){
            res.push(tempArr)
            break
        }
        ++index
    }
    if(start <= mid) return fn(count, start+1, res)
}

const func = function(count){
    let res = []
    fn(count, 1, res) 
    return res
}
console.log(func(4))  // []
console.log(func(5))  // [ [ 2, 3 ] ]
console.log(func(10)) // [ [ 1, 2, 3, 4 ] ]
console.log(func(15)) // [ [ 1, 2, 3, 4, 5 ], [ 4, 5, 6 ], [ 7, 8 ] ]