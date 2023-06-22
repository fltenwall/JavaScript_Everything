function rotateArray(arr, k){
    const len = arr.length
    if(k < 0 || k === 0 || k === len) return arr
    new Array(k).fill('').forEach(() => arr.unshift(arr.pop()))
    return arr
}

const arr = [1,2,3,4,5,6,7]

console.log(rotateArray(arr,-1))
console.log(rotateArray(arr,0))
console.log(rotateArray(arr,7))
console.log(rotateArray(arr,3)) // [5, 6, 7, 1,2, 3, 4]