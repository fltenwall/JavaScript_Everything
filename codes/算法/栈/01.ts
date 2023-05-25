
class Stack<T=string> {
    private data: T[] = []

    push(ele:T):void{
        this.data.push(ele)
    }

    pop():T | undefined{
        return this.data.pop()
    }

    peek():T | undefined{
        return this.data[this.data.length-1]
    }

    isEmpty():boolean{
        return this.data.length === 0
    }

    size():number{
        return this.data.length
    }
}