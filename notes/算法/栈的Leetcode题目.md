
#### 1.有效的括号

leetcode 链接 [20.有效的括号](https://leetcode.cn/problems/valid-parentheses/)

题目描述：

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。

左括号必须以正确的顺序闭合。

每个右括号都有一个对应的相同类型的左括号。
 
示例 1：

输入：s = "()"
输出：true

题解 ：

```typescript
function isValid(str:string):boolean{
    const stack = new Array<string>();
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        switch(element){
            case '(':
                stack.push(')')
                break
            case '{':
                stack.push('}')
                 break
            case '[':
                stack.push(']')
                break
            default:
                if(element !== stack.pop()) return false
                break
        }
    }
    return stack.length === 0
}

console.log(isValid('[[[]]]')) // true
console.log(isValid('[[[}]]]')) // false
```

代码优化

```typescript
function isValid2(str:string):boolean{
    const stack = new Array<string>();
    const map = new Map([
        [')', '('],
        [']', '['],
        ['}', '{'],
    ]);
    if(str.length === 0 || str[0] in map) return false;
    for(let i=0;i<str.length;i++){
        const ele = str[i]
        if(map.get(ele)){
            if(map.get(ele) !== stack.pop()) return false;
        }else{
            stack.push(str[i]);
        }
    }
    return stack.length === 0;
}

console.log(isValid2('[[[]]]')) // true
console.log(isValid2('[[[]]}]')) // false
```