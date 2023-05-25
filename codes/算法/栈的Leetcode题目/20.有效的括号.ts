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