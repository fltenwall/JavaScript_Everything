console.log(a,b)
var a=12,b=12;
function fn(){
    console.log(a,b)
    var a = b = 13
    console.log(a,b)
}
fn()
console.log(a,b)

/*
undefined undefined
undefined 12
13 13
12 13
*/