
特点：

1. 更新数据不会立即执行，而是在访问时才会重新计算值
2. vue2和vue3中的computed原理不同

vue2中computed不收集依赖，但vue3 中computed会收集依赖