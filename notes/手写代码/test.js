const queryUrlPramas = function(url, attr){
    let params = {};
    url.replace(/#([^?=#&]+)/g,(_,hash)=>params['hash']=hash)
    url.replace(/([^?=#&]+)=([^?=#&]+)/g, (_,key,val)=>params[key]=val)
    return typeof attr !== 'undefined' ? params[attr] : params
}

// 1. `#`不存在，`?`存在
const url1 = 'https://www.bilibili.com/video/eeee/?a=1&b=2'
console.log(queryUrlPramas(url1)) // { a: '1', b: '2' }

// 2. `#`存在，`?`不存在
const url2 = 'https://www.bilibili.com/video/eeee/#ccc'
console.log(queryUrlPramas(url2)) // { hash: 'ccc' }

// 3. `#`和`?`都不存在
const url3 = 'https://www.bilibili.com/video/eeee/'
console.log(queryUrlPramas(url3)) // {}

// 4. `#`在`?`后面
const url4 = 'https://www.bilibili.com/video/eeee/?a=1&b=2#ccc'
console.log(queryUrlPramas(url4)) // { hash: 'ccc', a: '1', b: '2' }
// 5. `#`在`?`前面
const url5 = 'https://www.bilibili.com/video/eeee/#ccc?a=1&b=2'
console.log(queryUrlPramas(url5)) // { hash: 'ccc', a: '1', b: '2' }