const glob = require('glob')

// 阻塞 IO
let result = glob.sync(__dirname + '/**/*');

// 非阻塞 IO
// glob(__dirname + '/**/*', (err, res)=>{
//     console.log(res)
// })

console.log(result)
