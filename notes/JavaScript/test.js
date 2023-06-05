let body = document.body;
body.addEventListener('click', function(){
    Promise.resolve().then(()=>{
        console.log(1)
    })
    console.log(2)
})
body.addEventListener('click', function(){
    Promise.resolve().then(()=>{
        console.log(3)
    })
    console.log(4)
})