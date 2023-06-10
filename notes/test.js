Function.prototype.unCurry = function(){
    const self = this
    return function(){
        return Function.prototype.call.apply(self, arguments)
    }
}
const clone = Array.prototype.slice.unCurry()

const arr1 = [1,2,3]
const arr2 = clone(arr1)
console.log(arr2, arr1 === arr2)