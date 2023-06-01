// 质数：大小 1 的自然数中只能被 1 和自己整除的数
/**
 * 
 * @param num 判断的数值
 * @returns 是否是质数
 */
function isPrime(num:number):boolean{
    for (let index = 2; index < num; index++) {
        if(num % index === 0) return false
    }
    return true
}

console.log(isPrime(9))
console.log(isPrime(7))