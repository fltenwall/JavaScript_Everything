interface Queue<T>{
    enqueue(element:T):void
    dequeue():T | undefined
    peek():T | undefined
    isEmpty():boolean
    size():number
}

export default Queue