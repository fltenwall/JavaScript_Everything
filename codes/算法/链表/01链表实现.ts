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
            let current = this.head
            let previous:Node<T> | null = null
            let index = 0;
            // 寻找目标节点
            while(index++ < position && current){
                previous = current
                current = current.next
            }
            previous!.next = newNode
            newNode.next = current
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
            let previous : Node<T> | null = null
            let index = 0
            while(index++  < position && current){
                previous = current
                current = current.next
            }
            // 改变指向删除节点
            previous!.next = current?.next ?? null
        }
        
        this.size--;
        return current?.value ?? null
    }
    // 得到对应位置的元素
    get(position:number):T | null{
        if(position < 0 || position >= this.size) return null
        let index = 0
        let current = this.head
        while(index++  < position){
            current = current?.next ?? null
        }
        return current?.value ?? null
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

export {}