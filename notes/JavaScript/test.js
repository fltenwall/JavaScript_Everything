
function deepClone(source, map = new WeakMap()){
    // 对值是 Symbol 类型的属性进行判断
    if(typeof source === 'symbol') {
        return new Symbol(source.description)
    }
    // 判断循环引用
    if(map.get(source)){
        return map.get(source)
    }
    // 非引用类型直接返回
    if(source === null || typeof source !== 'object') return source
    // 单独处理RegExp和Date
    if(source instanceof RegExp) return new RegExp(source)
    if(source instanceof Date) return new Date(source)
    if(source instanceof Set) {
        const newSet = new Set()
        for(const item of source){
            newSet.add(deepClone(item))
        }
        return newSet
    }
    if(typeof source === 'function') return source

    // 克隆的对象和之前的结果保持一样的所属类
    const target = new source.constructor;
    // 保持当前对象为key，为判断循环引用做准备
    map.set(source,target)
    for (const key in source) {
        if (Object.hasOwnProperty.call(source, key)) {
            let element = source[key]
            target[key] = deepClone(element)
        }
    }
    // 处理 Symbol 作为对象属性的情况
    const symbolKeys = Object.getOwnPropertySymbols(source)
    for (const symbolKey of symbolKeys) {
        target[Symbol(symbolKey.description)] = deepClone(source[symbolKey])
    }
    return target
}
let set = new Set([1,2,3])
let obj = {
    'set':set,
}
let obj2 = deepClone(obj)
console.log(obj2)