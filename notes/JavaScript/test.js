var arr = [1,2,3]

function fn(arr){
    console.log(arr)
    arr[0] = 100
    arr = [100]
    arr[0] = 0
    console.log(arr)
}
fn(arr)
console.log(arr)

/*
[ 1, 2, 3 ]
[ 0 ]
[ 100, 2, 3 ]
*/