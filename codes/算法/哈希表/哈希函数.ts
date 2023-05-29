
// len 数组长度
function hashFunction(key: string, len:number):number{
    // 计算hashcode
    let hashcode = 0;
    const length = key.length;
    for(let i=0;i<length;i++){
        // 霍纳法则计算hashcode
        hashcode = 31 * hashcode + key.charCodeAt(i)
    }
    // 计算出索引,取余操作保证索引值在数组长度范围内
    let index = hashcode % len
    return index
}

// 填充因子=4/9
console.log(hashFunction('abc', 9))
console.log(hashFunction('cds', 9))
console.log(hashFunction('cbq', 9))
console.log(hashFunction('qlm', 9))

