function sum(){
    let res = 0
    for (let index = 0; index < 10000; index++) {
        res += index;
    }
    return res
}

process.on('message', () => {
    const data = sum()
    console.info('The child process backed data to main')
    process.send(data)
})