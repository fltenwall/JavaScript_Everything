// 1.创建node节点类
class Node<T>{
    value:T
    next:Node<T> | null = null
    constructor(value:T){
        this.value=value
    }
}

// 创建 Linkedlist类
class Linkedlist<T>{
    private head:Node<T> | null = null
    private size:number = 0

    get length(){
        return this.size
    }

    // 根据postion获取到对应节点
    private getNode(position:number):Node<T> |  null {
        let index = 0
        let current = this.head
        while(index++ < position && current){
            current = current.next
        }
        return current
    }

    // 添加新节点
    append(value:T){
        // 创建新节点
        const newNode = new Node(value)
        // 链表为空
        if(!this.head) {
            this.head = newNode
        }else{
            let current = this.head
            while(current.next){
                current = current.next
            }
            current.next = newNode
        }
        this.size++  
    }

    // 批量创建节点
    appendArr(arr:T[]){
        // 创建新节点
        arr.forEach(element => {
            this.append(element) 
        });
    }

    // 遍历链表
    traverse(){
        const valuse:T[] = []
        let current = this.head
        while(current){
            valuse.push(current.value)
            current = current.next
        }
        console.log(valuse.join('->'))
        return valuse
    }
    // 插入节点
    insert(value:T, position:number):boolean{
        // 越界判断
        if(position < 0 || position > this.size) return false

        const newNode = new Node(value)
        // 在头部插入数据
        if(position === 0){
            newNode.next = this.head
            this.head = newNode
        }else{
            // 找到前一个节点
            const previous = this.getNode(position-1)
            // 将新节点的next指向previous的下一个节点
            newNode.next = previous?.next ?? null
            // 将previous的next指向新节点
            previous!.next = newNode
            
        }
        this.size++
        return true

    }

    // 根据索引删除节点
    removeIndex(position:number):T | null{
        // 越界判断
        if(position < 0 || position >= this.size) return null
        let current = this.head
        if(position === 0){
            this.head = current?.next ?? null
        }else{
            // 找到前一个节点
            const previous = this.getNode(position-1)
            // 改变指向删除节点
            previous!.next = previous?.next?.next ?? null
        }
        
        this.size--;
        return current?.value ?? null
    }
    // 得到对应位置的元素
    get(position:number):T | null{
        if(position < 0 || position >= this.size) return null
        return this.getNode(position)?.value ?? null
    }
    // 更新节点
    update(value:T, position:number):boolean{
        if(position < 0 || position >= this.size) return false
        let current = this.getNode(position)
        current!.value = value
        return  true
    }
    // 根据值获取对应位置的索引
    indexOf(value:T):number{
        let current = this.head
        let index = 0
        while(current){
            if(current.value === value){
                return index
            }
            index++
            current = current.next
        }
        return -1
    }
    // 根据 value 删除节点
    removeValue(value:T):T | null{
        const index = this.indexOf(value)
        return this.removeIndex(index)
    }

    // 判断链表是否为空
    isEmpty():boolean{
        return this.size === 0
    }
}

const list = new Linkedlist();
list.appendArr([1,2,3])
list.traverse() // 1->2->3
list.insert(6, 0) // 头部插入
list.insert(8, 2) // 中间插入
list.insert(10, 5) // 尾部插入
list.traverse() // 6->1->8->2->3->10

list.removeIndex(0)//删除头节点
list.traverse() // 1->8->2->3->10
console.log(list.removeIndex(2))//删除中间节点 2
list.traverse() // 1->8->3->10
console.log(list.get(3))//10

console.log(list.update(100,1)) // true
list.traverse() // 1->100->3->10

console.log(list.indexOf(100)) // 1

console.log(list.removeValue(1)) // 1
list.traverse() // 100->3->10

console.log(list.isEmpty()) // false

export {}