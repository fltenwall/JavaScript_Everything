// 类型检测函数
function toType(obj){
    const classType = {};
    ['Number','String','Boolean','Null','Undefined','Symbol','RegExp','Date','Array','Object','Function','Error','BigInt'].forEach(name => {
        classType[`[object ${name}]`] = name.toLowerCase()
    });

    function _toType(obj){
        if(obj == null) return obj + ''
        return typeof obj === 'object' || typeof obj === 'function' ? classType[toString.call(obj)] || 'object' : typeof obj
    }
    return _toType(obj)
}

// 测试
[1,'1',true,null,undefined,Symbol(1),/^/,new Date(),[],{},()=>{},new Error(),100n].forEach(obj => {
    console.log(toType(obj))
})

/*
number
string
boolean
null
undefined
symbol
regexp
date
array
object
function
error
bigint
*/

const map = [
    [1,'number'],
    ['1','string'],
    [true,'boolean'],
    [null,'null'],
    [undefined,'undefined'],
    [Symbol(1),'symbol'],
    [/^/,'regexp'],
    [new Date(),'date'],
    [[],'array'],
    [{},'object'],
    [()=>{},'function'],
    [new Error(),'error'],
    [100n,'bigint']
]

for (const tuple of map) {
    console.log(toType(tuple[0]) === tuple[1])
}

/*
true
true
true
true
true
true
true
true
true
true
true
true
true
*/