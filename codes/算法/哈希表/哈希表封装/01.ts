class HashTable<T = any> {
    private storage:[string, T][][] = []
    private length:number = 7
    // 已经存入的个数
    private count: number = 0
    // 哈希函数
    private hashFunction(key: string, len:number):number{
        // 计算hashcode
        let hashcode = 0;
        const length = key.length;
        for(let i=0;i<length;i++){
            // 霍纳法则计算hashcode
            hashcode = 31 * hashcode + key.charCodeAt(i)
        }
        // 计算出索引
        let index = hashcode % len
        return index
    }

    // 插入/修改操作
    put(key:string, val:T){
        // 根据key通过哈希函数得到索引值
        const index = this.hashFunction(key, this.length)
        // 取出索引值对应的桶(数组)
        let bucket = this.storage[index]
        // 判断桶内是否已有元组
        if(!bucket){
            bucket = []
            this.storage[index] = bucket
        }
        let isUpdate = false
        for(let i=0;i<bucket.length;i++){
            const tuple = bucket[0]
            const tupleKey = tuple[0]
            if(tupleKey === key){
                // 修改操作
                tuple[1] = val
                isUpdate = true
            }
        }
        // 添加操作
        if(!isUpdate) {
            bucket.push([key,val])
            this.count++
        }
    }
    // 获取值
    get(key:string):T|undefined{
        // 根据key获取索引值
        const index = this.hashFunction(key, this.length)
        // 获取桶
        const bucket = this.storage[index]
        // 桶是否存在 
        if(!bucket) return undefined
        // 遍历桶内元组
        for (let index = 0; index < bucket.length; index++) {
            const tuple = bucket[index];
            const tupleKey = tuple[0];
            const tupleValue = tuple[1];
            if(tupleKey){
                return tupleValue
            }
        }
        return undefined
    }
}

const hashTable = new HashTable()
hashTable.put('aaa',123)
hashTable.put('bbb',456)

console.log(hashTable.get('bbb')) //456
console.log(hashTable.get('ccc')) //undefined