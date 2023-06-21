const obj = {
    2:3,
    3:4,
    length:4,
    push:Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj) // { '2': 1, '3': 2, length: 4, push: [Function: push] }