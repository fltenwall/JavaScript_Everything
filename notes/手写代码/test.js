function add(num1){
    return num1+1
}

function double(num1){
    return num1 * 2
}

function compose(...fns){
    if(fns.length === 0) return arg => arg
    if(fns.length === 1) return fns[0]
    return fns.reduce((result, fn) => (...args) => result(fn(...args)))
}


let newFn = compose(double,add)
console.log(newFn(10)) // 21

let newFn2 = compose()
console.log(newFn2(10)) // 10

let newFn3 = compose(double)
console.log(newFn3(10)) // 20