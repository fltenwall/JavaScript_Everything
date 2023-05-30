console.log(Function.__proto__ === Function.prototype)
// console.log(Object.getOwnPropertyDescriptors(Function.prototype))
console.log(Function.prototype.__proto__ === Object.prototype)

// console.log(Object.__proto__ === Function.prototype)
// console.log(Object.prototype.__proto__)

function Fn(){}
console.log(Fn.__proto__  === Function.prototype) // true
console.log(Fn.prototype.constructor) // [Function: Fn]

console.log(Function.__proto__ === Function.prototype)
console.log(typeof Function.__proto__)
console.log(typeof Function.prototype)
console.log(typeof Object.prototype)
console.log(typeof Object.__proto__)