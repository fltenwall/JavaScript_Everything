const fs = require('fs')

const content = '1111'
fs.writeFile(__dirname+'/new.txt', content, {flag:'a+', encoding:'utf-8'}, (err)=>{
    if(err) throw new Error()
})
