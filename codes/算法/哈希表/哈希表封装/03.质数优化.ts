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
            // 判断是否进行扩容
            // 扩容条件是填充因子>0.75
            const factor = this.count / this.length
            if(factor > 0.75){
                this.resize(this.length*2)
            }
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
    // 删除数据
    delete(key:string):T|undefined{
        // 获取索引值的位置
        const index = this.hashFunction(key, this.length)
        // 获取桶
        const bucket = this.storage[index]
        // 判断桶是否存在
        if(!bucket) return undefined
        // 遍历桶
        for (let index = 0; index < bucket.length; index++) {
            const tuple = bucket[index];
            const tupleKey = tuple[0]
            const tupleValue = tuple[1]
            if(tupleKey === key){
                bucket.splice(index,1)
                this.count--
                // 进行缩容判断
                // 填充因子<0.25则缩容
                const factor = this.count / this.length
                if(factor < 0.25 && this.length > 7){
                    this.resize(Math.floor(this.length/2))
                }
                return tupleValue
            }
        }
        return undefined
    }
    // 获取到目标数字最近的一个数字
    private getPrime(newLength:number):number{
        // 保证扩容后的数组是扩大质数倍
        let currentNum = newLength
        while(!this.isPrime(currentNum)){
            currentNum++
        }
        return currentNum
    }
    // 扩容/缩容
    private resize(newLength:number){
        let prime = this.getPrime(newLength)
        // 最小容量为 7
        if(prime < 7) prime = 7
        this.length = prime
        // 将原来的所有数据全部重新进行哈希并放入新数组
        // 获取到原来的数据
        const oldStorage = this.storage
        // 初始化
        this.storage = []
        this.count = 0
        oldStorage.forEach(bucket => {
            // 桶为空
            if(!bucket) return
            for (let index = 0; index < bucket.length; index++) {
                // 取到桶内每一个元组
                const tuple = bucket[index]
                // 重新放入新数组 
                this.put(tuple[0], tuple[1])
            }
        })
    }
    private isPrime(num:number):boolean{
        const numSquare = Math.sqrt(num)
        for (let index = 2; index <= numSquare; index++) {
            if(num % index === 0) return false
        }
        return true
    }
}

const hashTable = new HashTable()
hashTable.put('aaa',123)
hashTable.put('bbb',456)

console.log(hashTable.get('bbb')) //456
console.log(hashTable.get('ccc')) //undefined

console.log(hashTable.delete('aaa')) // 123

hashTable.put('cc',123)
hashTable.put('ss',456)
hashTable.put('ww',123)
hashTable.put('vv',456)
hashTable.put('xx',123)
hashTable.put('zz',456)

hashTable.put('pp',123)
hashTable.put('ll',456)

console.log(hashTable)