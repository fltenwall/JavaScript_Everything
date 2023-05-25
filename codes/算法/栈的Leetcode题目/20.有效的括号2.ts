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