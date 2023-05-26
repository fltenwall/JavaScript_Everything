import ArrayQueue from "./01";

function fn(names:string[], num:number){
    if(names.length === 0) return -1
    const queue = new ArrayQueue<string>();
    for(const name of names) queue.enqueue(name);
    while(queue.size() > 1){
        for(let i=0;i<3;i++){
            const name = queue.dequeue();
            if(name) queue.enqueue(name)
        }
        queue.dequeue()
    }
    
    return queue.dequeue();
}

const arr = ['a','b','c','d','e'];
const res = fn(arr, 3);
console.log(res)