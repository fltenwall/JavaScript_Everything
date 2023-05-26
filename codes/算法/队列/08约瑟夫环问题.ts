import ArrayQueue from "./01";

function fn(numbers:number, num:number){
    const queue = new ArrayQueue<number>();
    for (let index = 0; index < numbers; index++) {
       queue.enqueue(index);
    }
    while(queue.size() > 1){
        for(let i=1;i<num;i++){
            queue.enqueue(queue.dequeue()!);
        }
        queue.dequeue()
    }
    
    return queue.dequeue();
}

console.log(fn(10, 17))