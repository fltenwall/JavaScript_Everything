import Queue from "./02"
class ArrayQueue<T> implements Queue<T>{
    private data:T[] = []

    enqueue(element:T):void{
        this.data.push(element)
    }

    dequeue():T | undefined{
        return this.data.shift()
    }

    peek():T|undefined{
        return this.data[0]
    }

    isEmpty():boolean{
        return this.data.length === 0
    }

    size():number{
        return this.data.length
    }   
}

export default ArrayQueue