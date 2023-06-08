

function showLevel(level, books){
    if(level === 'basement'){
        return books
    }else if(level === 'high'){
        return books * 2
    }else if(level === 'university'){
        return books * 3
    }
}

console.log(showLevel('high', 10)) // 20