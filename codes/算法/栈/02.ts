interface Stack<T>{
    push(ele:T):void
    pop():T | undefined
    peek():T | undefined
    isEmpty():boolean
    size():number
}

export default Stack