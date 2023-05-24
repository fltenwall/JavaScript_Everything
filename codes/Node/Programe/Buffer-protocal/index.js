const fs = require('fs');
const protobuf = require('protocol-buffers')

const messages = protobuf(fs.readFileSync(__dirname+'/01.proto'), 'utf-8')

console.log(messages);

/*
Messages {
  Person: {
    type: 2,
    message: true,
    name: 'Person',
    buffer: true,
    encode: [Function: encode] { bytes: 0 },
    decode: [Function: decode] { bytes: 0 },
    encodingLength: [Function: encodingLength],
    dependencies: [ [Object], [Object] ]
  }
}
*/

const buf = messages.Person.encode({
    age: 12,
    name: 'fltenwall'
  })
  
console.log(buf)  // <Buffer 80 01 0c 02 09 66 6c 74 65 6e 77 61 6c 6c>