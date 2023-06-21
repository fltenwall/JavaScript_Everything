const fibonacci = function(count){
    const dp = [1,1]
    for (let index = 2; index < count; index++) {
        dp[index] = dp[index-2] + dp[index-1]
    }
    return dp[count-1]
}

console.log(fibonacci(10))