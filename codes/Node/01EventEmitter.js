const EventEmitter = require('events').EventEmitter

class Info extends EventEmitter {
    constructor(){
        super();
        setInterval(()=>{
            this.emit('newNews', {number: Math.random()*100})
        },1000)
    }
}

const info = new Info();

info.addListener('newNews', (res)=>{
    console.log(res)
})