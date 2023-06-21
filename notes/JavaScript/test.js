const arr = [39,3,28,9,10,48,28,59,6]

function sort(array){
    if(array.length <= 1) return array
    let mid = Math.floor(array.length / 2)
    let left = [], right = []
    let midValue = array.splice(mid, 1)[0]
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element > midValue ? right.push(element) : left.push(element)
    }
    return sort(left).concat(midValue, sort(right))
}

console.log(sort(arr))