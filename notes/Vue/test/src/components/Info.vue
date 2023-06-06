<template>
    <div>
        <h1>This is {{ name }}, he's {{ age }} years old.</h1>
    </div>
</template>
<script setup>
    const props = defineProps({
        name : {
            type: String,
            default: '',
        },
        age : {
            type: Number,
            default: 0, 
        }
    })
    const info = {
        age : 19,
    }
    function childFn(){
        console.log('childFn')
    }
    defineExpose({
        childFn,
        info,
    })
</script>
