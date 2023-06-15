// const arr1 = [{age:22},{age:22},{age:19}]
const arr1 = [1,2,3,34,5]
const res1 = arr1.reduce((prev,current)=>{
    return prev + current
})
console.log(res1) // 45