import ArrayQueue from "./01";

const queue = new ArrayQueue<string>()

queue.enqueue('1')
console.log(queue.size())
queue.dequeue()
console.log(queue.isEmpty())