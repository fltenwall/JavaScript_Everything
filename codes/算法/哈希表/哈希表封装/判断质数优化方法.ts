// 质数：大小 1 的自然数中只能被 1 和自己整除的数
/**
 * 
 * @param num 判断的数值
 * @returns 是否是质数
 */
function isPrimeSuper(num:number):boolean{
    const numSquare = Math.sqrt(num)
    for (let index = 2; index <= numSquare; index++) {
        if(num % index === 0) return false
    }
    return true
}

console.log(isPrimeSuper(9))
console.log(isPrimeSuper(14))