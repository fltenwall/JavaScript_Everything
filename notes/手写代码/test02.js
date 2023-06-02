function debounce(callback, time){
    let timer = null
    const _debounce = function(){
        if(timer) clearTimeout(timer)
        timer = setTimeout(function(){
            callback()
            timer = null
        },time)
    }
    return _debounce
} 