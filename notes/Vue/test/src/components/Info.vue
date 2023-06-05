<template>
    <div>
        <h1>This is {{name}}.</h1>
    </div>
</template>
<script>
import { inject } from 'vue'
export default {
    setup(){
        // 第二个参数为默认值
        const name = inject('name', 'fltenwal')
        return {
            name
        }
    }
}
</script>