
function decimalToBinary(decimal:number):string{
    const stack = new Array()
    while(decimal>0){
        const result = decimal % 2
        stack.push(result)
        decimal = Math.floor(decimal/2)
    }
    let res = ''
    while(stack.length){
        res += stack.pop()
    }

    return res
}

console.log(decimalToBinary(35)) // 100011