const set = new Set()
// 添加元素
set.add(1)
set.add(2)
set.add(3)
// 删除元素
set.delete(2)
// 判断元素是否存在
console.log(set.has(2)) // false
// 查看元素个数
console.log(set.size)  // 2
console.log(set)// Set(2) { 1, 3 }
// 遍历
set.forEach(e => console.log(e)) // 1 3
for (const e of set) {
    console.log(e) //1 3 
}
// 清空
set.clear()
console.log(set) // Set(0) {}