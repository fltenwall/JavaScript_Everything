const buffer = Buffer.from('fltenwall');
const buffer2 = Buffer.from([1,2,3,4]);

const buffer3 = Buffer.alloc(20);

console.log(buffer)
console.log(buffer2)
console.log(buffer3)

/*
<Buffer 66 6c 74 65 6e 77 61 6c 6c>
<Buffer 01 02 03>
<Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
*/

buffer2.writeInt8(12,1)
console.log(buffer2) // <Buffer 01 0c 03 04>

buffer2.writeInt16BE(512,2)
console.log(buffer2) // <Buffer 01 0c 02 00>

buffer2.writeInt16LE(512,2)
console.log(buffer2) // <Buffer 01 0c 00 02>