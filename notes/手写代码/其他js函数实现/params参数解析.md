
#### 功能说明

`queryUrlPramas()`接收两个参数`url`,`attr`。如果不传第二个参数，那么返回解析`url`的对象，如果传入`attr`，则只返回`attr`对应的值。

#### 实现方式一：字符串拆分

```javascript
const queryUrlPramas = function(url, attr){
    let askIndex = url.indexOf('?'),
        hashIndex = url.lastIndexOf('#'),
        askText = '',
        hashText = '',
        params = {};
    hashText = url.substring(hashIndex + 1);
    askText = url.substring(askIndex + 1, hashIndex)

    params['hash'] = hashText
    const askTextArr = askText.split('&')
    askTextArr.forEach(element => {
        let [key, val] = element.split('=')
        params[key] = val
    })
    return typeof attr !== 'undefined' ? params[attr] : params
}

const url = 'https://www.bilibili.com/video/eeee/?p=256&spm_id_from=333.7777.top_right_bar_window_history.content.click&vd_source=29aaaa68d14f71bbbb#video'

console.log(queryUrlPramas(url))
/*
{
  hash: 'video',
  p: '256',
  spm_id_from: '333.7777.top_right_bar_window_history.content.click',
  vd_source: '29aaaa68d14f71bbbb'
}
*/
console.log(queryUrlPramas(url, 'p')) // 256
```

问题：`#`或`?`不存在时会索引计算会出现问题，导致解析出错；如果`#`出现在`?`前时，解析也会出现问题。

考虑各种情况：

1. `#`不存在，`?`存在，`?`后的参数直接截取到末尾
2. `#`存在，`?`不存在，`#`后的参数直接截取到末尾
3. `#`和`?`都不存在，不做任何处理
4. `#`在`?`后面，`?`后的参数从`?`截取到`#`，hash从`#`截取到末尾
5. `#`在`?`前面，hash从`#`截取到`?`，`?`后的参数直接截取到末尾

字符串解析考虑各种情况：
```javascript
const queryUrlPramas = function(url, attr){
    let askIndex = url.indexOf('?'),
        hashIndex = url.lastIndexOf('#'),
        askText = '',
        hashText = '',
        params = {};

    // 1. `#`不存在，`?`存在，`?`后的参数直接截取到末尾
    if(hashIndex === -1 && askIndex >= 0){
        askText = url.substring(askIndex + 1)
    }
    // 2. `#`存在，`?`不存在，`#`后的参数直接截取到末尾
    else if(hashIndex >= 0 && askIndex === -1){
        hashText = url.substring(hashIndex + 1)
    }
    else if(hashIndex >= 0 && askIndex >= 0){
        // 4. `#`在`?`后面，`?`后的参数从`?`截取到`#`，hash从`#`截取到末尾
        if(hashIndex > askIndex){
            askText = url.substring(askIndex + 1, hashIndex)
            hashText = url.substring(hashIndex + 1)
        }
        // 5. `#`在`?`前面，hash从`#`截取到`?`，`?`后的参数直接截取到末尾
        else {
            hashText = url.substring(hashIndex + 1, askIndex)
            askText = url.substring(askIndex + 1)
        }
    }
    hashText !== '' ? params['hash'] = hashText : null
    if(askText !== ''){
        const askTextArr = askText.split('&')
        askTextArr.forEach(element => {
            let [key, val] = element.split('=')
            params[key] = val
        })
    }
    return typeof attr !== 'undefined' ? params[attr] : params
}
```

测试不同情况下的结果：

```javascript
// 1. `#`不存在，`?`存在，`?`后的参数直接截取到末尾
const url1 = 'https://www.bilibili.com/video/eeee/?a=1&b=2'
console.log(queryUrlPramas(url1)) // { a: '1', b: '2' }

// 2. `#`存在，`?`不存在，`#`后的参数直接截取到末尾
const url2 = 'https://www.bilibili.com/video/eeee/#ccc'
console.log(queryUrlPramas(url2)) // { hash: 'ccc' }

// 3. `#`和`?`都不存在，不做任何处理
const url3 = 'https://www.bilibili.com/video/eeee/'
console.log(queryUrlPramas(url3)) // {}

// 4. `#`在`?`后面，`?`后的参数从`?`截取到`#`，hash从`#`截取到末尾
const url4 = 'https://www.bilibili.com/video/eeee/?a=1&b=2#ccc'
console.log(queryUrlPramas(url4)) // { hash: 'ccc', a: '1', b: '2' }
// 5. `#`在`?`前面，hash从`#`截取到`?`，`?`后的参数直接截取到末尾
const url5 = 'https://www.bilibili.com/video/eeee/#ccc?a=1&b=2'
console.log(queryUrlPramas(url5)) // { hash: 'ccc', a: '1', b: '2' }
```

#### 实现方式二：利用`<a>`标签

```javascript
const queryUrlPramas = function(url, attr){
    let askText = '',
        hashText = '',
        params = {};
    let linkObj = document.createElement('a');
    linkObj.href = url;
    askText = linkObj.search.substring(1); // 去掉?
    hashText = linkObj.hash.substring(1); // 去掉#
    linkObj = null;

    // 解析参数
    params['hash'] = hashText
    const askTextArr = askText.split('&')
    askTextArr.forEach(element => {
        let [key, val] = element.split('=')
        params[key] = val
    })
    return typeof attr !== 'undefined' ? params[attr] : params
}
```

测试不同情况下的结果：

```javascript
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
console.log(queryUrlPramas(url5)) // {hash: 'ccc?a=1&b=2'}
```

会发现在第 5 中情况下，即`#`在`?`前面的情况下，无法正常处理，需要手动进行判断修正。

另外可以使用ES6 提供的`URLSearchParams`类进行参数字符串处理，简化解析：

```javascript
new URLSearchParams('a=1&b=2').forEach((val, key)=> console.log(val,key)) // 1 a ; 2 b
```

因此可以用
```javascript
new URLSearchParams(askText).forEach((val, key)=> params[key] = val)
```

替换之前的代码：

```javascript
const askTextArr = askText.split('&')
askTextArr.forEach(element => {
    let [key, val] = element.split('=')
    params[key] = val
})
```

#### 实现方式三：利用正则表达式

```javascript
const queryUrlPramas = function(url, attr){
    let params = {};
    url.replace(/#([^?=#&]+)/g,(_,hash)=>params['hash']=hash)
    url.replace(/([^?=#&]+)=([^?=#&]+)/g, (_,key,val)=>params[key]=val)
    return typeof attr !== 'undefined' ? params[attr] : params
}
```

测试不同情况下的结果：

```javascript
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
```

每种情况结果都正常。