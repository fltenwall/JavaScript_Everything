<template>
    <div>
        <h1>This is {{name}}.</h1>
    </div>
</template>
<script>
import { inject } from 'vue'
export default {
    setup(){
        const name = inject('name')
        return {
            name
        }
    }
}
</script>