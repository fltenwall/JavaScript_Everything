interface ArrayQueue2<T> extends List<T>{
    enqueue(element:T):void
    dequeue():T | undefined
}